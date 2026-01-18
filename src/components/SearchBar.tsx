import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-4 text-lg rounded-xl focus:outline-none pl-14 transition"
          style={{ border: '2px solid var(--color-border)', color: 'var(--color-text)' }}
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
        <button
          type="submit"
          className="btn-cta absolute right-2 top-1/2 transform -translate-y-1/2"
          style={{ padding: '8px 24px' }}
        >
          Search
        </button>
      </div>
    </form>
  );
}
