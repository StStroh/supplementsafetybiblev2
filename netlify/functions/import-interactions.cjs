const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Supabase configuration' })
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const body = JSON.parse(event.body || '{}');
    const { source = 'artifacts/interactions_full.csv', truncate = false, dryRun = false } = body;

    const csvPath = path.resolve(process.cwd(), source);

    if (!fs.existsSync(csvPath)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `CSV not found: ${source}` })
      };
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());

    const requiredHeaders = ['supplement_name', 'medication_name', 'severity', 'description', 'recommendation'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

    if (missingHeaders.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Missing headers: ${missingHeaders.join(', ')}` })
      };
    }

    const parseCSVLine = (line) => {
      const values = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"' && inQuotes && nextChar === '"') {
          current += '"';
          i++;
        } else if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      return values;
    };

    const rows = lines.slice(1).map(line => {
      const values = parseCSVLine(line);
      return {
        supplement_name: values[headers.indexOf('supplement_name')]?.replace(/"/g, ''),
        medication_name: values[headers.indexOf('medication_name')]?.replace(/"/g, ''),
        severity: values[headers.indexOf('severity')]?.replace(/"/g, '').toLowerCase(),
        description: values[headers.indexOf('description')]?.replace(/"/g, ''),
        recommendation: values[headers.indexOf('recommendation')]?.replace(/"/g, '')
      };
    }).filter(row => row.supplement_name && row.medication_name);

    if (dryRun) {
      const uniqueSupplements = new Set(rows.map(r => r.supplement_name));
      const uniqueMedications = new Set(rows.map(r => r.medication_name));

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ok: true,
          dryRun: true,
          preview: {
            totalRows: rows.length,
            uniqueSupplements: uniqueSupplements.size,
            uniqueMedications: uniqueMedications.size,
            sampleRows: rows.slice(0, 3)
          }
        })
      };
    }

    if (truncate) {
      await supabase.from('interactions').delete().neq('id', 0);
      await supabase.from('medications').delete().neq('id', 0);
      await supabase.from('supplements').delete().neq('id', 0);
    }

    const supplementsMap = new Map();
    const medicationsMap = new Map();

    const uniqueSupplements = [...new Set(rows.map(r => r.supplement_name))];
    for (const name of uniqueSupplements) {
      const { data, error } = await supabase
        .from('supplements')
        .upsert({ name }, { onConflict: 'name' })
        .select('id, name')
        .single();

      if (data) {
        supplementsMap.set(name, data.id);
      }
    }

    const uniqueMedications = [...new Set(rows.map(r => r.medication_name))];
    for (const name of uniqueMedications) {
      const { data, error } = await supabase
        .from('medications')
        .upsert({ name }, { onConflict: 'name' })
        .select('id, name')
        .single();

      if (data) {
        medicationsMap.set(name, data.id);
      }
    }

    const interactions = rows.map(row => ({
      supplement_id: supplementsMap.get(row.supplement_name),
      medication_id: medicationsMap.get(row.medication_name),
      severity: row.severity,
      description: row.description,
      recommendation: row.recommendation
    })).filter(i => i.supplement_id && i.medication_id);

    const batchSize = 500;
    let importedCount = 0;

    for (let i = 0; i < interactions.length; i += batchSize) {
      const batch = interactions.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from('interactions')
        .upsert(batch, { onConflict: 'supplement_id,medication_id,severity', ignoreDuplicates: true });

      if (!error) {
        importedCount += batch.length;
      }
    }

    const { data: counts } = await supabase.rpc('search_interactions', { q: '' }).limit(0);
    const { count: supplementCount } = await supabase.from('supplements').select('*', { count: 'exact', head: true });
    const { count: medicationCount } = await supabase.from('medications').select('*', { count: 'exact', head: true });
    const { count: interactionCount } = await supabase.from('interactions').select('*', { count: 'exact', head: true });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        counts: {
          supplements: supplementCount,
          medications: medicationCount,
          interactions: interactionCount
        },
        imported: importedCount
      })
    };
  } catch (error) {
    console.error('Import error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};
