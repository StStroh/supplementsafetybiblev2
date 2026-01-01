# Quick Test: Checker DOM Fix

## ✅ Test the Original Bug

### Repro Steps:
1. Open browser to `http://localhost:5173/checkv2`
2. In the **Medication** field:
   - Type "los"
   - Select "Losartan" from dropdown
3. In the **Medication** field again:
   - Type "potassium"
   - Select "Potassium Chloride" from dropdown
4. Click **"Run Check"** button
5. Wait for results

### Expected Result (AFTER FIX):
✅ Results display without crash
✅ Shows interaction details
✅ Can expand/collapse results
✅ Citations (if any) render correctly

### Before Fix:
❌ App crashed with: `NotFoundError: Failed to execute 'insertBefore' on 'Node'`
❌ White screen or frozen UI
❌ Console shows React error

---

## ✅ Test No Results Flow

### Steps:
1. Clear all selections
2. Add a supplement: "Vitamin C"
3. Add a medication: "Acetaminophen" (Tylenol)
4. Click "Run Check"

### Expected Result:
✅ Green box appears: "No Known Interactions"
✅ Shows helpful message
✅ Has "Edit inputs" button
✅ Has "Request review" button
✅ **NO CRASH** - calm, friendly UI

---

## ✅ Test Error Boundary

### Steps (Optional - for verification only):
1. Open `src/components/StackBuilderCheckerV3.tsx`
2. Add this line inside the component (line 60):
   ```tsx
   if (true) throw new Error('Test error boundary');
   ```
3. Reload the page
4. **Expected**: See red error box with "Something went wrong"
5. **Remove the test error** after verification

### Expected Error Boundary UI:
- ❌ Red alert box
- 📄 Shows error message
- 🔄 "Refresh Page" button
- 🏠 "Go to Home" button
- ✅ App doesn't crash completely

---

## ✅ Test Rapid Input Changes

### Steps:
1. In supplement field, rapidly type and change:
   - "mag" → wait for suggestions
   - Clear and type "calc" → wait for suggestions
   - Clear and type "zinc" → wait for suggestions
2. Select "Zinc" from dropdown
3. Repeat for medication field

### Expected Result:
✅ Suggestions update smoothly
✅ No flashing or errors
✅ Highlighted text updates correctly
✅ **NO CRASHES**

---

## Console Check

Open browser DevTools (F12) and check:

### ✅ No Errors:
```
❌ NotFoundError: Failed to execute 'insertBefore'
❌ Warning: Each child in a list should have a unique "key" prop
❌ Warning: Encountered two children with the same key
```

### ✅ Expected Logs (OK):
```
✅ [SubstanceCombobox] Search results: ...
✅ [StackBuilderCheckerV3] Check complete: ...
✅ Various API calls to checker-autocomplete and checker-get-interactions
```

---

## Build Verification

```bash
npm run build
```

### Expected Output:
```
✅ All environment checks passed
✅ All assertions passed - Hero components valid
✅ built in X seconds
```

### Should NOT see:
```
❌ Type errors
❌ Compilation errors
❌ Missing dependencies
```

---

## Quick Smoke Test Checklist

Run through this in 2 minutes:

- [ ] Page loads without errors
- [ ] Can type in supplement field
- [ ] Suggestions appear
- [ ] Can select a supplement
- [ ] Can type in medication field
- [ ] Suggestions appear
- [ ] Can select a medication
- [ ] Can click "Run Check"
- [ ] Results appear (or "no results" message)
- [ ] Can expand/collapse results
- [ ] No console errors
- [ ] Page doesn't crash

---

## If Issues Occur

### 1. Check Console
- Look for error messages
- Screenshot and save

### 2. Check Network Tab
- Verify API calls succeed
- Check response status codes

### 3. React DevTools
- Install React DevTools browser extension
- Check for component errors
- Look for excessive re-renders

### 4. Clear Cache
```bash
# Clear browser cache
# Or in Chrome: Ctrl+Shift+R (hard reload)

# Clear build cache
rm -rf dist/
npm run build
```

---

## Manual Test Results

**Tester**: _____________
**Date**: _____________
**Browser**: _____________

| Test Case | Result | Notes |
|-----------|--------|-------|
| Original bug (Losartan + K) | ☐ Pass ☐ Fail | |
| No results flow | ☐ Pass ☐ Fail | |
| Rapid input changes | ☐ Pass ☐ Fail | |
| Error boundary | ☐ Pass ☐ Fail | |
| Console clean | ☐ Pass ☐ Fail | |
| Build passes | ☐ Pass ☐ Fail | |

**Overall**: ☐ APPROVED ☐ NEEDS WORK

**Comments**:
___________________________
___________________________
___________________________
