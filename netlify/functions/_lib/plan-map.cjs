/*
 * ⚠️ DO NOT MODIFY WITHOUT FULL BILLING FLOW REVIEW.
 * This file is part of the Stripe → Supabase entitlement chain.
 *
 * LIVE STRIPE PRICE IDs - SINGLE SOURCE OF TRUTH
 * DO NOT MODIFY THESE UNLESS UPDATING STRIPE DASHBOARD
 * All price IDs are LIVE mode (price_1...)
 *
 * Verified working: 2025-12-14
 * See: /docs/BILLING_FLOW_LOCKED.md
 *
 * NOTE: This is a copy of src/lib/stripe/plan-map.cjs
 * Colocated in functions directory for Netlify bundler compatibility
 */

const PLAN_PRICE_MAP = {
  PRO_MONTHLY:    "price_1SSERBLSpIuKqlsUsWSDz8n6",
  PRO_YEARLY:     "price_1SSEW2LSpIuKqlsUKw2UAglX",
  PREMIUM_MONTHLY:"price_1SSb9jLSpIuKqlsUMRo6AxHg",
  PREMIUM_YEARLY: "price_1SSbB0LSpIuKqlsUCJP8sL8q",
  STARTER_MONTHLY:"price_1SJJQtLSpIuKqlsUhZdEPJ3L",
  STARTER_FREE:   "price_1SJJL4LSpIuKqlsUgNBSE8ZV"
};

// Reverse map: price ID -> plan details
const PRICE_TO_PLAN_MAP = {
  [PLAN_PRICE_MAP.PRO_MONTHLY]:     { plan: "pro", interval: "monthly" },
  [PLAN_PRICE_MAP.PRO_YEARLY]:      { plan: "pro", interval: "yearly" },
  [PLAN_PRICE_MAP.PREMIUM_MONTHLY]: { plan: "premium", interval: "monthly" },
  [PLAN_PRICE_MAP.PREMIUM_YEARLY]:  { plan: "premium", interval: "yearly" },
  [PLAN_PRICE_MAP.STARTER_MONTHLY]: { plan: "starter", interval: "monthly" },
  [PLAN_PRICE_MAP.STARTER_FREE]:    { plan: "starter", interval: "free" },
};

// Array of all valid LIVE price IDs
const ALLOWED_PRICE_IDS = Object.values(PLAN_PRICE_MAP);

// Validation helper
function isValidPriceId(priceId) {
  return ALLOWED_PRICE_IDS.includes(priceId);
}

// Get plan info from price ID
function getPlanInfo(priceId) {
  return PRICE_TO_PLAN_MAP[priceId] || null;
}

module.exports = {
  PLAN_PRICE_MAP,
  PRICE_TO_PLAN_MAP,
  ALLOWED_PRICE_IDS,
  isValidPriceId,
  getPlanInfo,
};
