# Interaction Checker Fix - Quick Test Guide

## What Was Fixed

The interaction checker on the pricing page now:
- ✅ Uses simplified input tracking (no separate name fields)
- ✅ Validates using the actual input values
- ✅ Shows console logs for debugging
- ✅ Always renders a result state (loading/error/empty/results)
- ✅ Displays button state debug info when disabled

## Test Steps

### 1. Go to Pricing Page with Checker
```
http://localhost:5173/pricing?from=landing-checker
```

**Expected:**
- Checker component visible at top
- Two input fields (Supplement & Medication)
- "Check Interaction" button (disabled initially)

### 2. Fill Out Inputs

**Type in supplement field:** "St. John's Wort"
- Console should show: `[PricingPageChecker] Supplement changed: St. John's Wort`
- If you select from dropdown: `[PricingPageChecker] Supplement chosen: St. John's Wort`

**Type in medication field:** "Warfarin"
- Console should show: `[PricingPageChecker] Medication changed: Warfarin`

**Check button state:**
- Should now be ENABLED (not grayed out)
- Debug text below should show: "Button enabled: true | Supplement: "St. John's Wort" | Medication: "Warfarin""

### 3. Click "Check Interaction"

**Console should show:**
```
[PricingPageChecker] Starting check: { supplementInput: "St. John's Wort", medicationInput: "Warfarin" }
[PricingPageChecker] Response status: 200
[PricingPageChecker] Response data: {...}
```

**Expected on screen:**
1. Loading state appears (blue card with spinner)
2. Then one of:
   - **Results card** with severity badge (High/Medium/Low)
   - **Empty state** (green) if no interactions found
   - **Error state** (red) if API fails

### 4. Common Issues & Debug

**Button stays disabled:**
- Check debug text below button
- Should show current values of supplement & medication
- If values are empty strings, inputs aren't being updated

**No console logs:**
- Open browser DevTools (F12)
- Check Console tab
- Filter for "PricingPageChecker"

**No results after clicking:**
- Check Network tab in DevTools
- Look for POST request to `/.netlify/functions/interactions-check`
- Check request payload and response

**API returns 404/500:**
- Check that Netlify Dev is running: `npm run netlify:dev`
- Or check that functions are deployed in production

### 5. Test Different Scenarios

**High Risk Interaction:**
- Supplement: "St. John's Wort"
- Medication: "Warfarin"
- Expected: HIGH severity badge, red border

**Low/No Risk:**
- Supplement: "Vitamin C"
- Medication: "Tylenol"
- Expected: GREEN empty state or LOW severity

**Invalid Input:**
- Supplement: "xyz123notreal"
- Medication: "abc456fake"
- Expected: Empty state OR error message

## Console Logs Reference

All logs prefixed with `[PricingPageChecker]`:

1. `Supplement changed:` - Input field updated
2. `Supplement chosen:` - Value selected from dropdown
3. `Medication changed:` - Input field updated
4. `Medication chosen:` - Value selected from dropdown
5. `Starting check:` - Button clicked, shows payload
6. `Response status:` - HTTP status code
7. `Response data:` - Full API response (may be large)

## Key Differences from Previous Version

**OLD (Broken):**
- Separate `supplementName` / `medicationName` state
- Only updated on `onChoose`, not `onChange`
- Manual typing didn't enable button

**NEW (Fixed):**
- Single `supplementInput` / `medicationInput` state
- Updated on BOTH `onChange` and `onChoose`
- Button validates using `.trim()` on input values
- Manual typing enables button immediately

## If Still Not Working

1. Check you're on the right URL: `/pricing?from=landing-checker`
2. Clear browser cache and reload
3. Rebuild: `npm run build`
4. Check all console logs for errors
5. Verify API endpoint exists: `ls netlify/functions/interactions-check.cjs`
6. Test API directly with curl (see below)

## Test API Directly

```bash
curl -X POST http://localhost:8888/.netlify/functions/interactions-check \
  -H "Content-Type: application/json" \
  -d '{"supplement":"St. John'\''s Wort","medication":"Warfarin"}'
```

Expected response (200 OK):
```json
{
  "interactions": [...],
  // OR
  "results": [...],
  // OR
  "ok": true,
  "data": {...}
}
```

## Files Modified

- `src/components/PricingPageChecker.tsx` - NEW, simplified input handling
- `src/pages/Pricing.tsx` - Added `useSearchParams`, `showChecker` check, conditional render
