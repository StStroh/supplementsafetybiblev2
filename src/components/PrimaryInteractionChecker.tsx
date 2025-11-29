import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function PrimaryInteractionChecker() {
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
    <section className="relative overflow-hidden bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={[
            "transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE3ED] bg-[#F4F8FF] px-4 py-2 text-sm text-[#1A73E8] font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Evidence-based interaction checker</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#000000] mb-4">
              Check Supplement–Drug Interactions
            </h1>
            <p className="text-lg md:text-xl text-[#4A4A4A] max-w-3xl mx-auto leading-relaxed">
              Get instant safety information before combining supplements with prescription medications.
            </p>
          </div>

          <div
            className="max-w-5xl mx-auto bg-white rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-[#DCE3ED]"
            style={{boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-[#000000] mb-2">
                    Supplement
                  </label>
                  <input
                    type="text"
                    inputMode="search"
                    placeholder="e.g., St. John's Wort"
                    className="w-full rounded-xl border-2 border-[#DCE3ED] px-5 py-4 text-base outline-none focus:border-[#1A73E8] focus:ring-4 focus:ring-[#1A73E8]/10 transition-all"
                    value={supplement}
                    onChange={(e) => setSupplement(e.target.value)}
                    aria-label="Supplement"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-[#000000] mb-2">
                    Medication
                  </label>
                  <input
                    type="text"
                    inputMode="search"
                    placeholder="e.g., Sertraline (Zoloft)"
                    className="w-full rounded-xl border-2 border-[#DCE3ED] px-5 py-4 text-base outline-none focus:border-[#1A73E8] focus:ring-4 focus:ring-[#1A73E8]/10 transition-all"
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                    aria-label="Medication"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto md:min-w-[320px] mx-auto flex items-center justify-center rounded-xl bg-[#3CB371] px-8 py-5 text-lg font-semibold text-white hover:bg-[#2D8E57] transition-colors shadow-lg hover:shadow-xl"
              >
                Check Interactions
              </button>

              <div className="text-center">
                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  Powered by <span className="font-semibold text-[#000000]">2,500+ evidence-based</span> supplement-medication interactions.
                </p>
                <p className="text-xs text-[#4A4A4A] mt-2">
                  Educational use only. Not medical advice. Consult a clinician before making changes.
                </p>
              </div>
            </form>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/premium")}
              className="text-[#1A73E8] hover:text-[#1557B0] font-medium transition-colors"
            >
              View subscription plans →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
