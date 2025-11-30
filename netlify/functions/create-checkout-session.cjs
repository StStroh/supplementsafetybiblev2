const Stripe = require('stripe');

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

  if (event.httpMethod === 'OPTIONS') return ok({ ok: true }, origin);
  if (event.httpMethod !== 'POST') return fail(405, 'Method not allowed', origin);

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return fail(500, 'Missing STRIPE_SECRET_KEY', origin);

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch { return fail(400, 'Invalid JSON body', origin); }

  const tier = body.tier;
  const prices = {
    pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
    pro_annual: process.env.STRIPE_PRICE_PRO_ANNUAL,
    premium_monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
    premium_annual: process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
  };

  if (!tier || !prices[tier]) {
    return fail(400, `Unknown tier "${tier}" or missing price env`, origin, { tier, prices_present: Object.keys(prices).filter(k => !!prices[k]) });
  }

  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: prices[tier], quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/premium/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?cancelled=1`,
    });
    return ok({ sessionId: session.id }, origin);
  } catch (err) {
    return fail(500, 'Stripe error', origin, { details: err.message });
  }
};
