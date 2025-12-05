/**
 * Landing hero focused on Interaction Checker (above the fold).
 * Minimal chrome, instant value, paid PDF upsell visible.
 *
 * Required testids for build guards:
 * - landing-hero-headline
 * - landing-hero-checker
 * - landing-hero-check-btn
 * - landing-hero-pdf-btn
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, ArrowRight, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { isPaid } from '../lib/roles';

interface Interaction {
  supplement_name: string;
  medication_name: string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  recommendation: string;
}

export default function LandingCheckerHero() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>('free');
  const [supplements, setSupplements] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [supplementId, setSupplementId] = useState('');
  const [medicationId, setMedicationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Interaction[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isUserPaid = isPaid(role);
  const canCheck = supplementId && medicationId;

  const exampleSupplements = ['St. John\'s Wort', 'Ginkgo Biloba', 'Fish Oil', 'Magnesium', 'Vitamin D'];
  const exampleMedications = ['Warfarin', 'Levothyroxine', 'Metformin', 'Sertraline', 'Lisinopril'];

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    // Get user
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);

    // Get role
    if (currentUser) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .maybeSingle();
      setRole(profile?.role || 'free');
    }

    // Load supplements and medications (public access for landing page)
    const [supRes, medRes] = await Promise.all([
      supabase
        .from('supplements')
        .select('id,name')
        .order('name')
        .limit(100),
      supabase
        .from('medications')
        .select('id,name')
        .order('name')
        .limit(100),
    ]);

    if (supRes.data) setSupplements(supRes.data);
    if (medRes.data) setMedications(medRes.data);
  }

  async function handleCheck() {
    if (!canCheck) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // If not logged in, redirect to auth
      if (!user) {
        navigate('/auth?redirect=/check');
        return;
      }

      // If not paid, redirect to pricing
      if (!isUserPaid) {
        navigate('/pricing?from=landing-checker');
        return;
      }

      // Make the check
      const res = await fetch('/.netlify/functions/get-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supplementId,
          medicationId,
          userEmail: user.email,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.error || 'Failed to check interactions');
      }

      const data = await res.json();

      if (data.ok && data.data) {
        // Format the result as an array
        setResults([{
          supplement_name: supplements.find(s => s.id === supplementId)?.name || 'Supplement',
          medication_name: medications.find(m => m.id === medicationId)?.name || 'Medication',
          severity: data.data.severity || 'Medium',
          description: data.data.description || 'Interaction details available.',
          recommendation: data.data.recommendation || 'Consult your healthcare provider.',
        }]);
      } else {
        setError(data?.error || 'No interaction data found');
      }
    } catch (err: any) {
      console.error('Check error:', err);
      setError(err.message || 'Failed to check interaction');
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadPDF() {
    if (!isUserPaid) {
      navigate('/pricing#pdf');
      return;
    }

    try {
      const res = await fetch('/.netlify/functions/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          results: results || [],
          userEmail: user?.email,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Interaction-Report-${new Date().toISOString().slice(0, 10)}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('PDF error:', err);
      alert('Failed to generate PDF. Please try again.');
    }
  }

  function fillExample(supplementName: string, medicationName: string) {
    const sup = supplements.find(s => s.name === supplementName);
    const med = medications.find(m => m.name === medicationName);
    if (sup) setSupplementId(sup.id);
    if (med) setMedicationId(med.id);
  }

  return (
    <section
      className="relative w-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white"
      data-testid="landing-hero"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Tiny header strip */}
        <div className="flex flex-col items-center text-center mb-6">
          <div
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20 mb-3"
            data-testid="pdf-badge"
            aria-label="PDF download included on paid plans"
          >
            <Download className="w-3 h-3" />
            <span>PDF Download Included</span>
            <span className="opacity-70">on paid plans</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            data-testid="landing-hero-headline"
          >
            Don't Mix Blind™
          </h1>

          <p
            className="mt-2 text-base sm:text-lg text-white/90"
            data-testid="landing-hero-sub"
          >
            Check interactions in seconds.
          </p>
        </div>

        {/* Main checker card */}
        <div
          className="rounded-2xl bg-white text-slate-900 shadow-2xl ring-1 ring-slate-200 p-4 sm:p-6"
          data-testid="landing-hero-checker"
        >
          {/* Selection inputs */}
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Select Supplement
              </label>
              <select
                value={supplementId}
                onChange={(e) => setSupplementId(e.target.value)}
                className="w-full border-2 border-slate-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                data-testid="supplement-select"
              >
                <option value="">Choose a supplement...</option>
                {supplements.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Select Medication
              </label>
              <select
                value={medicationId}
                onChange={(e) => setMedicationId(e.target.value)}
                className="w-full border-2 border-slate-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                data-testid="medication-select"
              >
                <option value="">Choose a medication...</option>
                {medications.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Example chips */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-600 font-medium">Try:</span>
            <button
              onClick={() => fillExample('St. John\'s Wort', 'Warfarin')}
              className="rounded-full border-2 border-slate-300 bg-slate-50 px-3 py-1.5 hover:bg-slate-100 hover:border-slate-400 transition font-medium"
            >
              St. John's Wort + Warfarin
            </button>
            <button
              onClick={() => fillExample('Ginkgo Biloba', 'Warfarin')}
              className="rounded-full border-2 border-slate-300 bg-slate-50 px-3 py-1.5 hover:bg-slate-100 hover:border-slate-400 transition font-medium"
            >
              Ginkgo + Warfarin
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={handleCheck}
              disabled={!canCheck || loading}
              data-testid="landing-hero-check-btn"
              className="flex-1 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition shadow-lg"
            >
              {loading ? 'Checking...' : 'Check Interactions'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>

            {isUserPaid ? (
              <button
                onClick={handleDownloadPDF}
                disabled={!results || results.length === 0}
                data-testid="landing-hero-pdf-btn"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold border-2 border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            ) : (
              <Link
                to="/pricing#pdf"
                data-testid="landing-hero-pdf-upsell"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold border-2 border-slate-300 hover:bg-slate-50 transition"
              >
                <Lock className="w-4 h-4" />
                PDF (paid plans)
              </Link>
            )}
          </div>

          {/* Error display */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {/* Results */}
          {results && results.length > 0 && (
            <div className="mt-4 border-2 border-slate-200 rounded-xl p-4 bg-slate-50" data-testid="results">
              <h3 className="font-bold text-lg text-slate-900 mb-3">Interaction Results</h3>
              <div className="space-y-3">
                {results.map((result, idx) => (
                  <div key={idx} className="bg-white rounded-lg border-2 border-slate-200 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">
                          {result.supplement_name} + {result.medication_name}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          result.severity === 'High'
                            ? 'bg-red-100 text-red-800'
                            : result.severity === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {result.severity} Risk
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{result.description}</p>
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-2">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Recommendation:</p>
                      <p className="text-sm text-blue-800">{result.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Helper text */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-600 text-center">
              <strong>Color-coded risks:</strong> Low / Medium / High. Timing tips included.
              <span className="block mt-1">Not medical advice. Consult your healthcare provider.</span>
            </p>
          </div>
        </div>

        {/* Trust line */}
        <p className="mt-6 text-center text-xs text-white/70">
          Trusted by clinicians to identify supplement–drug interactions clearly. Educational use only.
        </p>
      </div>
    </section>
  );
}
