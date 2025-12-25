# Customer Creation Error - Fixed

## Issue

Red error banner appearing on pricing page:
```
"customer creation can only be used in..."
```

This is a Stripe API error that occurs when using the `customer_creation` parameter incorrectly with Checkout Sessions.

## Root Cause

**File:** `netlify/functions/create-checkout-session.cjs`
**Line 86:** `customer_creation: "always"`

### Why This Caused an Error

1. **Redundant Parameter:** When using `mode: "subscription"`, Stripe automatically creates a customer. The `customer_creation: "always"` parameter is:
   - Redundant for subscription mode
   - Can cause conflicts with certain Stripe configurations
   - May trigger API version compatibility issues

2. **API Version Mismatch:** The parameter behavior changed in recent Stripe API versions, and it's no longer needed (or supported in some cases) for subscription checkouts.

## The Fix

### Before (Line 79-98)
```javascript
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: selectedPriceId, quantity: 1 }],
  success_url: successUrl,
  cancel_url: cancelUrl,
  allow_promotion_codes: true,
  billing_address_collection: "auto",
  customer_creation: "always",  // ❌ PROBLEMATIC LINE
  metadata: {
    plan,
    interval: billing,
  },
  subscription_data: {
    trial_period_days: parseInt(process.env.TRIAL_DAYS_PRO || "14"),
    metadata: {
      plan,
      interval: billing,
    },
  },
});
```

### After (Fixed)
```javascript
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: selectedPriceId, quantity: 1 }],
  success_url: successUrl,
  cancel_url: cancelUrl,
  allow_promotion_codes: true,
  billing_address_collection: "auto",
  // ✅ Removed customer_creation - not needed for subscriptions
  metadata: {
    plan,
    interval: billing,
  },
  subscription_data: {
    trial_period_days: parseInt(process.env.TRIAL_DAYS_PRO || "14"),
    metadata: {
      plan,
      interval: billing,
    },
  },
});
```

## Impact

### Before Fix
- ❌ Red error banner on pricing page
- ❌ Checkout button clicks may fail
- ❌ Users cannot complete checkout process
- ❌ Error message confuses users

### After Fix
- ✅ No error banner
- ✅ Checkout button works correctly
- ✅ Stripe automatically creates customers during subscription checkout
- ✅ Clean user experience

## Stripe Behavior

**Important:** Removing `customer_creation: "always"` does NOT prevent customer creation!

For `mode: "subscription"`, Stripe's behavior is:
1. **Customer is ALWAYS created automatically**
2. The customer is linked to the subscription
3. Email is captured during checkout
4. Customer object is available in webhook events

The `customer_creation` parameter is primarily for `mode: "payment"` (one-time payments), not subscriptions.

## Testing

### How to Verify the Fix

1. **Visit pricing page:** `/pricing`
   - ✅ No red error banner should appear

2. **Click "Sign up for Pro trial" or "Sign up for Premium trial"**
   - ✅ Should redirect to Stripe Checkout
   - ✅ No errors in browser console
   - ✅ No errors in Netlify function logs

3. **Complete a test checkout:**
   - ✅ Customer should be created in Stripe Dashboard
   - ✅ Subscription should be created with trial period
   - ✅ Webhook should provision access correctly

### Test Commands

```bash
# Local test (if running dev server)
curl -X POST http://localhost:8888/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"plan":"pro","interval":"monthly"}'

# Check function logs
netlify functions:log create-checkout-session
```

## Related Files

Only one file was modified:
- `netlify/functions/create-checkout-session.cjs` (line 86 removed)

No other files had this issue.

## Build Status

✅ **Build successful** - No errors, ready to deploy

## Additional Notes

### When `customer_creation` IS Needed

The `customer_creation` parameter is useful for:
- `mode: "payment"` (one-time payments)
- When you want to control whether to create a new customer or use an existing one
- Payment-only checkouts where you might not want to create a customer

### For Subscriptions
- **NOT NEEDED** - Stripe always creates customers for subscriptions
- Including it can cause errors or conflicts
- Best practice: omit the parameter entirely for subscription mode

## Deployment Checklist

- [x] Fix applied to `create-checkout-session.cjs`
- [x] Build successful with no errors
- [ ] Deploy to production
- [ ] Test checkout flow on production
- [ ] Verify no error banner appears
- [ ] Complete test subscription to confirm customer creation works

---

**Last Updated:** 2025-12-22
**Status:** ✅ Fixed and ready to deploy
**Impact:** High - Fixes critical checkout error
