# Intent Routing Test Queries

## Category 1: MUST MATCH ✓

These queries should trigger the intent banner and auto-redirect:

### Full Context Queries
```
/search?q=evening+primrose+oil+seizure+risk+phenothiazines+epilepsy+caution
/search?q=evening+primrose+oil+and+seizure+risk+in+epilepsy+patients
/search?q=gamma-linolenic+acid+seizure+threshold+phenothiazine+interaction
```

### Abbreviated Queries
```
/search?q=EPO+seizure+risk
/search?q=EPO+epilepsy+caution
/search?q=EPO+antipsychotic+seizure+threshold
/search?q=EPO+phenothiazine+interaction
```

### GLA Queries
```
/search?q=GLA+epilepsy+caution
/search?q=GLA+seizure+threshold
/search?q=gamma+linolenic+acid+epilepsy
/search?q=GLA+and+seizures
```

### Synonym Variations
```
/search?q=primrose+oil+convulsions
/search?q=primrose+oil+epileptic+seizures
/search?q=evening+primrose+convulsion+risk
/search?q=primrose+oil+epilepsy
```

### Neuroleptic/Antipsychotic Variations
```
/search?q=EPO+neuroleptic+seizure
/search?q=evening+primrose+oil+antipsychotic+seizure
/search?q=primrose+oil+neuroleptic+interaction
/search?q=GLA+antipsychotics+seizure+risk
```

### Seizure Threshold Queries
```
/search?q=evening+primrose+lower+seizure+threshold
/search?q=EPO+seizure+threshold+concern
/search?q=GLA+affect+seizure+threshold
/search?q=primrose+oil+threshold+epilepsy
```

### Medical Context Queries
```
/search?q=can+evening+primrose+oil+cause+seizures
/search?q=is+EPO+safe+for+epilepsy
/search?q=evening+primrose+oil+epilepsy+warning
/search?q=should+epileptics+avoid+primrose+oil
```

## Category 2: MUST NOT MATCH ✗

These queries should show normal search results (no intent banner):

### EPO Benefits (No Risk Terms)
```
/search?q=evening+primrose+oil+benefits
/search?q=EPO+for+skin+health
/search?q=evening+primrose+oil+dosage
/search?q=primrose+oil+hormone+balance
/search?q=evening+primrose+oil+pms
```

### Epilepsy with Different Supplements
```
/search?q=epilepsy+magnesium+supplement
/search?q=epilepsy+vitamin+D
/search?q=seizure+omega+3
/search?q=epileptic+patients+calcium
```

### Phenothiazine Side Effects (Not Interaction)
```
/search?q=phenothiazine+side+effects
/search?q=phenothiazine+dry+mouth
/search?q=phenothiazine+mechanism+of+action
/search?q=phenothiazines+list
```

### Generic Seizure Queries
```
/search?q=seizure+medication
/search?q=epilepsy+treatment
/search?q=anti+seizure+drugs
/search?q=seizure+disorders
```

### Unrelated Interactions
```
/search?q=vitamin+d+calcium+interaction
/search?q=warfarin+ginkgo+biloba
/search?q=st+johns+wort+antidepressants
/search?q=fish+oil+blood+thinners
```

### GLA Benefits (No Risk)
```
/search?q=GLA+benefits
/search?q=gamma+linolenic+acid+inflammation
/search?q=GLA+supplements+for+arthritis
```

## Category 3: EDGE CASES

### Case Sensitivity
```
/search?q=EVENING+PRIMROSE+OIL+SEIZURE+RISK
/search?q=epo+Seizure+Epilepsy
/search?q=Gla+EpIlEpSy+CaUtIoN
```
**Expected**: All should match (case insensitive)

### Extra Punctuation & Spacing
```
/search?q=EPO!!!+seizure+risk???
/search?q=evening++primrose+++oil+seizure
/search?q=epo,+seizure,+epilepsy
/search?q=EPO...+seizure...+risk...
```
**Expected**: All should match (punctuation normalized)

### Partial Matches (Insufficient Score)
```
/search?q=EPO+benefits
/search?q=seizure+medications
/search?q=evening+primrose+oil
/search?q=epilepsy+supplements
```
**Expected**: None should match (missing required term combinations)

### Very Short Queries
```
/search?q=epo
/search?q=seizure
/search?q=epilepsy
/search?q=gla
```
**Expected**: None should match (insufficient context)

### Natural Language Questions
```
/search?q=can+I+take+evening+primrose+oil+if+I+have+epilepsy
/search?q=is+epo+dangerous+for+seizure+patients
/search?q=does+primrose+oil+interact+with+phenothiazines
/search?q=what+are+the+risks+of+epo+with+antipsychotics
```
**Expected**: All should match (contains required terms)

## Category 4: BOUNDARY CASES

### Minimum Score Threshold
```
/search?q=epo+seizure
```
**Expected**: MATCH (score = 8, exactly at threshold)

