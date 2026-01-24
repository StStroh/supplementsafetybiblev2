import { Helmet } from 'react-helmet-async';
import { BookOpen, Database, RefreshCw, Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import DisclaimerBlock from '../components/DisclaimerBlock';
import EvidenceLevels from '../components/EvidenceLevels';
import { BRAND_NAME_FULL } from '../lib/brand';

export default function PregnancyHowItWorks() {
  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'How Pregnancy Safety Information Works - Methodology',
    description: 'Learn how we evaluate and categorize supplement safety information for pregnancy. Evidence-based approach to pregnancy supplement safety education.',
    specialty: 'Obstetrics'
  };

  return (
    <>
      <Helmet>
        <title>How Pregnancy Safety Information Works | {BRAND_NAME_FULL}</title>
        <meta
          name="description"
          content="Learn our methodology for evaluating supplement safety during pregnancy. Evidence categories, data sources, and update policy explained. Educational information only."
        />
        <link rel="canonical" href={`${window.location.origin}/pregnancy/how-it-works`} />

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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h1>
            <p className="text-xl text-gray-600">
              Our approach to pregnancy supplement safety information
            </p>
          </div>

          <DisclaimerBlock variant="prominent" className="mb-12" />

          {/* Methodology Overview */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Methodology
            </h2>

            <div className="bg-white rounded-xl p-8 border border-gray-200 mb-8">
              <p className="text-lg text-gray-700 mb-4">
                We compile and organize publicly available information about supplement safety during pregnancy from multiple evidence sources. Our goal is to help you understand what is known (and what isn't) so you can have informed discussions with your healthcare provider.
              </p>
              <p className="text-gray-600">
                This is <strong>educational information</strong>, not medical advice. We do not make recommendations or provide clinical guidance. Every pregnancy is unique, and only your healthcare provider can assess what is appropriate for your specific situation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Data Compilation
                </h3>
                <p className="text-gray-600">
                  We gather information from peer-reviewed studies, case reports, pharmacological databases, and traditional use documentation.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Evidence Categorization
                </h3>
                <p className="text-gray-600">
                  Information is organized by evidence type and quality, helping you understand the strength and limitations of available data.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Plain Language
                </h3>
                <p className="text-gray-600">
                  Complex medical and scientific information is presented in accessible language while maintaining accuracy and nuance.
                </p>
              </div>

              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <RefreshCw className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Regular Updates
                </h3>
                <p className="text-gray-600">
                  Our database is continuously reviewed and updated as new research emerges and medical understanding evolves.
                </p>
              </div>
            </div>
          </section>

          {/* Evidence Categories */}
          <section className="mb-16">
            <EvidenceLevels />
          </section>

          {/* Data Sources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Types of Data Sources
            </h2>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Human Clinical Studies
                </h3>
                <p className="text-gray-600 mb-2">
                  Controlled trials, observational studies, and systematic reviews involving pregnant individuals. This is the most directly relevant evidence but is limited for many supplements due to ethical constraints.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Strength:</strong> Directly applicable to humans | <strong>Limitation:</strong> Rare for most supplements
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Case Reports & Series
                </h3>
                <p className="text-gray-600 mb-2">
                  Documentation of individual or small groups of pregnancy outcomes following supplement exposure. Useful for identifying potential signals but cannot establish causation.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Strength:</strong> Real-world data | <strong>Limitation:</strong> Cannot prove cause and effect
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Animal Reproduction Studies
                </h3>
                <p className="text-gray-600 mb-2">
                  Preclinical research using animal models. While informative for mechanism and potential concerns, animal data may not translate directly to humans.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Strength:</strong> Can study controlled exposures | <strong>Limitation:</strong> Species differences
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-l-4 border-amber-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Traditional Use & Expert Opinion
                </h3>
                <p className="text-gray-600 mb-2">
                  Historical patterns of use, traditional medicine practices, and clinical expert consensus. Provides context but has limited scientific validation.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Strength:</strong> Long-term observation | <strong>Limitation:</strong> Anecdotal, not controlled
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-l-4 border-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Pharmacological Properties
                </h3>
                <p className="text-gray-600 mb-2">
                  Understanding of how a substance works in the body, its chemical structure, and relationships to similar compounds. Can suggest theoretical risks or benefits.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Strength:</strong> Mechanistic understanding | <strong>Limitation:</strong> Theory doesn't always predict reality
                </p>
              </div>
            </div>
          </section>

          {/* What We Don't Do */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What We Don't Do
            </h2>

            <div className="bg-amber-50 rounded-xl p-8 border border-amber-200">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center mt-1">
                    <span className="text-amber-700 text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">We don't provide medical advice</strong>
                    <p className="text-gray-600">We present information, but we don't recommend specific supplements or dosages for individual situations.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center mt-1">
                    <span className="text-amber-700 text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">We don't diagnose conditions</strong>
                    <p className="text-gray-600">This tool cannot assess whether you have a deficiency, complication, or contraindication.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center mt-1">
                    <span className="text-amber-700 text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">We don't replace your healthcare provider</strong>
                    <p className="text-gray-600">Your clinician knows your full medical history and can assess risks and benefits specific to you.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center mt-1">
                    <span className="text-amber-700 text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">We don't guarantee completeness</strong>
                    <p className="text-gray-600">Medical knowledge is constantly evolving, and no database can capture every possible consideration.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Update Policy */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Update Policy
            </h2>

            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Continuous Review
                  </h3>
                  <p className="text-gray-600">
                    We monitor new research publications, safety alerts, and updates from regulatory agencies. Major findings are incorporated as they emerge.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Periodic Audits
                  </h3>
                  <p className="text-gray-600">
                    All entries undergo regular review to ensure accuracy, update references, and incorporate new evidence or safety information.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Transparency
                  </h3>
                  <p className="text-gray-600">
                    We acknowledge limitations in available evidence and clearly indicate when data is insufficient, conflicting, or theoretical.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Important:</strong> Despite our best efforts, medical knowledge changes rapidly. No database can be perfectly current. Always verify critical information with your healthcare provider and consider the latest research.
              </p>
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
              href="/pregnancy/disclaimer"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              Full Disclaimer
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
