const { createClient } = require('@supabase/supabase-js');

const reply = (code, payload, origin='*') => ({
  statusCode: code,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
  },
  body: JSON.stringify(payload),
});

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || '*';
  try {
    if (event.httpMethod === 'OPTIONS') return reply(200, { ok: true }, origin);
    if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed' }, origin);

    let body = {};
    try { body = JSON.parse(event.body || '{}'); }
    catch { return reply(400, { error: 'Invalid JSON body' }, origin); }

    const name = (body.name ?? '').toString().trim();

    const url  = process.env.VITE_SUPABASE_URL;
    const key  = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return reply(500, { error: 'Missing Supabase env vars' }, origin);

    const admin = createClient(url, key);

    // Upsert minimal free profile (extend as needed)
    const { data, error } = await admin
      .from('profiles')
      .upsert(
        { name, plan: 'free', status: 'active', activated_at: new Date().toISOString() },
        { onConflict: 'id' }
      )
      .select()
      .limit(1)
      .maybeSingle();

    if (error) return reply(500, { error: error.message }, origin);
    return reply(200, { ok: true, profile: data }, origin);
  } catch (e) {
    return reply(500, { error: e?.message || 'Unknown server error' }, origin);
  }
};
