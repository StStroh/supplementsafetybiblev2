# TikTok Purchase Tracking - Quick Start

## 🎯 What Was Built

Server-side TikTok purchase tracking that fires ONLY after confirmed Stripe payments. Zero double-counting, fully production-safe.

---

## ⚡ Setup in 3 Steps

### 1️⃣ Get TikTok Access Token (5 min)

1. Go to: https://business.tiktok.com
2. Navigate: **Assets** → **Events** → **Settings**
3. Click: **Generate Access Token**
4. Ensure permission: `event:write`
5. Copy token

### 2️⃣ Add to Netlify (2 min)

Netlify Dashboard → Site Settings → Environment Variables → Add

```bash
TIKTOK_PIXEL_ID=D5MDLNRC77U6NESDNRNG
TIKTOK_ACCESS_TOKEN=paste_your_token_here
```

### 3️⃣ Deploy (1 min)

```bash
git add .
git commit -m "Add TikTok server-side purchase tracking"
git push origin main
```

Done! Netlify auto-deploys.

---

## ✅ Verify It Works

### Test Purchase

1. Use Stripe test card: `4242 4242 4242 4242`
2. Complete checkout

### Check Logs

```bash
netlify logs:function stripe-webhook --since 10m
```

Look for:
```
[TikTok] ✅ Purchase event sent successfully: cs_test_...
```

### Check TikTok Events Manager

1. Go to: https://business.tiktok.com
2. Navigate: **Events** → **Real-time Events**
3. Look for: **CompletePayment** event (last few minutes)

---

## 🔍 What Gets Tracked

| Field | Value | Example |
|-------|-------|---------|
| Event | CompletePayment | (fixed) |
| Event ID | Stripe session ID | cs_live_abc123 |
| Email | SHA256 hashed | (hashed) |
| Value | Purchase amount | 19.99 |
| Currency | Purchase currency | USD |
| Timestamp | Current time | (unix) |

---

## 🛡️ Safety Features

✅ **Deduplication** - Uses Stripe session ID as event_id
✅ **Non-blocking** - TikTok errors don't break provisioning
✅ **Server-side only** - Zero frontend tracking
✅ **Idempotency** - Duplicate webhooks handled automatically
✅ **Error handling** - Comprehensive logging

---

## 📊 Monitor Success

```bash
# Check last hour's events
netlify logs:function stripe-webhook --since 1h | grep TikTok

# Expected output:
[TikTok] Sending CompletePayment event: cs_live_...
[TikTok] ✅ Purchase event sent successfully: cs_live_...
```

---

## 🚨 Troubleshooting

| Issue | Fix |
|-------|-----|
| "Access token not configured" | Add TIKTOK_ACCESS_TOKEN to Netlify |
| "TikTok API error" | Regenerate token in TikTok Events Manager |
| No events in TikTok | Check pixel ID matches: D5MDLNRC77U6NESDNRNG |

---

## 📁 Files Changed

**Created:**
- `netlify/functions/_lib/tiktokTracking.cjs` - TikTok helper
- `TIKTOK_PURCHASE_TRACKING.md` - Full docs
- `TIKTOK_VERIFICATION_CHECKLIST.md` - Test guide

**Modified:**
- `netlify/functions/stripe-webhook.cjs` - Added tracking
- `.env.example` - Added TikTok vars

---

## 📚 Documentation

- **Full Guide:** `TIKTOK_PURCHASE_TRACKING.md`
- **Test Checklist:** `TIKTOK_VERIFICATION_CHECKLIST.md`
- **Implementation Summary:** `TIKTOK_IMPLEMENTATION_SUMMARY.md`
- **This Quick Start:** `TIKTOK_QUICK_START.md`

---

## ✨ That's It!

Your TikTok purchase tracking is production-ready. Just add the access token and deploy.

**Questions?** Check the full documentation in `TIKTOK_PURCHASE_TRACKING.md`

---

**Status:** ✅ Ready to Deploy
**Setup Time:** ~8 minutes
**Risk Level:** Low (non-breaking)
