import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !KEY) throw new Error('Missing SUPABASE_URL or KEY env.');

const supabase = createClient(SUPABASE_URL, KEY, { auth: { persistSession: false }});

async function run() {
  console.log('Applying auto-accepted synonym mappings...\n');

  // Read auto_accepted.csv
  const csvContent = fs.readFileSync('artifacts/auto_accepted.csv', 'utf8');
  const records = parse(csvContent, { columns: true, skip_empty_lines: true });

  console.log(`Found ${records.length} mappings to apply`);

  // Prepare data for upsert
  const synonyms = records.map((r: any) => ({
    synonym_key: r.synonym_key.toLowerCase().trim(),
    canonical_key: r.canonical_key.toLowerCase().trim()
  }));

  // Upsert into supplement_synonyms
  console.log('Upserting to supplement_synonyms...');
  const { data, error } = await supabase
    .from('supplement_synonyms')
    .upsert(synonyms, { onConflict: 'synonym_key' });

  if (error) {
    console.error('Error:', error);
    throw error;
  }

  console.log(`✅ Successfully upserted ${synonyms.length} synonym mappings`);

  // Verify
  const { count } = await supabase
    .from('supplement_synonyms')
    .select('*', { count: 'exact', head: true });

  console.log(`Total supplement_synonyms in database: ${count}`);

  // Test resolution via view
  console.log('\nTesting synonym resolution via v_supp_keys view:');
  const testNames = ['5-htp', 'coq10', 'fish oil', 'omega-3'];

  for (const name of testNames) {
    const { data: result } = await supabase
      .from('v_supp_keys')
      .select('key, canonical')
      .eq('key', name)
      .maybeSingle();

    if (result) {
      console.log(`  "${name}" → "${result.canonical}" ✅`);
    } else {
      console.log(`  "${name}" → NOT FOUND ❌`);
    }
  }
}

run().catch(e => {
  console.error('❌ Failed:', e.message);
  process.exit(1);
});
