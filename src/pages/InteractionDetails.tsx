import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, AlertTriangle, Download, Pill, Beaker } from 'lucide-react';

interface InteractionDetail {
  id: string;
  supplement_name: string;
  medication_name: string;
  severity: string;
  description: string;
  recommendation: string;
}

const severityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  severe: 'bg-red-100 text-red-800 border-red-200'
};

const severityIcons = {
  low: '✓',
  moderate: '⚠',
  high: '⚠',
  severe: '⛔'
};

export default function InteractionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [interaction, setInteraction] = useState<InteractionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadInteraction();
  }, [id]);

  const loadInteraction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/.netlify/functions/interaction?id=${id}`);
      if (!response.ok) throw new Error('Failed to load interaction');
      const data = await response.json();
      setInteraction(data.interaction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load interaction');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!interaction) return;

    setGenerating(true);
    try {
      const response = await fetch('/.netlify/functions/report_pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interactionId: id })
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `interaction-${interaction.supplement_name}-${interaction.medication_name}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to generate PDF');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading interaction...</p>
        </div>
      </div>
    );
  }

  if (error || !interaction) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Interaction</h2>
          <p className="text-gray-600 mb-6">{error || 'Interaction not found'}</p>
          <button
            onClick={() => navigate('/search')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="ml-1">Back</span>
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Beaker className="w-6 h-6 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-900">
                      {interaction.supplement_name}
                    </span>
                  </div>
                  <span className="text-gray-400">+</span>
                  <div className="flex items-center space-x-2">
                    <Pill className="w-6 h-6 text-green-600" />
                    <span className="text-lg font-semibold text-gray-900">
                      {interaction.medication_name}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2">
                  <span
                    className={`px-4 py-2 rounded-full border text-sm font-semibold ${
                      severityColors[interaction.severity as keyof typeof severityColors] ||
                      severityColors.low
                    }`}
                  >
                    <span className="mr-2">
                      {severityIcons[interaction.severity as keyof typeof severityIcons] || '✓'}
                    </span>
                    {interaction.severity.toUpperCase()} Risk
                  </span>
                </div>
              </div>

              <button
                onClick={downloadPDF}
                disabled={generating}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                <Download className="w-4 h-4" />
                <span>{generating ? 'Generating...' : 'Download PDF'}</span>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                  Interaction Description
                </h3>
                <p className="text-gray-700 leading-relaxed">{interaction.description}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Recommendation
                </h3>
                <p className="text-gray-700 leading-relaxed">{interaction.recommendation}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Important Notice</h4>
                <p className="text-sm text-gray-700">
                  This information is for educational purposes only and should not replace professional
                  medical advice. Always consult your healthcare provider before making changes to your
                  medication or supplement regimen.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/search')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Search for more interactions
          </button>
        </div>
      </main>
    </div>
  );
}
