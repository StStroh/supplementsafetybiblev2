# WEBHOOK SETUP STATUS

**Date:** 2025-12-30
**Status:** IN PROGRESS

---

## COMPLETED ✅

### Netlify Environment Variable Set
```
STRIPE_WEBHOOK_SECRET = whsec_rxJdmyQBRi9F584NbHW2V8I5RIQwzeKP
```

**Verification:** ✅ Correct format (starts with `whsec_`)

---

## REMAINING STEPS

### 1. Verify Stripe Webhook Endpoint Configuration

**Check in Stripe Dashboard:**
1. Go to: https://dashboard.stripe.com/webhooks
2. Verify endpoint URL is EXACTLY:
   ```
   https://supplementsafetybible.com/.netlify/functions/stripe-webhook
   ```
3. Confirm signing secret matches: `whsec_rxJdmyQBRi9F584NbHW2V8I5RIQwzeKP`

**Events must be enabled:**
- ✅ `checkout.session.completed` (REQUIRED)
- ✅ `customer.subscription.updated` (recommended)
- ✅ `customer.subscription.deleted` (recommended)

---

### 2. Verify Other Required Netlify Env Vars

**Server-Side (MUST be set):**
```bash
STRIPE_SECRET_KEY           # sk_live_... or sk_test_...
SUPABASE_URL                # https://qbefejbnxrsdwtsbkmon.supabase.co
SUPABASE_SERVICE_ROLE_KEY   # Service role key (long JWT)
```

**Frontend (MUST be set):**
```bash
VITE_SUPABASE_URL           # Same as SUPABASE_URL
VITE_SUPABASE_ANON_KEY      # Anon key
VITE_STRIPE_PUBLISHABLE_KEY # pk_live_... or pk_test_...
```

---

### 3. Deploy to Production

**After all env vars are set:**
```bash
git push origin main
```

**Or force redeploy:**
```bash
git commit --allow-empty -m "Deploy with webhook secret"
git push origin main
```

---

### 4. Test Webhook

**Option A: Send Test Event from Stripe**
1. Stripe Dashboard → Webhooks → Your endpoint
2. Click "Send test webhook"
3. Select: `checkout.session.completed`
4. Check Netlify logs for success

**Option B: Complete Test Payment**
1. Use test card: `4242 4242 4242 4242`
2. Complete checkout
3. Check Netlify logs

---

## VERIFICATION COMMANDS

**Check Netlify env vars are set:**
```bash
netlify env:list
```

**Expected output should include:**
```
STRIPE_WEBHOOK_SECRET       (set)
STRIPE_SECRET_KEY           (set)
SUPABASE_URL                (set)
SUPABASE_SERVICE_ROLE_KEY   (set)
VITE_SUPABASE_URL           (set)
VITE_SUPABASE_ANON_KEY      (set)
VITE_STRIPE_PUBLISHABLE_KEY (set)
```

**View webhook function logs:**
```bash
netlify functions:log stripe-webhook --tail
```

**Expected on successful webhook:**
```
[StripeWebhook] boot ok | supabase: kmon
[StripeWebhook] ========== INCOMING WEBHOOK ==========
[StripeWebhook] ✅ Signature verified
[StripeWebhook] Event type: checkout.session.completed
[StripeWebhook] ✅ PROVISIONING COMPLETE
```

---

## NEXT IMMEDIATE ACTIONS

1. **Verify Stripe webhook endpoint exists and has correct URL**
2. **Set remaining Netlify env vars** (if not already set)
3. **Deploy:** `git push origin main`
4. **Test:** Send test webhook from Stripe Dashboard
5. **Monitor:** Watch Netlify function logs

---

## QUICK TEST SCRIPT

Save and run after deploy:

```bash
#!/bin/bash
echo "🔍 Testing Webhook Configuration..."
echo ""
echo "1. Checking Netlify deployment..."
netlify status

echo ""
echo "2. Checking functions deployed..."
netlify functions:list | grep stripe-webhook

echo ""
echo "3. Next: Send test webhook from Stripe Dashboard"
echo "   URL: https://dashboard.stripe.com/webhooks"
echo "   Event: checkout.session.completed"
echo ""
echo "4. Watch logs with:"
echo "   netlify functions:log stripe-webhook --tail"
```

---

**Status:** Webhook secret configured ✅
**Next:** Verify Stripe endpoint + deploy + test
