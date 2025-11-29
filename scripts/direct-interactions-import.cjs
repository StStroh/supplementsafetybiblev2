const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

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

async function importData() {
  console.log('Reading CSV...');
  const csvContent = fs.readFileSync('artifacts/interactions_full.csv', 'utf-8');
  const lines = csvContent.trim().split('\n');
  const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim());

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

  console.log(`Parsed ${rows.length} rows`);

  const supplementsMap = new Map();
  const medicationsMap = new Map();

  const uniqueSupplements = [...new Set(rows.map(r => r.supplement_name))];
  console.log(`\nUpserting ${uniqueSupplements.length} supplements...`);

  for (const name of uniqueSupplements) {
    const { data, error } = await supabase
      .from('supplements')
      .upsert({ name }, { onConflict: 'name' })
      .select('id, name')
      .single();

    if (error) {
      console.error(`Error upserting supplement "${name}":`, error.message);
    } else if (data) {
      supplementsMap.set(name, data.id);
    }
  }
  console.log(`Upserted ${supplementsMap.size} supplements`);

  const uniqueMedications = [...new Set(rows.map(r => r.medication_name))];
  console.log(`\nUpserting ${uniqueMedications.length} medications...`);

  for (const name of uniqueMedications) {
    const { data, error } = await supabase
      .from('medications')
      .upsert({ name }, { onConflict: 'name' })
      .select('id, name')
      .single();

    if (error) {
      console.error(`Error upserting medication "${name}":`, error.message);
    } else if (data) {
      medicationsMap.set(name, data.id);
    }
  }
  console.log(`Upserted ${medicationsMap.size} medications`);

  const interactions = rows.map(row => ({
    supplement_id: supplementsMap.get(row.supplement_name),
    medication_id: medicationsMap.get(row.medication_name),
    severity: row.severity,
    description: row.description,
    recommendation: row.recommendation
  })).filter(i => i.supplement_id && i.medication_id);

  console.log(`\nImporting ${interactions.length} interactions in batches...`);

  const batchSize = 500;
  let importedCount = 0;

  for (let i = 0; i < interactions.length; i += batchSize) {
    const batch = interactions.slice(i, i + batchSize);
    const { data, error } = await supabase
      .from('interactions')
      .upsert(batch, { onConflict: 'supplement_id,medication_id,severity', ignoreDuplicates: false });

    if (error) {
      console.error(`Batch ${Math.floor(i / batchSize) + 1} error:`, error.message);
    } else {
      importedCount += batch.length;
      console.log(`Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} rows`);
    }
  }

  console.log(`\n✅ Import complete!`);
  console.log(`Supplements: ${supplementsMap.size}`);
  console.log(`Medications: ${medicationsMap.size}`);
  console.log(`Interactions: ${importedCount}`);

  const { count: finalCount } = await supabase
    .from('interactions')
    .select('*', { count: 'exact', head: true });

  console.log(`\nFinal database count: ${finalCount} interactions`);
}

importData().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
