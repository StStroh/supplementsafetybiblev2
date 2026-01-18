const { createClient } = require('@supabase/supabase-js');
const { analyzeSalesIntent } = require('./_lib/salesIntentAgent.cjs');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');

    if (!payload.session_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'session_id required' })
      };
    }

    if (!payload.event_type) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'event_type required' })
      };
    }

    const validEventTypes = ['search', 'checker_run', 'page_view'];
    if (!validEventTypes.includes(payload.event_type)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'event_type must be one of: search, checker_run, page_view' })
      };
    }

    // Run sales intent agent
    const analysis = analyzeSalesIntent(payload);

    // Store in database
    const { error: insertError } = await supabase
      .from('lead_signals')
      .insert({
        session_id: payload.session_id,
        user_id: payload.user_id || null,
        event_type: payload.event_type,
        page_path: payload.page_path || null,
        search_terms: payload.search_terms || null,
        checker_items: payload.checker_items || null,
        repeat_count: payload.repeat_count || null,
        time_on_page_seconds: payload.time_on_page_seconds || null,
        intent_level: analysis.intent.level,
        confidence: analysis.intent.confidence,
        urgency: analysis.intent.urgency,
        offer: analysis.offer.recommended,
        cta: analysis.sales_action.cta,
        sales_message: analysis.sales_message,
        lead_score: analysis.internal_signal.lead_score,
        follow_up: analysis.internal_signal.follow_up,
        timing: analysis.internal_signal.timing,
        raw_payload: payload
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
    }

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(analysis)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
