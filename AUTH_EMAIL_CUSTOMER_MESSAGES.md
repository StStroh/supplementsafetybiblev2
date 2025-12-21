# Customer-Facing Messages — Auth Email Issues

## 🎯 Purpose

Clear, helpful messages for users experiencing magic link email delivery issues. These messages balance transparency, reassurance, and actionable next steps.

---

## 📧 Email Not Arriving — Help Text

### On Success Screen (After Submitting Email)

**Location:** `/auth` page after successful submission

**Message:**
```
✅ Check your email

We sent a sign-in link to your@email.com.
Click the link in the email to continue.

📬 Email not arriving?
• Check your spam or junk folder
• Make sure your@email.com is correct
• Wait a few minutes for delivery
• Use "Resend Email" below if needed

⏱️ You can resend in 60 seconds.
```

**Visual:** Blue info box with helpful checklist

---

## ⏰ Rate Limit Message

### When User Tries to Resend Too Soon

**Location:** `/auth` page, rate limit error

**Message:**
```
⏳ Please wait before requesting another email

You can request a new sign-in link in [X] seconds.
```

**Visual:** Yellow warning box with clock icon

**Behavior:** Shows countdown timer, updates every second

---

## ❌ SMTP/Email Sending Error

### When Supabase Can't Send Email

**Location:** `/auth` page, SMTP error

**Message:**
```
❌ We couldn't send your sign-in link

This might be a temporary issue. Please try again in a few moments.

Alternative: Try password sign-in
[Sign in with password]
```

**Visual:** Red error box with alert icon

**Action:** Links to `/auth/password` for fallback

---

## 🔐 Password Sign-In Available

### When Magic Link Issues Persist

**Location:** Error messages and alternative auth sections

**Message:**
```
Having trouble with magic links?

Sign in with password instead
[Sign in with password]
```

**Visual:** Subtle call-to-action button

**Link:** `/auth/password`

---

## ✅ Account Created (Password Auth)

### After Successful Sign Up

**Location:** `/auth/password` page after signup

**Message (No Email Confirmation):**
```
✅ Account created successfully! Redirecting...
```

**Message (With Email Confirmation):**
```
✅ Account created!

Please check your email to confirm your account.

We sent a confirmation link to your@email.com.
Check your spam folder if you don't see it.
```

**Visual:** Green success box with checkmark icon

---

## 🔒 Password Requirements

### When Creating New Account

**Location:** `/auth/password` page, below password field

**Message:**
```
Password requirements:
• At least 8 characters
• One uppercase letter (A-Z)
• One lowercase letter (a-z)
• One number (0-9)
```

**Visual:** Small gray text, becomes green when requirement met (optional enhancement)

---

## ❌ Invalid Credentials

### When Sign-In Fails

**Location:** `/auth/password` page, sign-in error

**Message:**
```
❌ Invalid email or password

Please check your credentials and try again.

[Try again] [Forgot password?]
```

**Visual:** Red error box

**Note:** "Forgot password?" links to password reset flow (if implemented)

---

## 📧 Email Already Registered

### When Sign-Up Fails (Existing User)

**Location:** `/auth/password` page, sign-up error

**Message:**
```
❌ This email is already registered

Try signing in instead.
[Sign in]
```

**Visual:** Red error box with link to toggle sign-in mode

**Action:** Clicking "Sign in" switches to sign-in mode with email prefilled

---

## 🔄 Resend Email Available

### After Cooldown Period

**Location:** `/auth` success screen, after 60 seconds

**Message:**
```
[Resend Email] (Blue button)
```

**Visual:** Blue button, full width

**Behavior:**
- Disabled during cooldown (gray)
- Enabled after 60 seconds (blue)
- Shows loading spinner when clicked

---

## ⚠️ Generic Error

### When Unexpected Error Occurs

**Location:** Any auth page, unexpected error

**Message:**
```
❌ Something went wrong

We encountered an issue. Please try again or contact support.

Error details have been logged for our team.

[Try again] [Contact support]
```

**Visual:** Red error box

**Links:**
- "Try again" → refreshes/retries
- "Contact support" → `mailto:support@supplementsafetybible.com`

---

## 🆘 Support Contact

### Footer on All Auth Pages

**Location:** Bottom of all auth pages

**Message:**
```
For account issues, email support@supplementsafetybible.com
```

**Visual:** Small gray text with mailto link

---

## 📱 Mobile-Optimized Messages

### Same Messages, Adjusted for Mobile

**Differences:**
- Shorter headlines
- Bullet points → numbered lists
- Buttons full-width
- Larger touch targets
- Reduced padding

**Example (Mobile):**
```
✅ Check your email

Link sent to:
your@email.com

Not seeing it?
1. Check spam folder
2. Wait 2-3 minutes
3. Use Resend below

[Resend Email]
```

---

## 🎨 Visual Design Guidelines

### Color Coding

| Status | Color | Use Case |
|--------|-------|----------|
| Success | Green | Email sent, account created |
| Info | Blue | Help text, instructions |
| Warning | Yellow | Rate limits, waiting periods |
| Error | Red | Failed attempts, invalid input |

### Icons

| Icon | Meaning |
|------|---------|
| ✅ Checkmark | Success |
| 📧 Mail | Email-related |
| ⏰ Clock | Time/waiting |
| ❌ X | Error/failure |
| ⚠️ Triangle | Warning |
| 🔒 Lock | Security/password |
| 🔄 Arrows | Retry/resend |

### Tone

