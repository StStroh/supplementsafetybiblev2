# Fix: 401 Unauthorized Error on Checkout

## The Error

```
/.netlify/functions/create-checkout-session: Failed to load resource: 401 (Unauthorized)
Error: Please sign in to start a trial.
```

## Root Cause

The checkout session endpoint requires **two things** to work:

1. **User must be signed in** - The checkout flow requires authentication (this is intentional)
2. **Backend env vars must be set** - Netlify Functions need `SUPABASE_SERVICE_ROLE_KEY` to verify auth tokens

## Fix for Local Development

Your `.env` file was missing the backend environment variables. I've added them:

```bash
# Frontend (browser-safe)
VITE_SUPABASE_URL=https://cyxfxjoadzxhxwxjqkez.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# Backend (Netlify Functions)
SUPABASE_URL=https://cyxfxjoadzxhxwxjqkez.supabase.co
SUPABASE_SERVICE_ROLE_KEY=          👈 YOU NEED TO ADD THIS
```

### Steps to Fix:

1. **Get your Service Role Key:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project: `cyxfxjoadzxhxwxjqkez`
   - Go to **Settings** → **API**
   - Copy the **service_role** key (starts with `eyJhbGci...`)

2. **Add it to your `.env` file:**
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...your_actual_key_here
   ```

3. **Restart your dev server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   # Or if using Netlify Dev:
   netlify dev
   ```

4. **Sign in before testing checkout:**
   - Go to `/auth` or `/signin`
   - Sign in with a test account
   - Then try the checkout flow

## Why This Happens

The `create-checkout-session` function needs to:
1. Verify you're signed in (checks the Authorization header)
2. Look up your profile in the database (requires service role key)
3. Create or retrieve your Stripe customer ID
4. Create a checkout session

Without `SUPABASE_SERVICE_ROLE_KEY`, step 2 fails and the function can't verify your authentication.

## Fix for Production (Netlify)

When deploying to Netlify, ensure these env vars are set in **Netlify Dashboard**:

### Required Backend Variables:
```bash
SUPABASE_URL=https://cyxfxjoadzxhxwxjqkez.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
STRIPE_SECRET_KEY=sk_live_your_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Important:** Never commit the actual service role key to your repository!

---

## Testing the Fix

Once you've added the service role key:

### 1. Test Health Check
```bash
curl http://localhost:8888/.netlify/functions/health
```
Should return: `{"ok":true, ...}`

### 2. Test Authenticated Checkout
1. Sign in to your app
2. Click a "Start Trial" or "Upgrade" button
3. Should redirect to Stripe checkout (no 401 error)

---

## Summary

- ✅ Added `SUPABASE_URL` to `.env`
- ⚠️ **Action Required:** Add your `SUPABASE_SERVICE_ROLE_KEY` to `.env`
- ✅ Updated `.env` structure matches `.env.example`
- ✅ Backend functions now have fallback support for both env var formats

The 401 error will be fixed once you add the service role key and restart your dev server.
