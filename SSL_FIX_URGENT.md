═══════════════════════════════════════════════════════════════
  URGENT: WWW SUBDOMAIN DNS MISCONFIGURATION
═══════════════════════════════════════════════════════════════

ISSUE IDENTIFIED ✅

Your apex domain works perfectly:
  ✅ https://supplementsafetybible.com → 200 OK (Netlify)
  ✅ HTTP/2 connection with valid SSL
  ✅ Points to: 75.2.60.5 and 99.83.190.102 (Netlify)

Your www subdomain is BROKEN:
  ❌ https://www.supplementsafetybible.com → Connection failed
  ❌ Points to: 198.54.117.242 (bolt.run)
  ❌ This is a Bolt.new dev environment, NOT Netlify production!

═══════════════════════════════════════════════════════════════
                    ROOT CAUSE
═══════════════════════════════════════════════════════════════

DNS Misconfiguration:
  - WWW subdomain points to old Bolt.run IP address
  - Should point to Netlify via CNAME record
  - This causes SSL errors because Bolt.run doesn't have your cert

Current DNS (WRONG):
  www.supplementsafetybible.com → A 198.54.117.242 (bolt.run)

Required DNS (CORRECT):
  www.supplementsafetybible.com → CNAME [site-name].netlify.app

═══════════════════════════════════════════════════════════════
                    FIX NOW (5 MINUTES)
═══════════════════════════════════════════════════════════════

STEP 1: Find Your Netlify Site Name
─────────────────────────────────────────────────────────────

Go to: Netlify Dashboard → Your Site

Look for the site URL (top of page):
  Example: https://supplement-safety-bible.netlify.app
  Or: https://supplementsafetybible.netlify.app
  Or: https://ssb-prod.netlify.app

Copy the subdomain part:
  Example: supplement-safety-bible
  Or: supplementsafetybible
  Or: ssb-prod

STEP 2: Fix DNS Records
─────────────────────────────────────────────────────────────

Go to your DNS provider (GoDaddy, Cloudflare, Namecheap, etc.)

Find the record for: www.supplementsafetybible.com

Option A: Edit Existing Record (if CNAME)
  Type: CNAME
  Name: www
  Value: [your-site-name].netlify.app
  TTL: Auto or 3600

Option B: Delete and Recreate (if A record)
  1. Delete the A record: www → 198.54.117.242
  2. Create new CNAME record:
     Type: CNAME
     Name: www
     Value: [your-site-name].netlify.app
     TTL: Auto or 3600

Example (if site name is "supplement-safety-bible"):
  Type: CNAME
  Name: www
  Value: supplement-safety-bible.netlify.app

IMPORTANT:
  ❌ Do NOT use an A record for www
  ✅ Must use CNAME record
  ❌ Do NOT point to 198.54.117.242
  ✅ Must point to [site-name].netlify.app

STEP 3: If Using Cloudflare
─────────────────────────────────────────────────────────────

After creating CNAME:
  1. Click the orange cloud → Make it GRAY (DNS only)
  2. This disables Cloudflare proxy
  3. Let Netlify handle SSL directly
  4. After 24 hours, you can enable proxy if needed

STEP 4: Wait for Propagation
─────────────────────────────────────────────────────────────

DNS changes take 5-60 minutes to propagate.

Check status:
  curl https://www.supplementsafetybible.com

Expected after propagation:
  HTTP/2 200 (page loads)
  Or: 301 redirect to apex (if apex is primary)

STEP 5: Verify in Netlify
─────────────────────────────────────────────────────────────

Go to: Netlify Dashboard → Domain management

After DNS propagates:
  1. Click "Verify DNS configuration"
  2. Both domains should show ✅ Verified
  3. Click "Provision certificate" if needed
  4. Wait 5-10 minutes for Let's Encrypt
  5. Enable "Force HTTPS"

STEP 6: Test Both Domains
─────────────────────────────────────────────────────────────

Test apex:
  https://supplementsafetybible.com
  Expected: ✅ Page loads (already working)

Test www:
  https://www.supplementsafetybible.com
  Expected: ✅ Page loads (will work after DNS fix)

