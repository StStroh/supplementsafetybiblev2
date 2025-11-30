import { useState, useEffect } from 'react';

export default function Free() {
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/grant-free', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setStatus('success');
          setMessage('Free tier activated!');
          setTimeout(() => window.location.href = '/account', 2000);
        } else {
          setStatus('error');
          setMessage('Failed to activate');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Network error');
      });
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Free Tier Activation</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && <p style={{ color: 'green' }}>{message}</p>}
      {status === 'error' && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}
