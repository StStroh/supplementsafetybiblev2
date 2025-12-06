import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SB_URL || !SB_KEY) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const csvPath = path.resolve(__dirname, '..', "data/substances_2500.csv");
if (!fs.existsSync(csvPath)) {
  console.error(`❌ CSV not found: ${csvPath}`);
  console.log("Run: node scripts/generate-substances-csv.cjs first");
  process.exit(1);
}

console.log(`📂 Reading CSV from: ${csvPath}`);
const raw = fs.readFileSync(csvPath, "utf8").trim();
const [header, ...lines] = raw.split(/\r?\n/);

if (!/^name,type$/i.test(header || "")) {
  console.error("❌ CSV header must be: name,type");
  process.exit(1);
}

const rows = lines
  .map(l => l.split(","))
  .map(([name, type]) => ({ name: name?.trim(), type: type?.trim() }))
  .filter(r => r.name && (r.type === "supplement" || r.type === "medication"));

console.log(`📊 Found ${rows.length} valid substances`);
console.log(`   Supplements: ${rows.filter(r => r.type === 'supplement').length}`);
console.log(`   Medications: ${rows.filter(r => r.type === 'medication').length}`);

const chunk = 500;
let imported = 0;

for (let i = 0; i < rows.length; i += chunk) {
  const slice = rows.slice(i, i + chunk);

  try {
    const res = await fetch(`${SB_URL}/rest/v1/substances`, {
      method: "POST",
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(slice),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error(`❌ Upsert error at batch ${Math.floor(i / chunk) + 1}:`, res.status, txt);
      process.exit(1);
    }

    imported += slice.length;
    const progress = Math.round((imported / rows.length) * 100);
    console.log(`✅ Batch ${Math.floor(i / chunk) + 1}: Upserted ${imported}/${rows.length} (${progress}%)`);
  } catch (err) {
    console.error(`❌ Network error at batch ${Math.floor(i / chunk) + 1}:`, err.message);
    process.exit(1);
  }
}

console.log(`\n🎉 Seed complete! Imported ${imported} substances to Supabase.`);
console.log(`\n✅ Next: Test the autocomplete API`);
console.log(`   curl "/.netlify/functions/suggest?q=mag&type=supplement"`);
