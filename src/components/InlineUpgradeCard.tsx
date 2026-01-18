import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Shield, TrendingUp } from 'lucide-react';

interface InlineUpgradeCardProps {
  context?: 'results' | 'saved' | 'general';
  compact?: boolean;
}

export default function InlineUpgradeCard({ context = 'results', compact = false }: InlineUpgradeCardProps) {
  const messages = {
    results: {
      title: 'Get Complete Interaction Insights',
      subtitle: 'Upgrade to see evidence strength, mechanisms, and monitoring guidance for this interaction.',
    },
    saved: {
      title: 'Save & Monitor Your Combinations',
      subtitle: 'Premium members can save combinations, receive updates, and access detailed reports.',
    },
    general: {
      title: 'Unlock Premium Features',
      subtitle: 'Get comprehensive interaction analysis with evidence-based insights.',
    },
  };

  const message = messages[context];

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Want more details?</p>
              <p className="text-sm text-slate-600">Evidence strength, mechanisms, and monitoring guidance</p>
            </div>
          </div>
          <Link
            to="/pricing"
            className="flex-shrink-0 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Upgrade
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {message.title}
          </h3>
          <p className="text-slate-600 mb-4">
            {message.subtitle}
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Evidence Strength</p>
                <p className="text-xs text-slate-600">See how strong the research is</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Mechanism Details</p>
                <p className="text-xs text-slate-600">Understand how it works</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Monitoring Guidance</p>
                <p className="text-xs text-slate-600">What to watch for</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Save & Track</p>
                <p className="text-xs text-slate-600">Monitor your combinations</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              View Premium Options
            </Link>
            <span className="text-sm text-slate-600">
              Starting at $9.99/month
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            60-day money-back guarantee • Cancel anytime • No commitment required
          </p>
        </div>
      </div>
    </div>
  );
}
