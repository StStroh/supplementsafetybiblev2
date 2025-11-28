import fs from 'fs';
import { parse } from 'csv-parse';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !KEY) throw new Error('Missing SUPABASE_URL or KEY env.');

const supabase = createClient(SUPABASE_URL, KEY, { auth: { persistSession: false }});

type Row = {
  supplement_name: string;
  medication_name: string;
  severity: string;
  description: string;
  recommendation: string;
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
    recommendation: (r.recommendation || '').trim()
  };
}

async function run() {
  console.log('Re-importing with synonym resolution...\n');

  // Load supplements and medications with synonym resolution
  console.log('Loading supplement/medication mappings with synonyms...');

  // Get all supplements (including via synonyms)
  const { data: suppData } = await supabase.from('supplements').select('id, name');
  const { data: medData } = await supabase.from('medications').select('id, name');

  if (!suppData || !medData) throw new Error('Failed to load supplements/medications');

  // Build maps: lowercase name → ID
  const suppMap = new Map(suppData.map(s => [s.name.toLowerCase().trim(), s.id]));
  const medMap = new Map(medData.map(m => [m.name.toLowerCase().trim(), m.id]));

  // Also load synonym mappings and add to maps
  const { data: suppSynonyms } = await supabase.from('supplement_synonyms').select('synonym_key, canonical_key');
  const { data: medSynonyms } = await supabase.from('medication_synonyms').select('synonym_key, canonical_key');

  (suppSynonyms || []).forEach(syn => {
    const canonicalId = suppMap.get(syn.canonical_key);
    if (canonicalId) {
      suppMap.set(syn.synonym_key, canonicalId);
    }
  });

  (medSynonyms || []).forEach(syn => {
    const canonicalId = medMap.get(syn.canonical_key);
    if (canonicalId) {
      medMap.set(syn.synonym_key, canonicalId);
    }
  });

  console.log(`Loaded ${suppMap.size} supplement keys (including synonyms)`);
  console.log(`Loaded ${medMap.size} medication keys (including synonyms)\n`);

  // Parse CSV
  const file = 'artifacts/interactions_full.csv';
  if (!fs.existsSync(file)) throw new Error(`CSV not found at ${file}`);

  const parser = fs.createReadStream(file).pipe(parse({ columns: true, bom: true, trim: true }));

  const BATCH = 100;
  let batch: any[] = [];
  let sent = 0, skipped = 0, batchNo = 0;
  const skippedSamples: string[] = [];

  for await (const raw of parser) {
    const row = normalize(raw as Row);
    const suppKey = row.supplement_name.toLowerCase().trim();
    const medKey = row.medication_name.toLowerCase().trim();

    const suppId = suppMap.get(suppKey);
    const medId = medMap.get(medKey);

    if (!suppId || !medId) {
      skipped++;
      if (skippedSamples.length < 10) {
        skippedSamples.push(`${row.supplement_name} + ${row.medication_name}`);
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
      // Deduplicate batch by supplement_id + medication_id
      const uniqueBatch = Array.from(
        new Map(batch.map(b => [`${b.supplement_id}|${b.medication_id}`, b])).values()
      );

      batchNo++;
      const { error, status } = await supabase
        .from('interactions')
        .upsert(uniqueBatch, { onConflict: 'supplement_id,medication_id' });
      if (error) throw error;
      sent += uniqueBatch.length;
      console.log(`Batch ${batchNo} upserted: ${uniqueBatch.length} rows (${batch.length - uniqueBatch.length} dupes removed, HTTP ${status})`);
      batch = [];
    }
  }

  if (batch.length) {
    // Deduplicate final batch
    const uniqueBatch = Array.from(
      new Map(batch.map(b => [`${b.supplement_id}|${b.medication_id}`, b])).values()
    );

    batchNo++;
    const { error, status } = await supabase
      .from('interactions')
      .upsert(uniqueBatch, { onConflict: 'supplement_id,medication_id' });
    if (error) throw error;
    sent += uniqueBatch.length;
    console.log(`Batch ${batchNo} upserted: ${uniqueBatch.length} rows (${batch.length - uniqueBatch.length} dupes removed, HTTP ${status})`);
  }

  console.log(`\n✅ Processing complete:`);
  console.log(`   Rows sent: ${sent}`);
  console.log(`   Rows skipped: ${skipped}`);

  if (skippedSamples.length > 0) {
    console.log('\n   Sample skipped rows:');
    skippedSamples.forEach(s => console.log(`     - ${s}`));
  }

  // Verification
  console.log('\n---- FINAL REPORT ----');

  const { count: totalCount } = await supabase
    .from('interactions')
    .select('*', { count: 'exact', head: true });

  const { data: allInteractions } = await supabase
    .from('interactions')
    .select('severity')
    .limit(3000);

  const severityMap: Record<string, number> = {};
  allInteractions?.forEach(row => {
    severityMap[row.severity] = (severityMap[row.severity] || 0) + 1;
  });

  console.log('Total rows in interactions table:', totalCount);
  console.log('Severity breakdown:', Object.entries(severityMap).map(([severity, c]) => ({ severity, count: c })));
  console.log('✅ Re-import complete and verified.');
}

run().catch(e => {
  console.error('❌ Re-import failed:', e.message);
  process.exit(1);
});
