# WRONG SUPABASE URL - Critical Fix Required

## The Real Problem

Your app is trying to connect to the **WRONG Supabase instance**:

- ❌ **Currently connecting to:** `qbefejbnxrsdwtsbkmon.supabase.co`
- ✅ **Should connect to:** `cyxfxjoadzxhxwxjqkez.supabase.co`

The wrong URL doesn't exist or you don't have access to it, causing `ERR_TUNNEL_CONNECTION_FAILED`.

## Why This Happened

The wrong Supabase URL is **hardcoded in multiple places**:

1. ❌ ~~netlify.toml CSP header~~ ✅ **FIXED**
2. ❌ **Netlify Dashboard environment variables** ← **YOU MUST FIX THIS**

## Immediate Action Required

### Step 1: Fix Netlify Environment Variables

**Go to your Netlify Dashboard NOW:**

1. Navigate to: **Site Settings → Environment Variables**
2. Find these variables:
   - `VITE_SUPABASE_URL`
   - `SUPABASE_URL`
3. **Change them to:** `https://cyxfxjoadzxhxwxjqkez.supabase.co`

**Current (WRONG):**
```
VITE_SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
```

**Correct (MUST BE):**
```
VITE_SUPABASE_URL=https://cyxfxjoadzxhxwxjqkez.supabase.co
SUPABASE_URL=https://cyxfxjoadzxhxwxjqkez.supabase.co
```

### Step 2: Deploy Changes

Both netlify.toml CSP **AND** environment variables need to be updated:

```bash
# CSP is already fixed in netlify.toml
git add netlify.toml
git commit -m "Fix: Use correct Supabase URL in CSP"
git push
```

### Step 3: Trigger Redeploy in Netlify

After changing environment variables in Netlify Dashboard:

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait 2-3 minutes for deployment

### Step 4: Clear Browser Cache

**CRITICAL - Must do this:**

1. Open DevTools (F12)
2. Right-click refresh → **"Empty Cache and Hard Reload"**
3. Or use Incognito/Private browsing mode

## What Was Fixed in Code

### netlify.toml CSP (Line 53)

**Before:**
```
connect-src 'self'
  https://cyxfxjoadzxhxwxjqkez.supabase.co
  https://qbefejbnxrsdwtsbkmon.supabase.co  ← REMOVED
  ...
```

**After:**
```
connect-src 'self'
  https://cyxfxjoadzxhxwxjqkez.supabase.co  ← Only correct URL
  ...
```

## Why You're Seeing This Error

### Error Breakdown

```
POST https://qbefejbnxrsdwtsbkmon.supabase.co/auth/v1/token?grant_type=refresh_token
net::ERR_TUNNEL_CONNECTION_FAILED
```

**Translation:**
- Your app tried to connect to the wrong Supabase instance
- That instance doesn't exist or you don't have access
- Browser failed to establish connection (tunnel failed)
- Auth is completely broken

### The Error Chain

