const { supabaseAdmin } = require("./_lib/supabaseAdmin.cjs");

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

    try {
      const sp = supabaseAdmin();
      const results = [];

      if (kind === "supplement" || kind === "all") {
        const { data: supps } = await sp
          .from("supplements")
          .select("name")
          .ilike("name", `%${q}%`)
          .order("name")
          .limit(limit);

        if (supps && supps.length > 0) {
          results.push(...supps.map(s => ({ name: s.name, type: "supplement" })));
        }
      }

      if (kind === "medication" || kind === "all") {
        const { data: meds } = await sp
          .from("medications")
          .select("name")
          .ilike("name", `%${q}%`)
          .order("name")
          .limit(limit);

        if (meds && meds.length > 0) {
          results.push(...meds.map(m => ({ name: m.name, type: "medication" })));
        }
      }

      if (results.length > 0) {
        return {
          statusCode: 200,
          headers: cors({ "Content-Type": "application/json" }),
          body: JSON.stringify(results.slice(0, limit)),
        };
      }
    } catch (dbErr) {
      console.error('[suggest] Database query error:', dbErr);
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
