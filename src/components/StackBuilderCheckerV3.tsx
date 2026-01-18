import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, AlertTriangle, AlertCircle, Info, CheckCircle2, Eye, X, Filter, Crown, MessageSquare } from 'lucide-react';
import SubstanceCombobox from './SubstanceCombobox';
import NotFoundCard from './NotFoundCard';
import GlobalTrustStatement from './GlobalTrustStatement';
import InlineUpgradeCard from './InlineUpgradeCard';
import FeatureGateUpsell from './FeatureGateUpsell';
import InteractionResultCard from './check/InteractionResultCard';
import RequestReviewModal from './check/RequestReviewModal';
import { useTranslation } from '../lib/i18n';
import { supabase } from '../lib/supabase';
import { useAuthUser } from '../hooks/useAuthUser';
import { ContextFlags } from '../utils/contextKeywords';
import { trackBehavior } from '../lib/salesIntent';
import { getSubstanceLabel } from '../utils/substanceHelpers';
import ForBrandsCta from './ForBrandsCta';

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
  severity_norm?: string;
  severity_raw?: string;
  user_action?: string;
  severity?: 'avoid' | 'caution' | 'monitor' | 'info';
  summary_short: string;
  mechanism?: string;
  clinical_effect?: string;
  management?: string;
  evidence_grade?: string;
  confidence?: string;
  citations?: any;
  created_at?: string;
  updated_at?: string;
}

interface CheckSummary {
  total: number;
  major?: number;
  moderate?: number;
  minor?: number;
  monitor?: number;
  avoid?: number;
  caution?: number;
  info?: number;
}

interface NotFoundItem {
  id: string;
  rawName: string;
  kind: 'supplement' | 'drug';
  suggestions: Substance[];
}

interface PairCheck {
  tokenA: string;
  tokenB: string;
  substanceA: Substance;
  substanceB: Substance;
}

type CheckerMode = 'supplements-drugs' | 'supplements-supplements' | 'stack';

const SEVERITY_CONFIG = {
  major: { label: 'Major', bgColor: '#FEF2F2', borderColor: '#FCA5A5', textColor: '#991B1B', icon: AlertTriangle },
  moderate: { label: 'Moderate', bgColor: '#FEF3C7', borderColor: '#FCD34D', textColor: '#92400E', icon: AlertCircle },
  minor: { label: 'Minor', bgColor: '#EFF6FF', borderColor: '#93C5FD', textColor: '#1E40AF', icon: Info },
  monitor: { label: 'Monitor', bgColor: '#F0F9FF', borderColor: '#7DD3FC', textColor: '#0C4A6E', icon: Eye },
  unknown: { label: 'Unknown', bgColor: '#F9FAFB', borderColor: '#D1D5DB', textColor: '#374151', icon: Info },
  none: { label: 'No Interaction', bgColor: '#E8F5E9', borderColor: '#66BB6A', textColor: '#2E7D32', icon: CheckCircle2 },
};

const SEVERITY_ORDER: { [key: string]: number } = {
  major: 1,
  moderate: 2,
  minor: 3,
  monitor: 4,
};

const CONFIDENCE_ORDER: { [key: string]: number } = {
  high: 1,
  moderate: 2,
  medium: 2,
  low: 3,
};

