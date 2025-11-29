#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cyxfxjoadzxhxwxjqkez.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  console.log('🧪 Running Smoke Tests\n');

  const results = { passed: [], failed: [] };

  // Test 1: Data counts
  console.log('Test 1: Data counts >= requirements');
  try {
    const { count: suppCount } = await supabase.from('supplements').select('*', { count: 'exact', head: true });
    const { count: medCount } = await supabase.from('medications').select('*', { count: 'exact', head: true });
    const { count: intCount } = await supabase.from('interactions').select('*', { count: 'exact', head: true });

    if (suppCount >= 100 && medCount >= 40 && intCount >= 2400) {
      results.passed.push(`Data counts: ${suppCount} supps, ${medCount} meds, ${intCount} ints`);
      console.log(`  ✅ PASS`);
    } else {
      results.failed.push(`Data counts: ${suppCount}/${medCount}/${intCount}`);
      console.log(`  ❌ FAIL`);
    }
  } catch (err) {
    results.failed.push(`Data counts: ${err.message}`);
    console.log(`  ❌ FAIL: ${err.message}`);
  }

  // Test 2: Search - warfarin + ginkgo
  console.log('\nTest 2: Search "warfarin + ginkgo"');
  try {
    const { data: supps } = await supabase.from('supplements').select('id').ilike('name', '%ginkgo%').limit(1);
    const { data: meds } = await supabase.from('medications').select('id').ilike('name', '%warfarin%').limit(1);

    if (supps && supps.length > 0 && meds && meds.length > 0) {
      const { data: ints } = await supabase
        .from('interactions')
        .select('*, supplements:supplement_id(name), medications:medication_id(name)')
        .eq('supplement_id', supps[0].id)
        .eq('medication_id', meds[0].id);

      if (ints && ints.length > 0) {
        results.passed.push(`Warfarin + Ginkgo: ${ints.length} results`);
        console.log(`  ✅ PASS: ${ints.length} results`);
      } else {
        results.failed.push('Warfarin + Ginkgo: no results');
        console.log(`  ❌ FAIL: no results`);
      }
    } else {
      results.failed.push('Warfarin + Ginkgo: name lookup failed');
      console.log(`  ❌ FAIL: name lookup failed`);
    }
  } catch (err) {
    results.failed.push(`Warfarin + Ginkgo: ${err.message}`);
    console.log(`  ❌ FAIL: ${err.message}`);
  }

  // Test 3: Search - sertraline + st john
  console.log('\nTest 3: Search "sertraline + st john"');
  try {
    const { data: supps } = await supabase.from('supplements').select('id').ilike('name', '%st%john%').limit(1);
    const { data: meds } = await supabase.from('medications').select('id').ilike('name', '%sertraline%').limit(1);

    if (supps && supps.length > 0 && meds && meds.length > 0) {
      const { data: ints } = await supabase
        .from('interactions')
        .select('*')
        .eq('supplement_id', supps[0].id)
        .eq('medication_id', meds[0].id);

      if (ints && ints.length > 0) {
        results.passed.push(`Sertraline + St John: ${ints.length} results`);
        console.log(`  ✅ PASS: ${ints.length} results`);
      } else {
        results.failed.push('Sertraline + St John: no results');
        console.log(`  ❌ FAIL: no results`);
      }
    } else {
      results.failed.push('Sertraline + St John: name lookup failed');
      console.log(`  ❌ FAIL: name lookup failed`);
    }
  } catch (err) {
    results.failed.push(`Sertraline + St John: ${err.message}`);
    console.log(`  ❌ FAIL: ${err.message}`);
  }

  // Test 4: Search - ibuprofen + ashwagandha
  console.log('\nTest 4: Search "ibuprofen + ashwagandha"');
  try {
    const { data: supps } = await supabase.from('supplements').select('id').ilike('name', '%ashwagandha%').limit(1);
    const { data: meds } = await supabase.from('medications').select('id').ilike('name', '%ibuprofen%').limit(1);

    if (supps && supps.length > 0 && meds && meds.length > 0) {
      const { data: ints } = await supabase
        .from('interactions')
        .select('*')
        .eq('supplement_id', supps[0].id)
        .eq('medication_id', meds[0].id);

      if (ints && ints.length > 0) {
        results.passed.push(`Ibuprofen + Ashwagandha: ${ints.length} results`);
        console.log(`  ✅ PASS: ${ints.length} results`);
      } else {
        results.failed.push('Ibuprofen + Ashwagandha: no results');
        console.log(`  ❌ FAIL: no results`);
      }
    } else {
      results.failed.push('Ibuprofen + Ashwagandha: name lookup failed');
      console.log(`  ❌ FAIL: name lookup failed`);
    }
  } catch (err) {
    results.failed.push(`Ibuprofen + Ashwagandha: ${err.message}`);
    console.log(`  ❌ FAIL: ${err.message}`);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log('='.repeat(60));

  if (results.failed.length > 0) {
    console.log('\nFailed tests:');
    results.failed.forEach(f => console.log(`  - ${f}`));
    process.exit(1);
  }

  console.log('\n✅ ALL SMOKE TESTS PASSED\n');
}

main().catch(err => {
  console.error('❌ Test suite failed:', err.message);
  process.exit(1);
});
