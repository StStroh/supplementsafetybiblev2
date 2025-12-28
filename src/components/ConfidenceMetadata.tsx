import { useState } from 'react';
import { ChevronDown, ChevronUp, Award, FileText, Calendar } from 'lucide-react';

interface ConfidenceMetadataProps {
  evidenceGrade?: string;
  confidence?: string;
  sourceType?: string;
  lastReviewed?: string;
  severity: 'avoid' | 'caution' | 'monitor' | 'info';
}

const EVIDENCE_DESCRIPTIONS = {
  'High': 'Multiple clinical studies or established pharmacological mechanisms',
  'Moderate': 'Limited clinical evidence or well-documented case reports',
  'Limited': 'Theoretical mechanism or isolated case reports',
  'Theoretical': 'Based on pharmacological principles without direct clinical evidence'
};

const SOURCE_DESCRIPTIONS = {
  'clinical_study': 'Randomized controlled trials or observational studies',
  'pharmacology': 'Pharmacokinetic or pharmacodynamic interactions',
  'case_reports': 'Documented case reports in medical literature',
  'expert_consensus': 'Clinical guidelines and expert recommendations'
};

export default function ConfidenceMetadata({
  evidenceGrade,
  confidence,
  sourceType,
  lastReviewed,
  severity
}: ConfidenceMetadataProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Default values if not provided
  const grade = evidenceGrade || 'Moderate';
  const confidenceLevel = confidence || 'Medium';
  const source = sourceType || 'pharmacology';
  const reviewed = lastReviewed || 'Recently reviewed';

  return (
    <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left p-3 rounded-lg hover:bg-black/5 transition-colors"
      >
        <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
          Why this result?
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-3 pl-3">
          <div className="flex items-start gap-3">
            <Award className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
            <div>
              <div className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text)' }}>
                Evidence Grade: <span className="font-normal">{grade}</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {EVIDENCE_DESCRIPTIONS[grade as keyof typeof EVIDENCE_DESCRIPTIONS] || 'Based on available scientific evidence'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
            <div>
              <div className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text)' }}>
                Source Type: <span className="font-normal capitalize">{source.replace('_', ' ')}</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {SOURCE_DESCRIPTIONS[source as keyof typeof SOURCE_DESCRIPTIONS] || 'Medical and scientific references'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
            <div>
              <div className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text)' }}>
                Status: <span className="font-normal">{reviewed}</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                This interaction profile is regularly updated based on new research
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-xs italic" style={{ color: 'var(--color-text-muted)' }}>
              Confidence Level: {confidenceLevel} — This reflects the consistency and quality of available evidence supporting this interaction profile.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
