# CSV Import Instructions

## Summary

Successfully generated UPSERT SQL for all 2,500 interactions from `interactions_full.csv`.

## Import Status

- **CSV File**: `/tmp/cc-agent/59885259/project/artifacts/interactions_full.csv`
- **Rows in CSV**: 2,500
- **Current DB rows**: 103 interactions
- **SQL File Generated**: `FULL_CSV_IMPORT.sql` (1.4 MB)
- **Import Method**: UPSERT with `ON CONFLICT` handling

## Column Mapping

The CSV columns are mapped as follows:
- `supplement_name` → looked up in `supplements` table
- `medication_name` → looked up in `medications` table
- `severity` → severity level
- `description` → interaction description
- `recommendation` → clinical recommendation

**Note**: The CSV does not have a `source` column, so that field will remain NULL.

## Execution Options

### Option 1: Manual Execution (Recommended - Fastest)

1. Go to your Supabase Dashboard → SQL Editor
2. Open the file `FULL_CSV_IMPORT.sql` from this project
3. Copy the entire contents (1.4 MB, 2,500 INSERT statements)
4. Paste into SQL Editor and click "Run"
5. Wait ~30-60 seconds for completion

### Option 2: Batch Execution via Chat (Verbose)

The SQL has been split into 50 batch files at `/tmp/csv-import-batches/batch_*.sql` (50 rows each).

Continue execution by having Claude execute each batch via MCP tool:
- Each batch takes ~1 message
- Total: 50 messages required
- Time: ~10-15 minutes

### Option 3: Super-batch Execution (Medium)

Combined into 10 super-batches at `/tmp/csv-super-batches/super_batch_*.sql` (250 rows each).

Execute via:
- 10 sequential executions
- ~135 KB per batch
- May hit size limits

## SQL Logic

Each INSERT uses UPSERT pattern:

```sql
INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation)
VALUES (
  (SELECT id FROM supplements WHERE lower(name) = lower('...')),
  (SELECT id FROM medications WHERE lower(name) = lower('...')),
  'severity_value',
  'description_text',
  'recommendation_text'
)
ON CONFLICT (supplement_id, medication_id)
DO UPDATE SET
  severity = EXCLUDED.severity,
  description = EXCLUDED.description,
  recommendation = EXCLUDED.recommendation;
```

## Verification Queries

After import completes, run these queries:

### Total Count
```sql
SELECT COUNT(*) as total FROM interactions;
```
Expected: 2,500+ (some may update existing rows)

### Severity Distribution
```sql
SELECT severity, COUNT(*)
FROM interactions
GROUP BY severity
ORDER BY COUNT(*) DESC;
```

### Check for Duplicates
```sql
SELECT supplement_id, medication_id, COUNT(*)
FROM interactions
GROUP BY supplement_id, medication_id
HAVING COUNT(*) > 1;
```
Expected: 0 rows (unique constraint enforced)

### Sample Data Check
```sql
SELECT
  s.name as supplement,
  m.name as medication,
  i.severity,
  LEFT(i.description, 50) as description_preview
FROM interactions i
JOIN supplements s ON s.id = i.supplement_id
JOIN medications m ON m.id = i.medication_id
ORDER BY i.created_at DESC
LIMIT 10;
```

## Current Status

✅ CSV parsed (2,500 rows)
✅ SQL generated with UPSERT logic
✅ Split into 50 batches (50 rows each)
✅ Consolidated into single file (FULL_CSV_IMPORT.sql)
⏳ **Awaiting execution decision**

## Recommendation

**Use Option 1 (Manual Dashboard Execution)** for fastest completion:
- Single operation
- ~1 minute total time
- No chat overhead
- Immediate verification possible

Let me know which option you prefer!
