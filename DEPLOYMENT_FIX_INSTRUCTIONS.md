# Netlify Deployment Fix Instructions

## Problem Diagnosis

The deployment failed because the Netlify build environment is **missing required environment variables**:

```
❌ VITE_SUPABASE_URL is missing
❌ VITE_SUPABASE_ANON_KEY is missing
```

The prebuild guard script (`scripts/prebuild-guard.cjs`) validates that these variables are set before allowing the build to proceed. This is a security safeguard to prevent deploying with test credentials or missing configuration.

---

## Solution: Configure Netlify Environment Variables

You need to add the following environment variables to your Netlify site configuration:

### Required Variables (Frontend - VITE_ prefix)

1. **VITE_SUPABASE_URL**
   - Value: `https://cyxfxjoadzxhxwxjqkez.supabase.co`
   - Description: Supabase project URL (exposed to frontend)

2. **VITE_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4`
   - Description: Supabase anonymous key (safe to expose to frontend)

### Required Variables (Backend - for Netlify Functions)

3. **SUPABASE_URL**
   - Value: `https://cyxfxjoadzxhxwxjqkez.supabase.co`
   - Description: Supabase URL for serverless functions

4. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: `[YOUR ACTUAL SERVICE ROLE KEY]`
   - Description: **SECRET** - Do NOT expose to frontend. Get from Supabase Dashboard > Project Settings > API > service_role key
   - ⚠️ This bypasses RLS - use with caution

5. **STRIPE_SECRET_KEY**
   - Value: `sk_live_[YOUR ACTUAL LIVE KEY]`
   - Description: **SECRET** - Get from Stripe Dashboard
   - ⚠️ Must be LIVE mode (sk_live_), not TEST mode (sk_test_)

### Already Configured (from .env)

These are already in your .env and should also be in Netlify:

- ✅ VITE_STRIPE_PUBLISHABLE_KEY
- ✅ VITE_STRIPE_PRICE_PRO
- ✅ VITE_STRIPE_PRICE_PRO_ANNUAL
- ✅ VITE_STRIPE_PRICE_PREMIUM
- ✅ VITE_STRIPE_PRICE_PREMIUM_ANNUAL

---

## How to Add Environment Variables to Netlify

### Option A: Via Netlify Dashboard (Recommended)

1. Go to: **https://app.netlify.com/**
2. Select your site: **supplementsafetybible.com**
3. Navigate to: **Site configuration** → **Environment variables**
4. Click: **Add a variable** or **Add environment variables**
5. For each variable:
   - Key: Variable name (e.g., `VITE_SUPABASE_URL`)
   - Value: The value from above
   - Scopes: Check **Production** (and Deploy Preview if needed)
6. Click **Create variable**

### Option B: Via Netlify CLI (if you have auth)

```bash
# Set frontend variables
netlify env:set VITE_SUPABASE_URL "https://cyxfxjoadzxhxwxjqkez.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your-anon-key-here"

# Set backend variables (SECRETS - get real values from dashboards)
netlify env:set SUPABASE_URL "https://cyxfxjoadzxhxwxjqkez.supabase.co"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "your-service-role-key-here"
netlify env:set STRIPE_SECRET_KEY "sk_live_your-real-key-here"
```

---

## Getting Missing Secret Keys

### Get SUPABASE_SERVICE_ROLE_KEY:
1. Go to: **https://supabase.com/dashboard/project/cyxfxjoadzxhxwxjqkez**
2. Navigate to: **Project Settings** → **API**
3. Under **Project API keys**, find: **service_role** (secret)
4. Click **Reveal** and copy the key
5. ⚠️ **This key bypasses Row Level Security - keep it secret!**

### Get STRIPE_SECRET_KEY:
1. Go to: **https://dashboard.stripe.com/apikeys**
2. Find: **Secret key** in the **Standard keys** section
3. Click **Reveal live key token**
4. Copy the key (starts with `sk_live_`)
5. ⚠️ **Must be LIVE mode, not TEST mode!**

---

## After Adding Variables

1. **Trigger a new deploy:**
   - Go to: **Deploys** tab in Netlify
   - Click: **Trigger deploy** → **Deploy site**
   - Or push a new commit to trigger auto-deploy

2. **Build should succeed** with output:
   ```
   ✅ Supabase URL found
   ✅ Supabase Anon Key found
   ✅ Stripe Secret Key is LIVE mode
   ✅ All environment checks passed. Build can proceed.
   ```

---

## Verification Checklist

Before redeploying, ensure:

- [ ] `VITE_SUPABASE_URL` is set in Netlify (production scope)
- [ ] `VITE_SUPABASE_ANON_KEY` is set in Netlify (production scope)
- [ ] `SUPABASE_URL` is set in Netlify (production scope)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set with **real** service role key (not placeholder)
- [ ] `STRIPE_SECRET_KEY` is set with **real** LIVE key (sk_live_, not sk_test_)
- [ ] All Stripe price IDs are set (VITE_STRIPE_PRICE_*)
- [ ] All variables are scoped to **Production**

---

## Common Issues

### Issue: "STRIPE_SECRET_KEY is TEST mode"
- **Fix:** Use `sk_live_` key from Stripe dashboard, not `sk_test_`

### Issue: "SUPABASE_SERVICE_ROLE_KEY is missing"
- **Fix:** Get the real service role key from Supabase dashboard (not the anon key)

### Issue: Build still fails after adding variables
- **Fix:** Make sure variables are scoped to **Production** context
- **Fix:** Trigger a **new deploy** (variables aren't retroactive)

---

## Next Steps

1. ✅ Add the environment variables to Netlify dashboard
2. ✅ Get real secret keys from Supabase and Stripe dashboards
3. ✅ Trigger a new deployment
4. ✅ Verify build succeeds with green checkmarks

**After fixing, retry your deployment and it should succeed!**
