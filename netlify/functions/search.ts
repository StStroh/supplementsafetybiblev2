import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { q, severity } = event.queryStringParameters || {};

    let query = supabase
      .from('interactions')
      .select(`
        id,
        severity,
        description,
        supplements:supplement_id(name),
        medications:medication_id(name)
      `)
      .limit(100);

    if (severity && severity !== 'all') {
      query = query.eq('severity', severity);
    }

    if (q) {
      const searchTerm = q.toLowerCase();

      const { data: supplements } = await supabase
        .from('v_supp_keys')
        .select('canonical')
        .ilike('key', `%${searchTerm}%`);

      const { data: medications } = await supabase
        .from('v_med_keys')
        .select('canonical')
        .ilike('key', `%${searchTerm}%`);

      const suppNames = [...new Set(supplements?.map(s => s.canonical) || [])];
      const medNames = [...new Set(medications?.map(m => m.canonical) || [])];

      if (suppNames.length > 0 || medNames.length > 0) {
        const { data: suppIds } = await supabase
          .from('supplements')
          .select('id')
          .in('name', suppNames.map(n => n.charAt(0).toUpperCase() + n.slice(1)));

        const { data: medIds } = await supabase
          .from('medications')
          .select('id')
          .in('name', medNames.map(n => n.charAt(0).toUpperCase() + n.slice(1)));

        const suppIdList = suppIds?.map(s => s.id) || [];
        const medIdList = medIds?.map(m => m.id) || [];

        if (suppIdList.length > 0 && medIdList.length > 0) {
          query = query.or(`supplement_id.in.(${suppIdList.join(',')}),medication_id.in.(${medIdList.join(',')})`);
        } else if (suppIdList.length > 0) {
          query = query.in('supplement_id', suppIdList);
        } else if (medIdList.length > 0) {
          query = query.in('medication_id', medIdList);
        }
      }
    }

    const { data, error } = await query;

    if (error) throw error;

    const interactions = (data || []).map((item: any) => ({
      id: item.id,
      supplement_name: item.supplements?.name || 'Unknown',
      medication_name: item.medications?.name || 'Unknown',
      severity: item.severity,
      description: item.description
    }));

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ interactions })
    };
  } catch (error) {
    console.error('Search error:', error);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Search failed' })
    };
  }
};
