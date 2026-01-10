# Post-Deploy Verification Checklist

After deploying, verify these critical items to ensure debug UI removal was successful and Supabase fixes remain active.

---

## 1. Debug UI Removed (2 minutes)

### Test: No Debug Panel Visible

**Action**: Visit production with debug parameter
```
https://supplementsafetybible.com/?debug=1
```

**Expected Results**:
- ✅ No debug footer visible at bottom of page
- ✅ No "Connected Supabase project" text
- ✅ No "Insert test review request" button
- ✅ Page looks identical with or without `?debug=1`

**Status**: [ ] Pass [ ] Fail

---

## 2. Normal App Functionality (3 minutes)

### Test: Authentication Works

**Action**: Sign up or log in
```
1. Go to /auth
2. Enter email
3. Complete authentication
```

**Expected Results**:
- ✅ Auth succeeds without errors
- ✅ Redirected to appropriate page
- ✅ User session persists

**Status**: [ ] Pass [ ] Fail

---

### Test: Request Review Modal Works

**Action**: Submit an interaction review request
```
1. Go to /check or /stack-mode
2. Search for substances
3. Click "Request Review" if no results
4. Fill out form and submit
```

**Expected Results**:
- ✅ Modal opens correctly
- ✅ Form submission succeeds
- ✅ Success message appears
- ✅ Modal closes automatically

**Status**: [ ] Pass [ ] Fail

---

### Test: Database Insert Successful

**Action**: Verify row in Supabase
```sql
SELECT
  id,
  token_a,
  token_b,
  status,
  reason,
  user_tier,
  created_at
FROM interaction_requests
ORDER BY created_at DESC
LIMIT 3;
```

**Expected Results**:
- ✅ New row exists with submitted data
- ✅ All fields populated correctly
- ✅ Timestamps are recent

**Status**: [ ] Pass [ ] Fail

---

## 3. Console Verification (2 minutes)

### Test: Supabase Singleton Active

**Action**: Open browser console and check logs
```
1. Open DevTools (F12)
2. Go to Console tab
3. Refresh page
4. Look for [SSB] messages
```

**Expected Console Logs**:
```
[SSB] Creating first client instance
[SSB] Project ref: qbefejbnxrsdwtsbkmon
[SSB] Storage key: sb-qbefejbnxrsdwtsbkmon-auth-token
[SSB] ✅ Singleton established with deterministic storage key
```

**Possible Additional Log** (if stale keys found):
```
[SSB] 🧹 Cleaning up N stale auth key(s) from other projects
[SSB]   Removing: sb-***-auth-token
```

**Should NOT See**:
- ❌ "PROJECT MISMATCH" warnings
- ❌ "Multiple Supabase clients detected"
- ❌ 400 errors on API calls
- ❌ "Invalid JWT" errors

**Status**: [ ] Pass [ ] Fail

---

## 4. LocalStorage Check (1 minute)

### Test: Clean Auth Storage

**Action**: Inspect localStorage
```
1. Open DevTools (F12)
2. Go to Application tab
3. Expand Local Storage
4. Select your domain
5. Look for Supabase keys
```

**Expected State**:
- ✅ Only ONE Supabase auth key exists
- ✅ Key format: `sb-[project-ref]-auth-token`
- ✅ No keys from other project refs
- ✅ No duplicate auth keys

**Example Good State**:
```
sb-qbefejbnxrsdwtsbkmon-auth-token: {...}
```

**Example Bad State** (should NOT see):
```
sb-abc123-auth-token: {...}
sb-xyz789-auth-token: {...}
sb-oldproject-auth-token: {...}
```

**Status**: [ ] Pass [ ] Fail

---

## 5. Error Monitoring (5 minutes)

### Test: No Auth Errors

**Action**: Monitor for errors during normal usage
```
1. Browse multiple pages
2. Perform auth actions (login/logout)
3. Make API calls (search, check interactions)
4. Watch console for errors
```

**Should NOT See**:
- ❌ 400 Bad Request errors
- ❌ 401 Unauthorized errors (except when logged out)
- ❌ "Invalid JWT" messages
- ❌ "Session not found" errors
- ❌ "Multiple instances" warnings

**Expected**:
- ✅ Clean console
- ✅ API calls succeed
- ✅ No authentication failures

