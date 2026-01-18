import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Loader2, CheckCircle2, X, Pill, Sparkles } from 'lucide-react';
import { SearchCache } from '../lib/searchCache';

interface Substance {
  substance_id: string;
  display_name: string;
  canonical_name: string;
  type: 'supplement' | 'drug';
  aliases: string[];
  match_score?: number;
}

// Singleton cache shared across all instances
const searchCache = new SearchCache<Substance[]>(10, 60000);

interface SubstanceComboboxProps {
  kind?: 'supplement' | 'drug';
  label: string;
  placeholder?: string;
  value: Substance | null;
  onChange: (value: Substance | null) => void;
  onNotFound?: (rawInput: string, kind: string, suggestions: Substance[]) => void;
  disabled?: boolean;
}

// Helper: Highlight matched prefix in text (React-safe with stable structure)
function highlightMatch(text: string, query: string) {
  if (!query.trim()) return <span key="text-only">{text}</span>;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return <span key="text-only">{text}</span>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <span key="highlighted">
      {before && <span key="before">{before}</span>}
      <span key="match" style={{ background: '#fef3c7', fontWeight: 600 }}>
        {match}
      </span>
      {after && <span key="after">{after}</span>}
    </span>
  );
}

export default function SubstanceCombobox({
  kind,
  label,
  placeholder,
  value,
  onChange,
  onNotFound,
  disabled,
}: SubstanceComboboxProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Substance[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  // Fetch suggestions from API with caching (150ms debounce)
  useEffect(() => {
    setError('');
    setShowWarning(false);

    // Clear suggestions if input is empty
    if (input.trim().length < 1) {
      setSuggestions([]);
      setShowDropdown(false);
      setLoading(false);
      return;
    }

    // Check cache first
    const cacheKey = `${kind}:${input.toLowerCase().trim()}`;
    const cached = searchCache.get(cacheKey);

    if (cached) {
      setSuggestions(cached);
      setShowDropdown(cached.length > 0);
      setHighlighted(0);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Debounce API calls (150ms for snappy feel)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        // Create new abort controller
        abortControllerRef.current = new AbortController();

        const typeParam = kind ? `&type=${kind}` : '';
        const response = await fetch(
          `/.netlify/functions/checker-autocomplete?q=${encodeURIComponent(input)}${typeParam}&limit=12`,
          { signal: abortControllerRef.current.signal }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMsg = errorData.error || errorData.detail || 'Search failed';
          throw new Error(`${response.status}: ${errorMsg}`);
        }

        const data = await response.json();
        if (data.ok && Array.isArray(data.results)) {
          // Cache successful results
          searchCache.set(cacheKey, data.results);

          setSuggestions(data.results);
          setShowDropdown(data.results.length > 0);
          setHighlighted(0);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      } catch (err: any) {
        // Ignore abort errors
        if (err.name !== 'AbortError') {
          console.error('[SubstanceCombobox] Search error:', err);
          setSuggestions([]);
          setShowDropdown(false);

          // Show detailed error message for debugging
          if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
            setError('Unable to load suggestions. Please check your connection.');
          } else if (err.message.includes('500')) {
            setError(`Server error: ${err.message}`);
          } else if (err.message.includes('404')) {
            setError('Autocomplete endpoint not found. Check deployment.');
          } else {
            setError(`Error: ${err.message}`);
          }
        }
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [input, kind]);

  // Handle selection
  const handleSelect = (substance: Substance) => {
    onChange(substance);
    setInput('');
    setSuggestions([]);
    setShowDropdown(false);
    setError('');
    setShowWarning(false);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (suggestions.length > 0) {
        // Auto-select the highlighted suggestion (or first if none highlighted)
        const toSelect = highlighted >= 0 && highlighted < suggestions.length
          ? suggestions[highlighted]
          : suggestions[0];
        handleSelect(toSelect);
      } else if (input.trim().length > 0) {
        // No match found - show inline warning, trigger "not found" flow
        setError('No match found. Try a different spelling.');
        setShowWarning(true);

        if (onNotFound) {
          onNotFound(input.trim(), kind || 'substance', suggestions);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted(Math.min(highlighted + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted(Math.max(highlighted - 1, 0));
    } else if (e.key === 'Escape') {
      setInput('');
      setSuggestions([]);
      setShowDropdown(false);
      setError('');
      setShowWarning(false);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Label */}
      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
        {label}
      </label>

      {/* Selected value pill */}
      {value && (
        <div
          className="mb-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{
            background: kind === 'supplement' ? '#7c3aed' : '#0891b2',
            color: 'white',
          }}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          {value.display_name}
          <button
            onClick={() => onChange(null)}
            className="hover:bg-white/20 rounded-full p-0.5"
            aria-label={`Remove ${value.display_name}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input field */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
          style={{ color: 'var(--color-text-muted)' }}
        />
        {loading && (
          <Loader2
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin"
            style={{ color: 'var(--color-text-muted)' }}
          />
        )}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          onFocus={() => {
            // Show existing suggestions or trigger search if input exists
            if (suggestions.length > 0) {
              setShowDropdown(true);
            } else if (input.trim().length >= 1) {
              // Trigger search by updating state
              setInput(input.trim());
            }
          }}
          placeholder={placeholder || (kind === 'supplement' ? 'Type supplement name (e.g., Magnesium)' : 'Type medication name (e.g., Warfarin)')}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border-2 text-base"
          style={{
            borderColor: error ? '#EF5350' : 'var(--color-border)',
            background: 'var(--color-bg)',
          }}
        />

        {/* Dropdown - Instant suggestions with type badges and highlighting */}
        {showDropdown && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute w-full mt-1 rounded-lg shadow-lg border-2 overflow-hidden"
            style={{
              background: 'var(--color-bg)',
              borderColor: 'var(--color-border)',
              maxHeight: '300px',
              overflowY: 'auto',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 9999,
            }}
          >
            {suggestions.map((suggestion, idx) => {
              const isDrug = suggestion.type === 'drug';
              const TypeIcon = isDrug ? Pill : Sparkles;

              return (
                <button
                  key={suggestion.substance_id}
                  onClick={() => handleSelect(suggestion)}
                  className="w-full text-left px-4 py-2.5 hover:bg-purple-50 transition-colors"
                  style={{
                    background: idx === highlighted ? '#f3e5f5' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 font-medium" style={{ color: 'var(--color-text)' }}>
                      {highlightMatch(suggestion.display_name, input)}
                    </div>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: isDrug ? '#e0f2fe' : '#f3e8ff',
                        color: isDrug ? '#0891b2' : '#7c3aed',
                      }}
                    >
                      <TypeIcon className="w-3 h-3" />
                      {isDrug ? 'Drug' : 'Supplement'}
                    </span>
                  </div>
                  {suggestion.aliases.length > 0 && (
                    <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      Also known as: {suggestion.aliases.slice(0, 2).join(', ')}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Helpful inline hints - NEVER blocking */}
      {input.trim() && !loading && (
        <div className="mt-2 text-xs" style={{ color: '#666' }}>
          {suggestions.length > 0 ? (
            <span>💡 Pick a suggestion or press Enter to use the top match</span>
          ) : input.length >= 2 ? (
            <span>⚠️ No match found. Try a different spelling.</span>
          ) : null}
        </div>
      )}
      {error && (
        <div className="mt-2 text-xs font-medium" style={{ color: '#EF5350' }}>
          {error}
        </div>
      )}
    </div>
  );
}
