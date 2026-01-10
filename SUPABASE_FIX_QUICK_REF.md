# Supabase Project Fix - Quick Reference

## What Was Fixed

**Problem**: HTTP 400 errors due to project mismatch (`sbkmon` URL vs `cyxfxjoadzxhxwxjqkez` localStorage)

**Solution**: Dynamic storage key + automatic cleanup of stale auth keys

---

## Quick Verification

### 1. Check Console (Browser DevTools)

**Expected Output:**
```
[SSB] Creating first client instance
[SSB] Project ref: sbkmon
[SSB] Storage key: sb-sbkmon-auth-token
[SSB] ✅ Singleton established with deterministic storage key
```

**No More:**
```
[SSB] ⚠️ PROJECT MISMATCH! URL ref (sbkmon) !== Storage ref (cyxfxjoadzxhxwxjqkez)
```

### 2. Check localStorage (Browser DevTools)

**Good:**
```javascript
localStorage.getItem('sb-sbkmon-auth-token')
// Should exist if logged in
```

**Bad (should not exist):**
```javascript
localStorage.getItem('sb-cyxfxjoadzxhxwxjqkez-auth-token')
// Should be cleaned up automatically
```

### 3. Test Request Review Modal

1. Go to `/check-interactions`
2. Select "Magnesium" + "Ashwagandha"
3. Click "Request review"
4. Submit form
5. ✅ Success message appears
6. ❌ No 400 error in Network tab

---

## Quick Tests

### Browser Console Tests

```javascript
// 1. Check current Supabase keys
Object.keys(localStorage).filter(k => k.startsWith('sb-'))

// 2. Check current project ref
const url = import.meta.env.VITE_SUPABASE_URL;
const ref = url.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
console.log('Project ref:', ref); // Should be: sbkmon

// 3. Verify expected storage key exists
const expectedKey = `sb-${ref}-auth-token`;
console.log('Expected key:', expectedKey);
console.log('Exists:', localStorage.getItem(expectedKey) !== null);

// 4. Check for stale keys (should be none)
const staleKeys = Object.keys(localStorage)
  .filter(k => k.startsWith('sb-') && !k.includes('sbkmon'));
console.log('Stale keys:', staleKeys); // Should be: []
```

---

## Automated Verification

```bash
# Run verification script
node scripts/verify-supabase-singleton.cjs

# Expected output:
# ✅ No hardcoded old project ref
# ✅ Dynamic storage key is used
# ✅ Cleanup function exists
# ✅ Singleton pattern implemented
# ✅ Single createClient call
# 🎉 ALL CHECKS PASSED!
```

---

## Manual Testing Tool

Open in browser: `test-supabase-project-fix.html`

**Features:**
1. Check Current State
2. Simulate Stale Keys
3. Test Cleanup Function
4. Clear All Auth
5. Show All localStorage

---

## Troubleshooting

### Still seeing 400 errors?

1. **Check environment variables**
   ```bash
   echo $VITE_SUPABASE_URL
   # Should be: https://sbkmon.supabase.co
   ```

2. **Clear localStorage**
   ```javascript
   localStorage.clear();
   location.reload();
   ```

3. **Check Network tab**
   - Look for `/rest/v1/interaction_requests` POST
   - Check Request Headers for `Authorization`
   - Verify it starts with `Bearer eyJ...`

4. **Verify Supabase project is active**
   - Go to Supabase Dashboard
   - Check project status
   - Verify API keys are correct

### Still seeing PROJECT MISMATCH?

This means the fix wasn't applied. Check:
1. `src/lib/supabase.ts` has dynamic storage key
2. No hardcoded `cyxfxjoadzxhxwxjqkez` in the file
3. `cleanupStaleSupabaseAuth` function exists
4. Build was successful and deployed

---

## Key Code Locations

| File | What It Does |
|------|--------------|
| `src/lib/supabase.ts` | Singleton Supabase client with dynamic storage |
| `scripts/verify-supabase-singleton.cjs` | Automated verification script |
| `test-supabase-project-fix.html` | Browser testing tool |

---

## Expected Behavior

### First Load (Fresh User)
1. No Supabase keys in localStorage
2. App creates client with `sb-sbkmon-auth-token`
3. No cleanup needed
4. Console: "Creating first client instance"

### First Load (Existing User with Stale Keys)
1. Has old `sb-cyxfxjoadzxhxwxjqkez-auth-token`
2. Cleanup runs automatically
3. Old keys removed
4. User logged out (expected)
5. Console: "🧹 Cleaning up 1 stale auth key(s)"

### Subsequent Loads (Clean State)
1. Has correct `sb-sbkmon-auth-token`
2. No cleanup needed
3. Auth works normally
4. Console: "Reusing existing client"

---

## Environment Variables

Required:
```bash
VITE_SUPABASE_URL=https://sbkmon.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

The storage key is automatically derived from the URL:
- URL: `https://sbkmon.supabase.co`
- Storage key: `sb-sbkmon-auth-token`

---

## Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| 400 errors | Stale auth token | Clear localStorage |
| PROJECT MISMATCH | Old code still deployed | Rebuild and deploy |
| Multiple clients | Old imports | Run verification script |
| Auth not persisting | Wrong storage key | Check console for storage key |

---

## Quick Commands

```bash
# Verify fix
node scripts/verify-supabase-singleton.cjs

# Build
npm run build

# Preview locally
npm run preview

# Check for hardcoded refs
grep -r "cyxfxjoadzxhxwxjqkez" src/

# Check for multiple clients
grep -r "createClient" src/
```

---

## Success Indicators

✅ Console shows correct project ref
✅ No PROJECT MISMATCH warnings
✅ Request Review modal works
✅ No 400 errors on REST calls
✅ Auth persists correctly
✅ Verification script passes

---

## Contact

If issues persist after trying all troubleshooting steps:
1. Check `SUPABASE_PROJECT_MISMATCH_FIX.md` for detailed documentation
2. Review browser console for `[SSB]` messages
3. Check Network tab for actual API responses
4. Verify environment variables are set correctly
