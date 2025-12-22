/*
 * ⚠️ DO NOT MODIFY WITHOUT FULL BILLING FLOW REVIEW.
 * This file is part of the Stripe → Supabase entitlement chain.
 *
 * CRITICAL: This webhook updates profiles table when Stripe sends subscription events.
 * Changes here affect customer access to premium features.
 *
 * Verified working: 2025-12-14
 * See: /docs/BILLING_FLOW_LOCKED.md
 */
'use strict';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');
const { getPlanInfo } = require('./_lib/plan-map.cjs');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
async function logEvent(id, type){ const { error }=await supabase.from('events_log').insert({id,type}).select().single(); if(error&&error.code!=='23505') throw error; }
async function getUserByCustomer(c){ const { data }=await supabase.from('profiles').select('*').eq('stripe_customer_id',c).maybeSingle(); return data; }
async function getUserByEmail(e){ const { data }=await supabase.from('profiles').select('*').eq('email',e).maybeSingle(); return data; }
exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const body = event.isBase64Encoded ? Buffer.from(event.body,'base64') : Buffer.from(event.body||'');
  let stripeEvent; try{ stripeEvent = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET); }catch(err){ return { statusCode:400, body:'Invalid signature' }; }
  await logEvent(stripeEvent.id, stripeEvent.type);
  const obj = stripeEvent.data.object;
  if (stripeEvent.type==='checkout.session.completed' && obj.subscription){
    const sub = await stripe.subscriptions.retrieve(obj.subscription, { expand:['items.data.price'] });
    const priceId = sub.items.data[0].price.id; const planInfo = getPlanInfo(priceId); const plan = planInfo?.plan || 'starter'; const email = obj.customer_details?.email;
    if(!email) return { statusCode:200, body:'No email' };
    let user = await getUserByCustomer(obj.customer); if(!user && email) user = await getUserByEmail(email);
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
    };
    if(!user){
      await supabase.from('profiles').insert({...updates, email, activated_at: new Date()});
    } else {
      await supabase.from('profiles').update(updates).eq('id', user.id);
    }
  }
  if (stripeEvent.type==='customer.subscription.updated'){
    const sub = obj.items ? obj : await stripe.subscriptions.retrieve(obj.id, { expand:['items.data.price'] });
    const priceId = sub.items.data[0].price.id; const planInfo = getPlanInfo(priceId); const plan = planInfo?.plan || 'starter';
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
  if (stripeEvent.type==='invoice.payment_failed'){ const user = await getUserByCustomer(obj.customer); if(user){ await supabase.from('profiles').update({ plan:'starter', is_premium: false, subscription_status: 'past_due' }).eq('id', user.id); } }
  if (stripeEvent.type==='customer.subscription.deleted'){ const user = await getUserByCustomer(obj.customer); if(user){ await supabase.from('profiles').update({ plan:'starter', stripe_subscription_id:null, is_premium: false, subscription_status: 'canceled' }).eq('id', user.id); } }
  return { statusCode:200 };
};
