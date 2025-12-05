/**
 * WARNING: Source of truth for landing hero & upsell.
 * Do not replace with legacy hero or inline markup.
 * Tests will fail if altered or removed.
 *
 * Required testids:
 * - hero-headline: Main "Don't Mix Blind™" headline
 * - hero-cta-primary: Primary CTA to /check
 * - hero-cta-secondary: Secondary CTA to /pricing#pdf
 */
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20" data-testid="hero-badge" aria-label="PDF download included on paid plans">
          <span>PDF Download Included</span>
          <span className="opacity-70">on paid plans</span>
        </div>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl" data-testid="hero-headline">
          Don't Mix Blind™
        </h1>
        <p className="mt-4 text-lg text-white/90 md:text-xl" data-testid="hero-subheadline">
          Your mix, your safety, your report.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/check"
            id="cta-try-checker"
            data-testid="hero-cta-primary"
            data-analytics="try_checker"
            role="button"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-3 text-base font-semibold bg-white text-slate-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Probar el Checker
          </Link>
          <Link
            to="/pricing#pdf"
            id="cta-pdf-upsell"
            data-testid="hero-cta-secondary"
            data-analytics="pdf_upsell"
            role="button"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-3 text-base font-semibold border border-white/50 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Descargar PDF Premium
          </Link>
        </div>

        <p className="mt-4 text-sm text-white/70" data-testid="hero-trustline">
          Preferred by clinicians to summarize supplement–drug interactions clearly. No diagnoses—just practical information.
        </p>

        <p className="mt-10 text-xs text-white/50">© Supplement Safety Bible™ — Do Not Mix Blind™</p>
      </div>
    </section>
  );
}
