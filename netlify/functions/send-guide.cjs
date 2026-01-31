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

  const DOWNLOAD_URL = '/guides/Top-20-Dangerous-Supplement-Interactions.pdf';

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
        isNewSubscriber = false;

        await supabase
          .from('email_subscribers')
          .update({
            updated_at: new Date().toISOString(),
            guide_requested: leadMagnet
          })
          .eq('email', normalizedEmail);

        console.log('[send-guide] Updated existing subscriber:', normalizedEmail);
      } else {
        throw insertError;
      }
    } else {
      console.log('[send-guide] New subscriber added:', normalizedEmail);
    }
  } catch (err) {
    console.error('[send-guide] Database error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: 'Database error' })
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ok: true,
      isNewSubscriber,
      downloadUrl: DOWNLOAD_URL,
      message: 'Your download is ready!'
    })
  };
};
