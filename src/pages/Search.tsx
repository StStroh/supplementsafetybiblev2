import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, Shield, ChevronLeft, Search as SearchIcon, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import Autocomplete from '../components/Autocomplete';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import SeverityBadge from '../components/check/SeverityBadge';
import { useIsPremium } from '../lib/useAuth';
import { SEO } from '../lib/seo';
import { trackBehavior } from '../lib/salesIntent';
import { matchIntent } from '../lib/intentMatcher';

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
  const initialQuery = searchParams.get('q') || searchParams.get('query') || searchParams.get('term') || searchParams.get('s') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchCount, setSearchCount] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [intentMatch, setIntentMatch] = useState<ReturnType<typeof matchIntent> | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const redirectTimer = useRef<NodeJS.Timeout | null>(null);
  const isPremium = useIsPremium();

  const FREE_SEARCH_LIMIT = 3;
  const FREE_RESULTS_PREVIEW = 3;

  useEffect(() => {
    const handleInteraction = () => setUserInteracted(true);

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('click', handleInteraction);

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (initialQuery) {
      const match = matchIntent(initialQuery);
      setIntentMatch(match);

      if (match.intent === 'epo_seizure_caution') {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'intent_match', {
            intent: match.intent,
            score: match.score,
            matched_terms_count: match.matched.length,
            query_length: initialQuery.length,
          });
        } else if (process.env.NODE_ENV === 'development') {
          console.log('[Intent Match]', {
            intent: match.intent,
            score: match.score,
            matched: match.matched,
            query: initialQuery,
          });
        }

        if (!userInteracted) {
          redirectTimer.current = setTimeout(() => {
            if (!userInteracted) {
              navigate(`/evening-primrose-oil-seizure-risk-epilepsy-phenothiazines?from=search&q=${encodeURIComponent(initialQuery)}`);
            }
          }, 800);
        }
      }
    }

    return () => {
      if (redirectTimer.current) {
        clearTimeout(redirectTimer.current);
      }
    };
  }, [initialQuery, userInteracted, navigate]);

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

      trackBehavior({
        event_type: 'search',
        search_terms: [searchQuery]
      }).catch(() => {});
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

  const handleContinueToSafetyPage = () => {
    if (redirectTimer.current) {
      clearTimeout(redirectTimer.current);
    }
    navigate(`/evening-primrose-oil-seizure-risk-epilepsy-phenothiazines?from=search&q=${encodeURIComponent(initialQuery)}`);
  };

  const handleDismissIntent = () => {
    if (redirectTimer.current) {
      clearTimeout(redirectTimer.current);
    }
    setIntentMatch(null);
    setUserInteracted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Search Interactions | Supplement Safety Bible"
        description="Search our database of 2,500+ supplement-medication interactions. Get instant safety information and recommendations."
        canonical="/search"
        noindex={true}
      />
      <nav className="bg-white border-b border-[#DCE3ED] sticky top-0 z-10" style={{boxShadow: '0 1px 4px rgba(0,0,0,0.04)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-[#4A4A4A] hover:text-[#5E3B76] transition"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="ml-1">Back</span>
              </button>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-[#000000]">Don't Mix Blind</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {intentMatch?.intent === 'epo_seizure_caution' && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Related Safety Topic Found
                </h3>
                <p className="text-gray-700 mb-4">
                  We found a dedicated safety page related to your search: <span className="font-medium">"{initialQuery}"</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleContinueToSafetyPage}
                    className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    View Safety Page
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  <button
                    onClick={handleDismissIntent}
                    className="px-5 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                  >
                    See All Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <Filter className="w-5 h-5 text-[#4A4A4A]" />
              <span className="text-sm font-medium text-[#000000]">Severity:</span>
            </div>
            <div className="flex space-x-2 flex-wrap">
              {['all', 'low', 'moderate', 'high', 'severe'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSeverityFilter(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    severityFilter === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-[#4A4A4A] hover:bg-[#F4F8FF] border border-[#DCE3ED]'
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
          <div className="bg-[#FFEBEE] border border-[#B00020]/20 rounded-lg p-4 text-[#B00020]">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {!isPremium && searchCount > 0 && (
              <div className="mb-4 p-3 bg-[#F4F8FF] border border-[#DCE3ED] rounded-lg text-sm text-[#4A4A4A]">
                Free searches used: {Math.min(searchCount, FREE_SEARCH_LIMIT)} / {FREE_SEARCH_LIMIT}
                {isLimitReached && (
                  <span className="ml-2 font-semibold">Showing preview only.</span>
                )}
              </div>
            )}

            <div className="mb-4 text-sm text-[#4A4A4A]">
              {filteredInteractions.length} interaction{filteredInteractions.length !== 1 ? 's' : ''} found
            </div>

            {displayedInteractions.length > 0 ? (
              <>
                <div className="grid gap-4">
                  {displayedInteractions.map((interaction) => (
                    <div key={interaction.id} className="bg-white rounded-lg border border-[#DCE3ED] p-6 transition" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#000000] mb-2">
                            {interaction.supplement_name} + {interaction.medication_name}
                          </h3>
                          <SeverityBadge severity={interaction.severity as 'low' | 'moderate' | 'high' | 'severe'} />
                        </div>
                      </div>
                      <p className="text-[#4A4A4A] mb-3">{interaction.description}</p>
                      <p className="text-sm text-[#4A4A4A] italic">{interaction.recommendation}</p>
                    </div>
                  ))}
                </div>

                {isLimitReached && filteredInteractions.length > FREE_RESULTS_PREVIEW && (
                  <div className="mt-8 bg-[#F4F8FF] rounded-xl p-8 text-center border-2 border-[#DCE3ED]">
                    <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#000000] mb-2">
                      Unlock Full Results
                    </h3>
                    <p className="text-[#4A4A4A] mb-6">
                      You've reached your free search limit. Upgrade to Premium to see all {filteredInteractions.length} interactions and get unlimited searches.
                    </p>
                    <button
                      onClick={() => navigate('/pricing')}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Start Premium
                    </button>
                    <p className="text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>
                      60-day money-back guarantee · Change or cancel anytime · Individual use
                    </p>
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
              <div className="text-center py-12 text-[#4A4A4A]">
                <SearchIcon className="w-16 h-16 mx-auto mb-4 text-[#DCE3ED]" />
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
