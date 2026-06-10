#!/usr/bin/env bash
# Renders resume-*.html to PDF via headless Chrome and verifies one-page budget + text layer.
# Also builds resume-c-web.pdf — the public website copy with the phone number removed.
# Release version (with phone) = resume-c.pdf; website version (no phone) = resume-c-web.pdf.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

render() {  # render <src.html> <out.pdf>
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=10000 \
    --print-to-pdf="$2" "file://$PWD/$1" 2>"/tmp/chrome-resume-$$.log" \
    || { echo "Chrome failed for $1:" >&2; cat "/tmp/chrome-resume-$$.log" >&2; exit 1; }
}

verify() {  # verify <out.pdf> <with-phone|no-phone>
  uv run --quiet --with pypdf python - "$1" "$2" <<'EOF'
import sys
from pypdf import PdfReader
path, phone_mode = sys.argv[1], sys.argv[2]
r = PdfReader(path)
pages = len(r.pages)
text = r.pages[0].extract_text() or ""
ok = True
if pages == 1:
    print(f"{path}: 1 page(s) — OK")
else:
    print(f"{path}: {pages} pages — FAIL (budget: 1)", file=sys.stderr)
    ok = False
required = ["Viswanathan", "viswanathantj@gmail.com",
            "Experience", "Projects", "Skills", "Education", "Certificates"]
if phone_mode == "with-phone":
    required.append("+91 95970 10099")
missing = [k for k in required if k.lower() not in text.lower()]
if missing:
    print(f"{path}: text layer MISSING: {', '.join(missing)}", file=sys.stderr)
    ok = False
elif phone_mode == "no-phone" and "95970" in text:
    print(f"{path}: FAIL — phone number present in web version", file=sys.stderr)
    ok = False
else:
    print(f"{path}: text layer OK")
sys.exit(0 if ok else 1)
EOF
}

for v in a c; do
  src="resume-$v.html"
  [ -f "$src" ] || { echo "skip: $src (not found)"; continue; }
  render "$src" "resume-$v.pdf"
  verify "resume-$v.pdf" with-phone
done

# Website copy: layout C with the tel: link (and its separator) stripped.
uv run --quiet python - <<'EOF'
import re
html = open('resume-c.html').read()
out, n = re.subn(r'\s*<a href="tel:[^"]*">.*?</a>\s*<span class="sep">·</span>', '', html, count=1, flags=re.S)
assert n == 1, "phone anchor not found in resume-c.html"
open('resume-c-web.html', 'w').write(out)
EOF
render "resume-c-web.html" "resume-c-web.pdf"
verify "resume-c-web.pdf" no-phone
rm -f resume-c-web.html
