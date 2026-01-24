import { useState } from 'react';
import { Search, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PregnancyPreviewForm() {
  const navigate = useNavigate();
  const [supplementName, setSupplementName] = useState('');
  const [isPregnant, setIsPregnant] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supplementName.trim()) {
      setShowPreview(true);
    }
  };

  const handleUnlock = () => {
    navigate('/premium?source=pregnancy-preview');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <h3 className="text-2xl font-bold mb-2">
            Free Pregnancy Safety Preview
          </h3>
          <p className="text-purple-100">
            Enter a supplement name to see a preview of our pregnancy safety information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="supplement" className="block text-sm font-medium text-gray-700 mb-2">
              Supplement Name
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="supplement"
                value={supplementName}
                onChange={(e) => setSupplementName(e.target.value)}
                placeholder="e.g., Folic Acid, Vitamin D, Omega-3"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pregnant"
              checked={isPregnant}
              onChange={(e) => setIsPregnant(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="pregnant" className="text-sm text-gray-700">
              I'm pregnant or trying to conceive
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Get Safety Preview
          </button>
        </form>

        {showPreview && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Preview Results for "{supplementName}"
              </h4>
              <p className="text-sm text-gray-600">
                This is a limited preview. Full safety information is available with Premium access.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-700">
                    Evidence category and general safety considerations available
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-700">
                    Dosage considerations and trimester-specific information available
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-700">
                    Interaction screening and clinical references available
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-purple-900 font-medium mb-1">
                    Full Report Available with Premium
                  </p>
                  <p className="text-xs text-purple-700">
                    Get complete safety analysis, evidence summaries, clinical references, and interaction screening
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleUnlock}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Unlock Full Pregnancy Safety Report
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Preview vs Premium Comparison
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Feature</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Preview</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-purple-700 bg-purple-50">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-700">Evidence category shown</td>
                  <td className="py-3 px-4 text-center text-gray-400">Limited</td>
                  <td className="py-3 px-4 text-center text-purple-600 font-medium bg-purple-50">✓ Full</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-700">Safety analysis</td>
                  <td className="py-3 px-4 text-center text-gray-400">Summary only</td>
                  <td className="py-3 px-4 text-center text-purple-600 font-medium bg-purple-50">✓ Detailed</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-700">Trimester-specific info</td>
                  <td className="py-3 px-4 text-center text-gray-400">—</td>
                  <td className="py-3 px-4 text-center text-purple-600 font-medium bg-purple-50">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-700">Interaction screening</td>
                  <td className="py-3 px-4 text-center text-gray-400">—</td>
                  <td className="py-3 px-4 text-center text-purple-600 font-medium bg-purple-50">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-700">Clinical references</td>
                  <td className="py-3 px-4 text-center text-gray-400">—</td>
                  <td className="py-3 px-4 text-center text-purple-600 font-medium bg-purple-50">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
