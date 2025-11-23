# Supabase Custom SMTP & Branded Email Setup Guide

This guide provides step-by-step instructions to configure custom SMTP and branded email templates in Supabase for Supplement Safety Bible.

---

## Prerequisites

Before you begin, ensure you have:

1. **SMTP Credentials** from your email provider (e.g., SendGrid, Mailgun, AWS SES, Postmark)
2. **DNS Records** configured:
   - SPF record including your SMTP provider
   - DKIM keys added for your domain
   - Example SPF: `v=spf1 include:spf.yourprovider.com ~all`
3. **Supabase Project** with access to Dashboard → Settings → Auth

---

## Part A: Configure Custom SMTP in Supabase

### Step 1: Access Auth Email Settings

1. Log in to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project: **Supplement Safety Bible**
3. Navigate to **Authentication** → **Email**
4. Scroll to the **Email Settings** section

### Step 2: Enable Custom SMTP

1. Under **Email sending**, select **Custom SMTP**
2. Fill in the following fields:

| Field | Value |
|-------|-------|
| **Sender name** | `Supplement Safety Bible` |
| **Sender email** | `support@supplementsafetybible.com` |
| **Host** | Your SMTP host (e.g., `smtp.sendgrid.net`) |
| **Port number** | `587` (or `465` for SSL) |
| **Username** | Your SMTP username |
| **Password** | Your SMTP password |

3. **Important Settings:**
   - Use **TLS** (port 587) or **SSL** (port 465) based on your provider
   - Most providers use port **587** with STARTTLS

4. Click **Save** at the bottom of the page

### Step 3: Verify SMTP Configuration

Test your SMTP setup using the provided test endpoint:

```bash
# Replace YOUR_EMAIL with your test email address
curl "https://supplementsafetybible.com/.netlify/functions/send-test-email?to=YOUR_EMAIL@example.com"
```

You should receive a test email from `Supplement Safety Bible <support@supplementsafetybible.com>`.

**If the test fails**, check:
- SMTP credentials are correct in Netlify Environment Variables
- Port and host match your provider's documentation
- Firewall/network allows outbound SMTP connections
- DNS records (SPF, DKIM) are properly configured

---

## Part B: Configure Branded Email Templates

### Step 1: Access Email Templates

1. In Supabase Dashboard, go to **Authentication** → **Email Templates**
2. You'll see 5 template types:
   - Confirm signup
   - Magic link
   - Reset password
   - Change email
   - Invite user

### Step 2: Update Each Template

For **each template**, follow these steps:

#### A. Confirm Signup Template

1. Click on **Confirm signup** template
2. Switch editor to **HTML** (toggle at top right)
3. **Delete** all existing content
4. Open `emails/templates/confirm_signup.html` from your project
5. **Copy the entire contents** and paste into the Supabase editor
6. Verify the button href uses `{{ .ActionURL }}` (already included in template)
7. Click **Save Changes**

#### B. Magic Link Template

1. Click on **Magic link** template
2. Switch to **HTML** editor
3. Delete existing content
4. Copy contents from `emails/templates/magic_link.html`
5. Paste into editor
6. Click **Save Changes**

#### C. Reset Password Template

1. Click on **Reset password** template
2. Switch to **HTML** editor
3. Delete existing content
4. Copy contents from `emails/templates/reset_password.html`
5. Paste into editor
6. Click **Save Changes**

#### D. Change Email Template

1. Click on **Change email** template
2. Switch to **HTML** editor
3. Delete existing content
4. Copy contents from `emails/templates/change_email.html`
5. Paste into editor
6. Click **Save Changes**

#### E. Invite User Template

1. Click on **Invite user** template
2. Switch to **HTML** editor
3. Delete existing content
4. Copy contents from `emails/templates/invite_user.html`
5. Paste into editor
6. Click **Save Changes**

---

## Part C: DNS Configuration

Ensure your domain's DNS records are properly configured for email deliverability:

### Required DNS Records

