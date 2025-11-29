/**
 * PREBUILD GUARD - LIVE MODE ENFORCEMENT
 *
 * Fails build if:
 * - Stripe keys are TEST mode
 * - Stripe keys are missing
 * - Supabase keys are missing
 */

const { PLAN_PRICE_MAP } = require('../src/lib/stripe/plan-map.cjs');

function validateEnv() {
  const errors = [];

  const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  // Check Stripe Secret Key
  if (!stripeKey) {
    errors.push("❌ STRIPE_SECRET_KEY is missing");
  } else if (stripeKey.startsWith('sk_test_')) {
    errors.push("❌ STRIPE_SECRET_KEY is TEST mode (sk_test_). Must be LIVE (sk_live_)");
  } else if (!stripeKey.startsWith('sk_live_')) {
    errors.push("❌ STRIPE_SECRET_KEY has invalid format. Must start with sk_live_");
  } else {
    console.log("✅ Stripe Secret Key is LIVE mode");
  }

  // Check Supabase
  if (!supabaseUrl) {
    errors.push("❌ VITE_SUPABASE_URL is missing");
  } else {
    console.log("✅ Supabase URL found");
  }

  if (!supabaseKey) {
    errors.push("❌ VITE_SUPABASE_ANON_KEY is missing");
  } else {
    console.log("✅ Supabase Anon Key found");
  }

  // Validate Price IDs from plan map
  console.log("\n📋 LIVE Price IDs in plan-map.cjs:");
  Object.entries(PLAN_PRICE_MAP).forEach(([key, priceId]) => {
    console.log(`   ${key}: ${priceId}`);
  });

  if (errors.length > 0) {
    console.error("\n🚨 BUILD BLOCKED - Environment validation failed:\n");
    errors.forEach(err => console.error(err));
    console.error("\n💡 Fix .env or Netlify environment variables before deploying.\n");
    process.exit(1);
  }

  console.log("\n✅ All environment checks passed. Build can proceed.\n");
}

validateEnv();
