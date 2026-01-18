import pg from 'pg';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres.cyxfxjoadzxhxwxjqkez:Mangoapplesauce123!@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

const client = new pg.Client({ connectionString });

async function importInteractions() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully\n');

    console.log('Reading SQL file...');
    const sql = readFileSync('artifacts/all_interactions_import.sql', 'utf-8');
    console.log('Loaded SQL file\n');

    console.log('Executing interactions import (this may take a minute)...');
    const result = await client.query(sql);
    console.log('Import complete!\n');

    console.log('Verifying counts...');
    const counts = await client.query('SELECT (SELECT count(*) FROM supplements) as supplements_count, (SELECT count(*) FROM medications) as medications_count, (SELECT count(*) FROM interactions) as interactions_count');

    console.log('\nFINAL DATABASE COUNTS:');
    console.log('Supplements: ', counts.rows[0].supplements_count);
    console.log('Medications: ', counts.rows[0].medications_count);
    console.log('Interactions:', counts.rows[0].interactions_count);
    console.log('\nExpected: 1000 supplements, 150 medications, 2500 interactions');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

importInteractions();
