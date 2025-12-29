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
    // CORS preflight
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 204,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json; charset=utf-8' },
        body: "",
      };
    }

    if (event.httpMethod !== "POST") {
      return json(405, { ok: false, error: "Method not allowed" });
    }

    // Environment validation
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error('[checker-get-interactions] Missing Supabase env vars');
      return json(500, {
        ok: false,
        error: 'Supabase configuration missing. Please contact support.',
      });
    }

    // Create Supabase client with correct env vars
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    // Parse and validate request
    const body = JSON.parse(event.body || "{}");
    const inputs = Array.isArray(body.inputs) ? body.inputs : [];

    const cleaned = inputs
      .map((x) => (typeof x === "string" ? x.trim() : ""))
      .filter(Boolean)
      .slice(0, 25);

    if (cleaned.length < 2) {
      return json(400, {
        ok: false,
        error: "Provide at least 2 substance names.",
      });
    }

    // Call RPC function
    const { data, error } = await supabase.rpc("checker_get_interactions", {
      input_names: cleaned,
    });

    if (error) {
      console.error('[checker-get-interactions] RPC error:', error);
      return json(500, {
        ok: false,
        error: error.message || 'Failed to check interactions',
      });
    }

    // Return successful response
    return json(200, {
      ok: true,
      ...data,
    });

  } catch (err) {
    console.error('[checker-get-interactions] Error:', err);
    return json(500, {
      ok: false,
      error: err?.message || 'Internal server error',
    });
  }
};
