# Guest Checkout & Amazon Pay Implementation

## Overview

This document describes the implementation of guest checkout flow and Amazon Pay support for the Supplement Safety Bible application.

**Status:** ✅ Implemented and ready for deployment
**Date:** 2025-12-26

---

## Features Implemented

### 1. Guest Checkout Flow

Users can now purchase Pro or Premium plans **without creating an account first**:

1. User clicks "Sign up for Pro" or "Sign up for Premium" on pricing page
2. User is **immediately redirected to Stripe Checkout** (no auth required)
3. Stripe collects email and payment information
4. After successful payment:
   - Webhook creates Supabase auth user automatically
   - Magic link email is sent to user's email
   - User can sign in via magic link to access their account

### 2. Amazon Pay Support

Checkout sessions now support multiple payment methods:
- **Credit/Debit Cards** (Visa, Mastercard, Amex, etc.)
- **Cash App Pay**
- **Klarna** (where available)
- **Amazon Pay** (where enabled)

---

## Technical Implementation

### Files Modified

#### 1. `netlify/functions/create-checkout-session.cjs`

**Changes:**
- Made authentication **optional** (not required)
- Added support for both authenticated and guest checkout
- Enabled multiple payment methods: `['card', 'cashapp', 'klarna', 'amazon_pay']`
- Added `guest_checkout` flag to metadata for tracking
- Uses `client_reference_id` to track guest checkouts

**Key Features:**
```javascript
// Check if user is authenticated (optional)
const authHeader = event.headers.authorization || event.headers.Authorization;
let isGuestCheckout = true;

if (authHeader) {
  // Link to existing user if authenticated
  // Use existing Stripe customer ID if available
} else {
  // Create new checkout session without auth requirement
  // Track via client_reference_id
}

// Enable multiple payment methods
payment_method_types: ['card', 'cashapp', 'klarna', 'amazon_pay']
```

#### 2. `netlify/functions/stripe-webhook.cjs`

**Changes:**
- Added `createAuthUserAndSendMagicLink()` function
- Detects guest checkout via `metadata.guest_checkout === 'true'`
- Creates Supabase auth user via admin API
- Sends magic link email automatically
- Links subscription to user profile

**Key Features:**
```javascript
// For guest checkouts
if (isGuestCheckout) {
  // 1. Check if auth user exists
  let authUser = await getAuthUserByEmail(email);

  if (!authUser) {
    // 2. Create auth user via admin API
    const { data: newUser } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true, // Auto-confirm
      user_metadata: {
        created_via: 'stripe_checkout',
      },
    });
  }

  // 3. Send magic link
  await supabase.auth.signInWithOtp({ email });

  // 4. Create profile linked to auth user
  updates.id = authUser.id;
}
```

#### 3. `src/pages/Success.tsx`

**Changes:**
- Detects if user is logged in or not
- Shows different messaging for guest vs authenticated users
- Provides "Resend Sign-In Link" button for guest checkout
- Conditionally renders CTAs based on auth state

**Guest Checkout UI:**
- Headline: "Payment Successful!"
- Message: "Check your email to sign in and access your account"
- Blue info banner with email address
- "Send Sign-In Link" button
- "Return to Home" link

**Authenticated User UI:**
- Headline: "Welcome to Premium!"
- Message: "Your subscription has been successfully activated"
- "Start Checking Interactions" button
- "Manage Account" button

---

## User Flow

### Guest Checkout Flow (New Customer)

```
1. User visits /pricing
   └─ Not logged in

2. User clicks "Sign up for Pro"
   └─ Immediately redirects to Stripe Checkout
   └─ NO auth screen, NO forced login

3. User enters payment info on Stripe
   ├─ Email: user@example.com
   ├─ Payment method: Amazon Pay (or card, Cash App, etc.)
   └─ Completes payment

4. Stripe processes payment
   └─ Creates subscription
   └─ Sends webhook to our server

5. Webhook handler receives event
   ├─ Creates Supabase auth user
   ├─ Creates profile with subscription details
   ├─ Sends magic link email to user@example.com
   └─ Returns success

6. User redirected to /billing/success
   ├─ Sees "Payment Successful!" message
   ├─ Sees "Check your email" banner
   └─ Can click "Resend Sign-In Link"

7. User checks email
   ├─ Clicks magic link
   └─ Redirected to /auth/callback

8. User signed in automatically
   └─ Can access premium features immediately
```

### Authenticated Checkout Flow (Existing User)

