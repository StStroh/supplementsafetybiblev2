/*
 * Verify Checkout Session + Sync Profile
 * Called from /welcome page after Stripe redirect
 * Requires authentication and updates profile with plan info
 */
const Stripe = require("stripe");
const { supabaseAdmin } = require('./_lib/supabaseAdmin.cjs');
const { PRICE_TO_PLAN_MAP } = require('./_lib/plan-map.cjs');

const SUPPORT_EMAIL = "support@supplementsafetybible.com";

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

async function verifySupabaseJWT(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }

  const token = authHeader.substring(7);
  const supabase = supabaseAdmin();

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    throw new Error('Invalid or expired token');
  }

  return user;
}

function determinePlanFromSession(checkoutSession) {
  try {
    if (!checkoutSession.line_items?.data?.[0]?.price?.id) {
      console.warn('[verify-checkout-session] No price ID found in session');
      return { plan: 'free', interval: 'none' };
    }

    const priceId = checkoutSession.line_items.data[0].price.id;
    const planInfo = PRICE_TO_PLAN_MAP[priceId];

    if (!planInfo) {
      console.warn('[verify-checkout-session] Unknown price ID:', priceId);
      return { plan: 'free', interval: 'none' };
    }

    return planInfo;
  } catch (err) {
    console.error('[verify-checkout-session] Error determining plan:', err);
    return { plan: 'free', interval: 'none' };
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, {});
  }

  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method Not Allowed" });
    }

    console.log('[verify-checkout-session] Starting verification');

    // Verify user authentication
    const user = await verifySupabaseJWT(event.headers.authorization);
    console.log('[verify-checkout-session] User verified:', user.email);

    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { session_id } = body;

    if (!session_id) {
      return json(400, { error: 'Missing session_id' });
    }

    console.log('[verify-checkout-session] Retrieving Stripe checkout session');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    // Retrieve checkout session with expanded data
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'line_items.data.price', 'customer', 'subscription'],
    });

    if (!checkoutSession) {
      throw new Error('Checkout session not found');
    }

    console.log('[verify-checkout-session] Session retrieved:', {
      status: checkoutSession.payment_status,
      customer: checkoutSession.customer,
      subscription: checkoutSession.subscription,
    });

    // Determine plan from price ID
    const planInfo = determinePlanFromSession(checkoutSession);
    console.log('[verify-checkout-session] Plan determined:', planInfo);

    // Get user's profile
    const supabase = supabaseAdmin();

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', user.email)
      .maybeSingle();

    if (profileError) {
      console.error('[verify-checkout-session] Profile fetch error:', profileError);
      throw new Error('Failed to fetch profile');
    }

    if (!profile) {
      throw new Error('Profile not found');
    }

    console.log('[verify-checkout-session] Profile found:', profile.email);

    // Extract customer and subscription IDs
    const customerId = typeof checkoutSession.customer === 'string'
      ? checkoutSession.customer
      : checkoutSession.customer?.id;

    const subscriptionId = typeof checkoutSession.subscription === 'string'
      ? checkoutSession.subscription
      : checkoutSession.subscription?.id;

    // Build update data
    const updateData = {
      role: planInfo.plan,
      subscription_status: checkoutSession.status === 'complete' ? 'active' : 'incomplete',
    };

    if (customerId) {
      updateData.stripe_customer_id = customerId;
    }

    if (subscriptionId) {
      updateData.stripe_subscription_id = subscriptionId;

      // Add billing period end if available
      if (checkoutSession.subscription?.current_period_end) {
        updateData.current_period_end = checkoutSession.subscription.current_period_end;
      }
    }

    // Add customer name if available and not already set
    const customerName = checkoutSession.customer_details?.name || null;
    if (customerName && !profile.name) {
      updateData.name = customerName;
    }

    console.log('[verify-checkout-session] Updating profile with:', {
      ...updateData,
      stripe_customer_id: updateData.stripe_customer_id ? '✓' : '✗',
      stripe_subscription_id: updateData.stripe_subscription_id ? '✓' : '✗',
    });

    // Update profile in database
    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('email', user.email);

    if (updateError) {
      console.error('[verify-checkout-session] Profile update error:', updateError);
      throw new Error('Failed to update profile');
    }

    console.log('[verify-checkout-session] Profile updated successfully');

    return json(200, {
      ok: true,
      plan: planInfo.plan,
      interval: planInfo.interval,
      subscription_status: updateData.subscription_status,
      customer_email: checkoutSession.customer_details?.email || user.email,
      customer_name: customerName,
    });

  } catch (error) {
    console.error('[verify-checkout-session] Error:', error);

    const statusCode = error.message.includes('Authorization') || error.message.includes('token') ? 401 : 500;

    return json(statusCode, {
      error: error.message || "Failed to verify checkout session",
      support: SUPPORT_EMAIL
    });
  }
};
