# 500 Error Fix - Complete Diagnostic Implementation

**Date:** 2025-12-26
**Status:** ✅ READY FOR DIAGNOSIS

---

## What Was Fixed

### 1. ✅ Comprehensive Environment Variable Logging

**File:** `netlify/functions/create-checkout-session.cjs`

**Added at function start:**
```javascript
console.log('[create-checkout-session] ========== ENVIRONMENT CHECK ==========');
console.log('[create-checkout-session] STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Present' : '❌ MISSING');
console.log('[create-checkout-session] SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Present' : '⚠️ Missing (optional)');
console.log('[create-checkout-session] SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Present' : '⚠️ Missing (optional)');
console.log('[create-checkout-session] VITE_STRIPE_PRICE_PRO:', process.env.VITE_STRIPE_PRICE_PRO ? '✅ Present' : '❌ MISSING');
console.log('[create-checkout-session] VITE_STRIPE_PRICE_PRO_ANNUAL:', process.env.VITE_STRIPE_PRICE_PRO_ANNUAL ? '✅ Present' : '❌ MISSING');
console.log('[create-checkout-session] VITE_STRIPE_PRICE_PREMIUM:', process.env.VITE_STRIPE_PRICE_PREMIUM ? '✅ Present' : '❌ MISSING');
console.log('[create-checkout-session] VITE_STRIPE_PRICE_PREMIUM_ANNUAL:', process.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL ? '✅ Present' : '❌ MISSING');
console.log('[create-checkout-session] CHECKOUT_SUCCESS_URL:', process.env.CHECKOUT_SUCCESS_URL ? '✅ Present' : 'ℹ️ Using default');
console.log('[create-checkout-session] CHECKOUT_CANCEL_URL:', process.env.CHECKOUT_CANCEL_URL ? '✅ Present' : 'ℹ️ Using default');
console.log('[create-checkout-session] ====================================');
```

**Result:** First log output will show EXACTLY which env vars are missing.

---

### 2. ✅ Stripe Mode Detection (Test vs Live)

**Added:**
```javascript
// Detect if using test or live mode (DO NOT print the actual key)
const stripeKeyPrefix = process.env.STRIPE_SECRET_KEY.substring(0, 8);
const isTestMode = stripeKeyPrefix.includes('test');
const isLiveMode = stripeKeyPrefix.includes('live');
console.log('[create-checkout-session] Stripe mode:', isTestMode ? '🧪 TEST MODE' : isLiveMode ? '🚀 LIVE MODE' : '⚠️ UNKNOWN');
console.log('[create-checkout-session] Key prefix:', stripeKeyPrefix.replace(/_.*/, '_***'));
```

**Result:** Logs show `🧪 TEST MODE` or `🚀 LIVE MODE` without exposing the secret key.

---

### 3. ✅ Enhanced Request Body Logging

**Added:**
```javascript
console.log('[create-checkout-session] ✅ Request body parsed:', {
  plan: requestBody.plan,
  interval: requestBody.interval,
  hasPriceId: !!requestBody.priceId
});
```

**Result:** Confirms request is being sent correctly from frontend.

---

### 4. ✅ Price ID Selection Logging

**Added:**
```javascript
console.log('[create-checkout-session] No priceId in request body, selecting from environment...');

if (plan === "pro" && billing === "annual") {
  envVarName = 'VITE_STRIPE_PRICE_PRO_ANNUAL';
  selectedPriceId = process.env.VITE_STRIPE_PRICE_PRO_ANNUAL;
}
// ... other conditions

console.log('[create-checkout-session] Selected env var:', envVarName);

if (!selectedPriceId) {
  console.error('[create-checkout-session] ❌ CRITICAL: Price ID not configured');
  console.error('[create-checkout-session] Plan:', plan, '| Billing:', billing);
  console.error('[create-checkout-session] Looking for env var:', envVarName);
  console.error('[create-checkout-session] Value found:', selectedPriceId || 'EMPTY/UNDEFINED');
  console.error('[create-checkout-session] Fix: Go to Netlify → Environment Variables → Add', envVarName);
}

console.log('[create-checkout-session] ✅ Using price ID:', selectedPriceId);
```

