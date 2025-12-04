export default function HowItWorks() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12 text-slate-900">
        <h2 className="text-2xl font-bold" data-testid="how-title">How it works</h2>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-4" data-testid="how-step-1">
            <p className="font-semibold">1) Select your supplements and medications</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4" data-testid="how-step-2">
            <p className="font-semibold">2) See interactions, risk color codes, and recommendations</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4" data-testid="how-step-3">
            <p className="font-semibold">3) <span className="underline">Download your personalized PDF</span> (paid plans)</p>
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <li className="rounded-lg bg-slate-50 px-4 py-3" data-testid="how-feature-1">Color-coded risk: Low / Medium / High</li>
          <li className="rounded-lg bg-slate-50 px-4 py-3" data-testid="how-feature-2">Practical timing guidance (e.g., 2–4h separation)</li>
          <li className="rounded-lg bg-slate-50 px-4 py-3" data-testid="how-feature-3">Professional PDF to save or share</li>
        </ul>
      </div>
    </section>
  );
}
