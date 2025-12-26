import { SafetyPackConfig } from './SafetyPackForm';

export function generateBoxInsertContent(config: SafetyPackConfig): string {
  return `BEFORE YOU MIX SUPPLEMENTS + MEDICATIONS

${config.brandName ? `From ${config.brandName}` : ''}

Some supplements can change how medications work in your body. A quick check can prevent serious problems.

KEY POINTS:

• Supplements can change drug levels by affecting absorption, metabolism, or elimination.

• Blood thinners are high-risk. Some combinations can increase bleeding risk.

• St. John's wort is a common problem because it can reduce the effectiveness of certain prescription medications.

• Before surgery: ask your clinician if you should stop supplements ${config.surgeryWindow} before the procedure.

• Extra caution if you're pregnant/breastfeeding or if the user is a child.

YOUR SAFETY CHECKLIST:

□ Make a list of everything you take (supplements + meds + doses).
□ Share it with your pharmacist or clinician.
□ If you add a new supplement, ask first—especially if you take prescription meds.

RUN A QUICK INTERACTION CHECK:
${config.qrUrl}

This guidance is based on publicly available consumer safety education from the U.S. FDA and other published references.

${config.supportEmail ? `Questions? ${config.supportEmail}` : ''}`;
}

export function generateAmazonShopifyModule(config: SafetyPackConfig): string {
  return `**Medication & Supplement Interactions**

Taking supplements with prescription or OTC medicines can sometimes change how a medication works in the body.

**Use extra caution if you take:**
- Blood thinners (example: warfarin)
- Pregnant/breastfeeding
- Shopping for a child
- Surgery planned in the next few weeks

**Quick safety step:**
Check your supplement + medication stack here: ${config.productUrl}

**Note:** If you take prescription medication, talk with a healthcare professional before adding supplements.`;
}

export function generateWebsiteFAQ(config: SafetyPackConfig): string {
  return `**Frequently Asked Questions**

**Q: Can I take this with my prescription medication?**
A: Use our interaction checker and share the results with your pharmacist or clinician.

**Q: Why can a supplement affect my medication?**
A: Some ingredients can change absorption, metabolism, or elimination—so drug levels may become higher or lower than intended.

**Q: I'm on a blood thinner—what should I do?**
A: Blood thinners are a high-risk category. Check interactions first and speak with a clinician before combining products.

**Q: I have surgery coming up—should I stop supplements?**
A: Many clinicians recommend stopping certain supplements ${config.surgeryWindow} pre-op. Confirm with your care team.

**Q: Is 'natural' always safe?**
A: No. 'Natural' products can still have strong effects and may interact with medications.

Check interactions: ${config.productUrl}`;
}

