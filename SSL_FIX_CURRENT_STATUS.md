═══════════════════════════════════════════════════════════════
  HTTPS RESTORATION GUIDE - CURRENT STATUS (Dec 2025)
═══════════════════════════════════════════════════════════════

## DIAGNOSIS COMPLETE ✅

### Current Status (Verified Dec 14, 2025)

**WWW Subdomain: ✅ WORKING**
```bash
$ curl -I https://www.supplementsafetybible.com
HTTP/2 301 
server: Netlify
location: https://supplementsafetybible.com/

Certificate Details:
- Subject: CN=supplementsafetybible.com
- SAN: *.supplementsafetybible.com
- Issuer: Let's Encrypt (E8)
- Status: Valid ✅
```

**Apex Domain: ❌ BROKEN**
```bash
$ curl -I https://supplementsafetybible.com
TLS connect error: error:0A000438:SSL routines::tlsv1 alert internal error

HTTP works but redirects to broken HTTPS:
$ curl -I http://supplementsafetybible.com
HTTP/1.1 301 Moved Permanently
Location: https://supplementsafetybible.com/  ← Redirects to broken HTTPS
```

### Root Cause

The SSL certificate EXISTS and is VALID (visible on www subdomain), but the apex domain is experiencing a **TLS handshake failure**. This is a Netlify certificate routing/configuration issue, not a DNS problem.

The apex domain:
- Has correct DNS (points to Netlify)
- Has a valid certificate (same cert as www)
- But is NOT serving that certificate correctly
- Results in TLS internal error during handshake

═══════════════════════════════════════════════════════════════
                    SOLUTION STEPS
═══════════════════════════════════════════════════════════════

## Step 1: Access Netlify Dashboard

1. Go to: https://app.netlify.com
2. Login to your account
3. Select your site (supplementsafetybible)

## Step 2: Navigate to Domain Settings

1. Click **"Domain management"** in the left sidebar
2. You should see both domains listed:
   - supplementsafetybible.com (Primary)
   - www.supplementsafetybible.com

## Step 3: Check Current Certificate Status

Look for the **"HTTPS"** section:

Expected Current State:
- ❌ Certificate may show "Active" but apex is broken
- ❌ Or shows "Needs renewal"
- ❌ Or shows "Configuration error"

## Step 4: Verify DNS Configuration

Click **"Verify DNS configuration"** button:
- Both domains should show ✅ Verified
- If not verified, there's a DNS issue (see Step 8)

If DNS shows verified but HTTPS still broken:
→ Continue to Step 5

## Step 5: Renew Certificate

Click **"Renew certificate"** or **"Provision certificate"** button

Wait 5-10 minutes for Let's Encrypt to issue new certificate

The certificate MUST include BOTH:
- supplementsafetybible.com (apex)
- www.supplementsafetybible.com (www)

Check the SAN (Subject Alternative Names) list after provisioning.

## Step 6: Force HTTPS Redirect

Ensure **"Force HTTPS"** is enabled:
- This should redirect all HTTP → HTTPS
- Located in HTTPS section of Domain management

## Step 7: Set Primary Domain

Ensure **supplementsafetybible.com** (apex) is set as primary:
- This makes www redirect to apex
- Click "Set as primary domain" if needed

## Step 8: DNS Records (If DNS Verification Failed)

Required DNS records at your registrar:

**Apex Domain:**
```
Type: A
Name: @ (or blank)
Value: 75.2.60.5

Type: A  
Name: @ (or blank)
Value: 99.83.231.61
```

**WWW Subdomain:**
```
Type: CNAME
Name: www
Value: [your-site-name].netlify.app
```

**Remove any:**
- Old A records
- AAAA records (IPv6)
- Conflicting CNAME records

**If using Cloudflare:**
- Turn proxy to "DNS only" (gray cloud)
- SSL/TLS mode: "Full (strict)"

## Step 9: Wait for Propagation

After certificate renewal:
- Wait 5-10 minutes
- Clear browser cache (Ctrl+Shift+R)
- Test in incognito window

═══════════════════════════════════════════════════════════════
                    VERIFICATION TESTS
═══════════════════════════════════════════════════════════════

### Test 1: Apex HTTPS
```bash
curl -I https://supplementsafetybible.com
```
**Expected:** HTTP/2 200 (or 30x redirect with no TLS errors)

### Test 2: WWW HTTPS
```bash
curl -I https://www.supplementsafetybible.com
```
**Expected:** HTTP/2 301 → https://supplementsafetybible.com/

### Test 3: HTTP Redirect
```bash
curl -I http://supplementsafetybible.com
```
**Expected:** 301 → https://supplementsafetybible.com/

### Test 4: Browser Test
Visit: https://supplementsafetybible.com
**Expected:** Page loads with lock icon ✅

