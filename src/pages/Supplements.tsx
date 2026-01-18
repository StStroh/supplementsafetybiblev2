import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';
import supplementsData from '../data/supplements.min.json';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Supplements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filteredSupplements = useMemo(() => {
    let results = supplementsData;

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
        title="Supplements A–Z — Supplement Safety Bible"
        description="Browse our comprehensive database of dietary supplements and natural products"
        canonical="/supplements"
      />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Supplements A–Z
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Browse our comprehensive database of dietary supplements and natural products
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search supplements..."
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
          {filteredSupplements.map(supplement => (
            <a
              key={supplement.id}
              href={`#${supplement.id}`}
              className="card p-4 hover:shadow-md transition"
              style={{ textDecoration: 'none' }}
            >
              <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                {supplement.name}
              </h3>
            </a>
          ))}
        </div>

        {filteredSupplements.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: 'var(--color-text-muted)' }}>
              No supplements found matching your search.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
