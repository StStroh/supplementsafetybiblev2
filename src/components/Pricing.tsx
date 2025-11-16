// src/components/Pricing.tsx

import { useState } from "react";
import { Check } from "lucide-react";

type BillingPeriod = "monthly" | "annual";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPriceLabel: string;
  annualPriceLabel: string;
  monthlyPriceId: string;
  annualPriceId: string;
  features: string[];
  popular?: boolean;
}

const tiers: PricingTier[] = [
  {
    id: "core",
    name: "Core",
    description: "For individuals managing their personal supplements.",
    monthlyPriceLabel: "Free (coming soon)",
    annualPriceLabel: "Free (coming soon)",
    monthlyPriceId: "",
    annualPriceId: "",
    features: [
      "Basic supplement & medication database",
      "Up to 20 interaction checks per month",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For power users and health professionals.",
    monthlyPriceLabel: "$29 / mo",
    annualPriceLabel: "$289 / yr",
    monthlyPriceId: "price_1SSERBLSpIuKqlsUsWSDz8n6",
    annualPriceId: "price_1SSEW2LSpIuKqlsUKw2UAglX",
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
    monthlyPriceId: "price_1SSb9jLSpIuKqlsUMRo6AxHg",
    annualPriceId: "price_1SSbB0LSpIuKqlsUCJP8sL8q",
    features: [
      "Unlimited interaction checks",
      "Support for multiple people / patients",
      "Advanced filters and clinical notes",
      "API access for integrations",
      "Priority support (24/7)",
    ],
  },
];

const handleCheckout = async (priceId: string) => {
  try {
    const res = await fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Checkout error. Please try again.");
      return;
    }

    if (!data.url) {
      alert("Unexpected payment server error.");
      return;
    }

    window.location.href = data.url;
  } catch (err) {
    console.error("Network error during checkout:", err);
    alert("Network error. Please try again.");
  }
};

export default function Pricing() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Choose your plan
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Get medical-grade insight into supplement and medication
            interactions.
          </p>

          <div className="mt-6 inline-flex items-center rounded-full bg-white shadow-sm border border-slate-200 p-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`px-4 py-1 text-sm rounded-full ${
                billing === "monthly"
                  ? "bg-green-600 text-white"
                  : "text-slate-600"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`px-4 py-1 text-sm rounded-full ${
                billing === "annual"
                  ? "bg-green-600 text-white"
                  : "text-slate-600"
              }`}
            >
              Annual (save 2 months)
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => {
            const isAnnual = billing === "annual";
            const priceLabel = isAnnual
              ? tier.annualPriceLabel
              : tier.monthlyPriceLabel;
            const priceId = isAnnual
              ? tier.annualPriceId
              : tier.monthlyPriceId;

            const isCore = tier.id === "core";

            return (
              <div
                key={tier.id}
                className={`flex flex-col rounded-2xl border bg-white shadow-sm ${
                  tier.popular
                    ? "border-green-500 shadow-md ring-1 ring-green-100"
                    : "border-slate-200"
                }`}
              >
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">
                      {tier.name}
                    </h2>

                    {tier.popular && (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 border border-green-100">
                        Most popular
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    {tier.description}
                  </p>

                  <div className="mt-4">
                    <span className="text-2xl font-bold text-slate-900">
                      {priceLabel}
                    </span>
                  </div>

                  {isCore && (
                    <p className="mt-2 text-xs text-slate-500">
                      Our free Core plan is being prepared. Soon you can use the
                      basic interaction checker without a subscription.
                    </p>
                  )}
                </div>

                <ul className="flex-1 space-y-2 px-6 py-4 text-sm text-slate-700">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-1 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="px-6 pb-6 pt-2">
                  {isCore ? (
                    <button
                      type="button"
                      disabled
                      className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold bg-slate-300 text-slate-600 cursor-not-allowed"
                    >
                      Coming Soon – Free Core
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCheckout(priceId)}
                      className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm ${
                        tier.popular
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-slate-900 hover:bg-slate-950 text-white"
                      }`}
                    >
                      {tier.name === "Pro"
                        ? `Start Pro – ${
                            billing === "monthly" ? "Monthly" : "Annual"
                          }`
                        : `Start Premium – ${
                            billing === "monthly" ? "Monthly" : "Annual"
                          }`}
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
    </div>
  );
}