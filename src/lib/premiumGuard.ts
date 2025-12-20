import { supabase } from './supabase';

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
