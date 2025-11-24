import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const batches = [
  'scripts/sql-mapped/03_interactions_batch_02.sql',
  'scripts/sql-mapped/03_interactions_batch_03.sql',
  'scripts/sql-mapped/03_interactions_batch_04.sql',
  'scripts/sql-mapped/03_interactions_batch_05.sql',
  'scripts/sql-mapped/03_interactions_batch_06.sql',
  'scripts/sql-mapped/03_interactions_batch_07.sql',
  'scripts/sql-mapped/03_interactions_batch_08.sql',
  'scripts/sql-mapped/03_interactions_batch_09.sql',
  'scripts/sql-mapped/03_interactions_batch_10.sql',
  'scripts/sql-mapped/03_interactions_batch_11.sql',
];

console.log('Starting interactions import...\n');

for (let i = 0; i < batches.length; i++) {
  const file = batches[i];
  console.log(`[${i + 1}/10] Importing ${file}...`);
  
  try {
    const sql = readFileSync(file, 'utf-8');
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error(`✗ Error: ${error.message}`);
      process.exit(1);
    }
    
    console.log(`✓ Success`);
  } catch (err) {
    console.error(`✗ Exception: ${err.message}`);
    process.exit(1);
  }
}

console.log('\n' + '='.repeat(60));
console.log('Verifying final counts...');
console.log('='.repeat(60));

const { data, error } = await supabase.rpc('exec_sql', { 
  sql_query: `
    SELECT 
      (SELECT count(*) FROM supplements) as supplements_count,
      (SELECT count(*) FROM medications) as medications_count,
      (SELECT count(*) FROM interactions) as interactions_count;
  `
});

if (error) {
  console.error('Error checking counts:', error.message);
} else {
  console.log('\nFINAL COUNTS:');
  console.log('Supplements:', data[0]?.supplements_count || 0);
  console.log('Medications:', data[0]?.medications_count || 0);
  console.log('Interactions:', data[0]?.interactions_count || 0);
  console.log('\nExpected: 1000 supplements, 150 medications, 2500 interactions');
}

console.log('\n✓ Import complete!');
