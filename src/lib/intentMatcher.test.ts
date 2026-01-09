import { matchIntent } from './intentMatcher';

describe('Intent Matcher', () => {
  describe('EPO Seizure Caution Intent', () => {
    it('should match: evening primrose oil seizure risk phenothiazines epilepsy caution', () => {
      const result = matchIntent('evening primrose oil seizure risk phenothiazines epilepsy caution');
      expect(result.intent).toBe('epo_seizure_caution');
      expect(result.score).toBeGreaterThanOrEqual(8);
      expect(result.matched.length).toBeGreaterThan(0);
    });

    it('should match: EPO antipsychotic seizure threshold', () => {
      const result = matchIntent('EPO antipsychotic seizure threshold');
      expect(result.intent).toBe('epo_seizure_caution');
      expect(result.score).toBeGreaterThanOrEqual(8);
    });

    it('should match: GLA epilepsy caution', () => {
      const result = matchIntent('GLA epilepsy caution');
      expect(result.intent).toBe('epo_seizure_caution');
      expect(result.score).toBeGreaterThanOrEqual(8);
    });

    it('should match: primrose oil convulsions', () => {
      const result = matchIntent('primrose oil convulsions');
      expect(result.intent).toBe('epo_seizure_caution');
      expect(result.score).toBeGreaterThanOrEqual(8);
    });

    it('should match: evening primrose epileptic seizures', () => {
      const result = matchIntent('evening primrose epileptic seizures');
      expect(result.intent).toBe('epo_seizure_caution');
      expect(result.score).toBeGreaterThanOrEqual(8);
    });

    it('should match: gamma-linolenic acid seizure threshold phenothiazine', () => {
      const result = matchIntent('gamma-linolenic acid seizure threshold phenothiazine');
      expect(result.intent).toBe('epo_seizure_caution');
      expect(result.score).toBeGreaterThanOrEqual(8);
    });

    it('should match: epo neuroleptic seizure', () => {
      const result = matchIntent('epo neuroleptic seizure');
      expect(result.intent).toBe('epo_seizure_caution');
      expect(result.score).toBeGreaterThanOrEqual(8);
    });
  });

  describe('Should NOT match', () => {
    it('should NOT match: evening primrose oil benefits skin', () => {
      const result = matchIntent('evening primrose oil benefits skin');
      expect(result.intent).toBeNull();
    });

    it('should NOT match: epilepsy magnesium supplement', () => {
      const result = matchIntent('epilepsy magnesium supplement');
      expect(result.intent).toBeNull();
    });

    it('should NOT match: phenothiazine side effects dry mouth', () => {
      const result = matchIntent('phenothiazine side effects dry mouth');
      expect(result.intent).toBeNull();
    });

    it('should NOT match: seizure medication', () => {
      const result = matchIntent('seizure medication');
      expect(result.intent).toBeNull();
    });

    it('should NOT match: evening primrose oil dosage', () => {
      const result = matchIntent('evening primrose oil dosage');
      expect(result.intent).toBeNull();
    });

    it('should NOT match: GLA benefits', () => {
      const result = matchIntent('GLA benefits');
      expect(result.intent).toBeNull();
    });

    it('should NOT match: antipsychotic medications list', () => {
      const result = matchIntent('antipsychotic medications list');
      expect(result.intent).toBeNull();
    });

    it('should NOT match: empty string', () => {
      const result = matchIntent('');
      expect(result.intent).toBeNull();
      expect(result.score).toBe(0);
    });

    it('should NOT match: unrelated search', () => {
      const result = matchIntent('vitamin d calcium interaction');
      expect(result.intent).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null input', () => {
      const result = matchIntent(null as any);
      expect(result.intent).toBeNull();
      expect(result.score).toBe(0);
      expect(result.matched).toEqual([]);
    });

    it('should handle undefined input', () => {
      const result = matchIntent(undefined as any);
      expect(result.intent).toBeNull();
      expect(result.score).toBe(0);
    });

    it('should normalize punctuation and spacing', () => {
      const result = matchIntent('EPO!!!  seizure   threshold???  epilepsy');
      expect(result.intent).toBe('epo_seizure_caution');
    });

    it('should be case insensitive', () => {
      const result = matchIntent('EVENING PRIMROSE OIL SEIZURE EPILEPSY');
      expect(result.intent).toBe('epo_seizure_caution');
    });
  });

  describe('Scoring Rules', () => {
    it('should return matched terms', () => {
      const result = matchIntent('evening primrose oil seizure epilepsy');
      expect(result.matched).toContain('evening primrose oil');
      expect(result.matched.length).toBeGreaterThan(0);
    });

    it('should calculate correct score', () => {
      const result = matchIntent('epo seizure');
      expect(result.score).toBe(8); // 4 for EPO + 4 for seizure
      expect(result.intent).toBe('epo_seizure_caution');
    });

    it('should require both EPO/GLA AND seizure-related terms', () => {
      const result1 = matchIntent('evening primrose oil benefits');
      expect(result1.intent).toBeNull();

      const result2 = matchIntent('seizure threshold medication');
      expect(result2.intent).toBeNull();
    });

    it('should score high with multiple matches', () => {
      const result = matchIntent('evening primrose oil gla epilepsy seizure phenothiazine');
      expect(result.score).toBeGreaterThan(10);
      expect(result.intent).toBe('epo_seizure_caution');
    });
  });

  describe('Synonym Recognition', () => {
    it('should recognize "primrose oil" as EPO synonym', () => {
      const result = matchIntent('primrose oil seizure');
      expect(result.matched).toContain('primrose oil');
      expect(result.intent).toBe('epo_seizure_caution');
    });

    it('should recognize "convulsion" as seizure synonym', () => {
      const result = matchIntent('evening primrose oil convulsion');
      expect(result.matched).toContain('convulsion');
      expect(result.intent).toBe('epo_seizure_caution');
    });

    it('should recognize "neuroleptic" as antipsychotic synonym', () => {
      const result = matchIntent('epo neuroleptic seizure');
      expect(result.matched).toContain('neuroleptic');
      expect(result.intent).toBe('epo_seizure_caution');
    });

    it('should recognize "epileptic" as epilepsy synonym', () => {
      const result = matchIntent('epo epileptic seizure');
      expect(result.matched).toContain('epileptic');
      expect(result.intent).toBe('epo_seizure_caution');
    });
  });
});
