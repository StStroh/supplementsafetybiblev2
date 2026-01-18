const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Credentials:', {url: url ? 'OK' : 'MISSING', key: key ? key.substring(0,15)+'...' : 'MISSING'});

if (!url || !key) {
  console.error('Missing credentials');
  process.exit(1);
}

const supabase = createClient(url, key, {auth: {persistSession: false}});

async function main() {
  console.log('\nExecuting 25 batches...\n');
  const start = Date.now();
  
  for (let i = 1; i <= 25; i++) {
    const num = String(i).padStart(2, '0');
    const file = '/tmp/import_batch_' + num + '.sql';
    const sql = fs.readFileSync(file, 'utf8');
    const t0 = Date.now();
    
    const {error} = await supabase.rpc('exec_sql', {query: sql});
    
    if (error) {
      console.error('Batch', num, 'FAILED:', error.message);
      process.exit(1);
    }
    
    const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
    console.log('Batch', num + '/25:', '100 rows in', elapsed + 's');
  }
  
  const total = ((Date.now() - start) / 1000).toFixed(2);
  console.log('\nTotal time:', total + 's');
  
  const {count} = await supabase.from('interactions').select('*', {count: 'exact', head: true});
  console.log('Final count:', count);
}

main().catch(e => {console.error('Error:', e.message); process.exit(1);});
