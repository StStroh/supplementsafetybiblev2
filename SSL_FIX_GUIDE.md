═══════════════════════════════════════════════════════════════
  HTTPS/SSL FIX GUIDE FOR supplementsafetybible.com
═══════════════════════════════════════════════════════════════

ISSUE: ERR_SSL_PROTOCOL_ERROR when accessing supplementsafetybible.com

STATUS: Configuration files are CLEAN ✅
  - netlify.toml: No TLS issues
  - Headers: Properly configured
  - Redirects: Correct SPA fallback
  - No conflicting _headers or _redirects files

ROOT CAUSE: DNS/Certificate provisioning issue (not code)

═══════════════════════════════════════════════════════════════
                    STEP 0: VERIFY BUILD IS OK
═══════════════════════════════════════════════════════════════

Test the Netlify subdomain (bypasses custom domain DNS):

  https://supplementsafetybible.netlify.app

  OR

  https://supplement-safety-bible.netlify.app

If this works:
  ✅ Build is fine, issue is DNS/certificate
  → Continue to Step 1

If this fails:
  ❌ Build is broken
  → Fix build first in Netlify logs
  → Don't continue until subdomain works

═══════════════════════════════════════════════════════════════
            STEP 1: CHECK NETLIFY DOMAIN SETTINGS
═══════════════════════════════════════════════════════════════

Go to: Netlify Dashboard → Your Site → Domain management

Check these for BOTH domains:
  - supplementsafetybible.com (apex)
  - www.supplementsafetybible.com (www)

Required Status:
  DNS Verification: ✅ Verified (green)
  Certificate: ✅ Active (green)
  HTTPS: ✅ Enabled

If Certificate shows "Pending" or "Failed":
  1. Click "Verify DNS configuration"
  2. Wait 1-2 minutes
  3. Click "Provision certificate" or "Renew certificate"
  4. Wait 5-10 minutes for Let's Encrypt issuance

If DNS shows "Not verified":
  → Continue to Step 2 to fix DNS records

═══════════════════════════════════════════════════════════════
              STEP 2: VERIFY CORRECT DNS RECORDS
═══════════════════════════════════════════════════════════════

Where is your DNS managed?
  Option A: External DNS (GoDaddy, Cloudflare, Namecheap, etc.)
  Option B: Netlify DNS

─────────────────────────────────────────────────────────────
OPTION A: External DNS Provider
─────────────────────────────────────────────────────────────

Required Records:

1. APEX (supplementsafetybible.com) → A Records

   Type: A
   Name: @ (or blank)
   Value: 75.2.60.5
   TTL: Auto or 3600

   Type: A
   Name: @ (or blank)
   Value: 99.83.190.102
   TTL: Auto or 3600

2. WWW (www.supplementsafetybible.com) → CNAME

   Type: CNAME
   Name: www
   Value: supplementsafetybible.netlify.app
   TTL: Auto or 3600

CRITICAL FIXES:

❌ Remove any OLD records pointing to:
   - Old hosting providers (Heroku, Vercel, etc.)
   - Old IP addresses
   - Cloudflare proxy IPs
   - Any AAAA records (IPv6)

❌ If using Cloudflare:
   - Click the orange cloud to make it GRAY (DNS only)
   - DO NOT proxy through Cloudflare while Netlify handles SSL
   - After cert is issued, you can enable proxy if needed

After making changes:
  1. Save DNS records
  2. Wait 5-15 minutes for propagation
  3. Return to Netlify → Verify DNS configuration
  4. Provision certificate

─────────────────────────────────────────────────────────────
OPTION B: Netlify DNS
─────────────────────────────────────────────────────────────

If using Netlify DNS (nameservers set to Netlify):
  1. Check Domain management → DNS records
  2. Should show the correct A and CNAME records above
  3. If missing, add them manually
  4. Wait 5 minutes and provision certificate

═══════════════════════════════════════════════════════════════
            STEP 3: RE-PROVISION SSL CERTIFICATE
