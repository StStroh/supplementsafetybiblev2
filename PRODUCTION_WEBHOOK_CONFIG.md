# PRODUCTION WEBHOOK CONFIGURATION GUIDE

**Domain:** https://supplementsafetybible.com
**Last Updated:** 2025-12-30
**Status:** READY FOR PRODUCTION DEPLOYMENT

---

## 1. NETLIFY ENVIRONMENT VARIABLES

### Location
Netlify Dashboard → Site Settings → Environment Variables → Production Scope

### Required Server-Side Variables (NOT prefixed with VITE_)

**CRITICAL: These MUST be set in Netlify Dashboard. NEVER expose these in frontend code.**

```bash
# Stripe Backend (Required)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase Backend (Required - Service Role Key)
SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site Configuration (Required)
SITE_URL=https://supplementsafetybible.com

# Stripe Portal (Optional)
STRIPE_PORTAL_RETURN_URL=https://supplementsafetybible.com/dashboard/billing
```

### Required Frontend Variables (VITE_ prefix)

**These are safe to expose in browser. Must be set in Netlify Dashboard.**

```bash
# Supabase Frontend (Required - Anon Key)
VITE_SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...(anon key)

# Stripe Frontend (Required - Publishable Key)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Site URL (Required)
VITE_SITE_URL=https://supplementsafetybible.com
```

### CRITICAL VALIDATION RULES

**❌ FATAL ERRORS - These will break production:**

1. **Supabase Project Mismatch**
   ```bash
   # WRONG - Different projects
   SUPABASE_URL=https://project-a.supabase.co
   VITE_SUPABASE_URL=https://project-b.supabase.co

   # CORRECT - Same project
   SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
   VITE_SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
   ```

2. **Key Type Mismatch**
   ```bash
   # WRONG - Service role in frontend
   VITE_SUPABASE_ANON_KEY=eyJ...(service_role key)

   # WRONG - Anon key in backend
   SUPABASE_SERVICE_ROLE_KEY=eyJ...(anon key)

   # CORRECT
   SUPABASE_SERVICE_ROLE_KEY=eyJ...(service_role key)
   VITE_SUPABASE_ANON_KEY=eyJ...(anon key)
   ```

3. **Stripe Secret Exposure**
   ```bash
   # WRONG - Never expose secrets in VITE_ vars
   VITE_STRIPE_SECRET_KEY=sk_live_...

   # CORRECT - Secrets are server-side only
   STRIPE_SECRET_KEY=sk_live_...
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

### How to Set in Netlify

1. Go to: https://app.netlify.com/sites/YOUR-SITE/configuration/env
2. Click "Add a variable"
3. Select scope: **Production** (not deploy previews)
4. Paste variable name and value
5. Click "Set variable"
6. Repeat for all variables above

**IMPORTANT:** After setting all variables, trigger a new deploy:
```bash
git commit --allow-empty -m "Trigger deploy with new env vars"
git push origin main
```

---

## 2. DEPLOYMENT VERIFICATION HOOKS

### Boot Logs Added ✅

Both functions now log safe startup messages on cold start:

**stripe-webhook.cjs:**
```
[StripeWebhook] boot ok | supabase: kmon
```

**billing-success.cjs:**
```
[BillingSuccessFn] boot ok | supabase: kmon
```

**What to Check:**
- Last 6 chars of Supabase project reference match your project
- If logs show `supabase: none` → SUPABASE_URL not set in Netlify
- No secrets are logged (safe for production logs)

### How to View Logs

**Netlify Dashboard:**
```
Functions → Select function → Logs
```

**Netlify CLI:**
```bash
netlify functions:log stripe-webhook
netlify functions:log billing-success
```

**Expected on First Deploy:**
```
[StripeWebhook] boot ok | supabase: kmon
[BillingSuccessFn] boot ok | supabase: kmon
```

---

## 3. STRIPE WEBHOOK ENDPOINT CONFIGURATION

### Exact Steps for Stripe Dashboard

1. **Navigate to Webhooks**
   - URL: https://dashboard.stripe.com/webhooks
   - Or: Stripe Dashboard → Developers → Webhooks

2. **Add Endpoint**
   - Click: "Add endpoint"
   - Endpoint URL: `https://supplementsafetybible.com/.netlify/functions/stripe-webhook`

   **CRITICAL:** URL must be exactly:
   ```
   https://supplementsafetybible.com/.netlify/functions/stripe-webhook
   ```

   **Common Mistakes:**
   - ❌ Missing `/.netlify/functions/` prefix
   - ❌ Using wrong domain (staging vs production)
   - ❌ Extra trailing slash
   - ❌ http instead of https

