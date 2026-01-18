import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing or invalid authorization header' })
      };
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return {
        statusCode: 401,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('plan, role')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      return {
        statusCode: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to fetch user profile' })
      };
    }

    const userPlan = profile?.plan || profile?.role || 'free';

    if (!['pro', 'premium'].includes(userPlan)) {
      return {
        statusCode: 403,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'PDF downloads require Pro or Premium',
          message: 'PDF reports are available on Pro and Premium plans',
          requiresUpgrade: true,
          userPlan
        })
      };
    }

    const { interactionId } = JSON.parse(event.body || '{}');

    if (!interactionId) {
      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing interaction ID' })
      };
    }

    const { data, error } = await supabaseAdmin
      .from('interactions')
      .select(`
        id,
        severity,
        description,
        recommendation,
        supplements:supplement_id(name),
        medications:medication_id(name)
      `)
      .eq('id', interactionId)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return {
        statusCode: 404,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Interaction not found' })
      };
    }

    const pdfContent = generateSimplePDF({
      supplement_name: data.supplements?.name || 'Unknown',
      medication_name: data.medications?.name || 'Unknown',
      severity: data.severity,
      description: data.description,
      recommendation: data.recommendation
    });

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="interaction-report.pdf"`
      },
      body: pdfContent,
      isBase64Encoded: true
    };
  } catch (error) {
    console.error('PDF generation error:', error);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to generate PDF' })
    };
  }
};

function generateSimplePDF(interaction: any): string {
  const content = `
SafetyBible Interaction Report
Generated: ${new Date().toLocaleDateString()}

Supplement: ${interaction.supplement_name}
Medication: ${interaction.medication_name}
Severity: ${interaction.severity.toUpperCase()}

Description:
${interaction.description}

Recommendation:
${interaction.recommendation}

Disclaimer:
This information is for educational purposes only. Always consult your healthcare provider.
  `.trim();

  return Buffer.from(content).toString('base64');
}
