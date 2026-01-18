import { Beaker, Pill } from 'lucide-react';
import { SafetyBadgesCompact } from './SafetyBadges';
import { getSafetyLabel } from '../lib/safetyGrades';

interface InteractionCardProps {
  interaction: {
    id: string;
    supplement_name: string;
    medication_name: string;
    severity: string;
    description: string;
    evidence?: string;
  };
  onClick: () => void;
}

export default function InteractionCard({ interaction, onClick }: InteractionCardProps) {
  const safetyLabel = getSafetyLabel({
    severity: interaction.severity,
    evidence: interaction.evidence || 'clinical observation',
  });

  return (
    <div
      onClick={onClick}
      className="card p-6 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center space-x-2">
              <Beaker className="w-5 h-5" style={{ color: 'var(--color-trial)' }} />
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{interaction.supplement_name}</span>
            </div>
            <span style={{ color: 'var(--color-text-muted)' }}>+</span>
            <div className="flex items-center space-x-2">
              <Pill className="w-5 h-5" style={{ color: 'var(--color-success)' }} />
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{interaction.medication_name}</span>
            </div>
          </div>
          <SafetyBadgesCompact
            grade={safetyLabel.grade}
            confidence={safetyLabel.confidence}
            gradeLabel={safetyLabel.gradeLabel}
            confidenceLabel={safetyLabel.confidenceLabel}
          />
        </div>
      </div>
      <p className="text-sm line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{interaction.description}</p>
    </div>
  );
}