3. **Select Events to Listen To**

   **Required (Primary Provisioning):**
   - ✅ `checkout.session.completed` (CRITICAL)

   **Recommended (Full Lifecycle):**
   - ✅ `customer.subscription.updated` (plan changes)
   - ✅ `customer.subscription.deleted` (cancellations)
   - ✅ `invoice.payment_failed` (payment failures)

4. **Copy Signing Secret**
   - After creating endpoint, click to reveal signing secret
   - Format: `whsec_...` (starts with "whsec_")
   - Copy entire secret

5. **Set in Netlify Environment Variables**
   ```bash
   Variable: STRIPE_WEBHOOK_SECRET
   Value: whsec_... (paste full secret)
   Scope: Production
   ```

6. **Trigger New Netlify Deploy**
   ```bash
   git commit --allow-empty -m "Add webhook secret"
   git push origin main
   ```

### Signature Verification

The webhook function automatically verifies signatures using:
```javascript
stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
```

**What This Prevents:**
- Fake webhook requests
- Replay attacks
- Man-in-the-middle attacks

**If Signature Fails:**
```
[StripeWebhook] ❌ Invalid signature
```

**Causes:**
1. Wrong `STRIPE_WEBHOOK_SECRET` in Netlify
2. Wrong endpoint URL in Stripe dashboard
3. Request not from Stripe

---

## 4. BUILD/DEPLOY SETTINGS CHECK

### Netlify.toml Configuration ✅

**Current configuration is correct:**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[functions."*"]
  node_bundler = "esbuild"
  external_node_modules = [
    "@supabase/supabase-js",
    "stripe",
    "nodemailer",
    "node-fetch",
    "pg",
    "pdf-lib"
  ]
```

**What This Does:**
- Uses `netlify/functions` directory for all functions
- Bundles with esbuild (fast, modern)
- Keeps Supabase/Stripe as external (not bundled)

**No Changes Needed** - Configuration is production-ready.

### Deploy Command

**Standard Deploy:**
```bash
git push origin main
```

**Force Redeploy (after env var changes):**
```bash
git commit --allow-empty -m "Force redeploy"
git push origin main
```

**Check Build Status:**
```bash
netlify status
netlify deploys
```

---

## 5. PRODUCTION TEST PLAN

### Test A: Webhook Smoke Test (Stripe Dashboard)

**Purpose:** Verify webhook receives and processes events

**Steps:**
1. Go to: Stripe Dashboard → Developers → Webhooks
2. Click on your webhook endpoint
3. Click "Send test webhook"
4. Select event: `checkout.session.completed`
5. Click "Send test webhook"

**Expected Netlify Logs:**
```
[StripeWebhook] ========== INCOMING WEBHOOK ==========
[StripeWebhook] ✅ Signature verified
[StripeWebhook] Event type: checkout.session.completed
[StripeWebhook] Event ID: evt_test_...
[StripeWebhook] Processing checkout.session.completed: cs_test_...
[StripeWebhook] Email: test@example.com
[StripeWebhook] ✅ Email validated
[StripeWebhook] Plan: premium
[StripeWebhook] ✅ Profile created
[StripeWebhook] ✅ PROVISIONING COMPLETE
[StripeWebhook] ========== WEBHOOK COMPLETE ==========
```

**Expected Supabase:**
```sql
-- Check stripe_events table
SELECT * FROM stripe_events
WHERE type = 'checkout.session.completed'
ORDER BY created_at DESC LIMIT 1;

