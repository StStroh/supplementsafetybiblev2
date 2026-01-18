import { useState, useRef, useEffect } from 'react';
import { X, Search, AlertTriangle, AlertCircle, Info, CheckCircle2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { getFuzzyMatches } from '../utils/fuzzyMatch';
import { normalizeToken, findSubstanceByToken } from '../utils/normalize';
import ConfidenceBadge from './ConfidenceBadge';
import GlobalTrustStatement from './GlobalTrustStatement';
import ConfidenceMetadata from './ConfidenceMetadata';
import { getSubstanceLabel, getSubstanceType } from '../utils/substanceHelpers';

const IS_DEV = import.meta.env.DEV;

interface Substance {
  substance_id: string;
  type: 'drug' | 'supplement';
  display_name: string;
  canonical_name: string;
  aliases: string[];
}

interface Interaction {
  interaction_id: string;
  substance_a: {
    id: string;
    name: string;
    type: 'drug' | 'supplement';
  };
  substance_b: {
    id: string;
    name: string;
    type: 'drug' | 'supplement';
  };
  interaction_type: string;
  severity: 'avoid' | 'caution' | 'monitor' | 'info';
  summary_short: string;
  mechanism?: string;
  clinical_effect?: string;
  management?: string;
  evidence_grade?: string;
  confidence?: string;
  writeup_markdown?: string;
  citations?: any;
}

interface CheckSummary {
  total: number;
  avoid: number;
  caution: number;
  monitor: number;
  info: number;
}

type CheckerMode = 'supplements-drugs' | 'supplements-supplements';

const SEVERITY_CONFIG = {
  avoid: {
    label: 'Avoid',
    bgColor: '#FFEBEE',
    borderColor: '#EF5350',
    textColor: '#C62828',
    icon: AlertTriangle
  },
  caution: {
    label: 'Caution',
    bgColor: '#FFF3E0',
    borderColor: '#FFA726',
    textColor: '#E65100',
    icon: AlertCircle
  },
  monitor: {
    label: 'Monitor',
    bgColor: '#E3F2FD',
    borderColor: '#64B5F6',
    textColor: '#1565C0',
    icon: Info
  },
  info: {
    label: 'Info',
    bgColor: '#F3E5F5',
    borderColor: '#BA68C8',
    textColor: '#6A1B9A',
    icon: Info
  },
  none: {
    label: 'No Interaction',
    bgColor: '#E8F5E9',
    borderColor: '#66BB6A',
    textColor: '#2E7D32',
    icon: CheckCircle2
  }
};

interface UnknownSubstance {
  name: string;
  type: 'drug' | 'supplement';
  suggestions: Substance[];
}

export default function StackBuilderChecker() {
  const [mode, setMode] = useState<CheckerMode>('supplements-drugs');
  const [supplements, setSupplements] = useState<Substance[]>([]);
  const [medications, setMedications] = useState<Substance[]>([]);

  const [suppInput, setSuppInput] = useState('');
  const [medInput, setMedInput] = useState('');

  const [suppSuggestions, setSuppSuggestions] = useState<Substance[]>([]);
  const [medSuggestions, setMedSuggestions] = useState<Substance[]>([]);

  const [suppFuzzy, setSuppFuzzy] = useState<Substance[]>([]);
  const [medFuzzy, setMedFuzzy] = useState<Substance[]>([]);

  const [suppHighlighted, setSuppHighlighted] = useState(0);
  const [medHighlighted, setMedHighlighted] = useState(0);

  const [suppLoading, setSuppLoading] = useState(false);
  const [medLoading, setMedLoading] = useState(false);

  const [suppInputError, setSuppInputError] = useState('');
  const [medInputError, setMedInputError] = useState('');

  const [suppShowWarning, setSuppShowWarning] = useState(false);
  const [medShowWarning, setMedShowWarning] = useState(false);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Interaction[] | null>(null);
  const [summary, setSummary] = useState<CheckSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());

  const [allSubstances, setAllSubstances] = useState<Substance[]>([]);
  const [unknownSubstances, setUnknownSubstances] = useState<UnknownSubstance[]>([]);

  const [dbStats, setDbStats] = useState<{ supplements: number | null; drugs: number | null; interactions: number } | null>(null);

  const suppInputRef = useRef<HTMLInputElement>(null);
  const medInputRef = useRef<HTMLInputElement>(null);

  // Load all substances for fuzzy matching and database stats
  useEffect(() => {
    async function loadSubstances() {
      try {
        const res = await fetch('/.netlify/functions/checker-autocomplete?q=a&type=');
        const data = await res.json();
        if (data.results) {
          setAllSubstances(data.results);
        }
      } catch (err) {
        console.error('Failed to load substances for fuzzy matching:', err);
      }
    }

    async function loadStats() {
      try {
        const res = await fetch('/.netlify/functions/checker-stats');
        const data = await res.json();
        if (data.ok && data.counts) {
          setDbStats({
            supplements: data.counts.supplements,
            drugs: data.counts.drugs,
            interactions: data.counts.interactions || 0
          });
        }
      } catch (err) {
        console.error('Failed to load database stats:', err);
      }
    }

    loadSubstances();
    loadStats();
  }, []);

  // Debounced autocomplete for supplements
  useEffect(() => {
    setSuppInputError('');
    setSuppFuzzy([]);
    setSuppShowWarning(false);

    if (suppInput.length < 1) {
      setSuppSuggestions([]);
      setSuppLoading(false);
      return;
    }

    if (suppInput.length >= 2) {
      setSuppShowWarning(true);
    }

    setSuppLoading(true);

    const timer = setTimeout(async () => {
      const start = performance.now();

      try {
        const res = await fetch(`/.netlify/functions/checker-autocomplete?q=${encodeURIComponent(suppInput)}&type=supplement`);
        const data = await res.json();
        const elapsed = performance.now() - start;

        if (IS_DEV) {
          console.log('[Supp Autocomplete]', {
            query: suppInput,
            results: data.results?.length || 0,
            latency: `${elapsed.toFixed(0)}ms`
          });
        }

        const results = data.results || [];
        setSuppSuggestions(results);
        setSuppHighlighted(0);

        // Fuzzy matching if no exact matches
        if (results.length === 0 && allSubstances.length > 0) {
          const fuzzy = getFuzzyMatches(
            suppInput,
            allSubstances.filter(s => s.type === 'supplement'),
            s => s.display_name,
            40,
            5
          );
          setSuppFuzzy(fuzzy);

          if (IS_DEV && fuzzy.length === 0 && suppInput.length > 2) {
            console.warn('[Supp Autocomplete] No substances indexed for common query:', suppInput);
          }
        }
      } catch (err) {
        console.error('Autocomplete error:', err);
      } finally {
        setSuppLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [suppInput, allSubstances]);

  // Debounced autocomplete for medications
  useEffect(() => {
    setMedInputError('');
    setMedFuzzy([]);
    setMedShowWarning(false);

    if (medInput.length < 1) {
      setMedSuggestions([]);
      setMedLoading(false);
      return;
    }

    if (medInput.length >= 2) {
      setMedShowWarning(true);
    }

    setMedLoading(true);

    const timer = setTimeout(async () => {
      const start = performance.now();

      try {
        const res = await fetch(`/.netlify/functions/checker-autocomplete?q=${encodeURIComponent(medInput)}&type=drug`);
        const data = await res.json();
        const elapsed = performance.now() - start;

        if (IS_DEV) {
          console.log('[Med Autocomplete]', {
            query: medInput,
            results: data.results?.length || 0,
            latency: `${elapsed.toFixed(0)}ms`
          });
        }

        const results = data.results || [];
        setMedSuggestions(results);
        setMedHighlighted(0);

        // Fuzzy matching if no exact matches
        if (results.length === 0 && allSubstances.length > 0) {
          const fuzzy = getFuzzyMatches(
            medInput,
            allSubstances.filter(s => s.type === 'drug'),
            s => s.display_name,
            40,
            5
          );
          setMedFuzzy(fuzzy);

          if (IS_DEV && fuzzy.length === 0 && medInput.length > 2) {
            console.warn('[Med Autocomplete] No substances indexed for common query:', medInput);
          }
        }
      } catch (err) {
        console.error('Autocomplete error:', err);
      } finally {
        setMedLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [medInput, allSubstances]);

  function addSupplement(substance: Substance) {
    if (!supplements.find(s => s.substance_id === substance.substance_id)) {
      setSupplements([...supplements, substance]);
    }
    setSuppInput('');
    setSuppSuggestions([]);
    setSuppFuzzy([]);
    setSuppInputError('');
    setSuppShowWarning(false);
    setUnknownSubstances([]); // Clear unknown substances when valid selection is made
    suppInputRef.current?.focus();
  }

  function addMedication(substance: Substance) {
    if (!medications.find(m => m.substance_id === substance.substance_id)) {
      setMedications([...medications, substance]);
    }
    setMedInput('');
    setMedSuggestions([]);
    setMedFuzzy([]);
    setMedInputError('');
    setMedShowWarning(false);
    setUnknownSubstances([]); // Clear unknown substances when valid selection is made
    medInputRef.current?.focus();
  }

  function removeSupplement(id: string) {
    setSupplements(supplements.filter(s => s.substance_id !== id));
  }

  function removeMedication(id: string) {
    setMedications(medications.filter(m => m.substance_id !== id));
  }

  function handleCommaInput(input: string, type: 'supplement' | 'drug') {
    // Split by comma and process each item
    const items = input.split(',').map(s => s.trim()).filter(Boolean);

    if (items.length > 1) {
      // Multiple items detected
      items.forEach(item => {
        const match = allSubstances.find(s =>
          s.display_name.toLowerCase() === item.toLowerCase() &&
          (type === 'supplement' ? s.type === 'supplement' : s.type === 'drug')
        );

        if (match) {
          if (type === 'supplement') {
            addSupplement(match);
          } else {
            addMedication(match);
          }
        }
      });

      // Clear input after processing
      if (type === 'supplement') {
        setSuppInput('');
      } else {
        setMedInput('');
      }
      return true;
    }
    return false;
  }

  function handleSuppKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();

      // Check for comma-separated input first
      if (suppInput.includes(',')) {
        if (handleCommaInput(suppInput, 'supplement')) {
          return;
        }
      }

      // STRICT: Only accept selections from dropdown
      // Priority: exact match > fuzzy match > normalized match
      const autoMatch = suppSuggestions.length > 0
        ? suppSuggestions[suppHighlighted]
        : suppFuzzy.length > 0
          ? suppFuzzy[0]
          : null;

      const normalizedMatch = !autoMatch && suppInput.trim().length > 0
        ? findSubstanceByToken(suppInput, allSubstances.filter(s => s.type === 'supplement'))
        : null;

      const match = autoMatch || normalizedMatch;

      if (match) {
        addSupplement(match);
      } else if (suppInput.trim().length > 0) {
        // No match found - show inline error
        setSuppInputError('Please select a suggestion from the list');
        setSuppShowWarning(true);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const maxIdx = suppSuggestions.length > 0 ? suppSuggestions.length - 1 : suppFuzzy.length - 1;
      setSuppHighlighted(Math.min(suppHighlighted + 1, maxIdx));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSuppHighlighted(Math.max(suppHighlighted - 1, 0));
    } else if (e.key === 'Backspace' && suppInput === '' && supplements.length > 0) {
      removeSupplement(supplements[supplements.length - 1].substance_id);
    } else if (e.key === 'Escape') {
      setSuppInput('');
      setSuppSuggestions([]);
      setSuppFuzzy([]);
      setSuppInputError('');
      setSuppShowWarning(false);
    }
  }

  function handleMedKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();

      // Check for comma-separated input first
      if (medInput.includes(',')) {
        if (handleCommaInput(medInput, 'drug')) {
          return;
        }
      }

      // STRICT: Only accept selections from dropdown
      // Priority: exact match > fuzzy match > normalized match
      const autoMatch = medSuggestions.length > 0
        ? medSuggestions[medHighlighted]
        : medFuzzy.length > 0
          ? medFuzzy[0]
          : null;

      const normalizedMatch = !autoMatch && medInput.trim().length > 0
        ? findSubstanceByToken(medInput, allSubstances.filter(s => s.type === 'drug'))
        : null;

      const match = autoMatch || normalizedMatch;

      if (match) {
        addMedication(match);
      } else if (medInput.trim().length > 0) {
        // No match found - show inline error
        setMedInputError('Please select a suggestion from the list');
        setMedShowWarning(true);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const maxIdx = medSuggestions.length > 0 ? medSuggestions.length - 1 : medFuzzy.length - 1;
      setMedHighlighted(Math.min(medHighlighted + 1, maxIdx));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setMedHighlighted(Math.max(medHighlighted - 1, 0));
    } else if (e.key === 'Backspace' && medInput === '' && medications.length > 0) {
      removeMedication(medications[medications.length - 1].substance_id);
    } else if (e.key === 'Escape') {
      setMedInput('');
      setMedSuggestions([]);
      setMedFuzzy([]);
      setMedInputError('');
      setMedShowWarning(false);
    }
  }

  async function runCheck() {
    // STRICT ENFORCEMENT: Block if there's unselected text in inputs
    if (suppInput.trim() || medInput.trim()) {
      if (suppInput.trim()) {
        setSuppInputError('Please select a suggestion from the list or clear this field');
        setSuppShowWarning(true);
      }
      if (medInput.trim()) {
        setMedInputError('Please select a suggestion from the list or clear this field');
        setMedShowWarning(true);
      }
      setError('Please select items from the dropdown or clear the input fields');
      return;
    }

    // Validation: require minimum items
    if (mode === 'supplements-drugs') {
      if (supplements.length === 0 || medications.length === 0) {
        setError('Please add at least 1 supplement AND 1 prescription medicine');
        return;
      }
    } else {
      if (supplements.length < 2) {
        setError('Please add at least 2 supplements to compare');
        return;
      }
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setSummary(null);
    setUnknownSubstances([]);

    try {
      // Send display names (all items are guaranteed to have substance_id)
      const allNames = [
        ...supplements.map(s => s.display_name),
        ...medications.map(m => m.display_name)
      ];

      const res = await fetch('/.netlify/functions/checker-get-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: allNames })
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const response = await res.json();
      setResults(response.results || []);
      setSummary(response.summary || null);
    } catch (err: any) {
      setError(err.message || 'Failed to check interactions');
    } finally {
      setLoading(false);
    }
  }

  function toggleExpanded(resultKey: string) {
    const newSet = new Set(expandedResults);
    if (newSet.has(resultKey)) {
      newSet.delete(resultKey);
    } else {
      newSet.add(resultKey);
    }
    setExpandedResults(newSet);
  }

  // STRICT: Only allow check if NO pending text and minimum selections met
  const hasPendingText = suppInput.trim().length > 0 || medInput.trim().length > 0;
  const canCheck = !hasPendingText && (
    mode === 'supplements-drugs'
      ? (supplements.length > 0 && medications.length > 0)
      : supplements.length >= 2
  );

  const groupedResults: Record<string, Interaction[]> = {
    avoid: [],
    caution: [],
    monitor: [],
    info: []
  };

  (results || []).forEach(result => {
    groupedResults[result.severity].push(result);
  });

  const renderSuggestionDropdown = (
    suggestions: Substance[],
    fuzzy: Substance[],
    highlighted: number,
    onSelect: (s: Substance) => void,
    isLoading: boolean,
    error: string
  ) => {
    const hasSuggestions = suggestions.length > 0;
    const hasFuzzy = fuzzy.length > 0;
    const showDropdown = hasSuggestions || hasFuzzy || error;

    if (!showDropdown) return null;

    return (
      <div className="absolute z-10 w-full mt-1 rounded-lg shadow-lg border-2 overflow-hidden" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
        {isLoading && (
          <div className="px-4 py-3 flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Searching...</span>
          </div>
        )}

        {hasSuggestions && (
          <div>
            {suggestions.map((sugg, idx) => (
              <button
                key={sugg.substance_id}
                onClick={() => onSelect(sugg)}
                className="w-full text-left px-4 py-2.5 hover:bg-purple-50 first:rounded-t-lg transition-colors"
                style={{ background: idx === highlighted ? '#f3e5f5' : 'transparent' }}
              >
                <div className="font-medium" style={{ color: 'var(--color-text)' }}>{sugg.display_name}</div>
                {sugg.aliases.length > 0 && (
                  <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    Also known as: {sugg.aliases.slice(0, 2).join(', ')}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {hasFuzzy && !hasSuggestions && (
          <div>
            <div className="px-4 py-2 text-xs font-semibold" style={{ color: 'var(--color-text-muted)', background: 'var(--color-surface)' }}>
              Did you mean:
            </div>
            {fuzzy.map((sugg, idx) => (
              <button
                key={sugg.substance_id}
                onClick={() => onSelect(sugg)}
                className="w-full text-left px-4 py-2.5 hover:bg-purple-50 last:rounded-b-lg transition-colors"
                style={{ background: idx === highlighted ? '#f3e5f5' : 'transparent' }}
              >
                <div className="font-medium" style={{ color: 'var(--color-text)' }}>{sugg.display_name}</div>
                {sugg.aliases.length > 0 && (
                  <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    Also known as: {sugg.aliases.slice(0, 2).join(', ')}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {error && !hasSuggestions && !hasFuzzy && (
          <div className="px-4 py-3 text-sm" style={{ color: '#D32F2F', background: '#FFEBEE' }}>
            {error}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          Advanced Interaction Checker
        </h1>
        <p className="text-lg mb-2" style={{ color: 'var(--color-text-muted)' }}>
          Build your complete stack and check for all possible interactions
        </p>
        <p className="text-sm max-w-2xl mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Add multiple supplements and medications to analyze all interaction pairs in one comprehensive check
        </p>

        {/* Database Coverage Stats */}
        {dbStats && (
          <div className="inline-flex items-center gap-4 px-4 py-2 rounded-lg text-sm" style={{ background: '#E3F2FD', border: '1px solid #64B5F6' }}>
            <div className="flex items-center gap-1.5">
              <Info className="w-4 h-4" style={{ color: '#1976D2' }} />
              <span style={{ color: '#1565C0' }}>
                <strong>{dbStats.supplements !== null ? dbStats.supplements.toLocaleString() : '3,000+'}</strong> supplements
              </span>
            </div>
            <div className="h-4 w-px" style={{ background: '#64B5F6' }} />
            <div className="flex items-center gap-1.5">
              <span style={{ color: '#1565C0' }}>
                <strong>{dbStats.drugs !== null ? dbStats.drugs.toLocaleString() : '1,500+'}</strong> medications
              </span>
            </div>
            <div className="h-4 w-px" style={{ background: '#64B5F6' }} />
            <div className="flex items-center gap-1.5">
              <span style={{ color: '#1565C0' }}>
                <strong>{dbStats.interactions.toLocaleString()}</strong> interactions
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mode Toggle */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-lg p-1" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}>
          <button
            onClick={() => {
              setMode('supplements-drugs');
              setMedications([]);
              setResults(null);
              setSummary(null);
              setError(null);
            }}
            className="px-6 py-2.5 rounded-lg text-base font-semibold transition-all"
            style={{
              background: mode === 'supplements-drugs' ? '#7c3aed' : 'transparent',
              color: mode === 'supplements-drugs' ? 'white' : 'var(--color-text)'
            }}
          >
            Supplements + Prescription Medicines
          </button>
          <button
            onClick={() => {
              setMode('supplements-supplements');
              setMedications([]);
              setResults(null);
              setSummary(null);
              setError(null);
            }}
            className="px-6 py-2.5 rounded-lg text-base font-semibold transition-all"
            style={{
              background: mode === 'supplements-supplements' ? '#7c3aed' : 'transparent',
              color: mode === 'supplements-supplements' ? 'white' : 'var(--color-text)'
            }}
          >
            Supplements + Supplements
          </button>
        </div>
      </div>

      {/* Mode Description */}
      <div className="mb-6 max-w-3xl mx-auto text-center">
        {mode === 'supplements-drugs' ? (
          <p className="text-sm px-4 py-3 rounded-lg" style={{ background: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
            Check interactions between your supplements and prescription medications. Add as many as you like to see all possible interaction pairs.
          </p>
        ) : (
          <p className="text-sm px-4 py-3 rounded-lg" style={{ background: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
            Check interactions between multiple supplements. Some supplements can interact with each other, affecting absorption or effectiveness.
          </p>
        )}
      </div>

      {/* Stack Builder */}
      {mode === 'supplements-drugs' ? (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Supplements Section */}
          <div className="rounded-xl p-6" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: '#7c3aed' }} />
              Supplements
            </h3>

            <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
              {supplements.map(supp => (
                <div key={supp.substance_id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: '#7c3aed', color: 'white' }}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {supp.display_name}
                  <button onClick={() => removeSupplement(supp.substance_id)} className="hover:bg-white/20 rounded-full p-0.5" aria-label={`Remove ${supp.display_name}`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
              {suppLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin" style={{ color: 'var(--color-text-muted)' }} />
              )}
              <input
                ref={suppInputRef}
                type="text"
                value={suppInput}
                onChange={(e) => setSuppInput(e.target.value)}
                onKeyDown={handleSuppKeyDown}
                placeholder="Type to search..."
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border-2 text-base"
                style={{ borderColor: suppInputError ? '#EF5350' : 'var(--color-border)', background: 'var(--color-bg)' }}
              />

              {renderSuggestionDropdown(suppSuggestions, suppFuzzy, suppHighlighted, addSupplement, suppLoading, suppInputError)}

              {suppShowWarning && suppInput.trim() && suppSuggestions.length === 0 && suppFuzzy.length === 0 && !suppLoading && (
                <div className="mt-2 text-xs" style={{ color: '#E65100' }}>
                  💡 Please select an item from the suggestions list
                </div>
              )}
              {suppInputError && (
                <div className="mt-2 text-xs font-medium" style={{ color: '#EF5350' }}>
                  {suppInputError}
                </div>
              )}
            </div>
          </div>

          {/* Medications Section */}
          <div className="rounded-xl p-6" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: '#0891b2' }} />
              Prescription Medicines
            </h3>

            <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
              {medications.map(med => (
                <div key={med.substance_id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: '#0891b2', color: 'white' }}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {med.display_name}
                  <button onClick={() => removeMedication(med.substance_id)} className="hover:bg-white/20 rounded-full p-0.5" aria-label={`Remove ${med.display_name}`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
              {medLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin" style={{ color: 'var(--color-text-muted)' }} />
              )}
              <input
                ref={medInputRef}
                type="text"
                value={medInput}
                onChange={(e) => setMedInput(e.target.value)}
                onKeyDown={handleMedKeyDown}
                placeholder="Type to search..."
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border-2 text-base"
                style={{ borderColor: medInputError ? '#EF5350' : 'var(--color-border)', background: 'var(--color-bg)' }}
              />

              {renderSuggestionDropdown(medSuggestions, medFuzzy, medHighlighted, addMedication, medLoading, medInputError)}

              {medShowWarning && medInput.trim() && medSuggestions.length === 0 && medFuzzy.length === 0 && !medLoading && (
                <div className="mt-2 text-xs" style={{ color: '#E65100' }}>
                  💡 Please select an item from the suggestions list
                </div>
              )}
              {medInputError && (
                <div className="mt-2 text-xs font-medium" style={{ color: '#EF5350' }}>
                  {medInputError}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div className="rounded-xl p-6 max-w-2xl mx-auto" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: '#7c3aed' }} />
              Supplements
            </h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
              Add 2 or more supplements to compare
            </p>

            <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
              {supplements.map(supp => (
                <div key={supp.substance_id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: '#7c3aed', color: 'white' }}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {supp.display_name}
                  <button onClick={() => removeSupplement(supp.substance_id)} className="hover:bg-white/20 rounded-full p-0.5" aria-label={`Remove ${supp.display_name}`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
              {suppLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin" style={{ color: 'var(--color-text-muted)' }} />
              )}
              <input
                ref={suppInputRef}
                type="text"
                value={suppInput}
                onChange={(e) => setSuppInput(e.target.value)}
                onKeyDown={handleSuppKeyDown}
                placeholder="Type to search..."
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border-2 text-base"
                style={{ borderColor: suppInputError ? '#EF5350' : 'var(--color-border)', background: 'var(--color-bg)' }}
              />

              {renderSuggestionDropdown(suppSuggestions, suppFuzzy, suppHighlighted, addSupplement, suppLoading, suppInputError)}

              {suppShowWarning && suppInput.trim() && suppSuggestions.length === 0 && suppFuzzy.length === 0 && !suppLoading && (
                <div className="mt-2 text-xs" style={{ color: '#E65100' }}>
                  💡 Please select an item from the suggestions list
                </div>
              )}
              {suppInputError && (
                <div className="mt-2 text-xs font-medium" style={{ color: '#EF5350' }}>
                  {suppInputError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Run Check Button */}
      <div className="text-center mb-8">
        <button
          onClick={runCheck}
          disabled={!canCheck || loading}
          className="btn-cta px-8 py-3.5 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? 'Checking...' : 'Run Check'}
        </button>
        {!canCheck && hasPendingText && (
          <p className="text-sm mt-2 font-medium" style={{ color: '#EF5350' }}>
            Please select items from the dropdown or clear the input fields
          </p>
        )}
        {!canCheck && !hasPendingText && (
          <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
            {mode === 'supplements-drugs'
              ? 'Add at least 1 supplement AND 1 prescription medicine'
              : 'Add at least 2 supplements to compare'}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="rounded-xl p-8 text-center" style={{ background: '#E3F2FD', border: '2px solid #64B5F6' }}>
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3" style={{ color: '#1976D2' }} />
          <p className="font-semibold text-lg" style={{ color: '#1565C0' }}>Checking interactions...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="rounded-xl p-6" style={{ background: '#FFEBEE', border: '2px solid #EF5350' }}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#C62828' }} />
            <div>
              <h3 className="font-bold mb-1" style={{ color: '#C62828' }}>Error</h3>
              <p className="text-sm" style={{ color: '#B71C1C' }}>{error}</p>
              <button onClick={runCheck} className="btn-outline mt-3">Retry</button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {results && summary && !loading && (
        <div>
          {/* Global Trust Statement */}
          <GlobalTrustStatement />

          <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              Check Complete
            </h2>
            <p className="text-base mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Found {summary.total} interaction{summary.total !== 1 ? 's' : ''} in {mode === 'supplements-drugs' ? 'Supplements + Medicines mode' : 'Supplements + Supplements mode'}.
            </p>
            <div className="flex flex-wrap gap-3">
              {summary.avoid > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: SEVERITY_CONFIG.avoid.bgColor, border: `1px solid ${SEVERITY_CONFIG.avoid.borderColor}` }}>
                  <AlertTriangle className="w-4 h-4" style={{ color: SEVERITY_CONFIG.avoid.textColor }} />
                  <span className="font-semibold text-sm" style={{ color: SEVERITY_CONFIG.avoid.textColor }}>
                    {summary.avoid} {SEVERITY_CONFIG.avoid.label}
                  </span>
                </div>
              )}
              {summary.caution > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: SEVERITY_CONFIG.caution.bgColor, border: `1px solid ${SEVERITY_CONFIG.caution.borderColor}` }}>
                  <AlertCircle className="w-4 h-4" style={{ color: SEVERITY_CONFIG.caution.textColor }} />
                  <span className="font-semibold text-sm" style={{ color: SEVERITY_CONFIG.caution.textColor }}>
                    {summary.caution} {SEVERITY_CONFIG.caution.label}
                  </span>
                </div>
              )}
              {summary.monitor > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: SEVERITY_CONFIG.monitor.bgColor, border: `1px solid ${SEVERITY_CONFIG.monitor.borderColor}` }}>
                  <Info className="w-4 h-4" style={{ color: SEVERITY_CONFIG.monitor.textColor }} />
                  <span className="font-semibold text-sm" style={{ color: SEVERITY_CONFIG.monitor.textColor }}>
                    {summary.monitor} {SEVERITY_CONFIG.monitor.label}
                  </span>
                </div>
              )}
              {summary.info > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: SEVERITY_CONFIG.info.bgColor, border: `1px solid ${SEVERITY_CONFIG.info.borderColor}` }}>
                  <Info className="w-4 h-4" style={{ color: SEVERITY_CONFIG.info.textColor }} />
                  <span className="font-semibold text-sm" style={{ color: SEVERITY_CONFIG.info.textColor }}>
                    {summary.info} {SEVERITY_CONFIG.info.label}
                  </span>
                </div>
              )}
              {summary.total === 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: SEVERITY_CONFIG.none.bgColor, border: `1px solid ${SEVERITY_CONFIG.none.borderColor}` }}>
                  <CheckCircle2 className="w-4 h-4" style={{ color: SEVERITY_CONFIG.none.textColor }} />
                  <span className="font-semibold text-sm" style={{ color: SEVERITY_CONFIG.none.textColor }}>
                    No Known Interactions
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* No Interactions Found - Detailed Explanation */}
          {summary.total === 0 && (
            <div className="rounded-xl p-6 mb-6" style={{ background: SEVERITY_CONFIG.none.bgColor, border: '2px solid ' + SEVERITY_CONFIG.none.borderColor }}>
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

          {(['avoid', 'caution', 'monitor', 'info'] as const).map(severity => {
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
                  {items.map(interaction => {
                    const resultKey = interaction.interaction_id;
                    const isExpanded = expandedResults.has(resultKey);

                    return (
                      <div key={resultKey} className="rounded-lg p-5" style={{ background: config.bgColor, border: `2px solid ${config.borderColor}` }}>
                        {/* Confidence Badge */}
                        <ConfidenceBadge level={severity} showExplanation={false} />

                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1" style={{ color: config.textColor }}>
                              {getSubstanceLabel(interaction.substance_a, 'Unknown')} <span className="text-xs font-normal">({getSubstanceType(interaction.substance_a)})</span> + {getSubstanceLabel(interaction.substance_b, 'Unknown')} <span className="text-xs font-normal">({getSubstanceType(interaction.substance_b)})</span>
                            </h4>
                            <p className="text-base" style={{ color: config.textColor }}>
                              {interaction.summary_short || 'No summary available'}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleExpanded(resultKey)}
                            className="flex-shrink-0 p-2 rounded-lg hover:bg-black/5 transition-colors"
                            aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" style={{ color: config.textColor }} />
                            ) : (
                              <ChevronDown className="w-5 h-5" style={{ color: config.textColor }} />
                            )}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t space-y-3" style={{ borderColor: config.borderColor }}>
                            {interaction.mechanism && (
                              <div>
                                <h5 className="font-semibold mb-1" style={{ color: config.textColor }}>Mechanism:</h5>
                                <p className="text-sm" style={{ color: config.textColor }}>{interaction.mechanism}</p>
                              </div>
                            )}
                            {interaction.clinical_effect && (
                              <div>
                                <h5 className="font-semibold mb-1" style={{ color: config.textColor }}>Clinical Effect:</h5>
                                <p className="text-sm" style={{ color: config.textColor }}>{interaction.clinical_effect}</p>
                              </div>
                            )}
                            {interaction.management && (
                              <div>
                                <h5 className="font-semibold mb-1" style={{ color: config.textColor }}>Management:</h5>
                                <p className="text-sm" style={{ color: config.textColor }}>{interaction.management}</p>
                              </div>
                            )}
                            {interaction.citations && Array.isArray(interaction.citations) && interaction.citations.length > 0 && (
                              <div>
                                <h5 className="font-semibold mb-2" style={{ color: config.textColor }}>Citations:</h5>
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

                            {/* Confidence Metadata - Collapsible */}
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
        </div>
      )}
    </div>
  );
}
