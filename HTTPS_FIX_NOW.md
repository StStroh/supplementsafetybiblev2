# HTTPS FIX - IMMEDIATE ACTION REQUIRED

## Current Problem (Verified Dec 14, 2025)

**Status:**
- ✅ www.supplementsafetybible.com → Works perfectly
- ❌ supplementsafetybible.com → TLS handshake error

**Issue:** Valid SSL certificate exists but apex domain not serving it correctly.

---

## Quick Fix (5 Minutes)

### Option A: Netlify Dashboard (Recommended)

1. **Login:** https://app.netlify.com
2. **Navigate:** Your Site → Domain management
3. **Verify:** Click "Verify DNS configuration" button
4. **Renew:** Click "Renew certificate" button
5. **Wait:** 5-10 minutes for Let's Encrypt
6. **Test:** https://supplementsafetybible.com

### Option B: Temporary Workaround (If Option A Fails)

**Make www the primary domain:**

1. Netlify → Domain management
2. Find: www.supplementsafetybible.com
3. Click: "Set as primary domain"
4. Result: Apex redirects to www (which works)

This sidesteps the apex TLS issue while you wait for Netlify support.

---

## DNS Requirements (If Verification Fails)

**At your domain registrar, ensure:**

**Apex:**
```
Type: A    Name: @    Value: 75.2.60.5
Type: A    Name: @    Value: 99.83.231.61
```

**WWW:**
```
Type: CNAME    Name: www    Value: [yoursite].netlify.app
```

**Remove:**
- Old A records
- AAAA records (IPv6)
- Conflicting records

**If using Cloudflare:**
- Proxy status: OFF (gray cloud)
- SSL/TLS mode: Full (strict)

---

## Verification Commands

**Test apex:**
```bash
curl -I https://supplementsafetybible.com
```
Expected: HTTP/2 200 (no TLS errors)

**Test www:**
```bash
curl -I https://www.supplementsafetybible.com
```
Expected: HTTP/2 301 → apex

---

## If Still Broken After 24 Hours

**Contact Netlify Support:**

Subject: "Apex domain TLS handshake failure"

Message:
```
Domain: supplementsafetybible.com
Issue: TLS alert internal error on apex only
Status: www works, apex fails
Error: error:0A000438:SSL routines::tlsv1 alert internal error
Certificate: Valid LE cert exists, visible on www
Request: Investigate apex certificate routing
```

---

## Expected Outcome

After successful fix:

✅ https://supplementsafetybible.com → Loads
✅ https://www.supplementsafetybible.com → Redirects to apex  
✅ Valid SSL certificate on both
✅ Lock icon in browser
✅ No errors in curl

---

**Full details:** See SSL_FIX_CURRENT_STATUS.md