-- Expected result: status = 'completed'
```

**Pass Criteria:**
- ✅ Webhook receives event
- ✅ Signature verified
- ✅ Email validated
- ✅ Profile created in Supabase
- ✅ Event tracked in stripe_events

**Fail Scenarios:**
- ❌ 400 Invalid signature → Check STRIPE_WEBHOOK_SECRET
- ❌ No logs → Check webhook URL in Stripe
- ❌ Supabase error → Check SUPABASE_SERVICE_ROLE_KEY

---

### Test B: "Close Tab" Scenario (Real User Behavior)

**Purpose:** Verify failsafe provisioning when user closes browser

**Steps:**
1. Use Stripe test card: `4242 4242 4242 4242`
2. Complete checkout flow
3. **Immediately close browser tab after payment** (don't wait for redirect)
4. Wait 10 seconds
5. Open browser, go to https://supplementsafetybible.com
6. Click "Sign In"
7. Enter email used in test payment
8. Check email for magic link
9. Click magic link
10. Verify dashboard access

**Expected Webhook Logs (within 10 seconds of payment):**
```
[StripeWebhook] Processing checkout.session.completed: cs_live_...
[StripeWebhook] Email: your-test@email.com
[StripeWebhook] ✅ PROVISIONING COMPLETE
```

**Expected User Experience:**
1. User closes tab immediately after payment
2. Webhook provisions access automatically (within 10 seconds)
3. User can sign in anytime and access is active
4. Magic link sent automatically

**Pass Criteria:**
- ✅ Access granted even though user closed tab
- ✅ User can sign in successfully
- ✅ Dashboard shows premium features
- ✅ No error messages

**Fail Scenarios:**
- ❌ No access → Check webhook logs for errors
- ❌ "Free plan" shown → Profile not updated by webhook
- ❌ No magic link → Check Supabase auth configuration

---

### Test C: Success Page Scenario (Normal Flow)

**Purpose:** Verify instant UX when success page loads

**Steps:**
1. Use Stripe test card: `4242 4242 4242 4242`
2. Complete checkout flow
3. **Let redirect happen naturally**
4. Verify URL: `https://supplementsafetybible.com/billing/success?session_id=cs_...`
5. Check page shows success message
6. Check email for magic link
7. Click magic link
8. Verify dashboard access

**Expected Netlify Logs (billing-success):**
```
[billing-success] session_id: ✓ present
[billing-success] Session retrieved: { status: 'complete', payment_status: 'paid' }
[billing-success] ✅ Email validated: your-test@email.com
[billing-success] ✅ Already provisioned by webhook, returning existing data
```

**OR (if success page arrives first):**
```
[billing-success] ✅ Email validated: your-test@email.com
[billing-success] Upserting profile...
[billing-success] ✅ Profile upserted successfully
```

**Expected User Experience:**
1. Redirect to success page (< 2 seconds)
2. Success message shown immediately
3. Magic link sent to email
4. Click "Go to Dashboard" or wait for magic link
5. Full access granted

**Pass Criteria:**
- ✅ Success page loads with session_id in URL
- ✅ Success message displayed
- ✅ Magic link received in email
- ✅ Dashboard access works
- ✅ No duplicate provisioning logs

**Fail Scenarios:**
- ❌ No session_id in URL → Check Stripe checkout redirect URL
- ❌ Error message on page → Check Netlify function logs
- ❌ No magic link → Check Supabase SMTP configuration

---

## 6. DEBUG PLAYBOOK

### Common Issues and Solutions

#### Issue 1: Signature Verification Fails
```
[StripeWebhook] ❌ Invalid signature
```

**Causes:**
1. Wrong `STRIPE_WEBHOOK_SECRET` in Netlify
2. Endpoint URL mismatch in Stripe dashboard
3. Request not from Stripe (test locally)

**Fix:**
1. Go to Stripe Dashboard → Webhooks
2. Click on your endpoint
3. Click "Signing secret" → Copy
4. Go to Netlify → Env Vars → Update `STRIPE_WEBHOOK_SECRET`
5. Redeploy

**Verify:**
```bash
# Check Netlify env var is set
netlify env:list | grep STRIPE_WEBHOOK_SECRET
```

---

#### Issue 2: No Webhook Events Received
```
# No logs in Netlify Functions
```

**Causes:**
1. Webhook endpoint not configured in Stripe
2. Wrong URL in Stripe dashboard
3. Webhook disabled or deleted

