import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle, AlertTriangle, HelpCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import DisclaimerBlock from '../components/DisclaimerBlock';
import { BRAND_NAME_FULL } from '../lib/brand';

export default function PregnancySupplementSafety() {
  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'How to Evaluate Supplement Safety During Pregnancy',
    description: 'Learn how to assess supplement safety during pregnancy. Evidence-based framework for discussing supplements with your healthcare provider.',
    specialty: 'Obstetrics'
  };

  return (
    <>
      <Helmet>
        <title>How to Evaluate Supplement Safety During Pregnancy | {BRAND_NAME_FULL}</title>
        <meta
          name="description"
          content="Learn how to evaluate supplement safety during pregnancy. Evidence-based framework for informed discussions with your healthcare provider. Educational guide only."
        />
        <meta name="keywords" content="pregnancy supplement safety, prenatal supplements, supplement evaluation, pregnancy nutrition safety" />
        <link rel="canonical" href={`${window.location.origin}/pregnancy/supplement-safety`} />

        <script type="application/ld+json">
          {JSON.stringify(medicalWebPageSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Evaluating Supplement Safety
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              A framework for discussing supplements with your healthcare provider during pregnancy
            </p>
          </div>

          <DisclaimerBlock variant="prominent" className="mb-12" />

          {/* Introduction */}
          <section className="mb-16">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <p className="text-lg text-gray-700 mb-4">
                Evaluating supplement safety during pregnancy requires balancing potential benefits against possible risks—a decision that must be made with professional medical guidance. This guide provides a framework for understanding factors that healthcare providers consider.
              </p>
              <p className="text-gray-600">
                <strong>Remember:</strong> This is educational information to help you ask better questions and understand your provider's recommendations. It is not a substitute for individualized medical advice.
              </p>
            </div>
          </section>

          {/* Key Questions Framework */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Questions to Discuss With Your Healthcare Provider
            </h2>

            <div className="space-y-4">
              <details className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  1. Do I actually need this supplement?
                </summary>
                <div className="px-6 pb-6 pt-2 text-gray-600 space-y-3">
                  <p>
                    <strong>Why this matters:</strong> Many people take supplements "just in case," but pregnancy changes nutrient requirements and metabolism. What you needed before pregnancy may differ now.
                  </p>
                  <p><strong>Questions to ask:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Do my lab results or symptoms indicate a deficiency?</li>
                    <li>Am I getting adequate amounts from my prenatal vitamin and diet?</li>
                    <li>What are the signs I might benefit from this supplement?</li>
                    <li>Could supplementation cause toxicity or excess?</li>
                  </ul>
                </div>
              </details>

              <details className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  2. What does the evidence say about safety?
                </summary>
                <div className="px-6 pb-6 pt-2 text-gray-600 space-y-3">
                  <p>
                    <strong>Why this matters:</strong> Evidence quality varies dramatically. Some supplements have robust safety data, others have theoretical concerns, and many have insufficient information.
                  </p>
                  <p><strong>Questions to ask:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Is there human data on use during pregnancy?</li>
                    <li>What do animal studies or case reports suggest?</li>
                    <li>Are there known risks or contraindications?</li>
                    <li>What don't we know about this supplement's effects?</li>
                  </ul>
                </div>
              </details>

              <details className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  3. What is the appropriate dose and form?
                </summary>
                <div className="px-6 pb-6 pt-2 text-gray-600 space-y-3">
                  <p>
                    <strong>Why this matters:</strong> Dosage is critical. Some nutrients are safe or beneficial at recommended levels but toxic at high doses. The chemical form also matters—some forms are better absorbed or safer than others.
                  </p>
                  <p><strong>Questions to ask:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>What dose is appropriate for my situation?</li>
                    <li>Which chemical form should I look for?</li>
                    <li>Should I take it with or without food?</li>
                    <li>Are there upper limits I should not exceed?</li>
                  </ul>
                </div>
              </details>

              <details className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  4. Are there interactions with my medications or conditions?
                </summary>
                <div className="px-6 pb-6 pt-2 text-gray-600 space-y-3">
                  <p>
                    <strong>Why this matters:</strong> Supplements can interact with prescription medications, over-the-counter drugs, other supplements, and medical conditions—sometimes in ways that are clinically significant.
                  </p>
                  <p><strong>Questions to ask:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Could this interact with my current medications?</li>
                    <li>Are there contraindications with my health conditions?</li>
                    <li>Should I adjust timing to avoid interactions?</li>
                    <li>Do I need closer monitoring if I take this?</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-3">
                    Learn more: <a href="/supplement-drug-interactions" className="text-purple-600 hover:text-purple-700 underline">Supplement-Drug Interaction Checker</a>
                  </p>
                </div>
              </details>

              <details className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  5. Does trimester matter?
                </summary>
                <div className="px-6 pb-6 pt-2 text-gray-600 space-y-3">
                  <p>
                    <strong>Why this matters:</strong> The first trimester involves critical organ formation. The second and third trimesters involve growth and different physiological states. Some supplements may be safer or more beneficial at specific times.
                  </p>
                  <p><strong>Questions to ask:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Is this safe throughout pregnancy or only certain trimesters?</li>
                    <li>Should I stop taking this at any point?</li>
                    <li>Does timing affect effectiveness or safety?</li>
                  </ul>
                </div>
              </details>

              <details className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  6. How do I choose a quality product?
                </summary>
                <div className="px-6 pb-6 pt-2 text-gray-600 space-y-3">
                  <p>
                    <strong>Why this matters:</strong> Supplements are not regulated like medications. Quality, purity, and potency vary significantly. Contamination and adulteration are real risks.
                  </p>
                  <p><strong>Questions to ask:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Which brands meet quality standards?</li>
                    <li>Should I look for third-party testing (e.g., USP, NSF)?</li>
                    <li>Are there specific products you recommend?</li>
                    <li>What warning signs indicate a poor-quality product?</li>
                  </ul>
                </div>
              </details>
            </div>
          </section>

          {/* Risk-Benefit Framework */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Risk-Benefit Assessment
            </h2>

            <div className="bg-white rounded-xl p-8 border border-gray-200 space-y-6">
              <p className="text-gray-700">
                Healthcare providers weigh potential benefits against possible risks when considering supplement use during pregnancy. This involves:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Potential Benefits
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Correcting documented deficiencies</li>
                    <li>• Supporting optimal fetal development</li>
                    <li>• Preventing pregnancy complications</li>
                    <li>• Managing pregnancy-related symptoms</li>
                    <li>• Supporting maternal health</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-amber-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Potential Risks
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Known or suspected teratogenic effects</li>
                    <li>• Risk of toxicity at high doses</li>
                    <li>• Interactions with medications</li>
                    <li>• Unintended hormonal effects</li>
                    <li>• Contamination or quality concerns</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-blue-900">
                  <strong>The decision is never black and white.</strong> Your healthcare provider considers your specific circumstances, existing health conditions, nutritional status, and the balance of evidence to determine what is appropriate for you.
                </p>
              </div>
            </div>
          </section>

          {/* Red Flags */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Red Flags: When to Exercise Extra Caution
            </h2>

            <div className="bg-amber-50 rounded-xl p-8 border border-amber-200">
              <p className="text-amber-900 mb-6">
                <strong>Discuss these situations with your healthcare provider before taking any supplement:</strong>
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">High-dose or mega-dose formulations</strong>
                    <p className="text-gray-700 text-sm">Doses far exceeding established recommendations can pose risks</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Herbal supplements and botanicals</strong>
                    <p className="text-gray-700 text-sm">Many have insufficient safety data and can have potent effects</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Supplements marketed for weight loss, energy, or "cleansing"</strong>
                    <p className="text-gray-700 text-sm">Often contain stimulants or other ingredients contraindicated in pregnancy</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Products with proprietary blends</strong>
                    <p className="text-gray-700 text-sm">You can't evaluate safety if you don't know exact ingredients and doses</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Supplements with hormonal effects</strong>
                    <p className="text-gray-700 text-sm">Substances affecting hormones can impact pregnancy and fetal development</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">First trimester with insufficient data</strong>
                    <p className="text-gray-700 text-sm">Extra caution during critical organ formation period (weeks 3-12)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Documentation Tips */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Preparing for Your Appointment
            </h2>

            <div className="bg-purple-50 rounded-xl p-8 border border-purple-200">
              <p className="text-purple-900 mb-6 font-semibold">
                Make the most of your prenatal visit by coming prepared:
              </p>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-700 text-sm font-bold">1</span>
                  </div>
                  <p><strong>Bring all supplement bottles</strong> or a complete list with exact product names, brands, doses, and frequency</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-700 text-sm font-bold">2</span>
                  </div>
                  <p><strong>Include all medications</strong> (prescription and over-the-counter) for interaction checking</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-700 text-sm font-bold">3</span>
                  </div>
                  <p><strong>List your reasons</strong> for taking each supplement (symptom, diagnosed deficiency, prevention, etc.)</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-700 text-sm font-bold">4</span>
                  </div>
                  <p><strong>Note any symptoms or concerns</strong> you've experienced while taking supplements</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-700 text-sm font-bold">5</span>
                  </div>
                  <p><strong>Write down your questions</strong> so you don't forget to ask important things</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Tools to Support Your Discussions
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="/pregnancy"
                className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <Shield className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Pregnancy Safety Preview
                </h3>
                <p className="text-gray-600 mb-4">
                  Get a preview of pregnancy safety information to discuss with your provider
                </p>
                <span className="text-purple-600 font-medium inline-flex items-center gap-1">
                  Try free preview
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>

              <a
                href="/supplement-drug-interactions"
                className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <AlertTriangle className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Interaction Checker
                </h3>
                <p className="text-gray-600 mb-4">
                  Screen for potential supplement-drug interactions in your regimen
                </p>
                <span className="text-blue-600 font-medium inline-flex items-center gap-1">
                  Check interactions
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </section>

          {/* Premium CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">
                Get Comprehensive Pregnancy Safety Analysis
              </h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Premium access includes full evidence summaries, interaction screening, trimester-specific information, and clinical references for informed discussions with your healthcare team
              </p>
              <a
                href="/premium?source=pregnancy-safety-guide"
                className="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Learn About Premium
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>

          {/* Bottom Disclaimer */}
          <DisclaimerBlock variant="compact" className="mb-8" />

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 justify-between">
            <a
              href="/pregnancy"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Pregnancy Guide
            </a>
            <a
              href="/pregnancy/how-it-works"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              How It Works
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
