import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, Shield, ChevronLeft, Search as SearchIcon } from 'lucide-react';
import Autocomplete from '../components/Autocomplete';
import ResultCard from '../components/ResultCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

interface Interaction {
  id: string;
  supplement_name: string;
  medication_name: string;
  severity: string;
  description: string;
}

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery || severityFilter !== 'all') {
      performSearch();
    } else {
      loadAllInteractions();
    }
  }, [searchQuery, severityFilter]);

  const loadAllInteractions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/.netlify/functions/search');
      if (!response.ok) throw new Error('Failed to load interactions');
      const data = await response.json();
      setInteractions(data.interactions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load interactions');
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (severityFilter !== 'all') params.set('severity', severityFilter);

      const response = await fetch(`/.netlify/functions/search?${params}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setInteractions(data.interactions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="ml-1">Back</span>
              </button>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">SafetyBible</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <Autocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelect={(value) => {
                setSearchQuery(value);
                setTimeout(performSearch, 100);
              }}
              placeholder="Search supplements or medications..."
            />
          </form>

          <div className="flex items-center space-x-4 flex-wrap">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Severity:</span>
            </div>
            <div className="flex space-x-2 flex-wrap">
              {['all', 'low', 'moderate', 'high', 'severe'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSeverityFilter(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    severityFilter === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && <Loading message="Searching interactions..." />}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {interactions.length} interaction{interactions.length !== 1 ? 's' : ''} found
            </div>

            {interactions.length > 0 ? (
              <div className="grid gap-4">
                {interactions.map((interaction) => (
                  <ResultCard
                    key={interaction.id}
                    interaction={interaction}
                    onClick={() => navigate(`/interaction/${interaction.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={SearchIcon}
                title="No interactions found"
                description="Try adjusting your search or filters"
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
