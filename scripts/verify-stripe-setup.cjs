const https = require('https');
const http = require('http');

const SITE_URL = process.env.SITE_URL || 'https://supplementsafetybible.com';

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
            json: data ? JSON.parse(data) : null
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
            json: null
          });
        }
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n========================================');
  console.log('STRIPE CHECKOUT VERIFICATION');
  console.log('========================================\n');

  const results = [];

  // Check environment variables
  console.log('1. Checking Environment Variables...\n');
  const envVars = [
    'PRICE_PRO_MONTHLY',
    'PRICE_PRO_ANNUAL',
    'PRICE_PREMIUM_MONTHLY',
    'PRICE_PREMIUM_ANNUAL'
  ];

  const envResults = {};
  for (const varName of envVars) {
    const value = process.env[varName];
    const exists = !!value;
    const valid = exists && value.startsWith('price_');
    envResults[varName] = { exists, valid, value: exists ? (value.substring(0, 10) + '...') : 'NOT SET' };

    console.log(`   ${varName}: ${exists ? (valid ? '✓ PASS' : '✗ FAIL (invalid format)') : '✗ FAIL (not set)'}`);
    if (exists) {
      console.log(`      Value: ${value.substring(0, 15)}...`);
    }
  }

  // Test 1: Function reachable
  console.log('\n2. Testing Function Endpoint...\n');
  try {
    const response = await makeRequest(`${SITE_URL}/.netlify/functions/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tier: 'pro',
        cadence: 'monthly'
      })
    });

    const functionReachable = response.statusCode !== 404;
    const hasUrl = response.json && response.json.url;

    results.push({
      test: 'Function Reachable',
      status: functionReachable ? 'PASS' : 'FAIL',
      details: `Status: ${response.statusCode}`
    });

    results.push({
      test: 'Session URL Present',
      status: hasUrl ? 'PASS' : 'FAIL',
      details: hasUrl ? 'URL returned' : (response.json?.error || 'No URL in response')
    });

    console.log(`   Response Status: ${response.statusCode}`);
    console.log(`   Response Body:`, JSON.stringify(response.json, null, 2));

  } catch (error) {
    results.push({
      test: 'Function Reachable',
      status: 'FAIL',
      details: error.message
    });
    results.push({
      test: 'Session URL Present',
      status: 'FAIL',
      details: 'Could not reach function'
    });
    console.log(`   ✗ Error: ${error.message}`);
  }

  // Test 2: Premium page loads
  console.log('\n3. Testing Premium Page...\n');
  try {
    const response = await makeRequest(`${SITE_URL}/premium`);
    const pageLoads = response.statusCode === 200;

    results.push({
      test: 'Premium Page Loads',
      status: pageLoads ? 'PASS' : 'FAIL',
      details: `Status: ${response.statusCode}`
    });

    console.log(`   Status: ${response.statusCode} - ${pageLoads ? '✓ PASS' : '✗ FAIL'}`);

  } catch (error) {
    results.push({
      test: 'Premium Page Loads',
      status: 'FAIL',
      details: error.message
    });
    console.log(`   ✗ Error: ${error.message}`);
  }

  // Print summary table
  console.log('\n========================================');
  console.log('TEST RESULTS SUMMARY');
  console.log('========================================\n');

  console.log('┌─────────────────────────────┬──────────┬────────────────────────────────┐');
  console.log('│ Test                        │ Status   │ Details                        │');
  console.log('├─────────────────────────────┼──────────┼────────────────────────────────┤');

  results.forEach(result => {
    const test = result.test.padEnd(27);
    const status = result.status.padEnd(8);
    const details = result.details.substring(0, 30).padEnd(30);
    console.log(`│ ${test} │ ${status} │ ${details} │`);
  });

  console.log('└─────────────────────────────┴──────────┴────────────────────────────────┘');

  // Print environment variable summary
  console.log('\n========================================');
  console.log('ENVIRONMENT VARIABLES');
  console.log('========================================\n');

  console.log('┌──────────────────────────────┬────────┬─────────────────────┐');
  console.log('│ Variable                     │ Status │ Value               │');
  console.log('├──────────────────────────────┼────────┼─────────────────────┤');

  for (const [varName, info] of Object.entries(envResults)) {
    const name = varName.padEnd(28);
    const status = (info.valid ? 'PASS' : 'FAIL').padEnd(6);
    const value = info.value.padEnd(19);
    console.log(`│ ${name} │ ${status} │ ${value} │`);
  }

  console.log('└──────────────────────────────┴────────┴─────────────────────┘');

  console.log('\n');
}

runTests().catch(console.error);
