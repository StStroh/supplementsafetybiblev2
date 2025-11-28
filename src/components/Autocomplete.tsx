import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  placeholder?: string;
}

interface Suggestion {
  name: string;
  type: 'supplement' | 'medication';
}

export default function Autocomplete({ value, onChange, onSelect, placeholder }: AutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    if (value.length >= 2) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(`/.netlify/functions/autocomplete?q=${encodeURIComponent(value)}`);
      if (!response.ok) return;
      const data = await response.json();
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
      setActiveSuggestion(-1);
    } catch (err) {
      console.error('Autocomplete failed:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
        selectSuggestion(suggestions[activeSuggestion].name);
      } else if (value) {
        onSelect(value);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (name: string) => {
    onChange(name);
    onSelect(name);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder || 'Search...'}
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none pl-14"
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.name}-${index}`}
              onClick={() => selectSuggestion(suggestion.name)}
              className={`px-4 py-3 cursor-pointer flex items-center justify-between ${
                index === activeSuggestion ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-gray-900">{suggestion.name}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  suggestion.type === 'supplement'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {suggestion.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
