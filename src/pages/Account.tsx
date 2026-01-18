import React, { useEffect, useState } from 'react';
import { CreditCard, Loader2, AlertCircle, Calendar, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ensureFreeProfile } from '../lib/profile';
import { SUPPORT_EMAIL } from '../lib/support';
import { SEO } from '../lib/seo';

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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--color-trial)' }} />
          <p style={{ color: 'var(--color-text-muted)' }}>Loading your account...</p>
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
          <div className="space-y-3">
            <a href="/#pricing" className="btn-cta block w-full text-center">
              View Plans
            </a>
            <a href="/" className="btn-outline block w-full text-center">
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--color-bg)' }}>
      <SEO
        title="Account | Supplement Safety Bible"
        description="Manage your Supplement Safety Bible subscription and account settings."
        canonical="/account"
        noindex={true}
      />
      <div className="max-w-4xl mx-auto">
        <div className="card overflow-hidden" style={{ padding: 0 }}>
          <div className="panel-brand p-8">
            <h1 className="text-3xl font-bold mb-2">Account</h1>
            <p style={{ opacity: 0.9 }}>Manage your subscription and billing</p>
          </div>

          <div className="p-8">
            {profile && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Account Information</h2>
                  <div className="rounded-lg p-6 space-y-4" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                    <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Email</span>
                      <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{profile.email}</span>
                    </div>

                    <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Current Plan</span>
                      <span className="badge-trial">
                        {getPlanDisplayName(profile.role)}
                        {profile.role === 'free' && ' — Active'}
                      </span>
                    </div>

                    {profile.current_period_end && (
                      <div className="flex justify-between items-center">
                        <span className="font-medium flex items-center" style={{ color: 'var(--color-text-muted)' }}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Next Billing Date
                        </span>
                        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                          {formatDate(profile.current_period_end)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {profile.role === 'free' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Free Plan Active</h2>
                    <div className="rounded-lg p-6" style={{ background: '#F0F9FA', border: '1px solid var(--color-trial)' }}>
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5" style={{ color: 'var(--color-trial)' }} />
                        <span className="badge-trial">Free Plan</span>
                      </div>
                      <ul className="space-y-2 mb-4" style={{ color: 'var(--color-text)' }}>
                        <li className="flex items-start gap-2">
                          <span style={{ color: 'var(--color-success)' }} className="mt-0.5">✓</span>
                          <span>Read supplement & medication lists</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span style={{ color: 'var(--color-success)' }} className="mt-0.5">✓</span>
                          <span>1 interaction check per day</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span style={{ color: 'var(--color-trial)' }} className="mt-0.5">→</span>
                          <span className="font-semibold">Upgrade for unlimited checks + evidence details</span>
                        </li>
                      </ul>
                      <a href="/#pricing" className="btn-cta inline-block">
                        View Upgrade Options
                      </a>
                    </div>
                  </div>
                )}

                {profile.stripe_customer_id && profile.role !== 'free' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Billing Management</h2>
                    <button
                      onClick={handleManageBilling}
                      disabled={portalLoading}
                      className="btn-cta w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <div className="mt-4 text-center space-y-2">
                      <p className="guarantee-note">
                        Update payment method, view invoices, or cancel subscription
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        60-day money-back guarantee · Change or cancel anytime
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Individual-use subscription. <a href="mailto:support@supplementsafetybible.com" className="hover:underline" style={{ color: 'var(--color-trial)' }}>Contact support</a> for team access.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between mb-4">
                <a
                  href="/"
                  className="font-medium flex items-center hover:underline"
                  style={{ color: 'var(--color-trial)' }}
                >
                  ← Back to Home
                </a>
                {profile?.role === 'premium' && (
                  <a
                    href="/metrics"
                    className="font-medium text-sm hover:underline"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    View Metrics →
                  </a>
                )}
              </div>
              <p className="mt-4 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Need help?{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:underline" style={{ color: 'var(--color-trial)' }}>
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
