import fs from 'fs';

const sql = fs.readFileSync('artifacts/all_interactions_import.sql', 'utf8');

const match = sql.match(/VALUES\s*([\s\S]*)\) AS v\(supplement_id/i);
if (!match) {
  console.error('Could not parse SQL');
  process.exit(1);
}

const valuesBlock = match[1].trim();
const tuples = valuesBlock.split(/\),\s*\n\s*\(/);
console.log(`Total tuples: ${tuples.length}`);

const batchSize = Math.ceil(tuples.length / 5);
console.log(`Batch size: ${batchSize}`);

for (let i = 0; i < 5; i++) {
  const start = i * batchSize;
  const end = Math.min((i + 1) * batchSize, tuples.length);
  const batchTuples = tuples.slice(start, end);

  let batchSql = `INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)\nSELECT * FROM (VALUES\n`;

  for (let j = 0; j < batchTuples.length; j++) {
    let tuple = batchTuples[j].trim();
    if (tuple.startsWith('(')) tuple = tuple.substring(1);
    if (tuple.endsWith(')')) tuple = tuple.substring(0, tuple.length - 1);

    batchSql += `  (${tuple})`;
    if (j < batchTuples.length - 1) {
      batchSql += ',\n';
    }
  }

  batchSql += `\n) AS v(supplement_id, medication_id, severity, description, recommendation)\nWHERE v.supplement_id IS NOT NULL AND v.medication_id IS NOT NULL;\n`;

  fs.writeFileSync(`/tmp/interaction_batch_${i + 1}.sql`, batchSql);
  console.log(`✓ Batch ${i + 1}: ${batchTuples.length} tuples (${(batchSql.length / 1024).toFixed(1)}KB)`);
}

console.log('Batches created');
