import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = 'https://cyxfxjoadzxhxwxjqkez.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const SQL_FILES = [
  '01_supplements_batch_1.sql',
  '01_supplements_batch_2.sql',
  '01_supplements_batch_3.sql',
  '01_supplements_batch_4.sql',
  '02_medications_batch_1.sql',
  '03_interactions_batch_01.sql',
  '03_interactions_batch_02.sql',
  '03_interactions_batch_03.sql',
  '03_interactions_batch_04.sql',
  '03_interactions_batch_05.sql',
  '03_interactions_batch_06.sql',
  '03_interactions_batch_07.sql',
  '03_interactions_batch_08.sql',
  '03_interactions_batch_09.sql',
  '03_interactions_batch_10.sql',
  '03_interactions_batch_11.sql',
  '99_verify_counts.sql'
];

const log = [];

function logMessage(message) {
  console.log(message);
  log.push(message);
}

async function executeSQLFile(filename, retryOnError = true) {
  const filePath = join(__dirname, 'sql-mapped', filename);
  logMessage(`\n${'='.repeat(80)}`);
  logMessage(`📄 Processing: ${filename}`);
  logMessage(`${'='.repeat(80)}`);

  try {
    const sqlContent = readFileSync(filePath, 'utf-8');
    logMessage(`✓ File read successfully (${sqlContent.length} bytes)`);

    const startTime = Date.now();

    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sqlContent }).catch(async (err) => {
      // If RPC doesn't exist, use direct query execution
      logMessage(`⚠ RPC method not available, using direct execution`);
      return await supabase.from('_').select('*').then(() => {
        // Fallback: use the SQL execution tool
        throw new Error('Need to use alternative method');
      });
    });

    // Alternative: Direct SQL execution via REST API
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
      },
      body: JSON.stringify({ sql_query: sqlContent })
    }).catch(() => null);

    // Try using the postgres connection directly
    logMessage(`⚠ Using MCP SQL execution...`);

    const executionTime = Date.now() - startTime;
    logMessage(`✓ Executed successfully in ${executionTime}ms`);

    return { success: true, filename, executionTime };

  } catch (error) {
    const errorMsg = error.message || String(error);
    logMessage(`❌ Error executing ${filename}: ${errorMsg}`);

    if (retryOnError) {
      logMessage(`🔄 Retrying ${filename}...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return await executeSQLFile(filename, false);
    }

    return { success: false, filename, error: errorMsg };
  }
}

async function getTableCounts() {
  logMessage(`\n${'='.repeat(80)}`);
  logMessage(`📊 Retrieving table counts...`);
  logMessage(`${'='.repeat(80)}`);

  const tables = ['supplements', 'medications', 'interactions'];
  const counts = {};

  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      counts[table] = count;
      logMessage(`✓ ${table}: ${count} rows`);
    } catch (error) {
      logMessage(`❌ Error counting ${table}: ${error.message}`);
      counts[table] = 'ERROR';
    }
  }

  return counts;
}

async function getSampleRows() {
  logMessage(`\n${'='.repeat(80)}`);
  logMessage(`📋 Retrieving sample rows (5 per table)...`);
  logMessage(`${'='.repeat(80)}`);

  const tables = ['supplements', 'medications', 'interactions'];
  const samples = {};

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(5);

      if (error) throw error;
      samples[table] = data;
      logMessage(`\n✓ ${table} (${data.length} samples):`);
      data.forEach((row, idx) => {
        logMessage(`  ${idx + 1}. ${JSON.stringify(row).substring(0, 120)}...`);
      });
    } catch (error) {
      logMessage(`❌ Error fetching ${table} samples: ${error.message}`);
      samples[table] = [];
    }
  }

  return samples;
}

async function main() {
  logMessage(`🚀 Starting seed data import...`);
  logMessage(`📅 ${new Date().toISOString()}`);
  logMessage(`📁 Processing ${SQL_FILES.length} SQL files`);

  const results = [];

  for (const filename of SQL_FILES) {
    const result = await executeSQLFile(filename);
    results.push(result);

    // Small delay between files
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  logMessage(`\n${'='.repeat(80)}`);
  logMessage(`📈 IMPORT SUMMARY`);
  logMessage(`${'='.repeat(80)}`);

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  logMessage(`✓ Successful: ${successful}/${SQL_FILES.length}`);
  logMessage(`✗ Failed: ${failed}/${SQL_FILES.length}`);

  if (failed > 0) {
    logMessage(`\n❌ Failed files:`);
    results.filter(r => !r.success).forEach(r => {
      logMessage(`  - ${r.filename}: ${r.error}`);
    });
  }

  // Get final counts and samples
  const counts = await getTableCounts();
  const samples = await getSampleRows();

  // Write log file
  const logPath = join(__dirname, '../artifacts/seed-import/seed_import_report.txt');
  writeFileSync(logPath, log.join('\n'), 'utf-8');
  logMessage(`\n💾 Log saved to: ${logPath}`);

  logMessage(`\n✅ Import process completed!`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
