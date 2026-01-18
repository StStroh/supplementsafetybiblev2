const Stripe = require('stripe');
const { supabaseAdmin } = require('./_lib/supabaseClient.cjs');

const ok = (data, origin) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
  },
  body: JSON.stringify(data),
});

const fail = (code, msg, origin) => ({
  statusCode: code,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
  },
  body: JSON.stringify({ error: msg }),
});

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || 'https://supplementsafetybible.com';

  try {
    if (event.httpMethod === 'OPTIONS') return ok({ ok: true }, origin);
    if (event.httpMethod !== 'POST') return fail(405, 'Method not allowed', origin);

    const { session_id } = JSON.parse(event.body || '{}');
    if (!session_id) {
      return fail(400, 'Missing session_id', origin);
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.error('❌ Missing STRIPE_SECRET_KEY');
      return fail(500, 'Missing STRIPE_SECRET_KEY', origin);
    }

    const stripe = new Stripe(key, { apiVersion: '2024-06-20' });

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription', 'subscription.items.data.price']
    });

    if (session.payment_status !== 'paid') {
      return fail(400, 'Payment not completed', origin);
    }

    if (!session.subscription) {
      return fail(400, 'No subscription found', origin);
    }

    const sub = typeof session.subscription === 'string'
      ? await stripe.subscriptions.retrieve(session.subscription, { expand: ['items.data.price'] })
      : session.subscription;

    const priceId = sub.items.data[0].price.id;
    const PRICE_PRO_MONTHLY = process.env.PRICE_PRO_MONTHLY;
    const PRICE_PREMIUM_MONTHLY = process.env.PRICE_PREMIUM_MONTHLY;

    let tier = 'pro';
    if (priceId === PRICE_PREMIUM_MONTHLY) {
      tier = 'premium';
    } else if (priceId === PRICE_PRO_MONTHLY) {
      tier = 'pro';
    } else {
      const metadata = session.metadata || {};
      tier = metadata.plan === 'premium' ? 'premium' : 'pro';
    }

    const customerId = session.customer;
    const sb = supabaseAdmin();

    const { data: profile } = await sb
      .from('profiles')
      .select('id, email')
      .eq('stripe_customer_id', customerId)
      .maybeSingle();

    if (!profile) {
      return fail(404, 'Profile not found', origin);
    }

    const isPremium = tier === 'pro' || tier === 'premium';
    await sb.from('profiles').update({
      stripe_subscription_id: sub.id,
      plan: sub.status === 'trialing' ? `${tier}_trial` : tier,
      trial_end: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
      trial_used: true,
      is_premium: isPremium || sub.status === 'trialing',
      subscription_status: sub.status,
      current_period_end: sub.current_period_end,
    }).eq('id', profile.id);

    console.log('✅ Profile updated:', profile.id, 'tier:', tier);

    return ok({ tier, status: 'confirmed' }, origin);
  } catch (err) {
    console.error('❌ stripe-confirm error:', err.message);
    return fail(500, 'Server error', origin);
  }
};
