# Checkout 400 Payload Fix - Implementation Complete

## Problem Summary

Clicking Pro/Premium checkout buttons resulted in 400 errors with unclear error messages. Console showed "Error response: Object" without useful details.

## Root Causes Identified

1. **Insufficient logging** - Function didn't log request payload details
2. **Generic error responses** - 400 errors returned plain strings instead of structured JSON
3. **No payload variant support** - Function only accepted one format
4. **Missing type field** - Error responses didn't include error type for debugging

---

## Changes Implemented

### 1. Enhanced Request Logging ✅

**File:** `netlify/functions/create-checkout-session.cjs` (lines 83-93)

**Added:**
```javascript
console.log('[create-checkout-session] ========== REQUEST PAYLOAD ==========');
console.log('[create-checkout-session] Body keys present:', Object.keys(requestBody));
console.log('[create-checkout-session] Has plan:', !!requestBody.plan);
console.log('[create-checkout-session] Has interval:', !!requestBody.interval);
console.log('[create-checkout-session] Has tier:', !!requestBody.tier);
console.log('[create-checkout-session] Has priceId:', !!requestBody.priceId);
console.log('[create-checkout-session] plan value:', requestBody.plan || 'undefined');
console.log('[create-checkout-session] interval value:', requestBody.interval || 'undefined');
console.log('[create-checkout-session] tier value:', requestBody.tier || 'undefined');
```

**Benefit:** Now logs exactly what was received without exposing secrets

---

### 2. Accept Multiple Payload Formats ✅

**File:** `netlify/functions/create-checkout-session.cjs` (lines 107-185)

**Now Accepts 3 Variants:**

#### Variant A: plan + interval (Current frontend format)
```json
{
  "plan": "pro",
  "interval": "monthly"
}
```

#### Variant B: tier format (Alternative format)
```json
{
  "tier": "pro_monthly"
}
```

Valid tier values:
- `pro_monthly`
- `pro_annual`
- `premium_monthly`
- `premium_annual`

#### Variant C: Direct price ID override
```json
{
  "priceId": "price_1ABC123..."
}
```

**Normalization Logic:**
- Tier format is automatically converted to plan + interval
- All variants end up selecting the correct Stripe price ID
- Direct priceId bypasses environment variable lookup

---

### 3. Improved Error Response Format ✅

**All errors now return structured JSON with:**

#### Invalid JSON in body:
```json
{
  "error": "Invalid JSON in request body",
  "type": "BadRequest",
  "received": {
    "bodyLength": 42,
    "bodyPreview": "{invalid json..."
  }
}
```

#### Missing required fields:
```json
{
  "error": "Missing required field: must provide either { plan, interval } or { tier } or { priceId }",
  "type": "BadRequest",
  "received": {
    "hasPlan": false,
    "hasInterval": false,
    "hasTier": false,
    "hasPriceId": false
  }
}
```

#### Invalid plan value:
```json
{
  "error": "Invalid plan. Must be 'pro' or 'premium'.",
  "type": "BadRequest",
  "received": {
    "hasPlan": true,
    "hasInterval": true,
    "hasTier": false,
    "hasPriceId": false,
    "planValue": "invalid_plan_name"
  }
}
```

#### Invalid tier value:
```json
{
  "error": "Invalid tier. Must be one of: pro_monthly, pro_annual, premium_monthly, premium_annual",
  "type": "BadRequest",
  "received": {
    "hasPlan": false,
    "hasInterval": false,
    "hasTier": true,
    "hasPriceId": false,
    "tierValue": "invalid_tier"
  }
}
```

#### Missing environment variable:
```json
{
  "error": "Price configuration missing for pro monthly. Please contact support.",
  "type": "ConfigurationError",
  "missingVar": "VITE_STRIPE_PRICE_PRO"
}
```

---

### 4. Frontend Already Correct ✅

**File:** `src/components/Pricing.tsx` (lines 188-193)

Frontend already sends correct format:
```javascript
const res = await fetch(requestUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // Authorization header added if user is logged in
  },
  body: JSON.stringify({ plan, interval }),
  signal: controller.signal,
});
```

**Error handling already correct (lines 199-211):**
```javascript
if (!res.ok) {
  let errorMessage = `Checkout failed (HTTP ${res.status})`;
  try {
    const errorData = await res.json();
    if (errorData.error) {
      errorMessage = errorData.error;
    }
    console.error('[Pricing] Error response:', errorData);
  } catch (parseErr) {
    console.error('[Pricing] Could not parse error response');
  }
  setCheckoutError(errorMessage);
  return;
}
```

**UI displays error (lines 305-325):**
```jsx
{checkoutError && (
  <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 text-red-600 text-xl">⚠️</div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-red-900">
          Checkout Error
        </h3>
        <p className="mt-1 text-sm text-red-700">
          {checkoutError}
        </p>
      </div>
    </div>
  </div>
)}
```

---

## Testing Scenarios

### Valid Requests (Should Work)

#### Test 1: Pro Monthly
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"plan":"pro","interval":"monthly"}'
```

**Expected:**
- Status: 200
- Response: `{"url":"https://checkout.stripe.com/...","sessionId":"cs_..."}`

#### Test 2: Premium Annual via Tier Format
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"tier":"premium_annual"}'
```

