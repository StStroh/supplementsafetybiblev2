export function getEnv() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const ok = Boolean(url && anon);
  return { url, anon, ok };
}
