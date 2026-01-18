/*
 * Premium Concierge PDF Export
 * Server-side PDF generation with Supabase storage
 * Pro/Premium only - Starter sees upgrade modal
 */
const { createClient } = require('@supabase/supabase-js');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

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

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    console.log('[generate-report-pdf] Starting PDF generation');

    const authHeader = event.headers.authorization || event.headers.Authorization;
    const { user, supabase } = await verifyAuth(authHeader);

    console.log('[generate-report-pdf] User authenticated:', user.email);

    // Check user plan
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, name')
      .eq('id', user.id)
      .maybeSingle();

    const userPlan = profile?.role || 'free';
    console.log('[generate-report-pdf] User plan:', userPlan);

    if (!['pro', 'premium'].includes(userPlan)) {
      return json(403, {
        error: 'PDF Export requires Pro or Premium',
        message: 'PDF reports are included with Pro and Premium plans',
        requiresUpgrade: true,
        userPlan,
      });
    }

    // Parse request
    const body = JSON.parse(event.body || '{}');
    const { title, input, results, report_id } = body;

    if (!results) {
      return json(400, { error: 'Missing results data' });
    }

    console.log('[generate-report-pdf] Generating PDF for:', title || 'Interaction Check Report');

    // Generate PDF
    const pdfBuffer = await generatePremiumPDF({
      title: title || 'Interaction Check Report',
      input: input || {},
      results: results,
      user: user,
      userName: profile?.name || user.email?.split('@')[0] || 'User',
    });

    // Create report record
    const reportData = {
      user_id: user.id,
      title: title || 'Interaction Check Report',
      input_json: input || {},
      result_json: results,
      plan_at_time: userPlan,
      pdf_path: null, // Will be updated if we implement storage
    };

    let reportRecord = null;
    if (report_id) {
      // Update existing
      const { data, error } = await supabase
        .from('reports')
        .update(reportData)
        .eq('id', report_id)
        .eq('user_id', user.id)
        .select()
        .maybeSingle();

      if (!error) reportRecord = data;
    } else {
      // Create new
      const { data, error } = await supabase
        .from('reports')
        .insert(reportData)
        .select()
        .maybeSingle();

      if (!error) reportRecord = data;
    }

    console.log('[generate-report-pdf] Report saved:', reportRecord?.id);

    // Return PDF as base64
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="SSB-Report.pdf"',
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true,
    };

  } catch (error) {
    console.error('[generate-report-pdf] Error:', error);

    if (error.message === 'Unauthorized') {
      return json(401, { error: 'Please sign in again' });
    }

    return json(500, {
      error: 'Failed to generate PDF',
      message: error.message,
    });
  }
};

