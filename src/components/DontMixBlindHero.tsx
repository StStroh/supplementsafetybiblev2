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
    <section className="relative overflow-hidden bg-[#F4F8FF]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div
          className={[
            "grid items-center gap-10 lg:grid-cols-2 transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE3ED] bg-white px-3 py-1 text-xs text-[#4A4A4A]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#3CB371]" />
              Safety-first checker
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#000000] sm:text-5xl lg:text-6xl">
              Don't Mix Blind
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#4A4A4A]">
              Instantly check supplement–drug interactions using our vetted library of{" "}
              <span className="font-semibold text-[#000000]">2,500+</span> entries. See what not to combine,
              what to monitor, and safer alternatives.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3 text-sm text-[#4A4A4A]">
              <li className="rounded-full border border-[#DCE3ED] bg-white px-4 py-1.5">Supplement–Rx focus</li>
              <li className="rounded-full border border-[#DCE3ED] bg-white px-4 py-1.5">Evidence-referenced</li>
              <li className="rounded-full border border-[#DCE3ED] bg-white px-4 py-1.5">Educational use only</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-[#DCE3ED]" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.06)'}}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-[#000000]">Supplement</span>
                <input
                  type="text"
                  inputMode="search"
                  placeholder="e.g., St. John's Wort"
                  className="mt-1.5 w-full rounded-lg border border-[#DCE3ED] px-4 py-2.5 outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] transition-colors"
                  value={supplement}
                  onChange={(e) => setSupplement(e.target.value)}
                  aria-label="Supplement"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-[#000000]">Medication</span>
                <input
                  type="text"
                  inputMode="search"
                  placeholder="e.g., Sertraline (Zoloft)"
                  className="mt-1.5 w-full rounded-lg border border-[#DCE3ED] px-4 py-2.5 outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] transition-colors"
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  aria-label="Medication"
                />
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#3CB371] px-5 py-3 text-white font-medium hover:bg-[#2D8E57] transition-colors"
                >
                  Check interactions
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/premium")}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-[#DCE3ED] px-5 py-3 text-[#000000] font-medium hover:bg-[#F4F8FF] transition-colors"
                >
                  See subscriptions
                </button>
              </div>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
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
