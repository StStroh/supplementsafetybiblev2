import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSalesIntent, clearSalesIntent } from '../lib/salesIntent';

export function SalesCTA() {
  const [intent, setIntent] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkIntent = () => {
      const currentIntent = getSalesIntent();
      if (
        currentIntent &&
        (currentIntent.intent.level === 'PRE_PURCHASE' ||
          currentIntent.intent.level === 'PURCHASE_READY') &&
        currentIntent.sales_message
      ) {
        setIntent(currentIntent);
        setVisible(true);
      }
    };

    checkIntent();

    window.addEventListener('sales-intent-updated', checkIntent);
    return () => window.removeEventListener('sales-intent-updated', checkIntent);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    clearSalesIntent();
  };

  const handleRequestQuote = () => {
    window.location.href = 'mailto:sales@certifiednutralabs.com?subject=Quote Request';
  };

  const handleTalkToSales = () => {
    window.location.href = 'mailto:sales@certifiednutralabs.com?subject=Sales Inquiry';
  };

  if (!visible || !intent) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need a quote fast?
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {intent.sales_message}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRequestQuote}
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {intent.sales_action.cta}
          </button>
          <button
            onClick={handleTalkToSales}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Talk to sales
          </button>
        </div>

        {intent.offer?.time_to_quote && (
          <p className="mt-3 text-xs text-gray-500 text-center">
            Quote ready in {intent.offer.time_to_quote}
          </p>
        )}
      </div>
    </div>
  );
}
