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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading your subscription details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">Error</h1>
          <p className="text-slate-600 text-center mb-6">{error}</p>
          <a
            href="/"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Access Activated!</h1>
          <p className="text-lg text-slate-600">
            Your subscription has been successfully activated.
          </p>
        </div>

        {sessionData && (
          <div className="bg-slate-50 rounded-lg p-6 mb-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="text-slate-600 font-medium">Email</span>
              <span className="text-slate-900 font-semibold">{sessionData.customer_email}</span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="text-slate-600 font-medium">Plan</span>
              <span className="text-slate-900 font-semibold">{getPlanName()}</span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="text-slate-600 font-medium">Status</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {sessionData.subscription_status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Next Billing Date</span>
              <span className="text-slate-900 font-semibold">
                {formatDate(sessionData.current_period_end)}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <a
            href="/#checker"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Checking Interactions
          </a>
          <a
            href="/account"
            className="block w-full bg-slate-100 text-slate-900 text-center py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium"
          >
            Manage Account
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          If you have any issues with your subscription, contact us at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 hover:underline">
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Success;
