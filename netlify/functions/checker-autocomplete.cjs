/*
 * Production Autocomplete with Brand Name Aliases
 * Searches checker_substance_tokens AND alias_packs for fast prefix matching
 * Query params: q (query), type (supplement|drug), limit (max results)
 *
 * Key features:
 * - Use DB-normalized token prefix (strip non-alphanumerics) to match norm_token strategy
 * - Search alias_packs for brand names (e.g., "Tylenol" → "acetaminophen")
 * - Query checker_substances using expected columns: type (not substance_type)
 * - Do not select non-existent columns like aliases (aliases live in tokens table)
 * - Uses anon key (not service role) since RLS allows public read access
 */

const { createClient } = require('@supabase/supabase-js');

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
    const typeRaw = (event.queryStringParameters?.type || '').toLowerCase();

const type =
  typeRaw === 'medicine' || typeRaw === 'medication' || typeRaw === 'rx'
    ? 'drug'
    : typeRaw;

    const limit = Math.min(parseInt(event.queryStringParameters?.limit || '10', 10), 50);

    if (q.length < 2) {
      return json(200, { ok: true, q, type, results: [] });
    }

    // Use anon key for public autocomplete (RLS policies allow anon read access)
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('[autocomplete] Missing Supabase credentials');
      return json(500, {
        ok: false,
        error: 'Database configuration missing',
        detail: 'SUPABASE_URL and SUPABASE_ANON_KEY required'
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    const normalized = normPrefix(q);

    console.log(`[autocomplete] Query: "${q}", Normalized: "${normalized}", Type: ${type}, Limit: ${limit}`);

    if (normalized.length < 2) {
      // If user types only punctuation/spaces etc.
      return json(200, { ok: true, q, type, results: [] });
    }

    // Search both tokens and alias packs in parallel
    const [tokensResult, aliasResult] = await Promise.all([
      supabase
        .from('checker_substance_tokens')
        .select('substance_id, token')
        .ilike('token', `${normalized}%`)
        .limit(30),
      supabase
        .from('alias_packs')
        .select('substance_id, brand_name')
        .ilike('brand_name', `${q}%`)
        .eq('is_active', true)
        .limit(20)
    ]);

    if (tokensResult.error) {
      console.error('[autocomplete] Token query error:', tokensResult.error);
      return json(500, {
        ok: false,
        error: 'Token search failed',
        detail: tokensResult.error.message,
      });
    }

    if (aliasResult.error) {
      console.error('[autocomplete] Alias query error:', aliasResult.error);
    }

    const tokens = tokensResult.data || [];
    const aliases = aliasResult.data || [];

    console.log(`[autocomplete] Found ${tokens.length} token matches, ${aliases.length} alias matches`);

    const tokenSubstanceIds = tokens.map((t) => t.substance_id);
    const aliasSubstanceIds = aliases.map((a) => a.substance_id);
    const substanceIds = [...new Set([...tokenSubstanceIds, ...aliasSubstanceIds])];

    if (substanceIds.length === 0) {
      return json(200, { ok: true, q, type, results: [] });
    }

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
