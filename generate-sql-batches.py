#!/usr/bin/env python3
import csv
import os

def escape_sql(s):
    if s is None:
        return ''
    return str(s).replace("'", "''")

print("Generating SQL batch files...")

# Read supplements
print("Reading supplements...")
supps = []
with open('supabase/seed/supplements_1000.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        supps.append((row['id'], escape_sql(row['name']), escape_sql(row['category'])))

# Read medications
print("Reading medications...")
meds = []
with open('supabase/seed/medications_150.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        meds.append((row['id'], escape_sql(row['name']), escape_sql(row['class'])))

# Read interactions
print("Reading interactions...")
ints = []
with open('supabase/seed/interactions_2500.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        ints.append((
            row['supplement_id'],
            row['medication_id'],
            row['severity'].lower() if row['severity'] else 'moderate',
            escape_sql(row.get('mechanism', '')),
            escape_sql(row.get('notes', ''))
        ))

print(f"Found {len(supps)} supplements, {len(meds)} medications, {len(ints)} interactions")

# Generate supplements SQL
with open('import-supps.sql', 'w') as f:
    f.write("INSERT INTO supplements (id, name, category) VALUES\n")
    for i, (id, name, cat) in enumerate(supps):
        comma = ',' if i < len(supps) - 1 else ';'
        f.write(f"  ({id}, '{name}', '{cat}'){comma}\n")
    f.write("ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category;\n")

print("✓ Generated import-supps.sql")

# Generate medications SQL
with open('import-meds.sql', 'w') as f:
    f.write("INSERT INTO medications (id, name, drug_class) VALUES\n")
    for i, (id, name, cls) in enumerate(meds):
        comma = ',' if i < len(meds) - 1 else ';'
        f.write(f"  ({id}, '{name}', '{cls}'){comma}\n")
    f.write("ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, drug_class = EXCLUDED.drug_class;\n")

print("✓ Generated import-meds.sql")

# Generate interactions SQL in batches of 500
batch_size = 500
num_batches = (len(ints) + batch_size - 1) // batch_size

for batch_num in range(num_batches):
    start = batch_num * batch_size
    end = min(start + batch_size, len(ints))
    batch = ints[start:end]

    filename = f'import-ints-batch-{batch_num+1:02d}.sql'
    with open(filename, 'w') as f:
        f.write("INSERT INTO interactions (supplement_id, medication_id, severity, description, recommendation) VALUES\n")
        for i, (sup_id, med_id, sev, mech, notes) in enumerate(batch):
            comma = ',' if i < len(batch) - 1 else ';'
            desc = f"{mech}" if mech else "No description"
            rec = f"{notes}" if notes else "Consult healthcare provider"
            f.write(f"  ({sup_id}, {med_id}, '{sev}', '{desc}', '{rec}'){comma}\n")

    print(f"✓ Generated {filename}")

print(f"\n✅ Generated {num_batches + 2} SQL files total")
print(f"   - 1 supplements file ({len(supps)} rows)")
print(f"   - 1 medications file ({len(meds)} rows)")
print(f"   - {num_batches} interaction batch files ({len(ints)} rows total)")
