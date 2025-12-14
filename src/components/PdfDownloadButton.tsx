import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface PdfDownloadButtonProps {
  plan: 'starter' | 'pro_trial' | 'premium_trial' | 'pro' | 'premium';
  interactionData?: any;
  className?: string;
}

export default function PdfDownloadButton({ plan, interactionData, className = '' }: PdfDownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const allowed = ['pro', 'premium', 'pro_trial', 'premium_trial'].includes(plan);

  if (!allowed) {
    return (
      <div className={`p-4 rounded-lg border border-amber-200 bg-amber-50 ${className}`}>
        <p className="text-sm text-amber-900 mb-2">
          PDF reports are available on Pro and Premium plans.
        </p>
        <a
          href="/pricing"
          className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm font-medium"
        >
          Upgrade to unlock
        </a>
      </div>
    );
  }

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch('/.netlify/functions/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(interactionData || {})
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'PDF generation failed');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `interaction-report-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF download error:', err);
      alert('Failed to generate PDF. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Download PDF report
        </>
      )}
    </button>
  );
}
