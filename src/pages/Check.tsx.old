import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AlertTriangle, CheckCircle2, Info, Shield } from "lucide-react";
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

type Item = { id: number; name: string };
type SearchResp = { supplements?: Item[]; medications?: Item[] };
type CheckResp =
  | { found: false; supplement?: string; medication?: string }
  | {
      found: true;
      interaction: {
        supplement_name: string;
        medication_name: string;
        severity: "low" | "moderate" | "high" | "severe";
        description: string;
        recommendation: string;
        mechanism?: string;
        monitoring?: string;
        alternatives?: string[];
        sources?: Array<{ title: string; url?: string; year?: string; authors?: string }>;
        last_reviewed?: string;
      };
    };

export default function Check() {
  const [supQ, setSupQ] = useState("");
  const [medQ, setMedQ] = useState("");
  const [sugsSup, setSugsSup] = useState<Item[]>([]);
  const [sugsMed, setSugsMed] = useState<Item[]>([]);
  const [selSup, setSelSup] = useState<string>("");
  const [selMed, setSelMed] = useState<string>("");
  const [result, setResult] = useState<CheckResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [showStickyFooter, setShowStickyFooter] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);

  useEffect(() => {
    const h = setTimeout(async () => {
      if (!supQ.trim()) return setSugsSup([]);
      const r = await fetch(
        `${API_BASE}/interactions-search?q=${encodeURIComponent(supQ)}&type=supplement`
      );
      const j: SearchResp = await r.json();
      setSugsSup(j.supplements || []);
    }, 220);
    return () => clearTimeout(h);
  }, [supQ]);

  useEffect(() => {
    const h = setTimeout(async () => {
      if (!medQ.trim()) return setSugsMed([]);
      const r = await fetch(
        `${API_BASE}/interactions-search?q=${encodeURIComponent(medQ)}&type=medication`
      );
      const j: SearchResp = await r.json();
      setSugsMed(j.medications || []);
    }, 220);
    return () => clearTimeout(h);
  }, [medQ]);

  async function check() {
    setLoading(true);
    setResult(null);
    const r = await fetch(`${API_BASE}/interactions-check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        supplement: selSup || supQ,
        medication: selMed || medQ,
      }),
    });
    const j: CheckResp = await r.json();
    setResult(j);
    setLoading(false);

    if (j && "found" in j && j.found) {
      setShowStickyFooter(true);
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate is the interaction checker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our database is curated from peer-reviewed clinical studies and updated regularly by healthcare professionals."
        }
      },
      {
        "@type": "Question",
        "name": "Is this free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic checks showing severity and top recommendations are free. Premium plans unlock detailed mechanisms, monitoring guidelines, and personalized alerts."
        }
      }
    ]
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

      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Check Supplement Interactions
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Enter a supplement and medication to check for documented interactions and get
            evidence-based safety guidance.
          </p>
        </div>

        <Card className="mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Supplement
              </label>
              <div className="relative">
                <input
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-base focus:border-blue-500 focus:outline-none transition-colors"
                  value={selSup || supQ}
                  onChange={(e) => {
                    setSelSup("");
                    setSupQ(e.target.value);
                  }}
                  placeholder="e.g., Niacin, St. John's Wort"
                />
                {sugsSup.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 border-2 border-slate-200 rounded-xl p-2 bg-white shadow-lg">
                    {sugsSup.map((s) => (
                      <div
                        key={s.id}
                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
                        onClick={() => {
                          setSelSup(s.name);
                          setSupQ("");
                          setSugsSup([]);
                        }}
                      >
                        {s.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Medication
              </label>
              <div className="relative">
                <input
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-base focus:border-blue-500 focus:outline-none transition-colors"
                  value={selMed || medQ}
                  onChange={(e) => {
                    setSelMed("");
                    setMedQ(e.target.value);
                  }}
                  placeholder="e.g., Simvastatin, Warfarin"
                />
                {sugsMed.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 border-2 border-slate-200 rounded-xl p-2 bg-white shadow-lg">
                    {sugsMed.map((m) => (
                      <div
                        key={m.id}
                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
                        onClick={() => {
                          setSelMed(m.name);
                          setMedQ("");
                          setSugsMed([]);
                        }}
                      >
                        {m.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button onClick={check} disabled={loading} size="lg" className="w-full sm:w-auto">
            {loading ? "Checking..." : "Check Interaction"}
          </Button>
        </Card>

        {result && (
          <div className="space-y-6 animate-fade-in">
            {"found" in result && !result.found ? (
              <Card>
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">
                      No Documented Interaction
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      We haven't found any documented interactions between{" "}
                      <strong>{result.supplement || "this supplement"}</strong> and{" "}
                      <strong>{result.medication || "this medication"}</strong> in our database.
                    </p>
                    <p className="text-slate-500 text-sm mt-3">
                      Always consult your healthcare provider before starting any new supplement,
                      especially if you're taking prescription medications.
                    </p>
                  </div>
                </div>
              </Card>
            ) : "found" in result && result.found ? (
              <>
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200">
                  <div
                    className="px-6 py-4"
                    style={{
                      background:
                        result.interaction.severity === "severe"
                          ? "linear-gradient(135deg, #fca5a5 0%, #ef4444 100%)"
                          : result.interaction.severity === "high"
                          ? "linear-gradient(135deg, #fdba74 0%, #f97316 100%)"
                          : result.interaction.severity === "moderate"
                          ? "linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)"
                          : "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)",
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium opacity-90 mb-1">
                          {result.interaction.supplement_name} +{" "}
                          {result.interaction.medication_name}
                        </div>
                        <SeverityBadge severity={result.interaction.severity} />
                      </div>
                      {result.interaction.severity === "severe" && (
                        <AlertTriangle size={32} className="text-red-900" />
                      )}
                    </div>
                  </div>
                </div>

                <ResultCard title="What It Means" icon={<Info size={20} className="text-blue-600" />}>
                  <p className="leading-relaxed max-w-prose">
                    {result.interaction.description}
                  </p>
                </ResultCard>

                <ResultCard title="What To Do" icon={<Shield size={20} className="text-green-600" />}>
                  <div className="space-y-2">
                    {result.interaction.recommendation.split(/\n|•/).filter(Boolean).map((line, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span className="leading-relaxed">{line.trim()}</span>
                      </div>
                    ))}
                  </div>
                </ResultCard>

                {result.interaction.mechanism && (
                  <Card>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">Mechanism</h3>
                    <p className="text-slate-700 leading-relaxed max-w-prose">
                      {result.interaction.mechanism}
                    </p>
                  </Card>
                )}

                {result.interaction.sources && result.interaction.sources.length > 0 && (
                  <SourcesAccordion sources={result.interaction.sources} freeSources={1} />
                )}

                {result.interaction.last_reviewed && (
                  <div className="text-sm text-slate-500 text-center">
                    Last reviewed: {new Date(result.interaction.last_reviewed).toLocaleDateString()}
                  </div>
                )}

                <UpgradeBand className="mt-8" />

                {result.interaction.alternatives && result.interaction.alternatives.length > 0 && (
                  <Card className="bg-green-50 border-green-200">
                    <h3 className="font-semibold text-lg text-slate-900 mb-3">
                      Safer Alternatives
                    </h3>
                    <div className="space-y-2">
                      {result.interaction.alternatives.map((alt, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-slate-700">
                          <CheckCircle2 size={16} className="text-green-600 mt-1 flex-shrink-0" />
                          <span>{alt}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {result.interaction.monitoring && (
                  <Card className="bg-amber-50 border-amber-200">
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">
                      Monitoring Guidance
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{result.interaction.monitoring}</p>
                  </Card>
                )}
              </>
            ) : null}
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
