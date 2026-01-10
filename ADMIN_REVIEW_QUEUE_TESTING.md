# Admin Review Queue - Testing Guide

## Quick Test Script

### 1. Access Control (2 minutes)

**Test unauthorized access**:
```
1. Log out completely
2. Visit: /admin/review-queue
3. ✅ Expected: "Not Authorized" page
```

**Test non-admin access**:
```
1. Log in as free/pro/clinical user (not admin)
2. Visit: /admin/review-queue
3. ✅ Expected: "Not Authorized" page
```

**Test admin access**:
```
1. Log in as admin user
2. Visit: /admin/review-queue
3. ✅ Expected: Full page loads with stats and requests
```

---

### 2. Data Display (3 minutes)

**Check stats cards**:
```
✅ New count shows correctly
✅ Priority count shows correctly
✅ Reviewed count shows correctly
✅ Dismissed count shows correctly
```

**Check request list**:
```
✅ Rows display with correct data
✅ Date/time formatted correctly
✅ Token A shows
✅ Token B shows (if exists)
✅ Status badge displays with correct color
✅ Reason shows (if exists)
✅ User tier shows (if exists)
✅ Note shows (truncated if >120 chars)
```

**Check priority sorting**:
```
✅ Priority requests appear at top
✅ Then new requests
✅ Then reviewed/dismissed
✅ Within each group, sorted by date
```

---

### 3. Search & Filter (3 minutes)

**Test search**:
```
1. Type substance name in search box
2. ✅ Expected: Filters to matching requests
3. Type text from a note
4. ✅ Expected: Filters to matching requests
5. Clear search
6. ✅ Expected: Shows all requests
```

**Test status filter**:
```
1. Select "New" from dropdown
2. ✅ Expected: Shows only new requests
3. Select "Priority"
4. ✅ Expected: Shows only priority requests
5. Select "All"
6. ✅ Expected: Shows all requests
```

**Test sort toggle**:
```
1. Click "Oldest First"
2. ✅ Expected: Oldest requests appear first
3. Click "Newest First"
4. ✅ Expected: Newest requests appear first
```

**Test combined filters**:
```
1. Set status to "New"
2. Type search query
3. ✅ Expected: Shows new requests matching query
4. Check count updates correctly
```

---

### 4. Actions (5 minutes)

**Test Copy action**:
```
1. Click copy icon on any request
2. ✅ Expected: Alert "Copied to clipboard!"
3. Paste in text editor
4. ✅ Expected: Contains token_a, token_b, reason, note, tier, date
```

**Test Mark Reviewed**:
```
1. Find a "new" or "priority" request
2. Click ✓ (checkmark) button
3. ✅ Expected: Button disabled briefly
4. ✅ Expected: Status badge changes to "Reviewed"
5. ✅ Expected: Action buttons disappear
6. ✅ Expected: Reviewed count increases by 1
7. Refresh page
8. ✅ Expected: Still shows as reviewed
```

**Test Dismiss**:
```
1. Find a "new" or "priority" request
2. Click ✗ (X) button
3. ✅ Expected: Button disabled briefly
4. ✅ Expected: Status badge changes to "Dismissed"
5. ✅ Expected: Action buttons disappear
6. ✅ Expected: Dismissed count increases by 1
7. Refresh page
8. ✅ Expected: Still shows as dismissed
```

**Test optimistic updates**:
```
1. Mark a request as reviewed
2. ✅ Expected: UI updates instantly (no delay)
3. Check network tab
4. ✅ Expected: API call completes successfully
```

---

### 5. CSV Export (2 minutes)

**Test export**:
```
1. Apply some filters (optional)
2. Click "Export CSV" button
3. ✅ Expected: File downloads with name like "review-queue-2026-01-10.csv"
4. Open file in Excel/Google Sheets
5. ✅ Expected: Contains columns: Created At, Token A, Token B, Reason, Note, Status, User Tier
6. ✅ Expected: Only filtered rows exported
7. ✅ Expected: Data matches what's shown on screen
```

