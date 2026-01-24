import { Helmet } from 'react-helmet-async';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { BRAND_NAME_FULL } from '../lib/brand';

export default function PregnancyDisclaimer() {
  return (
    <>
      <Helmet>
        <title>Pregnancy Safety Information Disclaimer | {BRAND_NAME_FULL}</title>
        <meta
          name="description"
          content="Full disclaimer for pregnancy supplement safety information. Educational content only - not medical advice. Read before using pregnancy safety resources."
        />
        <link rel="canonical" href={`${window.location.origin}/pregnancy/disclaimer`} />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Back Navigation */}
          <a
            href="/pregnancy"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pregnancy Guide
          </a>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Medical Disclaimer
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Pregnancy Supplement Safety Information
            </p>
          </div>

          {/* Main Disclaimer */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              Read This Before Using Our Pregnancy Safety Resources
            </h2>
            <p className="text-lg text-amber-800">
              This information is for <strong>educational purposes only</strong> and does not constitute medical advice, diagnosis, or treatment. Pregnancy is a complex medical state that requires individualized professional guidance.
            </p>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-12">
            {/* Not Medical Advice */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Not Medical Advice
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  The information provided through {BRAND_NAME_FULL}'s pregnancy safety resources, including but not limited to the pregnancy advisor tool, pregnancy safety checker, educational articles, and evidence summaries, is for informational and educational purposes only.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>This information does not constitute:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Medical advice, diagnosis, or treatment</li>
                  <li>Recommendations for or against specific supplements</li>
                  <li>Guidance on appropriate dosages or timing</li>
                  <li>Assessment of your individual risk factors</li>
                  <li>Evaluation of your specific health circumstances</li>
                  <li>A substitute for professional medical consultation</li>
                </ul>
                <p className="text-gray-700">
                  Only a qualified healthcare provider who knows your complete medical history, current health status, medications, and pregnancy complications can provide personalized medical advice.
                </p>
              </div>
            </section>

            {/* Individual Variation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Individual Variation in Pregnancy
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Every pregnancy is unique. Factors that affect what may be appropriate include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Your personal medical history and current health conditions</li>
                  <li>Medications you are currently taking</li>
                  <li>Pregnancy complications or risk factors</li>
                  <li>Trimester and stage of pregnancy</li>
                  <li>Previous pregnancy outcomes</li>
                  <li>Genetic factors and family history</li>
                  <li>Nutritional status and dietary intake</li>
                  <li>Environmental and occupational exposures</li>
                </ul>
                <p className="text-gray-700">
                  What may be safe or beneficial for one pregnant person could be contraindicated or harmful for another. General information cannot account for these individual differences.
                </p>
              </div>
            </section>

            {/* Evidence Limitations */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Limitations of Available Evidence
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  <strong>Ethical constraints mean limited data:</strong> For ethical reasons, pregnant individuals are rarely included in clinical trials. Much of the available evidence comes from:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Case reports and observational studies (cannot prove causation)</li>
                  <li>Animal studies (may not translate to humans)</li>
                  <li>Theoretical extrapolation from mechanism of action</li>
                  <li>Traditional use patterns (anecdotal, not scientifically validated)</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  <strong>Absence of data does not mean safety:</strong> Many supplements have insufficient data in pregnant populations. This does not mean they are safe; it means safety is unknown.
                </p>
                <p className="text-gray-700">
                  <strong>Evolving knowledge:</strong> Medical understanding changes as new research emerges. Information that is current today may be revised tomorrow.
                </p>
              </div>
            </section>

            {/* No Guarantee */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. No Guarantee of Accuracy or Completeness
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  While we make reasonable efforts to provide accurate and up-to-date information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>We cannot guarantee the accuracy, completeness, or currentness of all information</li>
                  <li>Medical knowledge evolves rapidly and databases cannot be perfectly current</li>
                  <li>Information may contain errors, omissions, or outdated content</li>
                  <li>We are not responsible for the consequences of relying on this information</li>
                  <li>No system can capture every possible interaction, contraindication, or consideration</li>
                </ul>
                <p className="text-gray-700">
                  Always verify critical information with your healthcare provider and consider the latest medical literature.
                </p>
              </div>
            </section>

            {/* Consult Healthcare Provider */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Always Consult Your Healthcare Provider
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  <strong>Before taking any supplement during pregnancy or while breastfeeding, you must:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Consult your obstetrician, midwife, or qualified healthcare provider</li>
                  <li>Discuss your complete medical history and current medications</li>
                  <li>Disclose all supplements and over-the-counter products you use</li>
                  <li>Ask about appropriate dosages, timing, and duration</li>
                  <li>Discuss potential risks and benefits specific to your situation</li>
                  <li>Report any adverse effects or concerns immediately</li>
                </ul>
                <p className="text-gray-700">
                  <strong>If you experience any concerning symptoms, seek immediate medical attention.</strong> Do not delay medical care based on information from this website.
                </p>
              </div>
            </section>

            {/* Quality and Regulation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Supplement Quality and Regulation
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Dietary supplements are not regulated by the FDA in the same way as medications. Important considerations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Quality, purity, and potency vary significantly between brands and batches</li>
                  <li>Products may contain contaminants, adulterants, or unlisted ingredients</li>
                  <li>Actual content may not match label claims</li>
                  <li>Manufacturing standards vary widely</li>
                  <li>Some products marketed as "natural" or "herbal" can have powerful effects and risks</li>
                </ul>
                <p className="text-gray-700">
                  Choose supplements from reputable manufacturers with third-party testing when possible. Discuss product selection with your healthcare provider.
                </p>
              </div>
            </section>

            {/* Emergency Situations */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Emergency and Urgent Situations
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  <strong>This website is not for emergency or urgent medical situations.</strong>
                </p>
                <p className="text-gray-700 mb-4">
                  If you are experiencing:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Severe abdominal pain or cramping</li>
                  <li>Heavy bleeding or hemorrhage</li>
                  <li>Signs of preeclampsia (severe headache, vision changes, upper abdominal pain)</li>
                  <li>Decreased fetal movement</li>
                  <li>Symptoms of potential supplement toxicity or adverse reaction</li>
                  <li>Any other emergency symptoms</li>
                </ul>
                <p className="text-gray-700 font-bold">
                  Call 911 or go to the nearest emergency room immediately. Do not delay seeking emergency care to search for information online.
                </p>
              </div>
            </section>

            {/* No Professional Relationship */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. No Professional Relationship Created
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Use of this website, its tools, or its information does not create a healthcare provider-patient relationship, counselor-client relationship, or any other professional relationship.
                </p>
                <p className="text-gray-700">
                  We do not monitor or respond to individual health situations. Any information you provide through the website (such as supplement names entered into screening tools) is not reviewed by healthcare professionals and should not be treated as a consultation.
                </p>
              </div>
            </section>

            {/* Liability Limitation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Limitation of Liability
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  By using this website and its pregnancy safety resources, you acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>You use all information at your own risk</li>
                  <li>{BRAND_NAME_FULL} and its operators, employees, and contractors are not liable for any health outcomes, complications, or adverse events</li>
                  <li>We are not responsible for decisions you make based on information from this site</li>
                  <li>We are not liable for errors, omissions, or outdated information</li>
                  <li>You assume full responsibility for consulting qualified healthcare professionals</li>
                </ul>
              </div>
            </section>

            {/* Geographic Considerations */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Geographic and Cultural Considerations
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Medical practices, regulations, and standards of care vary by country and region. Information presented may not reflect:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Local regulations and legal requirements</li>
                  <li>Regional availability of supplements</li>
                  <li>Local standard of care or clinical guidelines</li>
                  <li>Cultural practices and traditional medicine approaches</li>
                </ul>
                <p className="text-gray-700">
                  Consult healthcare providers familiar with local standards and your cultural context.
                </p>
              </div>
            </section>
          </div>

          {/* Acknowledgment */}
          <div className="mt-12 bg-purple-50 border-2 border-purple-300 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Acknowledgment and Agreement
            </h2>
            <p className="text-purple-800">
              By using the pregnancy safety resources on {BRAND_NAME_FULL}, you acknowledge that you have read, understood, and agree to this disclaimer. You understand that this information is educational only and that you must consult qualified healthcare professionals for medical advice regarding your pregnancy and supplement use.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-8">
            <a
              href="/pregnancy"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Pregnancy Guide
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
