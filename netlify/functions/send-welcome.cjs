const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const API = process.env.EMAIL_API_KEY;
  const PROVIDER = API?.startsWith('SG.') ? 'sendgrid' :
                   API?.startsWith('key-') || API?.startsWith('mg_') ? 'mailgun' : 'disabled';

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { email, plan } = payload;
  if (!email) {
    return { statusCode: 400, body: 'Missing email' };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (PROVIDER === 'disabled') {
    console.warn('[send-welcome] EMAIL_API_KEY disabled, returning mocked response');
    await supabase.from('events').insert({
      route: 'send-welcome',
      status: 202,
      user_id: null
    });

    console.info(`[send-welcome] Would send email to ${email} (plan: ${plan})`);
    console.info('[send-welcome] Quick-start tips:');
    console.info('  1. Check supplement-medication interactions instantly');
    console.info('  2. Explore 2,400+ evidence-based interactions');
    console.info('  3. Upgrade for unlimited checks + PDF reports');

    return {
      statusCode: 202,
      body: JSON.stringify({ ok: true, mocked: true })
    };
  }

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
          from: { email: 'noreply@supplementsafetybible.com', name: 'Supplement Safety Bible' },
          subject: 'Welcome to Don\'t Mix Blind (Free)',
          content: [{
            type: 'text/plain',
            value: `Welcome to Don't Mix Blind!\n\nYour free account is now active. Here are 3 quick-start tips:\n\n1. Check supplement-medication interactions instantly\n2. Explore 2,400+ evidence-based interactions\n3. Upgrade for unlimited checks + PDF reports\n\nVisit https://supplementsafetybible.com/account to get started.\n\nBest,\nThe Supplement Safety Bible Team`
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`SendGrid error: ${response.status}`);
      }

      await supabase.from('events').insert({
        route: 'send-welcome',
        status: 200,
        user_id: null
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, sent: true, provider: 'sendgrid' })
      };
    }

    if (PROVIDER === 'mailgun') {
      const domain = process.env.MAILGUN_DOMAIN;
      if (!domain) {
        console.warn('[send-welcome] MAILGUN_DOMAIN missing, falling back to disabled');
        await supabase.from('events').insert({
          route: 'send-welcome',
          status: 202,
          user_id: null
        });
        return {
          statusCode: 202,
          body: JSON.stringify({ ok: true, mocked: true, reason: 'mailgun_domain_missing' })
        };
      }

      const formData = new URLSearchParams();
      formData.append('from', 'Supplement Safety Bible <noreply@supplementsafetybible.com>');
      formData.append('to', email);
      formData.append('subject', 'Welcome to Don\'t Mix Blind (Free)');
      formData.append('text', `Welcome to Don't Mix Blind!\n\nYour free account is now active. Here are 3 quick-start tips:\n\n1. Check supplement-medication interactions instantly\n2. Explore 2,400+ evidence-based interactions\n3. Upgrade for unlimited checks + PDF reports\n\nVisit https://supplementsafetybible.com/account to get started.\n\nBest,\nThe Supplement Safety Bible Team`);

      const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`api:${API}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      if (!response.ok) {
        throw new Error(`Mailgun error: ${response.status}`);
      }

      await supabase.from('events').insert({
        route: 'send-welcome',
        status: 200,
        user_id: null
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, sent: true, provider: 'mailgun' })
      };
    }
  } catch (err) {
    console.error('[send-welcome] Error:', err);
    await supabase.from('events').insert({
      route: 'send-welcome',
      status: 500,
      user_id: null
    });
    return { statusCode: 500, body: 'Failed to send welcome email' };
  }
};
