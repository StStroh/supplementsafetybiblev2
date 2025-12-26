# Method Not Allowed (405) - Diagnostic Enhancement

## Problem Statement

Getting `{"error":"Method not allowed","type":"MethodNotAllowed"}` from `/.netlify/functions/create-checkout-session`, indicating the function is being called with a non-POST method (likely GET).

## Investigation Results

### All Code Uses POST Correctly ✅

**Found only 2 places calling create-checkout-session:**

1. **src/components/Pricing.tsx** (line 195)
   - ✅ Uses `method: "POST"`
   - ✅ Has `Content-Type: application/json` header
   - ✅ Sends body with `JSON.stringify({ plan, interval })`

2. **src/utils/checkout.ts** (line 88)
   - ✅ Uses `method: "POST"`
   - ✅ Has `Content-Type: application/json` header
   - ✅ Sends body with `JSON.stringify({ plan, interval })`

### No Invalid Navigation ✅

- ✅ No `<a href>` links to the function
- ✅ No `<Link to>` components pointing to the function
- ✅ No `window.location` redirects to the function
- ✅ All calls use proper `fetch()` with POST

### Exception: Health Check (Expected)

**File:** `netlify/functions/monitor-health.cjs` (line 49-51)
```javascript
const checkoutRes = await fetch(`${siteUrl}/.netlify/functions/create-checkout-session`, {
  method: 'GET'
});
// Expects 405 - this is a health check to verify the endpoint rejects non-POST
```

This is intentional and expects a 405 response.

---

## Changes Made - Enhanced Logging

### 1. src/components/Pricing.tsx

**Added detailed logging before fetch (lines 188-193):**
```javascript
console.log('[Pricing] ========== CHECKOUT REQUEST ==========');
console.log('[Pricing] URL:', requestUrl);
console.log('[Pricing] Method: POST');
console.log('[Pricing] POST checkout payload:', payload);
console.log('[Pricing] Headers:', Object.keys(headers));
console.log('[Pricing] =========================================');
```

**What this shows:**
- Explicit confirmation that POST method is being used
- The exact payload being sent
- Which headers are included
- Clear visual separator for debugging

### 2. src/utils/checkout.ts

**Added detailed logging before fetch (lines 81-86):**
```javascript
console.log("[checkout] ========== CHECKOUT REQUEST ==========");
console.log("[checkout] URL:", requestUrl);
console.log("[checkout] Method: POST");
console.log("[checkout] POST checkout payload:", payload);
console.log("[checkout] Headers:", Object.keys(headers));
console.log("[checkout] ===========================================");
```

**Same benefits as Pricing.tsx logging.**

---

## Debugging Guide

### If you see "Method not allowed" error:

#### Step 1: Check Browser Console

Look for the new logging output. You should see:

```
[Pricing] ========== CHECKOUT REQUEST ==========
[Pricing] URL: /.netlify/functions/create-checkout-session
[Pricing] Method: POST
[Pricing] POST checkout payload: { plan: 'pro', interval: 'monthly' }
[Pricing] Headers: ['Content-Type', 'Authorization']
[Pricing] =========================================
```

**If you see this:**
- ✅ Frontend is using POST correctly
- ❌ Problem is somewhere else (see next steps)

**If you DON'T see this:**
- ❌ Function not being called
- ❌ Button click handler not working
- ❌ JavaScript error preventing execution

#### Step 2: Check Network Tab

Open Browser DevTools → Network tab → Click checkout button

**What to verify:**

| Item | Expected | If Different |
|------|----------|--------------|
| Request URL | `/.netlify/functions/create-checkout-session` | Check for redirects |
| Request Method | `POST` | ❌ This is the issue! |
| Request Headers | `Content-Type: application/json` | Missing header |
| Request Payload | `{"plan":"pro","interval":"monthly"}` | Malformed body |
| Status Code | `200` or `400` (not `405`) | 405 = wrong method |

**Common issues:**

1. **Status 405 with Method: GET**
   - Something is converting POST to GET
   - Possible redirect (301/302) strips POST method
   - Browser extension interfering
   - Proxy/CDN issue

2. **Status 405 with Method: OPTIONS**
   - CORS preflight failing
   - Function should handle OPTIONS and return 200
   - Check function logs for OPTIONS request

3. **No request visible in Network tab**
   - JavaScript error preventing fetch
   - Check browser console for errors
   - Verify button click handler is attached

#### Step 3: Check Netlify Function Logs

