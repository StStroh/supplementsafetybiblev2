const { createClient } = require('@supabase/supabase-js');

const json = (code, payload, origin='*') => ({
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
    if (event.httpMethod === 'OPTIONS') return json(200, { ok: true }, origin);
    if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' }, origin);

    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'Invalid JSON body' }, origin); }

    const name = (body.name ?? '').toString().trim();

    const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url) return json(500, { error: 'Missing SUPABASE_URL' }, origin);
    if (!key) return json(500, { error: 'Missing SUPABASE_SERVICE_ROLE_KEY' }, origin);

    const admin = createClient(url, key);

    const payload = {
      name,
      plan: 'free',
      status: 'active',
      activated_at: new Date().toISOString(),
    };

    const { data, error } = await admin
      .from('profiles')
      .insert(payload)
      .select()
      .single();

    if (error) return json(500, { error: `DB: ${error.message}` }, origin);

    return json(200, { ok: true, profile: data }, origin);
  } catch (e) {
    return json(500, { error: e?.message || 'Unknown server error' }, origin);
  }
};
