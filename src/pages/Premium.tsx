import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Check, Shield, FileText, Zap, AlertCircle, Users, Clock, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { startTrialCheckout } from '../utils/checkout';
import { useAlert } from '../state/AlertProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Supplement Safety Bible",
  "url": "https://supplementsafetybible.com",
  "logo": "https://supplementsafetybible.com/brand/logo.png",
  "description": "Professional supplement-medication interaction screening service"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes the Premium checker different?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Premium provides unlimited interaction searches, comprehensive clinical references, detailed severity ratings, PDF report generation, advanced filtering options, and priority support. Unlike free tools, it includes full access to our database of 2,400+ supplement-medication interactions with detailed mechanisms, timing guidance, and evidence ratings."
      }
    },
    {
      "@type": "Question",
      "name": "Who should use Premium?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Premium is designed for healthcare professionals, pharmacists, nutritionists, researchers, and individuals managing complex medication regimens who need comprehensive interaction screening. It's particularly valuable for those taking multiple medications or supplements, or anyone who wants detailed, evidence-based interaction information."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cancel my subscription anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can cancel anytime from your account settings. If you cancel, you'll retain access until the end of your billing period. We also offer a 60-day money-back guarantee if you're not satisfied for any reason."
      }
    },
    {
      "@type": "Question",
      "name": "Is my health information private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We never store your search queries or medication lists unless you explicitly save them to your account. All data is encrypted, and we comply with healthcare privacy standards. We never sell or share your health information with third parties."
      }
    },
    {
      "@type": "Question",
      "name": "What if I need help using the tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Premium members receive priority email support with responses typically within 24 hours. We also provide comprehensive documentation, video tutorials, and regular webinars on supplement safety topics."
      }
    },
    {
      "@type": "Question",
      "name": "How often is the database updated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our interaction database is continuously updated as new research emerges. Premium members get immediate access to new interactions, updated severity ratings, and the latest clinical evidence. We review and incorporate findings from major pharmacology journals and clinical databases monthly."
      }
    }
  ]
};

