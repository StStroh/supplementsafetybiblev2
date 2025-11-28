const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const SUPPORT_EMAIL = "support@supplementsafetybible.com";

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not configured");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Stripe is not configured on the server",
          support: SUPPORT_EMAIL
        }),
      };
    }

    const body = JSON.parse(event.body || "{}");

    let priceId = body.priceId;

    if (body.plan && body.billing_interval) {
      const plan = body.plan.toLowerCase();
      const interval = body.billing_interval === "year" ? "annual" : "monthly";

      const priceMap = {
        "premium_monthly": process.env.VITE_STRIPE_PRICE_PREMIUM,
        "premium_annual": process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL,
        "pro_monthly": process.env.VITE_STRIPE_PRICE_PRO,
        "pro_annual": process.env.VITE_STRIPE_PRICE_PRO_ANNUAL,
      };

      const key = `${plan}_${interval}`;
      priceId = priceMap[key];

      console.log("Mapped plan to priceId:", { plan, interval, key, priceId });
    }

    console.log("Received checkout request:", { priceId, body });

    if (!priceId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Missing priceId or plan/billing_interval",
          support: SUPPORT_EMAIL
        }),
      };
    }

    if (!priceId.startsWith('price_')) {
      console.error("Invalid price ID format:", priceId);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: `Invalid price ID format: ${priceId}. Price IDs should start with 'price_'. Check that VITE_STRIPE_PRICE_* environment variables are set in Netlify.`,
          support: SUPPORT_EMAIL
        }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${event.headers.origin || "https://supplementsafetybible.com"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin || "https://supplementsafetybible.com"}/pricing`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Stripe error:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || "Server error",
        support: SUPPORT_EMAIL
      }),
    };
  }
};