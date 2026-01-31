import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, X, AlertCircle, Shield, Lock, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { startCheckout } from '../utils/checkout';
import { useAlert } from '../state/AlertProvider';
import { getPricingFlags } from '../lib/pricingFlags';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO, StructuredData } from '../lib/seo';
import Logo from '../components/Logo';
import { BRAND_NAME_FULL } from '../lib/brand';
import PricingPageChecker from '../components/PricingPageChecker';
import { trackBehavior, resetPageTimer } from '../lib/salesIntent';
import { trackInitiateCheckout } from '../lib/tiktok';
import { INFO_EMAIL } from '../lib/support';

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
  const [searchParams] = useSearchParams();
  const pricingFlags = getPricingFlags();
  const [interval, setInterval] = useState<BillingInterval>('monthly'); // Default to monthly
  const [user, setUser] = useState<any>(null);
  const [showCancelledAlert, setShowCancelledAlert] = useState(false);

  const showChecker = searchParams.get('from') === 'landing-checker';

  useEffect(() => {
    loadUser();
    const params = new URLSearchParams(window.location.search);
    if (params.get('cancelled') === '1') {
      setShowCancelledAlert(true);
    }

    // Track page view for sales intent
    resetPageTimer();
    trackBehavior({
      event_type: 'page_view',
      page_path: '/pricing'
    }).then(() => {
      window.dispatchEvent(new Event('sales-intent-updated'));
    }).catch(() => {
      // Silent fail
    });
  }, []);

  async function loadUser() {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);
  }

  function handleSelectStarter() {
    if (!user) {
      navigate('/auth?redirect=/free');
    } else {
      navigate('/free');
    }
  }

  function handleSelectPro() {
    // Track TikTok InitiateCheckout event
    trackInitiateCheckout('Subscription', 'pricing');
    startCheckout('pro', interval, (msg) => showAlert(msg, 'error'));
  }

  function handleSelectPremium() {
    // Track TikTok InitiateCheckout event
    trackInitiateCheckout('Subscription', 'pricing');
    startCheckout('premium', interval, (msg) => showAlert(msg, 'error'));
  }

  const proMonthly = 14.99;
  const proAnnual = 144;
  const premiumMonthly = 24.99;
  const premiumAnnual = 240;

  const annualSavings = Math.round(((proMonthly * 12 - proAnnual) / (proMonthly * 12)) * 100);

  // Structured data for pricing page - SoftwareApplication with subscription offers
  const pricingSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Supplement Safety Bible',
    'applicationCategory': 'HealthApplication',
    'operatingSystem': 'Web',
    'url': 'https://supplementsafetybible.com',
    'description': 'Professional supplement-medication interaction screening tool for healthcare providers and individuals',
    'offers': [
      {
        '@type': 'Offer',
        'name': 'Starter Plan',
        'description': 'Free plan with basic interaction checking',
        'url': 'https://supplementsafetybible.com/pricing',
        'priceCurrency': 'USD',
        'price': '0',
        'priceValidUntil': '2027-12-31',
        'availability': 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        'name': 'Pro Plan - Monthly',
        'description': 'Unlimited interaction checks with evidence-based insights',
        'url': 'https://supplementsafetybible.com/pricing',
        'priceCurrency': 'USD',
        'price': proMonthly.toString(),
        'priceValidUntil': '2027-12-31',
        'availability': 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        'name': 'Pro Plan - Annual',
        'description': 'Unlimited interaction checks with evidence-based insights (annual)',
        'url': 'https://supplementsafetybible.com/pricing',
        'priceCurrency': 'USD',
        'price': proAnnual.toString(),
        'priceValidUntil': '2027-12-31',
        'availability': 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        'name': 'Premium Plan - Monthly',
        'description': 'Advanced features for healthcare professionals',
        'url': 'https://supplementsafetybible.com/pricing',
        'priceCurrency': 'USD',
        'price': premiumMonthly.toString(),
        'priceValidUntil': '2027-12-31',
        'availability': 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        'name': 'Premium Plan - Annual',
        'description': 'Advanced features for healthcare professionals (annual)',
        'url': 'https://supplementsafetybible.com/pricing',
        'priceCurrency': 'USD',
        'price': premiumAnnual.toString(),
        'priceValidUntil': '2027-12-31',
        'availability': 'https://schema.org/InStock'
      }
    ]
  };

  return (
    <div className="min-h-screen" style={{background: 'var(--color-bg)'}}>
      <SEO
        title="Pricing Plans — Supplement Safety Bible"
        description="Professional supplement-medication interaction screening for healthcare providers and individuals."
        canonical="/pricing"
      />
      <StructuredData data={pricingSchema} />
      <Navbar />

      {showCancelledAlert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="rounded-lg border-2 p-4 flex items-start gap-3" style={{ borderColor: '#FFA726', background: '#FFF3E0' }}>
            <div className="flex-shrink-0 mt-0.5">
              <Logo className="h-8 w-auto" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-5 h-5" style={{ color: '#F57C00' }} />
                <h3 className="font-semibold" style={{ color: '#E65100' }}>Checkout Cancelled</h3>
              </div>
              <p className="text-sm" style={{ color: '#E65100' }}>
                Your payment was cancelled. No charges were made. When you're ready, choose a plan below to continue.
              </p>
              <p className="text-xs mt-2 font-medium" style={{ color: '#BF360C' }}>{BRAND_NAME_FULL}</p>
            </div>
            <button
              onClick={() => setShowCancelledAlert(false)}
              className="flex-shrink-0 p-1 rounded hover:bg-orange-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" style={{ color: '#E65100' }} />
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {showChecker && <PricingPageChecker />}

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: 'var(--color-text)'}}>
            Plans for Safe, Evidence-Based Decisions
          </h1>
          <p className="text-lg" style={{color: 'var(--color-text-muted)'}}>
            Professional supplement-medication interaction screening
          </p>

          {pricingFlags.enableAnnualToggle && (
            <div className="mt-8 inline-flex flex-col items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border-2" style={{borderColor: 'var(--color-border)', background: 'var(--color-surface)', padding: '4px'}}>
                <button
                  onClick={() => setInterval('monthly')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    interval === 'monthly' ? 'text-white' : ''
                  }`}
                  style={{
                    background: interval === 'monthly' ? 'var(--color-brand)' : 'transparent',
                    color: interval === 'monthly' ? 'white' : 'var(--color-text-muted)'
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setInterval('annual')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all relative ${
                    interval === 'annual' ? 'text-white' : ''
                  }`}
                  style={{
                    background: interval === 'annual' ? 'var(--color-brand)' : 'transparent',
                    color: interval === 'annual' ? 'white' : 'var(--color-text-muted)'
                  }}
                >
                  Pay yearly (save {annualSavings}%)
                  {interval === 'annual' && (
                    <span className="absolute -top-2 -right-2 text-white text-xs px-2 py-0.5 rounded-full font-bold" style={{background: 'var(--color-success)'}}>
                      Save {annualSavings}%
                    </span>
                  )}
                </button>
              </div>
              {interval === 'annual' && (
                <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>
                  Best value for ongoing use
                </p>
              )}
            </div>
          )}

          {!pricingFlags.enableAnnualToggle && (
            <div className="mt-6">
              <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>
                Yearly plan available soon
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl p-8 mb-12" style={{background: 'rgba(94, 59, 118, 0.03)', border: '1px solid rgba(94, 59, 118, 0.1)'}}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Card */}
            <div className="card flex flex-col relative" style={{padding: '32px', background: 'var(--color-surface)'}}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{color: 'var(--color-text)'}}>Starter</h2>
                <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>Basic checks to get you started.</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold" style={{color: 'var(--color-text)'}}>Free</span>
                </div>
              </div>

              <button
                onClick={handleSelectStarter}
                className="btn-outline w-full mb-6"
              >
                Start free
              </button>

              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-3" style={{color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
                  Essentials
                </h3>
                <ul className="space-y-3">
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
                    <span>Up to 10 checks per month</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text-muted)'}}>
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-text-muted)'}} />
                    <span>No PDF exports</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text-muted)'}}>
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-text-muted)'}} />
                    <span>No clinical explanations</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-center text-xs" style={{color: 'var(--color-text-muted)'}}>
                  No card required.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Shield size={14} style={{color: 'var(--color-success)'}} />
                  <p className="text-center text-xs" style={{color: 'var(--color-text-muted)'}}>
                    Secure connection (TLS).
                  </p>
                </div>
              </div>
            </div>

            {/* Pro Card - Most Popular */}
            <div className="card relative shadow-xl flex flex-col" style={{borderColor: 'var(--color-brand)', borderWidth: '2px', padding: '32px', background: 'var(--color-surface)'}}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-sm font-bold rounded-full" style={{background: 'var(--color-brand)'}}>
                Most popular
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{color: 'var(--color-text)'}}>Pro</h2>
                <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>
                  {interval === 'monthly' ? 'Most popular for everyday users.' : 'Best value for ongoing use.'}
                </p>
              </div>

              <div className="mb-6">
                {pricingFlags.enableFirstMonthAnchor && interval === 'monthly' && (
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-bold rounded-full" style={{background: 'var(--color-trial)', color: 'white'}}>
                      First month ${pricingFlags.firstMonthPricePro}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold" style={{color: 'var(--color-text)'}}>
                    ${interval === 'monthly' ? proMonthly : proAnnual}
                  </span>
                  <span className="text-lg" style={{color: 'var(--color-text-muted)'}}>
                    {interval === 'monthly' ? '/ month' : '/ year'}
                  </span>
                </div>
                {pricingFlags.enableFirstMonthAnchor && interval === 'monthly' && (
                  <p className="text-xs mt-1" style={{color: 'var(--color-text-muted)'}}>
                    Then ${proMonthly}/month. Cancel anytime.
                  </p>
                )}
                {interval === 'annual' && (
                  <p className="text-sm mt-1" style={{color: 'var(--color-text-muted)'}}>
                    Save {annualSavings}% vs monthly.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSelectPro}
                data-testid={`checkout-btn-pro-${interval === 'monthly' ? 'monthly' : 'annual'}`}
                className="btn-cta w-full mb-6"
              >
                {interval === 'monthly' ? 'Start Pro' : 'Start Pro (Yearly)'}
              </button>

              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-3" style={{color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
                  Everything in Starter, plus:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>Unlimited interaction checks</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>Full clinical explanations (PK/PD, CYP pathways)</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>Evidence-based recommendations</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>PDF report exports</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>Shareable patient handouts</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>Priority email support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-center text-xs" style={{color: 'var(--color-text-muted)'}}>
                  Cancel anytime.
                </p>
                <p className="text-center text-xs" style={{color: 'var(--color-text-muted)'}}>
                  14-day trial included.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <CreditCard size={14} style={{color: 'var(--color-text-muted)'}} />
                  <p className="text-center text-xs" style={{color: 'var(--color-text-muted)'}}>
                    Secure checkout via Stripe.
                  </p>
                </div>
              </div>
            </div>

            {/* Clinical/Premium Card */}
            <div className="card flex flex-col relative" style={{padding: '32px', background: 'var(--color-surface)'}}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{color: 'var(--color-text)'}}>Clinical</h2>
                <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>
                  {interval === 'monthly' ? 'For deeper, ongoing review.' : 'Best value for clinical practice.'}
                </p>
              </div>

              <div className="mb-6">
                {pricingFlags.enableFirstMonthAnchor && interval === 'monthly' && (
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-bold rounded-full" style={{background: 'var(--color-trial)', color: 'white'}}>
                      First month ${pricingFlags.firstMonthPricePremium}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold" style={{color: 'var(--color-text)'}}>
                    ${interval === 'monthly' ? premiumMonthly : premiumAnnual}
                  </span>
                  <span className="text-lg" style={{color: 'var(--color-text-muted)'}}>
                    {interval === 'monthly' ? '/ month' : '/ year'}
                  </span>
                </div>
                {pricingFlags.enableFirstMonthAnchor && interval === 'monthly' && (
                  <p className="text-xs mt-1" style={{color: 'var(--color-text-muted)'}}>
                    Then ${premiumMonthly}/month. Cancel anytime.
                  </p>
                )}
                {interval === 'annual' && (
                  <p className="text-sm mt-1" style={{color: 'var(--color-text-muted)'}}>
                    Save {annualSavings}% vs monthly.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSelectPremium}
                data-testid={`checkout-btn-premium-${interval === 'monthly' ? 'monthly' : 'annual'}`}
                className="btn-cta w-full mb-6"
              >
                {interval === 'monthly' ? 'Start Clinical' : 'Start Clinical (Yearly)'}
              </button>

              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-3" style={{color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
                  Everything in Pro, plus:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>+1 read-only user</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>Full white-label branding</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>Custom fonts & colors</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>Advanced patient-ready reports</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
                    <span>Clinical follow-up protocols</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-center text-xs" style={{color: 'var(--color-text-muted)'}}>
                  Cancel anytime.
                </p>
                <p className="text-center text-xs" style={{color: 'var(--color-text-muted)'}}>
                  14-day trial included.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <CreditCard size={14} style={{color: 'var(--color-text-muted)'}} />
                  <p className="text-center text-xs" style={{color: 'var(--color-text-muted)'}}>
                    Secure checkout via Stripe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-6 space-y-3 max-w-2xl mx-auto">
          <p className="text-sm font-medium" style={{color: 'var(--color-text-muted)'}}>
            Cancel anytime · Secure checkout via Stripe
          </p>
          <p className="text-xs" style={{color: 'var(--color-text-muted)', lineHeight: '1.6'}}>
            For education only. Not medical advice.
          </p>
          <p className="text-xs" style={{color: 'var(--color-text-muted)', lineHeight: '1.6'}}>
            Supplement Safety Bible provides evidence-based educational guidance to support informed clinical decisions. This tool does not replace professional medical judgment, official prescribing information, or consultation with qualified healthcare providers.
          </p>
          <p className="text-xs" style={{color: 'var(--color-text-muted)'}}>
            Questions? Contact us at{' '}
            <a href={`mailto:${INFO_EMAIL}`} className="hover:underline" style={{color: 'var(--color-trial)'}}>
              {INFO_EMAIL}
            </a>
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
                  <th className="text-center py-4 px-4 font-semibold" style={{color: 'var(--color-text)'}}>Clinical</th>
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
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>What do paid plans include?</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>Paid plans unlock Pro and Clinical features, including unlimited interaction checks, clinical explanations, evidence‑based recommendations and more. You can upgrade or downgrade at any time, and you'll only be charged for the current billing period.</p>
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
                Pro is for individual practitioners. Clinical includes 1 additional read-only user. For larger teams or institutions, please contact us.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text)'}}>
                Is this a medical device or diagnostic tool?
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
                No. Supplement Safety Bible provides evidence-based educational guidance and does not replace professional medical judgment, diagnosis, or treatment recommendations. Always consult official prescribing information and qualified healthcare providers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text)'}}>
                How often is the data updated?
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
                Our interaction database is continuously reviewed and updated as new evidence becomes available from peer-reviewed literature and clinical studies.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text)'}}>
                Does Supplement Safety Bible cover prescription medications?
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
                Yes. Supplement Safety Bible screens for interactions with prescription medications including controlled substances, narrow-therapeutic-index drugs (warfarin, digoxin), immunosuppressants, and other medications requiring careful monitoring when combined with dietary supplements.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-lg" style={{background: 'rgba(94, 59, 118, 0.05)', border: '1px solid rgba(94, 59, 118, 0.1)'}}>
            <p className="text-sm text-center" style={{color: 'var(--color-text-muted)', lineHeight: '1.7'}}>
              <strong>Medical Disclaimer:</strong> Supplement Safety Bible supports informed decision-making for educational purposes only. It does not provide medical diagnoses, treatment recommendations, or replace consultation with qualified healthcare providers. Use alongside professional clinical judgment and official prescribing information.
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
