#!/usr/bin/env python3
"""
LocalLens: Visakhapatnam Non-AC Bus Dataset Cleaning & Ingestion Pipeline
Source: dataset/Dataset -1.xlsx
Outputs:
  - src/data/importedTransportRoutes.json (Embedded local resilient dataset)
  - scripts/seed_transport_routes.sql (Direct SQL seed for Supabase)
"""

import os
import json
import re
import uuid
import datetime
import openpyxl

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
DATASET_PATH = os.path.join(PROJECT_ROOT, "dataset", "Dataset -1.xlsx")
OUTPUT_JSON_PATH = os.path.join(PROJECT_ROOT, "src", "data", "importedTransportRoutes.json")
OUTPUT_SQL_PATH = os.path.join(PROJECT_ROOT, "scripts", "seed_transport_routes.sql")

# Curated location normalization dictionary
LOCATION_NORM = {
    'rtc complex': 'RTC Complex',
    'rtc': 'RTC Complex',
    'maddilapalem': 'Maddilapalem',
    'duvvada rly.statio': 'Duvvada Railway Station',
    'duvvada rly station': 'Duvvada Railway Station',
    'duvvada': 'Duvvada Railway Station',
    'r.k.beach': 'RK Beach',
    'rk beach': 'RK Beach',
    'sindia': 'Scindia',
    'scindia': 'Scindia',
    'akp st': 'Anakapalli Station',
    'ohpo': 'Old Head Post Office (OHPO)',
    'z.p.': 'Zilla Parishad (Z.P.)',
    'jaipur': 'Jaipur',
    'rambill': 'Rambilli',
    'gantyada hb colony': 'Gantyada Housing Board Colony',
    'arilovacolony': 'Arilova Colony',
    'yalamanchili': 'Yelamanchili',
    'velamanchili': 'Yelamanchili',
    'simhachalam hills': 'Simhachalam Hills',
    'simhachalam': 'Simhachalam',
    'gajuwaka': 'Gajuwaka',
    'gajuwaka depot': 'Gajuwaka Depot',
    'coke': 'Coke Ovens',
    'coke ovens': 'Coke Ovens',
    'collector office': 'Collector Office',
    'vuda park': 'VUDA Park',
    'fh/vuda park (3rtc+1hb)': 'VUDA Park',
    'vambay colony': 'Vambay Colony',
    'sagarnagar': 'Sagar Nagar',
    'tagarapuvalasa': 'Tagarapuvalasa',
    'bhimilli': 'Bheemunipatnam (Bhimili)',
    'araku': 'Araku Valley',
    'borra caves': 'Borra Caves',
    'pendurthi': 'Pendurthi',
    'kurmannapalem': 'Kurmannapalem',
    'steel plant': 'Steel Plant',
    'steel city': 'Steel Plant Township',
    'scindia junction': 'Scindia Junction'
}

def clean_loc(loc: str) -> str:
    if not loc:
        return ''
    loc = str(loc).strip()
    key = loc.lower()
    if key in LOCATION_NORM:
        return LOCATION_NORM[key]
    
    # Capitalize title if entirely lowercase
    if loc.islower():
        loc = loc.title()
        
    # Replace abbreviations
    loc = re.sub(r'(?i)\brly\.?\s*statio\b', 'Railway Station', loc)
    loc = re.sub(r'(?i)\brly\.?\s*station\b', 'Railway Station', loc)
    loc = re.sub(r'(?i)\brtc\s+comp(lex)?\b', 'RTC Complex', loc)
    loc = re.sub(r'(?i)\bcolony\b', 'Colony', loc)
    loc = re.sub(r'(?i)\br\.?k\.?\s*beach\b', 'RK Beach', loc)
    return loc.strip()

def clean_depot(depot: str) -> str:
    d = str(depot).strip()
    if d.lower() == 'simhachalam':
        return 'Simhachalam'
    return d

