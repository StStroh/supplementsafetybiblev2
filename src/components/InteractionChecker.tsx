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
      if (!u?.user?.email) { setState('no_user'); return; }
      setEmail(u.user.email);

      const { data: profile } = await supabase.from('profiles').select('role, free_checks_count, free_last_check_at').eq('email', u.user.email).single();
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
    const res = await fetch('/.netlify/functions/get-interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supplementId, medicationId, userEmail: email }),
    });
    if (res.status === 403) { setState('free_locked'); setErrorMsg('You already used your free check this month.'); return; }
    const json = await res.json();
    if (!json?.ok) { setErrorMsg('Interaction not found or an error occurred.'); return; }
    setPayload(json.data);
    setState('result');
  };

  if (state === 'loading') return <div className="py-20 text-center">Loading…</div>;
  if (state === 'no_user') return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-lg p-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Sign in to use your free monthly interaction check</h2>
        <a href="/#pricing" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Sign in</a>
      </div>
    </section>
  );
  if (state === 'free_locked') return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-lg p-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Free Tier Limit Reached</h2>
        <p className="text-slate-600 mb-6">You already used your free check this month.</p>
        <a href="/#pricing" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Upgrade to Pro or Premium</a>
        {errorMsg && <p className="text-red-600 mt-4">{errorMsg}</p>}
      </div>
    </section>
  );

  return (
    <section id="checker" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Check Interactions</h2>
          <p className="text-slate-600">Current Plan: {roleName(role)}{state === 'free_ok' && ' • You have 1 check available this month'}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Select Supplement</label>
              <select value={supplementId} onChange={e => setSupplementId(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                <option value="">Choose a supplement…</option>
                {supplements.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Select Medication</label>
              <select value={medicationId} onChange={e => setMedicationId(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                <option value="">Choose a medication…</option>
                {medications.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>

          <button onClick={check} disabled={!supplementId || !medicationId} className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">Check Interactions</button>
          {errorMsg && <p className="text-red-600 mt-4">{errorMsg}</p>}
          {state === 'result' && payload && (
            <div className="mt-6 p-6 bg-slate-50 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Result</h3>
              <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(payload, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
