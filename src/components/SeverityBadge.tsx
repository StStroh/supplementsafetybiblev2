interface SeverityBadgeProps {
  severity: string;
}

const severityConfig = {
  low: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    icon: '✓'
  },
  moderate: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    icon: '⚠'
  },
  high: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-200',
    icon: '⚠'
  },
  severe: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    icon: '⛔'
  }
};

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = severityConfig[severity.toLowerCase() as keyof typeof severityConfig] || severityConfig.low;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${config.bg} ${config.text} ${config.border}`}
    >
      <span className="mr-1">{config.icon}</span>
      {severity.toUpperCase()}
    </span>
  );
}
