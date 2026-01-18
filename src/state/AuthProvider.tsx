import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

const PLAN_CACHE_KEY = 'ssb_plan_cache_v1';
const SESSION_TIMEOUT_MS = 5000;
const PROFILE_TIMEOUT_MS = 3000;
const RETRY_DELAY_MS = 2000;

interface AuthState {
  user: User | null;
  session: Session | null;
  plan: string | null;
  loading: boolean;
  degraded: boolean;
}

interface AuthContextValue extends AuthState {
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  plan: null,
  loading: true,
  degraded: false,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error(`${label} timeout`)), ms);
    p.then(
      (v) => { clearTimeout(id); resolve(v); },
      (e) => { clearTimeout(id); reject(e); }
    );
  });
}

function getCachedPlan(): string | null {
  try {
    return localStorage.getItem(PLAN_CACHE_KEY);
  } catch {
    return null;
  }
}

function setCachedPlan(plan: string | null): void {
  try {
    if (plan) {
      localStorage.setItem(PLAN_CACHE_KEY, plan);
    } else {
      localStorage.removeItem(PLAN_CACHE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    plan: null,
    loading: true,
    degraded: false,
  });

  const mountedRef = useRef(true);
  const retryTimerRef = useRef<NodeJS.Timeout | null>(null);

  function safeSetState(updates: Partial<AuthState>) {
    if (mountedRef.current) {
      setState(prev => ({ ...prev, ...updates }));
    }
  }

  async function fetchProfile(userId: string): Promise<void> {
    const cachedPlan = getCachedPlan();

    if (cachedPlan) {
      safeSetState({ plan: cachedPlan });
    }

    try {
      const profilePromise = supabase
        .from('profiles')
        .select('plan')
        .eq('id', userId)
        .maybeSingle();

      const { data: profileData, error: profileError } = await withTimeout(
        profilePromise,
        PROFILE_TIMEOUT_MS,
        'Profile fetch'
      );

      if (profileError) {
        console.info('[Auth] profile_error', profileError.message);
        safeSetState({ plan: 'unknown' });
        return;
      }

      const plan = profileData?.plan ?? 'free';
      setCachedPlan(plan);
      safeSetState({ plan });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      if (message.includes('timeout')) {
        console.info('[Auth] profile_timeout');
        safeSetState({ plan: 'unknown' });
      } else {
        console.info('[Auth] profile_error', message);
        safeSetState({ plan: 'unknown' });
      }
    }
  }

  async function loadSession(isRetry = false): Promise<void> {
    try {
      const sessionPromise = supabase.auth.getSession();
      const { data: { session }, error } = await withTimeout(
        sessionPromise,
        SESSION_TIMEOUT_MS,
        'Session load'
      );

      if (error) {
        console.info('[Auth] session_error', error.message);
        safeSetState({
          user: null,
          session: null,
          plan: null,
          loading: false,
          degraded: true
        });
        return;
      }

      const user = session?.user ?? null;

      if (!user) {
        safeSetState({
          user: null,
          session: null,
          plan: null,
          loading: false,
          degraded: false
        });
        setCachedPlan(null);
        return;
      }

      safeSetState({
        user,
        session,
        loading: false,
        degraded: false
      });

      fetchProfile(user.id);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';

      if (message.includes('timeout')) {
        console.info('[Auth] session_timeout');
        safeSetState({
          user: null,
          session: null,
          plan: null,
          loading: false,
          degraded: true
        });

        if (!isRetry) {
          retryTimerRef.current = setTimeout(() => {
            console.info('[Auth] retrying session load...');
            loadSession(true);
          }, RETRY_DELAY_MS);
        }
      } else {
        console.info('[Auth] session_error', message);
        safeSetState({
          user: null,
          session: null,
          plan: null,
          loading: false,
          degraded: true
        });
      }
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
      setCachedPlan(null);
      safeSetState({
        user: null,
        session: null,
        plan: null,
        loading: false,
        degraded: false
      });
    } catch (err) {
      console.error('[Auth] Error signing out:', err);
    }
  }

  useEffect(() => {
    mountedRef.current = true;
    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mountedRef.current) return;

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          console.info('[Auth] signed_in');
          const user = session?.user ?? null;

          safeSetState({
            user,
            session,
            loading: false,
            degraded: false
          });

          if (user) {
            fetchProfile(user.id);
          }
        } else if (event === 'SIGNED_OUT') {
          console.info('[Auth] signed_out');
          setCachedPlan(null);
          safeSetState({
            user: null,
            session: null,
            plan: null,
            loading: false,
            degraded: false
          });
        }
      }
    );

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };
  }, []);

  const value: AuthContextValue = {
    ...state,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
