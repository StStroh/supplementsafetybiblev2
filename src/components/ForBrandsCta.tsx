import { Building2, Mail } from 'lucide-react';

interface ForBrandsCtaProps {
  className?: string;
}

export default function ForBrandsCta({ className = '' }: ForBrandsCtaProps) {
  const handleRequestQuoteClick = () => {
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('cta_for_brands_request_quote_click');
    }
  };

  const handleTalkToSalesClick = () => {
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('cta_for_brands_talk_to_sales_click');
    }
  };

  return (
    <div className={`bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start gap-3 mb-3">
        <Building2 className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            Need a manufacturer for your supplement brand?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We produce capsules, tablets, and powders under NSF/cGMP systems. Fast quoting + compliance support.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <a
          href="mailto:sales@certifiednutralabs.com?subject=Manufacturing Quote Request"
          onClick={handleRequestQuoteClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Mail className="w-4 h-4" />
          Request quote
        </a>
        <a
          href="mailto:sales@certifiednutralabs.com?subject=Sales Inquiry"
          onClick={handleTalkToSalesClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Talk to sales
        </a>
      </div>

      <p className="text-xs text-slate-500 mt-3">
        Separate from interaction screening.
      </p>
    </div>
  );
}
