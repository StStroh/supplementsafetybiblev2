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
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, ArrowRight, Lock, Shield, FlaskConical, FileText, Pill } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { isPaid } from '../lib/roles';
import TypeaheadInput from './TypeaheadInput';
import DatabaseCoverageModal from './DatabaseCoverageModal';
import '../styles/logo.css';
import Logo from './Logo';

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
  const [showCoverageModal, setShowCoverageModal] = useState(false);
  const checkerRef = useRef<HTMLDivElement>(null);

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

  function handleOpenCoverageModal() {
    setShowCoverageModal(true);
  }

  function handleCloseCoverageModal() {
    setShowCoverageModal(false);
  }

  function handleStartCheckFromModal() {
    // Scroll to checker and focus first input
    if (checkerRef.current) {
      checkerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = checkerRef.current.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 300);
      }
    }
  }

  return (
    <section
      className="relative w-full"
      style={{ background: 'var(--color-bg)' }}
      data-testid="landing-hero"
    >
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
        {/* Hero Header */}
        <div className="flex flex-col items-center text-center mb-10">
          {/* Logo */}
          <div className="mb-6">
            <Logo variant="dark" className="logo--hero" />
          </div>

          {/* H1: Don't Mix Blind™ */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 max-w-4xl leading-tight"
            style={{ color: 'var(--color-text)' }}
            data-testid="landing-hero-headline"
          >
            Check Drug–Supplement Interactions Before You Take Them
          </h1>

          {/* Database Coverage Line */}
          <p
            className="text-base sm:text-lg md:text-xl max-w-3xl mb-2 font-medium leading-snug"
            style={{ color: 'var(--color-text)' }}
          >
            Over 3,000 supplements and medications analyzed across 30,000+ documented interaction pairs. Continuously updated.
          </p>

          {/* Optional Coverage Link */}
          {/* Temporarily hidden due to incomplete coverage metrics */}
          {/* <div className="mb-6">
            <button
              type="button"
              className="text-sm font-medium underline transition hover:no-underline"
              style={{ color: 'var(--color-trial)' }}
              onClick={handleOpenCoverageModal}
            >
              See database coverage
            </button>
          </div> */}

          {/* Subhead */}
          <p
            className="text-base sm:text-lg md:text-xl max-w-3xl mb-8 leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
            data-testid="landing-hero-sub"
          >
            evidence-based severity ratings help you identify risks, understand mechanisms, and make safer decisions about your health regimen.
          </p>

          {/* Primary action: Large search/selector input */}
          <div className="w-full max-w-2xl mb-6" ref={checkerRef}>
            <div className="card p-6">
              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <TypeaheadInput
                  label="Supplement"
                  placeholder="e.g., Vitamin D, Magnesium..."
                  type="supplement"
                  onChoose={(name) => setSupplementName(name)}
                  className="w-full border-2 rounded-lg p-3 text-base focus:ring-2 focus:border-transparent transition"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  data-testid="supplement-select"
                />

                <TypeaheadInput
                  label="Medication"
                  placeholder="e.g., Warfarin, Metformin..."
                  type="medication"
                  onChoose={(name) => setMedicationName(name)}
                  className="w-full border-2 rounded-lg p-3 text-base focus:ring-2 focus:border-transparent transition"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  data-testid="medication-select"
                />
              </div>

              {/* Quick-select chips */}
              <div className="mb-4">
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Quick Select:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSupplementName('Vitamin D')}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border-2 transition hover:scale-105"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                      background: supplementName === 'Vitamin D' ? 'var(--color-trial)' : 'white'
                    }}
                  >
                    Vitamin D
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementName('Magnesium')}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border-2 transition hover:scale-105"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                      background: supplementName === 'Magnesium' ? 'var(--color-trial)' : 'white'
                    }}
                  >
                    Magnesium
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementName('Omega-3')}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border-2 transition hover:scale-105"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                      background: supplementName === 'Omega-3' ? 'var(--color-trial)' : 'white'
                    }}
                  >
                    Omega-3
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementName('Ginkgo Biloba')}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border-2 transition hover:scale-105"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                      background: supplementName === 'Ginkgo Biloba' ? 'var(--color-trial)' : 'white'
                    }}
                  >
                    Ginkgo Biloba
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementName('St. John\'s Wort')}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border-2 transition hover:scale-105"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                      background: supplementName === 'St. John\'s Wort' ? 'var(--color-trial)' : 'white'
                    }}
                  >
                    St. John's Wort
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementName('Turmeric')}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border-2 transition hover:scale-105"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                      background: supplementName === 'Turmeric' ? 'var(--color-trial)' : 'white'
                    }}
                  >
                    Turmeric
                  </button>
                </div>
              </div>

              <button
                onClick={handleCheck}
                disabled={!canCheck || loading}
                data-testid="landing-hero-check-btn"
                className="btn-cta w-full inline-flex items-center justify-center gap-2 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ padding: '16px 32px' }}
              >
                {loading ? 'Checking...' : 'Check Interactions Now'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Advanced Checker Link */}
          <div className="mb-4">
            <Link
              to="/check"
              className="inline-flex items-center justify-center gap-2 text-base font-semibold transition-all hover:gap-3"
              style={{ color: 'var(--brand-purple)' }}
            >
              <Pill className="w-5 h-5" />
              Check Multiple Supplements & Medications
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Secondary action: See pricing */}
          <div className="mb-6">
            <Link
              to="/pricing"
              className="btn-outline inline-flex items-center justify-center gap-2 text-base font-semibold min-w-[180px]"
              style={{ padding: '12px 24px' }}
            >
              See Pricing
            </Link>
          </div>

          {/* Trust strip */}
          <div className="guarantee-note text-center max-w-xl">
            60-day money-back guarantee · Change or cancel anytime
          </div>
        </div>

        {/* Feature Trio (directly under hero) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
          data-testid="landing-hero-checker"
        >
          {/* Card 1: Drug-Supplement Interaction Checker */}
          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: 'var(--color-trial)', opacity: 0.1 }}>
              <Shield className="w-6 h-6 absolute" style={{ color: 'var(--color-trial)' }} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
              Drug–Supplement Interaction Checker
            </h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
              Full results on Pro & Clinical
            </p>
          </div>

          {/* Card 2: PDF Reports */}
          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: 'var(--color-trial)', opacity: 0.1 }}>
              <FileText className="w-6 h-6 absolute" style={{ color: 'var(--color-trial)' }} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
              PDF Reports
            </h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
              Patient/client-ready exports
            </p>
          </div>

          {/* Card 3: Weekly Evidence Updates */}
          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: 'var(--color-trial)', opacity: 0.1 }}>
              <FlaskConical className="w-6 h-6 absolute" style={{ color: 'var(--color-trial)' }} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
              Weekly Evidence Updates
            </h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
              New interactions and revisions
            </p>
          </div>
        </div>

        {/* Results section (if active) */}
        {error && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="rounded-lg p-4" style={{ background: '#FFEBEE', border: '1px solid #E57373' }}>
              <p className="font-medium" style={{ color: 'var(--color-error)' }}>{error}</p>
            </div>
          </div>
        )}

        {results && results.length > 0 && (
          <div className="mt-8 max-w-4xl mx-auto" data-testid="results">
            <div className="card p-6">
              <h3 className="font-bold text-xl mb-4" style={{ color: 'var(--color-text)' }}>Interaction Results</h3>
              <div className="space-y-4">
                {results.map((result, idx) => (
                  <div key={idx} className="rounded-lg p-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold" style={{ color: 'var(--color-text)' }}>
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
                    <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>{result.description}</p>
                    <div className="rounded p-3 mt-2" style={{ background: '#F0F9FA', border: '1px solid var(--color-trial)' }}>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-trial)' }}>Recommendation:</p>
                      <p className="text-sm" style={{ color: 'var(--color-text)' }}>{result.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>

              {isUserPaid ? (
                <button
                  onClick={handleDownloadPDF}
                  disabled={!results || results.length === 0}
                  data-testid="landing-hero-pdf-btn"
                  className="btn-outline mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              ) : (
                <Link
                  to="/pricing#pdf"
                  data-testid="landing-hero-pdf-upsell"
                  className="btn-outline mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  PDF (paid plans)
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Database Coverage Modal */}
      <DatabaseCoverageModal
        isOpen={showCoverageModal}
        onClose={handleCloseCoverageModal}
        onStartCheck={handleStartCheckFromModal}
      />
    </section>
  );
}
