#!/usr/bin/env node
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || '';
    });
    return obj;
  });
}

async function main() {
  console.log('📦 Starting CSV import...\n');

  // Parse supplements
  console.log('📖 Reading supplements...');
  const suppsContent = fs.readFileSync('./supabase/seed/supplements_1000.csv', 'utf-8');
  const supps = parseCSV(suppsContent);
  console.log(`  Found ${supps.length} supplements`);

  // Parse medications
  console.log('📖 Reading medications...');
  const medsContent = fs.readFileSync('./supabase/seed/medications_150.csv', 'utf-8');
  const meds = parseCSV(medsContent);
  console.log(`  Found ${meds.length} medications`);

  // Parse interactions
  console.log('📖 Reading interactions...');
  const intsContent = fs.readFileSync('./supabase/seed/interactions_2500.csv', 'utf-8');
  const ints = parseCSV(intsContent);
  console.log(`  Found ${ints.length} interactions\n`);

  // Insert supplements
  console.log('💾 Inserting supplements...');
  for (let i = 0; i < supps.length; i += 100) {
    const batch = supps.slice(i, i + 100).map(s => ({
      name: s.name,
      category: s.category || 'General',
      description: s.description || ''
    }));

    const { error } = await supabase
      .from('supplements')
      .upsert(batch, { onConflict: 'name', ignoreDuplicates: false });

    if (error) {
      console.error(`  ❌ Error in batch ${i}-${i+100}:`, error.message);
    } else {
      console.log(`  ✅ Inserted ${batch.length} supplements`);
    }
  }

  // Insert medications
  console.log('💾 Inserting medications...');
  for (let i = 0; i < meds.length; i += 100) {
    const batch = meds.slice(i, i + 100).map(m => ({
      name: m.name,
      class: m.class || 'General',
      otc_rx: m.otc_rx || 'OTC'
    }));

    const { error } = await supabase
      .from('medications')
      .upsert(batch, { onConflict: 'name', ignoreDuplicates: false });

    if (error) {
      console.error(`  ❌ Error in batch ${i}-${i+100}:`, error.message);
    } else {
      console.log(`  ✅ Inserted ${batch.length} medications`);
    }
  }

  // Get all supplements and medications for ID mapping
  console.log('🔍 Fetching IDs for mapping...');
  const { data: allSupps } = await supabase.from('supplements').select('id, name');
  const { data: allMeds } = await supabase.from('medications').select('id, name');

  const suppMap = new Map(allSupps.map(s => [s.name.toLowerCase(), s.id]));
  const medMap = new Map(allMeds.map(m => [m.name.toLowerCase(), m.id]));

  console.log(`  Found ${suppMap.size} supplements, ${medMap.size} medications\n`);

  // Insert interactions in batches
  console.log('💾 Inserting interactions...');
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < ints.length; i += 100) {
    const batch = ints.slice(i, i + 100)
      .map(int => {
        const suppId = suppMap.get(int.supplement_name?.toLowerCase());
        const medId = medMap.get(int.medication_name?.toLowerCase());

        if (!suppId || !medId) {
          skipped++;
          return null;
        }

        const severity = (int.severity || 'moderate').toLowerCase();
        if (!['low', 'moderate', 'high', 'severe'].includes(severity)) {
          skipped++;
          return null;
        }

        return {
          supplement_id: suppId,
          medication_id: medId,
          severity,
          description: int.description || '',
          recommendation: int.recommendation || ''
        };
      })
      .filter(x => x !== null);

    if (batch.length > 0) {
      const { error } = await supabase
        .from('interactions')
        .insert(batch);

      if (error) {
        console.error(`  ❌ Error in batch ${i}-${i+100}:`, error.message);
      } else {
        inserted += batch.length;
        console.log(`  ✅ Inserted ${batch.length} interactions (total: ${inserted})`);
      }
    }
  }

  console.log(`  ℹ️  Skipped ${skipped} rows (missing IDs or invalid severity)\n`);

  // Verify counts
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

  console.log('\n✅ IMPORT COMPLETE\n');
  console.log(JSON.stringify(result, null, 2));

  // Verify requirements
  const passSupps = result.supplements >= 100;
  const passMeds = result.medications >= 40;
  const passInts = result.interactions >= 2400;

  console.log('\n📋 Requirements:');
  console.log(`  Supplements ≥ 100: ${passSupps ? '✅' : '❌'} (${result.supplements})`);
  console.log(`  Medications ≥ 40: ${passMeds ? '✅' : '❌'} (${result.medications})`);
  console.log(`  Interactions ≥ 2400: ${passInts ? '✅' : '❌'} (${result.interactions})`);

  if (!passSupps || !passMeds || !passInts) {
    console.log('\n⚠️  WARNING: Not all requirements met!');
    process.exit(1);
  }

  console.log('\n✅ All requirements met!');
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
