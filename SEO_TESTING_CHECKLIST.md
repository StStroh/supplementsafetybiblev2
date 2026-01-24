# SEO Landing Page Testing Checklist

## Page: /supplement-drug-interactions

---

## Pre-Deployment Testing

### Build Verification
- [x] TypeScript compiles without errors
- [x] Vite build succeeds
- [x] No console errors in dev mode
- [x] Route configured in routes.tsx

### Content Review
- [x] Word count: 2,400+ words
- [x] No medical advice given
- [x] No health claims made
- [x] Disclaimer present and prominent
- [x] Tone: Neutral, educational
- [x] Grammar and spelling checked

### SEO Elements
- [x] Title tag: Present, <60 chars ideal
- [x] Meta description: Present, <160 chars ideal
- [x] H1 tag: Single, descriptive
- [x] H2/H3 structure: Logical hierarchy
- [x] Keywords: Natural placement
- [x] Canonical URL: Self-referencing

### Schema Markup
- [x] Organization schema: Valid JSON
- [x] MedicalWebPage schema: Valid JSON
- [x] FAQPage schema: Valid JSON with 6 Q&As
- [x] Schema placement: In <Helmet> component

### Internal Links
- [x] Link to /premium: 3 instances
- [x] Link to /check: 2 instances
- [x] Link to homepage: 1 instance
- [x] Link to /privacy: 1 instance
- [x] All links use correct paths

---

## Post-Deployment Testing

### 1. Page Load Test

**Test URL:**
```
https://supplementsafetybible.com/supplement-drug-interactions
```

**Expected:**
- ✅ Page loads without errors
- ✅ All content visible
- ✅ No 404 errors
- ✅ No console errors

**Actual:**
- [ ] Pass / [ ] Fail

---

### 2. Schema Validation

**Tool:** Google Rich Results Test
**URL:** https://search.google.com/test/rich-results

**Test:**
1. Enter: `supplementsafetybible.com/supplement-drug-interactions`
2. Click "Test URL"
3. Review results

**Expected:**
- ✅ Organization schema detected
- ✅ MedicalWebPage schema detected
- ✅ FAQPage schema detected
- ✅ 6 FAQ items listed
- ✅ No errors or warnings

**Actual:**
- [ ] Organization: Pass / [ ] Fail
- [ ] MedicalWebPage: Pass / [ ] Fail
- [ ] FAQPage: Pass / [ ] Fail
- [ ] FAQ count: _____ (expected: 6)
- [ ] Errors: None / [ ] List errors:

**Screenshot:** (Save for documentation)

---

### 3. Mobile-Friendly Test

**Tool:** Google Mobile-Friendly Test
**URL:** https://search.google.com/test/mobile-friendly

**Test:**
1. Enter: `supplementsafetybible.com/supplement-drug-interactions`
2. Click "Test URL"
3. Review results

**Expected:**
- ✅ Page is mobile-friendly
- ✅ Text readable without zooming
- ✅ Touch targets appropriately sized
- ✅ No horizontal scrolling
- ✅ Viewport configured

**Actual:**
- [ ] Pass / [ ] Fail
- [ ] Issues found: _______________

**Screenshot:** (Save for documentation)

---

### 4. Core Web Vitals

**Tool:** PageSpeed Insights
**URL:** https://pagespeed.web.dev/

**Test:**
1. Enter: `supplementsafetybible.com/supplement-drug-interactions`
2. Click "Analyze"
3. Review both Mobile and Desktop scores

**Expected (Mobile):**
- ✅ LCP: <2.5s (Good)
- ✅ FID: <100ms (Good)
- ✅ CLS: <0.1 (Good)
- ✅ Performance Score: >80

**Actual (Mobile):**
- [ ] LCP: _____ seconds
- [ ] FID: _____ milliseconds
- [ ] CLS: _____
- [ ] Performance Score: _____ / 100
- [ ] Pass / [ ] Needs optimization

**Expected (Desktop):**
- ✅ LCP: <2.5s (Good)
- ✅ FID: <100ms (Good)
- ✅ CLS: <0.1 (Good)
- ✅ Performance Score: >90

