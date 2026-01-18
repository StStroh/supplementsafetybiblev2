import { severityColors } from '../../theme/tokens';

type Severity = 'low' | 'moderate' | 'high' | 'severe';

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

export default function SeverityBadge({ severity, className = '' }: SeverityBadgeProps) {
  const colors = severityColors[severity];

  return (
    <div
      className={`inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm ${className}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `2px solid ${colors.border}`,
      }}
    >
      {severity.charAt(0).toUpperCase() + severity.slice(1)} Risk
    </div>
  );
}
