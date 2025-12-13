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
    <div className="min-h-screen" style={{background: 'var(--color-bg)'}}>
      <SEO
        title="Pricing Plans — Supplement Safety Bible"
        description="Choose the plan that's right for you. Start with a 14-day free trial on paid plans. 60-day money-back guarantee."
        canonical="/pricing"
      />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: 'var(--color-text)'}}>
            Plans for safe, evidence-based decisions
          </h1>
          <p className="text-lg" style={{color: 'var(--color-text-muted)'}}>
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
          <div className="card flex flex-col" style={{padding: '32px'}}>
            <div className="mb-6">
              <div className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3" style={{background: 'var(--color-bg)', color: 'var(--color-text-muted)'}}>
                Free forever
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{color: 'var(--color-text)'}}>Starter</h2>
              <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>For basic safety previews</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold" style={{color: 'var(--color-text)'}}>$0</span>
                <span style={{color: 'var(--color-text-muted)'}}>/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Interaction preview (risk level only)</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Basic supplement/medication search</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Save up to 10 handouts/protocols</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text-muted)'}}>
                <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-text-muted)'}} />
                <span>PDF export not included</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPlan('starter')}
              disabled={loading !== null}
              className="btn-outline w-full disabled:opacity-50"
            >
              Choose Starter
            </button>

            <p className="guarantee-note text-center mt-3">Upgrade anytime.</p>
          </div>

          {/* Pro Card - Most Popular */}
          <div className="card relative shadow-lg" style={{borderColor: 'var(--color-brand)', borderWidth: '2px'}}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-sm font-bold rounded-full" style={{background: 'var(--color-brand)'}}>
              Most popular
            </div>

            <div className="mb-6" style={{paddingTop: '32px', paddingLeft: '32px', paddingRight: '32px'}}>
              <div className="badge-trial mb-3">
                Try free for 14 days
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{color: 'var(--color-text)'}}>Pro</h2>
              <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>For full insights and reports</p>
            </div>

            <div className="mb-6" style={{paddingLeft: '32px', paddingRight: '32px'}}>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold" style={{color: 'var(--color-text)'}}>
                  ${interval === 'annual' ? Math.round(proPrice / 12) : proPrice}
                </span>
                <span style={{color: 'var(--color-text-muted)'}}>/month</span>
              </div>
              {interval === 'annual' && (
                <p className="text-sm mt-1" style={{color: 'var(--color-text-muted)'}}>
                  ${proPrice} billed annually
                </p>
              )}
            </div>

            <ul className="space-y-3 mb-8 flex-1" style={{paddingLeft: '32px', paddingRight: '32px'}}>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span className="font-semibold">Everything in Starter, plus:</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Drug–Supplement Interaction Checker (full results)</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Mechanism explanations (PK/PD, CYP pathways)</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Unlimited handouts & protocols</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>PDF exports</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Shareable links for clients/patients</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Light branding (logo/header)</span>
              </li>
            </ul>

            <div style={{paddingLeft: '32px', paddingRight: '32px', paddingBottom: '32px'}}>
              <button
                onClick={() => handleSelectPlan('pro')}
                disabled={loading !== null}
                className="btn-cta w-full flex items-center justify-center disabled:opacity-50"
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

              <div className="mt-4 text-center space-y-2">
                <p className="guarantee-note">
                  60-day money-back guarantee
                </p>
                <p className="guarantee-note">
                  Change or cancel at any time
                </p>
                <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                  Please note that SafetyBible Pro subscriptions are for individual use. For team, practice, enterprise, or multiple user access, please contact us.
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                  If you have any questions or could use assistance, please do not hesitate to reach out to our <a href="mailto:support@supplementsafetybible.com" className="hover:underline" style={{ color: 'var(--color-trial)' }}>support team</a>.
                </p>
              </div>
            </div>
          </div>

          {/* Premium Card */}
          <div className="card flex flex-col">
            <div className="mb-6" style={{paddingTop: '32px', paddingLeft: '32px', paddingRight: '32px'}}>
              <div className="badge-trial mb-3">
                Try free for 14 days
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{color: 'var(--color-text)'}}>Premium</h2>
              <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>For clinics and professionals</p>
            </div>

            <div className="mb-6" style={{paddingLeft: '32px', paddingRight: '32px'}}>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold" style={{color: 'var(--color-text)'}}>
                  ${interval === 'annual' ? Math.round(premiumPrice / 12) : premiumPrice}
                </span>
                <span style={{color: 'var(--color-text-muted)'}}>/month</span>
              </div>
              {interval === 'annual' && (
                <p className="text-sm mt-1" style={{color: 'var(--color-text-muted)'}}>
                  ${premiumPrice} billed annually
                </p>
              )}
            </div>

            <ul className="space-y-3 mb-8 flex-1" style={{paddingLeft: '32px', paddingRight: '32px'}}>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span className="font-semibold">Everything in Pro, plus:</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>+1 read-only user</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Full white-label (remove SSB branding)</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Customize fonts & colors</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Advanced patient-ready reports</span>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                <span>Priority support</span>
              </li>
            </ul>

            <div style={{paddingLeft: '32px', paddingRight: '32px', paddingBottom: '32px'}}>
              <button
                onClick={() => handleSelectPlan('premium')}
                disabled={loading !== null}
                className="btn-outline w-full flex items-center justify-center disabled:opacity-50"
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

              <div className="mt-4 text-center space-y-2">
                <p className="guarantee-note">
                  60-day money-back guarantee
                </p>
                <p className="guarantee-note">
                  Change or cancel at any time
                </p>
                <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                  Please note that SafetyBible Pro subscriptions are for individual use. For team, practice, enterprise, or multiple user access, please contact us.
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                  If you have any questions or could use assistance, please do not hesitate to reach out to our <a href="mailto:support@supplementsafetybible.com" className="hover:underline" style={{ color: 'var(--color-trial)' }}>support team</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-6 space-y-3" style={{borderTop: '1px solid var(--color-border)'}}>
          <p className="guarantee-note">
            60-day money-back guarantee · Change or cancel at any time
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)', lineHeight: '1.5', maxWidth: '600px', margin: '0 auto' }}>
            Please note that SafetyBible Pro subscriptions are for individual use. For team, practice, enterprise, or multiple user access, please <a href="mailto:support@supplementsafetybible.com" className="hover:underline" style={{ color: 'var(--color-trial)' }}>contact us</a>.
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            If you have any questions or could use assistance, please reach out to our <a href="mailto:support@supplementsafetybible.com" className="hover:underline" style={{ color: 'var(--color-trial)' }}>support team</a>.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--color-text)'}}>
            Compare plans
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{borderBottom: '2px solid var(--color-border)'}}>
                  <th className="text-left py-4 px-4 font-semibold" style={{color: 'var(--color-text)'}}></th>
                  <th className="text-center py-4 px-4 font-semibold" style={{color: 'var(--color-text)'}}>Starter</th>
                  <th className="text-center py-4 px-4 font-semibold relative" style={{color: 'var(--color-text)', background: 'var(--color-bg)'}}>
                    Pro
                    <span className="absolute top-1 right-1 text-xs font-normal" style={{color: 'var(--color-brand)'}}>Popular</span>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{color: 'var(--color-text)'}}>Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr
                    key={idx}
                    style={{borderBottom: '1px solid var(--color-border)', background: feature.category ? 'var(--color-bg)' : 'transparent'}}
                  >
                    <td className={`py-3 px-4 text-sm ${feature.category ? 'font-semibold' : 'pl-8'}`} style={{color: feature.category ? 'var(--color-text)' : 'var(--color-text-muted)'}}>
                      {feature.category || feature.name}
                    </td>
                    <td className="py-3 px-4 text-center text-sm">
                      {feature.category ? '' : renderFeatureValue(feature.starter)}
                    </td>
                    <td className="py-3 px-4 text-center text-sm" style={{background: 'var(--color-bg)'}}>
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
    return <Check className="w-5 h-5 inline-block" style={{color: 'var(--color-success)'}} />;
  }
  if (value === false) {
    return <span style={{color: 'var(--color-text-muted)'}}>—</span>;
  }
  return <span className="text-xs" style={{color: 'var(--color-text)'}}>{value}</span>;
}
