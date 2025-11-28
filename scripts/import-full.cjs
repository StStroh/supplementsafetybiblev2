const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(JSON.stringify({ok:false,error:'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env'}));
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  console.log('=== SafetyBible Interactions Import ===');
  console.log('Step 1: Loading CSV...');

  const csv = fs.readFileSync('artifacts/interactions_full.csv', 'utf8');
  const rows = csv.trim().split('\n').slice(1);
  console.log(`CSV loaded: ${rows.length} rows`);

  console.log('Step 2: Loading supplements and medications...');
  const {data: sups} = await supabase.from('supplements').select('id,name');
  const {data: meds} = await supabase.from('medications').select('id,name');

  const supMap = new Map(sups.map(s => [s.name.toLowerCase(), s.id]));
  const medMap = new Map(meds.map(m => [m.name.toLowerCase(), m.id]));
  console.log(`Loaded ${sups.length} supplements, ${meds.length} medications`);

  console.log('Step 3: Parsing and mapping CSV rows...');
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

    if (!supId) {
      errors.push({row: i+2, reason: 'supplement_not_found', name: supName});
      continue;
    }
    if (!medId) {
      errors.push({row: i+2, reason: 'medication_not_found', name: medName});
      continue;
    }
    if (!['low','moderate','high','severe'].includes(sev.toLowerCase())) {
      errors.push({row: i+2, reason: 'invalid_severity', severity: sev});
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

  console.log(`Parsed ${parsed.length} valid rows, ${errors.length} errors`);
  if (errors.length > 0) {
    console.log('Sample errors:', errors.slice(0, 5));
  }

  console.log('Step 4: Upserting in batches of 100...');
  let inserted = 0;

  for (let i = 0; i < parsed.length; i += 100) {
    const batch = parsed.slice(i, i + 100);
    const {error} = await supabase.from('interactions').upsert(batch, {
      onConflict: 'supplement_id,medication_id',
      ignoreDuplicates: false
    });

    if (error) {
      console.error(`Batch failed at row ${i}:`, error.message);
      throw error;
    }
    inserted += batch.length;
    const batchNum = Math.floor(i / 100) + 1;
    if (batchNum % 5 === 0) console.log(`Progress: ${i + batch.length}/${parsed.length}`);
  }

  console.log('Step 5: Verification...');
  const {count: finalCount} = await supabase.from('interactions').select('*', {count: 'exact', head: true});

  const {data: sevDist} = await supabase.rpc('exec_sql', {
    query: `SELECT severity, COUNT(*) as count FROM interactions GROUP BY severity ORDER BY count DESC`
  });

  const {data: highSample} = await supabase.rpc('exec_sql', {
    query: `
      SELECT s.name as supplement, m.name as medication, i.severity
      FROM interactions i
      JOIN supplements s ON s.id = i.supplement_id
      JOIN medications m ON m.id = i.medication_id
      WHERE i.severity IN ('high', 'severe')
      ORDER BY i.severity DESC, i.created_at DESC
      LIMIT 10
    `
  });

  console.log('\n=== FINAL REPORT ===');
  console.log(JSON.stringify({
    ok: true,
    csv_rows: rows.length,
    valid_rows: parsed.length,
    errors: errors.length,
    db_counts: {
      supplements: sups.length,
      medications: meds.length,
      interactions: finalCount
    },
    severity_distribution: sevDist,
    high_severity_sample: highSample,
    sample_errors: errors.slice(0, 3)
  }, null, 2));

  console.log('\n✅ Interactions dataset loaded and verified');
}

main().catch(e => {
  console.error(JSON.stringify({ok: false, error: String(e)}));
  process.exit(1);
});
