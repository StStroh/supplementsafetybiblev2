import { AlertTriangle } from 'lucide-react';

interface DisclaimerBlockProps {
  variant?: 'default' | 'compact' | 'prominent';
  className?: string;
}

export default function DisclaimerBlock({ variant = 'default', className = '' }: DisclaimerBlockProps) {
  if (variant === 'compact') {
    return (
      <div className={`bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm ${className}`}>
        <p className="text-amber-900">
          <strong>Educational information only.</strong> Not medical advice. Always consult your healthcare provider.
        </p>
      </div>
    );
  }

  if (variant === 'prominent') {
    return (
      <div className={`bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6 ${className}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">
              Important Medical Disclaimer
            </h3>
            <div className="text-amber-800 space-y-2">
              <p>
                <strong>This is educational information only and not medical advice.</strong> This tool is not intended to diagnose, treat, cure, or prevent any disease or condition.
              </p>
              <p>
                Pregnancy is a complex medical state. Always consult your obstetrician, midwife, or qualified healthcare provider before taking any supplement, medication, or making changes to your health routine during pregnancy or while breastfeeding.
              </p>
              <p className="text-sm">
                Individual circumstances vary significantly. What may be safe for one person could be contraindicated for another.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-900">
          <p className="font-semibold mb-1">Educational Information Only</p>
          <p>
            This information is for educational purposes and is not medical advice. Pregnancy circumstances vary greatly. Always consult your healthcare provider before taking any supplement or medication during pregnancy or while breastfeeding.
          </p>
        </div>
      </div>
    </div>
  );
}
