#!/usr/bin/env bash
# Renders resume-*.html to PDF via headless Chrome and verifies one-page budget + text layer.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

for v in a c; do
  src="resume-$v.html"
  out="resume-$v.pdf"
  [ -f "$src" ] || { echo "skip: $src (not found)"; continue; }

  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=10000 \
    --print-to-pdf="$out" "file://$PWD/$src" 2>/dev/null

  uv run --quiet --with pypdf python - "$out" <<'EOF'
import sys
from pypdf import PdfReader
path = sys.argv[1]
r = PdfReader(path)
pages = len(r.pages)
text = r.pages[0].extract_text() or ""
status = "OK" if pages == 1 else f"WARNING: {pages} pages (budget: 1)"
print(f"{path}: {pages} page(s) — {status}")
required = ["Viswanathan", "+91 95970 10099", "viswanathantj@gmail.com",
            "Experience", "Projects", "Skills", "Education", "Certificates"]
missing = [k for k in required if k.lower() not in text.lower()]
print(f"{path}: text layer {'OK' if not missing else 'MISSING: ' + ', '.join(missing)}")
EOF
done
