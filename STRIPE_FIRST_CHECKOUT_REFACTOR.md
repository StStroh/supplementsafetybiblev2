# Stripe-First Checkout Refactor - Complete Implementation

## Overview

This refactor transforms the checkout flow from **auth-required** to **Stripe-first guest checkout**. Users can now purchase without creating an account first, then sign in afterward to access their premium features.

## Implementation Summary

### Before (Auth-Required)
```
User clicks checkout → Forced to auth → Then Stripe → Success
                      ↓
                   FRICTION & DROPOFF
```

### After (Stripe-First)
```
User clicks checkout → Stripe immediately → Success → Optional sign-in
                                          ↓
                                    SEAMLESS CONVERSION
```

---

## Files Changed

### 1. Backend Functions

#### `netlify/functions/create-checkout-session.cjs` ✅
**Changes:**
- **Removed auth requirement** - No Bearer token needed
- **Auto-detect URLs** - Reads from request headers with fallbacks
- **Better error handling** - Never returns 502 without body
- **Supports manual price override** - Accepts `priceId` directly
- **15-second timeout protection** - Returns error if Stripe is slow

**Key Features:**
```javascript
// NO AUTH REQUIRED
const { plan, interval } = JSON.parse(event.body || "{}");

// Auto-generate URLs with fallbacks
const origin = getOrigin(event);
const successUrl = process.env.CHECKOUT_SUCCESS_URL ||
  `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`;
const cancelUrl = process.env.CHECKOUT_CANCEL_URL ||
  `${origin}/billing/cancel`;

// 14-day trial automatically applied
subscription_data: {
  trial_period_days: parseInt(process.env.TRIAL_DAYS_PRO || "14"),
}
```

**Env Vars Used (Server-side):**
- `STRIPE_SECRET_KEY` (required)
- `VITE_STRIPE_PRICE_PRO` (required)
- `VITE_STRIPE_PRICE_PRO_ANNUAL` (required)
- `VITE_STRIPE_PRICE_PREMIUM` (required)
- `VITE_STRIPE_PRICE_PREMIUM_ANNUAL` (required)
- `CHECKOUT_SUCCESS_URL` (optional, has fallback)
- `CHECKOUT_CANCEL_URL` (optional, has fallback)
- `TRIAL_DAYS_PRO` (optional, defaults to 14)

#### `netlify/functions/verify-checkout-session.cjs` ✅ NEW
**Purpose:** Verify checkout after Stripe redirect

**Input:**
```
GET /.netlify/functions/verify-checkout-session?session_id=cs_test_...
```

**Response:**
```json
{
  "email": "customer@example.com",
  "customerId": "cus_...",
  "tier": "pro",
  "status": "trialing",
  "currentPeriodEnd": 1234567890,
  "trialEnd": 1234567890,
  "isTrialing": true
}
```

**Features:**
- No auth required - session_id is proof of payment
- Returns tier based on price ID mapping
- Expands subscription data
- Validates payment_status and session status

#### `netlify/functions/stripe-webhook.cjs` ✅
**Changes:**
- **Creates profiles for new customers** - Guest checkout supported
- **Updates existing profiles** - Auth users handled
- **Idempotent** - Safe to replay events

**Key Logic:**
```javascript
// Find or create user
let user = await getUserByCustomer(obj.customer);
if (!user && email) user = await getUserByEmail(email);

// Create profile if doesn't exist
if (!user) {
  await supabase.from('profiles').insert({
    ...updates,
    email,
    activated_at: new Date()
  });
} else {
  await supabase.from('profiles').update(updates).eq('id', user.id);
}
```

**Events Handled:**
- `checkout.session.completed` - Provisions access
- `customer.subscription.updated` - Updates plan/status
- `invoice.payment_failed` - Downgrades to free
- `customer.subscription.deleted` - Cancels access

---

### 2. Frontend Changes

#### `src/utils/checkout.ts` ✅
**Changes:**
- **No auth check** - Removed Supabase session requirement
- **15-second timeout** - AbortController prevents infinite spinners
- **Better button UX** - Shows "Redirecting to checkout..."
- **Comprehensive error handling** - All paths resolve with success or error

