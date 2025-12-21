import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { startTrialCheckout } from '../utils/checkout';
import { useAlert } from '../state/AlertProvider';
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
  { category: 'Interaction Screening', name: '', starter: false, pro: false, premium: false },
  { name: 'Supplement–Medication interaction database', starter: true, pro: true, premium: true },
  { name: 'Controlled substance & narrow-therapeutic-index drug coverage', starter: 'Preview only', pro: true, premium: true },
  { name: 'CYP enzyme interaction analysis', starter: false, pro: true, premium: true },
  { name: 'Pharmacodynamic interaction assessment', starter: false, pro: true, premium: true },
  { category: 'Risk Classification', name: '', starter: false, pro: false, premium: false },
  { name: 'Color-coded severity ratings (Low/Medium/High)', starter: 'Risk level', pro: true, premium: true },
  { name: 'Clinical significance scoring', starter: false, pro: true, premium: true },
  { name: 'Onset timing & duration estimates', starter: false, pro: true, premium: true },
  { category: 'Evidence & Documentation', name: '', starter: false, pro: false, premium: false },
  { name: 'Evidence-based rationale', starter: false, pro: true, premium: true },
  { name: 'Peer-reviewed literature references', starter: false, pro: 'Summary', premium: 'Full citations' },
  { name: 'Mechanism of action explanations', starter: false, pro: true, premium: true },
  { category: 'Clinical Management', name: '', starter: false, pro: false, premium: false },
  { name: 'Basic safety recommendations', starter: true, pro: true, premium: true },
  { name: 'Lab monitoring guidance', starter: false, pro: true, premium: true },
  { name: 'Dose adjustment considerations', starter: false, pro: true, premium: true },
  { name: 'Clinical follow-up protocols', starter: false, pro: false, premium: true },
  { category: 'Reports & Exports', name: '', starter: false, pro: false, premium: false },
  { name: 'PDF report generation', starter: false, pro: true, premium: true },
  { name: 'White-label branding', starter: false, pro: false, premium: true },
  { category: 'Usage Limits', name: '', starter: false, pro: false, premium: false },
  { name: 'Interaction checks per month', starter: '10', pro: 'Unlimited', premium: 'Unlimited' },
  { name: 'Saved regimens', starter: '3', pro: 'Unlimited', premium: 'Unlimited' },
];

