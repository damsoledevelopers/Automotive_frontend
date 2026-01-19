#!/bin/bash
# Verification Script - Check if all integration files are in place

echo "🔍 Checking Backend API Integration Files..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
found=0
missing=0

# Check function
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((found++))
    else
        echo -e "${RED}✗${NC} $1"
        ((missing++))
    fi
}

# Check directories
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 (directory)"
    else
        echo -e "${YELLOW}⚠${NC} $1 (creating recommended)"
    fi
}

echo "📂 Directory Structure:"
check_dir "src/utils"
check_dir "src/services"
check_dir "src/component"
echo ""

echo "📄 Core Integration Files:"
check_file "src/utils/api.js"
check_file "src/services/apiService.js"
check_file "src/auth/AuthContext.jsx"
check_file "src/component/LoginIntegrated.jsx"
check_file "src/component/RegisterIntegrated.jsx"
check_file "src/component/UserProfileIntegrated.jsx"
check_file "src/component/UsersListIntegrated.jsx"
echo ""

echo "📚 Documentation Files:"
check_file "README_INTEGRATION.md"
check_file "SETUP_GUIDE.md"
check_file "INTEGRATION_GUIDE.md"
check_file "QUICK_REFERENCE.md"
check_file "CODE_EXAMPLES.md"
check_file "APP_INTEGRATION_EXAMPLE.jsx"
check_file "DEPLOYMENT_CHECKLIST.md"
check_file "SUMMARY.md"
echo ""

echo "⚙️  Configuration Files:"
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓${NC} .env.local"
    echo "  Contents:"
    grep "REACT_APP_API_URL" .env.local && echo "  ✓ REACT_APP_API_URL found"
    ((found++))
else
    echo -e "${YELLOW}⚠${NC} .env.local (run: echo 'REACT_APP_API_URL=http://localhost:5000/api' > .env.local)"
    ((missing++))
fi
echo ""

echo "📦 Dependencies:"
if grep -q "axios" package.json; then
    echo -e "${GREEN}✓${NC} axios installed"
    ((found++))
else
    echo -e "${RED}✗${NC} axios (run: npm install axios)"
    ((missing++))
fi

if grep -q "react-toastify" package.json; then
    echo -e "${GREEN}✓${NC} react-toastify installed"
    ((found++))
else
    echo -e "${RED}✗${NC} react-toastify (run: npm install react-toastify)"
    ((missing++))
fi
echo ""

# Summary
total=$((found + missing))
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Summary: ${GREEN}${found}${NC} found, ${RED}${missing}${NC} missing"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $missing -eq 0 ]; then
    echo -e "${GREEN}✓ All integration files are in place!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. npm install axios react-toastify"
    echo "2. Create .env.local with REACT_APP_API_URL"
    echo "3. Update App.jsx (see APP_INTEGRATION_EXAMPLE.jsx)"
    echo "4. npm run dev"
else
    echo -e "${RED}✗ Some files are missing or not configured${NC}"
    echo ""
    echo "To fix:"
    echo "- Files should be auto-created"
    echo "- Run: npm install axios react-toastify"
    echo "- Create .env.local file"
fi
echo ""
