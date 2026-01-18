const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing or invalid authorization header' }),
      };
    }

    const token = authHeader.replace('Bearer ', '');

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      console.error('Auth error:', authError);
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to fetch user profile' }),
      };
    }

    const userPlan = profile?.plan || 'starter';

    if (!['pro', 'premium', 'pro_trial', 'premium_trial'].includes(userPlan)) {
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'PDF downloads require Pro or Premium',
          message: 'PDF reports are available on Pro and Premium plans',
          requiresUpgrade: true,
          userPlan
        }),
      };
    }

    const body = JSON.parse(event.body || '{}');
    if (!body.data) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing data field in request body' }),
      };
    }

    const { data: reportData } = body;

    const pdfBuffer = await generatePDF(reportData, user);

    const { error: insertError } = await supabaseClient
      .from('pdf_reports')
      .insert({
        user_id: user.id,
        report_type: 'interaction_report',
        payload: reportData,
      });

    if (insertError) {
      console.error('Failed to log report:', insertError);
    }

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="interaction_report.pdf"',
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('PDF generation error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to generate PDF', message: error.message }),
    };
  }
};

async function generatePDF(data, user) {
  const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let yPosition = height - 50;
  const margin = 50;
  const lineHeight = 20;

  page.drawText('Supplement Safety Bible™', {
    x: margin,
    y: yPosition,
    size: 24,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  yPosition -= 30;
  page.drawText('Interaction Checker Report', {
    x: margin,
    y: yPosition,
    size: 16,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  });

  yPosition -= 30;
  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  page.drawText(`Generated for: ${user.email}`, {
    x: margin,
    y: yPosition,
    size: 10,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  });

  yPosition -= 15;
  page.drawText(`Date: ${timestamp}`, {
    x: margin,
    y: yPosition,
    size: 10,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  });

  yPosition -= 40;
  page.drawLine({
    start: { x: margin, y: yPosition },
    end: { x: width - margin, y: yPosition },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  yPosition -= 30;

  if (data.supplements && data.supplements.length > 0) {
    page.drawText('Supplements Checked:', {
      x: margin,
      y: yPosition,
      size: 14,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });
    yPosition -= lineHeight;

    data.supplements.forEach((supp) => {
      const text = `• ${supp.name || supp}`;
      page.drawText(text, {
        x: margin + 10,
        y: yPosition,
        size: 11,
        font: helvetica,
        color: rgb(0.2, 0.2, 0.2),
      });
      yPosition -= lineHeight;
    });
    yPosition -= 10;
  }

  if (data.medications && data.medications.length > 0) {
    page.drawText('Medications Checked:', {
      x: margin,
      y: yPosition,
      size: 14,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });
    yPosition -= lineHeight;

    data.medications.forEach((med) => {
      const text = `• ${med.name || med}`;
      page.drawText(text, {
        x: margin + 10,
        y: yPosition,
        size: 11,
        font: helvetica,
        color: rgb(0.2, 0.2, 0.2),
      });
      yPosition -= lineHeight;
    });
    yPosition -= 10;
  }

  if (data.interactions && data.interactions.length > 0) {
    page.drawText('Interactions Found:', {
      x: margin,
      y: yPosition,
      size: 14,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });
    yPosition -= lineHeight;

    data.interactions.forEach((interaction, index) => {
      if (yPosition < 100) {
        return;
      }

      const severityColor = getSeverityColor(interaction.severity);
      const severityText = (interaction.severity || 'unknown').toUpperCase();

      page.drawText(`${index + 1}. ${interaction.supplement_name} + ${interaction.medication_name}`, {
        x: margin + 10,
        y: yPosition,
        size: 11,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;

      page.drawText(`   Severity: ${severityText}`, {
        x: margin + 10,
        y: yPosition,
        size: 10,
        font: helvetica,
        color: severityColor,
      });
      yPosition -= lineHeight;

      if (interaction.clinical_explanation) {
        const explanation = wrapText(interaction.clinical_explanation, 70);
        explanation.forEach((line) => {
          if (yPosition < 100) return;
          page.drawText(`   ${line}`, {
            x: margin + 10,
            y: yPosition,
            size: 9,
            font: helvetica,
            color: rgb(0.3, 0.3, 0.3),
          });
          yPosition -= 15;
        });
      }

      yPosition -= 10;
    });
  } else {
    page.drawText('No interactions found.', {
      x: margin,
      y: yPosition,
      size: 12,
      font: helvetica,
      color: rgb(0, 0.5, 0),
    });
    yPosition -= lineHeight;
  }

  yPosition = 140;
  page.drawLine({
    start: { x: margin, y: yPosition },
    end: { x: width - margin, y: yPosition },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  yPosition -= 20;
  page.drawText('PROFESSIONAL DISCLAIMER', {
    x: margin,
    y: yPosition,
    size: 10,
    font: helveticaBold,
    color: rgb(0.5, 0, 0),
  });

  yPosition -= 15;
  const disclaimer = [
    'This report is for informational purposes only and does not constitute medical advice.',
    'Always consult with a qualified healthcare professional before making any changes to',
    'your supplement or medication regimen. Supplement Safety Bible is not liable for any',
    'decisions made based on this report.',
  ];

  disclaimer.forEach((line) => {
    page.drawText(line, {
      x: margin,
      y: yPosition,
      size: 8,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4),
    });
    yPosition -= 12;
  });

  yPosition -= 10;
  page.drawLine({
    start: { x: margin, y: yPosition },
    end: { x: width - margin, y: yPosition },
    thickness: 0.5,
    color: rgb(0.9, 0.9, 0.9),
  });

  yPosition -= 15;
  page.drawText('© Supplement Safety Bible — Do Not Mix Blind™', {
    x: margin,
    y: yPosition,
    size: 9,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

function getSeverityColor(severity) {
  const level = (severity || '').toLowerCase();
  if (level.includes('severe') || level.includes('high')) {
    return rgb(0.8, 0, 0);
  } else if (level.includes('moderate') || level.includes('medium')) {
    return rgb(0.9, 0.5, 0);
  } else if (level.includes('mild') || level.includes('low')) {
    return rgb(0.6, 0.6, 0);
  }
  return rgb(0.4, 0.4, 0.4);
}

function wrapText(text, maxLength) {
  if (!text) return [];
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}
