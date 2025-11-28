import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, AlertTriangle, Download, Pill, Beaker } from 'lucide-react';
import SeverityBadge from '../components/SeverityBadge';
import Loading from '../components/Loading';

interface InteractionDetail {
  id: string;
  supplement_name: string;
  medication_name: string;
  severity: string;
  description: string;
  recommendation: string;
}

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
        <Loading message="Loading interaction details..." />
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
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="ml-1">Back</span>
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <div className="flex flex-col space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Beaker className="w-7 h-7 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">
                      {interaction.supplement_name}
                    </span>
                  </div>
                  <span className="text-gray-400 text-lg">+</span>
                  <div className="flex items-center space-x-3">
                    <Pill className="w-7 h-7 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">
                      {interaction.medication_name}
                    </span>
                  </div>
                </div>

                <SeverityBadge severity={interaction.severity} />
              </div>

              <button
                onClick={downloadPDF}
                disabled={generating}
                className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition shadow-md hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>{generating ? 'Generating...' : 'Download PDF'}</span>
              </button>
            </div>

            <div className="space-y-8">
              <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                  Interaction Description
                </h3>
                <p className="text-gray-700 leading-relaxed">{interaction.description}</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Recommendation
                </h3>
                <p className="text-gray-700 leading-relaxed">{interaction.recommendation}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                  Important Notice
                </h4>
                <p className="text-sm text-gray-700">
                  This information is for educational purposes only and should not replace professional
                  medical advice. Always consult your healthcare provider before making changes to your
                  medication or supplement regimen.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/search')}
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            Search for more interactions
          </button>
        </div>
      </main>
    </div>
  );
}
