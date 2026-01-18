/*
 * Handle requests to add missing substances
 * Stores user submissions in interaction_requests table
 * Uses smart duplicate detection and priority scoring
 */

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
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json; charset=utf-8' },
        body: '',
      };
    }

    if (event.httpMethod !== 'POST') {
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

    // Parse request body
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (parseError) {
      return json(400, { ok: false, error: 'Invalid JSON' });
    }

    const {
      raw_name,
      kind = 'unknown',
    } = body;

    // Validate required fields
    if (!raw_name || typeof raw_name !== 'string' || raw_name.trim().length === 0) {
      return json(400, {
        ok: false,
        error: 'raw_name is required and must be a non-empty string',
      });
    }

    // Map old 'drug' to 'medication', normalize kind
    let substanceType = kind;
    if (kind === 'drug') substanceType = 'medication';
    if (!['supplement', 'medication'].includes(substanceType)) {
      substanceType = 'unknown';
    }

    // Get user auth context (will be used by RPC function automatically via auth.uid())
    const authHeader = event.headers.authorization || event.headers.Authorization;
    let supabaseWithAuth = supabase;

    if (authHeader) {
      try {
        const token = authHeader.replace(/^Bearer\s+/i, '');
        // Create authenticated client
        supabaseWithAuth = createClient(supabaseUrl, serviceKey, {
          auth: {
            persistSession: false,
          },
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });
      } catch (authError) {
        // Continue with service role client (anonymous submission)
        console.log('[checker-request-add] Auth parse failed, proceeding anonymously');
      }
    }

    // Call the smart RPC function that handles duplicates and priority
    const { data: requestId, error: rpcError } = await supabaseWithAuth.rpc(
      'handle_duplicate_interaction_request',
      {
        p_substance_name: raw_name.trim(),
        p_interaction_with: null,
      }
    );

    if (rpcError) {
      console.error('[checker-request-add] RPC error:', rpcError);
      return json(500, {
        ok: false,
        error: 'Failed to submit request',
        details: rpcError.message,
      });
    }

    return json(201, {
      ok: true,
      message: 'Request submitted successfully. We prioritize requests based on frequency and safety importance.',
      request_id: requestId,
    });

  } catch (e) {
    console.error('[checker-request-add] Error:', e);
    return json(500, {
      ok: false,
      error: e?.message || 'Internal server error',
    });
  }
};
