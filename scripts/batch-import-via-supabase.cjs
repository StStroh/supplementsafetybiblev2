const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('✗ Missing environment variables');
  console.error('SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Reading CSV...');
  const parseCSVLine = (line) => {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      if (char === '"' && inQuotes && nextChar === '"') { current += '"'; i++; }
      else if (char === '"') { inQuotes = !inQuotes; }
      else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
      else { current += char; }
    }
    values.push(current.trim());
    return values;
  };

  const csvContent = fs.readFileSync('artifacts/interactions_full.csv', 'utf-8');
  const lines = csvContent.trim().split('\\n');
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

  console.log(`Parsed ${rows.length} interactions`);

  // Get ID maps
  const { data: supplements } = await supabase.from('supplements').select('id, name');
  const { data: medications } = await supabase.from('medications').select('id, name');

  const suppMap = new Map(supplements.map(s => [s.name, s.id]));
  const medMap = new Map(medications.map(m => [m.name, m.id]));

  const interactions = rows.map(row => ({
    supplement_id: suppMap.get(row.supplement_name),
    medication_id: medMap.get(row.medication_name),
    severity: row.severity,
    description: row.description,
    recommendation: row.recommendation
  })).filter(i => i.supplement_id && i.medication_id);

  console.log(`Mapped ${interactions.length} interactions`);
  console.log(`Importing in batches of 100...`);

  const batchSize = 100;
  let imported = 0;

  for (let i = 0; i < interactions.length; i += batchSize) {
    const batch = interactions.slice(i, i + batchSize);
    const { error } = await supabase.from('interactions').upsert(batch, {
      onConflict: 'supplement_id,medication_id,severity',
      ignoreDuplicates: false
    });

    if (error) {
      console.error(`Batch ${Math.floor(i/batchSize) + 1} error:`, error.message);
    } else {
      imported += batch.length;
      process.stdout.write(`\\rImported: ${imported}/${interactions.length}`);
    }
  }

  console.log(`\\n✓ Import complete!`);

  const { count } = await supabase.from('interactions').select('*', { count: 'exact', head: true });
  console.log(`Final count: ${count} interactions`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
