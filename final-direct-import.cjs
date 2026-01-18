#!/usr/bin/env node
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables');
  console.error('  Please set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ? values[i].trim() : '';
    });
    return obj;
  });
}

async function main() {
  console.log('📦 Starting full CSV import...\n');

  // Parse CSVs
  console.log('📖 Reading CSV files...');
  const suppsContent = fs.readFileSync('./supabase/seed/supplements_1000.csv', 'utf-8');
  const supps = parseCSV(suppsContent);

  const medsContent = fs.readFileSync('./supabase/seed/medications_150.csv', 'utf-8');
  const meds = parseCSV(medsContent);

  const intsContent = fs.readFileSync('./supabase/seed/interactions_2500.csv', 'utf-8');
  const ints = parseCSV(intsContent);

  console.log(`  ✓ ${supps.length} supplements`);
  console.log(`  ✓ ${meds.length} medications`);
  console.log(`  ✓ ${ints.length} interactions\n`);

  // Insert supplements in batches
  console.log('💾 Inserting supplements...');
  const BATCH_SIZE = 100;
  for (let i = 0; i < supps.length; i += BATCH_SIZE) {
    const batch = supps.slice(i, i + BATCH_SIZE).map(s => ({
      id: parseInt(s.id),
      name: s.name,
      category: s.category || 'General'
    }));

    const { error } = await supabase.from('supplements').upsert(batch);
    if (error) {
      console.error(`  ❌ Batch ${Math.floor(i/BATCH_SIZE)+1} failed:`, error.message);
      process.exit(1);
    }
    process.stdout.write(`  ✅ Batch ${Math.floor(i/BATCH_SIZE)+1}/${Math.ceil(supps.length/BATCH_SIZE)}\r`);
  }
  console.log(`\n  ✅ Inserted ${supps.length} supplements`);

  // Insert medications in batches
  console.log('\n💾 Inserting medications...');
  for (let i = 0; i < meds.length; i += BATCH_SIZE) {
    const batch = meds.slice(i, i + BATCH_SIZE).map(m => ({
      id: parseInt(m.id),
      name: m.name,
      drug_class: m.class || 'General'
    }));

    const { error } = await supabase.from('medications').upsert(batch);
    if (error) {
      console.error(`  ❌ Batch ${Math.floor(i/BATCH_SIZE)+1} failed:`, error.message);
      process.exit(1);
    }
    process.stdout.write(`  ✅ Batch ${Math.floor(i/BATCH_SIZE)+1}/${Math.ceil(meds.length/BATCH_SIZE)}\r`);
  }
  console.log(`\n  ✅ Inserted ${meds.length} medications`);

  // Insert interactions in batches
  console.log('\n💾 Inserting interactions...');
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < ints.length; i += BATCH_SIZE) {
    const batch = ints.slice(i, i + BATCH_SIZE)
      .map(int => {
        const severity = (int.severity || 'moderate').toLowerCase();
        if (!['low', 'moderate', 'high', 'severe'].includes(severity)) {
          skipped++;
          return null;
        }

        return {
          supplement_id: parseInt(int.supplement_id),
          medication_id: parseInt(int.medication_id),
          severity,
          description: int.mechanism || 'No description available',
          recommendation: int.notes || 'Consult healthcare provider'
        };
      })
      .filter(x => x !== null);

    if (batch.length > 0) {
      const { error } = await supabase.from('interactions').insert(batch);
      if (error) {
        console.error(`  ❌ Batch ${Math.floor(i/BATCH_SIZE)+1} failed:`, error.message);
        console.error('  Sample record:', batch[0]);
        process.exit(1);
      }
      inserted += batch.length;
    }
    process.stdout.write(`  ✅ Batch ${Math.floor(i/BATCH_SIZE)+1}/${Math.ceil(ints.length/BATCH_SIZE)} (${inserted} total)\r`);
  }
  console.log(`\n  ✅ Inserted ${inserted} interactions`);
  if (skipped > 0) {
    console.log(`  ℹ️  Skipped ${skipped} invalid rows`);
  }

  // Verify counts
  console.log('\n📊 Verifying final counts...');
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

  // Check requirements
  const passSupps = result.supplements >= 100;
  const passMeds = result.medications >= 40;
  const passInts = result.interactions >= 2400;

  console.log('\n📋 Requirements Check:');
  console.log(`  Supplements ≥ 100: ${passSupps ? '✅' : '❌'} (actual: ${result.supplements})`);
  console.log(`  Medications ≥ 40: ${passMeds ? '✅' : '❌'} (actual: ${result.medications})`);
  console.log(`  Interactions ≥ 2400: ${passInts ? '✅' : '❌'} (actual: ${result.interactions})`);

  if (passSupps && passMeds && passInts) {
    console.log('\n✅ ALL REQUIREMENTS MET - IMPORT SUCCESSFUL!\n');
    return;
  }

  console.log('\n❌ Requirements not met\n');
  process.exit(1);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
