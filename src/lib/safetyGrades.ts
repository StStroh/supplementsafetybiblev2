/**
 * Safety Grade & Confidence Labeling System
 *
 * Provides deterministic labeling for supplement-medication interactions
 * based on severity and evidence quality.
 */

export type SafetyGrade = 'green' | 'yellow' | 'red';
export type Confidence = 'high' | 'medium' | 'low';

export interface SafetyLabel {
  grade: SafetyGrade;
  confidence: Confidence;
  gradeLabel: string;
  confidenceLabel: string;
}

interface SafetyInput {
  severity?: string;
  evidence?: string;
  flags?: string[];
}

/**
 * Determines safety grade from severity indicators
 */
function calculateGrade(severity?: string, flags?: string[]): { grade: SafetyGrade; label: string } {
  if (!severity) return { grade: 'green', label: 'Low Risk' };

  const sev = severity.toLowerCase();
  const allFlags = (flags || []).map(f => f.toLowerCase());

  // Red: Avoid/contraindicated
  const redKeywords = ['contraindicated', 'avoid', 'major', 'serious', 'high risk', 'severe', 'dangerous'];
  if (redKeywords.some(kw => sev.includes(kw) || allFlags.some(f => f.includes(kw)))) {
    return { grade: 'red', label: 'Avoid' };
  }

  // Yellow: Use caution/monitor
  const yellowKeywords = ['moderate', 'caution', 'monitor', 'interaction possible', 'may interact'];
  if (yellowKeywords.some(kw => sev.includes(kw) || allFlags.some(f => f.includes(kw)))) {
    return { grade: 'yellow', label: 'Use Caution' };
  }

  // Default to green
  return { grade: 'green', label: 'Low Risk' };
}

/**
 * Determines confidence level from evidence quality
 */
function calculateConfidence(evidence?: string): { confidence: Confidence; label: string } {
  if (!evidence) return { confidence: 'low', label: 'Low confidence' };

  const ev = evidence.toLowerCase();

  // High: Systematic reviews, meta-analyses, multiple RCTs
  const highKeywords = [
    'systematic review',
    'meta-analysis',
    'multiple rct',
    'strong evidence',
    'well-established',
    'randomized controlled trial'
  ];
  if (highKeywords.some(kw => ev.includes(kw))) {
    return { confidence: 'high', label: 'High confidence' };
  }

  // Medium: Single RCTs, clinical trials, observational studies
  const mediumKeywords = [
    'rct',
    'clinical trial',
    'observational',
    'moderate evidence',
    'cohort study',
    'case-control'
  ];
  if (mediumKeywords.some(kw => ev.includes(kw))) {
    return { confidence: 'medium', label: 'Medium confidence' };
  }

  // Low: Case reports, theoretical, limited data
  return { confidence: 'low', label: 'Low confidence' };
}

/**
 * Generate complete safety label with grade and confidence
 *
 * @param input - Object containing severity, evidence, and optional flags
 * @returns SafetyLabel with grade, confidence, and human-readable labels
 *
 * @example
 * ```ts
 * const label = getSafetyLabel({
 *   severity: 'major',
 *   evidence: 'systematic review'
 * });
 * // Returns: { grade: 'red', confidence: 'high', gradeLabel: 'Avoid', confidenceLabel: 'High confidence' }
 * ```
 */
export function getSafetyLabel(input: SafetyInput): SafetyLabel {
  const gradeResult = calculateGrade(input.severity, input.flags);
  const confidenceResult = calculateConfidence(input.evidence);

  return {
    grade: gradeResult.grade,
    confidence: confidenceResult.confidence,
    gradeLabel: gradeResult.label,
    confidenceLabel: confidenceResult.label,
  };
}

/**
 * Get color values for UI rendering
 */
export function getGradeColors(grade: SafetyGrade): { bg: string; text: string; border: string } {
  switch (grade) {
    case 'red':
      return {
        bg: '#FFEBEE',
        text: '#C62828',
        border: '#EF5350',
      };
    case 'yellow':
      return {
        bg: '#FFF8E1',
        text: '#F57C00',
        border: '#FFB74D',
      };
    case 'green':
      return {
        bg: '#E8F5E9',
        text: '#2E7D32',
        border: '#66BB6A',
      };
  }
}

export function getConfidenceColors(confidence: Confidence): { bg: string; text: string; border: string } {
  switch (confidence) {
    case 'high':
      return {
        bg: '#E3F2FD',
        text: '#1565C0',
        border: '#42A5F5',
      };
    case 'medium':
      return {
        bg: '#F3E5F5',
        text: '#6A1B9A',
        border: '#AB47BC',
      };
    case 'low':
      return {
        bg: '#F5F5F5',
        text: '#616161',
        border: '#9E9E9E',
      };
  }
}
