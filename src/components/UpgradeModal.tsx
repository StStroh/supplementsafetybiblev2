import { X, Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger?: 'limit' | 'results' | 'action';
}

export default function UpgradeModal({ isOpen, onClose, trigger = 'limit' }: UpgradeModalProps) {
  if (!isOpen) return null;

  const titles = {
    limit: 'Unlock Unlimited Checks',
    results: 'Unlock Pro Results',
    action: 'Unlock Pro Features',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {titles[trigger]}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-center mb-6">
          Get the complete picture with Pro
        </p>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">
              <strong>Unlimited medications and supplements</strong> in your lists
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">
              <strong>Full interaction details</strong> for all risk levels
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">
              <strong>Timing guidance</strong> to separate your doses safely
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">
              <strong>Save profiles</strong> for quick future checks
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">
              <strong>Printable PDF reports</strong> to share with your doctor
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link
            to="/pricing"
            className="block w-full px-6 py-3 bg-blue-600 text-white text-center font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            style={{ minHeight: '48px' }}
          >
            Upgrade to Pro
          </Link>

          <button
            onClick={onClose}
            className="block w-full px-6 py-3 bg-gray-100 text-gray-700 text-center font-medium rounded-lg hover:bg-gray-200 transition-colors"
            style={{ minHeight: '48px' }}
          >
            Not now
          </button>
        </div>

        {/* Trust Badge */}
        <p className="text-xs text-gray-500 text-center mt-4">
          No credit card required to explore pricing
        </p>
      </div>
    </div>
  );
}
