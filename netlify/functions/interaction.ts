import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { id } = event.queryStringParameters || {};

    if (!id) {
      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing interaction ID' })
      };
    }

    const { data, error } = await supabase
      .from('interactions')
      .select(`
        id,
        severity,
        description,
        recommendation,
        supplements:supplement_id(name),
        medications:medication_id(name)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return {
        statusCode: 404,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Interaction not found' })
      };
    }

    const interaction = {
      id: data.id,
      supplement_name: data.supplements?.name || 'Unknown',
      medication_name: data.medications?.name || 'Unknown',
      severity: data.severity,
      description: data.description,
      recommendation: data.recommendation
    };

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ interaction })
    };
  } catch (error) {
    console.error('Interaction fetch error:', error);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to load interaction' })
    };
  }
};
