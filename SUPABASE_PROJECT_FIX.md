# Supabase Project URL Fix - Complete

## What Was Fixed

The project was using the **WRONG** Supabase instance:
- ❌ Old (incorrect): `cyxfxjoadzxhxwxjqkez.supabase.co`
- ✅ New (correct): `qbefejbnxrsdwtsbkmon.supabase.co`

---

## Files Updated

### 1. `.env` (Frontend Configuration)
```bash
VITE_SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
VITE_SUPABASE_ANON_KEY=PASTE_ANON_KEY_FROM_qbefejbnxrsdwtsbkmon_PROJECT_HERE
```

**⚠️ ACTION REQUIRED:** Update the anon key above with the real key from:
https://supabase.com/dashboard/project/qbefejbnxrsdwtsbkmon/settings/api

### 2. `netlify.toml` (CSP Header)
Updated Content-Security-Policy to **ONLY** allow:
- `https://qbefejbnxrsdwtsbkmon.supabase.co`

Removed the old URL from the CSP whitelist.

### 3. Backend Configuration (DO NOT COMMIT)
These must be set in **Netlify Dashboard ONLY**:

Go to: Netlify Site Settings → Environment Variables

Add/Update:
```
SUPABASE_URL=https://qbefejbnxrsdwtsbkmon.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role key from qbefejbnxrsdwtsbkmon project>
```

Get the service_role key from:
https://supabase.com/dashboard/project/qbefejbnxrsdwtsbkmon/settings/api

---

## Netlify Deployment Steps

### Step 1: Update Netlify Environment Variables

1. Go to: https://app.netlify.com/sites/YOUR_SITE/settings/env
2. Update these variables:
   - `VITE_SUPABASE_URL` = `https://qbefejbnxrsdwtsbkmon.supabase.co`
   - `SUPABASE_URL` = `https://qbefejbnxrsdwtsbkmon.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = (anon key from qbefejbnxrsdwtsbkmon)
   - `SUPABASE_SERVICE_ROLE_KEY` = (service_role key from qbefejbnxrsdwtsbkmon)

### Step 2: Clear Build Cache
In Netlify dashboard:
- Go to Deploys → Trigger deploy → **"Clear cache and deploy site"**

### Step 3: Verify Deployment
After build completes, check:
```bash
# 1. View built JavaScript files
curl -s https://YOUR_SITE.netlify.app/assets/*.js | grep -o "supabase.co"

# 2. Check if correct URL is present
curl -s https://YOUR_SITE.netlify.app/assets/*.js | grep "qbefejbnxrsdwtsbkmon"

# 3. Verify no old URL remains
curl -s https://YOUR_SITE.netlify.app/assets/*.js | grep "cyxfxjoadzxhxwxjqkez"
# (should return nothing)
```

### Step 4: Test Authentication
1. Visit your site
2. Try to sign up / sign in
3. Open browser DevTools → Network tab
4. Verify all Supabase requests go to: `qbefejbnxrsdwtsbkmon.supabase.co`

---

## Historical Scripts (Not Updated)

The following scripts contain old URLs but are **not used in production**:
- `scripts/bulk-import.py`
- `scripts/run-imports.sh`
- `scripts/direct-sql-import.js`
- Many others in `/scripts/*`

These are historical data import scripts. If you need to run them:
1. Update the URL manually in the script
2. Use environment variables instead of hardcoded values

---

## Security Notes

✅ **Service role key removed from repo**
- It's now only in Netlify environment variables
- Never commit `SUPABASE_SERVICE_ROLE_KEY` to the repo

✅ **CSP updated**
- Only allows the correct Supabase project
- Old project URL completely removed

✅ **Frontend uses public anon key**
- This is safe to commit (it's a public key)
- Still needs to be updated with the correct project's key

---

## Rollback Plan (If Needed)

If something goes wrong:
1. In Netlify, revert to a previous working deploy
2. Update env vars back to original values
3. Clear cache and redeploy

---

## Checklist

Before going live:
- [ ] Update `.env` with correct `VITE_SUPABASE_ANON_KEY`
- [ ] Set Netlify env vars for backend (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
- [ ] Trigger "Clear cache and deploy"
- [ ] Verify built files contain correct URL
- [ ] Test authentication flow
- [ ] Test Stripe checkout (if applicable)
- [ ] Check browser console for errors
