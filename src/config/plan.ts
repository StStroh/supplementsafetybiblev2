// Plan configuration for feature gating
// Switch between 'FREE' and 'PRO' to enable/disable features

export const PLAN = 'FREE' as const; // Change to 'PRO' to unlock all features

export type PlanType = typeof PLAN;

export const PLAN_LIMITS = {
  FREE: {
    maxMedications: 2,
    maxSupplements: 2,
    showHighRiskOnly: true,
    allowPdfDownload: false,
    allowEmailReport: false,
  },
  PRO: {
    maxMedications: 10,
    maxSupplements: 10,
    showHighRiskOnly: false,
    allowPdfDownload: true,
    allowEmailReport: true,
  },
} as const;

export function getPlanLimits(plan: PlanType = PLAN) {
  return PLAN_LIMITS[plan];
}

export function isPro(plan: PlanType = PLAN) {
  return plan === 'PRO';
}

export function isFree(plan: PlanType = PLAN) {
  return plan === 'FREE';
}
