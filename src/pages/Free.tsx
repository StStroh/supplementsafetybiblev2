import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Free() {
  const [name, setName] = useState('');
  const [state, setState] = useState<'idle'|'loading'|'done'|'err'>('idle');
  const nav = useNavigate();

  async function go(e) {
    e.preventDefault();
    setState('loading');
    try {
      const { data: anon, error: aerr } = await supabase.auth.signInAnonymously();
      if (aerr) throw aerr;

      const userId = anon.user.id;

      const { error: perr } = await supabase
        .from('profiles')
        .upsert({ id: userId, name, plan: 'free' });

      if (perr) throw perr;

      setState('done');
      setTimeout(() => nav('/search'), 800);
    } catch {
      setState('err');
    }
  }

  return (
    <main style={{padding:40, maxWidth:480, margin:'0 auto'}}>
      <h1>Free Access</h1>
      <p>Enter your name to explore.</p>

      <form onSubmit={go}>
        <input
          required
          value={name}
          onChange={e=>setName(e.target.value)}
          placeholder="Your name"
          style={{width:'100%', padding:12}}
        />
        <button disabled={state==='loading'} style={{marginTop:12, padding:12}}>
          {state==='loading' ? 'Starting…' : 'Enter'}
        </button>
      </form>

      {state==='done' && <p style={{color:'green'}}>Welcome! Redirecting…</p>}
      {state==='err' && <p style={{color:'red'}}>Something went wrong.</p>}
    </main>
  );
}
