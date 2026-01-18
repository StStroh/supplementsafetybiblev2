import { useState } from 'react';
import { Info } from 'lucide-react';
import {
  SafetyGrade,
  Confidence,
  getGradeColors,
  getConfidenceColors,
} from '../lib/safetyGrades';

interface SafetyBadgesProps {
  grade: SafetyGrade;
  confidence: Confidence;
  gradeLabel: string;
  confidenceLabel: string;
  className?: string;
  showHelp?: boolean;
}

export default function SafetyBadges({
  grade,
  confidence,
  gradeLabel,
  confidenceLabel,
  className = '',
  showHelp = true,
}: SafetyBadgesProps) {
  const [showGradeTooltip, setShowGradeTooltip] = useState(false);
  const [showConfidenceTooltip, setShowConfidenceTooltip] = useState(false);

  const gradeColors = getGradeColors(grade);
  const confidenceColors = getConfidenceColors(confidence);

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Safety Grade Badge */}
      <div className="relative">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-all hover:shadow-sm"
          style={{
            background: gradeColors.bg,
            color: gradeColors.text,
            borderColor: gradeColors.border,
          }}
          aria-label={`Safety grade: ${gradeLabel}`}
          onMouseEnter={() => setShowGradeTooltip(true)}
          onMouseLeave={() => setShowGradeTooltip(false)}
          onClick={() => setShowGradeTooltip(!showGradeTooltip)}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: gradeColors.text }}
            aria-hidden="true"
          />
          <span>{gradeLabel}</span>
          {showHelp && (
            <Info className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
          )}
        </div>

        {/* Grade Tooltip */}
        {showHelp && showGradeTooltip && (
          <div
            className="absolute z-50 w-64 p-3 mt-2 text-sm rounded-lg shadow-lg border"
            style={{
              background: 'var(--color-bg)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            <p className="font-semibold mb-1">Safety Grade</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Shows how risky the combination can be. <strong style={{ color: '#2E7D32' }}>Low Risk</strong> means generally safe,{' '}
              <strong style={{ color: '#F57C00' }}>Use Caution</strong> requires monitoring,{' '}
              <strong style={{ color: '#C62828' }}>Avoid</strong> means significant risk.
            </p>
          </div>
        )}
      </div>

      {/* Confidence Badge */}
      <div className="relative">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all hover:shadow-sm"
          style={{
            background: confidenceColors.bg,
            color: confidenceColors.text,
            borderColor: confidenceColors.border,
          }}
          aria-label={`Evidence confidence: ${confidenceLabel}`}
          onMouseEnter={() => setShowConfidenceTooltip(true)}
          onMouseLeave={() => setShowConfidenceTooltip(false)}
          onClick={() => setShowConfidenceTooltip(!showConfidenceTooltip)}
        >
          <span>{confidenceLabel}</span>
          {showHelp && (
            <Info className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
          )}
        </div>

        {/* Confidence Tooltip */}
        {showHelp && showConfidenceTooltip && (
          <div
            className="absolute z-50 w-64 p-3 mt-2 text-sm rounded-lg shadow-lg border right-0"
            style={{
              background: 'var(--color-bg)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            <p className="font-semibold mb-1">Evidence Confidence</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Shows how strong the evidence is. <strong>High</strong> = systematic reviews/meta-analyses,{' '}
              <strong>Medium</strong> = clinical trials/observational studies,{' '}
              <strong>Low</strong> = case reports or theoretical.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Compact version without tooltips for use in lists/cards
 */
export function SafetyBadgesCompact({
  grade,
  confidence,
  gradeLabel,
  confidenceLabel,
  className = '',
}: Omit<SafetyBadgesProps, 'showHelp'>) {
  const gradeColors = getGradeColors(grade);
  const confidenceColors = getConfidenceColors(confidence);

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <span
        className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold border"
        style={{
          background: gradeColors.bg,
          color: gradeColors.text,
          borderColor: gradeColors.border,
        }}
        aria-label={`Safety: ${gradeLabel}`}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: gradeColors.text }}
          aria-hidden="true"
        />
        {gradeLabel}
      </span>

      <span
        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium border"
        style={{
          background: confidenceColors.bg,
          color: confidenceColors.text,
          borderColor: confidenceColors.border,
        }}
        aria-label={`Confidence: ${confidenceLabel}`}
      >
        {confidenceLabel}
      </span>
    </div>
  );
}
