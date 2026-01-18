const { supabaseAdmin } = require("./_lib/supabaseAdmin.cjs");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
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
      return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Missing supplement/medication" }) };
    }
    const sp = supabaseAdmin();

    // Normalize on client side of query to match our "normalized" columns
    const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const { data: s } = await sp
      .from("supplements")
      .select("id,name,normalized")
      .eq("normalized", norm(supplement))
      .maybeSingle();

    const { data: m } = await sp
      .from("medications")
      .select("id,name,normalized")
      .eq("normalized", norm(medication))
      .maybeSingle();

    if (!s || !m) {
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ found: false }) };
    }

    const { data: inter } = await sp
      .from("interactions_view")
      .select("*")
      .eq("supplement_name", s.name)
      .eq("medication_name", m.name)
      .maybeSingle();

    if (!inter) {
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ found: false, supplement: s?.name, medication: m?.name }) };
    }

    return { statusCode: 200, headers: CORS, body: JSON.stringify({ found: true, interaction: inter }) };
  } catch (err) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
  }
};
