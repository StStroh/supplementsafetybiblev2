#!/usr/bin/env node

/**
 * Seed Checker Substances and Tokens
 *
 * Populates checker_substances and checker_substance_tokens tables
 * from the substances_2500.csv file.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const BATCH_SIZE = 100;

// Normalize function (matches DB norm_token function)
function normToken(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '');
}

// Generate tokens from a name
function generateTokens(name) {
  const tokens = new Set();
  const normalized = normToken(name);

  // Add full normalized name
  tokens.add(normalized);

  // Add word tokens
  const words = name.toLowerCase().split(/[\s-]+/).filter(Boolean);
  words.forEach(word => {
    const norm = normToken(word);
    if (norm.length >= 2) {
      tokens.add(norm);
    }
  });

  // Add prefix tokens (for autocomplete)
  for (let i = 2; i <= Math.min(normalized.length, 10); i++) {
    tokens.add(normalized.substring(0, i));
  }

  return Array.from(tokens);
}

// Generate substance ID
function generateSubstanceId(name, type) {
  const normalized = normToken(name);
  const typePrefix = type === 'drug' ? 'med' : 'sup';
  return `${typePrefix}_${normalized}`;
}

async function seedDatabase() {
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║  Seed Checker Substances & Tokens         ║');
  console.log('╚═══════════════════════════════════════════╝\n');

  // Validate environment
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  // Read CSV file
  const csvPath = path.join(__dirname, '..', 'data', 'substances_2500.csv');
  console.log('📂 Reading:', csvPath);

  if (!fs.existsSync(csvPath)) {
    console.error('❌ File not found:', csvPath);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').filter(line => line.trim());
  const header = lines[0].split(',');

  console.log('📊 Found', lines.length - 1, 'substances\n');

  // Parse CSV
  const substances = [];
  const allTokens = [];
  const seen = new Set();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [name, type] = line.split(',').map(s => s.trim());
    if (!name || !type) continue;

    const substance_id = generateSubstanceId(name, type);

    // Skip duplicates
    if (seen.has(substance_id)) {
      console.log(`⚠️  Skipping duplicate: ${name} (${type})`);
      continue;
    }
    seen.add(substance_id);

    const canonical_name = normToken(name);
    const display_name = name;
    const substance_type = type === 'supplement' || type === 'drug' ? type : 'supplement';

    substances.push({
      substance_id,
      canonical_name,
      display_name,
      type: substance_type,
      aliases: [],
      is_active: true,
    });

    // Generate tokens
    const tokens = generateTokens(name);
    tokens.forEach(token => {
      allTokens.push({
        substance_id,
        token,
      });
    });
  }

  console.log('✅ Parsed', substances.length, 'unique substances');
  console.log('✅ Generated', allTokens.length, 'tokens\n');

  // Check existing data
  const { count: existingCount } = await supabase
    .from('checker_substances')
    .select('*', { count: 'exact', head: true });

  if (existingCount && existingCount > 0) {
    console.log(`⚠️  Database already has ${existingCount} substances`);
    console.log('⚠️  This will ADD new substances (not replace)');
    console.log('⚠️  Press Ctrl+C to cancel, or wait 3 seconds to continue...\n');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // Insert substances in batches
  console.log('📝 Inserting substances...');
  let insertedSubstances = 0;

  for (let i = 0; i < substances.length; i += BATCH_SIZE) {
    const batch = substances.slice(i, i + BATCH_SIZE);

    const { error } = await supabase
      .from('checker_substances')
      .upsert(batch, { onConflict: 'substance_id' });

    if (error) {
      console.error(`❌ Error inserting batch ${i / BATCH_SIZE + 1}:`, error.message);
      process.exit(1);
    }

    insertedSubstances += batch.length;
    process.stdout.write(`   Inserted ${insertedSubstances}/${substances.length}\r`);
  }

  console.log(`\n✅ Inserted ${insertedSubstances} substances`);

  // Insert tokens in batches
  console.log('\n📝 Inserting tokens...');
  let insertedTokens = 0;

  for (let i = 0; i < allTokens.length; i += BATCH_SIZE) {
    const batch = allTokens.slice(i, i + BATCH_SIZE);

    const { error } = await supabase
      .from('checker_substance_tokens')
      .upsert(batch, { onConflict: 'substance_id,token' });

    if (error) {
      console.error(`❌ Error inserting token batch ${i / BATCH_SIZE + 1}:`, error.message);
      process.exit(1);
    }

    insertedTokens += batch.length;
    process.stdout.write(`   Inserted ${insertedTokens}/${allTokens.length}\r`);
  }

  console.log(`\n✅ Inserted ${insertedTokens} tokens`);

  // Test the search function
  console.log('\n🧪 Testing search function...');

  const testQueries = ['mag', 'vi', 'ash'];
  for (const q of testQueries) {
    const { data, error } = await supabase.rpc('checker_search_substances', {
      q,
      kind: 'any',
      lim: 5,
    });

    if (error) {
      console.log(`❌ Search for "${q}": ${error.message}`);
    } else {
      console.log(`✅ Search for "${q}": ${data?.length || 0} results`);
      if (data && data.length > 0) {
        console.log(`   → ${data.map(r => r.display_name).join(', ')}`);
      }
    }
  }

  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║  ✅ Seeding Complete!                     ║');
  console.log('╚═══════════════════════════════════════════╝\n');
  console.log('Next steps:');
  console.log('1. Test autocomplete: https://your-site.com/check');
  console.log('2. Type "ma" and see suggestions');
  console.log('3. Deploy to production\n');
}

seedDatabase().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
