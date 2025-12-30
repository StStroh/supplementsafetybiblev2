/*
 * Billing Success - NO AUTH REQUIRED
 * Called from /billing/success after Stripe redirect
 * Provisions access via service role, returns validated email + plan
 *
 * Flow: session_id → Stripe API → customer email → Supabase upsert → return email
 */
const Stripe = require("stripe");
const { supabaseAdmin } = require('./_lib/supabaseAdmin.cjs');
const { PRICE_TO_PLAN_MAP } = require('./_lib/plan-map.cjs');

const SUPPORT_EMAIL = "support@supplementsafetybible.com";

// Boot verification log (safe for production)
const supabaseProjectRef = process.env.SUPABASE_URL ? process.env.SUPABASE_URL.split('.')[0].split('//')[1].slice(-6) : 'none';
console.log('[BillingSuccessFn] boot ok | supabase:', supabaseProjectRef);

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function determinePlanFromSession(checkoutSession) {
  try {
    if (!checkoutSession.line_items?.data?.[0]?.price?.id) {
      console.warn('[billing-success] No price ID found in session');
      return { plan: 'premium', tier: 'premium', interval: 'monthly' };
    }

    const priceId = checkoutSession.line_items.data[0].price.id;
    const planInfo = PRICE_TO_PLAN_MAP[priceId];

    if (!planInfo) {
      console.warn('[billing-success] Unknown price ID:', priceId);
      return { plan: 'premium', tier: 'premium', interval: 'monthly' };
    }

    return {
      plan: planInfo.plan,
      tier: planInfo.plan,
      interval: planInfo.interval
    };
  } catch (err) {
    console.error('[billing-success] Error determining plan:', err);
    return { plan: 'premium', tier: 'premium', interval: 'monthly' };
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  try {
    if (event.httpMethod !== "GET") {
      return json(405, { error: "Method Not Allowed. Use GET." });
    }

    const params = event.queryStringParameters || {};
    const sessionId = params.session_id;

    console.log('[billing-success] ========== REQUEST ==========');
    console.log('[billing-success] session_id:', sessionId ? '✓ present' : '✗ MISSING');

    if (!sessionId) {
      console.error('[billing-success] ❌ Missing session_id parameter');
      return json(400, {
        error: 'Missing session_id parameter',
        hint: 'Include ?session_id=cs_xxx in URL',
        support: SUPPORT_EMAIL
      });
    }

    // Validate Stripe configuration
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('[billing-success] ❌ STRIPE_SECRET_KEY not configured');
      return json(500, {
        error: 'Payment system not configured',
        support: SUPPORT_EMAIL
      });
    }

    console.log('[billing-success] Initializing Stripe client');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    // Retrieve checkout session with expanded data
    console.log('[billing-success] Retrieving Stripe session:', sessionId);
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price', 'customer', 'subscription'],
    });

    if (!checkoutSession) {
      console.error('[billing-success] ❌ Session not found');
      return json(404, {
        error: 'Checkout session not found',
        support: SUPPORT_EMAIL
      });
    }

    console.log('[billing-success] Session retrieved:', {
      id: checkoutSession.id,
      status: checkoutSession.status,
      payment_status: checkoutSession.payment_status,
      mode: checkoutSession.mode,
    });

    // Extract and validate email
    const email = checkoutSession.customer_details?.email;
    console.log('[billing-success] Customer email:', email ? '✓ present' : '✗ MISSING');

    if (!isValidEmail(email)) {
      console.error('[billing-success] ❌ Invalid or missing email:', email);
      return json(400, {
        error: 'Invalid email address in checkout session',
        hint: 'Contact support with your order confirmation',
        support: SUPPORT_EMAIL
      });
    }

    console.log('[billing-success] ✅ Email validated:', email);

    // Determine plan from price
    const planInfo = determinePlanFromSession(checkoutSession);
    console.log('[billing-success] Plan determined:', planInfo);

    // Extract customer and subscription IDs
    const customerId = typeof checkoutSession.customer === 'string'
      ? checkoutSession.customer
      : checkoutSession.customer?.id;

    const subscriptionId = typeof checkoutSession.subscription === 'string'
      ? checkoutSession.subscription
      : checkoutSession.subscription?.id;

    const customerName = checkoutSession.customer_details?.name || null;

    console.log('[billing-success] Stripe IDs:', {
      customer: customerId ? '✓' : '✗',
      subscription: subscriptionId ? '✓' : '✗',
      name: customerName ? '✓' : '✗',
    });

    // Upsert profile in Supabase using service role
    console.log('[billing-success] Initializing Supabase admin client');
    const supabase = supabaseAdmin();

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id, email, tier, subscription_status')
      .eq('email', email)
      .maybeSingle();

    console.log('[billing-success] Existing profile:', existingProfile ? '✓ found' : '✗ not found');

    // Check if webhook already provisioned access
    const { data: webhookProvisioned } = await supabase
      .from('profiles')
      .select('id, provisioned_via, provisioned_by_checkout_session')
      .eq('email', email)
      .eq('provisioned_by_checkout_session', sessionId)
      .maybeSingle();

    if (webhookProvisioned && webhookProvisioned.provisioned_via === 'webhook') {
      console.log('[billing-success] ✅ Already provisioned by webhook, returning existing data');

      return json(200, {
        ok: true,
        email: email,
        plan: planInfo.plan,
        tier: planInfo.tier,
        interval: planInfo.interval,
        subscription_status: 'active',
        customer_name: customerName,
        provisioned_via: 'webhook',
        note: 'Access already granted by webhook (failsafe provisioning)'
      });
    }

    const profileData = {
      email: email,
      tier: planInfo.tier,
      role: planInfo.plan,
      subscription_status: checkoutSession.status === 'complete' ? 'active' : 'incomplete',
      stripe_customer_id: customerId || null,
      stripe_subscription_id: subscriptionId || null,
      provisioned_by_checkout_session: sessionId,
      provisioned_via: 'success_page',
      last_provisioned_at: new Date().toISOString(),
    };

    if (customerName) {
      profileData.name = customerName;
    }

    if (subscriptionId && checkoutSession.subscription?.current_period_end) {
      profileData.current_period_end = checkoutSession.subscription.current_period_end;
    }

    console.log('[billing-success] Upserting profile:', {
      email: profileData.email,
      tier: profileData.tier,
      status: profileData.subscription_status,
    });

    // Upsert profile
    const { data: upsertedProfile, error: upsertError } = await supabase
      .from('profiles')
      .upsert(profileData, {
        onConflict: 'email',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (upsertError) {
      console.error('[billing-success] ❌ Upsert error:', upsertError);
      return json(500, {
        error: 'Failed to provision access',
        details: upsertError.message,
        support: SUPPORT_EMAIL
      });
    }

    console.log('[billing-success] ✅ Profile upserted successfully');

    // Return validated data to frontend
    return json(200, {
      ok: true,
      email: email,
      plan: planInfo.plan,
      tier: planInfo.tier,
      interval: planInfo.interval,
      subscription_status: profileData.subscription_status,
      customer_name: customerName,
      isTrialing: checkoutSession.subscription?.status === 'trialing',
    });

  } catch (error) {
    console.error('[billing-success] ❌ ============ ERROR ============');
    console.error('[billing-success] Message:', error.message);
    console.error('[billing-success] Type:', error.constructor?.name);
    console.error('[billing-success] Stack:', error.stack);
    console.error('[billing-success] ====================================');

    // Stripe-specific errors
    if (error.type === 'StripeInvalidRequestError') {
      return json(400, {
        error: 'Invalid checkout session',
        hint: 'The session may have expired. Please start a new checkout.',
        support: SUPPORT_EMAIL
      });
    }

    return json(500, {
      error: error.message || "Failed to process checkout",
      support: SUPPORT_EMAIL
    });
  }
};
