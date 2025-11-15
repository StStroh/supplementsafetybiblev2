import Stripe from 'stripe';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { priceIdKey } = JSON.parse(event.body);

    if (!priceIdKey) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'priceIdKey is required' }),
      };
    }

    const priceId = process.env[priceIdKey];

    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Price ID not found for key: ${priceIdKey}` }),
      };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${event.headers.origin || 'https://yourdomain.com'}/?success=true`,
      cancel_url: `${event.headers.origin || 'https://yourdomain.com'}/?canceled=true`,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
