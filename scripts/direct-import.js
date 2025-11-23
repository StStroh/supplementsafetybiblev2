import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

// Create client with anon key - we'll use RPC or direct inserts
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      const value = values[index];
      if (value !== undefined && value !== '') {
        if (!isNaN(value) && value !== '') {
          row[header] = Number(value);
        } else {
          row[header] = value;
        }
      }
    });
    rows.push(row);
  }

  return rows;
}

async function importTable(tableName, csvPath, batchSize = 100) {
  console.log(`\n📥 Importing ${tableName}...`);
  console.log(`   Reading: ${csvPath}`);

  const content = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(content);

  console.log(`   Found ${rows.length} rows to import`);

  // First, let's check if table is empty
  const { count: existingCount } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });

  console.log(`   Current rows in table: ${existingCount || 0}`);

  let imported = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    const { data, error } = await supabase
      .from(tableName)
      .upsert(batch, { onConflict: 'id' });

    if (error) {
      console.error(`\n   ❌ Error in batch ${Math.floor(i / batchSize) + 1}:`, error.message);
      console.error(`      Code:`, error.code);
      console.error(`      Details:`, error.details);
      console.error(`      Hint:`, error.hint);
      errors.push({ batch: Math.floor(i / batchSize) + 1, error: error.message });
      failed += batch.length;
    } else {
      imported += batch.length;
      process.stdout.write(`\r   Progress: ${imported}/${rows.length}`);
    }
  }

  console.log(`\n   ✅ Successfully imported ${imported} rows`);
  if (failed > 0) {
    console.log(`   ⚠️  Failed: ${failed} rows`);
    console.log(`   Errors:`, JSON.stringify(errors, null, 2));
  }

  return { imported, failed, total: rows.length };
}

async function verifyCount(tableName) {
  const { count, error } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error(`   ❌ Error counting ${tableName}:`, error.message);
    return 0;
  }

  return count;
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║          SUPABASE CSV DATA IMPORT (Direct Method)             ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');

  const seedDir = path.join(__dirname, '..', 'supabase', 'seed');

  const tables = [
    { name: 'supplements', file: 'supplements_1000.csv' },
    { name: 'medications', file: 'medications_150.csv' },
    { name: 'interactions', file: 'interactions_2500.csv' }
  ];

  const results = {};

  for (const table of tables) {
    const csvPath = path.join(seedDir, table.file);

    if (!fs.existsSync(csvPath)) {
      console.error(`❌ File not found: ${csvPath}`);
      continue;
    }

    try {
      results[table.name] = await importTable(table.name, csvPath);
    } catch (error) {
      console.error(`❌ Failed to import ${table.name}:`, error.message);
      results[table.name] = { imported: 0, failed: 0, total: 0, error: error.message };
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                    VERIFICATION - Row Counts                   ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');

  for (const table of tables) {
    const count = await verifyCount(table.name);
    console.log(`\n📊 ${table.name.toUpperCase()}`);
    console.log(`   Database count: ${count} rows`);
    if (results[table.name]) {
      console.log(`   Expected count: ${results[table.name].total} rows`);
      if (count === results[table.name].total) {
        console.log('   ✅ Counts match!');
      } else if (count > results[table.name].total) {
        console.log('   ℹ️  Database has more rows (likely pre-existing data)');
      } else {
        console.log('   ⚠️  Counts do not match - some imports may have failed');
      }
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                         IMPORT COMPLETE                        ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
}

main().catch(console.error);
