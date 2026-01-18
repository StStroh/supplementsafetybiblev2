import { SupabaseClient } from '@supabase/supabase-js';

export type Role = 'free' | 'pro' | 'premium';
export const isPaid = (r?: string | null) => r === 'pro' || r === 'premium';
export const roleName = (r?: string | null) => !r ? 'Free' : r.charAt(0).toUpperCase() + r.slice(1);

export async function getUserAndRole(supabase: SupabaseClient): Promise<{ user: any; role: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { user: null, role: 'free' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    return { user, role: profile?.role || 'free' };
  } catch (err) {
    console.error('[getUserAndRole] Error:', err);
    return { user: null, role: 'free' };
  }
}
