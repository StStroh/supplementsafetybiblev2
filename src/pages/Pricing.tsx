import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PLAN_PRICE_MAP } from '../lib/stripe/plan-map';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

type BillingInterval = 'monthly' | 'annual';

interface FeatureRow {
  category?: string;
  name: string;
  starter: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
}

const features: FeatureRow[] = [
  { category: 'Safety Features', name: 'Interaction preview (risk level only)', starter: true, pro: false, premium: false },
  { name: 'Full Interaction Checker', starter: false, pro: true, premium: true },
  { name: 'Safety warnings & precautions', starter: false, pro: true, premium: true },
  { name: 'Side-effect summaries', starter: false, pro: true, premium: true },

  { category: 'Handouts & Protocols', name: 'Saved items', starter: '10', pro: 'Unlimited', premium: 'Unlimited' },
  { name: 'PDF export', starter: false, pro: true, premium: true },
  { name: 'Drag-and-drop builder', starter: false, pro: true, premium: true },
  { name: 'Premade tables & infographics', starter: false, pro: true, premium: true },

  { category: 'Branding & Customization', name: 'Shareable live link', starter: false, pro: true, premium: true },
  { name: 'Add business logo/info', starter: false, pro: true, premium: true },
  { name: 'Remove SSB branding', starter: false, pro: false, premium: true },
  { name: 'Customize fonts/colors', starter: false, pro: false, premium: true },

  { category: 'Additional Tools', name: 'Supplement Navigator', starter: 'Limited', pro: 'Full', premium: 'Full' },
  { name: 'Calculators (risk/dosage)', starter: false, pro: 'Coming soon', premium: 'Coming soon' },
  { name: 'Vote on page updates', starter: false, pro: false, premium: 'Coming soon' },

  { category: 'Database Access', name: 'Supplements A–Z', starter: 'Preview', pro: 'Full', premium: 'Full' },
  { name: 'Medications A–Z', starter: 'Preview', pro: 'Full', premium: 'Full' },
  { name: 'Conditions A–Z', starter: 'Preview', pro: 'Full', premium: 'Full' },
  { name: 'Research feed/alerts', starter: false, pro: true, premium: true },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [interval, setInterval] = useState<BillingInterval>('annual');
  const [loading, setLoading] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);
  }

  async function handleSelectPlan(plan: 'starter' | 'pro' | 'premium') {
    if (plan === 'starter') {
      if (!user) {
        navigate('/auth?redirect=/free');
      } else {
        navigate('/free');
      }
      return;
    }

    setLoading(plan);

    try {
      const priceId = plan === 'pro'
        ? (interval === 'annual' ? PLAN_PRICE_MAP.PRO_YEARLY : PLAN_PRICE_MAP.PRO_MONTHLY)
        : (interval === 'annual' ? PLAN_PRICE_MAP.PREMIUM_YEARLY : PLAN_PRICE_MAP.PREMIUM_MONTHLY);

      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId: user?.id,
          userEmail: user?.email,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setLoading(null);
    }
  }

  const proPrice = interval === 'annual' ? 149 : 14.99;
  const premiumPrice = interval === 'annual' ? 249 : 24.99;
  const annualSavings = Math.round(((14.99 * 12 - 149) / (14.99 * 12)) * 100);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Pricing Plans — Supplement Safety Bible"
        description="Choose the plan that's right for you. Start with a 14-day free trial on paid plans. 60-day money-back guarantee."
        canonical="/pricing"
      />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Plans for safe, evidence-based decisions
          </h1>
          <p className="text-lg text-slate-600">
            Start a 14-day free trial on paid plans. 60-day money-back guarantee.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white p-1">
            <button
              onClick={() => setInterval('monthly')}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                interval === 'monthly'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setInterval('annual')}
              className={`px-6 py-2 rounded-full font-semibold transition relative ${
                interval === 'annual'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Annual
              {interval === 'annual' && (
                <span className="absolute -top-3 -right-3 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  Save {annualSavings}%
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Starter Card */}
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 flex flex-col">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full mb-3">
                Free forever
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Starter</h2>
              <p className="text-sm text-slate-600">For basic safety previews</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">$0</span>
                <span className="text-slate-600">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Interaction preview (risk level only)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Basic supplement/medication search</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Save up to 10 handouts/protocols</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <X className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>PDF export not included</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPlan('starter')}
              disabled={loading !== null}
              className="w-full py-3 px-6 rounded-full border-2 border-slate-900 text-slate-900 font-semibold hover:bg-slate-50 transition disabled:opacity-50"
            >
              Choose Starter
            </button>

            <p className="text-xs text-slate-500 text-center mt-3">Upgrade anytime.</p>
          </div>

          {/* Pro Card - Most Popular */}
          <div className="rounded-2xl border-2 border-blue-600 bg-white p-8 flex flex-col relative shadow-lg">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
              Most popular
            </div>

            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                Try free for 14 days
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Pro</h2>
              <p className="text-sm text-slate-600">For full insights and reports</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">
                  ${interval === 'annual' ? Math.round(proPrice / 12) : proPrice}
                </span>
                <span className="text-slate-600">/month</span>
              </div>
              {interval === 'annual' && (
                <p className="text-sm text-slate-600 mt-1">
                  ${proPrice} billed annually
                </p>
              )}
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Everything in Starter, plus:</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Drug–Supplement Interaction Checker (full results)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Mechanism explanations (PK/PD, CYP pathways)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Unlimited handouts & protocols</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>PDF exports</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Shareable links for clients/patients</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Light branding (logo/header)</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPlan('pro')}
              disabled={loading !== null}
              className="w-full py-3 px-6 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading === 'pro' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                'Choose Pro'
              )}
            </button>

            <p className="text-xs text-slate-500 text-center mt-3">
              60-day money-back guarantee. Change or cancel anytime.
            </p>
          </div>

          {/* Premium Card */}
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 flex flex-col">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3">
                Try free for 14 days
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Premium</h2>
              <p className="text-sm text-slate-600">For clinics and professionals</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">
                  ${interval === 'annual' ? Math.round(premiumPrice / 12) : premiumPrice}
                </span>
                <span className="text-slate-600">/month</span>
              </div>
              {interval === 'annual' && (
                <p className="text-sm text-slate-600 mt-1">
                  ${premiumPrice} billed annually
                </p>
              )}
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Everything in Pro, plus:</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>+1 read-only user</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Full white-label (remove SSB branding)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Customize fonts & colors</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Advanced patient-ready reports</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPlan('premium')}
              disabled={loading !== null}
              className="w-full py-3 px-6 rounded-full border-2 border-slate-900 text-slate-900 font-semibold hover:bg-slate-50 transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading === 'premium' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                'Choose Premium'
              )}
            </button>

            <p className="text-xs text-slate-500 text-center mt-3">
              60-day money-back guarantee. Change or cancel anytime.
            </p>
          </div>
        </div>

        <div className="text-center py-6 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            60-day money-back guarantee · Change or cancel at any time
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Compare plans
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900"></th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900 bg-blue-50 relative">
                    Pro
                    <span className="absolute top-1 right-1 text-xs text-blue-600 font-normal">Popular</span>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900">Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-slate-100 ${feature.category ? 'bg-slate-50' : ''}`}
                  >
                    <td className={`py-3 px-4 text-sm ${feature.category ? 'font-semibold text-slate-900' : 'text-slate-700 pl-8'}`}>
                      {feature.category || feature.name}
                    </td>
                    <td className="py-3 px-4 text-center text-sm">
                      {feature.category ? '' : renderFeatureValue(feature.starter)}
                    </td>
                    <td className="py-3 px-4 text-center text-sm bg-blue-50">
                      {feature.category ? '' : renderFeatureValue(feature.pro)}
                    </td>
                    <td className="py-3 px-4 text-center text-sm">
                      {feature.category ? '' : renderFeatureValue(feature.premium)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function renderFeatureValue(value: boolean | string): JSX.Element {
  if (value === true) {
    return <Check className="w-5 h-5 text-green-600 inline-block" />;
  }
  if (value === false) {
    return <span className="text-slate-400">—</span>;
  }
  return <span className="text-slate-700 text-xs">{value}</span>;
}
