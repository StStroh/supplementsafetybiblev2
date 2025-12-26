const { supabaseAdmin } = require("./_lib/supabaseAdmin.cjs");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=60",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: "Method Not Allowed" };
  }

  try {
    const { supplement, medication } = JSON.parse(event.body || "{}");
    if (!supplement || !medication) {
      return {
        statusCode: 400,
        headers: CORS,
        body: JSON.stringify({ ok: false, reason: "missing_params" }),
      };
    }

    const sp = supabaseAdmin();
    const suppNorm = normalize(supplement);
    const medNorm = normalize(medication);

    const { data: s } = await sp
      .from("supplements")
      .select("id,name")
      .eq("name_normalized", suppNorm)
      .maybeSingle();

    const { data: m } = await sp
      .from("medications")
      .select("id,name")
      .eq("name_normalized", medNorm)
      .maybeSingle();

    if (!s || !m) {
      return {
        statusCode: 404,
        headers: CORS,
        body: JSON.stringify({
          ok: false,
          reason: "not_found",
          pair: { supplement: s?.name || supplement, medication: m?.name || medication },
        }),
      };
    }

    const { data: inter } = await sp
      .from("interactions")
      .select("*")
      .eq("supplement_id", s.id)
      .eq("medication_id", m.id)
      .maybeSingle();

    if (!inter) {
      return {
        statusCode: 404,
        headers: CORS,
        body: JSON.stringify({
          ok: false,
          reason: "not_found",
          pair: { supplement: s.name, medication: m.name },
        }),
      };
    }

    const sources = typeof inter.sources === 'string' ? JSON.parse(inter.sources) : inter.sources || [];
    const recommendations = inter.recommendation.split(/\n|•/).filter(Boolean).map(r => r.trim());

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({
        ok: true,
        pair: { supplement: s.name, medication: m.name },
        severity: inter.severity,
        summary: inter.description,
        recommendations,
        mechanism: inter.mechanism || null,
        sources: sources.slice(0, sources.length),
        last_reviewed: inter.last_reviewed || null,
      }),
    };
  } catch (err) {
    console.error("[Check] Error:", err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
};

function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
