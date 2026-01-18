import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, AlertCircle, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SEO } from '../lib/seo';
import { SUPPORT_EMAIL } from '../lib/support';
import Autocomplete from '../components/Autocomplete';
import Testimonials from '../components/Testimonials';

interface Profile {
  id: string;
  email: string;
  role: string;
  name?: string;
  stripe_customer_id?: string;
  subscription_status?: string;
}

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mountedRef = useRef(true);

  const [loading, setLoading] = useState(true);
  const [syncingPlan, setSyncingPlan] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [planConfirmed, setPlanConfirmed] = useState(false);

  const [supplements, setSupplements] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [supplementValue, setSupplementValue] = useState('');
  const [medicationValue, setMedicationValue] = useState('');
  const [supplementId, setSupplementId] = useState('');
  const [medicationId, setMedicationId] = useState('');

  const suppRef = useRef<HTMLInputElement>(null);
  const medRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    loadWelcomeData();
  }, []);

  const loadWelcomeData = async () => {
    console.log('[Welcome] Starting welcome flow');

    if (!mountedRef.current) return;

    try {
      setLoading(true);
      setError(null);
      setErrorDetails(null);

      console.log('[Welcome] Getting user from auth');
      const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('[Welcome] Auth error:', userError);
        throw new Error(`Authentication error: ${userError.message}`);
      }

      if (!authUser) {
        console.warn('[Welcome] No authenticated user, redirecting to auth');
        const sessionId = searchParams.get('session_id');
        const nextUrl = sessionId ? `/welcome?session_id=${sessionId}` : '/welcome';
        navigate(`/auth?next=${encodeURIComponent(nextUrl)}`, { replace: true });
        return;
      }

      console.log('[Welcome] User loaded:', authUser.email);
      if (mountedRef.current) {
        setUser(authUser);
      }

      console.log('[Welcome] Fetching profile from database');
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', authUser.email)
        .maybeSingle();

      if (profileError) {
        console.error('[Welcome] Profile fetch error:', profileError);
        throw new Error(`Failed to load profile: ${profileError.message}`);
      }

      if (!profileData) {
        throw new Error('Profile not found. Please contact support.');
      }

      console.log('[Welcome] Profile loaded:', profileData.email, profileData.role);
      if (mountedRef.current) {
        setProfile(profileData);
      }

      let sessionId = searchParams.get('session_id');

      // Fallback: Check localStorage if session_id missing from URL
      if (!sessionId) {
        const storedSessionId = localStorage.getItem('last_checkout_session_id');
        if (storedSessionId) {
          console.log('[Welcome] No session_id in URL, using localStorage fallback');
          sessionId = storedSessionId;
        }
      }

      if (sessionId && !planConfirmed) {
        console.log('[Welcome] Session ID present, verifying checkout');
        // Store in localStorage for recovery
        localStorage.setItem('last_checkout_session_id', sessionId);
        await verifyAndSyncPlan(sessionId, authUser);
        // Clear after successful verification
        localStorage.removeItem('last_checkout_session_id');
      } else {
        setPlanConfirmed(true);
      }

      if (['pro', 'premium'].includes(profileData.role)) {
        console.log('[Welcome] Paid user, loading interaction data');
        await loadInteractionData();
      }

    } catch (err) {
      console.error('[Welcome] Error:', err);
      if (mountedRef.current) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load welcome page';
        setError("We couldn't open your account yet.");
        setErrorDetails(errorMsg);
      }
    } finally {
      if (mountedRef.current) {
        console.log('[Welcome] Load complete');
        setLoading(false);
      }
    }
  };

  const verifyAndSyncPlan = async (sessionId: string, authUser: any) => {
    console.log('[Welcome] sync start');
    try {
      // Use the new stripe-verify-session function
      const response = await fetch('/.netlify/functions/stripe-verify-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify checkout session');
      }

      console.log('[Welcome] sync success:', data);

      // Reload profile from database
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', authUser.email)
        .maybeSingle();

      if (updatedProfile && mountedRef.current) {
        setProfile(updatedProfile);
        setPlanConfirmed(true);
      }

    } catch (err) {
      console.error('[Welcome] Sync error:', err);
      setPlanConfirmed(false);
    }
  };

  const loadInteractionData = async () => {
    try {
      const [supRes, medRes] = await Promise.all([
        supabase.from('supplements').select('id,name').order('name').limit(2000),
        supabase.from('medications').select('id,name').order('name').limit(2000),
      ]);

      if (supRes.data && medRes.data && mountedRef.current) {
        setSupplements(supRes.data);
        setMedications(medRes.data);
        setTimeout(() => suppRef.current?.focus(), 100);
      }
    } catch (err) {
      console.error('[Welcome] Failed to load interaction data:', err);
    }
  };

  const handleRefreshAccess = async () => {
    console.log('[Welcome] Refresh access initiated');
    setSyncingPlan(true);

    try {
      // Try URL first, then localStorage
      let sessionId = searchParams.get('session_id');
      if (!sessionId) {
        sessionId = localStorage.getItem('last_checkout_session_id');
      }

      if (!sessionId) {
        throw new Error('No checkout session ID found');
      }

      await verifyAndSyncPlan(sessionId, user);
      await loadInteractionData();

    } catch (err) {
      console.error('[Welcome] Refresh error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to refresh access';
      setError('Failed to refresh access.');
      setErrorDetails(errorMsg);
    } finally {
      setSyncingPlan(false);
    }
  };

  const handleRetry = () => {
    console.log('[Welcome] Retry clicked');
    loadWelcomeData();
  };

  const handleSignInAgain = () => {
    console.log('[Welcome] Sign in again clicked');
    const sessionId = searchParams.get('session_id');
    const nextUrl = sessionId ? `/welcome?session_id=${sessionId}` : '/welcome';
    navigate(`/auth?next=${encodeURIComponent(nextUrl)}`);
  };

  const handleSupplementSelect = (name: string) => {
    const supp = supplements.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (supp) {
      setSupplementValue(name);
      setSupplementId(supp.id);
      if (!medicationValue) {
        setTimeout(() => medRef.current?.focus(), 100);
      }
    }
  };

  const handleMedicationSelect = (name: string) => {
    const med = medications.find(m => m.name.toLowerCase() === name.toLowerCase());
    if (med) {
      setMedicationValue(name);
      setMedicationId(med.id);
    }
  };

  const handleRunCheck = async () => {
    if (!supplementId || !medicationId) {
      return;
    }
    navigate(`/check?supplement=${encodeURIComponent(supplementValue)}&medication=${encodeURIComponent(medicationValue)}`);
  };

  const getFirstName = (): string => {
    if (profile?.name) {
      return profile.name.split(' ')[0];
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'there';
  };

  const getPlanName = (): string => {
    if (!profile?.role) return 'Starter';
    const roleMap: { [key: string]: string } = {
      'pro': 'Pro',
      'premium': 'Premium',
      'free': 'Free',
      'starter': 'Starter',
    };
    return roleMap[profile.role] || 'Starter';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--color-trial)' }} />
          <p style={{ color: 'var(--color-text-muted)' }}>Setting up your account...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg)' }}>
        <div className="card p-8 max-w-lg w-full">
          <AlertCircle className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-error)' }} />
          <h1 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--color-text)' }}>
            {error}
          </h1>

          {errorDetails && (
            <div className="mb-6 p-4 rounded-lg" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                {errorDetails}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button onClick={handleRetry} className="btn-cta w-full">
              Retry
            </button>

            <button
              onClick={handleRefreshAccess}
              disabled={syncingPlan || !searchParams.get('session_id')}
              className="btn-outline w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncingPlan ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh access
                </>
              )}
            </button>

            <button onClick={handleSignInAgain} className="btn-outline w-full">
              Sign in again
            </button>

            <a href="/" className="btn-outline block w-full text-center">
              Return Home
            </a>
          </div>

          <p className="mt-6 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Need help? <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:underline" style={{ color: 'var(--color-trial)' }}>{SUPPORT_EMAIL}</a>
          </p>
        </div>
      </div>
    );
  }

  const isPaidUser = profile && ['pro', 'premium'].includes(profile.role);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <SEO
        title={`Welcome, ${getFirstName()} | Supplement Safety Bible`}
        description="Your personal interaction checker is ready."
        canonical="/welcome"
        noindex={true}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
            Welcome, {getFirstName()}
          </h1>
          <p className="text-xl sm:text-2xl mb-2" style={{ color: 'var(--color-text-muted)' }}>
            Your personal interaction check is ready.
          </p>
          <p className="text-sm flex items-center justify-center gap-2" style={{ color: planConfirmed ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
            {planConfirmed ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Your {getPlanName()} access is active.
              </>
            ) : (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Activating your access...
              </>
            )}
          </p>
          {!planConfirmed && (
            <button
              onClick={handleRefreshAccess}
              disabled={syncingPlan}
              className="mt-2 text-xs hover:underline disabled:opacity-50"
              style={{ color: 'var(--color-trial)' }}
            >
              {syncingPlan ? 'Syncing...' : 'Refresh now'}
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                Run your first check
              </h2>

              {isPaidUser && supplements.length > 0 && medications.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                        Supplement
                      </label>
                      <Autocomplete
                        ref={suppRef}
                        value={supplementValue}
                        placeholder="Type a supplement..."
                        onChange={setSupplementValue}
                        onSelect={handleSupplementSelect}
                        suggestions={supplements}
                        type="supplement"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                        Medication
                      </label>
                      <Autocomplete
                        ref={medRef}
                        value={medicationValue}
                        placeholder="...and a medication"
                        onChange={setMedicationValue}
                        onSelect={handleMedicationSelect}
                        suggestions={medications}
                        type="medication"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleRunCheck}
                      disabled={!supplementId || !medicationId}
                      className="btn-cta flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Run check
                    </button>
                    <a href="/check" className="btn-outline flex items-center gap-2">
                      Dashboard <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: 'var(--color-trial)' }} />
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    Loading interaction checker...
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                Quick start
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-trial)', color: 'white' }}>
                    1
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text)' }}>Add a supplement</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Type to search from our database</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-trial)', color: 'white' }}>
                    2
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text)' }}>Add a medication</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Optional but recommended</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-trial)', color: 'white' }}>
                    3
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text)' }}>Save your stack</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Access your results anytime</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                Need help?
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Our team is here to help you get started.
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-sm font-medium hover:underline"
                style={{ color: 'var(--color-trial)' }}
              >
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <Testimonials />
      </div>
    </div>
  );
};

export default Welcome;
