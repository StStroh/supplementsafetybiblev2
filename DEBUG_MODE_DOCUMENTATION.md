# Debug Mode Documentation

## Overview

Debug mode provides diagnostic information about the Supabase connection and allows testing database inserts without affecting the production UI.

---

## How to Enable

Add `?debug=1` to any URL:

```
https://yourdomain.com/?debug=1
https://yourdomain.com/check?debug=1
https://yourdomain.com/pricing?debug=1
```

---

## What It Shows

When enabled, a dark diagnostic footer appears at the bottom of the page displaying:

### Connection Information

1. **Connected Supabase project**
   - The project reference extracted from `VITE_SUPABASE_URL`
   - Example: `qbefejbnxrsdwtsbkmon`

2. **Supabase URL host**
   - The full hostname of your Supabase instance
   - Example: `qbefejbnxrsdwtsbkmon.supabase.co`

3. **Anon key (last 6 chars)**
   - Last 6 characters of `VITE_SUPABASE_ANON_KEY` for verification
   - Example: `...xyz123`
   - Note: Only shows last 6 characters for security

4. **Netlify context**
   - Current deployment context (production, deploy-preview, etc.)
   - Extracted from `VITE_NETLIFY_CONTEXT` or `CONTEXT` env var

---

## Test Insert Button

The debug footer includes a button: **"🧪 Insert test review request"**

### What It Does

When clicked, inserts a test row into `interaction_requests` table with:

```typescript
{
  token_a: 'ui_probe',
  token_b: 'ui_probe',
  token_a_norm: 'ui_probe',
  token_b_norm: 'ui_probe',
  status: 'new',
  reason: 'unclear_result',
  note: 'UI PROBE from debug mode'
}
```

### Success Response

✅ Success! Inserted row with ID: abc-123-def-456

### Error Response

❌ Error: [error message] (Code: [error code])

---

## Verifying Inserts

### Using Supabase SQL Editor

```sql
SELECT
  id,
  token_a,
  token_b,
  status,
  reason,
  note,
  created_at
FROM interaction_requests
WHERE token_a = 'ui_probe'
ORDER BY created_at DESC
LIMIT 5;
```

### Expected Results

You should see rows with:
- `token_a = 'ui_probe'`
- `token_b = 'ui_probe'`
- `note = 'UI PROBE from debug mode'`
- `reason = 'unclear_result'`
- `status = 'new'`

---

## Use Cases

### 1. Verify Supabase Connection

**Problem**: Need to confirm which Supabase project the frontend is connected to

**Solution**: Add `?debug=1` and check the "Connected Supabase project" field

**Expected**: Should match your current Supabase project ref

---

### 2. Test Database Connectivity

**Problem**: Need to verify the frontend can write to the database

**Solution**:
1. Add `?debug=1`
2. Click "Insert test review request"
3. Check for success message
4. Verify row in Supabase SQL Editor

**Expected**: Success message with row ID

---

### 3. Verify Environment Variables

**Problem**: Need to confirm environment variables are set correctly

**Solution**: Add `?debug=1` and review all displayed values

**Expected**:
- Project ref should not be 'unknown'
- URL host should be valid Supabase domain
- Anon key should show last 6 chars
- Netlify context should match deployment type

---

### 4. Troubleshoot Project Mismatch

**Problem**: Suspecting the frontend is connecting to wrong Supabase project

**Solution**:
1. Add `?debug=1`
2. Compare "Connected Supabase project" with expected value
3. Check browser console for `[SSB]` messages
4. Insert test probe and verify in correct database

**Expected**: Project ref matches your intended Supabase project

---

### 5. Test RLS Policies

**Problem**: Need to verify Row Level Security policies allow inserts

**Solution**:
1. Sign out (if testing anon access)
2. Add `?debug=1`
3. Click "Insert test review request"
4. Check error message if insert fails

**Expected**: Should fail with RLS error if policies are too restrictive

---

## Security Considerations

### What Is Safe

✅ Debug mode only shows:
- Project reference (not sensitive)
- URL hostname (public info)
- Last 6 characters of anon key
- Netlify context (deployment type)

✅ Test inserts use obvious test data (`ui_probe`)

✅ Debug mode is hidden by default

### What Is Hidden

❌ Full anon key (only last 6 chars shown)
❌ Service role key (never exposed)
❌ User tokens or session data
❌ API secrets

### Production Use

While debug mode is safe for production:
- It's recommended for troubleshooting only
- Remove `?debug=1` from public URLs
- Test inserts create real database rows (can be deleted)

---

## Disabling Debug Mode

Simply remove `?debug=1` from the URL or navigate to a clean URL.

The debug footer will disappear immediately.

---

## Implementation Details

### Files

