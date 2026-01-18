import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Logo from '../components/Logo';
import { BRAND_NAME_FULL } from '../lib/brand';

export default function PostCheckout() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Confirming payment...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (!sessionId) {
      navigate('/pricing');
      return;
    }

    let mounted = true;

    const confirmPayment = async () => {
      try {
        setStatus('Verifying payment status...');

        const res = await fetch('/.netlify/functions/stripe-confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error('Confirmation failed:', data);
          setStatus('Payment confirmation failed. Redirecting...');
          setTimeout(() => {
            if (mounted) navigate('/pricing');
          }, 2000);
          return;
        }

        setStatus('Payment confirmed! Redirecting to dashboard...');

        setTimeout(() => {
          if (mounted) {
            navigate('/premium/dashboard', { replace: true });
          }
        }, 1500);
      } catch (err) {
        console.error('Confirmation error:', err);
        setStatus('Error confirming payment. Redirecting...');
        setTimeout(() => {
          if (mounted) navigate('/pricing');
        }, 2000);
      }
    };

    confirmPayment();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-8">
          <Logo className="h-16 w-auto mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">{BRAND_NAME_FULL}</h2>
        </div>
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h1>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  );
}
