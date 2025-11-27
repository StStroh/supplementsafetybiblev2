import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Read batch 01 to create temp tables
const batch01 = readFileSync('scripts/sql-mapped/03_interactions_batch_01.sql', 'utf-8');

console.log('=== BATCH 01 (Temp Tables) ===');
console.log(batch01);

for (let i = 2; i <= 11; i++) {
  const batch = String(i).padStart(2, '0');
  const sql = readFileSync(`scripts/sql-mapped/03_interactions_batch_${batch}.sql`, 'utf-8');
  console.log(`\n\n=== BATCH ${batch} ===`);
  console.log(sql);
}
