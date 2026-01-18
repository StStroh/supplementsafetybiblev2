#!/usr/bin/env node
const fs = require('fs');

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

function escapeSql(str) {
  return str.replace(/'/g, "''");
}

const csvContent = fs.readFileSync('artifacts/interactions_full.csv', 'utf-8');
const lines = csvContent.trim().split('\n');
const headers = parseCSVLine(lines[0]);

const rows = [];
for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);
  if (values.length === headers.length) {
    const row = {};
    headers.forEach((h, idx) => { row[h] = values[idx] || ''; });
    rows.push(row);
  }
}

const suppNames = new Set();
const medNames = new Set();

rows.forEach(row => {
  if (row.supplement_name) suppNames.add(row.supplement_name);
  if (row.medication_name) medNames.add(row.medication_name);
});

// Generate supplements SQL (batches of 50)
const suppArray = Array.from(suppNames);
const suppBatches = [];
for (let i = 0; i < suppArray.length; i += 50) {
  const batch = suppArray.slice(i, i + 50);
  let sql = 'INSERT INTO supplements (id, name, category) VALUES\n';
  sql += batch.map((name, idx) =>
    `  (${i + idx + 1}, '${escapeSql(name)}', 'General')`
  ).join(',\n');
  sql += '\nON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;';
  suppBatches.push(sql);
}

fs.writeFileSync('import-supps-batches.json', JSON.stringify(suppBatches, null, 2));

// Generate medications SQL (batches of 50)
const medArray = Array.from(medNames);
const medBatches = [];
for (let i = 0; i < medArray.length; i += 50) {
  const batch = medArray.slice(i, i + 50);
  let sql = 'INSERT INTO medications (id, name, drug_class) VALUES\n';
  sql += batch.map((name, idx) =>
    `  (${i + idx + 1}, '${escapeSql(name)}', 'General')`
  ).join(',\n');
  sql += '\nON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;';
  medBatches.push(sql);
}

fs.writeFileSync('import-meds-batches.json', JSON.stringify(medBatches, null, 2));

// Generate name-to-ID mappings
const suppMap = {};
suppArray.forEach((name, idx) => { suppMap[name] = idx + 1; });

const medMap = {};
medArray.forEach((name, idx) => { medMap[name] = idx + 1; });

// Generate interactions SQL (batches of 100)
const intBatches = [];
for (let i = 0; i < rows.length; i += 100) {
  const batch = rows.slice(i, i + 100)
    .map(row => {
      const suppId = suppMap[row.supplement_name];
      const medId = medMap[row.medication_name];
      const severity = (row.severity || 'moderate').toLowerCase();

      if (!suppId || !medId || !['low', 'moderate', 'high', 'severe'].includes(severity)) {
        return null;
      }

      return `  (${suppId}, ${medId}, '${severity}', '${escapeSql(row.description)}', '${escapeSql(row.recommendation)}')`;
    })
    .filter(x => x !== null);

  if (batch.length > 0) {
    let sql = 'INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation) VALUES\n';
    sql += batch.join(',\n') + ';';
    intBatches.push(sql);
  }
}

fs.writeFileSync('import-ints-batches.json', JSON.stringify(intBatches, null, 2));

console.log(`Generated ${suppBatches.length} supplement batches`);
console.log(`Generated ${medBatches.length} medication batches`);
console.log(`Generated ${intBatches.length} interaction batches`);
console.log(`Total: ${suppArray.length} supplements, ${medArray.length} medications, ${rows.length} interactions`);
