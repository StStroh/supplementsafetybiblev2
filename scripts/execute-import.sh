#!/bin/bash

echo "═══════════════════════════════════════════════════════════════════════════════"
echo "                   EXECUTING SQL IMPORT BATCHES"
echo "═══════════════════════════════════════════════════════════════════════════════"

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SQL_DIR="$SCRIPT_DIR/sql-mapped"

# Counter for tracking
total=0
success=0
failed=0

# Execute supplements batches
echo -e "\n📥 Importing SUPPLEMENTS..."
for file in "$SQL_DIR"/01_supplements_batch_*.sql; do
  if [ -f "$file" ]; then
    echo "   Executing: $(basename $file)"
    ((total++))
    # Note: You would need to use psql or similar here
    # For now, we'll output the file paths for manual execution
  fi
done

# Execute medications batch
echo -e "\n📥 Importing MEDICATIONS..."
for file in "$SQL_DIR"/02_medications_batch_*.sql; do
  if [ -f "$file" ]; then
    echo "   Executing: $(basename $file)"
    ((total++))
  fi
done

# Execute interactions batches
echo -e "\n📥 Importing INTERACTIONS..."
for file in "$SQL_DIR"/03_interactions_batch_*.sql; do
  if [ -f "$file" ]; then
    echo "   Executing: $(basename $file)"
    ((total++))
  fi
done

echo -e "\n═══════════════════════════════════════════════════════════════════════════════"
echo "                       IMPORT SUMMARY"
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "Total SQL files: $total"
echo ""
echo "To execute these files, you can:"
echo "1. Use the Supabase SQL Editor in the dashboard"
echo "2. Use psql command-line tool"
echo "3. Use a database management tool like DBeaver or pgAdmin"
echo ""
echo "Files are located in: $SQL_DIR"
echo "═══════════════════════════════════════════════════════════════════════════════"
