const fetch = require('node-fetch');

const ENDPOINT = process.env.BENCHMARK_URL || 'http://localhost:8888/.netlify/functions/checker-benchmark';

async function testBenchmark() {
  console.log('🎯 Testing Checker Benchmark Endpoint\n');
  console.log(`Endpoint: ${ENDPOINT}\n`);

  const tests = [
    {
      name: 'Minimum inputs (2)',
      payload: {
        inputs: ['omega-3', 'warfarin'],
        runs: 5
      }
    },
    {
      name: 'Small stack (5 items)',
      payload: {
        inputs: ['omega-3', 'warfarin', 'aspirin', 'ibuprofen', 'vitamin-d'],
        runs: 10
      }
    },
    {
      name: 'Default runs',
      payload: {
        inputs: ['omega-3', 'warfarin', 'aspirin']
      }
    },
    {
      name: 'High run count (50 max)',
      payload: {
        inputs: ['omega-3', 'warfarin'],
        runs: 50
      }
    }
  ];

  for (const test of tests) {
    console.log(`\n📊 Test: ${test.name}`);
    console.log(`   Inputs: ${test.payload.inputs.length}, Runs: ${test.payload.runs || 'default (10)'}`);

    try {
      const startTime = Date.now();

      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test.payload)
      });

      const totalTime = Date.now() - startTime;
      const result = await response.json();

      if (!response.ok) {
        console.log(`   ❌ Status: ${response.status}`);
        console.log(`   Error: ${result.error || 'Unknown error'}`);
        continue;
      }

      if (!result.ok) {
        console.log(`   ❌ Failed: ${result.error}`);
        continue;
      }

      console.log(`   ✅ Success!`);
      console.log(`   Total Time: ${totalTime}ms`);
      console.log(`   Runs: ${result.runs}`);
      console.log(`   Stats:`);
      console.log(`      - Min: ${result.stats.min_ms}ms`);
      console.log(`      - P50: ${result.stats.p50_ms}ms`);
      console.log(`      - P95: ${result.stats.p95_ms}ms`);
      console.log(`      - Max: ${result.stats.max_ms}ms`);
      console.log(`      - Avg: ${result.stats.avg_ms}ms`);
      console.log(`   Sample:`);
      console.log(`      - Results: ${result.sample.results_count}`);
      console.log(`      - Total: ${result.sample.summary.total}`);
      console.log(`      - Avoid: ${result.sample.summary.avoid}`);
      console.log(`      - Caution: ${result.sample.summary.caution}`);
      console.log(`      - Monitor: ${result.sample.summary.monitor}`);
      console.log(`      - Info: ${result.sample.summary.info}`);
      console.log(`   Contract OK: ${result.contract_ok ? '✅' : '❌'}`);

    } catch (error) {
      console.log(`   ❌ Exception: ${error.message}`);
    }
  }

  console.log('\n\n🏁 Benchmark tests complete!\n');
}

testBenchmark().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
