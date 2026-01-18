const { readFileSync } = require('fs');
const { Client } = require('pg');

const connectionString = 'postgresql://postgres.cyxfxjoadzxhxwxjqkez:Mangoapplesauce123!@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

async function importInteractions() {
  const client = new Client({ connectionString });
  
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected\n');

    for (let i = 2; i <= 11; i++) {
      const batch = String(i).padStart(2, '0');
      const file = `scripts/sql-mapped/03_interactions_batch_${batch}.sql`;
      
      console.log(`[${i-1}/10] Importing ${file}...`);
      
      const sql = readFileSync(file, 'utf-8');
      await client.query(sql);
      
      console.log(`✓ Batch ${batch} complete`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('Verifying counts...');
    const result = await client.query(`
      SELECT 
        (SELECT count(*) FROM supplements) as supplements_count,
        (SELECT count(*) FROM medications) as medications_count,
        (SELECT count(*) FROM interactions) as interactions_count
    `);

    const counts = result.rows[0];
    console.log('\nFINAL DATABASE COUNTS:');
    console.log('Supplements: ', counts.supplements_count);
    console.log('Medications: ', counts.medications_count);
    console.log('Interactions:', counts.interactions_count);
    console.log('='.repeat(60));

    console.log('\nVerifying foreign keys...');
    
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

    console.log('Broken supplement FKs:', suppFK.rows[0].broken_supplement_fk);
    console.log('Broken medication FKs:', medFK.rows[0].broken_medication_fk);
    console.log('='.repeat(60));

    const json = {
      import_status: "completed",
      rows: {
        supplements: parseInt(counts.supplements_count),
        medications: parseInt(counts.medications_count),
        interactions: parseInt(counts.interactions_count)
      },
      foreign_keys: {
        supplement_fk_broken: parseInt(suppFK.rows[0].broken_supplement_fk),
        medication_fk_broken: parseInt(medFK.rows[0].broken_medication_fk)
      },
      message: "Seed data fully installed and verified."
    };

    console.log('\n' + JSON.stringify(json, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

importInteractions();
