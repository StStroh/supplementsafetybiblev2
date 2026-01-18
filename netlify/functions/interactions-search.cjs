const { supabaseAdmin } = require("./_lib/supabaseAdmin.cjs");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers: CORS, body: "Method Not Allowed" };
  }

  try {
    const sp = supabaseAdmin();
    const url = new URL(event.rawUrl);
    const query = (url.searchParams.get("query") || url.searchParams.get("q") || "").trim();

    if (!query) {
      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({ ok: true, matches: [] }),
      };
    }

    const normalized = normalize(query);
    const like = `%${query}%`;

    const [suppsResult, medsResult] = await Promise.all([
      sp
        .from("supplements")
        .select("id,name,name_normalized")
        .or(`name.ilike.${like},name_normalized.ilike.%${normalized}%`)
        .order("name")
        .limit(15),
      sp
        .from("medications")
        .select("id,name,name_normalized")
        .or(`name.ilike.${like},name_normalized.ilike.%${normalized}%`)
        .order("name")
        .limit(15),
    ]);

    const supplements = (suppsResult.data || []).map(s => ({ type: "supplement", name: s.name, id: s.id }));
    const medications = (medsResult.data || []).map(m => ({ type: "medication", name: m.name, id: m.id }));

    const matches = [...supplements, ...medications].slice(0, 25);

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ ok: true, matches }),
    };
  } catch (err) {
    console.error("[Search] Error:", err);
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
