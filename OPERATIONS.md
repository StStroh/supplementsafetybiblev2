# Operations Guide

**Production Monitoring & Incident Response**

---

## 🚨 Critical Log Patterns

When reviewing Netlify function logs, watch for these patterns that indicate breakage:

### 1. **Auth Failures**

**Pattern:**
```
[AUTH] Missing bearer token
[AUTH] Invalid token or missing email
[AUTH] No session found - access denied
```

**What it means:** Users cannot authenticate or access protected features

**Where to check:**
- Netlify Functions logs for `me.cjs`
- Browser console on `/check` or `/account` pages
- Supabase auth metrics dashboard

**Action:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Netlify dashboard
2. Check Supabase auth settings (confirm signup enabled, email templates configured)
3. Verify frontend is using correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Check for Supabase service degradation at status.supabase.com

---

### 2. **Tier Resolution Failures**

**Pattern:**
```
[TIER] Failed to resolve premium status: 500
[TIER] Profile query error for [email]: [error]
[TIER] No profile found for [email] - defaulting to non-premium
[TIER] Error fetching user plan: [error]
[TIER] Access denied - user is not premium
```

**What it means:** System cannot determine user's subscription tier

**Where to check:**
- Netlify Functions logs for `me.cjs`
- Supabase `profiles` table (check if rows exist for users)
- Frontend console on `/check` page

**Action:**
1. Query Supabase `profiles` table for affected user email
2. Verify `profiles` table has correct columns: `id`, `email`, `plan`, `is_premium`, `subscription_status`
3. Check RLS policies on `profiles` table (should allow service role access)
4. If profile missing: user may have signed up before profile creation trigger was added
5. **Fail-safe behavior:** System defaults to `free` / non-premium on error (no accidental premium access)

---

### 3. **Stripe Checkout Errors**

**Pattern:**
```
❌ Missing STRIPE_SECRET_KEY
❌ Stripe key mismatch: expecting LIVE key (sk_live_)
❌ Invalid tier received: [tier]
❌ Price mismatch: [details]
❌ Stripe checkout error: [message]
[STRIPE] Checkout failed for [email]: [reason]
```

**What it means:** Payment flow is broken

**Where to check:**
- Netlify Functions logs for `create-checkout-session.cjs`
- Stripe dashboard → Developers → Logs
- Stripe dashboard → Products (verify price IDs match)

**Action:**
1. Verify in Netlify dashboard:
   - `STRIPE_SECRET_KEY` is set and starts with `sk_live_`
   - Price IDs match those in `netlify/functions/_lib/plan-map.cjs`
2. Check Stripe dashboard:
   - API key is active (not deleted/revoked)
   - Products and prices exist and are active
   - Webhook endpoint is configured correctly
3. If price mismatch: Stripe price amounts may have changed - update `EXPECTED` values in `create-checkout-session.cjs`
4. **Fail-safe behavior:** Invalid checkout requests return error (user not charged, no access granted)

---

### 4. **Stripe Webhook Failures**

**Pattern:**
```
Invalid signature (400 response to webhook)
[WEBHOOK] Failed to update profile for [customer_id]
[WEBHOOK] Unknown price ID: [price_id]
```

**What it means:** Subscription updates not syncing to database

**Where to check:**
- Stripe dashboard → Developers → Webhooks → [your endpoint] → Recent deliveries
- Netlify Functions logs for `stripe-webhook.cjs`
- Supabase `events_log` table (if exists)

