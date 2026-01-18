export interface IntentMatch {
  intent: string | null;
  score: number;
  matched: string[];
}

interface SynonymDict {
  [key: string]: string[];
}

const synonyms: SynonymDict = {
  epo: ['evening primrose oil', 'primrose oil', 'epo'],
  gla: ['gamma linolenic acid', 'gamma-linolenic acid', 'gla'],
  seizure: ['seizure', 'seizures', 'convulsion', 'convulsions'],
  epilepsy: ['epilepsy', 'epileptic'],
  phenothiazine: ['phenothiazine', 'phenothiazines'],
  antipsychotic: ['antipsychotic', 'antipsychotics', 'neuroleptic', 'neuroleptics'],
  seizureThreshold: ['seizure threshold', 'lower seizure threshold', 'threshold'],
};

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ');
}

function findMatches(normalized: string, termList: string[]): string[] {
  const matches: string[] = [];
  for (const term of termList) {
    if (normalized.includes(term)) {
      matches.push(term);
    }
  }
  return matches;
}

export function matchIntent(input: string): IntentMatch {
  if (!input || typeof input !== 'string') {
    return { intent: null, score: 0, matched: [] };
  }

  const normalized = normalizeText(input);
  const matched: string[] = [];
  let score = 0;

  let hasEpoOrGla = false;
  let hasSeizureOrEpilepsyOrThreshold = false;

  const epoMatches = findMatches(normalized, synonyms.epo);
  if (epoMatches.length > 0) {
    matched.push(...epoMatches);
    score += 4;
    hasEpoOrGla = true;
  }

  const glaMatches = findMatches(normalized, synonyms.gla);
  if (glaMatches.length > 0) {
    matched.push(...glaMatches);
    score += 3;
    hasEpoOrGla = true;
  }

  const seizureMatches = findMatches(normalized, synonyms.seizure);
  if (seizureMatches.length > 0) {
    matched.push(...seizureMatches);
    score += 4;
    hasSeizureOrEpilepsyOrThreshold = true;
  }

  const epilepsyMatches = findMatches(normalized, synonyms.epilepsy);
  if (epilepsyMatches.length > 0) {
    matched.push(...epilepsyMatches);
    score += 4;
    hasSeizureOrEpilepsyOrThreshold = true;
  }

  const phenothiazineMatches = findMatches(normalized, synonyms.phenothiazine);
  if (phenothiazineMatches.length > 0) {
    matched.push(...phenothiazineMatches);
    score += 4;
  }

  const antipsychoticMatches = findMatches(normalized, synonyms.antipsychotic);
  if (antipsychoticMatches.length > 0) {
    matched.push(...antipsychoticMatches);
    score += 3;
  }

  const thresholdMatches = findMatches(normalized, synonyms.seizureThreshold);
  if (thresholdMatches.length > 0) {
    matched.push(...thresholdMatches);
    score += 3;
    hasSeizureOrEpilepsyOrThreshold = true;
  }

  const intent =
    score >= 8 && hasEpoOrGla && hasSeizureOrEpilepsyOrThreshold
      ? 'epo_seizure_caution'
      : null;

  return {
    intent,
    score,
    matched,
  };
}
