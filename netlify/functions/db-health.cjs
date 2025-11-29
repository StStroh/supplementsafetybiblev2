import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Use service role if available, otherwise anon (will respect RLS)
    const keyToUse = supabaseServiceKey || supabaseAnonKey;
    const keyType = supabaseServiceKey ? 'service_role' : 'anon';

    if (!supabaseUrl || !keyToUse) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Missing Supabase configuration',
          env_check: {
            url_present: !!supabaseUrl,
            anon_key_present: !!supabaseAnonKey,
            service_key_present: !!supabaseServiceKey
          }
        }),
      };
    }

    const supabase = createClient(supabaseUrl, keyToUse);

    // Get counts for all three tables
    const [supplementsResult, medicationsResult, interactionsResult] = await Promise.all([
      supabase.from('supplements').select('id', { count: 'exact', head: true }),
      supabase.from('medications').select('id', { count: 'exact', head: true }),
      supabase.from('interactions').select('supplement_id', { count: 'exact', head: true }),
    ]);

    // Check RLS status (only works with service role)
    let rlsStatus = 'unknown (anon key used, cannot query pg_tables)';
    if (keyType === 'service_role') {
      const { data: rlsData, error: rlsError } = await supabase.rpc('check_rls_status');

      // If RPC doesn't exist, query pg_tables directly
      if (rlsError) {
        const { data: tablesData } = await supabase
          .from('pg_tables')
          .select('tablename, rowsecurity')
          .in('tablename', ['supplements', 'medications', 'interactions']);

        if (tablesData) {
          rlsStatus = tablesData;
        }
      } else {
        rlsStatus = rlsData;
      }
    }

    const response = {
      timestamp: new Date().toISOString(),
      key_type: keyType,
      database: {
        url: supabaseUrl,
        project_ref: supabaseUrl.replace('https://', '').split('.')[0]
      },
      table_counts: {
        supplements: {
          count: supplementsResult.count,
          error: supplementsResult.error?.message || null
        },
        medications: {
          count: medicationsResult.count,
          error: medicationsResult.error?.message || null
        },
        interactions: {
          count: interactionsResult.count,
          error: interactionsResult.error?.message || null
        }
      },
      rls_status: rlsStatus,
      notes: keyType === 'anon'
        ? 'Using anon key - counts respect RLS policies. Service role key not available.'
        : 'Using service role key - can see all rows regardless of RLS.'
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response, null, 2),
    };

  } catch (error) {
    console.error('DB Health Check Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
    };
  }
};
