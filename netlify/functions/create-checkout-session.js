// netlify/functions/create-checkout-session.js
const Stripe = require("stripe");

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is missing in Netlify environment variables");
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const priceId = body.priceId;

    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing priceId" }),
      };
    }

    console.log("Creating checkout session for price:", priceId);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: ${process.env.URL || "https://supplementsafetybible.com"}/success?session_id={CHECKOUT_SESSION_ID},
      cancel_url: ${process.env.URL || "https://supplementsafetybible.com"}/pricing,
      allow_promotion_codes: true,
    });

    console.log("Checkout session created:", session.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Stripe checkout session error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Failed to create checkout session",
      }),
    };
  }
};