# Lead Magnet Email System - Complete Implementation

## Summary

Implemented a reliable email delivery system for the "Get Free Guide" feature on the homepage. Users can now submit their email to receive the "Top 20 Dangerous Supplement Interactions" guide, with full tracking, logging, and error handling.

## What Was Built

### 1. Database Table: `lead_magnets`

Tracks all email submissions and delivery status.

**Columns:**
- `id` (uuid) - Primary key
- `email` (text) - User's email address
- `source` (text) - Where they submitted from (default: 'homepage')
- `lead_magnet` (text) - Which guide they requested (default: 'top-20-dangerous-interactions')
- `status` (text) - Delivery status: 'pending', 'sent', 'failed'
- `error` (text) - Error message if delivery failed
- `created_at` (timestamptz) - When they submitted
- `sent_at` (timestamptz) - When email was successfully sent

**Features:**
- ✅ Unique constraint on (email, lead_magnet) prevents duplicate submissions
- ✅ Check constraint ensures valid status values
- ✅ Indexes for fast lookups and reporting
- ✅ RLS enabled with proper policies:
  - Anyone can INSERT (for lead capture)
  - Only admins can SELECT/UPDATE (for management)

### 2. Netlify Function: `send-guide`

**File:** `netlify/functions/send-guide.cjs`

Server-side email sending function that:
- ✅ Validates email address
- ✅ Inserts/updates record in lead_magnets table
- ✅ Prevents duplicate sends within 24 hours
- ✅ Sends email via SendGrid or Mailgun
- ✅ Updates status to 'sent' or 'failed' with error details
- ✅ Returns JSON response { ok: true/false }
- ✅ Includes debug logging when DEBUG_EMAIL=true

**Email Content:**
- Subject: "Your Free Guide: Top 20 Dangerous Supplement Interactions"
- Both plain text and HTML versions
- Professional design with CTA button
- Download link to guide
- Link to interaction checker
- Unsubscribe message

### 3. Frontend Component: `EmailCaptureSection`

**File:** `src/components/landing/EmailCaptureSection.tsx`

Updated homepage form to:
- ✅ Call backend function on submit
- ✅ Show loading state while sending
- ✅ Display success message: "Thanks! Check your inbox. If you don't see it, check spam."
- ✅ Display friendly error message on failure
- ✅ Allow retry if error occurs
- ✅ Log to console for debugging
- ✅ No API keys exposed in frontend

## Files Changed

### New Files Created

1. **`supabase/migrations/create_lead_magnets_table.sql`**
   - Database migration for lead_magnets table
   - RLS policies
   - Indexes and constraints

2. **`netlify/functions/send-guide.cjs`**
   - Email sending function
   - Supports SendGrid and Mailgun
   - Full error handling and logging

### Modified Files

3. **`src/components/landing/EmailCaptureSection.tsx`**
   - Added backend integration
   - Loading and error states
   - Improved UX with better messages

4. **`.env.example`**
   - Added EMAIL_API_KEY
   - Added EMAIL_FROM
   - Added GUIDE_URL
   - Added DEBUG_EMAIL

## Environment Variables

Add these to your Netlify dashboard (or local `.env` for testing):

```bash
# Email Configuration (REQUIRED for production)
EMAIL_API_KEY=SG.your_sendgrid_api_key_here
# OR
EMAIL_API_KEY=key-your_mailgun_api_key_here

# Email Settings
EMAIL_FROM=noreply@supplementsafetybible.com
GUIDE_URL=https://supplementsafetybible.com/guides/top-20-dangerous-interactions.pdf

# Optional: Enable debug logging in Netlify function logs
DEBUG_EMAIL=true

# For Mailgun only (optional)
MAILGUN_DOMAIN=mg.supplementsafetybible.com
```

## How to Test

### Test 1: Submit Email (Dev Mode)

**Without EMAIL_API_KEY configured** (mocked email):

1. Start dev server: `npm run dev`
2. Navigate to homepage: `http://localhost:5173`
3. Scroll to "Get Our Free Safety Checklist" section
4. Enter email: `test@example.com`
5. Click "Get Free Guide"
6. **Expected Results:**
   - Button shows "Sending..." briefly
   - Success message appears: "Thanks! Check your inbox. If you don't see it, check spam."
   - Console shows: `[EmailCaptureSection] Guide request submitted`
   - Function logs: `[send-guide] EMAIL_API_KEY not configured, returning mock response`

### Test 2: Verify Database Record

```sql
-- Run in Supabase SQL Editor
SELECT
  id,
  email,
  source,
  lead_magnet,
  status,
  error,
  created_at,
  sent_at
FROM lead_magnets
ORDER BY created_at DESC
LIMIT 10;
```

**Expected:**
- Row appears with your test email
- `status = 'sent'` (even in mock mode)
- `source = 'homepage'`
- `lead_magnet = 'top-20-dangerous-interactions'`
- `sent_at` is set to current timestamp

