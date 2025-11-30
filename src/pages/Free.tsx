import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Free() {
  const [name, setName] = useState('');
  const [state, setState] = useState<'idle'|'loading'|'ok'|'error'>('idle');
  const nav = useNavigate();

  async function enterFree(e) {
    e.preventDefault();
    setState('loading');
    try {
      // 1) Anonymous session
      const { data: anon, error: anonErr } = await supabase.auth.signInAnonymously();
      if (anonErr) throw anonErr;

      const id = anon.user.id;

      // 2) Store name + free plan
      const { error: upErr } = await supabase
        .from('profiles')
        .upsert({ id, name, plan: 'free' });
      if (upErr) throw upErr;

      setState('ok');
      setTimeout(() => nav('/search'), 800);
    } catch {
      setState('error');
    }
  }

  return (
    <main style={{padding:40, maxWidth:520, margin:'0 auto'}}>
      <h1>Free Access</h1>
      <p>Enter your name to explore the Interaction Checker.</p>

      <form onSubmit={enterFree}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          required
          style={{width:'100%', padding:12, marginTop:12}}
        />
        <button disabled={state==='loading'} style={{padding:12, marginTop:12}}>
          {state==='loading' ? 'Starting…' : 'Enter Free Access'}
        </button>
      </form>

      {state==='ok' && <p style={{color:'green'}}>Welcome! Redirecting…</p>}
      {state==='error' && <p style={{color:'red'}}>Something went wrong. Try again.</p>}
    </main>
  );
}
