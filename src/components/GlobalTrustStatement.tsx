import { Info } from 'lucide-react';

export default function GlobalTrustStatement() {
  return (
    <div
      className="rounded-xl p-5 mb-6"
      style={{
        background: '#E3F2FD',
        border: '2px solid #64B5F6'
      }}
    >
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#1565C0' }} />
        <div>
          <h3 className="font-bold text-base mb-2" style={{ color: '#1565C0' }}>
            How to interpret results
          </h3>
          <div className="text-sm space-y-2" style={{ color: '#0D47A1' }}>
            <p>
              <strong>Interactions shown here are clinically reviewed.</strong> Each result is based on documented evidence from medical literature, pharmacology references, and clinical studies.
            </p>
            <p>
              <strong>If no interaction appears, it means none is currently documented</strong> — not that the combination is guaranteed safe. Medical science is constantly evolving, and not all substance combinations have been extensively studied.
            </p>
            <p className="text-xs mt-3 pt-3 border-t" style={{ borderColor: '#64B5F6' }}>
              Always consult with your healthcare provider before making changes to your supplement or medication regimen, especially if you have underlying health conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
