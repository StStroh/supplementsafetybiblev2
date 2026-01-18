/**
 * Manual Test Suite for Intent Matcher
 *
 * Run this file with: node -r esbuild-register src/lib/intentMatcher.manual-test.ts
 * Or simply execute in a TypeScript-aware environment
 *
 * This can be converted to Jest/Vitest tests when a test framework is added.
 */

import { matchIntent } from './intentMatcher';

interface TestCase {
  name: string;
  input: string;
  expectedIntent: string | null;
  minScore?: number;
}

const testCases: TestCase[] = [
  // MUST MATCH cases
  {
    name: 'Full query with all terms',
    input: 'evening primrose oil seizure risk phenothiazines epilepsy caution',
    expectedIntent: 'epo_seizure_caution',
    minScore: 8,
  },
  {
    name: 'EPO with antipsychotic and seizure threshold',
    input: 'EPO antipsychotic seizure threshold',
    expectedIntent: 'epo_seizure_caution',
    minScore: 8,
  },
  {
    name: 'GLA with epilepsy',
    input: 'GLA epilepsy caution',
    expectedIntent: 'epo_seizure_caution',
    minScore: 8,
  },
  {
    name: 'Primrose oil with convulsions',
    input: 'primrose oil convulsions',
    expectedIntent: 'epo_seizure_caution',
    minScore: 8,
  },
  {
    name: 'Evening primrose with epileptic',
    input: 'evening primrose epileptic seizures',
    expectedIntent: 'epo_seizure_caution',
    minScore: 8,
  },
  {
    name: 'GLA with seizure threshold and phenothiazine',
    input: 'gamma-linolenic acid seizure threshold phenothiazine',
    expectedIntent: 'epo_seizure_caution',
    minScore: 8,
  },
  {
    name: 'EPO with neuroleptic',
    input: 'epo neuroleptic seizure',
    expectedIntent: 'epo_seizure_caution',
    minScore: 8,
  },

  // MUST NOT MATCH cases
  {
    name: 'EPO benefits (no seizure terms)',
    input: 'evening primrose oil benefits skin',
    expectedIntent: null,
  },
  {
    name: 'Epilepsy with different supplement',
    input: 'epilepsy magnesium supplement',
    expectedIntent: null,
  },
  {
    name: 'Phenothiazine side effects (not seizure)',
    input: 'phenothiazine side effects dry mouth',
    expectedIntent: null,
  },
  {
    name: 'Seizure without EPO/GLA',
    input: 'seizure medication',
    expectedIntent: null,
  },
  {
    name: 'EPO dosage (no risk terms)',
    input: 'evening primrose oil dosage',
    expectedIntent: null,
  },
  {
    name: 'GLA benefits (no risk terms)',
    input: 'GLA benefits',
    expectedIntent: null,
  },
  {
    name: 'Unrelated query',
    input: 'vitamin d calcium interaction',
    expectedIntent: null,
  },

  // Edge cases
  {
    name: 'Empty string',
    input: '',
    expectedIntent: null,
  },
  {
    name: 'Case insensitive',
    input: 'EVENING PRIMROSE OIL SEIZURE EPILEPSY',
    expectedIntent: 'epo_seizure_caution',
    minScore: 8,
  },
  {
    name: 'Extra punctuation and spacing',
    input: 'EPO!!!  seizure   threshold???  epilepsy',
    expectedIntent: 'epo_seizure_caution',
    minScore: 8,
  },
];

function runTests() {
  console.log('='.repeat(80));
  console.log('INTENT MATCHER TEST SUITE');
  console.log('='.repeat(80));
  console.log();

  let passed = 0;
  let failed = 0;
  const failures: string[] = [];

  for (const test of testCases) {
    const result = matchIntent(test.input);
    const intentMatches = result.intent === test.expectedIntent;
    const scoreMatches = test.minScore ? result.score >= test.minScore : true;
    const testPassed = intentMatches && scoreMatches;

    if (testPassed) {
      passed++;
      console.log(`✓ ${test.name}`);
      console.log(`  Input: "${test.input}"`);
      console.log(`  Intent: ${result.intent} | Score: ${result.score} | Matched: ${result.matched.length} terms`);
    } else {
      failed++;
      console.log(`✗ ${test.name}`);
      console.log(`  Input: "${test.input}"`);
      console.log(`  Expected: ${test.expectedIntent} (score >= ${test.minScore || 'N/A'})`);
      console.log(`  Got: ${result.intent} (score: ${result.score})`);
      console.log(`  Matched terms: ${result.matched.join(', ') || 'none'}`);
      failures.push(test.name);
    }
    console.log();
  }

  console.log('='.repeat(80));
  console.log(`RESULTS: ${passed} passed, ${failed} failed out of ${testCases.length} tests`);
  console.log('='.repeat(80));

  if (failures.length > 0) {
    console.log('\nFailed tests:');
    failures.forEach(name => console.log(`  - ${name}`));
    process.exit(1);
  } else {
    console.log('\n✓ All tests passed!');
    process.exit(0);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  runTests();
}

export { runTests, testCases };
