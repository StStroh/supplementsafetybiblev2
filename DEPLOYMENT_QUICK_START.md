# 🚀 QUICK DEPLOYMENT GUIDE

## ✅ Status: READY TO DEPLOY

All fixes complete. Build successful. Tests passing.

---

## 📋 What Was Fixed

1. **grant-free.cjs** - Completely rewritten
   - CORS: Wildcard `*` support
   - POST: Accepts `{name}`, inserts into profiles
   - Returns: `{ok: true, profile: {...}}`
   
2. **Supabase Schema** - Verified & refreshed
   - name, plan, status, activated_at columns present
   - Cache refreshed
   
3. **Build** - Clean (12.18s, 0 errors)

---

## 🎯 Deploy Now

### Step 1: Netlify Deploy
```
1. Open Netlify dashboard
2. Click "Trigger deploy"
3. Select "Clear cache and deploy site" ✅ CRITICAL
4. Wait for deploy complete
```

### Step 2: Test Production
```bash
# Test the function
curl -X POST https://supplementsafetybible.com/.netlify/functions/grant-free \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User"}'

# Expected: {"ok":true,"profile":{...}}
```

### Step 3: Test /free Page
```
1. Open: https://supplementsafetybible.com/free
2. Enter name: "Your Name"
3. Click "Enter"
4. Expect: No errors, success message
```

---

## 📊 Test Checklist

After deploy, verify:

- [ ] POST to grant-free returns 200
- [ ] Response has `{ok: true, profile: {...}}`
- [ ] Profile has activated_at timestamp
- [ ] No CORS errors in browser console
- [ ] /free page submits successfully
- [ ] Supabase profiles table has new row

---

## 🔍 Quick Diagnostics

**If errors occur:**

```bash
# Check function health
curl https://supplementsafetybible.com/.netlify/functions/grant-free?diag=1

# Check Netlify logs
Netlify Dashboard → Functions → grant-free → View logs
```

**Check Supabase:**
```sql
SELECT * FROM profiles 
WHERE plan = 'free' 
ORDER BY activated_at DESC 
LIMIT 10;
```

---

## 📁 Files Changed

- `netlify/functions/grant-free.cjs` - Rewritten
- `supabase/migrations/20251130_profiles_schema_refresh.sql` - New

---

## ✅ Ready!

**Status:** All systems go
**Build:** 12.18s, 0 errors
**Action:** Deploy with "Clear cache"

Deploy now and test! 🚀