export default function Premium() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [cadence, setCadence] = useState<'monthly' | 'annual'>('annual');
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

  const handleCheckout = async (tier: string) => {
    if (tier === 'starter') {
      navigate('/check');
      return;
    }

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

  if (finalizing) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-2xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{finalizingStatus}</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>This only takes a moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <Helmet>
        <title>Professional Interaction Screening | Supplement Safety Bible</title>
        <meta name="description" content="Comprehensive supplement-medication interaction screening with unlimited searches, clinical references, PDF reports, and evidence-based analysis. Trusted by healthcare professionals." />
        <meta name="keywords" content="supplement interaction checker, medication interaction tool, professional interaction screening, supplement safety, clinical interaction database" />
        <link rel="canonical" href="https://supplementsafetybible.com/premium" />
        <meta name="robots" content="index,follow" />

        <meta property="og:title" content="Professional Interaction Screening | Supplement Safety Bible" />
        <meta property="og:description" content="Comprehensive supplement-medication interaction screening for healthcare professionals and individuals managing complex medication regimens." />
        <meta property="og:url" content="https://supplementsafetybible.com/premium" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
            Professional Supplement-Medication Interaction Screening
          </h1>
          <p className="text-xl leading-relaxed mb-8 max-w-3xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Comprehensive analysis of supplement-drug interactions with unlimited searches, clinical references, and evidence-based assessments. Trusted by healthcare professionals and individuals managing complex medication regimens.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>HIPAA-compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>60-day guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Trusted by 10,000+ users</span>
            </div>
          </div>
        </section>

        {/* Pricing Toggle */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
          <div className="flex items-center justify-center">
            <div className="inline-flex rounded-lg p-1" style={{ background: 'var(--color-bg-secondary)' }}>
              <button
                onClick={() => setCadence('monthly')}
                className={`px-6 py-3 rounded-lg font-semibold transition text-sm ${
                  cadence === 'monthly'
                    ? 'bg-white shadow-md'
                    : 'hover:bg-white/50'
                }`}
                style={{
                  color: cadence === 'monthly' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setCadence('annual')}
                className={`px-6 py-3 rounded-lg font-semibold transition text-sm relative ${
                  cadence === 'annual'
                    ? 'bg-white shadow-md'
                    : 'hover:bg-white/50'
                }`}
                style={{
                  color: cadence === 'annual' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'
                }}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Starter - Free */}
            <div className="rounded-2xl p-8 border-2" style={{ background: 'white', borderColor: 'var(--color-border)' }}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  Starter
                </h3>
                <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  For occasional checking
                </p>

                <div className="mb-4">
                  <span className="text-5xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    Free
                  </span>
                </div>

                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                  No credit card required
                </p>
              </div>

              <button
                onClick={() => handleCheckout('starter')}
                className="w-full py-4 rounded-lg font-semibold transition mb-6"
                style={{
                  background: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-primary)'
                }}
              >
                Start Free
              </button>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Basic interaction searching</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Limited daily searches</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Basic severity ratings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Community support</span>
                </li>
              </ul>
            </div>

            {/* Pro - Premium */}
            <div className="rounded-2xl p-8 border-2 relative" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', borderColor: '#3b82f6' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Professional
                </h3>
                <p className="text-blue-100 mb-6">
                  For comprehensive screening
                </p>

                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">
                    ${cadence === 'monthly' ? '29' : '24'}
                  </span>
                  <span className="text-blue-100 ml-2">/month</span>
                </div>

                {cadence === 'annual' && (
                  <p className="text-sm text-blue-100">
                    Billed $288/year
                  </p>
                )}
              </div>

              <button
                onClick={() => handleCheckout('pro')}
                disabled={loading !== null && loading !== 'pro'}
                className="w-full py-4 rounded-lg font-semibold transition mb-2 bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
              >
                {loading === 'pro' ? 'Processing...' : 'Get Professional'}
              </button>

              <p className="text-center mb-6">
                <a
                  href="/refund-policy"
                  className="text-xs text-blue-100 hover:text-white hover:underline"
                >
                  60-day money-back guarantee
                </a>
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white font-semibold">Everything in Starter, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Unlimited interaction searches</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Comprehensive clinical references</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Detailed severity ratings & mechanisms</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">PDF report generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Advanced filtering & sorting</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Batch checking (multiple substances)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Priority email support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Evidence quality ratings</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Free vs Premium Comparison */}
        <section id="free-vs-premium" className="max-w-5xl mx-auto px-4 sm:px-6 mb-20 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Free vs Professional
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Professional provides deeper interaction analysis with mechanism-level details, multi-supplement screening, and exportable reports for comprehensive safety review.
          </p>

          {/* Desktop/Tablet: Side-by-side table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 font-semibold border-b-2" style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}>
                    Feature
                  </th>
                  <th className="text-center p-4 font-semibold border-b-2" style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}>
                    Free
                  </th>
                  <th className="text-center p-4 font-semibold border-b-2 bg-blue-50" style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}>
                    Professional
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>
                    Basic interaction flags
                  </td>
                  <td className="p-4 border-b text-center" style={{ borderColor: 'var(--color-border)' }}>
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="p-4 border-b text-center bg-blue-50" style={{ borderColor: 'var(--color-border)' }}>
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>
                    Mechanism-level explanations (absorption/metabolism)
                  </td>
                  <td className="p-4 border-b text-center" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="p-4 border-b text-center bg-blue-50" style={{ borderColor: 'var(--color-border)' }}>
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>
                    Supplement stack support (multiple supplements)
                  </td>
                  <td className="p-4 border-b text-center" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="p-4 border-b text-center bg-blue-50" style={{ borderColor: 'var(--color-border)' }}>
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>
                    Printable shareable report (PDF)
                  </td>
                  <td className="p-4 border-b text-center" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="p-4 border-b text-center bg-blue-50" style={{ borderColor: 'var(--color-border)' }}>
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>
                    Updates as evidence evolves
                  </td>
                  <td className="p-4 border-b text-center" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-sm text-gray-500">Periodic</span>
                  </td>
                  <td className="p-4 border-b text-center bg-blue-50" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-sm font-semibold text-blue-600">Immediate</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4" style={{ color: 'var(--color-text-secondary)' }}>
                    Priority support & guidance resources
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="p-4 text-center bg-blue-50">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile: Stacked cards */}
          <div className="md:hidden space-y-6">
            {/* Free Card */}
            <div className="rounded-xl border-2 p-6" style={{ borderColor: 'var(--color-border)', background: 'white' }}>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: 'var(--color-text-primary)' }}>
                Free
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Basic interaction flags</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300">✕</span>
                  <span className="text-sm text-gray-400 line-through">Mechanism-level explanations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300">✕</span>
                  <span className="text-sm text-gray-400 line-through">Supplement stack support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300">✕</span>
                  <span className="text-sm text-gray-400 line-through">Printable PDF reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Periodic updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300">✕</span>
                  <span className="text-sm text-gray-400 line-through">Priority support</span>
                </li>
              </ul>
            </div>

            {/* Professional Card */}
            <div className="rounded-xl border-2 p-6 relative" style={{ borderColor: '#3b82f6', background: 'linear-gradient(to bottom, #eff6ff, white)' }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Recommended
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-blue-900">
                Professional
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Basic interaction flags</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Mechanism-level explanations (absorption/metabolism)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Supplement stack support (multiple supplements)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Printable shareable report (PDF)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-blue-600">Immediate updates as evidence evolves</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Priority support & guidance resources</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-sm mt-8 mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Educational information only. Not medical advice.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleCheckout('pro')}
              disabled={loading !== null}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-lg"
            >
              {loading === 'pro' ? 'Processing...' : 'Unlock Professional'}
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href="#features-detail"
              className="text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline"
            >
              See what Professional includes
            </a>
          </div>
        </section>

        {/* Value Propositions */}
        <section id="features-detail" className="max-w-6xl mx-auto px-4 sm:px-6 mb-20 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--color-text-primary)' }}>
            Why Healthcare Professionals Choose Professional
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'var(--color-bg-secondary)' }}>
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                Comprehensive Database
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Access 2,400+ documented supplement-medication interactions with detailed mechanisms, severity ratings, and clinical evidence citations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'var(--color-bg-secondary)' }}>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                Professional Reports
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Generate detailed PDF reports for patient counseling, documentation, or personal reference. Include evidence ratings and clinical recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'var(--color-bg-secondary)' }}>
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                Continuous Updates
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Database updated monthly with new research findings. Premium members get immediate access to newly identified interactions and updated evidence.
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
          <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--color-bg-secondary)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Join pharmacists, physicians, nutritionists, and health practitioners who rely on evidence-based interaction screening for their practice and personal use.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">2,400+</div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Interactions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--color-text-primary)' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                What makes the Premium checker different?
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Premium provides unlimited interaction searches, comprehensive clinical references, detailed severity ratings, PDF report generation, advanced filtering options, and priority support. Unlike free tools, it includes full access to our database of 2,400+ supplement-medication interactions with detailed mechanisms, timing guidance, and evidence ratings.
              </p>
            </div>

            <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                Who should use Premium?
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Premium is designed for healthcare professionals, pharmacists, nutritionists, researchers, and individuals managing complex medication regimens who need comprehensive interaction screening. It's particularly valuable for those taking multiple medications or supplements, or anyone who wants detailed, evidence-based interaction information.
              </p>
            </div>

            <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                Can I cancel my subscription anytime?
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Yes, you can cancel anytime from your account settings. If you cancel, you'll retain access until the end of your billing period. We also offer a 60-day money-back guarantee if you're not satisfied for any reason.
              </p>
            </div>

            <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                Is my health information private?
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Absolutely. We never store your search queries or medication lists unless you explicitly save them to your account. All data is encrypted, and we comply with healthcare privacy standards. We never sell or share your health information with third parties.
              </p>
            </div>

            <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                What if I need help using the tool?
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Premium members receive priority email support with responses typically within 24 hours. We also provide comprehensive documentation, video tutorials, and regular webinars on supplement safety topics.
              </p>
            </div>

            <div className="border-l-4 pl-6 py-2" style={{ borderColor: 'var(--color-primary)' }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                How often is the database updated?
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Our interaction database is continuously updated as new research emerges. Premium members get immediate access to new interactions, updated severity ratings, and the latest clinical evidence. We review and incorporate findings from major pharmacology journals and clinical databases monthly.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20">
          <div className="rounded-lg border p-6 flex items-start gap-4" style={{ background: '#FFF3E0', borderColor: '#FFB74D' }}>
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#F57C00' }} />
            <div>
              <h3 className="font-bold mb-2" style={{ color: '#E65100' }}>
                Professional Tool, Not Medical Advice
              </h3>
              <p className="text-sm" style={{ color: '#E65100' }}>
                This interaction screening tool provides information based on available scientific evidence but does not constitute medical advice. Always consult qualified healthcare professionals before starting, stopping, or changing any medications or supplements. Individual responses can vary, and professional medical judgment should guide all treatment decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20 text-center">
          <div className="rounded-2xl p-12" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of healthcare professionals using evidence-based interaction screening.
            </p>
            <button
              onClick={() => handleCheckout('pro')}
              disabled={loading !== null}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-lg"
            >
              {loading === 'pro' ? 'Processing...' : 'Get Professional Access'}
              <ChevronRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-sm text-blue-100">
              60-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
