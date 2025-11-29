const { createClient } = require('@supabase/supabase-js');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  // Only accept GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Read query parameter
  const q = event.queryStringParameters?.q;

  if (!q) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Missing query parameter: q' })
    };
  }

  // Read env vars - prioritize SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('[search-interactions] Missing env:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey
    });
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: false, error: 'SEARCH_FAILED' })
    };
  }

  // Create Supabase client with service role key (bypasses RLS)
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
  });

  try {
    // Call RPC function
    const { data, error } = await supabase.rpc('search_interactions', { q });

    if (error) {
      console.error('[search-interactions] RPC error:', error.message);
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({ ok: false, error: 'SEARCH_FAILED' })
      };
    }

    // Return results (empty array if no results)
    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600'
      },
      body: JSON.stringify(data || [])
    };
  } catch (error) {
    console.error('[search-interactions] Unexpected error:', error.message);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: false, error: 'SEARCH_FAILED' })
    };
  }
};
