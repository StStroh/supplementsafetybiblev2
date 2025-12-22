# Stripe-First Checkout - Quick Start Guide

## What Changed

### Before
```
User → Auth required → Stripe → Success
       ❌ FRICTION
```

### After
```
User → Stripe immediately → Success → Optional sign-in
       ✅ SEAMLESS
```

---

## Quick Test (Local)

### 1. Start Dev Server
```bash
npm run dev
# Visit: http://localhost:5173/pricing
```

### 2. Test Guest Checkout
1. **Do NOT sign in**
2. Click "Try Pro free for 14 days"
3. Should redirect to Stripe immediately
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout

### 3. Verify Return Flow
1. After Stripe, redirected to `/billing/success?session_id=...`
2. See "Payment Successful" with email
3. Click "Send me a login link"
4. Check email for magic link
5. Click link → Authenticated → Dashboard

---

## Files Changed Summary

| File | Change |
|------|--------|
| `netlify/functions/create-checkout-session.cjs` | Removed auth requirement, added URL fallbacks |
| `netlify/functions/verify-checkout-session.cjs` | NEW - Verify session after Stripe |
| `netlify/functions/stripe-webhook.cjs` | Now creates profiles for guest checkout |
| `src/utils/checkout.ts` | Removed auth check, added timeout |
| `src/pages/BillingSuccess.tsx` | NEW - Post-checkout flow |
| `src/pages/BillingCancel.tsx` | NEW - Cancelled checkout |
| `src/pages/Pricing.tsx` | Removed auth check before checkout |
| `src/routes.tsx` | Added /billing/success and /billing/cancel |

---

## Environment Variables

### Required (Netlify)
```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
VITE_STRIPE_PRICE_PRO=price_1...
VITE_STRIPE_PRICE_PRO_ANNUAL=price_1...
VITE_STRIPE_PRICE_PREMIUM=price_1...
VITE_STRIPE_PRICE_PREMIUM_ANNUAL=price_1...
```

### Optional (Has Fallbacks)
```bash
CHECKOUT_SUCCESS_URL=https://yourdomain.com/billing/success?session_id={CHECKOUT_SESSION_ID}
CHECKOUT_CANCEL_URL=https://yourdomain.com/billing/cancel
TRIAL_DAYS_PRO=14
```

---

## Common Issues

### Issue: "Missing required param: success_url"
**Fix:** Add `CHECKOUT_SUCCESS_URL` to Netlify env vars or rely on auto-detection

### Issue: Button keeps spinning
**Fix:** Check console for errors, timeout is 15s max

### Issue: No profile created after checkout
**Fix:** Check webhook is configured and firing in Stripe Dashboard

### Issue: Magic link not arriving
**Fix:** Check spam folder, especially for Outlook/Hotmail

---

## Testing Checklist

- [ ] Checkout works WITHOUT signing in
- [ ] Redirects to Stripe immediately
- [ ] Returns to /billing/success after payment
- [ ] Shows correct email and plan
- [ ] Magic link sends successfully
- [ ] Magic link logs user in
- [ ] Profile created in Supabase
- [ ] Premium features unlocked
- [ ] Cancel flow works (/billing/cancel)
- [ ] No console errors

---

## Production Deploy

### 1. Verify Build
```bash
npm run build
# Should succeed with no errors
```

### 2. Configure Netlify
Add all required env vars to Netlify Dashboard

### 3. Deploy
```bash
git add .
git commit -m "feat: Stripe-first guest checkout"
git push origin main
```

### 4. Test Live
- Go to /pricing
- Complete checkout without auth
- Verify webhook creates profile
- Test magic link flow

---

## Monitoring

### Netlify Function Logs
```
Functions → Logs

Look for:
[create-checkout-session] Creating session: { plan: 'pro', ... }
[verify-checkout-session] Success: { email: '...', tier: 'pro' }
[webhook] Checkout completed successfully
```

### Stripe Dashboard
```
Developers → Webhooks → Your endpoint

Recent deliveries should show:
✓ checkout.session.completed → 200 OK
✓ customer.subscription.updated → 200 OK
```

### Supabase
```sql
-- Verify profile created
SELECT * FROM profiles
WHERE stripe_customer_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 10;
```

---

## Key Benefits

✅ **No forced sign-in** - Stripe first, auth later
✅ **No infinite spinners** - 15s timeout everywhere
✅ **Auto-generated URLs** - No hardcoded domains
✅ **Guest checkout** - Works without account
✅ **Clear errors** - All failures show messages
✅ **Magic links** - Easy post-purchase login
✅ **Outlook-friendly** - Warns about email delays

---

## Support

**Documentation:** See `STRIPE_FIRST_CHECKOUT_REFACTOR.md` for full details

**Quick Debug:**
1. Check browser console for errors
2. Check Netlify function logs
3. Check Stripe webhook logs
4. Check Supabase profiles table

**Contact:** support@supplementsafetybible.com
