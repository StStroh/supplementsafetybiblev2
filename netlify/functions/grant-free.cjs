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

  const record = { name: name||null, email, plan:'free', status:'active', activated_at: new Date().toISOString() };

  let resp;
  if (email) {
    resp = await supabase.from('profiles')
      .upsert({ email, ...record }, { onConflict:'email' })
      .select('id,email,name,plan,status,activated_at')
      .single();
  } else {
    resp = await supabase.from('profiles')
      .insert(record)
      .select('id,email,name,plan,status,activated_at')
      .single();
  }

  if (resp.error) {
    console.error('grant-free error:', resp.error);
    return {
      statusCode:500,
      headers,
      body: JSON.stringify({
        error:'Database error',
        detail: resp.error.message,
        code: resp.error.code,
        hint: resp.error.hint || null
      })
    };
  }

  return { statusCode:200, headers, body:JSON.stringify({ ok:true, user:resp.data }) };
};
