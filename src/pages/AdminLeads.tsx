import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthUser } from '../hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';

interface LeadSignal {
  id: string;
  session_id: string;
  created_at: string;
  event_type: string;
  page_path: string | null;
  search_terms: string[] | null;
  checker_items: string[] | null;
  intent_level: string;
  confidence: number;
  urgency: string;
  offer: string | null;
  lead_score: number;
  follow_up: string;
  timing: string;
  sales_message: string | null;
  raw_payload: any;
}

export default function AdminLeads() {
  const navigate = useNavigate();
  const { profile } = useAuthUser();
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);
  const [noPasswordSet, setNoPasswordSet] = useState(false);

  const [leads, setLeads] = useState<LeadSignal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const [intentFilter, setIntentFilter] = useState<string>('PRE_PURCHASE,PURCHASE_READY');
  const [minLeadScore, setMinLeadScore] = useState<number>(70);

  useEffect(() => {
    const verified = sessionStorage.getItem('admin_leads_verified');
    if (verified === 'true') {
      setIsPasswordVerified(true);
      setShowPasswordPrompt(false);
    }

    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (!envPassword || envPassword === '') {
      setNoPasswordSet(true);
      setIsPasswordVerified(true);
      setShowPasswordPrompt(false);
    }
  }, []);

  useEffect(() => {
    if (!profile) return;
    if (profile.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [profile, navigate]);

  useEffect(() => {
    if (isPasswordVerified && profile?.role === 'admin') {
      fetchLeads();
    }
  }, [isPasswordVerified, intentFilter, minLeadScore, profile]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!envPassword || envPassword === '') {
      setNoPasswordSet(true);
      setIsPasswordVerified(true);
      setShowPasswordPrompt(false);
      return;
    }

    if (passwordInput === envPassword) {
      sessionStorage.setItem('admin_leads_verified', 'true');
      setIsPasswordVerified(true);
      setShowPasswordPrompt(false);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);

    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      let query = supabase
        .from('lead_signals')
        .select('*')
        .gte('created_at', sevenDaysAgo.toISOString())
        .gte('lead_score', minLeadScore)
        .order('lead_score', { ascending: false })
        .order('created_at', { ascending: false });

      if (intentFilter && intentFilter !== 'ALL') {
        const intentLevels = intentFilter.split(',');
        query = query.in('intent_level', intentLevels);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setLeads(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string | null, maxLength: number) => {
    if (!text) return '-';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '…';
  };

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">Access Denied</h1>
          <p className="text-gray-600 mt-2">Admin access required</p>
        </div>
      </div>
    );
  }

  if (showPasswordPrompt && !noPasswordSet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Access</h1>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter admin password
              </label>
              <input
                type="password"
                id="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Access Leads
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto p-6">
        {noPasswordSet && (
          <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">Warning: No Password Protection</h3>
              <p className="text-sm text-yellow-800 mt-1">
                ADMIN_PASSWORD environment variable is not set. This page is unprotected.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Sales Leads Dashboard</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intent Level
              </label>
              <select
                value={intentFilter}
                onChange={(e) => setIntentFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Levels</option>
                <option value="PRE_PURCHASE,PURCHASE_READY">High Intent (Pre-Purchase + Ready)</option>
                <option value="PRE_PURCHASE">Pre-Purchase Only</option>
                <option value="PURCHASE_READY">Purchase Ready Only</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Lead Score
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={minLeadScore}
                onChange={(e) => setMinLeadScore(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchLeads}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Showing leads from the last 7 days
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!loading && leads.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-600">No leads found matching your filters</p>
          </div>
        )}

        {!loading && leads.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Session
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Intent
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Offer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Follow-up
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Search
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Checked
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <>
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                          {formatDate(lead.created_at)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono text-xs">
                          {lead.session_id.substring(0, 8)}...
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {lead.event_type}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            lead.intent_level === 'PURCHASE_READY'
                              ? 'bg-green-100 text-green-800'
                              : lead.intent_level === 'PRE_PURCHASE'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {lead.intent_level}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {lead.confidence}%
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            lead.urgency === 'high'
                              ? 'bg-red-100 text-red-800'
                              : lead.urgency === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {lead.urgency}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 max-w-[150px] truncate">
                          {lead.offer || '-'}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-semibold ${
                            lead.lead_score >= 80
                              ? 'bg-green-100 text-green-800'
                              : lead.lead_score >= 60
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {lead.lead_score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {lead.follow_up} ({lead.timing})
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {lead.page_path || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
                          {lead.search_terms?.join(', ') || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
                          {lead.checker_items?.join(', ') || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 max-w-[200px]">
                          {truncateText(lead.sales_message, 120)}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleExpanded(lead.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {expandedRows.has(lead.id) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedRows.has(lead.id) && (
                        <tr key={`${lead.id}-expanded`}>
                          <td colSpan={14} className="px-4 py-4 bg-gray-50">
                            <div className="space-y-2">
                              <div>
                                <h4 className="text-xs font-semibold text-gray-700 uppercase mb-1">
                                  Full Sales Message
                                </h4>
                                <p className="text-sm text-gray-900">
                                  {lead.sales_message || 'No message'}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-gray-700 uppercase mb-1">
                                  Raw Payload
                                </h4>
                                <pre className="text-xs text-gray-700 bg-white p-3 rounded border border-gray-200 overflow-x-auto">
                                  {JSON.stringify(lead.raw_payload, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600">
                Total leads: <span className="font-semibold">{leads.length}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
