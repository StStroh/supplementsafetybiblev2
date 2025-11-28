import fs from 'fs';
import { parse } from 'csv-parse';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !KEY) throw new Error('Missing SUPABASE_URL or KEY env.');

const supabase = createClient(SUPABASE_URL, KEY, { auth: { persistSession: false }});

// Robust medication normalizer
function normalizeMed(name: string): string {
  let s = name
    .normalize('NFKC')
    .toLowerCase()
    .trim()
    .replace(/®|™/g, '')
    .replace(/,/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/-{2,}/g, '-')
    .trim();

  // Remove strength/forms
  s = s.replace(/\b\d+\s*(mg|mcg|g|ml|tab|tablet|cap|capsule|oral|solution|inj|injection)\b/gi, '');
  s = s.replace(/\b(er|xr|sr|cr|dr|ec)\b/gi, '');
  s = s.replace(/\s+/g, ' ').trim();

  return s;
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

// Brand-to-generic dictionary (only for common medications)
const BRAND_TO_GENERIC: Record<string, string> = {
  'plavix': 'clopidogrel',
  'lipitor': 'atorvastatin',
  'zocor': 'simvastatin',
  'crestor': 'rosuvastatin',
  'coumadin': 'warfarin',
  'advil': 'ibuprofen',
  'motrin': 'ibuprofen',
  'tylenol': 'acetaminophen',
  'prozac': 'fluoxetine',
  'zoloft': 'sertraline',
  'celexa': 'citalopram',
  'lexapro': 'escitalopram',
  'xanax': 'alprazolam',
  'ativan': 'lorazepam',
  'synthroid': 'levothyroxine',
  'eltroxin': 'levothyroxine',
  'prilosec': 'omeprazole',
  'nexium': 'esomeprazole',
  'cozaar': 'losartan',
  'zestril': 'lisinopril',
  'prinivil': 'lisinopril',
  'norvasc': 'amlodipine'
};

function extractBrandAndGeneric(name: string): { generic?: string; brand?: string } {
  const parenMatch = name.match(/^([^()]+)\(([^)]+)\)$/);
  if (!parenMatch) return {};

  const left = parenMatch[1].trim().toLowerCase();
  const right = parenMatch[2].trim().toLowerCase();

  return { generic: left, brand: right };
}

