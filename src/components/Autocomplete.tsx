import { useState, useEffect, useRef, useId, forwardRef, useImperativeHandle } from 'react';
import { Search } from 'lucide-react';
import '../styles/autocomplete.css';

interface AutocompleteProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  placeholder?: string;
  label?: string;
  suggestions?: Suggestion[];
  type?: 'supplement' | 'medication';
}

interface Suggestion {
  id?: string;
  name: string;
  type?: 'supplement' | 'medication';
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(({ id, value, onChange, onSelect, placeholder, label, suggestions: propSuggestions, type }, ref) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const committingRef = useRef(false);
  const listboxId = useId();

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value.length >= 2 && propSuggestions && propSuggestions.length > 0) {
      const searchTerm = value.toLowerCase();
      const filtered = propSuggestions
        .filter(s => s.name.toLowerCase().includes(searchTerm))
        .slice(0, 10)
        .map(s => ({ ...s, type: s.type || type }));
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestion(filtered.length > 0 ? 0 : -1);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }
  }, [value, propSuggestions, type]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      if (filteredSuggestions.length > 0) {
        setShowSuggestions(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        filteredSuggestions.length > 0 ? (prev + 1) % filteredSuggestions.length : -1
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        filteredSuggestions.length > 0 ? (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length : -1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && activeSuggestion >= 0 && filteredSuggestions[activeSuggestion]) {
        committingRef.current = true;
        selectSuggestion(filteredSuggestions[activeSuggestion].name);
      }
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (name: string) => {
    onChange(name);
    onSelect(name);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    committingRef.current = false;
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div ref={wrapperRef} className="autocomplete relative">
      {label && (
        <label className="ac__label block mb-2 font-semibold text-sm" style={{color: 'var(--color-text)'}}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && filteredSuggestions.length > 0 && setShowSuggestions(true)}
          onBlur={(e) => {
            if (committingRef.current) {
              e.preventDefault();
              committingRef.current = false;
              requestAnimationFrame(() => inputRef.current?.focus());
              return;
            }
            setShowSuggestions(false);
          }}
          placeholder={placeholder || 'Search...'}
          className="ac__input w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none pl-14"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls={listboxId}
          aria-activedescendant={
            showSuggestions && activeSuggestion >= 0
              ? `${listboxId}-opt-${activeSuggestion}`
              : undefined
          }
          autoComplete="off"
          spellCheck={false}
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="ac__list absolute z-[60] w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.type}-${suggestion.name}-${index}`}
              id={`${listboxId}-opt-${index}`}
              role="option"
              aria-selected={index === activeSuggestion}
              tabIndex={-1}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                committingRef.current = true;
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                committingRef.current = true;
              }}
              onClick={() => selectSuggestion(suggestion.name)}
              className={`ac__item px-4 py-3 cursor-pointer flex items-center justify-between min-h-[44px] ${
                index === activeSuggestion ? 'bg-blue-50 is-active' : 'hover:bg-gray-50'
              }`}
            >
              <span className="ac__labelText text-gray-900 font-medium">{suggestion.name}</span>
              <span
                className={`ac__meta text-xs px-2 py-1 rounded-full ${
                  suggestion.type === 'supplement'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {suggestion.type}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
