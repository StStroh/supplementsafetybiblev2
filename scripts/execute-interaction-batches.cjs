const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'public' },
  auth: { persistSession: false }
});

async function executeBatches() {
  const batchDir = path.join(__dirname, 'interaction-batches');
  const files = fs.readdirSync(batchDir).filter(f => f.endsWith('.sql')).sort();

  console.log(`Found ${files.length} batch files`);

  let totalInserted = 0;
  let totalErrors = 0;

  for (const file of files) {
    const filePath = path.join(batchDir, file);
    const sql = fs.readFileSync(filePath, 'utf-8');

    console.log(`\\nExecuting ${file}...`);

    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql }).maybeSingle();

      if (error) {
        throw error;
      }

      console.log(`✓ ${file} completed`);
      totalInserted++;
    } catch (err) {
      console.error(`✗ ${file} failed:`, err.message);
      totalErrors++;
    }
  }

  console.log(`\\n=== Summary ===`);
  console.log(`Batches executed: ${totalInserted}/${files.length}`);
  console.log(`Errors: ${totalErrors}`);

  const { count } = await supabase
    .from('interactions')
    .select('*', { count: 'exact', head: true });

  console.log(`\\nFinal interaction count: ${count}`);
}

executeBatches().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
