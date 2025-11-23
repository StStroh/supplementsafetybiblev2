import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   SUPABASE_URL:', SUPABASE_URL ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_ROLE_KEY ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || null;
    });
    rows.push(row);
  }

  return rows;
}

async function seedTable(tableName, csvPath, chunkSize = 500) {
  console.log(`\n📦 Seeding ${tableName}...`);

  const content = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(content);

  console.log(`   Found ${rows.length} rows to insert`);

  let inserted = 0;
  let updated = 0;
  let errors = 0;

  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { data, error } = await supabase
      .from(tableName)
      .upsert(chunk, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ Error inserting chunk ${i}-${i + chunk.length}:`, error.message);
      errors += chunk.length;
    } else {
      inserted += chunk.length;
      console.log(`   ✓ Inserted chunk ${i}-${i + chunk.length} (${chunk.length} rows)`);
    }
  }

  console.log(`   ✅ Completed: ${inserted} rows processed, ${errors} errors`);
  return { inserted, updated, errors };
}

async function main() {
  console.log('🌱 Starting database seed...\n');
  console.log('Environment:');
  console.log('  SUPABASE_URL:', SUPABASE_URL);
  console.log('  Service Role Key:', SUPABASE_SERVICE_ROLE_KEY ? '✓ Set' : '✗ Missing');

  const dataDir = path.join(__dirname, '../data');

  const stats = {
    supplements: await seedTable('supplements', path.join(dataDir, 'supplements_1000.csv')),
    medications: await seedTable('medications', path.join(dataDir, 'medications_150.csv')),
    interactions: await seedTable('interactions', path.join(dataDir, 'interactions_2500.csv')),
  };

  console.log('\n📊 Final Summary:');
  console.log('================');
  console.log(`Supplements:  ${stats.supplements.inserted} rows inserted, ${stats.supplements.errors} errors`);
  console.log(`Medications:  ${stats.medications.inserted} rows inserted, ${stats.medications.errors} errors`);
  console.log(`Interactions: ${stats.interactions.inserted} rows inserted, ${stats.interactions.errors} errors`);
  console.log('================\n');

  const totalInserted = stats.supplements.inserted + stats.medications.inserted + stats.interactions.inserted;
  const totalErrors = stats.supplements.errors + stats.medications.errors + stats.interactions.errors;

  console.log(`✅ Total: ${totalInserted} rows inserted`);
  if (totalErrors > 0) {
    console.log(`⚠️  Total errors: ${totalErrors}`);
  }
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
