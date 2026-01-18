import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = 'https://cyxfxjoadzxhxwxjqkez.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const log = [];

function logMsg(msg) {
  console.log(msg);
  log.push(msg);
}

// Files to import (first is already done)
const FILES = [
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
];

async function executeSQLFile(filename) {
  const filePath = join(__dirname, 'sql-mapped', filename);
  logMsg(`\n${'='.repeat(60)}`);
  logMsg(`📄 ${filename}`);

  try {
    const sql = readFileSync(filePath, 'utf-8');
    logMsg(`✓ Read ${(sql.length / 1024).toFixed(1)}KB`);

    const start = Date.now();

    // Execute using RPC if available, otherwise use raw query
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({ sql_query: sql })
    });

    const duration = ((Date.now() - start) / 1000).toFixed(1);

    if (response.ok) {
      logMsg(`✓ Success (${duration}s)`);
      return { success: true, filename, duration };
    } else {
      const error = await response.text();
      logMsg(`❌ Error: ${error.substring(0, 200)}`);
      return { success: false, filename, error: error.substring(0, 500) };
    }
  } catch (error) {
    logMsg(`❌ Exception: ${error.message}`);
    return { success: false, filename, error: error.message };
  }
}

async function getTableCounts() {
  logMsg(`\n${'='.repeat(60)}`);
  logMsg(`📊 TABLE COUNTS`);
  logMsg(`${'='.repeat(60)}`);

  const tables = ['supplements', 'medications', 'interactions'];
  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      logMsg(`✓ ${table}: ${count} rows`);
    } catch (error) {
      logMsg(`❌ ${table}: ${error.message}`);
    }
  }
}

async function getSamples() {
  logMsg(`\n${'='.repeat(60)}`);
  logMsg(`📋 SAMPLE ROWS (5 each)`);
  logMsg(`${'='.repeat(60)}`);

  const tables = ['supplements', 'medications', 'interactions'];
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(5);

      if (error) throw error;

      logMsg(`\n${table}:`);
      data.forEach((row, i) => {
        const str = JSON.stringify(row);
        logMsg(`  ${i+1}. ${str.substring(0, 100)}${str.length > 100 ? '...' : ''}`);
      });
    } catch (error) {
      logMsg(`❌ ${table}: ${error.message}`);
    }
  }
}

async function main() {
  const startTime = Date.now();

  logMsg('🚀 SEED IMPORT STARTING');
  logMsg(`📅 ${new Date().toISOString()}`);
  logMsg(`📁 ${FILES.length} files to process`);

  const results = [];

  for (const file of FILES) {
    const result = await executeSQLFile(file);
    results.push(result);
    await new Promise(r => setTimeout(r, 300));
  }

  // Summary
  logMsg(`\n${'='.repeat(60)}`);
  logMsg(`📈 SUMMARY`);
  logMsg(`${'='.repeat(60)}`);

  const success = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);

  logMsg(`✓ Success: ${success}/${FILES.length}`);
  logMsg(`✗ Failed: ${failed}/${FILES.length}`);
  logMsg(`⏱ Total: ${totalTime}s`);

  if (failed > 0) {
    logMsg(`\nFailed files:`);
    results.filter(r => !r.success).forEach(r => {
      logMsg(`  - ${r.filename}`);
    });
  }

  // Get counts and samples
  await getTableCounts();
  await getSamples();

  // Save log
  const logPath = join(__dirname, '../artifacts/seed-import/seed_import_report.txt');
  writeFileSync(logPath, log.join('\n'), 'utf-8');
  logMsg(`\n💾 Log: ${logPath}`);

  logMsg(`\n✅ COMPLETED`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
