# Debug Mode - Quick Test Guide

## Test Locally (Development)

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Open Browser
```
http://localhost:5173/?debug=1
```

### 3. Expected Result
You should see a dark debug footer at the bottom with:
```
🐛 DEBUG MODE (add ?debug=1 to URL)

Connected Supabase project:    [your-project-ref]
Supabase URL host:            [your-project-ref].supabase.co
Anon key (last 6):            ...[last-6-chars]
Netlify context:              unknown (local dev)

[🧪 Insert test review request] button
```

### 4. Test Insert
1. Click "🧪 Insert test review request"
2. Wait for response (should be instant)
3. Expected: `✅ Success! Inserted row with ID: [uuid]`

### 5. Verify in Supabase
Open Supabase SQL Editor:
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
LIMIT 1;
```

Expected output:
```
id: [uuid]
token_a: ui_probe
token_b: ui_probe
status: new
reason: unclear_result
note: UI PROBE from debug mode
created_at: [timestamp]
```

### 6. Test Without Debug
Navigate to:
```
http://localhost:5173/
```
(no `?debug=1`)

Expected: Debug footer should NOT appear

---

## Test Production (After Deploy)

### 1. Visit Production with Debug
```
https://yourdomain.com/?debug=1
```

### 2. Verify Project Ref
Check debug footer shows correct production project ref:
```
Connected Supabase project: [expected-prod-ref]
```

If it shows wrong project ref → environment variables need updating

### 3. Test Insert
Click button, verify success

### 4. Verify in Production DB
Run same SQL query in production Supabase project

---

## Quick Troubleshooting

### Debug footer doesn't appear
- Check URL has `?debug=1` (not `?debug=true` or other)
- Check JavaScript console for errors
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Shows "unknown" project ref
- Environment variable `VITE_SUPABASE_URL` not set
- Rebuild app after setting env vars
- Check `.env` file (local) or Netlify env vars (production)

### Test insert fails with RLS error
- Normal if not logged in and RLS requires auth
- Try logging in first
- Or check RLS policies allow anon inserts

### Test insert fails with "relation does not exist"
- Table `interaction_requests` not created
- Run migrations: `supabase db push`
- Check correct database is connected

---

## What to Check

✅ Debug footer appears with `?debug=1`
✅ Debug footer hidden without `?debug=1`
✅ Project ref matches expected value
✅ URL host is correct Supabase domain
✅ Anon key shows last 6 characters
✅ Test insert succeeds
✅ Row appears in Supabase SQL query
✅ Row has correct values (ui_probe, etc.)

---

## Clean Up Test Data

After testing, optionally delete test rows:
```sql
DELETE FROM interaction_requests
WHERE token_a = 'ui_probe';
```

Or keep them as ongoing connection verification.

---

## Next Steps After Verification

1. ✅ Debug mode works locally
2. ✅ Test insert succeeds
3. ✅ Row appears in database
4. ⏳ Deploy to staging
5. ⏳ Test in staging with `?debug=1`
6. ⏳ Deploy to production
7. ⏳ Final verification in production

---

## Commands Reference

```bash
# Start local dev
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
# Then visit: http://localhost:4173/?debug=1
```

---

## Expected Console Logs

When debug mode is active, you should also see in browser console:
```
[SSB] Creating first client instance
[SSB] Project ref: [your-ref]
[SSB] Storage key: sb-[your-ref]-auth-token
[SSB] ✅ Singleton established with deterministic storage key
```

This confirms the Supabase client is working correctly.

---

## Success Criteria

All of these should be true:

- [ ] Debug footer appears when `?debug=1` is in URL
- [ ] Debug footer disappears when `?debug=1` is removed
- [ ] Project ref is displayed and matches expected value
- [ ] Test insert button works
- [ ] Success message appears after insert
- [ ] Row exists in Supabase database
- [ ] No JavaScript errors in console
- [ ] Build completes without errors
- [ ] Works on all pages (home, check, pricing, etc.)

If all criteria pass → Debug mode is working correctly!
