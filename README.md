# Supplement Safety Bible

A Vite + React application for checking supplement and medication interactions, deployed on Netlify with Stripe payment integration.

## Environment Variables

### Required for Netlify Deployment

Set these in **Netlify Dashboard → Site Settings → Environment Variables**:

#### Backend Only (NEVER expose these in browser)
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### Frontend (Safe to expose - VITE_ prefix)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_PRICE_PRO=price_... (monthly Pro plan)
VITE_STRIPE_PRICE_PRO_ANNUAL=price_... (annual Pro plan)
VITE_STRIPE_PRICE_PREMIUM=price_... (monthly Premium plan)
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_... (annual Premium plan)
```

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
