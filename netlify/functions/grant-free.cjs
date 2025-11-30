const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod === 'GET') {
    const serviceKeyPresent = SUPABASE_SERVICE_ROLE_KEY && SUPABASE_SERVICE_ROLE_KEY.length > 10;
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ok: true,
        env: {
          service_role_key: serviceKeyPresent ? 'present' : 'missing',
        },
      }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('grant-free: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
      return {
        statusCode: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ok: false,
          error: 'Server configuration error',
        }),
      };
    }

    const body = JSON.parse(event.body || '{}');
    const { name, email } = body;

    if (!name && !email) {
      return {
        statusCode: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ok: false,
          error: 'Name or email is required',
        }),
      };
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    let userId;

    if (email) {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const { data: anonUser, error: authError } = await supabase.auth.signInAnonymously();
        if (authError) {
          console.error('grant-free: Auth error:', authError);
          throw new Error('Failed to create user');
        }
        userId = anonUser.user.id;
      }
    } else {
      const { data: anonUser, error: authError } = await supabase.auth.signInAnonymously();
      if (authError) {
        console.error('grant-free: Auth error:', authError);
        throw new Error('Failed to create user');
      }
      userId = anonUser.user.id;
    }

    const now = new Date().toISOString();
    const profileData = {
      id: userId,
      plan: 'free',
      subscription_status: 'active',
      activated_at: now,
    };

    if (name) profileData.name = name;
    if (email) profileData.email = email.toLowerCase();

    const { error: upsertError } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'id' });

    if (upsertError) {
      console.error('grant-free: Upsert error:', upsertError);
      throw new Error('Failed to activate free plan');
    }

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ok: true,
        user_id: userId,
      }),
    };
  } catch (error) {
    console.error('grant-free: Error:', error);
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ok: false,
        error: error.message || 'Internal server error',
      }),
    };
  }
};
