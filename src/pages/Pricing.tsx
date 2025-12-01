import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing() {
  const navigate = useNavigate();
  const [interval, setInterval] = useState<'month' | 'year'>('year');
  const [loading, setLoading] = useState(false);

  async function startCheckout(tier: string) {
    const res = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);

    const stripe = (window as any).Stripe?.(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    if (!stripe) throw new Error('Stripe.js not loaded');
    await stripe.redirectToCheckout({ sessionId: data.sessionId });
  }

  const handleStartPremium = async () => {
    setLoading(true);
    try {
      const tier = interval === 'year' ? 'premium_annual' : 'premium_monthly';
      await startCheckout(tier);
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert(err?.message || 'An error occurred. Please try again.');
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