═══════════════════════════════════════════════════════════════

Once DNS is correct:

1. Go to: Netlify → Domain management
2. Click "Verify DNS configuration"
3. Wait for both domains to show "Verified" ✅
4. Click "Provision certificate" (or "Renew certificate")
5. Ensure both domains are in the SAN list:
   - supplementsafetybible.com
   - www.supplementsafetybible.com
6. Wait 5-10 minutes for Let's Encrypt
7. Enable "Force HTTPS" (if not already on)

Common Issues:

❌ Certificate fails with "DNS not verified"
   → DNS records not correct (return to Step 2)
   → Wait longer for propagation (can take 1 hour)

❌ Certificate fails with "Rate limit"
   → Let's Encrypt has rate limits (5 per week)
   → Wait 1 week, or contact Netlify support

❌ Certificate pending for >30 minutes
   → Cancel and retry
   → Check Cloudflare proxy is OFF (gray cloud)

═══════════════════════════════════════════════════════════════
              STEP 4: TEST END-TO-END HTTPS
═══════════════════════════════════════════════════════════════

Once certificate shows "Active":

Test 1: Apex
  Visit: https://supplementsafetybible.com
  Expected: Page loads with lock icon ✅

Test 2: WWW
  Visit: https://www.supplementsafetybible.com
  Expected: Page loads with lock icon ✅

Test 3: HTTP Redirect
  Visit: http://supplementsafetybible.com
  Expected: Redirects to https:// automatically

Test 4: Terminal Check
  Run: curl -I https://supplementsafetybible.com
  Expected: HTTP/2 200 or 301 (no SSL errors)

If all tests pass:
  ✅ HTTPS is fully working!
  → Done!

If apex fails but www works:
  → Continue to Step 5

═══════════════════════════════════════════════════════════════
        STEP 5: TEMPORARY FIX (if apex still failing)
═══════════════════════════════════════════════════════════════

If www works but apex fails:

Option A: Set WWW as Primary Domain
  1. Netlify → Domain management
  2. Click "Set as primary domain" next to www.supplementsafetybible.com
  3. Netlify auto-redirects apex → www
  4. This sidesteps apex SSL issues

Option B: Manual Redirect (temporary)
  1. Add this to netlify.toml:

     [[redirects]]
       from = "https://supplementsafetybible.com/*"
       to = "https://www.supplementsafetybible.com/:splat"
       status = 301
       force = true
       conditions = {Domain = ["supplementsafetybible.com"]}

  2. Deploy
  3. Users redirected to www (which has valid cert)
  4. Remove after apex cert is fixed

═══════════════════════════════════════════════════════════════
              STEP 6: ADVANCED DIAGNOSTICS
═══════════════════════════════════════════════════════════════

Still not working? Run these checks:

DNS Propagation Check:
  https://dnschecker.org
  Enter: supplementsafetybible.com
  Type: A
  Expected: 75.2.60.5 and 99.83.190.102 worldwide

  Enter: www.supplementsafetybible.com
  Type: CNAME
  Expected: supplementsafetybible.netlify.app

SSL Certificate Check:
  https://www.ssllabs.com/ssltest/
  Enter: supplementsafetybible.com
  Expected: Grade A or B (not "No SSL")

Netlify Status:
  https://www.netlifystatus.com
  Check if Netlify CDN is having issues

Cloudflare Check (if applicable):
  1. Login to Cloudflare
  2. Select supplementsafetybible.com
  3. SSL/TLS tab → Overview
  4. Set to: "Full" or "Full (strict)"
  5. Turn OFF "Always Use HTTPS" (Netlify handles this)
  6. Turn OFF proxy (gray cloud) on DNS tab

Browser Cache:
  1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
  2. Or try incognito/private window
  3. Or different browser

Terminal Debug:
  curl -vI https://supplementsafetybible.com 2>&1 | grep -i ssl

  Look for errors like:
  - "SSL certificate problem"
  - "SSL handshake failed"
  - "Certificate verify failed"

