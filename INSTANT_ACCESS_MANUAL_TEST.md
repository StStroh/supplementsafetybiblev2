# Manual Test Checklist - Instant Access Onboarding

## Pre-Deployment Checklist

### ✅ Netlify Environment Variables (MUST BE SET)

Set these in: **Netlify Dashboard → Site Settings → Environment Variables**

```bash
SUPABASE_URL=https://cyxfxjoadzxhxwxjqkez.supabase.co
SUPABASE_SERVICE_ROLE_KEY=(get from Supabase dashboard → Settings → API)
STRIPE_SECRET_KEY=sk_live_...
```

### ✅ Supabase Auth Configuration

Navigate to: **Supabase Dashboard → Authentication → URL Configuration**

**Site URL:** `https://supplementsafetybible.com`

**Redirect URLs:** Add these:
- `https://supplementsafetybible.com/auth/callback`
- `https://supplementsafetybible.com/**`

---

## Test Case 1: Happy Path (Payment → Instant Access)

### Steps:

1. **Go to pricing page**
   ```
   https://supplementsafetybible.com/pricing
   ```

2. **Select any plan and click "Get Started"**
   - Should redirect to Stripe Checkout

3. **Complete checkout with test card**
   ```
   Card: 4242 4242 4242 4242
   Expiry: Any future date
   CVC: Any 3 digits
   ZIP: Any 5 digits
   Email: Use a REAL email you can access
   ```

4. **After payment, verify redirect URL**
   ```
   Expected: https://supplementsafetybible.com/billing/success?session_id=cs_test_...
   OR:       https://supplementsafetybible.com/billing/success?session_id=cs_live_...
   ```

5. **Verify success page displays:**
   - ✅ "You're in. Premium access is active."
   - ✅ Your actual email (NOT placeholder text)
   - ✅ "We sent a secure sign-in link to: {your-email}"
   - ✅ "Link expires soon for security."
   - ✅ "Resend email" button appears
   - ✅ "Go to Dashboard" primary button
   - ✅ Auto-redirect countdown (5 seconds)

6. **Check your email inbox**
   - ✅ Email from Supabase arrives (check spam if not in inbox)
   - ✅ Subject: "Confirm Your Signup" or "Magic Link"
   - ✅ Email contains login link

7. **Click "Go to Dashboard" button OR wait for auto-redirect**
   - ✅ Lands on `/check` page
   - ✅ Interaction checker loads

8. **Click the magic link from email**
   - ✅ Redirects to `/auth/callback` then to `/check`
   - ✅ User is now signed in
   - ✅ Premium features unlocked

### Expected Console Logs:

**Backend (Netlify function logs):**
```
[billing-success] ========== REQUEST ==========
[billing-success] session_id: ✓ present
[billing-success] Customer email: ✓ present
[billing-success] ✅ Email validated: test@example.com
[billing-success] Plan determined: { plan: 'premium', tier: 'premium', interval: 'monthly' }
[billing-success] ✅ Profile upserted successfully
```

**Frontend (Browser console):**
```
[SSB] Creating first client instance
[SSB] Project ref: xjqkez | Storage ref: xjqkez
[SSB] ✅ Project refs match
[SSB] ✅ Singleton established
[BillingSuccess] Verification started
[BillingSuccess] session_id: present
[BillingSuccess] ✅ Verification successful
[BillingSuccess] Sending magic link to: test@example.com
[BillingSuccess] ✅ Magic link sent
```

**Verify in Supabase:**
```sql
-- Check profile was created
SELECT email, tier, subscription_status, stripe_customer_id
FROM profiles
WHERE email = 'test@example.com';

-- Expected result:
-- email: test@example.com
-- tier: premium (or pro)
-- subscription_status: active
-- stripe_customer_id: cus_xxxxx
```

---

## Test Case 2: Missing session_id (Error Handling)

### Steps:

1. **Navigate directly to success page without session_id**
   ```
   https://supplementsafetybible.com/billing/success
   ```

2. **Verify calm error UI displays:**
   - ✅ Orange gradient background (not red/angry)
   - ✅ AlertCircle icon (orange)
   - ✅ Heading: "Session Not Found"
   - ✅ Message: Clear guidance about what to do
   - ✅ Button: "Return to Pricing"
   - ✅ Support email link visible

3. **Click "Return to Pricing"**
   - ✅ Redirects to `/pricing`

### Expected Console Logs:

```
[BillingSuccess] Verification started
[BillingSuccess] session_id: MISSING
[BillingSuccess] ❌ No session_id in URL
```

