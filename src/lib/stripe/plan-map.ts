/**
 * LIVE STRIPE PRICE IDs - SINGLE SOURCE OF TRUTH
 *
 * DO NOT MODIFY THESE UNLESS UPDATING STRIPE DASHBOARD
 * All price IDs are LIVE mode (price_1...)
 *
 * These IDs are hard-coded to prevent env confusion and ensure
 * checkout + webhook use the exact same price IDs.
 */

export const PLAN_PRICE_MAP = {
  PRO_MONTHLY:    "price_1SSERBLSpIuKqlsUsWSDz8n6",
  PRO_YEARLY:     "price_1SSEW2LSpIuKqlsUKw2UAglX",
  PREMIUM_MONTHLY:"price_1SSb9jLSpIuKqlsUMRo6AxHg",
  PREMIUM_YEARLY: "price_1SSbB0LSpIuKqlsUCJP8sL8q",
  STARTER_MONTHLY:"price_1SJJQtLSpIuKqlsUhZdEPJ3L",
  STARTER_FREE:   "price_1SJJL4LSpIuKqlsUgNBSE8ZV"
} as const;

// Reverse map: price ID -> plan details
export const PRICE_TO_PLAN_MAP: Record<string, { plan: string; interval: string }> = {
  [PLAN_PRICE_MAP.PRO_MONTHLY]:     { plan: "pro", interval: "monthly" },
  [PLAN_PRICE_MAP.PRO_YEARLY]:      { plan: "pro", interval: "yearly" },
  [PLAN_PRICE_MAP.PREMIUM_MONTHLY]: { plan: "premium", interval: "monthly" },
  [PLAN_PRICE_MAP.PREMIUM_YEARLY]:  { plan: "premium", interval: "yearly" },
  [PLAN_PRICE_MAP.STARTER_MONTHLY]: { plan: "starter", interval: "monthly" },
  [PLAN_PRICE_MAP.STARTER_FREE]:    { plan: "starter", interval: "free" },
};

// Array of all valid LIVE price IDs
export const ALLOWED_PRICE_IDS = Object.values(PLAN_PRICE_MAP);

// Validation helper
export function isValidPriceId(priceId: string): boolean {
  return ALLOWED_PRICE_IDS.includes(priceId as any);
}

// Get plan info from price ID
export function getPlanInfo(priceId: string): { plan: string; interval: string } | null {
  return PRICE_TO_PLAN_MAP[priceId] || null;
}
