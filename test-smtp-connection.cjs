const nodemailer = require('nodemailer');
require('dotenv').config();

async function testSMTP() {
  console.log('\n🔍 Testing SMTP Connection...\n');

  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT || '587';
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL || process.env.EMAIL_FROM;
  const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || 'Supplement Safety Bible';

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('❌ Missing SMTP credentials in .env file');
    console.log('\nRequired environment variables:');
    console.log('  SMTP_HOST=smtp.gmail.com');
    console.log('  SMTP_PORT=587');
    console.log('  SMTP_USER=your-email@gmail.com');
    console.log('  SMTP_PASS=your-app-password');
    console.log('  SMTP_FROM_EMAIL=your-email@gmail.com');
    console.log('  SMTP_FROM_NAME=Supplement Safety Bible');
    console.log('\nAdd these to your .env file and try again.\n');
    process.exit(1);
  }

  console.log('📧 SMTP Settings:');
  console.log(`   Host: ${SMTP_HOST}`);
  console.log(`   Port: ${SMTP_PORT}`);
  console.log(`   User: ${SMTP_USER}`);
  console.log(`   From: "${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`);
  console.log('');

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    secure: SMTP_PORT === '465',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  try {
    console.log('🔌 Testing connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    const sendTest = process.argv.includes('--send');

    if (sendTest) {
      console.log('📨 Sending test email...');

      const info = await transporter.sendMail({
        from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
        to: SMTP_USER,
        subject: '✅ Test Email from Lead Magnet System',
        text: 'If you receive this, SMTP is working perfectly!\n\nYour lead magnet email system is ready to send real emails.',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
              .success { background: #dcfce7; border: 2px solid #22c55e; border-radius: 8px; padding: 20px; text-align: center; }
              .icon { font-size: 48px; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <div class="success">
              <div class="icon">✅</div>
              <h1 style="color: #166534; margin: 10px 0;">SMTP Working!</h1>
              <p style="color: #166534;">If you receive this, SMTP is configured correctly.</p>
              <p style="color: #166534;">Your lead magnet email system is ready to send real emails.</p>
            </div>
          </body>
          </html>
        `
      });

      console.log('✅ Test email sent successfully!');
      console.log(`   Message ID: ${info.messageId}`);
      console.log(`   To: ${SMTP_USER}`);
      console.log('\n📬 Check your inbox (and spam folder) for the test email.\n');
    } else {
      console.log('💡 Connection test passed!');
      console.log('\nTo send a test email, run:');
      console.log('   node test-smtp-connection.cjs --send\n');
    }
  } catch (error) {
    console.error('❌ SMTP connection failed!\n');
    console.error('Error:', error.message);
    console.log('\n🔧 Troubleshooting:');

    if (error.message.includes('Invalid login')) {
      console.log('  • Wrong username or password');
      console.log('  • For Gmail: Use app password, not account password');
      console.log('  • Generate app password at: https://myaccount.google.com/apppasswords');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('  • Wrong SMTP host or port');
      console.log('  • Check your email provider\'s SMTP settings');
    } else if (error.message.includes('ETIMEDOUT')) {
      console.log('  • Connection timeout - check firewall/network');
      console.log('  • Try different port (587 or 465)');
    } else {
      console.log('  • Double-check all SMTP settings in .env');
      console.log('  • Verify credentials work in email client');
    }
    console.log('');
    process.exit(1);
  }
}

testSMTP();