**Fix:**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Verify endpoint exists: `https://supplementsafetybible.com/.netlify/functions/stripe-webhook`
3. Check status is "Enabled"
4. Send test webhook to verify

**Verify:**
```bash
# Check function is deployed
netlify functions:list | grep stripe-webhook
```

---

#### Issue 3: Missing Customer Email
```
[StripeWebhook] Email: MISSING
[StripeWebhook] ❌ Invalid email
```

**Causes:**
1. Stripe checkout session doesn't collect email
2. Email not in customer_details

**Fix:**
1. Check Stripe Checkout Session configuration
2. Ensure `customer_details.email` is collected
3. Use `customer_email` in checkout session creation

**Verify:**
```javascript
// In create-checkout function
const session = await stripe.checkout.sessions.create({
  customer_email: email, // Ensure this is set
  // ... rest of config
});
```

---

#### Issue 4: Supabase Errors
```
[StripeWebhook] ❌ Failed to create profile: {error}
```

**Causes:**
1. Wrong SUPABASE_SERVICE_ROLE_KEY
2. Supabase project mismatch (URL vs key)
3. RLS policy blocking service role
4. Database migration not applied

**Fix:**
1. Verify env vars match same Supabase project:
   ```bash
   SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
   VITE_SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
   ```

2. Check service role key in Supabase Dashboard:
   - Settings → API → service_role key

3. Verify migration applied:
   ```sql
   SELECT * FROM stripe_events LIMIT 1;
   -- Should not error
   ```

4. Check RLS policies:
   ```sql
   -- Service role should bypass RLS, but verify
   SELECT * FROM profiles WHERE email = 'test@example.com';
   ```

---

### Diagnostic SQL Queries

#### Query 1: Recent Webhook Events
```sql
SELECT
  id,
  type,
  email,
  status,
  created_at,
  processed_at,
  error
FROM stripe_events
ORDER BY created_at DESC
LIMIT 20;
```

**Expected:**
- Recent events with `status = 'completed'`
- No events with `status = 'failed'` (or very few)
- `processed_at` within seconds of `created_at`

---

#### Query 2: Failed Webhook Events
```sql
SELECT
  id,
  type,
  email,
  status,
  error,
  created_at,
  raw_data
FROM stripe_events
WHERE status = 'failed'
ORDER BY created_at DESC;
```

**Expected:**
- Empty result (no failures)
- If failures exist, check `error` column for cause

---

#### Query 3: Entitlement by Email
```sql
SELECT
  id,
  email,
  plan,
  role,
  is_premium,
  subscription_status,
  provisioned_via,
  provisioned_by_checkout_session,
  last_provisioned_at,
  activated_at
FROM profiles
WHERE email = 'customer@example.com';
```

**Expected:**
- `is_premium = true`
- `provisioned_via = 'webhook'` or `'success_page'`
- `provisioned_by_checkout_session` = checkout session ID
- `last_provisioned_at` = recent timestamp

---

#### Query 4: Provisioning Stats (Last 24 Hours)
```sql
SELECT
  provisioned_via,
  COUNT(*) as count
FROM profiles
WHERE last_provisioned_at > NOW() - INTERVAL '24 hours'
GROUP BY provisioned_via;
```

**Expected Distribution:**
```
webhook        | 85-95%  (primary path)
success_page   | 5-15%   (race condition wins)
```

**Healthy System:**
- Webhook should be majority (failsafe working)
- Success page provisions only when webhook slow

---

#### Query 5: Idempotency Check
```sql
SELECT
  checkout_session_id,
  COUNT(*) as event_count,
  ARRAY_AGG(status) as statuses,
  ARRAY_AGG(id) as event_ids
FROM stripe_events
GROUP BY checkout_session_id
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC;
```

**Expected:**
- Empty result (no duplicate processing)
- If duplicates exist, all should show same status

---

### Monitoring Dashboard Queries

#### Health Check Query
```sql
WITH recent_events AS (
  SELECT
    status,
    COUNT(*) as count
  FROM stripe_events
  WHERE created_at > NOW() - INTERVAL '24 hours'
  GROUP BY status
)
SELECT
  status,
  count,
  ROUND(100.0 * count / SUM(count) OVER (), 2) as percentage
FROM recent_events;
```

