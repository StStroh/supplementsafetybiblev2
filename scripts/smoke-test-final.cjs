#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

async function runTests() {
  console.log('🧪 Running Smoke Tests...\n');

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const results = {
    passed: [],
    failed: []
  };

  // Test 1: Data counts
  console.log('Test 1: Data counts >= requirements');
  try {
    const { count: suppCount } = await supabase.from('supplements').select('*', { count: 'exact', head: true });
    const { count: medCount } = await supabase.from('medications').select('*', { count: 'exact', head: true });
    const { count: intCount } = await supabase.from('interactions').select('*', { count: 'exact', head: true });

    const pass = suppCount >= 100 && medCount >= 40 && intCount >= 2400;
    if (pass) {
      results.passed.push(`Data counts: ${suppCount} supps, ${medCount} meds, ${intCount} interactions`);
      console.log(`  ✅ PASS (${suppCount}/${medCount}/${intCount})`);
    } else {
      results.failed.push(`Data counts insufficient: ${suppCount}/${medCount}/${intCount}`);
      console.log(`  ❌ FAIL`);
    }
  } catch (err) {
    results.failed.push(`Data counts: ${err.message}`);
    console.log(`  ❌ FAIL: ${err.message}`);
  }

  // Test 2: Search queries
  console.log('\nTest 2: Search queries return results');
  const queries = [
    'warfarin ginkgo',
    'sertraline st john',
    'ibuprofen ashwagandha'
  ];

  for (const query of queries) {
    try {
      const { data, error } = await supabase
        .from('interactions')
        .select(`
          id,
          severity,
          description,
          supplements:supplement_id(name),
          medications:medication_id(name)
        `)
        .or(`supplements.name.ilike.%${query.split(' ')[0]}%,medications.name.ilike.%${query.split(' ')[1]}%`)
        .limit(5);

      if (error) throw error;

      if (data && data.length > 0) {
        results.passed.push(`Query "${query}": ${data.length} results`);
        console.log(`  ✅ "${query}": ${data.length} results`);
      } else {
        results.failed.push(`Query "${query}": no results`);
        console.log(`  ❌ "${query}": no results`);
      }
    } catch (err) {
      results.failed.push(`Query "${query}": ${err.message}`);
      console.log(`  ❌ "${query}": ${err.message}`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log('='.repeat(50));

  if (results.failed.length > 0) {
    console.log('\nFailed tests:');
    results.failed.forEach(f => console.log(`  - ${f}`));
    process.exit(1);
  }

  console.log('\n✅ ALL SMOKE TESTS PASSED\n');
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

runTests().catch(err => {
  console.error('❌ Test suite failed:', err.message);
  process.exit(1);
});
