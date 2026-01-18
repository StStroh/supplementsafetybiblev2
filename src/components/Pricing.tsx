import React, { useState, useEffect } from "react";
import { Check, Loader2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { SUPPORT_EMAIL } from "../lib/support";
import { startTrialCheckout } from "../utils/checkout";
import { useAlert } from "../state/AlertProvider";
import Toast from "./Toast";
import FreePlan from "./FreePlan";
import StickyFreeCTA from "./StickyFreeCTA";

type BillingPeriod = "monthly" | "annual";

interface PricingTier {
  id: "core" | "pro" | "premium";
  name: string;
  description: string;
  monthlyPriceLabel: string;
  annualPriceLabel: string;
  stripeMonthlyPriceId?: string;
  stripeAnnualPriceId?: string;
  features: string[];
  popular?: boolean;
}

// Stripe Price IDs from environment variables
const PRICE_PRO_MONTHLY = import.meta.env.VITE_STRIPE_PRICE_PRO;
const PRICE_PRO_ANNUAL = import.meta.env.VITE_STRIPE_PRICE_PRO_ANNUAL;
const PRICE_PREMIUM_MONTHLY = import.meta.env.VITE_STRIPE_PRICE_PREMIUM;
const PRICE_PREMIUM_ANNUAL = import.meta.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL;

const tiers: PricingTier[] = [
  {
    id: "core",
    name: "Core",
    description: "For individuals managing their own supplements and medications.",
    monthlyPriceLabel: "Free",
    annualPriceLabel: "Free",
    features: [
      "Basic supplement & medication database",
      "Up to 20 interaction checks per month",
      "Email support"
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For power users and health professionals.",
    monthlyPriceLabel: "$14.99 / mo",
    annualPriceLabel: "$199 / yr",
    stripeMonthlyPriceId: PRICE_PRO_MONTHLY,
    stripeAnnualPriceId: PRICE_PRO_ANNUAL,
    features: [
      "Up to 200 interaction checks per month",
      "Extended interaction database",
      "Priority email support",
      "Detailed interaction reports",
      "Severity level indicators",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "For clinics and small practices.",
    monthlyPriceLabel: "$24.99 / mo",
    annualPriceLabel: "$299 / yr",
    stripeMonthlyPriceId: PRICE_PREMIUM_MONTHLY,
    stripeAnnualPriceId: PRICE_PREMIUM_ANNUAL,
    features: [
      "Unlimited interaction checks",
      "Support for multiple people / patients",
      "Advanced filters and clinical notes",
      "API access for integrations",
      "Priority support (24/7)",
    ],
  },
];

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [missingVars, setMissingVars] = useState<string[]>([]);
  const [showResendModal, setShowResendModal] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [_resendCooldown, setResendCooldown] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [user, setUser] = useState<any>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);
  }

  // Auto-scroll to pricing if locked=interactions in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('locked') === 'interactions') {
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  // REMOVED: Auto-trigger checkout - caused regressions
  // Users must manually click checkout buttons

  // Check for missing environment variables on mount
  useEffect(() => {
    console.log('=== STRIPE CONFIGURATION CHECK ===');

    const required = [
      { name: 'VITE_STRIPE_PUBLISHABLE_KEY', value: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY },
      { name: 'VITE_STRIPE_PRICE_PRO', value: PRICE_PRO_MONTHLY, label: 'Pro Monthly' },
      { name: 'VITE_STRIPE_PRICE_PRO_ANNUAL', value: PRICE_PRO_ANNUAL, label: 'Pro Annual' },
      { name: 'VITE_STRIPE_PRICE_PREMIUM', value: PRICE_PREMIUM_MONTHLY, label: 'Premium Monthly' },
      { name: 'VITE_STRIPE_PRICE_PREMIUM_ANNUAL', value: PRICE_PREMIUM_ANNUAL, label: 'Premium Annual' },
    ];

    const missing = required.filter(v => !v.value).map(v => v.name);

    required.forEach(v => {
      if (!v.value) {
        console.warn(`⚠️  MISSING: ${v.name}${v.label ? ` (${v.label})` : ''}`);
      } else {
        console.log(`✅ ${v.name}${v.label ? ` (${v.label})` : ''} is defined`);
      }
    });

    if (missing.length > 0) {
      console.warn('❌ CRITICAL: Missing required Stripe price IDs:', missing);
      console.warn('→ Checkout will NOT work until these are set in Netlify');
      setMissingVars(missing);
    } else {
      console.log('✅ All Stripe price IDs are configured correctly');
    }

    console.log('=================================');
  }, []);

  const handleCheckout = async (tier: 'pro_monthly' | 'pro_annual' | 'premium_monthly' | 'premium_annual') => {
    console.log('[Pricing] Checkout initiated:', { tier, isLoggedIn: !!user });

    // Clear any previous errors
    setCheckoutError(null);
    setLoadingPriceId(tier);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    try {
      const plan = tier.startsWith('pro') ? 'pro' : 'premium';
      const interval = tier.endsWith('monthly') ? 'monthly' : 'annual';

      // Get auth token if user is logged in
      let authToken: string | null = null;
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          authToken = session.access_token;
        }
      } catch (err) {
        console.log('[Pricing] No auth token, proceeding as guest');
      }

      // Build request
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const requestUrl = `/.netlify/functions/create-checkout-session`;
      const payload = { plan, interval };

      console.log('[Pricing] ========== CHECKOUT REQUEST ==========');
      console.log('[Pricing] URL:', requestUrl);
      console.log('[Pricing] Method: POST');
      console.log('[Pricing] POST checkout payload:', payload);
      console.log('[Pricing] Headers:', Object.keys(headers));
      console.log('[Pricing] =========================================');

      const res = await fetch(requestUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('[Pricing] Response:', res.status, res.ok);

      if (!res.ok) {
        let errorMessage = `Checkout failed (HTTP ${res.status})`;
        try {
          const errorData = await res.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
          console.error('[Pricing] Error response:', errorData);
        } catch (parseErr) {
          console.error('[Pricing] Could not parse error response');
        }
        setCheckoutError(errorMessage);
        return; // Stop here - do not throw during render
      }

      const data = await res.json();
      console.log('[Pricing] Success:', data);

      if (!data.url) {
        setCheckoutError('No checkout URL returned from server');
        return;
      }

      console.log('[Pricing] Redirecting to:', data.url);
      window.location.assign(data.url);

      // Note: Loading state stays active until redirect completes
      // This is intentional - user should see "Redirecting..." until navigation happens

    } catch (err: any) {
      clearTimeout(timeoutId);

      if (err.name === 'AbortError') {
        setCheckoutError('Request timed out after 20 seconds. Please check your connection and try again.');
      } else {
        setCheckoutError(err?.message || 'Failed to start checkout. Please try again.');
      }
      console.error('[Pricing] Checkout error:', err);
    } finally {
      // ALWAYS clear loading state in finally block - this is mandatory
      setLoadingPriceId(null);
    }
  };



  const handleResendConfirmation = async () => {
    if (!resendEmail || !resendEmail.includes('@')) {
      setToast({ message: 'Please enter a valid email address', type: 'error' });
      return;
    }

    setResendLoading(true);

    try {
      console.info('[Pricing] Attempting to resend confirmation to:', resendEmail);

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: resendEmail,
      });

      if (error) {
        console.error('[Pricing] Resend error:', error);
        setToast({
          message: error.message || 'Failed to resend confirmation email',
          type: 'error'
        });
      } else {
        console.info('[Pricing] Confirmation email resent successfully');
        setToast({
          message: 'Confirmation sent. Please check your inbox.',
          type: 'success'
        });
        setShowResendModal(false);
        setResendEmail('');

        // Start 30s cooldown
        setResendCooldown(30);
        const interval = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err) {
      console.error('[Pricing] Unexpected error during resend:', err);
      setToast({
        message: 'An unexpected error occurred. Please try again.',
        type: 'error'
      });
    } finally {
      setResendLoading(false);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const isLocked = urlParams.get('locked') === 'interactions';

  return (
    <section id="pricing" className="py-16 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4">
        {checkoutError && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-red-600 text-xl">⚠️</div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900">
                  Checkout Error
                </h3>
                <p className="mt-1 text-sm text-red-700">
                  {checkoutError}
                </p>
                <button
                  onClick={() => setCheckoutError(null)}
                  className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {isLocked && (
          <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-blue-600 text-xl">ℹ️</div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900">
                  Pro & Premium Feature
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  The Interaction Checker is available on Pro and Premium plans. Upgrade now to unlock instant access.
                </p>
              </div>
            </div>
          </div>
        )}

        {missingVars.length > 0 && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-red-600 text-xl">⚠️</div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900">
                  Configuration Error
                </h3>
                <p className="mt-1 text-sm text-red-700">
                  Missing required environment variables. Payments will not work until these are configured in Netlify:
                </p>
                <ul className="mt-2 text-xs text-red-600 font-mono space-y-1">
                  {missingVars.map(v => (
                    <li key={v}>• {v}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        <FreePlan />

        <div className="text-center mb-10 mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Pro & Premium Plans
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Upgrade for unlimited checks and advanced features.
          </p>

          <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-full transition ${
                billingPeriod === "monthly"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Pay Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-full transition ${
                billingPeriod === "annual"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Pay Annually (Save More)
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2" style={{ position: 'relative', zIndex: 10 }}>
          {tiers.filter(tier => tier.id !== "core").map((tier) => {
            const isPopular = tier.popular;
            const priceLabel =
              billingPeriod === "monthly"
                ? tier.monthlyPriceLabel
                : tier.annualPriceLabel;
            const tierKey = `${tier.id}_${billingPeriod === "monthly" ? "monthly" : "annual"}` as 'pro_monthly' | 'pro_annual' | 'premium_monthly' | 'premium_annual';

            return (
              <div
                key={tier.id}
                className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${
                  isPopular ? "border-green-500 ring-2 ring-green-200" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {tier.name}
                  </h3>
                  {isPopular && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Most popular
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  {tier.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">
                    {priceLabel.split(" ")[0]}
                  </span>
                  <span className="text-sm font-medium text-slate-600">
                    {priceLabel.split(" ").slice(1).join(" ")}
                  </span>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check className="h-4 w-4 mt-0.5 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => handleCheckout(tierKey)}
                    disabled={loadingPriceId === tierKey}
                    data-testid={`checkout-btn-${tierKey}`}
                    className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition relative ${
                      loadingPriceId === tierKey
                        ? "bg-slate-400 cursor-wait"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    style={{ zIndex: 60, pointerEvents: 'auto' }}
                  >
                    {loadingPriceId === tierKey ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing…
                      </span>
                    ) : billingPeriod === "monthly" ? (
                      `Start ${tier.name} Monthly Plan`
                    ) : (
                      `Start ${tier.name} Annual Plan`
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          You can cancel anytime. All plans include secure Stripe billing and
          encrypted data handling.
        </p>
        <p className="mt-3 text-center text-sm text-slate-600">
          Questions? Email us at <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 hover:underline">{SUPPORT_EMAIL}</a>
        </p>
      </div>

      {/* Resend Confirmation Modal */}
      {showResendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Resend Confirmation Email</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address to receive a new confirmation link.
            </p>
            <input
              type="email"
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !resendLoading) {
                  handleResendConfirmation();
                }
              }}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowResendModal(false);
                  setResendEmail('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                disabled={resendLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResendConfirmation}
                disabled={resendLoading || !resendEmail}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
              >
                {resendLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Resend'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <StickyFreeCTA />
    </section>
  );
};

export default Pricing;
