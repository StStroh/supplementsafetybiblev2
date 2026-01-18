const Stripe = require('stripe');

const ok = (data, origin) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
  },
  body: JSON.stringify(data),
});

const fail = (code, msg, origin, extra = {}) => ({
  statusCode: code,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
  },
  body: JSON.stringify({ error: { message: msg, ...extra } }),
});

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || '*';

  try {
    if (event.httpMethod === 'OPTIONS') return ok({ ok: true }, origin);

    const key = process.env.STRIPE_SECRET_KEY;
    const checks = {
      hasKey: !!key,
      keyPrefix: key ? key.substring(0, 8) : 'MISSING',
      isLive: key ? key.startsWith('sk_live_') : false,
      isTest: key ? key.startsWith('sk_test_') : false,
      environment: process.env.NODE_ENV || 'unknown',
      timestamp: new Date().toISOString(),
    };

    if (!key) {
      return fail(500, 'STRIPE_SECRET_KEY not configured', origin, checks);
    }

    if (key.startsWith('sk_test_')) {
      checks.warning = 'Using TEST mode key in production';
    }

    const stripe = new Stripe(key, { apiVersion: '2024-06-20' });

    try {
      const account = await stripe.accounts.retrieve();
      checks.accountId = account.id;
      checks.accountType = account.type;
      checks.chargesEnabled = account.charges_enabled;
      checks.payoutsEnabled = account.payouts_enabled;
    } catch (err) {
      checks.accountError = err.message;
    }

    const priceIds = {
      PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY,
      PRO_ANNUAL: process.env.STRIPE_PRICE_PRO_ANNUAL,
      PREMIUM_MONTHLY: process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
      PREMIUM_ANNUAL: process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
    };

    checks.priceIds = priceIds;
    checks.allPricesConfigured = Object.values(priceIds).every(p => !!p);

    const priceChecks = {};
    for (const [name, priceId] of Object.entries(priceIds)) {
      if (priceId) {
        try {
          const price = await stripe.prices.retrieve(priceId);
          priceChecks[name] = {
            id: priceId,
            active: price.active,
            amount: price.unit_amount,
            currency: price.currency,
            interval: price.recurring?.interval || 'one-time',
          };
        } catch (err) {
          priceChecks[name] = {
            id: priceId,
            error: err.message,
          };
        }
      } else {
        priceChecks[name] = { error: 'Not configured' };
      }
    }

    checks.prices = priceChecks;

    return ok({
      status: 'healthy',
      ...checks,
    }, origin);
  } catch (err) {
    console.error('Health check error:', err);
    return fail(500, 'Health check failed', origin, { details: err.message });
  }
};
