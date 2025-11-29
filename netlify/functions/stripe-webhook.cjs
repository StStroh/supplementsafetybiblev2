const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

exports.handler = async (event) => {
  try {
    const sig = event.headers["stripe-signature"];
    const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const evt = stripe.webhooks.constructEvent(event.body, sig, whSecret);

    switch (evt.type) {
      case "checkout.session.completed":
        console.log("Paid session:", evt.data.object.id);
        break;
      case "invoice.payment_succeeded":
        console.log("Invoice paid:", evt.data.object.id);
        break;
      case "customer.subscription.updated":
        console.log("Subscription updated:", evt.data.object.id);
        break;
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (err) {
    console.error("Webhook error:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }
};
