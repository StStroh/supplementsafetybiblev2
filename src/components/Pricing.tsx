import React, { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";

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
    annualPriceLabel: "$149 / yr",
    stripeMonthlyPriceId: import.meta.env.VITE_STRIPE_PRICE_PRO,
    stripeAnnualPriceId: import.meta.env.VITE_STRIPE_PRICE_PRO_ANNUAL,
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
    annualPriceLabel: "$249 / yr",
    stripeMonthlyPriceId: import.meta.env.VITE_STRIPE_PRICE_PREMIUM,
    stripeAnnualPriceId: import.meta.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL,
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
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [missingVars, setMissingVars] = useState<string[]>([]);

  // Check for missing environment variables on mount
  useEffect(() => {
    console.log('=== STRIPE CONFIGURATION CHECK ===');

    const required = [
      { name: 'VITE_STRIPE_PUBLISHABLE_KEY', value: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY },
      { name: 'VITE_STRIPE_PRICE_PRO', value: import.meta.env.VITE_STRIPE_PRICE_PRO, label: 'Pro Monthly' },
      { name: 'VITE_STRIPE_PRICE_PRO_ANNUAL', value: import.meta.env.VITE_STRIPE_PRICE_PRO_ANNUAL, label: 'Pro Annual' },
      { name: 'VITE_STRIPE_PRICE_PREMIUM', value: import.meta.env.VITE_STRIPE_PRICE_PREMIUM, label: 'Premium Monthly' },
      { name: 'VITE_STRIPE_PRICE_PREMIUM_ANNUAL', value: import.meta.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL, label: 'Premium Annual' },
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
      console.warn('→ Monthly checkout will NOT work until these are set in Netlify');
      setMissingVars(missing);
    } else {
      console.log('✅ All Stripe price IDs are configured correctly');
    }

    console.log('=================================');
  }, []);

  const handleCheckout = async (priceId?: string) => {
    if (!priceId) {
      alert('Error: Price ID is not configured. Please contact support.');
      console.error('Price ID is undefined. Check environment variables.');
      return;
    }

    if (priceId.includes('undefined') || priceId.startsWith('$')) {
      alert('Error: Environment variables not configured. Please contact support.');
      console.error('Invalid price ID:', priceId);
      console.error('Environment check:', {
        VITE_STRIPE_PRICE_PRO: import.meta.env.VITE_STRIPE_PRICE_PRO,
        VITE_STRIPE_PRICE_PREMIUM: import.meta.env.VITE_STRIPE_PRICE_PREMIUM,
      });
      return;
    }

    try {
      setLoadingPriceId(priceId);

      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Checkout error:", data);
        alert(data.error || "Checkout error. Please try again.");
        setLoadingPriceId(null);
        return;
      }

      if (!data.url) {
        console.error("No URL returned from checkout session", data);
        alert("Unexpected response from payment server.");
        setLoadingPriceId(null);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Network error during checkout:", err);
      alert("Network error. Please try again.");
      setLoadingPriceId(null);
    }
  };

  const handleCoreClick = () => {
    const checkerSection = document.getElementById('checker');
    if (checkerSection) {
      checkerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-16 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4">
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
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose your plan
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Start with the free Core plan and upgrade as you need more power.
          </p>

          <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setBillingPeriod("monthly")}
              className={`px-3 py-1 rounded-full ${
                billingPeriod === "monthly"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod("annual")}
              className={`px-3 py-1 rounded-full ${
                billingPeriod === "annual"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600"
              }`}
            >
              Annual (save more)
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => {
            const isCore = tier.id === "core";
            const isPopular = tier.popular;
            const priceLabel =
              billingPeriod === "monthly"
                ? tier.monthlyPriceLabel
                : tier.annualPriceLabel;
            const activePriceId =
              billingPeriod === "monthly"
                ? tier.stripeMonthlyPriceId
                : tier.stripeAnnualPriceId;

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
                  {isCore ? (
                    <button
                      type="button"
                      onClick={handleCoreClick}
                      className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
                    >
                      Start Free Core
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCheckout(activePriceId)}
                      disabled={loadingPriceId === activePriceId}
                      className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition ${
                        loadingPriceId === activePriceId
                          ? "bg-slate-400 cursor-wait"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {loadingPriceId === activePriceId ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing…
                        </span>
                      ) : billingPeriod === "monthly" ? (
                        `Start ${tier.name} – Monthly`
                      ) : (
                        `Start ${tier.name} – Annual`
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          You can cancel anytime. All plans include secure Stripe billing and
          encrypted data handling.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
