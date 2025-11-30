const { createClient } = require('@supabase/supabase-js');

const ORIGINS = ['https://supplementsafetybible.com','http://localhost:5173'];
const cors = (o) => ({
  'Access-Control-Allow-Origin': ORIGINS.includes(o) ? o : ORIGINS[0],
  'Vary':'Origin',
  'Access-Control-Allow-Methods':'POST,OPTIONS,GET',
  'Access-Control-Allow-Headers':'Content-Type,Authorization'
});

exports.handler = async (event) => {
  const origin = event.headers?.origin || '';
  const headers = { 'Content-Type':'application/json', ...cors(origin) };

  if (event.httpMethod === 'OPTIONS') return { statusCode:200, headers, body:'' };

  if (event.httpMethod === 'GET' && (event.queryStringParameters?.diag === '1')) {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
    const supabase = createClient(SUPABASE_URL || '', SUPABASE_SERVICE_ROLE_KEY || '', { auth:{persistSession:false} });
    const ping = await supabase.from('profiles').select('id').limit(1);
    return {
      statusCode: 200,
      headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'https://supplementsafetybible.com' },
      body: JSON.stringify({ ok: !ping.error, error: ping.error ? { code: ping.error.code, message: ping.error.message } : null })
    };
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode:200, headers,
      body: JSON.stringify({
        ok:true,
        env:{
          url: !!process.env.SUPABASE_URL ? 'present':'missing',
          service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY ? 'present':'missing'
        }
      })
    };
  }
  if (event.httpMethod !== 'POST') return { statusCode:405, headers, body:JSON.stringify({error:'Method not allowed'}) };

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL) return { statusCode:500, headers, body:JSON.stringify({error:'Missing SUPABASE_URL'}) };
  if (!SUPABASE_SERVICE_ROLE_KEY) return { statusCode:500, headers, body:JSON.stringify({error:'Missing SUPABASE_SERVICE_ROLE_KEY'}) };

  let body;
  try { body = JSON.parse(event.body||'{}'); } catch { return { statusCode:400, headers, body:JSON.stringify({error:'Invalid JSON'}) }; }

  const name = (body.name||'').trim().slice(0,120);
  const email = (body.email||'').trim().toLowerCase() || null;
  if (!name && !email) return { statusCode:400, headers, body:JSON.stringify({error:'Provide name or email'}) };

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth:{persistSession:false} });

  // Use raw SQL to bypass schema cache issues
  let resp;
  if (email) {
    // Upsert with conflict handling
    resp = await supabase.rpc('upsert_free_profile', {
      p_name: name || null,
      p_email: email,
      p_plan: 'free',
      p_status: 'active'
    });
  } else {
    // Insert without email (only name)
    resp = await supabase.rpc('insert_free_profile', {
      p_name: name || null,
      p_email: null,
      p_plan: 'free',
      p_status: 'active'
    });
  }

  if (resp.error) {
    console.error('grant-free error:', resp.error);
    // Fallback to direct insert/upsert if RPC doesn't exist
    try {
      const record = { name: name||null, email, plan:'free', status:'active' };
      let fallbackResp;
      if (email) {
        fallbackResp = await supabase.from('profiles')
          .upsert({ email, ...record }, { onConflict:'email' })
          .select('id,email,name,plan,status')
          .single();
      } else {
        fallbackResp = await supabase.from('profiles')
          .insert(record)
          .select('id,email,name,plan,status')
          .single();
      }

      if (fallbackResp.error) {
        throw fallbackResp.error;
      }

      return { statusCode:200, headers, body:JSON.stringify({ ok:true, user:fallbackResp.data }) };
    } catch (fallbackError) {
      return {
        statusCode:500,
        headers,
        body: JSON.stringify({
          error:'Database error',
          detail: fallbackError.message || resp.error.message,
          code: fallbackError.code || resp.error.code,
          hint: fallbackError.hint || resp.error.hint || null
        })
      };
    }
  }

  return { statusCode:200, headers, body:JSON.stringify({ ok:true, user:resp.data }) };
};
