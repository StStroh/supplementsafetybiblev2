# Quick Select Test Instructions

## Which Page to Test
**URL:** `http://localhost:5173/check`
**Component:** `/src/pages/Check.tsx` (uses TypeaheadInput)

## Pre-Test Checklist
1. ✅ Build completed successfully
2. Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
3. Open DevTools → Console tab
4. Filter console by typing: `[Check]`

## Test 1: Quick Select Populates Input Field

### Steps:
1. Navigate to `/check`
2. Look at the **Supplement** input field (should be empty initially)
3. Scroll down to see Quick Select buttons: Magnesium, Omega-3, etc.
4. Click the **"Magnesium"** button

### Expected Results:
- ✅ Console log: `[Check] Quick select supplement: Magnesium`
- ✅ Input field shows "Magnesium" in the text box
- ✅ Blue chip appears below input showing "Magnesium"
- ✅ Quick Select buttons disappear (because chip is showing)

### If Input is Empty:
- Check: Is the chip showing? (If yes, there's a UI issue)
- Check console: Do you see the log `[Check] Quick select supplement: Magnesium`?
- Try: Click "Magnesium" again and watch the input field closely

## Test 2: Typing in Medication Input

### Steps:
1. Clear any selections (click × on chips)
2. Click into the **Medication** input field
3. Type: "W"
4. Type: "a"
5. Type: "r"
6. Continue typing: "Warfarin"

### Expected Results:
- ✅ Console logs appear for each character:
  - `[Check] Medication query changed: W`
  - `[Check] Medication query changed: Wa`
  - `[Check] Medication query changed: War`
- ✅ Each character appears in the input field
- ✅ Autocomplete dropdown appears with suggestions
- ✅ Can click a suggestion to select it

### If Nothing Appears:
- Check: Is the input focused? (cursor blinking?)
- Check: Any errors in console?
- Try: Click directly on the input border/background

## Test 3: Full Interaction Check

### Steps:
1. Select "Magnesium" (Quick Select)
2. Select "Warfarin" (Quick Select or type)
3. Verify both chips are visible
4. Click "Search Interactions" button

### Expected Results:
- ✅ Console log: `[Check] Button clicked - selSup: Magnesium, selMed: Warfarin`
- ✅ Button is enabled (not gray)
- ✅ Loading state shows briefly
- ✅ Results appear below with interaction details

## Debugging: If Still Not Working

### Check 1: Verify You're on the Right Page
```
Current URL should be: /check
NOT: /preview/checker or /landing
```

### Check 2: Hard Refresh
```bash
# Mac: Cmd+Shift+R
# Windows: Ctrl+Shift+R
# Or close tab and reopen
```

### Check 3: Check Console for Errors
Look for:
- Red errors about undefined variables
- Network errors (failed API calls)
- React warnings about state updates

### Check 4: Verify State Updates
1. Open React DevTools
2. Find the `Check` component
3. Look at state:
   - `supQuery` - should update when you click Quick Select
   - `selSup` - should update when you click Quick Select
   - Both should be "Magnesium" after clicking

### Check 5: Inspect the Input Element
1. Right-click the Supplement input → Inspect
2. Check the `value` attribute in the HTML
3. After clicking "Magnesium", the value attribute should be: `value="Magnesium"`

## Common Issues

### Issue: Input Shows Text Briefly Then Clears
**Cause:** Something is resetting the state
**Fix:** Check if there's a useEffect that's clearing state

### Issue: Chip Shows But Input Doesn't
**Cause:** Quick Select only updating `selSup`, not `supQuery`
**Check:** Look at the Quick Select onClick handler - should have BOTH:
```typescript
setSelSup(name);
setSupQuery(name);  // ← This line must be present
```

### Issue: Cannot Type in Medication Input
**Cause:** Input is not controlled properly or has pointer-events: none
**Check:**
1. Inspect element → Computed styles → pointer-events (should be "auto")
2. Check if input has `readOnly` or `disabled` attribute (should not)

## Code Verification

If test still fails, verify these code sections exist:

### Check.tsx State (lines 90-93):
```typescript
const [selSup, setSelSup] = useState<string>("");
const [selMed, setSelMed] = useState<string>("");
const [supQuery, setSupQuery] = useState<string>("");  // ← Must exist
const [medQuery, setMedQuery] = useState<string>("");  // ← Must exist
```

### TypeaheadInput for Supplement (lines 346-359):
```typescript
<TypeaheadInput
  label="Supplement"
  placeholder="Type a supplement…"
  type="supplement"
  value={supQuery}  // ← Controlled
  onChange={(val) => setSupQuery(val)}  // ← Updates state
  onChoose={(name) => {
    setSelSup(name);
    setSupQuery("");
  }}
  className="..."
/>
```

### Quick Select Button (lines 382-391):
```typescript
onClick={() => {
  console.log('[Check] Quick select supplement:', name);
  setSelSup(name);      // ← Sets chip
  setSupQuery(name);    // ← Sets input text ← THIS IS CRITICAL
}}
```

## Success Criteria

All of these must be true:
- ✅ Quick Select makes text appear in input field
- ✅ Chip appears below input
- ✅ Can type freely in both inputs
- ✅ Autocomplete suggestions work
- ✅ Can select from suggestions
- ✅ Check button runs interaction check
- ✅ Console logs confirm all events fire
