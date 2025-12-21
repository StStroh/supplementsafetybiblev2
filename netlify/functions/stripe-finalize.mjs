import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { session_id, user_id } = JSON.parse(event.body || '{}');

    if (!session_id || !user_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing session_id or user_id' }),
      };
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      console.error('Missing STRIPE_SECRET_KEY');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    if (!stripeKey.startsWith('sk_live_')) {
      console.error('Stripe key is not LIVE mode');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Invalid Stripe configuration' }),
      };
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });

    console.log('[stripe-finalize] Retrieving session:', session_id, 'for user:', user_id);

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription'],
    });

    if (!session) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Session not found' }),
      };
    }

    const isPaid = session.payment_status === 'paid';
    const subscription = session.subscription;
    const subscriptionStatus = typeof subscription === 'object' ? subscription.status : null;

    console.log('[stripe-finalize] Session status:', {
      payment_status: session.payment_status,
      subscription_status: subscriptionStatus,
    });

    if (!isPaid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Payment not completed', payment_status: session.payment_status }),
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database configuration error' }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    const metadata = session.metadata || {};
    const plan = metadata.plan || 'pro';
    const stripeCustomerId = session.customer;
    const stripeSubscriptionId = typeof subscription === 'object' ? subscription.id : subscription;
    const currentPeriodEnd = typeof subscription === 'object' && subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null;

    const updateData = {
      is_premium: true,
      plan,
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId,
      subscription_status: subscriptionStatus || 'active',
      current_period_end: currentPeriodEnd,
      premium_since: new Date().toISOString(),
    };

    if (metadata.started_trial === 'true') {
      updateData.trial_used = true;
    }

    console.log('[stripe-finalize] Updating profile for user:', user_id, updateData);

    const { data, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user_id);

    if (error) {
      console.error('[stripe-finalize] Database update failed:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database update failed', details: error.message }),
      };
    }

    console.log('[stripe-finalize] Success: Premium access granted for user:', user_id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, plan, subscription_status: subscriptionStatus }),
    };
  } catch (err) {
    console.error('[stripe-finalize] Error:', err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: err.message }),
    };
  }
}
