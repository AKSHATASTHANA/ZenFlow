#!/bin/bash

echo "🏥 ZenFlow Hospital System - Hostinger Deployment"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Pre-deployment checks...${NC}"

# Check if dist folder exists
if [ -d "dist" ]; then
    echo -e "${GREEN}✅ Build folder found${NC}"
else
    echo -e "${YELLOW}⚠️  Build folder not found. Building now...${NC}"
    npm run build
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Build failed. Please fix errors and try again.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ All pre-deployment checks passed!${NC}"
echo ""
echo -e "${YELLOW}🚀 Ready for Hostinger deployment!${NC}"
echo ""
echo "📁 Files to upload to Hostinger:"
echo "   - Entire project folder (including dist/)"
echo "   - .env file (create on server with production values)"
echo ""
echo "🔧 On Hostinger server, run:"
echo "   1. npm install"
echo "   2. npm start"
echo "   OR"
echo "   3. pm2 start ecosystem.config.js --env production"
echo ""
echo "📖 See HOSTING_GUIDE.md for detailed steps"
echo "📋 See DEPLOYMENT_CHECKLIST.md for quick reference"
echo ""
echo -e "${GREEN}🎉 Good luck with your deployment!${NC}"
