import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';
import medicationsData from '../data/medications.min.json';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Medications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filteredMedications = useMemo(() => {
    let results = medicationsData;

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
        title="Medications A–Z — Supplement Safety Bible"
        description="Browse our comprehensive database of prescription and over-the-counter medications"
        canonical="/medications"
      />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Medications A–Z
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Browse our comprehensive database of prescription and over-the-counter medications
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search medications..."
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
          {filteredMedications.map(medication => (
            <a
              key={medication.id}
              href={`#${medication.id}`}
              className="card p-4 hover:shadow-md transition"
              style={{ textDecoration: 'none' }}
            >
              <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                {medication.name}
              </h3>
            </a>
          ))}
        </div>

        {filteredMedications.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: 'var(--color-text-muted)' }}>
              No medications found matching your search.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
