# DEPLOY: Instant Access Onboarding

## Pre-Deploy: Set Netlify Environment Variables

Navigate to: **Netlify Dashboard → Your Site → Site Settings → Environment Variables**

Click **Add a variable** and set these:

```bash
SUPABASE_URL
Value: https://cyxfxjoadzxhxwxjqkez.supabase.co

SUPABASE_SERVICE_ROLE_KEY
Value: (get from Supabase dashboard → Settings → API → service_role key)

STRIPE_SECRET_KEY
Value: sk_live_... (your live secret key)
```

**Important:** Click "Deploy all contexts" to apply to production.

---

## Pre-Deploy: Configure Supabase Auth URLs

Navigate to: **Supabase Dashboard → Authentication → URL Configuration**

**Site URL:**
```
https://supplementsafetybible.com
```

**Redirect URLs:**
Click "Add URL" and add:
```
https://supplementsafetybible.com/auth/callback
https://supplementsafetybible.com/**
```

Click **Save**.

---

## Deploy

```bash
npm run build
git add .
git commit -m "Ship instant access onboarding"
git push origin main
```

Netlify will auto-deploy.

---

## Post-Deploy: Verify

### 1. Check Console Logs (Critical)

Open: `https://supplementsafetybible.com/`

Open browser console, look for:
```
[SSB] Creating first client instance
[SSB] Project ref: xjqkez | Storage ref: xjqkez
[SSB] ✅ Project refs match
```

**If mismatch:** ENV vars are wrong. Fix immediately.

### 2. Test Payment Flow

1. Go to `/pricing`
2. Click "Get Started" on any plan
3. Use test card: `4242 4242 4242 4242`
4. Use a REAL email you can access
5. Complete checkout

**Verify redirect URL:**
```
https://supplementsafetybible.com/billing/success?session_id=cs_live_...
```

**Verify success page shows:**
- ✅ "You're in. Premium access is active."
- ✅ Your real email (NOT placeholder)
- ✅ "Resend email" button
- ✅ "Go to Dashboard" button
- ✅ Auto-redirect countdown

### 3. Check Backend Logs

Navigate to: **Netlify Dashboard → Functions → billing-success**

Look for recent invocation logs:
```
[billing-success] ✅ Email validated: your-email@example.com
[billing-success] ✅ Profile upserted successfully
```

**If errors:** Check full stack trace.

### 4. Verify Email Delivery

Check your inbox for:
- Subject: "Confirm Your Signup" or "Magic Link"
- From: Supabase
- Contains: Login link

**If not received:**
- Check spam folder
- Verify Supabase SMTP is configured

### 5. Test Dashboard Access

Click "Go to Dashboard" button OR wait for auto-redirect.

**Verify:**
- ✅ Lands on `/check`
- ✅ Interaction checker loads
- ✅ No errors in console

### 6. Test Magic Link

Click the magic link from email.

**Verify:**
- ✅ Redirects to `/auth/callback` then `/check`
- ✅ User is signed in
- ✅ Premium features unlocked

---

## If Something Breaks

### Problem: "Session Not Found" error

**Cause:** `session_id` not in URL

**Check:**
1. Netlify function logs for `create-checkout-session`
2. Verify line 233: `success_url` includes `{CHECKOUT_SESSION_ID}`

**Fix:** Should already be correct. If not, edit and redeploy.

### Problem: "Invalid email" error

**Cause:** Stripe session missing customer email

**Check:**
1. Stripe dashboard → Checkout session
2. Verify `customer_details.email` is present

**Fix:** This should never happen in production. Contact Stripe support.

### Problem: Project mismatch warning

**Console shows:**
```
[SSB] ⚠️ PROJECT MISMATCH!
```

**Cause:** ENV vars pointing to different Supabase projects

**Fix:**
1. Check `.env` file: `VITE_SUPABASE_URL`
2. Check `src/lib/supabase.ts`: `STORAGE_KEY`
3. Both must use project ID: `cyxfxjoadzxhxwxjqkez`
4. Redeploy after fixing

### Problem: Magic link not sending

**Check:**
1. Supabase dashboard → Project Settings → API → Project URL
2. Verify it matches: `https://cyxfxjoadzxhxwxjqkez.supabase.co`
3. Check Supabase Auth logs for OTP send failures

**Fix:**
- Verify Supabase SMTP is configured
- Check rate limits (Supabase free tier: 3 emails/hour)
- Upgrade to paid tier if needed

---

## Rollback

If critical issues:

```bash
git revert HEAD
git push origin main
```

Netlify will auto-deploy previous version.

---

## Monitoring (First 24 Hours)

**Watch these metrics:**

**Netlify Functions Dashboard:**
- `billing-success` invocation count (should match payments)
- Error rate (should be < 1%)
- Average duration (should be < 1s)

**Stripe Dashboard:**
- Payment success rate
- Checkout completion rate

**Supabase Auth Logs:**
- OTP sends (should match billing-success calls)

**Support Inbox:**
- User reports of "can't log in" (should be zero)

---

## Success Indicators

✅ All test cases pass
✅ Console logs show project refs match
✅ Backend logs show successful provisions
✅ Magic links deliver within 10 seconds
✅ No error reports in first hour
✅ Users reaching dashboard in < 15 seconds

---

## Quick Reference

**Backend Function:** `netlify/functions/billing-success.cjs`
**Frontend Page:** `src/pages/BillingSuccess.tsx`
**Supabase Client:** `src/lib/supabase.ts`
**Stripe Checkout:** `netlify/functions/create-checkout-session.cjs`

**Documentation:**
- `INSTANT_ACCESS_SHIPPED.md` - Complete implementation details
- `INSTANT_ACCESS_MANUAL_TEST.md` - Full test checklist
- This file - Deploy guide

---

**STATUS:** READY TO SHIP 🚀
