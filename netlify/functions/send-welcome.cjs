const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.EMAIL_API_KEY;
  if (!apiKey || apiKey === 'placeholder_set_in_netlify') {
    console.warn('[send-welcome] EMAIL_API_KEY not configured, skipping email');
    return { statusCode: 200, body: JSON.stringify({ ok: true, sent: false, reason: 'no_api_key' }) };
  }

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

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    await supabase.from('events').insert({
      route: 'send-welcome',
      status: 200,
      user_id: null
    });

    console.info(`[send-welcome] Would send email to ${email} (plan: ${plan})`);
    console.info('[send-welcome] Quick-start tips:');
    console.info('  1. Check supplement-medication interactions instantly');
    console.info('  2. Explore 2,400+ evidence-based interactions');
    console.info('  3. Upgrade for unlimited checks + PDF reports');

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, sent: true, mock: true })
    };
  } catch (err) {
    console.error('[send-welcome] Error:', err);
    return { statusCode: 500, body: 'Failed to send welcome email' };
  }
};
