const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Parse CSV line (simple parser, handles quoted fields)
function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current);

  return fields;
}

// Parse JSON field
function parseJsonField(value) {
  try {
    return JSON.parse(value);
  } catch (err) {
    console.error('Failed to parse JSON:', value);
    return [];
  }
}

async function importSubstances() {
  console.log('🚀 Substance Importer - Starting...\n');

  // Check for service role key
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in .env');
    console.error('This script requires service role access to bypass RLS.');
    process.exit(1);
  }

  // Initialize Supabase with service role key
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  console.log('✅ Connected to Supabase with service role\n');

  // Read substances.csv
  const csvPath = path.join(__dirname, '../data/substances.csv');

  if (!fs.existsSync(csvPath)) {
    console.error('❌ substances.csv not found at:', csvPath);
    console.error('Run the generator first:');
    console.error('   node scripts/generate-substances-from-interactions.cjs');
    process.exit(1);
  }

  console.log('📄 Reading substances.csv...');

  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  if (lines.length === 0) {
    console.error('❌ CSV file is empty');
    process.exit(1);
  }

  // Parse header
  const headers = parseCsvLine(lines[0]);
  console.log('   Headers:', headers.join(', '));

  const substances = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);

    if (fields.length !== headers.length) {
      console.warn(`⚠️  Row ${i + 1}: Field count mismatch (expected ${headers.length}, got ${fields.length})`);
      continue;
    }

    const substance = {};

    headers.forEach((header, idx) => {
      let value = fields[idx];

      // Parse JSON fields
      if (header === 'aliases_json') {
        substance.aliases = parseJsonField(value);
      } else if (header === 'tags_json') {
        substance.tags = parseJsonField(value);
      } else if (header === 'is_active') {
        substance.is_active = value === 'true' || value === '1';
      } else {
        substance[header] = value;
      }
    });

    substances.push(substance);
  }

  console.log(`✅ Parsed ${substances.length} substances\n`);

  // Show breakdown
  const drugCount = substances.filter(s => s.type === 'drug').length;
  const suppCount = substances.filter(s => s.type === 'supplement').length;
  console.log('📊 Breakdown:');
  console.log(`   Drugs: ${drugCount}`);
  console.log(`   Supplements: ${suppCount}\n`);

  // Upsert in batches
  console.log('💾 Upserting substances to database...');

  const batchSize = 10;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < substances.length; i += batchSize) {
    const batch = substances.slice(i, i + batchSize);

    const { data, error } = await supabase
      .from('checker_substances')
      .upsert(batch, {
        onConflict: 'substance_id',
        ignoreDuplicates: false
      });

    if (error) {
      console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} error:`, error.message);
      errorCount += batch.length;
    } else {
      successCount += batch.length;
      console.log(`   ✓ Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} substances`);
    }
  }

  console.log('\n📈 Import Summary:');
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);

  // Verify count
  const { count, error: countError } = await supabase
    .from('checker_substances')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('⚠️  Could not verify count:', countError.message);
  } else {
    console.log(`   Total in DB: ${count}\n`);
  }

  if (errorCount === 0) {
    console.log('✅ All substances imported successfully!');
    console.log('\nNext steps:');
    console.log('1. Generate and import interactions');
    console.log('2. Test the checker at /check');
  } else {
    console.log('⚠️  Some substances failed to import. Check errors above.');
  }
}

// Run
importSubstances().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
