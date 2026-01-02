import { Helmet } from 'react-helmet-async';
import { ExternalLink, AlertCircle, Download } from 'lucide-react';
import { useState } from 'react';
import demoData from '../data/demo/omega3.json';

const severityConfig = {
  avoid: {
    label: 'Avoid',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-300'
  },
  caution: {
    label: 'Caution',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-300'
  },
  monitor: {
    label: 'Monitor',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-300'
  }
};

export default function DemoOmega3() {
  const interaction = demoData.interactions[0];
  const severityStyle = severityConfig[interaction.severity as keyof typeof severityConfig];
  const [showToast, setShowToast] = useState(false);

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <Helmet>
        <title>Omega-3 (Fish Oil) — Demo Safety Review</title>
        <meta name="description" content="Omega-3 (Fish Oil) interaction demonstration with clinical data and evidence." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Omega-3 (Fish Oil) — Demo Safety Review
            </h1>
            <p className="text-lg text-gray-600">
              {demoData.substance}
            </p>
          </div>

          {/* Interaction Card */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden mb-8">
            {/* Card Header */}
            <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-xl font-medium text-gray-900">
                  Interaction with {interaction.with}
                </h2>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${severityStyle.bgColor} ${severityStyle.textColor} border ${severityStyle.borderColor}`}>
                  <AlertCircle className="w-4 h-4" />
                  {severityStyle.label}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="px-6 py-6 space-y-6">
              {/* Summary */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Summary
                </h3>
                <p className="text-gray-900">
                  {interaction.summary_short}
                </p>
              </div>

              {/* Mechanism */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Mechanism
                </h3>
                <p className="text-gray-700">
                  {interaction.mechanism}
                </p>
              </div>

              {/* Clinical Effect */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Clinical Effect
                </h3>
                <p className="text-gray-700">
                  {interaction.clinical_effect}
                </p>
              </div>

              {/* Management */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-2">
                  Management
                </h3>
                <p className="text-blue-900">
                  {interaction.management}
                </p>
              </div>

              {/* Evidence & Confidence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Evidence Grade
                  </div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {interaction.evidence_grade}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Confidence
                  </div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {interaction.confidence}%
                  </div>
                </div>
              </div>

              {/* References */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  References
                </h3>
                <div className="space-y-3">
                  {interaction.citations.map((citation, index) => (
                    <div key={index} className="text-sm">
                      <div className="text-gray-900 mb-1">
                        {citation.title}
                      </div>
                      <div className="text-gray-600 mb-2">
                        <em>{citation.journal}</em>, {citation.year}
                      </div>
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on PubMed
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PDF Download CTA */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Download className="w-5 h-5" />
              Download Omega-3 Safety Report (PDF)
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-gray-100 border border-gray-300 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              Evidence sourced from peer-reviewed clinical literature. This tool supports risk awareness and does not replace medical advice.
            </p>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-5 h-5" />
            <span>PDF download coming soon</span>
          </div>
        )}
      </div>
    </>
  );
}
