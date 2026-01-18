#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');
const suppBatches = require('./import-supps-batches.json');
const medBatches = require('./import-meds-batches.json');
const intBatches = require('./import-ints-batches.json');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

async function executeBatch(sql, label) {
  try {
    // Execute via raw SQL
    const { error } = await supabase.rpc('exec_raw_sql', { sql_query: sql });
    if (error) throw error;
    console.log(`✅ ${label}`);
    return true;
  } catch (err) {
    console.error(`❌ ${label}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('Starting full import...\n');

  // Execute supplement batches
  console.log(`Executing ${suppBatches.length} supplement batches...`);
  for (let i = 0; i < suppBatches.length; i++) {
    await executeBatch(suppBatches[i], `Supplement batch ${i+1}/${suppBatches.length}`);
  }

  // Execute medication batches
  console.log(`\nExecuting ${medBatches.length} medication batches...`);
  for (let i = 0; i < medBatches.length; i++) {
    await executeBatch(medBatches[i], `Medication batch ${i+1}/${medBatches.length}`);
  }

  // Execute interaction batches
  console.log(`\nExecuting ${intBatches.length} interaction batches...`);
  for (let i = 0; i < intBatches.length; i++) {
    await executeBatch(intBatches[i], `Interaction batch ${i+1}/${intBatches.length}`);
    if (i % 5 === 4) console.log(`  Progress: ${i+1}/${intBatches.length}`);
  }

  // Verify counts
  console.log('\n📊 Verifying counts...');
  const { count: suppCount } = await supabase.from('supplements').select('*', { count: 'exact', head: true });
  const { count: medCount } = await supabase.from('medications').select('*', { count: 'exact', head: true });
  const { count: intCount } = await supabase.from('interactions').select('*', { count: 'exact', head: true });

  const result = {
    supplements: suppCount || 0,
    medications: medCount || 0,
    interactions: intCount || 0
  };

  console.log('\n' + JSON.stringify(result, null, 2));

  const pass = result.supplements >= 100 && result.medications >= 40 && result.interactions >= 2400;
  console.log(pass ? '\n✅ ALL REQUIREMENTS MET' : '\n❌ REQUIREMENTS NOT MET');

  process.exit(pass ? 0 : 1);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