**Result:** Shows EXACTLY which env var is being looked up and whether it has a value.

---

### 5. ✅ Email Validation Confirmation

**Added:**
```javascript
console.log('[create-checkout-session] ℹ️ New customer - Stripe will collect email during checkout (no frontend email validation)');
```

**Result:** Confirms no email is required from frontend - Stripe handles it.

---

### 6. ✅ Enhanced Stripe Error Handling

**Added special handling for "No such price" errors:**
```javascript
if (error.message && error.message.includes("No such price")) {
  console.error("[create-checkout-session] ❌ PRICE NOT FOUND IN STRIPE DASHBOARD");

  // Detect key mode
  const stripeKey = process.env.STRIPE_SECRET_KEY || '';
  const keyMode = stripeKey.includes('sk_test') ? '🧪 TEST MODE' :
                 stripeKey.includes('sk_live') ? '🚀 LIVE MODE' :
                 '⚠️ UNKNOWN MODE';

  console.error("[create-checkout-session] Current Stripe key mode:", keyMode);
  console.error("[create-checkout-session]");
  console.error("[create-checkout-session] TROUBLESHOOTING STEPS:");
  console.error("[create-checkout-session]   1. Go to https://dashboard.stripe.com");
  console.error("[create-checkout-session]   2. Ensure you're in the correct mode (toggle Test/Live in top right)");
  console.error("[create-checkout-session]   3. Go to Products → Prices");
  console.error("[create-checkout-session]   4. Find the price for your plan and copy the price ID (starts with price_)");
  console.error("[create-checkout-session]   5. Go to Netlify → Site Settings → Environment Variables");
  console.error("[create-checkout-session]   6. Update the corresponding VITE_STRIPE_PRICE_* variable");
  console.error("[create-checkout-session]   7. Redeploy the site");
}
```

**Result:** If price doesn't exist, logs provide step-by-step fix instructions.

---

## What to Look For in Netlify Logs

After deploying and clicking checkout, check **Netlify Dashboard → Functions → create-checkout-session → Recent Logs**.

### Scenario 1: Missing Stripe Secret Key

```
[create-checkout-session] ========== ENVIRONMENT CHECK ==========
[create-checkout-session] STRIPE_SECRET_KEY: ❌ MISSING
```

**Fix:**
1. Go to https://dashboard.stripe.com/apikeys
2. Copy the Secret key
3. Go to Netlify → Site Settings → Environment Variables
4. Add `STRIPE_SECRET_KEY` = your key
5. Redeploy

---

### Scenario 2: Missing Price ID

```
[create-checkout-session] ========== ENVIRONMENT CHECK ==========
[create-checkout-session] VITE_STRIPE_PRICE_PRO: ❌ MISSING
```

OR

```
[create-checkout-session] ❌ CRITICAL: Price ID not configured
[create-checkout-session] Plan: pro | Billing: monthly
[create-checkout-session] Looking for env var: VITE_STRIPE_PRICE_PRO
[create-checkout-session] Value found: EMPTY/UNDEFINED
```

**Fix:**
1. Go to https://dashboard.stripe.com/products
2. Create or find your "Pro" product
3. Add a price (monthly recurring)
4. Copy the price ID (starts with `price_`)
5. Go to Netlify → Environment Variables
6. Add `VITE_STRIPE_PRICE_PRO` = your price ID
7. Redeploy

---

### Scenario 3: Wrong Stripe Mode (Test vs Live Mismatch)

```
[create-checkout-session] Stripe mode: 🧪 TEST MODE
[create-checkout-session] Key prefix: sk_test_***
[create-checkout-session] ✅ Using price ID: price_1234567890abcdef

... later ...

[create-checkout-session] ❌ PRICE NOT FOUND IN STRIPE DASHBOARD
[create-checkout-session] Current Stripe key mode: 🧪 TEST MODE
```