1. **SPF Record** (Type: TXT)
   ```
   Name: @
   Value: v=spf1 include:spf.yourprovider.com ~all
   ```

2. **DKIM Records** (Type: TXT)
   - Add DKIM keys provided by your SMTP provider
   - Usually named like: `default._domainkey.yourdomain.com`

3. **DMARC Record** (Type: TXT) - Optional but recommended
   ```
   Name: _dmarc
   Value: v=DMARC1; p=quarantine; rua=mailto:support@supplementsafetybible.com
   ```

### Verify DNS Propagation

1. Use [MXToolbox](https://mxtoolbox.com/SuperTool.aspx) to check SPF and DKIM
2. Enter: `supplementsafetybible.com`
3. Verify all records are present and valid

---

## Part D: Netlify Environment Variables

Configure the SMTP settings in Netlify for the test function:

### Step 1: Access Netlify Dashboard

1. Log in to [Netlify](https://app.netlify.com)
2. Select your **Supplement Safety Bible** site
3. Go to **Site configuration** → **Environment variables**

### Step 2: Add SMTP Variables

Add the following environment variables (click **Add a variable** for each):

| Key | Value | Notes |
|-----|-------|-------|
| `SMTP_HOST` | `smtp.yourprovider.com` | Your SMTP server hostname |
| `SMTP_PORT` | `587` | Port number (587 for TLS, 465 for SSL) |
| `SMTP_USER` | `your_username` | SMTP authentication username |
| `SMTP_PASS` | `your_password` | SMTP authentication password |
| `SMTP_FROM_NAME` | `Supplement Safety Bible` | Display name in "From" field |
| `SMTP_FROM_EMAIL` | `support@supplementsafetybible.com` | Email address in "From" field |

**Important:** These should match the SMTP settings you configured in Supabase (Part A, Step 2).

### Step 3: Deploy Changes

1. After adding all variables, click **Save**
2. Netlify will automatically redeploy your site
3. Wait for deployment to complete (usually 1-2 minutes)

---

## Part E: Testing & Validation

### Test 1: SMTP Function Test

Verify the SMTP configuration works:

```bash
# Test from command line
curl "https://supplementsafetybible.com/.netlify/functions/send-test-email?to=your@email.com"

# Or visit in browser:
# https://supplementsafetybible.com/.netlify/functions/send-test-email?to=your@email.com
```

**Expected Response:**
```json
{
  "ok": true,
  "messageId": "...",
  "to": "your@email.com",
  "from": "Supplement Safety Bible <support@supplementsafetybible.com>"
}
```

### Test 2: Supabase Auth Email Test

Trigger an actual auth flow to verify branded templates:

1. Go to your site: https://supplementsafetybible.com
2. Click **Sign in** in the navigation
3. Enter a test email address
4. Click **Send me a sign-in link**

**Verify:**
- ✅ Email arrives from **Supplement Safety Bible**
- ✅ Sender address is **support@supplementsafetybible.com**
- ✅ Email includes the SSB logo
- ✅ Branding matches your design (blue buttons, clean layout)
- ✅ Footer includes: `© 2025 Certified Nutra Labs L.L.C. • Miami, FL`
- ✅ Support email is present: **support@supplementsafetybible.com**
- ✅ Action button (magic link) works correctly

### Test 3: All Email Templates

Test each template type:

1. **Confirm signup**: Create a new account → Check confirmation email
2. **Magic link**: Sign in → Check magic link email
3. **Reset password**: Click "Forgot password" → Check reset email
4. **Change email**: In account settings, change email → Check confirmation
5. **Invite user**: (Admin only) Invite a user → Check invitation email

---

## Troubleshooting

### Emails Not Sending

**Problem**: No emails are being received

**Solutions**:
1. Check SMTP credentials in Supabase Dashboard
2. Verify environment variables in Netlify match Supabase settings
3. Test SMTP function endpoint to isolate the issue
4. Check Supabase logs: Dashboard → Logs → Auth Logs
5. Verify your SMTP provider account is active and has sending capacity

### Emails Going to Spam

**Problem**: Emails arrive in spam folder

**Solutions**:
1. Verify SPF record includes your SMTP provider
2. Add DKIM keys from your SMTP provider
3. Set up DMARC policy (start with `p=none` for monitoring)
4. Use a reputable SMTP provider (SendGrid, Mailgun, etc.)
5. Warm up your sending domain gradually
6. Ensure reverse DNS (PTR) record is set

### Template Variables Not Working

**Problem**: `{{ .ActionURL }}` appears as plain text in emails

**Solutions**:
1. Ensure you're using the **HTML** editor in Supabase, not the visual editor
2. Copy templates exactly as provided (don't modify variable syntax)
3. Supabase variables use Go template syntax: `{{ .VariableName }}`
4. Save the template and test again with a fresh auth action

### Images Not Loading

**Problem**: Logo image doesn't appear in emails

**Solutions**:
1. Verify logo is accessible at: https://supplementsafetybible.com/email/logo-ssb.png
2. Check that the `public/email/` directory exists and contains `logo-ssb.png`
3. Test the URL in a browser to confirm it loads
4. Ensure your CDN/hosting serves static assets correctly

---

## Success Checklist

Before considering setup complete, verify:

- [ ] Custom SMTP configured in Supabase Dashboard
- [ ] All 5 email templates updated with branded HTML
- [ ] DNS records (SPF, DKIM) configured and verified
- [ ] Netlify environment variables set for SMTP
- [ ] Test email sends successfully via SMTP function
- [ ] Signup confirmation email works and is branded
- [ ] Magic link email works and is branded
- [ ] Password reset email works and is branded
- [ ] All emails show sender as "Supplement Safety Bible <support@supplementsafetybible.com>"
- [ ] All emails include correct footer with company info
- [ ] Emails arrive in inbox (not spam)
- [ ] Action buttons (CTAs) work correctly
- [ ] Mobile rendering looks good (test on phone)

---

## Support

If you encounter issues not covered in this guide:

1. Check Supabase Auth Logs: Dashboard → Logs → Auth Logs
2. Check Netlify Function Logs: Dashboard → Functions → send-test-email
3. Review your SMTP provider's documentation
4. Contact Supabase support: https://supabase.com/support
5. Email technical support: support@supplementsafetybible.com

---

## Appendix: Common SMTP Providers

### SendGrid
- Host: `smtp.sendgrid.net`
- Port: `587` (TLS) or `465` (SSL)
- Username: `apikey`
- Password: Your SendGrid API key

### Mailgun
- Host: `smtp.mailgun.org`
- Port: `587` (TLS)
- Username: Your Mailgun SMTP username
- Password: Your Mailgun SMTP password

### AWS SES
- Host: `email-smtp.us-east-1.amazonaws.com` (adjust region)
- Port: `587` (TLS)
- Username: Your AWS SMTP username
- Password: Your AWS SMTP password

### Postmark
- Host: `smtp.postmarkapp.com`
- Port: `587` (TLS)
- Username: Your Postmark server token
- Password: Your Postmark server token

---

## Supabase Auth URL Configuration (REQUIRED)

In Supabase Dashboard → Project Settings → Authentication → URL Configuration:

- **Site URL**: `https://supplementsafetybible.com`
- **Additional Redirect URLs**:
  ```
  https://supplementsafetybible.com
  https://supplementsafetybible.netlify.app
  https://supplementsafetybible-*.netlify.app
  http://localhost:5173
  http://localhost:3000
  ```

**Save** the URL configuration.

Then go to **Authentication → Email Templates** and ensure no template hardcodes localhost.

**Why this matters**: If the Site URL is set to localhost, all magic links and confirmation emails will redirect to localhost instead of your production domain, breaking auth for real users.

---

**Last Updated**: 2025-11-23
**Version**: 1.1
