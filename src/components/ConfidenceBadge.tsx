import { Shield, AlertTriangle, AlertCircle, Info, CheckCircle2, HelpCircle } from 'lucide-react';

type ConfidenceLevel = 'avoid' | 'caution' | 'monitor' | 'none' | 'not-reviewed';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  showExplanation?: boolean;
}

const CONFIDENCE_CONFIG = {
  avoid: {
    emoji: '🟥',
    label: 'Clinically Significant Interaction',
    color: '#C62828',
    bgColor: '#FFEBEE',
    borderColor: '#EF5350',
    icon: AlertTriangle,
    explanation: 'This interaction is documented in clinical literature and may cause harm if combined.'
  },
  caution: {
    emoji: '🟧',
    label: 'Use With Caution',
    color: '#E65100',
    bgColor: '#FFF3E0',
    borderColor: '#FFA726',
    icon: AlertCircle,
    explanation: 'Evidence suggests a potential interaction. Medical supervision is recommended.'
  },
  monitor: {
    emoji: '🟦',
    label: 'Monitor / Timing Adjustment',
    color: '#1565C0',
    bgColor: '#E3F2FD',
    borderColor: '#64B5F6',
    icon: Info,
    explanation: 'No direct harm reported, but timing or dosage may matter.'
  },
  none: {
    emoji: '🟩',
    label: 'No Known Interaction',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    borderColor: '#66BB6A',
    icon: CheckCircle2,
    explanation: 'No interaction has been documented in medical sources at this time.'
  },
  'not-reviewed': {
    emoji: '⚪',
    label: 'Not Yet Reviewed',
    color: '#616161',
    bgColor: '#F5F5F5',
    borderColor: '#BDBDBD',
    icon: HelpCircle,
    explanation: 'This combination has not yet been clinically reviewed. Absence of data does not mean absence of risk.'
  }
};

export default function ConfidenceBadge({ level, showExplanation = true }: ConfidenceBadgeProps) {
  const config = CONFIDENCE_CONFIG[level];
  const Icon = config.icon;

  return (
    <div className="mb-4">
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
        style={{
          background: config.bgColor,
          border: `2px solid ${config.borderColor}`,
          color: config.color
        }}
      >
        <span className="text-lg">{config.emoji}</span>
        <Icon className="w-4 h-4" />
        <span className="text-sm">{config.label}</span>
      </div>

      {showExplanation && (
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {config.explanation}
        </p>
      )}
    </div>
  );
}

export { CONFIDENCE_CONFIG };
export type { ConfidenceLevel };