- **Friendly:** Use conversational language
- **Clear:** Avoid jargon
- **Helpful:** Provide actionable steps
- **Reassuring:** Acknowledge issues without panic
- **Honest:** Don't hide errors, explain them

---

## 📊 A/B Testing Variations

### Test These Alternatives

**Variation A (Current):**
```
We sent a sign-in link to your email
```

**Variation B (More specific):**
```
Check your inbox! We just sent your magic link
```

**Variation C (With urgency):**
```
Your sign-in link is on the way (usually arrives in 30 seconds)
```

**Track:**
- Email click-through rate
- Time from send to click
- Support requests

---

## 🌐 Internationalization Ready

### Structure for Translation

All messages should be:
- Stored in separate config files
- Use template strings for dynamic values
- Avoid hardcoded text in components

**Example Structure:**
```typescript
const messages = {
  en: {
    emailSent: {
      title: 'Check your email',
      body: 'We sent a sign-in link to {email}.',
      help: 'Email not arriving?',
    },
  },
  es: {
    emailSent: {
      title: 'Revisa tu correo',
      body: 'Enviamos un enlace de inicio de sesión a {email}.',
      help: '¿No llega el correo?',
    },
  },
};
```

---

## 🔒 Security Considerations

### What NOT to Say

**Don't reveal:**
- "This email doesn't exist" (prevents enumeration)
- "Your password is wrong" (use "Invalid email or password")
- Specific technical errors (log them, don't show them)

**Do say:**
- "Invalid email or password" (generic)
- "Please check your credentials" (vague)
- "An error occurred" (non-specific)

---

## 📈 Success Metrics

### Track These KPIs

**Email Delivery:**
- % of emails successfully sent
- Average delivery time
- Spam placement rate

**User Experience:**
- % who check spam folder
- % who resend
- % who switch to password auth

**Support Load:**
- Auth-related support tickets
- Common error patterns
- Resolution time

---

## 🧪 Testing Checklist

### Test All Message States

- [ ] Email sent successfully
- [ ] Email send failed (SMTP error)
- [ ] Rate limit triggered
- [ ] Resend after cooldown
- [ ] Email already registered
- [ ] Invalid credentials
- [ ] Password requirements not met
- [ ] Passwords don't match
- [ ] Network error
- [ ] Spam folder hint visible
- [ ] Support email link works
- [ ] Mobile responsive
- [ ] Accessible (screen readers)

---

## 🚀 Deployment Checklist

### Before Going Live

- [ ] All messages reviewed for clarity
- [ ] Tone matches brand voice
- [ ] No jargon or technical terms
- [ ] Links work correctly
- [ ] Email addresses valid
- [ ] Mobile tested
- [ ] Accessibility tested
- [ ] Translation-ready structure
- [ ] Analytics tracking setup
- [ ] Support team informed

---

## 📝 Copy Writing Best Practices

### Do:
- Use active voice ("We sent" not "Email was sent")
- Be specific ("in 60 seconds" not "soon")
- Provide alternatives ("or try password sign-in")
- Acknowledge frustration ("Having trouble?")
- End with action ("Check your email now")

### Don't:
- Blame the user ("You entered wrong email")
- Use passive voice ("An error was encountered")
- Be vague ("Something went wrong")
- Use technical jargon ("SMTP authentication failed")
- Leave user stranded (always provide next step)

---

## 🤝 Support Team Scripts

### When User Reports Email Not Arriving

**Response Template:**
```
I'm sorry you're having trouble signing in. Let's get you access quickly!

First, please check:
1. Spam/junk folder for email from us
2. Email address is correct: [confirm with user]
3. Wait 2-3 minutes for delivery

If still no email, try:
• Click "Resend Email" button (wait 60 seconds)
• Use password sign-in: [link to /auth/password]

I can also:
• Check our system logs
• Manually verify your email
• Create your account directly

What would you prefer?
```

---

## 📞 Escalation Path

### When to Escalate

**Level 1 Support** → **Level 2 Engineering:**
- Repeated SMTP failures
- Multiple users affected
- Suspected system outage
- Provider blocking our emails

**Escalation Template:**
```
URGENT: Auth Email Delivery Issue

Affected: [X] users
Time: [timestamp]
Symptoms: [describe]
Error logs: [attach]
User impact: [describe]

Actions taken:
- [list attempts]

Requesting:
- Engineering investigation
- SMTP provider check
- Potential hotfix
```

---

## ✅ Summary

### Message Hierarchy

1. **Success** → "Check your email" (green, positive)
2. **Waiting** → "Resend in X seconds" (yellow, patient)
3. **Problem** → "Couldn't send email" (red, alternative)
4. **Solution** → "Try password sign-in" (blue, helpful)
5. **Support** → "Contact us" (gray, safety net)

### User Journey

```
Enter email
    ↓
[SUCCESS] → Check email → Done ✓
    ↓ (if no email)
[HELP] → Check spam → Found ✓
    ↓ (still not found)
[RESEND] → Wait 60s → Resend → Done ✓
    ↓ (still failing)
[FALLBACK] → Password sign-in → Done ✓
    ↓ (completely blocked)
[SUPPORT] → Contact team → Manual resolution ✓
```

### Key Principles

1. **Never leave user stranded** — Always provide next step
2. **Be honest but helpful** — Acknowledge issue, offer solution
3. **Reduce friction** — Make fallback easy to find
4. **Build trust** — Clear communication, reliable alternatives
5. **Track and improve** — Monitor metrics, iterate messages

---

**Last Updated:** 2025-01-21
**Version:** 1.0
**Owner:** Product Team
