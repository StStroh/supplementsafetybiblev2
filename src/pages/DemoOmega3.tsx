import { Helmet } from 'react-helmet-async';
import { ExternalLink, AlertTriangle, Info } from 'lucide-react';

export default function DemoOmega3() {
  return (
    <>
      <Helmet>
        <title>Omega-3 Safety Demo | Drug Interaction Checker</title>
        <meta name="description" content="Omega-3 (Fish Oil) interaction demonstration with clinical data and evidence." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Omega-3 Fatty Acids (Fish Oil)
            </h1>
            <p className="text-lg text-gray-600">
              Clinical interaction profile and safety information
            </p>
          </div>

          {/* Ingredient Overview */}
          <section className="mb-10 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Ingredient Overview
            </h2>
            <div className="space-y-3 text-gray-700">
              <div>
                <span className="font-medium">Common Names:</span> Omega-3, Fish Oil, EPA/DHA
              </div>
              <div>
                <span className="font-medium">Type:</span> Dietary Supplement
              </div>
              <div>
                <span className="font-medium">Primary Use:</span> Cardiovascular health, anti-inflammatory support
              </div>
              <div>
                <span className="font-medium">Typical Dosage:</span> 1-3 grams daily (combined EPA and DHA)
              </div>
            </div>
          </section>

          {/* Interaction Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Known Drug Interactions
            </h2>

            {/* Omega-3 × Warfarin Interaction */}
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
              {/* Header */}
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-xl font-medium text-gray-900">
                    Omega-3 × Warfarin
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-amber-100 text-amber-800 border border-amber-300">
                      <AlertTriangle className="w-4 h-4" />
                      Caution
                    </span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-6">
                {/* Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Summary
                  </h4>
                  <p className="text-gray-900">
                    Omega-3 may increase bleeding risk with warfarin.
                  </p>
                </div>

                {/* Mechanism */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Mechanism
                  </h4>
                  <p className="text-gray-700">
                    Antiplatelet effects may enhance anticoagulation.
                  </p>
                </div>

                {/* Clinical Effect */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Clinical Effect
                  </h4>
                  <p className="text-gray-700">
                    Increased bleeding risk at high doses.
                  </p>
                </div>

                {/* Management */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-2">
                    Management
                  </h4>
                  <p className="text-blue-900">
                    Monitor INR. Consider limiting to ≤2g daily.
                  </p>
                </div>

                {/* Evidence Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Evidence Grade
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      Moderate
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Confidence
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      Dose-dependent
                    </div>
                  </div>
                </div>

                {/* Sources */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Clinical Sources
                  </h4>
                  <div className="space-y-2">
                    <a
                      href="https://pubmed.ncbi.nlm.nih.gov/19133408/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">
                        Buckley MS, et al. Fish oil interaction with warfarin. Ann Pharmacother. 2004;38(1):50-52.
                      </span>
                    </a>
                    <a
                      href="https://pubmed.ncbi.nlm.nih.gov/15755199/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">
                        McClaskey EM, Michalets EL. Subdural hematoma after a fall in an elderly patient taking high-dose omega-3 fatty acids with warfarin and aspirin. Pharmacotherapy. 2007;27(1):152-160.
                      </span>
                    </a>
                    <a
                      href="https://pubmed.ncbi.nlm.nih.gov/23509418/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">
                        Nutescu EA, Shapiro NL, Chevalier A, Amin AN. A pharmacologic overview of current and emerging anticoagulants. Cleve Clin J Med. 2005;72 Suppl 1:S2-6.
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Complete Safety Analysis
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Generate a comprehensive PDF report with all Omega-3 interactions, dosing recommendations, and clinical references.
              </p>
              <button
                onClick={() => {
                  window.location.href = '/pricing';
                }}
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
              >
                Download Omega-3 Safety Report (PDF)
              </button>
              <p className="text-sm text-gray-600 mt-4">
                Available with Premium subscription
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="font-semibold">Medical Disclaimer:</strong> This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider before starting, stopping, or modifying any medication or supplement regimen.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
