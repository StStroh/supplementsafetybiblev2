import { Link } from "react-router-dom";

export default function FreePlan() {
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

      <div className="mt-6">
        <Link
          to="/free"
          className="block h-12 rounded-xl bg-black text-white px-6 font-medium hover:bg-black/90 active:translate-y-px text-center leading-[3rem]"
          role="button"
        >
          Start Free
        </Link>
      </div>

      <p className="mt-2 text-xs text-slate-500">No email required. No credit card.</p>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-slate-500">Secure auth via Supabase. Payments handled by Stripe.</p>
        <a href="/#pricing?tab=paid" className="text-sm font-medium underline underline-offset-4">
          See Pro & Premium →
        </a>
      </div>
    </section>
  );
}
