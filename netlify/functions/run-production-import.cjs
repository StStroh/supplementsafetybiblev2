const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,x-admin-key'
};

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && (i === 0 || line[i-1] !== '\\')) {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result.map(v => v.replace(/^"|"$/g, ''));
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const adminKey = event.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_KEY) {
      return {
        statusCode: 401,
        headers: CORS,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );

    console.log('[Import] Starting production import...');

    // Truncate
    await supabase.from('interactions').delete().neq('id', 0);
    await supabase.from('medications').delete().neq('id', 0);
    await supabase.from('supplements').delete().neq('id', 0);

    // Parse CSV
    const csvPath = path.join(process.cwd(), 'artifacts', 'interactions_full.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    const headers = parseCSVLine(lines[0]);

    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length === headers.length) {
        const row = {};
        headers.forEach((h, idx) => { row[h] = values[idx] || ''; });
        rows.push(row);
      }
    }

    // Collect unique names
    const suppNames = new Set();
    const medNames = new Set();
    rows.forEach(row => {
      if (row.supplement_name) suppNames.add(row.supplement_name);
      if (row.medication_name) medNames.add(row.medication_name);
    });

    // Insert supplements
    const suppArray = Array.from(suppNames).map((name, idx) => ({
      id: idx + 1,
      name,
      category: 'General'
    }));

    for (let i = 0; i < suppArray.length; i += 100) {
      const batch = suppArray.slice(i, i + 100);
      await supabase.from('supplements').upsert(batch);
    }

    // Insert medications
    const medArray = Array.from(medNames).map((name, idx) => ({
      id: idx + 1,
      name,
      drug_class: 'General'
    }));

    for (let i = 0; i < medArray.length; i += 100) {
      const batch = medArray.slice(i, i + 100);
      await supabase.from('medications').upsert(batch);
    }

    // Build maps
    const { data: allSupps } = await supabase.from('supplements').select('id, name');
    const { data: allMeds } = await supabase.from('medications').select('id, name');

    const suppMap = new Map(allSupps.map(s => [s.name, s.id]));
    const medMap = new Map(allMeds.map(m => [m.name, m.id]));

    // Insert interactions
    let inserted = 0;
    for (let i = 0; i < rows.length; i += 100) {
      const batch = rows.slice(i, i + 100)
        .map(row => {
          const suppId = suppMap.get(row.supplement_name);
          const medId = medMap.get(row.medication_name);
          const severity = (row.severity || 'moderate').toLowerCase();

          if (!suppId || !medId || !['low', 'moderate', 'high', 'severe'].includes(severity)) {
            return null;
          }

          return {
            supplement_id: suppId,
            medication_id: medId,
            severity,
            description: row.description || 'No description available',
            recommendation: row.recommendation || 'Consult healthcare provider'
          };
        })
        .filter(x => x !== null);

      if (batch.length > 0) {
        await supabase.from('interactions').insert(batch);
        inserted += batch.length;
      }
    }

    // Verify
    const { count: suppCount } = await supabase.from('supplements').select('*', { count: 'exact', head: true });
    const { count: medCount } = await supabase.from('medications').select('*', { count: 'exact', head: true });
    const { count: intCount } = await supabase.from('interactions').select('*', { count: 'exact', head: true });

    const result = {
      supplements: suppCount || 0,
      medications: medCount || 0,
      interactions: intCount || 0
    };

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify(result)
    };

  } catch (err) {
    console.error('[Import] Error:', err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: err.message })
    };
  }
};
