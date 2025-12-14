const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
  try {
    const { plan } = JSON.parse(event.body || "{}");
    if (!["pro", "premium"].includes(plan)) throw new Error("Invalid plan");
    const priceId = plan === "pro" ? process.env.PRICE_PRO_MONTHLY : process.env.PRICE_PREMIUM_MONTHLY;
    if (!priceId) throw new Error("Missing Stripe price ID");
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      subscription_data: { trial_period_days: 14 },
      success_url: process.env.CHECKOUT_SUCCESS_URL,
      cancel_url: process.env.CHECKOUT_CANCEL_URL,
    });
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error("create-checkout error", err);
    return { statusCode: 500, body: err.message || "Checkout error" };
  }
};
