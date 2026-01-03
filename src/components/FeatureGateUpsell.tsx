import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeatureGateUpsellProps {
  feature: 'stack-limit' | 'filters' | 'pdf-export' | 'saved-checks' | 'audit-log' | 'priority-review';
  currentTier: 'free' | 'pro' | 'clinical';
  compact?: boolean;
}

const FEATURE_MESSAGES = {
  'stack-limit': {
    title: 'Check Larger Stacks',
    description: 'Upgrade to Pro to check stacks up to 4 substances and unlock advanced filters.',
    targetTier: 'Pro',
  },
  'filters': {
    title: 'Filter Your Results',
    description: 'Upgrade to Pro to filter results by severity and confidence level.',
    targetTier: 'Pro',
  },
  'pdf-export': {
    title: 'Export Your Reports',
    description: 'Clinical members can export detailed PDF reports for your records.',
    targetTier: 'Clinical',
  },
  'saved-checks': {
    title: 'Save Your Checks',
    description: 'Clinical members can save and track their interaction checks over time.',
    targetTier: 'Clinical',
  },
  'audit-log': {
    title: 'Access Audit Log',
    description: 'Clinical members get full audit logs of all their checks and exports.',
    targetTier: 'Clinical',
  },
  'priority-review': {
    title: 'Priority Review',
    description: 'Pro members get priority processing for substance addition requests.',
    targetTier: 'Pro',
  },
};

export default function FeatureGateUpsell({
  feature,
  currentTier,
  compact = false,
}: FeatureGateUpsellProps) {
  const message = FEATURE_MESSAGES[feature];

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">{message.title}</p>
              <p className="text-sm text-slate-600">{message.description}</p>
            </div>
          </div>
          <Link
            to="/pricing"
            className="flex-shrink-0 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            Upgrade
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-blue-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">{message.title}</h3>
          <p className="text-slate-600 mb-4">{message.description}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View {message.targetTier} Plan
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-sm text-slate-600">
              {message.targetTier === 'Pro' ? 'Starting at $9.99/month' : 'Custom pricing'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
