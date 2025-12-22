/*
 * Verify Checkout Session - Called after Stripe redirect
 * Returns customer email, tier, and subscription status
 * No auth required - session_id is the proof of payment
 */
const Stripe = require("stripe");
const { getPlanInfo } = require("./_lib/plan-map.cjs");

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, {});
  }

  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const params = event.queryStringParameters || {};
    const sessionId = params.session_id;

    if (!sessionId) {
      return json(400, { error: "Missing session_id parameter" });
    }

    console.log("[verify-checkout-session] Verifying session:", sessionId);

    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "customer"],
    });

    console.log("[verify-checkout-session] Session retrieved:", {
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      customer: session.customer?.id || session.customer,
    });

    if (session.payment_status !== "paid" && session.status !== "complete") {
      return json(400, {
        error: "Payment not completed",
        status: session.status,
        payment_status: session.payment_status,
      });
    }

    const email = session.customer_details?.email || session.customer?.email;
    const customerId = typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

    if (!email) {
      return json(400, { error: "No email found in session" });
    }

    // Get subscription details
    let tier = "pro";
    let subscriptionStatus = "active";
    let currentPeriodEnd = null;
    let trialEnd = null;

    if (session.subscription) {
      const sub = typeof session.subscription === "string"
        ? await stripe.subscriptions.retrieve(session.subscription)
        : session.subscription;

      subscriptionStatus = sub.status;
      currentPeriodEnd = sub.current_period_end;
      trialEnd = sub.trial_end;

      // Determine tier from price ID
      if (sub.items?.data?.[0]?.price?.id) {
        const priceId = sub.items.data[0].price.id;
        const planInfo = getPlanInfo(priceId);
        if (planInfo?.plan) {
          tier = planInfo.plan;
        }
      }
    }

    console.log("[verify-checkout-session] Success:", {
      email,
      customerId,
      tier,
      subscriptionStatus,
      trialEnd,
    });

    return json(200, {
      email,
      customerId,
      tier,
      status: subscriptionStatus,
      currentPeriodEnd,
      trialEnd,
      isTrialing: subscriptionStatus === "trialing",
    });
  } catch (error) {
    console.error("[verify-checkout-session] Error:", error);
    return json(500, {
      error: error.message || "Failed to verify checkout session",
      details: error.toString(),
    });
  }
};
