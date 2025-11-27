import fs from 'fs';

const sql = fs.readFileSync('artifacts/all_interactions_import.sql', 'utf8');

// Extract VALUES block
const valuesMatch = sql.match(/VALUES\s*([\s\S]*)\) AS v\(/i);
if (!valuesMatch) {
  console.error('Could not parse VALUES block');
  process.exit(1);
}

const valuesBlock = valuesMatch[1].trim();

// Split by tuples - each tuple ends with "),\n  (" or just ")"
const tuples = [];
let currentTuple = '';
let depth = 0;
let inQuote = false;

for (let i = 0; i < valuesBlock.length; i++) {
  const char = valuesBlock[i];
  const prev = valuesBlock[i - 1];

  if (char === "'" && prev !== '\\') {
    inQuote = !inQuote;
  }

  if (!inQuote) {
    if (char === '(') depth++;
    if (char === ')') depth--;
  }

  currentTuple += char;

  // End of a tuple (depth back to 0 and we hit a comma or end)
  if (depth === 0 && currentTuple.trim() && (valuesBlock[i + 1] === ',' || i === valuesBlock.length - 1)) {
    tuples.push(currentTuple.trim());
    currentTuple = '';
    if (valuesBlock[i + 1] === ',') i++; // Skip the comma
  }
}

console.log(`Found ${tuples.length} tuples`);

// Parse each tuple
const rows = [];
for (const tuple of tuples) {
  // Extract names from SELECT statements
  const suppMatch = tuple.match(/temp_supplement_map WHERE name = '([^']+)'/);
  const medMatch = tuple.match(/temp_medication_map WHERE name = '([^']+)'/);

  if (!suppMatch || !medMatch) {
    continue;
  }

  const suppName = suppMatch[1];
  const medName = medMatch[1];

  // Extract all quoted literals after the SELECT statements
  const afterSelects = tuple.substring(tuple.lastIndexOf('),')).match(/'([^'\\\\]*(?:\\\\.[^'\\\\]*)*)'/g);

  if (!afterSelects || afterSelects.length < 3) {
    continue;
  }

  // Clean quotes
  const cleanValues = afterSelects.map(v => v.slice(1, -1).replace(/\\'/g, "'"));

  const severity = cleanValues[0];
  const description = cleanValues[1];
  const recommendation = cleanValues[2];

  // Parse mechanism and evidence from description
  let mechanism = '';
  let evidence = '';
  const evidenceMatch = description.match(/^(.+?)\s*\(Evidence:\s*([A-C])\)$/);
  if (evidenceMatch) {
    mechanism = evidenceMatch[1].trim();
    evidence = evidenceMatch[2];
  } else {
    mechanism = description;
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
    val = String(val);
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
