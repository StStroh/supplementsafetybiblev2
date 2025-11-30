const { createClient } = require('@supabase/supabase-js');

const rateLimits = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 5;

  if (!rateLimits.has(ip)) {
    rateLimits.set(ip, []);
  }

  const requests = rateLimits.get(ip).filter(ts => now - ts < windowMs);

  if (requests.length >= maxRequests) {
    return false;
  }

  requests.push(now);
  rateLimits.set(ip, requests);
  return true;
}

exports.handler = async (event) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (event.httpMethod !== 'POST') {
    await supabase.from('events').insert({ route: 'grant-free', status: 405, user_id: null });
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
  if (!checkRateLimit(ip)) {
    await supabase.from('events').insert({ route: 'grant-free', status: 429, user_id: null });
    return { statusCode: 429, body: 'Too many requests. Please try again later.' };
  }
  const auth = event.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    await supabase.from('events').insert({ route: 'grant-free', status: 401, user_id: null });
    return { statusCode: 401, body: 'Missing token' };
  }
  const jwt = auth.slice(7);

  const { data: userData, error: userErr } = await supabase.auth.getUser(jwt);
  if (userErr || !userData?.user?.id) {
    await supabase.from('events').insert({ route: 'grant-free', status: 401, user_id: null });
    return { statusCode: 401, body: 'Invalid user' };
  }
  const { id, email } = userData.user;
  const { error } = await supabase
    .from('profiles')
    .upsert({ id, email, plan: 'free', status: 'active', activated_at: new Date().toISOString() });

  if (error) {
    await supabase.from('events').insert({ route: 'grant-free', status: 500, user_id: id });
    return { statusCode: 500, body: 'DB error' };
  }

  await supabase.from('events').insert({ route: 'grant-free', status: 200, user_id: id });
  return { statusCode: 200, body: JSON.stringify({ ok: true, plan: 'free' }) };
};
