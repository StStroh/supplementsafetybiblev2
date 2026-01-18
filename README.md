# Supplement Safety Bible

A Vite + React application for checking supplement and medication interactions, deployed on Netlify with Stripe payment integration.

## Environment Variables

### ⚠️ REQUIRED - Set these in Netlify Dashboard → Site Settings → Environment Variables

#### 🔴 Critical Backend Variables (NEVER expose in browser)
```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... or sk_live_...     # From https://dashboard.stripe.com/apikeys
STRIPE_WEBHOOK_SECRET=whsec_...                   # From https://dashboard.stripe.com/webhooks

# Supabase Backend
SUPABASE_URL=https://xxxxx.supabase.co           # From Supabase project settings
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...              # Service role key (KEEP SECRET)
```

#### 🟢 Frontend Variables (Safe to expose - VITE_ prefix)
```bash
# Supabase Frontend
VITE_SUPABASE_URL=https://xxxxx.supabase.co      # Same as SUPABASE_URL
VITE_SUPABASE_ANON_KEY=eyJhbG...                 # Anon key (public safe)

# Stripe Frontend
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... or pk_live_...

# Stripe Price IDs (from https://dashboard.stripe.com/products)
VITE_STRIPE_PRICE_PRO=price_...                  # Pro Monthly
VITE_STRIPE_PRICE_PRO_ANNUAL=price_...           # Pro Annual
VITE_STRIPE_PRICE_PREMIUM=price_...              # Premium Monthly
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_...       # Premium Annual
```

#### 🔵 Optional Variables
```bash
CHECKOUT_SUCCESS_URL=https://yourdomain.com/billing/success?session_id={CHECKOUT_SESSION_ID}
CHECKOUT_CANCEL_URL=https://yourdomain.com/billing/cancel
```

**📖 See [NETLIFY_ENV_VARS.md](./NETLIFY_ENV_VARS.md) for detailed setup instructions and troubleshooting.**

### Local Development

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

## Stripe Integration Architecture

### Payment Flow

1. **User clicks "Start Pro" or "Start Premium"** in Pricing component
2. **Frontend** (`src/components/Pricing.tsx`) sends a POST request to:
   ```
   /.netlify/functions/create-checkout-session
   ```
   with the selected `priceId` (from environment variables)

3. **Netlify Function** (`netlify/functions/create-checkout-session.js`):
   - Receives the `priceId`
   - Uses `STRIPE_SECRET_KEY` from backend environment
   - Creates a Stripe Checkout Session
   - Returns the checkout URL

4. **Frontend redirects** user to Stripe's hosted checkout page

5. **After payment**, Stripe redirects to success/cancel URL

6. **Webhook handler** (`netlify/functions/stripe-webhook.js`):
   - Receives events from Stripe (subscription created, payment succeeded, etc.)
   - Validates webhook signature using `STRIPE_WEBHOOK_SECRET`
   - Updates your database/user records

### Security

✅ **Secret key is ONLY used in Netlify Functions** (server-side)
✅ **Frontend ONLY uses publishable key and price IDs** (safe to expose)
✅ **No Stripe secrets in browser code**

### Files Modified

- `.env` - Added annual price ID environment variables
- `.env.example` - Updated with clear documentation
- `src/components/Pricing.tsx` - Fixed to use separate annual price IDs
- `netlify/functions/create-checkout-session.js` - Already secure (unchanged)
- `netlify/functions/stripe-webhook.js` - Already secure (unchanged)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Testing Netlify Functions Locally

```bash
netlify dev
```
