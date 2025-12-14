const Stripe = require('stripe');
const { PLAN_PRICE_MAP } = require('../../src/lib/stripe/plan-map.cjs');

const ok = (data, origin) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
  },
  body: JSON.stringify(data),
});

const fail = (code, msg, origin, extra = {}) => ({
  statusCode: code,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
  },
  body: JSON.stringify({ error: { message: msg, ...extra } }),
});

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || 'https://supplementsafetybible.com';

  try {
    if (event.httpMethod === 'OPTIONS') return ok({ ok: true }, origin);
    if (event.httpMethod !== 'POST') return fail(405, 'Method not allowed', origin);

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.error('❌ Missing STRIPE_SECRET_KEY');
      return fail(500, 'Missing STRIPE_SECRET_KEY - check Netlify environment variables', origin);
    }

    if (!key.startsWith('sk_live_')) {
      console.error('❌ Stripe key mismatch: expecting LIVE key (sk_live_) but got:', key.substring(0, 10));
      return fail(500, 'Stripe key must be LIVE mode (sk_live_). Update your Netlify environment variables.', origin);
    }

    const stripe = new Stripe(key, { apiVersion: '2024-06-20' });

    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      return fail(400, 'Invalid JSON body', origin);
    }

    let tier = body.tier;

    if (!tier && body.plan && body.cadence) {
      const cadenceSuffix = body.cadence === 'annual' ? 'annual' : 'monthly';
      tier = `${body.plan}_${cadenceSuffix}`;
    }

    if (!tier && body.interval) {
      const intervalSuffix = body.interval === 'year' ? 'annual' : 'monthly';
      tier = `premium_${intervalSuffix}`;
    }

    if (!tier) {
      return fail(400, 'Missing required parameter: tier, or plan+cadence, or interval', origin);
    }

    const tierMap = {
      'pro_monthly': PLAN_PRICE_MAP.PRO_MONTHLY,
      'pro_annual': PLAN_PRICE_MAP.PRO_YEARLY,
      'premium_monthly': PLAN_PRICE_MAP.PREMIUM_MONTHLY,
      'premium_annual': PLAN_PRICE_MAP.PREMIUM_YEARLY,
    };

    const priceId = tierMap[tier];
    if (!priceId) {
      console.error('❌ Invalid tier received:', tier);
      return fail(400, `Invalid tier: "${tier}". Valid options: pro_monthly, pro_annual, premium_monthly, premium_annual`, origin, { tier });
    }

    console.log('✅ Creating checkout session for tier:', tier, 'priceId:', priceId);

    const EXPECTED = {
      pro_monthly: 1499,
      pro_annual: 14900,
      premium_monthly: 2499,
      premium_annual: 24900,
    };

    try {
      const stripePrice = await stripe.prices.retrieve(priceId);
      const amount = stripePrice.unit_amount;

      if (EXPECTED[tier] && amount !== EXPECTED[tier]) {
        console.error('❌ Price mismatch:', tier, 'expected:', EXPECTED[tier], 'actual:', amount);
        return fail(400, `Price mismatch for "${tier}": expected ${EXPECTED[tier]} cents but price ID ${priceId} is ${amount} cents`, origin, { tier, priceId, amount });
      }

      console.log('✅ Price verified:', tier, '=', amount, 'cents');
    } catch (err) {
      console.error('❌ Failed to verify price:', err.message);
      return fail(500, 'Failed to verify price with Stripe', origin, { details: err.message });
    }

    const metadata = {
      plan: tier.split('_')[0],
      cadence: tier.split('_')[1],
      user_id: body.user?.id || '',
      email: body.user?.email || '',
    };

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: priceId, quantity: 1 }],
        allow_promotion_codes: true,
        automatic_tax: { enabled: true },
        billing_address_collection: 'auto',
        subscription_data: {
          trial_period_days: 14,
          metadata: metadata,
        },
        success_url: `${origin}/premium/thanks?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing?cancelled=1`,
        metadata,
      });

      console.log('✅ Checkout session created:', session.id);
      return ok({ sessionId: session.id, url: session.url }, origin);
    } catch (err) {
      console.error('❌ Stripe checkout error:', err.message);
      return fail(500, 'Stripe error', origin, { details: err.message });
    }
  } catch (err) {
    console.error('❌ Server error:', err.message);
    return fail(500, 'Server error', origin, { details: err.message });
  }
};
