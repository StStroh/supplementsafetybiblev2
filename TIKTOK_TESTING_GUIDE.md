# TikTok Pixel Testing Guide

## Quick Testing Checklist

Use this guide to verify TikTok Pixel is working correctly on supplementsafetybible.com.

---

## Prerequisites

- ✅ Code deployed to production (or testing locally)
- ✅ Access to browser console (F12)
- ✅ Access to TikTok Events Manager

---

## Test 1: PageView (Initial Load)

### Steps

1. Open browser console (F12 → Console tab)
2. Visit: `https://supplementsafetybible.com?ttdebug=1`
3. Look for console output

### Expected Result

```
[TikTok Pixel] PageView (no properties)
```

### TikTok Events Manager

- Go to: https://business.tiktok.com → Events → Real-time Events
- Should see: **PageView** event within 1-2 minutes
- Event should show URL: `supplementsafetybible.com`

### ✅ Pass Criteria

- [x] Console shows PageView log
- [x] TikTok Events Manager shows PageView event

---

## Test 2: PageView (Route Change)

### Steps

1. With debug mode still on (`?ttdebug=1`)
2. Navigate to another page (e.g., click "Pricing" in nav)
3. Watch console for new PageView

### Expected Result

```
[TikTok Pixel] PageView (no properties)
```

Every route change should trigger a new PageView.

### ✅ Pass Criteria

- [x] Console shows PageView on route change
- [x] Multiple PageView events in TikTok Events Manager

---

## Test 3: ViewContent (/check page)

### Steps

1. Visit: `https://supplementsafetybible.com/check?ttdebug=1`
2. Watch console output

### Expected Result

```
[TikTok Pixel] PageView (no properties)
[TikTok Pixel] ViewContent {
  content_name: "Interaction Checker",
  content_type: "tool"
}
```

### TikTok Events Manager

- Should see: **ViewContent** event
- Event properties:
  - content_name: "Interaction Checker"
  - content_type: "tool"

### ✅ Pass Criteria

- [x] Console shows both PageView and ViewContent
- [x] TikTok Events Manager shows ViewContent with correct properties

---

## Test 4: InitiateCheckout (/pricing page)

### Steps

1. Visit: `https://supplementsafetybible.com/pricing?ttdebug=1`
2. Click **"Subscribe"** button (Pro or Premium plan)
3. Watch console output

### Expected Result

```
[TikTok Pixel] InitiateCheckout {
  content_name: "Subscription",
  content_type: "pricing"
}
```

### TikTok Events Manager

- Should see: **InitiateCheckout** event
- Event properties:
  - content_name: "Subscription"
  - content_type: "pricing"

### ✅ Pass Criteria

- [x] Console shows InitiateCheckout
- [x] TikTok Events Manager shows InitiateCheckout with correct properties
- [x] Event fires BEFORE Stripe redirect

---

## Test 5: CompletePayment (Server-Side)

**Note:** This is tested separately via Stripe webhooks.

### Steps

1. Complete a test purchase using Stripe test card
2. Check Netlify function logs:
   ```bash
   netlify logs:function stripe-webhook --since 10m
   ```
3. Look for TikTok tracking log

### Expected Result

```
[StripeWebhook] ✅ TikTok purchase event tracked
```

### TikTok Events Manager

- Should see: **CompletePayment** event
- Event properties:
  - value: Purchase amount
  - currency: USD
  - event_id: Stripe session ID

### ✅ Pass Criteria

- [x] Webhook logs show TikTok tracking success
- [x] TikTok Events Manager shows CompletePayment event
- [x] Event fires ONLY after confirmed payment

**See:** `TIKTOK_PURCHASE_TRACKING.md` for complete server-side testing

---

## Troubleshooting

### Issue: No console logs showing

**Solution:**
- Verify `?ttdebug=1` is in URL
- Check browser console is open (F12)
- Refresh page with debug mode enabled

### Issue: "TikTok Pixel not loaded yet"

**Solution:**
- Wait 2-3 seconds for pixel to load
- Pixel loads asynchronously
- Try again after page fully loads

### Issue: Events not in TikTok Events Manager

