import { useEffect, useState } from 'react';
import { requirePremium } from '../lib/premiumGuard';
import { Link, useNavigate } from 'react-router-dom';

export default function Premium() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const ok = await requirePremium();
      if (!mounted) return;
      setAllowed(ok);
      setLoading(false);
      if (!ok) navigate('/pricing');
    })();
    return () => { mounted = false; };
  }, [navigate]);

  if (loading) return <div className="p-6">Checking your premium access…</div>;
  if (!allowed) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Premium</h1>
      <p className="mt-2">You have access. 🎉</p>
      <Link to="/" className="text-blue-600 underline mt-4 inline-block">Home</Link>
    </div>
  );
}
