import { useMemo, useState } from "react";

type Props = {
  monthlyLabel?: string;
  yearlyLabel?: string;
  className?: string;
};

export default function PricingSection({
  monthlyLabel = "$—",
  yearlyLabel = "$—",
  className = "",
}: Props) {
  const [interval, setInterval] = useState<"month" | "year">("month");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const priceLabel = useMemo(
    () => (interval === "month" ? monthlyLabel : yearlyLabel),
    [interval, monthlyLabel, yearlyLabel]
  );

  async function startCheckout() {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: "premium",
          billing_interval: interval
        }),
      });
      if (!res.ok) throw new Error(`Checkout failed (${res.status})`);
      const data = await res.json();
      if (!data?.url) throw new Error("No checkout URL returned");
      window.location.assign(data.url);
    } catch (e: any) {
      setErr(e?.message || "Could not start checkout");
      setLoading(false);
    }
  }

  return (
    <section
      className={`w-full bg-white text-slate-900 border border-slate-200 rounded-2xl shadow-sm ${className}`}
    >
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-2xl font-bold">Choose Your Access</h2>
        <p className="mt-1 text-slate-600">
          Full interaction database, clinical explanations, continuous updates.
        </p>
      </div>

      <div className="px-6">
        <div className="inline-flex items-center rounded-xl border border-slate-200 p-1">
          <button
            onClick={() => setInterval("month")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              interval === "month"
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
            aria-pressed={interval === "month"}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval("year")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              interval === "year"
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
            aria-pressed={interval === "year"}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
          <div className="flex items-baseline gap-3">
            <h3 className="text-xl font-semibold">Premium</h3>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 border border-blue-100">
              Don't Mix Blind™
            </span>
          </div>

          <p className="mt-2 text-slate-600">
            Evidence-based guidance for safe supplement + medication use.
          </p>

          <div className="mt-5">
            <div className="text-4xl font-bold leading-none">{priceLabel}</div>
            <div className="text-sm text-slate-500 mt-1">
              *Actual charge set in Stripe. You can change pricing anytime.
            </div>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li>• Complete interaction database</li>
            <li>• Risk levels with mechanisms</li>
            <li>• Clear, clinician-style summaries</li>
            <li>• Red-flag warnings & updates</li>
          </ul>

          <button
            onClick={startCheckout}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-blue-600 text-white py-3 font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Redirecting…" : "Upgrade — Don't Mix Blind™"}
          </button>

          {err && <p className="mt-3 text-sm text-red-600">{err}</p>}

          <p className="mt-4 text-xs text-slate-500 text-center">
            Instant access. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
