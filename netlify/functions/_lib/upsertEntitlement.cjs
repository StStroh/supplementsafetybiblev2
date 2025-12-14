/*
 * ⚠️ DO NOT MODIFY WITHOUT FULL BILLING FLOW REVIEW.
 * This file is part of the Stripe → Supabase entitlement chain.
 *
 * CRITICAL: This function writes subscription data to profiles table.
 * Sets is_premium, role, plan, subscription_status - controls dashboard access.
 *
 * Verified working: 2025-12-14
 * See: /docs/BILLING_FLOW_LOCKED.md
 */
const { getPlanInfo } = require('./plan-map.cjs');

const upsertEntitlement = async ({ supabaseAdmin, email, stripe_customer_id, subscription_id, subscription_status, current_period_end, price_id }) => {
  if (!email && !stripe_customer_id) return { error: 'email_or_customer_required' };

  const is_premium =
    subscription_status === 'active' ||
    subscription_status === 'trialing' ||
    subscription_status === 'past_due';

  const planInfo = price_id ? getPlanInfo(price_id) : null;
  const basePlan = planInfo?.plan || 'starter';
  const role = is_premium && (basePlan === 'pro' || basePlan === 'premium') ? basePlan : 'free';
  const plan = subscription_status === 'trialing' ? `${basePlan}_trial` : basePlan;

  const current_period_end_bigint = current_period_end
    ? (typeof current_period_end === 'string'
        ? Math.floor(new Date(current_period_end).getTime() / 1000)
        : current_period_end)
    : null;

  const payload = {
    email: email || null,
    stripe_customer_id: stripe_customer_id || null,
    subscription_id: subscription_id || null,
    subscription_status: subscription_status || null,
    is_premium,
    role,
    plan,
    current_period_end: current_period_end_bigint,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin()
    .from('profiles')
    .upsert(payload, { onConflict: 'email' })
    .select()
    .single();

  if (error) return { error: error.message };
  return { data };
};

module.exports = { upsertEntitlement };
