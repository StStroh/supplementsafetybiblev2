import { useState } from 'react';
import { Activity, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: any;
  error?: string;
  timestamp?: string;
}

export default function Diagnostics() {
  const [healthResult, setHealthResult] = useState<TestResult>({
    name: 'Checker Health',
    status: 'idle',
  });

  const [autocompleteResult, setAutocompleteResult] = useState<TestResult>({
    name: 'Autocomplete (ma)',
    status: 'idle',
  });

  const testHealth = async () => {
    setHealthResult({ name: 'Checker Health', status: 'loading' });

    try {
      const response = await fetch('/.netlify/functions/checker-health');
      const data = await response.json();

      if (response.ok && data.ok) {
        setHealthResult({
          name: 'Checker Health',
          status: 'success',
          data,
          timestamp: new Date().toISOString(),
        });
      } else {
        setHealthResult({
          name: 'Checker Health',
          status: 'error',
          error: data.error || `HTTP ${response.status}`,
          data,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      setHealthResult({
        name: 'Checker Health',
        status: 'error',
        error: err.message || String(err),
        timestamp: new Date().toISOString(),
      });
    }
  };

  const testAutocomplete = async () => {
    setAutocompleteResult({ name: 'Autocomplete (ma)', status: 'loading' });

    try {
      const response = await fetch('/.netlify/functions/checker-autocomplete?q=ma&type=supplement');
      const data = await response.json();

      if (response.ok && data.ok) {
        setAutocompleteResult({
          name: 'Autocomplete (ma)',
          status: 'success',
          data,
          timestamp: new Date().toISOString(),
        });
      } else {
        setAutocompleteResult({
          name: 'Autocomplete (ma)',
          status: 'error',
          error: data.error || data.detail || `HTTP ${response.status}`,
          data,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      setAutocompleteResult({
        name: 'Autocomplete (ma)',
        status: 'error',
        error: err.message || String(err),
        timestamp: new Date().toISOString(),
      });
    }
  };

  const renderResult = (result: TestResult) => {
    return (
      <div className="mt-4 p-4 rounded-lg border-2" style={{
        borderColor: result.status === 'success' ? '#10b981' : result.status === 'error' ? '#ef4444' : '#e5e7eb',
        background: result.status === 'success' ? '#f0fdf4' : result.status === 'error' ? '#fef2f2' : '#f9fafb',
      }}>
        <div className="flex items-center gap-2 mb-2">
          {result.status === 'loading' && <Activity className="w-5 h-5 animate-spin text-blue-600" />}
          {result.status === 'success' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
          {result.status === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
          {result.status === 'idle' && <AlertTriangle className="w-5 h-5 text-gray-400" />}

          <span className="font-semibold" style={{
            color: result.status === 'success' ? '#047857' : result.status === 'error' ? '#b91c1c' : '#374151'
          }}>
            {result.name}
          </span>
        </div>

        {result.timestamp && (
          <div className="text-xs text-gray-500 mb-2">
            {new Date(result.timestamp).toLocaleString()}
          </div>
        )}

        {result.error && (
          <div className="mb-2 p-2 bg-red-100 rounded text-sm text-red-800 font-mono">
            {result.error}
          </div>
        )}

        {result.data && (
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
              View Raw Response
            </summary>
            <pre className="mt-2 p-3 bg-gray-900 text-gray-100 rounded text-xs overflow-auto max-h-96 font-mono">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </details>
        )}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1f2937' }}>
            Autocomplete Diagnostics
          </h1>
          <p className="text-gray-600 mb-6">
            Test Netlify functions and view detailed error messages
          </p>

          <div className="space-y-6">
            <div>
              <button
                onClick={testHealth}
                disabled={healthResult.status === 'loading'}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{
                  background: healthResult.status === 'loading' ? '#9ca3af' : '#7c3aed',
                  cursor: healthResult.status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: healthResult.status === 'loading' ? 0.7 : 1,
                }}
              >
                {healthResult.status === 'loading' ? 'Testing...' : 'Test Checker Health'}
              </button>
              {renderResult(healthResult)}
            </div>

            <div>
              <button
                onClick={testAutocomplete}
                disabled={autocompleteResult.status === 'loading'}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{
                  background: autocompleteResult.status === 'loading' ? '#9ca3af' : '#0891b2',
                  cursor: autocompleteResult.status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: autocompleteResult.status === 'loading' ? 0.7 : 1,
                }}
              >
                {autocompleteResult.status === 'loading' ? 'Testing...' : 'Test Autocomplete "ma"'}
              </button>
              {renderResult(autocompleteResult)}
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h2 className="font-semibold text-blue-900 mb-2">Required Environment Variables</h2>
            <div className="text-sm text-blue-800 font-mono space-y-1">
              <div>• SUPABASE_URL</div>
              <div>• SUPABASE_SERVICE_ROLE_KEY</div>
              <div>• VITE_SUPABASE_URL</div>
              <div>• VITE_SUPABASE_ANON_KEY</div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <strong>Endpoints:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                  /.netlify/functions/checker-health
                </code>
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                  /.netlify/functions/checker-autocomplete?q=ma&type=supplement
                </code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
