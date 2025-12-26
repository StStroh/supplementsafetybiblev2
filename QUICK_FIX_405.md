# Quick Fix Guide: 405 Method Not Allowed

## Problem
Getting `{"error":"Method not allowed","type":"MethodNotAllowed"}` from checkout function.

## What Was Done

### ✅ Code Audit Complete
- Found only 2 places calling the function
- Both use `method: "POST"` correctly
- No invalid links or redirects found
- All code is correct

### ✅ Enhanced Logging Added
Both files now log before fetch:
- Explicit "Method: POST" confirmation
- Payload contents
- Headers included
- Clear visual separators

**Files changed:**
1. `src/components/Pricing.tsx` (lines 188-193)
2. `src/utils/checkout.ts` (lines 81-86)

---

## Quick Debug Steps

### 1. Open Browser Console
Click checkout button and look for:
```
[Pricing] ========== CHECKOUT REQUEST ==========
[Pricing] Method: POST
[Pricing] POST checkout payload: { plan: 'pro', interval: 'monthly' }
```

### 2. Check Network Tab
Verify request shows:
- Method: **POST** (not GET)
- Status: **200** or **400** (not 405)

### 3. If Still 405, Check:
- [ ] `netlify.toml` - No problematic redirects
- [ ] Test in incognito mode - Disable extensions
- [ ] Netlify function logs - What method is received?
- [ ] CDN settings - POST allowed through?

---

## Expected Logs

### Browser Console (Success)
```
[Pricing] ========== CHECKOUT REQUEST ==========
[Pricing] URL: /.netlify/functions/create-checkout-session
[Pricing] Method: POST
[Pricing] POST checkout payload: { plan: 'pro', interval: 'monthly' }
[Pricing] Headers: ['Content-Type', 'Authorization']
[Pricing] =========================================
[Pricing] Response: 200 true
[Pricing] Redirecting to: https://checkout.stripe.com/...
```

### Network Tab (Success)
```
POST /.netlify/functions/create-checkout-session
Status: 200 OK
Payload: {"plan":"pro","interval":"monthly"}
```

### Function Logs (Success)
```
[create-checkout-session] Request received: { method: 'POST', hasAuth: false }
[create-checkout-session] Body keys present: ['plan', 'interval']
[create-checkout-session] ✅ Using price ID: price_***
```

---

## If Console Shows POST But Network Shows GET

**Something is converting the request:**

1. **Check `netlify.toml`:**
   ```toml
   # BAD - This strips POST:
   [[redirects]]
     from = "/functions/*"
     to = "/.netlify/functions/:splat"
     status = 301  # ❌ 301/302 strips POST

   # GOOD - This preserves POST:
   [[redirects]]
     from = "/functions/*"
     to = "/.netlify/functions/:splat"
     status = 200  # ✅ Rewrite, not redirect
   ```

2. **Test without CDN:**
   - Use Netlify subdomain directly
   - If works → CDN issue
   - If fails → Code issue

3. **Test in incognito:**
   - Disables extensions
   - If works → Extension interfering
   - If fails → Network/server issue

---

## Test Commands

### Test POST (Should Work)
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"plan":"pro","interval":"monthly"}'
```

### Test GET (Should Fail with 405)
```bash
curl -X GET https://yourdomain.com/.netlify/functions/create-checkout-session
```

---

## Build Status
✅ Build successful - Ready to deploy

Deploy and test:
1. Push changes
2. Wait for deploy
3. Test checkout button
4. Check logs in all 3 places (console, network, function)

---

## Full Documentation
See `METHOD_NOT_ALLOWED_FIX.md` for complete details.
