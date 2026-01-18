import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

    // Use the new RPC function for token suggestions
    const { data: tokens, error } = await supabase
      .rpc('rpc_suggest_tokens', {
        prefix: q.trim(),
        limit_n: 10
      });

    if (error) {
      console.error('RPC error:', error);
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestions: [] })
      };
    }

    // Get substance details to determine type (supplement vs drug)
    const substanceIds = [...new Set((tokens || []).map((t: any) => t.substance_id))];

    const { data: substances } = await supabase
      .from('checker_substances')
      .select('substance_id, display_name, type')
      .in('substance_id', substanceIds);

    const substanceMap = new Map(
      (substances || []).map((s: any) => [s.substance_id, s])
    );

    // Build suggestions with proper type and display name
    const suggestions = (tokens || [])
      .map((t: any) => {
        const substance = substanceMap.get(t.substance_id);
        if (!substance) return null;

        return {
          name: substance.display_name,
          type: substance.type === 'drug' ? 'medication' : 'supplement'
        };
      })
      .filter((s: any) => s !== null)
      .slice(0, 10);

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
