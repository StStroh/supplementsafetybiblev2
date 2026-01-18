import { PLAN_PRICE_MAP } from './stripe/plan-map';

export const PRICES = {
  premium: {
    monthly: PLAN_PRICE_MAP.PREMIUM_MONTHLY,
    annual: PLAN_PRICE_MAP.PREMIUM_YEARLY,
  },
  pro: {
    monthly: PLAN_PRICE_MAP.PRO_MONTHLY,
    annual: PLAN_PRICE_MAP.PRO_YEARLY,
  },
  starter: {
    monthly: PLAN_PRICE_MAP.STARTER_MONTHLY,
    free: PLAN_PRICE_MAP.STARTER_FREE,
  },
};
