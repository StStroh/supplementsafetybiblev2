import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !KEY) throw new Error('Missing SUPABASE_URL or KEY env.');

const supabase = createClient(SUPABASE_URL, KEY, { auth: { persistSession: false }});

function normalize(s: string): string {
  return s.toLowerCase().trim()
    .replace(/[()]/g, '')              // remove parentheses
    .replace(/\s+/g, ' ')              // collapse spaces
    .replace(/-/g, ' ')                // hyphens to spaces
    .trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[m][n];
}

// Common supplement name mappings (based on domain knowledge)
const KNOWN_MAPPINGS: Record<string, string> = {
  '5-htp': '5-htp (5-hydroxytryptophan)',
  'alpha lipoic acid': 'alpha-lipoic acid (ala)',
  'ashwagandha': 'ashwagandha (withania somnifera)',
  'biotin': 'biotin (vitamin b7)',
  'caffeine': 'caffeine',
  'chondroitin': 'chondroitin sulfate',
  'chromium': 'chromium',
  'collagen': 'collagen peptides',
  'copper': 'copper',
  'coq10': 'coenzyme q10 (coq10)',
  'creatine monohydrate': 'creatine',
  'curcumin': 'turmeric (curcumin)',
  'echinacea': 'echinacea',
  'fiber': 'fiber',
  'fish oil': 'fish oil (omega-3)',
  'folic acid': 'folate (vitamin b9)',
  'garlic': 'garlic',
  'ginger': 'ginger',
  'ginseng': 'ginseng (panax)',
  'glucosamine': 'glucosamine',
  'green tea extract': 'green tea extract',
  'iodine': 'iodine',
  'l-theanine': 'l-theanine',
  'manganese': 'manganese',
  'melatonin': 'melatonin',
  'molybdenum': 'molybdenum',
  'niacin': 'niacin (vitamin b3)',
  'omega-3': 'fish oil (omega-3)',
  'potassium': 'potassium',
  'prebiotics': 'prebiotics',
  'probiotics': 'probiotics',
  'quercetin': 'quercetin',
  'resveratrol': 'resveratrol',
  'rhodiola': 'rhodiola rosea',
  'riboflavin': 'riboflavin (vitamin b2)',
  'same': 's-adenosyl methionine (same)',
  'selenium': 'selenium',
  'thiamine': 'thiamine (vitamin b1)',
  'turmeric': 'turmeric (curcumin)',
  'valerian root': 'valerian root',
  'vitamin b12': 'vitamin b12 (cobalamin)',
  'vitamin c': 'vitamin c (ascorbic acid)',
  'vitamin e': 'vitamin e (tocopherol)',
  'vitamin k': 'vitamin k',
  'whey protein': 'whey protein',
  'zinc': 'zinc'
};

