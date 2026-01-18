const { supabaseAdmin } = require("./_lib/supabaseAdmin.cjs");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
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
    const q = (url.searchParams.get("q") || "").trim();
    const type = (url.searchParams.get("type") || "any").toLowerCase();
    if (!q) {
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ supplements: [], medications: [] }) };
    }
    const like = `%${q}%`;

    const fetchSupps = () =>
      sp.from("supplements").select("id,name").ilike("name", like).order("name").limit(10);
    const fetchMeds = () =>
      sp.from("medications").select("id,name").ilike("name", like).order("name").limit(10);

    let supplements = [], medications = [];
    if (type === "supplement" || type === "any") {
      const { data } = await fetchSupps();
      supplements = data || [];
    }
    if (type === "medication" || type === "any") {
      const { data } = await fetchMeds();
      medications = data || [];
    }

    return { statusCode: 200, headers: CORS, body: JSON.stringify({ supplements, medications }) };
  } catch (err) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
  }
};
