# SMTP Email Setup - Send Real Emails NOW

## ✅ You Can Send Real Emails Immediately

No need for SendGrid or Mailgun API keys. Use your existing email provider's SMTP settings.

---

## 🚀 Quick Setup (5 Minutes)

### Option 1: Gmail (Free, Easiest)

**Environment Variables:**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # NOT your Gmail password!
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Supplement Safety Bible
```

**How to Get Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Other (Custom name)"
3. Enter "Supplement Safety Bible"
4. Copy the 16-character password
5. Use this as `SMTP_PASS`

**Important:** You must have 2-factor authentication enabled on your Google account to generate app passwords.

---

### Option 2: Outlook/Office365 (Free with Microsoft Account)

**Environment Variables:**
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-outlook-password
SMTP_FROM_EMAIL=your-email@outlook.com
SMTP_FROM_NAME=Supplement Safety Bible
```

---

### Option 3: Custom Domain Email (cPanel, Hostinger, etc.)

**Environment Variables:**
```bash
SMTP_HOST=mail.yourdomain.com  # Check your hosting provider
SMTP_PORT=587  # Or 465 for SSL
SMTP_USER=noreply@supplementsafetybible.com
SMTP_PASS=your-email-password
SMTP_FROM_EMAIL=noreply@supplementsafetybible.com
SMTP_FROM_NAME=Supplement Safety Bible
```

**Common Hosts:**
- **cPanel:** `mail.yourdomain.com` or `smtp.yourdomain.com`
- **Hostinger:** `smtp.hostinger.com`
- **Bluehost:** `mail.yourdomain.com`
- **GoDaddy:** `smtpout.secureserver.net`

---

## 🧪 Test SMTP Connection (Quick)

### Test 1: Check Settings

Create `test-smtp.cjs` in your project root:

```javascript
const nodemailer = require('nodemailer');

async function testSMTP() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Change to your SMTP host
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@gmail.com',  // Change to your email
      pass: 'your-app-password'  // Change to your password
    }
  });

  try {
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
  }
}

testSMTP();
```

Run:
```bash
node test-smtp.cjs
```

**Expected:** `✅ SMTP connection successful!`

---

### Test 2: Send Test Email

```javascript
const nodemailer = require('nodemailer');

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });

  try {
    const info = await transporter.sendMail({
      from: '"Supplement Safety Bible" <your-email@gmail.com>',
      to: 'your-email@gmail.com',  // Send to yourself
      subject: 'Test Email from Lead Magnet System',
      text: 'If you receive this, SMTP is working!',
      html: '<b>If you receive this, SMTP is working!</b>'
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
  }
}

sendTestEmail();
```

Run:
```bash
node test-smtp.cjs
```

Check your inbox for the test email.

---

## 🔧 Add to Netlify Dashboard

1. Go to: **Netlify Dashboard** → Your Site → **Site Settings** → **Environment Variables**

2. Click **Add a variable**

3. Add these variables:

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `smtp.gmail.com` (or your provider) |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your email address |
| `SMTP_PASS` | Your app password |
| `SMTP_FROM_EMAIL` | Same as SMTP_USER |
| `SMTP_FROM_NAME` | `Supplement Safety Bible` |
| `GUIDE_URL` | `https://supplementsafetybible.com/guides/top-20-dangerous-interactions.pdf` |

4. Click **Save**

5. Redeploy your site (or it will auto-deploy on next push)

---

## 🎯 How the System Chooses Provider

The function automatically detects which provider to use:

```javascript
// Priority order:
1. SendGrid - if EMAIL_API_KEY starts with "SG."
2. Mailgun - if EMAIL_API_KEY starts with "key-" or "mg_"
3. SMTP - if SMTP_HOST and SMTP_USER are set
4. Disabled (mock mode) - if none of the above
```

**This means:**
- Set SMTP variables → Real emails sent via SMTP
- Don't set SMTP variables → Mock mode (logs only)
- Set EMAIL_API_KEY → Uses SendGrid/Mailgun instead

---

## 🚀 Deploy and Test

### Local Testing:

1. Create `.env` file:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Supplement Safety Bible
GUIDE_URL=https://supplementsafetybible.com/guides/top-20-dangerous-interactions.pdf
DEBUG_EMAIL=true

