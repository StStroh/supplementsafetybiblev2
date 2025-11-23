import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      const value = values[index];
      if (value !== undefined && value !== '') {
        if (!isNaN(value) && value !== '') {
          row[header] = Number(value);
        } else {
          row[header] = value;
        }
      }
    });
    rows.push(row);
  }

  return rows;
}

function generateSupplementsSQL(rows) {
  const batches = [];
  const batchSize = 250;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    const values = batch.map(row => {
      const name = row.name.replace(/'/g, "''");
      const category = row.category.replace(/'/g, "''");
      return `('${name}', '${category}', '', '')`;
    }).join(',\n  ');

    const sql = `INSERT INTO supplements (name, category, description, common_uses)
VALUES
  ${values}
ON CONFLICT (name) DO NOTHING;`;

    batches.push(sql);
  }

  return batches;
}

function generateMedicationsSQL(rows) {
  const batches = [];
  const batchSize = 250;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    const values = batch.map(row => {
      const name = row.name.replace(/'/g, "''");
      const category = (row.class || row.category || '').replace(/'/g, "''");
      return `('${name}', '${category}', '')`;
    }).join(',\n  ');

    const sql = `INSERT INTO medications (name, category, description)
VALUES
  ${values}
ON CONFLICT (name) DO NOTHING;`;

    batches.push(sql);
  }

  return batches;
}

function generateInteractionsSQL(rows) {
  // First, we need to create a mapping of supplement/medication IDs
  const setupSQL = `
-- Create temporary mapping tables for IDs
CREATE TEMP TABLE IF NOT EXISTS temp_supplement_map AS
SELECT name, id FROM supplements;

CREATE TEMP TABLE IF NOT EXISTS temp_medication_map AS
SELECT name, id FROM medications;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_temp_supp_name ON temp_supplement_map(name);
CREATE INDEX IF NOT EXISTS idx_temp_med_name ON temp_medication_map(name);
`;

  const batches = [setupSQL];
  const batchSize = 250;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    const values = batch.map(row => {
      const severity = (row.severity || 'moderate').toLowerCase();
      const mechanism = (row.mechanism || '').replace(/'/g, "''");
      const evidence = (row.evidence || '').replace(/'/g, "''");
      const notes = (row.notes || '').replace(/'/g, "''");

      // Combine mechanism, evidence, and notes into description
      const description = `${mechanism}${evidence ? ' (Evidence: ' + evidence + ')' : ''}`;
      const recommendation = notes;

      return `(
        (SELECT id FROM temp_supplement_map WHERE name = 'Supplement ${row.supplement_id}'),
        (SELECT id FROM temp_medication_map WHERE name = 'Medication ${row.medication_id}'),
        '${severity}',
        '${description}',
        '${recommendation}'
      )`;
    }).join(',\n  ');

    const sql = `INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
SELECT * FROM (VALUES
  ${values}
) AS v(supplement_id, medication_id, severity, description, recommendation)
WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;`;

    batches.push(sql);
  }

  return batches;
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║           GENERATE SQL FOR MANUAL IMPORT                       ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');

  const seedDir = path.join(__dirname, '..', 'supabase', 'seed');
  const outputDir = path.join(__dirname, '..', 'scripts', 'sql-mapped');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Process supplements
  console.log('\n📝 Processing supplements...');
  const suppPath = path.join(seedDir, 'supplements_1000.csv');
  const suppContent = fs.readFileSync(suppPath, 'utf-8');
  const suppRows = parseCSV(suppContent);
  const suppBatches = generateSupplementsSQL(suppRows);

  suppBatches.forEach((sql, i) => {
    const outputFile = path.join(outputDir, `01_supplements_batch_${i + 1}.sql`);
    fs.writeFileSync(outputFile, sql);
    console.log(`   ✅ Wrote: ${outputFile}`);
  });

  // Process medications
  console.log('\n📝 Processing medications...');
  const medPath = path.join(seedDir, 'medications_150.csv');
  const medContent = fs.readFileSync(medPath, 'utf-8');
  const medRows = parseCSV(medContent);
  const medBatches = generateMedicationsSQL(medRows);

  medBatches.forEach((sql, i) => {
    const outputFile = path.join(outputDir, `02_medications_batch_${i + 1}.sql`);
    fs.writeFileSync(outputFile, sql);
    console.log(`   ✅ Wrote: ${outputFile}`);
  });

  // Process interactions
  console.log('\n📝 Processing interactions...');
  const intPath = path.join(seedDir, 'interactions_2500.csv');
  const intContent = fs.readFileSync(intPath, 'utf-8');
  const intRows = parseCSV(intContent);
  const intBatches = generateInteractionsSQL(intRows);

  intBatches.forEach((sql, i) => {
    const outputFile = path.join(outputDir, `03_interactions_batch_${String(i + 1).padStart(2, '0')}.sql`);
    fs.writeFileSync(outputFile, sql);
    console.log(`   ✅ Wrote: ${outputFile}`);
  });

  // Create a verification script
  const verifySQL = `-- Verification queries
SELECT 'supplements' as table_name, COUNT(*) as count FROM supplements
UNION ALL
SELECT 'medications' as table_name, COUNT(*) as count FROM medications
UNION ALL
SELECT 'interactions' as table_name, COUNT(*) as count FROM interactions;`;

  const verifyFile = path.join(outputDir, '99_verify_counts.sql');
  fs.writeFileSync(verifyFile, verifySQL);
  console.log(`\n   ✅ Wrote verification script: ${verifyFile}`);

  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                     SQL FILES GENERATED                        ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log(`\nOutput directory: ${outputDir}`);
  console.log('\nTo import, run these SQL files in order using the Supabase SQL editor.');
  console.log('');
}

main().catch(console.error);