**Expected:**
- Status: 200
- Logs show: "Normalizing from tier format: premium_annual"
- Response: `{"url":"https://checkout.stripe.com/...","sessionId":"cs_..."}`

#### Test 3: Direct Price ID
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_1ABC123..."}'
```

**Expected:**
- Status: 200
- Logs show: "Using priceId from request body"
- Response: `{"url":"https://checkout.stripe.com/...","sessionId":"cs_..."}`

---

### Invalid Requests (Should Return Clear 400)

#### Test 4: Missing Fields
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected:**
- Status: 400
- Response includes `received` object showing all fields are missing

#### Test 5: Invalid Plan
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"plan":"basic","interval":"monthly"}'
```

**Expected:**
- Status: 400
- Error: "Invalid plan. Must be 'pro' or 'premium'."
- Response includes `planValue: "basic"`

#### Test 6: Invalid Tier
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"tier":"basic_monthly"}'
```

**Expected:**
- Status: 400
- Error lists all valid tier values

#### Test 7: Malformed JSON
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{invalid json'
```

**Expected:**
- Status: 400
- Error: "Invalid JSON in request body"
- Response includes `bodyPreview`

---

## Debugging Guide

### If checkout returns 400:

1. **Check Netlify function logs:**
   - Go to Netlify Dashboard → Functions → create-checkout-session
   - Look for "REQUEST PAYLOAD" section

2. **Identify the issue:**
   ```
   [create-checkout-session] Body keys present: ['plan', 'interval']
   [create-checkout-session] Has plan: true
   [create-checkout-session] Has interval: true
   [create-checkout-session] plan value: pro
   [create-checkout-session] interval value: monthly
   ```

3. **Check for validation errors:**
   - If `plan value: undefined` → Frontend not sending plan
   - If `Invalid plan value:` → Frontend sending wrong plan name
   - If `Missing required field:` → Payload incomplete

4. **Review error response:**
   - Frontend console will show the full error object
   - Look at `received` field to see what was detected
   - `type` field indicates error category

---

## Success Criteria ✅

All goals achieved:

- ✅ Logs request method + parsed body keys
- ✅ Logs plan, interval, tier, priceId presence (not secrets)
- ✅ Parses JSON safely with clear error on failure
- ✅ Returns 400 JSON with error, type, and received fields
- ✅ Accepts plan+interval format (Variant A)
- ✅ Accepts tier format (Variant B)
- ✅ Accepts direct priceId (Variant C)
- ✅ Normalizes to internal format
- ✅ Selects correct VITE_STRIPE_PRICE_* env var
- ✅ Frontend already sends correct format
- ✅ Frontend already has proper error handling
- ✅ UI displays error messages to users
- ✅ NO email required before checkout (guest checkout)
- ✅ Build successful

---

## Required Environment Variables

No changes needed to environment variables. Function continues to use:

```bash
# Backend (Netlify Environment Variables)
STRIPE_SECRET_KEY=sk_live_*** or sk_test_***

# Frontend (VITE_ prefix - exposed to browser)
VITE_STRIPE_PRICE_PRO=price_***
VITE_STRIPE_PRICE_PRO_ANNUAL=price_***
VITE_STRIPE_PRICE_PREMIUM=price_***
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_***

# Optional (has defaults)
CHECKOUT_SUCCESS_URL=https://yourdomain.com/billing/success?session_id={CHECKOUT_SESSION_ID}
CHECKOUT_CANCEL_URL=https://yourdomain.com/billing/cancel
```

---

## Deployment Checklist

Before deploying to production:

- [x] Code changes committed
- [x] Build successful
- [x] All environment variables set in Netlify
- [ ] Test checkout flow in Netlify preview deploy
- [ ] Verify function logs show detailed payload info
- [ ] Confirm 400 errors return structured JSON
- [ ] Test all 3 payload variants work
- [ ] Verify error messages display in UI

---

## Related Documentation

- **NETLIFY_CHECKOUT_500_FIX.md** - Environment setup guide
- **CHECKOUT_500_FIX_SUMMARY.md** - Previous fix summary
- **docs/BILLING_FLOW_LOCKED.md** - Billing system documentation

---

## Technical Notes

### Why support multiple payload formats?

**Flexibility for future integrations:**
- Different frontends may prefer different formats
- Admin tools can use direct priceId
- Third-party integrations can use tier format
- Backward compatibility if we change frontend

### Why log presence instead of values?

**Security best practice:**
- Never log user input that could contain secrets
- Boolean flags are safe to log
- Helps diagnose missing fields without exposing data
- Actual values only logged if they're non-sensitive (plan names, etc.)

### Why normalize to internal format?

**Single source of truth:**
- All variants convert to { plan, interval }
- Price selection logic only needs one path
- Easier to maintain and test
- Clear separation between input and processing

---

## Monitoring

After deployment, monitor:

1. **Function logs** for new error patterns
2. **Error rate** in Netlify analytics
3. **User reports** of checkout failures
4. **Stripe Dashboard** for session creation rate

Expected behavior:
- Valid requests → 200 + redirect to Stripe
- Invalid requests → 400 + clear error message in UI
- Config errors → 500 + "contact support" message
