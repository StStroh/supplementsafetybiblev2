#!/usr/bin/env node

const handler = require('./netlify/functions/grant-free.cjs').handler;

async function test() {
  console.log('🧪 Testing grant-free function...\n');

  console.log('TEST 1: OPTIONS request (CORS preflight)');
  const optionsResult = await handler({ httpMethod: 'OPTIONS', headers: {} });
  console.log('Status:', optionsResult.statusCode);
  console.log('CORS Headers:', optionsResult.headers);
  console.log(optionsResult.statusCode === 200 ? '✅ PASS' : '❌ FAIL');
  console.log('');

  console.log('TEST 2: GET request (should return 200)');
  const getResult = await handler({ httpMethod: 'GET', headers: {}, queryStringParameters: {} });
  console.log('Status:', getResult.statusCode);
  console.log('Body:', getResult.body);
  console.log(getResult.statusCode === 200 ? '✅ PASS' : '❌ FAIL');
  console.log('');

  console.log('TEST 3: GET request with diag=1');
  const getDiagResult = await handler({ httpMethod: 'GET', headers: {}, queryStringParameters: { diag: '1' } });
  console.log('Status:', getDiagResult.statusCode);
  console.log('Body:', getDiagResult.body);
  const diagData = JSON.parse(getDiagResult.body);
  console.log(getDiagResult.statusCode === 200 && diagData.ok ? '✅ PASS' : '❌ FAIL');
  console.log('');

  console.log('TEST 4: POST request without name (should return 400)');
  const postNoNameResult = await handler({
    httpMethod: 'POST',
    headers: {},
    body: JSON.stringify({})
  });
  console.log('Status:', postNoNameResult.statusCode);
  console.log('Body:', postNoNameResult.body);
  console.log(postNoNameResult.statusCode === 400 ? '✅ PASS' : '❌ FAIL');
  console.log('');

  console.log('TEST 5: POST request with name (should return 200)');
  const testName = 'Test User ' + Date.now();
  const postResult = await handler({
    httpMethod: 'POST',
    headers: {},
    body: JSON.stringify({ name: testName })
  });
  console.log('Status:', postResult.statusCode);
  console.log('Body:', postResult.body);

  if (postResult.statusCode === 200) {
    const data = JSON.parse(postResult.body);
    console.log('Profile created:', data.profile);
    console.log('Has activated_at:', !!data.profile?.activated_at);
    console.log('Plan is free:', data.profile?.plan === 'free');
    console.log('Status is active:', data.profile?.status === 'active');
    console.log(data.ok && data.profile ? '✅ PASS' : '❌ FAIL');
  } else {
    console.log('❌ FAIL');
  }
  console.log('');

  console.log('TEST 6: PUT request (should return 405)');
  const putResult = await handler({ httpMethod: 'PUT', headers: {}, body: '{}' });
  console.log('Status:', putResult.statusCode);
  console.log('Body:', putResult.body);
  console.log(putResult.statusCode === 405 ? '✅ PASS' : '❌ FAIL');
  console.log('');

  console.log('🎉 All tests completed!');
}

test().catch(err => {
  console.error('❌ Test failed with error:', err);
  process.exit(1);
});
