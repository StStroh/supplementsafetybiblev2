import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ES modules don't have __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use VITE_ prefixed variables or fallback to non-prefixed
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌ Missing SUPABASE_URL or VITE_SUPABASE_URL in .env file');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY in .env file');
  console.error('⚠️  This must be set as an environment variable (not in .env for security)');
  console.error('   Export it before running: export SUPABASE_SERVICE_ROLE_KEY=your_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Parse CSV file
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      // Convert id to integer
      if (header === 'id' || header === 'supplement_id' || header === 'medication_id') {
        row[header] = parseInt(value, 10);
      } else {
        row[header] = value;
      }
    });
    data.push(row);
  }

  return data;
}

// Import data with batch upsert
async function importData(table, data, batchSize = 100) {
  console.log(`\n📊 Importing ${data.length} rows into ${table}...`);

  let imported = 0;
  let errors = 0;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);

    try {
      const { error } = await supabase
        .from(table)
        .upsert(batch, { onConflict: 'id' });

      if (error) {
        console.error(`   ❌ Error in batch ${Math.floor(i / batchSize) + 1}:`, error.message);
        errors += batch.length;
      } else {
        imported += batch.length;
        process.stdout.write(`   ✓ Imported ${imported}/${data.length} rows\r`);
      }
    } catch (err) {
      console.error(`   ❌ Exception in batch ${Math.floor(i / batchSize) + 1}:`, err.message);
      errors += batch.length;
    }
  }

  console.log(`\n   ✅ Completed: ${imported} imported, ${errors} errors`);
  return { imported, errors };
}

// Get row count from table
async function getRowCount(table) {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error(`❌ Error getting count from ${table}:`, error.message);
    return 0;
  }

  return count;
}

// Main import function
async function main() {
  console.log('🚀 Starting seed data import...\n');
  console.log('📁 Supabase URL:', supabaseUrl);

  const seedDir = path.join(__dirname, '..', 'supabase', 'seed');

  // Import supplements
  console.log('\n═══════════════════════════════════════');
  console.log('📦 SUPPLEMENTS');
  console.log('═══════════════════════════════════════');
  const supplementsFile = path.join(seedDir, 'supplements_1000.csv');
  const supplements = parseCSV(supplementsFile);
  const suppResults = await importData('supplements', supplements);
  const suppCount = await getRowCount('supplements');
  console.log(`   📊 Final count in database: ${suppCount} rows`);

  // Import medications
  console.log('\n═══════════════════════════════════════');
  console.log('💊 MEDICATIONS');
  console.log('═══════════════════════════════════════');
  const medicationsFile = path.join(seedDir, 'medications_150.csv');
  const medications = parseCSV(medicationsFile);
  const medResults = await importData('medications', medications);
  const medCount = await getRowCount('medications');
  console.log(`   📊 Final count in database: ${medCount} rows`);

  // Import interactions
  console.log('\n═══════════════════════════════════════');
  console.log('⚠️  INTERACTIONS');
  console.log('═══════════════════════════════════════');
  const interactionsFile = path.join(seedDir, 'interactions_2500.csv');
  const interactions = parseCSV(interactionsFile);
  const intResults = await importData('interactions', interactions);
  const intCount = await getRowCount('interactions');
  console.log(`   📊 Final count in database: ${intCount} rows`);

  // Summary
  console.log('\n═══════════════════════════════════════');
  console.log('✅ IMPORT SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`Supplements:  ${suppResults.imported}/${supplements.length} imported (${suppCount} total in DB)`);
  console.log(`Medications:  ${medResults.imported}/${medications.length} imported (${medCount} total in DB)`);
  console.log(`Interactions: ${intResults.imported}/${interactions.length} imported (${intCount} total in DB)`);
  console.log('═══════════════════════════════════════\n');

  const totalErrors = suppResults.errors + medResults.errors + intResults.errors;
  if (totalErrors > 0) {
    console.log(`⚠️  Completed with ${totalErrors} errors`);
    process.exit(1);
  } else {
    console.log('🎉 All data imported successfully!');
    process.exit(0);
  }
}

main().catch(console.error);