═══════════════════════════════════════════════════════════════
                    TROUBLESHOOTING
═══════════════════════════════════════════════════════════════

### Issue: Certificate Renewal Fails

**Error: "DNS not verified"**
→ Check DNS records match Step 8
→ Wait 30-60 minutes for DNS propagation
→ Try verification again

**Error: "Rate limited"**
→ Let's Encrypt limit: 5 requests per week
→ Wait 7 days OR contact Netlify support

**Error: "Internal error"**
→ Netlify backend issue
→ Contact Netlify support

### Issue: Still Failing After Certificate Renewal

**Temporary Workaround:**
Set www as primary domain instead:
1. Domain management → www.supplementsafetybible.com
2. Click "Set as primary domain"
3. Now apex redirects to www (which works)
4. This sidesteps the apex TLS issue

**Permanent Fix:**
Contact Netlify support:
- Subject: "Apex domain TLS handshake failure"
- Domain: supplementsafetybible.com
- Error: "TLS alert internal error"
- Note: www works, apex fails
- Certificate is valid but not served on apex

### Issue: Cloudflare Interference

If using Cloudflare:
1. DNS tab → Click orange cloud → Make GRAY
2. SSL/TLS → Mode → Set to "Full (strict)"
3. Turn OFF "Always Use HTTPS" (let Netlify handle)
4. Wait 5 minutes
5. Retry certificate provisioning in Netlify

═══════════════════════════════════════════════════════════════
                    TECHNICAL DETAILS
═══════════════════════════════════════════════════════════════

**Current Certificate (on www):**
- Subject: CN=supplementsafetybible.com
- SAN: *.supplementsafetybible.com
- Issuer: Let's Encrypt (E8)
- Valid: Yes
- Served on: www.supplementsafetybible.com ✅
- Served on: supplementsafetybible.com ❌

**TLS Error Details:**
```
TLSv1.3 (IN), TLS alert, internal error (592)
```

This indicates the server is rejecting the TLS handshake, likely due to:
1. Certificate routing misconfiguration
2. CDN edge cache serving old/invalid cert
3. Internal Netlify CDN issue

**Why WWW Works But Apex Fails:**
- Different routing paths in Netlify CDN
- Apex may be cached with old certificate
- Renewal should clear cache and fix routing

═══════════════════════════════════════════════════════════════
                    NETLIFY SUPPORT TEMPLATE
═══════════════════════════════════════════════════════════════

If renewal doesn't fix it within 24 hours, contact support:

**Subject:** Apex domain TLS handshake failure - certificate routing issue

**Body:**
```
Domain: supplementsafetybible.com
Issue: TLS connect error on apex domain only

Current Status:
- www.supplementsafetybible.com: ✅ Works perfectly
- supplementsafetybible.com: ❌ TLS alert internal error

Certificate Status:
- Valid Let's Encrypt certificate exists
- SAN includes both apex and www
- Certificate serves correctly on www
- Certificate fails on apex with TLS handshake error

Error:
curl: (35) TLS connect error: error:0A000438:SSL routines::tlsv1 alert internal error

DNS:
- All records verified in Netlify dashboard
- Apex points to Netlify IPs correctly
- www CNAME points to netlify.app correctly

Steps Attempted:
- Verified DNS configuration ✅
- Renewed certificate ✅
- Cleared browser cache ✅
- Tested from multiple locations ✅
- www works, apex fails consistently

Request:
Please investigate apex domain certificate routing and CDN configuration.
The certificate exists and is valid, but not being served on apex domain.
```

═══════════════════════════════════════════════════════════════
                    QUICK CHECKLIST
═══════════════════════════════════════════════════════════════

- [ ] Access Netlify Dashboard
- [ ] Navigate to Domain management
- [ ] Click "Verify DNS configuration"
- [ ] Both domains show verified ✅
- [ ] Click "Renew certificate"
- [ ] Wait 5-10 minutes
- [ ] Check certificate includes both apex and www
- [ ] Enable "Force HTTPS"
- [ ] Set apex as primary domain
- [ ] Clear browser cache
- [ ] Test: curl -I https://supplementsafetybible.com
- [ ] Test: curl -I https://www.supplementsafetybible.com
- [ ] Test in browser with lock icon ✅
- [ ] If still failing after 24h: Contact Netlify support

═══════════════════════════════════════════════════════════════
                    EXPECTED OUTCOME
═══════════════════════════════════════════════════════════════

After successful renewal:

✅ https://supplementsafetybible.com → Loads with valid SSL
✅ https://www.supplementsafetybible.com → Redirects to apex
✅ http://supplementsafetybible.com → Redirects to HTTPS
✅ Browser shows lock icon
✅ No certificate warnings
✅ curl commands return HTTP/2 with no errors

═══════════════════════════════════════════════════════════════