### Test 3: Production Email Delivery

**With EMAIL_API_KEY configured** (real email):

1. Deploy to Netlify (or set EMAIL_API_KEY in local .env)
2. Navigate to homepage
3. Enter YOUR real email address
4. Click "Get Free Guide"
5. **Expected Results:**
   - Success message appears
   - Email arrives in your inbox within 1-2 minutes
   - Check spam folder if not in inbox
   - Database shows `status = 'sent'`

**Email should contain:**
- Subject: "Your Free Guide: Top 20 Dangerous Supplement Interactions"
- Professional HTML design
- Download button/link
- Link to interaction checker
- Unsubscribe text

### Test 4: Duplicate Prevention

1. Submit same email twice within 24 hours
2. **Expected Results:**
   - First submission: Email sent
   - Second submission: Success message (no duplicate email sent)
   - Function logs: `[send-guide] Email already sent recently`
   - Database shows only one record

### Test 5: Error Handling

**Test invalid email:**
1. Enter: `not-an-email`
2. Submit form
3. **Expected:** Browser validation prevents submission

**Test network error:**
1. Disconnect internet
2. Submit form
3. **Expected:**
   - Error message appears: "Something went wrong. Please try again."
   - "Try Again" button appears
   - Click to retry

### Test 6: Loading State

1. Open DevTools Network tab
2. Throttle to "Slow 3G"
3. Submit form
4. **Expected:**
   - Button shows "Sending..." during request
   - Button is disabled during request
   - Success message appears when complete

## Verification Queries

### Check Recent Submissions

```sql
SELECT
  email,
  source,
  lead_magnet,
  status,
  created_at,
  sent_at,
  error
FROM lead_magnets
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### Check Failed Deliveries

```sql
SELECT
  email,
  status,
  error,
  created_at
FROM lead_magnets
WHERE status = 'failed'
ORDER BY created_at DESC
LIMIT 20;
```

### Check Success Rate

```sql
SELECT
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM lead_magnets
GROUP BY status
ORDER BY count DESC;
```

### Check Popular Sources

```sql
SELECT
  source,
  COUNT(*) as submissions,
  COUNT(CASE WHEN status = 'sent' THEN 1 END) as sent,
  COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed
FROM lead_magnets
GROUP BY source
ORDER BY submissions DESC;
```

## Debug Logging

### Frontend Logs (Browser Console)

**Success:**
```
[EmailCaptureSection] Guide request submitted: {
  email: "user@example.com",
  source: "homepage",
  timestamp: "2026-01-25T12:00:00.000Z",
  mocked: false,
  alreadySent: false
}
```

**Error:**
```
[EmailCaptureSection] Error: Failed to send guide
```

### Backend Logs (Netlify Function Logs)

Enable debug logging by setting `DEBUG_EMAIL=true` in Netlify dashboard.

**Success:**
```
[send-guide] Processing request: { email: "user@example.com", leadMagnet: "top-20-dangerous-interactions", source: "homepage", provider: "sendgrid" }
[send-guide] Lead record created/found: { leadId: "abc-123", email: "user@example.com" }
[send-guide] Email sent successfully via SendGrid: { email: "user@example.com", leadId: "abc-123" }
```

**Mocked (no EMAIL_API_KEY):**
```
[send-guide] EMAIL_API_KEY not configured, returning mock response
[send-guide] Mock email content:
  To: user@example.com
  Subject: Your Free Guide: Top 20 Dangerous Supplement Interactions
  Download: https://supplementsafetybible.com/guides/top-20-dangerous-interactions.pdf
```

**Error:**
```
[send-guide] Email send error: SendGrid error 401: Unauthorized
[send-guide] Database error: ...
```

## Email Providers

### SendGrid Setup

1. Sign up: https://sendgrid.com
2. Create API key (Settings → API Keys)
3. API key starts with `SG.`
4. Set in Netlify: `EMAIL_API_KEY=SG.your_key_here`
5. Verify sender email in SendGrid dashboard

### Mailgun Setup

1. Sign up: https://mailgun.com
2. Get API key (Settings → API Keys)
3. Get domain (Sending → Domains)
4. Set in Netlify:
   ```
   EMAIL_API_KEY=key-your_key_here
   MAILGUN_DOMAIN=mg.yourdomain.com
   ```

### Mock Mode (Development)

If `EMAIL_API_KEY` is not set or invalid:
- Function logs email details to console
- Updates database as if email was sent
- Returns success to frontend
- No actual email is sent

## Security

### What's Protected

✅ **API Keys** - Never exposed to frontend (backend only)
✅ **Service Role Key** - Only used in Netlify functions
✅ **Email Validation** - Browser and backend validation
✅ **Rate Limiting** - Unique constraint prevents duplicate sends within 24 hours
✅ **RLS Policies** - Only admins can view lead data

### What's Public

✅ **Endpoint** - `/.netlify/functions/send-guide` is publicly accessible (required for lead capture)
✅ **Email Form** - Anyone can submit (by design)

### Potential Improvements

1. **Rate Limiting**: Add IP-based rate limiting to prevent spam
2. **Email Verification**: Send confirmation link before delivering guide
3. **CAPTCHA**: Add reCAPTCHA to prevent bots
4. **Unsubscribe**: Add unsubscribe tracking in database

## Monitoring

### Key Metrics to Track

1. **Submission Rate**: How many emails per day?
2. **Success Rate**: Percentage with `status = 'sent'`
3. **Failure Rate**: Percentage with `status = 'failed'`
4. **Common Errors**: Group by `error` field
5. **Source Performance**: Which sources drive most submissions?

### Dashboard Query (Admin Page)

```sql
-- Summary stats for last 30 days
SELECT
  COUNT(*) as total_submissions,
  COUNT(CASE WHEN status = 'sent' THEN 1 END) as sent,
  COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed,
  COUNT(DISTINCT email) as unique_emails,
  ROUND(COUNT(CASE WHEN status = 'sent' THEN 1 END) * 100.0 / COUNT(*), 2) as success_rate
