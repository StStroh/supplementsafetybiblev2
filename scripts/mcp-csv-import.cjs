const fs = require('fs');

const csvPath = '/tmp/cc-agent/59885259/project/artifacts/interactions_full.csv';
const outputPath = '/tmp/interactions_upsert_full.sql';

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());

  return values;
}

function escapeSQL(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

function generateUpsertSQL(rows) {
  const sqlStatements = [];

  rows.forEach((row, index) => {
    const [supplement_name, medication_name, severity, description, recommendation] = row;

    if (!supplement_name || !medication_name || !severity) {
      console.error(`Row ${index + 2}: Missing required field - skipping`);
      return;
    }

    const sql = `
INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('${escapeSQL(supplement_name)}')),
  (SELECT id FROM medications WHERE lower(name) = lower('${escapeSQL(medication_name)}')),
  '${escapeSQL(severity)}',
  '${escapeSQL(description)}',
  '${escapeSQL(recommendation)}'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;`;

    sqlStatements.push(sql);
  });

  return sqlStatements.join('\n\n');
}

try {
  const csv = fs.readFileSync(csvPath, 'utf8');
  const lines = csv.trim().split('\n');
  const dataLines = lines.slice(1);

  console.log(`Processing ${dataLines.length} rows...`);

  const rows = dataLines.map(line => parseCSVLine(line));
  const sql = generateUpsertSQL(rows);

  fs.writeFileSync(outputPath, sql);

  console.log(`✅ Generated SQL file: ${outputPath}`);
  console.log(`Total statements: ${rows.length}`);
  console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
