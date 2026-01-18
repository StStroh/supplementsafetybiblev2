const { supabaseAdmin } = require("./_lib/supabaseAdmin.cjs");
const Stripe = require("stripe");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }

  const startTime = Date.now();
  const checks = {
    supabase: { status: "unknown", latency: 0, error: null },
    stripe: { status: "unknown", latency: 0, error: null },
    database: { supplements: 0, medications: 0, interactions: 0 },
  };

  try {
    const supabaseStart = Date.now();
    const sp = supabaseAdmin();

    const [suppCount, medCount, interCount] = await Promise.all([
      sp.from("supplements").select("id", { count: "exact", head: true }),
      sp.from("medications").select("id", { count: "exact", head: true }),
      sp.from("interactions").select("id", { count: "exact", head: true }).eq("is_active", true),
    ]);

    checks.supabase.latency = Date.now() - supabaseStart;
    checks.supabase.status = "ok";
    checks.database.supplements = suppCount.count || 0;
    checks.database.medications = medCount.count || 0;
    checks.database.interactions = interCount.count || 0;
  } catch (err) {
    checks.supabase.status = "error";
    checks.supabase.error = err.message;
  }

  try {
    const stripeStart = Date.now();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
    await stripe.products.list({ limit: 1 });
    checks.stripe.latency = Date.now() - stripeStart;
    checks.stripe.status = "ok";
  } catch (err) {
    checks.stripe.status = "error";
    checks.stripe.error = err.message;
  }

  const totalLatency = Date.now() - startTime;
  const allOk = checks.supabase.status === "ok" && checks.stripe.status === "ok";

  return {
    statusCode: allOk ? 200 : 503,
    headers: CORS,
    body: JSON.stringify({
      ok: allOk,
      timestamp: new Date().toISOString(),
      totalLatency,
      checks,
    }),
  };
};
