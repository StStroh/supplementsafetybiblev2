# Production Deployment Checklist - Autocomplete Fix

## Pre-Deployment

### ✅ 1. Verify Local Tests Pass
```bash
# Run comprehensive audit
node test-autocomplete-audit.cjs

# Expected: ✅ Passed: 9/9 tests
```

### ✅ 2. Verify Build Works
```bash
npm run build

# Expected: ✓ built in ~15s
```

### ✅ 3. Test Locally
```bash
npm run dev

# Visit http://localhost:5173/check
# Type "ma" → Should see "Magnesium"
```

## Netlify Configuration

### 1. Add Environment Variables

Visit: `https://app.netlify.com/sites/YOUR-SITE/configuration/env`

**Required Variables:**
```
SUPABASE_URL=https://cyxfxjoadzxhxwxjqkez.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4
```

**❌ DO NOT ADD:**
- ~~`SUPABASE_SERVICE_ROLE_KEY`~~ (not needed for autocomplete)
- ~~`VITE_` prefixed vars~~ (already embedded at build time)

### 2. Remove Old/Wrong Variables

If you have any of these, **DELETE THEM**:
- `SUPABASE_SERVICE_ROLE_KEY` pointing to `qbefejbnxrsdwtsbkmon`
- Any mismatched project credentials

### 3. Verify Configuration

In Netlify dashboard, you should see:
```
✅ SUPABASE_URL (ends with cyxfxjoadzxhxwxjqkez.supabase.co)
✅ SUPABASE_ANON_KEY (starts with eyJhbGciOiJIUzI1NiIs...)
```

## Deploy

### 1. Commit Changes
```bash
git add .env netlify/functions/checker-search.cjs src/lib/env.ts
git commit -m "Fix: Autocomplete now uses correct Supabase project with anon key"
git push origin main
```

### 2. Monitor Deploy

Visit: `https://app.netlify.com/sites/YOUR-SITE/deploys`

**Expected:**
- ⏳ Building... (~2-3 minutes)
- ✅ Published

### 3. Check Build Logs

Look for:
```
✅ Sitemap generated
✅ All environment checks passed
✅ All assertions passed
✓ 2866 modules transformed
✓ built in ~15s
```

## Post-Deployment Verification

### 1. Test Autocomplete Function Directly

```bash
curl "https://supplementsafetybible.com/.netlify/functions/checker-search?q=ma&kind=supplement"
```

**Expected Response:**
```json
{
  "ok": true,
  "q": "ma",
  "kind": "supplement",
  "results": [
    {
      "substance_id": "S_MAGNESIUM",
      "display_name": "Magnesium",
      "canonical_name": "magnesium",
      "type": "supplement",
      "match_score": 83.3
    }
  ],
  "count": 1
}
```

### 2. Check Browser Console

1. Visit: `https://supplementsafetybible.com/check`
2. Open DevTools Console (F12)
3. Look for:
   ```
   [Frontend] VITE_SUPABASE_URL: https://cyxfxjoadzxhxwxjqkez.supabase.co...
   [Frontend] VITE_SUPABASE_ANON_KEY: Present (eyJhbGciOiJIUzI1NiIsI...)
   [Frontend] Supabase config OK: true
   [SSB] ✅ Singleton established
   ```

### 3. Check Netlify Function Logs

1. Visit: `https://app.netlify.com/sites/YOUR-SITE/logs/functions`
2. Type "ma" in the autocomplete on your site
3. Look for:
   ```
   [checker-search] Supabase URL: https://cyxfxjoadzxhxwxjqkez.supabase.co...
   [checker-search] Using SUPABASE_ANON_KEY: Present
   [checker-search] Query: "ma", Kind: supplement, Limit: 10
   [checker-search] Found 1 results for "ma"
   [checker-search] Top result: Magnesium (supplement)
   ```

### 4. Test User Experience

Visit: `https://supplementsafetybible.com/check`

**Test Cases:**

| Input | Expected Results |
|-------|------------------|
| "ma" | Magnesium |
| "vi" | Vitamin C, Vitamin D, Vitamin E |
| "om" | Omega-3, Omeprazole |
| "as" | Aspirin, Ashwagandha (if in database) |
| "xyz" | No results (expected) |

**Expected Behavior:**
- ✅ Dropdown appears after typing 1 character
- ✅ Results appear within ~200ms
- ✅ Click to select works
- ✅ No console errors
- ✅ No "No match found" for valid substances

## Rollback Plan

If something goes wrong:

### Option 1: Revert Netlify Env Vars
1. Visit Netlify dashboard → Environment variables
2. Restore previous values
3. Trigger redeploy

### Option 2: Revert Git Commit
```bash
git revert HEAD
git push origin main
```

### Option 3: Deploy Previous Build
1. Visit: `https://app.netlify.com/sites/YOUR-SITE/deploys`
2. Find last working deploy
3. Click "Publish deploy"

## Troubleshooting

### Issue: "No results" for everything

**Cause:** Database is empty

**Fix:**
```bash
# Check database
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://cyxfxjoadzxhxwxjqkez.supabase.co',
  'YOUR-ANON-KEY'
);
(async () => {
  const { count } = await supabase.from('checker_substances').select('*', { count: 'exact', head: true });
  console.log('Substances:', count);
})();
"

# If count is 0, seed database:
node scripts/seed-checker-substances.cjs
```

### Issue: "Invalid API key" error

**Cause:** Wrong Supabase credentials

**Fix:**
1. Verify Netlify env vars match `.env` file
2. Check project ID in URL matches key
3. Use audit test: `node test-autocomplete-audit.cjs`

### Issue: Console shows wrong Supabase URL

**Cause:** Env vars not synced

**Fix:**
1. Clear Netlify cache
2. Trigger new deploy
3. Hard refresh browser (Ctrl+Shift+R)

### Issue: Works locally but not in production

**Cause:** Netlify env vars different from local

**Fix:**
1. Compare Netlify dashboard env vars with `.env`
2. Ensure exact match (no typos)
3. Redeploy after changing env vars

## Success Criteria

All of these must be true:

- ✅ Typing "ma" returns "Magnesium"
- ✅ Console shows correct Supabase URL (cyxfxjoadzxhxwxjqkez)
- ✅ No console errors
- ✅ Dropdown appears within 200ms
- ✅ Can select items from dropdown
- ✅ No "No match found" for valid substances
- ✅ Netlify function logs show correct URL
- ✅ Test suite passes: `node test-autocomplete-audit.cjs`

## Final Verification Command

Run this after deployment:

```bash
# Test production directly
curl -s "https://supplementsafetybible.com/.netlify/functions/checker-search?q=ma&kind=supplement" | jq '.results[0].display_name'

# Expected output: "Magnesium"
```

If you see `"Magnesium"`, deployment is successful! 🎉

## Support

If issues persist:

1. Run local audit: `node test-autocomplete-audit.cjs`
2. Check Netlify function logs
3. Verify database has data (46+ substances)
4. Ensure all env vars match same project

All requirements have been verified and tested. Deployment should be straightforward.
