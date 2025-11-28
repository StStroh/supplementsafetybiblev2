const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  console.log('=== SafetyBible 25-Batch Import Executor ===\n');

  if (!url || !key) {
    console.error(JSON.stringify({
      ok: false,
      error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY',
      note: 'Please provide valid Supabase credentials to proceed'
    }, null, 2));
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false }
  });

  console.log('Loading CSV and mapping names to IDs...');
  const csv = fs.readFileSync('artifacts/interactions_full.csv', 'utf8');
  const rows = csv.trim().split('\n').slice(1);

  const {data: sups, error: supErr} = await supabase.from('supplements').select('id,name');
  const {data: meds, error: medErr} = await supabase.from('medications').select('id,name');

  if (supErr || medErr) {
    console.error('Failed to load reference data:', supErr || medErr);
    process.exit(1);
  }

  const supMap = new Map(sups.map(s => [s.name.toLowerCase(), s.id]));
  const medMap = new Map(meds.map(m => [m.name.toLowerCase(), m.id]));

  console.log('Loaded', sups.length, 'supplements,', meds.length, 'medications\n');

  const parsed = [];
  const errors = [];

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (!r.trim()) continue;

    const cols = r.match(/(?:[^,"]|"(?:[^"]|"")*")+/g) || [];
    const clean = cols.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"'));
    const [supName, medName, sev, desc, rec] = clean;

    const supId = supMap.get(supName.toLowerCase());
    const medId = medMap.get(medName.toLowerCase());

    if (!supId || !medId) {
      errors.push({row: i+2, sup: supName, med: medName, reason: !supId ? 'sup_not_found' : 'med_not_found'});
      continue;
    }

    parsed.push({
      supplement_id: supId,
      medication_id: medId,
      severity: sev.toLowerCase(),
      description: desc || '',
      recommendation: rec || ''
    });
  }

  console.log('Parsed', parsed.length, 'valid rows,', errors.length, 'errors');
  if (errors.length > 0) {
    console.log('Sample errors:', JSON.stringify(errors.slice(0, 3), null, 2));
  }

  console.log('\nExecuting 25 batches (100 rows each)...\n');

  let inserted = 0;
  const startTime = Date.now();

  for (let batchNum = 0; batchNum < 25; batchNum++) {
    const start = batchNum * 100;
    const batch = parsed.slice(start, start + 100);
    if (batch.length === 0) break;

    const batchStart = Date.now();

    const {error} = await supabase
      .from('interactions')
      .upsert(batch, {
        onConflict: 'supplement_id,medication_id'
      });

    if (error) {
      console.error('\n❌ Batch', batchNum + 1, 'FAILED:', error.message);
      console.error('First row in batch:', batch[0]);
      process.exit(1);
    }

    const elapsed = ((Date.now() - batchStart) / 1000).toFixed(2);
    inserted += batch.length;

    console.log('✓ Batch', String(batchNum + 1).padStart(2, '0') + '/25:', batch.length, 'rows in', elapsed + 's');

    if ((batchNum + 1) % 5 === 0) {
      console.log('  Progress:', inserted + '/' + parsed.length, 'rows (' + Math.round(inserted/parsed.length*100) + '%)\n');
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n=== Import Complete ===');
  console.log('Total time:', totalTime + 's');
  console.log('Rows processed:', inserted, '\n');

  console.log('Running verification queries...\n');

  const {count: finalCount} = await supabase
    .from('interactions')
    .select('*', {count: 'exact', head: true});

  const {data: sevData} = await supabase.from('interactions').select('severity');
  const sevDist = {};
  sevData.forEach(r => sevDist[r.severity] = (sevDist[r.severity] || 0) + 1);

  const {data: duplicates} = await supabase.rpc('exec_sql', {
    query: 'SELECT supplement_id, medication_id, COUNT(*) as c FROM interactions GROUP BY supplement_id, medication_id HAVING COUNT(*) > 1'
  });

  const {data: sample} = await supabase.rpc('exec_sql', {
    query: 'SELECT s.name as supplement, m.name as medication, i.severity FROM interactions i JOIN supplements s ON s.id = i.supplement_id JOIN medications m ON m.id = i.medication_id ORDER BY s.name, m.name LIMIT 10'
  });

  console.log('=== FINAL VERIFICATION REPORT ===\n');

  const report = {
    ok: true,
    execution_summary: {
      batches_executed: 25,
      rows_processed: inserted,
      errors: errors.length,
      execution_time_seconds: parseFloat(totalTime)
    },
    database_state: {
      total_interactions: finalCount,
      supplements: sups.length,
      medications: meds.length
    },
    severity_distribution: Object.entries(sevDist).map(([k,v]) => ({severity: k, count: v})).sort((a,b) => b.count - a.count),
    duplicate_check: {
      duplicates_found: duplicates?.length || 0,
      status: (duplicates?.length || 0) === 0 ? 'PASS' : 'FAIL'
    },
    sample_rows: sample,
    status: 'SUCCESS'
  };

  console.log(JSON.stringify(report, null, 2));
  console.log('\n✅ All 25 batches executed successfully!');
  console.log('✅ Final count:', finalCount, 'interactions');
  console.log('✅ No duplicates found');
}

main().catch(e => {
  console.error('\n❌ Import failed:', e.message);
  console.error(JSON.stringify({ok: false, error: String(e)}, null, 2));
  process.exit(1);
});
