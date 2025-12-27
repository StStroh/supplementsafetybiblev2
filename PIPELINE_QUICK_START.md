# Checker Pipeline - Quick Start

**Zero spreadsheet work. Four commands. Complete checker database.**

---

## Prerequisites

1. **.env file with:**
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Required!
   ```

2. **Raw data file:**
   - Create `data/interactions_raw.csv` with columns:
     - `a_name`, `a_type`, `b_name`, `b_type`, `severity`, `summary_short`
     - See `data/interactions_raw.csv` for example format

---

## The 4 Commands

```bash
# Step 1: Generate substances from interactions
node scripts/generate-substances-from-interactions.cjs

# Step 2: Import substances to database
node scripts/import-checker-substances.cjs

# Step 3: Generate interactions seed file
node scripts/generate-interactions-from-raw.cjs

# Step 4: Import interactions to database
node scripts/seed-interactions-generated.cjs
```

---

## What Each Step Does

| Step | Input | Output | Time |
|------|-------|--------|------|
| 1 | `interactions_raw.csv` | `substances.csv` | ~1 sec |
| 2 | `substances.csv` | DB: `checker_substances` | ~2 sec |
| 3 | `interactions_raw.csv` + `substances.csv` | `seed-interactions-generated.cjs` | ~1 sec |
| 4 | `seed-interactions-generated.cjs` | DB: `checker_interactions` | ~3 sec |

**Total: ~7 seconds**

---

## Generated IDs

### Supplements
- "Ginkgo" → `S_GINKGO`
- "St. John's Wort" → `S_STJOHNSWORT`
- "Fish Oil" → `S_FISHOIL`
- "Vitamin E" → `S_VITAMINE`

### Drugs
- "Warfarin" → `D_WARFARIN`
- "Fluoxetine" → `D_FLUOXETINE`
- "Levothyroxine" → `D_LEVOTHYROXINE`

**Pattern**: `<S or D>_<UPPERCASE_NO_PUNCTUATION_OR_SPACES>`

---

## Aliases (Auto-Generated)

**Formatting variants only:**
- Lowercase: "ginkgo biloba"
- No punctuation: "st johns wort"
- No apostrophes: "st johns wort"

**Medical synonyms** (e.g., "Coumadin" for "Warfarin") must be added manually.

---

## CSV Format

### interactions_raw.csv

```csv
a_name,a_type,b_name,b_type,severity,summary_short,mechanism,clinical_effect,management
Ginkgo,supplement,Warfarin,drug,caution,Increased bleeding risk,...,...,...
"St. John's Wort",supplement,Fluoxetine,drug,avoid,Severe serotonin syndrome,...,...,...
Calcium,supplement,Iron,supplement,monitor,Calcium reduces iron absorption,...,...,...
```

**Required:** `a_name`, `b_name`, `severity`, `summary_short`

**Optional:** `a_type`, `b_type`, `mechanism`, `clinical_effect`, `management`, `evidence_grade`, `confidence`

---

## Testing

```bash
# Start dev server
npm run dev

# Open checker
http://localhost:5173/check

# Test Mode A (Supplement + Drug):
1. Add "Ginkgo" (supplement)
2. Add "Warfarin" (drug)
3. Click "Run Check"
4. Should show 1 caution interaction

# Test Mode B (Supplement + Supplement):
1. Click "Supplements + Supplements" mode
2. Add "Ginkgo" and "Vitamin E"
3. Click "Run Check"
4. Should show 1 caution interaction
```

---

## Updating Data

### Add New Interactions

```bash
# 1. Add rows to interactions_raw.csv
# 2. Run all 4 steps
# Existing data preserved, new data added (upsert)
```

### Modify Existing

```bash
# 1. Edit rows in interactions_raw.csv
# 2. Run Steps 3-4 only
# Interactions updated by interaction_id
```

---

## Common Issues

### "No input file found"
→ Create `data/interactions_raw.csv`

### "SUPABASE_SERVICE_ROLE_KEY not found"
→ Add to `.env` file

### "Could not find IDs for..."
→ Check spelling consistency in raw data

### Duplicate key errors
→ These are fine! Upsert handles them

---

## Files Generated (Don't Commit)

- `data/substances.csv`
- `scripts/seed-interactions-generated.cjs`

## Files To Commit

- `data/interactions_raw.csv` (your source data)
- All `/scripts/*.cjs` scripts (except *-generated.cjs)

---

## Full Documentation

See `AUTOMATED_CHECKER_PIPELINE.md` for complete details.

---

## Quick Verification

```bash
# Check substance count
psql -c "SELECT type, COUNT(*) FROM checker_substances GROUP BY type;"

# Check interaction count
psql -c "SELECT severity, COUNT(*) FROM checker_interactions GROUP BY severity;"
```

---

## That's It!

**Before:** Hours of spreadsheet work
**After:** 4 commands, 7 seconds, done ✅
