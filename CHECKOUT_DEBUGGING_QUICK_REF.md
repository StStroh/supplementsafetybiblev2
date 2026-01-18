# Checkout 400 Debugging - Quick Reference Card

## 🚨 If Checkout Returns 400

### Step 1: Check Browser Console
Look for error message displayed to user and logged error object.

**Good sign:**
```
[Pricing] Error response: {
  error: "Invalid plan. Must be 'pro' or 'premium'.",
  type: "BadRequest",
  received: { ... }
}
```

**Bad sign (old behavior):**
```
[Pricing] Error response: Object
```

---

### Step 2: Check Netlify Function Logs

Go to: **Netlify Dashboard → Functions → create-checkout-session**

**Look for this section:**
```
[create-checkout-session] ========== REQUEST PAYLOAD ==========
[create-checkout-session] Body keys present: ['plan', 'interval']
[create-checkout-session] Has plan: true
[create-checkout-session] Has interval: true
[create-checkout-session] plan value: pro
[create-checkout-session] interval value: monthly
====================================
```

---

### Step 3: Diagnose Issue

| Log Shows | Problem | Fix |
|-----------|---------|-----|
| `plan value: undefined` | Frontend not sending plan | Check Pricing.tsx button handler |
| `Invalid plan value: basic` | Wrong plan name | Frontend sending incorrect value |
| `Missing required field` | Empty payload | Check fetch() body parameter |
| `Invalid JSON` | Malformed request | Check JSON.stringify() call |
| `MISSING` next to env var | Missing config | Add to Netlify env vars |

---

## 📋 Common Error Types

### BadRequest (400)
**User did something wrong or frontend bug**

Examples:
- Missing required fields
- Invalid plan/interval values
- Malformed JSON
- Wrong tier format

**Action:** Check frontend code sending the request

---

### ConfigurationError (500)
**Server misconfiguration**

Examples:
- Missing STRIPE_SECRET_KEY
- Missing VITE_STRIPE_PRICE_* variables
- Invalid Stripe credentials

**Action:** Check Netlify environment variables

---

### StripeError (500)
**Stripe API issue**

Examples:
- No such price ID
- Invalid API key
- Network timeout

**Action:** Verify price IDs in Stripe Dashboard

---

## 🔧 Quick Fixes

### "Missing required field" Error

**Frontend sends:**
```javascript
body: JSON.stringify({ plan, interval })
```

**Check:**
1. Are `plan` and `interval` defined before stringify?
2. Are they strings (not undefined)?
3. Is Content-Type header set to application/json?

---

### "Invalid plan" Error

**Valid values:**
- `pro`
- `premium`

**NOT valid:**
- `Pro` (case sensitive)
- `basic`
- `core`
- `starter`

---

### "Invalid tier" Error

**Valid tier values:**
- `pro_monthly`
- `pro_annual`
- `premium_monthly`
- `premium_annual`

**NOT valid:**
- `pro-monthly` (use underscore, not dash)
- `pro_month` (must be "monthly")
- `proMonthly` (use underscore, not camelCase)

---

## 🧪 Test Requests

### Test Valid Request
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"plan":"pro","interval":"monthly"}'
```

**Expected:** 200 with Stripe checkout URL

---

### Test Invalid Plan
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"plan":"invalid","interval":"monthly"}'
```

**Expected:** 400 with clear error message

---

### Test Missing Fields
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected:** 400 with "Missing required field" error

---

## 📊 Monitoring

### Healthy System Indicators

✅ **Function logs show:**
```
[create-checkout-session] ✅ Request body parsed
[create-checkout-session] ✅ Plan configuration: { plan: 'pro', billing: 'monthly' }
[create-checkout-session] ✅ Using price ID: price_***
[create-checkout-session] ✅ GUEST checkout session created: cs_***
```

✅ **Browser console shows:**
```
[checkout] Starting checkout: { plan: 'pro', interval: 'monthly', authenticated: false }
[checkout] Response received - status: 200
[checkout] Success: { url: 'https://checkout.stripe.com/...', sessionId: 'cs_...' }
[checkout] Redirecting to: https://checkout.stripe.com/...
```

✅ **User experience:**
- Clicks Pro/Premium button
- Button shows "Processing…" with spinner
- Redirects to Stripe Checkout within 2-3 seconds
- No error message visible

