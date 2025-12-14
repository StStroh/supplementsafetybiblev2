'use strict';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const PRICE_TO_PLAN = { [process.env.PRICE_PRO_MONTHLY]:'pro', [process.env.PRICE_PREMIUM_MONTHLY]:'premium' };
async function logEvent(id, type){ const { error }=await supabase.from('events_log').insert({id,type}).select().single(); if(error&&error.code!=='23505') throw error; }
async function getUserByCustomer(c){ const { data }=await supabase.from('users').select('*').eq('stripe_customer_id',c).maybeSingle(); return data; }
async function getUserByEmail(e){ const { data }=await supabase.from('users').select('*').eq('email',e).maybeSingle(); return data; }
exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const body = event.isBase64Encoded ? Buffer.from(event.body,'base64') : Buffer.from(event.body||'');
  let stripeEvent; try{ stripeEvent = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET); }catch(err){ return { statusCode:400, body:'Invalid signature' }; }
  await logEvent(stripeEvent.id, stripeEvent.type);
  const obj = stripeEvent.data.object;
  if (stripeEvent.type==='checkout.session.completed' && obj.subscription){
    const sub = await stripe.subscriptions.retrieve(obj.subscription, { expand:['items.data.price'] });
    const priceId = sub.items.data[0].price.id; const plan = PRICE_TO_PLAN[priceId]; const email = obj.customer_details?.email;
    let user = await getUserByCustomer(obj.customer); if(!user && email) user = await getUserByEmail(email); if(!user) return { statusCode:200 };
    await supabase.from('users').update({
      stripe_customer_id: obj.customer,
      stripe_subscription_id: sub.id,
      plan: sub.status==='trialing' ? `${plan}_trial` : plan,
      trial_end: sub.trial_end ? new Date(sub.trial_end*1000) : null,
      trial_used: true,
    }).eq('id', user.id);
  }
  if (stripeEvent.type==='customer.subscription.updated'){
    const sub = obj.items ? obj : await stripe.subscriptions.retrieve(obj.id, { expand:['items.data.price'] });
    const priceId = sub.items.data[0].price.id; const plan = PRICE_TO_PLAN[priceId];
    const { data:user } = await supabase.from('users').select('*').eq('stripe_customer_id', sub.customer).maybeSingle();
    if (user && plan){
      await supabase.from('users').update({
        plan: sub.status==='trialing' ? `${plan}_trial` : (sub.status==='active' ? plan : 'starter'),
        trial_end: sub.trial_end ? new Date(sub.trial_end*1000) : null
      }).eq('id', user.id);
    }
  }
  if (stripeEvent.type==='invoice.payment_failed'){ const user = await getUserByCustomer(obj.customer); if(user){ await supabase.from('users').update({ plan:'starter' }).eq('id', user.id); } }
  if (stripeEvent.type==='customer.subscription.deleted'){ const user = await getUserByCustomer(obj.customer); if(user){ await supabase.from('users').update({ plan:'starter', stripe_subscription_id:null }).eq('id', user.id); } }
  return { statusCode:200 };
};