```
/search?q=gla+seizure
```
**Expected**: NO MATCH (score = 7, below threshold)

```
/search?q=gla+epilepsy
```
**Expected**: NO MATCH (score = 7, below threshold)

```
/search?q=evening+primrose+oil+seizure
```
**Expected**: MATCH (score = 8, at threshold)

### Multiple Drug Classes
```
/search?q=epo+phenothiazine+antipsychotic+seizure
```
**Expected**: MATCH (score = 14, well above threshold)

### Compound Terms
```
/search?q=epo+lower+seizure+threshold+epilepsy
```
**Expected**: MATCH (includes "seizure threshold" phrase + other terms)

## Category 5: REAL USER QUERIES

Simulated actual search behavior:

### From Medical Professional
```
/search?q=evening+primrose+oil+contraindications+epilepsy
/search?q=EPO+supplement+safety+antipsychotic+patients
/search?q=gla+seizure+risk+assessment
```
**Expected**: All should match

### From Concerned Patient
```
/search?q=can+evening+primrose+cause+seizure
/search?q=primrose+oil+safe+with+epilepsy+medication
/search?q=is+epo+ok+for+seizure+disorder
```
**Expected**: All should match

### From Caregiver
```
/search?q=evening+primrose+oil+epilepsy+interactions
/search?q=supplements+to+avoid+epilepsy
```
**Expected**: First should match, second should NOT (no EPO/GLA term)

## Scoring Examples

### High Score Queries (14-19 points)
```
/search?q=evening+primrose+oil+gla+seizure+epilepsy+phenothiazine
Score: 4 (epo) + 3 (gla) + 4 (seizure) + 4 (epilepsy) + 4 (phenothiazine) = 19
```

### Threshold Queries (8 points)
```
/search?q=epo+seizure
Score: 4 (epo) + 4 (seizure) = 8
```

```
/search?q=evening+primrose+oil+epilepsy
Score: 4 (epo) + 4 (epilepsy) = 8
```

### Below Threshold (7 points)
```
/search?q=gla+seizure
Score: 3 (gla) + 4 (seizure) = 7 ✗
```

```
/search?q=primrose+oil+threshold
Score: 4 (epo) + 3 (threshold) = 7 ✗
Note: "threshold" alone doesn't count as seizure-related without "seizure"
```

## Test Matrix

| Query | EPO/GLA | Seizure Related | Score | Match |
|-------|---------|-----------------|-------|-------|
| epo seizure | ✓ | ✓ | 8 | ✓ |
| gla epilepsy | ✓ | ✓ | 7 | ✗ |
| evening primrose oil | ✓ | ✗ | 4 | ✗ |
| seizure threshold | ✗ | ✓ | 7 | ✗ |
| epo convulsion | ✓ | ✓ | 8 | ✓ |
| primrose oil epileptic | ✓ | ✓ | 8 | ✓ |
| gla antipsychotic seizure | ✓ | ✓ | 10 | ✓ |

## Quick Copy-Paste Test Suite

Open these URLs in new tabs (replace `localhost:5173` with your domain):

```
# SHOULD MATCH
http://localhost:5173/search?q=evening+primrose+oil+seizure+risk
http://localhost:5173/search?q=EPO+antipsychotic+seizure+threshold
http://localhost:5173/search?q=GLA+epilepsy+caution
http://localhost:5173/search?q=primrose+oil+convulsions

# SHOULD NOT MATCH
http://localhost:5173/search?q=evening+primrose+oil+benefits
http://localhost:5173/search?q=epilepsy+magnesium+supplement
http://localhost:5173/search?q=vitamin+d+calcium
```

## Automated Testing

To run automated tests:

```bash
# If using Jest/Vitest
npm test src/lib/intentMatcher.test.ts

# Manual test runner
npx ts-node src/lib/intentMatcher.manual-test.ts
```

## Browser Console Quick Test

Paste in console to test individual queries:

```javascript
// Test function
function testQuery(query) {
  const result = matchIntent(query);
  console.log({
    query,
    intent: result.intent,
    score: result.score,
    matched: result.matched,
    willMatch: result.intent === 'epo_seizure_caution' ? '✓' : '✗'
  });
}

// Run tests
testQuery('evening primrose oil seizure risk');
testQuery('EPO antipsychotic seizure threshold');
testQuery('evening primrose oil benefits');
```

---

**QA Checklist:**

- [ ] Test 10+ positive queries (should match)
- [ ] Test 10+ negative queries (should NOT match)
- [ ] Test edge cases (punctuation, case, spacing)
- [ ] Test auto-redirect behavior (wait 800ms)
- [ ] Test user interaction cancels redirect
- [ ] Test "View Safety Page" button
- [ ] Test "See All Results" button
- [ ] Verify analytics events fire
- [ ] Check related topics links work
- [ ] Verify mobile responsive behavior
