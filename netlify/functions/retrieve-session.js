/* eslint-disable */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { Allow: "GET", "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }
  try {
    const sid = event.queryStringParameters?.session_id;
    if (!sid) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing session_id" }) };
    }

    const session = await stripe.checkout.sessions.retrieve(sid, {
      expand: ["subscription", "customer"],
    });

    const safe = {
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email || null,
      subscription_status: session.subscription?.status || null,
      customer_id:
        typeof session.customer === "string" ? session.customer : session.customer?.id || null,
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(safe),
    };
  } catch (e) {
    console.error("retrieve-session error:", e);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to retrieve session" }) };
  }
};
