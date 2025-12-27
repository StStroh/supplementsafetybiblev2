const fs = require('fs');
const path = require('path');

// Normalize name for ID generation (same as in generate-substances)
function normalizeForId(name) {
  return name
    .toUpperCase()
    .replace(/['']/g, '')
    .replace(/[.,-]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^A-Z0-9_]/g, '');
}

// Generate substance ID (same as in generate-substances)
function generateSubstanceId(name, type) {
  const prefix = type === 'supplement' ? 'S' : 'D';
  const normalized = normalizeForId(name);
  return `${prefix}_${normalized}`;
}

// Parse CSV line
function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());

  return fields;
}

// Read interactions from CSV
function readInteractionsCsv(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  if (lines.length === 0) {
    throw new Error('CSV file is empty');
  }

  const headers = parseCsvLine(lines[0]);
  const interactions = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);
    const interaction = {};

    headers.forEach((header, idx) => {
      interaction[header] = fields[idx] || '';
    });

    interactions.push(interaction);
  }

  return interactions;
}

// Read interactions from JSON
function readInteractionsJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

// Normalize type
function normalizeType(t) {
  if (!t) return 'supplement';
  const lower = t.toLowerCase();
  if (lower.includes('drug') || lower === 'medication' || lower === 'medicine' || lower === 'rx') {
    return 'drug';
  }
  return 'supplement';
}

// Generate interaction ID
function generateInteractionId(aId, bId, index) {
  // Ensure consistent ordering
  const [first, second] = aId < bId ? [aId, bId] : [bId, aId];
  return `INT_${String(index + 1).padStart(3, '0')}`;
}

