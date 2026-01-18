import { useEffect, useState } from 'react';
import { FileText, Download, Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Report {
  id: string;
  title: string;
  created_at: string;
  plan_at_time: string;
}

interface ReportVaultProps {
  userPlan: string;
  onUpgradeClick: () => void;
}

export default function ReportVault({ userPlan, onUpgradeClick }: ReportVaultProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailingId, setEmailingId] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);

  const isPaid = ['pro', 'premium', 'clinical'].includes(userPlan);
  const isPremium = userPlan === 'premium' || userPlan === 'clinical';

  useEffect(() => {
    if (isPaid) {
      loadReports();
    } else {
      setLoading(false);
    }
  }, [isPaid]);

  const loadReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('id, title, created_at, plan_at_time')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('[ReportVault] Error loading reports:', error);
      } else {
        setReports(data || []);
      }
    } catch (err) {
      console.error('[ReportVault] Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailReport = async (reportId: string) => {
    if (!isPremium) {
      onUpgradeClick();
      return;
    }

    setEmailingId(reportId);
    setEmailSuccess(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        alert('Please sign in again');
        return;
      }

      const res = await fetch('/.netlify/functions/email-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ report_id: reportId }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.requiresUpgrade) {
          onUpgradeClick();
        } else {
          throw new Error(result.error || 'Failed to send email');
        }
      } else {
        setEmailSuccess(reportId);
        setTimeout(() => setEmailSuccess(null), 3000);
      }
    } catch (err) {
      console.error('[ReportVault] Email error:', err);
      alert(err instanceof Error ? err.message : 'Failed to send email');
    } finally {
      setEmailingId(null);
    }
  };

  if (!isPaid) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <Lock className="text-gray-400" size={20} />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">Report Vault</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Save and organize all your interaction reports in one place.
        </p>
        <button
          onClick={onUpgradeClick}
          className="w-full px-4 py-2.5 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 transition-colors text-sm"
        >
          Upgrade to unlock
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
            <FileText className="text-gray-700" size={20} />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">Report Vault</h3>
        </div>
        {reports.length > 3 && (
          <span className="text-xs text-gray-500">{reports.length} reports</span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Your reports will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.slice(0, 3).map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {report.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(report.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  {report.plan_at_time && (
                    <span className="ml-2 px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                      {report.plan_at_time}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Download"
                >
                  <Download size={16} className="text-gray-600" />
                </button>
                {emailSuccess === report.id ? (
                  <div className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium">
                    Sent
                  </div>
                ) : (
                  <button
                    onClick={() => handleEmailReport(report.id)}
                    disabled={emailingId === report.id || !isPremium}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    title={isPremium ? 'Email to me' : 'Premium only'}
                  >
                    {emailingId === report.id ? (
                      <Loader2 size={16} className="text-gray-600 animate-spin" />
                    ) : (
                      <Mail size={16} className="text-gray-600" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
