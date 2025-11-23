import React, { useEffect, useState } from 'react';
import { CreditCard, Loader2, AlertCircle, Calendar, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ensureFreeProfile } from '../lib/profile';
import { SUPPORT_EMAIL } from '../lib/support';

interface Profile {
  email: string;
  role: string;
  stripe_customer_id: string;
  current_period_end: number;
}

const Account: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setError('Not authenticated. Please sign in.');
          setLoading(false);
          return;
        }

        let { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching profile:', fetchError);
          setError('Failed to load profile data');
        } else if (!data) {
          console.info('[Account] No profile found, creating free profile');
          const result = await ensureFreeProfile(supabase);
          if (result.ok) {
            const { data: refetched } = await supabase
              .from('profiles')
              .select('*')
              .eq('email', user.email)
              .maybeSingle();
            if (refetched) {
              setProfile(refetched);
            }
          } else {
            setError('Failed to create profile');
          }
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load account data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleManageBilling = async () => {
    if (!profile?.stripe_customer_id) {
      alert('No billing information found');
      return;
    }

    setPortalLoading(true);

    try {
      const response = await fetch('/.netlify/functions/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: profile.stripe_customer_id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open billing portal');
      }

      window.location.href = data.url;
    } catch (err) {
      console.error('Error opening portal:', err);
      alert(err instanceof Error ? err.message : 'Failed to open billing portal');
      setPortalLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPlanDisplayName = (role: string) => {
    switch (role) {
      case 'pro':
        return 'Pro';
      case 'premium':
        return 'Premium';
      case 'free':
      default:
        return 'Free';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading your account...</p>
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
          <div className="space-y-3">
            <a
              href="/#pricing"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Plans
            </a>
            <a
              href="/"
              className="block w-full bg-slate-100 text-slate-900 text-center py-3 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Account</h1>
            <p className="text-blue-100">Manage your subscription and billing</p>
          </div>

          <div className="p-8">
            {profile && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Account Information</h2>
                  <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <span className="text-slate-600 font-medium">Email</span>
                      <span className="text-slate-900 font-semibold">{profile.email}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <span className="text-slate-600 font-medium">Current Plan</span>
                      <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                        {getPlanDisplayName(profile.role)}
                      </span>
                    </div>

                    {profile.current_period_end && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Next Billing Date
                        </span>
                        <span className="text-slate-900 font-semibold">
                          {formatDate(profile.current_period_end)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {profile.role === 'free' && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Free Plan Active</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                          Free Plan
                        </span>
                      </div>
                      <ul className="space-y-2 text-slate-700 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>Read supplement & medication lists</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>1 interaction check per day</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">→</span>
                          <span className="font-semibold">Upgrade for unlimited checks + evidence details</span>
                        </li>
                      </ul>
                      <a
                        href="/#pricing"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        View Upgrade Options
                      </a>
                    </div>
                  </div>
                )}

                {profile.stripe_customer_id && profile.role !== 'free' && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Billing Management</h2>
                    <button
                      onClick={handleManageBilling}
                      disabled={portalLoading}
                      className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {portalLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Opening Portal...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Manage Billing
                        </>
                      )}
                    </button>
                    <p className="text-sm text-slate-600 mt-3 text-center">
                      Update payment method, view invoices, or cancel subscription
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                ← Back to Home
              </a>
              <p className="mt-4 text-center text-sm text-slate-600">
                Need help?{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 hover:underline">
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
