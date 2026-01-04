import { Mail, MessageSquare } from 'lucide-react';
import { AgentOutput } from '../lib/behaviorIntent';

interface QuoteNudgeProps {
  agentOut: AgentOutput | null;
}

export default function QuoteNudge({ agentOut }: QuoteNudgeProps) {
  if (!agentOut) return null;

  const { intent, sales_message } = agentOut;

  if (intent.level !== 'PRE_PURCHASE' && intent.level !== 'PURCHASE_READY') {
    return null;
  }

  const defaultMessage = 'Looking for personalized recommendations? Our team can help you create a safe supplement protocol.';
  const message = sales_message || defaultMessage;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Need a quote fast?</h3>
      <p className="text-gray-700 mb-4">{message}</p>
      <div className="flex flex-wrap gap-3">
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Request quote
        </a>
        <a
          href="mailto:sales@certifiednutralabs.com"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Talk to sales
        </a>
      </div>
    </div>
  );
}
