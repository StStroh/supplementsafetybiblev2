import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Play, CheckCircle, AlertTriangle, Info, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../lib/seo';

interface TokenPack {
  id: string;
  name: string;
  description: string;
  tokens: PackToken[];
}

interface PackToken {
  raw: string;
  targetSubstanceId?: string;
  suggestedSearch?: string;
}

interface ProcessedToken {
  raw: string;
  normalized: string;
  targetSubstanceId: string;
  targetDisplayName: string;
  status: 'new' | 'conflict';
  conflictSubstanceId?: string;
  conflictDisplayName?: string;
}

interface Substance {
  substance_id: string;
  display_name: string;
  canonical_name: string;
  type: 'drug' | 'supplement';
}

const PRESET_PACKS: TokenPack[] = [
  {
    id: 'otc-brands',
    name: 'OTC Drug Brands',
    description: 'Common over-the-counter medication brand names',
    tokens: [
      { raw: 'Tylenol', suggestedSearch: 'acetaminophen' },
      { raw: 'Advil', suggestedSearch: 'ibuprofen' },
      { raw: 'Motrin', suggestedSearch: 'ibuprofen' },
      { raw: 'Aleve', suggestedSearch: 'naproxen' },
      { raw: 'Benadryl', suggestedSearch: 'diphenhydramine' },
      { raw: 'Claritin', suggestedSearch: 'loratadine' },
      { raw: 'Zyrtec', suggestedSearch: 'cetirizine' },
      { raw: 'Pepcid', suggestedSearch: 'famotidine' },
      { raw: 'Zantac', suggestedSearch: 'ranitidine' },
      { raw: 'Prilosec', suggestedSearch: 'omeprazole' },
      { raw: 'Nexium', suggestedSearch: 'esomeprazole' },
      { raw: 'Mucinex', suggestedSearch: 'guaifenesin' },
    ],
  },
  {
    id: 'supplement-aliases',
    name: 'Common Supplement Aliases',
    description: 'Popular alternative names for supplements',
    tokens: [
      { raw: 'fish oil', suggestedSearch: 'omega-3' },
      { raw: 'omega 3', suggestedSearch: 'omega-3' },
      { raw: 'mag glycinate', suggestedSearch: 'magnesium' },
      { raw: 'magnesium glycinate', suggestedSearch: 'magnesium' },
      { raw: 'mag citrate', suggestedSearch: 'magnesium' },
      { raw: 'magnesium citrate', suggestedSearch: 'magnesium' },
      { raw: 'vit d', suggestedSearch: 'vitamin d' },
      { raw: 'vit d3', suggestedSearch: 'vitamin d' },
      { raw: 'vitamin d3', suggestedSearch: 'vitamin d' },
      { raw: 'cholecalciferol', suggestedSearch: 'vitamin d' },
      { raw: 'vit c', suggestedSearch: 'vitamin c' },
      { raw: 'ascorbic acid', suggestedSearch: 'vitamin c' },
      { raw: 'vit b12', suggestedSearch: 'vitamin b12' },
      { raw: 'cobalamin', suggestedSearch: 'vitamin b12' },
      { raw: 'methylcobalamin', suggestedSearch: 'vitamin b12' },
      { raw: 'coq10', suggestedSearch: 'coenzyme q10' },
      { raw: 'ubiquinone', suggestedSearch: 'coenzyme q10' },
    ],
  },
  {
    id: 'common-misspellings',
    name: 'Common Misspellings',
    description: 'Typical spelling errors and variations',
    tokens: [
      { raw: 'tumeric', suggestedSearch: 'turmeric' },
      { raw: 'curcuma', suggestedSearch: 'turmeric' },
      { raw: 'ginko', suggestedSearch: 'ginkgo' },
      { raw: 'ginko biloba', suggestedSearch: 'ginkgo' },
      { raw: 'st johns wort', suggestedSearch: 'st john\'s wort' },
      { raw: 'st john wort', suggestedSearch: 'st john\'s wort' },
      { raw: 'ashwaganda', suggestedSearch: 'ashwagandha' },
      { raw: 'melatonine', suggestedSearch: 'melatonin' },
    ],
  },
];

