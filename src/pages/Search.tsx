import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, Shield, ChevronLeft, Search as SearchIcon, Lock } from 'lucide-react';
import Autocomplete from '../components/Autocomplete';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import SeverityBadge from '../components/check/SeverityBadge';
import { useIsPremium } from '../lib/useAuth';

interface Interaction {
  id: number;
  supplement_name: string;
  medication_name: string;
  severity: string;
  description: string;
  recommendation: string;
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
  const [searchCount, setSearchCount] = useState(0);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isPremium = useIsPremium();

  const FREE_SEARCH_LIMIT = 3;
  const FREE_RESULTS_PREVIEW = 3;

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchQuery.trim()) {
      debounceTimer.current = setTimeout(() => {
        performSearch();
      }, 500);
    } else {
      setInteractions([]);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);


  const performSearch = async () => {
    if (!searchQuery.trim()) {
      setInteractions([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/.netlify/functions/search-interactions?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setInteractions(data || []);

      if (!isPremium) {
        setSearchCount(prev => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    performSearch();
  };

  const filteredInteractions = severityFilter === 'all'
    ? interactions
    : interactions.filter(i => i.severity === severityFilter);

  const isLimitReached = !isPremium && searchCount >= FREE_SEARCH_LIMIT;
  const displayedInteractions = isLimitReached
    ? filteredInteractions.slice(0, FREE_RESULTS_PREVIEW)
    : filteredInteractions;

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
            {!isPremium && searchCount > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                Free searches used: {Math.min(searchCount, FREE_SEARCH_LIMIT)} / {FREE_SEARCH_LIMIT}
                {isLimitReached && (
                  <span className="ml-2 font-semibold">Showing preview only.</span>
                )}
              </div>
            )}

            <div className="mb-4 text-sm text-gray-600">
              {filteredInteractions.length} interaction{filteredInteractions.length !== 1 ? 's' : ''} found
            </div>

            {displayedInteractions.length > 0 ? (
              <>
                <div className="grid gap-4">
                  {displayedInteractions.map((interaction) => (
                    <div key={interaction.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {interaction.supplement_name} + {interaction.medication_name}
                          </h3>
                          <SeverityBadge severity={interaction.severity as 'low' | 'moderate' | 'high' | 'severe'} />
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{interaction.description}</p>
                      <p className="text-sm text-gray-600 italic">{interaction.recommendation}</p>
                    </div>
                  ))}
                </div>

                {isLimitReached && filteredInteractions.length > FREE_RESULTS_PREVIEW && (
                  <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center border-2 border-blue-200">
                    <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Unlock Full Results
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You've reached your free search limit. Upgrade to Premium to see all {filteredInteractions.length} interactions and get unlimited searches.
                    </p>
                    <button
                      onClick={() => navigate('/pricing')}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Start Premium
                    </button>
                  </div>
                )}
              </>
            ) : searchQuery.trim() ? (
              <EmptyState
                icon={SearchIcon}
                title="No interactions found"
                description="Try adjusting your search or filters"
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <SearchIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Enter a search query to find interactions</p>
                <p className="text-sm mt-2">Example: "warfarin + ginkgo" or "ibuprofen"</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
