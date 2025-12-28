const { createClient } = require('@supabase/supabase-js');

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

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 204, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json; charset=utf-8' }, body: '' };
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: {
          ...CORS_HEADERS,
          'Allow': 'POST',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ ok: false, error: 'Method not allowed. Use POST.' }),
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !serviceKey) {
      return json(500, { ok: false, error: 'Supabase env vars missing (SUPABASE_URL + SERVICE_ROLE_KEY/ANON_KEY)' });
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    // Parse POST body
    let body = {};
    try {
      body = event.body ? JSON.parse(event.body) : {};
    } catch (parseErr) {
      return json(400, { ok: false, error: 'Invalid JSON body' });
    }

    const qRaw = (body.q || '').trim();
    const typeRaw = (body.type || '').trim().toLowerCase(); // 'supplement' | 'drug' maybe

    // Guardrails (avoid hammering DB on empty or 1-char queries)
    if (qRaw.length < 2) {
      return json(200, { ok: true, q: qRaw, type: typeRaw, suggestions: [] });
    }

    // We don’t actually need "type" to return suggestions if tokens table is shared.
    // But we keep it in the response for the UI.
    // If you later add separate token sets per type, filter here.

    // Normalize query in SQL using your norm_token function:
    // We'll do a LIKE search on token (already normalized in your DB).
    // Important: use "ilike" for prefix search; token is normalized so case won't matter.
    const qNorm = qRaw; // keep raw; DB token is normalized; we search prefix-ish

    const { data, error } = await supabase
      .from('checker_substance_tokens')
      .select('token, substance_id')
      .ilike('token', `${qNorm.toLowerCase().replace(/\s+/g, '')}%`)
      .limit(12);

    if (error) {
      return json(500, { ok: false, error: error.message || String(error) });
    }

    // Return unique substance_ids (best-effort), but also include token hits.
    const seen = new Set();
    const suggestions = [];
    for (const row of data || []) {
      const key = row.substance_id;
      if (seen.has(key)) continue;
      seen.add(key);
      suggestions.push({
        id: row.substance_id,
        label: row.token, // UI can display token; if you want "pretty name" later, join a substances table
      });
      if (suggestions.length >= 10) break;
    }

    return json(200, { ok: true, q: qRaw, type: typeRaw, suggestions });
  } catch (e) {
    return json(500, { ok: false, error: e?.message ? e.message : String(e) });
  }
};


