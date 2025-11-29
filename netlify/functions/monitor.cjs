const fetch = (...args) => import("node-fetch").then(({default: f}) => f(...args));

const TARGETS = [
  "/",
  "/pricing",
  "/premium",
  "/premium/thanks",
  "/.netlify/functions/create-checkout-session",
  "/.netlify/functions/create-portal-session",
];

exports.handler = async () => {
  const base = process.env.SITE_URL || process.env.URL || "";
  const hook = process.env.MONITOR_WEBHOOK_URL;
  const results = [];

  for (const p of TARGETS) {
    const url = `${base}${p}`;
    try {
      const res = await fetch(url, { method: "GET" });
      results.push({ path: p, status: res.status });
    } catch (e) {
      results.push({ path: p, status: 0, error: String(e && e.message) });
    }
  }

  const failed = results.filter(r => r.status !== 200 && r.status !== 405);
  if (failed.length && hook) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "monitor-bot",
          site: base,
          failed,
          all: results,
          ts: new Date().toISOString(),
        }),
      });
    } catch {}
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: !failed.length, results }),
  };
};
