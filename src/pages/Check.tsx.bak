import { useEffect, useState } from "react";
import { API_BASE } from "../lib/apiBase";
import NavClinical from "../components/NavClinical";
import FooterClinical from "../components/FooterClinical";

type Item = { id: number; name: string };
type SearchResp = { supplements?: Item[]; medications?: Item[] };
type CheckResp =
  | { found: false; supplement?: string; medication?: string }
  | { found: true; interaction: {
      supplement_name: string;
      medication_name: string;
      severity: "low"|"moderate"|"high"|"severe";
      description: string;
      recommendation: string;
    }};

export default function Check() {
  const [supQ, setSupQ] = useState("");
  const [medQ, setMedQ] = useState("");
  const [sugsSup, setSugsSup] = useState<Item[]>([]);
  const [sugsMed, setSugsMed] = useState<Item[]>([]);
  const [selSup, setSelSup] = useState<string>("");
  const [selMed, setSelMed] = useState<string>("");
  const [result, setResult] = useState<CheckResp | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const h = setTimeout(async () => {
      if (!supQ.trim()) return setSugsSup([]);
      const r = await fetch(`${API_BASE}/interactions-search?q=${encodeURIComponent(supQ)}&type=supplement`);
      const j: SearchResp = await r.json();
      setSugsSup(j.supplements || []);
    }, 220);
    return () => clearTimeout(h);
  }, [supQ]);

  useEffect(() => {
    const h = setTimeout(async () => {
      if (!medQ.trim()) return setSugsMed([]);
      const r = await fetch(`${API_BASE}/interactions-search?q=${encodeURIComponent(medQ)}&type=medication`);
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
      body: JSON.stringify({ supplement: selSup || supQ, medication: selMed || medQ }),
    });
    const j: CheckResp = await r.json();
    setResult(j);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavClinical />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Interaction Checker</h1>
        <p className="text-slate-600 mt-2">Pick a supplement and a medication, then check for guidance.</p>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600">Supplement</label>
            <input
              className="mt-1 w-full border rounded-xl px-3 py-2"
              value={selSup || supQ}
              onChange={(e) => { setSelSup(""); setSupQ(e.target.value); }}
              placeholder="e.g., St. John's Wort"
            />
            {sugsSup.length > 0 && (
              <div className="mt-1 border rounded-lg p-2 text-sm bg-white">
                {sugsSup.map((s) => (
                  <div
                    key={s.id}
                    className="px-2 py-1 hover:bg-slate-50 cursor-pointer rounded"
                    onClick={() => { setSelSup(s.name); setSupQ(""); setSugsSup([]); }}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm text-slate-600">Medication</label>
            <input
              className="mt-1 w-full border rounded-xl px-3 py-2"
              value={selMed || medQ}
              onChange={(e) => { setSelMed(""); setMedQ(""); setMedQ(e.target.value); }}
              placeholder="e.g., Warfarin"
            />
            {sugsMed.length > 0 && (
              <div className="mt-1 border rounded-lg p-2 text-sm bg-white">
                {sugsMed.map((m) => (
                  <div
                    key={m.id}
                    className="px-2 py-1 hover:bg-slate-50 cursor-pointer rounded"
                    onClick={() => { setSelMed(m.name); setMedQ(""); setSugsMed([]); }}
                  >
                    {m.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={check}
          className="mt-5 px-5 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check"}
        </button>

        {result && (
          <div className="mt-6 rounded-2xl border p-4 bg-white">
            {"found" in result && !result.found ? (
              <p className="text-slate-600">No documented interaction found for that pair.</p>
            ) : "found" in result && result.found ? (
              <>
                <div className="text-sm text-slate-500">
                  {result.interaction.supplement_name} + {result.interaction.medication_name}
                </div>
                <div className="mt-1">
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                    {result.interaction.severity.toUpperCase()}
                  </span>
                </div>
                <p className="mt-3 text-slate-700">{result.interaction.description}</p>
                <p className="mt-2 text-slate-800 font-medium">Recommendation</p>
                <p className="text-slate-700">{result.interaction.recommendation}</p>
              </>
            ) : null}
          </div>
        )}
      </main>
      <FooterClinical />
    </div>
  );
}
