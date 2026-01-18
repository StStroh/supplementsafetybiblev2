import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-lg"
        style={{
          background: type === 'success' ? '#E8F5E9' : '#FFEBEE',
          border: type === 'success' ? '1px solid #81C784' : '1px solid #E57373',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
        ) : (
          <XCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-error)' }} />
        )}
        <p
          className="text-sm font-medium"
          style={{ color: type === 'success' ? '#2E7D32' : '#C62828' }}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className="ml-2 transition"
          style={{ color: type === 'success' ? 'var(--color-success)' : 'var(--color-error)' }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
