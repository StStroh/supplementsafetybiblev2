import { useState } from 'react';
import { X, AlertCircle, CheckCircle2, Crown } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface RequestReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  substanceName: string;
  interactionWith: string;
  userTier?: string;
  userId?: string;
}

type RequestReason = 'missing_token' | 'missing_interaction' | 'unclear_result';

export default function RequestReviewModal({
  isOpen,
  onClose,
  substanceName,
  interactionWith,
  userTier = 'free',
  userId,
}: RequestReviewModalProps) {
  const [reason, setReason] = useState<RequestReason>('missing_token');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPriority = userTier === 'pro' || userTier === 'clinical';

  const normalizeToken = (token: string): string => {
    return token
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const status = isPriority ? 'priority_new' : 'new';

      const payload: any = {
        token_a: substanceName,
        token_b: interactionWith || null,
        token_a_norm: normalizeToken(substanceName),
        token_b_norm: interactionWith ? normalizeToken(interactionWith) : null,
        status,
        reason: reason || null,
        note: note.trim() || null,
        user_tier: userTier,
        user_id: userId || null,
      };

      const { error: insertError } = await supabase.from('interaction_requests').insert(payload);

      if (insertError) {
        console.error('[RequestReviewModal] Insert error:', insertError);
        throw insertError;
      }

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setReason('missing_token');
        setNote('');
      }, 2500);
    } catch (err: any) {
      console.error('[RequestReviewModal] Submit failed:', err);
      const errorMessage = err.message || 'Failed to submit request. Please try again.';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
    setSubmitted(false);
    setReason('missing_token');
    setNote('');
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-900 mb-2">
              Thank you!
            </h3>
            <p className="text-center text-slate-600 text-sm">
              {isPriority
                ? "Your request has been submitted with priority status and will be reviewed soon."
                : "Your request has been submitted for review."}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">Request Review</h3>
              <button
                onClick={handleCancel}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                disabled={submitting}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {isPriority && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                  <Crown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900">Priority Review</p>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Your {userTier === 'clinical' ? 'Clinical' : 'Pro'} plan request will be prioritized.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-slate-700 mb-3">
                  Requesting review for:{' '}
                  <span className="font-semibold">
                    {substanceName} + {interactionWith}
                  </span>
                </p>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-semibold text-slate-900 mb-2">
                  Reason <span className="text-red-600">*</span>
                </label>
                <select
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value as RequestReason)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={submitting}
                >
                  <option value="missing_token">Missing token</option>
                  <option value="missing_interaction">Missing interaction</option>
                  <option value="unclear_result">Unclear result</option>
                </select>
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-semibold text-slate-900 mb-2">
                  Additional note (optional)
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Provide any additional context..."
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  disabled={submitting}
                />
                <p className="text-xs text-slate-500 mt-1">{note.length}/500 characters</p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-900">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCancel}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
