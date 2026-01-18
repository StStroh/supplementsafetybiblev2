import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, X, RefreshCw, Upload, AlertCircle, TrendingUp, Copy } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Loading from '../components/Loading';

interface StagedInteraction {
  id: string;
  created_at: string;
  source: string;
  substance_a_id: string;
  substance_b_id: string;
  severity: string;
  interaction_type: string;
  summary_short: string;
  mechanism: string;
  clinical_effect: string;
  management: string;
  evidence_grade: string;
  confidence: string;
  approved: boolean;
  published: boolean;
  publish_error: string | null;
  reviewer_notes: string | null;
}

interface RiskQueueItem {
  stage_id: string;
  a_substance_id: string;
  b_substance_id: string;
  a_display_name: string;
  b_display_name: string;
  severity: string;
  confidence: string;
  evidence_grade: string;
  source: string;
  created_at: string;
  demand_count: number;
  last_demand_at: string | null;
  risk_score: number;
}

interface TokenCollision {
  token: string;
  substances_count: number;
  substance_ids: string[];
  display_names: string[];
}

interface Stats {
  pending: number;
  approved: number;
  published: number;
}

export default function AdminReview() {
  const navigate = useNavigate();
  const [interactions, setInteractions] = useState<StagedInteraction[]>([]);
  const [riskQueue, setRiskQueue] = useState<RiskQueueItem[]>([]);
  const [collisions, setCollisions] = useState<TokenCollision[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, published: 0 });
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all' | 'risk' | 'collisions'>('risk');
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<any>(null);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [expandedCollision, setExpandedCollision] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'risk') {
        const { data, error } = await supabase.rpc('checker_admin_stage_risk_queue', { p_days: 30 });
        if (error) throw error;
        setRiskQueue(data || []);
      } else if (activeTab === 'collisions') {
        const { data, error } = await supabase.rpc('checker_admin_token_collisions', { p_limit: 200 });
        if (error) throw error;
        setCollisions(data || []);
      } else {
        let query = supabase
          .from('checker_interactions_stage')
          .select('*')
          .order('created_at', { ascending: false });

        if (activeTab === 'pending') {
          query = query.eq('approved', false);
        } else if (activeTab === 'approved') {
          query = query.eq('approved', true).eq('published', false);
        }

        const { data, error } = await query;
        if (error) throw error;
        setInteractions(data || []);
      }

      const { data: statsData } = await supabase.rpc('checker_stats_summary');

      if (statsData && statsData.staging) {
        setStats({
          pending: statsData.staging.pending_review || 0,
          approved: statsData.staging.approved_unpublished || 0,
          published: 0
        });
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const approveInteraction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('checker_interactions_stage')
        .update({
          approved: true,
          approved_at: new Date().toISOString(),
          approved_by: 'admin'
        })
        .eq('id', id);

      if (error) throw error;

      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to approve');
    }
  };

  const copyCollisionReport = () => {
    const report = collisions.map(c =>
      `Token: "${c.token}" (${c.substances_count} substances)\n` +
      c.substance_ids.map((id, idx) => `  - ${id}: ${c.display_names[idx]}`).join('\n')
    ).join('\n\n');

    navigator.clipboard.writeText(report);
    alert('Collision report copied to clipboard!');
  };

  const rejectInteraction = async (id: string) => {
    if (!confirm('Mark this interaction as rejected?')) return;

    try {
      const { error } = await supabase
        .from('checker_interactions_stage')
        .update({
          publish_error: 'rejected',
          reviewer_notes: 'Rejected by admin'
        })
        .eq('id', id);

      if (error) throw error;

      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to reject');
    }
  };

  const publishApproved = async () => {
    if (!confirm(`Publish ${stats.approved} approved interactions to production?`)) return;

    setPublishing(true);
    setPublishResult(null);

    try {
      const { data, error } = await supabase.rpc('checker_publish_approved_interactions', {
        batch_limit: 500
      });

      if (error) throw error;

      setPublishResult(data);
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to publish');
    } finally {
      setPublishing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'avoid': return 'bg-red-100 text-red-800';
      case 'caution': return 'bg-orange-100 text-orange-800';
      case 'monitor': return 'bg-blue-100 text-blue-800';
      case 'info': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-xl font-semibold text-gray-900">
                Interaction Review & Publishing
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved (Unpublished)</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.approved}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <button
              onClick={publishApproved}
              disabled={publishing || stats.approved === 0}
              className="w-full h-full flex flex-col items-center justify-center space-y-2 text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded transition-colors"
            >
              {publishing ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
              <span className="font-semibold">
                {publishing ? 'Publishing...' : 'Publish Approved'}
              </span>
            </button>
          </div>
        </div>

        {publishResult && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Publish Complete</h3>
            <div className="text-sm text-green-800">
              <p>Published: {publishResult.published}</p>
              <p>Errors: {publishResult.errors}</p>
              <p>Skipped: {publishResult.skipped}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('risk')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === 'risk'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Risk Queue</span>
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'approved'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Approved ({stats.approved})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('collisions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === 'collisions'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span>Collisions</span>
              </button>
            </nav>
          </div>

          {activeTab === 'risk' && (
            <div>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Severities</option>
                    <option value="avoid">Avoid</option>
                    <option value="caution">Caution</option>
                    <option value="monitor">Monitor</option>
                    <option value="info">Info</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search substance..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm w-64"
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {riskQueue.filter(item => {
                    const matchSeverity = severityFilter === 'all' || item.severity === severityFilter;
                    const matchSearch = !searchFilter ||
                      item.a_display_name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      item.b_display_name?.toLowerCase().includes(searchFilter.toLowerCase());
                    return matchSeverity && matchSearch;
                  }).length} items
                </span>
              </div>

              <div className="divide-y divide-gray-200">
                {riskQueue.filter(item => {
                  const matchSeverity = severityFilter === 'all' || item.severity === severityFilter;
                  const matchSearch = !searchFilter ||
                    item.a_display_name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    item.b_display_name?.toLowerCase().includes(searchFilter.toLowerCase());
                  return matchSeverity && matchSearch;
                }).map((item) => (
                  <div key={item.stage_id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-semibold text-gray-900">
                            {item.a_display_name || item.a_substance_id}
                          </span>
                          <span className="text-gray-400">+</span>
                          <span className="font-semibold text-gray-900">
                            {item.b_display_name || item.b_substance_id}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getSeverityColor(item.severity)}`}>
                            {item.severity}
                          </span>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4" />
                            <span>Risk Score: <strong>{item.risk_score}</strong></span>
                          </div>
                          <div>
                            Demand: <strong>{item.demand_count}</strong> lookups
                          </div>
                          {item.last_demand_at && (
                            <div>
                              Last: {new Date(item.last_demand_at).toLocaleDateString()}
                            </div>
                          )}
                          {item.confidence && (
                            <div>
                              Confidence: {item.confidence}
                            </div>
                          )}
                          {item.evidence_grade && (
                            <div>
                              Evidence: {item.evidence_grade}
                            </div>
                          )}
                        </div>

                        <div className="text-xs text-gray-500">
                          Source: {item.source} | Created: {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => approveInteraction(item.stage_id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => rejectInteraction(item.stage_id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Reject"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {riskQueue.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No items in risk queue. All staged interactions have been reviewed.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'collisions' && (
            <div>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Token Collisions ({collisions.length})</h3>
                <button
                  onClick={copyCollisionReport}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Report</span>
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                {collisions.map((collision) => (
                  <div key={collision.token} className="p-4 hover:bg-gray-50">
                    <button
                      onClick={() => setExpandedCollision(expandedCollision === collision.token ? null : collision.token)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                            {collision.token}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {collision.substances_count} substances
                          </span>
                        </div>
                        <span className="text-gray-400">
                          {expandedCollision === collision.token ? '▼' : '▶'}
                        </span>
                      </div>
                    </button>

                    {expandedCollision === collision.token && (
                      <div className="mt-3 pl-4 border-l-2 border-red-200">
                        {collision.substance_ids.map((id, idx) => (
                          <div key={id} className="py-1 text-sm">
                            <span className="font-mono text-gray-600">{id}</span>
                            <span className="text-gray-400 mx-2">→</span>
                            <span className="text-gray-900">{collision.display_names[idx]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {collisions.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No token collisions detected. All tokens are unique!
                  </div>
                )}
              </div>
            </div>
          )}

          {(activeTab === 'pending' || activeTab === 'approved' || activeTab === 'all') && (
            <div className="divide-y divide-gray-200">
              {interactions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No interactions found for this filter.
                </div>
              ) : (
                interactions.map((interaction) => (
                <div key={interaction.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono text-sm text-gray-600">
                          {interaction.substance_a_id}
                        </span>
                        <span className="text-gray-400">+</span>
                        <span className="font-mono text-sm text-gray-600">
                          {interaction.substance_b_id}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getSeverityColor(interaction.severity)}`}>
                          {interaction.severity}
                        </span>
                        <span className="text-xs text-gray-500">
                          Source: {interaction.source}
                        </span>
                      </div>

                      <p className="text-sm text-gray-900 mb-2">
                        {interaction.summary_short}
                      </p>

                      {interaction.mechanism && (
                        <p className="text-xs text-gray-600 mb-1">
                          <span className="font-semibold">Mechanism:</span> {interaction.mechanism}
                        </p>
                      )}

                      {interaction.clinical_effect && (
                        <p className="text-xs text-gray-600 mb-1">
                          <span className="font-semibold">Clinical Effect:</span> {interaction.clinical_effect}
                        </p>
                      )}

                      {interaction.management && (
                        <p className="text-xs text-gray-600 mb-1">
                          <span className="font-semibold">Management:</span> {interaction.management}
                        </p>
                      )}

                      <div className="flex items-center space-x-4 mt-2">
                        {interaction.evidence_grade && (
                          <span className="text-xs text-gray-500">
                            Evidence: {interaction.evidence_grade}
                          </span>
                        )}
                        {interaction.confidence && (
                          <span className="text-xs text-gray-500">
                            Confidence: {interaction.confidence}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {new Date(interaction.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      {interaction.publish_error && (
                        <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                          Error: {interaction.publish_error}
                        </div>
                      )}
                    </div>

                    {!interaction.approved && !interaction.published && (
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => approveInteraction(interaction.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => rejectInteraction(interaction.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Reject"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    {interaction.approved && !interaction.published && (
                      <div className="ml-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Check className="w-3 h-3 mr-1" />
                          Approved
                        </span>
                      </div>
                    )}

                    {interaction.published && (
                      <div className="ml-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Published
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Review Workflow</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Review staged interactions for accuracy and quality</li>
            <li>Click ✓ to approve or ✗ to reject each interaction</li>
            <li>Once reviewed, click "Publish Approved" to push to production</li>
            <li>Published interactions are immediately visible to users</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
