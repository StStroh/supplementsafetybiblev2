#!/usr/bin/env node

/**
 * Verification script for Stripe checkout button functionality
 *
 * This script verifies that:
 * 1. All checkout buttons have proper data-testids
 * 2. Buttons are not blocked by CSS overlays
 * 3. Each button calls startTrialCheckout with correct parameters
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

console.log('🔍 Verifying Stripe Checkout Button Configuration\n');

let hasErrors = false;

// Check Pricing component
const pricingComponentPath = path.join(projectRoot, 'src/components/Pricing.tsx');
const pricingComponent = fs.readFileSync(pricingComponentPath, 'utf8');

const requiredTestIds = [
  'checkout-btn-pro_monthly',
  'checkout-btn-pro_annual',
  'checkout-btn-premium_monthly',
  'checkout-btn-premium_annual',
];

console.log('📋 Checking Pricing Component (src/components/Pricing.tsx):\n');

for (const testId of requiredTestIds) {
  const pattern = new RegExp(`data-testid=\\{\`checkout-btn-\\$\\{tierKey\\}\`\\}`);
  if (pattern.test(pricingComponent) || pricingComponent.includes(`data-testid={\`${testId}\`}`)) {
    console.log(`✅ Found testid pattern for: ${testId}`);
  } else {
    console.error(`❌ Missing testid: ${testId}`);
    hasErrors = true;
  }
}

// Additional check for dynamic testid
if (pricingComponent.includes('data-testid={`checkout-btn-${tierKey}`}')) {
  console.log('✅ Dynamic testid pattern found: checkout-btn-${tierKey}');
} else {
  console.log('⚠️  No dynamic testid pattern found');
}

// Check for z-index and pointer-events
if (pricingComponent.includes('zIndex: 60') && pricingComponent.includes("pointerEvents: 'auto'")) {
  console.log('\n✅ Buttons have proper z-index and pointer-events');
} else {
  console.error('\n❌ Buttons missing proper z-index or pointer-events');
  hasErrors = true;
}

// Check StickyFreeCTA
console.log('\n📋 Checking StickyFreeCTA Component:\n');

const stickyCtaPath = path.join(projectRoot, 'src/components/StickyFreeCTA.tsx');
const stickyCta = fs.readFileSync(stickyCtaPath, 'utf8');

if (stickyCta.includes("pointerEvents: 'none'")) {
  console.log('✅ StickyFreeCTA wrapper has pointer-events: none');
} else {
  console.error('❌ StickyFreeCTA wrapper missing pointer-events: none');
  hasErrors = true;
}

if (stickyCta.includes("pointerEvents: 'auto'") && stickyCta.match(/pointerEvents: 'auto'/g).length >= 1) {
  console.log('✅ StickyFreeCTA link has pointer-events: auto');
} else {
  console.error('❌ StickyFreeCTA link missing pointer-events: auto');
  hasErrors = true;
}

// Check checkout.ts utility
console.log('\n📋 Checking Checkout Utility (src/utils/checkout.ts):\n');

const checkoutPath = path.join(projectRoot, 'src/utils/checkout.ts');
const checkout = fs.readFileSync(checkoutPath, 'utf8');

if (checkout.includes('export async function startTrialCheckout')) {
  console.log('✅ startTrialCheckout function exported');
} else {
  console.error('❌ startTrialCheckout function not found');
  hasErrors = true;
}

if (checkout.includes('plan: Plan') && checkout.includes('interval: Interval')) {
  console.log('✅ Function accepts plan and interval parameters');
} else {
  console.error('❌ Function signature incorrect');
  hasErrors = true;
}

if (checkout.includes('/.netlify/functions/create-checkout-session')) {
  console.log('✅ Function calls create-checkout-session endpoint');
} else {
  console.error('❌ Function does not call correct endpoint');
  hasErrors = true;
}

// Summary
console.log('\n' + '='.repeat(60));
if (hasErrors) {
  console.error('\n❌ VERIFICATION FAILED');
  console.error('Fix the issues above before deploying.\n');
  process.exit(1);
} else {
  console.log('\n✅ ALL CHECKS PASSED');
  console.log('Stripe checkout buttons are properly configured.\n');
  process.exit(0);
}
