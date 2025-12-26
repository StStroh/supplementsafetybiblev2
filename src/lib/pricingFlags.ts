/**
 * Pricing A/B Test Flags
 *
 * These flags control pricing page behavior and can be toggled
 * via environment variables for safe A/B testing.
 */

export interface PricingFlags {
  enableAnnualToggle: boolean;
  enableFirstMonthAnchor: boolean;
  firstMonthPricePro: number;
  firstMonthPricePremium: number;
  stripeCouponFirstMonthPro?: string;
  stripeCouponFirstMonthPremium?: string;
}

function parseEnvBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

function parseEnvNumber(value: string | undefined, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

export function getPricingFlags(): PricingFlags {
  return {
    enableAnnualToggle: parseEnvBoolean(
      import.meta.env.VITE_ENABLE_ANNUAL_TOGGLE,
      true // Default: show annual toggle
    ),
    enableFirstMonthAnchor: parseEnvBoolean(
      import.meta.env.VITE_ENABLE_FIRST_MONTH_ANCHOR,
      false // Default: disabled (safe default)
    ),
    firstMonthPricePro: parseEnvNumber(
      import.meta.env.VITE_FIRST_MONTH_PRICE_PRO,
      9.99
    ),
    firstMonthPricePremium: parseEnvNumber(
      import.meta.env.VITE_FIRST_MONTH_PRICE_PREMIUM,
      9.99
    ),
    stripeCouponFirstMonthPro: import.meta.env.VITE_STRIPE_COUPON_FIRST_MONTH_PRO,
    stripeCouponFirstMonthPremium: import.meta.env.VITE_STRIPE_COUPON_FIRST_MONTH_PREMIUM,
  };
}
