const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

const TOP_20_INTERACTIONS = [
  {
    name: "St. John's Wort + Antidepressants (SSRIs)",
    severity: "MAJOR",
    description: "Can cause serotonin syndrome, a potentially life-threatening condition with symptoms including agitation, confusion, rapid heart rate, and high blood pressure.",
    recommendation: "Never combine without medical supervision. Allow 2-week washout period."
  },
  {
    name: "Warfarin + Vitamin K / Garlic / Ginkgo",
    severity: "MAJOR",
    description: "Dramatically affects blood clotting. Vitamin K reduces warfarin effectiveness; garlic and ginkgo increase bleeding risk.",
    recommendation: "Maintain consistent vitamin K intake. Avoid high-dose garlic/ginkgo supplements."
  },
  {
    name: "Blood Pressure Medications + Licorice Root",
    severity: "MAJOR",
    description: "Licorice can increase blood pressure and reduce medication effectiveness, potentially causing hypertensive crisis.",
    recommendation: "Avoid licorice supplements if taking antihypertensive medications."
  },
  {
    name: "Thyroid Medications + Calcium / Iron",
    severity: "MAJOR",
    description: "Calcium and iron significantly reduce thyroid medication absorption, leading to inadequate treatment.",
    recommendation: "Take calcium/iron at least 4 hours apart from thyroid medication."
  },
  {
    name: "Statins + Red Yeast Rice",
    severity: "MAJOR",
    description: "Red yeast rice contains natural statins. Combining increases risk of muscle damage (rhabdomyolysis) and liver problems.",
    recommendation: "Do not combine. Choose one approach under medical guidance."
  },
  {
    name: "Metformin + Vitamin B12",
    severity: "MODERATE",
    description: "Long-term metformin use depletes vitamin B12, potentially causing neuropathy and anemia.",
    recommendation: "Monitor B12 levels. Consider supplementation with medical approval."
  },
  {
    name: "Antibiotics + Probiotics",
    severity: "MODERATE",
    description: "Antibiotics kill beneficial bacteria along with harmful ones, reducing probiotic effectiveness.",
    recommendation: "Take probiotics 2-3 hours apart from antibiotics. Continue for several weeks after."
  },
  {
    name: "Chemotherapy + Antioxidants (High-Dose)",
    severity: "MAJOR",
    description: "High-dose antioxidants may interfere with chemotherapy effectiveness by protecting cancer cells.",
    recommendation: "Discuss any supplements with oncologist before starting."
  },
  {
    name: "Immunosuppressants + Echinacea",
    severity: "MAJOR",
    description: "Echinacea stimulates immune system, directly counteracting immunosuppressant medications.",
    recommendation: "Avoid echinacea completely if taking immunosuppressants."
  },
  {
    name: "Sedatives/Sleep Aids + Valerian / Melatonin",
    severity: "MODERATE",
    description: "Combined sedative effects can cause excessive drowsiness, impaired coordination, and dangerous respiratory depression.",
    recommendation: "Use only one sleep aid at a time. Consult doctor before combining."
  },
  {
    name: "Diabetes Medications + Cinnamon / Chromium",
    severity: "MODERATE",
    description: "These supplements lower blood sugar. Combined with medications, may cause dangerous hypoglycemia.",
    recommendation: "Monitor blood sugar closely. Adjust medication doses with doctor guidance."
  },
  {
    name: "Levothyroxine + Biotin (High-Dose)",
    severity: "MODERATE",
    description: "Biotin interferes with thyroid lab tests, causing falsely abnormal results that may lead to incorrect treatment.",
    recommendation: "Stop biotin 2-3 days before thyroid testing. Inform doctor of supplement use."
  },
  {
    name: "MAO Inhibitors + Tyramine (aged foods) / St. John's Wort",
    severity: "MAJOR",
    description: "Can cause hypertensive crisis with dangerously high blood pressure, potentially leading to stroke.",
    recommendation: "Strict dietary restrictions required. Never combine with St. John's Wort."
  },
  {
    name: "Anticoagulants + Fish Oil / Vitamin E (High-Dose)",
    severity: "MODERATE",
    description: "Increases bleeding risk, especially before surgery or with injury. May cause dangerous hemorrhage.",
    recommendation: "Use low doses (<1000mg EPA/DHA). Discontinue before surgery as advised."
  },
  {
    name: "Digoxin + Hawthorn / Licorice",
    severity: "MAJOR",
    description: "Can increase digoxin levels causing toxicity (nausea, vision changes, arrhythmias) or reduce effectiveness.",
    recommendation: "Avoid these herbs. Requires close monitoring if used together."
  },
  {
    name: "Benzodiazepines + Kava",
    severity: "MODERATE",
    description: "Both affect GABA receptors. Combined use increases sedation, cognitive impairment, and liver toxicity risk.",
    recommendation: "Do not combine. Choose one anxiety treatment approach."
  },
  {
    name: "Birth Control Pills + St. John's Wort",
    severity: "MAJOR",
    description: "St. John's Wort reduces contraceptive effectiveness, significantly increasing pregnancy risk.",
    recommendation: "Use backup contraception. Consider alternative depression treatments."
  },
  {
    name: "Cyclosporine + St. John's Wort",
    severity: "MAJOR",
    description: "Dramatically lowers cyclosporine levels, risking organ rejection in transplant patients.",
    recommendation: "Complete avoidance required. No safe way to combine."
  },
  {
    name: "Aspirin + Ginkgo Biloba",
    severity: "MODERATE",
    description: "Both thin blood. Combined use significantly increases bleeding risk, including brain hemorrhage.",
    recommendation: "Avoid high-dose ginkgo. Stop before surgery. Monitor for unusual bleeding."
  },
  {
    name: "Antibiotics (Tetracyclines) + Calcium / Magnesium / Iron",
    severity: "MODERATE",
    description: "These minerals bind to antibiotics in the gut, dramatically reducing absorption and effectiveness.",
    recommendation: "Separate by at least 2-3 hours. Take antibiotics on empty stomach if possible."
  }
];

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 50;
  const contentWidth = pageWidth - (2 * margin);

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let yPosition = pageHeight - margin;

  page.drawText('Top 20 Dangerous', {
    x: margin,
    y: yPosition,
    size: 32,
    font: helveticaBold,
    color: rgb(0.37, 0.17, 0.49),
  });
  yPosition -= 40;

  page.drawText('Supplement-Drug Interactions', {
    x: margin,
    y: yPosition,
    size: 28,
    font: helveticaBold,
    color: rgb(0.37, 0.17, 0.49),
  });
  yPosition -= 30;

  page.drawText('Your Essential Safety Guide', {
    x: margin,
    y: yPosition,
    size: 14,
    font: helveticaFont,
    color: rgb(0.4, 0.4, 0.4),
  });
  yPosition -= 50;

  const introText = [
    "This guide identifies the most critical supplement-drug interactions that could",
    "affect your health. Many people don't realize that 'natural' supplements can",
    "interact with prescription medications, sometimes with serious consequences.",
    "",
    "WARNING: This is educational information only. Always consult your healthcare",
    "provider before starting, stopping, or changing any supplements or medications."
  ];

  for (const line of introText) {
    page.drawText(line, {
      x: margin,
      y: yPosition,
      size: 11,
      font: helveticaFont,
      color: rgb(0.2, 0.2, 0.2),
    });
    yPosition -= 18;
  }

  yPosition -= 30;

  for (let i = 0; i < TOP_20_INTERACTIONS.length; i++) {
    const interaction = TOP_20_INTERACTIONS[i];

    if (yPosition < 150) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;
    }

    page.drawText(`${i + 1}. ${interaction.name}`, {
      x: margin,
      y: yPosition,
      size: 13,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    yPosition -= 20;

    const severityColor = interaction.severity === 'MAJOR'
      ? rgb(0.8, 0.2, 0.2)
      : rgb(0.9, 0.6, 0.0);

    page.drawRectangle({
      x: margin,
      y: yPosition - 3,
      width: 60,
      height: 16,
      color: severityColor,
    });

    page.drawText(interaction.severity, {
      x: margin + 5,
      y: yPosition,
      size: 9,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });
    yPosition -= 25;

    const descWords = interaction.description.split(' ');
    let line = '';
    for (const word of descWords) {
      const testLine = line + word + ' ';
      const textWidth = helveticaFont.widthOfTextAtSize(testLine, 10);

      if (textWidth > contentWidth - 20) {
        page.drawText(line, {
          x: margin + 10,
          y: yPosition,
          size: 10,
          font: helveticaFont,
          color: rgb(0.2, 0.2, 0.2),
        });
        line = word + ' ';
        yPosition -= 15;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, {
        x: margin + 10,
        y: yPosition,
        size: 10,
        font: helveticaFont,
        color: rgb(0.2, 0.2, 0.2),
      });
      yPosition -= 20;
    }

    page.drawText('Action: ', {
      x: margin + 10,
      y: yPosition,
      size: 10,
      font: helveticaBold,
      color: rgb(0.37, 0.17, 0.49),
    });

    const recWords = interaction.recommendation.split(' ');
    line = '';
    let startX = margin + 60;
    for (const word of recWords) {
      const testLine = line + word + ' ';
      const textWidth = helveticaFont.widthOfTextAtSize(testLine, 10);

      if (textWidth > contentWidth - 60) {
        page.drawText(line, {
          x: startX,
          y: yPosition,
          size: 10,
          font: helveticaFont,
          color: rgb(0.1, 0.1, 0.1),
        });
        line = word + ' ';
        yPosition -= 15;
        startX = margin + 10;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, {
        x: startX,
        y: yPosition,
        size: 10,
        font: helveticaFont,
        color: rgb(0.1, 0.1, 0.1),
      });
    }

    yPosition -= 30;
  }

  page = pdfDoc.addPage([pageWidth, pageHeight]);
  yPosition = pageHeight - margin;

  page.drawText('Important Reminders', {
    x: margin,
    y: yPosition,
    size: 20,
    font: helveticaBold,
    color: rgb(0.37, 0.17, 0.49),
  });
  yPosition -= 40;

  const reminders = [
    "• Always inform your doctor and pharmacist about ALL supplements you take",
    "• Read supplement labels carefully and research potential interactions",
    "• Never stop prescribed medications without consulting your healthcare provider",
    "• Keep a written list of all medications and supplements you take",
    "• Be especially cautious when starting new medications or supplements",
    "• Watch for unusual symptoms after starting any new supplement",
    "• Purchase supplements from reputable sources with quality testing",
    "",
    "When to Seek Immediate Medical Attention:",
    "",
    "• Unusual bleeding or bruising",
    "• Severe dizziness or confusion",
    "• Chest pain or difficulty breathing",
    "• Severe headache or vision changes",
    "• Rapid or irregular heartbeat",
    "• Severe nausea or vomiting",
    "• Signs of allergic reaction (rash, swelling, difficulty breathing)",
    "",
    "",
    "Want to check YOUR specific supplements and medications?",
    "Visit: SupplementSafetyBible.com",
    "",
    "Our free interaction checker analyzes your complete supplement and",
    "medication list to identify potential interactions personalized to YOU.",
    "",
    "",
    "Disclaimer: This guide is for educational purposes only and does not constitute medical",
    "advice. Always consult qualified healthcare professionals before making decisions about",
    "your health, medications, or supplements."
  ];

  for (const reminder of reminders) {
    if (yPosition < 100) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;
    }

    const fontSize = reminder.startsWith('•') ? 11 :
                     reminder === '' ? 11 :
                     reminder.includes('Visit:') || reminder.includes('Want to check') ? 12 : 11;
    const font = reminder.includes('Visit:') || reminder.includes('Want to check') ||
                 reminder.includes('When to Seek') ? helveticaBold : helveticaFont;
    const color = reminder.includes('Visit:') ? rgb(0.37, 0.17, 0.49) : rgb(0.2, 0.2, 0.2);

    page.drawText(reminder, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font: font,
      color: color,
    });
    yPosition -= reminder === '' ? 10 : 18;
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '..', 'public', 'guides', 'Top-20-Dangerous-Supplement-Interactions.pdf');

  fs.writeFileSync(outputPath, pdfBytes);
  console.log('✅ PDF guide generated successfully at:', outputPath);
  console.log(`📄 File size: ${(pdfBytes.length / 1024).toFixed(2)} KB`);
}

generatePDF().catch(err => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