Test redirects:
  http://supplementsafetybible.com → https://supplementsafetybible.com
  http://www.supplementsafetybible.com → https://www.supplementsafetybible.com

All should work with valid SSL certificate.

═══════════════════════════════════════════════════════════════
                    QUICK REFERENCE
═══════════════════════════════════════════════════════════════

Current Status:
  ✅ supplementsafetybible.com → WORKS (75.2.60.5, 99.83.190.102)
  ❌ www.supplementsafetybible.com → BROKEN (198.54.117.242 bolt.run)

Required Fix:
  Change: www → CNAME → [site-name].netlify.app
  Remove: www → A → 198.54.117.242

Where to Fix:
  Your DNS provider dashboard (GoDaddy/Cloudflare/etc.)

How Long:
  DNS change: 2 minutes
  Propagation: 5-60 minutes
  Certificate: 5-10 minutes after propagation

═══════════════════════════════════════════════════════════════
                    WHY THIS HAPPENED
═══════════════════════════════════════════════════════════════

Likely Scenario:
  1. You developed the site in Bolt.new
  2. Bolt.new assigned temp domain: supplement-safety-bi-bz27.bolt.run
  3. You set www DNS to point to Bolt.run IP (198.54.117.242)
  4. You deployed to Netlify production
  5. You updated apex DNS to Netlify (correct)
  6. You forgot to update www DNS to Netlify (missed)
  7. Now apex works (Netlify) but www fails (old Bolt.run)

The Fix:
  Point www to Netlify, not Bolt.run

═══════════════════════════════════════════════════════════════
                    TROUBLESHOOTING
═══════════════════════════════════════════════════════════════

Q: I don't know my Netlify site name
A: Go to Netlify Dashboard → Your Site → Copy the subdomain from URL

Q: DNS change not working after 1 hour
A: Check if Cloudflare proxy is on (turn to gray cloud)
A: Verify CNAME record is correct (not A record)
A: Try different DNS server: curl --dns-servers 8.8.8.8 https://www.supplementsafetybible.com

Q: Certificate still failing
A: Wait for DNS to fully propagate (can take up to 24 hours)
A: Click "Verify DNS" and "Provision certificate" in Netlify

Q: Can I just use apex without www?
A: Yes! Set supplementsafetybible.com as primary domain
A: Users visiting www will auto-redirect to apex
A: But better to fix www properly

Q: What if I delete www record entirely?
A: Don't recommend - users who type www will get error
A: Better to fix the CNAME so www works

═══════════════════════════════════════════════════════════════
                    VERIFICATION COMMANDS
═══════════════════════════════════════════════════════════════

Check Current DNS:
  getent hosts www.supplementsafetybible.com

Expected BEFORE fix:
  198.54.117.242 (bolt.run) ❌

Expected AFTER fix:
  75.2.60.5 or 99.83.190.102 (Netlify) ✅

Test HTTPS:
  curl -I https://www.supplementsafetybible.com

Expected BEFORE fix:
  Connection failed ❌

Expected AFTER fix:
  HTTP/2 200 ✅

═══════════════════════════════════════════════════════════════
                    CHECKLIST
═══════════════════════════════════════════════════════════════

Before Fix:
  ✅ Identified issue: www points to wrong server
  ✅ Found Netlify site name
  ✅ Logged into DNS provider

During Fix:
  [ ] Change www CNAME to point to [site-name].netlify.app
  [ ] Delete old A record 198.54.117.242
  [ ] Turn off Cloudflare proxy (if applicable)
  [ ] Save DNS changes

After Fix (wait 5-60 min):
  [ ] Test: curl https://www.supplementsafetybible.com
  [ ] Verify DNS in Netlify dashboard
  [ ] Provision certificate if needed
  [ ] Test https://supplementsafetybible.com (should still work)
  [ ] Test https://www.supplementsafetybible.com (should now work)
  [ ] Enable "Force HTTPS" in Netlify

Success Criteria:
  [ ] Both apex and www load with valid SSL
  [ ] No connection errors
  [ ] Lock icon in browser
  [ ] HTTP redirects to HTTPS
  [ ] Both domains show in Netlify certificate

═══════════════════════════════════════════════════════════════
