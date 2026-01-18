# SEO Interaction Pages - Quick Testing Guide

## 1-Minute Verification

### Step 1: Build Check
```bash
npm run build
# Should complete in ~20 seconds with no errors
```

### Step 2: Verify Page Count
```bash
grep -c "interactions/" public/sitemap.xml
# Expected: 150
```

### Step 3: Test Sample Page
```bash
# Start dev server
npm run dev

# Visit in browser:
http://localhost:5173/interactions/vitamin-k-warfarin-clotting-risk
```

**Expected:**
- ✅ Page loads without errors
- ✅ Displays interaction information
- ✅ Shows "Check Vitamin K + Warfarin" CTA button
- ✅ No console errors

### Step 4: Test CTA Flow
1. Click the "Check Vitamin K + Warfarin" button
2. **Expected:** Redirects to `/check?query=vitamin%20k%20warfarin`
3. **Expected:** Checker page loads successfully
4. **Expected:** No authentication errors

### Step 5: Guest Mode Test
1. Open incognito window
2. Visit: `http://localhost:5173/interactions/st-johns-wort-serotonin-ssri`
3. Click CTA button
4. **Expected:** Checker loads with free-tier access
5. **Expected:** No login required

---

## 5 Representative Test Pages

Test these pages to verify all clusters work:

```
1. Seizure Risk:
   /interactions/ginkgo-seizure-risk-antidepressants

2. Bleeding Risk:
   /interactions/omega-3-bleeding-risk-blood-thinners

3. Absorption:
   /interactions/calcium-iron-absorption-competition

4. Serotonin/CNS:
   /interactions/5-htp-serotonin-antidepressants

5. Liver/Kidney/Hormonal:
   /interactions/licorice-root-blood-pressure-diuretics
```

---

## What to Look For

### ✅ Good Signs
- Page loads in < 2 seconds
- Clean, readable content
- CTA button prominently displayed
- No JavaScript errors in console
- Checker pre-fills correctly

### ❌ Red Flags
- 404 errors
- Console errors
- Broken CTA links
- Authentication blocking page access
- Profile fetch errors preventing page load

---

## Profile Resilience Test

Simulate profile fetch failure:

1. Open DevTools → Network tab
2. Add request blocking: `**/profiles?*`
3. Visit any interaction page
4. Click CTA to checker
5. **Expected:** Defaults to `plan: 'free'`
6. **Expected:** Page remains functional

---

## Quick Checklist

- [ ] Build succeeds
- [ ] Sitemap has 150 interaction pages
- [ ] 5 sample pages load correctly
- [ ] CTA buttons redirect properly
- [ ] Query params include substance names
- [ ] Guest mode works (incognito test)
- [ ] Profile errors don't block UI

---

## If Everything Works

**You're ready to deploy!**

All 50 pages are:
- SEO-optimized
- Mobile-responsive
- Guest-mode compatible
- Resilient to auth errors
- Integrated with checker

---

## If Issues Found

1. **Page 404:** Check slug in `src/data/staticInteractions.ts`
2. **CTA broken:** Verify `checkerLink` in `src/pages/InteractionPage.tsx`
3. **Auth blocking:** Check `src/state/AuthProvider.tsx` fallback
4. **Console errors:** Run `npm run build` to check for TypeScript errors

---

**Testing Time:** ~5 minutes for complete verification
**Status:** Ready for production deployment
