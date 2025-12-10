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
import { Download, ArrowRight, Lock, Shield, FlaskConical, FileText, Pill } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { isPaid } from '../lib/roles';
import TypeaheadInput from './TypeaheadInput';

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
  const [supplementName, setSupplementName] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Interaction[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isUserPaid = isPaid(role);
  const canCheck = supplementName && medicationName;

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);

    if (currentUser) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .maybeSingle();
      setRole(profile?.role || 'free');
    }
  }

  async function handleCheck() {
    if (!canCheck) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      if (!user) {
        navigate('/auth?redirect=/check');
        return;
      }

      if (!isUserPaid) {
        navigate('/pricing?from=landing-checker');
        return;
      }

      const supRes = await supabase
        .from('supplements')
        .select('id')
        .ilike('name', supplementName)
        .maybeSingle();

      const medRes = await supabase
        .from('medications')
        .select('id')
        .ilike('name', medicationName)
        .maybeSingle();

      if (!supRes.data || !medRes.data) {
        setError('Supplement or medication not found in database');
        setLoading(false);
        return;
      }

      const res = await fetch('/.netlify/functions/get-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supplementId: supRes.data.id,
          medicationId: medRes.data.id,
          userEmail: user.email,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.error || 'Failed to check interactions');
      }

      const data = await res.json();

      if (data.ok && data.data) {
        setResults([{
          supplement_name: supplementName,
          medication_name: medicationName,
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

  function fillExample(supplement: string, medication: string) {
    setSupplementName(supplement);
    setMedicationName(medication);
  }

  return (
    <section
      className="relative w-full bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-50"
      data-testid="landing-hero"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(88,44,131,0.05),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(29,181,201,0.03),transparent_50%)]"></div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        {/* New Hero Section */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          {/* Logo */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 sm:mb-6 max-w-4xl leading-tight"
            data-testid="landing-hero-headline"
          >
            Don't Mix Blind™ — Know Every Supplement Interaction Before You Take It.
          </h1>

          {/* Subheadline */}
          <p
            className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mb-8 sm:mb-10 leading-relaxed"
            data-testid="landing-hero-sub"
          >
            A clinical-grade interaction engine analyzing 2,500+ supplements and medications. Instant results. Evidence-based guidance. Safer decisions.
          </p>

          {/* Trust Markers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mb-8 sm:mb-10">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" strokeWidth={2} />
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-900">Evidence-Based</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Reports</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" strokeWidth={2} />
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-900">Clinician-Inspired</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Guidance</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" strokeWidth={2} />
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-900">PDF Summaries</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">(Paid Plans)</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" strokeWidth={2} />
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-900">2,500+ Ingredient</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Interactions</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <button
              onClick={() => {
                const checkerSection = document.querySelector('[data-testid="landing-hero-checker"]');
                checkerSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 min-w-[200px]"
            >
              Check Interactions
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>

            <button
              onClick={() => {
                const howItWorksSection = document.querySelector('[data-testid="how-title"]')?.closest('section');
                howItWorksSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-blue-700 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200 min-w-[200px]"
            >
              How It Works
            </button>
          </div>
        </div>

        {/* Main checker card */}
        <div
          className="rounded-2xl bg-white text-slate-900 shadow-2xl ring-1 ring-slate-200 p-4 sm:p-6"
          data-testid="landing-hero-checker"
        >
          {/* Selection inputs */}
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <TypeaheadInput
              label="Select Supplement"
              placeholder="Type a supplement..."
              type="supplement"
              onChoose={(name) => setSupplementName(name)}
              className="w-full border-2 border-slate-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              data-testid="supplement-select"
            />

            <TypeaheadInput
              label="Select Medication"
              placeholder="Type a medication..."
              type="medication"
              onChoose={(name) => setMedicationName(name)}
              className="w-full border-2 border-slate-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              data-testid="medication-select"
            />
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
