import { ArrowRight, Lock, Bell } from 'lucide-react';
import Card from '../ui/Card';

interface UpgradeBandProps {
  className?: string;
}

export default function UpgradeBand({ className = '' }: UpgradeBandProps) {
  return (
    <Card className={`bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 ${className}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-slate-900 mb-2 flex items-center gap-2">
            <Lock size={20} className="text-blue-600" />
            Get Complete Interaction Details
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Unlock full mechanisms, clinical studies, monitoring guidelines, and personalized alerts.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            <div className="flex items-center gap-1.5">
              <Bell size={16} className="text-blue-600" />
              <span>Safety alerts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock size={16} className="text-blue-600" />
              <span>Private checks</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/pricing?plan=pro"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Pro Plan
              <ArrowRight size={18} className="ml-2" />
            </a>
            <a
              href="/pricing?plan=premium"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
            >
              Premium Plan
              <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
          <p className="text-xs text-center md:text-right text-slate-600">
            60-day money-back guarantee · Change or cancel anytime · Individual use
          </p>
        </div>
      </div>
    </Card>
  );
}
