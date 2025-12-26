# Netlify Checkout 500 Error - Diagnostic Guide

## Quick Fix Checklist

### 1. Verify netlify.toml Configuration ✅

```toml
[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
```

**Status:** Already configured correctly (line 19)

---

### 2. Required Environment Variables

Go to **Netlify Dashboard → Site Settings → Environment Variables** and verify ALL of these are set:

#### Critical (Required for Checkout)
```bash
# Stripe Backend Secret Key
STRIPE_SECRET_KEY=sk_live_*** or sk_test_***

# Stripe Price IDs (MUST use VITE_ prefix)
VITE_STRIPE_PRICE_PRO=price_***
VITE_STRIPE_PRICE_PRO_ANNUAL=price_***
VITE_STRIPE_PRICE_PREMIUM=price_***
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_***
```

#### Optional (Will use defaults if missing)
```bash
# Custom success/cancel URLs (defaults shown)
CHECKOUT_SUCCESS_URL=https://yourdomain.com/billing/success?session_id={CHECKOUT_SESSION_ID}
CHECKOUT_CANCEL_URL=https://yourdomain.com/billing/cancel

# Trial period (defaults to 14 days)
TRIAL_DAYS_PRO=14
TRIAL_DAYS_PREMIUM=14
```

#### Supabase (Optional for guest checkout)
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=***
```

---

### 3. Function Logging (Already Implemented) ✅

The function logs:
- ✅ Which price ID is being used (line 136)
- ✅ Success/cancel URLs (lines 197-200)
- ✅ Stripe mode detection (test vs live) (line 65)
- ✅ Environment variable presence check (lines 41-51)
- ✅ Guest vs authenticated checkout (line 191)

---

### 4. Error Response Format ✅

All errors now return JSON:
```json
{
  "error": "User-friendly error message",
  "type": "StripeInvalidRequestError",
  "details": "Full error (dev only)"
}
```

**Updated:** Error responses now include `type` field (line 314)

---

## Common 500 Error Causes

### A) Missing STRIPE_SECRET_KEY
**Symptom:** Immediate 500 error, logs show "STRIPE_SECRET_KEY not configured"

**Fix:**
1. Go to Stripe Dashboard → Developers → API Keys
2. Copy Secret Key (starts with `sk_test_` or `sk_live_`)
3. Go to Netlify → Site Settings → Environment Variables
4. Add `STRIPE_SECRET_KEY` with the value
5. Redeploy site

---

### B) Missing Price IDs
**Symptom:** Error "Price configuration missing for pro monthly"

**Fix:**
1. Go to Stripe Dashboard → Products
2. Click on your product → Copy Price ID (starts with `price_`)
3. Go to Netlify → Site Settings → Environment Variables
4. Add the corresponding variable:
   - Pro Monthly: `VITE_STRIPE_PRICE_PRO`
   - Pro Annual: `VITE_STRIPE_PRICE_PRO_ANNUAL`
   - Premium Monthly: `VITE_STRIPE_PRICE_PREMIUM`
   - Premium Annual: `VITE_STRIPE_PRICE_PREMIUM_ANNUAL`
5. Redeploy site

**Important:** Must use `VITE_` prefix (frontend needs access to these)

---

### C) Wrong Stripe Mode
**Symptom:** "No such price" error

**Fix:**
1. Check logs for "Stripe mode: 🧪 TEST MODE" or "🚀 LIVE MODE"
2. Go to Stripe Dashboard (toggle Test/Live in top right)
3. Ensure you're in the correct mode matching your secret key
4. Copy price IDs from the CURRENT mode
5. Update Netlify environment variables
6. Redeploy site

---

### D) Invalid Price ID Format
**Symptom:** Stripe error "No such price"

**Fix:**
Verify price IDs:
- Must start with `price_` (NOT `prod_`)
- Must be from the correct Stripe mode (test vs live)
- Must exist in your Stripe Dashboard → Products → Prices

---

## How to Debug 500 Errors

### Step 1: Check Netlify Function Logs
1. Go to Netlify Dashboard
2. Click on your site
3. Go to **Functions** tab
4. Find `create-checkout-session`
5. Click to view logs

### Step 2: Look for These Log Lines
```
[create-checkout-session] ========== ENVIRONMENT CHECK ==========
[create-checkout-session] STRIPE_SECRET_KEY: ✅ Present or ❌ MISSING
[create-checkout-session] VITE_STRIPE_PRICE_PRO: ✅ Present or ❌ MISSING
...
```

### Step 3: Find the Error Section
```
[create-checkout-session] ❌ ============ ERROR OCCURRED ============
[create-checkout-session] Message: [error message]
[create-checkout-session] Type: [error type]
```

### Step 4: Match Error to Fix Above
- "not configured" → Missing environment variable
- "No such price" → Wrong Stripe mode or invalid price ID
- "API key" → Wrong or expired secret key

---

## Testing Checklist

After fixing environment variables:

1. **Redeploy the site** (env var changes require redeploy)
2. **Test checkout flow:**
   - Go to pricing page
   - Click "Sign up for Pro"
   - Should redirect to Stripe Checkout
   - Should NOT show 500 error
3. **Check function logs** for success message:
   ```
   [create-checkout-session] ✅ GUEST checkout session created: cs_***
   ```

---

## Environment Variable Reference

### Why VITE_ prefix?

Variables with `VITE_` prefix are exposed to the browser (frontend).
Variables without prefix are only available to Netlify Functions (backend).

**Price IDs need VITE_ prefix because:**
- Frontend code displays prices
- Frontend sends price IDs to backend for validation
- They are NOT secret (they're already visible in Stripe Checkout)

**Secret key does NOT use VITE_ because:**
- It's a secret (should never be exposed to browser)
- Only backend functions use it

---

## Support

If issues persist after following this guide:

1. Check Netlify function logs for the exact error
2. Verify all environment variables are set in Netlify (not just .env file)
3. Ensure you've redeployed after adding/changing environment variables
4. Contact support with:
   - Netlify function logs
   - Screenshot of your environment variables (WITHOUT values)
   - Stripe mode you're using (test or live)
