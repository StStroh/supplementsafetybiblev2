#!/usr/bin/env node
const fs = require('fs');

// Parse CSV with quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && (i === 0 || line[i-1] !== '\\')) {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result.map(v => v.replace(/^"|"$/g, ''));
}

// Parse full CSV
const csvContent = fs.readFileSync('artifacts/interactions_full.csv', 'utf-8');
const lines = csvContent.trim().split('\n');
const headers = parseCSVLine(lines[0]);

const rows = [];
for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);
  if (values.length === headers.length) {
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });
    rows.push(row);
  }
}

// Collect unique names
const suppNames = new Set();
const medNames = new Set();

rows.forEach(row => {
  if (row.supplement_name) suppNames.add(row.supplement_name);
  if (row.medication_name) medNames.add(row.medication_name);
});

console.log(JSON.stringify({
  total_rows: rows.length,
  unique_supplements: suppNames.size,
  unique_medications: medNames.size,
  supplements: Array.from(suppNames).slice(0, 5),
  medications: Array.from(medNames).slice(0, 5),
  sample_interaction: rows[0]
}, null, 2));