// Main function
function generateInteractions() {
  console.log('🔄 Interaction Generator - Starting...\n');

  // Check for input files
  const dataDir = path.join(__dirname, '../data');
  const csvPath = path.join(dataDir, 'interactions_raw.csv');
  const jsonPath = path.join(dataDir, 'interactions_raw.json');

  let rawInteractions = [];

  if (fs.existsSync(csvPath)) {
    console.log('📄 Reading interactions from CSV:', csvPath);
    rawInteractions = readInteractionsCsv(csvPath);
  } else if (fs.existsSync(jsonPath)) {
    console.log('📄 Reading interactions from JSON:', jsonPath);
    rawInteractions = readInteractionsJson(jsonPath);
  } else {
    console.error('❌ No input file found!');
    console.error('Expected: data/interactions_raw.csv OR data/interactions_raw.json');
    process.exit(1);
  }

  console.log(`✅ Loaded ${rawInteractions.length} raw interactions\n`);

  // Read substances.csv to get ID mappings
  const substancesPath = path.join(dataDir, 'substances.csv');

  if (!fs.existsSync(substancesPath)) {
    console.error('❌ substances.csv not found!');
    console.error('Run the substance generator first:');
    console.error('   node scripts/generate-substances-from-interactions.cjs');
    process.exit(1);
  }

  console.log('📚 Loading substance ID mappings...');

  const substancesContent = fs.readFileSync(substancesPath, 'utf-8');
  const substancesLines = substancesContent.split('\n').filter(line => line.trim());
  const substancesHeaders = parseCsvLine(substancesLines[0]);

  // Build name -> ID map
  const nameToIdMap = new Map();

  for (let i = 1; i < substancesLines.length; i++) {
    const fields = parseCsvLine(substancesLines[i]);
    const substanceId = fields[0];
    const type = fields[1];
    const displayName = fields[2];

    const key = `${displayName}|${type}`;
    nameToIdMap.set(key, substanceId);
  }

  console.log(`   Loaded ${nameToIdMap.size} substance mappings\n`);

  // Process interactions
  console.log('🔧 Processing interactions...');

  const interactions = [];
  let skippedCount = 0;

  rawInteractions.forEach((raw, idx) => {
    // Extract names and types
    const aName = (raw.a_name || raw.substance_a || '').trim();
    const aType = normalizeType(raw.a_type || raw.type_a || '');

    const bName = (raw.b_name || raw.substance_b || '').trim();
    const bType = normalizeType(raw.b_type || raw.type_b || '');

    if (!aName || !bName) {
      console.warn(`⚠️  Row ${idx + 1}: Missing substance names, skipping`);
      skippedCount++;
      return;
    }

    // Look up IDs
    const aKey = `${aName}|${aType}`;
    const bKey = `${bName}|${bType}`;

    const aId = nameToIdMap.get(aKey);
    const bId = nameToIdMap.get(bKey);

    if (!aId || !bId) {
      console.warn(`⚠️  Row ${idx + 1}: Could not find IDs for "${aName}" (${aType}) or "${bName}" (${bType}), skipping`);
      skippedCount++;
      return;
    }

    // Ensure consistent ordering (smaller ID first)
    const [firstId, secondId] = aId < bId ? [aId, bId] : [bId, aId];

    // Generate interaction
    const interaction = {
      interaction_id: generateInteractionId(aId, bId, idx),
      a_substance_id: firstId,
      b_substance_id: secondId,
      interaction_type: raw.interaction_type || 'pharmacodynamic',
      severity: raw.severity || 'monitor',
      summary_short: raw.summary_short || '',
      mechanism: raw.mechanism || null,
      clinical_effect: raw.clinical_effect || null,
      management: raw.management || null,
      evidence_grade: raw.evidence_grade || null,
      confidence: raw.confidence || null,
      writeup_markdown: raw.writeup_markdown || null,
      citations: []
    };

    interactions.push(interaction);
  });

  console.log(`✅ Generated ${interactions.length} interactions`);
  if (skippedCount > 0) {
    console.log(`⚠️  Skipped ${skippedCount} interactions\n`);
  }

  // Write to seed-interactions.cjs format
  const outputPath = path.join(__dirname, 'seed-interactions-generated.cjs');

  let output = `const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Generated from interactions_raw data
const interactions = [\n`;

  interactions.forEach((int, idx) => {
    const citationsStr = Array.isArray(int.citations) && int.citations.length > 0
      ? JSON.stringify(int.citations)
      : '[]';

    output += `  { `;
    output += `interaction_id: '${int.interaction_id}', `;
    output += `a_substance_id: '${int.a_substance_id}', `;
    output += `b_substance_id: '${int.b_substance_id}', `;
    output += `interaction_type: '${int.interaction_type}', `;
    output += `severity: '${int.severity}', `;
    output += `summary_short: '${int.summary_short.replace(/'/g, "\\'")}', `;

    if (int.mechanism) {
      output += `mechanism: '${int.mechanism.replace(/'/g, "\\'")}', `;
    }
    if (int.clinical_effect) {
      output += `clinical_effect: '${int.clinical_effect.replace(/'/g, "\\'")}', `;
    }
    if (int.management) {
      output += `management: '${int.management.replace(/'/g, "\\'")}', `;
    }
    if (int.evidence_grade) {
      output += `evidence_grade: '${int.evidence_grade}', `;
    }
    if (int.confidence) {
      output += `confidence: '${int.confidence}', `;
    }

    output += `citations: ${citationsStr} }`;

    if (idx < interactions.length - 1) {
      output += ',';
    }
    output += '\n';
  });

  output += `];

async function seed() {
  console.log('Inserting', interactions.length, 'interactions...');

  // Insert in batches of 10
  for (let i = 0; i < interactions.length; i += 10) {
    const batch = interactions.slice(i, i + 10);
    const { error } = await supabase.from('checker_interactions').upsert(batch, { onConflict: 'interaction_id' });
    if (error) {
      console.error('Error inserting interactions batch', i, ':', error.message);
    } else {
      console.log('Inserted interactions', i, '-', Math.min(i + 10, interactions.length));
    }
  }

  // Count interactions
  const { count: intCount } = await supabase.from('checker_interactions').select('*', { count: 'exact', head: true });
  console.log('✅ Total interactions:', intCount);
}

seed().catch(console.error);
`;

  fs.writeFileSync(outputPath, output, 'utf-8');

  console.log(`\n✅ Generated interactions seed file: ${outputPath}`);
  console.log(`   Total interactions: ${interactions.length}`);

  // Show sample
  console.log(`\n📝 Sample interactions:`);
  interactions.slice(0, 3).forEach(int => {
    console.log(`   ${int.interaction_id}: ${int.a_substance_id} + ${int.b_substance_id} (${int.severity})`);
  });

  console.log('\n✅ Done! Run import script next:');
  console.log('   node scripts/seed-interactions-generated.cjs');
}

// Run
try {
  generateInteractions();
} catch (err) {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
  process.exit(1);
}
