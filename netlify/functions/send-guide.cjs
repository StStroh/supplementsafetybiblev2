const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, message: 'Method Not Allowed' })
    };
  }

  // Parse request body
  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, message: 'Invalid JSON' })
    };
  }

  const { email, leadMagnet = 'top-20-dangerous-interactions', source = 'homepage' } = payload;

  // Validate email
  if (!email || !email.includes('@')) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, message: 'Valid email is required' })
    };
  }

  const DEBUG = process.env.DEBUG_EMAIL === 'true';

  // Initialize Supabase client
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Determine email provider
  const API = process.env.EMAIL_API_KEY;
  const PROVIDER = API?.startsWith('SG.') ? 'sendgrid' :
                   API?.startsWith('key-') || API?.startsWith('mg_') ? 'mailgun' : 'disabled';

  const GUIDE_URL = process.env.GUIDE_URL || 'https://supplementsafetybible.com/guides/top-20-dangerous-interactions.pdf';
  const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@supplementsafetybible.com';
  const FROM_NAME = 'Supplement Safety Bible';

  if (DEBUG) {
    console.log('[send-guide] Processing request:', { email, leadMagnet, source, provider: PROVIDER });
  }

  // Insert or update lead_magnet record
  let leadId;
  try {
    // Try to insert, on conflict do nothing (already exists)
    const { data: insertData, error: insertError } = await supabase
      .from('lead_magnets')
      .insert({
        email,
        lead_magnet: leadMagnet,
        source,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      // Check if it's a unique constraint violation
      if (insertError.code === '23505') {
        // Record already exists, get the existing one
        const { data: existingData } = await supabase
          .from('lead_magnets')
          .select('id, status, sent_at')
          .eq('email', email)
          .eq('lead_magnet', leadMagnet)
          .single();

        if (existingData) {
          leadId = existingData.id;

          // If already sent within last 24 hours, return success without resending
          if (existingData.status === 'sent' && existingData.sent_at) {
            const sentTime = new Date(existingData.sent_at);
            const hoursSinceSent = (Date.now() - sentTime.getTime()) / (1000 * 60 * 60);

            if (hoursSinceSent < 24) {
              if (DEBUG) {
                console.log('[send-guide] Email already sent recently:', { email, hoursSinceSent });
              }
              return {
                statusCode: 200,
                body: JSON.stringify({ ok: true, alreadySent: true })
              };
            }
          }
        }
      } else {
        throw insertError;
      }
    } else {
      leadId = insertData.id;
    }

    if (DEBUG) {
      console.log('[send-guide] Lead record created/found:', { leadId, email });
    }
  } catch (err) {
    console.error('[send-guide] Database error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, message: 'Database error' })
    };
  }

  // If provider is disabled, log and return mock success
  if (PROVIDER === 'disabled') {
    console.warn('[send-guide] EMAIL_API_KEY not configured, returning mock response');

    if (DEBUG) {
      console.log('[send-guide] Mock email content:');
      console.log(`  To: ${email}`);
      console.log(`  Subject: Your Free Guide: Top 20 Dangerous Supplement Interactions`);
      console.log(`  Download: ${GUIDE_URL}`);
    }

    // Update status to sent (mock)
    await supabase
      .from('lead_magnets')
      .update({ status: 'sent', sent_at: new Date().toISOString() })
      .eq('id', leadId);

    return {
      statusCode: 202,
      body: JSON.stringify({ ok: true, mocked: true })
    };
  }

  // Prepare email content
  const subject = 'Your Free Guide: Top 20 Dangerous Supplement Interactions';

  const textContent = `Hi there,

Thank you for your interest in supplement safety!

Your free guide "Top 20 Dangerous Supplement Interactions" is ready to download:

${GUIDE_URL}

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
    .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
    .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
    .cta-button:hover { background: #2563eb; }
    .benefits { background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0; }
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
      <a href="${GUIDE_URL}" class="cta-button">Download Your Free Guide</a>
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
    <p><a href="https://supplementsafetybible.com/check" style="color: #3b82f6;">Use our free interaction checker →</a></p>

    <p>Stay safe,<br>
    <strong>The Supplement Safety Bible Team</strong></p>
  </div>

  <div class="footer">
    <p>You received this because you requested our guide at supplementsafetybible.com</p>
    <p>No spam. Unsubscribe anytime.</p>
  </div>
</body>
</html>`;

  // Send email based on provider
  try {
    if (PROVIDER === 'sendgrid') {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email }]
          }],
          from: { email: FROM_EMAIL, name: FROM_NAME },
          subject,
          content: [
            { type: 'text/plain', value: textContent },
            { type: 'text/html', value: htmlContent }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SendGrid error ${response.status}: ${errorText}`);
      }

      // Update status to sent
      await supabase
        .from('lead_magnets')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
          error: null
        })
        .eq('id', leadId);

      if (DEBUG) {
        console.log('[send-guide] Email sent successfully via SendGrid:', { email, leadId });
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, sent: true, provider: 'sendgrid' })
      };
    }

    if (PROVIDER === 'mailgun') {
      const domain = process.env.MAILGUN_DOMAIN;
      if (!domain) {
        throw new Error('MAILGUN_DOMAIN not configured');
      }

      const formData = new URLSearchParams();
      formData.append('from', `${FROM_NAME} <${FROM_EMAIL}>`);
      formData.append('to', email);
      formData.append('subject', subject);
      formData.append('text', textContent);
      formData.append('html', htmlContent);

      const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`api:${API}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Mailgun error ${response.status}: ${errorText}`);
      }

      // Update status to sent
      await supabase
        .from('lead_magnets')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
          error: null
        })
        .eq('id', leadId);

      if (DEBUG) {
        console.log('[send-guide] Email sent successfully via Mailgun:', { email, leadId });
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, sent: true, provider: 'mailgun' })
      };
    }
  } catch (err) {
    console.error('[send-guide] Email send error:', err);

    // Update status to failed
    await supabase
      .from('lead_magnets')
      .update({
        status: 'failed',
        error: err.message || 'Unknown error'
      })
      .eq('id', leadId);

    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, message: 'Failed to send email' })
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ ok: false, message: 'Unknown error' })
  };
};