**Actual (Desktop):**
- [ ] LCP: _____ seconds
- [ ] FID: _____ milliseconds
- [ ] CLS: _____
- [ ] Performance Score: _____ / 100
- [ ] Pass / [ ] Needs optimization

---

### 5. Internal Links Test

**Test each link:**

| Link | Destination | Status |
|------|-------------|--------|
| "Professional interaction screening services" | /premium | [ ] Pass |
| "Professional Screening" (blue CTA box) | /premium | [ ] Pass |
| "Professional interaction screening tools" (FAQ) | /check | [ ] Pass |
| "Supplement Safety Bible" (related resources) | / | [ ] Pass |
| "Interaction Checker" (related resources) | /check | [ ] Pass |
| "Professional Screening" (related resources) | /premium | [ ] Pass |
| "Privacy & Security" (related resources) | /privacy | [ ] Pass |

**All links working:** [ ] Yes / [ ] No

---

### 6. Content Verification

**Visual Review:**
- [ ] H1 displays correctly
- [ ] Disclaimer box shows (orange)
- [ ] Body text readable
- [ ] FAQ section formatted correctly
- [ ] CTA box shows (blue gradient)
- [ ] Related resources grid displays
- [ ] Icons render (Lucide React)

**Responsive Check:**
- [ ] Desktop (>1024px): Proper layout
- [ ] Tablet (768-1024px): Proper layout
- [ ] Mobile (375-768px): Proper layout
- [ ] Mobile (<375px): Proper layout

---

### 7. SEO Metadata Verification

**View Page Source** (Ctrl+U / Cmd+Option+U)

**Check for:**
- [ ] `<title>` tag present
- [ ] `<meta name="description">` present
- [ ] `<link rel="canonical">` present
- [ ] `<script type="application/ld+json">` (3 schemas)
- [ ] Open Graph tags present
- [ ] No `<meta name="robots" content="noindex">`

---

### 8. Google Search Console Submission

**After 24 hours of deployment:**

**Steps:**
1. Go to: https://search.google.com/search-console
2. Select property: supplementsafetybible.com
3. URL Inspection tool
4. Enter: `https://supplementsafetybible.com/supplement-drug-interactions`
5. Click "Request Indexing"

**Status:**
- [ ] Submitted: Date: _________
- [ ] Indexed: Date: _________
- [ ] Errors: None / [ ] List:

---

### 9. Analytics Setup

**Google Analytics:**
- [ ] Page tracking working
- [ ] Event tracking configured (if custom)
- [ ] Goal setup for /premium clicks
- [ ] Goal setup for /check clicks

**TikTok Pixel:**
- [ ] PageView firing (automatic)
- [ ] ViewContent firing (if configured)

**Verify tracking:**
```
Visit: https://supplementsafetybible.com/supplement-drug-interactions?ttdebug=1
Open console
Look for: [TikTok Pixel] PageView
```

---

### 10. User Experience Test

**Task: Read and Navigate**
- [ ] Text readable on mobile
- [ ] Scroll smooth
- [ ] CTA buttons tappable (45px min)
- [ ] Links distinguishable
- [ ] Color contrast sufficient
- [ ] No layout shifts during load

**Task: Find Information**
- [ ] FAQ easy to locate
- [ ] Headings scannable
- [ ] Content organized logically

**Task: Take Action**
- [ ] CTA to /premium obvious
- [ ] CTA to /check accessible
- [ ] Related resources visible

---

## Week 1 Monitoring

### Indexation Check

**Day 1:**
- [ ] Submitted to Google Search Console
- [ ] Sitemap updated (if using sitemap.xml)

**Day 3:**
```
Google search: site:supplementsafetybible.com/supplement-drug-interactions
Result: [ ] Indexed / [ ] Not yet
```

**Day 7:**
```
Google search: site:supplementsafetybible.com/supplement-drug-interactions
Result: [ ] Indexed / [ ] Not yet
```

### Traffic Check

