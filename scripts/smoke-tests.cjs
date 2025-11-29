#!/usr/bin/env node

/**
 * Comprehensive Smoke Tests for Production Deployment
 */

const results = [];

function test(name, fn) {
  try {
    const result = fn();
    if (result === true || result === undefined) {
      results.push({ name, status: 'PASS' });
      console.log(`✅ PASS: ${name}`);
    } else {
      results.push({ name, status: 'FAIL', reason: result });
      console.log(`❌ FAIL: ${name}: ${result}`);
    }
  } catch (err) {
    results.push({ name, status: 'FAIL', reason: err.message });
    console.log(`❌ FAIL: ${name}: ${err.message}`);
  }
}

console.log('🧪 Running Smoke Tests...\n');

// Test 1: Build artifacts exist
test('Build artifacts exist', () => {
  const fs = require('fs');
  if (!fs.existsSync('dist/index.html')) return 'dist/index.html not found';
  if (!fs.existsSync('dist/assets')) return 'dist/assets not found';
  return true;
});

// Test 2: Core pages exist
test('Landing page exists', () => {
  const fs = require('fs');
  return fs.existsSync('src/pages/Landing.tsx') || 'Landing.tsx not found';
});

test('Pricing page exists', () => {
  const fs = require('fs');
  return fs.existsSync('src/pages/Pricing.tsx') || 'Pricing.tsx not found';
});

test('Premium pages exist', () => {
  const fs = require('fs');
  if (!fs.existsSync('src/pages/Premium.tsx')) return 'Premium.tsx not found';
  if (!fs.existsSync('src/pages/PremiumThanks.tsx')) return 'PremiumThanks.tsx not found';
  if (!fs.existsSync('src/pages/PremiumDashboard.tsx')) return 'PremiumDashboard.tsx not found';
  return true;
});

// Test 3: Stripe functions exist
test('create-checkout-session exists', () => {
  const fs = require('fs');
  return fs.existsSync('netlify/functions/create-checkout-session.cjs') || 'File not found';
});

test('retrieve-session exists', () => {
  const fs = require('fs');
  return fs.existsSync('netlify/functions/retrieve-session.cjs') || 'File not found';
});

test('stripe-webhook exists', () => {
  const fs = require('fs');
  return fs.existsSync('netlify/functions/stripe-webhook.cjs') || 'File not found';
});

// Test 4: Auth utilities exist
test('useAuth hooks exist', () => {
  const fs = require('fs');
  return fs.existsSync('src/lib/useAuth.ts') || 'useAuth.ts not found';
});

// Test 5: Stripe plan map exists
test('Stripe plan map exists', () => {
  const fs = require('fs');
  return fs.existsSync('src/lib/stripe/plan-map.cjs') || 'plan-map.cjs not found';
});

// Test 6: Checkout function returns both sessionId and url
test('create-checkout-session returns sessionId and url', () => {
  const fs = require('fs');
  const content = fs.readFileSync('netlify/functions/create-checkout-session.cjs', 'utf-8');
  if (!content.includes('sessionId:')) return 'Missing sessionId in response';
  if (!content.includes('url:')) return 'Missing url in response';
  return true;
});

// Test 7: Checkout function supports interval parameter
test('create-checkout-session supports interval parameter', () => {
  const fs = require('fs');
  const content = fs.readFileSync('netlify/functions/create-checkout-session.cjs', 'utf-8');
  if (!content.includes('body.interval')) return 'Missing interval parameter support';
  return true;
});

// Test 8: Webhook handles checkout.session.completed
test('Webhook handles checkout.session.completed', () => {
  const fs = require('fs');
  const content = fs.readFileSync('netlify/functions/stripe-webhook.cjs', 'utf-8');
  if (!content.includes('checkout.session.completed')) return 'Missing checkout.session.completed handler';
  if (!content.includes('handleCheckoutCompleted')) return 'Missing handleCheckoutCompleted function';
  return true;
});

// Test 9: Webhook grants premium
test('Webhook grants premium on checkout', () => {
  const fs = require('fs');
  const content = fs.readFileSync('netlify/functions/stripe-webhook.cjs', 'utf-8');
  if (!content.includes('is_premium')) return 'Missing is_premium field';
  if (!content.includes('role')) return 'Missing role field';
  return true;
});

// Test 10: Pricing page calls checkout
test('Pricing page calls create-checkout-session', () => {
  const fs = require('fs');
  const content = fs.readFileSync('src/pages/Pricing.tsx', 'utf-8');
  if (!content.includes('create-checkout-session')) return 'Missing checkout call';
  if (!content.includes('interval')) return 'Missing interval parameter';
  return true;
});

// Test 11: Routing includes all required paths
test('App.tsx includes required routes', () => {
  const fs = require('fs');
  const content = fs.readFileSync('src/App.tsx', 'utf-8');
  if (!content.includes('/premium/thanks')) return 'Missing /premium/thanks route';
  if (!content.includes('/premium')) return 'Missing /premium route';
  if (!content.includes('/pricing')) return 'Missing /pricing route';
  return true;
});

// Test 12: No test mode in plan-map
test('Plan map uses LIVE prices only', () => {
  const fs = require('fs');
  const content = fs.readFileSync('src/lib/stripe/plan-map.cjs', 'utf-8');
  if (content.toLowerCase().includes('price_test_')) return 'Contains test price IDs';
  return true;
});

// Test 13: Prebuild guard exists
test('Prebuild guard exists', () => {
  const fs = require('fs');
  return fs.existsSync('scripts/prebuild-guard.cjs') || 'prebuild-guard.cjs not found';
});

// Test 14: Package.json has prebuild script
test('package.json has prebuild script', () => {
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  if (!pkg.scripts.prebuild) return 'Missing prebuild script';
  if (!pkg.scripts.prebuild.includes('prebuild-guard')) return 'Prebuild script does not run guard';
  return true;
});

// Test 15: Framer Motion installed
test('Framer Motion installed', () => {
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  if (!pkg.dependencies['framer-motion']) return 'Framer Motion not installed';
  return true;
});

console.log('\n' + '='.repeat(60));
console.log('SMOKE TEST RESULTS');
console.log('='.repeat(60));

const passed = results.filter(r => r.status === 'PASS').length;
const failed = results.filter(r => r.status === 'FAIL').length;

console.log(`\nTotal: ${results.length}`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

if (failed > 0) {
  console.log('\nFailed Tests:');
  results.filter(r => r.status === 'FAIL').forEach(r => {
    console.log(`  - ${r.name}: ${r.reason}`);
  });
}

console.log('\n' + '='.repeat(60));
console.log(failed === 0 ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED');
console.log('='.repeat(60) + '\n');

process.exit(failed === 0 ? 0 : 1);
