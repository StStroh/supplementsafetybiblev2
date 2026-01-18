import fs from 'fs';
import { parse } from 'csv-parse';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !KEY) throw new Error('Missing SUPABASE_URL or KEY env.');

const supabase = createClient(SUPABASE_URL, KEY, { auth: { persistSession: false }});

async function run() {
  console.log('Diagnosing skipped rows...\n');

  // Load supplements and medications with synonym resolution
  let allSupps: any[] = [];
  let page = 0;
  while (true) {
    const { data } = await supabase.from('supplements').select('id, name').range(page * 1000, (page + 1) * 1000 - 1);
    if (!data || data.length === 0) break;
    allSupps = allSupps.concat(data);
    if (data.length < 1000) break;
    page++;
  }

  let allMeds: any[] = [];
  page = 0;
  while (true) {
    const { data } = await supabase.from('medications').select('id, name').range(page * 1000, (page + 1) * 1000 - 1);
    if (!data || data.length === 0) break;
    allMeds = allMeds.concat(data);
    if (data.length < 1000) break;
    page++;
  }

  const suppMap = new Map(allSupps.map(s => [s.name.toLowerCase().trim(), s]));
  const medMap = new Map(allMeds.map(m => [m.name.toLowerCase().trim(), m]));

  // Load synonyms
  const { data: suppSynonyms } = await supabase.from('supplement_synonyms').select('synonym_key, canonical_key');
  const { data: medSynonyms } = await supabase.from('medication_synonyms').select('synonym_key, canonical_key');

  (suppSynonyms || []).forEach(syn => {
    const canonical = suppMap.get(syn.canonical_key);
    if (canonical) {
      suppMap.set(syn.synonym_key, canonical);
    }
  });

  (medSynonyms || []).forEach(syn => {
    const canonical = medMap.get(syn.canonical_key);
    if (canonical) {
      medMap.set(syn.synonym_key, canonical);
    }
  });

  console.log(`Loaded ${suppMap.size} supplement keys (with synonyms)`);
  console.log(`Loaded ${medMap.size} medication keys (with synonyms)\n`);

  // Parse CSV and check what's being skipped
  const parser = fs.createReadStream('artifacts/interactions_full.csv')
    .pipe(parse({ columns: true, bom: true, trim: true }));

  const skippedReasons: Record<string, number> = {
    'missing_supplement': 0,
    'missing_medication': 0,
    'missing_both': 0
  };

  const skippedExamples: Array<{ supp: string; med: string; reason: string }> = [];
  const missingSupps = new Set<string>();
  const missingMeds = new Set<string>();

  for await (const row of parser) {
    const suppKey = row.supplement_name.toLowerCase().trim();
    const medKey = row.medication_name.toLowerCase().trim();

    const suppId = suppMap.get(suppKey);
    const medId = medMap.get(medKey);

    if (!suppId && !medId) {
      skippedReasons['missing_both']++;
      if (skippedExamples.length < 50) {
        skippedExamples.push({ supp: row.supplement_name, med: row.medication_name, reason: 'missing_both' });
      }
      missingSupps.add(row.supplement_name);
      missingMeds.add(row.medication_name);
    } else if (!suppId) {
      skippedReasons['missing_supplement']++;
      if (skippedExamples.length < 50) {
        skippedExamples.push({ supp: row.supplement_name, med: row.medication_name, reason: 'missing_supplement' });
      }
      missingSupps.add(row.supplement_name);
    } else if (!medId) {
      skippedReasons['missing_medication']++;
      if (skippedExamples.length < 50) {
        skippedExamples.push({ supp: row.supplement_name, med: row.medication_name, reason: 'missing_medication' });
      }
      missingMeds.add(row.medication_name);
    }
  }

  console.log('=== SKIP REASONS ===');
  console.log(`Missing supplement only: ${skippedReasons['missing_supplement']}`);
  console.log(`Missing medication only: ${skippedReasons['missing_medication']}`);
  console.log(`Missing both: ${skippedReasons['missing_both']}`);
  console.log(`Total skipped: ${Object.values(skippedReasons).reduce((a, b) => a + b, 0)}\n`);

  console.log('=== UNIQUE MISSING NAMES ===');
  console.log(`Unique missing supplements: ${missingSupps.size}`);
  console.log(`Unique missing medications: ${missingMeds.size}\n`);

  if (missingSupps.size > 0) {
    console.log('Missing supplement names (sample):');
    Array.from(missingSupps).slice(0, 20).forEach(s => console.log(`  - ${s}`));
    console.log();
  }

  if (missingMeds.size > 0) {
    console.log('Missing medication names (sample):');
    Array.from(missingMeds).slice(0, 20).forEach(m => console.log(`  - ${m}`));
    console.log();
  }

  console.log('=== SKIP EXAMPLES ===');
  skippedExamples.slice(0, 25).forEach((ex, i) => {
    console.log(`${i + 1}. ${ex.supp} + ${ex.med} (${ex.reason})`);
  });

  // Write full lists
  fs.writeFileSync('artifacts/missing_supps_detailed.txt', Array.from(missingSupps).sort().join('\n'));
  fs.writeFileSync('artifacts/missing_meds_detailed.txt', Array.from(missingMeds).sort().join('\n'));

  console.log('\nFiles written:');
  console.log('  - artifacts/missing_supps_detailed.txt');
  console.log('  - artifacts/missing_meds_detailed.txt');
}

run().catch(e => {
  console.error('❌ Failed:', e.message);
  process.exit(1);
});
