# Content Security Policy - Supabase Auth Fix

## Critical Issue Found

Your production site has been blocking **all Supabase authentication** due to a Content Security Policy mismatch.

## The Problem

**Error in Console:**
```
Refused to connect because it violates the document's Content Security Policy.
Fetch API cannot load https://qbefejbnxrsdwtsbkmon.supabase.co/auth/v1/token
```

**Root Cause:**

`netlify.toml` line 53 had this CSP:
```
connect-src 'self' https://cyxfxjoadzxhxwxjqkez.supabase.co ...
```

But your **production environment** uses a different Supabase project:
```
https://qbefejbnxrsdwtsbkmon.supabase.co
```

This means:
- ❌ Nobody can sign in
- ❌ Nobody can sign up
- ❌ Token refresh fails every few minutes
- ❌ Checkout buttons don't work (need auth)
- ❌ Any authenticated feature is broken

## The Fix

Updated `netlify.toml` line 53 to allow **both** Supabase URLs:

```diff
- connect-src 'self' https://cyxfxjoadzxhxwxjqkez.supabase.co https://api.stripe.com ...
+ connect-src 'self' https://cyxfxjoadzxhxwxjqkez.supabase.co https://qbefejbnxrsdwtsbkmon.supabase.co https://api.stripe.com ...
```

This allows:
- ✅ Local development (cyxfxjoadzxhxwxjqkez)
- ✅ Production deployment (qbefejbnxrsdwtsbkmon)
- ✅ Both environments work without conflicts

## Why Two Supabase URLs?

You likely have:
1. **Development Supabase project:** `cyxfxjoadzxhxwxjqkez`
2. **Production Supabase project:** `qbefejbnxrsdwtsbkmon`

This is a common setup to keep dev/prod data separate.

## Files Changed

### netlify.toml (line 53)
- Added production Supabase URL to Content-Security-Policy
- Now allows both dev and prod Supabase instances

## What This Fixes

Once deployed:
- ✅ Authentication works (sign in, sign up, token refresh)
- ✅ Session persistence across page loads
- ✅ Checkout buttons work (users can authenticate)
- ✅ Protected routes work
- ✅ All Supabase API calls succeed
- ✅ No more CSP violations in console

## Build Status

```
✅ TypeScript compilation: SUCCESS
✅ Vite build: SUCCESS
✅ CSP headers: UPDATED
✅ Ready to deploy
```

## Deploy Instructions

This fix requires a new deployment because CSP headers are set at deploy time:

1. **Commit the change:**
   ```bash
   git add netlify.toml
   git commit -m "Fix CSP to allow production Supabase URL"
   git push
   ```

2. **Netlify will auto-deploy**
   - Wait 2-3 minutes for build
   - Check deployment logs for success

3. **Verify after deploy:**
   - Open browser console (F12)
   - Try to sign in
   - Should see NO CSP errors
   - Auth should work normally

## Important Notes

### CSP Headers Don't Update Without Deploy

- Changes to `netlify.toml` headers only apply on new deploys
- Your current live site still has the old CSP
- Users will continue seeing errors until you deploy

### Check Your Netlify Environment Variables

Make sure your Netlify environment variables match:

```
VITE_SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
VITE_SUPABASE_ANON_KEY=(your production anon key)
```

If these are set to the wrong Supabase project, update them in:
- Netlify Dashboard → Site Settings → Environment Variables

### Both URLs Are Safe to Allow

Adding both Supabase URLs to CSP is secure because:
- Both are HTTPS-only
- Both are your own Supabase projects
- CSP prevents connections to random domains
- This just allows your dev + prod instances

## Testing After Deploy

1. **Open site in incognito window**
2. **Open browser console (F12)**
3. **Try to sign in**
4. **Verify:**
   - ✅ No CSP errors
   - ✅ Login succeeds
   - ✅ Token refresh works
   - ✅ Checkout buttons work

## Previous Issue vs This Issue

### Previous Fix (Checkout Buttons)
- **Issue:** Buttons made direct fetch calls without preview detection
- **Fix:** Use `startTrialCheckout()` utility with auth headers
- **Status:** Fixed in code, but can't work without auth

### Current Fix (CSP Blocking Auth)
- **Issue:** CSP blocks all Supabase API calls
- **Fix:** Add production Supabase URL to CSP policy
- **Status:** Fixed, needs deploy

**Both fixes work together** - checkout needs auth to work, and auth needs CSP to allow Supabase.

## Deploy Now

The site is completely broken for production users without this fix. Deploy immediately.

```bash
git add netlify.toml
git commit -m "Fix: Add production Supabase URL to CSP"
git push
```

After deploy, **all authentication and checkout will work**.
