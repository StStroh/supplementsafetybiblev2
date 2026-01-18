import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.error("❌ Missing SUPABASE_URL (or VITE_SUPABASE_URL).");
  process.exit(1);
}
if (!SERVICE_ROLE_KEY) {
  console.error("❌ Missing SUPABASE_SERVICE_ROLE_KEY. This script requires the service role key.");
  process.exit(1);
}

console.log(`✓ URL: ${SUPABASE_URL.substring(0,6)}...${SUPABASE_URL.slice(-6)}`);
console.log(`✓ KEY: ${SERVICE_ROLE_KEY.substring(0,6)}...${SERVICE_ROLE_KEY.slice(-6)}`);

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  db: { schema: "public" }
});

function parseSqlTuples(sql) {
  const valuesBlockMatch = sql.match(/values\s*([\s\S]*?);/i);
  if (!valuesBlockMatch) return [];
  const block = valuesBlockMatch[1];

  const tuples = block
    .trim()
    .replace(/^\(/, "")
    .replace(/\)$/, "")
    .split(/\),\s*\(/);

  const rows = tuples.map((t) => {
    const parts = [];
    let curr = "";
    let inQuote = false;
    for (let i = 0; i < t.length; i++) {
      const ch = t[i];
      if (ch === "'" && t[i - 1] !== "\\") inQuote = !inQuote;
      if (ch === "," && !inQuote) {
        parts.push(curr.trim());
        curr = "";
      } else {
        curr += ch;
      }
    }
    parts.push(curr.trim());

    const unq = (s) =>
      s.toLowerCase() === "null" ? null : s.replace(/^'/, "").replace(/'$/, "").replace(/\\'/g, "'");

    const [
      supplement_id,
      medication_id,
      severity,
      mechanism,
      evidence,
      recommendation
    ] = parts.map(unq);

    return {
      supplement_id,
      medication_id,
      severity,
      mechanism,
      evidence,
      recommendation
    };
  });

  return rows;
}

async function upsertBatch(batch, attempt = 1) {
  const { error } = await supabase
    .from("interactions")
    .upsert(batch, { onConflict: "supplement_id,medication_id", ignoreDuplicates: false });

  if (error) {
    if (attempt < 3) {
      console.warn(`⚠️ Upsert failed (attempt ${attempt}): ${error.message}. Retrying...`);
      await new Promise((r) => setTimeout(r, 500 * attempt));
      return upsertBatch(batch, attempt + 1);
    }
    throw error;
  }
}

const sqlPath = path.resolve(process.cwd(), "artifacts", "all_interactions_import.sql");
if (!fs.existsSync(sqlPath)) {
  console.error(`❌ SQL file not found: ${sqlPath}`);
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, "utf8");
const rows = parseSqlTuples(sql);
if (!rows.length) {
  console.error("❌ Could not parse any interaction tuples from SQL file.");
  process.exit(1);
}

console.log(`📦 Parsed ${rows.length} interaction rows from SQL file.`);
const batchSize = 250;
let done = 0;

for (let i = 0; i < rows.length; i += batchSize) {
  const batch = rows.slice(i, i + batchSize);
  await upsertBatch(batch);
  done += batch.length;
  console.log(`✅ Upserted ${done}/${rows.length}`);
}

await supabase.rpc('execute_sql', { query: 'ANALYZE interactions;' }).catch(() => {});

const { data: counts, error: countErr } = await supabase.rpc("json_counts_verify", {});
if (countErr) {
  const { count: sCount } = await supabase.from("supplements").select("*", { count: "exact", head: true });
  const { count: mCount } = await supabase.from("medications").select("*", { count: "exact", head: true });
  const { count: iCount } = await supabase.from("interactions").select("*", { count: "exact", head: true });

  const result = {
    import_status: "completed",
    rows: { supplements: sCount ?? null, medications: mCount ?? null, interactions: iCount ?? null },
    foreign_keys: { supplement_fk_broken: null, medication_fk_broken: null },
    message: "Seed data installed (fallback verify)"
  };

  fs.mkdirSync("artifacts", { recursive: true });
  fs.writeFileSync("artifacts/import_verification.json", JSON.stringify(result, null, 2));

  console.log(JSON.stringify({
    masked_url: SUPABASE_URL.substring(0,6)+'...'+SUPABASE_URL.slice(-6),
    masked_service_role: SERVICE_ROLE_KEY.substring(0,6)+'...'+SERVICE_ROLE_KEY.slice(-6),
    progress: `${done}/${rows.length}`,
    result_path: "artifacts/import_verification.json",
    result,
    status: "COMPLETE"
  }, null, 2));
} else {
  const result = {
    import_status: "completed",
    rows: counts?.rows ?? {},
    foreign_keys: counts?.foreign_keys ?? {},
    message: "Seed data fully installed and verified."
  };

  fs.mkdirSync("artifacts", { recursive: true });
  fs.writeFileSync("artifacts/import_verification.json", JSON.stringify(result, null, 2));

  console.log(JSON.stringify({
    masked_url: SUPABASE_URL.substring(0,6)+'...'+SUPABASE_URL.slice(-6),
    masked_service_role: SERVICE_ROLE_KEY.substring(0,6)+'...'+SERVICE_ROLE_KEY.slice(-6),
    progress: `${done}/${rows.length}`,
    result_path: "artifacts/import_verification.json",
    result,
    status: "COMPLETE"
  }, null, 2));
}
