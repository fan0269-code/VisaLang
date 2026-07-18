#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-https://visalang.org}"
WWW_URL="${WWW_URL:-https://www.visalang.org}"

check_200() {
  local path="$1"
  local status
  status="$(curl -sS -o /dev/null -w '%{http_code}' "$BASE_URL$path")"
  [ "$status" = "200" ] || { echo "✗ Expected 200 for $path, got $status"; exit 1; }
  echo "✓ 200 $path"
}

check_redirect() {
  local url="$1"
  local expected="$2"
  local headers
  headers="$(curl -sS -I --max-redirs 0 "$url")"
  printf '%s' "$headers" | grep -Eq '^HTTP/[^ ]+ 301' || { echo "✗ Expected 301 for $url"; exit 1; }
  printf '%s' "$headers" | grep -Eiq "^location: $expected\r?$" || { echo "✗ Unexpected Location for $url"; exit 1; }
  echo "✓ 301 $url -> $expected"
}

for path in / /guides/ /robots.txt /sitemap-index.xml; do
  check_200 "$path"
done

check_redirect "$BASE_URL/index.html" "https://visalang.org/"
check_redirect "$BASE_URL/germany-family-reunion-a1.html" "https://visalang.org/germany-family-reunion-a1/"
check_redirect "$WWW_URL/" "https://visalang.org/"

homepage="$(curl -fsS "$BASE_URL/")"
printf '%s' "$homepage" | grep -Fq 'rel="canonical" href="https://visalang.org/"' || { echo "✗ Homepage canonical is not visalang.org"; exit 1; }
printf '%s' "$homepage" | grep -Fq 'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018617123550799' || { echo "✗ Homepage does not contain the approved AdSense loader"; exit 1; }

tool_page="$(curl -fsS "$BASE_URL/tools/route-finder/")"
if printf '%s' "$tool_page" | grep -Fq 'pagead2.googlesyndication.com'; then
  echo "✗ Route Finder must not load AdSense"
  exit 1
fi

guides_index="$(curl -fsS "$BASE_URL/guides/")"
if printf '%s' "$guides_index" | grep -Fq 'pagead2.googlesyndication.com'; then
  echo "✗ Searchable Guide Library index must not load AdSense"
  exit 1
fi

ads_txt="$(curl -fsS "$BASE_URL/ads.txt")"
printf '%s' "$ads_txt" | grep -Fxq 'google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0' || { echo "✗ ads.txt does not match the approved seller line"; exit 1; }

robots="$(curl -fsS "$BASE_URL/robots.txt")"
printf '%s' "$robots" | grep -Fq 'Sitemap: https://visalang.org/sitemap-index.xml' || { echo "✗ robots.txt sitemap does not use visalang.org"; exit 1; }

headers="$(curl -sS -D - -o /dev/null "$BASE_URL/")"
if printf '%s' "$headers" | grep -Eiq '^content-security-policy:'; then
  echo "✗ Production still sends the incompatible static CSP"
  exit 1
fi
for header in strict-transport-security x-content-type-options x-frame-options referrer-policy permissions-policy; do
  printf '%s' "$headers" | grep -Eiq "^$header:" || { echo "✗ Missing production header: $header"; exit 1; }
done

echo "Production source smoke checks passed for $BASE_URL"
echo "CMP choices, Auto ads placement, CLS, and browser network behavior require the separately authorised clean-profile verification window."
