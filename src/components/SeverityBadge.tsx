interface SeverityBadgeProps {
  severity: string;
}

const severityConfig = {
  low: {
    bg: 'bg-[#E8F5E9]',
    text: 'text-[#1B5E20]',
    border: 'border-[#1B5E20]/20',
    icon: '✓'
  },
  moderate: {
    bg: 'bg-[#E8EAF6]',
    text: 'text-[#5C6BC0]',
    border: 'border-[#5C6BC0]/20',
    icon: '⚠'
  },
  high: {
    bg: 'bg-[#FBE9E7]',
    text: 'text-[#D35400]',
    border: 'border-[#D35400]/20',
    icon: '⚠'
  },
  severe: {
    bg: 'bg-[#FFEBEE]',
    text: 'text-[#B00020]',
    border: 'border-[#B00020]/20',
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
