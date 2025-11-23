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
        body: JSON.stringify({ error: "Stripe is not configured" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const { session_id } = body;

    if (!session_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing session_id" }),
      };
    }

    console.log("Retrieving session:", session_id);

    // Retrieve the session with expanded customer and subscription data
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["customer", "subscription", "subscription.plan"],
    });

    // Extract useful information
    const response = {
      customer_email: session.customer_details?.email || session.customer?.email,
      subscription_id: session.subscription?.id,
      subscription_status: session.subscription?.status,
      plan_nickname: session.subscription?.plan?.nickname || session.subscription?.items?.data[0]?.plan?.nickname,
      plan_amount: session.subscription?.plan?.amount || session.subscription?.items?.data[0]?.plan?.amount,
      plan_interval: session.subscription?.plan?.interval || session.subscription?.items?.data[0]?.plan?.interval,
      current_period_end: session.subscription?.current_period_end,
      price_id: session.subscription?.items?.data[0]?.price?.id,
    };

    console.log("Session retrieved successfully:", {
      email: response.customer_email,
      status: response.subscription_status,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Error retrieving session:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || "Failed to retrieve session",
      }),
    };
  }
};
