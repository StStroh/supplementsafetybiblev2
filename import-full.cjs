const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function importSQL() {
  const startTime = Date.now();
  console.log('Starting import at', new Date().toISOString());
  
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  console.log('Reading SQL file...');
  const sql = fs.readFileSync('/tmp/cc-agent/59885259/project/FULL_CSV_IMPORT.sql', 'utf8');
  
  console.log('Executing import (2,451 statements)...');
  
  const { data, error } = await supabase.rpc('exec_sql', { sql_string: sql }).catch(async () => {
    // If RPC doesn't exist, execute directly via pg
    console.log('Direct execution via raw query...');
    const { data, error } = await supabase.from('_raw').select('*').limit(0);
    
    if (error) {
      console.log('Trying alternate method - executing via execute_sql...');
      // Try direct SQL execution
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({ query: sql })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    }
    
    return { data, error };
  });
  
  if (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
  
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✓ Import completed in ${elapsed}s`);
  console.log('\nRunning verification queries...\n');
  
  // Verification
  const { data: count } = await supabase
    .from('interactions')
    .select('*', { count: 'exact', head: true });
    
  const { data: byS everity } = await supabase
    .from('interactions')
    .select('severity')
    .then(res => {
      const counts = {};
      res.data?.forEach(row => {
        counts[row.severity] = (counts[row.severity] || 0) + 1;
      });
      return { data: counts };
    });
  
  console.log('Total interactions:', count?.count || 'N/A');
  console.log('By severity:', bySeverity);
  
  process.exit(0);
}

importSQL();
