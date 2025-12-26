# Checkout Request Flow - Visual Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         USER CLICKS CHECKOUT BUTTON                          │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Pricing.tsx Component                              │
│                                                                              │
│  1. Button clicked: tier = "pro_monthly"                                    │
│  2. Extract: plan = "pro", interval = "monthly"                             │
│  3. Get auth token (if logged in)                                           │
│  4. Build request:                                                           │
│     {                                                                        │
│       method: "POST",                                                        │
│       headers: {                                                             │
│         "Content-Type": "application/json",                                 │
│         "Authorization": "Bearer ..." (if auth)                             │
│       },                                                                     │
│       body: JSON.stringify({ plan: "pro", interval: "monthly" })           │
│     }                                                                        │
│  5. Set loading state (spinner on button)                                   │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Network Request                                 │
│                                                                              │
│  POST /.netlify/functions/create-checkout-session                           │
│  Content-Type: application/json                                             │
│  Body: {"plan":"pro","interval":"monthly"}                                  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              Netlify Function: create-checkout-session.cjs                   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STEP 1: Validate Request Method                                     │   │
│  │   ✓ Must be POST                                                    │   │
│  │   ✗ Return 405 if not POST                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STEP 2: Check Environment Variables                                 │   │
│  │   Log presence of:                                                  │   │
│  │   • STRIPE_SECRET_KEY                                               │   │
│  │   • VITE_STRIPE_PRICE_PRO                                           │   │
│  │   • VITE_STRIPE_PRICE_PRO_ANNUAL                                    │   │
│  │   • VITE_STRIPE_PRICE_PREMIUM                                       │   │
│  │   • VITE_STRIPE_PRICE_PREMIUM_ANNUAL                                │   │
│  │   ✗ Return 500 if STRIPE_SECRET_KEY missing                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STEP 3: Parse Request Body                                          │   │
│  │   Try: JSON.parse(event.body)                                       │   │
│  │   Log all keys present                                              │   │
│  │   Log presence of: plan, interval, tier, priceId                    │   │
│  │   ✗ Return 400 if JSON invalid                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STEP 4: Normalize Payload (Accept 3 Variants)                       │   │
│  │                                                                      │   │
│  │   Variant A: { plan, interval }                                     │   │
│  │   ✓ Use directly                                                    │   │
│  │                                                                      │   │
│  │   Variant B: { tier: "pro_monthly" }                                │   │
│  │   ✓ Map to: { plan: "pro", interval: "monthly" }                   │   │
│  │                                                                      │   │
│  │   Variant C: { priceId: "price_..." }                               │   │
│  │   ✓ Use priceId directly, skip plan validation                     │   │
│  │                                                                      │   │
│  │   ✗ Return 400 if none provided                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STEP 5: Validate Plan & Interval                                    │   │
│  │   Check plan in ["pro", "premium"]                                  │   │
│  │   ✗ Return 400 if invalid                                           │   │
│  │   Normalize interval: "annual" or "monthly"                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STEP 6: Select Price ID                                             │   │
│  │                                                                      │   │
│  │   If priceId provided:                                              │   │
│  │     ✓ Use it directly                                               │   │
│  │                                                                      │   │
│  │   Else, select from environment:                                    │   │
│  │     pro + monthly    → VITE_STRIPE_PRICE_PRO                        │   │
│  │     pro + annual     → VITE_STRIPE_PRICE_PRO_ANNUAL                 │   │
│  │     premium + monthly → VITE_STRIPE_PRICE_PREMIUM                   │   │
│  │     premium + annual  → VITE_STRIPE_PRICE_PREMIUM_ANNUAL            │   │
│  │                                                                      │   │
│  │   ✗ Return 500 if env var missing                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STEP 7: Check for Existing Customer                                 │   │
│  │   If Authorization header present:                                  │   │
│  │     • Validate auth token with Supabase                             │   │
│  │     • Get user ID                                                   │   │
│  │     • Look up existing stripe_customer_id                           │   │
│  │   Else:                                                             │   │
│  │     • Proceed as guest checkout                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STEP 8: Build Stripe Checkout Session Config                        │   │
│  │   {                                                                 │   │
│  │     mode: "subscription",                                           │   │
│  │     line_items: [{ price: selectedPriceId, quantity: 1 }],         │   │
│  │     success_url: "...?session_id={CHECKOUT_SESSION_ID}",           │   │
│  │     cancel_url: "...",                                              │   │
│  │     allow_promotion_codes: true,                                    │   │
│  │     automatic_payment_methods: { enabled: true },                  │   │
│  │     subscription_data: { trial_period_days: 14 },                  │   │
│  │     metadata: { plan, interval, guest_checkout, user_id }          │   │
│  │   }                                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STEP 9: Create Stripe Checkout Session                              │   │
│  │   Call: stripe.checkout.sessions.create(config)                     │   │
│  │   ✓ Returns session with URL                                        │   │
│  │   ✗ Catch Stripe errors and return 500                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STEP 10: Return Success Response                                    │   │
│  │   {                                                                 │   │
│  │     url: "https://checkout.stripe.com/c/pay/cs_...",              │   │
│  │     sessionId: "cs_..."                                             │   │
│  │   }                                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Response to Pricing.tsx                              │
│                                                                              │
│  If status === 200:                                                         │
│    1. Parse JSON response                                                   │
│    2. Extract checkout URL                                                  │
│    3. Redirect: window.location.assign(url)                                 │
│    4. User lands on Stripe Checkout page                                    │
│                                                                              │
│  If status === 400:                                                         │
│    1. Parse JSON error response                                             │
│    2. Extract error message                                                 │
│    3. Show error banner to user                                             │
│    4. Reset button to normal state                                          │
│                                                                              │
│  If status === 500:                                                         │
│    1. Parse JSON error response                                             │
│    2. Show "Please contact support" message                                 │
│    3. Log error for debugging                                               │
│    4. Reset button to normal state                                          │
└─────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════
                              ERROR PATHS