**Status**: [ ] Pass [ ] Fail

---

## 6. Cross-Browser Test (Optional, 5 minutes)

### Test: Works in Multiple Browsers

**Action**: Test in different browsers
```
Chrome: Visit site
Firefox: Visit site
Safari: Visit site (if on Mac)
```

**Expected Results**:
- ✅ No debug UI in any browser
- ✅ Auth works in all browsers
- ✅ Same [SSB] logs appear
- ✅ No browser-specific errors

**Status**: [ ] Pass [ ] Fail

---

## Quick Pass/Fail Summary

Fill this out after running all tests:

```
[ ] 1. No debug panel visible with ?debug=1
[ ] 2. Authentication works normally
[ ] 3. Request review modal works
[ ] 4. Database inserts succeed
[ ] 5. [SSB] logs appear in console
[ ] 6. No PROJECT MISMATCH warnings
[ ] 7. Only one auth key in localStorage
[ ] 8. No 400/401 errors during usage

OVERALL STATUS: [ ] ALL PASS [ ] SOME FAIL
```

---

## Troubleshooting

### If Debug Panel Still Appears

**Possible Causes**:
- Cached JavaScript bundle
- Deploy didn't complete

**Fix**:
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Verify deploy timestamp in Netlify
4. Check that latest commit is deployed

---

### If Auth Fails

**Possible Causes**:
- Environment variables not set
- Supabase URL mismatch

**Fix**:
1. Check Netlify environment variables
2. Verify `VITE_SUPABASE_URL` is correct
3. Verify `VITE_SUPABASE_ANON_KEY` is correct
4. Check console for [SSB] logs showing project ref

---

### If Multiple Auth Keys Exist

**Possible Causes**:
- Cleanup function not running
- Testing with multiple projects locally

**Fix**:
1. Manually delete stale keys from localStorage
2. Refresh page to trigger cleanup
3. Check console for cleanup logs
4. If persistent, clear localStorage completely

---

### If Request Review Modal Fails

**Possible Causes**:
- RLS policy blocking inserts
- Missing columns in table
- Network error

**Fix**:
1. Check exact error message in modal
2. Verify RLS policies allow inserts
3. Check table schema matches expected:
   ```sql
   \d interaction_requests
   ```
4. Test manually:
   ```sql
   INSERT INTO interaction_requests (
     token_a, token_b, token_a_norm, token_b_norm,
     status, reason, note, user_tier
   ) VALUES (
     'test', 'test', 'test', 'test',
     'new', 'unclear_result', 'manual test', 'free'
   );
   ```

---

## Success Criteria

Deployment is successful when:

- ✅ No debug UI visible
- ✅ Auth works normally
- ✅ Request review works
- ✅ Console shows [SSB] logs
- ✅ No errors in console
- ✅ Database inserts succeed
- ✅ Only one auth key in localStorage

If all criteria pass → **Deployment Verified**

---

## Report Template

Use this template to report verification results:

```
DEBUG UI REMOVAL - POST-DEPLOY VERIFICATION

Date: [DATE]
Environment: Production
URL: https://supplementsafetybible.com

✅ Debug UI removed (no panel with ?debug=1)
✅ Auth works normally
✅ Request review modal works
✅ Database inserts successful
✅ [SSB] logs present in console
✅ No PROJECT MISMATCH warnings
✅ Clean localStorage (one auth key only)
✅ No errors during normal usage

STATUS: ALL TESTS PASS ✅

Notes:
- Supabase singleton working correctly
- Auth cleanup running as expected
- No issues detected
```

---

## Timeline

Estimated time to complete all verifications: **15-20 minutes**

- Quick tests (1-3): 7 minutes
- Console/storage checks (4-5): 3 minutes
- Error monitoring (6): 5 minutes
- Optional cross-browser: 5 minutes

---

## Contact

If issues are found, check:
1. `DEBUG_UI_REMOVAL_COMPLETE.md` - What was removed/kept
2. `src/lib/supabase.ts` - Supabase client implementation
3. Console logs - Look for [SSB] messages
4. Supabase dashboard - Verify RLS policies

The Supabase stability fixes should continue working even if other issues arise. If auth or database issues occur, they are likely unrelated to debug UI removal.
