# ✅ Checkout 400 Fix - Complete

## What Was Fixed

Fixed checkout returning 400 errors with unclear messages. Now returns structured JSON errors with detailed diagnostics.

---

## Files Changed

### 1. netlify/functions/create-checkout-session.cjs

**Enhanced Logging:**
- Logs all request payload keys
- Shows which fields are present/missing
- Logs selected price ID and source

**Flexible Payload Acceptance:**
- Accepts `{ plan, interval }` format ✅ (current frontend)
- Accepts `{ tier }` format ✅ (e.g. "pro_monthly")
- Accepts `{ priceId }` format ✅ (direct override)

**Better Error Responses:**
- All errors return JSON with `error`, `type`, and `received` fields
- 400 errors show exactly what was received
- 500 errors show which env var is missing

### 2. Frontend Files

**No changes needed - already correct:**
- ✅ `src/components/Pricing.tsx` - Sends correct format, handles errors
- ✅ `src/utils/checkout.ts` - Proper fetch with JSON headers
- ✅ Both files display error messages to users

---

## Test It

### Valid Request (Should Work)
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"plan":"pro","interval":"monthly"}'
```

**Expected:**
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_...",
  "sessionId": "cs_..."
}
```

### Invalid Request (Should Return Clear 400)
```bash
curl -X POST https://yourdomain.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"plan":"invalid"}'
```

**Expected:**
```json
{
  "error": "Invalid plan. Must be 'pro' or 'premium'.",
  "type": "BadRequest",
  "received": {
    "hasPlan": true,
    "hasInterval": false,
    "hasTier": false,
    "hasPriceId": false,
    "planValue": "invalid"
  }
}
```

---

## Debug Checklist

If checkout fails:

1. **Check browser console** - Look for error object
2. **Check Netlify function logs** - Look for "REQUEST PAYLOAD" section
3. **Verify payload format** - Must have plan+interval OR tier OR priceId
4. **Verify environment variables** - All VITE_STRIPE_PRICE_* must be set
5. **Check error type field:**
   - `BadRequest` → Frontend issue
   - `ConfigurationError` → Missing env var
   - `StripeError` → Stripe Dashboard issue

---

## Environment Variables Required

```bash
# Backend (Netlify only)
STRIPE_SECRET_KEY=sk_live_*** or sk_test_***

# Frontend (VITE_ prefix)
VITE_STRIPE_PRICE_PRO=price_***
VITE_STRIPE_PRICE_PRO_ANNUAL=price_***
VITE_STRIPE_PRICE_PREMIUM=price_***
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_***
```

---

## What You'll See

### Before Fix
```
Console: [Pricing] Error response: Object
Logs: (no detailed payload info)
User: Generic error message
```

### After Fix
```
Console: [Pricing] Error response: { error: "Invalid plan...", type: "BadRequest", received: {...} }
Logs: [create-checkout-session] Body keys present: ['plan']
      [create-checkout-session] plan value: invalid
User: Clear error message with dismiss button
```

---

## Success Criteria

All goals achieved:

✅ Logs request method + body keys
✅ Does NOT log secrets
✅ Parses JSON safely
✅ Returns 400 JSON with error + type + received
✅ Accepts plan+interval format
✅ Accepts tier format
✅ Accepts priceId format
✅ Normalizes to internal format
✅ Selects correct env price
✅ Frontend already correct
✅ NO email required before checkout
✅ Build successful

---

## Next Steps

1. Deploy to Netlify
2. Test checkout on staging/preview
3. Verify function logs show detailed payload
4. Confirm errors return structured JSON
5. Test all 3 payload variants
6. Deploy to production

---

## Documentation

Created comprehensive docs:

- **CHECKOUT_400_PAYLOAD_FIX.md** - Full technical details
- **CHECKOUT_DEBUGGING_QUICK_REF.md** - Quick troubleshooting guide
- **CHECKOUT_FLOW_DIAGRAM.md** - Visual request flow
- **CHECKOUT_FIX_COMPLETE.md** - This summary

---

## Support

If issues persist:

1. Check Netlify function logs for exact error
2. Review CHECKOUT_DEBUGGING_QUICK_REF.md
3. Verify all env vars set in Netlify (not just .env)
4. Ensure redeployed after env var changes

Contact with:
- Function logs (from Netlify Dashboard)
- Browser console logs
- Screenshot of error banner (if visible)
- Which plan was clicked (pro/premium, monthly/annual)

---

## Build Status

```bash
npm run build
```

✅ Build successful
✅ TypeScript compilation passed
✅ No errors
✅ Ready for deployment
