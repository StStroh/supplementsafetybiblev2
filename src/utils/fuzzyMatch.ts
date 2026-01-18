/**
 * Simple Levenshtein distance calculation for fuzzy matching
 */
export function levenshteinDistance(a: string, b: string): number {
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  const matrix: number[][] = [];

  for (let i = 0; i <= bLen; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= aLen; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= bLen; i++) {
    for (let j = 1; j <= aLen; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[bLen][aLen];
}

/**
 * Calculate fuzzy match score (0-100, higher is better)
 */
export function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase().trim();

  // Exact match
  if (q === t) return 100;

  // Starts with
  if (t.startsWith(q)) return 90;

  // Contains
  if (t.includes(q)) return 80;

  // Levenshtein-based score
  const distance = levenshteinDistance(q, t);
  const maxLen = Math.max(q.length, t.length);
  const similarity = 1 - distance / maxLen;

  return Math.floor(similarity * 70); // Max 70 for fuzzy matches
}

/**
 * Get fuzzy matches sorted by score
 */
export function getFuzzyMatches<T>(
  query: string,
  items: T[],
  getName: (item: T) => string,
  minScore: number = 40,
  limit: number = 5
): T[] {
  const scored = items
    .map(item => ({
      item,
      score: fuzzyScore(query, getName(item))
    }))
    .filter(x => x.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(x => x.item);
}
