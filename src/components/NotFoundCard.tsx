import { useState } from 'react';
import { AlertCircle, X, Send } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

interface Substance {
  substance_id: string;
  display_name: string;
  canonical_name: string;
  type: 'supplement' | 'drug';
  aliases: string[];
}

interface NotFoundCardProps {
  rawName: string;
  kind: 'supplement' | 'drug';
  suggestions: Substance[];
  onRemove: () => void;
  onSelectSuggestion: (substance: Substance) => void;
}

export default function NotFoundCard({
  rawName,
  kind,
  suggestions,
  onRemove,
  onSelectSuggestion,
}: NotFoundCardProps) {
  const t = useTranslation();
  const [requesting, setRequesting] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRequestAdd = async () => {
    setRequesting(true);
    setRequestStatus('idle');

    try {
      const response = await fetch('/.netlify/functions/checker-request-add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw_name: rawName,
          kind,
          locale: localStorage.getItem('locale') || 'en',
          page: window.location.pathname,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setRequestStatus('success');
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          if (requestStatus === 'success') {
            onRemove();
          }
        }, 3000);
      } else {
        setRequestStatus('error');
      }
    } catch (error) {
      console.error('[NotFoundCard] Request error:', error);
      setRequestStatus('error');
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div
      className="rounded-xl p-5 mb-4"
      style={{
        background: '#FFF9E6',
        border: '2px solid #FFB74D',
      }}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#F57C00' }} />
        <div className="flex-1">
          <h3 className="font-bold mb-1" style={{ color: '#F57C00' }}>
            {t('notFound.title', { name: rawName })}
          </h3>
          <p className="text-sm mb-3" style={{ color: '#E65100' }}>
            {t('notFound.description')}
          </p>

          {/* Closest Matches */}
          {suggestions.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-semibold mb-2" style={{ color: '#F57C00' }}>
                {t('notFound.closestMatches')}
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 5).map((suggestion) => (
                  <button
                    key={suggestion.substance_id}
                    onClick={() => onSelectSuggestion(suggestion)}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-amber-100"
                    style={{
                      background: 'white',
                      border: '2px solid #FFB74D',
                      color: '#F57C00',
                    }}
                  >
                    {suggestion.display_name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onRemove}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: 'white',
                border: '2px solid #FFB74D',
                color: '#F57C00',
              }}
            >
              <X className="w-4 h-4" />
              {t('notFound.remove')}
            </button>

            {requestStatus === 'idle' && (
              <button
                onClick={handleRequestAdd}
                disabled={requesting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-amber-100"
                style={{
                  background: 'white',
                  border: '2px solid #FFB74D',
                  color: '#F57C00',
                  opacity: requesting ? 0.6 : 1,
                }}
              >
                <Send className="w-4 h-4" />
                {requesting ? t('common.loading') : t('notFound.requestAdd')}
              </button>
            )}

            {requestStatus === 'success' && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: '#E8F5E9',
                  border: '2px solid #66BB6A',
                  color: '#2E7D32',
                }}
              >
                ✓ {t('notFound.requestSent')}
              </div>
            )}

            {requestStatus === 'error' && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: '#FFEBEE',
                  border: '2px solid #EF5350',
                  color: '#C62828',
                }}
              >
                ✗ {t('notFound.requestFailed')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
