const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS,GET',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers: CORS, body: '' };
    }

    if (event.httpMethod === 'GET') {
      const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
      const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (event.queryStringParameters?.diag === '1') {
        if (!SUPABASE_URL || !SERVICE_ROLE) {
          return {
            statusCode: 500,
            headers: CORS,
            body: JSON.stringify({ ok: false, error: 'Missing Supabase env vars' })
          };
        }
        const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
        const ping = await supabase.from('profiles').select('id').limit(1);
        return {
          statusCode: 200,
          headers: CORS,
          body: JSON.stringify({ ok: !ping.error, error: ping.error || null })
        };
      }

      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({
          ok: true,
          env: {
            url: !!SUPABASE_URL ? 'present' : 'missing',
            service_role_key: !!SERVICE_ROLE ? 'present' : 'missing'
          }
        })
      };
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: CORS,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    const payload = JSON.parse(event.body || '{}');
    const name = typeof payload.name === 'string' ? payload.name.trim() : '';

    if (!name) {
      return {
        statusCode: 400,
        headers: CORS,
        body: JSON.stringify({ error: 'Name is required' })
      };
    }

    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SERVICE_ROLE) {
      return {
        statusCode: 500,
        headers: CORS,
        body: JSON.stringify({ error: 'Missing Supabase env vars' })
      };
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

    // Create auth user with random email
    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email: `${crypto.randomUUID()}@free-plan.local`,
      email_confirm: true
    });
    if (userError) throw userError;

    // Create profile with matching user id
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: user.user.id,
        name,
        plan: 'free',
        status: 'active',
        activated_at: new Date().toISOString()
      })
      .select()
      .single();
    if (error) throw error;

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ ok: true, profile: data })
    };

  } catch (err) {
    console.error('grant-free exception:', err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: String(err) })
    };
  }
};
