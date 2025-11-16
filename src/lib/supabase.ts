import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Make sure the URL is valid and avoid "Invalid supabaseUrl" crashes
function normalizeSupabaseUrl(url: unknown): string | null {
  if (typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // must start with http or https
  if (!/^https?:\/\//i.test(trimmed)) {
    console.warn('[Supabase] Invalid VITE_SUPABASE_URL:', trimmed);
    return null;
  }

  return trimmed;
}

const supabaseUrl = normalizeSupabaseUrl(rawUrl);
const supabaseAnonKey =
  typeof rawKey === 'string' ? rawKey.trim() : '';

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    '[Supabase] Supabase client NOT initialized. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify.'
  );
}

// Always export something so the rest of the app can import safely
export { supabase };