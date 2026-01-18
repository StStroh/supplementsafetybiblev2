/**
 * Safe substance display helpers
 * Prevents crashes from undefined substance objects
 */

interface SubstanceObject {
  name?: string;
  display_name?: string;
  id?: string | null;
  type?: string;
}

/**
 * Safely get a display label for a substance
 * Handles undefined/null substances gracefully
 *
 * @param substance - The substance object (may be undefined/null)
 * @param fallback - Optional fallback text if substance is missing
 * @returns Safe display string
 */
export function getSubstanceLabel(
  substance?: SubstanceObject | null,
  fallback?: string
): string {
  if (!substance) {
    return fallback || 'Unknown substance';
  }

  // Prefer display_name, then name, then fallback
  return substance.display_name || substance.name || fallback || 'Unknown substance';
}

/**
 * Safely get substance type
 *
 * @param substance - The substance object (may be undefined/null)
 * @returns Safe type string
 */
export function getSubstanceType(
  substance?: SubstanceObject | null
): string {
  return substance?.type || 'unknown';
}

/**
 * Check if a substance object is valid (has required fields)
 *
 * @param substance - The substance object to check
 * @returns true if substance is valid
 */
export function isValidSubstance(
  substance?: SubstanceObject | null
): boolean {
  return !!(substance && (substance.name || substance.display_name));
}

/**
 * Create a placeholder substance for unknown inputs
 * Use this when user input doesn't match any substance in DB
 *
 * @param rawInput - The user's raw input text
 * @returns Placeholder substance object
 */
export function createPlaceholderSubstance(rawInput: string): SubstanceObject & { isUnknown: true } {
  return {
    id: null,
    name: rawInput,
    display_name: rawInput,
    type: 'unknown',
    isUnknown: true,
  };
}

/**
 * Safely format interaction pair display
 *
 * @param substanceA - First substance
 * @param substanceB - Second substance
 * @returns Formatted string like "Vitamin D + Calcium"
 */
export function formatInteractionPair(
  substanceA?: SubstanceObject | null,
  substanceB?: SubstanceObject | null
): string {
  const labelA = getSubstanceLabel(substanceA, 'Unknown');
  const labelB = getSubstanceLabel(substanceB, 'Unknown');
  return `${labelA} + ${labelB}`;
}
