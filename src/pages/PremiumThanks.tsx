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
      <main className="mx-auto max-w-3xl p-6 text-center">
        <SEO
          title="Activating Premium | Supplement Safety Bible"
          description="Activating your Premium subscription"
          canonical="/premium/thanks"
          noindex={true}
        />
        <div className="animate-pulse">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-black border-gray-200 rounded-full animate-spin"></div>
          <h1 className="text-2xl font-semibold text-gray-900">{statusText}</h1>
          <p className="mt-2 text-gray-600">This only takes a moment.</p>
        </div>
      </main>
    );
  }

  if (state === "timeout") {
    return (
      <main className="mx-auto max-w-3xl p-6 text-center">
        <SEO
          title="Premium Activation | Supplement Safety Bible"
          description="Completing your Premium subscription"
          canonical="/premium/thanks"
          noindex={true}
        />
        <h1 className="text-2xl font-semibold text-gray-900">Almost there…</h1>
        <p className="mt-2 text-gray-600">
          Your payment was successful, but activation is taking longer than expected.
        </p>
        <p className="mt-2 text-gray-600">
          This can happen if our servers are busy. Your Premium access will be ready shortly.
        </p>
        <div className="mt-6 space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="inline-block rounded-lg px-5 py-3 bg-black text-white hover:bg-gray-900"
          >
            Refresh Page
          </button>
          <a
            href="/premium/dashboard"
            className="inline-block rounded-lg px-5 py-3 border-2 border-black text-black hover:bg-gray-50"
          >
            Go to Dashboard
          </a>
        </div>
      </main>
    );
  }

  if (state === "fail") {
    return (
      <main className="mx-auto max-w-3xl p-6 text-center">
        <SEO
          title="Premium Activation | Supplement Safety Bible"
          description="Completing your Premium subscription"
          canonical="/premium/thanks"
          noindex={true}
        />
        <h1 className="text-2xl font-semibold text-gray-900">Unable to verify session</h1>
        <p className="mt-2 text-gray-600">
          We couldn't find your payment session. If you were charged, your access will be activated shortly.
        </p>
        <div className="mt-6 space-x-4">
          <a href="/pricing" className="inline-block underline text-gray-700">
            Back to Pricing
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 text-center">
      <SEO
        title="Welcome to Premium | Supplement Safety Bible"
        description="Thank you for upgrading to Premium. Your account is now active."
        canonical="/premium/thanks"
        noindex={true}
      />
      <h1 className="text-3xl font-bold text-gray-900">Welcome to Premium 🎉</h1>
      <p className="mt-4 text-gray-700">Your Premium access is now active.</p>
      <p className="mt-2 text-gray-600">Redirecting to your dashboard…</p>
    </main>
  );
}
