import { ReactNode } from 'react';
import Card from '../ui/Card';

interface ResultCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'highlight';
}

export default function ResultCard({ title, icon, children, variant = 'default' }: ResultCardProps) {
  const highlightStyles = variant === 'highlight' ? 'border-blue-200 bg-blue-50' : '';

  return (
    <Card className={highlightStyles}>
      <div className="flex items-start gap-3">
        {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-slate-900 mb-3">{title}</h3>
          <div className="text-slate-700 space-y-2">{children}</div>
        </div>
      </div>
    </Card>
  );
}
