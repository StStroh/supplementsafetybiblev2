const upsertEntitlement = async ({ supabaseAdmin, email, stripe_customer_id, subscription_id, subscription_status, current_period_end }) => {
  if (!email && !stripe_customer_id) return { error: 'email_or_customer_required' };

  const is_premium =
    subscription_status === 'active' ||
    subscription_status === 'trialing' ||
    subscription_status === 'past_due';

  const role = is_premium ? 'premium' : 'free';

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
