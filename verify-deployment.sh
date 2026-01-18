#!/bin/bash

# Deployment Verification Script
# Tests live production URLs

echo "=========================================="
echo "PRODUCTION DEPLOYMENT VERIFICATION"
echo "=========================================="
echo ""

BASE_URL="https://supplementsafetybible.com"

# Test routes
declare -A routes=(
  ["/"]="Home (Clinical UI)"
  ["/pricing"]="Pricing"
  ["/premium"]="Premium"
  ["/premium/dashboard"]="Premium Dashboard"
  ["/faq"]="FAQ"
  ["/terms"]="Terms"
  ["/privacy"]="Privacy"
)

echo "Route | Status | Final URL | Title"
echo "------|--------|-----------|------"

for route in "${!routes[@]}"; do
  url="${BASE_URL}${route}"
  description="${routes[$route]}"

  # Get HTTP status and final URL
  response=$(curl -sL -w "HTTPSTATUS:%{http_code}|URL:%{url_effective}" "$url" -o /tmp/curl_body.html)
  http_status=$(echo "$response" | sed -n 's/.*HTTPSTATUS:\([0-9]*\).*/\1/p')
  final_url=$(echo "$response" | sed -n 's/.*URL:\(.*\)/\1/p')

  # Try to extract title
  title=$(grep -oP '(?<=<title>)[^<]+' /tmp/curl_body.html 2>/dev/null | head -1 || echo "N/A")

  # Determine status emoji
  if [ "$http_status" -eq 200 ]; then
    status="✓ $http_status"
  elif [ "$http_status" -ge 300 ] && [ "$http_status" -lt 400 ]; then
    status="→ $http_status"
  else
    status="✗ $http_status"
  fi

  echo "$route | $status | $final_url | $title"
done

rm -f /tmp/curl_body.html

echo ""
echo "=========================================="
echo "CHECK FOR NEW CLINICAL HOME UI"
echo "=========================================="
echo ""
echo "Open https://supplementsafetybible.com in browser"
echo ""
echo "Expected elements:"
echo "  ✓ NavClinical header (sticky, gradient logo)"
echo "  ✓ Hero: 'Know Your Supplement–Medication Interactions'"
echo "  ✓ Indigo gradient background"
echo "  ✓ 'Clinically-oriented • Educational' badge"
echo "  ✓ Features section (3 cards: ShieldCheck, Activity, Clock)"
echo "  ✓ CTA section (Upgrade to Premium)"
echo "  ✓ FAQ section (2 cards)"
echo "  ✓ FooterClinical (4-column grid)"
echo ""
