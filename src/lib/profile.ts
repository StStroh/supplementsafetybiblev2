import { SupabaseClient } from '@supabase/supabase-js';

export async function ensureFreeProfile(supabase: SupabaseClient) {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
      console.warn('[ensureFreeProfile] No authenticated user found');
      return { ok: false, error: 'No authenticated user' };
    }

    console.info('[ensureFreeProfile] Ensuring profile for user:', user.email);

    const { data: existing } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('id', user.id)
      .maybeSingle();

    if (existing?.role && existing.role !== 'free') {
      console.info('[ensureFreeProfile] User already has paid role:', existing.role);
      return { ok: true };
    }

    const { error: upsertError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email: user.email,
          role: 'free',
        },
        {
          onConflict: 'id',
          ignoreDuplicates: false,
        }
      );

    if (upsertError) {
      console.error('[ensureFreeProfile] Upsert error:', upsertError);
      return { ok: false, error: upsertError.message };
    }

    console.info('[ensureFreeProfile] Profile created/updated successfully');
    return { ok: true };
  } catch (err) {
    console.error('[ensureFreeProfile] Unexpected error:', err);
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
