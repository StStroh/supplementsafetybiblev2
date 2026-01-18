# TikTok Purchase Tracking - Verification Checklist

## Pre-Deployment Checklist

### 1. Environment Variables Setup

Go to Netlify Dashboard → Site Settings → Environment Variables

```bash
# Add these two variables:
TIKTOK_PIXEL_ID=D5MDLNRC77U6NESDNRNG
TIKTOK_ACCESS_TOKEN=your_actual_token_here
```

**Where to get access token:**
1. Visit [TikTok Events Manager](https://business.tiktok.com)
2. Go to Assets → Events
3. Select pixel: D5MDLNRC77U6NESDNRNG
4. Settings → Generate Access Token
5. Copy token to Netlify

- [ ] TIKTOK_PIXEL_ID added to Netlify
- [ ] TIKTOK_ACCESS_TOKEN added to Netlify
- [ ] Token has `event:write` permission

---

## Deployment Checklist

### 2. Deploy Code

```bash
git add .
git commit -m "Add TikTok server-side purchase tracking"
git push origin main
```

- [ ] Code committed to git
- [ ] Code pushed to main branch
- [ ] Netlify build triggered
- [ ] Build completed successfully
- [ ] Functions deployed

---

## Post-Deployment Verification

### 3. Test Purchase Flow

**Using Stripe Test Mode:**

1. Make a test purchase using Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

2. Check Netlify function logs:
   ```bash
   netlify logs:function stripe-webhook
   ```

**Expected logs:**
```
[StripeWebhook] ========== INCOMING WEBHOOK ==========
[StripeWebhook] ✅ Signature verified
[StripeWebhook] Event type: checkout.session.completed
[StripeWebhook] Processing checkout.session.completed: cs_test_...
[StripeWebhook] Email: test@example.com
[StripeWebhook] ✅ Email validated
[StripeWebhook] Plan: pro
[StripeWebhook] ✅ Profile created: ...
[TikTok] Sending CompletePayment event: cs_test_...
[TikTok] ✅ Purchase event sent successfully: cs_test_...
[StripeWebhook] ✅ TikTok purchase event tracked
[StripeWebhook] ✅ PROVISIONING COMPLETE
[StripeWebhook] ========== WEBHOOK COMPLETE ==========
```

- [ ] Test purchase completed
- [ ] Webhook logs show TikTok event sent
- [ ] No errors in logs
- [ ] Customer provisioned successfully

---

### 4. Verify in TikTok Events Manager

1. Go to [TikTok Events Manager](https://business.tiktok.com)
2. Navigate to Events → Real-time Events
3. Look for recent CompletePayment events

**Expected data:**
- Event name: `CompletePayment`
- Event ID: Matches Stripe session ID (cs_test_...)
- Value: Matches purchase amount
- Currency: Matches purchase currency (USD)
- Timestamp: Recent (last few minutes)

- [ ] Event appears in TikTok Events Manager
- [ ] Event ID matches Stripe session ID
- [ ] Value matches purchase amount
- [ ] No duplicate events for same session

---

### 5. Error Handling Test

**Test TikTok failure (optional):**

1. Temporarily set invalid access token:
   ```bash
   TIKTOK_ACCESS_TOKEN=invalid_token
   ```

2. Make test purchase

3. Check logs:
   ```
   [StripeWebhook] ⚠️ TikTok tracking failed (non-critical): ...
   [StripeWebhook] ✅ PROVISIONING COMPLETE
   ```

**Expected behavior:**
- Customer still gets provisioned ✅
- Webhook returns 200 ✅
- TikTok error logged (non-critical) ✅
- No crash or failure ✅

4. Restore correct token

- [ ] Customer provisioned despite TikTok error
- [ ] Webhook didn't crash
- [ ] Error logged as non-critical

---

### 6. Deduplication Test

**Test duplicate webhook calls:**

1. Note a recent checkout session ID from logs
2. Send duplicate webhook (Stripe dashboard → Webhooks → Resend)
3. Check logs:
   ```
   [StripeWebhook] ⚠️ Checkout session already processed: completed
   ```

**Expected behavior:**
- Webhook returns 200 immediately ✅
- No duplicate profile creation ✅
- No duplicate TikTok event ✅

- [ ] Duplicate webhooks handled correctly
- [ ] No duplicate TikTok events sent
- [ ] Idempotency working as expected

---

## Production Verification

### 7. Real Purchase Test

**After all tests pass, verify with real purchase:**

1. Use real credit card (small amount test)
2. Complete checkout
3. Verify in logs (live mode):
   ```
   [StripeWebhook] Event type: checkout.session.completed
   [TikTok] ✅ Purchase event sent successfully: cs_live_...
   ```

4. Check TikTok Events Manager for live event

- [ ] Real purchase tracked successfully
- [ ] Event shows in TikTok with correct data
- [ ] Customer received access
- [ ] No errors in production logs

---

## Monitoring Setup

### 8. Ongoing Monitoring

**Set up alerts for:**

1. **Netlify Function Errors**
   - Monitor stripe-webhook function
   - Alert on repeated failures

2. **TikTok API Errors**
   - Search logs for: `[TikTok] API error`
   - Weekly review recommended

3. **Event Count Comparison**
   - Weekly: Compare Stripe purchases vs TikTok events
   - Should match 1:1 (accounting for deduplication)

**Monitoring commands:**
```bash
# Check recent webhook logs
netlify logs:function stripe-webhook --since 1h

# Search for TikTok errors
netlify logs:function stripe-webhook | grep "TikTok.*error"

# Count successful TikTok events today
netlify logs:function stripe-webhook | grep "TikTok.*successfully"
```

- [ ] Function monitoring set up
- [ ] Error alerting configured
- [ ] Weekly review scheduled

---

## Troubleshooting Guide

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "Access token not configured" | TIKTOK_ACCESS_TOKEN missing | Add to Netlify env vars |
| "TikTok API error: Invalid token" | Token expired or invalid | Regenerate in TikTok Events Manager |
| No events in TikTok | Wrong pixel ID | Verify TIKTOK_PIXEL_ID matches |
| Duplicate events | Session reprocessed | Check stripe_events table |
| "Missing required fields" | Stripe data issue | Check webhook payload structure |

### Debug Commands

```bash
# View recent webhook calls
netlify logs:function stripe-webhook --since 30m

# Check environment variables
netlify env:list | grep TIKTOK

# Test webhook locally (if needed)
netlify dev
```

---

## Success Criteria

### All Must Pass

- [x] Build completes successfully
- [ ] Environment variables configured
- [ ] Code deployed to production
- [ ] Test purchase tracked correctly
- [ ] Event appears in TikTok Events Manager
- [ ] Deduplication working
- [ ] Error handling verified
- [ ] Real purchase verified
- [ ] Monitoring set up

---

## Sign-Off

**Tested by:** _________________

**Date:** _________________

**Production URL:** https://supplementsafetybible.com

**TikTok Pixel ID:** D5MDLNRC77U6NESDNRNG

**Status:** ☐ Ready for Production ☐ Issues Found (see notes)

**Notes:**
```
[Add any issues or observations here]
```

---

## Quick Reference

### Key Files
- `netlify/functions/stripe-webhook.cjs` - Main webhook handler
- `netlify/functions/_lib/tiktokTracking.cjs` - TikTok helper

### Key Logs to Watch
```
[TikTok] ✅ Purchase event sent successfully
[StripeWebhook] ✅ PROVISIONING COMPLETE
```

### Key Metrics
- Purchase events in TikTok should match Stripe purchases 1:1
- Event IDs should match Stripe session IDs
- No duplicate events for same session

---

**Last Updated:** 2025-01-18
**Status:** Ready for Production Testing