1. App loads with environment variables from Netlify
2. Netlify Dashboard has `VITE_SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co`
3. Frontend code uses this wrong URL
4. Browser tries to connect to wrong Supabase
5. Connection fails (instance doesn't exist)
6. Auth breaks, checkout breaks, everything breaks

## How Environment Variables Work in Netlify

### Build Time Variables (VITE_ prefix)

Variables starting with `VITE_` are **baked into your JavaScript bundle** at build time:

```javascript
// vite replaces this during build:
const url = import.meta.env.VITE_SUPABASE_URL;

// becomes (after build):
const url = "https://qbefejbnxrsdwtsbkmon.supabase.co"; // HARDCODED!
```

**This means:**
- Changing .env file locally does NOT affect deployed site
- Must change Netlify Dashboard environment variables
- Must redeploy after changing them
- Old builds still have old URL hardcoded

### Runtime Variables (no prefix)

Variables without `VITE_` prefix only work in **Netlify Functions**:

```javascript
// In Netlify Function:
const url = process.env.SUPABASE_URL; // Works at runtime
```

**Both types need to be correct:**
- Frontend: `VITE_SUPABASE_URL` (build time)
- Backend: `SUPABASE_URL` (runtime)

## Verification Steps

### 1. Check Netlify Environment Variables

**Netlify Dashboard → Site Settings → Environment Variables**

Should show:
```
✅ VITE_SUPABASE_URL = https://cyxfxjoadzxhxwxjqkez.supabase.co
✅ SUPABASE_URL = https://cyxfxjoadzxhxwxjqkez.supabase.co
```

NOT:
```
❌ VITE_SUPABASE_URL = https://qbefejbnxrsdwtsbkmon.supabase.co
❌ SUPABASE_URL = https://qbefejbnxrsdwtsbkmon.supabase.co
```

### 2. Check Build Logs

After deploying, check **Deploy logs** in Netlify:

Look for:
```
✅ VITE_SUPABASE_URL: https://cyxfxjoadzxhxwxjqkez.supabase.co
```

NOT:
```
❌ VITE_SUPABASE_URL: https://qbefejbnxrsdwtsbkmon.supabase.co
```

### 3. Check Browser Console (After Deploy + Cache Clear)

Should show:
```
✅ No ERR_TUNNEL_CONNECTION_FAILED
✅ Supabase requests succeed
✅ Auth works
```

NOT:
```
❌ POST https://qbefejbnxrsdwtsbkmon.supabase.co/...
❌ net::ERR_TUNNEL_CONNECTION_FAILED
```

### 4. Check Network Tab (DevTools)

Filter by "supabase":

Should show requests to:
```
✅ https://cyxfxjoadzxhxwxjqkez.supabase.co/auth/v1/...
```

NOT:
```
❌ https://qbefejbnxrsdwtsbkmon.supabase.co/auth/v1/...
```

## Why This Wasn't Caught Earlier

1. **Local development works** - your local .env has correct URL
2. **Netlify has different environment variables** - Dashboard overrides .env
3. **Browser caching** - even after deploy, old code persists
4. **Build-time vs Runtime** - VITE_ variables are baked in at build time

## The Complete Fix Checklist

- [x] ✅ Remove wrong URL from netlify.toml CSP
- [ ] ❌ Fix `VITE_SUPABASE_URL` in Netlify Dashboard
- [ ] ❌ Fix `SUPABASE_URL` in Netlify Dashboard
- [ ] ❌ Deploy code changes (git push)
- [ ] ❌ Trigger redeploy in Netlify
- [ ] ❌ Clear browser cache
- [ ] ❌ Verify in browser console

## Commands to Run

```bash
# 1. Deploy code changes (CSP fix)
git add netlify.toml
git commit -m "Fix: Use correct Supabase URL in CSP"
git push

# 2. Go to Netlify Dashboard and:
#    - Update VITE_SUPABASE_URL
#    - Update SUPABASE_URL
#    - Trigger new deploy

# 3. Clear browser cache (F12 → right-click refresh → hard reload)

# 4. Test in browser
```

## Expected Timeline

1. **Update Netlify env vars:** 2 minutes
2. **Git push:** 30 seconds
3. **Netlify deploy:** 2-3 minutes
4. **Clear browser cache:** 10 seconds
5. **Total:** ~5 minutes

## After Fix - Expected Behavior

### Browser Console (Clean)
```
✅ No CSP errors
✅ No tunnel connection errors
✅ Supabase requests succeed (200 OK)
✅ Auth works
✅ Sessions persist
```

### Network Tab
```
✅ POST https://cyxfxjoadzxhxwxjqkez.supabase.co/auth/v1/token
    Status: 200 OK
✅ POST https://cyxfxjoadzxhxwxjqkez.supabase.co/auth/v1/signup
    Status: 200 OK
```

### User Experience
```
✅ Sign in works
✅ Sign up works
✅ Sessions persist on refresh
✅ Checkout buttons work
✅ Premium features accessible
```

## Why qbefejbnxrsdwtsbkmon Doesn't Exist

This Supabase URL appears to be:
1. An old/deleted Supabase project
2. A typo in Netlify environment variables
3. A project you don't have access to
4. Never existed

The correct project is `cyxfxjoadzxhxwxjqkez.supabase.co` as shown in your local .env file.

## Critical: Do This NOW

**Your site is completely broken for all users** until you:

1. Update Netlify Dashboard environment variables
2. Redeploy
3. Users clear cache

Every user sees:
- ❌ Can't sign in
- ❌ Can't sign up
- ❌ Sessions expire
- ❌ Checkout fails
- ❌ All features broken

**Fix this immediately in Netlify Dashboard.**

---

## Summary

**Problem:** Netlify environment variables have wrong Supabase URL
**Solution:** Update Netlify Dashboard environment variables
**Files Changed:** netlify.toml (CSP fixed)
**Manual Step:** Update Netlify Dashboard
**Deploy Required:** Yes
**Cache Clear Required:** Yes
**Estimated Time:** 5 minutes
**Impact:** Critical (site is broken)
