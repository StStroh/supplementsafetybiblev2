import React, { useEffect, useState } from 'react';
import { CheckCircle, Loader2, AlertCircle, Mail } from 'lucide-react';
import { SUPPORT_EMAIL } from '../lib/support';
import Logo from '../components/Logo';
import { BRAND_NAME_FULL } from '../lib/brand';
import { supabase } from '../lib/supabase';

interface SessionData {
  customer_email: string;
  subscription_status: string;
  plan_interval: string;
  current_period_end: number;
  price_id: string;
}

const Success: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sendingMagicLink, setSendingMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');

      if (!sessionId) {
        setError('No session ID found in URL');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/.netlify/functions/get-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to retrieve session');
        }

        setSessionData(data);
      } catch (err) {
        console.error('Error fetching session:', err);
        setError(err instanceof Error ? err.message : 'Failed to load session data');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const getPlanName = () => {
    if (!sessionData) return '';
    const priceId = sessionData.price_id;
    const isAnnual = sessionData.plan_interval === 'year';

    if (priceId?.includes('pro') || priceId === import.meta.env.VITE_STRIPE_PRICE_PRO || priceId === import.meta.env.VITE_STRIPE_PRICE_PRO_ANNUAL) {
      return `Pro ${isAnnual ? 'Annual' : 'Monthly'}`;
    }
    if (priceId?.includes('premium') || priceId === import.meta.env.VITE_STRIPE_PRICE_PREMIUM || priceId === import.meta.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL) {
      return `Premium ${isAnnual ? 'Annual' : 'Monthly'}`;
    }
    return `${isAnnual ? 'Annual' : 'Monthly'} Plan`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleResendMagicLink = async () => {
    if (!sessionData?.customer_email) return;

    setSendingMagicLink(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: sessionData.customer_email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setMagicLinkSent(true);
    } catch (err) {
      console.error('Error sending magic link:', err);
      alert('Failed to send magic link. Please try again or contact support.');
    } finally {
      setSendingMagicLink(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--color-trial)' }} />
          <p style={{ color: 'var(--color-text-muted)' }}>Loading your subscription details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="card p-8 max-w-md w-full mx-4">
          <AlertCircle className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-error)' }} />
          <h1 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--color-text)' }}>Error</h1>
          <p className="text-center mb-6" style={{ color: 'var(--color-text-muted)' }}>{error}</p>
          <a href="/" className="btn-cta block w-full text-center">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="card p-10 max-w-2xl w-full">
        <div className="text-center mb-10">
          <div className="mb-6">
            <Logo className="h-16 w-auto mx-auto mb-3" />
            <p className="text-lg font-semibold" style={{ color: 'var(--color-text-muted)' }}>{BRAND_NAME_FULL}</p>
          </div>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6" style={{background: '#E8F5E9'}}>
            <CheckCircle className="w-14 h-14" style={{ color: 'var(--color-success)' }} />
          </div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
            {isLoggedIn ? 'Welcome to Premium!' : 'Payment Successful!'}
          </h1>
          <p className="text-xl" style={{ color: 'var(--color-text-muted)' }}>
            {isLoggedIn
              ? 'Your subscription has been successfully activated.'
              : 'Your subscription is ready. Check your email to sign in and access your account.'}
          </p>
        </div>

        {!isLoggedIn && sessionData && (
          <div className="mb-8 p-6 rounded-lg" style={{ background: '#E3F2FD', border: '1px solid #1976D2' }}>
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#1565C0' }} />
              <div className="flex-1">
                <h3 className="font-semibold mb-2" style={{ color: '#0D47A1' }}>Check Your Email</h3>
                <p className="text-sm mb-3" style={{ color: '#1565C0', lineHeight: '1.6' }}>
                  We've sent a sign-in link to <strong>{sessionData.customer_email}</strong>.
                  Click the link in your email to access your account and start using your premium features.
                </p>
                {!magicLinkSent ? (
                  <button
                    onClick={handleResendMagicLink}
                    disabled={sendingMagicLink}
                    className="text-sm font-semibold hover:underline disabled:opacity-50"
                    style={{ color: '#0D47A1' }}
                  >
                    {sendingMagicLink ? 'Sending...' : 'Resend Sign-In Link'}
                  </button>
                ) : (
                  <p className="text-sm font-semibold" style={{ color: '#2E7D32' }}>
                    ✓ Sign-in link sent! Check your inbox.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {sessionData && (
          <div className="rounded-xl p-7 mb-8 space-y-5" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="font-medium text-sm" style={{ color: 'var(--color-text-muted)' }}>Email</span>
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{sessionData.customer_email}</span>
            </div>

            <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="font-medium text-sm" style={{ color: 'var(--color-text-muted)' }}>Plan</span>
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{getPlanName()}</span>
            </div>

            {getPlanName().includes('Pro') && (
              <div className="py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <h3 className="font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                  Work smarter and help your patients thrive
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  Supplement Safety Bible Pro can save you hours every week and keep your patient resources automatically updated with the latest evidence.
                </p>
              </div>
            )}

            {getPlanName().includes('Annual') && (
              <div className="py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  Annual plan selected — fewer renewals, uninterrupted access, best value.
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="font-medium text-sm" style={{ color: 'var(--color-text-muted)' }}>Status</span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
                {sessionData.subscription_status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-sm" style={{ color: 'var(--color-text-muted)' }}>Next Billing Date</span>
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                {formatDate(sessionData.current_period_end)}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {isLoggedIn ? (
            <>
              <a href="/#checker" className="btn-cta block w-full text-center text-base py-4">
                Start Checking Interactions
              </a>
              <a href="/account" className="btn-outline block w-full text-center text-base py-4">
                Manage Account
              </a>
            </>
          ) : (
            <>
              <button
                onClick={handleResendMagicLink}
                disabled={sendingMagicLink || magicLinkSent}
                className="btn-cta block w-full text-center text-base py-4 disabled:opacity-50"
              >
                {sendingMagicLink ? 'Sending...' : magicLinkSent ? 'Sign-In Link Sent!' : 'Send Sign-In Link'}
              </button>
              <a href="/" className="btn-outline block w-full text-center text-base py-4">
                Return to Home
              </a>
            </>
          )}
        </div>

        <div className="mt-8 text-center space-y-3 pt-6" style={{borderTop: '1px solid var(--color-border)'}}>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
            Prefer monthly? You can switch plans anytime from your account settings.
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
            Questions? Contact us at{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium hover:underline" style={{ color: 'var(--color-trial)' }}>
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
