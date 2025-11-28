const Stripe = require('stripe');
const { supabaseAdmin } = require('./_lib/supabaseAdmin');
const { upsertEntitlement } = require('./_lib/upsertEntitlement');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const sig = event.headers['stripe-signature'];
  if (!sig || !endpointSecret) {
    return { statusCode: 400, body: 'Missing signature or secret' };
  }

  const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;

  let evt;
  try {
    evt = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return { statusCode: 400, body: `Webhook signature verification failed: ${err.message}` };
  }

  const type = evt.type;

  const handleSessionCompleted = async () => {
    const session = await stripe.checkout.sessions.retrieve(evt.data.object.id, {
      expand: ['subscription', 'customer']
    });
    const email = session.customer_details?.email || session.customer_email || session.customer?.email || null;
    const stripe_customer_id = typeof session.customer === 'string' ? session.customer : session.customer?.id || null;

    const subscription =
      typeof session.subscription === 'string'
        ? await stripe.subscriptions.retrieve(session.subscription)
        : session.subscription;

    const subscription_status = subscription?.status || 'active';
    const current_period_end =
      subscription?.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null;

    await upsertEntitlement({
      supabaseAdmin,
      email,
      stripe_customer_id,
      subscription_id: subscription?.id || null,
      subscription_status,
      current_period_end,
    });
  };

  const handleInvoicePaymentSucceeded = async () => {
    const invoice = evt.data.object;
    const stripe_customer_id = invoice.customer;
    const subscription_id = invoice.subscription;
    const subscription = await stripe.subscriptions.retrieve(subscription_id);

    const current_period_end =
      subscription?.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null;

    const customer = await stripe.customers.retrieve(stripe_customer_id);
    const email = customer?.email || null;

    await upsertEntitlement({
      supabaseAdmin,
      email,
      stripe_customer_id,
      subscription_id,
      subscription_status: subscription?.status || 'active',
      current_period_end,
    });
  };

  const handleSubscriptionUpdate = async () => {
    const sub = evt.data.object;
    const stripe_customer_id = sub.customer;
    const subscription_status = sub.status;

    const current_period_end =
      sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;

    let email = null;
    try {
      const customer = await stripe.customers.retrieve(stripe_customer_id);
      email = customer?.email || null;
    } catch {}

    await upsertEntitlement({
      supabaseAdmin,
      email,
      stripe_customer_id,
      subscription_id: sub.id,
      subscription_status,
      current_period_end,
    });
  };

  try {
    switch (type) {
      case 'checkout.session.completed':
        await handleSessionCompleted();
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded();
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'invoice.payment_failed':
        await handleSubscriptionUpdate();
        break;

      default:
        break;
    }
  } catch (e) {
    console.error('Webhook handler error', e);
    return { statusCode: 500, body: 'Webhook handler error' };
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
