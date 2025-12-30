import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Mail, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

export default function BillingSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [sendingLink, setSendingLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      console.log('[BillingSuccess] No session_id in URL, will poll subscription status');
      await pollSubscriptionStatus();
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);

      const res = await fetch(`/.netlify/functions/verify-checkout-session?session_id=${sessionId}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to verify checkout');
      }

      const data = await res.json();
      setSessionData(data);

      if (user && user.email === data.email) {
        await supabase.auth.refreshSession();
        setTimeout(() => {
          navigate('/check');
        }, 2000);
      }

    } catch (err: any) {
      console.error('[BillingSuccess] Error:', err);
      setError(err.message || 'Failed to verify checkout');
    } finally {
      setLoading(false);
    }
  }

  async function pollSubscriptionStatus() {
    let attempts = 0;
    const maxAttempts = 20;
    const pollInterval = 2000;

    while (attempts < maxAttempts) {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          await new Promise(resolve => setTimeout(resolve, pollInterval));
          attempts++;
          continue;
        }

        setCurrentUser(user);

        const { data: profile } = await supabase
          .from('profiles')
          .select('tier, subscription_status')
          .eq('id', user.id)
          .maybeSingle();

        if (profile?.subscription_status === 'active' || profile?.subscription_status === 'trialing') {
          setSessionData({
            email: user.email,
            tier: profile.tier || 'premium',
            isTrialing: profile.subscription_status === 'trialing'
          });
          setLoading(false);

          await supabase.auth.refreshSession();
          setTimeout(() => {
            navigate('/check');
          }, 2000);
          return;
        }

        await new Promise(resolve => setTimeout(resolve, pollInterval));
        attempts++;

      } catch (err) {
        console.error('[BillingSuccess] Poll error:', err);
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        attempts++;
      }
    }

    setLoading(false);
    setSessionData({ email: currentUser?.email || 'your account', tier: 'premium', isTrialing: false });
  }

  async function sendMagicLink() {
    if (!sessionData?.email) return;

    setSendingLink(true);
    try {
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOtp({
        email: sessionData.email,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setLinkSent(true);
    } catch (err: any) {
      console.error('[BillingSuccess] Magic link error:', err);
      alert(err.message || 'Failed to send login link');
    } finally {
      setSendingLink(false);
    }
  }

  const isOutlook = sessionData?.email?.match(/@(outlook|hotmail|msn|live)\./i);

  if (loading) {
    return (
      <>
        <SEO title="Processing Payment" />
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-600">Verifying your payment...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEO title="Payment Error" />
        <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-orange-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
              <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Error</h1>
              <p className="text-lg text-gray-600 mb-8">{error}</p>
              <button
                onClick={() => navigate('/pricing')}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Return to Pricing
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (currentUser && currentUser.email === sessionData?.email) {
    return (
      <>
        <SEO title="Payment Successful" />
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
              <p className="text-lg text-gray-600 mb-4">
                Your {sessionData.tier} subscription is now active.
                {sessionData.isTrialing && <span className="block mt-2">You have a 14-day free trial.</span>}
              </p>
              <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Complete Your Setup" />
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-lg w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />

              <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Payment Successful!
              </h1>

              <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-emerald-900 mb-1">
                  <strong>Plan:</strong> {sessionData?.tier?.toUpperCase()}
                </p>
                <p className="text-sm text-emerald-900 mb-1">
                  <strong>Email:</strong> {sessionData?.email}
                </p>
                {sessionData?.isTrialing && (
                  <p className="text-sm text-emerald-900">
                    <strong>Trial:</strong> 14 days free
                  </p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900 mb-3">
                  Your access is active for <strong>{sessionData?.email}</strong>.
                  Sign in to start using your premium features.
                </p>
              </div>

              {linkSent ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-900 font-medium mb-2">
                    Check your email!
                  </p>
                  <p className="text-sm text-green-800">
                    We sent a login link to <strong>{sessionData?.email}</strong>
                  </p>
                  {isOutlook && (
                    <p className="text-xs text-orange-700 mt-3 bg-orange-50 p-2 rounded">
                      Using Outlook/Hotmail? Check your spam/junk folder.
                    </p>
                  )}
                </div>
              ) : (
                <button
                  onClick={sendMagicLink}
                  disabled={sendingLink}
                  className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
                >
                  {sendingLink ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send me a login link
                    </>
                  )}
                </button>
              )}

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Already have an account?</p>
                <button
                  onClick={() => navigate('/auth')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  Sign in with password
                </button>
              </div>

              {isOutlook && !linkSent && (
                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-xs text-orange-900">
                    <strong>Note:</strong> Outlook/Hotmail users may experience email delays.
                    Please check your spam/junk folder if you don't receive the email within 5 minutes.
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500 mb-2">Need help?</p>
                <a
                  href="mailto:support@supplementsafetybible.com"
                  className="text-xs text-emerald-600 hover:text-emerald-700"
                >
                  support@supplementsafetybible.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