---

### Problem Indicators

❌ **Function logs show:**
```
[create-checkout-session] ❌ Invalid plan value: basic
[create-checkout-session] ❌ CRITICAL: Price ID not configured
[create-checkout-session] ❌ Invalid JSON in request body
```

❌ **Browser console shows:**
```
[checkout] Error response: { error: "...", type: "BadRequest" }
[Pricing] Checkout error: ...
```

❌ **User experience:**
- Clicks button
- Button returns to normal state
- Red error banner appears at top of pricing section
- User sees error message

---

## 🔍 Deep Dive Logs

### Full Request Lifecycle

**1. Button Click**
```
[Pricing] Checkout initiated: { tier: 'pro_monthly', isLoggedIn: false }
[Pricing] Calling: /.netlify/functions/create-checkout-session { plan: 'pro', interval: 'monthly' }
```

**2. Function Receives**
```
[create-checkout-session] Request received: { method: 'POST', hasAuth: false }
[create-checkout-session] ========== ENVIRONMENT CHECK ==========
[create-checkout-session] STRIPE_SECRET_KEY: ✅ Present
[create-checkout-session] VITE_STRIPE_PRICE_PRO: ✅ Present
```

**3. Payload Processing**
```
[create-checkout-session] ========== REQUEST PAYLOAD ==========
[create-checkout-session] Body keys present: ['plan', 'interval']
[create-checkout-session] plan value: pro
[create-checkout-session] interval value: monthly
```

**4. Price Selection**
```
[create-checkout-session] No priceId in request body, selecting from environment...
[create-checkout-session] Selected env var: VITE_STRIPE_PRICE_PRO
[create-checkout-session] ✅ Using price ID: price_1ABC123...
```

**5. Session Creation**
```
[create-checkout-session] Creating session: {
  plan: 'pro',
  interval: 'monthly',
  priceId: 'price_1ABC123...',
  isGuestCheckout: true,
  userId: 'guest',
  successUrl: 'https://yourdomain.com/billing/success?session_id={CHECKOUT_SESSION_ID}',
  cancelUrl: 'https://yourdomain.com/billing/cancel'
}
[create-checkout-session] ✅ GUEST checkout session created: cs_live_***
```

**6. Frontend Success**
```
[Pricing] Response: 200 true
[Pricing] Success: { url: 'https://checkout.stripe.com/...', sessionId: 'cs_live_***' }
[Pricing] Redirecting to: https://checkout.stripe.com/...
```

---

## 🎯 Success Criteria Checklist

After clicking Pro/Premium checkout:

- [ ] Function logs show "REQUEST PAYLOAD" section
- [ ] Function logs show all fields present: plan, interval
- [ ] Function logs show "✅ Using price ID"
- [ ] Function logs show "✅ checkout session created"
- [ ] Browser console shows status 200
- [ ] Browser console shows checkout URL
- [ ] Browser redirects to Stripe Checkout
- [ ] No error banner visible in UI
- [ ] No 400/500 errors in any logs

---

## 🆘 Emergency Contacts

If checkout is completely broken:

1. **Check Stripe Dashboard** → Ensure price IDs exist
2. **Check Netlify Env Vars** → Verify all VITE_STRIPE_PRICE_* set
3. **Check Function Logs** → Look for first error message
4. **Check Browser Console** → Look for network errors
5. **Review recent commits** → Identify what changed

---

## 📝 Quick Test Script

Run this in browser console on pricing page:

```javascript
fetch('/.netlify/functions/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ plan: 'pro', interval: 'monthly' })
})
.then(r => r.json())
.then(d => console.log('✅ Success:', d))
.catch(e => console.error('❌ Error:', e));
```

**Expected:** Should log checkout URL

---

## 🛠️ Files Changed

- ✅ `netlify/functions/create-checkout-session.cjs` - Enhanced logging & error handling
- ✅ `src/components/Pricing.tsx` - Already correct (verified)
- ✅ `src/utils/checkout.ts` - Already correct (verified)

---

## 📚 Documentation

- **CHECKOUT_400_PAYLOAD_FIX.md** - Full implementation details
- **NETLIFY_CHECKOUT_500_FIX.md** - Environment setup guide
- **CHECKOUT_500_FIX_SUMMARY.md** - Previous fixes
