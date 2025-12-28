/*
 * Handle requests to add missing substances
 * Stores user submissions in checker_missing_requests table
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
      kind = 'any',
      locale,
      page,
    } = body;

    // Validate required fields
    if (!raw_name || typeof raw_name !== 'string' || raw_name.trim().length === 0) {
      return json(400, {
        ok: false,
        error: 'raw_name is required and must be a non-empty string',
      });
    }

    if (!['supplement', 'drug', 'any'].includes(kind)) {
      return json(400, {
        ok: false,
        error: 'kind must be: supplement, drug, or any',
      });
    }

    // Check for duplicate recent requests (past 7 days)
    const { data: similar, error: similarError } = await supabase.rpc(
      'checker_find_similar_requests',
      {
        search_name: raw_name.trim(),
        search_kind: kind,
        days_back: 7,
      }
    );

    if (!similarError && similar && similar.length > 0) {
      // Found a recent similar request
      return json(200, {
        ok: true,
        duplicate: true,
        message: 'This substance has already been requested recently',
        existing_request: similar[0],
      });
    }

    // Get user info if authenticated
    let userEmail = null;
    let userId = null;

    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (authHeader) {
      try {
        const token = authHeader.replace(/^Bearer\s+/i, '');
        const { data: { user }, error: userError } = await supabase.auth.getUser(token);
        if (!userError && user) {
          userEmail = user.email;
          userId = user.id;
        }
      } catch (authError) {
        // Continue without auth - anonymous submission allowed
        console.log('[checker-request-add] Auth check failed, proceeding anonymously');
      }
    }

    // Extract user agent and other metadata
    const userAgent = event.headers['user-agent'] || null;

    // Insert the request
    const { data: inserted, error: insertError } = await supabase
      .from('checker_missing_requests')
      .insert({
        raw_name: raw_name.trim(),
        kind,
        user_email: userEmail,
        user_id: userId,
        locale: locale || null,
        user_agent: userAgent,
        page: page || null,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('[checker-request-add] Insert error:', insertError);
      return json(500, {
        ok: false,
        error: 'Failed to submit request',
        details: insertError.message,
      });
    }

    return json(201, {
      ok: true,
      message: 'Request submitted successfully',
      request_id: inserted.id,
      duplicate: false,
    });

  } catch (e) {
    console.error('[checker-request-add] Error:', e);
    return json(500, {
      ok: false,
      error: e?.message || 'Internal server error',
    });
  }
};
