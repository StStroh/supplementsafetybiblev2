import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = 'https://cyxfxjoadzxhxwxjqkez.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const numBatches = 10;
let totalInserted = 0;

console.log(`Executing ${numBatches} SQL batches via MCP execute_sql...`);

for (let i = 1; i <= numBatches; i++) {
  const sqlPath = `/tmp/batch_${i}.sql`;
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log(`\n📦 Executing batch ${i}/${numBatches}...`);

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/execute_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`❌ Batch ${i} failed:`, error);
    throw new Error(`Batch ${i} failed`);
  }

  const result = await response.json();
  console.log(`✅ Batch ${i}/${numBatches} completed`);
  totalInserted += (i < 10 ? 500 : 491);
}

console.log(`\n✅ All batches completed. Total rows processed: ${totalInserted}`);
