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

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  db: { schema: "public" }
});

type InteractionRow = {
  supplement_id: string;
  medication_id: string;
  severity: string | null;
  mechanism: string | null;
  evidence: string | null;
  recommendation: string | null;
};

function parseSqlTuples(sql: string): InteractionRow[] {
  // Expect file artifacts/all_interactions_import.sql to contain:
  // INSERT INTO interactions (supplement_id, medication_id, severity, mechanism, evidence, recommendation) VALUES
  // ('uuid','uuid','Moderate','CYP3A4', 'B','Avoid'), (...), ...;
  const valuesBlockMatch = sql.match(/values\s*([\s\S]*?);/i);
  if (!valuesBlockMatch) return [];
  const block = valuesBlockMatch[1];

  // Split on "),(" boundaries while handling newlines/spaces
  const tuples = block
    .trim()
    .replace(/^\(/, "")
    .replace(/\)$/, "")
    .split(/\),\s*\(/);

  const rows: InteractionRow[] = tuples.map((t) => {
    // Split by comma but keep quoted commas intact
    const parts: string[] = [];
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

    const unq = (s: string) =>
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
      supplement_id: supplement_id as string,
      medication_id: medication_id as string,
      severity,
      mechanism,
      evidence,
      recommendation
    };
  });

  return rows;
}

async function upsertBatch(batch: InteractionRow[], attempt = 1): Promise<void> {
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

(async () => {
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

  // Verify counts
  const { data: counts, error: countErr } = await supabase.rpc("json_counts_verify", {});
  if (countErr) {
    // Fallback: do three count queries separately if helper is missing
    const { count: sCount } = await supabase.from("supplements").select("*", { count: "exact", head: true });
    const { count: mCount } = await supabase.from("medications").select("*", { count: "exact", head: true });
    const { count: iCount } = await supabase.from("interactions").select("*", { count: "exact", head: true });
    console.log(JSON.stringify({
      import_status: "completed",
      rows: { supplements: sCount ?? null, medications: mCount ?? null, interactions: iCount ?? null },
      foreign_keys: { supplement_fk_broken: null, medication_fk_broken: null },
      message: "Seed data installed (fallback verify)"
    }, null, 2));
    return;
  }

  console.log(JSON.stringify({
    import_status: "completed",
    rows: counts?.rows ?? {},
    foreign_keys: counts?.foreign_keys ?? {},
    message: "Seed data fully installed and verified."
  }, null, 2));
})();
