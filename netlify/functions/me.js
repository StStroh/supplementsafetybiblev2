const { supabaseAdmin } = require('./_lib/supabaseAdmin');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  const auth = event.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return { statusCode: 401, body: 'Missing bearer token' };

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user?.email) return { statusCode: 401, body: 'Invalid token' };

  const email = user.email;

  const { data, error: qErr } = await supabaseAdmin
    .from('users_entitlement')
    .select('email, is_premium, subscription_status, current_period_end')
    .eq('email', email)
    .maybeSingle();

  if (qErr) return { statusCode: 500, body: 'Query error' };

  return {
    statusCode: 200,
    body: JSON.stringify({
      email,
      isPremium: Boolean(data?.is_premium),
      subscription_status: data?.subscription_status || null,
      current_period_end: data?.current_period_end || null,
    }),
  };
};
