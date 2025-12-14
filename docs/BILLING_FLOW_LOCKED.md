# Billing Flow Documentation

**Status:** LOCKED AND VERIFIED
**Date:** 2025-12-14
**Version:** 1.0 Production

---

## DO NOT MODIFY

This billing flow is **verified working in production**. Any changes to the files or logic described here must go through full staging validation with real Stripe test payments.

---

## Overview

The Supplement Safety Bible billing system integrates Stripe checkout with Supabase profiles to control premium feature access. This document is the single source of truth for how the system works.

---

## Critical Database Table

All subscription data lives in: `public.profiles`

**Key Columns for Entitlement:**
- `is_premium` (boolean) - Main gate for premium access
- `plan` (text) - Detailed plan state: `'starter'`, `'pro'`, `'premium'`, `'pro_trial'`, `'premium_trial'`
- `subscription_status` (text) - Stripe status: `'active'`, `'trialing'`, `'past_due'`, `'canceled'`
- `stripe_customer_id` (text) - Links to Stripe customer
- `stripe_subscription_id` (text) - Links to Stripe subscription
- `current_period_end` (bigint) - Unix timestamp for renewal date

---

## Payment Flow (Step by Step)

### 1. Checkout Initiation
**File:** `netlify/functions/create-checkout-session.cjs`

- User clicks "Start Trial" or "Subscribe"
- Frontend calls `/create-checkout-session` with tier (e.g., `pro_monthly`)
- Function checks if profile exists, creates if needed
- Creates or retrieves Stripe customer
- Checks trial eligibility (profiles.trial_used)
- Creates Stripe Checkout Session with 14-day trial if eligible
- Returns session URL, user redirected to Stripe

### 2. Payment Success
**Redirect:** `/premium/thanks?session_id=xxx`

Customer completes payment, Stripe redirects to success page.

### 3. Immediate Entitlement (Synchronous)
**File:** `netlify/functions/retrieve-session.cjs`
**File:** `netlify/functions/_lib/upsertEntitlement.cjs`

Success page immediately calls:
```javascript
GET /.netlify/functions/retrieve-session?session_id=xxx
```

**What happens:**
1. Retrieves Stripe session with expanded subscription data
2. Extracts price ID, status, customer info
3. Calls `upsertEntitlement()` which:
   - Maps price ID to plan (pro/premium)
   - Sets `is_premium = true` if status is active/trialing
   - Sets `plan` (e.g., `'pro_trial'` or `'pro'`)
   - Sets `subscription_status`
   - Updates `profiles` table via upsert on email

**Result:** Customer gets instant access (within 1-2 seconds)

### 4. Webhook Confirmation (Asynchronous)
**File:** `netlify/functions/stripe-webhook.cjs`

Stripe sends webhook events (arrives within 5-30 seconds):

**Event:** `checkout.session.completed`
- Re-confirms subscription data
- Updates same fields as step 3
- Marks trial as used (`trial_used = true`)

**Event:** `customer.subscription.updated`
- Handles plan changes, renewals
- Updates `is_premium`, `plan`, `subscription_status`

**Event:** `invoice.payment_failed`
- Sets `is_premium = false`
- Sets `subscription_status = 'past_due'`

**Event:** `customer.subscription.deleted`
- Sets `is_premium = false`
- Sets `plan = 'starter'`
- Clears subscription ID

---

## Dashboard Access Gate

**File:** `src/pages/PremiumDashboard.tsx`

Dashboard loads and:
1. Checks Supabase auth session
2. Calls `/.netlify/functions/me` with auth token
3. `/me` queries profiles table and returns `isPremium` boolean
4. If `isPremium === false`, redirects to `/pricing`
5. If `isPremium === true`, shows dashboard

**Entitlement Logic in `/me`:**
```javascript
isPremium: Boolean(data?.is_premium)
```

Simple boolean check. No complex logic.

---

## Why This Works

