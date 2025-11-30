import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Ctx = createContext({ user: null, plan: null, loading: true });
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, plan: null, loading: true });

  async function load() {
    const { data:{ session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;

    if (!user) return setState({ user:null, plan:null, loading:false });

    const { data, error } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();

    const plan = error ? 'free' : (data?.plan ?? 'free');
    setState({ user, plan, loading:false });
  }

  useEffect(() => {
    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => sub.subscription.unsubscribe();
  }, []);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}
