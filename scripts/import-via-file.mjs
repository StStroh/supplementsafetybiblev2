import fs from 'fs';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL ||
  `postgresql://postgres.cyxfxjoadzxhxwxjqkez:${process.env.SUPABASE_SERVICE_ROLE_KEY}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`;

console.log('Connecting to database...');

const client = new pg.Client({  connectionString,
  ssl: { rejectUnauthorized: false }
});

await client.connect();
console.log('✓ Connected');

console.log('Creating temp mapping tables...');
await client.query('CREATE TEMP TABLE IF NOT EXISTS temp_supplement_map AS SELECT id, name FROM supplements;');
await client.query('CREATE TEMP TABLE IF NOT EXISTS temp_medication_map AS SELECT id, name FROM medications;');
console.log('✓ Temp tables created');

const sql = fs.readFileSync('artifacts/all_interactions_import.sql', 'utf8');

console.log(`Executing import (${(sql.length/1024).toFixed(1)}KB)...`);
const result = await client.query(sql);
console.log(`✅ Imported ${result.rowCount || 'unknown'} rows`);

const countResult = await client.query('SELECT COUNT(*) as total FROM interactions');
console.log(`✓ Total interactions in DB: ${countResult.rows[0].total}`);

await client.query('ANALYZE interactions;');
console.log('✓ ANALYZE complete');

await client.end();
console.log('✓ Done');
