import fs from 'fs';
import { parse } from 'csv-parse';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL env.');
}

// Try service role key first, fallback to anon key
const KEY = SERVICE_ROLE_KEY || ANON_KEY;
if (!KEY) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY env.');
}

console.log('Using', SERVICE_ROLE_KEY ? 'SERVICE_ROLE_KEY' : 'ANON_KEY', 'for authentication');
const supabase = createClient(SUPABASE_URL, KEY, { auth: { persistSession: false }});

type Row = {
  supplement_name: string;
  medication_name: string;
  severity: string;
  description: string;
  recommendation: string;
  source?: string;
};

const VALID = new Set(['low','moderate','high','severe']);

function normalize(r: Row): Row {
  const sev = (r.severity || '').toLowerCase().trim();
  if (!VALID.has(sev)) throw new Error(`Invalid severity value: "${r.severity}"`);
  return {
    supplement_name: (r.supplement_name || '').trim(),
    medication_name: (r.medication_name || '').trim(),
    severity: sev,
    description: (r.description || '').trim(),
    recommendation: (r.recommendation || '').trim(),
    source: (r.source || '').trim() || null as any
  };
}

async function run() {
  const file = 'artifacts/interactions_full.csv';
  if (!fs.existsSync(file)) throw new Error(`CSV not found at ${file}`);

  console.log('Starting import from', file);
  console.log('Loading supplements and medications from database...');

  // Load all supplements and medications
  const { data: supplements } = await supabase.from('supplements').select('id, name');
  const { data: medications } = await supabase.from('medications').select('id, name');

  if (!supplements || !medications) throw new Error('Failed to load supplements/medications');

  const suppMap = new Map(supplements.map(s => [s.name.toLowerCase().trim(), s.id]));
  const medMap = new Map(medications.map(m => [m.name.toLowerCase().trim(), m.id]));

  console.log(`Loaded ${suppMap.size} supplements, ${medMap.size} medications`);

  const parser = fs.createReadStream(file).pipe(parse({ columns: true, bom: true, trim: true }));

  const BATCH = 100;
  let batch: any[] = [];
  let sent = 0, batchNo = 0, skipped = 0;

  for await (const raw of parser) {
    const row = normalize(raw as Row);
    const suppId = suppMap.get(row.supplement_name.toLowerCase().trim());
    const medId = medMap.get(row.medication_name.toLowerCase().trim());

    if (!suppId || !medId) {
      skipped++;
      if (skipped <= 5) {
        console.log(`  [SKIP] Missing ID for: ${row.supplement_name} + ${row.medication_name}`);
      }
      continue;
    }

    batch.push({
      supplement_id: suppId,
      medication_id: medId,
      severity: row.severity,
      description: row.description,
      recommendation: row.recommendation
    });

    if (batch.length >= BATCH) {
      batchNo++;
      const { error, status } = await supabase
        .from('interactions')
        .upsert(batch, { onConflict: 'supplement_id,medication_id' });
      if (error) throw error;
      sent += batch.length;
      console.log(`Batch ${batchNo} upserted: ${batch.length} rows (HTTP ${status})`);
      batch = [];
    }
  }
  if (batch.length) {
    batchNo++;
    const { error, status } = await supabase
      .from('interactions')
      .upsert(batch, { onConflict: 'supplement_id,medication_id' });
    if (error) throw error;
    sent += batch.length;
    console.log(`Batch ${batchNo} upserted: ${batch.length} rows (HTTP ${status})`);
  }

  console.log(`\nProcessing complete: ${sent} rows sent, ${skipped} rows skipped (missing IDs)`);

  // Verification using Supabase API
  const { count: totalCount } = await supabase
    .from('interactions')
    .select('*', { count: 'exact', head: true });

  const { data: allInteractions } = await supabase
    .from('interactions')
    .select('severity, supplement_id, medication_id')
    .limit(2500);

  const severityMap: Record<string, number> = {};
  allInteractions?.forEach(row => {
    severityMap[row.severity] = (severityMap[row.severity] || 0) + 1;
  });

  // Check for duplicates
  const keyMap = new Map<string, number>();
  allInteractions?.forEach(row => {
    const key = `${row.supplement_id}|${row.medication_id}`;
    keyMap.set(key, (keyMap.get(key) || 0) + 1);
  });
  const dupes = Array.from(keyMap.entries()).filter(([_, count]) => count > 1).slice(0, 10);

  // Get sample with names
  const { data: sampleData } = await supabase
    .from('interactions')
    .select(`
      severity,
      supplements:supplement_id(name),
      medications:medication_id(name)
    `)
    .limit(10);

  const sample = sampleData?.map((r: any) => ({
    supplement: r.supplements?.name || 'N/A',
    medication: r.medications?.name || 'N/A',
    severity: r.severity
  }));

  console.log('---- FINAL REPORT ----');
  console.log('Rows processed (sent):', sent);
  console.log('Total rows in table  :', totalCount);
  console.log('Severity breakdown   :', Object.entries(severityMap).map(([severity, c]) => ({ severity, c })));
  console.log('Duplicate pairs (<=10 shown):', dupes.length, dupes.map(([key, count]) => ({ key, count })));
  console.log('Sample rows          :', sample);
  console.log('✅ Import complete and verified.');
}

run().catch(e => {
  console.error('❌ Import failed:', e.message);
  process.exit(1);
});
