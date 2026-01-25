// Maps severity levels to risk levels for display
export function mapSeverityToRisk(severity?: string): 'High' | 'Medium' | 'Low' | 'Unknown' {
  const norm = severity?.toLowerCase();

  if (norm === 'major') return 'High';
  if (norm === 'moderate') return 'Medium';
  if (norm === 'minor' || norm === 'monitor') return 'Low';

  return 'Unknown';
}

// Get numeric value for risk sorting (lower = higher priority)
export function getRiskSortOrder(severity?: string): number {
  const norm = severity?.toLowerCase();

  if (norm === 'major') return 1;
  if (norm === 'moderate') return 2;
  if (norm === 'minor') return 3;
  if (norm === 'monitor') return 4;

  return 999;
}

// Get color classes for risk level
export function getRiskColor(severity?: string): { bg: string; border: string; text: string } {
  const norm = severity?.toLowerCase();

  if (norm === 'major') {
    return {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800'
    };
  }

  if (norm === 'moderate') {
    return {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800'
    };
  }

  if (norm === 'minor' || norm === 'monitor') {
    return {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800'
    };
  }

  return {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-800'
  };
}
