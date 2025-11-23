const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
        body: JSON.stringify({ error: "Stripe is not configured on the server" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const priceId = body.priceId;

    console.log("Received checkout request:", { priceId, body });

    if (!priceId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing priceId" }),
      };
    }

    // Validate price ID format
    if (!priceId.startsWith('price_')) {
      console.error("Invalid price ID format:", priceId);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: `Invalid price ID format: ${priceId}. Price IDs should start with 'price_'. Check that VITE_STRIPE_PRICE_* environment variables are set in Netlify.`
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
      }),
    };
  }
};