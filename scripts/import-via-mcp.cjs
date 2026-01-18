const fs = require('fs');

console.log('=== SafetyBible Interactions Import (MCP-based) ===');
console.log('Step 1: Loading and parsing CSV...');

const csv = fs.readFileSync('artifacts/interactions_full.csv', 'utf8');
const rows = csv.trim().split('\n').slice(1);
console.log(`CSV loaded: ${rows.length} rows`);

const parsed = [];
const errors = [];

for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  if (!r.trim()) continue;

  const cols = r.match(/(?:[^,"]|"(?:[^"]|"")*")+/g) || [];
  const clean = cols.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"'));
  const [supName, medName, sev, desc, rec] = clean;

  if (!supName || !medName || !sev) {
    errors.push({row: i+2, reason: 'missing_required_fields'});
    continue;
  }

  if (!['low','moderate','high','severe'].includes(sev.toLowerCase())) {
    errors.push({row: i+2, reason: 'invalid_severity', severity: sev});
    continue;
  }

  parsed.push({
    supplement_name: supName,
    medication_name: medName,
    severity: sev.toLowerCase(),
    description: desc || '',
    recommendation: rec || ''
  });
}

console.log(`Parsed ${parsed.length} valid rows, ${errors.length} errors`);

// Generate SQL batches
console.log('Step 2: Generating SQL INSERT batches...');
const esc = (s) => s.replace(/'/g, "''");

const sqlBatches = [];
for (let b = 0; b < 25; b++) {
  const start = b * 100;
  const batch = parsed.slice(start, start + 100);
  if (batch.length === 0) break;

  const values = batch.map(r =>
    `((SELECT id FROM supplements WHERE lower(name)=lower('${esc(r.supplement_name)}')),` +
    `(SELECT id FROM medications WHERE lower(name)=lower('${esc(r.medication_name)}')),` +
    `'${r.severity}','${esc(r.description)}','${esc(r.recommendation)}')`
  ).join(',\n');

  const sql = `
INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES ${values}
ON CONFLICT (supplement_id, medication_id) DO UPDATE
SET severity = EXCLUDED.severity,
    description = EXCLUDED.description,
    recommendation = EXCLUDED.recommendation;
`;

  const fname = `/tmp/import_batch_${String(b+1).padStart(2,'0')}.sql`;
  fs.writeFileSync(fname, sql, 'utf8');
  sqlBatches.push(fname);
}

console.log(`Generated ${sqlBatches.length} SQL batch files`);
console.log('Execute these files via Supabase MCP execute_sql tool or SQL editor.');

const report = {
  ok: true,
  csv_rows: rows.length,
  valid_rows: parsed.length,
  errors: errors.length,
  sql_batches: sqlBatches.length,
  batch_files: sqlBatches,
  sample_errors: errors.slice(0, 3),
  note: 'Execute batch files via MCP execute_sql tool to complete import'
};

console.log('\n=== IMPORT PREPARATION COMPLETE ===');
console.log(JSON.stringify(report, null, 2));
