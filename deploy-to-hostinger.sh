#!/bin/bash

echo "🏥 ZenFlow Hospital System - Deploy to Hostinger"
echo "================================================="
echo "Server: 89.117.157.128:65002"
echo "User: u423070873"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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
echo -e "${BLUE}🚀 Ready to deploy to Hostinger!${NC}"
echo ""
echo -e "${YELLOW}📁 Files to upload to Hostinger:${NC}"
echo "   - Entire project folder (including dist/)"
echo "   - .env file (create on server with production values)"
echo ""
echo -e "${BLUE}🔧 SSH Connection Command:${NC}"
echo "   ssh -p 65002 u423070873@89.117.157.128"
echo ""
echo -e "${YELLOW}📋 On Hostinger server, run these commands:${NC}"
echo "   1. cd public_html"
echo "   2. git clone <your-repo-url> zenflow-hospital"
echo "   3. cd zenflow-hospital"
echo "   4. npm install"
echo "   5. npm run build"
echo "   6. nano .env (create production environment file)"
echo "   7. npm start"
echo ""
echo -e "${BLUE}📖 For detailed steps, see: HOSTING_GUIDE.md${NC}"
echo -e "${BLUE}📋 For quick reference, see: DEPLOYMENT_CHECKLIST.md${NC}"
echo ""
echo -e "${GREEN}🎉 Good luck with your deployment!${NC}"
echo ""
echo -e "${YELLOW}💡 Tip: You can also use PM2 for process management:${NC}"
echo "   npm install -g pm2"
echo "   pm2 start ecosystem.config.js --env production"
