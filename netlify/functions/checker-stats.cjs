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
      'Cache-Control': 'public, max-age=300',
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json; charset=utf-8',
        },
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
        error: 'Supabase env vars missing (SUPABASE_URL + SERVICE_ROLE_KEY/ANON_KEY)',
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    // Try to check if checker_substances has type column
    const { data: typeCheckData, error: typeCheckError } = await supabase
      .from('checker_substances')
      .select('type')
      .limit(1)
      .maybeSingle();

    let supplements = null;
    let drugs = null;

    // If type column exists and we got data, count by type
    if (!typeCheckError && typeCheckData !== undefined) {
      const { count: suppCount, error: suppError } = await supabase
        .from('checker_substances')
        .select('substance_id', { count: 'exact', head: true })
        .eq('type', 'supplement')
        .eq('is_active', true);

      const { count: drugCount, error: drugError } = await supabase
        .from('checker_substances')
        .select('substance_id', { count: 'exact', head: true })
        .eq('type', 'drug')
        .eq('is_active', true);

      if (!suppError) supplements = suppCount || 0;
      if (!drugError) drugs = drugCount || 0;
    }

    // Count total tokens
    const { count: tokensCount, error: tokensError } = await supabase
      .from('checker_substance_tokens')
      .select('token', { count: 'exact', head: true });

    if (tokensError) {
      return json(500, { ok: false, error: tokensError.message });
    }

    // Count interactions
    const { count: interactionsCount, error: interactionsError } = await supabase
      .from('checker_interactions')
      .select('interaction_id', { count: 'exact', head: true });

    if (interactionsError) {
      return json(500, { ok: false, error: interactionsError.message });
    }

    // If we don't have type-based counts, use distinct substance_ids from tokens
    if (supplements === null && drugs === null) {
      const { data: distinctSubstances, error: substanceError } = await supabase
        .from('checker_substance_tokens')
        .select('substance_id');

      if (!substanceError && distinctSubstances) {
        const uniqueSubstances = new Set(distinctSubstances.map(s => s.substance_id));
        // In this fallback case, we can't distinguish supplements from drugs
        // So we return null for both
        supplements = null;
        drugs = null;
      }
    }

    return json(200, {
      ok: true,
      counts: {
        supplements,
        drugs,
        interactions: interactionsCount || 0,
        tokens: tokensCount || 0,
      },
    });
  } catch (err) {
    console.error('checker-stats error:', err);
    return json(500, {
      ok: false,
      error: err.message || 'Internal server error',
    });
  }
};
