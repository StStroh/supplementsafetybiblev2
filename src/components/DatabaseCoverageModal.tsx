import { useEffect, useState } from 'react';
import { X, Database, Activity } from 'lucide-react';

interface DatabaseStats {
  ok: boolean;
  counts: {
    supplements: number | null;
    drugs: number | null;
    interactions: number;
    tokens: number;
  };
  error?: string;
}

interface DatabaseCoverageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCheck?: () => void;
}

export default function DatabaseCoverageModal({
  isOpen,
  onClose,
  onStartCheck,
}: DatabaseCoverageModalProps) {
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !stats && !loading) {
      fetchStats();
    }
  }, [isOpen]);

  async function fetchStats() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/.netlify/functions/checker-stats');

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (!data.ok) {
        throw new Error(data.error || 'Failed to load stats');
      }

      setStats(data);
    } catch (err: any) {
      console.error('Failed to fetch database stats:', err);
      setError(err.message || 'Failed to load database coverage');
    } finally {
      setLoading(false);
    }
  }

  function handleStartCheck() {
    onClose();
    if (onStartCheck) {
      onStartCheck();
    }
  }

  if (!isOpen) return null;

  const hasCounts = stats?.counts;
  const canShowTypeBreakdown = hasCounts && (stats.counts.supplements !== null || stats.counts.drugs !== null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl shadow-2xl"
        style={{ background: 'var(--color-bg)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ background: 'var(--color-trial)', opacity: 0.15 }}
            >
              <Database
                className="w-6 h-6"
                style={{ color: 'var(--color-trial)', opacity: 1 }}
                strokeWidth={2}
              />
            </div>
            <div>
              <h2
                className="text-xl font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                Database Coverage
              </h2>
              <p
                className="text-sm mt-0.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Live snapshot of currently indexed items
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Activity
                className="w-8 h-8 animate-spin"
                style={{ color: 'var(--color-trial)' }}
              />
            </div>
          )}

          {error && (
            <div
              className="rounded-lg p-4 text-center"
              style={{ background: '#FFEBEE', border: '1px solid #E57373' }}
            >
              <p className="font-medium" style={{ color: 'var(--color-error)' }}>
                {error}
              </p>
            </div>
          )}

          {!loading && !error && hasCounts && (
            <div className="space-y-4">
              {/* Stats Grid */}
              <div className="space-y-3">
                {canShowTypeBreakdown && stats.counts.supplements !== null && (
                  <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-base font-medium" style={{ color: 'var(--color-text-muted)' }}>
                      Supplements
                    </span>
                    <span className="text-2xl font-bold tabular-nums" style={{ color: 'var(--color-text)' }}>
                      {stats.counts.supplements.toLocaleString()}
                    </span>
                  </div>
                )}

                {canShowTypeBreakdown && stats.counts.drugs !== null && (
                  <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-base font-medium" style={{ color: 'var(--color-text-muted)' }}>
                      Medications
                    </span>
                    <span className="text-2xl font-bold tabular-nums" style={{ color: 'var(--color-text)' }}>
                      {stats.counts.drugs.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="text-base font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    Interaction pairs
                  </span>
                  <span className="text-2xl font-bold tabular-nums" style={{ color: 'var(--color-text)' }}>
                    {stats.counts.interactions.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-base font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    Name tokens
                  </span>
                  <span className="text-2xl font-bold tabular-nums" style={{ color: 'var(--color-text)' }}>
                    {stats.counts.tokens.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Severity Levels */}
              <div
                className="rounded-lg p-4 mt-6"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: 'var(--color-text)' }}
                >
                  Severity levels:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                    Avoid
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    Caution
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    Monitor
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
                    Info
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2.5 font-medium rounded-lg transition"
            style={{
              color: 'var(--color-text-muted)',
              background: 'var(--color-surface)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#F5F5F5'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-surface)'}
          >
            Close
          </button>
          <button
            onClick={handleStartCheck}
            className="px-5 py-2.5 font-semibold rounded-lg transition"
            style={{
              background: 'var(--color-trial)',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Start a check
          </button>
        </div>
      </div>
    </div>
  );
}
