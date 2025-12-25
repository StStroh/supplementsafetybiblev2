/*
 * Guest Checkout - NO AUTH REQUIRED
 * Customer clicks checkout → immediately goes to Stripe
 * After payment, webhook provisions access based on email
 */
const Stripe = require("stripe");

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

function getOrigin(event) {
  const headers = event.headers || {};
  const host = headers.host || headers.Host || "supplementsafetybible.com";
  const proto = headers["x-forwarded-proto"] || (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const { plan, interval, priceId } = JSON.parse(event.body || "{}");

    if (!plan || !["pro", "premium"].includes(plan)) {
      return json(400, { error: "Invalid plan. Must be 'pro' or 'premium'." });
    }

    const billing = interval === "annual" ? "annual" : "monthly";

    // Select price ID based on plan and interval
    let selectedPriceId = priceId;
    if (!selectedPriceId) {
      if (plan === "pro" && billing === "annual") {
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PRO_ANNUAL;
      } else if (plan === "pro") {
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PRO;
      } else if (plan === "premium" && billing === "annual") {
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL;
      } else {
        selectedPriceId = process.env.VITE_STRIPE_PRICE_PREMIUM;
      }
    }

    if (!selectedPriceId) {
      return json(500, { error: `Price ID not configured for ${plan} ${billing}` });
    }

    const origin = getOrigin(event);

    // Use env vars with fallbacks
    const successUrl = process.env.CHECKOUT_SUCCESS_URL ||
      `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = process.env.CHECKOUT_CANCEL_URL ||
      `${origin}/billing/cancel`;

    console.log("[create-checkout-session] Creating session:", {
      plan,
      interval: billing,
      priceId: selectedPriceId,
      successUrl,
      cancelUrl,
      origin,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: selectedPriceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        plan,
        interval: billing,
      },
      subscription_data: {
        trial_period_days: parseInt(process.env.TRIAL_DAYS_PRO || "14"),
        metadata: {
          plan,
          interval: billing,
        },
      },
    });

    console.log("[create-checkout-session] Session created:", session.id);

    return json(200, { url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("[create-checkout-session] Error:", error);
    return json(500, {
      error: error.message || "Failed to create checkout session",
      details: error.toString()
    });
  }
};
