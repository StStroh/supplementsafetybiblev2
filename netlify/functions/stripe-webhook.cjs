/*
 * ⚠️ DO NOT MODIFY WITHOUT FULL BILLING FLOW REVIEW.
 * This file is part of the Stripe → Supabase entitlement chain.
 *
 * CRITICAL: This webhook updates profiles table when Stripe sends subscription events.
 * Changes here affect customer access to premium features.
 *
 * Updated: 2025-12-26 - Added guest checkout support
 * Verified working: 2025-12-14
 * See: /docs/BILLING_FLOW_LOCKED.md
 */
'use strict';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');
const { getPlanInfo } = require('./_lib/plan-map.cjs');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

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

  try{
    stripeEvent = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  }catch(err){
    console.error('[webhook] Invalid signature:', err.message);
    return { statusCode:400, body:'Invalid signature' };
  }

  await logEvent(stripeEvent.id, stripeEvent.type);
  const obj = stripeEvent.data.object;

  // Handle checkout.session.completed - includes guest checkout
  if (stripeEvent.type==='checkout.session.completed' && obj.subscription){
    console.log('[webhook] Processing checkout.session.completed:', obj.id);

    const sub = await stripe.subscriptions.retrieve(obj.subscription, { expand:['items.data.price'] });
    const priceId = sub.items.data[0].price.id;
    const planInfo = getPlanInfo(priceId);
    const plan = planInfo?.plan || 'starter';
    const email = obj.customer_details?.email;
    const customerName = obj.customer_details?.name;
    const isGuestCheckout = obj.metadata?.guest_checkout === 'true';

    if(!email) {
      console.log('[webhook] No email in checkout session');
      return { statusCode:200, body:'No email' };
    }

    console.log('[webhook] Email:', email, 'Plan:', plan, 'Guest:', isGuestCheckout);

    // Try to find existing user by Stripe customer or email
    let user = await getUserByCustomer(obj.customer);
    if(!user && email) user = await getUserByEmail(email);

    const isPremium = plan === 'pro' || plan === 'premium';
    const updates = {
      stripe_customer_id: obj.customer,
      stripe_subscription_id: sub.id,
      plan: sub.status==='trialing' ? `${plan}_trial` : plan,
      trial_end: sub.trial_end ? new Date(sub.trial_end*1000) : null,
      trial_used: true,
      is_premium: isPremium || sub.status === 'trialing',
      subscription_status: sub.status,
      current_period_end: sub.current_period_end,
      role: plan,
      email,
    };

    // If no profile exists, create one
    if(!user){
      console.log('[webhook] No existing profile, creating new one');

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
        console.error('[webhook] Failed to create profile:', insertError);
      } else {
        console.log('[webhook] Profile created:', newProfile.id);
      }
    } else {
      // Update existing profile
      console.log('[webhook] Updating existing profile:', user.id);
      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (updateError) {
        console.error('[webhook] Failed to update profile:', updateError);
      } else {
        console.log('[webhook] Profile updated successfully');
      }
    }
  }

  // Handle subscription updates
  if (stripeEvent.type==='customer.subscription.updated'){
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

  // Handle payment failures
  if (stripeEvent.type==='invoice.payment_failed'){
    const user = await getUserByCustomer(obj.customer);
    if(user){
      await supabase.from('profiles').update({
        plan:'starter',
        is_premium: false,
        subscription_status: 'past_due'
      }).eq('id', user.id);
    }
  }

  // Handle subscription cancellations
  if (stripeEvent.type==='customer.subscription.deleted'){
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

  return { statusCode:200 };
};
