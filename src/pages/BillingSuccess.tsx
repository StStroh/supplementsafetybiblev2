import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

type VerificationState = 'loading' | 'success' | 'error' | 'missing_session';

interface SessionData {
  email: string;
  plan: string;
  tier: string;
  interval: string;
  subscription_status: string;
  customer_name?: string;
  isTrialing?: boolean;
}

export default function BillingSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<VerificationState>('loading');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [autoRedirectSeconds, setAutoRedirectSeconds] = useState(5);

  useEffect(() => {
    verifyAndProvision();
  }, []);

  useEffect(() => {
    if (state === 'success' && magicLinkSent && autoRedirectSeconds > 0) {
      const timer = setTimeout(() => {
        setAutoRedirectSeconds(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (autoRedirectSeconds === 0) {
      navigate('/check');
    }
  }, [state, magicLinkSent, autoRedirectSeconds, navigate]);

  async function verifyAndProvision() {
    const sessionId = searchParams.get('session_id');

    console.log('[BillingSuccess] Verification started');
    console.log('[BillingSuccess] session_id:', sessionId ? 'present' : 'MISSING');

    if (!sessionId) {
      console.error('[BillingSuccess] ❌ No session_id in URL');
      setState('missing_session');
      return;
    }

    try {
      console.log('[BillingSuccess] Calling backend verification...');
      const res = await fetch(`/.netlify/functions/billing-success?session_id=${sessionId}`);

      console.log('[BillingSuccess] Response status:', res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('[BillingSuccess] Backend error:', errorData);
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      const data: SessionData = await res.json();
      console.log('[BillingSuccess] ✅ Verification successful:', {
        email: data.email,
        plan: data.plan,
        tier: data.tier,
      });

      if (!data.email || !data.email.includes('@')) {
        throw new Error('Invalid email returned from server');
      }

      setSessionData(data);
      setState('success');

      await sendMagicLink(data.email);

    } catch (err: any) {
      console.error('[BillingSuccess] ❌ Verification failed:', err);
      setState('error');
    }
  }

  async function sendMagicLink(email: string) {
    console.log('[BillingSuccess] Sending magic link to:', email);

    try {
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${origin}/check`,
        },
      });

      if (error) {
        console.error('[BillingSuccess] Magic link error:', error);
        return;
      }

      console.log('[BillingSuccess] ✅ Magic link sent');
      setMagicLinkSent(true);

    } catch (err) {
      console.error('[BillingSuccess] Magic link send failed:', err);
    }
  }

  if (state === 'loading') {
    return (
      <>
        <SEO title="Processing Payment" />
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Confirming your subscription
              </h1>
              <p className="text-gray-600">This will only take a moment...</p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (state === 'missing_session') {
    return (
      <>
        <SEO title="Session Required" />
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
              <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Session Not Found
              </h1>
              <p className="text-gray-600 text-center mb-6">
                This page requires a valid checkout session. If you just completed a payment,
                please return to the pricing page and try again.
              </p>
              <button
                onClick={() => navigate('/pricing')}
                className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Return to Pricing
              </button>
              <p className="text-xs text-gray-500 text-center mt-6">
                Need help? Email{' '}
                <a href="mailto:support@supplementsafetybible.com" className="text-emerald-600 hover:underline">
                  support@supplementsafetybible.com
                </a>
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (state === 'error') {
    return (
      <>
        <SEO title="Verification Error" />
        <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-orange-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Verification Error
              </h1>
              <p className="text-gray-600 text-center mb-6">
                We couldn't verify your checkout session. Your payment may still have been processed.
                Please check your email or contact support for assistance.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Sign In
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-6">
                Need help? Email{' '}
                <a href="mailto:support@supplementsafetybible.com" className="text-emerald-600 hover:underline">
                  support@supplementsafetybible.com
                </a>
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const displayName = sessionData?.customer_name || 'there';
  const planName = sessionData?.tier === 'premium' ? 'Premium' : 'Pro';

  return (
    <>
      <SEO title="Welcome to Supplement Safety Bible" />
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-lg w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />

              <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
                Welcome to {planName}!
              </h1>

              <p className="text-lg text-gray-700 text-center mb-8">
                Your subscription is active, {displayName}. We've sent a secure login link to <strong>{sessionData?.email}</strong>
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-900 mb-1">
                      Check your email
                    </p>
                    <p className="text-sm text-emerald-800">
                      Click the login link we sent to access your premium features instantly.
                      No password needed.
                    </p>
                  </div>
                </div>
              </div>

              {magicLinkSent && autoRedirectSeconds > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-900 text-center">
                    Auto-redirecting to dashboard in <strong>{autoRedirectSeconds}</strong> seconds...
                  </p>
                </div>
              )}

              <button
                onClick={() => navigate('/check')}
                className="w-full px-6 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2 mb-4"
              >
                Go to My Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/auth')}
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Sign in with password
              </button>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center space-y-2">
                  <p className="text-sm font-semibold text-gray-900">
                    Your {planName} Plan Includes:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Unlimited interaction checks</li>
                    <li>✓ Detailed safety reports</li>
                    <li>✓ Evidence-based recommendations</li>
                    <li>✓ Priority support</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Questions? Email{' '}
                  <a
                    href="mailto:support@supplementsafetybible.com"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    support@supplementsafetybible.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
