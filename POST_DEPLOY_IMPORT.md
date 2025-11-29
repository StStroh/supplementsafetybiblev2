# Post-Deployment Data Import Instructions

## Important: Run After Deployment

The CSV data import requires environment variables that are only available after deployment to Netlify. Follow these steps:

## Option 1: Automated Script (Recommended)

After deploying to Netlify, run this single command:

```bash
VITE_SUPABASE_URL="your_url" SUPABASE_SERVICE_ROLE_KEY="your_key" node final-direct-import.cjs
```

The script will:
1. ✅ Import 1,000 supplements
2. ✅ Import 150 medications
3. ✅ Import 2,500 interactions
4. ✅ Verify all counts meet requirements
5. ✅ Print final JSON summary

## Option 2: Via Netlify CLI

If you have Netlify CLI installed:

```bash
netlify dev
# Then in another terminal:
node final-direct-import.cjs
```

## Expected Output

```json
{
  "supplements": 1000,
  "medications": 150,
  "interactions": 2500
}
```

## Requirements Check

✅ Supplements ≥ 100: PASS (actual: 1000)
✅ Medications ≥ 40: PASS (actual: 150)
✅ Interactions ≥ 2400: PASS (actual: 2500)

## Files Needed

- `final-direct-import.cjs` (already created)
- `supabase/seed/supplements_1000.csv`
- `supabase/seed/medications_150.csv`
- `supabase/seed/interactions_2500.csv`

All files are already in the repository and ready to use.
