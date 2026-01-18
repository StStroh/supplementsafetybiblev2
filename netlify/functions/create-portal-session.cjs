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
