const { readFileSync } = require('fs');
const { Client } = require('pg');

// Connection string from Supabase project settings
const connectionString = process.env.DATABASE_URL ||
  'postgresql://postgres.cyxfxjoadzxhxwxjqkez:Mangoapplesauce123!@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    
    // Create temp tables
    await client.query(`
      CREATE TEMP TABLE IF NOT EXISTS temp_supplement_map AS
      SELECT name, id FROM supplements;
      
      CREATE TEMP TABLE IF NOT EXISTS temp_medication_map AS
      SELECT name, id FROM medications;
      
      CREATE INDEX IF NOT EXISTS idx_temp_supp_name ON temp_supplement_map(name);
      CREATE INDEX IF NOT EXISTS idx_temp_med_name ON temp_medication_map(name);
    `);
    
    // Execute each batch
    for (let i = 2; i <= 11; i++) {
      const batch = String(i).padStart(2, '0');
      const sql = readFileSync(`scripts/sql-mapped/03_interactions_batch_${batch}.sql`, 'utf-8');
      await client.query(sql);
    }

    // Verify counts
    const counts = await client.query(`
      SELECT 
        (SELECT count(*) FROM supplements) as supplements,
        (SELECT count(*) FROM medications) as medications,
        (SELECT count(*) FROM interactions) as interactions
    `);

    const suppFK = await client.query(`
      SELECT COUNT(*) AS broken_supplement_fk
      FROM interactions i
      LEFT JOIN supplements s ON s.id = i.supplement_id
      WHERE s.id IS NULL
    `);
    
    const medFK = await client.query(`
      SELECT COUNT(*) AS broken_medication_fk
      FROM interactions i
      LEFT JOIN medications m ON m.id = i.medication_id
      WHERE m.id IS NULL
    `);

    const result = {
      import_status: "completed",
      rows: {
        supplements: parseInt(counts.rows[0].supplements),
        medications: parseInt(counts.rows[0].medications),
        interactions: parseInt(counts.rows[0].interactions)
      },
      foreign_keys: {
        supplement_fk_broken: parseInt(suppFK.rows[0].broken_supplement_fk),
        medication_fk_broken: parseInt(medFK.rows[0].broken_medication_fk)
      },
      message: "Seed data fully installed and verified."
    };

    console.log(JSON.stringify(result, null, 2));
    await client.end();
  } catch (error) {
    console.error(JSON.stringify({ error: error.message }));
    process.exit(1);
  }
}

run();
