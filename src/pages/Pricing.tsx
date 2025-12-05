import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, AlertCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function Pricing() {
  const navigate = useNavigate();
  const [interval, setInterval] = useState<'month' | 'year'>('year');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [healthCheck, setHealthCheck] = useState<{status: string, message?: string} | null>(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch('/.netlify/functions/stripe-health', {
          method: 'GET',
        });
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'healthy') {
            setHealthCheck({ status: 'ok' });
          } else {
            setHealthCheck({ status: 'warning', message: 'Stripe configuration issue detected' });
          }
        } else {
          setHealthCheck({ status: 'error', message: 'Cannot connect to payment service' });
        }
      } catch (err) {
        console.error('Health check failed:', err);
        setHealthCheck({ status: 'error', message: 'Network error' });
      }
    }
    checkHealth();
  }, []);

  const handleStartPremium = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const payload = {
        interval,
        user: user ? { id: user.id, email: user.email } : null,
      };

      console.log('Initiating checkout with payload:', { interval, hasUser: !!user });

      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch(fetchError => {
        console.error('Fetch failed:', fetchError);
        throw new Error(`Network error: ${fetchError.message}. Check your internet connection or try again.`);
      });

      console.log('Checkout response status:', res.status);

      if (!res.ok) {
        let errorMessage = `Server error (${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData?.error?.message || errorMessage;
          console.error('Checkout error response:', errorData);
        } catch (parseError) {
          const text = await res.text();
          console.error('Could not parse error response:', text);
          errorMessage = `${errorMessage}: ${text.substring(0, 100)}`;
        }
        setError(errorMessage);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log('Checkout session created:', data.sessionId);

      if (!data.url) {
        setError('No checkout URL received from server');
        setLoading(false);
        return;
      }

      console.log('Redirecting to Stripe:', data.url);
      window.location.href = data.url;
    } catch (err: any) {
      console.error('Checkout error:', err);
      const errorMessage = err?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const priceMonthly = 49;
  const priceAnnual = 490;
  const savings = Math.round(((priceMonthly * 12 - priceAnnual) / (priceMonthly * 12)) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="text-lg font-semibold text-black hover:opacity-80 transition"
            >
              ← Supplement Safety Bible
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-black mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Premium Access
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Unlock unlimited interaction checks and professional features
          </p>

          <div className="inline-flex items-center bg-white rounded-2xl p-2 shadow-md border border-gray-200 mb-12">
            <button
              onClick={() => setInterval('month')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                interval === 'month'
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setInterval('year')}
              className={`px-6 py-3 rounded-xl font-medium transition relative ${
                interval === 'year'
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Annual
              {interval === 'year' && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Save {savings}%
                </span>
              )}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border-2 border-blue-200 p-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-bold text-black" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Premium
                </h2>
              </div>
              <p className="text-gray-600">For clinicians and health professionals</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-black">${interval === 'year' ? priceAnnual : priceMonthly}</div>
              <div className="text-gray-500">/{interval === 'year' ? 'year' : 'month'}</div>
              {interval === 'year' && (
                <div className="text-sm text-green-600 font-semibold mt-1">
                  ${(priceAnnual / 12).toFixed(0)}/month billed annually
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Physician-inspired clinical guidance</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Unlimited interaction checker access</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Premium dashboards and analytics</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">PDF report generation</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Priority email support</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Early access to new features</span>
            </div>
          </div>

          {healthCheck && healthCheck.status === 'error' && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <Activity className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800">Connection Issue</p>
                <p className="text-sm text-amber-700 mt-1">{healthCheck.message || 'Payment service unavailable'}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Checkout Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleStartPremium}
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Loading...' : 'Start Premium'}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Cancel anytime. No questions asked.
          </p>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need a different plan?</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View all options →
          </button>
        </div>
      </main>
    </div>
  );
}
