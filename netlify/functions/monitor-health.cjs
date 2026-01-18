const { createClient } = require('@supabase/supabase-js');

exports.handler = async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const checks = [];
  const siteUrl = process.env.VITE_SITE_URL || 'https://supplementsafetybible.com';

  try {
    const homepageRes = await fetch(siteUrl, { method: 'GET' });
    checks.push({
      endpoint: siteUrl,
      expected: 200,
      actual: homepageRes.status,
      ok: homepageRes.status === 200
    });
  } catch (err) {
    checks.push({
      endpoint: siteUrl,
      expected: 200,
      actual: 0,
      ok: false,
      error: err.message
    });
  }

  try {
    const sitemapRes = await fetch(`${siteUrl}/sitemap.xml`, { method: 'GET' });
    checks.push({
      endpoint: `${siteUrl}/sitemap.xml`,
      expected: 200,
      actual: sitemapRes.status,
      ok: sitemapRes.status === 200
    });
  } catch (err) {
    checks.push({
      endpoint: `${siteUrl}/sitemap.xml`,
      expected: 200,
      actual: 0,
      ok: false,
      error: err.message
    });
  }

  try {
    const checkoutRes = await fetch(`${siteUrl}/.netlify/functions/create-checkout-session`, {
      method: 'GET'
    });
    checks.push({
      endpoint: `${siteUrl}/.netlify/functions/create-checkout-session`,
      expected: 405,
      actual: checkoutRes.status,
      ok: checkoutRes.status === 405
    });
  } catch (err) {
    checks.push({
      endpoint: `${siteUrl}/.netlify/functions/create-checkout-session`,
      expected: 405,
      actual: 0,
      ok: false,
      error: err.message
    });
  }

  const failures = checks.filter(c => !c.ok);

  await supabase.from('events').insert({
    route: 'monitor-health',
    status: failures.length === 0 ? 200 : 500,
    user_id: null
  });

  if (failures.length > 0) {
    console.error('[monitor-health] Anomalies detected:', JSON.stringify(failures, null, 2));

    const API = process.env.EMAIL_API_KEY;
    const PROVIDER = API?.startsWith('SG.') ? 'sendgrid' :
                     API?.startsWith('key-') || API?.startsWith('mg_') ? 'mailgun' : 'disabled';

    if (PROVIDER === 'disabled') {
      console.warn('[monitor-health] EMAIL_API_KEY disabled, alert email skipped');
    } else {
      console.info('[monitor-health] Would send alert email for:', failures.length, 'failures');
      // Alert email sending logic would go here (same pattern as send-welcome.cjs)
      // For now, we log and continue
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, failures })
    };
  }

  console.info('[monitor-health] All checks passed');
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, checks })
  };
};
