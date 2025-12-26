# Netlify Environment Variables - Required Configuration

**IMPORTANT:** These environment variables MUST be set in Netlify for checkout to work.

---

## Where to Set Environment Variables

1. **Netlify Dashboard** → Your Site
2. **Site Settings** → **Environment Variables**
3. Click **"Add a variable"**
4. Enter variable name and value
5. Select scopes: **Production** + **Deploy Previews** + **Branch Deploys**
6. Click **Save**
7. **Redeploy the site** for changes to take effect

---

## Required Variables

### 🔴 Stripe Secret Key (Backend)

**Variable Name:** `STRIPE_SECRET_KEY`

**Where to Get:**
1. Go to https://dashboard.stripe.com/apikeys
2. Copy the **Secret key** (starts with `sk_test_` or `sk_live_`)
3. **NEVER expose this key publicly** - only set in Netlify (backend only)

**Example Value:**
```
sk_test_51234567890abcdef...
```

---

### 🔴 Stripe Price IDs

You need FOUR price IDs - one for each plan + billing period combination.

**How to Get Price IDs:**

1. Go to https://dashboard.stripe.com/products
2. Create a product (e.g., "Pro Plan")
3. Add two prices to it:
   - Monthly recurring price → Copy this price ID
   - Annual recurring price → Copy this price ID
4. Repeat for "Premium Plan"
5. You should have 4 price IDs total

**Variable Names:**
```bash
VITE_STRIPE_PRICE_PRO=price_1234567890abcdef        # Pro Monthly
VITE_STRIPE_PRICE_PRO_ANNUAL=price_abcdef1234567890 # Pro Annual
VITE_STRIPE_PRICE_PREMIUM=price_zzzzzzzzzzz         # Premium Monthly
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_yyyyyyyyyy   # Premium Annual
```

**IMPORTANT:** Price IDs must match your Stripe mode:
- If using `sk_test_...` key → use test mode price IDs
- If using `sk_live_...` key → use live mode price IDs

---

### 🔴 Stripe Publishable Key (Frontend)

**Variable Name:** `VITE_STRIPE_PUBLISHABLE_KEY`

**Where to Get:**
1. Go to https://dashboard.stripe.com/apikeys
2. Copy the **Publishable key** (starts with `pk_test_` or `pk_live_`)
3. This key is safe to expose in frontend code

**Example Value:**
```
pk_test_51234567890abcdef...
```

---

### 🔴 Supabase Configuration

**Variable Names:**
```bash
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Where to Get:**
1. Go to https://supabase.com/dashboard/project/_/settings/api
2. Copy **Project URL** → use for both `SUPABASE_URL` and `VITE_SUPABASE_URL`
3. Copy **service_role** key (secret) → use for `SUPABASE_SERVICE_ROLE_KEY`
4. Copy **anon** key (public) → use for `VITE_SUPABASE_ANON_KEY`

---

### 🟢 Optional Variables

**Variable Names:**
```bash
CHECKOUT_SUCCESS_URL=https://yourdomain.com/billing/success?session_id={CHECKOUT_SESSION_ID}
CHECKOUT_CANCEL_URL=https://yourdomain.com/billing/cancel
```

**Default Behavior:** If not set, the function auto-detects the domain and uses:
- Success: `https://yourdomain.com/billing/success?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `https://yourdomain.com/billing/cancel`

**When to Set:** Only if you need custom URLs or are experiencing redirect issues.

---

## Verification

After setting all variables and redeploying:

### 1. Check Function Logs

1. Go to **Netlify Dashboard → Functions**
2. Click **create-checkout-session**
3. View recent logs
4. You should see:

```
[create-checkout-session] ========== ENVIRONMENT CHECK ==========
[create-checkout-session] STRIPE_SECRET_KEY: ✅ Present
[create-checkout-session] SUPABASE_URL: ✅ Present
[create-checkout-session] SUPABASE_SERVICE_ROLE_KEY: ✅ Present
[create-checkout-session] VITE_STRIPE_PRICE_PRO: ✅ Present
[create-checkout-session] VITE_STRIPE_PRICE_PRO_ANNUAL: ✅ Present
[create-checkout-session] VITE_STRIPE_PRICE_PREMIUM: ✅ Present
[create-checkout-session] VITE_STRIPE_PRICE_PREMIUM_ANNUAL: ✅ Present
[create-checkout-session] Stripe mode: 🧪 TEST MODE (or 🚀 LIVE MODE)
```

### 2. Test Checkout Flow

1. Go to `/pricing` on your deployed site
2. Click **"Sign up for Pro trial"**
3. **Expected Result:**
   - Button shows "Redirecting to checkout..."
   - Within 1-3 seconds, redirects to Stripe Checkout
   - Stripe checkout page loads with correct product/price

### 3. If Checkout Fails

Check the error banner on the pricing page and Netlify function logs for specific error messages:

**"Payment system not configured"**
→ `STRIPE_SECRET_KEY` is missing

**"Price configuration missing for pro monthly"**
→ `VITE_STRIPE_PRICE_PRO` is missing or empty

**"Plan configuration error. The selected plan is not available"**
→ Price ID doesn't exist in Stripe (check you're in the correct Test/Live mode)

**"Payment system authentication error"**
→ `STRIPE_SECRET_KEY` is invalid or expired

---

## Common Issues

### Issue: "No such price" Error

**Cause:** The price ID in Netlify doesn't exist in your Stripe account, OR you're using test mode price IDs with a live mode key (or vice versa).

**Solution:**
1. Check Netlify logs - they will show: `🧪 TEST MODE` or `🚀 LIVE MODE`
2. Go to Stripe Dashboard and toggle to the **same mode**
3. Go to Products → Prices
4. Copy the correct price IDs
5. Update Netlify environment variables
6. Redeploy

### Issue: "Payment system not configured"

**Cause:** `STRIPE_SECRET_KEY` is not set in Netlify.

**Solution:**
1. Go to https://dashboard.stripe.com/apikeys
2. Copy the Secret key
3. Add it to Netlify as `STRIPE_SECRET_KEY`
4. Redeploy

### Issue: Checkout works but webhook fails

**Cause:** Webhook signing secret not configured.

**Solution:**
1. Go to https://dashboard.stripe.com/webhooks
2. Create webhook endpoint: `https://yourdomain.com/.netlify/functions/stripe-webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the **Signing secret** (starts with `whsec_`)
5. Add to Netlify as `STRIPE_WEBHOOK_SECRET`
6. Redeploy

---

## Summary Checklist

Before deploying, ensure these are set in Netlify:

- [ ] `STRIPE_SECRET_KEY` - from Stripe API keys
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` - from Stripe API keys
- [ ] `VITE_STRIPE_PRICE_PRO` - from Stripe Products
- [ ] `VITE_STRIPE_PRICE_PRO_ANNUAL` - from Stripe Products
- [ ] `VITE_STRIPE_PRICE_PREMIUM` - from Stripe Products
- [ ] `VITE_STRIPE_PRICE_PREMIUM_ANNUAL` - from Stripe Products
- [ ] `SUPABASE_URL` - from Supabase project settings
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - from Supabase project settings
- [ ] `VITE_SUPABASE_URL` - from Supabase project settings
- [ ] `VITE_SUPABASE_ANON_KEY` - from Supabase project settings

After setting all variables:
- [ ] Redeploy the site
- [ ] Check function logs for ✅ confirmations
- [ ] Test checkout flow on /pricing
- [ ] Verify redirect to Stripe works

**If all variables show ✅ and checkout still fails, check the specific error message in function logs for next steps.**
