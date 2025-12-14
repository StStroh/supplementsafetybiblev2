const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PLAN_PRICE_MAP } = require('../../src/lib/stripe/plan-map.cjs');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers: corsHeaders, body: 'Method not allowed' };
    }

    const { plan } = JSON.parse(event.body || '{}');
    if (!['pro', 'premium'].includes(plan)) {
      return { statusCode: 400, headers: corsHeaders, body: 'Invalid plan' };
    }

    const priceId = plan === 'pro'
      ? (process.env.PRICE_PRO_MONTHLY || PLAN_PRICE_MAP.PRO_MONTHLY)
      : (process.env.PRICE_PREMIUM_MONTHLY || PLAN_PRICE_MAP.PREMIUM_MONTHLY);

    if (!priceId) {
      return { statusCode: 500, headers: corsHeaders, body: 'Missing price ID' };
    }

    const origin = event.headers.origin || event.headers.Origin || 'https://supplementsafetybible.com';
    const successUrl = process.env.CHECKOUT_SUCCESS_URL || `${origin}/account?welcome=1`;
    const cancelUrl = process.env.CHECKOUT_CANCEL_URL || `${origin}/pricing?canceled=1`;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 14,
        metadata: { plan }
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('create-checkout error', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Checkout failed', message: err.message })
    };
  }
};
