const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const { customerId, return_url } = JSON.parse(event.body || '{}');
    if (!customerId) return { statusCode: 400, body: 'Missing customerId' };

    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: return_url || process.env.PORTAL_RETURN_URL || 'https://yourdomain/'
    });

    return { statusCode: 200, body: JSON.stringify({ url: portal.url }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
