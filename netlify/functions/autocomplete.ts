import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { q } = event.queryStringParameters || {};

    if (!q || q.length < 2) {
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestions: [] })
      };
    }

    const searchTerm = q.toLowerCase();

    const { data: suppData } = await supabase
      .from('v_supp_keys')
      .select('key, canonical')
      .ilike('key', `%${searchTerm}%`)
      .limit(5);

    const { data: medData } = await supabase
      .from('v_med_keys')
      .select('key, canonical')
      .ilike('key', `%${searchTerm}%`)
      .limit(5);

    const suppSuggestions = [...new Set((suppData || []).map(s => s.canonical))]
      .slice(0, 5)
      .map(name => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        type: 'supplement' as const
      }));

    const medSuggestions = [...new Set((medData || []).map(m => m.canonical))]
      .slice(0, 5)
      .map(name => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        type: 'medication' as const
      }));

    const suggestions = [...suppSuggestions, ...medSuggestions].slice(0, 10);

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ suggestions })
    };
  } catch (error) {
    console.error('Autocomplete error:', error);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Autocomplete failed' })
    };
  }
};
