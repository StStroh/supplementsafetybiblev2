const fs = require('fs');
const path = require('path');

// Normalize name for ID generation
function normalizeForId(name) {
  return name
    .toUpperCase()
    .replace(/['']/g, '')  // Remove apostrophes
    .replace(/[.,-]/g, '')  // Remove punctuation
    .replace(/\s+/g, '_')   // Spaces to underscores
    .replace(/[^A-Z0-9_]/g, '');  // Keep only alphanumeric and underscore
}

// Generate substance ID
function generateSubstanceId(name, type) {
  const prefix = type === 'supplement' ? 'S' : 'D';
  const normalized = normalizeForId(name);
  return `${prefix}_${normalized}`;
}

// Generate canonical name (lowercase, normalized spacing)
function generateCanonicalName(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, "'")  // Normalize apostrophes
    .replace(/\s+/g, ' ')   // Collapse spaces
    .trim();
}

// Generate formatting aliases (not medical synonyms)
function generateAliases(displayName) {
  const aliases = new Set();
  const canonical = generateCanonicalName(displayName);

  // Add canonical form
  aliases.add(canonical);

  // Lowercase version
  aliases.add(displayName.toLowerCase());

  // Without punctuation
  const noPunctuation = displayName.replace(/[''.,\-]/g, '');
  if (noPunctuation !== displayName) {
    aliases.add(noPunctuation.toLowerCase());
  }

  // Without apostrophes specifically
  const noApostrophes = displayName.replace(/['']/g, '');
  if (noApostrophes !== displayName) {
    aliases.add(noApostrophes.toLowerCase());
  }

  // Collapsed spaces
  const collapsedSpaces = displayName.replace(/\s+/g, ' ').trim();
  if (collapsedSpaces !== displayName) {
    aliases.add(collapsedSpaces.toLowerCase());
  }

  // Remove the display name itself if it's in there
  aliases.delete(displayName);

  return Array.from(aliases);
}

// Parse CSV line (simple parser, handles quoted fields)
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

  // Parse header
  const headers = parseCsvLine(lines[0]);
  console.log('CSV Headers:', headers);

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

// Main function
function generateSubstances() {
  console.log('🔍 Substance Generator - Starting...\n');

  // Check for input files
  const dataDir = path.join(__dirname, '../data');
  const csvPath = path.join(dataDir, 'interactions_raw.csv');
  const jsonPath = path.join(dataDir, 'interactions_raw.json');

  let interactions = [];

  if (fs.existsSync(csvPath)) {
    console.log('📄 Reading interactions from CSV:', csvPath);
    interactions = readInteractionsCsv(csvPath);
  } else if (fs.existsSync(jsonPath)) {
    console.log('📄 Reading interactions from JSON:', jsonPath);
    interactions = readInteractionsJson(jsonPath);
  } else {
    console.error('❌ No input file found!');
    console.error('Expected: data/interactions_raw.csv OR data/interactions_raw.json');
    process.exit(1);
  }

  console.log(`✅ Loaded ${interactions.length} interactions\n`);

  // Extract unique substances
  const substancesMap = new Map();

  interactions.forEach((interaction, idx) => {
    // Extract substance A
    const aName = (interaction.a_name || interaction.substance_a || '').trim();
    const aType = (interaction.a_type || interaction.type_a || 'supplement').toLowerCase();

    // Extract substance B
    const bName = (interaction.b_name || interaction.substance_b || '').trim();
    const bType = (interaction.b_type || interaction.type_b || 'supplement').toLowerCase();

    if (!aName || !bName) {
      console.warn(`⚠️  Row ${idx + 1}: Missing substance name(s)`);
      return;
    }

    // Normalize types
    const normalizeType = (t) => {
      if (t.includes('drug') || t === 'medication' || t === 'medicine' || t === 'rx') {
        return 'drug';
      }
      return 'supplement';
    };

    const normalizedAType = normalizeType(aType);
    const normalizedBType = normalizeType(bType);

    // Add substance A
    const aKey = `${aName}|${normalizedAType}`;
    if (!substancesMap.has(aKey)) {
      substancesMap.set(aKey, {
        display_name: aName,
        type: normalizedAType
      });
    }

    // Add substance B
    const bKey = `${bName}|${normalizedBType}`;
    if (!substancesMap.has(bKey)) {
      substancesMap.set(bKey, {
        display_name: bName,
        type: normalizedBType
      });
    }
  });

  console.log(`🔬 Extracted ${substancesMap.size} unique substances`);

  // Generate substance records
  const substances = [];

  substancesMap.forEach((sub, key) => {
    const substanceId = generateSubstanceId(sub.display_name, sub.type);
    const canonicalName = generateCanonicalName(sub.display_name);
    const aliases = generateAliases(sub.display_name);

    substances.push({
      substance_id: substanceId,
      type: sub.type,
      display_name: sub.display_name,
      canonical_name: canonicalName,
      aliases: aliases,
      tags: [],
      is_active: true
    });
  });

  // Sort by type then name
  substances.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'drug' ? -1 : 1;  // Drugs first
    }
    return a.display_name.localeCompare(b.display_name);
  });

  console.log(`\n📊 Substance Breakdown:`);
  const drugCount = substances.filter(s => s.type === 'drug').length;
  const suppCount = substances.filter(s => s.type === 'supplement').length;
  console.log(`   Drugs: ${drugCount}`);
  console.log(`   Supplements: ${suppCount}`);

  // Write to CSV
  const outputPath = path.join(dataDir, 'substances.csv');

  const csvLines = [
    'substance_id,type,display_name,canonical_name,aliases_json,tags_json,is_active'
  ];

  substances.forEach(sub => {
    const aliasesJson = JSON.stringify(sub.aliases).replace(/"/g, '""');
    const tagsJson = JSON.stringify(sub.tags).replace(/"/g, '""');

    csvLines.push(
      `${sub.substance_id},${sub.type},"${sub.display_name}","${sub.canonical_name}","${aliasesJson}","${tagsJson}",${sub.is_active}`
    );
  });

  fs.writeFileSync(outputPath, csvLines.join('\n'), 'utf-8');

  console.log(`\n✅ Generated substances.csv: ${outputPath}`);
  console.log(`   Total substances: ${substances.length}`);

  // Show sample
  console.log(`\n📝 Sample substances:`);
  substances.slice(0, 5).forEach(sub => {
    console.log(`   ${sub.substance_id} (${sub.type}): ${sub.display_name}`);
    console.log(`      Aliases: ${sub.aliases.slice(0, 3).join(', ')}${sub.aliases.length > 3 ? '...' : ''}`);
  });

  console.log('\n✅ Done! Run import script next:');
  console.log('   node scripts/import-checker-substances.cjs');
}

// Run
try {
  generateSubstances();
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
