import { useState } from 'react';
import { Loader2, AlertTriangle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import SubstanceCombobox from './SubstanceCombobox';
import NotFoundCard from './NotFoundCard';
import ConfidenceBadge from './ConfidenceBadge';
import GlobalTrustStatement from './GlobalTrustStatement';
import ConfidenceMetadata from './ConfidenceMetadata';
import InlineUpgradeCard from './InlineUpgradeCard';
import { useTranslation } from '../lib/i18n';

interface Substance {
  substance_id: string;
  display_name: string;
  canonical_name: string;
  type: 'supplement' | 'drug';
  aliases: string[];
}

interface Interaction {
  interaction_id: string;
  substance_a: { id: string; name: string; type: string };
  substance_b: { id: string; name: string; type: string };
  interaction_type: string;
  severity: 'avoid' | 'caution' | 'monitor' | 'info';
  summary_short: string;
  mechanism?: string;
  clinical_effect?: string;
  management?: string;
  evidence_grade?: string;
  confidence?: string;
  citations?: any;
}

interface CheckSummary {
  total: number;
  avoid: number;
  caution: number;
  monitor: number;
  info: number;
}

interface NotFoundItem {
  id: string;
  rawName: string;
  kind: 'supplement' | 'drug';
  suggestions: Substance[];
}

type CheckerMode = 'supplements-drugs' | 'supplements-supplements';

const SEVERITY_CONFIG = {
  avoid: { label: 'Avoid', bgColor: '#FFEBEE', borderColor: '#EF5350', textColor: '#C62828', icon: AlertTriangle },
  caution: { label: 'Caution', bgColor: '#FFF3E0', borderColor: '#FFA726', textColor: '#E65100', icon: AlertCircle },
  monitor: { label: 'Monitor', bgColor: '#E3F2FD', borderColor: '#64B5F6', textColor: '#1565C0', icon: Info },
  info: { label: 'Info', bgColor: '#F3E5F5', borderColor: '#BA68C8', textColor: '#6A1B9A', icon: Info },
  none: { label: 'No Interaction', bgColor: '#E8F5E9', borderColor: '#66BB6A', textColor: '#2E7D32', icon: CheckCircle2 },
};

export default function StackBuilderCheckerV3() {
  const t = useTranslation();
  const [mode, setMode] = useState<CheckerMode>('supplements-drugs');

  // Selected substances
  const [supplements, setSupplements] = useState<Substance[]>([]);
  const [medications, setMedications] = useState<Substance[]>([]);

  // Current combobox values
  const [currentSupplement, setCurrentSupplement] = useState<Substance | null>(null);
  const [currentMedication, setCurrentMedication] = useState<Substance | null>(null);

  // Not found items
  const [notFoundItems, setNotFoundItems] = useState<NotFoundItem[]>([]);

  // Results
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Interaction[] | null>(null);
  const [summary, setSummary] = useState<CheckSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [systemError, setSystemError] = useState<string | null>(null);

  // Handle supplement selection
  const handleSupplementChange = (substance: Substance | null) => {
    setCurrentSupplement(substance);
    if (substance && !supplements.find((s) => s.substance_id === substance.substance_id)) {
      setSupplements([...supplements, substance]);
      setCurrentSupplement(null); // Clear for next entry
    }
  };

  // Handle medication selection
  const handleMedicationChange = (substance: Substance | null) => {
    setCurrentMedication(substance);
    if (substance && !medications.find((m) => m.substance_id === substance.substance_id)) {
      setMedications([...medications, substance]);
      setCurrentMedication(null); // Clear for next entry
    }
  };

  // Handle not found
  const handleNotFound = (rawInput: string, kind: 'supplement' | 'drug', suggestions: Substance[]) => {
    const newNotFound: NotFoundItem = {
      id: `${kind}-${Date.now()}-${Math.random()}`,
      rawName: rawInput,
      kind,
      suggestions,
    };
    setNotFoundItems([...notFoundItems, newNotFound]);
  };

  // Remove not found item
  const removeNotFound = (id: string) => {
    setNotFoundItems(notFoundItems.filter((item) => item.id !== id));
  };

  // Handle suggestion selection from NotFoundCard
  const handleSelectSuggestion = (id: string, substance: Substance) => {
    removeNotFound(id);
    if (substance.type === 'supplement' || substance.type === 'drug') {
      if (substance.type === 'supplement') {
        if (!supplements.find((s) => s.substance_id === substance.substance_id)) {
          setSupplements([...supplements, substance]);
        }
      } else {
        if (!medications.find((m) => m.substance_id === substance.substance_id)) {
          setMedications([...medications, substance]);
        }
      }
    }
  };

  // Normalize token (matches server-side norm_token function)
  const normalizeToken = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, ' ');
  };

  // Log lookup event asynchronously (fire-and-forget)
  const logLookup = (inputs: string[], response: any) => {
    try {
      const normalized_inputs = inputs.map(normalizeToken);
      const resolved_substance_ids = [
        ...supplements.map(s => s.substance_id),
        ...medications.map(s => s.substance_id)
      ];
      const unresolved_inputs = notFoundItems.map(item => item.rawName);

      const results_summary = response.summary || { total: 0, avoid: 0, caution: 0, monitor: 0, info: 0 };
      const has_results = (response.results || []).length > 0;

      const client_meta = {
        path: window.location.pathname,
        ref: document.referrer || undefined,
        ua: navigator.userAgent,
        plan: 'free' // TODO: Get from auth context
      };

      // Fire-and-forget (don't await, ignore errors)
      fetch('/.netlify/functions/checker-log-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs,
          normalized_inputs,
          resolved_substance_ids,
          unresolved_inputs,
          results_summary,
          has_results,
          client_meta
        })
      }).catch(() => {
        // Silently ignore logging errors
      });
    } catch {
      // Silently ignore any logging errors
    }
  };

  // Run check
  const runCheck = async () => {
    // Validation
    if (mode === 'supplements-drugs') {
      if (supplements.length === 0 || medications.length === 0) {
        setError(t('checker.minRequired'));
        return;
      }
    } else {
      if (supplements.length < 2) {
        setError('Add at least 2 supplements to compare');
        return;
      }
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setSummary(null);
    setSystemError(null);

    try {
      const allNames = [
        ...supplements.map((s) => s.display_name),
        ...medications.map((m) => m.display_name),
      ];

      const res = await fetch('/.netlify/functions/checker-get-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: allNames }),
      });

      // Check for HTML response (function not working)
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error('Checker function is not responding correctly. Please refresh and try again.');
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${res.status}`);
      }

      const response = await res.json();

      // Validate response structure
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response from checker. Please try again.');
      }

      setResults(response.results || []);
      setSummary(response.summary || null);

      // Log this lookup asynchronously (fire-and-forget)
      logLookup(allNames, response);
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to check interactions';
      setError(errorMsg);

      // Show system error banner if it's a configuration issue
      if (errorMsg.includes('not responding') || errorMsg.includes('configuration')) {
        setSystemError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Can run check?
  const canCheck =
    mode === 'supplements-drugs'
      ? supplements.length > 0 && medications.length > 0
      : supplements.length >= 2;

  // Group results by severity
  const groupedResults: Record<string, Interaction[]> = {
    avoid: [],
    caution: [],
    monitor: [],
    info: [],
  };

  (results || []).forEach((result) => {
    groupedResults[result.severity].push(result);
  });

  const toggleExpanded = (resultKey: string) => {
    const newSet = new Set(expandedResults);
    if (newSet.has(resultKey)) {
      newSet.delete(resultKey);
    } else {
      newSet.add(resultKey);
    }
    setExpandedResults(newSet);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* System Error Banner */}
      {systemError && (
        <div className="mb-6 rounded-xl p-6" style={{ background: '#FFF3E0', border: '2px solid #FFA726' }}>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#E65100' }} />
            <div>
              <h3 className="font-bold mb-1" style={{ color: '#E65100' }}>
                System Error
              </h3>
              <p className="text-sm mb-3" style={{ color: '#BF360C' }}>
                {systemError}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg font-semibold text-sm"
                style={{ background: '#FFA726', color: 'white' }}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          Advanced Interaction Checker
        </h1>
        <p className="text-lg mb-2" style={{ color: 'var(--color-text-muted)' }}>
          Build your complete stack and check for all possible interactions
        </p>
      </div>

      {/* Mode Selector */}
      <div className="mb-6 flex gap-3 justify-center">
        <button
          onClick={() => setMode('supplements-drugs')}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
            mode === 'supplements-drugs'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Supplements + Medicines
        </button>
        <button
          onClick={() => setMode('supplements-supplements')}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
            mode === 'supplements-supplements'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Supplements + Supplements
        </button>
      </div>

      {/* Input Section */}
      {mode === 'supplements-drugs' ? (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div
            className="rounded-xl p-6"
            style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}
          >
            <SubstanceCombobox
              kind="supplement"
              label={t('checker.supplement.label')}
              placeholder={t('checker.supplement.placeholder')}
              value={currentSupplement}
              onChange={handleSupplementChange}
              onNotFound={(raw, kind, sugg) => handleNotFound(raw, 'supplement', sugg)}
            />

            {/* Selected supplements pills */}
            {supplements.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {supplements.map((supp) => (
                  <div
                    key={supp.substance_id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{ background: '#7c3aed', color: 'white' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {supp.display_name}
                    <button
                      onClick={() => setSupplements(supplements.filter((s) => s.substance_id !== supp.substance_id))}
                      className="hover:bg-white/20 rounded-full p-0.5"
                      aria-label={`Remove ${supp.display_name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="rounded-xl p-6"
            style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}
          >
            <SubstanceCombobox
              kind="drug"
              label={t('checker.medication.label')}
              placeholder={t('checker.medication.placeholder')}
              value={currentMedication}
              onChange={handleMedicationChange}
              onNotFound={(raw, kind, sugg) => handleNotFound(raw, 'drug', sugg)}
            />

            {/* Selected medications pills */}
            {medications.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {medications.map((med) => (
                  <div
                    key={med.substance_id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{ background: '#0891b2', color: 'white' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {med.display_name}
                    <button
                      onClick={() => setMedications(medications.filter((m) => m.substance_id !== med.substance_id))}
                      className="hover:bg-white/20 rounded-full p-0.5"
                      aria-label={`Remove ${med.display_name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div
            className="rounded-xl p-6 max-w-2xl mx-auto"
            style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}
          >
            <SubstanceCombobox
              kind="supplement"
              label={t('checker.supplement.label')}
              placeholder={t('checker.supplement.placeholder')}
              value={currentSupplement}
              onChange={handleSupplementChange}
              onNotFound={(raw, kind, sugg) => handleNotFound(raw, 'supplement', sugg)}
            />

            {/* Selected supplements pills */}
            {supplements.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {supplements.map((supp) => (
                  <div
                    key={supp.substance_id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{ background: '#7c3aed', color: 'white' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {supp.display_name}
                    <button
                      onClick={() => setSupplements(supplements.filter((s) => s.substance_id !== supp.substance_id))}
                      className="hover:bg-white/20 rounded-full p-0.5"
                      aria-label={`Remove ${supp.display_name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Not Found Cards */}
      {notFoundItems.map((item) => (
        <NotFoundCard
          key={item.id}
          rawName={item.rawName}
          kind={item.kind}
          suggestions={item.suggestions}
          onRemove={() => removeNotFound(item.id)}
          onSelectSuggestion={(substance) => handleSelectSuggestion(item.id, substance)}
        />
      ))}

      {/* Run Check Button - ALWAYS VISIBLE */}
      <div className="text-center mb-8">
        <button
          onClick={runCheck}
          disabled={!canCheck || loading}
          className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-lg disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
          style={{ minWidth: '200px' }}
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? t('checker.checking') : t('checker.runCheck')}
        </button>
        {!canCheck && (
          <p className="text-sm mt-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>
            {mode === 'supplements-drugs'
              ? 'Select at least 1 supplement AND 1 medication'
              : 'Select at least 2 supplements to compare'}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="rounded-xl p-8 text-center" style={{ background: '#E3F2FD', border: '2px solid #64B5F6' }}>
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3" style={{ color: '#1976D2' }} />
          <p className="font-semibold text-lg" style={{ color: '#1565C0' }}>
            {t('checker.checking')}
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="rounded-xl p-6" style={{ background: '#FFEBEE', border: '2px solid #EF5350' }}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#C62828' }} />
            <div>
              <h3 className="font-bold mb-1" style={{ color: '#C62828' }}>
                {t('common.error')}
              </h3>
              <p className="text-sm" style={{ color: '#B71C1C' }}>
                {error}
              </p>
              <button onClick={runCheck} className="btn-outline mt-3">
                {t('common.retry')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {results && summary && !loading && (
        <div>
          <GlobalTrustStatement />

          {/* Summary */}
          <div
            className="rounded-xl p-6 mb-6"
            style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}
          >
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              Check Complete
            </h2>
            <p className="text-base mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Found {summary.total} interaction{summary.total !== 1 ? 's' : ''} in{' '}
              {mode === 'supplements-drugs' ? 'Supplements + Medicines mode' : 'Supplements + Supplements mode'}.
            </p>
            <div className="flex flex-wrap gap-3">
              {summary.avoid > 0 && (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ background: SEVERITY_CONFIG.avoid.bgColor, border: `1px solid ${SEVERITY_CONFIG.avoid.borderColor}` }}
                >
                  <AlertTriangle className="w-4 h-4" style={{ color: SEVERITY_CONFIG.avoid.textColor }} />
                  <span className="font-semibold text-sm" style={{ color: SEVERITY_CONFIG.avoid.textColor }}>
                    {summary.avoid} {SEVERITY_CONFIG.avoid.label}
                  </span>
                </div>
              )}
              {summary.caution > 0 && (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ background: SEVERITY_CONFIG.caution.bgColor, border: `1px solid ${SEVERITY_CONFIG.caution.borderColor}` }}
                >
                  <AlertCircle className="w-4 h-4" style={{ color: SEVERITY_CONFIG.caution.textColor }} />
                  <span className="font-semibold text-sm" style={{ color: SEVERITY_CONFIG.caution.textColor }}>
                    {summary.caution} {SEVERITY_CONFIG.caution.label}
                  </span>
                </div>
              )}
              {summary.monitor > 0 && (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ background: SEVERITY_CONFIG.monitor.bgColor, border: `1px solid ${SEVERITY_CONFIG.monitor.borderColor}` }}
                >
                  <Info className="w-4 h-4" style={{ color: SEVERITY_CONFIG.monitor.textColor }} />
                  <span className="font-semibold text-sm" style={{ color: SEVERITY_CONFIG.monitor.textColor }}>
                    {summary.monitor} {SEVERITY_CONFIG.monitor.label}
                  </span>
                </div>
              )}
              {summary.info > 0 && (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ background: SEVERITY_CONFIG.info.bgColor, border: `1px solid ${SEVERITY_CONFIG.info.borderColor}` }}
                >
                  <Info className="w-4 h-4" style={{ color: SEVERITY_CONFIG.info.textColor }} />
                  <span className="font-semibold text-sm" style={{ color: SEVERITY_CONFIG.info.textColor }}>
                    {summary.info} {SEVERITY_CONFIG.info.label}
                  </span>
                </div>
              )}
              {summary.total === 0 && (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ background: SEVERITY_CONFIG.none.bgColor, border: `1px solid ${SEVERITY_CONFIG.none.borderColor}` }}
                >
                  <CheckCircle2 className="w-4 h-4" style={{ color: SEVERITY_CONFIG.none.textColor }} />
                  <span className="font-semibold text-sm" style={{ color: SEVERITY_CONFIG.none.textColor }}>
                    No Known Interactions
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* No Interactions - Detailed */}
          {summary.total === 0 && (
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: SEVERITY_CONFIG.none.bgColor, border: '2px solid ' + SEVERITY_CONFIG.none.borderColor }}
            >
              <ConfidenceBadge level="none" showExplanation={true} />
              <div className="mt-4 p-4 rounded-lg" style={{ background: 'white', border: '1px solid ' + SEVERITY_CONFIG.none.borderColor }}>
                <h4 className="font-semibold mb-2" style={{ color: SEVERITY_CONFIG.none.textColor }}>
                  What this means:
                </h4>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text)' }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: SEVERITY_CONFIG.none.textColor }}>•</span>
                    <span>All substances in your stack have been checked against our database</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: SEVERITY_CONFIG.none.textColor }}>•</span>
                    <span>No documented interactions were found in medical literature</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: SEVERITY_CONFIG.none.textColor }}>•</span>
                    <span>This does not guarantee complete safety — always consult your healthcare provider</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Interaction Results by Severity */}
          {(['avoid', 'caution', 'monitor', 'info'] as const).map((severity) => {
            const items = groupedResults[severity];
            if (items.length === 0) return null;

            const config = SEVERITY_CONFIG[severity];
            const Icon = config.icon;

            return (
              <div key={severity} className="mb-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: config.textColor }}>
                  <Icon className="w-6 h-6" />
                  {config.label} ({items.length})
                </h3>
                <div className="space-y-3">
                  {items.map((interaction) => {
                    const resultKey = interaction.interaction_id;
                    const isExpanded = expandedResults.has(resultKey);

                    return (
                      <div
                        key={resultKey}
                        className="rounded-lg p-5"
                        style={{ background: config.bgColor, border: `2px solid ${config.borderColor}` }}
                      >
                        <ConfidenceBadge level={severity} showExplanation={false} />

                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1" style={{ color: config.textColor }}>
                              {interaction.substance_a.name} + {interaction.substance_b.name}
                            </h4>
                            <p className="text-base" style={{ color: config.textColor }}>
                              {interaction.summary_short}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleExpanded(resultKey)}
                            className="flex-shrink-0 p-2 rounded-lg hover:bg-black/5 transition-colors"
                            aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          >
                            {isExpanded ? '▲' : '▼'}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t space-y-3" style={{ borderColor: config.borderColor }}>
                            {interaction.mechanism && (
                              <div>
                                <h5 className="font-semibold mb-1" style={{ color: config.textColor }}>
                                  Mechanism:
                                </h5>
                                <p className="text-sm" style={{ color: config.textColor }}>
                                  {interaction.mechanism}
                                </p>
                              </div>
                            )}
                            {interaction.clinical_effect && (
                              <div>
                                <h5 className="font-semibold mb-1" style={{ color: config.textColor }}>
                                  Clinical Effect:
                                </h5>
                                <p className="text-sm" style={{ color: config.textColor }}>
                                  {interaction.clinical_effect}
                                </p>
                              </div>
                            )}
                            {interaction.management && (
                              <div>
                                <h5 className="font-semibold mb-1" style={{ color: config.textColor }}>
                                  Management:
                                </h5>
                                <p className="text-sm" style={{ color: config.textColor }}>
                                  {interaction.management}
                                </p>
                              </div>
                            )}
                            {interaction.citations && Array.isArray(interaction.citations) && interaction.citations.length > 0 && (
                              <div>
                                <h5 className="font-semibold mb-2" style={{ color: config.textColor }}>
                                  Citations:
                                </h5>
                                <div className="space-y-1">
                                  {interaction.citations.map((citation: any, idx: number) => (
                                    <a
                                      key={idx}
                                      href={citation.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-sm hover:underline"
                                      style={{ color: config.textColor }}
                                    >
                                      • {citation.source}: {citation.title}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                            <ConfidenceMetadata
                              evidenceGrade={interaction.evidence_grade}
                              confidence={interaction.confidence}
                              severity={severity}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Premium Upsell - Non-Blocking */}
          <div className="mt-8 mb-6">
            <InlineUpgradeCard context="results" compact={false} />
          </div>
        </div>
      )}
    </div>
  );
}
