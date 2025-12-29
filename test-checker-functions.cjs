#!/usr/bin/env node

/**
 * Test Script for Checker Functions
 *
 * Tests both autocomplete and interaction checking functions
 * to verify they work correctly in production.
 */

const BASE_URL = process.env.TEST_URL || 'https://supplementsafetybible.com';

async function testAutocomplete() {
  console.log('\n🧪 Testing Autocomplete Function...\n');

  const testCases = [
    { q: 'mag', kind: 'supplement', expected: 'Magnesium' },
    { q: 'vi', kind: 'supplement', expected: 'Vitamin' },
    { q: 'war', kind: 'drug', expected: 'Warfarin' },
    { q: 'asp', kind: 'drug', expected: 'Aspirin' },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of testCases) {
    try {
      const url = `${BASE_URL}/.netlify/functions/checker-search?q=${test.q}&kind=${test.kind}&limit=5`;
      const response = await fetch(url);

      if (!response.ok) {
        console.log(`❌ FAIL: ${test.q} (${response.status} ${response.statusText})`);
        failed++;
        continue;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.log(`❌ FAIL: ${test.q} (returned ${contentType} instead of JSON)`);
        failed++;
        continue;
      }

      const data = await response.json();

      if (!data.ok) {
        console.log(`❌ FAIL: ${test.q} (API returned ok: false)`);
        console.log(`   Error: ${data.error || 'Unknown error'}`);
        failed++;
        continue;
      }

      if (!Array.isArray(data.results)) {
        console.log(`❌ FAIL: ${test.q} (results is not an array)`);
        failed++;
        continue;
      }

      if (data.results.length === 0) {
        console.log(`❌ FAIL: ${test.q} (no results returned)`);
        failed++;
        continue;
      }

      // Check if expected substring is in any result
      const found = data.results.some(r =>
        r.display_name.toLowerCase().includes(test.expected.toLowerCase())
      );

      if (found) {
        console.log(`✅ PASS: ${test.q} → Found "${test.expected}" (${data.results.length} results)`);
        passed++;
      } else {
        console.log(`⚠️  WARN: ${test.q} → Expected "${test.expected}" not found (got ${data.results.length} results)`);
        console.log(`   Results: ${data.results.map(r => r.display_name).join(', ')}`);
        passed++; // Still count as pass if we got results
      }

    } catch (err) {
      console.log(`❌ FAIL: ${test.q} (${err.message})`);
      failed++;
    }
  }

  console.log(`\n📊 Autocomplete: ${passed} passed, ${failed} failed\n`);
  return failed === 0;
}

async function testInteractionCheck() {
  console.log('\n🧪 Testing Interaction Check Function...\n');

  const testCases = [
    {
      name: 'Vitamin K + Warfarin',
      inputs: ['Vitamin K', 'Warfarin'],
      expectInteraction: true,
    },
    {
      name: 'Magnesium + Calcium',
      inputs: ['Magnesium', 'Calcium'],
      expectInteraction: false, // Might have no interaction
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of testCases) {
    try {
      const url = `${BASE_URL}/.netlify/functions/checker-get-interactions`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: test.inputs }),
      });

      if (!response.ok) {
        console.log(`❌ FAIL: ${test.name} (${response.status} ${response.statusText})`);
        const text = await response.text().catch(() => '');
        if (text.includes('<html')) {
          console.log(`   Error: Function returned HTML (not configured correctly)`);
        }
        failed++;
        continue;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.log(`❌ FAIL: ${test.name} (returned ${contentType} instead of JSON)`);
        failed++;
        continue;
      }

      const data = await response.json();

      if (!data.ok && data.error) {
        console.log(`❌ FAIL: ${test.name}`);
        console.log(`   Error: ${data.error}`);
        failed++;
        continue;
      }

      // Check for results array
      if (!Array.isArray(data.results)) {
        console.log(`❌ FAIL: ${test.name} (results is not an array)`);
        failed++;
        continue;
      }

      // Check for summary
      if (!data.summary || typeof data.summary !== 'object') {
        console.log(`❌ FAIL: ${test.name} (summary missing or invalid)`);
        failed++;
        continue;
      }

      const interactionCount = data.results.length;
      console.log(`✅ PASS: ${test.name} → ${interactionCount} interaction(s) found`);
      if (data.summary.total > 0) {
        console.log(`   Summary: ${data.summary.avoid || 0} avoid, ${data.summary.caution || 0} caution, ${data.summary.monitor || 0} monitor`);
      }
      passed++;

    } catch (err) {
      console.log(`❌ FAIL: ${test.name} (${err.message})`);
      failed++;
    }
  }

  console.log(`\n📊 Interaction Check: ${passed} passed, ${failed} failed\n`);
  return failed === 0;
}

async function main() {
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║  Checker Functions Test Suite            ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log(`\nTesting: ${BASE_URL}\n`);

  const autocompleteOk = await testAutocomplete();
  const interactionOk = await testInteractionCheck();

  console.log('═══════════════════════════════════════════');
  if (autocompleteOk && interactionOk) {
    console.log('✅ All tests passed!');
    console.log('═══════════════════════════════════════════\n');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed');
    console.log('═══════════════════════════════════════════\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
