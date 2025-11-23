#!/bin/bash

# Supabase Configuration
SUPABASE_URL="https://cyxfxjoadzxhxwxjqkez.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4"

SQL_DIR="./scripts/sql-mapped"
LOG_FILE="./artifacts/seed-import/seed_import_report.txt"

# Create artifacts directory
mkdir -p ./artifacts/seed-import

# Initialize log
echo "========================================" | tee $LOG_FILE
echo "🚀 SEED DATA IMPORT STARTING" | tee -a $LOG_FILE
echo "📅 $(date)" | tee -a $LOG_FILE
echo "========================================" | tee -a $LOG_FILE

# SQL files to process (skipping batch 1 since it's already imported)
SQL_FILES=(
    "01_supplements_batch_2.sql"
    "01_supplements_batch_3.sql"
    "01_supplements_batch_4.sql"
    "02_medications_batch_1.sql"
    "03_interactions_batch_01.sql"
    "03_interactions_batch_02.sql"
    "03_interactions_batch_03.sql"
    "03_interactions_batch_04.sql"
    "03_interactions_batch_05.sql"
    "03_interactions_batch_06.sql"
    "03_interactions_batch_07.sql"
    "03_interactions_batch_08.sql"
    "03_interactions_batch_09.sql"
    "03_interactions_batch_10.sql"
    "03_interactions_batch_11.sql"
)

SUCCESS_COUNT=0
FAIL_COUNT=0

# Function to execute SQL file
execute_sql_file() {
    local filename=$1
    local filepath="$SQL_DIR/$filename"

    echo "" | tee -a $LOG_FILE
    echo "========================================" | tee -a $LOG_FILE
    echo "📄 Processing: $filename" | tee -a $LOG_FILE

    if [ ! -f "$filepath" ]; then
        echo "❌ File not found: $filepath" | tee -a $LOG_FILE
        return 1
    fi

    # Read SQL content
    SQL_CONTENT=$(cat "$filepath")
    FILE_SIZE=$(wc -c < "$filepath" | awk '{print $1/1024}')
    echo "✓ File read (${FILE_SIZE} KB)" | tee -a $LOG_FILE

    # Execute SQL via Supabase REST API
    START_TIME=$(date +%s)

    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
        "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \
        -H "Content-Type: application/json" \
        -H "apikey: ${SUPABASE_KEY}" \
        -H "Authorization: Bearer ${SUPABASE_KEY}" \
        -d "{\"sql_query\": $(echo "$SQL_CONTENT" | jq -Rs .)}")

    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    RESPONSE_BODY=$(echo "$RESPONSE" | head -n-1)

    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))

    if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ] || [ "$HTTP_CODE" -eq 204 ]; then
        echo "✓ Executed successfully (${DURATION}s)" | tee -a $LOG_FILE
        ((SUCCESS_COUNT++))
        return 0
    else
        echo "❌ ERROR: HTTP $HTTP_CODE - $RESPONSE_BODY" | tee -a $LOG_FILE
        ((FAIL_COUNT++))
        return 1
    fi
}

# Process all SQL files
for sql_file in "${SQL_FILES[@]}"; do
    execute_sql_file "$sql_file"
    sleep 0.3  # Brief pause between files
done

# Summary
echo "" | tee -a $LOG_FILE
echo "========================================" | tee -a $LOG_FILE
echo "📈 IMPORT SUMMARY" | tee -a $LOG_FILE
echo "========================================" | tee -a $LOG_FILE
echo "✓ Successful: $SUCCESS_COUNT/${#SQL_FILES[@]}" | tee -a $LOG_FILE
echo "✗ Failed: $FAIL_COUNT/${#SQL_FILES[@]}" | tee -a $LOG_FILE

# Get table counts
echo "" | tee -a $LOG_FILE
echo "========================================" | tee -a $LOG_FILE
echo "📊 TABLE COUNTS" | tee -a $LOG_FILE
echo "========================================" | tee -a $LOG_FILE

for table in supplements medications interactions; do
    COUNT=$(curl -s -I "${SUPABASE_URL}/rest/v1/${table}?select=id" \
        -H "apikey: ${SUPABASE_KEY}" \
        -H "Authorization: Bearer ${SUPABASE_KEY}" \
        -H "Prefer: count=exact" \
        | grep -i "content-range" | awk -F'/' '{print $2}' | tr -d '\r')

    if [ -n "$COUNT" ]; then
        echo "✓ $table: $COUNT rows" | tee -a $LOG_FILE
    else
        echo "⚠ $table: Could not determine count" | tee -a $LOG_FILE
    fi
done

# Get sample rows
echo "" | tee -a $LOG_FILE
echo "========================================" | tee -a $LOG_FILE
echo "📋 SAMPLE ROWS (5 per table)" | tee -a $LOG_FILE
echo "========================================" | tee -a $LOG_FILE

for table in supplements medications interactions; do
    echo "" | tee -a $LOG_FILE
    echo "✓ $table samples:" | tee -a $LOG_FILE

    SAMPLES=$(curl -s "${SUPABASE_URL}/rest/v1/${table}?select=*&limit=5" \
        -H "apikey: ${SUPABASE_KEY}" \
        -H "Authorization: Bearer ${SUPABASE_KEY}")

    echo "$SAMPLES" | jq -r '.[] | "\t\(. | tostring | .[0:150])"' | tee -a $LOG_FILE
done

echo "" | tee -a $LOG_FILE
echo "✅ IMPORT PROCESS COMPLETED!" | tee -a $LOG_FILE
echo "💾 Full log saved to: $LOG_FILE" | tee -a $LOG_FILE

# Exit with appropriate code
if [ $FAIL_COUNT -gt 0 ]; then
    exit 1
else
    exit 0
fi
