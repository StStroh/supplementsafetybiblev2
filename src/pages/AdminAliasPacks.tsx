import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Trash2, AlertCircle, CheckCircle, Package } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

interface Substance {
  substance_id: string;
  type: 'drug' | 'supplement';
  display_name: string;
  canonical_name: string;
}

interface AliasPack {
  alias_id: string;
  brand_name: string;
  canonical_name: string;
  substance_id: string;
  created_at: string;
  is_active: boolean;
  notes: string | null;
}

interface AliasWithSubstance extends AliasPack {
  substance?: Substance;
}

export default function AdminAliasPacks() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Substance[]>([]);
  const [selectedSubstance, setSelectedSubstance] = useState<Substance | null>(null);
  const [aliases, setAliases] = useState<AliasPack[]>([]);
  const [allAliases, setAllAliases] = useState<AliasWithSubstance[]>([]);
  const [newBrandName, setNewBrandName] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [viewMode, setViewMode] = useState<'substance' | 'all'>('substance');

  useEffect(() => {
    const adminMode = import.meta.env.VITE_ADMIN_MODE;
    if (adminMode !== 'true') {
      navigate('/');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (viewMode === 'all') {
      loadAllAliases();
    }
  }, [viewMode]);

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

  useEffect(() => {
    const loadAliases = async () => {
      if (!selectedSubstance) {
        setAliases([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('alias_packs')
          .select('*')
          .eq('substance_id', selectedSubstance.substance_id)
          .eq('is_active', true)
          .order('brand_name');

        if (error) throw error;
        setAliases(data || []);
      } catch (error) {
        console.error('Error loading aliases:', error);
        setAliases([]);
      }
    };

    loadAliases();
  }, [selectedSubstance]);

  const loadAllAliases = async () => {
    try {
      const { data: aliasData, error } = await supabase
        .from('alias_packs')
        .select('*')
        .eq('is_active', true)
        .order('brand_name')
        .limit(200);

      if (error) throw error;

      const substanceIds = [...new Set((aliasData || []).map(a => a.substance_id))];
      const { data: substanceData } = await supabase
        .from('checker_substances')
        .select('*')
        .in('substance_id', substanceIds);

      const substanceMap = new Map((substanceData || []).map(s => [s.substance_id, s]));

      const enriched = (aliasData || []).map(alias => ({
        ...alias,
        substance: substanceMap.get(alias.substance_id)
      }));

      setAllAliases(enriched);
    } catch (error) {
      console.error('Error loading all aliases:', error);
      setAllAliases([]);
    }
  };

  const handleSelectSubstance = (substance: Substance) => {
    setSelectedSubstance(substance);
    setSearchQuery('');
    setSearchResults([]);
    setResultMessage(null);
    setViewMode('substance');
  };

  const handleAddAlias = async () => {
    if (!selectedSubstance || !newBrandName.trim()) return;

    setIsLoading(true);
    setResultMessage(null);

    try {
      const { error } = await supabase
        .from('alias_packs')
        .insert({
          brand_name: newBrandName.trim(),
          canonical_name: selectedSubstance.canonical_name,
          substance_id: selectedSubstance.substance_id,
          notes: newNotes.trim() || null,
          is_active: true
        });

      if (error) {
        if (error.code === '23505') {
          setResultMessage({
            type: 'error',
            text: `"${newBrandName}" already exists for this substance`
          });
        } else {
          throw error;
        }
      } else {
        setResultMessage({
          type: 'success',
          text: `Successfully added "${newBrandName}" → ${selectedSubstance.display_name}`
        });
        setNewBrandName('');
        setNewNotes('');

        const { data } = await supabase
          .from('alias_packs')
          .select('*')
          .eq('substance_id', selectedSubstance.substance_id)
          .eq('is_active', true)
          .order('brand_name');

        if (data) setAliases(data);
      }
    } catch (error) {
      console.error('Error adding alias:', error);
      setResultMessage({
        type: 'error',
        text: 'Failed to add alias. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAlias = async (aliasId: string, brandName: string) => {
    if (!confirm(`Delete alias "${brandName}"?`)) return;

    try {
      const { error } = await supabase
        .from('alias_packs')
        .update({ is_active: false })
        .eq('alias_id', aliasId);

      if (error) throw error;

      setAliases(aliases.filter(a => a.alias_id !== aliasId));
      setAllAliases(allAliases.filter(a => a.alias_id !== aliasId));
      setResultMessage({
        type: 'success',
        text: `Deleted "${brandName}"`
      });
    } catch (error) {
      console.error('Error deleting alias:', error);
      setResultMessage({
        type: 'error',
        text: 'Failed to delete alias.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Admin: Brand/Ingredient Alias Packs | Supplement Safety Bible"
        description="Manage brand name to generic substance mappings"
        canonical="/admin/alias-packs"
      />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text)' }}>
              Admin: Brand/Ingredient Alias Packs
            </h1>
          </div>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Map brand names to generic substances for smarter autocomplete (e.g., "Tylenol" → "acetaminophen")
          </p>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setViewMode('substance')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'substance'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            By Substance
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Aliases
          </button>
        </div>

        {viewMode === 'substance' ? (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-xl border-2 p-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                Search Substances
              </h2>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search substances..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', background: 'white' }}
                />
              </div>

              {selectedSubstance && (
                <div className="mb-4 p-4 rounded-lg border-2" style={{ borderColor: 'rgb(34, 197, 94)', background: 'rgba(34, 197, 94, 0.05)' }}>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgb(34, 197, 94)' }} />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                        Selected: {selectedSubstance.display_name}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {selectedSubstance.canonical_name}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isSearching && <div className="text-center py-8" style={{ color: 'var(--color-text-muted)' }}>Searching...</div>}

              {!isSearching && searchResults.length > 0 && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {searchResults.map((substance) => (
                    <button
                      key={substance.substance_id}
                      onClick={() => handleSelectSubstance(substance)}
                      className="w-full text-left p-3 rounded-lg border-2 transition-all hover:border-blue-500"
                      style={{ borderColor: 'var(--color-border)', background: 'white' }}
                    >
                      <div className="font-bold mb-1" style={{ color: 'var(--color-text)' }}>{substance.display_name}</div>
                      <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{substance.canonical_name}</div>
                    </button>
                  ))}
                </div>
              )}

              {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="text-center py-8" style={{ color: 'var(--color-text-muted)' }}>No substances found</div>
              )}

              {searchQuery.length < 2 && (
                <div className="text-center py-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Type at least 2 characters to search
                </div>
              )}
            </div>

            <div className="rounded-xl border-2 p-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Brand Name Aliases</h2>

              <div className="mb-6 space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder='e.g., "Tylenol", "Fish Oil"'
                    disabled={!selectedSubstance || isLoading}
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 disabled:opacity-50"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', background: 'white' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    Notes (optional)
                  </label>
                  <input
                    type="text"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="e.g., Common brand name"
                    disabled={!selectedSubstance || isLoading}
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 disabled:opacity-50"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', background: 'white' }}
                  />
                </div>

                <button
                  onClick={handleAddAlias}
                  disabled={!selectedSubstance || !newBrandName.trim() || isLoading}
                  className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: 'var(--color-primary)', color: 'white' }}
                >
                  {isLoading ? 'Adding...' : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Alias
                    </>
                  )}
                </button>

                {resultMessage && (
                  <div
                    className="p-3 rounded-lg flex items-start gap-2"
                    style={{
                      background: resultMessage.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: resultMessage.type === 'success' ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
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

              {selectedSubstance ? (
                <div>
                  <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--color-text)' }}>
                    Existing Aliases ({aliases.length})
                  </h3>
                  {aliases.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {aliases.map((alias) => (
                        <div
                          key={alias.alias_id}
                          className="flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-sm"
                          style={{ borderColor: 'var(--color-border)', background: 'white' }}
                        >
                          <div className="flex-1">
                            <div className="font-medium" style={{ color: 'var(--color-text)' }}>{alias.brand_name}</div>
                            {alias.notes && (
                              <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{alias.notes}</div>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteAlias(alias.alias_id, alias.brand_name)}
                            className="p-2 rounded hover:bg-red-50 transition-colors"
                            title="Delete alias"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      No aliases found for this substance
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Select a substance to view and manage aliases
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border-2 p-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              All Brand Name Aliases ({allAliases.length})
            </h2>
            {allAliases.length > 0 ? (
              <div className="space-y-2">
                {allAliases.map((alias) => (
                  <div
                    key={alias.alias_id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                    style={{ borderColor: 'var(--color-border)', background: 'white' }}
                  >
                    <div className="flex-1">
                      <div className="font-medium" style={{ color: 'var(--color-text)' }}>
                        {alias.brand_name} → {alias.substance?.display_name || alias.canonical_name}
                      </div>
                      {alias.notes && (
                        <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{alias.notes}</div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteAlias(alias.alias_id, alias.brand_name)}
                      className="p-2 rounded hover:bg-red-50 transition-colors"
                      title="Delete alias"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                No aliases found
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 rounded-lg border-2" style={{ borderColor: 'var(--color-border)', background: 'rgba(59, 130, 246, 0.05)' }}>
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgb(59, 130, 246)' }} />
            <div className="text-sm" style={{ color: 'var(--color-text)' }}>
              <div className="font-medium mb-1">About Alias Packs</div>
              <ul className="list-disc list-inside space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                <li>Maps brand/common names to generic substance names</li>
                <li>Improves autocomplete by understanding "Tylenol" → "acetaminophen"</li>
                <li>Each brand name must be unique per substance</li>
                <li>Changes appear immediately in autocomplete</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
