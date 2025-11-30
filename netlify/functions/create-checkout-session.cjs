const getStripe = require('./stripe.cjs');
const { isValidPriceId } = require('../../src/lib/stripe/plan-map.cjs');

const SUPPORT_EMAIL = "support@supplementsafetybible.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  const headers = corsHeaders;

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

    // Support tier shorthand: "pro_monthly" | "pro_annual" | "premium_monthly" | "premium_annual"
    if (typeof body.tier === 'string' && body.tier.includes('_') && !priceId) {
      const tierKey = body.tier.toLowerCase();
      const priceMap = {
        "pro_monthly": process.env.STRIPE_PRICE_PRO_MONTHLY,
        "pro_annual": process.env.STRIPE_PRICE_PRO_ANNUAL,
        "premium_monthly": process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
        "premium_annual": process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
      };
      priceId = priceMap[tierKey];
      console.log("Mapped tier shorthand to priceId:", { tier: body.tier, priceId });
    }

    // Support interval parameter: 'month' | 'year' → defaults to premium
    if (body.interval && !priceId) {
      const intervalMap = {
        month: process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
        year: process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
      };
      priceId = intervalMap[body.interval];
      console.log("Mapped interval to priceId:", { interval: body.interval, priceId });
    }

    // Support new format: { tier: "pro|premium", cadence: "monthly|annual" }
    if (body.tier && body.cadence && !priceId) {
      const tier = body.tier.toLowerCase();
      const cadence = body.cadence.toLowerCase();

      const priceMap = {
        "pro_monthly": process.env.STRIPE_PRICE_PRO_MONTHLY,
        "pro_annual": process.env.STRIPE_PRICE_PRO_ANNUAL,
        "premium_monthly": process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
        "premium_annual": process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
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
        "premium_monthly": process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
        "premium_annual": process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
        "pro_monthly": process.env.STRIPE_PRICE_PRO_MONTHLY,
        "pro_annual": process.env.STRIPE_PRICE_PRO_ANNUAL,
      };

      const key = `${plan}_${interval}`;
      priceId = priceMap[key];

      console.log("Mapped plan+billing_interval to priceId:", { plan, interval, key, priceId });
    }

    console.log("Received checkout request:", { priceId, body });

    if (!priceId) {
      console.error("No priceId resolved from request:", body);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Missing or invalid tier parameter. Expected: tier='pro_monthly', 'pro_annual', 'premium_monthly', or 'premium_annual'",
          received: body,
          support: SUPPORT_EMAIL
        }),
      };
    }

    if (!priceId || !priceId.startsWith('price_')) {
      console.error("Invalid price ID format:", priceId);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: `Configuration error: Invalid Stripe price ID '${priceId}'. Price IDs must start with 'price_'. Please contact support.`,
          support: SUPPORT_EMAIL,
          envCheck: {
            STRIPE_PRICE_PRO_MONTHLY: !!process.env.STRIPE_PRICE_PRO_MONTHLY,
            STRIPE_PRICE_PRO_ANNUAL: !!process.env.STRIPE_PRICE_PRO_ANNUAL,
            STRIPE_PRICE_PREMIUM_MONTHLY: !!process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
            STRIPE_PRICE_PREMIUM_ANNUAL: !!process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
          }
        }),
      };
    }

    // LIVE ENFORCEMENT: Only allow price IDs from plan-map.cjs
    if (!isValidPriceId(priceId)) {
      console.error("BLOCKED: Unauthorized price ID:", priceId);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Invalid or unauthorized price ID. Only LIVE prices are allowed.",
          support: SUPPORT_EMAIL
        }),
      };
    }

    console.log("✅ Validated LIVE price ID:", priceId);

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
      cancel_url: `${event.headers.origin || "https://supplementsafetybible.com"}/pricing`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url
      }),
    };
  } catch (error) {
    console.error("Stripe checkout error:", error);

    let errorMessage = "An error occurred creating checkout session";
    let statusCode = 500;

    if (error.type === 'StripeAuthenticationError') {
      errorMessage = "Stripe configuration error. Please contact support.";
      console.error("STRIPE_SECRET_KEY is invalid or missing");
    } else if (error.type === 'StripeInvalidRequestError') {
      errorMessage = error.message || "Invalid request to Stripe";
      statusCode = 400;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      statusCode,
      headers,
      body: JSON.stringify({
        error: errorMessage,
        type: error.type || 'unknown',
        support: SUPPORT_EMAIL
      }),
    };
  }
};