export default function AdminTokenPacks() {
  const navigate = useNavigate();
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [processedTokens, setProcessedTokens] = useState<ProcessedToken[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [substances, setSubstances] = useState<Substance[]>([]);
  const [result, setResult] = useState<{
    inserted: number;
    skipped: number;
    conflicts: number;
  } | null>(null);

  useEffect(() => {
    const adminMode = import.meta.env.VITE_ADMIN_MODE;
    if (adminMode !== 'true') {
      navigate('/');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    loadSubstances();
  }, []);

  const loadSubstances = async () => {
    try {
      const { data, error } = await supabase
        .from('checker_substances')
        .select('substance_id, display_name, canonical_name, type')
        .eq('is_active', true)
        .order('display_name');

      if (error) throw error;
      setSubstances(data || []);
    } catch (error) {
      console.error('Error loading substances:', error);
    }
  };

  const normalizeToken = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, ' ');
  };

  const handleDryRun = async () => {
    if (!selectedPackId) return;

    setIsProcessing(true);
    setResult(null);

    try {
      const pack = PRESET_PACKS.find((p) => p.id === selectedPackId);
      if (!pack) return;

      const processed: ProcessedToken[] = [];

      for (const token of pack.tokens) {
        const normalized = normalizeToken(token.raw);

        let targetSubstanceId = token.targetSubstanceId;
        let targetDisplayName = '';

        if (!targetSubstanceId && token.suggestedSearch) {
          const searchResult = await supabase.rpc('rpc_search_substances', {
            q: token.suggestedSearch,
            limit_n: 1,
          });

          if (searchResult.data && searchResult.data.length > 0) {
            targetSubstanceId = searchResult.data[0].substance_id;
            targetDisplayName = searchResult.data[0].display_name;
          }
        } else if (targetSubstanceId) {
          const substance = substances.find((s) => s.substance_id === targetSubstanceId);
          targetDisplayName = substance?.display_name || '';
        }

        if (!targetSubstanceId) {
          continue;
        }

        const { data: existingToken } = await supabase
          .from('checker_substance_tokens')
          .select('substance_id')
          .eq('token', normalized)
          .maybeSingle();

        if (existingToken) {
          const conflictSubstance = substances.find(
            (s) => s.substance_id === existingToken.substance_id
          );

          processed.push({
            raw: token.raw,
            normalized,
            targetSubstanceId,
            targetDisplayName,
            status: 'conflict',
            conflictSubstanceId: existingToken.substance_id,
            conflictDisplayName: conflictSubstance?.display_name || existingToken.substance_id,
          });
        } else {
          processed.push({
            raw: token.raw,
            normalized,
            targetSubstanceId,
            targetDisplayName,
            status: 'new',
          });
        }
      }

      setProcessedTokens(processed);
    } catch (error) {
      console.error('Error during dry run:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyPack = async () => {
    if (!selectedPackId || processedTokens.length === 0) return;

    setIsApplying(true);

    try {
      let inserted = 0;
      let skipped = 0;
      let conflicts = 0;

      for (const token of processedTokens) {
        if (token.status === 'conflict') {
          conflicts++;
          continue;
        }

        try {
          const { data, error } = await supabase.rpc('rpc_add_alias_token', {
            token_raw: token.raw,
            target_substance_id: token.targetSubstanceId,
          });

          if (error) throw error;

          if (data && data.status === 'ok') {
            inserted++;
          } else {
            skipped++;
          }
        } catch (error) {
          console.error(`Failed to insert token ${token.raw}:`, error);
          skipped++;
        }
      }

      setResult({ inserted, skipped, conflicts });
      setProcessedTokens([]);
      setSelectedPackId(null);
    } catch (error) {
      console.error('Error applying pack:', error);
    } finally {
      setIsApplying(false);
    }
  };

  const handleSubstanceChange = (index: number, substanceId: string) => {
    const newProcessed = [...processedTokens];
    const substance = substances.find((s) => s.substance_id === substanceId);
    if (substance) {
      newProcessed[index].targetSubstanceId = substanceId;
      newProcessed[index].targetDisplayName = substance.display_name;
    }
    setProcessedTokens(newProcessed);
  };

  const selectedPack = PRESET_PACKS.find((p) => p.id === selectedPackId);
  const newTokensCount = processedTokens.filter((t) => t.status === 'new').length;
  const conflictsCount = processedTokens.filter((t) => t.status === 'conflict').length;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Admin: Token Packs | Supplement Safety Bible"
        description="Bulk alias token creation"
        canonical="/admin/token-packs"
      />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Admin: Token Packs
          </h1>
          <p className="text-slate-600">Bulk create alias tokens from preset packs</p>
        </div>

        {result && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">Pack Applied Successfully</p>
                <p className="text-sm text-green-800 mt-1">
                  Inserted: {result.inserted} | Skipped: {result.skipped} | Conflicts: {result.conflicts}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Preset Packs</h2>
            <div className="space-y-3">
              {PRESET_PACKS.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => {
                    setSelectedPackId(pack.id);
                    setProcessedTokens([]);
                    setResult(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedPackId === pack.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Package
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        selectedPackId === pack.id ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <div>
                      <p
                        className={`font-semibold ${
                          selectedPackId === pack.id ? 'text-blue-900' : 'text-slate-900'
                        }`}
                      >
                        {pack.name}
                      </p>
                      <p
                        className={`text-sm mt-1 ${
                          selectedPackId === pack.id ? 'text-blue-700' : 'text-slate-600'
                        }`}
                      >
                        {pack.description}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          selectedPackId === pack.id ? 'text-blue-600' : 'text-slate-500'
                        }`}
                      >
                        {pack.tokens.length} tokens
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {!selectedPack ? (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
                <Info className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600">Select a preset pack to begin</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">
                    {selectedPack.name}
                    {processedTokens.length > 0 && (
                      <span className="text-sm font-normal text-slate-600 ml-3">
                        {newTokensCount} new, {conflictsCount} conflicts
                      </span>
                    )}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDryRun}
                      disabled={isProcessing || isApplying}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      Dry Run
                    </button>
                    {processedTokens.length > 0 && newTokensCount > 0 && (
                      <button
                        onClick={handleApplyPack}
                        disabled={isApplying}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isApplying ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        Apply Pack
                      </button>
                    )}
                  </div>
                </div>

                {processedTokens.length === 0 ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <p className="text-sm text-slate-600 mb-4">
                      This pack contains {selectedPack.tokens.length} tokens. Click "Dry Run" to check for
                      conflicts.
                    </p>
                    <div className="space-y-2">
                      {selectedPack.tokens.map((token, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-white rounded border border-slate-200"
                        >
                          <span className="text-sm font-mono text-slate-700">{token.raw}</span>
                          {token.suggestedSearch && (
                            <span className="text-xs text-slate-500">→ {token.suggestedSearch}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                              Token (Raw)
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                              Normalized
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                              Target Substance
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {processedTokens.map((token, idx) => (
                            <tr key={idx}>
                              <td className="px-4 py-3 text-sm font-mono text-slate-900">{token.raw}</td>
                              <td className="px-4 py-3 text-sm font-mono text-slate-600">
                                {token.normalized}
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  value={token.targetSubstanceId}
                                  onChange={(e) => handleSubstanceChange(idx, e.target.value)}
                                  className="text-sm border border-slate-300 rounded px-2 py-1 w-full max-w-xs"
                                >
                                  <option value={token.targetSubstanceId}>
                                    {token.targetDisplayName}
                                  </option>
                                  {substances
                                    .filter((s) => s.substance_id !== token.targetSubstanceId)
                                    .slice(0, 50)
                                    .map((s) => (
                                      <option key={s.substance_id} value={s.substance_id}>
                                        {s.display_name}
                                      </option>
                                    ))}
                                </select>
                              </td>
                              <td className="px-4 py-3">
                                {token.status === 'new' ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                                    <CheckCircle className="w-3 h-3" />
                                    New
                                  </span>
                                ) : (
                                  <div>
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">
                                      <AlertTriangle className="w-3 h-3" />
                                      Conflict
                                    </span>
                                    {token.conflictDisplayName && (
                                      <p className="text-xs text-slate-600 mt-1">
                                        Exists: {token.conflictDisplayName}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
