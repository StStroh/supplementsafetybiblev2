const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function getBearerToken(event) {
  const h = event.headers || {};
  const auth = h.authorization || h.Authorization || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const token = getBearerToken(event);
  if (!token) return json(401, { error: "Missing Authorization Bearer token" });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { persistSession: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    }
  );

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) return json(401, { error: "Invalid or expired session" });

  const { plan, interval } = JSON.parse(event.body || "{}");
  if (!["pro", "premium"].includes(plan)) return json(400, { error: "Invalid plan" });

  const billing = interval === "annual" ? "annual" : "monthly";

  // Select price ID based on plan and billing interval
  let priceId;
  if (plan === "pro" && billing === "annual") {
    priceId = process.env.VITE_STRIPE_PRICE_PRO_ANNUAL;
  } else if (plan === "pro") {
    priceId = process.env.VITE_STRIPE_PRICE_PRO;
  } else if (plan === "premium" && billing === "annual") {
    priceId = process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL;
  } else {
    priceId = process.env.VITE_STRIPE_PRICE_PREMIUM;
  }

  if (!priceId) {
    return json(500, { error: `Price ID not configured for ${plan} ${billing}` });
  }

  // Get base URL from headers or use fallback
  const headers = event.headers || {};
  const host = headers.host || headers.Host || "supplementsafetybible.com";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Use environment variables with fallbacks
  const successUrl = process.env.CHECKOUT_SUCCESS_URL || `${baseUrl}/success`;
  const cancelUrl = process.env.CHECKOUT_CANCEL_URL || `${baseUrl}/pricing?cancelled=1`;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: data.user.email,
    metadata: {
      supabase_user_id: data.user.id,
      plan,
      interval: billing,
    },
    subscription_data: {
      trial_period_days: parseInt(process.env.TRIAL_DAYS_PRO || "14"),
      metadata: {
        supabase_user_id: data.user.id,
        plan,
        interval: billing,
      },
    },
  });

  return json(200, { url: session.url, id: session.id });
};
