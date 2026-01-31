import { Helmet } from 'react-helmet-async';
import { Search, Pill, AlertCircle, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function HowItWorks() {
  return (
    <>
      <Helmet>
        <title>How It Works - Supplement Safety Bible</title>
        <meta name="description" content="Learn how our evidence-based interaction checker analyzes supplement-medication safety using peer-reviewed research and manufacturing expertise." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#5e2b7e] to-[#8b4d9f] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
            <p className="text-xl text-purple-100">
              Evidence-based analysis powered by manufacturing expertise
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 4-Step Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Simple 4-Step Process</h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#5e2b7e] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="w-6 h-6 text-[#5e2b7e]" />
                    <h3 className="text-xl font-bold text-gray-900">Enter Supplement</h3>
                  </div>
                  <p className="text-gray-700">
                    Type the name of any supplement you're taking or considering. Our database covers 1,000+ supplements including vitamins, minerals, herbs, and botanicals.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#5e2b7e] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Pill className="w-6 h-6 text-[#5e2b7e]" />
                    <h3 className="text-xl font-bold text-gray-900">Add Medication</h3>
                  </div>
                  <p className="text-gray-700">
                    Enter any prescription or over-the-counter medication. We cover 150+ common medications across all major drug classes.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#5e2b7e] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-6 h-6 text-[#5e2b7e]" />
                    <h3 className="text-xl font-bold text-gray-900">Get Results</h3>
                  </div>
                  <p className="text-gray-700">
                    Receive instant safety analysis showing potential interactions, severity levels, and specific risks or contraindications.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#5e2b7e] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-6 h-6 text-[#5e2b7e]" />
                    <h3 className="text-xl font-bold text-gray-900">Review Evidence</h3>
                  </div>
                  <p className="text-gray-700">
                    Access detailed explanations with research citations, mechanism of action, and practical recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our 5-Step Verification Process</h2>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#5e2b7e] font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Literature Review</h3>
                    <p className="text-gray-700">
                      Comprehensive search of PubMed, NIH databases, and peer-reviewed medical journals for published research on each interaction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#5e2b7e] font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Manufacturing Insight</h3>
                    <p className="text-gray-700">
                      Apply 20+ years of formulation knowledge to understand bioavailability, absorption rates, and real-world supplement composition.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#5e2b7e] font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Pharmacological Analysis</h3>
                    <p className="text-gray-700">
                      Evaluate CYP450 enzyme interactions, drug absorption mechanisms, and timing considerations based on pharmacokinetics.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#5e2b7e] font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Clinical Validation</h3>
                    <p className="text-gray-700">
                      Cross-reference FDA safety alerts, adverse event reports, and documented clinical cases to confirm real-world risks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#5e2b7e] font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Regular Updates</h3>
                    <p className="text-gray-700">
                      Monthly literature scans, quarterly comprehensive reviews, and immediate updates for urgent safety alerts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Standards */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Standards</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* What We Include */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  What We Include
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Peer-reviewed research</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">FDA-validated safety data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Published clinical cases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Evidence-based pharmacology</span>
                  </li>
                </ul>
              </div>

              {/* What We Exclude */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  What We Exclude
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Anecdotal reports without evidence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Marketing claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Unverified internet claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Theoretical interactions without data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#5e2b7e] to-[#8b4d9f] text-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Check Your Supplements?</h2>
            <p className="text-purple-100 mb-6">
              Free, instant analysis with research-backed results
            </p>
            <a
              href="/"
              className="inline-block bg-white text-[#5e2b7e] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Check Interactions Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
