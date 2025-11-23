import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { isPaid, roleName } from '../lib/roles';

type State = 'loading' | 'no_user' | 'free_ok' | 'free_locked' | 'paid' | 'result';

export default function InteractionChecker() {
  const [state, setState] = useState<State>('loading');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('free');
  const [supplementId, setSupplementId] = useState('');
  const [medicationId, setMedicationId] = useState('');
  const [supplements, setSupplements] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [payload, setPayload] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u?.user?.email) {
        console.info('[InteractionChecker] No authenticated user');
        setState('no_user');
        return;
      }
      setEmail(u.user.email);

      const { data: profile } = await supabase
        .from('profiles')
        .select('role, free_checks_count, free_last_check_at')
        .eq('email', u.user.email)
        .single();

      const r = profile?.role ?? 'free';
      setRole(r);

      const [supRes, medRes] = await Promise.all([
        supabase.from('supplements').select('id,name').order('name'),
        supabase.from('medications').select('id,name').order('name'),
      ]);

      setSupplements(supRes.data || []);
      setMedications(medRes.data || []);

      if (isPaid(r)) { setState('paid'); return; }

      const last = profile?.free_last_check_at ? new Date(profile.free_last_check_at) : null;
      const now = new Date();
      const usedThisMonth =
        last &&
        last.getUTCFullYear() === now.getUTCFullYear() &&
        last.getUTCMonth() === now.getUTCMonth() &&
        (profile?.free_checks_count ?? 0) >= 1;

      setState(usedThisMonth ? 'free_locked' : 'free_ok');
    })();
  }, []);

  const check = async () => {
    setErrorMsg(null);

    if (role === 'free') {
      const lastCheck = localStorage.getItem('ssb_free_last_check');
      const today = new Date().toISOString().split('T')[0];

      if (lastCheck === today) {
        console.info('[InteractionChecker] Free user already checked today');
        setState('free_locked');
        setErrorMsg('You already used your free check today. Upgrade for unlimited checks.');
        return;
      }
    }

    const res = await fetch('/.netlify/functions/get-interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supplementId, medicationId, userEmail: email }),
    });

    if (res.status === 403) {
      setState('free_locked');
      setErrorMsg('You already used your free check this month.');
      return;
    }

    const json = await res.json();
    if (!json?.ok) {
      setErrorMsg('Interaction not found or error occurred.');
      return;
    }

    if (role === 'free') {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('ssb_free_last_check', today);
      console.info('[InteractionChecker] Free check logged for:', today);
    }

    setPayload(json.data);
    setState('result');
  };

  if (state === 'loading') return <div className="p-4">Loading…</div>;

  if (state === 'no_user')
    return (
      <div className="p-6 bg-white rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">Sign in to use your free daily interaction check</h3>
        <p className="text-gray-600 mb-4">Create a free account to check supplement-medication interactions.</p>
        <a
          href="/auth?redirect=/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Start Free
        </a>
      </div>
    );

  if (state === 'free_locked')
    return (
      <div className="p-6 bg-white rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">Free Tier Limit Reached</h3>
        <p className="mb-4">You already used your free check this month.</p>
        <a href="/#pricing?locked=interactions" className="inline-block px-4 py-2 bg-green-600 text-white rounded-md">Upgrade to Pro or Premium</a>
        {errorMsg && <p className="mt-3 text-red-600">{errorMsg}</p>}
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="mb-4 text-sm text-gray-600">
        Current Plan: <strong>{roleName(role)}</strong>{state === 'free_ok' && (() => {
          const lastCheck = localStorage.getItem('ssb_free_last_check');
          const today = new Date().toISOString().split('T')[0];
          return lastCheck === today ? ' • Used today (resets tomorrow)' : ' • 1 check available today';
        })()}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <select value={supplementId} onChange={e=>setSupplementId(e.target.value)} className="border rounded p-2">
          <option value="">Choose a supplement…</option>
          {supplements.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <select value={medicationId} onChange={e=>setMedicationId(e.target.value)} className="border rounded p-2">
          <option value="">Choose a medication…</option>
          {medications.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      <button onClick={check} disabled={!supplementId || !medicationId} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
        Check Interactions
      </button>

      {errorMsg && <p className="mt-3 text-red-600">{errorMsg}</p>}

      {state === 'result' && payload && (
        <div className="mt-4 border-rounded p-3">
          <div className="font-semibold mb-2">Result</div>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
