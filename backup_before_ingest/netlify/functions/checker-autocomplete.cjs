const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const params = event.queryStringParameters || {};
    const query = (params.q || '').toLowerCase().trim();
    const type = params.type || ''; // 'drug', 'supplement', or empty for all

    if (!query || query.length < 2) {
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ results: [] })
      };
    }

    console.log('[Autocomplete] Query:', query, 'Type:', type);

    // Build query
    let dbQuery = supabase
      .from('checker_substances')
      .select('substance_id, type, display_name, canonical_name, aliases')
      .eq('is_active', true);

    // Filter by type if specified
    if (type && (type === 'drug' || type === 'supplement')) {
      dbQuery = dbQuery.eq('type', type);
    }

    // Search by display_name (case insensitive) OR aliases contains query
    dbQuery = dbQuery.or(`display_name.ilike.%${query}%,canonical_name.ilike.%${query}%,aliases.cs.{${query}}`);

    // Limit results
    dbQuery = dbQuery.limit(8);

    const { data, error } = await dbQuery;

    if (error) {
      console.error('[Autocomplete] DB error:', error);
      return {
        statusCode: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Database query failed', details: error.message })
      };
    }

    // Filter results where aliases contain the query (case insensitive)
    const filtered = (data || []).filter(item => {
      const displayMatch = item.display_name.toLowerCase().includes(query);
      const canonicalMatch = item.canonical_name && item.canonical_name.toLowerCase().includes(query);
      const aliasMatch = item.aliases && item.aliases.some(alias => alias.toLowerCase().includes(query));
      return displayMatch || canonicalMatch || aliasMatch;
    });

    // Sort: exact matches first, then startsWith, then contains
    const sorted = filtered.sort((a, b) => {
      const aName = a.display_name.toLowerCase();
      const bName = b.display_name.toLowerCase();

      if (aName === query) return -1;
      if (bName === query) return 1;

      if (aName.startsWith(query) && !bName.startsWith(query)) return -1;
      if (bName.startsWith(query) && !aName.startsWith(query)) return 1;

      return aName.localeCompare(bName);
    });

    console.log('[Autocomplete] Found', sorted.length, 'results');

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ results: sorted.slice(0, 8) })
    };
  } catch (err) {
    console.error('[Autocomplete] Error:', err);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error', details: err.message })
    };
  }
};