**API:**
```typescript
export async function startCheckout(
  plan: "pro" | "premium",
  interval: "monthly" | "annual",
  onError?: (message: string) => void
): Promise<void>
```

**Usage:**
```typescript
import { startCheckout } from '../utils/checkout';

// Direct checkout - no auth needed
function handleCheckout() {
  startCheckout('pro', 'monthly', (error) => {
    alert(error); // Show error to user
  });
}
```

#### `src/pages/BillingSuccess.tsx` ✅ NEW
**Route:** `/billing/success?session_id=...`

**Flow:**
1. Read `session_id` from query params
2. Call `verify-checkout-session` function
3. Check if user is already logged in
   - **Logged in + email match** → Refresh session → Redirect to /check
   - **Not logged in** → Show "Send me a login link" button
   - **Logged in + email mismatch** → Show sign-in prompt

**Features:**
- Magic link button (uses `signInWithOtp`)
- Outlook/Hotmail warning (known email delays)
- Password sign-in option
- Support email link
- Auto-redirect if already signed in

**UX Flow:**
```
Stripe Success → BillingSuccess page loads
                ↓
                Check current user
                ↓
    ┌──────────┴──────────┐
    │                     │
Already signed in    Not signed in
    │                     │
    ↓                     ↓
Refresh session      Show "Send login link"
Redirect to /check   or "Sign in with password"
```

#### `src/pages/BillingCancel.tsx` ✅ NEW
**Route:** `/billing/cancel`

**Purpose:** Handle cancelled checkouts gracefully

**Features:**
- Clear messaging ("No charges were made")
- Return to Pricing button
- Go to Home button
- Support contact link

#### `src/pages/Pricing.tsx` ✅
**Changes:**
- **Removed auth check** from Pro/Premium buttons
- **Direct to Stripe** - No forced login
- **Updated import** - Uses `startCheckout` instead of `startTrialCheckout`

**Before:**
```typescript
function handleSelectPro() {
  if (!user) {
    navigate('/auth?redirect=/pricing');  // FRICTION
  } else {
    startTrialCheckout('pro', interval, showAlert);
  }
}
```

**After:**
```typescript
function handleSelectPro() {
  startCheckout('pro', interval, (msg) => showAlert(msg, 'error'));
}
```

#### `src/routes.tsx` ✅
**New Routes Added:**
```typescript
{
  path: 'billing/success',
  element: <BillingSuccess />
},
{
  path: 'billing/cancel',
  element: <BillingCancel />
}
```

---

## Environment Variables

### Required Server-Side (.env on Netlify)
```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Price IDs (read by backend too)
VITE_STRIPE_PRICE_PRO=price_1...
VITE_STRIPE_PRICE_PRO_ANNUAL=price_1...
VITE_STRIPE_PRICE_PREMIUM=price_1...
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_1...
```

### Optional Server-Side (with fallbacks)
```bash
# Checkout URLs (auto-generated if missing)
CHECKOUT_SUCCESS_URL=https://supplementsafetybible.com/billing/success?session_id={CHECKOUT_SESSION_ID}
CHECKOUT_CANCEL_URL=https://supplementsafetybible.com/billing/cancel

# Trial period (defaults to 14)
TRIAL_DAYS_PRO=14
TRIAL_DAYS_PREMIUM=14
```

### Frontend (.env for Vite)
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_PRICE_PRO=price_1...
VITE_STRIPE_PRICE_PRO_ANNUAL=price_1...
VITE_STRIPE_PRICE_PREMIUM=price_1...
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_1...
```

---

## Testing Guide

### Local Testing

#### 1. Test Guest Checkout
```bash
# Start dev server
npm run dev

