import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  plan: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  plan: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    plan: null,
    loading: true,
  });

  async function loadSession() {
    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Session load timeout')), 5000);
    });

    try {
      console.log('[AuthProvider] Loading session...');

      const sessionPromise = supabase.auth.getSession();
      const { data: { session }, error } = await Promise.race([
        sessionPromise,
        timeout
      ]) as Awaited<ReturnType<typeof sessionPromise>>;

      if (error) {
        console.error('[AuthProvider] Error loading session:', error);
        setState({ user: null, session: null, plan: null, loading: false });
        return;
      }

      const user = session?.user ?? null;

      if (!user) {
        console.log('[AuthProvider] No user session found');
        setState({ user: null, session: null, plan: null, loading: false });
        return;
      }

      console.log('[AuthProvider] Session found for user:', user.id);

      const profileTimeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Profile fetch timeout')), 3000);
      });

      const profilePromise = supabase
        .from('profiles')
        .select('plan')
        .eq('id', user.id)
        .maybeSingle();

      const { data: profileData, error: profileError } = await Promise.race([
        profilePromise,
        profileTimeout
      ]) as Awaited<ReturnType<typeof profilePromise>>;

      const plan = profileError ? 'free' : (profileData?.plan ?? 'free');
      console.log('[AuthProvider] User plan:', plan);

      setState({ user, session, plan, loading: false });
    } catch (err) {
      console.error('[AuthProvider] Session load failed or timed out:', err);
      setState({ user: null, session: null, plan: null, loading: false });
    }
  }

  async function signOut() {
    try {
      console.log('[AuthProvider] Signing out...');
      await supabase.auth.signOut();
      setState({ user: null, session: null, plan: null, loading: false });
    } catch (err) {
      console.error('[AuthProvider] Error signing out:', err);
    }
  }

  useEffect(() => {
    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AuthProvider] Auth state changed:', event);

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await loadSession();
        } else if (event === 'SIGNED_OUT') {
          setState({ user: null, session: null, plan: null, loading: false });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    ...state,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