- `src/hooks/useDebugMode.ts` - Detects `?debug=1` in URL
- `src/components/DebugFooter.tsx` - Debug UI component
- `src/layouts/RootLayout.tsx` - Conditionally renders debug footer

### How It Works

1. `useDebugMode()` hook checks `URLSearchParams` for `debug=1`
2. Returns boolean state that triggers on URL change
3. `RootLayout` conditionally renders `<DebugFooter />` when debug mode is active
4. `DebugFooter` reads env vars and provides test insert button
5. Test insert uses Supabase client singleton (same connection as app)

---

## Troubleshooting

### Debug footer not appearing

**Check**:
- URL has `?debug=1` (case sensitive)
- JavaScript is enabled
- No JavaScript errors in console

---

### "Unknown" project ref

**Cause**: `VITE_SUPABASE_URL` is not set or malformed

**Fix**:
1. Check `.env` file has `VITE_SUPABASE_URL`
2. Verify URL matches pattern: `https://[ref].supabase.co`
3. Rebuild app after env var changes

---

### Test insert fails

**Common Errors**:

1. **"new row violates row-level security policy"**
   - RLS is blocking the insert
   - Check if user is authenticated
   - Verify RLS policies allow inserts for current user role

2. **"null value in column token_a violates not-null constraint"**
   - Database schema mismatch
   - Verify `interaction_requests` table structure matches expectations

3. **"relation interaction_requests does not exist"**
   - Table not created yet
   - Run migrations: `supabase db push`

4. **"authentication required"**
   - Supabase URL or anon key is incorrect
   - Check environment variables
   - Verify Supabase project is active

---

### Anon key shows "..."

**Normal**: If anon key is not set, shows empty or just "..."

**Fix**: Set `VITE_SUPABASE_ANON_KEY` in environment variables

---

## Comparison with SQL Probe

The debug mode complements the SQL probe (`probe_ui_sync`):

| Feature | SQL Probe | Debug Mode |
|---------|-----------|------------|
| Purpose | Verify backend/DB sync | Verify frontend/DB connection |
| Created by | SQL/Backend scripts | Frontend UI |
| Token used | `probe_ui_sync` | `ui_probe` |
| Visibility | Supabase SQL only | Browser UI |
| Access | Admins only | Anyone with `?debug=1` |

### Using Together

1. Insert SQL probe via backend: `token_a = 'probe_ui_sync'`
2. Enable debug mode: Add `?debug=1`
3. Insert UI probe: Click test button → `token_a = 'ui_probe'`
4. Query both:
```sql
SELECT token_a, token_b, note, created_at
FROM interaction_requests
WHERE token_a IN ('probe_ui_sync', 'ui_probe')
ORDER BY created_at DESC;
```

Expected: Both rows exist → frontend and backend connect to same database

---

## Example Scenarios

### Scenario 1: Staging Environment Check

```bash
# URL: https://staging.example.com?debug=1

Debug footer shows:
- Connected Supabase project: staging-abc123
- Supabase URL host: staging-abc123.supabase.co
- Anon key (last 6): ...xyz789
- Netlify context: deploy-preview

✅ Correct staging project confirmed
```

---

### Scenario 2: Production Verification

```bash
# URL: https://example.com?debug=1

Debug footer shows:
- Connected Supabase project: prod-def456
- Supabase URL host: prod-def456.supabase.co
- Anon key (last 6): ...abc123
- Netlify context: production

✅ Correct production project confirmed
```

---

### Scenario 3: Mismatch Detected

```bash
# URL: https://example.com?debug=1

Debug footer shows:
- Connected Supabase project: old-xyz789
- Supabase URL host: old-xyz789.supabase.co

❌ Wrong project! Should be prod-def456

Fix: Update VITE_SUPABASE_URL in environment variables
```

---

## Best Practices

1. **Use for Troubleshooting**: Enable debug mode when investigating issues

2. **Verify After Deployment**: Check debug mode after deploying to new environment

3. **Test Database Writes**: Use test insert button to verify write permissions

4. **Clean Up Test Data**: Periodically delete `ui_probe` rows:
   ```sql
   DELETE FROM interaction_requests
   WHERE token_a = 'ui_probe';
   ```

5. **Document Project Refs**: Keep a list of expected project refs per environment

6. **Check Netlify Context**: Verify deploy-preview uses staging, production uses prod

---

## Summary

Debug mode is a lightweight diagnostic tool that:
- ✅ Shows which Supabase project is connected
- ✅ Displays environment configuration
- ✅ Tests database write capability
- ✅ Helps troubleshoot connection issues
- ✅ Provides quick verification without backend access
- ✅ Safe for production (doesn't expose secrets)
- ✅ Hidden by default (requires `?debug=1`)

Use it whenever you need to verify frontend-to-database connectivity or confirm environment configuration.
