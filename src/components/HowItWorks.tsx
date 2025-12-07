/**
 * WARNING: Source of truth for "How it works" section.
 * Do not replace or remove.
 * Tests will fail if altered or removed.
 *
 * Required testids:
 * - how-title: Main "How it works" heading
 * - how-step-1, how-step-2, how-step-3: Three step cards
 */
export default function HowItWorks() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12 text-slate-900">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" data-testid="how-title">How it works</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-slate-200/60 bg-white/70 p-5 shadow-sm" data-testid="how-step-1">
            <p className="font-semibold mb-1">1️⃣ Create your free, Pro, or Premium account</p>
            <p className="text-slate-700 text-sm leading-6">
              Get started in seconds. Free users can check up to{' '}
              <span className="font-semibold">10 doctor-reviewed supplement–medication interactions</span>.
              Pro & Premium unlock unlimited checks, timing guides, and downloadable PDFs.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200/60 bg-white/70 p-5 shadow-sm" data-testid="how-step-2">
            <p className="font-semibold mb-1">2️⃣ Use the Interaction Checker</p>
            <p className="text-slate-700 text-sm leading-6">
              Type your supplement and medication, then click{' '}
              <span className="font-semibold">Check Interactions</span>. Instantly see a color-coded risk
              (Low / Medium / High) with timing guidance from our medical reviewers.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200/60 bg-white/70 p-5 shadow-sm" data-testid="how-step-3">
            <p className="font-semibold mb-1">3️⃣ Download & share reports (Pro & Premium)</p>
            <p className="text-slate-700 text-sm leading-6">
              Generate a <span className="font-semibold">personalized PDF</span> with findings, timing,
              and recommendations—ready to share with your doctor, pharmacist, or coach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
