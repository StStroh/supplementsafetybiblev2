import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function DebugFooter() {
  const [testResult, setTestResult] = useState<string>('');
  const [isInserting, setIsInserting] = useState(false);

  // Extract Supabase connection info
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  // Parse project ref from URL: https://qbefejbnxrsdwtsbkmon.supabase.co -> qbefejbnxrsdwtsbkmon
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] || 'unknown';

  // Get hostname
  const hostname = supabaseUrl.replace('https://', '').replace('http://', '');

  // Last 6 chars of anon key
  const anonKeyLast6 = anonKey.length > 6 ? '...' + anonKey.slice(-6) : anonKey;

  // Netlify context (if available)
  const netlifyContext = import.meta.env.VITE_NETLIFY_CONTEXT ||
                         import.meta.env.CONTEXT ||
                         'unknown';

  const handleInsertTestRequest = async () => {
    setIsInserting(true);
    setTestResult('Inserting...');

    try {
      const { data, error } = await supabase
        .from('interaction_requests')
        .insert({
          token_a: 'ui_probe',
          token_b: 'ui_probe',
          token_a_norm: 'ui_probe',
          token_b_norm: 'ui_probe',
          status: 'new',
          note: 'UI PROBE from debug mode',
          reason: 'unclear_result'
        })
        .select();

      if (error) {
        setTestResult(`❌ Error: ${error.message} (Code: ${error.code})`);
      } else {
        setTestResult(`✅ Success! Inserted row with ID: ${data?.[0]?.id || 'unknown'}`);
      }
    } catch (err) {
      setTestResult(`❌ Exception: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#1a1a1a',
        color: '#0f0',
        padding: '12px 20px',
        fontFamily: 'monospace',
        fontSize: '12px',
        borderTop: '2px solid #333',
        zIndex: 9999,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#fff', fontWeight: 'bold' }}>
          🐛 DEBUG MODE (add ?debug=1 to URL)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', marginBottom: '12px' }}>
          <div style={{ color: '#888' }}>Connected Supabase project:</div>
          <div style={{ color: '#0f0', fontWeight: 'bold' }}>{projectRef}</div>

          <div style={{ color: '#888' }}>Supabase URL host:</div>
          <div style={{ color: '#3b82f6' }}>{hostname}</div>

          <div style={{ color: '#888' }}>Anon key (last 6):</div>
          <div style={{ color: '#9ca3af' }}>{anonKeyLast6}</div>

          <div style={{ color: '#888' }}>Netlify context:</div>
          <div style={{ color: '#f59e0b' }}>{netlifyContext}</div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleInsertTestRequest}
            disabled={isInserting}
            style={{
              background: isInserting ? '#4b5563' : '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: isInserting ? 'not-allowed' : 'pointer',
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            {isInserting ? 'Inserting...' : '🧪 Insert test review request'}
          </button>

          {testResult && (
            <div
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                background: testResult.startsWith('✅') ? '#065f46' : '#991b1b',
                color: 'white',
                flex: 1,
                minWidth: '300px'
              }}
            >
              {testResult}
            </div>
          )}
        </div>

        <div style={{ marginTop: '8px', color: '#666', fontSize: '11px' }}>
          Test inserts: token_a='ui_probe', token_b='ui_probe', status='new', reason='unclear_result', note='UI PROBE from debug mode'
        </div>
      </div>
    </div>
  );
}
