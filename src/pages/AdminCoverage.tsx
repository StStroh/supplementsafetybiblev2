import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AlertCircle, TrendingUp, Database, FileQuestion, Filter, Plus, HelpCircle } from 'lucide-react';

interface MissingToken {
  token: string;
  cnt: number;
}

interface PriorityItem {
  substance_id: string;
  display_name: string;
  type: string;
  canonical_name: string;
  request_count: number;
  interaction_count: number;
  priority_score: number;
}

interface RequestedInteraction {
  token: string;
  raw_input_sample: string;
  request_count: number;
  last_requested: string;
}

interface SubstanceCount {
  substance_id: string;
  display_name: string;
  type: string;
  canonical_name: string;
  interaction_count: number;
}

interface ZeroCoverageSubstance {
  substance_id: string;
  display_name: string;
  type: string;
  canonical_name: string;
}

type TypeFilter = 'all' | 'supplement' | 'drug';
type CoverageFilter = 'all' | 'zero' | 'low';

export default function AdminCoverage() {
  const navigate = useNavigate();
  const isAdminMode = import.meta.env.VITE_ADMIN_MODE === 'true';

  const [missingTokens, setMissingTokens] = useState<MissingToken[]>([]);
  const [priorityQueue, setPriorityQueue] = useState<PriorityItem[]>([]);
  const [requestedInteractions, setRequestedInteractions] = useState<RequestedInteraction[]>([]);
  const [lowCoverageSubstances, setLowCoverageSubstances] = useState<SubstanceCount[]>([]);
  const [zeroCoverageSubstances, setZeroCoverageSubstances] = useState<ZeroCoverageSubstance[]>([]);

  const [loadingMissingTokens, setLoadingMissingTokens] = useState(true);
  const [loadingPriority, setLoadingPriority] = useState(true);
  const [loadingRequested, setLoadingRequested] = useState(true);
  const [loadingLowCoverage, setLoadingLowCoverage] = useState(true);
  const [loadingZeroCoverage, setLoadingZeroCoverage] = useState(true);

  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [coverageFilter, setCoverageFilter] = useState<CoverageFilter>('all');

  useEffect(() => {
    if (!isAdminMode) {
      navigate('/');
      return;
    }

    fetchMissingTokens();
    fetchPriorityQueue();
    fetchRequestedInteractions();
    fetchLowCoverageSubstances();
    fetchZeroCoverageSubstances();
  }, [isAdminMode, navigate, typeFilter, coverageFilter]);

  const fetchMissingTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('v_requested_tokens_missing')
        .select('*')
        .order('cnt', { ascending: false })
        .order('token', { ascending: true })
        .limit(50);

      if (error) throw error;
      setMissingTokens(data || []);
    } catch (error) {
      console.error('Error fetching missing tokens:', error);
    } finally {
      setLoadingMissingTokens(false);
    }
  };

  const fetchPriorityQueue = async () => {
    try {
      const { data, error } = await supabase
        .from('v_coverage_priority')
        .select('*')
        .limit(50);

      if (error) throw error;
      setPriorityQueue(data || []);
    } catch (error) {
      console.error('Error fetching priority queue:', error);
    } finally {
      setLoadingPriority(false);
    }
  };

  const fetchRequestedInteractions = async () => {
    try {
      const { data, error } = await supabase
        .from('v_requested_interactions')
        .select('*')
        .limit(50);

      if (error) throw error;
      setRequestedInteractions(data || []);
    } catch (error) {
      console.error('Error fetching requested interactions:', error);
    } finally {
      setLoadingRequested(false);
    }
  };

  const fetchLowCoverageSubstances = async () => {
    try {
      let query = supabase
        .from('v_substance_interaction_counts')
        .select('*');

      // Apply type filter
      if (typeFilter !== 'all') {
        query = query.eq('type', typeFilter);
      }

      // Apply coverage filter
      if (coverageFilter === 'zero') {
        query = query.eq('interaction_count', 0);
      } else if (coverageFilter === 'low') {
        query = query.lte('interaction_count', 2).gt('interaction_count', 0);
      } else {
        query = query.lte('interaction_count', 2);
      }

      query = query.limit(100);

      const { data, error } = await query;

      if (error) throw error;
      setLowCoverageSubstances(data || []);
    } catch (error) {
      console.error('Error fetching low coverage substances:', error);
    } finally {
      setLoadingLowCoverage(false);
    }
  };

  const fetchZeroCoverageSubstances = async () => {
    try {
      let query = supabase
        .from('v_zero_coverage_substances')
        .select('*');

      // Apply type filter
      if (typeFilter !== 'all') {
        query = query.eq('type', typeFilter);
      }

      query = query.limit(100);

      const { data, error } = await query;

      if (error) throw error;
      setZeroCoverageSubstances(data || []);
    } catch (error) {
      console.error('Error fetching zero coverage substances:', error);
    } finally {
      setLoadingZeroCoverage(false);
    }
  };

  const getTypeBadgeColor = (type: string) => {
    return type === 'drug'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-green-100 text-green-700';
  };

  const getPriorityLevel = (score: number | null | undefined): 'High' | 'Medium' | 'Low' => {
    if (score === null || score === undefined) return 'Low';
    if (score >= 1.0) return 'High';
    if (score >= 0.5) return 'Medium';
    return 'Low';
  };

  const getPriorityBadgeColor = (level: 'High' | 'Medium' | 'Low') => {
    switch (level) {
      case 'High':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border border-amber-300';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border border-slate-300';
    }
  };

  const getPriorityRowStyle = (level: 'High' | 'Medium' | 'Low') => {
    switch (level) {
      case 'High':
        return 'bg-blue-50 hover:bg-blue-100';
      case 'Medium':
        return 'bg-amber-50/50 hover:bg-amber-100/50';
      case 'Low':
        return 'hover:bg-slate-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReviewClick = (token: string) => {
    // Navigate to checker with token prefilled in both fields
    navigate(`/check?a=${encodeURIComponent(token)}&b=${encodeURIComponent(token)}`);
  };

  const handleAddInteractionClick = (substanceName: string) => {
    // Navigate to admin tokens with search prefilled
    navigate(`/admin/tokens?q=${encodeURIComponent(substanceName)}`);
  };

  const handleCreateTokenClick = (token: string) => {
    // Navigate to admin tokens with search prefilled
    navigate(`/admin/tokens?q=${encodeURIComponent(token)}`);
  };

  const handleReviewPriorityClick = (displayName: string) => {
    // Navigate to browse page with token prefilled
    navigate(`/browse?token=${encodeURIComponent(displayName)}`);
  };

  const handleFilterChange = () => {
    // Trigger re-fetch by resetting loading states
    setLoadingLowCoverage(true);
    setLoadingZeroCoverage(true);
  };

  if (!isAdminMode) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin: Coverage Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Monitor database coverage and identify gaps in interaction data
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Substance Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => { setTypeFilter('all'); handleFilterChange(); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    typeFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => { setTypeFilter('supplement'); handleFilterChange(); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    typeFilter === 'supplement'
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Supplements
                </button>
                <button
                  onClick={() => { setTypeFilter('drug'); handleFilterChange(); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    typeFilter === 'drug'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Drugs
                </button>
              </div>
            </div>

            {/* Coverage Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Coverage Level
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => { setCoverageFilter('all'); handleFilterChange(); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    coverageFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => { setCoverageFilter('zero'); handleFilterChange(); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    coverageFilter === 'zero'
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Zero
                </button>
                <button
                  onClick={() => { setCoverageFilter('low'); handleFilterChange(); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    coverageFilter === 'low'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Low (1-2)
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section 0: Missing Requested Tokens */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <FileQuestion className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-semibold text-slate-900">Requested tokens missing from database</h2>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Tokens users searched for that don't exist in the database yet
              </p>
            </div>

            <div className="overflow-x-auto">
              {loadingMissingTokens ? (
                <div className="p-8 text-center text-slate-500">Loading...</div>
              ) : missingTokens.length === 0 ? (
                <div className="p-8 text-center text-green-600">
                  <p className="font-medium">No missing tokens right now. Good sign — requests are matching known tokens.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Token
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Requests
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {missingTokens.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {item.token}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          <span className="font-semibold text-red-600">{item.cnt}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
                            onClick={() => handleCreateTokenClick(item.token)}
                          >
                            <Plus className="w-4 h-4" />
                            Create token
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Section 1: Priority Queue */}
          <div className="bg-white rounded-lg shadow-sm border border-blue-200">
            <div className="px-6 py-4 border-b border-blue-200 bg-blue-50">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-700" />
                <h2 className="text-xl font-semibold text-slate-900">Priority Queue (What to add next)</h2>
                <div className="group relative">
                  <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-help" />
                  <div className="absolute left-0 top-6 w-80 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <p className="font-medium mb-1">Priority Calculation:</p>
                    <p>Priority = requests ÷ max(interactions, 1)</p>
                    <p className="mt-2 text-slate-300">Higher means users request it often and coverage is low.</p>
                  </div>
                </div>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Ranked by demand vs coverage — high requests with low interactions rise to the top
              </p>
            </div>

            <div className="overflow-x-auto">
              {loadingPriority ? (
                <div className="p-8 text-center text-slate-500">Loading...</div>
              ) : priorityQueue.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <p className="font-medium">No prioritized items yet. Requests will appear here as users search.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Display Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Requests
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Interactions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Priority Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {priorityQueue.map((item) => {
                      const priorityLevel = getPriorityLevel(item.priority_score);
                      const rowStyle = getPriorityRowStyle(priorityLevel);
                      const badgeColor = getPriorityBadgeColor(priorityLevel);
                      const isHighPriority = priorityLevel === 'High';

                      return (
                        <tr
                          key={item.substance_id}
                          className={rowStyle}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${badgeColor}`}>
                              {priorityLevel}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm text-slate-900 ${isHighPriority ? 'font-bold' : 'font-medium'}`}>
                              {item.display_name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {item.canonical_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(item.type)}`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="font-semibold text-blue-600">
                              {item.request_count}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={item.interaction_count === 0 ? 'text-orange-600 font-semibold' : 'text-slate-900'}>
                              {item.interaction_count}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`font-semibold ${isHighPriority ? 'text-blue-700' : 'text-slate-700'}`}>
                              {item.priority_score.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              className="text-blue-600 hover:text-blue-700 font-medium"
                              onClick={() => handleReviewPriorityClick(item.display_name)}
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Section 2: Most Requested Substances */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">Most Requested Substances</h2>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Top substances users are searching for in the interaction checker
              </p>
            </div>

            <div className="overflow-x-auto">
              {loadingRequested ? (
                <div className="p-8 text-center text-slate-500">Loading...</div>
              ) : requestedInteractions.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  No request data available yet
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Token (Normalized)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Raw Input Sample
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Request Count
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Last Requested
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {requestedInteractions.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {item.token}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {item.raw_input_sample}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          <span className="font-semibold text-blue-600">{item.request_count}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {formatDate(item.last_requested)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            onClick={() => handleReviewClick(item.token)}
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Section 3: Low Coverage Substances */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h2 className="text-xl font-semibold text-slate-900">Substances with Low Coverage</h2>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Substances with 2 or fewer interactions (candidates for expansion)
              </p>
            </div>

            <div className="overflow-x-auto">
              {loadingLowCoverage ? (
                <div className="p-8 text-center text-slate-500">Loading...</div>
              ) : lowCoverageSubstances.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  No low coverage substances found
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Display Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Interaction Count
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {lowCoverageSubstances.map((substance) => (
                      <tr key={substance.substance_id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            {substance.display_name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {substance.canonical_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(substance.type)}`}>
                            {substance.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="font-semibold text-amber-600">
                            {substance.interaction_count}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Section 4: Zero Coverage Substances */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-semibold text-slate-900">Zero Coverage Substances</h2>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Active substances with no interactions in the database
              </p>
            </div>

            <div className="overflow-x-auto">
              {loadingZeroCoverage ? (
                <div className="p-8 text-center text-slate-500">Loading...</div>
              ) : zeroCoverageSubstances.length === 0 ? (
                <div className="p-8 text-center text-green-600">
                  <FileQuestion className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">All substances have at least one interaction!</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Display Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {zeroCoverageSubstances.map((substance) => (
                      <tr key={substance.substance_id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            {substance.display_name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {substance.canonical_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(substance.type)}`}>
                            {substance.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            onClick={() => handleAddInteractionClick(substance.display_name)}
                          >
                            Add Interaction
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
