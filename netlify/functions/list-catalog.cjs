import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, ANON_KEY);

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const [supRes, medRes] = await Promise.all([
      supabase.from('supplements').select('id,name').order('name'),
      supabase.from('medications').select('id,name').order('name'),
    ]);

    if (supRes.error || medRes.error) {
      console.error('[list-catalog] Supabase error:', supRes.error || medRes.error);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          supplements: [],
          medications: [],
          fallback: true,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        supplements: supRes.data || [],
        medications: medRes.data || [],
        fallback: false,
      }),
    };
  } catch (err) {
    console.error('[list-catalog] Error:', err);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        supplements: [],
        medications: [],
        fallback: true,
        error: err.message,
      }),
    };
  }
}