async function run() {
  console.log('Building medication synonym mappings...\n');

  // Load all canonical medications from database (paginated)
  let allMeds: any[] = [];
  let page = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from('medications')
      .select('name')
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    allMeds = allMeds.concat(data);
    if (data.length < pageSize) break;
    page++;
  }

  const dbMedsMap = new Map(allMeds.map(m => [m.name.toLowerCase().trim(), m.name]));
  const dbMeds = Array.from(dbMedsMap.keys());

  console.log(`Loaded ${dbMeds.length} canonical medications from database\n`);

  // Parse CSV and collect unique medication names that were skipped
  const csvMedNames = new Set<string>();

  const parser = fs.createReadStream('artifacts/interactions_full.csv')
    .pipe(parse({ columns: true, bom: true, trim: true }));

  for await (const row of parser) {
    if (row.medication_name) {
      csvMedNames.add(row.medication_name.toLowerCase().trim());
    }
  }

  // Filter to only medications NOT already in DB
  const missingMeds = Array.from(csvMedNames).filter(m => !dbMeds.includes(m));

  console.log(`CSV contains ${csvMedNames.size} unique medication names`);
  console.log(`Missing from DB: ${missingMeds.length}\n`);

  const autoAccepted: Array<{ synonym_key: string; canonical_key: string; confidence: string }> = [];
  const ambiguous: Array<{ synonym_key: string; candidates: string[]; reason: string }> = [];

  for (const missing of missingMeds) {
    const normalized = normalizeMed(missing);

    // 1. Check brand-to-generic dictionary first
    const brandLookup = BRAND_TO_GENERIC[normalized];
    if (brandLookup && dbMeds.includes(brandLookup)) {
      autoAccepted.push({
        synonym_key: missing,
        canonical_key: brandLookup,
        confidence: 'brand_dictionary'
      });
      continue;
    }

    // 2. Handle parentheses: "Generic (Brand)" or "Brand (Generic)"
    const { generic, brand } = extractBrandAndGeneric(missing);
    if (generic && brand) {
      // Check if either side matches a canonical
      if (dbMeds.includes(generic)) {
        // Map both forms to the generic
        autoAccepted.push({
          synonym_key: missing,
          canonical_key: generic,
          confidence: 'parentheses_generic_left'
        });
        // Also map brand alone to generic
        if (!dbMeds.includes(brand)) {
          autoAccepted.push({
            synonym_key: brand,
            canonical_key: generic,
            confidence: 'parentheses_brand_extracted'
          });
        }
        continue;
      } else if (dbMeds.includes(brand)) {
        // Map both forms to the brand (which is canonical)
        autoAccepted.push({
          synonym_key: missing,
          canonical_key: brand,
          confidence: 'parentheses_brand_right'
        });
        continue;
      }
    }

    // 3. Try exact normalized match
    const exactMatch = dbMeds.find(db => normalizeMed(db) === normalized);
    if (exactMatch) {
      autoAccepted.push({
        synonym_key: missing,
        canonical_key: exactMatch,
        confidence: 'exact_normalized'
      });
      continue;
    }

    // 4. Try fuzzy matching with Levenshtein
    const threshold = normalized.length <= 20 ? 2 : 3;
    const candidates = dbMeds
      .map(db => ({
        name: db,
        canonical: dbMedsMap.get(db)!,
        distance: levenshtein(normalized, normalizeMed(db))
      }))
      .filter(c => c.distance <= threshold)
      .sort((a, b) => a.distance - b.distance);

    if (candidates.length === 1) {
      autoAccepted.push({
        synonym_key: missing,
        canonical_key: candidates[0].name,
        confidence: `fuzzy_distance_${candidates[0].distance}`
      });
    } else if (candidates.length > 1) {
      // Only accept if best is clearly better than second-best
      const [best, secondBest] = candidates;
      if (best.distance + 2 <= secondBest.distance) {
        autoAccepted.push({
          synonym_key: missing,
          canonical_key: best.name,
          confidence: `fuzzy_clear_best_${best.distance}`
        });
      } else {
        ambiguous.push({
          synonym_key: missing,
          candidates: candidates.slice(0, 5).map(c => `${c.canonical} (dist=${c.distance})`),
          reason: 'multiple_candidates'
        });
      }
    } else {
      ambiguous.push({
        synonym_key: missing,
        candidates: [],
        reason: 'no_match_found'
      });
    }
  }

  console.log(`Auto-accepted mappings: ${autoAccepted.length}`);
  console.log(`Ambiguous (needs review): ${ambiguous.length}\n`);

  // Write outputs
  fs.writeFileSync(
    'artifacts/med_synonyms_auto.csv',
    'synonym_key,canonical_key,confidence\n' +
    autoAccepted.map(a => `"${a.synonym_key}","${a.canonical_key}","${a.confidence}"`).join('\n')
  );

  fs.writeFileSync(
    'artifacts/med_synonyms_ambiguous.csv',
    'synonym_key,candidates,reason\n' +
    ambiguous.map(a => `"${a.synonym_key}","${a.candidates.join('; ')}","${a.reason}"`).join('\n')
  );

  console.log('Files written:');
  console.log('  - artifacts/med_synonyms_auto.csv');
  console.log('  - artifacts/med_synonyms_ambiguous.csv\n');

  if (autoAccepted.length > 0) {
    console.log('Sample auto-accepted medication mappings:');
    autoAccepted.slice(0, 15).forEach(a => {
      console.log(`  "${a.synonym_key}" → "${a.canonical_key}" (${a.confidence})`);
    });
  }

  if (ambiguous.length > 0) {
    console.log(`\n⚠️  ${ambiguous.length} ambiguous medication names need review`);
    if (ambiguous.length > 50) {
      console.error('\n❌ STOPPING: >50 ambiguous names require manual review.');
      console.error('Please review artifacts/med_synonyms_ambiguous.csv and resolve manually.');
      process.exit(1);
    } else {
      console.log('Sample ambiguous:');
      ambiguous.slice(0, 10).forEach(a => {
        console.log(`  "${a.synonym_key}": ${a.reason}`);
        if (a.candidates.length > 0) {
          console.log(`    Candidates: ${a.candidates.slice(0, 3).join(', ')}`);
        }
      });
    }
  }

  return { autoAccepted, ambiguous };
}

run().catch(e => {
  console.error('❌ Failed:', e.message);
  process.exit(1);
});