**Google Analytics (Week 1):**
- Pageviews: _____
- Users: _____
- Avg. time on page: _____
- Bounce rate: _____%

---

## Month 1 Monitoring

### Ranking Check

**Tool:** Google Search Console → Performance

**Primary Keywords:**
- [ ] "supplement drug interactions" - Position: _____
- [ ] "supplement medication interactions" - Position: _____
- [ ] "supplement interaction checker" - Position: _____

**Secondary Keywords:**
- [ ] "vitamin drug interactions" - Position: _____
- [ ] "herbal medication interactions" - Position: _____

### Traffic Metrics

**Google Analytics (Month 1):**
- Total pageviews: _____
- Organic users: _____
- Avg. time on page: _____
- Bounce rate: _____%
- CTR to /premium: _____%
- CTR to /check: _____%

### Rich Snippets

**Featured Snippets:**
```
Google search: "what are supplement drug interactions"
Result: [ ] Featured snippet / [ ] Position: _____ / [ ] Not ranked
```

**People Also Ask:**
```
Any PAA boxes showing our content: [ ] Yes / [ ] No
If yes, which questions: _______________
```

**FAQ Rich Results:**
```
Our FAQ showing in search results: [ ] Yes / [ ] No
Screenshot: (Save)
```

---

## Troubleshooting

### Issue: Page Not Indexed (Week 2+)

**Possible causes:**
- [ ] Not submitted to GSC → Submit manually
- [ ] Sitemap issue → Check sitemap.xml includes URL
- [ ] Robots.txt blocking → Check robots.txt
- [ ] Canonical issues → View page source, verify canonical
- [ ] Technical errors → Check GSC for crawl errors

### Issue: Schema Not Validating

**Possible causes:**
- [ ] JSON syntax error → Use JSON validator
- [ ] Missing required fields → Check schema.org docs
- [ ] Type mismatch → Review field types
- [ ] Multiple errors → Test in Rich Results tool

### Issue: Mobile-Friendly Test Fails

**Possible causes:**
- [ ] Viewport not configured → Check meta viewport tag
- [ ] Text too small → Increase font sizes
- [ ] Touch targets too small → Increase button padding
- [ ] Horizontal scroll → Check for overflow elements

### Issue: Core Web Vitals Poor

**Possible causes:**
- [ ] LCP slow → Optimize images, reduce JS
- [ ] FID high → Reduce JS execution time
- [ ] CLS high → Set image dimensions, avoid layout shifts

### Issue: Low Rankings (Month 3+)

**Possible causes:**
- [ ] Thin content → Expand to 3,000+ words
- [ ] No backlinks → Start link building
- [ ] High competition → Target long-tail keywords
- [ ] Poor engagement → Improve UX, add media
- [ ] Technical issues → Full SEO audit

---

## Success Metrics

### Week 1
- [ ] Page indexed
- [ ] Schema validated
- [ ] No technical errors

### Month 1
- [ ] 50+ organic visits
- [ ] Ranking for long-tail keywords (position <50)
- [ ] 5+ conversions to /premium

### Month 3
- [ ] 200+ organic visits
- [ ] Ranking for primary keywords (position <30)
- [ ] 20+ conversions to /premium

### Month 6
- [ ] 500+ organic visits
- [ ] Ranking for primary keywords (position <15)
- [ ] 50+ conversions to /premium
- [ ] Featured snippet for 1+ query

---

## Quick Test Commands

### Local Development
```bash
npm run dev
# Visit: http://localhost:5173/supplement-drug-interactions
```

### Production Build
```bash
npm run build
# Check for errors
```

### Schema Validation (Command Line)
```bash
# Install schema-validator (optional)
npm install -g @google/schema-dts

# Validate JSON
# Copy schema from page source → paste into validator
```

---

## Contact Points

### Report Issues
- Technical errors → Developer
- Content issues → Content team
- SEO concerns → SEO specialist

### Track Results
- Google Search Console
- Google Analytics
- TikTok Events Manager

---

**Last Updated:** 2025-01-18
**Page Status:** Production Ready
**Next Review:** Week 1 post-deployment
