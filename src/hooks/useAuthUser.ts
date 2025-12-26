import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  plan: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
}

interface UseAuthUserReturn {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
}

/**
 * Centralized auth user hook
 * Returns current user, profile, and loading state
 */
export function useAuthUser(): UseAuthUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();

        if (!mounted) return;

        setUser(currentUser);

        if (currentUser) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('id, plan, stripe_customer_id, stripe_subscription_id')
            .eq('id', currentUser.id)
            .maybeSingle();

          if (mounted) {
            setProfile(profileData);
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);

      if (session?.user) {
        supabase
          .from('profiles')
          .select('id, plan, stripe_customer_id, stripe_subscription_id')
          .eq('id', session.user.id)
          .maybeSingle()
          .then(({ data }) => {
            if (mounted) {
              setProfile(data);
            }
          });
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
  };
}
