import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AlertTriangle, CheckCircle2, Info, Shield, FileText } from "lucide-react";
import { API_BASE } from "../lib/apiBase";
import NavClinical from "../components/NavClinical";
import FooterClinical from "../components/FooterClinical";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Banner from "../components/ui/Banner";
import SeverityBadge from "../components/check/SeverityBadge";
import ResultCard from "../components/check/ResultCard";
import UpgradeBand from "../components/check/UpgradeBand";
import SourcesAccordion from "../components/check/SourcesAccordion";
import { supabase } from "../lib/supabase";
import { downloadBlob } from "../lib/download";
import TypeaheadInput from "../components/TypeaheadInput";

function isFreeActive(): boolean {
  try { return localStorage.getItem('free_active') === 'true'; } catch { return false; }
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function canUseFreeToday(maxPerDay = 5) {
  try {
    const today = getTodayKey();
    const storeKey = 'free_checks';
    const raw = localStorage.getItem(storeKey);
    const obj = raw ? JSON.parse(raw) : {};
    const used = Number(obj[today] || 0);

    if (used >= maxPerDay) {
      return { ok: false, remaining: 0, message: `Daily limit reached on Free. You've used ${maxPerDay}/${maxPerDay} checks today.` };
    }
    return { ok: true, remaining: maxPerDay - used, message: '' };
  } catch {
    return { ok: true, remaining: 1e9, message: '' };
  }
}

function incrementFreeUsage() {
  try {
    const today = getTodayKey();
    const storeKey = 'free_checks';
    const raw = localStorage.getItem(storeKey);
    const obj = raw ? JSON.parse(raw) : {};
    const used = Number(obj[today] || 0);
    obj[today] = used + 1;
    localStorage.setItem(storeKey, JSON.stringify(obj));
  } catch {}
}

type CheckResp =
  | { ok: false; reason: string; pair?: { supplement: string; medication: string } }
  | {
      ok: true;
      pair: { supplement: string; medication: string };
      severity: "low" | "moderate" | "high" | "severe";
      summary: string;
      recommendations: string[];
      mechanism?: string | null;
      sources: Array<{ title: string; link?: string; year?: string }>;
      last_reviewed?: string | null;
    };

export default function Check() {
  const [selSup, setSelSup] = useState<string>("");
  const [selMed, setSelMed] = useState<string>("");
  const [result, setResult] = useState<CheckResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [showStickyFooter, setShowStickyFooter] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string>('free');

  useEffect(() => {
    async function fetchUserPlan() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('plan')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profile) {
            setUserPlan(profile.plan || 'free');
          }
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
      }
    }
    fetchUserPlan();
  }, []);

  async function check() {
    setError(null);

    if (isFreeActive()) {
      const gate = canUseFreeToday(5);
      if (!gate.ok) {
        const msg = gate.message + ' Upgrade for unlimited checks.';
        setError(msg);
        return;
      }
    }

    setLoading(true);
    setResult(null);
    const r = await fetch(`${API_BASE}/interactions-check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        supplement: selSup,
        medication: selMed,
      }),
    });
    const j: CheckResp = await r.json();
    setResult(j);
    setLoading(false);

    if (j && j.ok) {
      setShowStickyFooter(true);
      if (isFreeActive()) {
        incrementFreeUsage();
      }
    }
  }

  async function handleGeneratePDF() {
    if (!result || !result.ok) return;

    if (userPlan === 'free') {
      if (confirm('PDF download is available for paid plans only. Would you like to upgrade to Pro or Premium?')) {
        window.location.href = '/#pricing';
      }
      return;
    }

    setPdfLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        alert('Please sign in to generate PDF reports');
        setPdfLoading(false);
        return;
      }

      const pdfData = {
        supplements: [{ name: result.pair.supplement }],
        medications: [{ name: result.pair.medication }],
        interactions: [{
          supplement_name: result.pair.supplement,
          medication_name: result.pair.medication,
          severity: result.severity,
          clinical_explanation: result.summary,
          recommendations: result.recommendations.join('\n'),
          mechanism: result.mechanism || '',
        }],
      };

      const res = await fetch('/.netlify/functions/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: pdfData }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.requiresUpgrade) {
          if (confirm(errorData.message + ' Would you like to upgrade now?')) {
            window.location.href = '/#pricing';
          }
          setPdfLoading(false);
          return;
        }
        throw new Error(errorData.error || 'Failed to generate PDF');
      }

      const blob = await res.blob();
      const date = new Date().toISOString().split('T')[0];
      downloadBlob(blob, `SSB-Report-${date}.pdf`);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How accurate is the interaction checker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our database is curated from peer-reviewed clinical studies and updated regularly by healthcare professionals.",
        },
      },
      {
        "@type": "Question",
        name: "Is this free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Basic checks showing severity and top recommendations are free. Premium plans unlock detailed mechanisms, monitoring guidelines, and personalized alerts.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Helmet>
        <title>Supplement–Prescription Interaction Checker | Supplement Safety Bible</title>
        <meta
          name="description"
          content="Check for dangerous interactions between supplements and medications. Get evidence-based safety guidance from peer-reviewed clinical studies."
        />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <NavClinical />

      <main className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
              Check Supplement–Drug Interactions
            </h1>
            {isFreeActive() && (
              <span className="rounded bg-green-100 text-green-700 px-2 py-0.5 text-xs font-medium">
                Free — Active
              </span>
            )}
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Understand risks instantly with clinical-grade explanations.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 border border-gray-200 mb-8">
          <div className="space-y-6">
            <div>
              <TypeaheadInput
                label="Supplements"
                placeholder="Type a supplement..."
                type="supplement"
                onChoose={(name) => setSelSup(name)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              />
              {selSup && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">
                    {selSup}
                    <button
                      onClick={() => setSelSup("")}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  </span>
                </div>
              )}
              <button className="text-blue-600 mt-2 mb-2 text-sm font-medium hover:text-blue-700 transition-colors">
                + Add another supplement
              </button>
            </div>

            <div>
              <TypeaheadInput
                label="Medications"
                placeholder="Type a medication..."
                type="medication"
                onChoose={(name) => setSelMed(name)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              />
              {selMed && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">
                    {selMed}
                    <button
                      onClick={() => setSelMed("")}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  </span>
                </div>
              )}
              <button className="text-blue-600 mt-2 mb-2 text-sm font-medium hover:text-blue-700 transition-colors">
                + Add another medication
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{String(error)}</p>
              </div>
            )}

            <button
              onClick={check}
              disabled={loading || !selSup || !selMed}
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Checking..." : "Search Interactions"}
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-6 animate-fade-in">
            {!result.ok ? (
              <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 border border-gray-200">
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={28} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                      No Documented Interaction
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      We haven't found any documented interactions between{" "}
                      <strong className="text-gray-900">{result.pair?.supplement || "this supplement"}</strong> and{" "}
                      <strong className="text-gray-900">{result.pair?.medication || "this medication"}</strong> in our database.
                    </p>
                    <p className="text-gray-600 text-sm mt-4 pt-4 border-t border-gray-200">
                      Always consult your healthcare provider before starting any new supplement,
                      especially if you're taking prescription medications.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200">
                  <div
                    className="px-6 py-5"
                    style={{
                      background:
                        result.severity === "severe"
                          ? "#DC2626"
                          : result.severity === "high"
                          ? "#F97316"
                          : result.severity === "moderate"
                          ? "#EAB308"
                          : "#6B7280",
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold text-white mb-2">
                          {result.pair.supplement} + {result.pair.medication}
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white bg-opacity-90 text-sm font-bold uppercase tracking-wide"
                          style={{
                            color:
                              result.severity === "severe"
                                ? "#DC2626"
                                : result.severity === "high"
                                ? "#F97316"
                                : result.severity === "moderate"
                                ? "#EAB308"
                                : "#6B7280",
                          }}
                        >
                          {result.severity} Risk
                        </div>
                      </div>
                      {(result.severity === "severe" || result.severity === "high") && (
                        <AlertTriangle size={36} className="text-white" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 border border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <FileText className="text-blue-600" size={22} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 text-base">Export Report</h3>
                          {userPlan !== 'free' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                              PDF Included
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                              Pro Feature
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {userPlan !== 'free'
                            ? 'Download a professional PDF report'
                            : 'Upgrade to Pro or Premium to download PDF reports'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleGeneratePDF}
                      disabled={pdfLoading}
                      className={`px-5 py-2.5 rounded-xl font-semibold transition-colors ${
                        userPlan !== 'free'
                          ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                      }`}
                    >
                      {pdfLoading ? "Generating..." : userPlan !== 'free' ? "Download PDF" : "Upgrade to Download"}
                    </button>
                  </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 border border-gray-200">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Info size={18} className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">What It Means</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{result.summary}</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 border border-gray-200">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Shield size={18} className="text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">What To Do</h3>
                  </div>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-green-600 font-bold text-lg leading-none mt-0.5">•</span>
                        <span className="text-gray-700 leading-relaxed flex-1">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {result.mechanism && (
                  <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 border border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">Mechanism</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {result.mechanism}
                    </p>
                  </div>
                )}

                {result.sources && result.sources.length > 0 && (
                  <SourcesAccordion sources={result.sources} freeSources={1} />
                )}

                {result.last_reviewed && (
                  <div className="text-sm text-gray-500 text-center py-2">
                    Last reviewed: {new Date(result.last_reviewed).toLocaleDateString()}
                  </div>
                )}

                <UpgradeBand className="mt-8" />
              </>
            )}
          </div>
        )}
      </main>

      <FooterClinical />

      {showStickyFooter && !stickyDismissed && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
          <div className="max-w-4xl mx-auto">
            <Banner
              variant="info"
              dismissible
              onDismiss={() => setStickyDismissed(true)}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="font-semibold text-blue-900 mb-1">
                    Keep checks private and get alerts
                  </div>
                  <div className="text-sm text-blue-700">
                    Track unlimited interactions with personalized safety monitoring.
                  </div>
                </div>
                <a
                  href="/pricing?plan=pro"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  View Plans
                </a>
              </div>
            </Banner>
          </div>
        </div>
      )}
    </div>
  );
}
