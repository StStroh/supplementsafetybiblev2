/**
 * Client-side normalization matching database norm_token() function
 *
 * Database logic:
 * 1. Convert to lowercase
 * 2. Trim whitespace
 * 3. Remove special chars (except word chars, spaces, hyphens)
 * 4. Replace multiple spaces with single space
 */
export function normalizeToken(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars except word chars, spaces, hyphens
    .replace(/\s+/g, ' ')     // Replace multiple spaces with single space
    .trim();
}

/**
 * Match input against substances using normalized token matching
 */
export function findSubstanceByToken(
  input: string,
  substances: Array<{ substance_id: string; display_name: string; canonical_name: string; aliases: string[] }>
): { substance_id: string; display_name: string; canonical_name: string; aliases: string[] } | null {
  const normalized = normalizeToken(input);

  if (!normalized) return null;

  return substances.find(s => {
    const tokens = [
      normalizeToken(s.display_name),
      normalizeToken(s.canonical_name),
      ...s.aliases.map(alias => normalizeToken(alias))
    ];

    return tokens.some(token => token === normalized);
  }) || null;
}
