import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import { SafetyPackConfig } from './SafetyPackForm';

export async function generateSafetyPackPDF(config: SafetyPackConfig): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // 8.5" x 11" in points

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();
  const margin = 50;
  let yPosition = height - margin;

  const accentColor = hexToRgb(config.accentColor);

  // Header with optional logo
  if (config.logoDataUrl) {
    try {
      const logoImage = await pdfDoc.embedPng(config.logoDataUrl);
      const logoScale = 40 / logoImage.height;
      page.drawImage(logoImage, {
        x: margin,
        y: yPosition - 40,
        width: logoImage.width * logoScale,
        height: 40,
      });
      yPosition -= 60;
    } catch (err) {
      console.warn('Failed to embed logo:', err);
    }
  }

  // Title
  page.drawText('BEFORE YOU MIX', {
    x: margin,
    y: yPosition,
    size: 24,
    font: helveticaBold,
    color: accentColor,
  });
  yPosition -= 30;

  page.drawText('SUPPLEMENTS + MEDICATIONS', {
    x: margin,
    y: yPosition,
    size: 24,
    font: helveticaBold,
    color: accentColor,
  });
  yPosition -= 40;

  // Brand attribution
  if (config.brandName) {
    page.drawText(`From ${config.brandName}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: helveticaBold,
      color: rgb(0.3, 0.3, 0.3),
    });
    yPosition -= 30;
  }

  // Subhead
  const subhead =
    'Some supplements can change how medications work in your body. A quick check can prevent serious problems.';
  const wrappedSubhead = wrapText(subhead, 70);
  wrappedSubhead.forEach((line) => {
    page.drawText(line, {
      x: margin,
      y: yPosition,
      size: 11,
      font: helvetica,
      color: rgb(0.2, 0.2, 0.2),
    });
    yPosition -= 16;
  });
  yPosition -= 10;

  // Key Points section
  page.drawText('KEY POINTS:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  yPosition -= 24;

  const keyPoints = [
    'Supplements can change drug levels by affecting absorption, metabolism, or elimination.',
    'Blood thinners are high-risk. Some combinations can increase bleeding risk.',
    "St. John's wort is a common problem because it can reduce the effectiveness of certain prescription medications.",
    `Before surgery: ask your clinician if you should stop supplements ${config.surgeryWindow} before the procedure.`,
    "Extra caution if you're pregnant/breastfeeding or if the user is a child.",
  ];

  keyPoints.forEach((point) => {
    page.drawText('•', {
      x: margin,
      y: yPosition,
      size: 10,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    const wrappedPoint = wrapText(point, 68);
    wrappedPoint.forEach((line, idx) => {
      page.drawText(line, {
        x: margin + 15,
        y: yPosition - idx * 14,
        size: 10,
        font: helvetica,
        color: rgb(0.1, 0.1, 0.1),
      });
    });
    yPosition -= wrappedPoint.length * 14 + 6;
  });

  yPosition -= 10;

  // Checklist section
  page.drawText('YOUR SAFETY CHECKLIST:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  yPosition -= 24;

  const checklist = [
    'Make a list of everything you take (supplements + meds + doses).',
    'Share it with your pharmacist or clinician.',
    'If you add a new supplement, ask first—especially if you take prescription meds.',
  ];

  checklist.forEach((item) => {
    page.drawText('☐', {
      x: margin,
      y: yPosition,
      size: 12,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    const wrappedItem = wrapText(item, 68);
    wrappedItem.forEach((line, idx) => {
      page.drawText(line, {
        x: margin + 20,
        y: yPosition - idx * 14,
        size: 10,
        font: helvetica,
        color: rgb(0.1, 0.1, 0.1),
      });
    });
    yPosition -= wrappedItem.length * 14 + 6;
  });

  yPosition -= 20;

  // QR Code section
  page.drawText('RUN A QUICK INTERACTION CHECK:', {
    x: margin,
    y: yPosition,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  yPosition -= 24;

  // Generate QR code
  try {
    const qrDataUrl = await QRCode.toDataURL(config.qrUrl, { width: 120, margin: 1 });
    const qrImage = await pdfDoc.embedPng(qrDataUrl);
    page.drawImage(qrImage, {
      x: margin,
      y: yPosition - 120,
      width: 120,
      height: 120,
    });

    // URL text next to QR
    page.drawText(config.qrUrl, {
      x: margin + 135,
      y: yPosition - 50,
      size: 10,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3),
    });
  } catch (err) {
    console.warn('Failed to generate QR code:', err);
    // Fallback: just show URL
    page.drawText(config.qrUrl, {
      x: margin,
      y: yPosition - 20,
      size: 10,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3),
    });
  }

  // Footer
  const footerY = 80;
  page.drawText(
    'This guidance is based on publicly available consumer safety education from the U.S. FDA and other published references.',
    {
      x: margin,
      y: footerY,
      size: 8,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4),
      maxWidth: width - 2 * margin,
    }
  );

  if (config.supportEmail) {
    page.drawText(`Questions? ${config.supportEmail}`, {
      x: margin,
      y: footerY - 15,
      size: 8,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + word).length <= maxChars) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);

  return lines;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : { r: 0.49, g: 0.23, b: 0.93 }; // Default purple
}
