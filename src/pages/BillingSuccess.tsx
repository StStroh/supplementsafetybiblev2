import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader2, ArrowRight, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

type VerificationState = 'loading' | 'verifying_payment' | 'provisioning' | 'success' | 'payment_pending' | 'error' | 'missing_session';

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
  const [magicLinkSending, setMagicLinkSending] = useState(false);
  const [magicLinkError, setMagicLinkError] = useState<string | null>(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [manualEmail, setManualEmail] = useState('');
  const [showManualEmail, setShowManualEmail] = useState(false);

  useEffect(() => {
    verifyPayment();
  }, []);

  // Email validation helper
  function isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;
    const trimmed = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  }

  async function verifyPayment() {
    const sessionId = searchParams.get('session_id');

    // Dev logging
    if (import.meta.env.DEV) {
      console.log('[BillingSuccess] Starting verification');
      console.log('[BillingSuccess] session_id:', sessionId ? 'present' : 'MISSING');
    }

    if (!sessionId) {
      if (import.meta.env.DEV) {
        console.error('[BillingSuccess] No session_id in URL');
      }
      setState('missing_session');
      return;
    }

    setState('verifying_payment');

    try {
      // STEP 1: Quick verification check (read-only, fast)
      if (import.meta.env.DEV) {
        console.log('[BillingSuccess] Calling verification endpoint...');
      }

      const verifyRes = await fetch(`/.netlify/functions/stripe-verify-session?session_id=${sessionId}`);

      if (!verifyRes.ok) {
        const errorData = await verifyRes.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Verification failed (HTTP ${verifyRes.status})`);
      }

      const verifyData = await verifyRes.json();

      if (import.meta.env.DEV) {
        console.log('[BillingSuccess] Verification result:', {
          paid: verifyData.paid,
          status: verifyData.status,
          email_present: !!verifyData.email,
        });
      }

      // Check if payment is complete
      if (!verifyData.paid) {
        if (import.meta.env.DEV) {
          console.warn('[BillingSuccess] Payment not completed yet');
        }
        setState('payment_pending');
        setErrorMessage(
          verifyData.status === 'open'
            ? 'Payment is still being processed'
            : 'Payment verification incomplete'
        );
        return;
      }

      // STEP 2: Payment confirmed, now provision access
      setState('provisioning');

      if (import.meta.env.DEV) {
        console.log('[BillingSuccess] Payment confirmed, provisioning access...');
      }

      const provisionRes = await fetch(`/.netlify/functions/billing-success?session_id=${sessionId}`);

      if (!provisionRes.ok) {
        const errorData = await provisionRes.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Access provisioning failed (HTTP ${provisionRes.status})`);
      }

      const data: SessionData = await provisionRes.json();

      if (import.meta.env.DEV) {
        console.log('[BillingSuccess] Access provisioned:', {
          email: data.email,
          plan: data.plan,
          tier: data.tier,
        });
      }

      // Validate email
      if (!data.email || !isValidEmail(data.email)) {
        if (import.meta.env.DEV) {
          console.warn('[BillingSuccess] Invalid or missing email from server');
        }
        // Show manual email entry
        setShowManualEmail(true);
        setSessionData(data);
        setState('success');
        return;
      }

      setSessionData(data);
      setState('success');

      // Automatically send magic link
      await sendMagicLink(data.email);

    } catch (err: any) {
      console.error('[BillingSuccess] Error:', err.message);
      setState('error');
      setErrorMessage(err.message || 'Failed to verify payment');
    }
  }

  async function sendMagicLink(email: string) {
    // Validate email before sending
    if (!isValidEmail(email)) {
      setMagicLinkError('Invalid email format');
      return;
    }

    setMagicLinkSending(true);
    setMagicLinkError(null);

    if (import.meta.env.DEV) {
      console.log('[BillingSuccess] Sending magic link to:', email);
    }

    try {
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('[BillingSuccess] Magic link error:', error.message);
        setMagicLinkError(error.message);
        setMagicLinkSending(false);
        return;
      }

      if (import.meta.env.DEV) {
        console.log('[BillingSuccess] Magic link sent successfully');
      }

      setMagicLinkSent(true);
      setMagicLinkSending(false);

    } catch (err: any) {
      console.error('[BillingSuccess] Magic link send failed:', err.message);
      setMagicLinkError(err.message || 'Failed to send login link');
      setMagicLinkSending(false);
    }
  }

  async function handleManualEmailSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidEmail(manualEmail)) {
      setMagicLinkError('Please enter a valid email address');
      return;
    }

    await sendMagicLink(manualEmail);
  }

  async function handleResendEmail() {
    if (resendDisabled) return;

    const emailToSend = sessionData?.email || manualEmail;

    if (!emailToSend || !isValidEmail(emailToSend)) {
      setMagicLinkError('Please enter a valid email address');
      return;
    }

    if (import.meta.env.DEV) {
      console.log('[BillingSuccess] Resending magic link');
    }

    setResendDisabled(true);
    await sendMagicLink(emailToSend);

    // Rate limit: disable for 60 seconds
    setTimeout(() => {
      setResendDisabled(false);
    }, 60000);
  }

  function handleRetry() {
    setState('loading');
    setErrorMessage('');
    verifyPayment();
  }

  if (state === 'loading' || state === 'verifying_payment') {
    return (
      <>
        <SEO title="Processing Payment" />
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {state === 'verifying_payment' ? 'Verifying payment' : 'Confirming your subscription'}
              </h1>
              <p className="text-gray-600">This will only take a moment...</p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (state === 'provisioning') {
    return (
      <>
        <SEO title="Activating Access" />
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Activating your access
              </h1>
              <p className="text-gray-600">Almost there...</p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (state === 'payment_pending') {
    return (
      <>
        <SEO title="Payment Pending" />
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-teal-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
              <AlertCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
                We couldn't confirm your payment yet
              </h1>
              <p className="text-gray-600 text-center mb-6">
                {errorMessage || 'Your payment may still be processing. This can take a few moments.'}
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleRetry}
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
                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  Back to Pricing
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
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
              <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
                We couldn't verify your payment
              </h1>
              <p className="text-gray-600 text-center mb-2">
                {errorMessage || 'There was a problem verifying your checkout session.'}
              </p>
              <p className="text-sm text-gray-500 text-center mb-6">
                Your payment may still have been processed successfully. Please try again or check your email for confirmation.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleRetry}
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
                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  Back to Pricing
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
                You're in. {planName} access is active.
              </h1>

              {/* Manual email input if email missing from Stripe */}
              {showManualEmail && !magicLinkSent && (
                <div className="mb-8">
                  <p className="text-gray-700 text-center mb-4">
                    Enter your email to receive a secure sign-in link:
                  </p>
                  <form onSubmit={handleManualEmailSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      disabled={magicLinkSending}
                      className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {magicLinkSending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Send Login Link
                        </>
                      )}
                    </button>
                  </form>
                  {magicLinkError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{magicLinkError}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Show email confirmation if we have email */}
              {!showManualEmail && sessionData?.email && (
                <p className="text-lg text-gray-700 text-center mb-8">
                  {magicLinkSent ? 'Check your email:' : 'We sent a secure sign-in link to:'}{' '}
                  <strong className="block mt-1">{sessionData.email}</strong>
                </p>
              )}

              {/* Show success message after link sent */}
              {magicLinkSent && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 mb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900 mb-1">
                        Check your email
                      </p>
                      <p className="text-sm text-emerald-800 mb-2">
                        Click the login link we sent to access your premium features instantly.
                        No password needed.
                      </p>
                      <p className="text-xs text-emerald-700 italic">
                        Link expires soon for security. Check your spam folder if you don't see it.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Show error if magic link failed */}
              {magicLinkError && !showManualEmail && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-900 mb-2">
                    <strong>Note:</strong> {magicLinkError}
                  </p>
                  <p className="text-xs text-yellow-800">
                    You can still sign in using the password option below.
                  </p>
                </div>
              )}

              {/* Resend option */}
              {magicLinkSent && (
                <div className="text-center mb-4">
                  <button
                    onClick={handleResendEmail}
                    disabled={resendDisabled || magicLinkSending}
                    className={`text-sm font-medium ${
                      resendDisabled || magicLinkSending
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-emerald-600 hover:text-emerald-700 underline'
                    }`}
                  >
                    {resendDisabled ? 'Email sent (check spam folder)' : 'Resend email'}
                  </button>
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