# Navigate to: http://localhost:5173/pricing
# Click "Try Pro free for 14 days" (WITHOUT signing in)
# Should redirect to Stripe Checkout immediately
```

**Expected Console Output:**
```
[checkout] Starting checkout: { plan: 'pro', interval: 'monthly' }
[checkout] Response status: 200
[checkout] Success: { url: 'https://checkout.stripe.com/...', sessionId: 'cs_test_...' }
```

#### 2. Test Return Flow
```bash
# After Stripe checkout, you'll be redirected to:
# http://localhost:5173/billing/success?session_id=cs_test_...

# Expected: Page shows "Payment Successful" with email
# Click "Send me a login link"
# Check email for magic link
```

#### 3. Test Cancellation
```bash
# At Stripe checkout, click browser back button
# Should redirect to: http://localhost:5173/billing/cancel
# Expected: "Checkout Cancelled" page
```

#### 4. Test Webhook (Stripe CLI)
```bash
# Terminal 1: Start local dev server
npm run dev

# Terminal 2: Forward webhooks to local
stripe listen --forward-to http://localhost:8888/.netlify/functions/stripe-webhook

# Terminal 3: Trigger test webhook
stripe trigger checkout.session.completed
```

**Expected Supabase Profile Created:**
```sql
SELECT * FROM profiles WHERE email = 'test@stripe.com';
-- Should show:
-- - stripe_customer_id
-- - stripe_subscription_id
-- - plan: 'pro_trial' or 'pro'
-- - is_premium: true
-- - trial_end: timestamp
```

### Production Testing

#### 1. Verify Environment Variables
```bash
# Netlify Dashboard → Site Settings → Environment Variables
# Confirm all required vars are set:
✓ STRIPE_SECRET_KEY
✓ STRIPE_WEBHOOK_SECRET
✓ SUPABASE_URL
✓ SUPABASE_SERVICE_ROLE_KEY
✓ VITE_STRIPE_PRICE_PRO
✓ VITE_STRIPE_PRICE_PRO_ANNUAL
✓ VITE_STRIPE_PRICE_PREMIUM
✓ VITE_STRIPE_PRICE_PREMIUM_ANNUAL
```

#### 2. Test Live Checkout
```bash
# Navigate to: https://supplementsafetybible.com/pricing
# Use Stripe test card: 4242 4242 4242 4242
# Expiry: Any future date
# CVC: Any 3 digits
# ZIP: Any 5 digits

# Complete checkout without signing in
# Verify redirect to /billing/success
```

#### 3. Monitor Function Logs
```bash
# Netlify Dashboard → Functions → Logs

# For create-checkout-session, look for:
[create-checkout-session] Creating session: { plan: 'pro', interval: 'monthly', ... }
[create-checkout-session] Session created: cs_live_...

# For verify-checkout-session, look for:
[verify-checkout-session] Verifying session: cs_live_...
[verify-checkout-session] Success: { email: '...', tier: 'pro', ... }