```
1. User visits /pricing
   └─ Already logged in

2. User clicks "Sign up for Pro"
   └─ Auth token sent to checkout function
   └─ Existing Stripe customer ID retrieved

3. Stripe Checkout session created
   └─ Pre-filled with user's email
   └─ Linked to existing customer ID

4. User completes payment
   └─ Subscription linked to existing account

5. Webhook updates existing profile
   └─ Updates subscription status
   └─ Grants premium access

6. User redirected to /billing/success
   ├─ Sees "Welcome to Premium!" message
   ├─ "Start Checking Interactions" button
   └─ "Manage Account" button
```

---

## Amazon Pay Setup

### Prerequisites

1. **Stripe Account** must be eligible for Amazon Pay
   - Available in select regions (US, UK, EU, JP)
   - Account must be verified
   - Business information must be complete

### Enable Amazon Pay in Stripe Dashboard

#### Step 1: Navigate to Payment Methods

1. Log in to **Stripe Dashboard**
2. Go to **Settings** (top right)
3. Click **Payment methods** in the left sidebar
4. Scroll to **Wallets** section

#### Step 2: Enable Amazon Pay

1. Find **Amazon Pay** in the wallets list
2. Click the toggle to **Enable**
3. Review Amazon Pay terms and conditions
4. Click **Enable Amazon Pay**

#### Step 3: Configure Amazon Pay Settings

1. **Display Name**: Enter your business name (shown to customers)
2. **Return URL**: Should be your success page (auto-configured)
3. **Business Type**: Select your business type
4. **Business Location**: Select your primary business location

#### Step 4: Complete Amazon Pay Merchant Setup

