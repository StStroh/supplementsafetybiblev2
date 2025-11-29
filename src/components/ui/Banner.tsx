import { ReactNode, useState } from 'react';
import { X } from 'lucide-react';

interface BannerProps {
  children: ReactNode;
  variant?: 'info' | 'warning' | 'success';
  dismissible?: boolean;
  onDismiss?: () => void;
}

export default function Banner({ children, variant = 'info', dismissible = false, onDismiss }: BannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const variantStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    success: 'bg-green-50 border-green-200 text-green-900',
  };

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div className={`relative rounded-xl border px-4 py-3 ${variantStyles[variant]}`}>
      <div className={dismissible ? 'pr-8' : ''}>{children}</div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 text-current opacity-60 hover:opacity-100"
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
