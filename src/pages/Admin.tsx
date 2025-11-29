import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Trash2, Shield, Upload, Database, RefreshCw } from 'lucide-react';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

interface Synonym {
  synonym_key: string;
  canonical_key: string;
  type: 'supplement' | 'medication';
}

interface Stats {
  supplements: number;
  medications: number;
  interactions: number;
  lastImportAt: string | null;
}

interface ImportResult {
  ok: boolean;
  counts: {
    supplements: number;
    medications: number;
    interactions: number;
  };
  imported?: number;
}

export default function Admin() {
  const navigate = useNavigate();
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [importing, setImporting] = useState(false);
  const [newSynonym, setNewSynonym] = useState({
    synonym: '',
    canonical: '',
    type: 'supplement' as 'supplement' | 'medication'
  });

  useEffect(() => {
    loadSynonyms();
    loadStats();
  }, []);

  const loadSynonyms = async () => {
    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/admin_synonyms');
      if (!response.ok) throw new Error('Failed to load synonyms');
      const data = await response.json();
      setSynonyms(data.synonyms || []);
    } catch (err) {
      console.error('Failed to load synonyms:', err);
    } finally {
      setLoading(false);
    }
  };

  const addSynonym = async () => {
    if (!newSynonym.synonym || !newSynonym.canonical) {
      alert('Please fill in both fields');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/.netlify/functions/admin_synonyms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          synonym_key: newSynonym.synonym.toLowerCase().trim(),
          canonical_key: newSynonym.canonical.toLowerCase().trim(),
          type: newSynonym.type
        })
      });

      if (!response.ok) throw new Error('Failed to add synonym');

      setNewSynonym({ synonym: '', canonical: '', type: 'supplement' });
      await loadSynonyms();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add synonym');
    } finally {
      setSaving(false);
    }
  };

  const deleteSynonym = async (synonymKey: string, type: string) => {
    if (!confirm('Are you sure you want to delete this synonym?')) return;

    setSaving(true);
    try {
      const response = await fetch('/.netlify/functions/admin_synonyms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          synonym_key: synonymKey,
          type
        })
      });

      if (!response.ok) throw new Error('Failed to delete synonym');
      await loadSynonyms();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete synonym');
    } finally {
      setSaving(false);
    }
  };

  const loadStats = async () => {
    try {
      const adminKey = prompt('Enter admin key:');
      if (!adminKey) return;

      const response = await fetch('/.netlify/functions/admin-stats', {
        headers: { 'x-admin-key': adminKey }
      });
      if (!response.ok) {
        throw new Error('Unauthorized or stats unavailable');
      }
      const data = await response.json();
      setStats(data);
      localStorage.setItem('admin_key', adminKey);
    } catch (err) {
      console.error('Failed to load stats:', err);
      alert('Failed to load stats. Check admin key.');
    }
  };

  const runImport = async (truncate: boolean = false) => {
    const confirmMsg = truncate
      ? 'This will DELETE all existing data and re-import. Continue?'
      : 'Import interactions from CSV. Continue?';

    if (!confirm(confirmMsg)) return;

    setImporting(true);
    setImportResult(null);

    try {
      const response = await fetch('/.netlify/functions/import-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'artifacts/interactions_full.csv',
          truncate,
          dryRun: false
        })
      });

      if (!response.ok) {
        throw new Error(`Import failed: ${response.statusText}`);
      }

      const result = await response.json();
      setImportResult(result);
      await loadStats();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
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
                <span className="text-xl font-bold text-gray-900">SafetyBible Admin</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage data imports, view statistics, and configure synonyms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-8 h-8 text-blue-600" />
              {stats && <button onClick={loadStats} className="text-gray-400 hover:text-gray-600"><RefreshCw className="w-4 h-4" /></button>}
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.supplements ?? '—'}</div>
            <div className="text-sm text-gray-600">Supplements</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Database className="w-8 h-8 text-green-600 mb-2" />
            <div className="text-3xl font-bold text-gray-900">{stats?.medications ?? '—'}</div>
            <div className="text-sm text-gray-600">Medications</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Shield className="w-8 h-8 text-purple-600 mb-2" />
            <div className="text-3xl font-bold text-gray-900">{stats?.interactions ?? '—'}</div>
            <div className="text-sm text-gray-600">Interactions</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Upload className="w-8 h-8 text-orange-600 mb-2" />
            <div className="text-sm font-semibold text-gray-900 mb-2">Last Import</div>
            <div className="text-xs text-gray-600">{stats?.lastImportAt ? new Date(stats.lastImportAt).toLocaleString() : 'Never'}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Data Import
          </h2>
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => runImport(false)}
              disabled={importing}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition shadow-sm"
            >
              <Upload className="w-5 h-5" />
              <span>{importing ? 'Importing...' : 'Import CSV'}</span>
            </button>
            <button
              onClick={() => runImport(true)}
              disabled={importing}
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition shadow-sm"
            >
              <Trash2 className="w-5 h-5" />
              <span>Truncate & Re-import</span>
            </button>
          </div>

          {importResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Import Successful!</h3>
              <div className="text-sm text-green-800">
                <p>Supplements: {importResult.counts.supplements}</p>
                <p>Medications: {importResult.counts.medications}</p>
                <p>Interactions: {importResult.counts.interactions}</p>
                {importResult.imported && <p className="font-semibold mt-2">Imported {importResult.imported} rows</p>}
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Synonym Management</h2>
          <p className="text-gray-600">
            Manage alternative names for supplements and medications to improve search accuracy.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Synonym</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={newSynonym.synonym}
              onChange={(e) => setNewSynonym({ ...newSynonym, synonym: e.target.value })}
              placeholder="Synonym (e.g., 'coq10')"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              value={newSynonym.canonical}
              onChange={(e) => setNewSynonym({ ...newSynonym, canonical: e.target.value })}
              placeholder="Canonical name (e.g., 'coenzyme q10')"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={newSynonym.type}
              onChange={(e) => setNewSynonym({ ...newSynonym, type: e.target.value as 'supplement' | 'medication' })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="supplement">Supplement</option>
              <option value="medication">Medication</option>
            </select>
            <button
              onClick={addSynonym}
              disabled={saving}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span>{saving ? 'Adding...' : 'Add Synonym'}</span>
            </button>
          </div>
        </div>

        {loading ? (
          <Loading message="Loading synonyms..." />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {synonyms.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Synonym
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Canonical Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {synonyms.map((synonym, index) => (
                      <tr key={`${synonym.type}-${synonym.synonym_key}-${index}`} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {synonym.synonym_key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {synonym.canonical_key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            synonym.type === 'supplement'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {synonym.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => deleteSynonym(synonym.synonym_key, synonym.type)}
                            disabled={saving}
                            className="text-red-600 hover:text-red-700 disabled:text-gray-400 transition"
                            title="Delete synonym"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                icon={Shield}
                title="No synonyms found"
                description="Add a synonym above to get started."
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
