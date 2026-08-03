#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${1:-}"

if [[ -z "$OUT" ]]; then
  printf 'Usage: %s OUTPUT_DIRECTORY\n' "$0" >&2
  exit 2
fi

if [[ -d "$OUT" ]] && [[ -n "$(find "$OUT" -mindepth 1 -maxdepth 1 -print -quit)" ]]; then
  printf 'Output directory must be empty: %s\n' "$OUT" >&2
  exit 2
fi

mkdir -p "$OUT/assets"
if [[ -f "$ROOT/site/book-sdk-ordeal/evidence.json" ]]; then
  node "$ROOT/tools/publish-book-sdk-ordeal.mjs" \
    --verify "$ROOT/site/book-sdk-ordeal/evidence.json"
fi
cp -R "$ROOT/site/." "$OUT/"
cp "$ROOT/icon.png" "$OUT/assets/icon.png"
cp "$ROOT/preview.jpg" "$OUT/assets/preview.jpg"
cp "$ROOT/preview2.jpg" "$OUT/assets/preview2.jpg"
cp "$ROOT/preview3.jpg" "$OUT/assets/preview3.jpg"
cp "$ROOT/preview_cards.jpg" "$OUT/assets/preview_cards.jpg"
: > "$OUT/.nojekyll"

printf 'Built static guide at %s\n' "$OUT"
