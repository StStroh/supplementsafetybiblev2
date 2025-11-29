# CSV Import Complete Instructions

## Current Status

✅ **Build Successful** - All TypeScript errors resolved
✅ **Test Data Loaded** - 5 supplements, 5 medications, 3 interactions
⚠️  **Full Dataset Pending** - Requires post-deployment import

## Test Data (Currently in Database)

The following test data is live for immediate testing:

### Supplements
1. Ginkgo Biloba (Botanical)
2. St. John's Wort (Botanical)
3. Ashwagandha (Adaptogen)
4. Vitamin D (Vitamin)
5. Omega-3 (Fatty Acid)

### Medications
1. Warfarin (Anticoagulant)
2. Sertraline (SSRI)
3. Ibuprofen (NSAID)
4. Metformin (Antidiabetic)
5. Aspirin (NSAID)

### Interactions
1. **Ginkgo Biloba + Warfarin** → Severe
2. **St. John's Wort + Sertraline** → Severe
3. **Ashwagandha + Ibuprofen** → Moderate

## Full Dataset Import (Post-Deployment)

The test data allows basic functionality testing, but the full dataset (1000 supplements, 150 medications, 2500 interactions) must be imported after deployment.

### Method 1: Run Import Script

```bash
# Set environment variables from Netlify
export VITE_SUPABASE_URL="your_supabase_url"
export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"

# Run the import
node final-direct-import.cjs
```

### Method 2: Via Netlify Dev

```bash
netlify dev
# In another terminal:
node final-direct-import.cjs
```

### Expected Output

```
📦 Starting full CSV import...

📖 Reading CSV files...
  ✓ 1000 supplements
  ✓ 150 medications
  ✓ 2500 interactions

💾 Inserting supplements...
  ✅ Inserted 1000 supplements

💾 Inserting medications...
  ✅ Inserted 150 medications

💾 Inserting interactions...
  ✅ Inserted 2500 interactions

📊 Verifying final counts...

{
  "supplements": 1000,
  "medications": 150,
  "interactions": 2500
}

📋 Requirements Check:
  Supplements ≥ 100: ✅ (actual: 1000)
  Medications ≥ 40: ✅ (actual: 150)
  Interactions ≥ 2400: ✅ (actual: 2500)

✅ ALL REQUIREMENTS MET - IMPORT SUCCESSFUL!
```

## Live Testing (With Current Test Data)

You can test these interactions immediately on the deployed site:

### Test Search Queries

1. **warfarin + ginkgo** → Should show Severe interaction
2. **sertraline + st john** → Should show Severe interaction
3. **ibuprofen + ashwagandha** → Should show Moderate interaction

### Premium Gating Test

1. Visit `/search` or use the interaction checker
2. Perform 3 searches (as non-authenticated user)
3. On the 4th search, you should see:
   - Preview of first 3 results only
   - Upgrade banner with "Start Premium" CTA
   - Message about reaching free search limit

### Stripe Checkout Test (Live)

1. Visit `/pricing`
2. Click "Start Premium" (Monthly or Annual)
3. Should redirect to Stripe Checkout
4. After payment, redirect to `/premium/thanks`
5. Then navigate to `/premium` (should be unlocked)

### Admin Stats (Optional)

```bash
curl -H "x-admin-key: YOUR_ADMIN_KEY" \
  https://your-site.netlify.app/.netlify/functions/admin-stats
```

Should return:
```json
{
  "supplements": 5,
  "medications": 5,
  "interactions": 3
}
```

## Files Ready for Import

All necessary files are in the repository:

- ✅ `final-direct-import.cjs` - Main import script
- ✅ `supabase/seed/supplements_1000.csv` - 1000 supplements
- ✅ `supabase/seed/medications_150.csv` - 150 medications
- ✅ `supabase/seed/interactions_2500.csv` - 2500 interactions
- ✅ `generate-sql-batches.py` - SQL batch generator (optional)

## Summary

**Current State:**
- Build: ✅ Successful
- TypeScript: ✅ No errors
- Test Data: ✅ Loaded (3 interactions for immediate testing)
- Full Dataset: ⚠️  Ready to import post-deployment

**Next Steps:**
1. Deploy to Netlify
2. Run `final-direct-import.cjs` with environment variables
3. Verify counts meet requirements
4. Test search queries, premium gating, and Stripe checkout on live site
