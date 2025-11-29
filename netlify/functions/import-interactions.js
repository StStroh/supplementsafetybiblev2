// netlify/functions/import-interactions.js
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

// Simple supabase admin client
function supabaseAdmin() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE,
    { auth: { persistSession: false } }
  );
}

// Simple CSV parser that supports quotes
function parseCSV(text) {
  const rows = [];
  let field = "", row = [], inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] !== '"') { inQuotes = false; continue; }
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; continue; }
      field += c; continue;
    }
    if (c === '"') { inQuotes = true; continue; }
    if (c === ",") { row.push(field); field = ""; continue; }
    if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; continue; }
    if (c === "\r") continue;
    field += c;
  }
  row.push(field);
  rows.push(row);
  return rows;
}

function csvToObjects(csv) {
  const rows = parseCSV(csv);
  if (rows.length < 2) return [];
  const header = rows[0].map(h => h.trim().toLowerCase().replace(/\s+/g, "_"));
  return rows.slice(1).map(cols => {
    const o = {};
    header.forEach((h, i) => (o[h] = (cols[i] || "").trim()));
    return o;
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS")
    return { statusCode: 200, headers: CORS, body: "" };

  if (event.httpMethod !== "POST")
    return { statusCode: 405, headers: CORS, body: "Method Not Allowed" };

  // Security
  const auth = event.headers.authorization || "";
  const token = auth.replace("Bearer ", "");
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return { statusCode: 401, headers: CORS, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  try {
    // Load CSV from repo
    const csvPath = path.join(process.cwd(), "artifacts", "interactions_full.csv");
    const csv = fs.readFileSync(csvPath, "utf8");

    const rows = csvToObjects(csv);
    const sp = supabaseAdmin();

    let upserted = 0, failed = 0, skipped = 0;

    for (const r of rows) {
      const { supplement_name, medication_name, severity, description, recommendation } = r;
      if (!supplement_name || !medication_name || !severity || !description || !recommendation) {
        skipped++; continue;
      }

      const sev = severity.toLowerCase();
      if (!["low", "moderate", "high", "severe"].includes(sev)) {
        skipped++; continue;
      }

      const { error } = await sp.rpc("upsert_interaction", {
        p_supplement: supplement_name,
        p_medication: medication_name,
        p_severity: sev,
        p_description: description,
        p_recommendation: recommendation,
      });

      if (error) failed++;
      else upserted++;
    }

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({
        ok: true,
        total: rows.length,
        upserted,
        skipped,
        failed,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
