const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

// Professional content for all 20 interactions
const INTERACTIONS = [
  // CRITICAL SEVERITY (Top 5)
  {
    supplement: "St. John's Wort",
    medication: "Birth Control Pills",
    severity: "CRITICAL",
    interaction: "St. John's Wort significantly reduces the effectiveness of hormonal contraceptives by up to 50%, dramatically increasing the risk of unintended pregnancy.",
    mechanism: "St. John's Wort activates the liver enzyme CYP3A4, which rapidly metabolizes and breaks down estrogen and progestin hormones before they can provide contraceptive protection. This enzymatic induction can persist for weeks after discontinuing the herb.",
    symptoms: [
      "Breakthrough bleeding or spotting between periods",
      "Return of menstrual irregularities",
      "Unexpected pregnancy despite consistent pill use",
      "Changes in menstrual flow or timing"
    ],
    actions: [
      "Immediately use backup contraception (condoms) if taking both",
      "Consult your healthcare provider about alternative antidepressant options",
      "Consider non-hormonal contraception methods",
      "Wait at least 2 weeks after stopping St. John's Wort before relying on hormonal contraception"
    ],
    severityExplanation: "This interaction can result in unintended pregnancy with life-changing consequences. The risk remains high even with consistent use of both products.",
    sources: [
      "FDA Drug Safety Communication on herb-drug interactions",
      "Journal of Clinical Pharmacology: St. John's Wort and oral contraceptives"
    ]
  },
  {
    supplement: "Turmeric/Curcumin",
    medication: "Warfarin (Blood Thinner)",
    severity: "CRITICAL",
    interaction: "Turmeric significantly enhances warfarin's blood-thinning effects, potentially causing dangerous bleeding episodes including internal hemorrhaging.",
    mechanism: "Curcumin inhibits platelet aggregation and interferes with vitamin K-dependent clotting factors. When combined with warfarin, this creates a synergistic anticoagulant effect that can lead to critically prolonged bleeding times and INR values outside therapeutic range.",
    symptoms: [
      "Unusual bruising or purple discoloration of skin",
      "Blood in urine (pink, red, or cola-colored)",
      "Black, tarry stools or bloody stools",
      "Severe headaches or dizziness",
      "Prolonged bleeding from cuts or injuries"
    ],
    actions: [
      "Stop turmeric supplements immediately if taking warfarin",
      "Have INR levels checked within 48 hours",
      "Report any unusual bleeding to your doctor urgently",
      "Never restart turmeric without explicit physician approval and monitoring"
    ],
    severityExplanation: "Bleeding complications can be life-threatening, potentially causing brain hemorrhage, gastrointestinal bleeding, or other serious internal bleeding requiring emergency medical intervention.",
    sources: [
      "American Journal of Cardiology: Antiplatelet effects of curcumin",
      "Blood Coagulation & Fibrinolysis: Turmeric-warfarin interactions"
    ]
  },
  {
    supplement: "Vitamin K",
    medication: "Warfarin",
    severity: "CRITICAL",
    interaction: "Vitamin K directly antagonizes warfarin's anticoagulant effect, potentially leading to dangerous blood clot formation and treatment failure.",
    mechanism: "Warfarin works by blocking vitamin K's role in producing clotting factors. Supplemental vitamin K overwhelms this blockade, restoring clotting factor production and negating warfarin's protective effects against thrombosis.",
    symptoms: [
      "Leg swelling or pain (indicating deep vein thrombosis)",
      "Chest pain or shortness of breath (pulmonary embolism)",
      "Sudden severe headache or vision changes (stroke)",
      "INR values dropping below therapeutic range"
    ],
    actions: [
      "Maintain absolutely consistent vitamin K intake - neither too much nor too little",
      "Avoid vitamin K supplements unless prescribed by your doctor",
      "Have INR checked more frequently if dietary vitamin K intake changes",
      "Inform your doctor before taking any multivitamin or green supplement"
    ],
    severityExplanation: "Stroke, heart attack, and life-threatening blood clots can occur if warfarin becomes ineffective. Consistent vitamin K intake is critical for stable anticoagulation.",
    sources: [
      "Journal of the American College of Cardiology: Vitamin K and oral anticoagulants",
      "Thrombosis Research: Dietary vitamin K intake and warfarin stability"
    ]
  },
  {
    supplement: "Ginkgo Biloba",
    medication: "Anticoagulants (Warfarin, Apixaban, Rivaroxaban)",
    severity: "CRITICAL",
    interaction: "Ginkgo has antiplatelet properties that amplify anticoagulant effects, significantly increasing bleeding risk including potentially fatal hemorrhages.",
    mechanism: "Ginkgo inhibits platelet-activating factor (PAF) and reduces platelet aggregation through multiple pathways. Combined with prescription anticoagulants, this creates excessive anticoagulation that impairs the body's ability to stop bleeding.",
    symptoms: [
      "Easy bruising from minor impacts",
      "Bleeding gums when brushing teeth",
      "Nosebleeds that are difficult to stop",
      "Blood spots under the skin (petechiae)",
      "Prolonged bleeding from minor cuts"
    ],
    actions: [
      "Discontinue ginkgo immediately if taking anticoagulants",
      "Stop ginkgo at least 2 weeks before any surgical procedure",
      "Report any unusual bleeding to your physician immediately",
      "Consider alternative cognitive support supplements after consulting your doctor"
    ],
    severityExplanation: "Spontaneous bleeding can occur anywhere in the body, including life-threatening locations like the brain, gastrointestinal tract, or retroperitoneal space.",
    sources: [
      "JAMA: Bleeding complications with ginkgo biloba",
      "European Journal of Clinical Pharmacology: Ginkgo and anticoagulant therapy"
    ]
  },
  {
    supplement: "Ginseng",
    medication: "Warfarin",
    severity: "CRITICAL",
    interaction: "Ginseng unpredictably interferes with warfarin metabolism, causing dangerous fluctuations in anticoagulation that can lead to either bleeding or clotting.",
    mechanism: "Ginseng contains compounds that inhibit warfarin metabolism through CYP2C9 enzyme pathways, but paradoxically may also reduce warfarin absorption. This creates unstable INR levels that are difficult to manage clinically.",
    symptoms: [
      "Wildly fluctuating INR values despite consistent warfarin dosing",
      "Alternating between bleeding symptoms and clotting signs",
      "Fatigue and weakness from subtle internal bleeding",
      "Unexplained changes in energy levels or mental clarity"
    ],
    actions: [
      "Avoid all ginseng products while taking warfarin",
      "If already taking both, do not stop abruptly - consult doctor first",
      "Increase frequency of INR monitoring if ginseng use is suspected",
      "Read supplement labels carefully as ginseng appears in many products"
    ],
    severityExplanation: "The unpredictability of this interaction makes it especially dangerous - you cannot safely manage both medications simultaneously even with monitoring.",
    sources: [
      "Annals of Pharmacotherapy: Ginseng-warfarin interaction case reports",
      "Clinical Pharmacology & Therapeutics: Asian ginseng and anticoagulation"
    ]
  },

  // MAJOR SEVERITY (Next 10)
  {
    supplement: "Fish Oil (Omega-3)",
    medication: "Aspirin",
    severity: "MAJOR",
    interaction: "High-dose fish oil combined with aspirin significantly increases bleeding risk, particularly problematic before surgery or with injury.",
    mechanism: "Both fish oil and aspirin inhibit platelet function through different mechanisms - aspirin blocks COX-1 enzyme while EPA/DHA alter platelet membrane function. Together, they create additive antiplatelet effects.",
    symptoms: [
      "Increased bruising frequency and size",
      "Prolonged bleeding from minor cuts",
      "Nosebleeds becoming more common",
      "Visible blood in eyes (subconjunctival hemorrhage)"
    ],
    actions: [
      "Limit fish oil to less than 1000mg EPA/DHA daily when taking aspirin",
      "Stop fish oil 7-10 days before scheduled surgery",
      "Monitor for unusual bleeding and report to doctor",
      "Avoid using high-dose fish oil for acute anti-inflammatory purposes"
    ],
    severityExplanation: "While generally manageable with dose adjustment, this combination can cause problematic bleeding during surgery or after injuries requiring medical intervention.",
    sources: [
      "American Heart Association: Omega-3 fatty acids and cardiovascular disease",
      "Thrombosis and Haemostasis: Antiplatelet effects of omega-3 fatty acids"
    ]
  },
  {
    supplement: "Calcium",
    medication: "Levothyroxine (Synthroid)",
    severity: "MAJOR",
    interaction: "Calcium significantly reduces levothyroxine absorption by up to 60%, potentially leading to hypothyroid symptoms and treatment failure.",
    mechanism: "Calcium ions bind to levothyroxine in the gastrointestinal tract, forming insoluble complexes that cannot be absorbed. This chelation dramatically reduces the amount of thyroid hormone reaching the bloodstream.",
    symptoms: [
      "Return of hypothyroid symptoms (fatigue, weight gain, cold intolerance)",
      "Rising TSH levels despite consistent medication use",
      "Hair loss or dry skin reappearing",
      "Difficulty concentrating or mental fog"
    ],
    actions: [
      "Take calcium supplements at least 4 hours after levothyroxine",
      "Take levothyroxine first thing in morning on empty stomach",
      "Avoid calcium-fortified orange juice or dairy near thyroid medication time",
      "Have TSH levels rechecked if starting calcium supplements"
    ],
    severityExplanation: "Inadequate thyroid hormone replacement affects every organ system and can cause significant symptoms, but is preventable with proper timing.",
    sources: [
      "Endocrine Practice: Calcium supplements and levothyroxine absorption",
      "Thyroid: Drug interactions with thyroid hormone therapy"
    ]
  },
  {
    supplement: "Magnesium",
    medication: "Fluoroquinolone Antibiotics (Ciprofloxacin, Levofloxacin)",
    severity: "MAJOR",
    interaction: "Magnesium dramatically reduces antibiotic absorption by 90% or more, potentially causing treatment failure and antibiotic resistance.",
    mechanism: "Magnesium cations chelate fluoroquinolones in the gut, forming poorly absorbed complexes. This reduces antibiotic bioavailability to subtherapeutic levels, risking persistent infection and resistance development.",
    symptoms: [
      "Infection symptoms not improving as expected",
      "Fever persisting beyond 48-72 hours of treatment",
      "Worsening of infection symptoms",
      "Need for repeat antibiotic courses"
    ],
    actions: [
      "Take magnesium at least 2 hours before or 6 hours after fluoroquinolone antibiotics",
      "Avoid magnesium-containing antacids during antibiotic therapy",
      "Complete full antibiotic course even if feeling better",
      "Notify doctor if infection symptoms are not improving"
    ],
    severityExplanation: "Treatment failure can lead to severe infections, hospitalization, and contribute to antibiotic resistance - a serious public health concern.",
    sources: [
      "Clinical Infectious Diseases: Quinolone-cation interactions",
      "Antimicrobial Agents and Chemotherapy: Metal cation effects on fluoroquinolones"
    ]
  },
  {
    supplement: "Iron",
    medication: "Levothyroxine",
    severity: "MAJOR",
    interaction: "Iron substantially decreases levothyroxine absorption by 40-50%, necessitating increased thyroid medication dosing or causing hypothyroid symptoms.",
    mechanism: "Ferrous iron forms chelation complexes with levothyroxine in the stomach and small intestine, significantly reducing thyroid hormone bioavailability through the formation of insoluble iron-levothyroxine complexes.",
    symptoms: [
      "Fatigue and low energy despite taking thyroid medication",
      "Cold hands and feet",
      "Constipation worsening",
      "TSH levels rising above target range"
    ],
    actions: [
      "Separate iron and levothyroxine by at least 4 hours",
      "Take levothyroxine on empty stomach in morning",
      "Take iron supplements in the evening with vitamin C",
      "Recheck thyroid function 6-8 weeks after starting or stopping iron"
    ],
    severityExplanation: "Uncontrolled hypothyroidism affects metabolism, energy, mood, and cardiovascular health, but proper timing prevents this interaction entirely.",
    sources: [
      "Thyroid: Iron supplementation and levothyroxine absorption",
      "Journal of Clinical Endocrinology & Metabolism: Ferrous sulfate interaction"
    ]
  },
  {
    supplement: "St. John's Wort",
    medication: "SSRI Antidepressants (Prozac, Zoloft, Lexapro)",
    severity: "MAJOR",
    interaction: "Combining St. John's Wort with SSRIs can cause serotonin syndrome - a potentially life-threatening condition with rapid onset.",
    mechanism: "Both St. John's Wort and SSRIs increase serotonin levels in the brain. Combined, they cause excessive serotonergic activity, overwhelming the nervous system's ability to regulate this critical neurotransmitter.",
    symptoms: [
      "Agitation, restlessness, or confusion",
      "Rapid heart rate and high blood pressure",
      "Dilated pupils and excessive sweating",
      "Muscle rigidity or tremors",
      "High fever and altered mental status"
    ],
    actions: [
      "Never combine these medications without medical supervision",
      "If taking both, seek emergency care if symptoms develop",
      "Allow 2-week washout period when switching between them",
      "Inform all healthcare providers about supplement use"
    ],
    severityExplanation: "Serotonin syndrome requires emergency medical treatment and can progress to life-threatening complications including seizures and death if untreated.",
    sources: [
      "New England Journal of Medicine: Serotonin syndrome case reports",
      "Clinical Pharmacology & Therapeutics: St. John's Wort drug interactions"
    ]
  },
  {
    supplement: "Vitamin E (High-Dose >400 IU)",
    medication: "Blood Thinners (Warfarin, Antiplatelet Drugs)",
    severity: "MAJOR",
    interaction: "High-dose vitamin E has anticoagulant properties that amplify blood thinner effects, increasing bleeding risk substantially.",
    mechanism: "Vitamin E inhibits platelet aggregation and interferes with vitamin K-dependent clotting factor synthesis at high doses. This creates synergistic anticoagulation when combined with prescription blood thinners.",
    symptoms: [
      "Bruising easily from minor contact",
      "Red or brown urine indicating blood",
      "Bleeding gums during routine dental care",
      "Excessive menstrual bleeding in women",
      "Petechiae (small red dots under skin)"
    ],
    actions: [
      "Limit vitamin E to 400 IU daily or less if taking blood thinners",
      "Discontinue high-dose vitamin E 2 weeks before surgery",
      "Report unusual bleeding patterns to healthcare provider",
      "Read multivitamin labels as vitamin E is commonly included"
    ],
    severityExplanation: "While lower doses are generally safe, high-dose vitamin E can cause clinically significant bleeding requiring medical management.",
    sources: [
      "Journal of the American Medical Association: Vitamin E and bleeding risk",
      "American Journal of Clinical Nutrition: Vitamin E anticoagulant effects"
    ]
  },
  {
    supplement: "Garlic Supplements (Concentrated)",
    medication: "Anticoagulants",
    severity: "MAJOR",
    interaction: "Concentrated garlic supplements have antiplatelet effects that increase bleeding risk when combined with anticoagulants.",
    mechanism: "Garlic contains allicin and other organosulfur compounds that inhibit platelet aggregation through multiple pathways including thromboxane synthesis inhibition. High-dose supplements provide concentrations not achievable through diet.",
    symptoms: [
      "Spontaneous bruising without known trauma",
      "Prolonged bleeding after dental procedures",
      "Nosebleeds occurring more frequently",
      "Blood blisters in mouth or on skin"
    ],
    actions: [
      "Limit garlic to culinary amounts when taking anticoagulants",
      "Avoid concentrated garlic supplements and aged garlic extract",
      "Stop garlic supplements 7-10 days before surgery",
      "Notify surgeon about garlic supplement use during pre-op assessment"
    ],
    severityExplanation: "The bleeding risk is dose-dependent, with concentrated supplements posing significantly more risk than food sources of garlic.",
    sources: [
      "Journal of Nutrition: Antiplatelet effects of garlic",
      "Pharmacotherapy: Garlic supplement bleeding complications"
    ]
  },
  {
    supplement: "CoQ10 (High-Dose)",
    medication: "Chemotherapy (Anthracyclines, Taxanes)",
    severity: "MAJOR",
    interaction: "High-dose antioxidants like CoQ10 may reduce chemotherapy effectiveness by protecting cancer cells from oxidative damage.",
    mechanism: "Many chemotherapy drugs work by generating reactive oxygen species that kill rapidly dividing cancer cells. High-dose antioxidants may neutralize this oxidative stress, potentially protecting cancer cells from treatment.",
    symptoms: [
      "Tumor markers not decreasing as expected",
      "Disease progression despite chemotherapy",
      "Reduced treatment response on imaging studies",
      "Need for altered treatment protocols"
    ],
    actions: [
      "Discuss all supplements with oncologist before starting chemotherapy",
      "If approved, use only moderate doses (<200mg CoQ10 daily)",
      "Avoid starting new supplements during active cancer treatment",
      "Time supplement use away from chemotherapy administration if permitted"
    ],
    severityExplanation: "Cancer treatment efficacy is paramount - even potential interference with chemotherapy effectiveness is unacceptable and could be life-threatening.",
    sources: [
      "Journal of Clinical Oncology: Antioxidants during chemotherapy",
      "Cancer Treatment Reviews: Supplement use during cancer therapy"
    ]
  },
  {
    supplement: "Cranberry (Concentrated)",
    medication: "Warfarin",
    severity: "MAJOR",
    interaction: "Concentrated cranberry products may enhance warfarin effects, causing excessive anticoagulation and bleeding risk.",
    mechanism: "Cranberry contains compounds that inhibit CYP2C9, the primary enzyme responsible for warfarin metabolism. This reduces warfarin clearance, increasing blood levels and anticoagulant effect beyond therapeutic range.",
    symptoms: [
      "INR values rising above therapeutic range",
      "Unusual bruising or bleeding",
      "Blood in stool or urine",
      "Prolonged bleeding from minor injuries"
    ],
    actions: [
      "Limit cranberry to occasional dietary amounts only",
      "Avoid cranberry supplements, juice concentrates, and extracts",
      "Have INR checked within 1 week if starting cranberry products",
      "Choose alternative urinary tract infection prevention methods"
    ],
    severityExplanation: "Multiple case reports document serious bleeding events from cranberry-warfarin interactions, including fatal hemorrhages.",
    sources: [
      "British Journal of Clinical Pharmacology: Cranberry-warfarin interaction",
      "Journal of Pharmacy Practice: Cranberry and anticoagulation"
    ]
  },
  {
    supplement: "Licorice Root",
    medication: "Blood Pressure Medications",
    severity: "MAJOR",
    interaction: "Licorice root can dramatically increase blood pressure and reduce antihypertensive medication effectiveness, risking hypertensive crisis.",
    mechanism: "Glycyrrhizin in licorice inhibits 11-beta-hydroxysteroid dehydrogenase, leading to aldosterone-like effects including sodium retention and potassium loss. This directly counteracts blood pressure medications and can cause dangerous hypertension.",
    symptoms: [
      "Blood pressure readings increasing despite medication",
      "Severe headaches or vision changes",
      "Leg swelling and fluid retention",
      "Muscle weakness or irregular heartbeat (from low potassium)",
      "Shortness of breath"
    ],
    actions: [
      "Completely avoid licorice root supplements when taking antihypertensives",
      "Check blood pressure at home regularly if exposed to licorice",
      "Seek emergency care for severe headache or chest pain",
      "Read labels carefully as licorice appears in herbal blends"
    ],
    severityExplanation: "Hypertensive crisis can cause stroke, heart attack, or kidney damage. This interaction can be severe even in previously well-controlled patients.",
    sources: [
      "Hypertension: Licorice-induced pseudohyperaldosteronism",
      "American Journal of Medicine: Licorice and blood pressure"
    ]
  },

  // MODERATE SEVERITY (Final 5)
  {
    supplement: "Calcium",
    medication: "Iron Supplements",
    severity: "MODERATE",
    interaction: "Calcium significantly reduces iron absorption, potentially preventing correction of iron deficiency anemia.",
    mechanism: "Calcium and iron compete for the same intestinal transporters. Calcium's higher affinity for these carriers blocks iron uptake, reducing absorption by up to 50-60%.",
    symptoms: [
      "Continued fatigue despite iron supplementation",
      "Iron levels not improving on blood tests",
      "Persistent anemia symptoms",
      "Need for prolonged iron therapy"
    ],
    actions: [
      "Take iron supplements with vitamin C on an empty stomach",
      "Take calcium supplements at different times than iron (4+ hours apart)",
      "Consider taking iron at bedtime and calcium with meals",
      "Recheck iron levels after 8-12 weeks of separated dosing"
    ],
    severityExplanation: "While not immediately dangerous, inadequate iron absorption can prolong anemia, affecting energy, cognition, and overall health.",
    sources: [
      "American Journal of Clinical Nutrition: Calcium-iron interaction studies",
      "European Journal of Clinical Nutrition: Inhibition of iron absorption"
    ]
  },
  {
    supplement: "Green Tea Extract (High-Dose)",
    medication: "Beta Blockers (Propranolol, Metoprolol)",
    severity: "MODERATE",
    interaction: "High-caffeine green tea extract can counteract beta blocker effects on heart rate and blood pressure.",
    mechanism: "Caffeine from concentrated green tea extract causes catecholamine release and direct cardiovascular stimulation, opposing the heart rate and blood pressure lowering effects of beta blockers.",
    symptoms: [
      "Heart rate remaining elevated despite medication",
      "Palpitations or irregular heartbeat sensation",
      "Blood pressure not adequately controlled",
      "Anxiety or jitteriness",
      "Difficulty sleeping"
    ],
    actions: [
      "Limit green tea extract to decaffeinated versions",
      "Avoid high-dose EGCG supplements if taking beta blockers",
      "Monitor heart rate and blood pressure at home",
      "Consider alternative antioxidant supplements without caffeine"
    ],
    severityExplanation: "This interaction can reduce cardiovascular medication effectiveness, but is generally manageable with dose adjustment or supplement modification.",
    sources: [
      "Journal of Hypertension: Caffeine and blood pressure medications",
      "Clinical Pharmacology: Green tea extract cardiovascular effects"
    ]
  },
  {
    supplement: "Melatonin",
    medication: "Sedatives (Benzodiazepines, Z-drugs)",
    severity: "MODERATE",
    interaction: "Combined sedative effects can cause excessive drowsiness, impaired coordination, and increased fall risk, especially in elderly.",
    mechanism: "Melatonin and prescription sedatives act on different brain receptors but produce additive central nervous system depression. Combined effects can be stronger than expected from either alone.",
    symptoms: [
      "Excessive daytime drowsiness and fatigue",
      "Impaired coordination or balance problems",
      "Confusion or disorientation upon waking",
      "Difficulty performing normal daily activities",
      "Increased fall risk"
    ],
    actions: [
      "Use only one sleep aid at a time",
      "If combining under medical supervision, start with lowest doses",
      "Avoid driving or operating machinery until effects are known",
      "Be especially cautious if elderly or taking multiple medications"
    ],
    severityExplanation: "While not typically life-threatening, falls and accidents from excessive sedation can cause serious injuries, particularly in older adults.",
    sources: [
      "Journal of Clinical Sleep Medicine: Melatonin safety and interactions",
      "Sleep Medicine Reviews: Combination sleep therapy risks"
    ]
  },
  {
    supplement: "Valerian Root",
    medication: "Anxiety Medications (Benzodiazepines)",
    severity: "MODERATE",
    interaction: "Both affect GABA receptors, potentially causing excessive sedation, cognitive impairment, and prolonged medication effects.",
    mechanism: "Valerian modulates GABA-A receptors, the same target as benzodiazepines. Combined use may create synergistic effects that enhance sedation beyond therapeutic levels.",
    symptoms: [
      "Unusual drowsiness or inability to stay awake",
      "Slowed thinking or mental fog",
      "Difficulty with memory or concentration",
      "Unsteady gait or coordination problems",
      "Prolonged medication effects"
    ],
    actions: [
      "Do not combine without explicit physician approval",
      "Choose one approach to anxiety management",
      "If switching from benzodiazepines to valerian, do so under medical supervision",
      "Allow appropriate washout period between medications"
    ],
    severityExplanation: "Excessive GABA activity can cause problematic sedation and cognitive impairment, but is rarely life-threatening with appropriate precautions.",
    sources: [
      "Pharmacotherapy: Valerian and benzodiazepine interactions",
      "Phytomedicine: GABA-ergic effects of valerian"
    ]
  },
  {
    supplement: "Zinc",
    medication: "Antibiotics (Tetracyclines, Quinolones)",
    severity: "MODERATE",
    interaction: "Zinc forms chelation complexes with certain antibiotics, significantly reducing absorption and potentially causing treatment failure.",
    mechanism: "Zinc cations bind to antibiotic molecules in the gastrointestinal tract, creating insoluble complexes that cannot be absorbed. This reduces antibiotic bioavailability below therapeutic levels.",
    symptoms: [
      "Infection symptoms persisting beyond expected treatment period",
      "Incomplete resolution of bacterial infection",
      "Fever continuing past 48-72 hours of antibiotic use",
      "Need for second antibiotic course"
    ],
    actions: [
      "Take zinc supplements at least 2 hours before or 4-6 hours after antibiotics",
      "Avoid zinc-containing multivitamins during antibiotic therapy",
      "Take antibiotics on an empty stomach when possible",
      "Complete full antibiotic course regardless of symptom improvement"
    ],
    severityExplanation: "Antibiotic treatment failure can prolong illness and contribute to resistance, but proper timing prevents this interaction entirely.",
    sources: [
      "Journal of Antimicrobial Chemotherapy: Metal cation interactions",
      "Clinical Pharmacokinetics: Antibiotic chelation by minerals"
    ]
  }
];

