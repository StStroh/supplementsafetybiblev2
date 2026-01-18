#!/usr/bin/env node
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(JSON.stringify({
    error: 'Missing environment variables',
    required: ['VITE_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']
  }, null, 2));
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

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

async function main() {
  console.log('📦 Production Import Starting...\n');

  // 1. Truncate tables
  console.log('🗑️  Truncating tables...');
  await supabase.from('interactions').delete().neq('id', 0);
  await supabase.from('medications').delete().neq('id', 0);
  await supabase.from('supplements').delete().neq('id', 0);
  console.log('  ✅ Tables truncated\n');

  // 2. Parse CSV
  console.log('📖 Reading artifacts/interactions_full.csv...');
  const csvContent = fs.readFileSync('artifacts/interactions_full.csv', 'utf-8');
  const lines = csvContent.trim().split('\n');
  const headers = parseCSVLine(lines[0]);

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });
      rows.push(row);
    }
  }
  console.log(`  ✅ Parsed ${rows.length} rows\n`);

  // 3. Collect unique supplements and medications
  console.log('🔍 Collecting unique supplements and medications...');
  const suppNames = new Set();
  const medNames = new Set();

  rows.forEach(row => {
    if (row.supplement_name) suppNames.add(row.supplement_name);
    if (row.medication_name) medNames.add(row.medication_name);
  });

  console.log(`  Found ${suppNames.size} unique supplements`);
  console.log(`  Found ${medNames.size} unique medications\n`);

  // 4. Insert supplements
  console.log('💾 Inserting supplements...');
  const suppArray = Array.from(suppNames).map((name, idx) => ({
    id: idx + 1,
    name,
    category: 'General'
  }));

  for (let i = 0; i < suppArray.length; i += 100) {
    const batch = suppArray.slice(i, i + 100);
    const { error } = await supabase.from('supplements').upsert(batch);
    if (error) throw error;
  }
  console.log(`  ✅ Inserted ${suppArray.length} supplements\n`);

  // 5. Insert medications
  console.log('💾 Inserting medications...');
  const medArray = Array.from(medNames).map((name, idx) => ({
    id: idx + 1,
    name,
    drug_class: 'General'
  }));

  for (let i = 0; i < medArray.length; i += 100) {
    const batch = medArray.slice(i, i + 100);
    const { error } = await supabase.from('medications').upsert(batch);
    if (error) throw error;
  }
  console.log(`  ✅ Inserted ${medArray.length} medications\n`);

  // 6. Build name-to-ID maps
  console.log('🗺️  Building ID maps...');
  const { data: allSupps } = await supabase.from('supplements').select('id, name');
  const { data: allMeds } = await supabase.from('medications').select('id, name');

  const suppMap = new Map(allSupps.map(s => [s.name, s.id]));
  const medMap = new Map(allMeds.map(m => [m.name, m.id]));
  console.log(`  ✅ Mapped ${suppMap.size} supplements, ${medMap.size} medications\n`);

  // 7. Insert interactions
  console.log('💾 Inserting interactions...');
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < rows.length; i += 100) {
    const batch = rows.slice(i, i + 100)
      .map(row => {
        const suppId = suppMap.get(row.supplement_name);
        const medId = medMap.get(row.medication_name);
        const severity = (row.severity || 'moderate').toLowerCase();

        if (!suppId || !medId) {
          skipped++;
          return null;
        }

        if (!['low', 'moderate', 'high', 'severe'].includes(severity)) {
          skipped++;
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
      const { error } = await supabase.from('interactions').insert(batch);
      if (error) throw error;
      inserted += batch.length;
    }

    if ((i / 100) % 5 === 0) {
      process.stdout.write(`  Progress: ${inserted}/${rows.length - skipped}\r`);
    }
  }
  console.log(`\n  ✅ Inserted ${inserted} interactions`);
  if (skipped > 0) console.log(`  ℹ️  Skipped ${skipped} invalid rows\n`);

  // 8. Verify counts
  console.log('📊 Verifying counts...');
  const { count: suppCount } = await supabase
    .from('supplements')
    .select('*', { count: 'exact', head: true });

  const { count: medCount } = await supabase
    .from('medications')
    .select('*', { count: 'exact', head: true });

  const { count: intCount } = await supabase
    .from('interactions')
    .select('*', { count: 'exact', head: true });

  const result = {
    supplements: suppCount || 0,
    medications: medCount || 0,
    interactions: intCount || 0
  };

  console.log('\n' + JSON.stringify(result, null, 2));

  // 9. Verify requirements
  const passSupps = result.supplements >= 100;
  const passMeds = result.medications >= 40;
  const passInts = result.interactions >= 2400;

  console.log('\n✓ Requirements:');
  console.log(`  Supplements >= 100: ${passSupps ? '✅' : '❌'} (${result.supplements})`);
  console.log(`  Medications >= 40: ${passMeds ? '✅' : '❌'} (${result.medications})`);
  console.log(`  Interactions >= 2400: ${passInts ? '✅' : '❌'} (${result.interactions})`);

  if (!passSupps || !passMeds || !passInts) {
    console.log('\n❌ Requirements not met\n');
    process.exit(1);
  }

  console.log('\n✅ IMPORT COMPLETE - ALL REQUIREMENTS MET\n');
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
