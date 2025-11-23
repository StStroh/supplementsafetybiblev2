import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON = process.env.VITE_SUPABASE_ANON_KEY;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { autoRefreshToken: false, persistSession: false }});
const pub = createClient(SUPABASE_URL, ANON);

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || '{}');
    const { supplementId, medicationId, userEmail } = body;
    if (!userEmail) return { statusCode: 401, body: JSON.stringify({ error: 'not_authenticated' }) };
    if (!supplementId || !medicationId) return { statusCode: 400, body: JSON.stringify({ error: 'missing_params' }) };

    const { data: profile } = await admin.from('profiles').select('role, free_checks_count, free_last_check_at, email').eq('email', userEmail).single();
    if (!profile) return { statusCode: 400, body: JSON.stringify({ error: 'profile_missing' }) };

    const { data, error, status } = await pub
      .from('interactions')
      .select('*')
      .eq('supplement_id', supplementId)
      .eq('medication_id', medicationId)
      .maybeSingle();

    if (status === 406 || error) {
      return { statusCode: 403, body: JSON.stringify({ error: 'rls_denied_or_not_found' }) };
    }

    if (profile.role === 'free' && data) {
      await admin.from('profiles').update({
        free_checks_count: 1,
        free_last_check_at: new Date().toISOString(),
      }).eq('email', userEmail);
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, data }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
