#!/usr/bin/env node

// Test search-interactions function locally and remotely
const { handler } = require('./netlify/functions/search-interactions.cjs');

async function testLocalFunction() {
  console.log('🧪 Testing search-interactions function locally...\n');

  // Set env vars for local test
  process.env.SUPABASE_URL = 'https://cyxfxjoadzxhxwxjqkez.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'test-key';

  const tests = [
    { name: 'Missing query param', event: { httpMethod: 'GET', queryStringParameters: {} }, expectedStatus: 400 },
    { name: 'Valid query', event: { httpMethod: 'GET', queryStringParameters: { q: 'warfarin ginkgo' } }, expectedStatus: 200 },
    { name: 'OPTIONS preflight', event: { httpMethod: 'OPTIONS' }, expectedStatus: 200 }
  ];

  for (const test of tests) {
    try {
      const result = await handler(test.event);
      const pass = result.statusCode === test.expectedStatus;
      console.log(`${pass ? '✅' : '❌'} ${test.name}: ${result.statusCode}`);

      if (test.name === 'Valid query' && pass) {
        const body = JSON.parse(result.body);
        console.log(`   Results: ${Array.isArray(body) ? body.length : 'error'} items`);
        if (Array.isArray(body) && body.length > 0) {
          console.log(`   Sample: ${body[0].supplement_name} + ${body[0].medication_name}`);
        }
      }
    } catch (err) {
      console.log(`❌ ${test.name}: ${err.message}`);
    }
  }
}

async function testRemoteFunction(baseUrl) {
  console.log(`\n🌐 Testing remote function at ${baseUrl}...\n`);

  const tests = [
    { name: 'Missing query param', url: '/.netlify/functions/search-interactions', expectedStatus: 400 },
    { name: 'Valid query: warfarin ginkgo', url: '/.netlify/functions/search-interactions?q=warfarin%20ginkgo', expectedStatus: 200 },
    { name: 'Valid query: sertraline st john', url: '/.netlify/functions/search-interactions?q=sertraline%20st%20john', expectedStatus: 200 }
  ];

  for (const test of tests) {
    try {
      const response = await fetch(`${baseUrl}${test.url}`);
      const pass = response.status === test.expectedStatus;
      console.log(`${pass ? '✅' : '❌'} ${test.name}: ${response.status}`);

      if (test.expectedStatus === 200 && pass) {
        const data = await response.json();
        console.log(`   Results: ${Array.isArray(data) ? data.length : 'error'} items`);
        if (Array.isArray(data) && data.length > 0) {
          console.log(`   Sample: ${data[0].supplement_name} + ${data[0].medication_name} (${data[0].severity})`);
        }
      }
    } catch (err) {
      console.log(`❌ ${test.name}: ${err.message}`);
    }
  }
}

async function main() {
  await testLocalFunction();

  const remoteUrl = process.argv[2];
  if (remoteUrl) {
    await testRemoteFunction(remoteUrl);
  } else {
    console.log('\n💡 To test remote function, run:');
    console.log('   node test-search-function.cjs https://your-site.netlify.app');
  }
}

main().catch(console.error);
