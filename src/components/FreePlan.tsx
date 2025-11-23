import { useState } from "react";

export default function FreePlan({ onStart }: { onStart: (email: string) => void }) {
  const [email, setEmail] = useState("");

  return (
    <section className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-black text-white grid place-items-center font-semibold">Free</div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Start Free</h2>
          <p className="text-slate-600">Create your account in 10 seconds — no card required.</p>
        </div>
      </div>

      <ul className="mt-6 space-y-2 text-slate-700">
        <li className="flex items-start gap-2"><span className="mt-1">✔</span> Basic supplement & medication lookups</li>
        <li className="flex items-start gap-2"><span className="mt-1">✔</span> Up to <b>20</b> interaction checks / month</li>
        <li className="flex items-start gap-2"><span className="mt-1">✔</span> Email support</li>
      </ul>

      <form
        className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]"
        onSubmit={(e) => { e.preventDefault(); if (email.trim()) onStart(email.trim()); }}
      >
        <input
          type="email"
          inputMode="email"
          required
          placeholder="your@email.com"
          className="h-12 w-full rounded-xl border border-slate-300 px-4 focus:outline-none focus:ring-2 focus:ring-black/80"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button
          type="submit"
          className="h-12 rounded-xl bg-black text-white px-6 font-medium hover:bg-black/90 active:translate-y-px"
        >
          Start Free
        </button>
      </form>

      <p className="mt-2 text-xs text-slate-500">No credit card. Cancel anytime.</p>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-slate-500">Secure auth via Supabase. Payments handled by Stripe.</p>
        <a href="/#pricing?tab=paid" className="text-sm font-medium underline underline-offset-4">
          See Pro & Premium →
        </a>
      </div>
    </section>
  );
}
