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
    --print-to-pdf="$out" "file://$PWD/$src" 2>"/tmp/chrome-resume-$v.log" \
    || { echo "Chrome failed for $src:" >&2; cat "/tmp/chrome-resume-$v.log" >&2; exit 1; }

  uv run --quiet --with pypdf python - "$out" <<'EOF'
import sys
from pypdf import PdfReader
path = sys.argv[1]
r = PdfReader(path)
pages = len(r.pages)
text = r.pages[0].extract_text() or ""
ok = True
if pages == 1:
    print(f"{path}: 1 page(s) — OK")
else:
    print(f"{path}: {pages} pages — FAIL (budget: 1)", file=sys.stderr)
    ok = False
required = ["Viswanathan", "+91 95970 10099", "viswanathantj@gmail.com",
            "Experience", "Projects", "Skills", "Education", "Certificates"]
missing = [k for k in required if k.lower() not in text.lower()]
if missing:
    print(f"{path}: text layer MISSING: {', '.join(missing)}", file=sys.stderr)
    ok = False
else:
    print(f"{path}: text layer OK")
sys.exit(0 if ok else 1)
EOF
done