**Fix:**
1. Your Stripe key is in TEST MODE
2. Go to https://dashboard.stripe.com
3. Toggle to **Test Mode** (top right corner)
4. Go to Products → Prices
5. Copy the price ID from TEST MODE
6. Update Netlify env var with TEST MODE price ID
7. Redeploy

---

### Scenario 4: Invalid API Key

```
[create-checkout-session] ❌ ERROR:
[create-checkout-session] Message: Invalid API Key provided
[create-checkout-session] Stripe Error Type: StripeAuthenticationError
```

**Fix:**
1. Your `STRIPE_SECRET_KEY` is invalid or expired
2. Go to https://dashboard.stripe.com/apikeys
3. Copy a fresh Secret key
4. Update Netlify env var
5. Redeploy

---

### Scenario 5: Request Body Issue

```
[create-checkout-session] ❌ Missing required field: plan
```

OR

```
[create-checkout-session] ❌ Invalid plan value: undefined
```

**Fix:** Frontend is not sending the correct request. Check browser console for errors in `Pricing.tsx`.

---

## Expected Success Logs

When everything works, you should see:

```
[create-checkout-session] Request received: { method: 'POST', hasAuth: false }
[create-checkout-session] ========== ENVIRONMENT CHECK ==========
[create-checkout-session] STRIPE_SECRET_KEY: ✅ Present
[create-checkout-session] SUPABASE_URL: ✅ Present
[create-checkout-session] SUPABASE_SERVICE_ROLE_KEY: ✅ Present
[create-checkout-session] VITE_STRIPE_PRICE_PRO: ✅ Present
[create-checkout-session] VITE_STRIPE_PRICE_PRO_ANNUAL: ✅ Present
[create-checkout-session] VITE_STRIPE_PRICE_PREMIUM: ✅ Present
[create-checkout-session] VITE_STRIPE_PRICE_PREMIUM_ANNUAL: ✅ Present
[create-checkout-session] CHECKOUT_SUCCESS_URL: ℹ️ Using default
[create-checkout-session] CHECKOUT_CANCEL_URL: ℹ️ Using default
[create-checkout-session] ====================================
[create-checkout-session] Stripe mode: 🧪 TEST MODE
[create-checkout-session] Key prefix: sk_test_***
[create-checkout-session] ✅ Request body parsed: { plan: 'pro', interval: 'monthly', hasPriceId: false }
[create-checkout-session] ✅ Plan configuration: { plan: 'pro', billing: 'monthly' }
[create-checkout-session] No priceId in request body, selecting from environment...
[create-checkout-session] Selected env var: VITE_STRIPE_PRICE_PRO
[create-checkout-session] ✅ Using price ID: price_1234567890abcdef
[create-checkout-session] Creating session: { plan: 'pro', interval: 'monthly', priceId: 'price_...', isGuestCheckout: true, userId: 'guest', ... }
[create-checkout-session] ℹ️ New customer - Stripe will collect email during checkout (no frontend email validation)
[create-checkout-session] Creating Stripe checkout session...
[create-checkout-session] ✅ GUEST checkout session created: cs_test_...
```

Then the frontend redirects to Stripe and checkout works!

---

## Documentation Added

1. **NETLIFY_ENV_VARS.md** - Complete environment variable setup guide
2. **README.md** - Updated with required env vars and link to detailed guide
3. **This file** - Diagnostic reference for troubleshooting

---

## Next Steps

1. **Deploy these changes to Netlify**
2. **Go to `/pricing` and click "Sign up for Pro trial"**
3. **Check Netlify function logs immediately**
4. **Look for the patterns above**
5. **Report the EXACT error message or scenario number**

The logs will now tell you EXACTLY what's wrong and how to fix it.

---

## Build Status

✅ `npm run build` succeeds
✅ No TypeScript errors
✅ All diagnostic logging in place
✅ No secrets exposed in logs
✅ Ready for deployment and diagnosis
