import { useState } from 'react';
import { FileText, Download, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { downloadBlob } from '../lib/download';

interface PdfExportButtonProps {
  result: any;
  userPlan: string;
  onUpgradeClick: () => void;
}

type ProgressStep = 'idle' | 'formatting' | 'securing' | 'ready';

export default function PdfExportButton({ result, userPlan, onUpgradeClick }: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<ProgressStep>('idle');
  const [error, setError] = useState<string | null>(null);

  const isPaid = ['pro', 'premium', 'clinical'].includes(userPlan);

  const generatePDF = async () => {
    if (!result || !result.ok) return;

    setLoading(true);
    setError(null);
    setProgress('formatting');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        throw new Error('Please sign in to generate PDF reports');
      }

      // Simulate premium progress steps
      await new Promise(resolve => setTimeout(resolve, 400));
      setProgress('securing');

      await new Promise(resolve => setTimeout(resolve, 400));
      setProgress('ready');

      const reportData = {
        title: 'Interaction Check Report',
        input: {
          supplement: result.pair.supplement,
          medication: result.pair.medication,
        },
        results: result,
      };

      const res = await fetch('/.netlify/functions/generate-report-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.requiresUpgrade) {
          onUpgradeClick();
          return;
        }
        throw new Error(errorData.error || 'Failed to generate PDF');
      }

      const blob = await res.blob();
      const date = new Date().toISOString().split('T')[0];
      downloadBlob(blob, `SSB-Report-${date}.pdf`);

      // Keep "Ready" state visible for 800ms
      await new Promise(resolve => setTimeout(resolve, 800));

    } catch (err) {
      console.error('[PdfExportButton] Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
    } finally {
      setLoading(false);
      setProgress('idle');
    }
  };

  if (!isPaid) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <FileText className="text-gray-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-base mb-1">PDF Export</h3>
            <p className="text-sm text-gray-600 mb-3">
              Save and share your interaction checks with a professional PDF report.
            </p>
            <ul className="space-y-1.5 mb-4 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle size={14} className="text-gray-400" />
                Shareable report
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} className="text-gray-400" />
                Saved in Report Vault
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} className="text-gray-400" />
                Email to yourself <span className="text-xs text-gray-500">(Premium)</span>
              </li>
            </ul>
            <div className="flex gap-2">
              <button
                onClick={onUpgradeClick}
                className="px-4 py-2 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 transition-colors text-sm"
              >
                Upgrade to Clinical
              </button>
              <button
                onClick={() => {}}
                className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
          <FileText className="text-gray-700" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base mb-2">Export Report</h3>

          {loading && progress !== 'idle' ? (
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                {progress === 'formatting' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                )}
                <span className={`text-sm ${progress === 'formatting' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  Formatting
                </span>
              </div>
              <div className="flex items-center gap-3">
                {progress === 'securing' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                ) : progress === 'ready' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                )}
                <span className={`text-sm ${progress === 'securing' ? 'text-gray-900 font-medium' : progress === 'ready' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Securing
                </span>
              </div>
              <div className="flex items-center gap-3">
                {progress === 'ready' ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-900 font-medium">Ready</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                    <span className="text-sm text-gray-400">Ready</span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Download a professional PDF report of this interaction check.
              </p>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <button
                onClick={generatePDF}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download size={16} />
                {loading ? 'Preparing...' : 'Download PDF'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