**Solution:**
- Wait 2-5 minutes (slight delay is normal)
- Check Historical Events instead of Real-time Events
- Disable ad blockers (they block TikTok Pixel)
- Try in incognito/private browsing mode

### Issue: Events show in console but not TikTok

**Possible causes:**
1. **Ad blocker enabled** → Disable for testing
2. **Browser privacy extensions** → Try incognito mode
3. **Wrong Pixel ID** → Check index.html has D5MG703C77U85R08MU00
4. **Network request blocked** → Check Network tab for failed requests

---

## Manual Testing Script

Copy/paste this script to manually test all events:

```javascript
// Check if TikTok loaded
console.log('TikTok loaded?', typeof window.ttq !== 'undefined');

// Manually fire PageView
window.ttq.page();
console.log('✅ PageView fired');

// Manually fire ViewContent
window.ttq.track('ViewContent', {
  content_name: 'Test Content',
  content_type: 'test'
});
console.log('✅ ViewContent fired');

// Manually fire InitiateCheckout
window.ttq.track('InitiateCheckout', {
  content_name: 'Test Checkout',
  content_type: 'test'
});
console.log('✅ InitiateCheckout fired');
```

---

## Production Verification Checklist

After deploying to production, verify:

- [ ] PageView fires on homepage
- [ ] PageView fires on route changes
- [ ] ViewContent fires on /check page
- [ ] InitiateCheckout fires when clicking Subscribe
- [ ] CompletePayment fires after successful purchase (server-side)
- [ ] All events show in TikTok Events Manager
- [ ] Event properties are correct
- [ ] No duplicate events
- [ ] No console errors

---

## Quick Verification URLs

```bash
# Homepage with debug
https://supplementsafetybible.com?ttdebug=1

# Check page with debug
https://supplementsafetybible.com/check?ttdebug=1

# Pricing page with debug
https://supplementsafetybible.com/pricing?ttdebug=1
```

---

## TikTok Events Manager Access

1. Go to: https://business.tiktok.com
2. Login with TikTok account
3. Navigate: **Assets → Events**
4. Select Pixel: **D5MG703C77U85R08MU00**
5. View: **Real-time Events** or **Historical Events**

---

## Expected Event Volume

**Baseline estimates (adjust based on traffic):**

| Event | Daily Count | Notes |
|-------|-------------|-------|
| PageView | ~1,000 | All page loads + route changes |
| ViewContent | ~100-200 | /check page visitors |
| InitiateCheckout | ~10-20 | Pricing page CTA clicks |
| CompletePayment | ~5-10 | Confirmed purchases |

**Conversion Funnel:**
- PageView → ViewContent: ~10-20%
- ViewContent → InitiateCheckout: ~5-10%
- InitiateCheckout → CompletePayment: ~25-50%

---

## Debug Mode Examples

### Homepage
```
Visit: https://supplementsafetybible.com?ttdebug=1

Console:
[TikTok Pixel] PageView (no properties)
```

### Check Page
```
Visit: https://supplementsafetybible.com/check?ttdebug=1

Console:
[TikTok Pixel] PageView (no properties)
[TikTok Pixel] ViewContent { content_name: "Interaction Checker", content_type: "tool" }
```

### Pricing Page (after clicking Subscribe)
```
Visit: https://supplementsafetybible.com/pricing?ttdebug=1
Click: Subscribe button

Console:
[TikTok Pixel] PageView (no properties)
[TikTok Pixel] InitiateCheckout { content_name: "Subscription", content_type: "pricing" }
```

---

## Event Timeline

Typical user journey:

```
00:00 - Visit homepage
        → PageView #1

00:15 - Click "Check Interactions"
        → PageView #2

00:16 - /check page loads
        → ViewContent

01:30 - Click "Upgrade" link
        → PageView #3

01:31 - /pricing page loads

01:45 - Click "Subscribe" (Pro)
        → InitiateCheckout

01:50 - Complete Stripe checkout
        → CompletePayment (server-side)
```

---

**Testing Date:** 2025-01-18
**Pixel ID:** D5MG703C77U85R08MU00
**Status:** Ready for Testing