═══════════════════════════════════════════════════════════════════════════════

❌ 400 BAD REQUEST - User/Frontend Error
   ├─ Invalid JSON in body → "Invalid JSON in request body"
   ├─ Missing required fields → "Missing required field: ..."
   ├─ Invalid plan value → "Invalid plan. Must be 'pro' or 'premium'."
   └─ Invalid tier value → "Invalid tier. Must be one of: ..."

❌ 405 METHOD NOT ALLOWED
   └─ Not POST request → "Method not allowed"

❌ 500 CONFIGURATION ERROR - Server/Admin Error
   ├─ STRIPE_SECRET_KEY missing → "Payment system not configured"
   ├─ Price ID env var missing → "Price configuration missing for [plan] [interval]"
   └─ Stripe API error → User-friendly message + contact support

═══════════════════════════════════════════════════════════════════════════════
                            SUCCESS PATH EXAMPLE
═══════════════════════════════════════════════════════════════════════════════

User clicks "Start Pro Monthly Plan" button
                    ↓
Frontend sends:
{
  "plan": "pro",
  "interval": "monthly"
}
                    ↓
Function receives & validates
                    ↓
Selects: VITE_STRIPE_PRICE_PRO = "price_1ABC..."
                    ↓
Creates Stripe session
                    ↓
Returns:
{
  "url": "https://checkout.stripe.com/c/pay/cs_live_...",
  "sessionId": "cs_live_..."
}
                    ↓
Frontend redirects user to Stripe
                    ↓
User enters payment details on Stripe Checkout
                    ↓
After payment: Stripe redirects to success_url
                    ↓
Webhook activates subscription
                    ↓
User gains access to Pro features

═══════════════════════════════════════════════════════════════════════════════
                         PAYLOAD VARIANT EXAMPLES
═══════════════════════════════════════════════════════════════════════════════

Variant A (Current Frontend):
{
  "plan": "pro",
  "interval": "monthly"
}

Variant B (Tier Format):
{
  "tier": "pro_monthly"
}

Variant C (Direct Price ID):
{
  "priceId": "price_1ABC123..."
}

All three variants work and produce the same result!

═══════════════════════════════════════════════════════════════════════════════
                            LOGGING CHECKPOINTS
═══════════════════════════════════════════════════════════════════════════════

Frontend Console:
  [Pricing] Checkout initiated: { tier, isLoggedIn }
  [Pricing] Calling: URL with { plan, interval }
  [Pricing] Response: status ok
  [Pricing] Success: { url, sessionId }
  [Pricing] Redirecting to: Stripe URL

Function Logs:
  [create-checkout-session] Request received: { method, hasAuth }
  [create-checkout-session] ========== ENVIRONMENT CHECK ==========
  [create-checkout-session] ========== REQUEST PAYLOAD ==========
  [create-checkout-session] Body keys present: [...]
  [create-checkout-session] ✅ Plan configuration: { plan, billing }
  [create-checkout-session] ✅ Using price ID: price_***
  [create-checkout-session] Creating session: { plan, interval, ... }
  [create-checkout-session] ✅ checkout session created: cs_***

═══════════════════════════════════════════════════════════════════════════════
