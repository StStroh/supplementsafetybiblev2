# Stripe Setup Verification Report

## Summary

The Premium page and checkout function have been updated to support the new 3-tier pricing structure:

- **Starter (Free)**: $0 - No checkout, redirects to /search
- **Pro**: $29/month or $24/month (annual) - Most Popular
- **Premium**: $79/month or $66/month (annual)

## Environment Variables Status

### Required in Netlify Dashboard

The checkout function now supports **both** naming conventions:

**Preferred (standardized):**
- `PRICE_PRO_MONTHLY`
- `PRICE_PRO_ANNUAL`
- `PRICE_PREMIUM_MONTHLY`
- `PRICE_PREMIUM_ANNUAL`

**Legacy (fallback):**
- `VITE_STRIPE_PRICE_PRO`
- `VITE_STRIPE_PRICE_PRO_ANNUAL`
- `VITE_STRIPE_PRICE_PREMIUM`
- `VITE_STRIPE_PRICE_PREMIUM_ANNUAL`

### Current Local .env Values

```
VITE_STRIPE_PRICE_PRO=price_1SSERBLSpIuKqlsUsWSDz8n6
VITE_STRIPE_PRICE_PRO_ANNUAL=price_1SSERBLSpIuKqlsUsWSDz8n6
VITE_STRIPE_PRICE_PREMIUM=price_1SSb9jLSpIuKqlsUMRo6AxHg
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_1SSb9jLSpIuKqlsUMRo6AxHg
```

**⚠️ WARNING**: Pro monthly and annual are using the SAME price ID. This should be fixed in Stripe to have separate price IDs.

## Checkout Function Updates

The `create-checkout-session.cjs` function now:

1. ✅ Accepts new payload format: `{ tier: "pro|premium", cadence: "monthly|annual" }`
2. ✅ Still supports legacy format: `{ plan: "pro|premium", billing_interval: "month|year" }`
3. ✅ Falls back from `PRICE_*` to `VITE_STRIPE_PRICE_*` env vars
4. ✅ Returns proper error messages with env var diagnostics
5. ✅ Redirects cancel_url to `/premium` instead of `/pricing`

## Verification Checklist

To verify the deployment is working:

### 1. Environment Variables in Netlify

Go to Netlify Dashboard → Site Settings → Environment Variables and confirm:

```
┌──────────────────────────────┬─────────┬───────────────────────┐
│ Variable Name                │ Status  │ Expected Format       │
├──────────────────────────────┼─────────┼───────────────────────┤
│ PRICE_PRO_MONTHLY            │ ⬜ PASS │ price_xxxxx...        │
│ PRICE_PRO_ANNUAL             │ ⬜ PASS │ price_xxxxx...        │
│ PRICE_PREMIUM_MONTHLY        │ ⬜ PASS │ price_xxxxx...        │
│ PRICE_PREMIUM_ANNUAL         │ ⬜ PASS │ price_xxxxx...        │
└──────────────────────────────┴─────────┴───────────────────────┘
```

### 2. Functional Tests

```
┌──────────────────────────────┬─────────┬───────────────────────┐
│ Test                         │ Status  │ Details               │
├──────────────────────────────┼─────────┼───────────────────────┤
│ Function Reachable           │ ⬜ PASS │ POST to /.netlify/... │
│ Session URL Present          │ ⬜ PASS │ Returns { url: ... }  │
│ Premium Page Loads           │ ⬜ PASS │ GET /premium → 200    │
│ Monthly Toggle Works         │ ⬜ PASS │ Shows $29 and $79     │
│ Annual Toggle Works          │ ⬜ PASS │ Shows $24 and $66     │
│ Free Tier → /search          │ ⬜ PASS │ No checkout call      │
│ Pro → Checkout               │ ⬜ PASS │ Stripe redirect       │
│ Premium → Checkout           │ ⬜ PASS │ Stripe redirect       │
└──────────────────────────────┴─────────┴───────────────────────┘
```

## Testing in Production

### Manual Test Steps:

1. Visit `https://supplementsafetybible.com/premium`
2. Toggle between Monthly and Annual - verify prices change
3. Click "Start Free" on Starter - should go to /search
4. Click "Get Pro" - should redirect to Stripe checkout
5. Click "Get Premium" - should redirect to Stripe checkout

### Using cURL:

```bash
curl -X POST https://supplementsafetybible.com/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"tier":"pro","cadence":"monthly"}'
```

Expected response:
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

## Known Issues

1. **Pro Monthly and Annual use same Price ID** - This needs to be fixed in Stripe Dashboard by creating separate annual price
2. **Premium Monthly and Annual use same Price ID** - Same issue as above

## Next Steps

1. ✅ Deploy to Netlify
2. ⬜ Verify environment variables are set in Netlify Dashboard
3. ⬜ Create proper annual price IDs in Stripe for Pro ($24/mo = $288/year)
4. ⬜ Create proper annual price IDs in Stripe for Premium ($66/mo = $792/year)
5. ⬜ Update Netlify environment variables with new price IDs
6. ⬜ Test all checkout flows
7. ⬜ Verify Stripe webhook handling for new price IDs

## Rollback Instructions

If the new deployment breaks checkout:

1. In Netlify Dashboard, go to Deploys
2. Find the last working deploy (before today)
3. Click "..." → "Publish deploy"
4. This will instantly rollback to the working version

The old version should work because the checkout function now supports BOTH payload formats.