def main():
    print(f"Loading Excel file from: {DATASET_PATH}")
    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(f"Dataset file not found at {DATASET_PATH}")

    wb = openpyxl.load_workbook(DATASET_PATH)
    sheet = wb.active

    # Find the header row (row containing 'Sl No', 'Depot', etc.)
    header_idx = None
    all_rows = list(sheet.iter_rows(values_only=True))
    for idx, row in enumerate(all_rows):
        if row and any(str(c).strip().lower() in ['sl no', 'slno', 'depot'] for c in row if c is not None):
            header_idx = idx
            break

    if header_idx is None:
        raise ValueError("Could not locate header row in Excel dataset")

    data_rows = all_rows[header_idx + 1:]
    print(f"Found {len(data_rows)} raw records following header at row {header_idx + 1}")

    # Extraction regex for route numbers
    # Matches: '38Y', '38H', '1T', '400Y', '55D/V', '25D/V', '6A/H', '28Z/H', '28A/D'
    route_regex = r'^([0-9]+[A-Za-z0-9]*(?:/[A-Za-z0-9]+)?)\s*(.*)$'

    cleaned_records = []
    seen_corridors = set()
    duplicates_count = 0
    invalid_records_count = 0
    depot_counts = {}

    for idx, r in enumerate(data_rows):
        if not r or not any(c is not None for c in r):
            continue
        
        depot_val = r[1]
        from_val = r[2]
        to_val = r[3]

        if not depot_val or not from_val or not to_val:
            invalid_records_count += 1
            continue

        depot = clean_depot(depot_val)
        from_raw = str(from_val).strip()
        to_loc = clean_loc(str(to_val).strip())

        # Extract route number
        m = re.match(route_regex, from_raw)
        if m:
            route_no = m.group(1).strip()
            rem = m.group(2).strip()
            from_loc = clean_loc(rem) if rem else depot
        else:
            # Special case mappings
            from_upper = from_raw.upper()
            if 'BADI BUS' in from_upper:
                route_no = 'BADI BUS'
                from_loc = 'NAD Junction'
            elif from_upper == 'AKP ST':
                route_no = 'AKP'
                from_loc = 'Anakapalli Station'
            else:
                route_no = f"{depot[:3].upper()}-ORD"
                from_loc = clean_loc(from_raw)

        # Unique corridor key for deduplication
        dedup_key = (depot.lower(), route_no.lower(), from_loc.lower(), to_loc.lower())
        if dedup_key in seen_corridors:
            duplicates_count += 1
            continue
        seen_corridors.add(dedup_key)

        depot_counts[depot] = depot_counts.get(depot, 0) + 1

        record = {
            "id": str(uuid.uuid5(uuid.NAMESPACE_DNS, f"localens.transport.{depot}.{route_no}.{from_loc}.{to_loc}")),
            "source": "Visakhapatnam Non-AC Bus Dataset",
            "route_number": route_no,
            "depot": depot,
            "from_location": from_loc,
            "to_location": to_loc,
            "transport_type": "bus",
            "is_active": True,
            "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "updated_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
        }
        cleaned_records.append(record)

    print("\n--- Ingestion Pipeline Summary ---")
    print(f"Total raw rows inspected: {len(data_rows)}")
    print(f"Invalid / empty rows: {invalid_records_count}")
    print(f"Duplicates removed: {duplicates_count}")
    print(f"Cleaned unique active routes: {len(cleaned_records)}")
    print(f"Depots processed ({len(depot_counts)}):")
    for d, cnt in sorted(depot_counts.items(), key=lambda x: -x[1]):
        print(f"  - {d}: {cnt} routes")

    # Save to JSON
    os.makedirs(os.path.dirname(OUTPUT_JSON_PATH), exist_ok=True)
    with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(cleaned_records, f, indent=2, ensure_ascii=False)
    print(f"\nSaved {len(cleaned_records)} records to {OUTPUT_JSON_PATH}")

    # Generate SQL seed file
    os.makedirs(os.path.dirname(OUTPUT_SQL_PATH), exist_ok=True)
    with open(OUTPUT_SQL_PATH, "w", encoding="utf-8") as f:
        f.write("-- ============================================================================\n")
        f.write("-- LocalLens: Transport Dataset Ingestion Seed\n")
        f.write(f"-- Generated At: {datetime.datetime.now(datetime.timezone.utc).isoformat()}\n")
        f.write(f"-- Total Records: {len(cleaned_records)}\n")
        f.write("-- ============================================================================\n\n")
        f.write("INSERT INTO public.transport_routes (id, source, route_number, depot, from_location, to_location, transport_type, is_active, created_at, updated_at)\nVALUES\n")
        
        def esc(val):
            if val is None:
                return "NULL"
            return "'" + str(val).replace("'", "''") + "'"

        sql_rows = []
        for r in cleaned_records:
            id_val = esc(r['id'])
            src_val = esc(r['source'])
            rt_val = esc(r['route_number']) if r['route_number'] else "NULL"
            depot_val = esc(r['depot'])
            from_val = esc(r['from_location'])
            to_val = esc(r['to_location'])
            type_val = esc(r['transport_type'])
            act_val = "true"
            sql_rows.append(f"  ({id_val}, {src_val}, {rt_val}, {depot_val}, {from_val}, {to_val}, {type_val}, {act_val}, NOW(), NOW())")

        f.write(",\n".join(sql_rows))
        f.write("\nON CONFLICT (id) DO UPDATE SET\n")
        f.write("  route_number = EXCLUDED.route_number,\n")
        f.write("  depot = EXCLUDED.depot,\n")
        f.write("  from_location = EXCLUDED.from_location,\n")
        f.write("  to_location = EXCLUDED.to_location,\n")
        f.write("  updated_at = NOW();\n")

    print(f"Generated SQL seed file at: {OUTPUT_SQL_PATH}")

if __name__ == "__main__":
    main()
