#!/usr/bin/env python3
import os
import time
import json
from datetime import datetime
import requests

SUPABASE_URL = "https://cyxfxjoadzxhxwxjqkez.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGZ4am9hZHp4aHh3eGpxa2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzEyODQsImV4cCI6MjA3ODE0NzI4NH0.zmeG4VLeQN_ZB6bLNgnIGRgiKagvybr2PPG7EUzrZb4"

SQL_FILES = [
    "01_supplements_batch_2.sql",
    "01_supplements_batch_3.sql",
    "01_supplements_batch_4.sql",
    "02_medications_batch_1.sql",
    "03_interactions_batch_01.sql",
    "03_interactions_batch_02.sql",
    "03_interactions_batch_03.sql",
    "03_interactions_batch_04.sql",
    "03_interactions_batch_05.sql",
    "03_interactions_batch_06.sql",
    "03_interactions_batch_07.sql",
    "03_interactions_batch_08.sql",
    "03_interactions_batch_09.sql",
    "03_interactions_batch_10.sql",
    "03_interactions_batch_11.sql",
    "99_verify_counts.sql",
]

log_lines = []
start_time = time.time()

def log(message):
    timestamp = datetime.now().isoformat()
    line = f"[{timestamp}] {message}"
    print(line)
    log_lines.append(line)

def execute_sql(sql_content):
    """Execute SQL using Supabase REST API"""
    url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"
    headers = {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    }
    payload = {"sql_query": sql_content}

    response = requests.post(url, headers=headers, json=payload, timeout=60)

    if response.status_code in [200, 201, 204]:
        return {"success": True, "data": response.text}
    else:
        return {"success": False, "error": f"HTTP {response.status_code}: {response.text}"}

def execute_sql_file(filename):
    """Read and execute a SQL file"""
    file_path = os.path.join(os.getcwd(), "scripts/sql-mapped", filename)

    log(f"\n{'=' * 80}")
    log(f"📄 Processing: {filename}")

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            sql_content = f.read()

        file_size_kb = len(sql_content) / 1024
        log(f"✓ File read ({file_size_kb:.2f} KB)")

        exec_start = time.time()
        result = execute_sql(sql_content)
        exec_time = time.time() - exec_start

        if result["success"]:
            log(f"✓ Executed successfully ({exec_time:.2f}s)")
            return {"success": True, "filename": filename, "time": exec_time}
        else:
            log(f"❌ ERROR: {result['error']}")
            return {"success": False, "filename": filename, "error": result["error"]}

    except Exception as e:
        log(f"❌ Exception: {str(e)}")
        return {"success": False, "filename": filename, "error": str(e)}

def get_table_counts():
    """Get row counts for all tables"""
    log(f"\n{'=' * 80}")
    log("📊 RETRIEVING TABLE COUNTS")
    log(f"{'=' * 80}")

    tables = ["supplements", "medications", "interactions"]
    counts = {}

    for table in tables:
        try:
            url = f"{SUPABASE_URL}/rest/v1/{table}?select=count"
            headers = {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
                "Prefer": "count=exact",
            }

            response = requests.head(url, headers=headers)

            if "Content-Range" in response.headers:
                count_str = response.headers["Content-Range"].split("/")[1]
                count = int(count_str) if count_str != "*" else "Unknown"
                counts[table] = count
                log(f"✓ {table}: {count} rows")
            else:
                log(f"⚠ {table}: Could not determine count")
                counts[table] = "Unknown"

        except Exception as e:
            log(f"❌ Error counting {table}: {str(e)}")
            counts[table] = "ERROR"

    return counts

def get_sample_rows():
    """Get sample rows from each table"""
    log(f"\n{'=' * 80}")
    log("📋 RETRIEVING SAMPLE ROWS (5 per table)")
    log(f"{'=' * 80}")

    tables = ["supplements", "medications", "interactions"]
    samples = {}

    for table in tables:
        try:
            url = f"{SUPABASE_URL}/rest/v1/{table}?select=*&limit=5"
            headers = {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
            }

            response = requests.get(url, headers=headers)

            if response.status_code == 200:
                data = response.json()
                samples[table] = data
                log(f"\n✓ {table} (showing {len(data)} samples):")

                for idx, row in enumerate(data, 1):
                    row_str = json.dumps(row)
                    display_str = row_str[:150] + "..." if len(row_str) > 150 else row_str
                    log(f"  {idx}. {display_str}")
            else:
                log(f"❌ Error fetching {table} samples: HTTP {response.status_code}")
                samples[table] = []

        except Exception as e:
            log(f"❌ Error fetching {table} samples: {str(e)}")
            samples[table] = []

    return samples

def main():
    log("🚀 SEED DATA IMPORT STARTING")
    log(f"📅 {datetime.now().isoformat()}")
    log(f"📁 Processing {len(SQL_FILES)} SQL files")

    results = []

    for filename in SQL_FILES:
        result = execute_sql_file(filename)
        results.append(result)
        time.sleep(0.3)  # Brief pause between files

    # Summary
    log(f"\n{'=' * 80}")
    log("📈 IMPORT SUMMARY")
    log(f"{'=' * 80}")

    successful = sum(1 for r in results if r["success"])
    failed = len(results) - successful
    total_time = time.time() - start_time

    log(f"✓ Successful: {successful}/{len(SQL_FILES)}")
    log(f"✗ Failed: {failed}/{len(SQL_FILES)}")
    log(f"⏱ Total time: {total_time:.2f}s")

    if failed > 0:
        log("\n❌ Failed files:")
        for r in results:
            if not r["success"]:
                log(f"  - {r['filename']}: {r.get('error', 'Unknown error')}")

    # Get final counts and samples
    counts = get_table_counts()
    samples = get_sample_rows()

    # Write log file
    artifacts_dir = os.path.join(os.getcwd(), "artifacts/seed-import")
    os.makedirs(artifacts_dir, exist_ok=True)
    log_path = os.path.join(artifacts_dir, "seed_import_report.txt")

    with open(log_path, "w", encoding="utf-8") as f:
        f.write("\n".join(log_lines))

    log(f"\n💾 Full log saved to: {log_path}")
    log("\n✅ IMPORT PROCESS COMPLETED!")

    return 1 if failed > 0 else 0

if __name__ == "__main__":
    exit(main())
