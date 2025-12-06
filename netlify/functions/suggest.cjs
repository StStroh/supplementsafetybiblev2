const fetch = require("node-fetch");

function cors(headers = {}) {
  const origin = process.env.SITE_URL || "http://localhost:5173";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    ...headers,
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors(), body: "" };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers: cors(), body: "Method Not Allowed" };
  }

  try {
    const url = new URL(event.rawUrl);
    const q = (url.searchParams.get("q") || "").trim().toLowerCase();
    const kind = (url.searchParams.get("type") || "all").toLowerCase();
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "12", 10), 50);

    const popular = [
      { name: "Magnesium", type: "supplement" },
      { name: "Ashwagandha", type: "supplement" },
      { name: "Omega-3", type: "supplement" },
      { name: "Vitamin D", type: "supplement" },
      { name: "Fish Oil", type: "supplement" },
      { name: "Turmeric", type: "supplement" },
      { name: "Levothyroxine", type: "medication" },
      { name: "Sertraline", type: "medication" },
      { name: "Metformin", type: "medication" },
      { name: "Warfarin", type: "medication" },
      { name: "Lisinopril", type: "medication" },
      { name: "Atorvastatin", type: "medication" },
    ];

    if (!q) {
      const base =
        kind === "supplement" ? popular.filter(x => x.type === "supplement")
      : kind === "medication" ? popular.filter(x => x.type === "medication")
      : popular;
      return {
        statusCode: 200,
        headers: cors({ "Content-Type": "application/json" }),
        body: JSON.stringify(base.slice(0, limit)),
      };
    }

    const SB_URL = process.env.SUPABASE_URL;
    const SB_KEY = process.env.SUPABASE_ANON_KEY;
    if (SB_URL && SB_KEY) {
      const typeFilter = kind === "all" ? "" : `&type=eq.${encodeURIComponent(kind)}`;
      const endpoint = `${SB_URL}/rest/v1/substances?name=ilike.${encodeURIComponent('%' + q + '%')}${typeFilter}&select=name,type&limit=${limit}`;
      const resp = await fetch(endpoint, {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
      });
      if (resp.ok) {
        const rows = await resp.json();
        if (Array.isArray(rows) && rows.length) {
          return {
            statusCode: 200,
            headers: cors({ "Content-Type": "application/json" }),
            body: JSON.stringify(rows),
          };
        }
      }
    }

    const meds = ["Levothyroxine","Sertraline","Metformin","Lisinopril","Atorvastatin","Ibuprofen","Omeprazole","Warfarin","Amlodipine","Losartan"];
    const supps = ["Magnesium","Zinc","Vitamin D","Omega-3","Creatine","Turmeric","Ashwagandha","St. John's Wort","Ginkgo Biloba","Kava"];
    const fallback = [
      ...supps.map(n => ({ name: n, type: "supplement" })),
      ...meds.map(n => ({ name: n, type: "medication" })),
    ].filter(x => (kind === "all" || x.type === kind) && x.name.toLowerCase().includes(q))
     .slice(0, limit);

    return {
      statusCode: 200,
      headers: cors({ "Content-Type": "application/json" }),
      body: JSON.stringify(fallback),
    };
  } catch (e) {
    return { statusCode: 500, headers: cors(), body: "suggest error: " + (e?.message || "unknown") };
  }
};
