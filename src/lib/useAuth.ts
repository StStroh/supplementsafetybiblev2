import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';


export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

export function useIsPremium() {
  const { user, loading: userLoading } = useUser();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      setIsPremium(false);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('role, plan, is_premium, subscription_status')
          .eq('id', user.id)
          .maybeSingle();

        if (data) {
          const premium =
            data.role === 'premium' ||
            data.plan === 'premium' ||
            data.is_premium === true ||
            (data.subscription_status && ['active', 'trialing'].includes(data.subscription_status));
          setIsPremium(premium);
        } else {
          setIsPremium(false);
        }
        setLoading(false);
      } catch (err: unknown) {
        console.error('Error checking premium status:', err);
        setIsPremium(false);
        setLoading(false);
      }
    })();
  }, [user, userLoading]);

  return { isPremium, loading: loading || userLoading, user };
}
