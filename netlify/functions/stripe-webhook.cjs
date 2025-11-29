const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const { createClient } = require("@supabase/supabase-js");
const { getPlanInfo } = require("../../src/lib/stripe/plan-map.cjs");

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  try {
    const sig = event.headers["stripe-signature"];
    const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const evt = stripe.webhooks.constructEvent(event.body, sig, whSecret);

    console.log(`[Webhook] Event: ${evt.type}, ID: ${evt.id}`);

    // Idempotency check
    const { data: existing } = await supabase
      .from("events_log")
      .select("id")
      .eq("event_id", evt.id)
      .maybeSingle();

    if (existing) {
      console.log(`[Webhook] Already processed: ${evt.id}`);
      return { statusCode: 200, body: JSON.stringify({ received: true, duplicate: true }) };
    }

    // Log event
    await supabase.from("events_log").insert({
      event_id: evt.id,
      event_type: evt.type,
      payload: evt.data.object,
      processed_at: new Date().toISOString(),
    });

    switch (evt.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(evt.data.object);
        break;

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(evt.data.object);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(evt.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(evt.data.object);
        break;

      default:
        console.log(`[Webhook] Unhandled event: ${evt.type}`);
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (err) {
    console.error("Webhook error:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }
};

async function handleCheckoutCompleted(session) {
  console.log(`[Checkout] Session: ${session.id}`);

  const customerId = session.customer;
  const subscriptionId = session.subscription;
  const customerEmail = session.customer_details?.email || session.customer_email;

  if (!subscriptionId) {
    console.log("[Checkout] No subscription ID, skipping");
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = subscription.items.data[0]?.price?.id;

  if (!priceId) {
    console.error("[Checkout] No price ID found");
    return;
  }

  const planInfo = getPlanInfo(priceId);
  if (!planInfo) {
    console.error(`[Checkout] Unknown price ID: ${priceId}`);
    return;
  }

  console.log(`[Checkout] Mapped: ${priceId} → ${planInfo.plan} (${planInfo.interval})`);

  await upsertProfile(customerId, customerEmail, {
    subscription_id: subscriptionId,
    subscription_status: subscription.status,
    is_premium: planInfo.plan === "premium",
    plan_name: planInfo.plan,
    billing_interval: planInfo.interval,
    role: planInfo.plan === "premium" ? "premium" : "pro",
  });
}

async function handleInvoicePaymentSucceeded(invoice) {
  console.log(`[Invoice] ID: ${invoice.id}`);

  const customerId = invoice.customer;
  const subscriptionId = invoice.subscription;

  if (!subscriptionId) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = subscription.items.data[0]?.price?.id;
  const planInfo = getPlanInfo(priceId);

  if (planInfo) {
    await upsertProfile(customerId, null, {
      subscription_status: subscription.status,
      is_premium: planInfo.plan === "premium",
    });
  }
}

async function handleSubscriptionUpdated(subscription) {
  console.log(`[Subscription] Updated: ${subscription.id}`);

  const customerId = subscription.customer;
  const priceId = subscription.items.data[0]?.price?.id;
  const planInfo = getPlanInfo(priceId);

  if (planInfo) {
    await upsertProfile(customerId, null, {
      subscription_status: subscription.status,
      is_premium: planInfo.plan === "premium",
    });
  }
}

async function handleSubscriptionDeleted(subscription) {
  console.log(`[Subscription] Deleted: ${subscription.id}`);

  await upsertProfile(subscription.customer, null, {
    subscription_status: "canceled",
    is_premium: false,
  });
}

async function upsertProfile(customerId, customerEmail, updates) {
  try {
    // First try to update existing profile by stripe_customer_id
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();

    if (existingProfile) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ ...updates, stripe_customer_id: customerId })
        .eq("id", existingProfile.id);

      if (updateError) {
        console.error(`[Profile] Update failed:`, updateError);
      } else {
        console.log(`[Profile] Updated customer ${customerId}:`, updates);
      }
      return;
    }

    // If no profile exists and we have email, try to find by email
    if (customerEmail) {
      const { data: profileByEmail } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", customerEmail)
        .maybeSingle();

      if (profileByEmail) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ ...updates, stripe_customer_id: customerId })
          .eq("id", profileByEmail.id);

        if (updateError) {
          console.error(`[Profile] Update by email failed:`, updateError);
        } else {
          console.log(`[Profile] Updated by email ${customerEmail}:`, updates);
        }
        return;
      }
    }

    console.log(`[Profile] No existing profile found for ${customerId}, updates stored for next login`);
  } catch (err) {
    console.error(`[Profile] Upsert error:`, err);
  }
}