**Test export with special characters**:
```
1. Find request with quotes or commas in note
2. Export CSV
3. ✅ Expected: CSV properly escapes quotes/commas
4. ✅ Expected: Opens correctly in spreadsheet software
```

---

### 6. Edge Cases (3 minutes)

**Test empty states**:
```
1. Search for nonsense text
2. ✅ Expected: "No requests found matching your filters"
3. Clear search
```

**Test missing fields**:
```
1. Find request without token_b
2. ✅ Expected: Shows only token_a (no " + " shown)
3. Find request without note
4. ✅ Expected: Note section doesn't appear
5. Find request without reason
6. ✅ Expected: Reason line doesn't appear
```

**Test long notes**:
```
1. Find request with note >120 chars
2. ✅ Expected: Note truncated with "..."
3. Click copy
4. ✅ Expected: Full note in clipboard (not truncated)
```

**Test reviewed/dismissed requests**:
```
1. Find request already reviewed
2. ✅ Expected: No action buttons (just status badge)
3. Find request already dismissed
4. ✅ Expected: No action buttons (just status badge)
```

---

### 7. Performance (2 minutes)

**Test load time**:
```
1. Clear cache
2. Visit /admin/review-queue
3. ✅ Expected: Page loads in <2 seconds
```

**Test action speed**:
```
1. Click mark reviewed
2. ✅ Expected: UI updates instantly
3. ✅ Expected: Action completes in <500ms
```

**Test filter speed**:
```
1. Type in search box
2. ✅ Expected: Results filter instantly (no lag)
3. Change status filter
4. ✅ Expected: Results filter instantly
```

---

### 8. Navigation (1 minute)

**Test back button**:
```
1. Click ← Back button in header
2. ✅ Expected: Returns to /admin
```

**Test browser back**:
```
1. Click browser back button
2. ✅ Expected: Returns to previous page
3. Click browser forward
4. ✅ Expected: Returns to review queue
```

---

### 9. Responsiveness (2 minutes)

**Test mobile view**:
```
1. Resize browser to mobile width (375px)
2. ✅ Expected: Stats cards stack vertically
3. ✅ Expected: Controls stack vertically
4. ✅ Expected: Table/rows remain readable
5. ✅ Expected: Action buttons still accessible
```

**Test tablet view**:
```
1. Resize to tablet width (768px)
2. ✅ Expected: 2 columns for stats cards
3. ✅ Expected: Controls flow nicely
4. ✅ Expected: Everything readable and functional
```

---

### 10. Error Handling (2 minutes)

**Test network error**:
```
1. Open DevTools → Network tab
2. Set to "Offline"
3. Click mark reviewed
4. ✅ Expected: Alert "Failed to update status"
5. ✅ Expected: UI doesn't change
6. Set back to "Online"
```

**Test unauthorized mid-session**:
```
1. Open page as admin
2. In another tab, change role to 'free' in database
3. Click mark reviewed
4. ✅ Expected: May show auth error or fail gracefully
```

---

## SQL Verification Queries

**Check if requests were updated**:
```sql
SELECT
  id,
  token_a,
  token_b,
  status,
  created_at
FROM interaction_requests
WHERE status IN ('reviewed', 'dismissed')
ORDER BY created_at DESC
LIMIT 10;
```

**Check status distribution**:
```sql
SELECT
  status,
  COUNT(*) as count
FROM interaction_requests
GROUP BY status
ORDER BY count DESC;
```

**Check priority requests**:
```sql
SELECT
  token_a,
  token_b,
  user_tier,
  created_at
FROM interaction_requests
WHERE status = 'priority_new'
ORDER BY created_at DESC
LIMIT 20;
```

---

## Common Issues & Solutions

### Issue: "Not Authorized" even as admin

**Cause**: User's `profiles.role` is not 'admin'

**Fix**:
```sql
-- Check current role
SELECT id, email, role FROM profiles WHERE id = 'USER_ID';

-- Set to admin
UPDATE profiles SET role = 'admin' WHERE id = 'USER_ID';
```

