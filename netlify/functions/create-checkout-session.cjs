const getStripe = require('./stripe.cjs');

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

    const stripe = getStripe();
    const body = JSON.parse(event.body || "{}");

    let priceId = body.priceId;

    // Support new format: { tier: "pro|premium", cadence: "monthly|annual" }
    if (body.tier && body.cadence) {
      const tier = body.tier.toLowerCase();
      const cadence = body.cadence.toLowerCase();

      const priceMap = {
        "pro_monthly": process.env.PRICE_PRO_MONTHLY || process.env.VITE_STRIPE_PRICE_PRO,
        "pro_annual": process.env.PRICE_PRO_ANNUAL || process.env.VITE_STRIPE_PRICE_PRO_ANNUAL,
        "premium_monthly": process.env.PRICE_PREMIUM_MONTHLY || process.env.VITE_STRIPE_PRICE_PREMIUM,
        "premium_annual": process.env.PRICE_PREMIUM_ANNUAL || process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL,
      };

      const key = `${tier}_${cadence}`;
      priceId = priceMap[key];

      console.log("Mapped tier+cadence to priceId:", { tier, cadence, key, priceId });
    }
    // Support legacy format: { plan: "pro|premium", billing_interval: "month|year" }
    else if (body.plan && body.billing_interval) {
      const plan = body.plan.toLowerCase();
      const interval = body.billing_interval === "year" ? "annual" : "monthly";

      const priceMap = {
        "premium_monthly": process.env.PRICE_PREMIUM_MONTHLY || process.env.VITE_STRIPE_PRICE_PREMIUM,
        "premium_annual": process.env.PRICE_PREMIUM_ANNUAL || process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL,
        "pro_monthly": process.env.PRICE_PRO_MONTHLY || process.env.VITE_STRIPE_PRICE_PRO,
        "pro_annual": process.env.PRICE_PRO_ANNUAL || process.env.VITE_STRIPE_PRICE_PRO_ANNUAL,
      };

      const key = `${plan}_${interval}`;
      priceId = priceMap[key];

      console.log("Mapped plan+billing_interval to priceId:", { plan, interval, key, priceId });
    }

    console.log("Received checkout request:", { priceId, body });

    if (!priceId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Missing priceId, tier+cadence, or plan+billing_interval",
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
          error: `Invalid price ID format: ${priceId}. Price IDs should start with 'price_'. Check that PRICE_* or VITE_STRIPE_PRICE_* environment variables are set in Netlify.`,
          support: SUPPORT_EMAIL,
          envCheck: {
            PRICE_PRO_MONTHLY: !!(process.env.PRICE_PRO_MONTHLY || process.env.VITE_STRIPE_PRICE_PRO),
            PRICE_PRO_ANNUAL: !!(process.env.PRICE_PRO_ANNUAL || process.env.VITE_STRIPE_PRICE_PRO_ANNUAL),
            PRICE_PREMIUM_MONTHLY: !!(process.env.PRICE_PREMIUM_MONTHLY || process.env.VITE_STRIPE_PRICE_PREMIUM),
            PRICE_PREMIUM_ANNUAL: !!(process.env.PRICE_PREMIUM_ANNUAL || process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL),
          }
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
      success_url: `${event.headers.origin || "https://supplementsafetybible.com"}/premium/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin || "https://supplementsafetybible.com"}/premium`,
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
