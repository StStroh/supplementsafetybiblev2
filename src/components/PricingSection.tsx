import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { startTrialCheckout } from "../utils/checkout";
import { supabase } from "../lib/supabase";

type Props = {
  monthlyLabel?: string;
  yearlyLabel?: string;
  className?: string;
};

export default function PricingSection({
  monthlyLabel = "$24.99",
  yearlyLabel = "$299",
  className = "",
}: Props) {
  const navigate = useNavigate();
  const [interval, setInterval] = useState<"month" | "year">("year");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);
  }

  const priceLabel = useMemo(
    () => (interval === "month" ? monthlyLabel : yearlyLabel),
    [interval, monthlyLabel, yearlyLabel]
  );

  const displayPrice = useMemo(() => {
    if (interval === "month") {
      return monthlyLabel;
    } else {
      const yearlyPrice = parseFloat(yearlyLabel.replace('$', ''));
      const monthlyEquiv = (yearlyPrice / 12).toFixed(0);
      return `$${monthlyEquiv}`;
    }
  }, [interval, monthlyLabel, yearlyLabel]);

  async function startCheckout() {
    // DIRECT TO CHECKOUT - No auth gate required
    // Guest users can pay first, then sign in to access their subscription
    console.log('[PricingSection] Direct checkout initiated:', { interval, isLoggedIn: !!user });

    setLoading(true);
    setErr(null);

    const billingInterval = interval === "month" ? "monthly" : "annual";

    await startTrialCheckout("premium", billingInterval, (message, type) => {
      if (type === "error") {
        setErr(message);
        setLoading(false);
      }
    });
  }

  return (
    <section
      className={`w-full rounded-2xl ${className}`}
      style={{background: 'rgba(94, 59, 118, 0.03)', border: '1px solid rgba(94, 59, 118, 0.1)', padding: '2rem'}}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3" style={{color: 'var(--color-text)'}}>
          Professional Interaction Screening
        </h2>
        <p className="text-base" style={{color: 'var(--color-text-muted)'}}>
          Full database access with clinical explanations
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border-2" style={{borderColor: 'var(--color-border)', background: 'var(--color-surface)', padding: '4px'}}>
          <button
            onClick={() => setInterval("month")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              interval === "month" ? 'text-white' : ''
            }`}
            style={{
              background: interval === "month" ? 'var(--color-brand)' : 'transparent',
              color: interval === "month" ? 'white' : 'var(--color-text-muted)'
            }}
            aria-pressed={interval === "month"}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval("year")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all relative ${
              interval === "year" ? 'text-white' : ''
            }`}
            style={{
              background: interval === "year" ? 'var(--color-brand)' : 'transparent',
              color: interval === "year" ? 'white' : 'var(--color-text-muted)'
            }}
            aria-pressed={interval === "year"}
          >
            Yearly
            {interval === "year" && (
              <span className="absolute -top-2 -right-2 text-white text-xs px-2 py-0.5 rounded-full font-bold" style={{background: 'var(--color-success)'}}>
                Save 33%
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto card" style={{padding: '2rem', background: 'var(--color-surface)'}}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--color-text)'}}>Premium</h3>
          <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>For clinics and small practices</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold" style={{color: 'var(--color-text)'}}>
              {displayPrice}
            </span>
            <span className="text-lg" style={{color: 'var(--color-text-muted)'}}>/month</span>
          </div>
          {interval === "year" && (
            <p className="text-sm mt-1" style={{color: 'var(--color-text-muted)'}}>
              {yearlyLabel} billed annually
            </p>
          )}
        </div>

        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
            <span>Unlimited interaction checks</span>
          </li>
          <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
            <span>Full clinical explanations (PK/PD, CYP pathways)</span>
          </li>
          <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
            <span>PDF report exports</span>
          </li>
          <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
            <span>White-label branding</span>
          </li>
          <li className="flex items-start gap-3 text-sm" style={{color: 'var(--color-text)'}}>
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'var(--color-success)'}} />
            <span>Priority support</span>
          </li>
        </ul>

        <button
          onClick={startCheckout}
          disabled={loading}
          className="btn-cta w-full mb-4 disabled:opacity-60"
        >
          {loading ? "Redirecting…" : "Try Premium free for 14 days"}
        </button>

        {err && <p className="mt-3 text-sm text-center" style={{color: 'var(--color-error)'}}>{err}</p>}

        <p className="text-xs text-center" style={{color: 'var(--color-text-muted)'}}>
          Cancel anytime · For educational purposes only
        </p>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/pricing')}
            className="text-sm hover:underline"
            style={{color: 'var(--color-trial)'}}
          >
            Compare all plans →
          </button>
        </div>
      </div>
    </section>
  );
}
