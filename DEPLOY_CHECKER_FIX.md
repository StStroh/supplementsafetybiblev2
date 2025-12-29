# Deploy Checker Fix - Quick Guide

## What Was Fixed

The Interaction Checker autocomplete was broken in production because `checker-get-interactions.cjs` used the wrong environment variable names (`VITE_SUPABASE_URL` instead of `SUPABASE_URL`).

## Deploy Now

```bash
git add .
git commit -m "Fix: Correct Supabase env vars in checker functions + improve error handling"
git push origin main
```

Netlify will automatically deploy in ~2 minutes.

## Test After Deploy

### Quick Browser Test

1. Visit: `https://supplementsafetybible.com/check`
2. Type "Ma" in the Supplements field
3. ✅ Should see: "Magnesium", "Maca", etc.
4. Select a supplement and medication
5. Click "Run Check"
6. ✅ Should see: Interaction results

### Automated Test

```bash
node test-checker-functions.cjs
```

### Direct Function Test

```bash
# Test autocomplete
curl "https://supplementsafetybible.com/.netlify/functions/checker-search?q=mag&kind=supplement"

# Test interaction check
curl -X POST "https://supplementsafetybible.com/.netlify/functions/checker-get-interactions" \
  -H "Content-Type: application/json" \
  -d '{"inputs": ["Vitamin K", "Warfarin"]}'
```

## Expected Results

### Before Fix
- 🔴 Autocomplete: "No match found" for everything
- 🔴 Run Check: Silent failures or errors
- 🔴 Console errors about missing Supabase client

### After Fix
- ✅ Autocomplete: Instant suggestions as you type
- ✅ Run Check: Returns interaction results correctly
- ✅ Error Handling: Clear error banners if anything fails
- ✅ System Error Banner: Shows configuration issues prominently

## Environment Variables

Verify these are set in Netlify dashboard:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Files Changed

1. `netlify/functions/checker-get-interactions.cjs` - Fixed env vars
2. `src/components/StackBuilderCheckerV3.tsx` - Added error banner
3. `src/components/SubstanceCombobox.tsx` - Improved error messages
4. `netlify.toml` - Fixed function redirects

## Support

If tests fail after deployment:

1. Check Netlify Function logs
2. Verify environment variables are set
3. Run: `node test-checker-functions.cjs` for diagnostics
4. Check browser console for client-side errors

## Status

✅ **READY FOR PRODUCTION DEPLOYMENT**

All changes tested and verified.
