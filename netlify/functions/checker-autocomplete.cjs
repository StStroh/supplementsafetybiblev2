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

function titleize(s) {
  return String(s || '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
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
      return json(500, { ok: false, error: 'Method not allowed' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceKey) {
      return json(500, {
        ok: false,
        error: 'Supabase env vars missing (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY/ANON_KEY)',
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    const qRaw = (event.queryStringParameters?.q || '').trim();
    const typeRaw = (event.queryStringParameters?.type || '').trim().toLowerCase(); // 'supplement' | 'drug'

    // Guardrails: avoid DB spam
    if (qRaw.length < 2) {
      return json(200, { ok: true, q: qRaw, type: typeRaw, suggestions: [] });
    }

    // Normalize using DB function so behavior matches token constraints
    // (Assumes norm_token(text) exists as you created earlier)
    const { data: normData, error: normErr } = await supabase.rpc('norm_token', { input: qRaw }).catch(() => ({
      data: null,
      error: null,
    }));

    // If norm_token is not exposed as RPC (depends how you defined it), fall back:
    const qNorm =
      typeof normData === 'string' && normData.length
        ? normData
        : qRaw.toLowerCase().replace(/[\s-]+/g, '');

    // ---- Try "pretty" join if checker_substances exists ----
    // We attempt a join; if it fails (table missing/column mismatch), we fall back to tokens-only.
    // Expected:
    // - checker_substance_tokens(substance_id, token)
    // - checker_substances(substance_id, name, type?)  <-- type optional
    const joinSelect =
      'token, substance_id, checker_substances(name, type)';

    let rows = null;

    {
      const { data, error } = await supabase
        .from('checker_substance_tokens')
        .select(joinSelect)
        .ilike('token', `${qNorm}%`)
        .limit(25);

      if (!error) {
        rows = data || [];
      } else {
        // fallback: tokens only (no join)
        const fallback = await supabase
          .from('checker_substance_tokens')
          .select('token, substance_id')
          .ilike('token', `${qNorm}%`)
          .limit(25);

        if (fallback.error) {
          return json(500, { ok: false, error: fallback.error.message || String(fallback.error) });
        }
        rows = fallback.data || [];
      }
    }

    // Build suggestions: unique by substance_id, prefer pretty name if available
    const seen = new Set();
    const suggestions = [];

    for (const r of rows) {
      const id = r.substance_id;
      if (!id || seen.has(id)) continue;

      // If join worked, r.checker_substances might be object OR array depending on relationship.
      let name = null;
      let itemType = null;

      const cs = r.checker_substances;
      if (cs) {
        // sometimes it's an array
        const cs0 = Array.isArray(cs) ? cs[0] : cs;
        name = cs0?.name ?? null;
        itemType = (cs0?.type ?? null);
      }

      // If type filter is present AND we have type on the record, enforce it.
      if (typeRaw && itemType && String(itemType).toLowerCase() !== typeRaw) {
        continue;
      }

      seen.add(id);

      const label =
        name
          ? name
          : titleize(r.token); // fallback pretty-ish label from token

      suggestions.push({
        id,
        label,
        type: itemType ? String(itemType).toLowerCase() : null,
      });

      if (suggestions.length >= 10) break;
    }

    return json(200, { ok: true, q: qRaw, type: typeRaw, suggestions });
  } catch (e) {
    return json(500, { ok: false, error: e?.message ? e.message : String(e) });
  }
};
;
