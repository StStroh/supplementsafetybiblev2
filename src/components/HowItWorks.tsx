import { IconAccount, IconChecker, IconPdf } from './icons';
import '../styles/header.css';

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
            <div className="feature-card">
              <span className="feature-icon" aria-hidden="true">
                {IconAccount}
              </span>
              <div>
                <h3 className="feature-title text-base font-semibold mb-1">1. Create your free, Pro, or Premium account</h3>
                <p className="feature-sub text-slate-700 text-sm leading-6">
                  Get started in seconds. Free users can check up to{' '}
                  <span className="font-semibold">10 doctor-reviewed supplement–medication interactions</span>.
                  Pro & Premium unlock unlimited checks, timing guides, and downloadable PDFs.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200/60 bg-white/70 p-5 shadow-sm" data-testid="how-step-2">
            <div className="feature-card">
              <span className="feature-icon" aria-hidden="true">
                {IconChecker}
              </span>
              <div>
                <h3 className="feature-title text-base font-semibold mb-1">2. Use the Interaction Checker</h3>
                <p className="feature-sub text-slate-700 text-sm leading-6">
                  Type your supplement and medication, then click{' '}
                  <span className="font-semibold">Check Interactions</span>. Instantly see a color-coded risk
                  (Low / Medium / High) with timing guidance from our medical reviewers.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200/60 bg-white/70 p-5 shadow-sm" data-testid="how-step-3">
            <div className="feature-card">
              <span className="feature-icon" aria-hidden="true">
                {IconPdf}
              </span>
              <div>
                <h3 className="feature-title text-base font-semibold mb-1">3. Download & share reports (Pro & Premium)</h3>
                <p className="feature-sub text-slate-700 text-sm leading-6">
                  Generate a <span className="font-semibold">personalized PDF</span> with findings, timing,
                  and recommendations—ready to share with your doctor, pharmacist, or coach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
