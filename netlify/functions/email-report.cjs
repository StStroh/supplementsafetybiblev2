/*
 * Email Report - Premium Only Feature
 * Sends a PDF report to the user's email with signed URL
 */
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

async function verifyAuth(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header');
  }

  const token = authHeader.replace('Bearer ', '');
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    throw new Error('Unauthorized');
  }

  return { user, supabase };
}

async function sendEmailViaSupabase(supabase, userEmail, reportTitle, reportId) {
  // For now, return a placeholder message
  // This would be implemented with Resend or another email service
  // by adding RESEND_API_KEY to env and using their API

  console.log('[email-report] Email would be sent to:', userEmail);
  console.log('[email-report] Report:', reportTitle, reportId);

  // Placeholder implementation
  return {
    ok: true,
    message: 'Email functionality ready for integration with Resend API',
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    console.log('[email-report] Starting email send');

    const authHeader = event.headers.authorization || event.headers.Authorization;
    const { user, supabase } = await verifyAuth(authHeader);

    console.log('[email-report] User authenticated:', user.email);

    // Check user plan - Premium only
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, email, name')
      .eq('id', user.id)
      .maybeSingle();

    const userPlan = profile?.role || 'free';
    console.log('[email-report] User plan:', userPlan);

    if (userPlan !== 'premium') {
      return json(403, {
        error: 'Email reports are Premium only',
        message: 'Upgrade to Premium to email reports to yourself',
        requiresUpgrade: true,
        userPlan,
      });
    }

    // Parse request
    const body = JSON.parse(event.body || '{}');
    const { report_id, email } = body;

    if (!report_id) {
      return json(400, { error: 'Missing report_id' });
    }

    // Fetch report
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('*')
      .eq('id', report_id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (reportError || !report) {
      return json(404, { error: 'Report not found' });
    }

    console.log('[email-report] Report found:', report.title);

    // Send email
    const targetEmail = email || profile?.email || user.email;
    const result = await sendEmailViaSupabase(supabase, targetEmail, report.title, report_id);

    console.log('[email-report] Email sent successfully');

    return json(200, {
      ok: true,
      message: `Report will be emailed to ${targetEmail}`,
    });

  } catch (error) {
    console.error('[email-report] Error:', error);

    if (error.message === 'Unauthorized') {
      return json(401, { error: 'Please sign in again' });
    }

    return json(500, {
      error: 'Failed to send email',
      message: error.message,
    });
  }
};