# Your existing Supabase vars
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

2. Start Netlify dev server:
```bash
netlify dev
```

3. Navigate to: `http://localhost:8888`

4. Scroll to email form, enter YOUR email, submit

5. Check your inbox!

---

### Production Testing:

1. Add SMTP variables to Netlify (as shown above)

2. Deploy:
```bash
git add .
git commit -m "feat: Add SMTP email support"
git push origin main
```

3. Wait for deployment

4. Visit your production site

5. Submit email form with your real email

6. Check inbox within 1-2 minutes

---

## ✅ Success Indicators

**After submission, check:**

1. **Frontend:** Success message appears
2. **Database:**
   ```sql
   SELECT email, status, sent_at
   FROM lead_magnets
   ORDER BY created_at DESC
   LIMIT 1;
   ```
   Should show: `status = 'sent'`, `sent_at` has timestamp

3. **Function Logs** (Netlify Dashboard → Functions → send-guide):
   ```
   [send-guide] Processing request: { provider: "smtp" }
   [send-guide] Email sent successfully via SMTP
   ```

4. **Your Inbox:** Email received with professional HTML design

---

## 🐛 Troubleshooting

### Issue: "SMTP connection failed"

**Cause:** Wrong host, port, or credentials

**Solutions:**
1. Double-check SMTP_HOST (no `http://`, no trailing `/`)
2. Verify port (587 for TLS, 465 for SSL)
3. Confirm username and password
4. For Gmail: Use app password, not account password
5. For Gmail: Enable "Less secure app access" if app passwords don't work

---

### Issue: "Authentication failed"

**Gmail:**
- Must use app password, not account password
- Must have 2FA enabled
- Generate new app password if old one doesn't work

**Outlook:**
- Must use account password (not app password)
- Check if account is locked

**Custom Domain:**
- Check email client (Webmail, Outlook, etc.) for working credentials
- Try same credentials that work in email client

---

### Issue: Email sent but not received

**Check:**
1. Spam/Junk folder
2. Email provider's sent folder (to confirm it left)
3. Recipient email address is correct
4. SMTP_FROM_EMAIL is valid (not a typo)

**Gmail Specific:**
- Gmail may block emails if FROM address doesn't match authenticated user
- Use same email for both SMTP_USER and SMTP_FROM_EMAIL

---

### Issue: "Connection timeout"

**Causes:**
- Firewall blocking port 587/465
- Wrong port number
- SMTP server down

**Solutions:**
1. Try port 465 with `secure: true`
2. Check if port is open: `telnet smtp.gmail.com 587`
3. Try different network (mobile hotspot)

---

## 📊 Compare Email Options

| Option | Cost | Setup Time | Deliverability | Rate Limit |
|--------|------|------------|----------------|------------|
| **SMTP (Gmail)** | Free | 5 min | Good | 500/day |
| **SMTP (Outlook)** | Free | 5 min | Good | 300/day |
| **SMTP (Custom)** | $5-20/mo | 10 min | Excellent | Varies |
| **SendGrid** | Free tier | 15 min | Excellent | 100/day |
| **Mailgun** | Free tier | 15 min | Excellent | 100/day |

**Recommendation for Testing:** Use Gmail SMTP (free, fast setup)

**Recommendation for Production:** Use custom domain SMTP or SendGrid (better deliverability)

---

## 🎉 You're Done!

Your email system now supports:
- ✅ SMTP (Gmail, Outlook, custom domain)
- ✅ SendGrid
- ✅ Mailgun
- ✅ Mock mode (development)

**No excuses!** You can send real emails RIGHT NOW with just Gmail credentials.

---

## 📧 What Happens When User Submits

1. User enters email on homepage
2. Frontend calls `/.netlify/functions/send-guide`
3. Function saves to `lead_magnets` table
4. Function detects SMTP credentials
5. **Nodemailer sends email via SMTP**
6. Status updated to 'sent'
7. User sees success message
8. Email arrives in their inbox

Total time: **< 3 seconds**

---

## Next Steps

1. **Set up SMTP credentials** (5 minutes)
2. **Test locally** with `netlify dev`
3. **Add to Netlify environment variables** (2 minutes)
4. **Deploy and test in production**
5. **Monitor success rate** in database

You're ready to capture leads and send real emails!
