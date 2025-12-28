# Checker System Diagnostics - Complete Guide

## Overview

Two complementary tools for monitoring and benchmarking the interaction checker system:

1. **SQL Health Check** - Database-level diagnostics
2. **Netlify Benchmark** - Full-stack performance testing

---

## 1. SQL Health Check Function

### Location
`supabase/migrations/20251228130000_checker_healthcheck.sql`

### Usage
```sql
SELECT public.checker_healthcheck();
```

### Returns
```json
{
  "counts": {
    "substances": 123,
    "substances_total": 125,
    "tokens": 456,
    "interactions": 789,
    "interactions_by_severity": {
      "avoid": 45,
      "caution": 120,
      "monitor": 234,
      "info": 390
    }
  },
  "sample_runs": [
    {
      "label": "2 inputs (minimum)",
      "input_count": 2,
      "elapsed_ms": 12.345,
      "summary": { "total": 1, "avoid": 0, "caution": 1, ... },
      "results_count": 1,
      "success": true
    },
    ...
  ],
  "verified": true,
  "verification_details": { ... },
  "sample_response": { "results": [...], "summary": {...} },
  "timestamp": "2025-12-28T13:00:00Z"
}
```

### What It Measures
- Database entity counts (substances, tokens, interactions)
- Direct RPC performance (database-only timing)
- Contract verification (canonical JSON shape)
- No network latency

### When to Use
- Verify database populated correctly
- Check RPC logic and query performance
- Diagnose database-level issues
- Monitor data integrity

---

## 2. Netlify Benchmark Endpoint

### Location
`netlify/functions/checker-benchmark.cjs`

### Endpoint
```
POST /.netlify/functions/checker-benchmark
Content-Type: application/json

{
  "inputs": ["omega-3", "warfarin", "aspirin"],
  "runs": 10
}
```

### Returns
```json
{
  "ok": true,
  "runs": 10,
  "stats": {
    "p50_ms": 145,
    "p95_ms": 189,
    "min_ms": 132,
    "max_ms": 201,
    "avg_ms": 152.4
  },
  "sample": {
    "summary": { "total": 2, "avoid": 1, "caution": 1, ... },
    "results_count": 2
  },
  "contract_ok": true
}
```

### What It Measures
- Full-stack response time (Netlify + Supabase + network)
- Statistical analysis (p50, p95, min, max, avg)
- Contract verification (end-to-end)
- Real-world user experience

### When to Use
- Measure actual user-facing performance
- Load testing and monitoring
- CI/CD performance regression checks
- Production health checks

---

## Comparison Matrix

| Feature | SQL Health Check | Netlify Benchmark |
|---------|------------------|-------------------|
| **Measures** | Database only | Full stack |
| **Network** | No | Yes |
| **Location** | Supabase | Netlify Function |
| **Access** | SQL query | HTTP POST |
| **Use Case** | Data integrity | User experience |
| **Timing** | Database query | End-to-end |
| **Contract Check** | ✅ | ✅ |
| **Statistics** | Basic | Percentiles |

---

## Quick Start

### Run SQL Health Check

```sql
-- Via Supabase Dashboard SQL Editor
SELECT public.checker_healthcheck();

-- Or via psql
psql $DATABASE_URL -c "SELECT public.checker_healthcheck();"
```

### Run Netlify Benchmark (Local)

```bash
# Start dev server
npm run netlify:dev

# Run test suite
node scripts/test-benchmark.cjs

# Test error handling
node scripts/test-benchmark-errors.cjs
```

### Run Netlify Benchmark (Production)

```bash
# Using curl
curl -X POST https://your-site.netlify.app/.netlify/functions/checker-benchmark \
  -H "Content-Type: application/json" \
  -d '{"inputs":["omega-3","warfarin"],"runs":10}'

# Using test script
BENCHMARK_URL=https://your-site.netlify.app/.netlify/functions/checker-benchmark \
  node scripts/test-benchmark.cjs
```

---

## Monitoring Strategy

### Development
1. Run SQL health check after data imports
2. Use benchmark endpoint to test full flow
3. Verify contract compliance before deployment

### Production
1. Schedule periodic SQL health checks (hourly/daily)
2. Run benchmark endpoint from external monitoring service
3. Alert on:
   - `contract_ok: false`
   - P95 > threshold (e.g., 500ms)
   - Error rate > 1%

### CI/CD Integration
```yaml
- name: Health Check
  run: |
    psql $DATABASE_URL -c "SELECT public.checker_healthcheck();"

- name: Performance Test
  run: |
    npm run netlify:dev &
    sleep 5
    node scripts/test-benchmark.cjs
```

---

## Troubleshooting

### SQL Health Check Returns Empty Data
- **Cause**: No data in tables
- **Fix**: Run data import scripts

### SQL Health Check Shows `verified: false`
- **Cause**: RPC returns incorrect JSON shape
- **Fix**: Check `checker_get_interactions` function implementation

### Benchmark Returns High Latency
- **Cause**: Network, cold start, or database performance
- **Solutions**:
  - Check Supabase connection pooling
  - Verify indexes exist on tables
  - Check Netlify function cold start times
  - Run SQL health check to isolate database

### Benchmark Returns `contract_ok: false`
- **Cause**: API contract broken
- **Fix**: Check `checker-get-interactions.cjs` and RPC function

---

## Files Reference

### SQL
- `supabase/migrations/20251228130000_checker_healthcheck.sql`

### Netlify Functions
- `netlify/functions/checker-benchmark.cjs`
- `netlify/functions/checker-get-interactions.cjs` (unchanged)

### Test Scripts
- `scripts/test-benchmark.cjs`
- `scripts/test-benchmark-errors.cjs`

### Documentation
- `CHECKER_BENCHMARK.md` - Detailed endpoint documentation
- `CHECKER_DIAGNOSTICS_SUMMARY.md` - This file

---

## Summary

Two complementary diagnostic tools provide complete visibility into the checker system:

✅ **SQL Health Check** - Verify data integrity and database performance
✅ **Netlify Benchmark** - Measure user-facing performance and contract compliance

Both tools verify the canonical contract: `{ results: [...], summary: { total, avoid, caution, monitor, info } }`
