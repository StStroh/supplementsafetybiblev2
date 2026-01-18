#!/usr/bin/env node
/**
 * UX FIX VERIFICATION TEST
 * Tests all critical requirements for the interaction checker
 */

const https = require('https');

const TESTS = {
  passed: 0,
  failed: 0,
  results: []
};

function log(emoji, message) {
  console.log(`${emoji} ${message}`);
}

function test(name, passed, details = '') {
  if (passed) {
    TESTS.passed++;
    log('✅', `PASS: ${name}`);
  } else {
    TESTS.failed++;
    log('❌', `FAIL: ${name}`);
    if (details) log('   ', details);
  }
  TESTS.results.push({ name, passed, details });
}

function header(title) {
  console.log('\n' + '='.repeat(60));
  console.log(`  ${title}`);
  console.log('='.repeat(60) + '\n');
}

// Check if files exist and contain required code
const fs = require('fs');

header('🔍 STATIC CODE VERIFICATION');

// Test 1: SubstanceCombobox has correct hint logic
const comboboxCode = fs.readFileSync('./src/components/SubstanceCombobox.tsx', 'utf8');
test(
  'SubstanceCombobox shows helpful hints',
  comboboxCode.includes('checker.selectSuggestion') && comboboxCode.includes('checker.noMatchHint'),
  'Should use new translation keys'
);

test(
  'SubstanceCombobox allows Enter without selection',
  comboboxCode.includes('onNotFound(input.trim(), kind, suggestions)') &&
  !comboboxCode.includes('setError(t(\'checker.selectFromList\'))'),
  'Should trigger onNotFound instead of blocking'
);

// Test 2: StackBuilderChecker has visible button
const checkerCode = fs.readFileSync('./src/components/StackBuilderCheckerV3.tsx', 'utf8');
test(
  'Run Check button always visible',
  checkerCode.includes('disabled:opacity-60') &&
  checkerCode.includes('minWidth:') &&
  !checkerCode.includes('hidden') &&
  !checkerCode.includes('display: none'),
  'Button should use opacity-60 and minWidth'
);

test(
  'Run Check button has clear disabled message',
  checkerCode.includes('!canCheck') &&
  checkerCode.includes('checker.minRequired'),
  'Should show message below button when disabled'
);

// Test 3: i18n has new helpful messages
const i18nCode = fs.readFileSync('./src/lib/i18n.ts', 'utf8');
test(
  'English: Helpful autocomplete hints',
  i18nCode.includes('Select a suggestion or press Enter to continue') &&
  i18nCode.includes('we\'ll try to match it automatically'),
  'Should have new English hints'
);

test(
  'Spanish: Helpful autocomplete hints',
  i18nCode.includes('Seleccione una sugerencia o presione Enter para continuar') &&
  i18nCode.includes('intentaremos encontrarlo automáticamente'),
  'Should have new Spanish hints'
);

test(
  'English: Not Found title changed',
  i18nCode.includes('We\'re looking for') &&
  !i18nCode.includes('We couldn\'t find "{name}" in our database'),
  'Should use positive language'
);

test(
  'Spanish: Not Found title changed',
  i18nCode.includes('Buscando "{name}"') &&
  !i18nCode.includes('No pudimos encontrar "{name}" en nuestra base de datos'),
  'Should use positive language'
);

test(
  'English: Min required uses lock icon',
  i18nCode.includes('🔒 Select at least 1 supplement and 1 medication to check'),
  'Should have clear message with icon'
);

test(
  'Spanish: Min required uses lock icon',
  i18nCode.includes('🔒 Seleccione al menos 1 suplemento y 1 medicamento para verificar'),
  'Should have clear message with icon'
);

// Test 4: checker-search function exists
test(
  'checker-search function exists',
  fs.existsSync('./netlify/functions/checker-search.cjs'),
  'Backend search function must exist'
);

const searchCode = fs.readFileSync('./netlify/functions/checker-search.cjs', 'utf8');
test(
  'checker-search uses RPC function',
  searchCode.includes('checker_search_substances') &&
  searchCode.includes('supabase.rpc'),
  'Should call database RPC for fast search'
);

test(
  'checker-search allows 1 character search',
  searchCode.includes('q.length < 1'),
  'Should allow searches with 1+ characters'
);

// Test 5: Build artifacts exist
test(
  'Build succeeded (dist folder exists)',
  fs.existsSync('./dist') && fs.existsSync('./dist/index.html'),
  'Build output should be present'
);

const distHtml = fs.readFileSync('./dist/index.html', 'utf8');
test(
  'Built HTML contains app root',
  distHtml.includes('id="root"'),
  'React app mount point should exist'
);

header('📊 TEST SUMMARY');

console.log(`Total Tests: ${TESTS.passed + TESTS.failed}`);
console.log(`✅ Passed: ${TESTS.passed}`);
console.log(`❌ Failed: ${TESTS.failed}`);
console.log(`Success Rate: ${((TESTS.passed / (TESTS.passed + TESTS.failed)) * 100).toFixed(1)}%`);

if (TESTS.failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED - READY FOR DEPLOYMENT!\n');
  process.exit(0);
} else {
  console.log('\n⚠️  SOME TESTS FAILED - REVIEW REQUIRED\n');
  process.exit(1);
}