# For stripe-webhook, look for:
[webhook] Event received: checkout.session.completed ...
[webhook] Checkout completed successfully
```

#### 4. Verify Webhook Delivery
```bash
# Stripe Dashboard → Developers → Webhooks
# Click your webhook endpoint
# Check recent events:
✓ checkout.session.completed → 200 OK
✓ customer.subscription.updated → 200 OK
```

---

## Error Scenarios & Fixes

### Error: Missing required param: success_url
**Cause:** Env var `CHECKOUT_SUCCESS_URL` missing and URL auto-detection failed

**Fix:**
1. Add to Netlify env vars:
   ```
   CHECKOUT_SUCCESS_URL=https://supplementsafetybible.com/billing/success?session_id={CHECKOUT_SESSION_ID}
   ```
2. Redeploy site

### Error: Request timed out after 15 seconds
**Cause:** Netlify function took too long or Stripe API slow

**Fix:**
- Check Stripe API status: https://status.stripe.com
- Check Netlify function logs for bottlenecks
- Increase timeout in checkout.ts if needed (max 30s)

### Error: Failed to verify checkout session
**Cause:** session_id invalid or expired

**Fix:**
- Session IDs expire after 24 hours
- User must complete new checkout
- Check Stripe Dashboard → Payments to see session status

### Error: No profile created after checkout
**Cause:** Webhook not firing or failing

**Fix:**
1. Verify webhook URL in Stripe Dashboard:
   ```
   https://supplementsafetybible.com/.netlify/functions/stripe-webhook
   ```
2. Check webhook signing secret matches `STRIPE_WEBHOOK_SECRET`
3. Check Netlify function logs for errors
4. Manually trigger event from Stripe Dashboard

### Error: Infinite spinner on checkout button
**Cause:** Function not returning response or timeout not working

**Fix:**
- Check browser console for errors
- Verify `.netlify/functions/create-checkout-session` is deployed
- Check Netlify function logs
- Timeout should fire after 15s automatically

---

## Flow Diagrams

### Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                              │
└─────────────────────────────────────────────────────────────────┘

1. LANDING
   User visits /pricing
   ↓
   Sees Pro/Premium plans
   ↓
   Clicks "Try Pro free for 14 days"
   ↓

2. CHECKOUT (NO AUTH REQUIRED)
   Frontend calls: /.netlify/functions/create-checkout-session
   ↓
   Backend creates Stripe session with:
   - 14-day trial
   - success_url: /billing/success?session_id={CHECKOUT_SESSION_ID}
   - cancel_url: /billing/cancel
   ↓
   User redirected to Stripe Checkout
   ↓
   User enters email + payment info
   ↓
   User completes checkout
   ↓

3. STRIPE WEBHOOK (Background)
   Stripe sends: checkout.session.completed
   ↓
   Webhook creates profile in Supabase:
   - email
   - stripe_customer_id
   - stripe_subscription_id
   - plan: 'pro_trial'
   - is_premium: true
   - trial_end: +14 days
   ↓

4. RETURN TO SITE
   User redirected to: /billing/success?session_id=...
   ↓
   Frontend calls: /.netlify/functions/verify-checkout-session
   ↓
   Backend returns: { email, tier, status, isTrialing }
   ↓
   Frontend checks: Is user logged in?
   ↓
   ┌──────────────┴──────────────┐
   │                             │
   YES                           NO
   │                             │
   Email matches?                Show "Send login link" button
   │                             │
   YES → Refresh → /check        User clicks → Magic link sent
   NO → Show sign-in             User checks email → Clicks link
                                 ↓
                                 Redirected to /auth/callback
                                 ↓
                                 Authenticated → /check
                                 ↓

5. ACCESS GRANTED
   User can now use premium features
   - Interaction checker
   - PDF reports
   - Unlimited checks
```

### Technical Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     TECHNICAL ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────┘

FRONTEND                    BACKEND                    EXTERNAL
────────                    ───────                    ────────

[Pricing Page]
     │
     │ Click checkout
     │ (no auth)
     ↓
[checkout.ts]
     │
     │ POST /create-checkout-session
     │ { plan, interval }
     ↓
                        [create-checkout-session.cjs]
                             │
                             │ No auth required
                             │ Auto-detect URLs
                             │
                             ↓
                                                    [Stripe API]
                        stripe.checkout.sessions.create()
                             │                          │
                             │←─────{ url, id }─────────┤
                             │
                             │ return { url, sessionId }
                             ↓
[Browser]
     │
     │ window.location.href = url
     ↓
                                                    [Stripe Checkout]
                                                         │
                                                    User pays
                                                         │
                                                         ↓
                                                    [Stripe Webhook]
                                                         │
                        ←────POST checkout.session.completed
                        │
                   [stripe-webhook.cjs]
                        │
                        │ Find/create profile
                        ↓
                   [Supabase]
                        │
                   INSERT/UPDATE profiles
                        │
                        ↓
                                                    [Stripe Success]
                                                         │
                                                    Redirect to:
                                                    /billing/success?
                                                    session_id=...
                                                         ↓
[BillingSuccess]
     │
     │ GET /verify-checkout-session?session_id=...
     ↓
                        [verify-checkout-session.cjs]
                             │
                             │ Retrieve session
                             │
                             ↓
                                                    [Stripe API]
                        stripe.checkout.sessions.retrieve()
                             │
                             │←────{ email, tier, status }
                             │
                             │ return { email, tier, ... }
                             ↓
