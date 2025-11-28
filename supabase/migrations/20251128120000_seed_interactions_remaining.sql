-- This migration will be executed manually by calling each batch
-- Batch 01: Already executed (100 rows)
-- Batches 02-25: Execute via apply_migration tool

-- Note: Each batch file contains 100 UPSERT statements
-- Total: 2,400 additional rows (2,500 total)
SELECT 'Batches 02-25 ready for execution' as status;