export function generateSupportTemplates(config: SafetyPackConfig): {
  title: string;
  content: string;
}[] {
  return [
    {
      title: 'Blood thinner / warfarin',
      content: `Thank you for reaching out about using ${config.productName || 'our product'} with warfarin or another blood thinner.

Blood thinners are a high-risk category for supplement interactions because some supplements can increase bleeding risk or change how your body metabolizes the medication.

Before combining any supplement with a blood thinner, we strongly recommend:

1. Run an interaction check: ${config.productUrl}
2. Share the results with your prescribing clinician or pharmacist
3. Do not start, stop, or change doses of any supplement without consulting a healthcare professional

If you're currently taking warfarin, your INR levels need to be monitored closely if you add or remove supplements.

${config.supportEmail ? `If you have additional questions, please reach out to ${config.supportEmail}.` : ''}

Best,
${config.brandName || 'The Team'}`,
    },
    {
      title: 'Pregnant/breastfeeding',
      content: `Thank you for your question about using ${config.productName || 'our product'} during pregnancy or breastfeeding.

We recommend extra caution during pregnancy and lactation because:
- Some supplements can affect hormone levels or fetal development
- Ingredients may pass into breast milk
- Safety data is often limited for this population

Before taking any supplement while pregnant or breastfeeding:

1. Check for interactions: ${config.productUrl}
2. Consult with your OB/GYN or midwife
3. Share the full ingredient list with your healthcare provider

Your healthcare provider can assess your specific situation and help you make the safest choice for you and your baby.

${config.supportEmail ? `Questions? ${config.supportEmail}` : ''}

Best,
${config.brandName || 'The Team'}`,
    },
    {
      title: 'Child',
      content: `Thank you for asking about ${config.productName || 'our product'} for a child.

Children have different metabolic rates and dosing requirements than adults. Before giving any supplement to a child:

1. Check for interactions if the child takes any medications: ${config.productUrl}
2. Consult with the child's pediatrician
3. Verify appropriate dosing for the child's age and weight
4. Review the ingredient list for allergens or contraindications

Supplements marketed for adults may not be appropriate for children, even at reduced doses.

${config.supportEmail ? `For specific questions, contact ${config.supportEmail}.` : ''}

Best,
${config.brandName || 'The Team'}`,
    },
    {
      title: 'Surgery',
      content: `Thank you for asking about ${config.productName || 'our product'} before your upcoming surgery.

Many clinicians recommend stopping certain supplements ${config.surgeryWindow} before a surgical procedure because:
- Some supplements can increase bleeding risk
- Others may interact with anesthesia
- Some can affect blood sugar or blood pressure during surgery

Before your surgery:

1. Make a list of all supplements and medications you take
2. Check for interactions: ${config.productUrl}
3. Share the list with your surgeon and anesthesiologist
4. Ask specifically which supplements to stop and when
5. Get clearance before resuming supplements post-surgery

Your surgical team will give you specific instructions based on your procedure and health status.

${config.supportEmail ? `Questions? ${config.supportEmail}` : ''}

Best,
${config.brandName || 'The Team'}`,
    },
    {
      title: 'Sensitive medication classes',
      content: `Thank you for asking about using ${config.productName || 'our product'} with your medication.

Certain medication classes are particularly sensitive to supplement interactions, including:
- Blood thinners (warfarin, apixaban, etc.)
- Immunosuppressants (after transplant)
- Chemotherapy drugs
- Antidepressants and psychiatric medications
- Thyroid medications
- Diabetes medications

If you take any of these medication types:

1. Run an interaction check: ${config.productUrl}
2. Review results with your prescribing clinician or pharmacist before starting the supplement
3. Monitor for any changes in how you feel or in your lab values
4. Report any unusual symptoms to your healthcare provider

Your safety is our priority. When in doubt, check first.

${config.supportEmail ? `Questions? ${config.supportEmail}` : ''}

Best,
${config.brandName || 'The Team'}`,
    },
  ];
}

export function generateHowToUse(): string {
  return `**How to Use Your FDA-Guided Safety Pack**

This safety pack provides ready-to-use educational content for your customers. Here's how to implement each component:

**1. Box Insert (PDF)**
- Print on standard 8.5" x 11" paper
- Fold to fit in product packaging
- Or include as a single-page insert
- Update QR code to point to your product page

**2. Amazon/Shopify Module**
- Copy the formatted text into your product description
- Add as a dedicated "Safety Information" section
- Place above or near the ingredient list
- Ensure the link is clickable

**3. Website FAQ**
- Add to your product page FAQ section
- Include in your general FAQ or Help Center
- Use as standalone "Safety Information" page
- Format with your site's styling

**4. Support Templates**
- Save in your customer support knowledge base
- Train support team on when to use each template
- Customize the greeting/closing to match your brand voice
- Keep links updated if you change your interaction checker URL

**5. Best Practices**
- Review and update content quarterly
- Ensure all links are functional
- Train staff on how to direct customers to resources
- Monitor customer questions to identify gaps

**Important Notes**
- This content references FDA consumer safety education but does not claim FDA endorsement or approval
- Update brand-specific details (name, email, URLs) in your downloaded files
- Consult with legal counsel if you have specific compliance questions
- Keep records of when and how you distribute this content

**Safe FDA Citation Language**
When referencing the FDA in your own content, use language like:
"We reference publicly available consumer safety education from the U.S. FDA and other published sources to help users identify higher-risk combinations."

Do not use phrases like "FDA-approved," "FDA-endorsed," or display FDA logos or seals.`;
}
