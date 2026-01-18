#!/usr/bin/env node
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://cyxfxjoadzxhxwxjqkez.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

async function main() {
  console.log('📦 Final Import via Supabase Client\n');

  // Parse CSV
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

  console.log(`Parsed ${rows.length} rows\n`);

  // Get ID maps
  const { data: allSupps } = await supabase.from('supplements').select('id, name');
  const { data: allMeds } = await supabase.from('medications').select('id, name');

  const suppMap = new Map(allSupps.map(s => [s.name, s.id]));
  const medMap = new Map(allMeds.map(m => [m.name, m.id]));

  console.log(`Loaded ${suppMap.size} supplements, ${medMap.size} medications\n`);

  // Insert interactions
  console.log('💾 Inserting interactions...');
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < rows.length; i += 50) {
    const batch = rows.slice(i, i + 50)
      .map(row => {
        const suppId = suppMap.get(row.supplement_name);
        const medId = medMap.get(row.medication_name);
        const severity = (row.severity || 'moderate').toLowerCase();

        if (!suppId || !medId || !['low', 'moderate', 'high', 'severe'].includes(severity)) {
          skipped++;
          return null;
        }

        return {
          supplement_id: suppId,
          medication_id: medId,
          severity,
          description: row.description || 'No description',
          recommendation: row.recommendation || 'Consult healthcare provider'
        };
      })
      .filter(x => x !== null);

    if (batch.length > 0) {
      const { error } = await supabase.from('interactions').insert(batch);
      if (error) {
        console.error(`\n❌ Batch ${Math.floor(i/50)+1} error:`, error.message);
        process.exit(1);
      }
      inserted += batch.length;
      if ((Math.floor(i/50) + 1) % 10 === 0) {
        console.log(`  Inserted ${inserted}/${rows.length}`);
      }
    }
  }

  console.log(`\n✅ Inserted ${inserted} interactions`);
  if (skipped > 0) console.log(`ℹ️  Skipped ${skipped} rows\n`);

  // Verify
  const { count: suppCount } = await supabase.from('supplements').select('*', { count: 'exact', head: true });
  const { count: medCount } = await supabase.from('medications').select('*', { count: 'exact', head: true });
  const { count: intCount } = await supabase.from('interactions').select('*', { count: 'exact', head: true });

  const result = {
    supplements: suppCount || 0,
    medications: medCount || 0,
    interactions: intCount || 0
  };

  console.log(JSON.stringify(result, null, 2));

  const pass = result.supplements >= 100 && result.medications >= 40 && result.interactions >= 2400;
  console.log(pass ? '\n✅ ALL REQUIREMENTS MET\n' : '\n❌ REQUIREMENTS NOT MET\n');

  process.exit(pass ? 0 : 1);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
