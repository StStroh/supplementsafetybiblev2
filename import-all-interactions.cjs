const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeBatch(batchNum) {
  const sql = fs.readFileSync(`/tmp/batch_${batchNum}.sql`, 'utf-8');

  // Extract VALUES section and parse into individual rows
  const valuesMatch = sql.match(/VALUES\s+([\s\S]+?)\s+\) AS v/);
  if (!valuesMatch) {
    throw new Error('Could not parse VALUES from SQL');
  }

  const valuesStr = valuesMatch[1];
  const rows = [];

  // Parse the VALUES into array of objects
  const lines = valuesStr.split('\n');
  for (const line of lines) {
    const match = line.match(/\('([^']+(?:''[^']+)*)', '([^']+(?:''[^']+)*)', '([^']+)', '([^']+(?:''[^']+)*)', '([^']+(?:''[^']+)*)'\)/);
    if (match) {
      rows.push({
        supplement_name: match[1].replace(/''/g, "'"),
        medication_name: match[2].replace(/''/g, "'"),
        severity: match[3],
        description: match[4].replace(/''/g, "'"),
        recommendation: match[5].replace(/''/g, "'")
      });
    }
  }

  console.log(`Batch ${batchNum}: Parsed ${rows.length} rows`);

  // Get supplement and medication IDs
  const { data: supplements } = await supabase.from('supplements').select('id, name');
  const { data: medications } = await supabase.from('medications').select('id, name');

  const suppMap = new Map(supplements.map(s => [s.name, s.id]));
  const medMap = new Map(medications.map(m => [m.name, m.id]));

  // Create interaction records
  const interactions = rows.map(row => ({
    supplement_id: suppMap.get(row.supplement_name),
    medication_id: medMap.get(row.medication_name),
    severity: row.severity,
    description: row.description,
    recommendation: row.recommendation
  })).filter(i => i.supplement_id && i.medication_id);

  // Insert in smaller chunks
  const chunkSize = 100;
  for (let i = 0; i < interactions.length; i += chunkSize) {
    const chunk = interactions.slice(i, i + chunkSize);
    const { error } = await supabase.from('interactions').insert(chunk);
    if (error && !error.message.includes('duplicate')) {
      console.error(`Chunk error:`, error);
    }
  }

  console.log(`Batch ${batchNum}: Inserted ${interactions.length} interactions`);
}

async function main() {
  console.log('Starting import of 2500 interactions...\n');

  for (let i = 1; i <= 5; i++) {
    await executeBatch(i);
  }

  // Verify final counts
  const { count: suppCount } = await supabase.from('supplements').select('*', { count: 'exact', head: true });
  const { count: medCount } = await supabase.from('medications').select('*', { count: 'exact', head: true });
  const { count: intCount } = await supabase.from('interactions').select('*', { count: 'exact', head: true });

  console.log('\n✅ Import complete!');
  console.log(JSON.stringify({ supplements: suppCount, medications: medCount, interactions: intCount }));

  if (intCount >= 2400 && suppCount >= 100 && medCount >= 40) {
    console.log('✅ Verification passed');
  } else {
    console.log('❌ Counts below threshold');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
