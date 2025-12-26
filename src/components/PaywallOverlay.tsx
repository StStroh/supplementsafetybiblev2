import { useEffect, useState } from 'react';
import { Lock, Check, TrendingUp, FileText, Infinity } from 'lucide-react';

interface PaywallOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onUpgrade?: () => void;
}

export default function PaywallOverlay({
  isOpen,
  onClose,
  onSignIn,
  onSignUp,
}: PaywallOverlayProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('[data-paywall-modal]');
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const proPrice = billingCycle === 'monthly' ? '$14.99' : '$11.99';
  const premiumPrice = billingCycle === 'monthly' ? '$29.99' : '$23.99';
  const proPeriod = billingCycle === 'monthly' ? '/mo' : '/mo (billed annually)';
  const premiumPeriod = billingCycle === 'monthly' ? '/mo' : '/mo (billed annually)';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        data-paywall-modal
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
      >
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h2
              id="paywall-title"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              Unlock full interaction results
            </h2>
            <p className="text-lg text-gray-600">
              Create an account to view full details, save history, and export reports.
            </p>
          </div>

          <div className="mb-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <Lock className="w-5 h-5 text-gray-600" />
              </div>
            </div>

            <div className="space-y-3 blur-sm select-none pointer-events-none">
              <div className="bg-white/80 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="h-4 bg-gray-300 rounded w-32" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>

              <div className="bg-white/80 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="h-4 bg-gray-300 rounded w-40" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                </div>
              </div>

              <div className="bg-white/80 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="h-3 bg-gray-300 rounded w-20 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-16" />
                  </div>
                  <div>
                    <div className="h-3 bg-gray-300 rounded w-24 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                  </div>
                  <div>
                    <div className="h-3 bg-gray-300 rounded w-20 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Lock className="w-12 h-12 text-gray-800 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Preview locked</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-gray-700">Full details</span>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-gray-700">Save history</span>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-gray-700">Export PDF</span>
            </div>
            <div className="flex items-start gap-2">
              <Infinity className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-gray-700">Unlimited checks</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="font-medium">Trusted by 1,000+ early users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="font-medium">Fast checks, clear flags</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="font-medium">PDF reports in seconds</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    billingCycle === 'annual'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Annual
                  <span className="ml-2 text-xs text-emerald-600">Save 20%</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Pro</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">{proPrice}</span>
                    <span className="text-sm text-gray-600">{proPeriod}</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Unlimited checks
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Full interaction details
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      PDF export
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-blue-500 rounded-xl p-5 relative bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Premium</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">{premiumPrice}</span>
                    <span className="text-sm text-gray-600">{premiumPeriod}</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Everything in Pro
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Advanced reports
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-gray-500">
              Cancel anytime. Upgrade/downgrade in one click.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onSignUp}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Create free account
            </button>

            <button
              onClick={onSignIn}
              className="w-full bg-gray-100 text-gray-900 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all"
            >
              Sign in
            </button>

            <button
              onClick={onClose}
              className="w-full text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors text-sm"
            >
              Continue browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
