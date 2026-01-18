#!/usr/bin/env node
/**
 * Production Configuration Verification Script
 * Verifies all required environment variables are set correctly
 * Run before production deployment
 */

const requiredServerVars = [
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
];

const requiredFrontendVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_STRIPE_PUBLISHABLE_KEY',
];

const optionalVars = [
  'SITE_URL',
  'STRIPE_PORTAL_RETURN_URL',
];

console.log('🔍 Production Configuration Verification\n');
console.log('=' .repeat(60));

let hasErrors = false;
let hasWarnings = false;

// Check server-side variables
console.log('\n📦 SERVER-SIDE VARIABLES (Netlify Functions Only)');
console.log('-'.repeat(60));

requiredServerVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ MISSING: ${varName}`);
    hasErrors = true;
  } else {
    const preview = value.substring(0, 8) + '...' + value.slice(-4);
    console.log(`✅ ${varName}: ${preview}`);
  }
});

// Check frontend variables
console.log('\n🌐 FRONTEND VARIABLES (Exposed to Browser)');
console.log('-'.repeat(60));

requiredFrontendVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ MISSING: ${varName}`);
    hasErrors = true;
  } else {
    // Frontend vars can show more (not secrets)
    const preview = value.substring(0, 30) + (value.length > 30 ? '...' : '');
    console.log(`✅ ${varName}: ${preview}`);
  }
});

// Check optional variables
console.log('\n⚙️  OPTIONAL VARIABLES');
console.log('-'.repeat(60));

optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`⚠️  NOT SET: ${varName} (using default)`);
    hasWarnings = true;
  } else {
    console.log(`✅ ${varName}: ${value}`);
  }
});

// Validate Supabase project consistency
console.log('\n🔐 SECURITY VALIDATIONS');
console.log('-'.repeat(60));

const supabaseUrl = process.env.SUPABASE_URL;
const viteSupabaseUrl = process.env.VITE_SUPABASE_URL;

if (supabaseUrl && viteSupabaseUrl) {
  const serverProject = supabaseUrl.split('.')[0].split('//')[1];
  const frontendProject = viteSupabaseUrl.split('.')[0].split('//')[1];

  if (serverProject === frontendProject) {
    console.log(`✅ Supabase projects match: ${serverProject}`);
  } else {
    console.log(`❌ SUPABASE PROJECT MISMATCH!`);
    console.log(`   Server:   ${serverProject}`);
    console.log(`   Frontend: ${frontendProject}`);
    hasErrors = true;
  }
}

// Check Stripe key types
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripePublishable = process.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (stripeSecret) {
  if (stripeSecret.startsWith('sk_live_')) {
    console.log('✅ Stripe secret key is LIVE mode');
  } else if (stripeSecret.startsWith('sk_test_')) {
    console.log('⚠️  Stripe secret key is TEST mode (not production)');
    hasWarnings = true;
  } else {
    console.log('❌ Stripe secret key invalid format');
    hasErrors = true;
  }
}

if (stripePublishable) {
  if (stripePublishable.startsWith('pk_live_')) {
    console.log('✅ Stripe publishable key is LIVE mode');
  } else if (stripePublishable.startsWith('pk_test_')) {
    console.log('⚠️  Stripe publishable key is TEST mode (not production)');
    hasWarnings = true;
  } else {
    console.log('❌ Stripe publishable key invalid format');
    hasErrors = true;
  }
}

if (stripeWebhookSecret) {
  if (stripeWebhookSecret.startsWith('whsec_')) {
    console.log('✅ Stripe webhook secret format valid');
  } else {
    console.log('❌ Stripe webhook secret invalid format (must start with whsec_)');
    hasErrors = true;
  }
}

// Check for common mistakes
console.log('\n⚠️  COMMON MISTAKES CHECK');
console.log('-'.repeat(60));

const viteStripeSecret = process.env.VITE_STRIPE_SECRET_KEY;
const viteWebhookSecret = process.env.VITE_STRIPE_WEBHOOK_SECRET;
const viteServiceRole = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (viteStripeSecret) {
  console.log('❌ SECURITY RISK: VITE_STRIPE_SECRET_KEY is set!');
  console.log('   Stripe secrets must NEVER be in VITE_ variables!');
  hasErrors = true;
} else {
  console.log('✅ No Stripe secrets in frontend variables');
}

if (viteWebhookSecret) {
  console.log('❌ SECURITY RISK: VITE_STRIPE_WEBHOOK_SECRET is set!');
  console.log('   Webhook secrets must NEVER be in VITE_ variables!');
  hasErrors = true;
} else {
  console.log('✅ No webhook secrets in frontend variables');
}

if (viteServiceRole) {
  console.log('❌ SECURITY RISK: VITE_SUPABASE_SERVICE_ROLE_KEY is set!');
  console.log('   Service role key must NEVER be in VITE_ variables!');
  hasErrors = true;
} else {
  console.log('✅ No service role key in frontend variables');
}

// Final summary
console.log('\n' + '='.repeat(60));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(60));

if (hasErrors) {
  console.log('\n❌ CONFIGURATION HAS ERRORS - DO NOT DEPLOY');
  console.log('   Fix the errors above before deploying to production.');
  process.exit(1);
} else if (hasWarnings) {
  console.log('\n⚠️  CONFIGURATION HAS WARNINGS');
  console.log('   Review warnings above. May be intentional (test mode).');
  process.exit(0);
} else {
  console.log('\n✅ CONFIGURATION VALID - READY FOR PRODUCTION');
  process.exit(0);
}
