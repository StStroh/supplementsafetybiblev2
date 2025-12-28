/**
 * Netlify Function: checker-benchmark
 *
 * POST JSON:
 *   { "inputs": ["omega-3","warfarin"], "runs": 10 }
 *
 * Returns:
 *   {
 *     ok: true,
 *     runs: number,
 *     stats: { p50_ms, p95_ms, min_ms, max_ms, avg_ms },
 *     sample: { summary, results_count },
 *     contract_ok: boolean
 *   }
 *
 * Notes:
 * - Measures full-stack latency (Netlify + network + Supabase RPC).
 * - Keeps checker-get-interactions.cjs pure passthrough.
 */

const { createClient } = require('@supabase/supabase-js');

/* =========================
   CORS + JSON helpers
   ========================= */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type, authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

/* =========================
   Contract verification
   ========================= */

function asNumber(x) {
  return typeof x === 'number' && Number.isFinite(x);
}

function contractOk(payload) {
  if (!payload || typeof payload !== 'object') return false;

  const { results, summary } = payload;
  if (!Array.isArray(results)) return false;
  if (!summary || typeof summary !== 'object') return false;

  const keys = ['total', 'avoid', 'caution', 'monitor', 'info'];
  for (const k of keys) {
    if (!asNumber(summary[k])) return false;
  }
  return true;
}

/* =========================
   Stats helpers
   ========================= */

function percentile(sortedAsc, p) {
  if (!sortedAsc.length) return null;
  if (sortedAsc.length === 1) return sortedAsc[0];

  const idx = (sortedAsc.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sortedAsc[lo];

  const w = idx - lo;
  return sortedAsc[lo] * (1 - w) + sortedAsc[hi] * w;
}

/* =========================
   Netlify handler
   ========================= */

exports.handler = async (event) => {
  try {
    /* ---- CORS preflight ---- */
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

    if (event.httpMethod !== 'POST') {
      return json(500, { ok: false, error: 'Method not allowed' });
    }

    /* ---- Parse body ---- */
    let parsed;
    try {
      parsed = event.body ? JSON.parse(event.body) : {};
    } catch {
      return json(500, { ok: false, error: 'Invalid JSON body' });
    }

    const inputs = Array.isArray(parsed.inputs) ? parsed.inputs : null;
    if (!inputs || inputs.length === 0) {
      return json(500, {
        ok: false,
        error: 'Missing or invalid "inputs" (must be a non-empty array)',
      });
    }

    let runs = Number.isFinite(parsed.runs)
      ? parsed.runs
      : parseInt(parsed.runs, 10);

    if (!Number.isFinite(runs)) runs = 10;
    runs = Math.max(1, Math.min(50, runs)); // default + cap

    /* ---- Supabase client ---- */
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceKey) {
      return json(500, {
        ok: false,
        error:
          'Supabase env vars missing (SUPABASE_URL + SERVICE_ROLE_KEY/ANON_KEY)',
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    /* ---- Benchmark loop ---- */
    const elapsed = [];
    let samplePayload = null;

    for (let i = 0; i < runs; i++) {
      const start = Date.now();

      const { data, error } = await supabase.rpc(
        'checker_get_interactions',
        { inputs }
      );

      const ms = Date.now() - start;
      elapsed.push(ms);

      if (error) {
        return json(500, {
          ok: false,
          error: `Supabase RPC error: ${error.message || String(error)}`,
        });
      }

      if (i === 0) {
        samplePayload = data;
      }
    }

    /* ---- Stats ---- */
    const sorted = [...elapsed].sort((a, b) => a - b);

    const stats = {
      min_ms: sorted[0],
      max_ms: sorted[sorted.length - 1],
      avg_ms: elapsed.reduce((a, b) => a + b, 0) / elapsed.length,
      p50_ms: percentile(sorted, 0.5),
      p95_ms: percentile(sorted, 0.95),
    };

    const contract_ok = contractOk(samplePayload);

    const sample = {
      summary: samplePayload?.summary || null,
      results_count: Array.isArray(samplePayload?.results)
        ? samplePayload.results.length
        : null,
    };

    return json(200, {
      ok: true,
      runs,
      stats,
      sample,
      contract_ok,
    });
  } catch (e) {
    return json(500, {
      ok: false,
      error: e?.message ? e.message : String(e),
    });
  }
};
