import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Search, Download, Copy, Check, X,
  AlertCircle, Clock, CheckCircle2, XCircle, Crown
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import Loading from '../components/Loading';
import Toast from '../components/Toast';

interface InteractionRequest {
  id: string;
  token_a: string;
  token_b: string | null;
  token_a_norm: string;
  token_b_norm: string | null;
  status: string;
  reason: string | null;
  note: string | null;
  user_tier: string | null;
  user_id: string | null;
  created_at: string;
}

interface Stats {
  new: number;
  priority_new: number;
  reviewed: number;
  dismissed: number;
}

type StatusFilter = 'all' | 'new' | 'priority_new' | 'reviewed' | 'dismissed';

export default function AdminReviewQueue() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<InteractionRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<InteractionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [showPasswordGate, setShowPasswordGate] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState<Stats>({ new: 0, priority_new: 0, reviewed: 0, dismissed: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortNewest, setSortNewest] = useState(true);
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authorized === true) {
      loadRequests();
    }
  }, [authorized]);

  useEffect(() => {
    filterAndSortRequests();
  }, [requests, searchQuery, statusFilter, sortNewest]);

  const checkAuth = async () => {
    try {
      // Check sessionStorage for password unlock
      if (sessionStorage.getItem('admin_unlocked') === 'true') {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setShowPasswordGate(true);
        setAuthorized(false);
        setLoading(false);
        return;
      }

      // Check if user has admin role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (profile?.role === 'admin') {
        setAuthorized(true);
        setLoading(false);
      } else {
        setShowPasswordGate(true);
        setAuthorized(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setShowPasswordGate(true);
      setAuthorized(false);
      setLoading(false);
    }
  };

  const handlePasswordUnlock = () => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!adminPassword) {
      setToast({ message: 'Admin password not configured', type: 'error' });
      return;
    }

    if (password === adminPassword) {
      sessionStorage.setItem('admin_unlocked', 'true');
      setAuthorized(true);
      setShowPasswordGate(false);
      setToast({ message: 'Access granted', type: 'success' });
    } else {
      setToast({ message: 'Incorrect password', type: 'error' });
      setPassword('');
    }
  };

  const loadRequests = async () => {
    setLoading(true);
    try {
      // Load most recent 200 rows
      const { data, error } = await supabase
        .from('interaction_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (error) throw error;

      setRequests(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: InteractionRequest[]) => {
    const stats = {
      new: data.filter(r => r.status === 'new').length,
      priority_new: data.filter(r => r.status === 'priority_new').length,
      reviewed: data.filter(r => r.status === 'reviewed').length,
      dismissed: data.filter(r => r.status === 'dismissed').length,
    };
    setStats(stats);
  };

  const filterAndSortRequests = () => {
    let filtered = [...requests];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.token_a?.toLowerCase().includes(query) ||
        r.token_b?.toLowerCase().includes(query) ||
        r.note?.toLowerCase().includes(query)
      );
    }

    // Sort by priority: priority_new > new > others, then by date
    filtered.sort((a, b) => {
      // Priority sorting
      const priorityOrder: Record<string, number> = {
        'priority_new': 0,
        'new': 1,
        'reviewed': 2,
        'dismissed': 3
      };

      const aPriority = priorityOrder[a.status] ?? 999;
      const bPriority = priorityOrder[b.status] ?? 999;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      // Date sorting
      const aDate = new Date(a.created_at).getTime();
      const bDate = new Date(b.created_at).getTime();
      return sortNewest ? bDate - aDate : aDate - bDate;
    });

    setFilteredRequests(filtered);
  };

  const updateStatus = async (id: string, newStatus: 'reviewed' | 'dismissed') => {
    setActioningId(id);

    // Optimistic update
    const updatedRequests = requests.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setRequests(updatedRequests);
    calculateStats(updatedRequests);

    try {
      const { error } = await supabase
        .from('interaction_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setToast({ message: 'Updated', type: 'success' });
    } catch (error) {
      console.error('Failed to update status:', error);

      // Revert optimistic update
      setRequests(requests);
      calculateStats(requests);

      const errorMessage = error instanceof Error ? error.message : 'Failed to update status';
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setActioningId(null);
    }
  };

  const copyToClipboard = (request: InteractionRequest) => {
    const text = `Request: ${request.token_a}${request.token_b ? ' + ' + request.token_b : ''}
Reason: ${request.reason || 'N/A'}
Note: ${request.note || 'N/A'}
User Tier: ${request.user_tier || 'N/A'}
Created: ${new Date(request.created_at).toLocaleString()}`;

    navigator.clipboard.writeText(text);
    setToast({ message: 'Copied to clipboard', type: 'success' });
  };

  const exportToCSV = () => {
    const headers = ['Created At', 'Token A', 'Token B', 'Reason', 'Note', 'Status', 'User Tier'];
    const rows = filteredRequests.map(r => [
      new Date(r.created_at).toISOString(),
      r.token_a,
      r.token_b || '',
      r.reason || '',
      r.note || '',
      r.status,
      r.user_tier || ''
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `review-queue-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'priority_new':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Crown className="w-3 h-3 mr-1" />
            Priority
          </span>
        );
      case 'new':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            New
          </span>
        );
      case 'reviewed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Reviewed
          </span>
        );
      case 'dismissed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XCircle className="w-3 h-3 mr-1" />
            Dismissed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return <Loading message="Checking authorization..." />;
  }

  if (authorized === false && showPasswordGate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Admin Access</h1>
          <p className="text-gray-600 mb-6 text-center">Enter admin password to continue</p>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordUnlock()}
              placeholder="Admin password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              autoFocus
            />

            <div className="flex space-x-3">
              <button
                onClick={handlePasswordUnlock}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Unlock
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Not Authorized</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Review Queue</h1>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.new}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Priority</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.priority_new}</p>
              </div>
              <Crown className="w-8 h-8 text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reviewed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.reviewed}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dismissed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.dismissed}</p>
              </div>
              <XCircle className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by token or note..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="priority_new">Priority</option>
              <option value="reviewed">Reviewed</option>
              <option value="dismissed">Dismissed</option>
            </select>

            <button
              onClick={() => setSortNewest(!sortNewest)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              {sortNewest ? 'Newest First' : 'Oldest First'}
            </button>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            Showing {filteredRequests.length} of {requests.length} requests
          </div>
        </div>

        {/* Requests List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredRequests.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No requests found matching your filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {/* Header Row */}
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-gray-900">
                          {request.token_a}
                        </span>
                        {request.token_b && (
                          <>
                            <span className="text-gray-400">+</span>
                            <span className="font-semibold text-gray-900">
                              {request.token_b}
                            </span>
                          </>
                        )}
                        {getStatusBadge(request.status)}
                      </div>

                      {/* Details Row */}
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span title={new Date(request.created_at).toLocaleString()}>
                            {getRelativeTime(request.created_at)}
                          </span>
                        </div>

                        {request.reason && (
                          <div>
                            <span className="font-medium">Reason:</span>{' '}
                            <span className="capitalize">{request.reason.replace(/_/g, ' ')}</span>
                          </div>
                        )}

                        {request.user_tier && (
                          <div>
                            <span className="font-medium">Tier:</span>{' '}
                            <span className="capitalize">{request.user_tier}</span>
                          </div>
                        )}
                      </div>

                      {/* Note */}
                      {request.note && (
                        <div className="text-sm text-gray-700 bg-gray-50 rounded px-3 py-2 mt-2">
                          <span className="font-medium">Note:</span>{' '}
                          {request.note.length > 120
                            ? request.note.substring(0, 120) + '...'
                            : request.note}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => copyToClipboard(request)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Copy details"
                      >
                        <Copy className="w-5 h-5" />
                      </button>

                      {(request.status === 'new' || request.status === 'priority_new') && (
                        <>
                          <button
                            onClick={() => updateStatus(request.id, 'reviewed')}
                            disabled={actioningId === request.id}
                            className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors disabled:opacity-50"
                            title="Mark reviewed"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateStatus(request.id, 'dismissed')}
                            disabled={actioningId === request.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                            title="Dismiss"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
