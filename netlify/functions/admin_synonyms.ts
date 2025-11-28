import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      const { data: suppSynonyms } = await supabase
        .from('supplement_synonyms')
        .select('synonym_key, canonical_key');

      const { data: medSynonyms } = await supabase
        .from('medication_synonyms')
        .select('synonym_key, canonical_key');

      const synonyms = [
        ...(suppSynonyms || []).map(s => ({ ...s, type: 'supplement' })),
        ...(medSynonyms || []).map(m => ({ ...m, type: 'medication' }))
      ];

      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ synonyms })
      };
    }

    if (event.httpMethod === 'POST') {
      const { action, synonym_key, canonical_key, type } = JSON.parse(event.body || '{}');

      if (action === 'add') {
        if (!synonym_key || !canonical_key || !type) {
          return {
            statusCode: 400,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Missing required fields' })
          };
        }

        const table = type === 'supplement' ? 'supplement_synonyms' : 'medication_synonyms';

        const { error } = await supabase
          .from(table)
          .upsert({ synonym_key, canonical_key }, { onConflict: 'synonym_key' });

        if (error) throw error;

        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true })
        };
      }

      if (action === 'delete') {
        if (!synonym_key || !type) {
          return {
            statusCode: 400,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Missing required fields' })
          };
        }

        const table = type === 'supplement' ? 'supplement_synonyms' : 'medication_synonyms';

        const { error } = await supabase
          .from(table)
          .delete()
          .eq('synonym_key', synonym_key);

        if (error) throw error;

        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true })
        };
      }

      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid action' })
      };
    }

    return {
      statusCode: 405,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Admin synonyms error:', error);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Operation failed' })
    };
  }
};
