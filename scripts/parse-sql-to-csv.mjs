import fs from 'fs';

const sql = fs.readFileSync('artifacts/all_interactions_import.sql', 'utf8');

// Extract VALUES block
const valuesMatch = sql.match(/VALUES\s*([\s\S]*)\) AS v\(/i);
if (!valuesMatch) {
  console.error('Could not parse VALUES block');
  process.exit(1);
}

const valuesBlock = valuesMatch[1].trim();

// Split into individual tuples - each starts with "(\n" and ends with ")"
const tupleRegex = /\(\s*\(\s*SELECT[^)]+\)[^)]*\)/gs;
const tuples = valuesBlock.match(tupleRegex);

if (!tuples) {
  console.error('No tuples found');
  process.exit(1);
}

console.log(`Found ${tuples.length} tuples`);

// Parse each tuple
const rows = [];
for (const tuple of tuples) {
  // Extract the SELECT statements and literal values
  // Pattern: (SELECT id FROM temp_supplement_map WHERE name = 'Supplement XXX')
  const suppMatch = tuple.match(/temp_supplement_map WHERE name = '([^']+)'/);
  const medMatch = tuple.match(/temp_medication_map WHERE name = '([^']+)'/);

  // Extract literal string values (severity, description, recommendation)
  const literals = tuple.match(/'([^']+)'/g);

  if (!suppMatch || !medMatch || !literals || literals.length < 3) {
    console.warn('Skipping malformed tuple');
    continue;
  }

  const suppName = suppMatch[1];
  const medName = medMatch[1];

  // Remove quotes from literals
  const cleanLiterals = literals.map(lit => lit.slice(1, -1));

  // Find severity, description (mechanism + evidence), recommendation
  // Typical pattern: 'high', 'Absorption reduction (Evidence: C)', 'Auto-generated interaction'
  const severity = cleanLiterals.find(v => ['low', 'moderate', 'high', 'severe'].includes(v)) || '';
  const description = cleanLiterals.find(v => v.includes('Evidence:')) || '';
  const recommendation = cleanLiterals.find(v => v.includes('Auto-generated') || v.includes('Monitor') || v.includes('Consult')) || '';

  // Extract mechanism and evidence from description
  let mechanism = '';
  let evidence = '';
  if (description) {
    const parts = description.match(/^(.+?)\s*\(Evidence:\s*([A-C])\)$/);
    if (parts) {
      mechanism = parts[1].trim();
      evidence = parts[2];
    }
  }

  rows.push({
    supplement_name: suppName,
    medication_name: medName,
    severity,
    mechanism,
    evidence,
    recommendation
  });
}

console.log(`Parsed ${rows.length} valid interaction rows`);

// Write CSV
const csvHeader = 'supplement_name,medication_name,severity,mechanism,evidence,recommendation\n';
const csvRows = rows.map(row => {
  const escape = (val) => {
    if (!val) return '';
    // Escape quotes and wrap in quotes if contains comma or newline
    if (val.includes(',') || val.includes('\n') || val.includes('"')) {
      return '"' + val.replace(/"/g, '""') + '"';
    }
    return val;
  };

  return [
    escape(row.supplement_name),
    escape(row.medication_name),
    escape(row.severity),
    escape(row.mechanism),
    escape(row.evidence),
    escape(row.recommendation)
  ].join(',');
}).join('\n');

const csvContent = csvHeader + csvRows;

fs.writeFileSync('artifacts/interactions_stage.csv', csvContent, 'utf8');

console.log(`✓ Wrote ${rows.length} rows to artifacts/interactions_stage.csv`);
console.log(`  File size: ${(csvContent.length / 1024).toFixed(1)}KB`);
