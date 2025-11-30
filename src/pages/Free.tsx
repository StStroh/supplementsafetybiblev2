import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Free() {
  const [status, setStatus] = useState<'loading'|'ok'|'error'>('loading');
  const navigate = useNavigate();

  async function activate() {
    try {
      const res = await fetch('/api/grant-free', { method: 'POST' });
      if (!res.ok) throw new Error();
      setStatus('ok');
      setTimeout(() => navigate('/account'), 2000);
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => { activate(); }, []);

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      {status === 'loading' && <p>Loading…</p>}
      {status === 'ok' && <p style={{ color: 'green' }}>Free tier activated! Redirecting…</p>}
      {status === 'error' && <p style={{ color: 'red' }}>Failed to activate.</p>}
    </main>
  );
}
