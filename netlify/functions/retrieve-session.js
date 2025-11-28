const Stripe = require('stripe');
const { supabaseAdmin } = require('./_lib/supabaseAdmin');
const { upsertEntitlement } = require('./_lib/upsertEntitlement');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  const session_id = event.queryStringParameters?.session_id;
  if (!session_id) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing session_id' }) };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer', 'subscription']
    });

    const status = session.status;
    const payment_status = session.payment_status;

    const customer_email =
      session.customer_details?.email || session.customer_email || session.customer?.email || null;

    const stripe_customer_id =
      typeof session.customer === 'string' ? session.customer : session.customer?.id || null;

    const subscription_status =
      typeof session.subscription === 'string'
        ? null
        : session.subscription?.status || null;

    const current_period_end =
      typeof session.subscription === 'string'
        ? null
        : session.subscription?.current_period_end
        ? new Date(session.subscription.current_period_end * 1000).toISOString()
        : null;

    if (status === 'complete' && payment_status === 'paid') {
      await upsertEntitlement({
        supabaseAdmin,
        email: customer_email,
        stripe_customer_id,
        subscription_id:
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id || null,
        subscription_status: subscription_status || 'active',
        current_period_end,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status,
        payment_status,
        customer_email,
        subscription_status,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
