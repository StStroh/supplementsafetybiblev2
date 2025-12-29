/*
 * Production Autocomplete with Diagnostics (FIXED)
 * Searches checker_substance_tokens for fast prefix matching
 * Query params: q (query), type (supplement|drug), limit (max results)
 *
 * Key fixes:
 * - Use DB-normalized token prefix (strip non-alphanumerics) to match norm_token strategy
 * - Query checker_substances using expected columns: type (not substance_type)
 * - Do not select non-existent columns like aliases (aliases live in tokens table)
 */

const { supabaseAdmin } = require('./_lib/supabaseAdmin.cjs');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

// Match your DB normalization: lowercase + remove non-alphanumeric
function normPrefix(input) {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: CORS_HEADERS,
        body: '',
      };
    }

    if (event.httpMethod !== 'GET') {
      return json(405, { ok: false, error: 'Method not allowed' });
    }

    const q = (event.queryStringParameters?.q || '').trim();
    const type = (event.queryStringParameters?.type || '').toLowerCase();
    const limit = Math.min(parseInt(event.queryStringParameters?.limit || '10', 10), 50);

    if (q.length < 2) {
      return json(200, { ok: true, q, type, results: [] });
    }

    const supabase = supabaseAdmin();
    const normalized = normPrefix(q);

    console.log(`[autocomplete] Query: "${q}", Normalized: "${normalized}", Type: ${type}, Limit: ${limit}`);

    if (normalized.length < 2) {
      // If user types only punctuation/spaces etc.
      return json(200, { ok: true, q, type, results: [] });
    }

    const { data: tokens, error: tokenError } = await supabase
      .from('checker_substance_tokens')
      .select('substance_id, token')
      .ilike('token', `${normalized}%`)
      .limit(30);

    if (tokenError) {
      console.error('[autocomplete] Token query error:', tokenError);
      return json(500, {
        ok: false,
        error: 'Token search failed',
        detail: tokenError.message,
      });
    }

    if (!tokens || tokens.length === 0) {
      return json(200, { ok: true, q, type, results: [] });
    }

    const substanceIds = [...new Set(tokens.map((t) => t.substance_id))];

    // FIX: checker_substances uses `type`, not `substance_type`
    // FIX: do not select `aliases` unless it truly exists
    let query = supabase
      .from('checker_substances')
      .select('substance_id, display_name, canonical_name, type')
      .in('substance_id', substanceIds)
      .eq('is_active', true);

    if (type === 'supplement' || type === 'drug') {
      query = query.eq('type', type);
    }

    query = query.limit(limit);

    const { data: substances, error: substanceError } = await query;

    if (substanceError) {
      console.error('[autocomplete] Substance query error:', substanceError);
      return json(500, {
        ok: false,
        error: 'Substance lookup failed',
        detail: substanceError.message,
      });
    }

    const results = (substances || []).map((s) => ({
      substance_id: s.substance_id,
      display_name: s.display_name,
      canonical_name: s.canonical_name,
      type: s.type,
      aliases: [], // keep for UI compatibility; tokens table is the source of aliases
    }));

    console.log(`[autocomplete] Found ${results.length} results`);

    return json(200, {
      ok: true,
      q,
      type,
      results,
    });
  } catch (err) {
    console.error('[autocomplete] Unexpected error:', err);
    return json(500, {
      ok: false,
      error: 'Internal server error',
      detail: err?.message || String(err),
    });
  }
};
