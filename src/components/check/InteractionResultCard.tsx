import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, AlertCircle, Info, Eye, ExternalLink, FileText, Award, Database } from 'lucide-react';

interface InteractionResultCardProps {
  interaction: {
    interaction_id: string;
    substance_a: { id: string; name: string; type: string };
    substance_b: { id: string; name: string; type: string };
    severity_norm?: string;
    severity_raw?: string;
    user_action?: string;
    summary_short: string;
    mechanism?: string;
    clinical_effect?: string;
    management?: string;
    evidence_grade?: string;
    confidence?: string;
    citations?: string | any[];
    created_at?: string;
    updated_at?: string;
  };
}

const SEVERITY_CONFIG = {
  major: {
    label: 'Major',
    bgColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    textColor: '#991B1B',
    badgeBg: '#FEE2E2',
    badgeText: '#991B1B',
    icon: AlertTriangle,
  },
  moderate: {
    label: 'Moderate',
    bgColor: '#FEF3C7',
    borderColor: '#FCD34D',
    textColor: '#92400E',
    badgeBg: '#FDE68A',
    badgeText: '#92400E',
    icon: AlertCircle,
  },
  minor: {
    label: 'Minor',
    bgColor: '#EFF6FF',
    borderColor: '#93C5FD',
    textColor: '#1E40AF',
    badgeBg: '#DBEAFE',
    badgeText: '#1E40AF',
    icon: Info,
  },
  monitor: {
    label: 'Monitor',
    bgColor: '#F0F9FF',
    borderColor: '#7DD3FC',
    textColor: '#0C4A6E',
    badgeBg: '#E0F2FE',
    badgeText: '#0C4A6E',
    icon: Eye,
  },
  unknown: {
    label: 'Unknown',
    bgColor: '#F9FAFB',
    borderColor: '#D1D5DB',
    textColor: '#374151',
    badgeBg: '#E5E7EB',
    badgeText: '#374151',
    icon: Info,
  },
};

export default function InteractionResultCard({ interaction }: InteractionResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityKey = (interaction.severity_norm?.toLowerCase() || 'unknown') as keyof typeof SEVERITY_CONFIG;
  const config = SEVERITY_CONFIG[severityKey] || SEVERITY_CONFIG.unknown;
  const Icon = config.icon;

  // Parse citations
  let citationUrls: string[] = [];
  if (interaction.citations) {
    if (typeof interaction.citations === 'string') {
      citationUrls = interaction.citations.split('|').map(s => s.trim()).filter(Boolean);
    } else if (Array.isArray(interaction.citations)) {
      citationUrls = interaction.citations
        .map((c: any) => {
          if (typeof c === 'string') return c;
          if (c && typeof c === 'object' && c.url) return c.url;
          return '';
        })
        .filter(Boolean);
    }
  }

  // Format date as YYYY-MM-DD
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const lastUpdated = formatDate(interaction.updated_at || interaction.created_at);

  // Parse confidence as number
  const confidenceNum = interaction.confidence ? parseFloat(interaction.confidence) : null;

  return (
    <div
      className="rounded-lg overflow-hidden transition-all duration-200"
      style={{
        background: config.bgColor,
        border: `2px solid ${config.borderColor}`,
      }}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                style={{
                  background: config.badgeBg,
                  color: config.badgeText,
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {config.label}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1" style={{ color: config.textColor }}>
              {interaction.substance_a.name} + {interaction.substance_b.name}
            </h3>
          </div>
        </div>

        {/* User Action - Prominent */}
        {interaction.user_action && (
          <div
            className="mb-3 p-3 rounded-md font-medium text-sm"
            style={{
              background: 'white',
              border: `1px solid ${config.borderColor}`,
              color: config.textColor,
            }}
          >
            {interaction.user_action}
          </div>
        )}

        {/* Summary */}
        <p className="text-base mb-3" style={{ color: config.textColor }}>
          {interaction.summary_short}
        </p>

        {/* Evidence Line - Compact */}
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs" style={{ color: config.textColor, opacity: 0.85 }}>
          {interaction.evidence_grade && (
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span className="font-medium">Evidence: Grade {interaction.evidence_grade}</span>
            </div>
          )}
          {confidenceNum !== null && (
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span className="font-medium">Confidence: {confidenceNum}%</span>
            </div>
          )}
          {citationUrls.length > 0 && (
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span className="font-medium">{citationUrls.length} {citationUrls.length === 1 ? 'Source' : 'Sources'}</span>
            </div>
          )}
        </div>

        {/* Toggle Details Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 text-sm font-semibold hover:underline transition-all"
          style={{ color: config.textColor }}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show Details
            </>
          )}
        </button>
      </div>

      {/* Expandable Details Section */}
      {isExpanded && (
        <div
          className="border-t p-5 space-y-4"
          style={{
            borderColor: config.borderColor,
            background: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          {/* Mechanism */}
          {interaction.mechanism && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: config.textColor }}>
                Mechanism
              </h4>
              <p className="text-sm" style={{ color: config.textColor }}>
                {interaction.mechanism}
              </p>
            </div>
          )}

          {/* Clinical Effect */}
          {interaction.clinical_effect && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: config.textColor }}>
                Clinical Effect
              </h4>
              <p className="text-sm" style={{ color: config.textColor }}>
                {interaction.clinical_effect}
              </p>
            </div>
          )}

          {/* Management */}
          {interaction.management && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: config.textColor }}>
                Management
              </h4>
              <p className="text-sm" style={{ color: config.textColor }}>
                {interaction.management}
              </p>
            </div>
          )}

          {/* Source Severity (severity_raw) */}
          {interaction.severity_raw && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: config.textColor }}>
                Source Severity
              </h4>
              <p className="text-sm capitalize" style={{ color: config.textColor }}>
                {interaction.severity_raw}
              </p>
            </div>
          )}

          {/* Evidence Details Grid */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t" style={{ borderColor: config.borderColor }}>
            {confidenceNum !== null && (
              <div>
                <div className="text-xs font-medium mb-1" style={{ color: config.textColor, opacity: 0.8 }}>
                  Confidence
                </div>
                <div className="text-lg font-bold" style={{ color: config.textColor }}>
                  {confidenceNum}%
                </div>
              </div>
            )}
            {interaction.evidence_grade && (
              <div>
                <div className="text-xs font-medium mb-1" style={{ color: config.textColor, opacity: 0.8 }}>
                  Evidence Grade
                </div>
                <div className="text-lg font-bold" style={{ color: config.textColor }}>
                  {interaction.evidence_grade}
                </div>
              </div>
            )}
          </div>

          {/* Sources/Citations - Chip Style */}
          {citationUrls.length > 0 && (
            <div className="pt-3 border-t" style={{ borderColor: config.borderColor }}>
              <h4 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: config.textColor }}>
                Sources
              </h4>
              <div className="flex flex-wrap gap-2">
                {citationUrls.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium hover:opacity-80 transition-opacity"
                    style={{
                      background: 'white',
                      border: `1px solid ${config.borderColor}`,
                      color: config.textColor,
                    }}
                  >
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    Source {index + 1}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Last Updated */}
          {lastUpdated && (
            <div className="pt-3 border-t" style={{ borderColor: config.borderColor }}>
              <div className="text-xs" style={{ color: config.textColor, opacity: 0.7 }}>
                Last updated: {lastUpdated}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
