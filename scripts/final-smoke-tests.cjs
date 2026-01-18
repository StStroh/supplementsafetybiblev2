const fs = require('fs');
const path = require('path');

console.log('🧪 Running Final Smoke Tests...\\n');

const tests = [];
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    const result = fn();
    if (result === true || result === undefined) {
      console.log(`✅ PASS: ${name}`);
      passed++;
      return true;
    } else {
      console.log(`✗ FAIL: ${name} - ${result}`);
      failed++;
      return false;
    }
  } catch (err) {
    console.log(`✗ FAIL: ${name} - ${err.message}`);
    failed++;
    return false;
  }
}

// 1. Migration File Exists
test('Migration file exists', () => {
  const migrationFiles = fs.readdirSync('supabase/migrations');
  return migrationFiles.some(f => f.includes('interactions'));
});

// 2. CSV Data Exists
test('CSV data file exists', () => {
  return fs.existsSync('artifacts/interactions_full.csv');
});

test('CSV has 2500+ rows', () => {
  const content = fs.readFileSync('artifacts/interactions_full.csv', 'utf-8');
  const lines = content.trim().split('\n');
  return lines.length >= 2500 ? true : `Only ${lines.length} rows`;
});

// 3. Netlify Functions Exist
test('import-interactions function exists', () => {
  return fs.existsSync('netlify/functions/import-interactions.cjs');
});

test('search-interactions function exists', () => {
  return fs.existsSync('netlify/functions/search-interactions.cjs');
});

test('admin-stats function exists', () => {
  return fs.existsSync('netlify/functions/admin-stats.cjs');
});

// 4. Check Function Implementations
test('import-interactions handles POST only', () => {
  const content = fs.readFileSync('netlify/functions/import-interactions.cjs', 'utf-8');
  return content.includes('POST') && content.includes('405');
});

test('search-interactions handles GET only', () => {
  const content = fs.readFileSync('netlify/functions/search-interactions.cjs', 'utf-8');
  return content.includes('GET') && content.includes('405');
});

test('admin-stats requires x-admin-key header', () => {
  const content = fs.readFileSync('netlify/functions/admin-stats.cjs', 'utf-8');
  return content.includes('x-admin-key') && content.includes('401');
});

// 5. Search Page Exists and Has Gating
test('Search page exists', () => {
  return fs.existsSync('src/pages/Search.tsx');
});

test('Search page has premium gating', () => {
  const content = fs.readFileSync('src/pages/Search.tsx', 'utf-8');
  return content.includes('useIsPremium') && content.includes('FREE_SEARCH_LIMIT');
});

test('Search page has debounced search', () => {
  const content = fs.readFileSync('src/pages/Search.tsx', 'utf-8');
  return content.includes('debounceTimer') && content.includes('500');
});

test('Search page calls search-interactions endpoint', () => {
  const content = fs.readFileSync('src/pages/Search.tsx', 'utf-8');
  return content.includes('search-interactions');
});

// 6. Admin Page Enhancements
test('Admin page exists', () => {
  return fs.existsSync('src/pages/Admin.tsx');
});

test('Admin page has import controls', () => {
  const content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');
  return content.includes('runImport') && content.includes('import-interactions');
});

test('Admin page shows stats', () => {
  const content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');
  return content.includes('loadStats') && content.includes('admin-stats');
});

// 7. UI Components
test('SeverityBadge component exists', () => {
  return fs.existsSync('src/components/check/SeverityBadge.tsx');
});

// 8. Import scripts ready
test('Batch import script exists', () => {
  return fs.existsSync('scripts/batch-import-via-supabase.cjs');
});

// 9. Package.json has required dependencies
test('@supabase/supabase-js installed', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  return pkg.dependencies['@supabase/supabase-js'] !== undefined;
});

// 10. Routes include /search
test('App routes include /search', () => {
  const content = fs.readFileSync('src/routes.tsx', 'utf-8');
  return content.includes('/search') || content.includes('Search');
});

// 11. Import guide exists
test('Import guide documentation exists', () => {
  return fs.existsSync('IMPORT_GUIDE.md');
});

console.log('\\n' + '='.repeat(60));
console.log('SMOKE TEST RESULTS');
console.log('='.repeat(60));
console.log(`Total: ${passed + failed}`);
console.log(`✅ Passed: ${passed}`);
console.log(`✗ Failed: ${failed}`);
console.log('='.repeat(60));

if (failed === 0) {
  console.log('\\n✅ ALL TESTS PASSED\\n');
  process.exit(0);
} else {
  console.log(`\\n✗ ${failed} TEST(S) FAILED\\n`);
  process.exit(1);
}
