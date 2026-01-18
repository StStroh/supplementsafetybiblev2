# Interaction Checker V2 - Testing Guide

## Overview

Phase 1 of the world-class interaction checker is complete. This guide walks you through testing all features and states.

## What Was Built

### Database
- **Tables Created:**
  - `checker_substances` - 30 substances (drugs + supplements)
  - `checker_interactions` - 26 interactions across all severities
- **Seeded Data:**
  - 12 drugs (Warfarin, Aspirin, Sertraline, etc.)
  - 18 supplements (Ginkgo, St. John's Wort, Fish Oil, etc.)
  - Interactions covering: avoid, caution, monitor, info severities

### API Endpoints
- `/.netlify/functions/checker-autocomplete` - Search substances
- `/.netlify/functions/checker-stack` - Check multiple substance pairs

### Frontend
- **StackBuilderChecker** component with:
  - Chip-based input for supplements and medications
  - Real-time autocomplete search
  - Keyboard navigation (Arrow keys, Enter, Backspace)
  - Severity-grouped results
  - Expandable detail sections
  - Loading, error, and empty states

### Route
- **/check** - New world-class checker (replaces old)
- **/check-old** - Original checker (preserved)

---

## Testing Steps

### 1. Open the Checker

```
http://localhost:5173/check
```

**Expected:**
- Clean page with "Interaction Checker" heading
- Two sections: "Supplements" (purple) and "Medications" (cyan)
- Each section has a search input
- "Run Check" button is disabled with helper text

---

### 2. Test Autocomplete - Supplements

**Type in Supplements field:** `gin`

**Expected:**
- Dropdown appears with suggestions:
  - Ginkgo Biloba
  - Ginseng
- Shows "Also known as" aliases
- First result highlighted

**Keyboard Test:**
- Press ↓ → Highlights second result (Ginseng)
- Press ↑ → Highlights first result (Ginkgo)
- Press Enter → Adds "Ginkgo Biloba" as purple chip

**Mouse Test:**
- Type `st john`
- Click "St. John's Wort" in dropdown
- Chip appears with X button

---

### 3. Test Autocomplete - Medications

**Type in Medications field:** `war`

**Expected:**
- Dropdown shows "Warfarin"
- Shows aliases: coumadin, jantoven

**Press Enter** → Adds "Warfarin" as cyan chip

---

### 4. Test Chip Removal

**With chips added:**
- Click X on "Ginkgo Biloba" chip → Chip disappears
- Add it back
- Click in Supplements input, press Backspace when input is empty → Removes last chip

---

### 5. Run Check - High Risk Interaction

**Add:**
- Supplement: "St. John's Wort"
- Medication: "Sertraline" (type `ser` and select)

**Click "Run Check"**

**Expected:**
1. Button shows "Checking..." with spinner
2. Loading state appears (blue card, spinner, "Checking interactions...")
3. After ~1-2 seconds, results appear

**Results:**
- Summary: "Checked 1 interaction"
- "Worst Severity" indicator
- Grouped by severity: "**Avoid** (1)" section in RED
- Result card shows:
  - "St. John's Wort + Sertraline"
  - "Severe risk of serotonin syndrome"
  - Red border and background
  - Expand button (chevron)

**Click Expand:**
- Shows Mechanism, Clinical Effect, Management
- Shows Evidence Grade and Confidence
- Shows Citations with clickable links

---

### 6. Test Multiple Interactions

**Add More Items:**
- Keep St. John's Wort and Sertraline
- Add Supplement: "Ginkgo"
- Add Supplement: "Vitamin K"

**Click "Run Check"**

**Expected:**
- Summary: "Checked 6 interactions"
- Results grouped by severity:
  - **Caution** section (yellow/orange)
  - **Monitor** section (blue)
  - **No Interaction** section (green)

**Verify Grouping:**
- Ginkgo + Sertraline → Probably "No Interaction" (green)
- St. John's Wort + Sertraline → "Avoid" (red)
- St. John's Wort + Ginkgo → Check if present
- Vitamin K + others → Check results

---

### 7. Test "Caution" Severity

**Clear all chips, then add:**
- Supplement: "Ginkgo"
- Medication: "Warfarin"

**Run Check**

**Expected:**
- **Caution** section (orange/amber background)
- "Increased bleeding risk when combining warfarin with ginkgo"
- Management advice about monitoring INR

---

### 8. Test "Monitor" Severity

**Clear all, then add:**
- Supplement: "Vitamin K"
- Medication: "Warfarin"

**Run Check**

**Expected:**
- **Monitor** section (blue background)
- "Vitamin K antagonizes warfarin effects"
- Guidance about maintaining consistent vitamin K intake

---

### 9. Test "Info" Severity (Beneficial)

**Clear all, then add:**
- Supplement: "Vitamin C"
- Supplement: "Iron"

**Run Check**

**Expected:**
- **Info** section (purple/lavender background)
- "Vitamin C enhances iron absorption"
- Marked as beneficial interaction

---

### 10. Test "No Interactions" State

**Clear all, then add:**
- Supplement: "Magnesium"
- Supplement: "Zinc"
- Supplement: "Vitamin D"

**Run Check**

**Expected:**
- Mostly **No Interaction** sections (green)
- "No known interactions found between these substances"
- Clean, simple display

---

### 11. Test Error State

**Temporarily break the API:**
- Stop Netlify Dev (Ctrl+C in terminal)
- Add substances and click "Run Check"

**Expected:**
- Red error card appears
- "Error" heading with warning icon
- Error message displayed
- "Retry" button visible

**Restore:**
- Restart: `npm run netlify:dev`
- Click "Retry" → Should work

---

### 12. Test Edge Cases

**Empty Stack:**
- Remove all chips
- "Run Check" button stays disabled
- Helper text: "Add at least 2 items to run a check"

**Single Item:**
- Add only "Ginkgo"
- Button still disabled
- Helper text remains

**Duplicate Prevention:**
- Add "Ginkgo"
- Try to add "Ginkgo" again (type and select)
- Should not create duplicate chip

**Long Stack:**
- Add 5+ items
- Check that all pairs are checked
- Summary shows correct total: (N × (N-1)) / 2 pairs

---

### 13. Test Keyboard Navigation Full Flow

1. **Tab to Supplements field**
2. **Type** `fish`
3. **Press ↓** twice → Navigate to "Fish Oil"
4. **Press Enter** → Adds chip
5. **Tab to Medications field**
6. **Type** `asp`
7. **Press Enter** → Adds "Aspirin"
8. **Tab to "Run Check" button**
9. **Press Enter** → Runs check
10. **Verify** results load

---

### 14. Test Search Aliases

**Test that aliases work:**
- Type `prozac` → Should find "Fluoxetine"
- Type `zoloft` → Should find "Sertraline"
- Type `omega` → Should find "Fish Oil"
- Type `coq10` → Should find "CoQ10"
- Type `curcumin` → Should find "Turmeric"

---

### 15. Test Realistic Clinical Scenario

**Scenario: Patient on multiple medications**

**Add:**
1. Medication: "Levothyroxine" (thyroid)
2. Medication: "Omeprazole" (acid reducer)
3. Supplement: "Iron"
4. Supplement: "Calcium"

**Run Check**

**Expected Interactions:**
- Levothyroxine + Iron → **Monitor** (separate by 4 hours)
- Levothyroxine + Calcium → **Monitor** (separate by 4 hours)
- Omeprazole + Iron → **Monitor** (reduced absorption)
- Iron + Calcium → **Monitor** (competition for absorption)
- Others → No interactions

**Verify:**
- Results are clinically accurate
- Management recommendations are present
- User can expand for detailed guidance

---

### 16. Verify Data Integrity

**Check Substance Counts:**
```bash
# In browser console at /check
fetch('/.netlify/functions/checker-autocomplete?q=a')
  .then(r => r.json())
  .then(d => console.log(d.results.length + ' substances found'))
```

**Check Interaction Counts:**
- Add many substances (6-8 items)
- Run check
- Verify summary shows correct pair count
- Verify results match expected interactions

---

### 17. Test All Severity Levels in One Check

**Add These Items:**
1. Supplement: "St. John's Wort"
2. Supplement: "Ginkgo"
3. Supplement: "Fish Oil"
4. Supplement: "Vitamin K"
5. Medication: "Warfarin"
6. Medication: "Sertraline"

**Run Check**

**Expected Severity Distribution:**
- **Avoid**: St. John's Wort + Sertraline
- **Caution**: Warfarin + Ginkgo, Warfarin + Fish Oil
- **Monitor**: Warfarin + Vitamin K
- **No Interaction**: Various safe pairs

**Verify:**
- Results grouped correctly
- Worst severity highlighted in summary
- Count badges accurate

---

### 18. Visual & UX Checks

**Verify Design:**
- ✅ Purple theme consistent throughout
- ✅ Supplement chips are purple (#7c3aed)
- ✅ Medication chips are cyan (#0891b2)
- ✅ Severity colors match config:
  - Avoid: Red (#EF5350)
  - Caution: Orange (#FFA726)
  - Monitor: Blue (#64B5F6)
  - Info: Purple (#BA68C8)
  - None: Green (#66BB6A)

**Verify Interactions:**
- ✅ Hover states on chips and buttons
- ✅ Smooth expand/collapse animation
- ✅ Dropdown appears/disappears cleanly
- ✅ Loading spinner animates
- ✅ All icons render correctly

**Verify Responsive:**
- Resize browser to mobile width
- Stack builder sections stack vertically
- Chips wrap properly
- Buttons remain accessible

---

### 19. Console Verification

**Open Browser DevTools → Console**

**While using checker, verify logs appear:**
- `[Autocomplete] Query: ginkgo Type: supplement`
- `[Autocomplete] Found 1 results`
- `[CheckStack] Checking 2 substances`
- `[CheckStack] Generated 1 pairs`
- `[CheckStack] Results: {...}`

**No errors should appear**

---

### 20. Production Readiness Checks

**Security:**
- ✅ RLS enabled on both tables
- ✅ Public read access working
- ✅ No service role key exposed in frontend
- ✅ CORS headers present on all endpoints

**Performance:**
- ✅ Autocomplete debounced (200ms)
- ✅ Results load in < 2 seconds
- ✅ No unnecessary re-renders
- ✅ Database queries use indexes

**Data Quality:**
- ✅ All interactions have citations
- ✅ All interactions have management guidance
- ✅ Severity levels clinically appropriate
- ✅ Substance aliases comprehensive

---

## Mode Testing (A & B)

### Mode A: Supplements + Prescription Medicines

This is the default mode. Tests supplement-drug interactions only.

**Test Case 1: Ginkgo + Warfarin (Caution)**
1. Select "Supplements + Prescription Medicines" mode (default)
2. Add "Ginkgo" in supplements column
3. Add "Warfarin" in prescription medicines column
4. Click "Run Check"
5. **Expected**: 1 pair checked, severity "Caution", summary: "Increased bleeding risk"

**Test Case 2: Multiple Supplements + 1 Drug**
1. Stay in "Supplements + Prescription Medicines" mode
2. Add "Ginkgo" and "Fish Oil" in supplements
3. Add "Warfarin" in prescription medicines
4. Click "Run Check"
5. **Expected**: 2 pairs checked
   - Ginkgo + Warfarin: Caution
   - Fish Oil + Warfarin: Caution

**Test Case 3: Validation - Missing Drug**
1. Clear all items
2. Add "Ginkgo" in supplements
3. Do NOT add any prescription medicines
4. **Expected**: "Run Check" button disabled with message "Add at least 1 supplement AND 1 prescription medicine"

### Mode B: Supplements + Supplements

This mode tests supplement-supplement interactions only.

**Test Case 1: Ginkgo + Vitamin E (Caution)**
1. Click "Supplements + Supplements" mode toggle
2. Add "Ginkgo" in supplements
3. Add "Vitamin E" in supplements
4. Click "Run Check"
5. **Expected**: 1 pair checked, severity "Caution", summary: "Increased bleeding risk when combined"

**Test Case 2: Multiple Supplements**
1. Stay in "Supplements + Supplements" mode
2. Add "Ginkgo", "Fish Oil", and "Vitamin E"
3. Click "Run Check"
4. **Expected**: 3 pairs checked
   - Ginkgo + Fish Oil: Caution
   - Ginkgo + Vitamin E: Caution
   - Fish Oil + Vitamin E: Monitor

**Test Case 3: Calcium + Iron (Monitor)**
1. Clear all items
2. Add "Calcium" and "Iron" in supplements
3. Click "Run Check"
4. **Expected**: 1 pair checked, severity "Monitor", summary: "Calcium reduces iron absorption"

**Test Case 4: Calcium + Vitamin D (Info)**
1. Clear all items
2. Add "Calcium" and "Vitamin D" in supplements
3. Click "Run Check"
4. **Expected**: 1 pair checked, severity "Info", summary: "Vitamin D enhances calcium absorption"

**Test Case 5: Validation - Only 1 Supplement**
1. Clear all items
2. Add "Ginkgo" only
3. **Expected**: "Run Check" button disabled with message "Add at least 2 supplements to compare"

### Mode Switching Test

**Test: Mode Switch Clears State**
1. Start in Mode A
2. Add "Ginkgo" (supplement) and "Warfarin" (drug)
3. Run check and verify results appear
4. Switch to Mode B (Supplements + Supplements)
5. **Expected**:
   - Medication list is cleared
   - Previous results are cleared
   - Only "Ginkgo" remains in supplements
   - Helper text shows "Add 2 or more supplements to compare"

### Results Display

**Verify Substance Types Shown:**
- Each result card should show substance types in parentheses
- Example: "Ginkgo (supplement) + Warfarin (drug)"
- Example: "Calcium (supplement) + Iron (supplement)"

**Verify Summary Shows Mode:**
- Mode A: "Checked X pairs in Supplements + Medicines mode"
- Mode B: "Checked X pairs in Supplements + Supplements mode"

---

## Files Modified

### Database
- `supabase/migrations/[timestamp]_create_checker_v2_tables.sql`
- `supabase/migrations/[timestamp]_secure_checker_tables_policies.sql`

### Scripts
- `scripts/seed-checker-data.cjs` - Substance seeding
- `scripts/seed-interactions.cjs` - Interaction seeding

### API
- `netlify/functions/checker-autocomplete.cjs` - Autocomplete endpoint
- `netlify/functions/checker-stack.cjs` - Stack checking endpoint

### Frontend
- `src/components/StackBuilderChecker.tsx` - Main component
- `src/pages/CheckV2.tsx` - Page wrapper
- `src/routes.tsx` - Route configuration

---

## Security Configuration

### RLS Policies (Read-Only Public Access)

The checker tables use restrictive RLS policies:
- ✅ **SELECT**: Public (anon) can read all active substances and interactions
- ❌ **INSERT**: Service role only (no anon/authenticated access)
- ❌ **UPDATE**: Service role only (no anon/authenticated access)
- ❌ **DELETE**: Service role only (no anon/authenticated access)

### Seeding Data Securely

**All seed scripts require service role key:**

```bash
# In .env file (NEVER commit this)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Seed scripts automatically use service role:
```javascript
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // Bypasses RLS
);
```

**Frontend uses anon key (read-only):**
```javascript
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY  // Can only SELECT
);
```

### Verify Policies

Run this SQL in Supabase dashboard to audit policies:
```sql
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE tablename IN ('checker_substances', 'checker_interactions')
ORDER BY tablename, cmd;
```

Expected result: Only SELECT policies exist for public.

---

## Known Limitations (Phase 1)

1. **No Auth Gating** - All users can access (as requested)
2. **Limited Typo Tolerance** - Uses basic ilike/contains (fuzzy matching in Phase 2)
3. **No Saved Stacks** - No persistence (Phase 2 feature)
4. **Simple Aliases** - Manual alias list (Phase 2: NLP/fuzzy)
5. **Fixed Dataset** - 30 substances, 26 interactions (expandable)

---

## Next Steps (Future Phases)

**Phase 2 Enhancements:**
- Fuzzy/typo-tolerant search
- Saved regimens
- PDF export of results
- Share link functionality
- User authentication gating
- Premium features (detailed evidence, more interactions)

**Phase 3 Features:**
- AI-powered interaction prediction
- Real-time drug database sync
- Clinical decision support
- Provider dashboard

---

## Troubleshooting

**Autocomplete not working:**
- Check Netlify Dev is running: `npm run netlify:dev`
- Check browser console for errors
- Verify Supabase connection in .env

**No results found:**
- Check substances are seeded: `node scripts/seed-checker-data.cjs`
- Check interactions seeded: `node scripts/seed-interactions.cjs`
- Verify RLS policies allow public read
- **Important**: Seed scripts require SUPABASE_SERVICE_ROLE_KEY in .env

**Build fails:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

**Functions 404:**
- Restart Netlify Dev: Stop with Ctrl+C, then `npm run netlify:dev`
- Check functions exist: `ls netlify/functions/checker-*.cjs`

---

## Success Criteria

✅ All test scenarios pass
✅ No console errors
✅ Clean UX with smooth interactions
✅ Accurate clinical data
✅ Fast performance (< 2s)
✅ Keyboard accessible
✅ Proper error handling
✅ Beautiful design consistent with brand

---

## Demo Script

**Quick 2-Minute Demo:**

1. Open `/check`
2. Type `gin` in Supplements → Select "Ginkgo"
3. Type `war` in Medications → Select "Warfarin"
4. Click "Run Check"
5. Show **Caution** result with bleeding risk warning
6. Expand details → Show mechanism and management
7. Add "Vitamin K" supplement
8. Re-run check → Show multiple interactions grouped
9. Highlight **Monitor** section for Vitamin K warning
10. Show "No Interaction" for safe pairs

**Done!** World-class interaction checker in action.
