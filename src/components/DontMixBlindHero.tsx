import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DontMixBlindHero() {
  const navigate = useNavigate();
  const [supplement, setSupplement] = useState("");
  const [medication, setMedication] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (supplement.trim()) params.set("supplement", supplement.trim());
    if (medication.trim()) params.set("medication", medication.trim());
    navigate(`/search?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div
          className={[
            "grid items-center gap-10 lg:grid-cols-2 transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              Safety-first checker
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Don't Mix Blind
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80">
              Instantly check supplement–drug interactions using our vetted library of{" "}
              <span className="font-semibold text-white">2,500+</span> entries. See what not to combine,
              what to monitor, and safer alternatives. Subscriptions available.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3 text-xs text-white/80">
              <li className="rounded-full bg-white/10 px-3 py-1">Supplement–Rx focus</li>
              <li className="rounded-full bg-white/10 px-3 py-1">Evidence-referenced</li>
              <li className="rounded-full bg-white/10 px-3 py-1">Educational, not medical advice</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Supplement</span>
                <input
                  type="text"
                  inputMode="search"
                  placeholder="e.g., St. John's Wort"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-400"
                  value={supplement}
                  onChange={(e) => setSupplement(e.target.value)}
                  aria-label="Supplement"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Medication</span>
                <input
                  type="text"
                  inputMode="search"
                  placeholder="e.g., Sertraline (Zoloft)"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-400"
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  aria-label="Medication"
                />
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-white hover:bg-black"
                >
                  Check interactions
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/premium")}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 hover:bg-slate-50"
                >
                  See subscriptions
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Educational use only. Not medical advice. Consult a clinician before changing any
                medications or supplements.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
