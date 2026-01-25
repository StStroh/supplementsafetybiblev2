# Quick Start - Email Fix (5 Minutes)

## 🎯 Problem
Homepage "Get Free Guide" email capture not sending emails.

## ✅ Solution
Configure Resend API in Netlify.

---

## 📋 STEPS

### 1. Get Resend API Key (2 min)
1. Go to https://resend.com
2. Sign up (free)
3. Click **API Keys** → **Create API Key**
4. Copy key (starts with `re_`)

### 2. Configure Netlify (2 min)
1. Netlify Dashboard → Your Site → **Site settings**
2. **Environment variables** → **Add a variable**
3. Add these:

```
RESEND_API_KEY=re_your_actual_key_here
EMAIL_FROM=onboarding@resend.dev
GUIDE_URL=https://supplementsafetybible.com/guides/top-20-dangerous-interactions.pdf
DEBUG_EMAIL=false
```

### 3. Test (1 min)
1. Visit your homepage
2. Submit your email
3. Check inbox (and spam)

---

## 🧪 Verify It Works

### Check Database
```sql
SELECT * FROM lead_magnets ORDER BY created_at DESC LIMIT 1;
```
**Expected:** `status = 'sent'`

### Check Netlify Logs
**Functions** → `send-guide` → Recent invocations
**Look for:** `Email sent successfully via Resend`

---

## 🚨 If It Doesn't Work

### Email not received?
1. Check spam folder
2. Verify API key in Netlify
3. Check function logs for errors

### Status = 'failed'?
```sql
SELECT error FROM lead_magnets ORDER BY created_at DESC LIMIT 1;
```
Check error message for details.

### Need more help?
See full guide: `LEAD_MAGNET_EMAIL_DEPLOYMENT.md`

---

## ✅ Done!
Emails now send automatically via Resend.

**Free tier:** 3,000 emails/month
**Deliverability:** Industry-leading
**Cost:** $0 (starts free)
