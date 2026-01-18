# Deploy Billing Success Fix - Quick Reference

## What Changed

### 1. NEW Backend Function
**File:** `netlify/functions/billing-success.cjs`
- Takes `?session_id=cs_xxx` as GET parameter
- Validates email from Stripe
- Provisions access via Supabase service role
- Returns validated data to frontend

### 2. REWRITTEN Frontend Page
**File:** `src/pages/BillingSuccess.tsx`
- Requires session_id (shows calm error if missing)
- Calls new backend function
- Auto-sends magic link to validated email
- Shows confident "Welcome to Premium!" message
- Single button: "Go to My Dashboard"
- Auto-redirects in 5 seconds

## Netlify Environment Variables Required

Set these in Netlify Dashboard → Site Settings → Environment Variables:

```bash
SUPABASE_URL=https://cyxfxjoadzxhxwxjqkez.supabase.co
SUPABASE_SERVICE_ROLE_KEY=(get from Supabase dashboard)
STRIPE_SECRET_KEY=sk_live_...
```

## Quick Test After Deploy

1. Visit `/pricing`
2. Click "Get Started"
3. Use test card: `4242 4242 4242 4242`
4. Complete checkout
5. **Verify:**
   - URL contains `?session_id=cs_test_...`
   - Page shows "Welcome to Premium!"
   - Your actual email is displayed
   - Magic link arrives in inbox
   - Click "Go to My Dashboard" → lands on `/check`

## Expected Console Logs (Success)

**Backend:**
```
[billing-success] session_id: ✓ present
[billing-success] Customer email: ✓ present
[billing-success] ✅ Email validated: user@example.com
[billing-success] ✅ Profile upserted successfully
```

**Frontend:**
```
[BillingSuccess] session_id: present
[BillingSuccess] ✅ Verification successful
[BillingSuccess] ✅ Magic link sent
```

## Error Scenarios Fixed

| Old Behavior | New Behavior |
|--------------|--------------|
| "Missing session ID" error | Calm orange "Session Not Found" UI |
| Placeholder email ("your account") | Real email from Stripe |
| Multiple login choices | Auto-sent magic link + one button |
| Stripe iframe visible | Clean branded page |
| User must choose auth method | Automatic magic link |

## Build Verification

```bash
npm run build
```

**Expected:** ✅ Build succeeds with no errors

## Files Changed

- ✅ Created: `netlify/functions/billing-success.cjs`
- ✅ Rewritten: `src/pages/BillingSuccess.tsx`
- ✅ Verified: `create-checkout-session.cjs` (already correct)
- ✅ Verified: `src/lib/supabase.ts` (singleton correct)

## If Something Breaks

**Rollback:**
1. Delete `netlify/functions/billing-success.cjs`
2. Restore old `src/pages/BillingSuccess.tsx` from git
3. Redeploy

**Support:**
- Check Netlify function logs
- Verify env vars are set
- Check Stripe dashboard for session details
- Verify Supabase connection

## Success Criteria

✅ User completes checkout
✅ Redirected to success page with session_id
✅ Backend verifies and provisions access
✅ Magic link sent automatically
✅ User clicks one button → inside dashboard
✅ No errors in console
✅ No placeholder emails
✅ No Stripe embeds on success page

---

**Status:** Ready to deploy
**Risk:** Low (graceful degradation on errors)
**User Impact:** Dramatically improved post-purchase experience
