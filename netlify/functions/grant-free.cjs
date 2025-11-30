const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const auth = event.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return { statusCode: 401, body: 'Missing token' };
  }
  const jwt = auth.slice(7);
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { data: userData, error: userErr } = await supabase.auth.getUser(jwt);
  if (userErr || !userData?.user?.id) {
    return { statusCode: 401, body: 'Invalid user' };
  }
  const { id, email } = userData.user;
  const { error } = await supabase
    .from('profiles')
    .upsert({ id, email, plan: 'free', status: 'active', activated_at: new Date().toISOString() });
  if (error) return { statusCode: 500, body: 'DB error' };
  return { statusCode: 200, body: JSON.stringify({ ok: true, plan: 'free' }) };
};