1. You'll be redirected to **Amazon Pay merchant central**
2. Create an Amazon Pay merchant account (if you don't have one)
3. Complete the onboarding:
   - Business information
   - Bank account details
   - Identity verification
4. Return to Stripe Dashboard

#### Step 5: Test Amazon Pay

1. Use Stripe **test mode** first
2. Create a test checkout session
3. Select **Amazon Pay** as payment method
4. Use Amazon's test credentials
5. Complete test payment
6. Verify webhook received and user created

#### Step 6: Go Live

1. Switch to **live mode** in Stripe
2. Verify Amazon Pay is enabled in live mode
3. Test with real Amazon account (small amount)
4. Monitor first transactions carefully

### Verification Checklist

- [ ] Amazon Pay appears in Stripe payment methods list
- [ ] Amazon Pay enabled for both test and live modes
- [ ] Merchant account linked successfully
- [ ] Test checkout completed successfully
- [ ] Webhook received and processed correctly
- [ ] User account created via guest checkout
- [ ] Magic link email sent successfully
- [ ] Customer can access premium features

---

## Environment Variables

### Required Variables (Already Set)

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PRICE_PRO=price_1SSERBLSpIuKqlsUsWSDz8n6
VITE_STRIPE_PRICE_PRO_ANNUAL=price_1SSEW2LSpIuKqlsUKw2UAglX
VITE_STRIPE_PRICE_PREMIUM=price_1SSb9jLSpIuKqlsUMRo6AxHg
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_1SSbB0LSpIuKqlsUCJP8sL8q

# Supabase Configuration
SUPABASE_URL=https://cyxfxjoadzxhxwxjqkez.supabase.co
SUPABASE_SERVICE_ROLE_KEY=... (set in Netlify dashboard)

# Webhook Configuration
STRIPE_WEBHOOK_SECRET=whsec_... (set in Netlify dashboard)

# Checkout URLs
CHECKOUT_SUCCESS_URL=https://supplementsafetybible.com/billing/success?session_id={CHECKOUT_SESSION_ID}
CHECKOUT_CANCEL_URL=https://supplementsafetybible.com/pricing?cancelled=1

# Site URL (for magic links)
SITE_URL=https://supplementsafetybible.com
```

### Optional Variables

```bash
# Trial Period (days)
TRIAL_DAYS_PRO=14

# Enable debug logging
DEBUG_WEBHOOK=true
```

---

## Testing

### Test Guest Checkout

1. **Open incognito/private window** (to ensure not logged in)
2. Navigate to `/pricing`
3. Click "Sign up for Pro"
4. Should redirect to Stripe Checkout **immediately**
5. Enter test email: `test+guest@example.com`
6. Select payment method (use test card: `4242 4242 4242 4242`)
7. Complete payment
8. Should redirect to `/billing/success`
9. Should see "Payment Successful!" message
10. Should see blue "Check your email" banner
11. Check email inbox for magic link
12. Click magic link
13. Should be signed in automatically
14. Should have premium access

### Test Authenticated Checkout

1. **Log in first** (any existing account)
2. Navigate to `/pricing`
3. Click "Sign up for Pro"
4. Should redirect to Stripe Checkout
5. Email should be **pre-filled**
6. Complete payment
7. Should redirect to `/billing/success`
8. Should see "Welcome to Premium!" message
9. Should have buttons "Start Checking Interactions" and "Manage Account"
10. Should have premium access immediately

### Test Amazon Pay

1. Ensure Amazon Pay is enabled in Stripe Dashboard
2. Start guest checkout flow
3. On Stripe Checkout page, look for **Amazon Pay** button
4. Click Amazon Pay
5. Sign in with Amazon account
6. Complete payment
7. Should work same as card payment

**Note:** Amazon Pay may not appear if:
- Your account is not in a supported region
- Amazon Pay is not enabled in Stripe settings
- Customer's billing address is not in a supported country

### Test Webhook

1. Use Stripe CLI to forward webhooks locally:
   ```bash
   stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
   ```

2. Create test checkout session

3. Complete payment in Stripe

4. Check webhook logs:
   ```bash
   # Should see:
   [webhook] Processing checkout.session.completed: cs_test_xxx
   [webhook] Email: test@example.com Plan: pro Guest: true
   [webhook] Creating auth user for guest checkout: test@example.com
   [webhook] Auth user created: uuid-xxx
   [webhook] Magic link sent to: test@example.com
   [webhook] Profile created: uuid-xxx
   ```

5. Verify in Supabase:
   - Check `auth.users` table for new user
   - Check `profiles` table for new profile
   - Verify `plan` is set correctly
   - Verify `stripe_customer_id` and `stripe_subscription_id` are set

### Test Magic Link

1. After guest checkout, check email
2. Should receive email with subject like "Confirm your signup"
3. Click link in email
4. Should redirect to `/auth/callback`
5. Should be signed in automatically
6. Navigate to `/account`
7. Should see subscription details
8. Should have premium access

### Test Resend Magic Link

1. Complete guest checkout
2. On success page, click "Resend Sign-In Link"
3. Should see "Sending..." state
4. Should change to "Sign-In Link Sent!"
5. Check email for new magic link
6. Click link and verify sign-in works

---

## Monitoring

### Stripe Dashboard

Monitor these metrics:
- **Checkout Sessions Created**: Should increase with guest checkouts
- **Successful Payments**: Track conversion rate
- **Failed Payments**: Investigate any failures
- **Payment Methods Used**: Track Amazon Pay vs card usage
- **Webhook Delivery**: Ensure all webhooks delivered successfully

### Supabase Dashboard

Monitor these tables:
- **auth.users**: New users created via guest checkout
- **profiles**: Profiles with subscription details
- **events_log**: Webhook events received

### Netlify Functions

Monitor function logs:
- **create-checkout-session**: Should show guest vs authenticated checkouts
- **stripe-webhook**: Should show successful user creation
- Check for errors in function execution

---

## Troubleshooting

### Amazon Pay Not Showing

**Problem:** Amazon Pay button doesn't appear at Stripe Checkout

**Solutions:**
1. Verify Amazon Pay is enabled in Stripe Dashboard
2. Check your Stripe account region (must be supported)
3. Ensure merchant account is approved
4. Try different customer billing address (must be in supported country)
5. Check `payment_method_types` array includes `'amazon_pay'`

### Magic Link Not Received

**Problem:** Guest checkout user doesn't receive magic link email

**Solutions:**
1. Check webhook logs for errors
2. Verify `SITE_URL` environment variable is set
3. Check Supabase SMTP settings
4. Check spam folder
5. Use "Resend Sign-In Link" button on success page
6. Verify email in Supabase auth.users table

### Webhook Not Creating User

**Problem:** Checkout completes but user not created

**Solutions:**
1. Check webhook logs in Netlify functions
2. Verify webhook secret is correct
3. Check Supabase service role key permissions
4. Verify `metadata.guest_checkout` flag is set
5. Check for errors in `createAuthUserAndSendMagicLink` function

### Subscription Not Linked

**Problem:** User created but subscription not showing in profile

**Solutions:**
1. Check `stripe_customer_id` in profiles table
2. Verify `stripe_subscription_id` is set
3. Check webhook handled `checkout.session.completed` event
4. Verify price ID in subscription matches plan-map.cjs
5. Check `subscription_status` field

### User Can't Access Premium Features

**Problem:** User signed in but doesn't have premium access

**Solutions:**
1. Check `is_premium` field in profiles table (should be `true`)
2. Verify `plan` field (should be `pro_trial` or `premium_trial`)
3. Check `subscription_status` (should be `trialing` or `active`)
4. Verify RLS policies allow access
5. Check browser console for API errors

---

## Security Considerations

### Auth User Creation

- Users created via `admin.createUser()` with auto-confirmed email
- No password required (passwordless auth via magic links)
- User metadata includes `created_via: 'stripe_checkout'`
- Links auth user to profile via UUID

### Webhook Security

- Webhook signature verified via `stripe.webhooks.constructEvent()`
- Service role key used only in backend functions
- Idempotency via `events_log` table (prevents duplicate processing)

### Profile Security

- RLS policies prevent unauthorized access
- Only user's own profile visible
- Subscription details not exposed to unauthorized users

### Magic Link Security

- Links expire after 1 hour (Supabase default)
- One-time use only
- Sent to email confirmed by Stripe payment
- Redirect to `/auth/callback` (controlled endpoint)

---

## FAQ

### Q: Can users still create accounts before checkout?

**A:** Yes! The free/starter plan flow still requires account creation via `/auth`. Only paid plans (Pro/Premium) support guest checkout.

### Q: What if user already has an account with that email?

**A:** The webhook checks for existing auth user by email. If found, it links the subscription to the existing account instead of creating a duplicate.

### Q: Can logged-in users use guest checkout?

**A:** No. If user is logged in, the checkout function detects the auth token and uses authenticated checkout flow (links to existing customer ID).

### Q: How long does the magic link last?

**A:** Magic links expire after 1 hour (Supabase default). Users can request a new link via the "Resend Sign-In Link" button.

### Q: What if magic link email fails to send?

**A:** The success page provides a "Resend Sign-In Link" button. Users can also contact support with their email to manually send the link.

### Q: Does guest checkout work with coupons?

**A:** Yes! The checkout session includes `allow_promotion_codes: true`, so users can enter coupon codes during checkout.

### Q: What happens if webhook fails?

**A:** Stripe retries webhooks automatically. The subscription is created in Stripe regardless, and can be manually linked via admin tools if needed.

### Q: Can I disable guest checkout?

**A:** Yes, but it's not recommended. You can add auth check in `create-checkout-session.cjs` to require authentication before checkout.

---

## Deployment Checklist

Before deploying to production:

### Code Deployment
- [ ] All files committed to Git
- [ ] Build succeeds without errors
- [ ] No TypeScript errors
- [ ] No ESLint warnings

### Stripe Configuration
- [ ] Live mode Stripe keys in Netlify env vars
- [ ] Amazon Pay enabled in Stripe Dashboard
- [ ] Amazon Pay merchant account approved
- [ ] Webhook endpoint configured in Stripe
- [ ] Webhook secret in Netlify env vars
- [ ] Test mode payment successful
- [ ] Live mode test payment successful

### Supabase Configuration
- [ ] Service role key in Netlify env vars
- [ ] RLS policies enabled on profiles table
- [ ] Auth email templates customized
- [ ] SMTP configured for magic links
- [ ] Test magic link email received

### Environment Variables
- [ ] `SITE_URL` set to production domain
- [ ] `CHECKOUT_SUCCESS_URL` points to production
- [ ] `CHECKOUT_CANCEL_URL` points to production
- [ ] All Stripe price IDs verified
- [ ] Service role key verified

### Testing
- [ ] Guest checkout end-to-end test
- [ ] Authenticated checkout test
- [ ] Amazon Pay payment test
- [ ] Magic link email test
- [ ] Webhook processing test
- [ ] Profile creation test
- [ ] Premium access test
- [ ] Resend magic link test

### Monitoring
- [ ] Netlify function logs accessible
- [ ] Stripe webhook delivery monitoring
- [ ] Supabase database monitoring
- [ ] Error alerting configured

---

## Support

For issues or questions:

1. **Check Netlify function logs** for errors
2. **Check Stripe webhook logs** for delivery status
3. **Check Supabase auth.users** table for user creation
4. **Check Supabase profiles** table for subscription linkage
5. **Contact Stripe support** for Amazon Pay issues
6. **Contact Supabase support** for email delivery issues

---

**Last Updated:** 2025-12-26
**Status:** ✅ Ready for Production
**Version:** 1.0.0