export default function Pricing() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [interval, setInterval] = useState<BillingInterval>('annual');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);
  }

  function handleSelectPlan(plan: 'starter') {
    if (!user) {
      navigate('/auth?redirect=/free');
    } else {
      navigate('/free');
    }
  }

  const proPrice = interval === 'annual' ? 199 : 14.99;
  const premiumPrice = interval === 'annual' ? 399 : 24.99;
  const annualSavings = Math.round(((14.99 * 12 - 199) / (14.99 * 12)) * 100);

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

          <div className="mt-6 text-center max-w-md mx-auto">
            <p className="text-sm font-medium mb-1" style={{color: 'var(--color-text-muted)'}}>
              Most professionals choose annual to save time and money.
            </p>
            <p className="text-xs" style={{color: 'var(--color-text-muted)', lineHeight: '1.5'}}>
              Save up to 17% compared to monthly. Lock in uninterrupted access for the year.
            </p>
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
              className="btn-outline w-full"
            >
              Start free
            </button>

            <p className="guarantee-note text-center mt-3">No credit card required</p>
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
              <p className="text-xs mt-2" style={{color: 'var(--color-text-muted)'}}>
                Best value when billed annually.
              </p>
            </div>

            <div className="mb-6" style={{paddingLeft: '32px', paddingRight: '32px'}}>
              <h3 className="font-semibold text-base mb-2" style={{color: 'var(--color-text)'}}>
                Work smarter and help your patients thrive
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.6'}}>
                Supplement Safety Bible Pro can save you hours every week and keep your patient resources automatically updated with the latest evidence.
              </p>
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
                type="button"
                onClick={() => startTrialCheckout('pro', interval, showAlert)}
                data-testid={`checkout-btn-pro-${interval === 'monthly' ? 'monthly' : 'annual'}`}
                className="btn-cta w-full flex items-center justify-center relative"
                style={{ zIndex: 60, pointerEvents: 'auto' }}
              >
                Try Pro free for 14 days
              </button>

              <div className="mt-4 text-center space-y-2">
                <p className="guarantee-note">
                  Full access. Cancel anytime.
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
              <p className="text-xs mt-2" style={{color: 'var(--color-text-muted)'}}>
                Best value when billed annually.
              </p>
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
                type="button"
                onClick={() => startTrialCheckout('premium', interval, showAlert)}
                data-testid={`checkout-btn-premium-${interval === 'monthly' ? 'monthly' : 'annual'}`}
                className="btn-cta w-full flex items-center justify-center relative"
                style={{ zIndex: 60, pointerEvents: 'auto' }}
              >
                Try Premium free for 14 days
              </button>

              <div className="mt-4 text-center space-y-2">
                <p className="guarantee-note">
                  Designed for clinical use.
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
                  <th className="text-left py-4 px-4 font-semibold" style={{color: 'var(--color-text)'}}>Feature</th>
                  <th className="text-center py-4 px-4 font-semibold" style={{color: 'var(--color-text)'}}>Starter</th>
                  <th className="text-center py-4 px-4 font-semibold relative" style={{color: 'var(--color-text)', background: 'var(--color-bg)'}}>
                    Pro
                    <div className="text-xs font-normal mt-1" style={{color: 'var(--color-brand)'}}>Most Popular</div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{color: 'var(--color-text)'}}>Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => {
                  if (feature.category) {
                    return (
                      <tr key={idx} className="bg-gray-50">
                        <td
                          colSpan={4}
                          className="py-3 px-4 font-bold text-sm uppercase tracking-wide"
                          style={{color: 'var(--color-text)', borderTop: '2px solid var(--color-border)'}}
                        >
                          {feature.category}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr
                      key={idx}
                      style={{borderBottom: '1px solid var(--color-border)'}}
                    >
                      <td className="py-3 px-4 text-sm" style={{color: 'var(--color-text-muted)'}}>
                        {feature.name}
                      </td>
                      <td className="py-3 px-4 text-center text-sm">
                        {renderFeatureValue(feature.starter)}
                      </td>
                      <td className="py-3 px-4 text-center text-sm" style={{background: 'var(--color-bg)'}}>
                        {renderFeatureValue(feature.pro)}
                      </td>
                      <td className="py-3 px-4 text-center text-sm">
                        {renderFeatureValue(feature.premium)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--color-text)'}}>
            Pricing FAQs
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text)'}}>
                What happens during the free trial?
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
                During the Pro or Premium trial, you have full access to all features in that plan. You can cancel at any time before the trial ends and you won't be charged.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text)'}}>
                Is there a money-back guarantee?
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
                Yes. All paid plans are covered by a 60-day money-back guarantee. Cancel within 60 days for a full refund.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text)'}}>
                Can I change or cancel my plan anytime?
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
                Yes. You can upgrade, downgrade, or cancel from your account settings. No contracts or penalties.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text)'}}>
                Is this for individual or team use?
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
                Pro and Premium are for individual practitioners. For teams or institutions, contact us.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text)'}}>
                Is Supplement Safety Bible a medical device?
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
                No. It provides evidence-based educational guidance and does not replace professional medical judgment or prescribing information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text)'}}>
                How often is the data updated?
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
                Continuously reviewed and updated as new evidence becomes available.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text)'}}>
                Does SafetyBible cover controlled substances and prescription medications?
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
                Yes. SafetyBible includes screening for interactions with controlled substances, narrow-therapeutic-index drugs (like warfarin, digoxin), immunosuppressants, and other prescription medications that require careful monitoring when combined with dietary supplements.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-lg" style={{background: 'var(--color-bg)', border: '1px solid var(--color-border)'}}>
            <p className="text-sm text-center" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
              Supplement Safety Bible supports informed decision-making. It does not provide medical diagnoses or treatment recommendations and should be used alongside professional judgment and official prescribing information.
            </p>
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
