#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const CSV_PATH = process.argv[2] || "artifacts/interactions_full.csv";

console.log("🧪 INTERACTION IMPORT DRY-RUN\n");
console.log(`Reading: ${CSV_PATH}\n`);

try {
  const csvContent = fs.readFileSync(path.resolve(process.cwd(), CSV_PATH), "utf-8");
  const rows = parseCSV(csvContent);

  console.log(`Total rows parsed: ${rows.length}\n`);

  const validRows = [];
  const quarantined = [];

  for (const row of rows) {
    const validation = validateRow(row);
    if (validation.valid) {
      validRows.push(row);
    } else {
      quarantined.push({ row, reason: validation.reason });
    }
  }

  console.log("═".repeat(60));
  console.log("SUMMARY");
  console.log("═".repeat(60));
  console.log(`✅ Valid rows:       ${validRows.length}`);
  console.log(`❌ Quarantined rows: ${quarantined.length}`);
  console.log(`📊 Success rate:     ${((validRows.length / rows.length) * 100).toFixed(2)}%`);

  console.log("\n" + "═".repeat(60));
  console.log("PREVIEW (First 10 valid rows)");
  console.log("═".repeat(60));

  validRows.slice(0, 10).forEach((row, idx) => {
    console.log(`\n${idx + 1}. ${row.supplement_name} + ${row.medication_name}`);
    console.log(`   Severity: ${row.severity}`);
    console.log(`   Description: ${row.description.substring(0, 60)}...`);
  });

  if (quarantined.length > 0) {
    console.log("\n" + "═".repeat(60));
    console.log("QUARANTINED SAMPLES (First 5)");
    console.log("═".repeat(60));

    quarantined.slice(0, 5).forEach((item, idx) => {
      console.log(`\n${idx + 1}. Reason: ${item.reason}`);
      console.log(`   Row: ${JSON.stringify(item.row).substring(0, 100)}...`);
    });
  }

  console.log("\n" + "═".repeat(60));
  console.log("SEVERITY BREAKDOWN");
  console.log("═".repeat(60));

  const severityCounts = { low: 0, moderate: 0, high: 0, severe: 0 };
  validRows.forEach(row => {
    const sev = row.severity.toLowerCase();
    if (severityCounts[sev] !== undefined) {
      severityCounts[sev]++;
    }
  });

  Object.entries(severityCounts).forEach(([sev, count]) => {
    console.log(`  ${sev.padEnd(10)}: ${count} (${((count / validRows.length) * 100).toFixed(1)}%)`);
  });

  console.log("\n✅ Dry-run complete. No data was written.\n");
} catch (err) {
  console.error("❌ Error:", err.message);
  process.exit(1);
}

function parseCSV(content) {
  const lines = content.split("\n").filter(Boolean);
  if (lines.length < 2) return [];

  const header = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== header.length) continue;

    const row = {};
    header.forEach((key, idx) => {
      row[key] = values[idx];
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function validateRow(row) {
  if (!row.supplement_name || !row.medication_name) {
    return { valid: false, reason: "Missing supplement_name or medication_name" };
  }

  if (!row.severity || !["low", "moderate", "high", "severe"].includes(row.severity.toLowerCase())) {
    return { valid: false, reason: "Invalid or missing severity" };
  }

  if (!row.description || !row.recommendation) {
    return { valid: false, reason: "Missing description or recommendation" };
  }

  return { valid: true };
}
