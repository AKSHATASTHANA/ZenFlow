# 🚀 Quick Deployment Checklist for Hostinger

## ✅ Pre-Deployment (Local)
- [ ] `npm run build` - Build successful
- [ ] `dist/` folder contains `index.js` and `public/`
- [ ] All dependencies in `package.json`
- [ ] `.env` file ready (don't commit this!)

## 🔧 On Hostinger Server

### **1. Server Setup**
- [ ] SSH access enabled in Hostinger
- [ ] Connected to server via SSH
- [ ] Navigated to project directory

### **2. Dependencies & Build**
- [ ] `npm install` - All packages installed
- [ ] `npm run build` - Production build successful
- [ ] `dist/` folder created on server

### **3. Environment & Configuration**
- [ ] `.env` file created with production values
- [ ] `NODE_ENV=production` set
- [ ] `PORT` configured (5000 or 3000)
- [ ] Database URLs configured

### **4. Start Application**
- [ ] `npm start` - Server starts without errors
- [ ] OR `pm2 start ecosystem.config.js --env production`
- [ ] Application accessible via domain

### **5. Domain Configuration**
- [ ] Subdomain created in Hostinger
- [ ] Points to project directory
- [ ] SSL certificate enabled
- [ ] `.htaccess` file in place

## 🧪 Testing
- [ ] Homepage loads correctly
- [ ] All routes work (SPA routing)
- [ ] Images and assets load
- [ ] No console errors
- [ ] Mobile responsive

## 📊 Monitoring
- [ ] PM2 status shows running
- [ ] Logs being generated
- [ ] No error messages
- [ ] Performance acceptable

---

**🎯 Ready to deploy?** Follow the detailed guide in `HOSTING_GUIDE.md`
