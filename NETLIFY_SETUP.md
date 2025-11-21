# Netlify Environment Variables Setup

## 🚨 CRITICAL: Set These Environment Variables in Netlify

Your Stripe integration is **failing in production** because environment variables are not set in Netlify.

## Required Environment Variables

Go to **Netlify Dashboard → Your Site → Site Settings → Environment Variables** and add:

### Frontend Variables (VITE_ prefix - embedded at build time)

```
VITE_SUPABASE_URL=https://cyxfxjoadzxhxwxjqkez.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4

VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51RyLMELSpIuKqlsUne1Umv2qL4pvvEi1bbl7HeXys4Ni7DXb2rsmhJAGqxNzarlDfUsERhExr8iyh0tKMNIQHRAP007xFruBFD

VITE_STRIPE_PRICE_PRO=price_1SSERBLSpIuKqlsUsWSDz8n6
VITE_STRIPE_PRICE_PRO_ANNUAL=price_1SSERBLSpIuKqlsUsWSDz8n6

VITE_STRIPE_PRICE_PREMIUM=price_1SSb9jLSpIuKqlsUMRo6AxHg
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_1SSb9jLSpIuKqlsUMRo6AxHg
```

### Backend Variables (No VITE_ prefix - used by Netlify Functions only)

```
STRIPE_SECRET_KEY=sk_live_YOUR_ACTUAL_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
```

## ⚠️ Important Notes

### 1. VITE_ Variables Must Be Set at Build Time

Variables prefixed with `VITE_` are **embedded into your frontend JavaScript bundle at BUILD time**, not runtime.

This means:
- ✅ Set them in Netlify BEFORE building
- ✅ Redeploy after adding/changing VITE_ variables
- ❌ They won't work if you add them after the build

### 2. Non-VITE_ Variables Work at Runtime

Variables WITHOUT the `VITE_` prefix (like `STRIPE_SECRET_KEY`) are only available to Netlify Functions and work immediately without rebuild.

## Step-by-Step Setup

1. **Go to Netlify Dashboard**
   - Navigate to your site
   - Go to Site Settings → Environment Variables

2. **Add all variables listed above**
   - Click "Add a variable"
   - Add each variable name and value
   - Make sure to use the EXACT names (case-sensitive!)

3. **Trigger a new deployment**
   - After adding VITE_ variables, you MUST redeploy
   - Go to Deploys → Trigger deploy → Deploy site

4. **Verify it works**
   - Open your site
   - Open browser console (F12)
   - You should see: "Stripe Environment Variables Check:" with actual price IDs
   - Click a pricing button - it should work!

## Debugging

If you still see errors:

1. **Check browser console**
   - Look for "Stripe Environment Variables Check:"
   - If price IDs are `undefined`, variables weren't set at build time

2. **Check Netlify Function logs**
   - Go to Netlify Dashboard → Functions → Logs
   - Look for "Received checkout request:" log
   - Check what `priceId` value is being received

3. **Verify variable names are exact**
   - `VITE_STRIPE_PRICE_PRO` (not `VITE_STRIPE_PRO_PRICE`)
   - Case-sensitive!

## Security Notes

✅ **Safe to expose (public):**
- `VITE_STRIPE_PUBLISHABLE_KEY` (starts with `pk_`)
- `VITE_STRIPE_PRICE_*` (price IDs starting with `price_`)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

🔒 **MUST keep secret (never in frontend):**
- `STRIPE_SECRET_KEY` (starts with `sk_`)
- `STRIPE_WEBHOOK_SECRET` (starts with `whsec_`)
- `SUPABASE_SERVICE_ROLE_KEY`