---

### Issue: No requests showing

**Cause 1**: No data in table

**Fix**: Insert test data:
```sql
INSERT INTO interaction_requests (
  token_a, token_b, token_a_norm, token_b_norm,
  status, reason, note, user_tier
) VALUES (
  'Vitamin D', 'Calcium', 'vitamin d', 'calcium',
  'new', 'missing_interaction', 'Need info on this combo', 'pro'
);
```

**Cause 2**: RLS policies blocking

**Fix**: Check policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'interaction_requests';
```

---

### Issue: Updates not persisting

**Cause**: RLS policies blocking updates

**Fix**: Ensure admin can update:
```sql
-- Check if policy exists
SELECT * FROM pg_policies
WHERE tablename = 'interaction_requests'
AND cmd = 'UPDATE';

-- If not, create policy
CREATE POLICY "Admins can update requests"
ON interaction_requests
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
```

---

### Issue: Stats don't match

**Cause**: Calculation bug or old data

**Fix**: Check actual counts:
```sql
SELECT
  COUNT(*) FILTER (WHERE status = 'new') as new,
  COUNT(*) FILTER (WHERE status = 'priority_new') as priority,
  COUNT(*) FILTER (WHERE status = 'reviewed') as reviewed,
  COUNT(*) FILTER (WHERE status = 'dismissed') as dismissed
FROM interaction_requests;
```

---

### Issue: CSV doesn't download

**Cause**: Browser blocking or pop-up blocker

**Fix**:
1. Check browser console for errors
2. Disable pop-up blocker for site
3. Try different browser

---

### Issue: Search not working

**Cause**: Empty search or wrong field names

**Debug**:
1. Open browser console
2. Check for JS errors
3. Verify data has text in searchable fields

---

## Automated Test Script (Optional)

If using Playwright/Cypress, here's a sample test:

```typescript
test('Admin can mark request as reviewed', async ({ page }) => {
  // Login as admin
  await page.goto('/auth');
  await page.fill('[name="email"]', 'admin@example.com');
  await page.click('button[type="submit"]');

  // Navigate to review queue
  await page.goto('/admin/review-queue');

  // Find first new request
  const firstNew = page.locator('[data-status="new"]').first();

  // Click mark reviewed
  await firstNew.locator('button[title="Mark reviewed"]').click();

  // Verify status changed
  await expect(firstNew.locator('text=Reviewed')).toBeVisible();

  // Verify stats updated
  const reviewedCount = await page.locator('text=/Reviewed/').textContent();
  expect(parseInt(reviewedCount)).toBeGreaterThan(0);
});
```

---

## Test Summary Checklist

Run through all tests and check off:

- [ ] Access control (unauthorized, non-admin, admin)
- [ ] Data display (stats, requests, sorting)
- [ ] Search functionality
- [ ] Status filter
- [ ] Sort toggle
- [ ] Copy action
- [ ] Mark reviewed action
- [ ] Dismiss action
- [ ] CSV export
- [ ] Empty states
- [ ] Missing fields
- [ ] Long notes
- [ ] Performance
- [ ] Navigation
- [ ] Responsiveness
- [ ] Error handling

**If all checked**: ✅ Admin Review Queue is production-ready

---

## Performance Benchmarks

Expected performance targets:

| Action | Target | Acceptable |
|--------|--------|------------|
| Page load (first) | <1s | <2s |
| Page load (cached) | <200ms | <500ms |
| Search filter | <50ms | <100ms |
| Status update | <200ms | <500ms |
| CSV export | <500ms | <1s |
| Stats calculation | <10ms | <50ms |

If any action exceeds "Acceptable", investigate.

---

## Sign-Off

After completing all tests:

**Tested by**: _________________
**Date**: _________________
**Browser(s)**: _________________
**Result**: [ ] PASS [ ] FAIL

**Notes**:
_________________________________________
_________________________________________
_________________________________________

If FAIL, document specific issues and re-test after fixes.
