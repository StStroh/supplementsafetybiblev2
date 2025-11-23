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
          error: "Stripe is not configured",
          support: SUPPORT_EMAIL
        }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const { customerId } = body;

    if (!customerId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Missing customerId",
          support: SUPPORT_EMAIL
        }),
      };
    }

    console.log("Creating portal session for customer:", customerId);

    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${event.headers.origin || "https://supplementsafetybible.com"}/account`,
    });

    console.log("Portal session created successfully");

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Error creating portal session:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || "Failed to create portal session",
        support: SUPPORT_EMAIL
      }),
    };
  }
};
