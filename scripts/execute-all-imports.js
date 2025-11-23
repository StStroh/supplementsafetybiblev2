import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = 'https://cyxfxjoadzxhxwxjqkez.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
const startTime = Date.now();

function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}`;
  console.log(logLine);
  log.push(logLine);
}

async function executeSQLFromFile(filename) {
  const filePath = join(process.cwd(), 'scripts/sql-mapped', filename);

  logMessage(`\n${'='.repeat(80)}`);
  logMessage(`📄 Processing: ${filename}`);

  try {
    const sqlContent = readFileSync(filePath, 'utf-8');
    logMessage(`✓ File read (${(sqlContent.length / 1024).toFixed(2)} KB)`);

    const execStart = Date.now();

    // Use raw SQL query with Supabase
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: sqlContent
    }).catch(async (err) => {
      // Fallback: Try direct REST API call
      logMessage(`⚠ RPC not available, using direct method...`);

      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ sql_query: sqlContent })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return { data: await response.json(), error: null };
    });

    if (error) throw error;

    const execTime = Date.now() - execStart;
    logMessage(`✓ Executed successfully (${execTime}ms)`);

    return { success: true, filename, time: execTime };

  } catch (error) {
    const errorMsg = error.message || String(error);
    logMessage(`❌ ERROR: ${errorMsg}`);
    return { success: false, filename, error: errorMsg };
  }
}

async function getTableCounts() {
  logMessage(`\n${'='.repeat(80)}`);
  logMessage(`📊 RETRIEVING TABLE COUNTS`);
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
  logMessage(`📋 RETRIEVING SAMPLE ROWS (5 per table)`);
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
      logMessage(`\n✓ ${table} (showing ${data.length} samples):`);

      data.forEach((row, idx) => {
        const rowStr = JSON.stringify(row);
        const displayStr = rowStr.length > 150 ? rowStr.substring(0, 150) + '...' : rowStr;
        logMessage(`  ${idx + 1}. ${displayStr}`);
      });

    } catch (error) {
      logMessage(`❌ Error fetching ${table} samples: ${error.message}`);
      samples[table] = [];
    }
  }

  return samples;
}

async function main() {
  logMessage(`🚀 SEED DATA IMPORT STARTING`);
  logMessage(`📅 ${new Date().toISOString()}`);
  logMessage(`📁 Processing ${SQL_FILES.length} SQL files`);

  const results = [];

  for (const filename of SQL_FILES) {
    const result = await executeSQLFromFile(filename);
    results.push(result);

    // Brief pause between files
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // Summary
  logMessage(`\n${'='.repeat(80)}`);
  logMessage(`📈 IMPORT SUMMARY`);
  logMessage(`${'='.repeat(80)}`);

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

  logMessage(`✓ Successful: ${successful}/${SQL_FILES.length}`);
  logMessage(`✗ Failed: ${failed}/${SQL_FILES.length}`);
  logMessage(`⏱ Total time: ${totalTime}s`);

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
  const artifactsDir = join(process.cwd(), 'artifacts/seed-import');
  const logPath = join(artifactsDir, 'seed_import_report.txt');

  writeFileSync(logPath, log.join('\n'), 'utf-8');
  logMessage(`\n💾 Full log saved to: ${logPath}`);

  logMessage(`\n✅ IMPORT PROCESS COMPLETED!`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