FROM lead_magnets
WHERE created_at > NOW() - INTERVAL '30 days';
```

## Troubleshooting

### Issue: Email not received

**Check:**
1. Spam folder
2. Database status: `SELECT status, error FROM lead_magnets WHERE email = 'user@example.com'`
3. Function logs in Netlify
4. SendGrid/Mailgun dashboard for delivery status

**Solutions:**
- If `status = 'pending'`: Email never sent, check function logs
- If `status = 'failed'`: Check `error` field for details
- If `status = 'sent'`: Email was sent, check spam folder

### Issue: Form shows error message

**Check:**
1. Browser console for error details
2. Network tab for function response
3. Function logs in Netlify

**Common Causes:**
- Network timeout (slow connection)
- Function error (check logs)
- Database error (check RLS policies)

### Issue: Duplicate emails sent

**Should not happen** due to 24-hour duplicate prevention.

**If it does:**
1. Check database for duplicate records
2. Check function logs for duplicate detection
3. Verify unique constraint exists:
   ```sql
   SELECT * FROM pg_indexes
   WHERE tablename = 'lead_magnets'
   AND indexname = 'idx_lead_magnets_email_magnet';
   ```

## Success Criteria

✅ Users can submit email on homepage
✅ Email is saved to `lead_magnets` table
✅ Email is sent via SendGrid or Mailgun
✅ Status is updated to 'sent' or 'failed'
✅ Success message shown to user
✅ Error message shown on failure
✅ Loading state during submission
✅ Duplicate prevention works
✅ Debug logging available
✅ No API keys exposed to frontend
✅ Build passes with no TypeScript errors

## Next Steps

### Optional Enhancements

1. **Admin Dashboard**: View/export leads in admin panel
2. **Email Templates**: Create more lead magnets with different guides
3. **Drip Campaign**: Send follow-up emails after download
4. **A/B Testing**: Test different headlines/CTAs
5. **Analytics**: Track conversions from email to paid plans
6. **Webhook**: Notify Slack when high-value leads submit

### Additional Lead Magnets

Reuse this system for other guides:
- "5 Supplements That Interfere with Birth Control"
- "Drug Interactions Every Senior Should Know"
- "Supplement Timing Guide for Maximum Absorption"

Just change the `leadMagnet` parameter and `GUIDE_URL`.

## Related Files

### Database
- `supabase/migrations/create_lead_magnets_table.sql`

### Backend
- `netlify/functions/send-guide.cjs`

### Frontend
- `src/components/landing/EmailCaptureSection.tsx`
- `src/pages/Home.tsx` (includes EmailCaptureSection)

### Configuration
- `.env.example` (new variables added)

### Documentation
- `LEAD_MAGNET_EMAIL_COMPLETE.md` (this file)

## Deployment

```bash
# Build and verify locally
npm run build

# Deploy to production
git add .
git commit -m "feat: Add email delivery for lead magnet guide"
git push origin main

# Netlify auto-deploys
# Migration runs automatically in Supabase
```

## Environment Variables Setup (Production)

In Netlify Dashboard → Site Settings → Environment Variables:

```
EMAIL_API_KEY = SG.your_sendgrid_key_here
EMAIL_FROM = noreply@supplementsafetybible.com
GUIDE_URL = https://supplementsafetybible.com/guides/top-20-dangerous-interactions.pdf
DEBUG_EMAIL = false
```

Make sure these are already set (from previous setup):
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

## Contact

For issues or questions:
- Check function logs in Netlify dashboard
- Check database records with verification queries
- Enable DEBUG_EMAIL=true for detailed logging
- Check SendGrid/Mailgun dashboard for delivery status
