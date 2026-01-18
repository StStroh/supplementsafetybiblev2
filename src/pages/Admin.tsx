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
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <nav style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-card)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center transition hover:underline"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="ml-1">Back</span>
              </button>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6" style={{ color: 'var(--color-trial)' }} />
                <span className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Supplement Safety Bible Admin</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Manage data imports, view statistics, and configure synonyms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-8 h-8" style={{ color: 'var(--color-trial)' }} />
              {stats && <button onClick={loadStats} style={{ color: 'var(--color-text-muted)' }}><RefreshCw className="w-4 h-4" /></button>}
            </div>
            <div className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{stats?.supplements ?? '—'}</div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Supplements</div>
          </div>

          <div className="card p-6">
            <Database className="w-8 h-8 mb-2" style={{ color: 'var(--color-success)' }} />
            <div className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{stats?.medications ?? '—'}</div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Medications</div>
          </div>

          <div className="card p-6">
            <Shield className="w-8 h-8 mb-2" style={{ color: 'var(--color-brand)' }} />
            <div className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{stats?.interactions ?? '—'}</div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Interactions</div>
          </div>

          <div className="card p-6">
            <Upload className="w-8 h-8 mb-2" style={{ color: 'var(--color-warning)' }} />
            <div className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>Last Import</div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{stats?.lastImportAt ? new Date(stats.lastImportAt).toLocaleString() : 'Never'}</div>
          </div>
        </div>

        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: 'var(--color-text)' }}>
            <Upload className="w-5 h-5 mr-2" />
            Data Import
          </h2>
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate('/admin/import')}
              className="btn-cta flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>CSV Importer (New)</span>
            </button>
            <button
              onClick={() => runImport(false)}
              disabled={importing}
              className="btn-cta flex items-center space-x-2 disabled:opacity-50"
            >
              <Upload className="w-5 h-5" />
              <span>{importing ? 'Importing...' : 'Import CSV (Legacy)'}</span>
            </button>
            <button
              onClick={() => runImport(true)}
              disabled={importing}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg transition disabled:opacity-50"
              style={{ background: 'var(--color-error)', color: '#ffffff' }}
            >
              <Trash2 className="w-5 h-5" />
              <span>Truncate & Re-import</span>
            </button>
          </div>

          {importResult && (
            <div className="rounded-lg p-4" style={{ background: '#E8F5E9', border: '1px solid #81C784' }}>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-success)' }}>Import Successful!</h3>
              <div className="text-sm" style={{ color: '#2E7D32' }}>
                <p>Supplements: {importResult.counts.supplements}</p>
                <p>Medications: {importResult.counts.medications}</p>
                <p>Interactions: {importResult.counts.interactions}</p>
                {importResult.imported && <p className="font-semibold mt-2">Imported {importResult.imported} rows</p>}
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Synonym Management</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Manage alternative names for supplements and medications to improve search accuracy.
          </p>
        </div>

        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Add New Synonym</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={newSynonym.synonym}
              onChange={(e) => setNewSynonym({ ...newSynonym, synonym: e.target.value })}
              placeholder="Synonym (e.g., 'coq10')"
              className="px-4 py-3 rounded-lg focus:ring-2 focus:border-transparent"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            />
            <input
              type="text"
              value={newSynonym.canonical}
              onChange={(e) => setNewSynonym({ ...newSynonym, canonical: e.target.value })}
              placeholder="Canonical name (e.g., 'coenzyme q10')"
              className="px-4 py-3 rounded-lg focus:ring-2 focus:border-transparent"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            />
            <select
              value={newSynonym.type}
              onChange={(e) => setNewSynonym({ ...newSynonym, type: e.target.value as 'supplement' | 'medication' })}
              className="px-4 py-3 rounded-lg focus:ring-2 focus:border-transparent"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            >
              <option value="supplement">Supplement</option>
              <option value="medication">Medication</option>
            </select>
            <button
              onClick={addSynonym}
              disabled={saving}
              className="btn-cta flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
              <span>{saving ? 'Adding...' : 'Add Synonym'}</span>
            </button>
          </div>
        </div>

        {loading ? (
          <Loading message="Loading synonyms..." />
        ) : (
          <div className="card overflow-hidden" style={{ padding: 0 }}>
            {synonyms.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead style={{ background: 'var(--color-bg)' }}>
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                        Synonym
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                        Canonical Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                        Type
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ background: 'var(--color-surface)' }}>
                    {synonyms.map((synonym, index) => (
                      <tr key={`${synonym.type}-${synonym.synonym_key}-${index}`} className="transition" style={{ borderTop: '1px solid var(--color-border)' }}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                          {synonym.synonym_key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--color-text-muted)' }}>
                          {synonym.canonical_key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            synonym.type === 'supplement'
                              ? 'badge-trial'
                              : ''
                          }`} style={synonym.type === 'medication' ? { background: '#E8F5E9', color: '#2E7D32' } : {}}>
                            {synonym.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => deleteSynonym(synonym.synonym_key, synonym.type)}
                            disabled={saving}
                            className="transition disabled:opacity-50"
                            style={{ color: 'var(--color-error)' }}
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
