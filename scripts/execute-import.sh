#!/bin/bash
cd /tmp/cc-agent/59885259/project

FILES=(
  "scripts/sql-mapped/01_supplements_batch_2.sql"
  "scripts/sql-mapped/01_supplements_batch_3.sql"
  "scripts/sql-mapped/01_supplements_batch_4.sql"
  "scripts/sql-mapped/02_medications_batch_1.sql"
  "scripts/sql-mapped/03_interactions_batch_01.sql"
  "scripts/sql-mapped/03_interactions_batch_02.sql"
  "scripts/sql-mapped/03_interactions_batch_03.sql"
  "scripts/sql-mapped/03_interactions_batch_04.sql"
  "scripts/sql-mapped/03_interactions_batch_05.sql"
  "scripts/sql-mapped/03_interactions_batch_06.sql"
  "scripts/sql-mapped/03_interactions_batch_07.sql"
  "scripts/sql-mapped/03_interactions_batch_08.sql"
  "scripts/sql-mapped/03_interactions_batch_09.sql"
  "scripts/sql-mapped/03_interactions_batch_10.sql"
  "scripts/sql-mapped/03_interactions_batch_11.sql"
)

for file in "${FILES[@]}"; do
  echo "Importing $file..."
  node -e "
    import { createClient } from '@supabase/supabase-js';
    import { readFileSync } from 'fs';
    
    const supabase = createClient(
      'https://cyxfxjoadzxhxwxjqkez.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4'
    );
    
    const sql = readFileSync('$file', 'utf-8');
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
    console.log('✓ Success');
  "
  if [ $? -ne 0 ]; then
    echo "Failed to import $file"
    exit 1
  fi
  sleep 0.2
done

echo "All files imported successfully!"
