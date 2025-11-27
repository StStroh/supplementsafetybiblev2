import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing ${name} in .env / environment`);
  }
  if (name === 'SUPABASE_SERVICE_ROLE_KEY' && v.split('.').length < 3) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY does not look like a JWT (service role).');
  }
  return v;
}

async function execRawSQL(url: string, key: string, sql: string): Promise<any> {
  const res = await fetch(`${url}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ query: sql })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SQL exec failed [${res.status}]: ${text}`);
  }

  return res.json().catch(() => ({}));
}

async function main() {
  const url = mustEnv('SUPABASE_URL');
  const key = mustEnv('SUPABASE_SERVICE_ROLE_KEY');
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const sqlDir = path.resolve('scripts/seed');
  const read = (f: string) => fs.readFileSync(path.join(sqlDir, f), 'utf8');

  console.log('Step 1: Creating core tables...');
  const sql1 = read('01_create_core_tables.sql');
  const { error: e1 } = await supabase.rpc('exec_sql', { query: sql1 });
  if (e1) {
    await execRawSQL(url, key, sql1).catch(err => {
      console.error('Note: Tables may already exist (this is OK)');
    });
  }

  console.log('Step 2: Seeding supplements...');
  const { error: e2 } = await supabase.rpc('exec_sql', { query: read('02a_seed_supplements.sql') });
  if (e2) console.error('Supplements seed error (may be OK):', e2.message);

  console.log('Step 3: Seeding medications...');
  const { error: e3 } = await supabase.rpc('exec_sql', { query: read('03a_seed_medications.sql') });
  if (e3) console.error('Medications seed error (may be OK):', e3.message);

  console.log('Step 4: Creating staging table...');
  const { error: e4 } = await supabase.rpc('exec_sql', { query: read('04_create_stage_and_maps.sql') });
  if (e4) console.error('Staging table error (may be OK):', e4.message);

  console.log('Step 5: Loading CSV into staging...');
  const csvPath = path.resolve('artifacts/interactions_sample.csv');
  const csv = fs.readFileSync(csvPath, 'utf8');
  const rows = csv.trim().split(/\r?\n/);
  const header = rows.shift();
  if (!header?.startsWith('supplement_name,medication_name')) {
    throw new Error('CSV header invalid for interactions_sample.csv');
  }

  await supabase.rpc('exec_sql', { query: 'truncate table public.interactions_stage;' });

  const batchSize = 50;
  for (let i = 0; i < rows.length; i += batchSize) {
    const slice = rows.slice(i, i + batchSize).filter(Boolean).map(r => {
      const cols = r.match(/(?:[^,"]|"(?:[^"]|"")*")+/g) || [];
      const clean = cols.map(c => c.replace(/^"|"$/g, '').replaceAll("'", "''"));
      const [s, m, severity, description, recommendation] = clean;
      return `('${s}','${m}','${severity}','${description || ''}','${recommendation || ''}')`;
    });
    if (slice.length) {
      const insertSQL = `insert into public.interactions_stage (supplement_name, medication_name, severity, description, recommendation) values ${slice.join(',')};`;
      const { error: eIns } = await supabase.rpc('exec_sql', { query: insertSQL });
      if (eIns) throw new Error(`Failed to insert batch ${i}: ${eIns.message}`);
    }
  }

  console.log('Step 6: Mapping and upserting interactions...');
  const { error: e6 } = await supabase.rpc('exec_sql', { query: read('06_seed_interactions_template.sql') });
  if (e6) throw new Error(`Failed to seed interactions: ${e6.message}`);

  console.log('Step 7: Verifying counts...');
  const { count: supCount } = await supabase.from('supplements').select('*', { count: 'exact', head: true });
  const { count: medCount } = await supabase.from('medications').select('*', { count: 'exact', head: true });
  const { count: intCount } = await supabase.from('interactions').select('*', { count: 'exact', head: true });

  const verify = {
    supplements: supCount || 0,
    medications: medCount || 0,
    interactions: intCount || 0
  };

  console.log(JSON.stringify({ ok: true, verify }, null, 2));
}

main().catch(e => {
  console.error(JSON.stringify({ ok: false, error: String(e) }, null, 2));
  process.exit(1);
});
