const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

function calculateStats(timings) {
  if (timings.length === 0) {
    return { p50_ms: 0, p95_ms: 0, min_ms: 0, max_ms: 0, avg_ms: 0 };
  }

  const sorted = [...timings].sort((a, b) => a - b);
  const sum = timings.reduce((acc, val) => acc + val, 0);

  const p50Index = Math.floor(sorted.length * 0.5);
  const p95Index = Math.floor(sorted.length * 0.95);

  return {
    p50_ms: sorted[p50Index],
    p95_ms: sorted[p95Index],
    min_ms: sorted[0],
    max_ms: sorted[sorted.length - 1],
    avg_ms: Math.round((sum / timings.length) * 1000) / 1000,
  };
}

function verifyContract(response) {
  if (!response || typeof response !== 'object') {
    return false;
  }

  if (!Array.isArray(response.results)) {
    return false;
  }

  const summary = response.summary;
  if (!summary || typeof summary !== 'object') {
    return false;
  }

  return (
    typeof summary.total === 'number' &&
    typeof summary.avoid === 'number' &&
    typeof summary.caution === 'number' &&
    typeof summary.monitor === 'number' &&
    typeof summary.info === 'number'
  );
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type, authorization",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ ok: false, error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const inputs = Array.isArray(body.inputs) ? body.inputs : [];
    let runs = typeof body.runs === 'number' ? body.runs : 10;

    if (runs < 1) runs = 1;
    if (runs > 50) runs = 50;

    const cleaned = inputs
      .map((x) => (typeof x === "string" ? x.trim() : ""))
      .filter(Boolean)
      .slice(0, 25);

    if (cleaned.length < 2) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          ok: false,
          error: "Provide at least 2 inputs.",
        }),
      };
    }

    const timings = [];
    let lastResponse = null;
    let contractOk = false;

    for (let i = 0; i < runs; i++) {
      const startTime = Date.now();

      const { data, error } = await supabase.rpc("checker_get_interactions", {
        input_names: cleaned,
      });

      const elapsed = Date.now() - startTime;
      timings.push(elapsed);

      if (error) {
        return {
          statusCode: 500,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            ok: false,
            error: error.message,
          }),
        };
      }

      if (i === runs - 1) {
        lastResponse = data;
        contractOk = verifyContract(data);
      }
    }

    const stats = calculateStats(timings);

    const sample = lastResponse
      ? {
          summary: lastResponse.summary,
          results_count: Array.isArray(lastResponse.results)
            ? lastResponse.results.length
            : 0,
        }
      : null;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        ok: true,
        runs: runs,
        stats: stats,
        sample: sample,
        contract_ok: contractOk,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        ok: false,
        error: String(err),
      }),
    };
  }
};
