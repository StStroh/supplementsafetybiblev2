export function getEnv() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const ok = Boolean(url && anon);

  // Log Supabase URL for verification (first 40 chars only for security)
  console.log('[Frontend] VITE_SUPABASE_URL:', url?.substring(0, 40) + '...');
  console.log('[Frontend] VITE_SUPABASE_ANON_KEY:', anon ? 'Present (' + anon.substring(0, 20) + '...)' : 'Missing');
  console.log('[Frontend] Supabase config OK:', ok);

  return { url, anon, ok };
}
