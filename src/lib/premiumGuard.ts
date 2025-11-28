import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnon);

export async function requirePremium(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return false;

  const res = await fetch('/.netlify/functions/me', {
    headers: { Authorization: `Bearer ${session.access_token}` }
  });

  if (!res.ok) return false;

  const json = await res.json();
  return Boolean(json.isPremium);
}
