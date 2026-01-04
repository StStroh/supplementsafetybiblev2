import { useEffect, useState } from 'react';
import { getSalesIntent } from '../lib/salesIntent';

export default function SalesMessageBox() {
  const [intent, setIntent] = useState<any>(null);

  useEffect(() => {
    const checkIntent = () => {
      const data = getSalesIntent();
      if (data && (data.intent?.level === 'PRE_PURCHASE' || data.intent?.level === 'PURCHASE_READY')) {
        setIntent(data);
      } else {
        setIntent(null);
      }
    };

    checkIntent();
    window.addEventListener('sales-intent-updated', checkIntent);
    return () => window.removeEventListener('sales-intent-updated', checkIntent);
  }, []);

  if (!intent || !intent.sales_message) return null;

  return (
    <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Need a quote fast?</h3>
      <p className="text-sm text-gray-700 mb-3">{intent.sales_message}</p>
      <div className="flex flex-wrap gap-2">
        <a
          href="/contact?intent=quote"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Request quote
        </a>
        <a
          href="mailto:sales@safetybible.com?subject=Sales Inquiry"
          className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-600 hover:bg-blue-50 transition-colors"
        >
          Talk to sales
        </a>
      </div>
    </div>
  );
}
