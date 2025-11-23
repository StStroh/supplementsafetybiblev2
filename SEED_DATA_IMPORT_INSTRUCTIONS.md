# Seed Data Import Instructions

## Summary

The CSV seed data has been processed and converted to SQL files that match your Supabase database schema.

## Issues Found and Fixed

### 1. Schema Mismatches
- **Supplements**: CSV had integer `id`, database expects UUID (auto-generated)
- **Medications**: CSV had `class` column, database has `category` column
- **Interactions**: CSV had `evidence`, `mechanism`, `notes` columns; database has `description` and `recommendation`

### 2. Solution
Generated SQL files that:
- Let PostgreSQL generate UUIDs automatically
- Map `class` → `category` for medications
- Combine `mechanism` + `evidence` → `description` for interactions
- Map `notes` → `recommendation` for interactions
- Use `ON CONFLICT (name) DO NOTHING` to avoid duplicates

## Generated Files

All SQL files are in: `scripts/sql-mapped/`

```
01_supplements_batch_1.sql    (250 supplements)
01_supplements_batch_2.sql    (250 supplements)
01_supplements_batch_3.sql    (250 supplements)
01_supplements_batch_4.sql    (250 supplements)
02_medications_batch_1.sql    (150 medications)
03_interactions_batch_01.sql  (250 interactions)
03_interactions_batch_02.sql  (250 interactions)
03_interactions_batch_03.sql  (250 interactions)
03_interactions_batch_04.sql  (250 interactions)
03_interactions_batch_05.sql  (250 interactions)
03_interactions_batch_06.sql  (250 interactions)
03_interactions_batch_07.sql  (250 interactions)
03_interactions_batch_08.sql  (250 interactions)
03_interactions_batch_09.sql  (250 interactions)
03_interactions_batch_10.sql  (250 interactions)
03_interactions_batch_11.sql  (remaining interactions)
99_verify_counts.sql          (verification queries)
```

## Import Methods

### Option 1: Supabase SQL Editor (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/cyxfxjoadzxhxwxjqkez
2. Navigate to **SQL Editor**
3. Execute files in order:
   - First: All `01_supplements_batch_*.sql` files
   - Second: `02_medications_batch_1.sql`
   - Third: All `03_interactions_batch_*.sql` files
   - Finally: `99_verify_counts.sql` to verify

### Option 2: Command Line (psql)

If you have psql installed and the service role key:

```bash
# Set your connection string
export DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

# Execute all files in order
cd scripts/sql-mapped
for file in 01_supplements_batch_*.sql; do
  psql "$DATABASE_URL" -f "$file"
done

psql "$DATABASE_URL" -f 02_medications_batch_1.sql

for file in 03_interactions_batch_*.sql; do
  psql "$DATABASE_URL" -f "$file"
done

# Verify counts
psql "$DATABASE_URL" -f 99_verify_counts.sql
```

### Option 3: Combined File

A combined file with all base data (supplements + medications) is available:

```bash
scripts/import_all_base_data.sql
```

You can copy/paste this into Supabase SQL Editor.

## Expected Counts After Import

```
supplements:   1,000 rows (10 already exist from initial migration)
medications:     150 rows (10 already exist from initial migration)
interactions: 2,500 rows (10 already exist from initial migration)
```

## Verification

After import, run this query in Supabase SQL Editor:

```sql
SELECT 'supplements' as table_name, COUNT(*) as count FROM supplements
UNION ALL
SELECT 'medications' as table_name, COUNT(*) as count FROM medications
UNION ALL
SELECT 'interactions' as table_name, COUNT(*) as count FROM interactions;
```

Expected results:
- supplements: ~1000 rows
- medications: ~150 rows
- interactions: ~2500 rows

## Notes

- All imports use `ON CONFLICT (name) DO NOTHING` so they're safe to re-run
- The `interactions` table creates temporary mapping tables to link supplement/medication names to their UUIDs
- RLS policies are already in place and will not be affected by the import
- Imports bypass RLS automatically when using the service role or SQL Editor

## Troubleshooting

### If imports fail:

1. **Check RLS**: Imports from SQL Editor automatically bypass RLS
2. **Check foreign keys**: Interactions reference supplements/medications by name
3. **Check constraints**: Severity must be 'low', 'moderate', 'high', or 'severe'

### If counts don't match:

1. Some rows may have been skipped due to duplicate names
2. Some interactions may reference non-existent supplements/medications
3. Run the verification query to see actual counts

## Current Database State

Before import:
- supplements: 10 rows
- medications: 10 rows
- interactions: 10 rows

These were created during the initial migration and can be kept or deleted.

## Clean Start (Optional)

If you want to start fresh:

```sql
-- WARNING: This deletes all data
TRUNCATE interactions, medications, supplements CASCADE;

-- Then run the import files
```

---

## Quick Start

1. Open Supabase SQL Editor
2. Copy/paste each file from `scripts/sql-mapped/` in numerical order
3. Run `99_verify_counts.sql` to confirm
4. Done!

Total time: ~5-10 minutes for manual copy/paste, or ~1 minute with psql command-line.
