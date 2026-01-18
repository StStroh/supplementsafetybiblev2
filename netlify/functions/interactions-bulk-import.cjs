const { supabaseAdmin } = require("./_lib/supabaseAdmin.cjs");
const fs = require("fs");
const path = require("path");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-admin-token",
};

const BATCH_SIZE = 500;

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    const adminToken = event.headers["x-admin-token"];
    const expectedToken = process.env.ADMIN_IMPORT_TOKEN;

    if (!adminToken || adminToken !== expectedToken) {
      return {
        statusCode: 401,
        headers: CORS,
        body: JSON.stringify({ error: "Unauthorized: Invalid or missing x-admin-token" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const dryRun = body.dryRun === true;

    let csvContent = "";

    if (body.url && body.url.startsWith("sandbox:")) {
      const filePath = body.url.replace("sandbox:", "");
      const fullPath = path.resolve(process.cwd(), filePath);
      csvContent = fs.readFileSync(fullPath, "utf-8");
    } else if (body.csvData) {
      csvContent = body.csvData;
    } else {
      return {
        statusCode: 400,
        headers: CORS,
        body: JSON.stringify({ error: "Missing csvData or url parameter" }),
      };
    }

    const rows = parseCSV(csvContent);
    console.log(`[Import] Parsed ${rows.length} rows from CSV`);

    const validRows = [];
    const quarantined = [];

    for (const row of rows) {
      const validation = validateRow(row);
      if (validation.valid) {
        validRows.push(row);
      } else {
        quarantined.push({ raw: row, reason: validation.reason });
      }
    }

    console.log(`[Import] Valid: ${validRows.length}, Quarantined: ${quarantined.length}`);

    if (dryRun) {
      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({
          dryRun: true,
          total: rows.length,
          valid: validRows.length,
          quarantined: quarantined.length,
          preview: validRows.slice(0, 10),
          quarantinedSample: quarantined.slice(0, 5),
        }),
      };
    }

    const sp = supabaseAdmin();
    const stats = {
      created: 0,
      updated: 0,
      quarantined: 0,
      errors: [],
    };

    for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
      const batch = validRows.slice(i, i + BATCH_SIZE);
      console.log(`[Import] Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(validRows.length / BATCH_SIZE)}`);

      try {
        const batchResult = await processBatch(sp, batch);
        stats.created += batchResult.created;
        stats.updated += batchResult.updated;
      } catch (err) {
        console.error(`[Import] Batch error:`, err);
        stats.errors.push({ batch: i, error: err.message });
      }
    }

    if (quarantined.length > 0) {
      const { error: qError } = await sp
        .from("interactions_quarantine")
        .insert(quarantined.map(q => ({ raw: q.raw, reason: q.reason })));

      if (qError) {
        console.error("[Import] Quarantine insert error:", qError);
      } else {
        stats.quarantined = quarantined.length;
      }
    }

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify(stats),
    };
  } catch (err) {
    console.error("[Import] Error:", err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

function parseCSV(content) {
  const lines = content.split("\n").filter(Boolean);
  if (lines.length < 2) return [];

  const header = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== header.length) continue;

    const row = {};
    header.forEach((key, idx) => {
      row[key] = values[idx];
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function validateRow(row) {
  if (!row.supplement_name || !row.medication_name) {
    return { valid: false, reason: "Missing supplement_name or medication_name" };
  }

  if (!row.severity || !["low", "moderate", "high", "severe"].includes(row.severity.toLowerCase())) {
    return { valid: false, reason: "Invalid or missing severity" };
  }

  if (!row.description || !row.recommendation) {
    return { valid: false, reason: "Missing description or recommendation" };
  }

  return { valid: true };
}

async function processBatch(sp, batch) {
  const stats = { created: 0, updated: 0 };

  for (const row of batch) {
    const suppNorm = normalize(row.supplement_name);
    const medNorm = normalize(row.medication_name);

    let { data: supp } = await sp
      .from("supplements")
      .select("id")
      .eq("name_normalized", suppNorm)
      .maybeSingle();

    if (!supp) {
      const { data: newSupp } = await sp
        .from("supplements")
        .insert({ name: row.supplement_name, name_normalized: suppNorm })
        .select("id")
        .single();
      supp = newSupp;
    }

    let { data: med } = await sp
      .from("medications")
      .select("id")
      .eq("name_normalized", medNorm)
      .maybeSingle();

    if (!med) {
      const { data: newMed } = await sp
        .from("medications")
        .insert({ name: row.medication_name, name_normalized: medNorm })
        .select("id")
        .single();
      med = newMed;
    }

    const sources = [];
    if (row.source_1) sources.push({ title: row.source_1 });
    if (row.source_2) sources.push({ title: row.source_2 });

    const interactionData = {
      supplement_id: supp.id,
      medication_id: med.id,
      severity: row.severity.toLowerCase(),
      description: row.description,
      recommendation: row.recommendation,
      mechanism: row.mechanism || null,
      last_reviewed: row.last_reviewed || null,
      sources: JSON.stringify(sources),
      is_active: true,
    };

    const { data: existing } = await sp
      .from("interactions")
      .select("id")
      .eq("supplement_id", supp.id)
      .eq("medication_id", med.id)
      .maybeSingle();

    if (existing) {
      await sp.from("interactions").update(interactionData).eq("id", existing.id);
      stats.updated++;
    } else {
      await sp.from("interactions").insert(interactionData);
      stats.created++;
    }
  }

  return stats;
}

function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
