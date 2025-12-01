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

    const interval = body.interval || 'month';

    let priceId;
    if (interval === 'year') {
      priceId = PLAN_PRICE_MAP.PREMIUM_YEARLY;
    } else {
      priceId = PLAN_PRICE_MAP.PREMIUM_MONTHLY;
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
