# Checker Benchmark Endpoint

## Overview

The benchmark endpoint measures server + Supabase latency and verifies the API contract for the interaction checker system.

## Endpoint

**URL:** `/.netlify/functions/checker-benchmark`
**Method:** `POST`
**Content-Type:** `application/json`

## Request Body

```json
{
  "inputs": ["omega-3", "warfarin", "aspirin"],
  "runs": 10
}
```

**Parameters:**
- `inputs` (array of strings, required): List of substance names to check. Minimum 2, maximum 25.
- `runs` (number, optional): Number of test runs. Default: 10. Capped at 50.

## Response

**Success (200):**

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
    "summary": {
      "total": 2,
      "avoid": 1,
      "caution": 1,
      "monitor": 0,
      "info": 0
    },
    "results_count": 2
  },
  "contract_ok": true
}
```

**Error (400/500):**

```json
{
  "ok": false,
  "error": "Provide at least 2 inputs."
}
```

## Fields Explained

### `stats`
- `p50_ms`: Median response time (50th percentile)
- `p95_ms`: 95th percentile response time
- `min_ms`: Fastest response time
- `max_ms`: Slowest response time
- `avg_ms`: Average response time

### `sample`
- Last response from the benchmark runs
- Includes the summary object and count of results
- Used to verify actual data returned

### `contract_ok`
- `true` if response has correct shape:
  - `results` is an array
  - `summary` has `total`, `avoid`, `caution`, `monitor`, `info` as numbers
- `false` if contract is violated

## Usage Examples

### cURL

```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/checker-benchmark \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": ["omega-3", "warfarin", "aspirin"],
    "runs": 20
  }'
```

### JavaScript

```javascript
const response = await fetch('/.netlify/functions/checker-benchmark', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    inputs: ['omega-3', 'warfarin', 'aspirin'],
    runs: 10
  })
});

const result = await response.json();
console.log(`P50: ${result.stats.p50_ms}ms`);
console.log(`P95: ${result.stats.p95_ms}ms`);
console.log(`Contract OK: ${result.contract_ok}`);
```

### Node.js Test Script

```javascript
const fetch = require('node-fetch');

async function benchmark() {
  const response = await fetch('http://localhost:8888/.netlify/functions/checker-benchmark', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inputs: ['omega-3', 'warfarin'],
      runs: 10
    })
  });

  const result = await response.json();
  console.log(JSON.stringify(result, null, 2));
}

benchmark();
```

## Use Cases

1. **Performance Testing**: Measure API response times under different loads
2. **Contract Verification**: Ensure API returns correct data shape after changes
3. **Database Health**: Detect performance degradation in Supabase RPC
4. **Load Testing**: Run multiple benchmarks to test sustained performance
5. **Monitoring**: Integrate into CI/CD to catch performance regressions

## Notes

- Each run calls the same Supabase RPC (`checker_get_interactions`)
- Timing includes network latency + database query time + response serialization
- Runs are capped at 50 to prevent abuse
- Input array is capped at 25 items (same as main endpoint)
- CORS is enabled for all origins

## Related: Database Health Check

For server-side database diagnostics, use the SQL health check function:

```sql
SELECT public.checker_healthcheck();
```

This returns:
- Live counts of substances, tokens, and interactions
- Sample RPC runs with timing (2, 5, 10, 20 inputs)
- Contract verification
- Full sample response

The SQL function measures database-only performance, while the Netlify endpoint measures full stack (Netlify + Supabase + network).

## Testing

Run the included test scripts:

```bash
# Test successful scenarios
node scripts/test-benchmark.cjs

# Test error handling
node scripts/test-benchmark-errors.cjs

# Test against production
BENCHMARK_URL=https://your-site.netlify.app/.netlify/functions/checker-benchmark \
  node scripts/test-benchmark.cjs
```
