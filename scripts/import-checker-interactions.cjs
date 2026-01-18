const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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

// Normalize type
function normalizeType(t) {
  if (!t) return 'supplement';
  const lower = t.toLowerCase();
  if (lower.includes('drug') || lower === 'medication' || lower === 'medicine' || lower === 'rx') {
    return 'drug';
  }
  return 'supplement';
}

// Parse CSV line (handles quoted fields)
function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current);

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

// Determine interaction type based on substance types
function getInteractionType(aType, bType) {
  if (aType === 'supplement' && bType === 'supplement') {
    return 'supplement-supplement';
  } else if ((aType === 'supplement' && bType === 'drug') || (aType === 'drug' && bType === 'supplement')) {
    return 'supplement-drug';
  } else if (aType === 'drug' && bType === 'drug') {
    return 'drug-drug';
  }
  return 'supplement-supplement'; // Default
}

async function importInteractions() {
  console.log('🚀 Interaction Importer - Starting...\n');

  // Check for service role key
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in .env');
    console.error('This script requires service role access to bypass RLS.');
    process.exit(1);
  }

  // Initialize Supabase with service role key
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  console.log('✅ Connected to Supabase with service role\n');

  // Read interactions_raw.csv
  const csvPath = path.join(__dirname, '../data/interactions_raw.csv');

  if (!fs.existsSync(csvPath)) {
    console.error('❌ interactions_raw.csv not found at:', csvPath);
    process.exit(1);
  }

  console.log('📄 Reading interactions_raw.csv...');

  const rawInteractions = readInteractionsCsv(csvPath);
  console.log(`✅ Parsed ${rawInteractions.length} raw interactions\n`);

  // Load existing substances to validate IDs
  console.log('📚 Loading substances from database...');
  const { data: substances, error: substancesError } = await supabase
    .from('checker_substances')
    .select('substance_id, type, display_name');

  if (substancesError) {
    console.error('❌ Failed to load substances:', substancesError.message);
    process.exit(1);
  }

  // Build name->ID map for validation
  const nameToIdMap = new Map();
  substances.forEach(sub => {
    const key = `${sub.display_name}|${sub.type}`;
    nameToIdMap.set(key, sub.substance_id);
  });

  console.log(`   Loaded ${substances.length} substances\n`);

  // Process interactions
  console.log('🔧 Processing interactions...');

  const interactions = [];
  const failedRows = [];
  let interactionCounter = 1;

  for (let idx = 0; idx < rawInteractions.length; idx++) {
    const raw = rawInteractions[idx];

    // Extract names and types
    const aName = (raw.a_name || '').trim();
    const aType = normalizeType(raw.a_type || '');

    const bName = (raw.b_name || '').trim();
    const bType = normalizeType(raw.b_type || '');

    if (!aName || !bName) {
      failedRows.push({
        row: idx + 2,
        reason: 'Missing substance name(s)',
        data: raw
      });
      continue;
    }

    // Generate IDs
    const aId = generateSubstanceId(aName, aType);
    const bId = generateSubstanceId(bName, bType);

    // Validate IDs exist in database
    const aKey = `${aName}|${aType}`;
    const bKey = `${bName}|${bType}`;

    if (!nameToIdMap.has(aKey)) {
      failedRows.push({
        row: idx + 2,
        reason: `Substance not found: "${aName}" (${aType})`,
        data: raw
      });
      continue;
    }

    if (!nameToIdMap.has(bKey)) {
      failedRows.push({
        row: idx + 2,
        reason: `Substance not found: "${bName}" (${bType})`,
        data: raw
      });
      continue;
    }

    // Enforce canonical ordering (smaller ID first)
    const [firstId, secondId] = aId < bId ? [aId, bId] : [bId, aId];
    const [firstName, secondName] = aId < bId ? [aName, bName] : [bName, aName];

    // Determine interaction type
    const interactionType = getInteractionType(aType, bType);

    // Parse citations if present
    let citations = [];
    if (raw.citations_json) {
      try {
        citations = JSON.parse(raw.citations_json);
      } catch (e) {
        // Invalid JSON, leave empty
        citations = [];
      }
    }

    // Build interaction record
    const interaction = {
      interaction_id: `INT_${String(interactionCounter).padStart(4, '0')}`,
      a_substance_id: firstId,
      b_substance_id: secondId,
      interaction_type: interactionType,
      severity: raw.severity || 'monitor',
      summary_short: raw.summary_short || '',
      mechanism: raw.mechanism || null,
      clinical_effect: raw.clinical_effect || null,
      management: raw.management || null,
      evidence_grade: raw.evidence_grade || null,
      confidence: raw.confidence || null,
      writeup_markdown: raw.writeup_markdown || null,
      citations: citations
    };

    interactions.push(interaction);
    interactionCounter++;
  }

  console.log(`✅ Processed ${interactions.length} interactions`);
  if (failedRows.length > 0) {
    console.log(`⚠️  Failed ${failedRows.length} rows\n`);
  } else {
    console.log('');
  }

  // Show breakdown
  const typeBreakdown = {};
  const severityBreakdown = {};

  interactions.forEach(int => {
    typeBreakdown[int.interaction_type] = (typeBreakdown[int.interaction_type] || 0) + 1;
    severityBreakdown[int.severity] = (severityBreakdown[int.severity] || 0) + 1;
  });

  console.log('📊 Interaction Breakdown:');
  console.log('   By Type:');
  Object.keys(typeBreakdown).forEach(type => {
    console.log(`      ${type}: ${typeBreakdown[type]}`);
  });
  console.log('   By Severity:');
  Object.keys(severityBreakdown).forEach(severity => {
    console.log(`      ${severity}: ${severityBreakdown[severity]}`);
  });
  console.log('');

  // Upsert in batches
  console.log('💾 Upserting interactions to database...');

  const batchSize = 10;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < interactions.length; i += batchSize) {
    const batch = interactions.slice(i, i + batchSize);

    const { data, error } = await supabase
      .from('checker_interactions')
      .upsert(batch, {
        onConflict: 'interaction_id',
        ignoreDuplicates: false
      });

    if (error) {
      console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} error:`, error.message);
      errorCount += batch.length;
    } else {
      successCount += batch.length;
      console.log(`   ✓ Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} interactions`);
    }
  }

  console.log('\n📈 Import Summary:');
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Failed Rows: ${failedRows.length}`);

  // List failed rows if any
  if (failedRows.length > 0) {
    console.log('\n❌ Failed Rows Details:');
    failedRows.forEach(fail => {
      console.log(`   Row ${fail.row}: ${fail.reason}`);
      console.log(`      a_name: ${fail.data.a_name}, b_name: ${fail.data.b_name}`);
    });
  }

  // Verify count
  const { count, error: countError } = await supabase
    .from('checker_interactions')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('\n⚠️  Could not verify count:', countError.message);
  } else {
    console.log(`\n   Total in DB: ${count}`);
  }

  if (errorCount === 0 && failedRows.length === 0) {
    console.log('\n✅ All interactions imported successfully!');
    console.log('\nNext steps:');
    console.log('1. Test the checker at /check');
    console.log('2. Run: npm run dev');
  } else {
    console.log('\n⚠️  Some interactions failed. Check errors above.');
  }
}

// Run
importInteractions().catch(err => {
  console.error('❌ Fatal error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
