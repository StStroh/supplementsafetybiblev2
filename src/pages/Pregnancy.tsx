import { Helmet } from 'react-helmet-async';
import { Baby, Shield, BookOpen, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import DisclaimerBlock from '../components/DisclaimerBlock';
import PregnancyPreviewForm from '../components/PregnancyPreviewForm';
import { BRAND_NAME_FULL } from '../lib/brand';

export default function Pregnancy() {
  const faqs = [
    {
      question: 'Is this tool a replacement for medical advice?',
      answer: 'No. This is educational information only. Always consult your obstetrician, midwife, or healthcare provider before taking any supplement during pregnancy or while breastfeeding.'
    },
    {
      question: 'How is pregnancy safety information evaluated?',
      answer: 'We compile information from multiple sources including human studies, case reports, animal data, and traditional use patterns. Evidence is categorized by quality and relevance, but individual circumstances vary greatly.'
    },
    {
      question: 'Can I use this during breastfeeding?',
      answer: 'While some information may be relevant to lactation, this tool focuses primarily on pregnancy. Always consult your healthcare provider about supplement safety while breastfeeding.'
    },
    {
      question: 'What if my supplement shows insufficient data?',
      answer: 'Insufficient data does not mean unsafe, it means limited research exists. This is common with dietary supplements. Your healthcare provider can help assess risks and benefits based on your specific situation.'
    },
    {
      question: 'Are all supplements dangerous during pregnancy?',
      answer: 'No. Many supplements can be appropriate when used correctly under medical supervision. Some, like folic acid and vitamin D, are commonly recommended. The key is professional guidance for your specific needs.'
    },
    {
      question: 'How often is the information updated?',
      answer: 'We continuously review and update our database as new research emerges. However, medical knowledge evolves constantly, which is why professional consultation is essential.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Supplement Safety During Pregnancy: Educational Guide & Checker',
    description: 'Evidence-based educational information about supplement safety during pregnancy. Not medical advice. Always consult your healthcare provider.',
    specialty: 'Obstetrics',
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: 18,
      suggestedMaxAge: 50
    },
    medicalAudience: [{
      '@type': 'MedicalAudience',
      audienceType: 'Patient'
    }],
    disclaimer: 'This information is for educational purposes only and does not constitute medical advice. Pregnancy is a complex medical state. Always consult your healthcare provider before taking any supplement or medication during pregnancy or breastfeeding.'
  };

  return (
    <>
      <Helmet>
        <title>Supplement Safety During Pregnancy: Guide & Checker | {BRAND_NAME_FULL}</title>
        <meta
          name="description"
          content="Evidence-based educational information about supplement safety during pregnancy. Free preview checker and comprehensive pregnancy safety guide. Not medical advice - always consult your healthcare provider."
        />
        <meta name="keywords" content="pregnancy supplements, prenatal vitamins, supplement safety pregnancy, pregnancy nutrition, prenatal supplement safety" />
        <link rel="canonical" href={`${window.location.origin}/pregnancy`} />

        {/* Open Graph */}
        <meta property="og:title" content="Supplement Safety During Pregnancy Guide | Safety Bible" />
        <meta property="og:description" content="Evidence-based pregnancy supplement safety information. Free preview checker available. Educational content only - consult your healthcare provider." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/pregnancy`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Supplement Safety During Pregnancy Guide" />
        <meta name="twitter:description" content="Evidence-based pregnancy supplement safety information. Free preview checker available." />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(medicalWebPageSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Baby className="w-4 h-4" />
              <span>Educational Resource</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Supplements During Pregnancy:<br />
              <span className="text-purple-600">Safety Guide & Checker</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Evidence-based educational information about supplement safety during pregnancy. Understand the research, ask better questions, and have informed discussions with your healthcare provider.
            </p>

            <DisclaimerBlock variant="prominent" className="mb-8" />

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#preview"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                Try Free Preview
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/pregnancy/how-it-works"
                className="bg-white hover:bg-gray-50 text-purple-600 font-semibold py-3 px-8 rounded-lg border-2 border-purple-600 transition-colors inline-flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                How It Works
              </a>
            </div>
          </div>
        </section>

        {/* What This Is Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What Is the Pregnancy Advisor?
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Educational Resource
                </h3>
                <p className="text-gray-600">
                  Curated evidence about supplement safety during pregnancy from human studies, case reports, and traditional use patterns.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Safety Screening Tool
                </h3>
                <p className="text-gray-600">
                  Check for potential interactions and evidence-based safety considerations to discuss with your clinician.
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Discussion Starter
                </h3>
                <p className="text-gray-600">
                  Get organized information to bring to your prenatal appointments for more informed conversations.
                </p>
              </div>
            </div>

            <DisclaimerBlock variant="compact" />
          </div>
        </section>

        {/* Who It's For Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Who Is This For?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  This tool is for you if:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>You're pregnant or planning to conceive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>You want to research supplements before your prenatal appointment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>You're looking for evidence-based educational information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>You want to have informed discussions with your healthcare team</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  This tool is NOT for:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✗</span>
                    <span>Getting medical advice or diagnoses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✗</span>
                    <span>Replacing consultation with your healthcare provider</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✗</span>
                    <span>Making treatment decisions without professional guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✗</span>
                    <span>Emergency or urgent medical situations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Form Section */}
        <section id="preview" className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Try the Free Preview
              </h2>
              <p className="text-lg text-gray-600">
                See a sample of the pregnancy safety information available with Premium access
              </p>
            </div>

            <PregnancyPreviewForm />

            <div className="mt-8 text-center">
              <DisclaimerBlock variant="compact" />
            </div>
          </div>
        </section>

        {/* Key Limitations Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Important Limitations
            </h2>

            <div className="bg-white rounded-xl p-8 border border-gray-200 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Individual Variation</h3>
                  <p className="text-gray-600">
                    Every pregnancy is unique. Factors like your health history, medications, complications, and genetics all affect what may be appropriate for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Evidence Gaps</h3>
                  <p className="text-gray-600">
                    Ethical constraints mean many supplements have limited data in pregnant populations. Absence of data does not mean safe or unsafe.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Trimester Differences</h3>
                  <p className="text-gray-600">
                    Safety may vary by trimester. First trimester is especially critical for development, while third trimester involves different considerations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Dosage Matters</h3>
                  <p className="text-gray-600">
                    Some substances may be safe at low doses but risky at high doses. Others require specific forms or timing. Your provider can guide appropriate use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                >
                  <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-16 px-4 bg-purple-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Resources
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/pregnancy/how-it-works"
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
              >
                <BookOpen className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">How It Works</h3>
                <p className="text-sm text-gray-600">
                  Learn about our methodology and evidence evaluation process
                </p>
              </a>

              <a
                href="/pregnancy/supplement-safety"
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
              >
                <Shield className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Safety Guide</h3>
                <p className="text-sm text-gray-600">
                  General principles for evaluating supplement safety
                </p>
              </a>

              <a
                href="/supplement-drug-interactions"
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
              >
                <AlertTriangle className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Interactions</h3>
                <p className="text-sm text-gray-600">
                  Check supplement-drug interactions for your regimen
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready for Complete Pregnancy Safety Analysis?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Get full evidence summaries, interaction screening, trimester-specific information, and clinical references with Premium access
            </p>
            <a
              href="/premium?source=pregnancy-landing"
              className="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              View Premium Features
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
