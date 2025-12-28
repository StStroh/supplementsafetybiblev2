/*
 * Stripe Session Verification and Recovery
 * Handles missing session_id in /welcome redirect by verifying payment status
 * and granting access accordingly
 */

const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type, authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  try {
    // CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json; charset=utf-8' },
        body: '',
      };
    }

    if (event.httpMethod !== 'POST') {
      return json(405, { ok: false, error: 'Method not allowed' });
    }

    // Validate environment
    if (!process.env.STRIPE_SECRET_KEY) {
      return json(500, { ok: false, error: 'Stripe not configured' });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return json(500, { ok: false, error: 'Supabase not configured' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );

    // Parse request body
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (parseError) {
      return json(400, { ok: false, error: 'Invalid JSON' });
    }

    const { session_id } = body;

    if (!session_id || typeof session_id !== 'string') {
      return json(400, {
        ok: false,
        error: 'session_id is required',
      });
    }

    console.log('[stripe-verify-session] Verifying session:', session_id);

    // Retrieve session from Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(session_id);
    } catch (stripeError) {
      console.error('[stripe-verify-session] Stripe error:', stripeError.message);
      return json(400, {
        ok: false,
        error: 'Invalid or expired session',
        code: stripeError.code,
      });
    }

    console.log('[stripe-verify-session] Session retrieved:', {
      status: session.status,
      payment_status: session.payment_status,
      customer: session.customer,
      subscription: session.subscription,
    });

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      return json(200, {
        ok: false,
        error: 'Payment not completed',
        status: session.payment_status,
      });
    }

    // Get customer email
    const customerEmail = session.customer_details?.email || session.customer_email;
    if (!customerEmail) {
      return json(500, {
        ok: false,
        error: 'Customer email not found in session',
      });
    }

    // Get subscription details
    let subscription = null;
    if (session.subscription) {
      try {
        subscription = await stripe.subscriptions.retrieve(session.subscription);
      } catch (subError) {
        console.error('[stripe-verify-session] Subscription retrieval error:', subError.message);
      }
    }

    // Determine plan from subscription
    let plan = 'free';
    if (subscription && subscription.items?.data?.length > 0) {
      const priceId = subscription.items.data[0].price.id;

      // Map price IDs to plans
      if (priceId === process.env.VITE_STRIPE_PRICE_PRO || priceId === process.env.VITE_STRIPE_PRICE_PRO_ANNUAL) {
        plan = 'pro';
      } else if (priceId === process.env.VITE_STRIPE_PRICE_PREMIUM || priceId === process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL) {
        plan = 'premium';
      }
    }

    console.log('[stripe-verify-session] Determined plan:', plan);

    // Update or create profile
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', customerEmail)
      .maybeSingle();

    if (profileError) {
      console.error('[stripe-verify-session] Profile query error:', profileError);
    }

    let profileId;
    if (existingProfile) {
      // Update existing profile
      profileId = existingProfile.id;
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          role: plan,
          stripe_customer_id: session.customer,
          subscription_status: subscription?.status || 'active',
          subscription_id: session.subscription,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profileId);

      if (updateError) {
        console.error('[stripe-verify-session] Profile update error:', updateError);
      }
    } else {
      // Create new profile (guest checkout scenario)
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          email: customerEmail,
          role: plan,
          stripe_customer_id: session.customer,
          subscription_status: subscription?.status || 'active',
          subscription_id: session.subscription,
        })
        .select()
        .single();

      if (insertError) {
        console.error('[stripe-verify-session] Profile creation error:', insertError);
        return json(500, {
          ok: false,
          error: 'Failed to create profile',
        });
      }

      profileId = newProfile.id;
    }

    console.log('[stripe-verify-session] Profile updated:', profileId);

    return json(200, {
      ok: true,
      verified: true,
      plan,
      customer_email: customerEmail,
      subscription_status: subscription?.status || 'active',
    });

  } catch (e) {
    console.error('[stripe-verify-session] Error:', e);
    return json(500, {
      ok: false,
      error: e?.message || 'Internal server error',
    });
  }
};