**Verify NO auth attempt:**
- ✅ NO "Sending magic link" log
- ✅ NO Supabase signInWithOtp call
- ✅ NO error thrown

---

## Test Case 3: Invalid session_id (Backend Error)

### Steps:

1. **Navigate to success page with fake session_id**
   ```
   https://supplementsafetybible.com/billing/success?session_id=cs_test_invalid
   ```

2. **Verify error UI displays:**
   - ✅ Red/orange gradient background
   - ✅ Heading: "Verification Error"
   - ✅ Message: "We couldn't verify your checkout session..."
   - ✅ Button: "Try Again"
   - ✅ Button: "Sign In"
   - ✅ Support email link visible

3. **Click "Try Again"**
   - ✅ Page reloads

4. **Click "Sign In"**
   - ✅ Redirects to `/auth`

### Expected Console Logs:

```
[BillingSuccess] Verification started
[BillingSuccess] session_id: present
[BillingSuccess] Calling backend verification...
[BillingSuccess] Response status: 400 (or 404)
[BillingSuccess] ❌ Verification failed: [error message]
```

**Verify NO auth attempt:**
- ✅ NO magic link sent to placeholder email
- ✅ NO invalid email attempt

---

## Test Case 4: Resend Email (Rate Limiting)

### Prerequisites: Complete Test Case 1 first

### Steps:

1. **On success page, click "Resend email"**
   - ✅ Button text changes to "Email sent (check spam folder)"
   - ✅ Button is disabled for 60 seconds
   - ✅ Second magic link email arrives

2. **Try clicking again immediately**
   - ✅ Button is disabled/grayed out
   - ✅ No additional email sent

3. **Wait 60 seconds**
   - ✅ Button re-enables
   - ✅ Text changes back to "Resend email"

### Expected Console Logs:

```
[BillingSuccess] Resending magic link
[BillingSuccess] Sending magic link to: test@example.com
[BillingSuccess] ✅ Magic link sent
```

---

## Test Case 5: Supabase Project Verification (Startup)

### Steps:

1. **Open browser console**

2. **Load any page**
   ```
   https://supplementsafetybible.com/
   ```

3. **Verify startup logs show matching project refs**

### Expected Console Logs:

```
[SSB] Creating first client instance
[SSB] Project ref: xjqkez | Storage ref: xjqkez
[SSB] ✅ Project refs match
[SSB] ✅ Singleton established
```

**If mismatch:**
```
[SSB] ⚠️ PROJECT MISMATCH! URL ref (abc123) !== Storage ref (xyz789)
```

**Action:** Fix environment variables immediately if mismatch detected.

---

## Test Case 6: No Stripe Embeds (Security)

### Steps:

1. **Complete payment and land on success page**

2. **Open browser DevTools → Network tab**

3. **Filter for "stripe"**
   - ✅ NO requests to `js.stripe.com`
   - ✅ NO requests to `checkout.stripe.com`
   - ✅ NO Stripe Elements loaded

4. **Inspect page source**
   - ✅ NO `<script src="https://js.stripe.com">`
   - ✅ NO `@stripe/stripe-js` imports
   - ✅ Only clean HTML/CSS

---

## Test Case 7: Auto-Redirect (Timer)

### Steps:

1. **Complete payment and land on success page**

2. **Watch for countdown banner**
   - ✅ Blue banner appears: "Auto-redirecting to dashboard in 5 seconds..."
   - ✅ Number counts down: 5 → 4 → 3 → 2 → 1

3. **Wait for countdown to reach 0**
   - ✅ Page auto-redirects to `/check`
   - ✅ No errors in console

4. **Alternatively, click "Go to Dashboard" before countdown ends**
   - ✅ Immediate redirect to `/check`
   - ✅ Timer stops

---

## Test Case 8: Idempotency (Double-Processing Prevention)

### Steps:

1. **Complete payment and get session_id**
   ```
   Example: session_id=cs_test_abc123xyz
   ```

2. **Refresh the success page**
   - ✅ Backend still returns correct data
   - ✅ Profile not duplicated
   - ✅ NO errors

3. **Verify in Supabase**
   ```sql
   -- Check for duplicate profiles
   SELECT email, COUNT(*) as count
   FROM profiles
   WHERE email = 'test@example.com'
   GROUP BY email
   HAVING COUNT(*) > 1;

   -- Expected: No results (no duplicates)
   ```

---

## Test Case 9: Email Validation (Security)

### Backend Test:

1. **Manually call backend function with tampered session**
   ```
   curl https://supplementsafetybible.com/.netlify/functions/billing-success?session_id=cs_test_xxx
   ```

