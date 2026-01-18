const fetch = require('node-fetch');

const ENDPOINT = process.env.BENCHMARK_URL || 'http://localhost:8888/.netlify/functions/checker-benchmark';

async function testBenchmarkErrors() {
  console.log('🧪 Testing Checker Benchmark Error Handling\n');
  console.log(`Endpoint: ${ENDPOINT}\n`);

  const errorTests = [
    {
      name: 'Missing inputs',
      payload: {
        runs: 5
      },
      expectedError: true
    },
    {
      name: 'Empty inputs array',
      payload: {
        inputs: [],
        runs: 5
      },
      expectedError: true
    },
    {
      name: 'Only one input',
      payload: {
        inputs: ['omega-3'],
        runs: 5
      },
      expectedError: true
    },
    {
      name: 'Invalid inputs (not strings)',
      payload: {
        inputs: [123, 456, 789],
        runs: 5
      },
      expectedError: true
    },
    {
      name: 'Runs exceeds max (should cap at 50)',
      payload: {
        inputs: ['omega-3', 'warfarin'],
        runs: 100
      },
      expectedError: false,
      shouldCapRuns: true
    },
    {
      name: 'Negative runs (should default to 1)',
      payload: {
        inputs: ['omega-3', 'warfarin'],
        runs: -5
      },
      expectedError: false,
      shouldCapRuns: true
    }
  ];

  for (const test of errorTests) {
    console.log(`\n📋 Test: ${test.name}`);

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test.payload)
      });

      const result = await response.json();

      if (test.expectedError) {
        if (!result.ok && result.error) {
          console.log(`   ✅ Expected error: "${result.error}"`);
        } else {
          console.log(`   ❌ Should have returned error but got success`);
        }
      } else if (test.shouldCapRuns) {
        if (result.ok) {
          const expectedRuns = test.payload.runs > 50 ? 50 : (test.payload.runs < 1 ? 1 : test.payload.runs);
          if (result.runs === expectedRuns) {
            console.log(`   ✅ Runs correctly capped/adjusted to ${expectedRuns}`);
          } else {
            console.log(`   ❌ Expected runs=${expectedRuns}, got runs=${result.runs}`);
          }
        } else {
          console.log(`   ❌ Unexpected error: ${result.error}`);
        }
      } else {
        if (result.ok) {
          console.log(`   ✅ Success (as expected)`);
        } else {
          console.log(`   ❌ Unexpected error: ${result.error}`);
        }
      }

    } catch (error) {
      console.log(`   ❌ Exception: ${error.message}`);
    }
  }

  console.log('\n\n🏁 Error handling tests complete!\n');
}

testBenchmarkErrors().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
