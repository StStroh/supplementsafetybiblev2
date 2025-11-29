# Interaction Data Import Guide

## Status

✅ **Database Schema**: Applied (106 supplements, 48 medications ready)
✅ **Netlify Functions**: Created (import-interactions, search-interactions, admin-stats)
✅ **UI Components**: Updated (Search.tsx with gating, Admin.tsx with import controls)
🔄 **Data Import**: Ready to run (2,500 interactions waiting)

## Import Methods

### Method 1: Via Admin UI (Recommended for Production)

1. Deploy the application to Netlify
2. Navigate to `/admin`
3. Click "Import CSV" button
4. The function will automatically import from `artifacts/interactions_full.csv`

### Method 2: Via Direct Script (For Local Development)

```bash
# Ensure environment variables are set
export SUPABASE_URL="your_url"
export SUPABASE_SERVICE_ROLE_KEY="your_key"

# Run import script
node scripts/batch-import-via-supabase.cjs
```

### Method 3: Via Netlify Function API

```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/import-interactions \\
  -H "Content-Type: application/json" \\
  -d '{"source": "artifacts/interactions_full.csv", "truncate": false, "dryRun": false}'
```

## Current Database State

- **Supplements**: 106 inserted ✅
- **Medications**: 48 inserted ✅
- **Interactions**: 0 (awaiting import via one of the methods above)

## Data Summary

- **CSV File**: `artifacts/interactions_full.csv`
- **Total Rows**: 2,500 interactions
- **Unique Supplements**: 106
- **Unique Medications**: 48
- **Severity Distribution**:
  - Severe: ~6%
  - High: ~15%
  - Moderate: ~40%
  - Low: ~39%

## Post-Import Verification

After importing, verify the data:

```sql
SELECT count(*) FROM supplements;  -- Should return 106
SELECT count(*) FROM medications;  -- Should return 48
SELECT count(*) FROM interactions; -- Should return ~2,500

-- Test search function
SELECT * FROM search_interactions('warfarin') LIMIT 5;
SELECT * FROM search_interactions('vitamin d + metformin') LIMIT 5;
```

## Testing Search API

```bash
# Search for warfarin interactions
curl "https://your-site.netlify.app/.netlify/functions/search-interactions?q=warfarin"

# Search for combined query
curl "https://your-site.netlify.app/.netlify/functions/search-interactions?q=ginkgo+warfarin"
```

## Notes

- Import is idempotent (uses UPSERT with ON CONFLICT)
- Batch size: 500 rows per batch for optimal performance
- Import time: ~30-60 seconds for 2,500 interactions
- The Admin UI provides real-time feedback during import