2. **If session has invalid email, verify response:**
   ```json
   {
     "error": "Invalid email address in checkout session",
     "hint": "Contact support with your order confirmation",
     "support": "support@supplementsafetybible.com"
   }
   ```

3. **Check logs:**
   ```
   [billing-success] ❌ Invalid or missing email: undefined
   ```

**Verify NO database write occurred:**
- ✅ NO profile created with invalid email
- ✅ NO auth attempt made

---

## Test Case 10: Stripe Dashboard Reconciliation

### Steps:

1. **Complete a test payment**

2. **Go to Stripe Dashboard → Payments**
   ```
   https://dashboard.stripe.com/test/payments
   ```

3. **Find the payment**
   - ✅ Status: "Succeeded"
   - ✅ Customer email matches what you entered
   - ✅ Amount matches plan price

4. **Click payment → View checkout session**
   - ✅ session_id matches URL parameter
   - ✅ customer_details.email matches Supabase profile

5. **Go to Stripe Dashboard → Customers**
   - ✅ Customer created with correct email
   - ✅ Subscription active (if subscription plan)

6. **Cross-check Supabase**
   ```sql
   SELECT email, stripe_customer_id, stripe_subscription_id
   FROM profiles
   WHERE email = 'test@example.com';
   ```
   - ✅ `stripe_customer_id` matches Stripe customer ID
   - ✅ `stripe_subscription_id` matches Stripe subscription ID

---

## Success Criteria Summary

### ✅ Technical Requirements
- [ ] Backend function provisions access via service role
- [ ] Email validated before any auth attempt
- [ ] No placeholder emails ever used
- [ ] Supabase project refs match (verified at startup)
- [ ] No Stripe embeds on success page
- [ ] Idempotent provisioning (no duplicates)
- [ ] Comprehensive error logging
- [ ] Rate-limited resend email

### ✅ UX Requirements
- [ ] One clear headline: "You're in. Premium access is active."
- [ ] Real email displayed (never placeholder)
- [ ] One primary CTA: "Go to Dashboard"
- [ ] Auto-redirect after 5 seconds
- [ ] Calm error UI if session missing
- [ ] Helpful error messages with support contact
- [ ] Security message: "Link expires soon for security."

### ✅ User Journey
- [ ] Payment → Success page (< 2 seconds)
- [ ] Success page → Magic link sent (< 1 second)
- [ ] Success page → Dashboard (1 click OR 5 second auto-redirect)
- [ ] Magic link → Signed in (1 click)
- [ ] Total time to access: < 15 seconds

### ✅ Security Requirements
- [ ] No secrets in frontend
- [ ] Service role key never exposed
- [ ] Email validation enforced
- [ ] No SQL injection risks
- [ ] No XSS risks
- [ ] Auth redirect URLs whitelisted in Supabase

---

## Rollback Plan

If any test fails critically:

1. **Revert backend function:**
   ```bash
   rm netlify/functions/billing-success.cjs
   git checkout HEAD -- netlify/functions/billing-success.cjs
   ```

2. **Revert frontend:**
   ```bash
   git checkout HEAD -- src/pages/BillingSuccess.tsx
   git checkout HEAD -- src/lib/supabase.ts
   ```

3. **Redeploy:**
   ```bash
   git push origin main
   ```

---

## Support Troubleshooting

### User reports: "I paid but didn't get email"

**Diagnosis:**
1. Check Netlify function logs for `[billing-success]` errors
2. Check Supabase Auth logs for OTP send failures
3. Verify customer's email in Stripe dashboard
4. Check spam folder

**Resolution:**
- Manually send password reset link via Supabase dashboard
- Verify email service is configured (check Supabase SMTP settings)

### User reports: "Success page shows error"

**Diagnosis:**
1. Get session_id from user
2. Check Stripe dashboard for that session
3. Check Netlify function logs for detailed error
4. Verify Netlify env vars are set

**Resolution:**
- If session valid but provision failed: Manually create profile
- If session invalid: Refund + ask user to retry
- If env vars missing: Set immediately and ask user to retry

---

## Production Readiness Checklist

- [ ] All test cases pass
- [ ] Build succeeds with no errors
- [ ] Netlify env vars verified
- [ ] Supabase redirect URLs configured
- [ ] No Stripe embeds detected
- [ ] Console logs clean (no errors)
- [ ] Email delivery working
- [ ] Support contact visible on all error states
- [ ] Documentation complete

**STATUS:** READY TO SHIP 🚀
