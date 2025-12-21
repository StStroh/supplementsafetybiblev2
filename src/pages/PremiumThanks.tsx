import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../lib/supabase';
import { SEO } from '../lib/seo';

type State = "loading" | "finalizing" | "checking" | "success" | "timeout" | "fail";

export default function PremiumThanks() {
  const navigate = useNavigate();
  const [state, setState] = useState<State>("loading");
  const [statusText, setStatusText] = useState("Verifying your payment…");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      setState("fail");
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
          console.error('[PremiumThanks] Finalize failed:', json);
          return false;
        }

        console.log('[PremiumThanks] Finalize success:', json);
        return true;
      } catch (err) {
        console.error('[PremiumThanks] Finalize error:', err);
        return false;
      }
    };

    const checkPremiumStatus = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_premium, plan, tier, subscription_status')
          .eq('id', userId)
          .maybeSingle();

        if (error) {
          console.error('[PremiumThanks] Profile query error:', error);
          return false;
        }

        const isPremium = data?.is_premium === true ||
                         data?.plan === 'premium' ||
                         data?.plan === 'pro' ||
                         data?.tier === 'premium';

        return isPremium;
      } catch (err) {
        console.error('[PremiumThanks] Check error:', err);
        return false;
      }
    };

    const pollForPremium = (userId: string) => {
      pollInterval = setInterval(async () => {
        if (!mounted) return;

        if (Date.now() - startTime > TIMEOUT_MS) {
          if (pollInterval) clearInterval(pollInterval);
          if (mounted) {
            setState("timeout");
            setStatusText("Taking longer than expected…");
          }
          return;
        }

        const isPremium = await checkPremiumStatus(userId);
        if (isPremium) {
          if (pollInterval) clearInterval(pollInterval);
          if (mounted) {
            setState("success");
            setStatusText("Success! Redirecting to your dashboard…");
            setTimeout(() => {
              navigate('/premium/dashboard', { replace: true });
            }, 1000);
          }
        }
      }, 1500);
    };

    (async () => {
      if (!mounted) return;

      setState("loading");
      setStatusText("Restoring your session…");

      const userId = await waitForAuth();

      if (!mounted) return;

      if (!userId) {
        setState("fail");
        return;
      }

      const alreadyPremium = await checkPremiumStatus(userId);
      if (alreadyPremium) {
        setState("success");
        setStatusText("Already activated! Redirecting…");
        setTimeout(() => {
          navigate('/premium/dashboard', { replace: true });
        }, 1000);
        return;
      }

      setState("finalizing");
      setStatusText("Finalizing your subscription…");

      await callFinalize(userId, sessionId);

      if (!mounted) return;

      setState("checking");
      setStatusText("Activating Premium access…");

      pollForPremium(userId);
    })();

    return () => {
      mounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [navigate]);

  if (state === "loading" || state === "finalizing" || state === "checking") {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{background: 'var(--color-bg)'}}>
        <SEO
          title="Activating Premium | Supplement Safety Bible"
          description="Activating your Premium subscription"
          canonical="/premium/thanks"
          noindex={true}
        />
        <div className="card p-12 max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 border-4 rounded-full animate-spin" style={{borderColor: '#EDE7F6', borderTopColor: 'var(--color-brand)'}}></div>
          <h1 className="text-2xl font-bold mb-3" style={{color: 'var(--color-text)'}}>{statusText}</h1>
          <p style={{color: 'var(--color-text-muted)'}}>This only takes a moment.</p>
        </div>
      </main>
    );
  }

  if (state === "timeout") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{background: 'var(--color-bg)'}}>
        <SEO
          title="Premium Activation | Supplement Safety Bible"
          description="Completing your Premium subscription"
          canonical="/premium/thanks"
          noindex={true}
        />
        <div className="card p-10 max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{background: '#FFF4E5'}}>
            <svg className="w-8 h-8" style={{color: 'var(--color-warning)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{color: 'var(--color-text)'}}>Almost there…</h1>
          <p className="mb-3" style={{color: 'var(--color-text-muted)', lineHeight: '1.6'}}>
            Your payment was successful, but activation is taking longer than expected.
          </p>
          <p className="mb-8" style={{color: 'var(--color-text-muted)', lineHeight: '1.6'}}>
            This can happen during high traffic. Your Premium access will be ready shortly.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full btn-cta py-3"
            >
              Refresh Page
            </button>
            <a
              href="/premium/dashboard"
              className="block w-full btn-outline py-3"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (state === "fail") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{background: 'var(--color-bg)'}}>
        <SEO
          title="Premium Activation | Supplement Safety Bible"
          description="Completing your Premium subscription"
          canonical="/premium/thanks"
          noindex={true}
        />
        <div className="card p-10 max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{background: '#FFEBEE'}}>
            <svg className="w-8 h-8" style={{color: 'var(--color-error)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{color: 'var(--color-text)'}}>Unable to Verify Session</h1>
          <p className="mb-8" style={{color: 'var(--color-text-muted)', lineHeight: '1.6'}}>
            We couldn't find your payment session. If you were charged, your access will be activated shortly.
          </p>
          <a href="/pricing" className="btn-outline block w-full py-3">
            Back to Pricing
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{background: 'var(--color-bg)'}}>
      <SEO
        title="Welcome to Premium | Supplement Safety Bible"
        description="Thank you for upgrading to Premium. Your account is now active."
        canonical="/premium/thanks"
        noindex={true}
      />
      <div className="card p-12 max-w-md text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{background: '#E8F5E9'}}>
          <svg className="w-10 h-10" style={{color: 'var(--color-success)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-3xl font-bold mb-4" style={{color: 'var(--color-text)'}}>Welcome to Premium!</h1>
        <p className="mb-2" style={{color: 'var(--color-text-muted)'}}>Your Premium access is now active.</p>
        <p style={{color: 'var(--color-text-muted)'}}>Redirecting to your dashboard…</p>
      </div>
    </main>
  );
}