async function generatePremiumPDF({ title, input, results, user, userName }) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const margin = 60;
  const lineHeight = 18;
  let y = height - margin;

  // Brand header
  page.drawText('Supplement Safety Bible', {
    x: margin,
    y: y,
    size: 22,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  y -= 28;
  page.drawText(title, {
    x: margin,
    y: y,
    size: 14,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  });

  // Thin divider
  y -= 20;
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    thickness: 0.5,
    color: rgb(0.8, 0.8, 0.8),
  });

  y -= 30;

  // Customer info
  page.drawText(`Prepared for: ${userName}`, {
    x: margin,
    y: y,
    size: 10,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  y -= 14;
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  page.drawText(`Date: ${date}`, {
    x: margin,
    y: y,
    size: 10,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  y -= 40;

  // Summary section
  if (results.ok) {
    page.drawText('Summary', {
      x: margin,
      y: y,
      size: 16,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= 24;

    const severity = results.severity || 'unknown';
    const severityColor = getSeverityColor(severity);
    const severityText = severity.charAt(0).toUpperCase() + severity.slice(1);

    page.drawText(`Interaction Level: ${severityText}`, {
      x: margin + 10,
      y: y,
      size: 12,
      font: fontBold,
      color: severityColor,
    });

    y -= 24;

    page.drawText(`${results.pair.supplement} + ${results.pair.medication}`, {
      x: margin + 10,
      y: y,
      size: 11,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.2),
    });

    y -= 30;
  }

  // Clinical explanation
  if (results.summary) {
    page.drawText('Clinical Explanation', {
      x: margin,
      y: y,
      size: 14,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= 20;

    const lines = wrapText(results.summary, 68);
    for (const line of lines) {
      if (y < 120) break;
      page.drawText(line, {
        x: margin + 10,
        y: y,
        size: 10,
        font: fontRegular,
        color: rgb(0.2, 0.2, 0.2),
      });
      y -= lineHeight;
    }

    y -= 10;
  }

  // Recommendations
  if (results.recommendations && results.recommendations.length > 0) {
    if (y < 180) {
      // Need new page
      const newPage = pdfDoc.addPage([612, 792]);
      y = height - margin;
    }

    page.drawText('Recommendations', {
      x: margin,
      y: y,
      size: 14,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= 20;

    results.recommendations.forEach((rec, i) => {
      if (y < 120) return;

      const recLines = wrapText(`${i + 1}. ${rec}`, 66);
      recLines.forEach((line) => {
        if (y < 120) return;
        page.drawText(line, {
          x: margin + 10,
          y: y,
          size: 10,
          font: fontRegular,
          color: rgb(0.2, 0.2, 0.2),
        });
        y -= lineHeight;
      });
      y -= 4;
    });

    y -= 10;
  }

  // Mechanism (if available)
  if (results.mechanism) {
    if (y < 140) {
      const newPage = pdfDoc.addPage([612, 792]);
      y = height - margin;
    }

    page.drawText('Mechanism of Interaction', {
      x: margin,
      y: y,
      size: 14,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= 20;

    const mechLines = wrapText(results.mechanism, 68);
    for (const line of mechLines) {
      if (y < 120) break;
      page.drawText(line, {
        x: margin + 10,
        y: y,
        size: 10,
        font: fontRegular,
        color: rgb(0.2, 0.2, 0.2),
      });
      y -= lineHeight;
    }

    y -= 10;
  }

  // Sources
  if (results.sources && results.sources.length > 0) {
    if (y < 100) {
      const newPage = pdfDoc.addPage([612, 792]);
      y = height - margin;
    }

    page.drawText('Sources', {
      x: margin,
      y: y,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= 18;

    results.sources.slice(0, 5).forEach((source, i) => {
      if (y < 80) return;

      const sourceText = `${i + 1}. ${source.title}${source.year ? ` (${source.year})` : ''}`;
      const sourceLines = wrapText(sourceText, 70);

      sourceLines.forEach((line) => {
        if (y < 80) return;
        page.drawText(line, {
          x: margin + 10,
          y: y,
          size: 8,
          font: fontRegular,
          color: rgb(0.4, 0.4, 0.4),
        });
        y -= 14;
      });
    });
  }

  // Footer
  const footerY = 50;
  page.drawLine({
    start: { x: margin, y: footerY + 20 },
    end: { x: width - margin, y: footerY + 20 },
    thickness: 0.5,
    color: rgb(0.85, 0.85, 0.85),
  });

  page.drawText('Supplement Safety Bible', {
    x: margin,
    y: footerY,
    size: 8,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  page.drawText('Page 1', {
    x: width - margin - 40,
    y: footerY,
    size: 8,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

function getSeverityColor(severity) {
  const level = (severity || '').toLowerCase();
  if (level === 'severe' || level === 'high') {
    return rgb(0.86, 0.15, 0.15); // Red
  } else if (level === 'moderate') {
    return rgb(0.92, 0.45, 0.09); // Orange
  } else if (level === 'low') {
    return rgb(0.92, 0.7, 0.05); // Yellow
  }
  return rgb(0.42, 0.42, 0.42); // Gray
}

function wrapText(text, maxLength) {
  if (!text) return [];
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + ' ' + word).trim().length <= maxLength) {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}