export default function StackBuilderCheckerV3() {
  const t = useTranslation();
  const { profile } = useAuthUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState<CheckerMode>('supplements-drugs');

  // Selected substances
  const [supplements, setSupplements] = useState<Substance[]>([]);
  const [medications, setMedications] = useState<Substance[]>([]);
  const [stack, setStack] = useState<Substance[]>([]);

  // Current combobox values
  const [currentSupplement, setCurrentSupplement] = useState<Substance | null>(null);
  const [currentMedication, setCurrentMedication] = useState<Substance | null>(null);
  const [currentStack, setCurrentStack] = useState<Substance | null>(null);

  // Not found items
  const [notFoundItems, setNotFoundItems] = useState<NotFoundItem[]>([]);

  // Results
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Interaction[] | null>(null);
  const [summary, setSummary] = useState<CheckSummary | null>(null);
  const [pairCount, setPairCount] = useState(0);
  const [topConcern, setTopConcern] = useState<Interaction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [systemError, setSystemError] = useState<string | null>(null);
  const [submittingRequest, setSubmittingRequest] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  // Filters
  const [selectedSeverities, setSelectedSeverities] = useState<Set<string>>(new Set());
  const [minConfidence, setMinConfidence] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Context flags
  const [contextFlags, setContextFlags] = useState<ContextFlags>({
    bloodThinners: false,
    pregnancy: false,
    surgery: false,
    bloodPressure: false,
  });
  const [showContextFlags, setShowContextFlags] = useState(false);

  // Request review modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewModalSubstances, setReviewModalSubstances] = useState<{
    substanceName: string;
    interactionWith: string;
  }>({ substanceName: '', interactionWith: '' });

  // Initialize filters and query from URL on mount
  useEffect(() => {
    const sevParam = searchParams.get('sev');
    const confParam = searchParams.get('minConf');
    const queryParam = searchParams.get('query');

    if (sevParam) {
      const severities = sevParam.split(',').filter(Boolean);
      setSelectedSeverities(new Set(severities));
      setShowFilters(true);
    }

    if (confParam) {
      const conf = parseInt(confParam, 10);
      if (!isNaN(conf) && conf >= 0 && conf <= 100) {
        setMinConfidence(conf);
        setShowFilters(true);
      }
    }

    // Pre-fill substances from query parameter
    if (queryParam) {
      const terms = queryParam.toLowerCase().trim().split(/\s+/);
      // This is a hint for the user - they'll need to select actual substances
      // The query param serves as an initial search hint
    }
  }, []);

  // Update URL when filters change
  useEffect(() => {
    if (results === null) return;

    const params = new URLSearchParams(searchParams);

    if (selectedSeverities.size > 0) {
      params.set('sev', Array.from(selectedSeverities).join(','));
    } else {
      params.delete('sev');
    }

    if (minConfidence > 0) {
      params.set('minConf', minConfidence.toString());
    } else {
      params.delete('minConf');
    }

    setSearchParams(params, { replace: true });
  }, [selectedSeverities, minConfidence, results]);

  // Get tier-based limits
  const getMaxSubstances = () => {
    if (!profile || profile.plan === 'free' || profile.plan === 'starter_free') {
      return 2;
    }
    return 4; // Pro, Premium, Clinical
  };

  const getPlanName = () => {
    if (!profile || profile.plan === 'free' || profile.plan === 'starter_free') {
      return 'free';
    }
    return profile.plan;
  };

  const isPremiumUser = () => {
    return profile && profile.plan !== 'free' && profile.plan !== 'starter_free';
  };

  // Apply filters to results
  const filteredResults = useMemo(() => {
    if (!results) return null;

    let filtered = results;

    // Apply severity filter
    if (selectedSeverities.size > 0) {
      filtered = filtered.filter((interaction) => {
        const severity = interaction.severity_norm?.toLowerCase() || 'unknown';
        return selectedSeverities.has(severity);
      });
    }

    // Apply confidence filter
    if (minConfidence > 0) {
      filtered = filtered.filter((interaction) => {
        if (!interaction.confidence) return false;
        const confidence = parseFloat(interaction.confidence);
        return !isNaN(confidence) && confidence >= minConfidence;
      });
    }

    return filtered;
  }, [results, selectedSeverities, minConfidence]);

  // Toggle severity filter
  const toggleSeverity = (severity: string) => {
    if (!isPremiumUser()) return;

    const newSet = new Set(selectedSeverities);
    if (newSet.has(severity)) {
      newSet.delete(severity);
    } else {
      newSet.add(severity);
    }
    setSelectedSeverities(newSet);
  };

  // Handle confidence slider
  const handleConfidenceChange = (value: number) => {
    if (!isPremiumUser()) return;
    setMinConfidence(value);
  };

  // Clear all filters
  const clearFilters = () => {
    if (!isPremiumUser()) return;
    setSelectedSeverities(new Set());
    setMinConfidence(0);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedSeverities.size > 0 || minConfidence > 0;

  // Handle context flag changes
  const toggleContextFlag = (flag: keyof ContextFlags) => {
    setContextFlags((prev) => ({
      ...prev,
      [flag]: !prev[flag],
    }));
  };

  // Check if any context flags are active
  const hasActiveContextFlags =
    contextFlags.bloodThinners ||
    contextFlags.pregnancy ||
    contextFlags.surgery ||
    contextFlags.bloodPressure;

  // Get user tier for request priority
  const getUserTier = (): string => {
    if (!profile) return 'free';
    if (profile.plan_tier === 'clinical') return 'clinical';
    if (profile.plan_tier === 'pro' || profile.plan_tier === 'premium') return 'pro';
    return 'free';
  };

  // Handle request review modal
  const openReviewModal = (substanceName: string, interactionWith: string) => {
    setReviewModalSubstances({ substanceName, interactionWith });
    setShowReviewModal(true);
  };

  // Handle supplement selection
  const handleSupplementChange = (substance: Substance | null) => {
    setCurrentSupplement(substance);
    if (substance && !supplements.find((s) => s.substance_id === substance.substance_id)) {
      setSupplements([...supplements, substance]);
      setCurrentSupplement(null);
    }
  };

  // Handle medication selection
  const handleMedicationChange = (substance: Substance | null) => {
    setCurrentMedication(substance);
    if (substance && !medications.find((m) => m.substance_id === substance.substance_id)) {
      setMedications([...medications, substance]);
      setCurrentMedication(null);
    }
  };

  // Handle stack selection
  const handleStackChange = (substance: Substance | null) => {
    setCurrentStack(substance);
    const maxSubstances = getMaxSubstances();

    if (substance && !stack.find((s) => s.substance_id === substance.substance_id)) {
      if (stack.length >= maxSubstances) {
        setShowLimitWarning(true);
        setTimeout(() => setShowLimitWarning(false), 3000);
        return;
      }
      setStack([...stack, substance]);
      setCurrentStack(null);
    }
  };

  // Remove from stack
  const removeFromStack = (substanceId: string) => {
    setStack(stack.filter((s) => s.substance_id !== substanceId));
    setResults(null);
    setTopConcern(null);
    setPairCount(0);
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
    if (mode === 'stack') {
      if (!stack.find((s) => s.substance_id === substance.substance_id)) {
        if (stack.length < getMaxSubstances()) {
          setStack([...stack, substance]);
        }
      }
    } else if (substance.type === 'supplement' || substance.type === 'drug') {
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

  // Generate all unique pairs
  const generatePairs = (substances: Substance[]): PairCheck[] => {
    const pairs: PairCheck[] = [];
    for (let i = 0; i < substances.length; i++) {
      for (let j = i + 1; j < substances.length; j++) {
        pairs.push({
          tokenA: normalizeToken(substances[i].canonical_name),
          tokenB: normalizeToken(substances[j].canonical_name),
          substanceA: substances[i],
          substanceB: substances[j],
        });
      }
    }
    return pairs;
  };

  // Log lookup event asynchronously (fire-and-forget)
  const logLookup = (inputs: string[], response: any) => {
    try {
      const normalized_inputs = inputs.map(normalizeToken);
      const resolved_substance_ids = mode === 'stack'
        ? stack.map(s => s.substance_id)
        : [
            ...supplements.map(s => s.substance_id),
            ...medications.map(s => s.substance_id)
          ];
      const unresolved_inputs = notFoundItems.map(item => item.rawName);

      const results_summary = response.summary || { total: 0, major: 0, moderate: 0, minor: 0, monitor: 0 };
      const has_results = (response.results || []).length > 0;

      const client_meta = {
        path: window.location.pathname,
        ref: document.referrer || undefined,
        ua: navigator.userAgent,
        plan: getPlanName(),
        mode: mode
      };

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
      }).catch(() => {});
    } catch {}
  };

  // Run check for stack mode (pair-wise)
  const runStackCheck = async () => {
    if (stack.length < 2) {
      setError('Add at least 2 substances to check.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setTopConcern(null);
    setSystemError(null);

    try {
      const pairs = generatePairs(stack);
      setPairCount(pairs.length);

      const allInteractions: Interaction[] = [];
      const seenIds = new Set<string>();

      for (const pair of pairs) {
        const { data, error: rpcError } = await supabase.rpc('rpc_get_interaction_by_tokens', {
          token_a: pair.tokenA,
          token_b: pair.tokenB,
        });

        if (rpcError) {
          console.error('RPC error for pair:', pair, rpcError);
          continue;
        }

        if (data && Array.isArray(data)) {
          for (const interaction of data) {
            if (!seenIds.has(interaction.interaction_id)) {
              seenIds.add(interaction.interaction_id);
              allInteractions.push(interaction);
            }
          }
        }
      }

      // Sort by severity then confidence
      const sortedInteractions = allInteractions.sort((a, b) => {
        const severityA = SEVERITY_ORDER[a.severity_norm?.toLowerCase() || 'monitor'] || 999;
        const severityB = SEVERITY_ORDER[b.severity_norm?.toLowerCase() || 'monitor'] || 999;

        if (severityA !== severityB) {
          return severityA - severityB;
        }

        const confidenceA = CONFIDENCE_ORDER[a.confidence?.toLowerCase() || 'low'] || 999;
        const confidenceB = CONFIDENCE_ORDER[b.confidence?.toLowerCase() || 'low'] || 999;

        return confidenceA - confidenceB;
      });

      // Calculate summary
      const newSummary: CheckSummary = {
        total: sortedInteractions.length,
        major: sortedInteractions.filter(i => i.severity_norm?.toLowerCase() === 'major').length,
        moderate: sortedInteractions.filter(i => i.severity_norm?.toLowerCase() === 'moderate').length,
        minor: sortedInteractions.filter(i => i.severity_norm?.toLowerCase() === 'minor').length,
        monitor: sortedInteractions.filter(i => i.severity_norm?.toLowerCase() === 'monitor').length,
      };

      setResults(sortedInteractions);
      setSummary(newSummary);
      setTopConcern(sortedInteractions[0] || null);

      // Log lookup
      logLookup(stack.filter(s => s?.display_name).map(s => s.display_name), { results: sortedInteractions, summary: newSummary });
    } catch (err) {
      console.error('Stack check error:', err);
      setError('Failed to check interactions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Run check for traditional mode
  const runCheck = async () => {
    // Validation
    if (mode === 'supplements-drugs') {
      if (supplements.length === 0 || medications.length === 0) {
        setError(t('checker.minRequired'));
        return;
      }
    } else if (mode === 'supplements-supplements') {
      if (supplements.length < 2) {
        setError('Add at least 2 supplements to compare');
        return;
      }
    } else if (mode === 'stack') {
      runStackCheck();
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setSummary(null);
    setSystemError(null);

    try {
      const allNames = [
        ...supplements.filter(s => s?.display_name).map((s) => s.display_name),
        ...medications.filter(m => m?.display_name).map((m) => m.display_name),
      ].filter(Boolean);

      const res = await fetch('/.netlify/functions/checker-get-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: allNames }),
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error('Checker function is not responding correctly. Please refresh and try again.');
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${res.status}`);
      }

      const response = await res.json();

      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response from checker. Please try again.');
      }

      setResults(response.results || []);
      setSummary(response.summary || null);

      logLookup(allNames, response);

      // Track behavior for sales intent
      trackBehavior({
        event_type: 'checker_run',
        checker_items: allNames
      }).then(() => {
        window.dispatchEvent(new Event('sales-intent-updated'));
      }).catch(() => {
        // Silent fail
      });
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to check interactions';
      setError(errorMsg);

      if (errorMsg.includes('not responding') || errorMsg.includes('configuration')) {
        setSystemError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedResults(newExpanded);
  };

  const handleRequestAddition = async (substanceName: string) => {
    if (submittingRequest) return;

    setSubmittingRequest(true);
    try {
      const response = await fetch('/.netlify/functions/checker-request-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          substance_name: substanceName,
          user_agent: navigator.userAgent,
          referrer: document.referrer
        })
      });

      if (response.ok) {
        console.log('Request submitted successfully');
      }
    } catch (err) {
      console.error('Failed to submit request:', err);
    } finally {
      setSubmittingRequest(false);
    }
  };

  const getSeverityColor = (severity?: string) => {
    const norm = severity?.toLowerCase();
    if (norm === 'major') return 'text-red-700';
    if (norm === 'moderate') return 'text-amber-700';
    if (norm === 'minor') return 'text-blue-700';
    return 'text-slate-700';
  };

  const maxSubstances = getMaxSubstances();
  const planName = getPlanName();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Micro-Instruction */}
      <div className="mb-6 text-center">
        <p className="text-sm text-slate-600">
          Enter 2–4 items. We screen all possible pairs and highlight the highest-concern interaction.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setMode('supplements-drugs');
            setStack([]);
            setResults(null);
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'supplements-drugs'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Supplements + Medications
        </button>
        <button
          onClick={() => {
            setMode('supplements-supplements');
            setStack([]);
            setResults(null);
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'supplements-supplements'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Supplements Only
        </button>
        <button
          onClick={() => {
            setMode('stack');
            setSupplements([]);
            setMedications([]);
            setResults(null);
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'stack'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Stack Mode (2-{maxSubstances})
        </button>
      </div>

      {/* Stack Mode UI */}
      {mode === 'stack' && (
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Check Multiple Substances
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Add {planName === 'free' ? '2' : '2-4'} substances to check all possible pair-wise interactions. Results sorted by severity and confidence.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Add Substance ({stack.length}/{maxSubstances})
            </label>
            <SubstanceCombobox
              label=""
              value={currentStack}
              onChange={handleStackChange}
              onNotFound={handleNotFound}
              placeholder="Type to search medications or supplements..."
              disabled={stack.length >= maxSubstances}
            />
          </div>

          {showLimitWarning && planName === 'free' && (
            <div className="mb-4">
              <FeatureGateUpsell feature="stack-limit" currentTier="free" compact />
            </div>
          )}

          {showLimitWarning && planName !== 'free' && (
            <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-sm text-slate-700">
                Maximum 4 substances allowed.
              </p>
            </div>
          )}

          {stack.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Stack
              </label>
              <div className="flex flex-wrap gap-2">
                {stack.map((substance) => (
                  <div
                    key={substance.substance_id}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm"
                  >
                    <span className="font-medium text-slate-900">{getSubstanceLabel(substance, 'Unknown')}</span>
                    <span className="text-xs text-slate-500 px-2 py-0.5 bg-white rounded">
                      {substance.type || 'unknown'}
                    </span>
                    <button
                      onClick={() => removeFromStack(substance.substance_id)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-slate-700">
              <strong>Screening tool only.</strong> This checks documented interactions from clinical sources. It may miss interactions. Always review each pair and discuss your complete regimen with a healthcare provider.
            </p>
          </div>

          <button
            onClick={runCheck}
            disabled={stack.length < 2 || loading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Checking {pairCount} Pairs...
              </>
            ) : (
              `Check ${stack.length} Substances`
            )}
          </button>
        </div>
      )}

      {/* Traditional Mode UI */}
      {mode !== 'stack' && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <SubstanceCombobox
                kind="supplement"
                label={mode === 'supplements-supplements' ? 'Add Supplements' : 'Add Supplement'}
                value={currentSupplement}
                onChange={handleSupplementChange}
                onNotFound={handleNotFound}
                placeholder="Search supplements..."
              />
              {supplements.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {supplements.map((s) => (
                    <span key={s.substance_id} className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 border border-green-200 rounded-lg text-sm">
                      {getSubstanceLabel(s, 'Unknown')}
                      <button onClick={() => setSupplements(supplements.filter(x => x.substance_id !== s.substance_id))} className="text-slate-400 hover:text-slate-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {mode === 'supplements-drugs' && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <SubstanceCombobox
                  kind="drug"
                  label="Add Medication"
                  value={currentMedication}
                  onChange={handleMedicationChange}
                  onNotFound={handleNotFound}
                  placeholder="Search medications..."
                />
                {medications.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {medications.map((m) => (
                      <span key={m.substance_id} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                        {getSubstanceLabel(m, 'Unknown')}
                        <button onClick={() => setMedications(medications.filter(x => x.substance_id !== m.substance_id))} className="text-slate-400 hover:text-slate-600">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={runCheck}
            disabled={loading || (mode === 'supplements-drugs' ? supplements.length === 0 || medications.length === 0 : supplements.length < 2)}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Checking...
              </>
            ) : (
              'Check Interactions'
            )}
          </button>
        </>
      )}

      {/* Not Found Items */}
      {notFoundItems.length > 0 && (
        <div className="mb-6 space-y-3">
          {notFoundItems.map((item) => (
            <NotFoundCard
              key={item.id}
              rawName={item.rawName}
              kind={item.kind}
              suggestions={item.suggestions}
              onSelectSuggestion={(substance) => handleSelectSuggestion(item.id, substance)}
              onDismiss={() => removeNotFound(item.id)}
              onRequestAddition={handleRequestAddition}
            />
          ))}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Results Summary (Stack Mode) */}
      {mode === 'stack' && results && results.length > 0 && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-slate-900">
            {stack.length} items → {pairCount} pair {pairCount === 1 ? 'check' : 'checks'}
          </p>
          {topConcern && (
            <p className="text-sm text-slate-700 mt-1">
              <span className="font-medium">Top concern:</span>{' '}
              <span className={getSeverityColor(topConcern.severity_norm)}>
                {topConcern.severity_norm || 'Monitor'}
              </span>
              {' - '}
              {topConcern.user_action || topConcern.summary_short}
            </p>
          )}
        </div>
      )}

      {/* Filter Panel */}
      {results && results.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            {hasActiveFilters && (
              <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                Active
              </span>
            )}
          </button>

          {showFilters && (
            <div className="mt-3 bg-white rounded-lg shadow-sm border border-slate-200 p-5">
              {!isPremiumUser() && (
                <div className="mb-4">
                  <FeatureGateUpsell feature="filters" currentTier="free" compact />
                </div>
              )}

              <div className={!isPremiumUser() ? 'opacity-50 pointer-events-none' : ''}>
                {/* Severity Multi-Select */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-900 mb-3">
                    Severity
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['major', 'moderate', 'minor', 'monitor', 'unknown'].map((severity) => {
                      const isSelected = selectedSeverities.has(severity);
                      const config = SEVERITY_CONFIG[severity as keyof typeof SEVERITY_CONFIG];

                      return (
                        <button
                          key={severity}
                          onClick={() => toggleSeverity(severity)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50 text-blue-900'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                          style={
                            isSelected
                              ? {
                                  borderColor: config?.borderColor || '#3B82F6',
                                  backgroundColor: config?.bgColor || '#EFF6FF',
                                  color: config?.textColor || '#1E40AF',
                                }
                              : undefined
                          }
                        >
                          {severity.charAt(0).toUpperCase() + severity.slice(1)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Minimum Confidence Slider */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-900 mb-3">
                    Minimum Confidence: {minConfidence}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={minConfidence}
                    onChange={(e) => handleConfidenceChange(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Context Flags Panel */}
      {results && results.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setShowContextFlags(!showContextFlags)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Info className="w-4 h-4" />
            {showContextFlags ? 'Hide Context' : 'Add Context'}
            {hasActiveContextFlags && (
              <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                {Object.values(contextFlags).filter(Boolean).length}
              </span>
            )}
          </button>

          {showContextFlags && (
            <div className="mt-3 bg-white rounded-lg shadow-sm border border-slate-200 p-5">
              <p className="text-sm text-slate-700 mb-4">
                Select any that apply to see relevant notes on major and moderate interactions.
              </p>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={contextFlags.bloodThinners}
                    onChange={() => toggleContextFlag('bloodThinners')}
                    className="mt-0.5 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">
                    I take blood thinners
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={contextFlags.pregnancy}
                    onChange={() => toggleContextFlag('pregnancy')}
                    className="mt-0.5 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">
                    I'm pregnant or trying to conceive
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={contextFlags.surgery}
                    onChange={() => toggleContextFlag('surgery')}
                    className="mt-0.5 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">
                    I have surgery coming up
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={contextFlags.bloodPressure}
                    onChange={() => toggleContextFlag('bloodPressure')}
                    className="mt-0.5 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">
                    I'm managing blood pressure
                  </span>
                </label>
              </div>

              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-xs text-slate-600">
                  Context flags help highlight relevant concerns. They do not alter interaction data or provide medical advice.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Display */}
      {results && results.length > 0 && filteredResults && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {hasActiveFilters ? (
                  <>
                    Showing {filteredResults.length} of {results.length}{' '}
                    {results.length === 1 ? 'Interaction' : 'Interactions'}
                  </>
                ) : (
                  <>
                    Found {results.length} {results.length === 1 ? 'Interaction' : 'Interactions'}
                  </>
                )}
              </h3>
              <button
                onClick={() => {
                  const substancesChecked =
                    mode === 'stack'
                      ? stack.filter(s => s?.display_name).map((s) => getSubstanceLabel(s, 'Unknown')).join(', ')
                      : mode === 'supplements-drugs'
                      ? [...supplements, ...medications].filter(s => s?.display_name).map((s) => getSubstanceLabel(s, 'Unknown')).join(', ')
                      : [...supplements].filter(s => s?.display_name).map((s) => getSubstanceLabel(s, 'Unknown')).join(', ');
                  openReviewModal(
                    substancesChecked.split(', ')[0] || 'Unknown',
                    substancesChecked.split(', ').slice(1).join(', ') || 'stack'
                  );
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-300"
              >
                <MessageSquare className="w-4 h-4" />
                Request Review
              </button>
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {filteredResults.length > 0 ? (
              filteredResults.map((interaction) => (
                <InteractionResultCard
                  key={interaction.interaction_id}
                  interaction={interaction}
                  contextFlags={contextFlags}
                />
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-slate-600">No interactions match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                  disabled={!isPremiumUser()}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* For Brands CTA - only shows after results */}
      {results && <ForBrandsCta className="mb-6" />}

      {/* No Results Message */}
      {!loading && results && results.length === 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center mb-6">
          <p className="text-slate-700 font-medium">No documented interactions found</p>
          <p className="text-sm text-slate-600 mt-2 mb-4">
            While no interactions were found in our database, this doesn't guarantee absence of risk.
            Always consult your healthcare provider about your specific combination.
          </p>
          <button
            onClick={() => {
              const substancesChecked =
                mode === 'stack'
                  ? stack.filter(s => s?.display_name).map((s) => getSubstanceLabel(s, 'Unknown')).join(', ')
                  : mode === 'supplements-drugs'
                  ? [...supplements, ...medications].filter(s => s?.display_name).map((s) => getSubstanceLabel(s, 'Unknown')).join(', ')
                  : [...supplements].filter(s => s?.display_name).map((s) => getSubstanceLabel(s, 'Unknown')).join(', ');
              openReviewModal(
                substancesChecked.split(', ')[0] || 'Unknown',
                substancesChecked.split(', ').slice(1).join(', ') || 'stack'
              );
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Request Review
          </button>
        </div>
      )}

      {/* Global Trust Statement */}
      {results !== null && <GlobalTrustStatement />}

      {/* Common Questions Links */}
      {results !== null && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Questions</h3>
          <div className="space-y-2">
            <a
              href="/guides/calcium-and-iron-timing"
              className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition text-sm text-gray-700 hover:text-blue-600"
            >
              <span className="font-medium">How far apart to take calcium and iron supplements?</span>
            </a>
            <a
              href="/interactions/evening-primrose-oil-phenothiazines-seizure-risk"
              className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition text-sm text-gray-700 hover:text-blue-600"
            >
              <span className="font-medium">Evening primrose oil and phenothiazines seizure risk</span>
            </a>
          </div>
        </div>
      )}

      {/* Request Review Modal */}
      <RequestReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        substanceName={reviewModalSubstances.substanceName}
        interactionWith={reviewModalSubstances.interactionWith}
        userTier={getUserTier()}
        userId={profile?.id}
      />
    </div>
  );
}
