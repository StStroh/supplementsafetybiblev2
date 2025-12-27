import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, Lock } from 'lucide-react';
import TypeaheadInput from './TypeaheadInput';

interface Interaction {
  supplement_name: string;
  medication_name: string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  recommendation: string;
}

export default function PricingPageChecker() {
  const navigate = useNavigate();
  const [supplementInput, setSupplementInput] = useState('');
  const [medicationInput, setMedicationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Interaction[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const canCheck = supplementInput.trim() && medicationInput.trim();

  async function handleCheck() {
    if (!canCheck) {
      setError('Please enter both a supplement and a medication');
      return;
    }

    console.log('[PricingPageChecker] Starting check:', { supplementInput, medicationInput });

    setLoading(true);
    setError(null);
    setResults(null);
    setIsEmpty(false);

    try {
      const res = await fetch('/.netlify/functions/interactions-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supplement: supplementInput.trim(),
          medication: medicationInput.trim(),
        }),
      });

      console.log('[PricingPageChecker] Response status:', res.status);

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      console.log('[PricingPageChecker] Response data:', data);

      let interactions: Interaction[] = [];

      if (Array.isArray(data)) {
        interactions = data;
      } else if (data.interactions) {
        interactions = data.interactions;
      } else if (data.results) {
        interactions = data.results;
      } else if (data.ok && data.data) {
        interactions = [{
          supplement_name: supplementInput,
          medication_name: medicationInput,
          severity: data.data.severity || 'Medium',
          description: data.data.description || 'Interaction details available.',
          recommendation: data.data.recommendation || 'Consult your healthcare provider.',
        }];
      } else if (!data.ok && data.error) {
        throw new Error(data.error);
      }

      if (interactions.length === 0) {
        setIsEmpty(true);
      } else {
        setResults(interactions);
      }
    } catch (err: any) {
      console.error('[PricingPageChecker] Error:', err);
      setError(err.message || 'Failed to check interaction');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl p-6 sm:p-8 mb-8" style={{ background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.05) 0%, rgba(255, 255, 255, 1) 100%)', border: '2px solid rgba(147, 112, 219, 0.2)' }}>
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          Complete Your Interaction Check
        </h2>
        <p className="text-sm sm:text-base" style={{ color: 'var(--color-text-muted)' }}>
          Enter your supplement and medication below
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-6">
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <TypeaheadInput
            label="Supplement"
            placeholder="e.g., St. John's Wort"
            type="supplement"
            value={supplementInput}
            onChange={(value) => {
              console.log('[PricingPageChecker] Supplement changed:', value);
              setSupplementInput(value);
            }}
            onChoose={(value) => {
              console.log('[PricingPageChecker] Supplement chosen:', value);
              setSupplementInput(value);
            }}
            className="w-full border-2 rounded-lg p-3 text-base"
            data-testid="pricing-checker-supplement"
          />

          <TypeaheadInput
            label="Medication"
            placeholder="e.g., Warfarin"
            type="medication"
            value={medicationInput}
            onChange={(value) => {
              console.log('[PricingPageChecker] Medication changed:', value);
              setMedicationInput(value);
            }}
            onChoose={(value) => {
              console.log('[PricingPageChecker] Medication chosen:', value);
              setMedicationInput(value);
            }}
            className="w-full border-2 rounded-lg p-3 text-base"
            data-testid="pricing-checker-medication"
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={!canCheck || loading}
          data-testid="pricing-checker-btn"
          className="btn-cta w-full inline-flex items-center justify-center gap-2 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ padding: '16px 32px' }}
        >
          {loading ? 'Checking...' : 'Check Interaction'}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>

        {!canCheck && (
          <p className="text-xs mt-2 text-center" style={{ color: 'var(--color-text-muted)' }}>
            Button enabled: {String(canCheck)} | Supplement: "{supplementInput}" | Medication: "{medicationInput}"
          </p>
        )}
      </div>

      {loading && (
        <div className="mt-6 rounded-xl p-6 text-center" style={{ background: '#E3F2FD', border: '2px solid #64B5F6' }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-3" style={{ borderColor: 'var(--color-trial)' }} />
          <p className="font-medium" style={{ color: '#1976D2' }}>Checking for interactions...</p>
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-xl p-6" style={{ background: '#FFEBEE', border: '2px solid #EF5350' }}>
          <div className="flex items-start gap-3">
            <XCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#D32F2F' }} />
            <div className="flex-1">
              <h3 className="font-bold mb-1" style={{ color: '#D32F2F' }}>Check Failed</h3>
              <p className="text-sm" style={{ color: '#C62828' }}>{error}</p>
              <button onClick={handleCheck} className="btn-outline mt-3">Retry</button>
            </div>
          </div>
        </div>
      )}

      {isEmpty && !loading && !error && (
        <div className="mt-6 rounded-xl p-6" style={{ background: '#E8F5E9', border: '2px solid #66BB6A' }}>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#388E3C' }} />
            <div className="flex-1">
              <h3 className="font-bold mb-1" style={{ color: '#2E7D32' }}>No Interactions Found</h3>
              <p className="text-sm" style={{ color: '#1B5E20' }}>
                No known interactions between <strong>{supplementInput}</strong> and <strong>{medicationInput}</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {results && results.length > 0 && !loading && (
        <div className="mt-6 rounded-xl p-6" style={{ background: 'var(--color-surface)', border: '2px solid rgba(147, 112, 219, 0.3)' }}>
          <h3 className="font-bold text-xl mb-4" style={{ color: 'var(--color-text)' }}>Interaction Results</h3>
          <div className="space-y-4 mb-6">
            {results.map((result, idx) => (
              <div key={idx} className="rounded-lg p-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold flex-1" style={{ color: 'var(--color-text)' }}>
                    {result.supplement_name} + {result.medication_name}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ml-2 ${
                    result.severity === 'High' ? 'bg-red-100 text-red-800' :
                    result.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
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
          <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(147, 112, 219, 0.1)' }}>
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-text)' }}>
              Upgrade to see full clinical details and download PDF reports
            </p>
            <button onClick={() => navigate('/pricing#plans')} className="btn-cta inline-flex items-center gap-2">
              <Lock className="w-4 h-4" />
              View Plans
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
