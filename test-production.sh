#!/bin/bash

# Test production deployment
SITE_URL="${1:-https://supplementsafetybible.com}"

echo "════════════════════════════════════════════════════════════"
echo "   PRODUCTION DEPLOYMENT TESTS"
echo "   Site: $SITE_URL"
echo "════════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}TEST 1: Function Health Check${NC}"
echo "GET $SITE_URL/.netlify/functions/grant-free?diag=1"
echo ""

HEALTH_RESPONSE=$(curl -s "$SITE_URL/.netlify/functions/grant-free?diag=1")
echo "Response: $HEALTH_RESPONSE"

if echo "$HEALTH_RESPONSE" | grep -q '"ok":true'; then
    echo -e "${GREEN}✓ Function health check passed${NC}"
else
    echo -e "${RED}✗ Function health check failed${NC}"
    echo "Expected: {\"ok\":true,\"error\":null}"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo ""

echo -e "${YELLOW}TEST 2: POST Free Activation${NC}"
echo "POST $SITE_URL/.netlify/functions/grant-free"
echo 'Body: {"name":"Production Test"}'
echo ""

POST_RESPONSE=$(curl -s -X POST "$SITE_URL/.netlify/functions/grant-free" \
  -H "Content-Type: application/json" \
  -d '{"name":"Production Test"}')

echo "Response: $POST_RESPONSE"

if echo "$POST_RESPONSE" | grep -q '"ok":true'; then
    echo -e "${GREEN}✓ POST activation succeeded${NC}"
    
    # Extract profile details
    if echo "$POST_RESPONSE" | grep -q '"plan":"free"'; then
        echo -e "${GREEN}✓ Profile has plan: free${NC}"
    fi
    
    if echo "$POST_RESPONSE" | grep -q '"status":"active"'; then
        echo -e "${GREEN}✓ Profile has status: active${NC}"
    fi
else
    echo -e "${RED}✗ POST activation failed${NC}"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo ""

echo -e "${YELLOW}TEST 3: Frontend Check${NC}"
echo "To test the /free page:"
echo "1. Navigate to: $SITE_URL/free"
echo "2. Submit a name"
echo "3. Verify no [object Object] errors appear"
echo "4. Check browser console for CORS errors"
echo ""

echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}   DEPLOYMENT TESTS COMPLETE${NC}"
echo "════════════════════════════════════════════════════════════"

