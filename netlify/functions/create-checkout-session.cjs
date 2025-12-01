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

const fail = (code, msg, origin, extra={}) => ({
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
    if (!key) return fail(500, 'Missing STRIPE_SECRET_KEY', origin);

    const stripe = new Stripe(key, { apiVersion: '2024-06-20' });

    let body = {};
    try { body = JSON.parse(event.body || '{}'); }
    catch { return fail(400, 'Invalid JSON body', origin); }

    const tier = body.tier;
    if (!tier) {
      return fail(400, 'Missing required parameter: tier', origin);
    }

    const tierMap = {
      'pro_monthly': PLAN_PRICE_MAP.PRO_MONTHLY,
      'pro_annual': PLAN_PRICE_MAP.PRO_YEARLY,
      'premium_monthly': PLAN_PRICE_MAP.PREMIUM_MONTHLY,
      'premium_annual': PLAN_PRICE_MAP.PREMIUM_YEARLY,
    };

    const priceId = tierMap[tier];
    if (!priceId) {
      return fail(400, `Invalid tier: "${tier}". Valid options: pro_monthly, pro_annual, premium_monthly, premium_annual`, origin, { tier });
    }

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
        return fail(400, `Price mismatch for "${tier}": expected ${EXPECTED[tier]} cents but price ID ${priceId} is ${amount} cents`, origin, { tier, priceId, amount });
      }
    } catch (err) {
      return fail(500, 'Failed to verify price with Stripe', origin, { details: err.message });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: priceId, quantity: 1 }],
        allow_promotion_codes: true,
        success_url: `${origin}/premium/thanks?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing?cancelled=1`,
      });
      return ok({ sessionId: session.id, url: session.url }, origin);
    } catch (err) {
      return fail(500, 'Stripe error', origin, { details: err.message });
    }
  } catch (err) {
    return fail(500, 'Server error', origin, { details: err.message });
  }
};