// Helper function to wrap text
function wrapText(text, font, fontSize, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);

    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

// Helper function to draw header on each page
function drawHeader(page, pageWidth, helveticaBold, pageNumber, totalPages) {
  const purple = rgb(0.37, 0.17, 0.49);

  // Draw purple header bar
  page.drawRectangle({
    x: 0,
    y: page.getHeight() - 50,
    width: pageWidth,
    height: 50,
    color: purple,
  });

  // Draw logo text
  page.drawText('Supplement Safety Bible', {
    x: 50,
    y: page.getHeight() - 32,
    size: 16,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  // Draw page number
  if (pageNumber > 1) {
    page.drawText(`Page ${pageNumber} of ${totalPages}`, {
      x: pageWidth - 120,
      y: page.getHeight() - 32,
      size: 10,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });
  }
}

// Helper function to draw footer
function drawFooter(page, pageWidth, helveticaFont) {
  const purple = rgb(0.37, 0.17, 0.49);

  page.drawText('supplementsafetybible.com', {
    x: pageWidth / 2 - 80,
    y: 30,
    size: 10,
    font: helveticaFont,
    color: purple,
  });
}

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595.28; // A4 width
  const pageHeight = 841.89; // A4 height
  const margin = 50;
  const contentWidth = pageWidth - (2 * margin);

  const purple = rgb(0.37, 0.17, 0.49);
  const purpleLight = rgb(0.54, 0.30, 0.62);
  const gray = rgb(0.3, 0.3, 0.3);
  const darkGray = rgb(0.1, 0.1, 0.1);

  // Calculate total pages
  const totalPages = 3 + INTERACTIONS.length + 1; // Cover + TOC + About + 20 interactions + Final

  // ===== COVER PAGE =====
  let page = pdfDoc.addPage([pageWidth, pageHeight]);

  // Purple gradient background (simulated with rectangles)
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: purple,
  });

  page.drawRectangle({
    x: 0,
    y: pageHeight / 2,
    width: pageWidth,
    height: pageHeight / 2,
    color: purpleLight,
    opacity: 0.7,
  });

  // Title
  let y = pageHeight - 150;
  page.drawText('Top 20 Dangerous', {
    x: margin,
    y: y,
    size: 36,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 45;
  page.drawText('Supplement-Medication', {
    x: margin,
    y: y,
    size: 36,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 45;
  page.drawText('Interactions', {
    x: margin,
    y: y,
    size: 36,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 60;
  page.drawText('A Free Guide from 20 Years of', {
    x: margin,
    y: y,
    size: 16,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  y -= 25;
  page.drawText('NSF GMP Manufacturing Experience', {
    x: margin,
    y: y,
    size: 16,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  // Warning symbol (triangle)
  y -= 80;
  const centerX = pageWidth / 2;
  page.drawCircle({
    x: centerX,
    y: y + 20,
    size: 40,
    color: rgb(1, 0.8, 0),
    borderWidth: 4,
    borderColor: rgb(1, 0.8, 0),
  });
  page.drawText('!', {
    x: centerX - 8,
    y: y + 8,
    size: 50,
    font: helveticaBold,
    color: rgb(1, 0.8, 0),
  });

  // Bottom section
  y = 200;
  page.drawText('Author:', {
    x: margin,
    y: y,
    size: 12,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 20;
  page.drawText('Stefan Stroh, Plant Manager', {
    x: margin,
    y: y,
    size: 12,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  y -= 18;
  page.drawText('NSF GMP Certified Facility', {
    x: margin,
    y: y,
    size: 12,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  y -= 40;
  page.drawText('supplementsafetybible.com', {
    x: margin,
    y: y,
    size: 14,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 22;
  page.drawText('info@supplementsafetybible.com', {
    x: margin,
    y: y,
    size: 12,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  // ===== TABLE OF CONTENTS =====
  page = pdfDoc.addPage([pageWidth, pageHeight]);
  drawHeader(page, pageWidth, helveticaBold, 2, totalPages);
  drawFooter(page, pageWidth, helveticaFont);

  y = pageHeight - 100;
  page.drawText('TABLE OF CONTENTS', {
    x: margin,
    y: y,
    size: 24,
    font: helveticaBold,
    color: purple,
  });

  y -= 50;

  // Critical section
  page.drawText('CRITICAL SEVERITY', {
    x: margin,
    y: y,
    size: 14,
    font: helveticaBold,
    color: rgb(0.8, 0, 0),
  });
  y -= 25;

  for (let i = 0; i < 5; i++) {
    const interaction = INTERACTIONS[i];
    const pageNum = 4 + i;
    page.drawText(`${i + 1}. ${interaction.supplement} + ${interaction.medication}`, {
      x: margin + 10,
      y: y,
      size: 11,
      font: helveticaFont,
      color: darkGray,
    });
    page.drawText(`${pageNum}`, {
      x: pageWidth - margin - 30,
      y: y,
      size: 11,
      font: helveticaFont,
      color: gray,
    });
    y -= 20;
  }

  y -= 15;
  page.drawText('MAJOR SEVERITY', {
    x: margin,
    y: y,
    size: 14,
    font: helveticaBold,
    color: rgb(1, 0.5, 0),
  });
  y -= 25;

  for (let i = 5; i < 15; i++) {
    if (y < 150) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      drawHeader(page, pageWidth, helveticaBold, 3, totalPages);
      drawFooter(page, pageWidth, helveticaFont);
      y = pageHeight - 100;
    }
    const interaction = INTERACTIONS[i];
    const pageNum = 4 + i;
    page.drawText(`${i + 1}. ${interaction.supplement} + ${interaction.medication}`, {
      x: margin + 10,
      y: y,
      size: 11,
      font: helveticaFont,
      color: darkGray,
    });
    page.drawText(`${pageNum}`, {
      x: pageWidth - margin - 30,
      y: y,
      size: 11,
      font: helveticaFont,
      color: gray,
    });
    y -= 20;
  }

  y -= 15;
  page.drawText('MODERATE SEVERITY', {
    x: margin,
    y: y,
    size: 14,
    font: helveticaBold,
    color: rgb(0.8, 0.6, 0),
  });
  y -= 25;

  for (let i = 15; i < 20; i++) {
    const interaction = INTERACTIONS[i];
    const pageNum = 4 + i;
    page.drawText(`${i + 1}. ${interaction.supplement} + ${interaction.medication}`, {
      x: margin + 10,
      y: y,
      size: 11,
      font: helveticaFont,
      color: darkGray,
    });
    page.drawText(`${pageNum}`, {
      x: pageWidth - margin - 30,
      y: y,
      size: 11,
      font: helveticaFont,
      color: gray,
    });
    y -= 20;
  }

  // ===== ABOUT PAGE =====
  page = pdfDoc.addPage([pageWidth, pageHeight]);
  drawHeader(page, pageWidth, helveticaBold, 3, totalPages);
  drawFooter(page, pageWidth, helveticaFont);

  y = pageHeight - 100;
  page.drawText('ABOUT THIS GUIDE', {
    x: margin,
    y: y,
    size: 24,
    font: helveticaBold,
    color: purple,
  });

  y -= 40;
  const aboutText = [
    "This comprehensive guide identifies the most dangerous supplement-medication interactions",
    "based on 20 years of NSF GMP manufacturing experience and current clinical research.",
    "",
    "Supplements are not always safe to combine with prescription medications. Even 'natural'",
    "products can cause serious - sometimes life-threatening - interactions when mixed with",
    "certain drugs.",
    "",
    "Each interaction in this guide includes:",
    "  • Clear explanation of what happens in your body",
    "  • Specific symptoms to watch for",
    "  • Actionable steps to stay safe",
    "  • Scientific research sources",
    "",
    "IMPORTANT MEDICAL DISCLAIMER",
    "",
    "This guide is for educational purposes only and does not constitute medical advice.",
    "Always consult your healthcare provider, pharmacist, or qualified medical professional",
    "before:",
    "  • Starting any new supplement",
    "  • Stopping any medication",
    "  • Combining supplements with prescription drugs",
    "  • Making any changes to your treatment plan",
    "",
    "If you experience any concerning symptoms, seek immediate medical attention.",
    "",
    "Stefan Stroh",
    "Plant Manager, NSF GMP Certified Facility",
    "20+ Years Supplement Manufacturing Experience"
  ];

  for (const line of aboutText) {
    if (y < 100) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      drawHeader(page, pageWidth, helveticaBold, 3, totalPages);
      drawFooter(page, pageWidth, helveticaFont);
      y = pageHeight - 100;
    }

    const font = line.includes('IMPORTANT') || line.includes('Stefan Stroh') || line.includes('Plant Manager')
      ? helveticaBold : helveticaFont;
    const color = line.includes('IMPORTANT') ? rgb(0.8, 0, 0) : darkGray;
    const size = line === '' ? 11 : 11;

    page.drawText(line, {
      x: margin,
      y: y,
      size: size,
      font: font,
      color: color,
    });
    y -= line === '' ? 10 : 18;
  }

  // ===== INTERACTION PAGES =====
  for (let i = 0; i < INTERACTIONS.length; i++) {
    const interaction = INTERACTIONS[i];
    const pageNum = 4 + i;

    page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawHeader(page, pageWidth, helveticaBold, pageNum, totalPages);
    drawFooter(page, pageWidth, helveticaFont);

    y = pageHeight - 100;

    // Interaction title
    const titleLines = wrapText(`${interaction.supplement} + ${interaction.medication}`, helveticaBold, 20, contentWidth);
    for (const line of titleLines) {
      page.drawText(line, {
        x: margin,
        y: y,
        size: 20,
        font: helveticaBold,
        color: darkGray,
      });
      y -= 25;
    }

    // Severity badge
    const severityColor = interaction.severity === 'CRITICAL' ? rgb(0.8, 0, 0) :
                         interaction.severity === 'MAJOR' ? rgb(1, 0.5, 0) :
                         rgb(0.8, 0.6, 0);

    page.drawRectangle({
      x: margin,
      y: y - 5,
      width: 90,
      height: 20,
      color: severityColor,
    });

    page.drawText(`${interaction.severity}`, {
      x: margin + 5,
      y: y,
      size: 11,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });

    y -= 40;

    // Draw horizontal line
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: pageWidth - margin, y: y },
      thickness: 1,
      color: gray,
      opacity: 0.3,
    });

    y -= 25;

    // THE INTERACTION
    page.drawText('THE INTERACTION:', {
      x: margin,
      y: y,
      size: 12,
      font: helveticaBold,
      color: purple,
    });
    y -= 20;

    const interactionLines = wrapText(interaction.interaction, helveticaFont, 11, contentWidth);
    for (const line of interactionLines) {
      page.drawText(line, {
        x: margin,
        y: y,
        size: 11,
        font: helveticaFont,
        color: darkGray,
      });
      y -= 16;
    }

    y -= 15;

    // MECHANISM
    page.drawText('MECHANISM:', {
      x: margin,
      y: y,
      size: 12,
      font: helveticaBold,
      color: purple,
    });
    y -= 20;

    const mechanismLines = wrapText(interaction.mechanism, helveticaFont, 10, contentWidth);
    for (const line of mechanismLines) {
      if (y < 120) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        drawHeader(page, pageWidth, helveticaBold, pageNum, totalPages);
        drawFooter(page, pageWidth, helveticaFont);
        y = pageHeight - 100;
      }
      page.drawText(line, {
        x: margin,
        y: y,
        size: 10,
        font: helveticaFont,
        color: gray,
      });
      y -= 15;
    }

    y -= 15;

    // SYMPTOMS TO WATCH FOR
    page.drawText('SYMPTOMS TO WATCH FOR:', {
      x: margin,
      y: y,
      size: 12,
      font: helveticaBold,
      color: purple,
    });
    y -= 20;

    for (const symptom of interaction.symptoms) {
      if (y < 120) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        drawHeader(page, pageWidth, helveticaBold, pageNum, totalPages);
        drawFooter(page, pageWidth, helveticaFont);
        y = pageHeight - 100;
      }
      const symptomLines = wrapText(`• ${symptom}`, helveticaFont, 10, contentWidth - 20);
      for (const line of symptomLines) {
        page.drawText(line, {
          x: margin + 10,
          y: y,
          size: 10,
          font: helveticaFont,
          color: darkGray,
        });
        y -= 15;
      }
    }

    y -= 15;

    // WHAT TO DO
    if (y < 150) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      drawHeader(page, pageWidth, helveticaBold, pageNum, totalPages);
      drawFooter(page, pageWidth, helveticaFont);
      y = pageHeight - 100;
    }

    page.drawText('WHAT TO DO:', {
      x: margin,
      y: y,
      size: 12,
      font: helveticaBold,
      color: purple,
    });
    y -= 20;

    for (let j = 0; j < interaction.actions.length; j++) {
      if (y < 120) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        drawHeader(page, pageWidth, helveticaBold, pageNum, totalPages);
        drawFooter(page, pageWidth, helveticaFont);
        y = pageHeight - 100;
      }
      const actionLines = wrapText(`${j + 1}. ${interaction.actions[j]}`, helveticaFont, 10, contentWidth - 20);
      for (const line of actionLines) {
        page.drawText(line, {
          x: margin + 10,
          y: y,
          size: 10,
          font: helveticaFont,
          color: darkGray,
        });
        y -= 15;
      }
    }

    y -= 15;

    // SEVERITY LEVEL
    if (y < 120) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      drawHeader(page, pageWidth, helveticaBold, pageNum, totalPages);
      drawFooter(page, pageWidth, helveticaFont);
      y = pageHeight - 100;
    }

    page.drawText('SEVERITY LEVEL:', {
      x: margin,
      y: y,
      size: 12,
      font: helveticaBold,
      color: purple,
    });
    y -= 20;

    const severityLines = wrapText(interaction.severityExplanation, helveticaFont, 10, contentWidth);
    for (const line of severityLines) {
      if (y < 120) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        drawHeader(page, pageWidth, helveticaBold, pageNum, totalPages);
        drawFooter(page, pageWidth, helveticaFont);
        y = pageHeight - 100;
      }
      page.drawText(line, {
        x: margin,
        y: y,
        size: 10,
        font: helveticaFont,
        color: gray,
      });
      y -= 15;
    }

    y -= 15;

    // RESEARCH SOURCES
    if (y < 120) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      drawHeader(page, pageWidth, helveticaBold, pageNum, totalPages);
      drawFooter(page, pageWidth, helveticaFont);
      y = pageHeight - 100;
    }

    page.drawText('RESEARCH SOURCES:', {
      x: margin,
      y: y,
      size: 12,
      font: helveticaBold,
      color: purple,
    });
    y -= 20;

    for (const source of interaction.sources) {
      if (y < 120) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        drawHeader(page, pageWidth, helveticaBold, pageNum, totalPages);
        drawFooter(page, pageWidth, helveticaFont);
        y = pageHeight - 100;
      }
      const sourceLines = wrapText(`• ${source}`, helveticaFont, 9, contentWidth - 20);
      for (const line of sourceLines) {
        page.drawText(line, {
          x: margin + 10,
          y: y,
          size: 9,
          font: helveticaFont,
          color: gray,
        });
        y -= 14;
      }
    }
  }

  // ===== FINAL PAGE =====
  page = pdfDoc.addPage([pageWidth, pageHeight]);

  // Purple background
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: purple,
  });

  y = pageHeight - 150;

  page.drawText('Want to Check More Interactions?', {
    x: pageWidth / 2 - 180,
    y: y,
    size: 24,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 80;
  page.drawText('Visit Our Free Interaction Checker', {
    x: pageWidth / 2 - 150,
    y: y,
    size: 16,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 30;
  page.drawText('supplementsafetybible.com', {
    x: pageWidth / 2 - 120,
    y: y,
    size: 20,
    font: helveticaBold,
    color: rgb(1, 0.8, 0),
  });

  y -= 60;
  page.drawText('> Check 15,000+ verified interactions instantly', {
    x: margin + 30,
    y: y,
    size: 14,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  y -= 25;
  page.drawText('> Enter your complete supplement & medication list', {
    x: margin + 30,
    y: y,
    size: 14,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  y -= 25;
  page.drawText('> Get personalized safety reports', {
    x: margin + 30,
    y: y,
    size: 14,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  y -= 25;
  page.drawText('> Backed by NSF GMP manufacturing expertise', {
    x: margin + 30,
    y: y,
    size: 14,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  y -= 80;
  page.drawText('Questions? Contact Us:', {
    x: pageWidth / 2 - 100,
    y: y,
    size: 14,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 25;
  page.drawText('info@supplementsafetybible.com', {
    x: pageWidth / 2 - 115,
    y: y,
    size: 14,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  y -= 80;
  page.drawText('Created by:', {
    x: pageWidth / 2 - 50,
    y: y,
    size: 12,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 25;
  page.drawText('Stefan Stroh', {
    x: pageWidth / 2 - 45,
    y: y,
    size: 14,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 20;
  page.drawText('NSF GMP Certified Plant Manager', {
    x: pageWidth / 2 - 105,
    y: y,
    size: 12,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  y -= 18;
  page.drawText('20+ Years Manufacturing Experience', {
    x: pageWidth / 2 - 105,
    y: y,
    size: 12,
    font: helveticaFont,
    color: rgb(1, 1, 1),
  });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '..', 'public', 'guides', 'Top-20-Dangerous-Supplement-Interactions.pdf');

  fs.writeFileSync(outputPath, pdfBytes);
  console.log('✅ Professional PDF guide generated successfully!');
  console.log(`📄 Location: ${outputPath}`);
  console.log(`📊 File size: ${(pdfBytes.length / 1024).toFixed(2)} KB`);
  console.log(`📑 Total pages: ${totalPages}`);
}

generatePDF().catch(err => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
