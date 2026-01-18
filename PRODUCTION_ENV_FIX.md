# URGENT: Fix Production Checkout Error

## The Issue
Users see "Payment Error - Missing session ID" after completing Stripe checkout because the production environment variables point to the wrong success URL.

## Fix Steps (5 minutes)

### 1. Go to Netlify Dashboard
- Visit: https://app.netlify.com
- Select your site: "supplementsafetybible"
- Go to: **Site settings** → **Environment variables**

### 2. Update These Variables

Find and UPDATE (or ADD if missing):

**Variable 1:**
```
Name: CHECKOUT_SUCCESS_URL
Value: https://supplementsafetybible.com/billing/success?session_id={CHECKOUT_SESSION_ID}
```

**Variable 2:**
```
Name: CHECKOUT_CANCEL_URL
Value: https://supplementsafetybible.com/pricing?canceled=true
```

### 3. Deploy the Changes

Option A: Trigger a new deploy
- Go to: **Deploys** → **Trigger deploy** → **Deploy site**

Option B: Clear cache and deploy
- Go to: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### 4. Test

After deployment completes (~2 minutes):
1. Visit: https://supplementsafetybible.com/pricing
2. Click any "Get Started" button
3. Complete checkout with test card: `4242 4242 4242 4242`
4. You should be redirected to the success page WITH the session ID

## What This Does

The `{CHECKOUT_SESSION_ID}` is a **Stripe template variable**. When a user completes checkout:

1. Stripe replaces `{CHECKOUT_SESSION_ID}` with the actual session ID
2. User is redirected to: `https://supplementsafetybible.com/billing/success?session_id=cs_test_abc123...`
3. The success page reads the `session_id` parameter to verify the payment

## Alternative: Remove the Variables

If you can't update them, you can DELETE both variables entirely. The function has fallbacks:
- The code will auto-detect the domain and create the correct URLs
- Fallback success URL: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`
- Fallback cancel URL: `${origin}/pricing?canceled=true`

## Current State

✅ Code is fixed (local + codebase)
❌ Production environment variables are outdated
❌ All checkout attempts fail with "Missing session ID"

## After Fix

✅ Checkout works
✅ Users redirected to correct success page
✅ Session ID properly passed and verified
✅ Premium access granted automatically