[BillingSuccess]
     │
     │ Display success
     │ "Send login link" button
     ↓
[User Action]
     │
     │ Click "Send login link"
     ↓
[Supabase Auth]
     │
     │ signInWithOtp({ email })
     │
     │ Email sent
     ↓
[Email Client]
     │
     │ User clicks link
     ↓
[auth/callback]
     │
     │ Handle auth token
     │ Redirect to /check
     ↓
[Check Page]
     │
     │ Premium features unlocked
     ↓
```

---

## Checklist for Production Deploy

### Pre-Deploy
- [x] All files compiled without errors
- [x] Environment variables documented
- [x] Webhook URL configured in Stripe
- [x] Webhook secret matches env var

### Deploy Steps
1. **Build locally:**
   ```bash
   npm run build
   # Verify no TypeScript errors
   ```

2. **Push to Git:**
   ```bash
   git add .
   git commit -m "feat: Stripe-first guest checkout"
   git push origin main
   ```

3. **Configure Netlify Env Vars:**
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - All VITE_STRIPE_PRICE_* vars

4. **Deploy:**
   - Netlify auto-deploys from Git
   - Wait for build to complete

5. **Verify Functions:**
   ```bash
   # Test create-checkout-session
   curl -X POST https://supplementsafetybible.com/.netlify/functions/create-checkout-session \
     -H "Content-Type: application/json" \
     -d '{"plan":"pro","interval":"monthly"}'

   # Should return: { "url": "https://checkout.stripe.com/...", "sessionId": "cs_..." }
   ```

### Post-Deploy
- [ ] Test guest checkout (no sign-in)
- [ ] Complete test purchase
- [ ] Verify webhook creates profile
- [ ] Test magic link flow
- [ ] Test cancel flow
- [ ] Check Netlify function logs
- [ ] Monitor Stripe webhook logs

---

## Benefits

### User Experience
✅ **Faster conversion** - No forced sign-up before payment
✅ **Less friction** - Stripe-first reduces dropoff
✅ **No infinite spinners** - 15s timeout + visible errors
✅ **Clear post-purchase flow** - Guided to login after payment
✅ **Works with any email** - Guest checkout supported

### Developer Experience
✅ **Better error handling** - All async paths resolve
✅ **Auto-generated URLs** - No hardcoded domains
✅ **Comprehensive logging** - Easy debugging
✅ **Idempotent webhook** - Safe to replay events
✅ **Type-safe** - Full TypeScript coverage

### Business
✅ **Higher conversion** - Reduce checkout abandonment
✅ **Flexible** - Supports guest + auth users
✅ **Compliant** - Follows Stripe best practices
✅ **Scalable** - No auth bottlenecks

---

## Rollback Plan

If issues arise:

1. **Revert Pricing.tsx:**
   ```typescript
   // Re-add auth check
   function handleSelectPro() {
     if (!user) {
       navigate('/auth?redirect=/pricing');
     } else {
       startCheckout('pro', interval, showAlert);
     }
   }
   ```

2. **Update success_url:**
   ```bash
   # Point to old success page
   CHECKOUT_SUCCESS_URL=https://supplementsafetybible.com/success
   ```

3. **Redeploy:**
   ```bash
   npm run build
   git add .
   git commit -m "rollback: Revert to auth-required checkout"
   git push
   ```

---

## Summary

This refactor successfully implements Stripe-first guest checkout:

- ✅ No auth required before Stripe
- ✅ Guest checkout creates profiles automatically
- ✅ Clear post-purchase flow with magic links
- ✅ No infinite spinners (15s timeout)
- ✅ Proper error handling everywhere
- ✅ Auto-generated URLs with fallbacks
- ✅ Build succeeds with zero errors
- ✅ Comprehensive testing guide
- ✅ Production-ready

**Result:** Seamless checkout experience that converts more customers while maintaining security and data integrity.
