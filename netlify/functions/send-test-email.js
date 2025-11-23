const nodemailer = require('nodemailer');

const SUPPORT_EMAIL = 'support@supplementsafetybible.com';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Check environment variables
    const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM_NAME', 'SMTP_FROM_EMAIL'];
    const missing = requiredVars.filter(v => !process.env[v]);

    if (missing.length > 0) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          ok: false,
          error: `Missing SMTP configuration: ${missing.join(', ')}`,
          support: SUPPORT_EMAIL
        }),
      };
    }

    // Parse parameters
    const params = event.httpMethod === 'GET'
      ? new URLSearchParams(event.queryStringParameters || {})
      : null;

    const body = event.httpMethod === 'POST' && event.body
      ? JSON.parse(event.body)
      : {};

    const to = params?.get('to') || body.to;
    const subject = params?.get('subject') || body.subject || 'SSB SMTP Test ✓';
    const text = params?.get('text') || body.text || 'Your SMTP is working for Supplement Safety Bible.';

    if (!to) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          ok: false,
          error: 'Missing required parameter: to',
          support: SUPPORT_EMAIL
        }),
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          ok: false,
          error: 'Invalid email address format',
          support: SUPPORT_EMAIL
        }),
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: parseInt(process.env.SMTP_PORT, 10) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log('Sending test email to:', to);

    // Send email
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      text,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 40px;">
            <h1 style="margin: 0 0 20px; font-size: 24px; color: #1f2937;">✓ SMTP Test Successful</h1>
            <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #4b5563;">${text}</p>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">From: ${process.env.SMTP_FROM_NAME} &lt;${process.env.SMTP_FROM_EMAIL}&gt;</p>
            <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">&copy; 2025 Certified Nutra Labs L.L.C. &bull; Miami, FL</p>
              <p style="margin: 8px 0 0; font-size: 13px; color: #6b7280;">
                <a href="mailto:${SUPPORT_EMAIL}" style="color: #2563eb; text-decoration: none;">${SUPPORT_EMAIL}</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Email sent successfully:', info.messageId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        messageId: info.messageId,
        to,
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      }),
    };
  } catch (error) {
    console.error('SMTP error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        error: error.message || 'Failed to send email',
        support: SUPPORT_EMAIL
      }),
    };
  }
};