═══════════════════════════════════════════════════════════════
              STEP 7: CONTACT NETLIFY SUPPORT
═══════════════════════════════════════════════════════════════

If nothing above works after 24 hours:

1. Go to: Netlify Dashboard → Support
2. Subject: "SSL certificate not provisioning for supplementsafetybible.com"
3. Include:
   - Domain: supplementsafetybible.com
   - Error: ERR_SSL_PROTOCOL_ERROR
   - DNS provider: [GoDaddy/Cloudflare/etc.]
   - DNS records: [paste A and CNAME values]
   - Steps tried: [DNS verification, cert provisioning, etc.]
   - Screenshots of Domain management panel

Netlify support can:
  - Manually provision certificate
  - Check for DNS propagation issues
  - Bypass Let's Encrypt rate limits
  - Investigate CDN routing issues

═══════════════════════════════════════════════════════════════
                    COMMON SCENARIOS
═══════════════════════════════════════════════════════════════

Scenario 1: Just deployed, first time setup
  Cause: DNS not propagated yet
  Fix: Wait 1-24 hours, then provision cert

Scenario 2: Was working, stopped after code deploy
  Cause: Unlikely code issue (config is clean)
  Fix: Re-provision certificate in Netlify

Scenario 3: Domain transferred from old host
  Cause: Old DNS records cached
  Fix: Update DNS, wait for TTL expiry (1-24 hours)

Scenario 4: Using Cloudflare
  Cause: Orange cloud proxy interfering
  Fix: Set to gray cloud (DNS only) until cert issued

Scenario 5: Certificate expired
  Cause: Auto-renewal failed
  Fix: Re-provision certificate manually

Scenario 6: Rate limited by Let's Encrypt
  Cause: Too many cert requests (5 per week limit)
  Fix: Wait 7 days, or contact Netlify for manual cert

═══════════════════════════════════════════════════════════════
                    CONFIGURATION STATUS
═══════════════════════════════════════════════════════════════

Your netlify.toml configuration: ✅ CLEAN

Headers:
  ✅ HSTS: Properly configured
  ✅ Security headers: All good
  ✅ CSP: Correct for Stripe/Supabase
  ✅ No custom TLS directives
  ✅ No malformed headers

Redirects:
  ✅ SPA fallback: Correct (/* → /index.html)
  ✅ No conflicting redirects
  ✅ No external proxy redirects

Other:
  ✅ No _redirects file (using netlify.toml)
  ✅ No _headers file (using netlify.toml)
  ✅ No robots.txt blocking
  ✅ Functions config: Correct

Conclusion:
  The code/config is NOT the problem.
  This is a DNS or certificate provisioning issue.
  Follow Steps 1-3 above to resolve.

═══════════════════════════════════════════════════════════════
                    QUICK REFERENCE
═══════════════════════════════════════════════════════════════

Correct DNS Records:

  @ (apex)    A      75.2.60.5
  @ (apex)    A      99.83.190.102
  www         CNAME  supplementsafetybible.netlify.app

Netlify Dashboard Links:
  - Domain management: [Site] → Domain management
  - Build logs: [Site] → Deploys → [Latest deploy]
  - Functions: [Site] → Functions
  - Environment vars: [Site] → Site configuration → Environment variables

DNS Propagation Checker:
  https://dnschecker.org

SSL Certificate Checker:
  https://www.ssllabs.com/ssltest/

Netlify Status:
  https://www.netlifystatus.com

═══════════════════════════════════════════════════════════════
                    NEXT STEPS
═══════════════════════════════════════════════════════════════

1. ✅ Build is verified (netlify.app subdomain works)
2. [ ] Check Netlify Domain management panel
3. [ ] Verify DNS records are correct
4. [ ] Provision/renew certificate
5. [ ] Test https://supplementsafetybible.com
6. [ ] Test https://www.supplementsafetybible.com
7. [ ] Enable "Force HTTPS"
8. [ ] Done!

═══════════════════════════════════════════════════════════════
