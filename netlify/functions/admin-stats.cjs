const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminKey = process.env.ADMIN_KEY;

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const providedKey = event.headers['x-admin-key'];

  if (!adminKey || providedKey !== adminKey) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing Supabase configuration' })
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { count: supplementCount } = await supabase
      .from('supplements')
      .select('*', { count: 'exact', head: true });

    const { count: medicationCount } = await supabase
      .from('medications')
      .select('*', { count: 'exact', head: true });

    const { count: interactionCount } = await supabase
      .from('interactions')
      .select('*', { count: 'exact', head: true });

    const { data: recentInteraction } = await supabase
      .from('interactions')
      .select('id')
      .order('id', { ascending: false })
      .limit(1)
      .single();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        supplements: supplementCount || 0,
        medications: medicationCount || 0,
        interactions: interactionCount || 0,
        lastImportAt: recentInteraction ? new Date().toISOString() : null
      })
    };
  } catch (error) {
    console.error('Stats error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};
