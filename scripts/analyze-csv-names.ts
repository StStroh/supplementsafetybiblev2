import fs from 'fs';
import { parse } from 'csv-parse';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !KEY) throw new Error('Missing SUPABASE_URL or KEY env.');

const supabase = createClient(SUPABASE_URL, KEY, { auth: { persistSession: false }});

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

async function run() {
  console.log('Analyzing artifacts/interactions_full.csv...\n');

  // Parse CSV and collect unique names
  const csvSupps = new Set<string>();
  const csvMeds = new Set<string>();

  const parser = fs.createReadStream('artifacts/interactions_full.csv')
    .pipe(parse({ columns: true, bom: true, trim: true }));

  for await (const row of parser) {
    if (row.supplement_name) csvSupps.add(normalize(row.supplement_name));
    if (row.medication_name) csvMeds.add(normalize(row.medication_name));
  }

  console.log(`CSV contains ${csvSupps.size} unique supplement names`);
  console.log(`CSV contains ${csvMeds.size} unique medication names\n`);

  // Fetch canonical names from database
  const { data: supplements } = await supabase.from('supplements').select('name');
  const { data: medications } = await supabase.from('medications').select('name');

  const dbSupps = new Set((supplements || []).map(s => normalize(s.name)));
  const dbMeds = new Set((medications || []).map(m => normalize(m.name)));

  console.log(`Database contains ${dbSupps.size} canonical supplements`);
  console.log(`Database contains ${dbMeds.size} canonical medications\n`);

  // Compute missing names
  const missingSuppNames = Array.from(csvSupps).filter(s => !dbSupps.has(s)).sort();
  const missingMedNames = Array.from(csvMeds).filter(m => !dbMeds.has(m)).sort();

  console.log(`Missing supplement names: ${missingSuppNames.length}`);
  console.log(`Missing medication names: ${missingMedNames.length}\n`);

  // Write outputs
  fs.mkdirSync('artifacts', { recursive: true });

  fs.writeFileSync('artifacts/csv_supp_names.txt', Array.from(csvSupps).sort().join('\n'));
  fs.writeFileSync('artifacts/csv_med_names.txt', Array.from(csvMeds).sort().join('\n'));
  fs.writeFileSync('artifacts/missing_supp_names.txt', missingSuppNames.join('\n'));
  fs.writeFileSync('artifacts/missing_med_names.txt', missingMedNames.join('\n'));

  console.log('Files written:');
  console.log('  - artifacts/csv_supp_names.txt');
  console.log('  - artifacts/csv_med_names.txt');
  console.log('  - artifacts/missing_supp_names.txt');
  console.log('  - artifacts/missing_med_names.txt');

  // Return data for next script
  return {
    csvSupps: Array.from(csvSupps).sort(),
    csvMeds: Array.from(csvMeds).sort(),
    dbSupps: Array.from(dbSupps).sort(),
    dbMeds: Array.from(dbMeds).sort(),
    missingSuppNames,
    missingMedNames
  };
}

run().catch(e => {
  console.error('❌ Analysis failed:', e.message);
  process.exit(1);
});
