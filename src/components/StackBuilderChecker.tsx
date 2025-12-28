import { useState, useRef, useEffect } from 'react';
import { X, Search, AlertTriangle, AlertCircle, Info, CheckCircle2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

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

export default function StackBuilderChecker() {
  const [mode, setMode] = useState<CheckerMode>('supplements-drugs');
  const [supplements, setSupplements] = useState<Substance[]>([]);
  const [medications, setMedications] = useState<Substance[]>([]);

  const [suppInput, setSuppInput] = useState('');
  const [medInput, setMedInput] = useState('');

  const [suppSuggestions, setSuppSuggestions] = useState<Substance[]>([]);
  const [medSuggestions, setMedSuggestions] = useState<Substance[]>([]);

  const [suppHighlighted, setSuppHighlighted] = useState(0);
  const [medHighlighted, setMedHighlighted] = useState(0);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Interaction[] | null>(null);
  const [summary, setSummary] = useState<CheckSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());

  const suppInputRef = useRef<HTMLInputElement>(null);
  const medInputRef = useRef<HTMLInputElement>(null);

  // Debounced autocomplete for supplements
  useEffect(() => {
    if (suppInput.length < 2) {
      setSuppSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/.netlify/functions/checker-autocomplete?q=${encodeURIComponent(suppInput)}&type=supplement`);
        const data = await res.json();
        setSuppSuggestions(data.results || []);
        setSuppHighlighted(0);
      } catch (err) {
        console.error('Autocomplete error:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [suppInput]);

  // Debounced autocomplete for medications
  useEffect(() => {
    if (medInput.length < 2) {
      setMedSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/.netlify/functions/checker-autocomplete?q=${encodeURIComponent(medInput)}&type=drug`);
        const data = await res.json();
        setMedSuggestions(data.results || []);
        setMedHighlighted(0);
      } catch (err) {
        console.error('Autocomplete error:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [medInput]);

  function addSupplement(substance: Substance) {
    if (!supplements.find(s => s.substance_id === substance.substance_id)) {
      setSupplements([...supplements, substance]);
    }
    setSuppInput('');
    setSuppSuggestions([]);
    suppInputRef.current?.focus();
  }

  function addMedication(substance: Substance) {
    if (!medications.find(m => m.substance_id === substance.substance_id)) {
      setMedications([...medications, substance]);
    }
    setMedInput('');
    setMedSuggestions([]);
    medInputRef.current?.focus();
  }

  function removeSupplement(id: string) {
    setSupplements(supplements.filter(s => s.substance_id !== id));
  }

  function removeMedication(id: string) {
    setMedications(medications.filter(m => m.substance_id !== id));
  }

  function handleSuppKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && suppSuggestions.length > 0) {
      e.preventDefault();
      addSupplement(suppSuggestions[suppHighlighted]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSuppHighlighted(Math.min(suppHighlighted + 1, suppSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSuppHighlighted(Math.max(suppHighlighted - 1, 0));
    } else if (e.key === 'Backspace' && suppInput === '' && supplements.length > 0) {
      removeSupplement(supplements[supplements.length - 1].substance_id);
    }
  }

  function handleMedKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && medSuggestions.length > 0) {
      e.preventDefault();
      addMedication(medSuggestions[medHighlighted]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setMedHighlighted(Math.min(medHighlighted + 1, medSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setMedHighlighted(Math.max(medHighlighted - 1, 0));
    } else if (e.key === 'Backspace' && medInput === '' && medications.length > 0) {
      removeMedication(medications[medications.length - 1].substance_id);
    }
  }

  async function runCheck() {
    const allItems = [
      ...supplements.map(s => s.substance_id),
      ...medications.map(m => m.substance_id)
    ];

    // Validation based on mode
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

    try {
      const res = await fetch('/.netlify/functions/checker-get-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: allItems })
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

  // Validation for "Run Check" button
  const canCheck = mode === 'supplements-drugs'
    ? supplements.length > 0 && medications.length > 0
    : supplements.length >= 2;

  // Group results by severity
  const groupedResults: Record<string, Interaction[]> = {
    avoid: [],
    caution: [],
    monitor: [],
    info: []
  };

  (results || []).forEach(result => {
    groupedResults[result.severity].push(result);
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          Advanced Interaction Checker
        </h1>
        <p className="text-lg mb-2" style={{ color: 'var(--color-text-muted)' }}>
          Build your complete stack and check for all possible interactions
        </p>
        <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          Add multiple supplements and medications to analyze all interaction pairs in one comprehensive check
        </p>
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

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
              {supplements.map(supp => (
                <div key={supp.substance_id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: '#7c3aed', color: 'white' }}>
                  {supp.display_name}
                  <button onClick={() => removeSupplement(supp.substance_id)} className="hover:bg-white/20 rounded-full p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
              <input
                ref={suppInputRef}
                type="text"
                value={suppInput}
                onChange={(e) => setSuppInput(e.target.value)}
                onKeyDown={handleSuppKeyDown}
                placeholder="Search supplements..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 text-base"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
              />

              {/* Suggestions Dropdown */}
              {suppSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 rounded-lg shadow-lg border-2" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                  {suppSuggestions.map((sugg, idx) => (
                    <button
                      key={sugg.substance_id}
                      onClick={() => addSupplement(sugg)}
                      className="w-full text-left px-4 py-2.5 hover:bg-purple-50 first:rounded-t-lg last:rounded-b-lg"
                      style={{ background: idx === suppHighlighted ? '#f3e5f5' : 'transparent' }}
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
            </div>
          </div>

          {/* Medications Section */}
          <div className="rounded-xl p-6" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: '#0891b2' }} />
              Prescription Medicines
            </h3>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
              {medications.map(med => (
                <div key={med.substance_id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: '#0891b2', color: 'white' }}>
                  {med.display_name}
                  <button onClick={() => removeMedication(med.substance_id)} className="hover:bg-white/20 rounded-full p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
              <input
                ref={medInputRef}
                type="text"
                value={medInput}
                onChange={(e) => setMedInput(e.target.value)}
                onKeyDown={handleMedKeyDown}
                placeholder="Search medications..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 text-base"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
              />

              {/* Suggestions Dropdown */}
              {medSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 rounded-lg shadow-lg border-2" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                  {medSuggestions.map((sugg, idx) => (
                    <button
                      key={sugg.substance_id}
                      onClick={() => addMedication(sugg)}
                      className="w-full text-left px-4 py-2.5 hover:bg-cyan-50 first:rounded-t-lg last:rounded-b-lg"
                      style={{ background: idx === medHighlighted ? '#cffafe' : 'transparent' }}
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
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          {/* Supplements Only Mode */}
          <div className="rounded-xl p-6 max-w-2xl mx-auto" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)' }}>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: '#7c3aed' }} />
              Supplements
            </h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
              Add 2 or more supplements to compare
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
              {supplements.map(supp => (
                <div key={supp.substance_id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: '#7c3aed', color: 'white' }}>
                  {supp.display_name}
                  <button onClick={() => removeSupplement(supp.substance_id)} className="hover:bg-white/20 rounded-full p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
              <input
                ref={suppInputRef}
                type="text"
                value={suppInput}
                onChange={(e) => setSuppInput(e.target.value)}
                onKeyDown={handleSuppKeyDown}
                placeholder="Search supplements..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 text-base"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
              />

              {/* Suggestions Dropdown */}
              {suppSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 rounded-lg shadow-lg border-2" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                  {suppSuggestions.map((sugg, idx) => (
                    <button
                      key={sugg.substance_id}
                      onClick={() => addSupplement(sugg)}
                      className="w-full text-left px-4 py-2.5 hover:bg-purple-50 first:rounded-t-lg last:rounded-b-lg"
                      style={{ background: idx === suppHighlighted ? '#f3e5f5' : 'transparent' }}
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
        {!canCheck && (
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
          {/* Summary */}
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
                    No Interactions Found
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Grouped Results */}
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
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1" style={{ color: config.textColor }}>
                              {interaction.substance_a.name} <span className="text-xs font-normal">({interaction.substance_a.type})</span> + {interaction.substance_b.name} <span className="text-xs font-normal">({interaction.substance_b.type})</span>
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
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" style={{ color: config.textColor }} />
                            ) : (
                              <ChevronDown className="w-5 h-5" style={{ color: config.textColor }} />
                            )}
                          </button>
                        </div>

                        {/* Expanded Details */}
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
                            {interaction.evidence_grade && (
                              <div className="flex gap-4 text-sm">
                                <div>
                                  <span className="font-semibold" style={{ color: config.textColor }}>Evidence Grade:</span>{' '}
                                  <span style={{ color: config.textColor }}>{interaction.evidence_grade}</span>
                                </div>
                                {interaction.confidence && (
                                  <div>
                                    <span className="font-semibold" style={{ color: config.textColor }}>Confidence:</span>{' '}
                                    <span style={{ color: config.textColor }}>{interaction.confidence}</span>
                                  </div>
                                )}
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
