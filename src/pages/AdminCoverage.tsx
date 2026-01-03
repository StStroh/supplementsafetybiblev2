import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AlertCircle, TrendingUp, Database, FileQuestion } from 'lucide-react';

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

export default function AdminCoverage() {
  const navigate = useNavigate();
  const isAdminMode = import.meta.env.VITE_ADMIN_MODE === 'true';

  const [requestedInteractions, setRequestedInteractions] = useState<RequestedInteraction[]>([]);
  const [lowCoverageSubstances, setLowCoverageSubstances] = useState<SubstanceCount[]>([]);
  const [zeroCoverageSubstances, setZeroCoverageSubstances] = useState<ZeroCoverageSubstance[]>([]);

  const [loadingRequested, setLoadingRequested] = useState(true);
  const [loadingLowCoverage, setLoadingLowCoverage] = useState(true);
  const [loadingZeroCoverage, setLoadingZeroCoverage] = useState(true);

  useEffect(() => {
    if (!isAdminMode) {
      navigate('/');
      return;
    }

    fetchRequestedInteractions();
    fetchLowCoverageSubstances();
    fetchZeroCoverageSubstances();
  }, [isAdminMode, navigate]);

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
      const { data, error } = await supabase
        .from('v_substance_interaction_counts')
        .select('*')
        .lte('interaction_count', 2)
        .limit(100);

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
      const { data, error } = await supabase
        .from('v_zero_coverage_substances')
        .select('*')
        .limit(100);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

        <div className="space-y-8">
          {/* Section 1: Most Requested Interactions */}
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
                            onClick={() => {}}
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

          {/* Section 2: Low Coverage Substances */}
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

          {/* Section 3: Zero Coverage Substances */}
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
                            onClick={() => {}}
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
