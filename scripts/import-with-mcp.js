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
    const values = lines[i].split(',').map(v => v.trim());
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

  return { headers, rows };
}

function generateInsertSQL(tableName, headers, rows, batchSize = 500) {
  const batches = [];

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    const values = batch.map(row => {
      const vals = headers.map(header => {
        const val = row[header];
        if (val === undefined || val === null) return 'NULL';
        if (typeof val === 'number') return val;
        return `'${val.replace(/'/g, "''")}'`;
      });
      return `(${vals.join(', ')})`;
    }).join(',\n  ');

    const sql = `INSERT INTO ${tableName} (${headers.join(', ')})
VALUES
  ${values}
ON CONFLICT (id) DO UPDATE SET
  ${headers.filter(h => h !== 'id').map(h => `${h} = EXCLUDED.${h}`).join(', ')};`;

    batches.push(sql);
  }

  return batches;
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║               CSV TO SQL CONVERSION                            ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');

  const seedDir = path.join(__dirname, '..', 'supabase', 'seed');
  const outputDir = path.join(__dirname, '..', 'scripts', 'sql-imports');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tables = [
    { name: 'supplements', file: 'supplements_1000.csv' },
    { name: 'medications', file: 'medications_150.csv' },
    { name: 'interactions', file: 'interactions_2500.csv' }
  ];

  for (const table of tables) {
    const csvPath = path.join(seedDir, table.file);
    console.log(`\n📝 Processing ${table.name}...`);

    if (!fs.existsSync(csvPath)) {
      console.error(`   ❌ File not found: ${csvPath}`);
      continue;
    }

    const content = fs.readFileSync(csvPath, 'utf-8');
    const { headers, rows } = parseCSV(content);

    console.log(`   Headers: ${headers.join(', ')}`);
    console.log(`   Rows: ${rows.length}`);

    const batches = generateInsertSQL(table.name, headers, rows);

    console.log(`   Generated ${batches.length} SQL batch(es)`);

    for (let i = 0; i < batches.length; i++) {
      const outputFile = path.join(outputDir, `${table.name}_batch_${i + 1}.sql`);
      fs.writeFileSync(outputFile, batches[i]);
      console.log(`   ✅ Wrote: ${outputFile}`);
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                  SQL FILES GENERATED                           ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  console.log(`Output directory: ${outputDir}\n`);
}

main().catch(console.error);