1. **Immediate access:** `retrieve-session` updates profiles instantly on redirect
2. **Reliable confirmation:** Webhook double-checks and handles edge cases
3. **Simple gate:** Dashboard just checks `is_premium` boolean
4. **No race conditions:** Both paths write same data to same table
5. **Trial handling:** Single field `trial_used` prevents abuse

---

## Critical Dependencies

### Environment Variables (Netlify)
- `STRIPE_SECRET_KEY` - Must be LIVE mode (`sk_live_...`)
- `STRIPE_WEBHOOK_SECRET` - For webhook signature verification
- `SUPABASE_URL` - Database connection
- `SUPABASE_SERVICE_ROLE_KEY` - Admin access to profiles table

### Price IDs (Locked)
**File:** `src/lib/stripe/plan-map.cjs`

All price IDs are LIVE mode and must match Stripe dashboard exactly:
- PRO_MONTHLY: `price_1SSERBLSpIuKqlsUsWSDz8n6`
- PRO_YEARLY: `price_1SSEW2LSpIuKqlsUKw2UAglX`
- PREMIUM_MONTHLY: `price_1SSb9jLSpIuKqlsUMRo6AxHg`
- PREMIUM_YEARLY: `price_1SSbB0LSpIuKqlsUCJP8sL8q`

**DO NOT change these without updating Stripe.**

---

## Common Issues and Diagnostics

### Dashboard Stuck on "Loading..."

**Cause:** `is_premium` not set to true in profiles table

**Check:**
1. Open browser console for timeout diagnostic (appears after 10s)
2. Query profiles table: `SELECT email, is_premium, plan, subscription_status FROM profiles WHERE email = 'customer@example.com'`
3. Check webhook logs in Netlify Functions
4. Verify Stripe webhook endpoint is configured and receiving events

### Customer Paid But No Access

**Immediate checks:**
1. Did `retrieve-session` succeed? (Check Netlify function logs)
2. Is `is_premium = true` in profiles table?
3. Is Supabase auth session valid? (Check browser localStorage)
4. Does `/me` endpoint return `isPremium: true`?

**Webhook checks:**
1. Go to Stripe Dashboard → Webhooks
2. Find the webhook endpoint, check recent deliveries
3. Look for `checkout.session.completed` event
4. Check if it succeeded or failed
5. If failed, check signature and environment variables

---

## Prohibited Changes

**DO NOT:**
- Change table name from `profiles` to anything else
- Add complex logic to entitlement checks
- Cache `is_premium` value in frontend (always fetch fresh)
- Modify webhook event handling without testing in Stripe test mode first
- Change price IDs without coordinating with Stripe dashboard
- Skip signature verification in webhooks
- Use `auth.users` table instead of `profiles`

---

## Testing Changes

If you must modify billing logic:

1. **Never test in production first**
2. Set up Stripe test mode with test price IDs
3. Use Stripe test cards (4242 4242 4242 4242)
4. Test all flows:
   - New subscription
   - Trial to paid conversion
   - Subscription update
   - Cancellation
   - Payment failure
5. Verify profiles table updates correctly
6. Test dashboard access gate
7. Only then deploy to production

---

## File Manifest

All files with freeze warnings (DO NOT MODIFY without review):

- `netlify/functions/stripe-webhook.cjs` - Handles all Stripe events
- `netlify/functions/retrieve-session.cjs` - Immediate entitlement grant
- `netlify/functions/_lib/upsertEntitlement.cjs` - Writes to profiles table
- `src/pages/PremiumDashboard.tsx` - Premium access gate
- `netlify/functions/me.cjs` - Returns entitlement status
- `src/lib/stripe/plan-map.cjs` - Price ID mapping
- `netlify/functions/create-checkout-session.cjs` - Checkout creation

---

## Support Escalation

If customers report access issues:

1. Check profiles table `is_premium` column
2. Check Stripe dashboard for their subscription status
3. Check Netlify function logs for errors
4. Verify webhook delivery in Stripe
5. If data is out of sync, manually update profiles table (last resort)

---

**Last Updated:** 2025-12-14
**Verified By:** Production deployment after webhook fix
**Next Review:** Only if modifying billing features
