import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const conditionsData = [
  { id: 'cond-001', name: 'Anxiety' },
  { id: 'cond-002', name: 'Arthritis' },
  { id: 'cond-003', name: 'Asthma' },
  { id: 'cond-004', name: 'Depression' },
  { id: 'cond-005', name: 'Diabetes Type 2' },
  { id: 'cond-006', name: 'High Blood Pressure' },
  { id: 'cond-007', name: 'High Cholesterol' },
  { id: 'cond-008', name: 'Insomnia' },
  { id: 'cond-009', name: 'Migraine' },
  { id: 'cond-010', name: 'Osteoporosis' },
  { id: 'cond-011', name: 'Chronic Pain' },
  { id: 'cond-012', name: 'Hypothyroidism' },
  { id: 'cond-013', name: 'IBS' },
  { id: 'cond-014', name: 'GERD' },
  { id: 'cond-015', name: 'Cardiovascular Disease' },
];

export default function Conditions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filteredConditions = useMemo(() => {
    let results = conditionsData;

    if (selectedLetter) {
      results = results.filter(item =>
        item.name.toUpperCase().startsWith(selectedLetter)
      );
    }

    if (searchQuery) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return results.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedLetter]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <SEO
        title="Conditions A–Z — Supplement Safety Bible"
        description="Browse our comprehensive database of health conditions and supplement considerations"
        canonical="/conditions"
      />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Conditions A–Z
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Browse our comprehensive database of health conditions and supplement considerations
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search conditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border"
              style={{
                borderColor: 'var(--color-border)',
                background: 'white',
                color: 'var(--color-text)'
              }}
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLetter(null)}
            className={`px-3 py-1.5 text-sm font-medium rounded transition ${
              selectedLetter === null
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
            style={{ border: '1px solid var(--color-border)' }}
          >
            All
          </button>
          {ALPHABET.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition ${
                selectedLetter === letter
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
              style={{ border: '1px solid var(--color-border)' }}
              aria-label={`Filter by letter ${letter}`}
            >
              {letter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {filteredConditions.map(condition => (
            <a
              key={condition.id}
              href={`#${condition.id}`}
              className="card p-4 hover:shadow-md transition"
              style={{ textDecoration: 'none' }}
            >
              <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                {condition.name}
              </h3>
            </a>
          ))}
        </div>

        {filteredConditions.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: 'var(--color-text-muted)' }}>
              No conditions found matching your search.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
