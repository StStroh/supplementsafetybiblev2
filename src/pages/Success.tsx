import React, { useEffect, useState } from 'react';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { SUPPORT_EMAIL } from '../lib/support';

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
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="card p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 mx-auto mb-4" style={{ color: 'var(--color-success)' }} />
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Access Activated!</h1>
          <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
            Your subscription has been successfully activated.
          </p>
        </div>

        {sessionData && (
          <div className="rounded-lg p-6 mb-6 space-y-4" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Email</span>
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{sessionData.customer_email}</span>
            </div>

            <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Plan</span>
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

            <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Status</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
                {sessionData.subscription_status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Next Billing Date</span>
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                {formatDate(sessionData.current_period_end)}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <a href="/#checker" className="btn-cta block w-full text-center">
            Start Checking Interactions
          </a>
          <a href="/account" className="btn-outline block w-full text-center">
            Manage Account
          </a>
        </div>

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
          If you have any issues with your subscription, contact us at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:underline" style={{ color: 'var(--color-trial)' }}>
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Success;
