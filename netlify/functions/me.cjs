const { supabaseAdmin } = require('./_lib/supabaseAdmin.cjs');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  const auth = event.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) {
    console.warn('[AUTH] Missing bearer token');
    return { statusCode: 401, body: 'Missing bearer token' };
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user?.email) {
    console.warn('[AUTH] Invalid token or missing email:', error?.message);
    return { statusCode: 401, body: 'Invalid token' };
  }

  const email = user.email;

  const { data, error: qErr } = await supabaseAdmin()
    .from('profiles')
    .select('email, is_premium, subscription_status, current_period_end, stripe_customer_id')
    .eq('email', email)
    .maybeSingle();

  if (qErr) {
    console.error('[TIER] Profile query error for', email, ':', qErr.message);
    return { statusCode: 500, body: 'Query error' };
  }

  if (!data) {
    console.warn('[TIER] No profile found for', email, '- defaulting to non-premium');
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      email,
      isPremium: Boolean(data?.is_premium),
      subscription_status: data?.subscription_status || null,
      current_period_end: data?.current_period_end || null,
      stripe_customer_id: data?.stripe_customer_id || null,
    }),
  };
};
