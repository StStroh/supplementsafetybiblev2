/*
 * Fast Substance Search for Autocomplete
 * Uses Supabase RPC function checker_search_substances for optimal performance
 */

const { createClient } = require('@supabase/supabase-js');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type, authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  try {
    // CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json; charset=utf-8' },
        body: '',
      };
    }

    if (event.httpMethod !== 'GET') {
      return json(405, { ok: false, error: 'Method not allowed' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceKey) {
      return json(500, {
        ok: false,
        error: 'Supabase configuration missing',
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    // Get query parameters
    const q = (event.queryStringParameters?.q || '').trim();
    const kind = (event.queryStringParameters?.kind || 'any').trim().toLowerCase();
    const limit = parseInt(event.queryStringParameters?.limit || '10', 10);

    // Validate parameters
    if (q.length < 1) {
      return json(200, { ok: true, q, kind, results: [] });
    }

    if (limit < 1 || limit > 50) {
      return json(400, { ok: false, error: 'Limit must be between 1 and 50' });
    }

    if (!['any', 'supplement', 'drug'].includes(kind)) {
      return json(400, { ok: false, error: 'Kind must be: any, supplement, or drug' });
    }

    // Call the RPC function for fast search
    const { data, error } = await supabase.rpc('checker_search_substances', {
      q,
      kind,
      lim: limit,
    });

    if (error) {
      console.error('[checker-search] RPC error:', error);
      return json(500, {
        ok: false,
        error: error.message || 'Search failed',
      });
    }

    // Transform results to match expected format
    const results = (data || []).map(item => ({
      substance_id: item.substance_id,
      display_name: item.display_name,
      canonical_name: item.canonical_name,
      type: item.substance_type || kind,
      aliases: Array.isArray(item.aliases) ? item.aliases : [],
      match_score: item.match_score || 0,
    }));

    return json(200, {
      ok: true,
      q,
      kind,
      results,
      count: results.length,
    });

  } catch (e) {
    console.error('[checker-search] Error:', e);
    return json(500, {
      ok: false,
      error: e?.message || 'Internal server error',
    });
  }
};