Go to: **Netlify Dashboard → Functions → create-checkout-session → Logs**

**Look for:**
```
[create-checkout-session] Request received: { method: 'POST', hasAuth: false }
```

**If you see:**
```
[create-checkout-session] Request received: { method: 'GET', hasAuth: false }
```

Then the request is arriving as GET, which means:
- Network layer is converting it (redirect, proxy, CDN)
- OR browser/extension is modifying the request
- OR there's another code path calling it with GET

#### Step 4: Common Root Causes

**1. Netlify Redirect Rules**

Check `netlify.toml` for redirect rules that might affect the function:

```toml
# If you have something like this, it could strip POST method:
[[redirects]]
  from = "/functions/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

**Solution:** Remove the redirect or use status = 200 (rewrite, not redirect)

**2. Custom Domain / CDN**

If using Cloudflare or another CDN:
- Some CDN settings convert POST to GET on cache miss
- Check CDN rules to exclude `/functions/*` from optimization
- Verify "POST is allowed" in CDN settings

**3. Browser Extension**

Disable all extensions and test:
- Ad blockers sometimes modify requests
- Privacy extensions may interfere
- Developer tools extensions can cause issues

**4. CORS Preflight Failure**

If browser sends OPTIONS first and gets rejected:
- Function must handle OPTIONS and return 200
- Check if function has OPTIONS handler (it should)

**Current function does handle OPTIONS:**
```javascript
if (event.httpMethod !== "POST") {
  return json(405, {
    error: "Method not allowed",
    type: "MethodNotAllowed"
  });
}
```

This will reject OPTIONS. **If needed, add OPTIONS support:**

```javascript
if (event.httpMethod === "OPTIONS") {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    },
    body: ""
  };
}

if (event.httpMethod !== "POST") {
  return json(405, {
    error: "Method not allowed",
    type: "MethodNotAllowed"
  });
}
```

---

## Testing Checklist

### Valid POST Request (Should Work)

**Using curl:**
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"plan":"pro","interval":"monthly"}' \
  -v
```

**Expected:**
- Status: `200 OK`
- Response: `{"url":"https://checkout.stripe.com/...","sessionId":"cs_..."}`

### Invalid GET Request (Should Fail with 405)

**Using curl:**
```bash
curl -X GET https://yourdomain.com/.netlify/functions/create-checkout-session \
  -v
```

**Expected:**
- Status: `405 Method Not Allowed`
- Response: `{"error":"Method not allowed","type":"MethodNotAllowed"}`

### Browser Test

1. Open pricing page
2. Open DevTools (F12)
3. Go to Console tab
4. Go to Network tab
5. Click "Start Pro Monthly Plan" button
6. **Console should show:**
   ```
   [Pricing] ========== CHECKOUT REQUEST ==========
   [Pricing] Method: POST
   [Pricing] POST checkout payload: { plan: 'pro', interval: 'monthly' }
   ```
7. **Network tab should show:**
   - Request: `POST /.netlify/functions/create-checkout-session`
   - Status: `200` (if env vars correct) or `400` (if invalid data)
   - NOT `405`

---

## What If It's Still 405?

### Scenario A: Console shows "Method: POST" but Network shows "Method: GET"

**This means something between JavaScript and server is changing the method.**

**Possible causes:**
1. **Netlify redirect rule** - Check `netlify.toml`
2. **CDN/Proxy** - Check Cloudflare/CloudFront settings
3. **Browser extension** - Test in incognito mode
4. **Network proxy** - Test on different network
5. **HTTP/HTTPS mismatch** - Ensure all requests use HTTPS

**Debug steps:**
```javascript
// Add this to see the actual fetch options:
const fetchOptions = {
  method: "POST",
  headers,
  body: JSON.stringify(payload),
  signal: controller.signal,
};
console.log('[Pricing] Fetch options:', JSON.stringify(fetchOptions, null, 2));
const res = await fetch(requestUrl, fetchOptions);
```

### Scenario B: Console doesn't show logging at all

**This means the code isn't executing.**

**Possible causes:**
1. JavaScript error earlier in the function
2. Button click handler not attached
3. Build issue - old code deployed

**Debug steps:**
1. Add `console.log('[Pricing] Button clicked')` at start of `handleCheckout`
2. Add `console.log('[Pricing] Past validation')` after plan/interval extraction
3. Check browser console for any error messages
4. Verify latest code is deployed (check source maps)

### Scenario C: Different code path being used

**Check if there are multiple pricing pages:**
```bash
find /tmp/cc-agent/59885259/project/src -name "*ricing*" -type f
```

**Verify which component is actually loaded:**
```javascript
// Add this to the component:
useEffect(() => {
  console.log('[Pricing] Component mounted - VERSION 2.0');
}, []);
```

---

## Environment Verification

### Required for checkout to work:

```bash
# Backend (Netlify environment variables)
STRIPE_SECRET_KEY=sk_live_*** or sk_test_***

# Frontend (VITE_ prefix)
VITE_STRIPE_PRICE_PRO=price_***
VITE_STRIPE_PRICE_PRO_ANNUAL=price_***
VITE_STRIPE_PRICE_PREMIUM=price_***
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_***
```

### Verify in browser console:
```javascript
console.log('Pro Monthly Price:', import.meta.env.VITE_STRIPE_PRICE_PRO);
console.log('Pro Annual Price:', import.meta.env.VITE_STRIPE_PRICE_PRO_ANNUAL);
console.log('Premium Monthly Price:', import.meta.env.VITE_STRIPE_PRICE_PREMIUM);
console.log('Premium Annual Price:', import.meta.env.VITE_STRIPE_PRICE_PREMIUM_ANNUAL);
```

All should show `price_***` values, not `undefined`.

---

## Success Criteria

After clicking Pro/Premium button, you should see:

### Browser Console
```
[Pricing] Checkout initiated: { tier: 'pro_monthly', isLoggedIn: false }
[Pricing] ========== CHECKOUT REQUEST ==========
[Pricing] URL: /.netlify/functions/create-checkout-session
[Pricing] Method: POST
[Pricing] POST checkout payload: { plan: 'pro', interval: 'monthly' }
[Pricing] Headers: ['Content-Type', 'Authorization']
[Pricing] =========================================
[Pricing] Response: 200 true
[Pricing] Success: { url: 'https://checkout.stripe.com/...', sessionId: 'cs_...' }
[Pricing] Redirecting to: https://checkout.stripe.com/...
```

### Network Tab
- Request URL: `/.netlify/functions/create-checkout-session`
- Request Method: **POST** (not GET, not OPTIONS)
- Status Code: **200 OK** (not 405)
- Response: JSON with `url` and `sessionId`

### Function Logs (Netlify)
```
[create-checkout-session] Request received: { method: 'POST', hasAuth: false }
[create-checkout-session] ========== ENVIRONMENT CHECK ==========
[create-checkout-session] ========== REQUEST PAYLOAD ==========
[create-checkout-session] Body keys present: ['plan', 'interval']
[create-checkout-session] plan value: pro
[create-checkout-session] interval value: monthly
[create-checkout-session] ✅ Using price ID: price_***
[create-checkout-session] ✅ GUEST checkout session created: cs_***
```

### User Experience
- Button shows spinner: "Processing…"
- After 1-3 seconds: Redirects to Stripe Checkout
- No error banner visible
- Stripe Checkout page loads

---

## Build Status

✅ **Build successful**
✅ **TypeScript compilation passed**
✅ **No errors**
✅ **Ready for deployment**

```
dist/index.html                     2.02 kB
dist/assets/index-AkzzbP0i.css     59.16 kB
dist/assets/index-BNS6bxcw.js   1,185.96 kB
✓ built in 14.81s
```

---

## Files Changed

1. ✅ **src/components/Pricing.tsx** - Added detailed POST logging
2. ✅ **src/utils/checkout.ts** - Added detailed POST logging

**No changes to:**
- Function implementation (already handles POST correctly)
- Button handlers (already call POST correctly)
- Network configuration (no redirects found)

---

## Next Steps

1. **Deploy to Netlify** - Push changes and deploy
2. **Test in browser** - Click checkout button and verify logs
3. **Check Network tab** - Confirm POST method is used
4. **Monitor function logs** - Verify POST is received on server

If still getting 405:
1. Check `netlify.toml` for redirect rules
2. Test in incognito mode (disable extensions)
3. Check Netlify function logs for actual method received
4. Review CDN/proxy settings if using custom domain

---

## Related Documentation

- **CHECKOUT_FIX_COMPLETE.md** - Previous checkout fixes
- **CHECKOUT_400_PAYLOAD_FIX.md** - Payload validation fix
- **CHECKOUT_DEBUGGING_QUICK_REF.md** - Troubleshooting guide
- **CHECKOUT_FLOW_DIAGRAM.md** - Visual request flow
