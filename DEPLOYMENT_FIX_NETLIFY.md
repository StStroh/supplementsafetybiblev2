# ⚠️ Netlify Deployment Fix - Environment Variables Missing

## 🚨 Problem

Your Netlify deployment is **failing** because these environment variables are **NOT** configured in Netlify:

```
❌ VITE_SUPABASE_URL is missing
❌ VITE_SUPABASE_ANON_KEY is missing
```

The prebuild guard is correctly blocking the build to prevent deploying a broken site.

---

## ✅ Solution - Add Environment Variables to Netlify

### Step 1: Go to Netlify Dashboard

1. Visit: https://app.netlify.com/
2. Select your site: **supplementsafetybible.com**
3. Go to: **Site configuration** → **Environment variables**

OR use direct link:
👉 **https://app.netlify.com/sites/supplementsafetybible/configuration/env**

### Step 2: Add These Variables

Click **"Add a variable"** and add each one:

#### Required Frontend Variables (VITE_ prefix)

| Variable Name | Value |
|---------------|-------|
| `VITE_SUPABASE_URL` | `https://cyxfxjoadzxhxwxjqkez.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_51RyLMELSpIuKqlsUne1Umv2qL4pvvEi1bbl7HeXys4Ni7DXb2rsmhJAGqxNzarlDfUsERhExr8iyh0tKMNIQHRAP007xFruBFD` |
| `VITE_STRIPE_PRICE_PRO` | `price_1SSERBLSpIuKqlsUsWSDz8n6` |
| `VITE_STRIPE_PRICE_PRO_ANNUAL` | `price_1SSERBLSpIuKqlsUsWSDz8n6` |
| `VITE_STRIPE_PRICE_PREMIUM` | `price_1SSb9jLSpIuKqlsUMRo6AxHg` |
| `VITE_STRIPE_PRICE_PREMIUM_ANNUAL` | `price_1SSb9jLSpIuKqlsUMRo6AxHg` |

#### Required Backend Variables (for Netlify Functions)

| Variable Name | Value | Where to Get |
|---------------|-------|--------------|
| `SUPABASE_URL` | `https://cyxfxjoadzxhxwxjqkez.supabase.co` | Same as VITE_ version |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` (SECRET) | Supabase Dashboard → Project Settings → API → service_role key |
| `STRIPE_SECRET_KEY` | `sk_live_...` (SECRET) | Stripe Dashboard → Developers → API Keys → Secret key |

---

## 🔐 Getting Secret Keys

### Supabase Service Role Key
1. Go to: https://supabase.com/dashboard/project/cyxfxjoadzxhxwxjqkez
2. Navigate: **Project Settings** → **API**
3. Copy: **service_role** key (starts with `eyJhbGc...`)
4. ⚠️ **DO NOT share this publicly** - it has admin access

### Stripe Secret Key
1. Go to: https://dashboard.stripe.com/apikeys
2. Copy: **Secret key** (starts with `sk_live_...`)
3. ⚠️ **DO NOT share this publicly** - it can charge customers

---

## 🎯 Step 3: Set Scopes

For each variable, set:
- ✅ **Scopes:** Check **"Production"** (and optionally "Deploy previews" and "Branch deploys")
- ✅ **Values:** Paste the value
- ✅ Click **"Add variable"**

---

## 🚀 Step 4: Retry Deployment

After adding ALL the environment variables:

### Option A: Trigger New Deploy
1. Go to: **Deploys** tab in Netlify
2. Click: **"Trigger deploy"** → **"Deploy site"**

### Option B: Push New Commit
```bash
git commit --allow-empty -m "Trigger deployment after env vars"
git push
```

---

## ✅ What Will Happen

Once you add the environment variables and redeploy:

1. ✅ Prebuild guard will pass (sees VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
2. ✅ TypeScript compilation will succeed
3. ✅ Vite build will bundle the app
4. ✅ Site will deploy successfully
5. ✅ All routes will work
6. ✅ Supabase connection will work
7. ✅ Stripe checkout will work

---

## 📋 Verification Checklist

After deployment succeeds:

- [ ] Visit: https://supplementsafetybible.com
- [ ] Open browser console (F12)
- [ ] Check for errors - should see NO "Supabase configuration missing" errors
- [ ] Try searching for an interaction
- [ ] Try accessing /pricing page
- [ ] Verify Stripe checkout button loads

---

## 🔍 Why Did This Happen?

**Local builds work** because:
- You have a `.env` file with all the values

**Netlify builds fail** because:
- Netlify **does NOT** read your `.env` file
- Environment variables must be set in Netlify Dashboard
- The prebuild guard correctly blocks builds without required vars

This is actually **good** - it prevents deploying a broken site!

---

## 🆘 Still Having Issues?

### Common Problems:

**1. "Variable already exists"**
- Delete the existing variable first
- Then add it again with the correct value

**2. "Build still fails"**
- Double-check you added ALL variables (especially VITE_ ones)
- Make sure no typos in variable names
- Scopes must include "Production"

**3. "Site loads but shows errors"**
- Check browser console for specific errors
- Verify the Supabase URL is correct
- Test with: `console.log(import.meta.env.VITE_SUPABASE_URL)`

### Need Help?

If you're still stuck after following these steps:
1. Share a screenshot of your Netlify environment variables page (values hidden)
2. Share the new build logs
3. Check if all variable names are spelled correctly

---

## ✅ Quick Copy-Paste for Netlify UI

**Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://cyxfxjoadzxhxwxjqkez.supabase.co
Scope: Production
```

**Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4
Scope: Production
```

**Variable 3:**
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: [Get from Supabase Dashboard - API section]
Scope: Production
```

**Variable 4:**
```
Name: STRIPE_SECRET_KEY
Value: [Get from Stripe Dashboard - starts with sk_live_]
Scope: Production
```

---

## 🎉 After Success

Once deployment succeeds, your site will be live with:
- ✅ SEO optimizations
- ✅ Structured data
- ✅ Security headers
- ✅ Performance optimizations
- ✅ Full Supabase integration
- ✅ Working Stripe checkout

**Don't forget to:**
1. Submit sitemap to Google Search Console
2. Run Lighthouse audit
3. Test all critical user flows

---

**Ready?** Go add those environment variables and retry your deployment! 🚀
