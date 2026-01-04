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

    // Run sales intent agent
    const analysis = analyzeSalesIntent(payload);

    // Store in database
    const { error: insertError } = await supabase
      .from('lead_signals')
      .insert({
        session_id: payload.session_id,
        intent_level: analysis.intent.level,
        confidence: analysis.intent.confidence,
        urgency: analysis.intent.urgency,
        product_type: analysis.customer_need.product_type,
        buyer_type: analysis.customer_need.buyer_type,
        offer: analysis.offer.recommended,
        cta: analysis.sales_action.cta,
        sales_message: analysis.sales_message,
        lead_score: analysis.internal_signal.lead_score,
        follow_up: analysis.internal_signal.follow_up,
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
