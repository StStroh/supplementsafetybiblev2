import { useState } from 'react';
import { Loader2, AlertTriangle, X, Layers } from 'lucide-react';
import SubstanceCombobox from './SubstanceCombobox';
import InteractionResultCard from './check/InteractionResultCard';
import { supabase } from '../lib/supabase';
import { formatInteractionPair } from '../utils/substanceHelpers';

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
}

interface PairCheck {
  tokenA: string;
  tokenB: string;
  substanceA: Substance;
  substanceB: Substance;
}

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

export default function StackModeChecker() {
  const [stack, setStack] = useState<Substance[]>([]);
  const [currentInput, setCurrentInput] = useState<Substance | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Interaction[]>([]);
  const [pairCount, setPairCount] = useState(0);
  const [topConcern, setTopConcern] = useState<Interaction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());

  const normalizeToken = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, ' ');
  };

  const handleSubstanceChange = (substance: Substance | null) => {
    setCurrentInput(substance);
    if (substance && !stack.find((s) => s.substance_id === substance.substance_id)) {
      if (stack.length < 4) {
        setStack([...stack, substance]);
        setCurrentInput(null);
      }
    }
  };

  const removeFromStack = (substanceId: string) => {
    setStack(stack.filter((s) => s.substance_id !== substanceId));
    setResults([]);
    setTopConcern(null);
    setPairCount(0);
  };

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

  const checkStack = async () => {
    if (stack.length < 2) {
      setError('Add at least 2 substances to check.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    setTopConcern(null);

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

      setResults(sortedInteractions);
      setTopConcern(sortedInteractions[0] || null);
    } catch (err) {
      console.error('Stack check error:', err);
      setError('Failed to check interactions. Please try again.');
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

  const getSeverityColor = (severity?: string) => {
    const norm = severity?.toLowerCase();
    if (norm === 'major') return 'text-red-700';
    if (norm === 'moderate') return 'text-amber-700';
    if (norm === 'minor') return 'text-blue-700';
    return 'text-slate-700';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Stack Mode Checker</h2>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          Add 2-4 substances to check all possible pair-wise interactions. Results sorted by severity and confidence.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Add Substance ({stack.length}/4)
          </label>
          <SubstanceCombobox
            value={currentInput}
            onChange={handleSubstanceChange}
            onNotFound={() => {}}
            placeholder="Type to search medications or supplements..."
            disabled={stack.length >= 4}
          />
        </div>

        {stack.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Stack
            </label>
            <div className="flex flex-wrap gap-2">
              {stack.map((substance) => (
                <div
                  key={substance.substance_id}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm"
                >
                  <span className="font-medium text-slate-900">{substance.display_name}</span>
                  <span className="text-xs text-slate-500 px-2 py-0.5 bg-white rounded">
                    {substance.type}
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

        <button
          onClick={checkStack}
          disabled={stack.length < 2 || loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Checking Stack...
            </>
          ) : (
            `Check ${stack.length} Substances`
          )}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
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
                    {formatInteractionPair(topConcern.substance_a, topConcern.substance_b)}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200">
              <p className="text-xs text-slate-600">
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                <strong>Educational screening only.</strong> This tool provides preliminary interaction information
                and is not a substitute for professional medical advice. Always consult your healthcare provider
                before making changes to your medications or supplements.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                Found {results.length} {results.length === 1 ? 'Interaction' : 'Interactions'}
              </h3>
            </div>
            <div className="divide-y divide-slate-200">
              {results.map((interaction) => (
                <InteractionResultCard
                  key={interaction.interaction_id}
                  interaction={interaction}
                  isExpanded={expandedResults.has(interaction.interaction_id)}
                  onToggleExpand={() => toggleExpanded(interaction.interaction_id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {!loading && results.length === 0 && stack.length >= 2 && pairCount > 0 && (
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-slate-700 font-medium">No documented interactions found</p>
          <p className="text-sm text-slate-600 mt-2">
            While no interactions were found in our database, this doesn't guarantee safety.
            Always consult your healthcare provider about your specific combination.
          </p>
        </div>
      )}
    </div>
  );
}
