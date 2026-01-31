const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: 'Method Not Allowed' })
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: 'Invalid JSON' })
    };
  }

  const { email, leadMagnet = 'top-20-dangerous-interactions', source = 'homepage' } = payload;

  if (!email || !email.includes('@')) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: 'Valid email is required' })
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const API = process.env.EMAIL_API_KEY || process.env.SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@supplementsafetybible.com';
  const FROM_NAME = 'Supplement Safety Bible';
  const GUIDE_URL = process.env.GUIDE_URL || '/guides/Top-20-Dangerous-Supplement-Interactions.pdf';

  const PROVIDER = API?.startsWith('SG.') ? 'sendgrid' : 'disabled';

  let subscriberId;
  let isNewSubscriber = true;

  try {
    const { data: insertData, error: insertError } = await supabase
      .from('email_subscribers')
      .insert({
        email: normalizedEmail,
        source,
        guide_requested: leadMagnet,
        status: 'active',
        subscribed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      if (insertError.code === '23505') {
        const { data: existingData } = await supabase
          .from('email_subscribers')
          .select('id, status')
          .eq('email', normalizedEmail)
          .single();

        if (existingData) {
          subscriberId = existingData.id;
          isNewSubscriber = false;

          await supabase
            .from('email_subscribers')
            .update({
              updated_at: new Date().toISOString(),
              guide_requested: leadMagnet
            })
            .eq('id', subscriberId);
        }
      } else {
        throw insertError;
      }
    } else {
      subscriberId = insertData.id;
    }
  } catch (err) {
    console.error('[send-guide] Database error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: 'Database error' })
    };
  }

  const subject = 'Your Free Guide: Top 20 Dangerous Supplement Interactions';

  const textContent = `Hi there,

Thank you for your interest in supplement safety!

Your free guide "Top 20 Dangerous Supplement Interactions" is ready to download:

${GUIDE_URL.startsWith('http') ? GUIDE_URL : `https://supplementsafetybible.com${GUIDE_URL}`}

This guide covers:
• The most critical supplement-drug interactions
• Real-world case examples
• What to watch for with your medications
• How to use our free interaction checker

Need to check an interaction right now? Visit:
https://supplementsafetybible.com/check

Stay safe,
The Supplement Safety Bible Team

---
You received this because you requested our guide at supplementsafetybible.com
No spam. Unsubscribe anytime.`;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #5e2b7e 0%, #8b4d9f 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
    .cta-button { display: inline-block; background: #4caf50; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
    .cta-button:hover { background: #45a049; }
    .benefits { background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #8b4d9f; }
    .benefits li { margin: 10px 0; }
    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 24px;">Your Free Guide is Ready!</h1>
  </div>

  <div class="content">
    <p>Hi there,</p>

    <p>Thank you for your interest in supplement safety!</p>

    <p>Your free guide <strong>"Top 20 Dangerous Supplement Interactions"</strong> is ready to download:</p>

    <div style="text-align: center;">
      <a href="${GUIDE_URL.startsWith('http') ? GUIDE_URL : `https://supplementsafetybible.com${GUIDE_URL}`}" class="cta-button">Download Your Free Guide</a>
    </div>

    <div class="benefits">
      <strong>This guide covers:</strong>
      <ul>
        <li>The most critical supplement-drug interactions</li>
        <li>Real-world case examples</li>
        <li>What to watch for with your medications</li>
        <li>How to use our free interaction checker</li>
      </ul>
    </div>

    <p>Need to check an interaction right now?</p>
    <p><a href="https://supplementsafetybible.com/check" style="color: #8b4d9f;">Use our free interaction checker →</a></p>

    <p>Stay safe,<br>
    <strong>The Supplement Safety Bible Team</strong></p>
  </div>

  <div class="footer">
    <p>You received this because you requested our guide at supplementsafetybible.com</p>
    <p>No spam. Unsubscribe anytime.</p>
  </div>
</body>
</html>`;

  let emailSent = false;

  if (PROVIDER === 'sendgrid' && API) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: normalizedEmail }]
          }],
          from: { email: FROM_EMAIL, name: FROM_NAME },
          subject,
          content: [
            { type: 'text/plain', value: textContent },
            { type: 'text/html', value: htmlContent }
          ]
        })
      });

      if (response.ok || response.status === 202) {
        emailSent = true;
        console.log('[send-guide] Email sent successfully via SendGrid');
      } else {
        console.error('[send-guide] SendGrid error:', response.status, await response.text());
      }
    } catch (err) {
      console.error('[send-guide] Email send error:', err);
    }
  } else {
    console.log('[send-guide] No email provider configured');
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ok: true,
      emailSent,
      isNewSubscriber,
      downloadUrl: GUIDE_URL,
      message: emailSent ? 'Guide sent to your email!' : 'Your download is ready!'
    })
  };
};
