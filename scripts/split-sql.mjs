import fs from 'fs';

const sql = fs.readFileSync('artifacts/all_interactions_import.sql', 'utf8');

const valuesMatch = sql.match(/VALUES\s*([\s\S]*)\) AS v/i);
if (!valuesMatch) {
  console.error('Could not find VALUES block');
  process.exit(1);
}

const valuesBlock = valuesMatch[1].trim();
const rows = valuesBlock.split(/\),\s*\(/);

console.log(`Found ${rows.length} value tuples`);

const batchSize = 500;
const numBatches = Math.ceil(rows.length / batchSize);

console.log(`Creating ${numBatches} batch files...`);

for (let i = 0; i < numBatches; i++) {
  const start = i * batchSize;
  const end = Math.min((i + 1) * batchSize, rows.length);
  const batchRows = rows.slice(start, end);

  let batchSql = 'INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)\n';
  batchSql += 'SELECT * FROM (VALUES\n';

  for (let j = 0; j < batchRows.length; j++) {
    let row = batchRows[j].trim();
    if (row.startsWith('(')) row = row.substring(1);
    if (row.endsWith(')')) row = row.substring(0, row.length - 1);

    batchSql += '  (' + row + ')';
    if (j < batchRows.length - 1) batchSql += ',\n';
  }

  batchSql += '\n) AS v(supplement_id, medication_id, severity, description, recommendation)\n';
  batchSql += 'WHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;\n';

  fs.writeFileSync(`/tmp/batch_${i + 1}.sql`, batchSql);
  console.log(`✓ Batch ${i + 1}/${numBatches}: ${batchRows.length} rows`);
}

console.log('All batches created');