async function run() {
  console.log('Building auto-mappings...\n');

  // Load missing names
  const missingSuppNames = fs.readFileSync('artifacts/missing_supp_names.txt', 'utf8')
    .split('\n').filter(Boolean);

  // Load canonical names from database (fetch all rows)
  let allSupplements: any[] = [];
  let page = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from('supplements')
      .select('name')
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    allSupplements = allSupplements.concat(data);
    if (data.length < pageSize) break;
    page++;
  }

  const dbSuppsMap = new Map(allSupplements.map(s => [s.name.toLowerCase().trim(), s.name]));
  const dbSupps = Array.from(dbSuppsMap.keys());

  console.log(`Database has ${dbSuppsMap.size} supplements (fetched in ${page + 1} page(s))`);
  console.log('Sample DB keys:', Array.from(dbSuppsMap.keys()).slice(0, 10));

  const autoAccepted: Array<{ synonym_key: string; canonical_key: string; confidence: string }> = [];
  const needsReview: Array<{ synonym_key: string; candidates: string[]; reason: string }> = [];

  let debugCount = 0;
  for (const missing of missingSuppNames) {
    const missingNorm = normalize(missing);

    // Debug first 3
    if (debugCount < 3) {
      console.log(`\n[DEBUG] Processing: "${missing}"`);
      console.log(`  Normalized: "${missingNorm}"`);
      console.log(`  In dbSuppsMap? ${dbSuppsMap.has(missing)}`);
      debugCount++;
    }

    // 1. Check known mappings first
    if (KNOWN_MAPPINGS[missing]) {
      const canonical = KNOWN_MAPPINGS[missing].toLowerCase().trim();
      if (dbSupps.includes(canonical)) {
        autoAccepted.push({
          synonym_key: missing,
          canonical_key: canonical,
          confidence: 'known_mapping'
        });
        continue;
      }
    }

    // 2. Try exact match (case-insensitive)
    const exactMatch = dbSuppsMap.get(missing);
    if (exactMatch) {
      autoAccepted.push({
        synonym_key: missing,
        canonical_key: exactMatch.toLowerCase().trim(),
        confidence: 'exact_match'
      });
      continue;
    }

    // 3. Try exact normalized match
    const exactNormMatch = dbSupps.find(db => normalize(db) === missingNorm);
    if (exactNormMatch) {
      const canonical = dbSuppsMap.get(exactNormMatch)!;
      autoAccepted.push({
        synonym_key: missing,
        canonical_key: canonical.toLowerCase().trim(),
        confidence: 'exact_normalized'
      });
      continue;
    }

    // 4. Try fuzzy matching (Levenshtein distance)
    const candidates = dbSupps
      .map(db => ({
        name: db,
        canonical: dbSuppsMap.get(db)!,
        distance: levenshtein(missingNorm, normalize(db))
      }))
      .filter(c => c.distance <= (missing.length <= 8 ? 2 : 3))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    if (candidates.length === 1 && candidates[0].distance <= 2) {
      autoAccepted.push({
        synonym_key: missing,
        canonical_key: candidates[0].canonical.toLowerCase().trim(),
        confidence: `fuzzy_distance_${candidates[0].distance}`
      });
    } else if (candidates.length > 0) {
      needsReview.push({
        synonym_key: missing,
        candidates: candidates.map(c => `${c.canonical} (dist=${c.distance})`),
        reason: 'multiple_candidates'
      });
    } else {
      needsReview.push({
        synonym_key: missing,
        candidates: [],
        reason: 'no_match_found'
      });
    }
  }

  console.log(`Auto-accepted mappings: ${autoAccepted.length}`);
  console.log(`Needs review: ${needsReview.length}\n`);

  // Write outputs
  fs.writeFileSync(
    'artifacts/auto_accepted.csv',
    'synonym_key,canonical_key,confidence\n' +
    autoAccepted.map(a => `"${a.synonym_key}","${a.canonical_key}","${a.confidence}"`).join('\n')
  );

  fs.writeFileSync(
    'artifacts/needs_review.csv',
    'synonym_key,candidates,reason\n' +
    needsReview.map(n => `"${n.synonym_key}","${n.candidates.join('; ')}","${n.reason}"`).join('\n')
  );

  console.log('Files written:');
  console.log('  - artifacts/auto_accepted.csv');
  console.log('  - artifacts/needs_review.csv\n');

  if (autoAccepted.length > 0) {
    console.log('Sample auto-accepted mappings:');
    autoAccepted.slice(0, 10).forEach(a => {
      console.log(`  ${a.synonym_key} → ${a.canonical_key} (${a.confidence})`);
    });
  }

  if (needsReview.length > 0) {
    console.log('\nNeeds review:');
    needsReview.slice(0, 5).forEach(n => {
      console.log(`  ${n.synonym_key}: ${n.reason}`);
      if (n.candidates.length > 0) {
        console.log(`    Candidates: ${n.candidates.join(', ')}`);
      }
    });
  }

  return { autoAccepted, needsReview };
}

run().catch(e => {
  console.error('❌ Mapping failed:', e.message);
  process.exit(1);
});
