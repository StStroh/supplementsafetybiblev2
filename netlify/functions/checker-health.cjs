/*
 * Checker Health Diagnostic Endpoint
 * Verifies Supabase connectivity and returns sample data
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

    const hasUrl = !!(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL);
    const hasServiceKey = !!(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE);

    if (!hasUrl || !hasServiceKey) {
      return json(500, {
        ok: false,
        error: 'Missing environment variables',
        env: { hasUrl, hasServiceKey },
      });
    }

    const supabase = supabaseAdmin();

    const { count: magnesiumCount, error: countError } = await supabase
      .from('checker_substance_tokens')
      .select('*', { count: 'exact', head: true })
      .ilike('token', 'ma%');

    if (countError) {
      return json(500, {
        ok: false,
        error: 'Database query failed',
        detail: countError.message,
        env: { hasUrl, hasServiceKey },
      });
    }

    const { count: totalTokens, error: totalError } = await supabase
      .from('checker_substance_tokens')
      .select('*', { count: 'exact', head: true });

    const { count: totalSubstances, error: substancesError } = await supabase
      .from('checker_substances')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    return json(200, {
      ok: true,
      env: { hasUrl, hasServiceKey },
      sample: {
        magnesiumCount: magnesiumCount || 0,
        totalTokens: totalTokens || 0,
        totalSubstances: totalSubstances || 0,
      },
      now: new Date().toISOString(),
    });

  } catch (err) {
    console.error('[checker-health] Error:', err);
    return json(500, {
      ok: false,
      error: 'Internal server error',
      detail: err?.message || String(err),
    });
  }
};