**Action:**
1. Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard webhook signing secret
2. Check webhook endpoint URL in Stripe is correct (https://[your-domain]/.netlify/functions/stripe-webhook)
3. Ensure webhook is set to LIVE mode (not test mode)
4. Check events being sent: should include `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
5. If signature fails: webhook secret may have been rotated - update in Netlify
6. **Fail-safe behavior:** Failed webhooks retry automatically (Stripe retries for 72 hours)

---

## 📊 Health Check Endpoints

### Quick Health Check
```bash
curl https://supplementsafetybible.com/.netlify/functions/health
```
Expected: `{"ok":true}`

### Database Connectivity
```bash
curl https://supplementsafetybible.com/.netlify/functions/db-health
```
Expected: `{"ok":true, "supplements_count": [number], "medications_count": [number]}`

### Stripe Configuration
```bash
curl -X POST https://supplementsafetybible.com/.netlify/functions/stripe-health \
  -H "Content-Type: application/json"
```
Expected: `{"ok":true, "mode":"live"}`

---

## 🔒 Fail-Safe Behaviors

These are baked into the system to prevent damage:

1. **Auth fails closed:** If session invalid → user treated as logged out (no access to premium features)
2. **Tier defaults to free:** If tier cannot be resolved → user treated as free tier (no accidental premium access)
3. **Stripe validates price:** If price ID invalid → checkout fails (user not charged)
4. **Profile creation is idempotent:** Multiple calls to create profile for same user → only one created
5. **Webhook validates signature:** If signature invalid → event rejected (no unauthorized updates)

---

## 🩺 Data Integrity

### Verify Profile Exists for User

```sql
-- Run in Supabase SQL Editor
SELECT id, email, plan, is_premium, subscription_status, created_at
FROM profiles
WHERE email = '[user-email]';
```

If no row: User signed up but profile not created (rare edge case)

**Fix:**
```sql
INSERT INTO profiles (id, email, plan, is_premium, subscription_status, created_at)
VALUES ('[user-id-from-auth.users]', '[email]', 'starter', false, null, now())
ON CONFLICT (email) DO NOTHING;
```

### Verify Subscription Status Matches Stripe

1. Get Stripe customer ID from profile:
   ```sql
   SELECT stripe_customer_id FROM profiles WHERE email = '[email]';
   ```

2. Check Stripe dashboard → Customers → [customer_id]

3. If mismatch: Re-trigger webhook or manually update:
   ```sql
   UPDATE profiles
   SET plan = 'pro', is_premium = true, subscription_status = 'active'
   WHERE email = '[email]';
   ```

---

## 🔍 Common Issues

### Issue: User paid but still sees free tier

**Debug:**
1. Check Netlify logs for `stripe-webhook.cjs` around payment time
2. Check Stripe webhook delivery status (should show 200 response)
3. Query `profiles` table for user email - check `is_premium`, `plan`, `subscription_status`

**Fix:**
- If webhook failed: Retry delivery from Stripe dashboard
- If webhook succeeded but DB not updated: Check RLS policies on `profiles` (service role should have full access)
- Emergency manual fix:
  ```sql
  UPDATE profiles
  SET is_premium = true, plan = 'pro', subscription_status = 'active', trial_used = true
  WHERE email = '[email]';
  ```

### Issue: User cannot access /check page

**Debug:**
1. Check browser console for errors
2. Check if user is logged in (session exists)
3. Check Netlify logs for auth-related errors

**Fix:**
- If session expired: User needs to log in again
- If profile missing: Create profile row (see Data Integrity section)
- If RLS blocking: Verify auth.uid() matches profile.id

### Issue: Checkout button does nothing

**Debug:**
1. Check browser console for errors
2. Check Network tab for failed API calls
3. Check Netlify logs for `create-checkout-session.cjs`

**Fix:**
- If CORS error: Verify function returns correct headers
- If 401 error: User not logged in
- If 500 error: Check environment variables (STRIPE_SECRET_KEY, price IDs)

---

## 🛠️ Emergency Procedures

### Disable Stripe Checkout (Emergency Revenue Brake)

Set environment variable in Netlify:
```
STRIPE_ENABLED=false
```

Then add check in `create-checkout-session.cjs`:
```javascript
if (process.env.STRIPE_ENABLED === 'false') {
  return fail(503, 'Checkout temporarily disabled for maintenance', origin);
}
```

### Force All Users to Free (Emergency Downgrade)

**⚠️ ONLY IN EMERGENCY - THIS IS DESTRUCTIVE**

```sql
UPDATE profiles
SET is_premium = false, plan = 'starter', subscription_status = 'canceled'
WHERE is_premium = true;
```

### Clear Auth Sessions (Force Re-login)

Users will need to log in again. Not reversible.

In Supabase Dashboard → Authentication → Users → Select all → Sign out

---

## 📞 Escalation

If issue persists after following runbook:

1. Check Supabase status: https://status.supabase.com
2. Check Netlify status: https://www.netlifystatus.com
3. Check Stripe status: https://status.stripe.com
4. Review recent deployments for breaking changes
5. Roll back to last known good deployment

---

**Last Updated:** 2025-12-21
