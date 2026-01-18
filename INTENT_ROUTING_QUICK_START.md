# Intent Routing Quick Start Guide

## Testing the Implementation

### 1. Test URLs (Copy and paste into browser)

**Should Match and Show Intent Banner:**
```
/search?q=evening+primrose+oil+seizure+risk
/search?q=EPO+antipsychotic+seizure+threshold
/search?q=GLA+epilepsy+caution
/search?q=primrose+oil+convulsions
/search?q=gamma-linolenic+acid+phenothiazine+seizure
```

**Should NOT Match (Normal Search):**
```
/search?q=evening+primrose+oil+benefits
/search?q=epilepsy+magnesium+supplement
/search?q=phenothiazine+side+effects
/search?q=vitamin+d+calcium
```

### 2. Expected Behavior

**When Intent Matches:**
1. Blue banner appears at top of search page
2. Banner shows: "Related Safety Topic Found"
3. Two buttons visible:
   - "View Safety Page" (blue, primary)
   - "See All Results" (white, secondary)
4. After 800ms: Auto-redirects to safety page (unless user moves mouse/clicks/types)
5. Search results may still load below banner

**When Intent Does NOT Match:**
1. No banner shown
2. Normal search results displayed
3. Standard search experience

### 3. User Interaction Testing

**Test Auto-Redirect:**
1. Visit: `/search?q=evening+primrose+oil+seizure`
2. Don't move mouse or click
3. After 800ms: Should auto-redirect to safety page

**Test Interaction Cancels Redirect:**
1. Visit: `/search?q=evening+primrose+oil+seizure`
2. Move mouse immediately
3. No auto-redirect occurs
4. User can choose "View Safety Page" or "See All Results"

**Test Dismiss:**
1. Visit: `/search?q=EPO+seizure+epilepsy`
2. Click "See All Results"
3. Banner disappears
4. Normal search results remain

### 4. Related Topics Links

**From Evening Primrose Safety Page:**

Scroll to "Related Safety Topics" section and click any link:
- "Evening Primrose Oil and Seizure Threshold"
- "GLA and Epilepsy Caution"
- "Phenothiazines Seizure Risk"
- "Antipsychotic Supplements Interaction"

Each should:
1. Navigate to `/search?q=...`
2. Trigger intent detection
3. Show banner
4. Allow navigation to safety page

### 5. Analytics Verification

**Google Analytics (if configured):**

Open browser console, then search for matching query. You should see:
```javascript
gtag('event', 'intent_match', {
  intent: 'epo_seizure_caution',
  score: 12,
  matched_terms_count: 3,
  query_length: 35
})
```

**Development Mode:**

Set `NODE_ENV=development` and search. Console will show:
```javascript
[Intent Match] {
  intent: 'epo_seizure_caution',
  score: 12,
  matched: ['evening primrose oil', 'seizure', 'epilepsy'],
  query: 'evening primrose oil seizure risk'
}
```

## Scoring Reference

### Minimum Requirements for Match
- Total score >= 8
- At least one EPO/GLA term present
- At least one seizure-related term present

### Point Values
| Term Type | Examples | Points |
|-----------|----------|--------|
| EPO | evening primrose oil, primrose oil, epo | +4 |
| GLA | gamma-linolenic acid, gla | +3 |
| Seizure | seizure, convulsion | +4 |
| Epilepsy | epilepsy, epileptic | +4 |
| Phenothiazine | phenothiazine, phenothiazines | +4 |
| Antipsychotic | antipsychotic, neuroleptic | +3 |
| Seizure Threshold | seizure threshold, lower threshold | +3 |

### Example Calculations

**"epo seizure"** = 4 + 4 = 8 ✓ MATCH
**"gla epilepsy"** = 3 + 4 = 7 ✗ NO MATCH (score too low)
**"gla epilepsy caution"** = 3 + 4 = 7 ✗ NO MATCH (needs more context)
**"evening primrose oil seizure"** = 4 + 4 = 8 ✓ MATCH
**"epo antipsychotic seizure threshold"** = 4 + 3 + 4 + 3 = 14 ✓ MATCH

## SEO Verification

### Check Canonical Tags

**Evening Primrose Safety Page:**
```html
<link rel="canonical" href="https://supplementsafetybible.com/evening-primrose-oil-seizure-risk-epilepsy-phenothiazines" />
<meta name="robots" content="index,follow" />
```

**Search Page:**
```html
<link rel="canonical" href="https://supplementsafetybible.com/search" />
<meta name="robots" content="noindex,follow" />
```

View page source or use browser dev tools to verify.

### Sitemap Verification

Check that safety page is in sitemap:
```bash
curl https://supplementsafetybible.com/sitemap.xml | grep evening-primrose
```

Should return:
```xml
<loc>https://supplementsafetybible.com/evening-primrose-oil-seizure-risk-epilepsy-phenothiazines</loc>
```

## Common Issues & Solutions

### Issue: Banner doesn't appear
**Solution**: Check browser console for errors. Verify query param is present in URL.

### Issue: Auto-redirect happens too fast
**Solution**: This is by design. Move mouse to cancel redirect and show banner.

### Issue: Intent doesn't match expected query
**Solution**: Check scoring rules. Query may need additional context terms to reach score >= 8.

### Issue: Analytics events not firing
**Solution**: Verify Google Analytics is configured. Check for `gtag` function in window object.

## Query Param Aliases

All of these work:
- `/search?q=epo+seizure`
- `/search?query=epo+seizure`
- `/search?term=epo+seizure`
- `/search?s=epo+seizure`

## Mobile Testing

Intent routing works on mobile. Test on:
- iOS Safari
- Android Chrome
- Mobile responsive mode in browser dev tools

Banner should be responsive and buttons should be tappable.

## Performance Check

Intent matching should be near-instantaneous:
1. Open browser dev tools
2. Go to Performance tab
3. Record page load
4. Navigate to `/search?q=evening+primrose+oil+seizure`
5. Stop recording
6. Intent detection should take <5ms

## Adding New Intents

To add a new intent (e.g., "warfarin_ginkgo_caution"):

1. **Update `intentMatcher.ts`:**
```typescript
const synonyms = {
  // existing...
  warfarin: ['warfarin', 'coumadin'],
  ginkgo: ['ginkgo', 'ginkgo biloba'],
};
```

2. **Add scoring:**
```typescript
const warfarinMatches = findMatches(normalized, synonyms.warfarin);
if (warfarinMatches.length > 0) {
  matched.push(...warfarinMatches);
  score += 4;
  hasWarfarin = true;
}
```

3. **Add intent condition:**
```typescript
if (score >= 8 && hasWarfarin && hasGinkgo) {
  return { intent: 'warfarin_ginkgo_caution', score, matched };
}
```

4. **Update Search.tsx:**
```typescript
if (match.intent === 'warfarin_ginkgo_caution') {
  navigate('/safety/warfarin-ginkgo-interaction?from=search');
}
```

5. **Add tests in `intentMatcher.test.ts`**

---

**Quick Test Command:**

Paste this in browser console to test matcher directly:
```javascript
import { matchIntent } from './lib/intentMatcher';
console.log(matchIntent('evening primrose oil seizure risk'));
// Expected: { intent: 'epo_seizure_caution', score: 12, matched: [...] }
```

**Pro Tip:** Use Network tab in DevTools to verify redirect behavior and timing.
