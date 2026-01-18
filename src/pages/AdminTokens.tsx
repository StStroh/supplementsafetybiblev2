import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Copy, Check, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

interface Substance {
  substance_id: string;
  type: 'drug' | 'supplement';
  display_name: string;
  canonical_name: string;
  aliases: string[];
  is_active: boolean;
}

interface Token {
  token_id: number;
  substance_id: string;
  token: string;
  created_at: string;
}

interface AddTokenResult {
  status: 'ok' | 'conflict' | 'error';
  message: string;
  existing_substance_id?: string;
  existing_display_name?: string;
  normalized_token?: string;
  token?: string;
  substance_id?: string;
}

export default function AdminTokens() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Substance[]>([]);
  const [selectedSubstance, setSelectedSubstance] = useState<Substance | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [newToken, setNewToken] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<{
    type: 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);

  // Check admin mode flag and read query param
  useEffect(() => {
    const adminMode = import.meta.env.VITE_ADMIN_MODE;
    if (adminMode !== 'true') {
      navigate('/');
      return;
    }

    // Auto-fill search from query param
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q');
    if (qParam) {
      setSearchQuery(qParam);
      // Clear param from URL
      window.history.replaceState({}, '', '/admin/tokens');
    }
  }, [navigate]);

  // Search substances
  useEffect(() => {
    const searchSubstances = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const { data, error } = await supabase.rpc('rpc_search_substances', {
          q: searchQuery,
          limit_n: 20
        });

        if (error) throw error;
        setSearchResults(data || []);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchSubstances, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Load tokens for selected substance
  useEffect(() => {
    const loadTokens = async () => {
      if (!selectedSubstance) {
        setTokens([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('checker_substance_tokens')
          .select('*')
          .eq('substance_id', selectedSubstance.substance_id)
          .order('token')
          .limit(200);

        if (error) throw error;
        setTokens(data || []);
      } catch (error) {
        console.error('Error loading tokens:', error);
        setTokens([]);
      }
    };

    loadTokens();
  }, [selectedSubstance]);

  const handleSelectSubstance = (substance: Substance) => {
    setSelectedSubstance(substance);
    setSearchQuery('');
    setSearchResults([]);
    setResultMessage(null);
  };

  const handleAddToken = async () => {
    if (!selectedSubstance || !newToken.trim()) return;

    setIsLoading(true);
    setResultMessage(null);

    try {
      const { data, error } = await supabase.rpc('rpc_add_alias_token', {
        token_raw: newToken.trim(),
        target_substance_id: selectedSubstance.substance_id
      });

      if (error) throw error;

      const result = data as AddTokenResult;

      if (result.status === 'ok') {
        setResultMessage({
          type: 'success',
          text: result.message
        });
        setNewToken('');

        // Reload tokens
        const { data: tokensData } = await supabase
          .from('checker_substance_tokens')
          .select('*')
          .eq('substance_id', selectedSubstance.substance_id)
          .order('token')
          .limit(200);

        if (tokensData) setTokens(tokensData);
      } else if (result.status === 'conflict') {
        setResultMessage({
          type: 'warning',
          text: result.message
        });
      } else {
        setResultMessage({
          type: 'error',
          text: result.message
        });
      }
    } catch (error) {
      console.error('Error adding token:', error);
      setResultMessage({
        type: 'error',
        text: 'Failed to add token. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToken = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Admin: Token Manager | Supplement Safety Bible"
        description="Manage substance alias tokens"
        canonical="/admin/tokens"
      />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Admin: Token Manager
          </h1>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Search substances and manage alias tokens for autocomplete
          </p>
        </div>

        {/* Two-panel layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel: Substance Search */}
          <div
            className="rounded-xl border-2 p-6"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg)'
            }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              Search Substances
            </h2>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'var(--color-text-muted)' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search substances..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                  background: 'white'
                }}
              />
            </div>

            {/* Selected Substance Display */}
            {selectedSubstance && (
              <div
                className="mb-4 p-4 rounded-lg border-2"
                style={{
                  borderColor: 'rgb(34, 197, 94)',
                  background: 'rgba(34, 197, 94, 0.05)'
                }}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgb(34, 197, 94)' }} />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                      Selected: {selectedSubstance.display_name}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {selectedSubstance.substance_id}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {isSearching && (
              <div className="text-center py-8" style={{ color: 'var(--color-text-muted)' }}>
                Searching...
              </div>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {searchResults.map((substance) => (
                  <button
                    key={substance.substance_id}
                    onClick={() => handleSelectSubstance(substance)}
                    className="w-full text-left p-3 rounded-lg border-2 transition-all hover:border-blue-500 hover:shadow-sm"
                    style={{
                      borderColor: 'var(--color-border)',
                      background: 'white'
                    }}
                  >
                    <div className="font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                      {substance.display_name}
                    </div>
                    <div className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
                      {substance.canonical_name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          background: substance.type === 'drug' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                          color: substance.type === 'drug' ? 'rgb(59, 130, 246)' : 'rgb(34, 197, 94)'
                        }}
                      >
                        {substance.type}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {substance.substance_id}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="text-center py-8" style={{ color: 'var(--color-text-muted)' }}>
                No substances found
              </div>
            )}

            {searchQuery.length < 2 && (
              <div className="text-center py-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Type at least 2 characters to search
              </div>
            )}
          </div>

          {/* Right Panel: Add Token & Token List */}
          <div
            className="rounded-xl border-2 p-6"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg)'
            }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              Alias Tokens
            </h2>

            {/* Add Token Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                New alias (what users will type)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newToken}
                  onChange={(e) => setNewToken(e.target.value)}
                  placeholder='e.g., "Tylenol"'
                  disabled={!selectedSubstance || isLoading}
                  className="flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                    background: 'white'
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading && selectedSubstance && newToken.trim()) {
                      handleAddToken();
                    }
                  }}
                />
                <button
                  onClick={handleAddToken}
                  disabled={!selectedSubstance || !newToken.trim() || isLoading}
                  className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  style={{
                    background: 'var(--color-primary)',
                    color: 'white'
                  }}
                >
                  {isLoading ? (
                    <>Loading...</>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add
                    </>
                  )}
                </button>
              </div>

              {/* Result Message */}
              {resultMessage && (
                <div
                  className="mt-3 p-3 rounded-lg flex items-start gap-2"
                  style={{
                    background: resultMessage.type === 'success'
                      ? 'rgba(34, 197, 94, 0.1)'
                      : resultMessage.type === 'warning'
                      ? 'rgba(245, 158, 11, 0.1)'
                      : 'rgba(239, 68, 68, 0.1)',
                    color: resultMessage.type === 'success'
                      ? 'rgb(34, 197, 94)'
                      : resultMessage.type === 'warning'
                      ? 'rgb(245, 158, 11)'
                      : 'rgb(239, 68, 68)'
                  }}
                >
                  {resultMessage.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm">{resultMessage.text}</span>
                </div>
              )}
            </div>

            {/* Token List */}
            {selectedSubstance ? (
              <div>
                <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--color-text)' }}>
                  Existing Tokens ({tokens.length})
                </h3>
                {tokens.length > 0 ? (
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {tokens.map((token) => (
                      <div
                        key={token.token_id}
                        className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-sm font-mono" style={{ color: 'var(--color-text)' }}>
                          {token.token}
                        </span>
                        <button
                          onClick={() => handleCopyToken(token.token)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded transition-all hover:bg-gray-200"
                          title="Copy token"
                        >
                          {copiedToken === token.token ? (
                            <Check className="w-4 h-4" style={{ color: 'rgb(34, 197, 94)' }} />
                          ) : (
                            <Copy className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    No tokens found for this substance
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Select a substance to view and manage tokens
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div
          className="mt-6 p-4 rounded-lg border-2"
          style={{
            borderColor: 'var(--color-border)',
            background: 'rgba(59, 130, 246, 0.05)'
          }}
        >
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgb(59, 130, 246)' }} />
            <div className="text-sm" style={{ color: 'var(--color-text)' }}>
              <div className="font-medium mb-1">About Token Management</div>
              <ul className="list-disc list-inside space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                <li>Tokens are automatically normalized (lowercased, trimmed, special chars removed)</li>
                <li>Each token can only map to one substance (unique constraint)</li>
                <li>Tokens are used for autocomplete matching in the interaction checker</li>
                <li>Display names, canonical names, and aliases are automatically indexed as tokens</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
