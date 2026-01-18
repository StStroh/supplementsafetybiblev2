import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SEO, StructuredData } from '../lib/seo';
import { startTrialCheckout } from '../utils/checkout';
import { useAlert } from '../state/AlertProvider';

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Supplement Safety Bible — Premium Plan",
  "description": "Premium supplement–medication interaction checker with unlimited searches, advanced filtering, PDF reports, and clinical references.",
  "brand": { "@type": "Brand", "name": "Supplement Safety Bible" },
  "url": "https://supplementsafetybible.com/premium",
  "image": "https://supplementsafetybible.com/og-image.png",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "29.00",
    "availability": "https://schema.org/InStock",
    "url": "https://supplementsafetybible.com/premium"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What do I get with Premium?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlimited interaction searches, advanced filtering, PDF reports, clinical references, and priority support."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cancel anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You can cancel your Premium subscription at any time from your account."
      }
    }
  ]
};

export default function Premium() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [cadence, setCadence] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);
  const [finalizing, setFinalizing] = useState(false);
  const [finalizingStatus, setFinalizingStatus] = useState('Processing your payment...');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);
  }

  useEffect(() => {
    const checkUserTier = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', user.id)
        .maybeSingle();

      if (profile?.plan === 'pro' || profile?.plan === 'pro_trial') {
        navigate('/premium/dashboard', { replace: true });
      }
    };

    checkUserTier();
  }, [navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const success = urlParams.get('success');

    if (!sessionId || !success) {
      return;
    }

    let mounted = true;
    let pollInterval: NodeJS.Timeout | null = null;
    const startTime = Date.now();
    const TIMEOUT_MS = 30000;

    const waitForAuth = async (): Promise<string | null> => {
      const maxWait = 8000;
      const startAuth = Date.now();

      while (Date.now() - startAuth < maxWait) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id) return user.id;
        await new Promise(r => setTimeout(r, 500));
      }
      return null;
    };

    const callFinalize = async (userId: string, sessionId: string) => {
      try {
        const res = await fetch('/.netlify/functions/stripe-finalize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, user_id: userId }),
        });

        const json = await res.json();

        if (!res.ok) {
          console.error('[Premium] Finalize failed:', json);
          return false;
        }

        console.log('[Premium] Finalize success:', json);
        return true;
      } catch (err) {
        console.error('[Premium] Finalize error:', err);
        return false;
      }
    };

    const checkPremiumStatus = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_premium, plan, tier')
          .eq('id', userId)
          .maybeSingle();

        if (error) {
          console.error('[Premium] Profile query error:', error);
          return false;
        }

        const isPremium = data?.is_premium === true ||
                         data?.plan === 'premium' ||
                         data?.plan === 'pro' ||
                         data?.tier === 'premium';

        return isPremium;
      } catch (err) {
        console.error('[Premium] Check error:', err);
        return false;
      }
    };

    const pollForPremium = (userId: string) => {
      pollInterval = setInterval(async () => {
        if (!mounted) return;

        if (Date.now() - startTime > TIMEOUT_MS) {
          if (pollInterval) clearInterval(pollInterval);
          if (mounted) {
            setFinalizingStatus('Taking longer than expected. You can refresh or try again.');
            setTimeout(() => {
              if (mounted) setFinalizing(false);
            }, 3000);
          }
          return;
        }

        const isPremium = await checkPremiumStatus(userId);
        if (isPremium) {
          if (pollInterval) clearInterval(pollInterval);
          if (mounted) {
            setFinalizingStatus('Success! Redirecting to your dashboard...');
            setTimeout(() => {
              navigate('/premium/dashboard', { replace: true });
            }, 1000);
          }
        }
      }, 1500);
    };

    (async () => {
      if (!mounted) return;

      setFinalizing(true);
      setFinalizingStatus('Restoring your session...');

      const userId = await waitForAuth();

      if (!mounted) return;

      if (!userId) {
        setFinalizingStatus('Session restoration failed. Please try again.');
        setTimeout(() => {
          if (mounted) setFinalizing(false);
        }, 3000);
        return;
      }

      const alreadyPremium = await checkPremiumStatus(userId);
      if (alreadyPremium) {
        setFinalizingStatus('Already activated! Redirecting...');
        setTimeout(() => {
          navigate('/premium/dashboard', { replace: true });
        }, 1000);
        return;
      }

      setFinalizingStatus('Finalizing your subscription...');

      await callFinalize(userId, sessionId);

      if (!mounted) return;

      setFinalizingStatus('Activating Premium access...');

      pollForPremium(userId);
    })();

    return () => {
      mounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [navigate]);

  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Free forever',
      monthlyPrice: 0,
      annualPrice: 0,
      isFree: true,
      features: [
        'Search 2,400+ interactions',
        'Basic severity ratings',
        'Limited searches per day',
        'Community support',
        'Mobile access'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Most popular for clinicians',
      monthlyPrice: 29,
      annualPrice: 24,
      popular: true,
      features: [
        'Everything in Starter',
        'Unlimited searches',
        'PDF report exports',
        'Advanced filtering',
        'Priority email support',
        'Clinical references',
        'Batch checking'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Full power for teams',
      monthlyPrice: 79,
      annualPrice: 66,
      features: [
        'Everything in Pro',
        'Team features',
        'Admin dashboard',
        'Audit trail & compliance',
        'Early-access features',
        'Dedicated support',
        'Custom branding',
        'SLA guarantee'
      ]
    }
  ];

  const handleCheckout = async (tier: string) => {
    if (tier === 'starter') {
      navigate('/search');
      return;
    }

    // DIRECT TO CHECKOUT - No auth gate required
    // Guest users can pay first, then sign in to access their subscription
    console.log('[Premium] Direct checkout initiated:', { tier, cadence, isLoggedIn: !!user });

    setLoading(tier);

    try {
      const plan = tier as 'pro' | 'premium';
      const interval = cadence as 'monthly' | 'annual';

      await startTrialCheckout(plan, interval, (message, type) => {
        if (showAlert) {
          showAlert(message, type);
        } else {
          alert(message);
        }
      });
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(null);
    }
  };

  const getPrice = (tier: typeof tiers[0]) =>
    cadence === 'monthly' ? tier.monthlyPrice : tier.annualPrice;

  if (finalizing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-black border-gray-200 rounded-full animate-spin"></div>
          <h1 className="text-2xl font-semibold text-gray-900">{finalizingStatus}</h1>
          <p className="mt-2 text-gray-600">This only takes a moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO + Structured Data (Google can index this page cleanly) */}
      <SEO
        title="Premium | Supplement Safety Bible"
        description="Unlock full supplement–medication interaction safety with Premium: unlimited checks, PDF exports, clinical references, and pro tools."
        canonical="/premium"
        robots="index,follow"
      />
      <StructuredData data={productSchema} />
      <StructuredData data={faqSchema} />

      <nav className="border-b border-gray-100 sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-black">Supplement Safety Bible</span>
            </div>

            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional tools for supplement safety at every scale.
          </p>
        </div>

        <div className="flex items-center justify-center mb-16">
          <div className="bg-gray-50 rounded-2xl p-1.5 inline-flex border border-gray-200">
            <button
              onClick={() => setCadence('monthly')}
              className={`px-6 py-3 rounded-xl font-semibold transition text-sm ${
                cadence === 'monthly'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setCadence('annual')}
              className={`px-6 py-3 rounded-xl font-semibold transition text-sm relative ${
                cadence === 'annual'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                2 months free
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-lg ${
                tier.popular ? 'border-blue-600 shadow-lg relative' : 'border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  {tier.name}
                </h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>

                <div className="mb-2">
                  <span className="text-5xl font-bold text-black">
                    ${getPrice(tier)}
                  </span>
                  {!tier.isFree && <span className="text-gray-600 ml-2">/month</span>}
                </div>

                {tier.isFree && (
                  <div className="text-sm font-semibold text-gray-600">
                    No credit card required
                  </div>
                )}

                {!tier.isFree && cadence === 'annual' && (
                  <div className="text-sm text-gray-600">
                    Billed ${getPrice(tier) * 12}/year
                  </div>
                )}
              </div>

              <button
                onClick={() => handleCheckout(tier.id)}
                disabled={loading !== null && loading !== tier.id}
                className={`w-full py-4 rounded-xl font-semibold transition mb-2 ${
                  tier.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : tier.isFree
                    ? 'bg-gray-100 text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                {loading === tier.id ? (
                  <span>Processing...</span>
                ) : (
                  <span>{tier.isFree ? 'Start Free' : tier.id === 'pro' ? 'Get Pro' : 'Get Premium'}</span>
                )}
              </button>

              {!tier.isFree && (
                <p className="text-center mb-6">
                  <a
                    href="/refund-policy"
                    className="text-xs text-gray-600 hover:text-black hover:underline"
                  >
                    Refund Policy (60-day guarantee)
                  </a>
                </p>
              )}

              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Need help choosing? Compare all features in detail.
          </p>
          <button
            onClick={() => navigate('/faq')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            See full feature comparison in FAQ →
          </button>
          <p className="mt-6">
            <a
              href="/refund-policy"
              className="text-sm text-gray-600 hover:text-black hover:underline"
            >
              Refund Policy (60-day guarantee)
            </a>
          </p>
        </div>

        <div className="mt-20 bg-gray-50 rounded-3xl p-12 text-center border border-gray-200">
          <h2 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of clinicians, pharmacists, and health practitioners who rely on Supplement Safety Bible for accurate supplement-medication interaction data.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2,400+</div>
              <div className="text-sm text-gray-600">Interactions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
              <div className="text-sm text-gray-600">Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600">©️ 2025 Supplement Safety Bible</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <button onClick={() => navigate('/terms')} className="hover:text-black transition">
                Terms
              </button>
              <span className="text-gray-300">•</span>
              <button onClick={() => navigate('/privacy')} className="hover:text-black transition">
                Privacy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}