**Healthy Results:**
```
completed  | 95-99%
failed     | 0-2%
processing | 0-1%
```

---

#### Average Processing Time
```sql
SELECT
  AVG(EXTRACT(EPOCH FROM (processed_at - created_at))) as avg_seconds,
  MAX(EXTRACT(EPOCH FROM (processed_at - created_at))) as max_seconds,
  MIN(EXTRACT(EPOCH FROM (processed_at - created_at))) as min_seconds
FROM stripe_events
WHERE status = 'completed'
  AND created_at > NOW() - INTERVAL '24 hours';
```

**Healthy Results:**
```
avg_seconds: 2-5 seconds
max_seconds: < 10 seconds
min_seconds: < 1 second
```

---

## 7. POST-DEPLOYMENT CHECKLIST

### Immediate Verification (0-5 minutes)

- [ ] Netlify deploy successful
- [ ] Netlify functions deployed (2 functions)
- [ ] Boot logs show correct Supabase project
- [ ] Stripe webhook endpoint created
- [ ] Webhook signing secret set in Netlify
- [ ] Test webhook sent from Stripe dashboard
- [ ] Webhook logs show success

### Extended Verification (5-30 minutes)

- [ ] Test payment with Stripe test card
- [ ] Close tab scenario tested
- [ ] Success page scenario tested
- [ ] Magic link received and works
- [ ] Dashboard access confirmed
- [ ] SQL queries show correct data

### 24-Hour Monitoring

- [ ] No failed webhook events
- [ ] Processing time < 5 seconds average
- [ ] No signature verification failures
- [ ] No Supabase errors
- [ ] Customer emails valid (no bounces)

---

## 8. ROLLBACK PLAN

### If Critical Issues Occur

**Immediate Actions:**
1. Disable Stripe webhook in dashboard (stops new events)
2. Roll back Netlify deploy to previous version
3. Investigate logs

**Rollback Commands:**
```bash
# View recent deploys
netlify deploys

# Rollback to specific deploy
netlify deploy:rollback --deploy-id=<previous-deploy-id>
```

**Safe State:**
- Old webhook code still works
- Success page still provisions (fallback)
- No data loss (database unchanged)

---

## FINAL CHECKLIST

### Netlify Environment Variables ✅

**Server-Side (Never expose):**
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_WEBHOOK_SECRET
- [ ] SUPABASE_URL
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] SITE_URL

**Frontend (Safe to expose):**
- [ ] VITE_SUPABASE_URL (same project as SUPABASE_URL)
- [ ] VITE_SUPABASE_ANON_KEY
- [ ] VITE_STRIPE_PUBLISHABLE_KEY
- [ ] VITE_SITE_URL

### Stripe Webhook Endpoint ✅

**URL:** `https://supplementsafetybible.com/.netlify/functions/stripe-webhook`

**Events:**
- [ ] checkout.session.completed (REQUIRED)
- [ ] customer.subscription.updated (recommended)
- [ ] customer.subscription.deleted (recommended)
- [ ] invoice.payment_failed (recommended)

**Signing Secret:**
- [ ] Copied from Stripe dashboard
- [ ] Set in Netlify as STRIPE_WEBHOOK_SECRET

### Production Tests ✅

**Test A: Webhook Smoke Test**
- [ ] Test webhook sent from Stripe dashboard
- [ ] Logs show signature verified
- [ ] Event processed successfully
- [ ] Profile created in Supabase

**Test B: Close Tab Scenario**
- [ ] Payment completed
- [ ] Tab closed immediately
- [ ] Access granted via webhook
- [ ] User can sign in successfully

**Test C: Success Page Scenario**
- [ ] Payment completed
- [ ] Redirect to success page
- [ ] Magic link received
- [ ] Dashboard access works

---

## PRODUCTION STATUS

**Configuration:** READY ✅
**Code:** DEPLOYED ✅
**Database:** MIGRATED ✅
**Monitoring:** ENABLED ✅

**Next Step:** Set environment variables in Netlify and configure Stripe webhook endpoint.

**Support:** support@supplementsafetybible.com
