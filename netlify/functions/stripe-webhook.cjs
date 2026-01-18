/*
 * ⚠️ FAILSAFE WEBHOOK PROVISIONING
 *
 * This webhook GUARANTEES access provisioning even if user closes browser after payment.
 *
 * CRITICAL: This is the PRIMARY provisioning mechanism. Success page is secondary/optional.
 * Changes here affect customer access to premium features.
 *
 * Updated: 2025-12-30 - Failsafe provisioning with idempotency tracking
 * Previous: 2025-12-26 - Added guest checkout support
 * Verified working: 2025-12-14
 * See: /docs/BILLING_FLOW_LOCKED.md
 */
'use strict';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');
const { getPlanInfo } = require('./_lib/plan-map.cjs');
const { trackPurchase } = require('./_lib/tiktokTracking.cjs');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const SITE_URL = process.env.SITE_URL || 'https://supplementsafetybible.com';

// Boot verification log (safe for production)
const supabaseProjectRef = process.env.SUPABASE_URL ? process.env.SUPABASE_URL.split('.')[0].split('//')[1].slice(-6) : 'none';
console.log('[StripeWebhook] boot ok | supabase:', supabaseProjectRef);

// Email validation
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Track webhook event for idempotency
async function trackEvent(eventId, eventType, checkoutSessionId, customerId, email, status = 'processing', error = null, rawData = {}) {
  const { error: insertError } = await supabase
    .from('stripe_events')
    .insert({
      id: eventId,
      type: eventType,
      checkout_session_id: checkoutSessionId,
      customer_id: customerId,
      email: email,
      status: status,
      processed_at: status === 'completed' ? new Date().toISOString() : null,
      error: error,
      raw_data: rawData,
    });

  if (insertError) {
    // If duplicate event ID, it's already processed - this is OK
    if (insertError.code === '23505') {
      console.log('[StripeWebhook] Event already processed:', eventId);
      return { duplicate: true };
    }
    console.error('[StripeWebhook] Failed to track event:', insertError);
  }

  return { duplicate: false };
}

// Legacy event logging (keep for compatibility)
async function logEvent(id, type){
  const { error }=await supabase.from('events_log').insert({id,type}).select().single();
  if(error&&error.code!=='23505') throw error;
}

async function getUserByCustomer(c){
  const { data }=await supabase.from('profiles').select('*').eq('stripe_customer_id',c).maybeSingle();
  return data;
}

async function getUserByEmail(e){
  const { data }=await supabase.from('profiles').select('*').eq('email',e).maybeSingle();
  return data;
}

async function getAuthUserByEmail(email) {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error || !data) return null;
  return data.users.find(u => u.email === email) || null;
}

