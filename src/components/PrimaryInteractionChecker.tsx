import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Award, Database, CheckCircle2 } from "lucide-react";

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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-white to-white py-16 lg:py-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2E7D32] rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div
          className={[
            "transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#0066CC]/20 bg-[#E3F2FD] px-4 py-2 text-sm text-[#0066CC] font-semibold mb-6">
                <Shield className="w-4 h-4" />
                <span>Clinical-Grade Safety Tool</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1A1A1A] mb-4 leading-[1.1]">
                Don't Mix Blind
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 bg-[#E8F5E9] border border-[#2E7D32]/20 px-4 py-2 rounded-lg">
                  <Database className="w-4 h-4 text-[#2E7D32]" />
                  <span className="text-sm font-semibold text-[#2E7D32]">2,500+ Interactions</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#E3F2FD] border border-[#0066CC]/20 px-4 py-2 rounded-lg">
                  <Award className="w-4 h-4 text-[#0066CC]" />
                  <span className="text-sm font-semibold text-[#0066CC]">Subscriptions Available</span>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-[#424242] leading-relaxed mb-6">
                Professional supplement–drug interaction checker powered by evidence-based clinical research.
              </p>

              <div className="flex items-start gap-3 bg-white border-l-4 border-[#0066CC] p-4 rounded-r-lg" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.06)'}}>
                <CheckCircle2 className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#424242] leading-relaxed">
                  Used by healthcare professionals and patients to make informed decisions about supplement safety.
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/10 to-[#2E7D32]/10 rounded-3xl transform rotate-3"></div>
                <img
                  src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Medical professional reviewing patient information"
                  className="relative rounded-3xl border-4 border-white shadow-2xl"
                  style={{boxShadow: '0 20px 60px rgba(0,0,0,0.15)'}}
                />
              </div>
            </div>
          </div>

          <div
            className="max-w-5xl mx-auto bg-white rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-[#0066CC]/20"
            style={{boxShadow: '0 12px 40px rgba(0,102,204,0.12)'}}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-bold text-[#1A1A1A] mb-2">
                    Supplement
                  </label>
                  <input
                    type="text"
                    inputMode="search"
                    placeholder="e.g., St. John's Wort"
                    className="w-full rounded-xl border-2 border-[#DCE3ED] px-5 py-4 text-base outline-none focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/15 transition-all bg-[#F8FBFF]"
                    value={supplement}
                    onChange={(e) => setSupplement(e.target.value)}
                    aria-label="Supplement"
                  />
                </div>
                <div>
                  <label className="block text-base font-bold text-[#1A1A1A] mb-2">
                    Medication
                  </label>
                  <input
                    type="text"
                    inputMode="search"
                    placeholder="e.g., Sertraline (Zoloft)"
                    className="w-full rounded-xl border-2 border-[#DCE3ED] px-5 py-4 text-base outline-none focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/15 transition-all bg-[#F8FBFF]"
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                    aria-label="Medication"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto sm:min-w-[280px] flex items-center justify-center rounded-xl bg-[#2E7D32] px-8 py-5 text-lg font-bold text-white hover:bg-[#1B5E20] transition-all shadow-lg hover:shadow-xl"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Check Interactions
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/premium")}
                  className="w-full sm:w-auto px-8 py-5 text-lg font-bold text-[#0066CC] hover:text-[#004C99] transition-colors"
                >
                  View Plans →
                </button>
              </div>

              <div className="text-center mt-6">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse"></div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    2,500+ Evidence-Based Interactions
                  </p>
                </div>
                <p className="text-xs text-[#616161] leading-relaxed">
                  Clinical tool for educational purposes. Not a substitute for professional medical advice. Always consult your healthcare provider.
                </p>
              </div>
            </form>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-[#DCE3ED] rounded-xl p-6 text-center" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.06)'}}>
              <div className="w-12 h-12 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="w-6 h-6 text-[#0066CC]" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] mb-2">Comprehensive Database</h3>
              <p className="text-sm text-[#616161]">2,500+ verified interactions from peer-reviewed sources</p>
            </div>
            <div className="bg-white border border-[#DCE3ED] rounded-xl p-6 text-center" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.06)'}}>
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-[#2E7D32]" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] mb-2">Clinical Accuracy</h3>
              <p className="text-sm text-[#616161]">Evidence-based data updated by healthcare professionals</p>
            </div>
            <div className="bg-white border border-[#DCE3ED] rounded-xl p-6 text-center" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.06)'}}>
              <div className="w-12 h-12 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-[#0066CC]" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] mb-2">Professional Grade</h3>
              <p className="text-sm text-[#616161]">Trusted by clinicians and health-conscious patients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
