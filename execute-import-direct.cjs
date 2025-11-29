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

async function executeSQLFile(filename) {
  console.log(`📄 Executing ${filename}...`);
  const sql = fs.readFileSync(filename, 'utf-8');

  try {
    const { error } = await supabase.rpc('exec_sql', { query: sql });
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return false;
    }
    console.log(`✅ Success`);
    return true;
  } catch (err) {
    console.error(`❌ Exception: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('📦 Starting direct SQL import...\n');

  // Import supplements
  console.log('Step 1: Importing supplements...');
  const suppSuccess = await executeSQLFile('import-supps.sql');
  if (!suppSuccess) {
    console.error('Failed to import supplements');
    process.exit(1);
  }

  // Import medications
  console.log('\nStep 2: Importing medications...');
  const medSuccess = await executeSQLFile('import-meds.sql');
  if (!medSuccess) {
    console.error('Failed to import medications');
    process.exit(1);
  }

  // Import interactions in batches
  console.log('\nStep 3: Importing interactions...');
  const batchFiles = fs.readdirSync('.').filter(f => f.startsWith('import-ints-batch-'));
  batchFiles.sort();

  for (const file of batchFiles) {
    const success = await executeSQLFile(file);
    if (!success) {
      console.error(`Failed to import ${file}`);
      process.exit(1);
    }
  }

  // Verify counts
  console.log('\n📊 Verifying counts...');
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
