// netlify/functions/checker-get-interactions.cjs
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type, authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const inputs = Array.isArray(body.inputs) ? body.inputs : [];

    const cleaned = inputs
      .map(x => typeof x === 'string' ? x.trim() : '')
      .filter(Boolean)
      .slice(0, 25);

    if (cleaned.length < 2) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Provide at least 2 inputs.' })
      };
    }

    console.log('[Checker Get Interactions] Checking interactions for:', cleaned);

    const { data, error } = await supabase.rpc(
      'checker_get_interactions',
      { input_names: cleaned }
    );

    if (error) {
      console.error('[Checker Get Interactions] RPC error:', error);
      return {
        statusCode: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: error.message })
      };
    }

    console.log('[Checker Get Interactions] Found', (data || []).length, 'interactions');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ data })
    };
  } catch (err) {
    console.error('[Checker Get Interactions] Error:', err);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: String(err) })
    };
  }
};
