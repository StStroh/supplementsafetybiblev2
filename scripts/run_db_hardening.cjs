require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

(async () => {
  const url = process.env.DATABASE_URL;
  if (!url) { console.error('Missing DATABASE_URL'); process.exit(1); }
  const sql = fs.readFileSync('scripts/db_hardening.sql','utf8');

  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  await client.query('BEGIN');
  try {
    await client.query(sql);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Hardening failed:', e.message);
    process.exit(1);
  }

  function q(text){ return client.query(text).then(r => r.rows); }

  const [suppCnt]  = await q(`SELECT COUNT(*)::int AS n FROM supplements`);
  const [medCnt]   = await q(`SELECT COUNT(*)::int AS n FROM medications`);
  const [intCnt]   = await q(`SELECT COUNT(*)::int AS n FROM interactions`);
  const [junkSupp] = await q(`SELECT COUNT(*)::int AS n FROM supplements WHERE name ~* '^(supplement)\\s+\\d+$' OR trim(name)=''`);
  const [junkMed]  = await q(`SELECT COUNT(*)::int AS n FROM medications WHERE name ~* '^(medication)\\s+\\d+$' OR trim(name)=''`);
  const [dupPairs] = await q(`SELECT COUNT(*)::int AS n FROM (SELECT supplement_key, medication_key, COUNT(*) FROM interactions GROUP BY 1,2 HAVING COUNT(*)>1) t`);
  const sevDist    = await q(`SELECT severity, COUNT(*)::int AS n FROM interactions GROUP BY severity ORDER BY severity`);

  const report = {
    ok: true,
    counts: {
      supplements: suppCnt.n, medications: medCnt.n, interactions: intCnt.n
    },
    junk: { supplements: junkSupp.n, medications: junkMed.n },
    duplicates: dupPairs.n,
    severity: sevDist.reduce((a,r)=> (a[r.severity||'null']=r.n, a), {})
  };

  fs.mkdirSync('artifacts', { recursive: true });
  fs.writeFileSync('artifacts/hardening_report.json', JSON.stringify(report, null, 2));
  fs.writeFileSync('artifacts/hardening_report.md',
`# Data Hardening Report

- Supplements: ${report.counts.supplements}
- Medications: ${report.counts.medications}
- Interactions: ${report.counts.interactions}
- Placeholder junk — Supplements: ${report.junk.supplements}, Medications: ${report.junk.medications}
- Duplicate interaction pairs: ${report.duplicates}
- Severity distribution: ${JSON.stringify(report.severity)}

**Status:** ${report.junk.supplements===0 && report.junk.medications===0 && report.duplicates===0 ? 'PASS' : 'ATTENTION REQUIRED'}
`);
  await client.end();
  console.log('[OK] DB hardening complete. Report written to artifacts/hardening_report.{json,md}');
})();