async function createAuthUserAndSendMagicLink(email, customerName) {
  console.log('[webhook] Creating auth user for guest checkout:', email);

  try {
    // Check if auth user already exists
    let authUser = await getAuthUserByEmail(email);

    if (!authUser) {
      // Create auth user via admin API (password-less)
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          full_name: customerName || '',
          created_via: 'stripe_checkout',
          created_at: new Date().toISOString(),
        },
      });

      if (createError) {
        console.error('[webhook] Failed to create auth user:', createError);
        return null;
      }

      authUser = newUser.user;
      console.log('[webhook] Auth user created:', authUser.id);
    }

    // Send magic link via Supabase Auth
    const { error: linkError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.SITE_URL || 'https://supplementsafetybible.com'}/auth/callback`,
      },
    });

    if (linkError) {
      console.error('[webhook] Failed to send magic link:', linkError);
    } else {
      console.log('[webhook] Magic link sent to:', email);
    }

    return authUser;
  } catch (err) {
    console.error('[webhook] Error in createAuthUserAndSendMagicLink:', err);
    return null;
  }
}

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const body = event.isBase64Encoded ? Buffer.from(event.body,'base64') : Buffer.from(event.body||'');
  let stripeEvent;

  console.log('[StripeWebhook] ========== INCOMING WEBHOOK ==========');

  // Verify Stripe signature (CRITICAL: prevents fake webhooks)
  try{
    stripeEvent = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('[StripeWebhook] ✅ Signature verified');
  }catch(err){
    console.error('[StripeWebhook] ❌ Invalid signature:', err.message);
    return { statusCode:400, body:'Invalid signature' };
  }

  console.log('[StripeWebhook] Event type:', stripeEvent.type);
  console.log('[StripeWebhook] Event ID:', stripeEvent.id);

  // Legacy event logging
  await logEvent(stripeEvent.id, stripeEvent.type);
  const obj = stripeEvent.data.object;

  // ============================================================
  // HANDLE: checkout.session.completed (PRIMARY PROVISIONING)
  // ============================================================
  if (stripeEvent.type==='checkout.session.completed' && obj.subscription){
    console.log('[StripeWebhook] Processing checkout.session.completed:', obj.id);

    // Extract customer email
    const email = obj.customer_details?.email;
    const customerName = obj.customer_details?.name;
    const customerId = obj.customer;
    const subscriptionId = obj.subscription;
    const checkoutSessionId = obj.id;

    console.log('[StripeWebhook] Email:', email || 'MISSING');
    console.log('[StripeWebhook] Customer ID:', customerId);
    console.log('[StripeWebhook] Checkout Session ID:', checkoutSessionId);

    // Check idempotency: has this checkout session already been processed?
    const { data: existingEvent } = await supabase
      .from('stripe_events')
      .select('id, status')
      .eq('checkout_session_id', checkoutSessionId)
      .maybeSingle();

    if (existingEvent) {
      console.log('[StripeWebhook] ⚠️ Checkout session already processed:', existingEvent.status);
      return { statusCode: 200, body: JSON.stringify({ ok: true, message: 'Already processed' }) };
    }

    // Validate email (HARD STOP if invalid)
    if (!isValidEmail(email)) {
      console.error('[StripeWebhook] ❌ Invalid email:', email);
      await trackEvent(stripeEvent.id, stripeEvent.type, checkoutSessionId, customerId, email, 'failed', 'Invalid email format', obj);
      return { statusCode: 200, body: JSON.stringify({ error: 'Invalid email' }) };
    }

    console.log('[StripeWebhook] ✅ Email validated:', email);

    // Track this event as processing
    await trackEvent(stripeEvent.id, stripeEvent.type, checkoutSessionId, customerId, email, 'processing', null, { session: obj.id });

    try {
      // Retrieve subscription details
      const sub = await stripe.subscriptions.retrieve(subscriptionId, { expand:['items.data.price'] });
      const priceId = sub.items.data[0].price.id;
      const planInfo = getPlanInfo(priceId);
      const plan = planInfo?.plan || 'starter';
      const isGuestCheckout = obj.metadata?.guest_checkout === 'true';

      console.log('[StripeWebhook] Plan:', plan);
      console.log('[StripeWebhook] Guest checkout:', isGuestCheckout);
      console.log('[StripeWebhook] Subscription status:', sub.status);

      // Try to find existing user by Stripe customer or email
      let user = await getUserByCustomer(customerId);
      if(!user && email) user = await getUserByEmail(email);

      const isPremium = plan === 'pro' || plan === 'premium';
      const updates = {
        stripe_customer_id: customerId,
        stripe_subscription_id: sub.id,
        plan: sub.status==='trialing' ? `${plan}_trial` : plan,
        trial_end: sub.trial_end ? new Date(sub.trial_end*1000) : null,
        trial_used: true,
        is_premium: isPremium || sub.status === 'trialing',
        subscription_status: sub.status,
        current_period_end: sub.current_period_end,
        role: plan,
        email,
        provisioned_by_checkout_session: checkoutSessionId,
        provisioned_via: 'webhook',
        last_provisioned_at: new Date().toISOString(),
      };

      // If no profile exists, create one
      if(!user){
        console.log('[StripeWebhook] No existing profile, creating new one');

        // For guest checkouts, create auth user and send magic link
        if (isGuestCheckout) {
          const authUser = await createAuthUserAndSendMagicLink(email, customerName);
          if (authUser) {
            updates.id = authUser.id; // Link profile to auth user
          }
        }

        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({...updates, activated_at: new Date()})
          .select()
          .single();

        if (insertError) {
          console.error('[StripeWebhook] ❌ Failed to create profile:', insertError);
          await trackEvent(stripeEvent.id, stripeEvent.type, checkoutSessionId, customerId, email, 'failed', insertError.message);
          return { statusCode: 200, body: JSON.stringify({ error: 'Profile creation failed' }) };
        }

        console.log('[StripeWebhook] ✅ Profile created:', newProfile.id);
      } else {
        // Update existing profile
        console.log('[StripeWebhook] Updating existing profile:', user.id);
        const { error: updateError } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);

        if (updateError) {
          console.error('[StripeWebhook] ❌ Failed to update profile:', updateError);
          await trackEvent(stripeEvent.id, stripeEvent.type, checkoutSessionId, customerId, email, 'failed', updateError.message);
          return { statusCode: 200, body: JSON.stringify({ error: 'Profile update failed' }) };
        }

        console.log('[StripeWebhook] ✅ Profile updated successfully');
      }

      // Track TikTok purchase event (non-blocking)
      try {
        const amountTotal = obj.amount_total ? obj.amount_total / 100 : 0; // Convert cents to dollars
        const currency = obj.currency || 'usd';

        if (amountTotal > 0) {
          const tiktokResult = await trackPurchase({
            email,
            currency,
            value: amountTotal,
            eventId: checkoutSessionId,
            ip: obj.customer_details?.address?.country || null,
            userAgent: null, // Not available in webhook
            ttclid: obj.metadata?.ttclid || null,
          });

          if (tiktokResult.success) {
            console.log('[StripeWebhook] ✅ TikTok purchase event tracked');
          } else {
            console.warn('[StripeWebhook] ⚠️ TikTok tracking failed (non-critical):', tiktokResult.error);
          }
        }
      } catch (tiktokError) {
        // TikTok tracking errors should NOT break the webhook
        console.error('[StripeWebhook] ⚠️ TikTok tracking error (non-critical):', tiktokError.message);
      }

      // Mark event as completed
      await trackEvent(stripeEvent.id, stripeEvent.type, checkoutSessionId, customerId, email, 'completed');
      console.log('[StripeWebhook] ✅ PROVISIONING COMPLETE');

    } catch (error) {
      console.error('[StripeWebhook] ❌ Error during provisioning:', error);
      await trackEvent(stripeEvent.id, stripeEvent.type, checkoutSessionId, customerId, email, 'failed', error.message);
      return { statusCode: 200, body: JSON.stringify({ error: 'Provisioning failed' }) };
    }
  }

  // ============================================================
  // HANDLE: customer.subscription.updated
  // ============================================================
  if (stripeEvent.type==='customer.subscription.updated'){
    console.log('[StripeWebhook] Processing subscription update:', obj.id);
    const sub = obj.items ? obj : await stripe.subscriptions.retrieve(obj.id, { expand:['items.data.price'] });
    const priceId = sub.items.data[0].price.id;
    const planInfo = getPlanInfo(priceId);
    const plan = planInfo?.plan || 'starter';
    const { data:user } = await supabase.from('profiles').select('*').eq('stripe_customer_id', sub.customer).maybeSingle();

    if (user && plan){
      const isPremium = (plan === 'pro' || plan === 'premium') && (sub.status === 'active' || sub.status === 'trialing');
      await supabase.from('profiles').update({
        plan: sub.status==='trialing' ? `${plan}_trial` : (sub.status==='active' ? plan : 'starter'),
        trial_end: sub.trial_end ? new Date(sub.trial_end*1000) : null,
        is_premium: isPremium,
        subscription_status: sub.status,
        current_period_end: sub.current_period_end,
      }).eq('id', user.id);
    }
  }

  // ============================================================
  // HANDLE: invoice.payment_failed
  // ============================================================
  if (stripeEvent.type==='invoice.payment_failed'){
    console.log('[StripeWebhook] Processing payment failure');
    const user = await getUserByCustomer(obj.customer);
    if(user){
      await supabase.from('profiles').update({
        plan:'starter',
        is_premium: false,
        subscription_status: 'past_due'
      }).eq('id', user.id);
    }
  }

  // ============================================================
  // HANDLE: customer.subscription.deleted
  // ============================================================
  if (stripeEvent.type==='customer.subscription.deleted'){
    console.log('[StripeWebhook] Processing subscription cancellation');
    const user = await getUserByCustomer(obj.customer);
    if(user){
      await supabase.from('profiles').update({
        plan:'starter',
        stripe_subscription_id:null,
        is_premium: false,
        subscription_status: 'canceled'
      }).eq('id', user.id);
    }
  }

  console.log('[StripeWebhook] ========== WEBHOOK COMPLETE ==========');
  return { statusCode:200, body: JSON.stringify({ ok: true }) };
};
