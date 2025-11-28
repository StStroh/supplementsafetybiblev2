import NavClinical from "../components/NavClinical";
import FooterClinical from "../components/FooterClinical";
import { Link } from "react-router-dom";
import { ShieldCheck, Activity, Clock } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title =
      "Supplement Safety Bible — Know Your Supplement–Medication Interactions";
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Supplement Safety Bible",
    url:
      typeof window !== "undefined"
        ? window.location.origin
        : "https://supplementsafetybible.com",
    potentialAction: {
      "@type": "SearchAction",
      target: `${
        typeof window !== "undefined"
          ? window.location.origin
          : "https://supplementsafetybible.com"
      }/search?q={query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <NavClinical />

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="h-[560px] bg-gradient-to-b from-indigo-100 via-indigo-50 to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block text-xs px-2 py-1 rounded-full bg-indigo-600/10 text-indigo-700">
              Clinically-oriented • Educational
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight">
              Know Your{" "}
              <span className="text-indigo-700">
                Supplement–Medication
              </span>{" "}
              Interactions
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Fast, practical guidance to avoid risky combinations. Clear
              severity labels with step-by-step recommendations.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/pricing"
                className="px-5 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
              >
                Get Premium
              </Link>

              <a
                href="#features"
                className="px-5 py-3 rounded-2xl border hover:bg-white"
              >
                See features
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Educational use only — not a substitute for medical advice.
            </p>
          </div>

          {/* Preview Box */}
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl border bg-white shadow-lg">
              <div className="p-6">
                <p className="font-semibold">Interaction Checker Preview</p>
                <p className="text-sm text-slate-600">
                  Add two items → instantly see severity and what to do next.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border p-3">
                    <p className="text-slate-500">Supplement</p>
                    <div className="mt-1 h-9 rounded-lg border bg-slate-50" />
                  </div>

                  <div className="rounded-xl border p-3">
                    <p className="text-slate-500">Medication</p>
                    <div className="mt-1 h-9 rounded-lg border bg-slate-50" />
                  </div>

                  <div className="col-span-2 rounded-xl border p-3">
                    <p className="text-slate-500">Result</p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                        High
                      </span>
                      <span className="text-sm text-slate-600">
                        Separate doses 2–6 hours; consult prescriber if
                        symptomatic.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Tags */}
            <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur rounded-2xl border px-3 py-2 shadow-sm text-xs">
              Evidence-based
            </div>

            <div className="absolute -top-4 -right-4 bg-white/80 backdrop-blur rounded-2xl border px-3 py-2 shadow-sm text-xs">
              Fast & clear
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border p-6 bg-white shadow-sm">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            <p className="mt-3 font-semibold">Severity you can trust</p>
            <p className="text-sm text-slate-600">
              Low • Moderate • High • Severe, each with clear next steps.
            </p>
          </div>

          <div className="rounded-2xl border p-6 bg-white shadow-sm">
            <Activity className="h-5 w-5 text-indigo-600" />
            <p className="mt-3 font-semibold">Clean, fast search</p>
            <p className="text-sm text-slate-600">
              Find supplements and meds and see conflicts instantly.
            </p>
          </div>

          <div className="rounded-2xl border p-6 bg-white shadow-sm">
            <Clock className="h-5 w-5 text-indigo-600" />
            <p className="mt-3 font-semibold">Built for workflows</p>
            <p className="text-sm text-slate-600">
              Useful for QA/QC, pharmacists, clinicians, and informed consumers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="rounded-3xl overflow-hidden border shadow-sm">
          <div className="bg-gradient-to-r from-indigo-600 to-sky-600 text-white p-10 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold">Upgrade to Premium</h2>

              <p className="text-white/90 mt-2">
                Unlimited checks, clinician-style guidance, and priority
                improvements.
              </p>
            </div>

            <div className="flex md:justify-end">
              <Link
                to="/pricing"
                className="px-5 py-3 rounded-2xl bg-white text-indigo-700 font-medium hover:bg-white/90"
              >
                Choose a plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterClinical />
    </div>
  );
}
