# 🚀 Hostinger Hosting Guide for ZenFlow Hospital System

## 📋 Prerequisites
- Hostinger hosting account with Node.js support ✅
- SSH access credentials ✅
- Git access to your repository
- Basic knowledge of terminal/command line

## 🔧 Step-by-Step Deployment

### **Step 1: Prepare Your Local Project**

1. **Build the application locally:**
   ```bash
   npm run build
   ```
   This creates the `dist/` folder with production files.

2. **Verify build output:**
   ```bash
   ls -la dist/
   # Should show: index.js and public/ folder
   ```

### **Step 2: Connect to Your Hostinger Server**

**Your SSH Connection Details:**
```bash
ssh -p 65002 u423070873@89.117.157.128
```

**Password:** Use the password from your Hostinger control panel

### **Step 3: Navigate to Your Domain Directory**

```bash
# After connecting via SSH, navigate to your domain's public directory
cd public_html

# Or if you have a subdomain:
cd subdomain.yourdomain.com
```

### **Step 4: Upload Your Project**

#### **Option A: Git Clone (Recommended)**
```bash
# Clone your repository
git clone https://github.com/yourusername/zenflow-hospital.git

# Navigate to project
cd zenflow-hospital

# Install dependencies
npm install --production
```

#### **Option B: File Upload via FTP/SFTP**
1. Use FileZilla or similar FTP client
2. Upload your entire project folder
3. Connect via SSH and navigate to the uploaded folder

### **Step 5: Build on Hostinger Server**

```bash
# Install all dependencies (including dev dependencies for build)
npm install

# Build the application
npm run build
```

### **Step 6: Configure Environment Variables**

```bash
# Create production environment file
nano .env

# Add your production configuration:
NODE_ENV=production
PORT=5000
# Add your database URLs and other secrets
```

### **Step 7: Start the Application**

#### **Option A: Direct Start**
```bash
# Start the production server
npm start
```

#### **Option B: PM2 Process Manager (Recommended)**
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Set PM2 to start on server reboot
pm2 startup
```

### **Step 8: Configure Domain/Subdomain**

1. **In Hostinger Control Panel:**
   - Go to **Domains** → **Manage**
   - Add subdomain (e.g., `app.yourdomain.com`)
   - Point it to your project directory

2. **Create .htaccess file** (if using Apache):
   ```bash
   # The .htaccess file is already created in your project
   # It handles SPA routing and optimization
   ```

### **Step 9: Test Your Application**

1. **Check if server is running:**
   ```bash
   # Check PM2 status
   pm2 status
   
   # Check logs
   pm2 logs zenflow-hospital
   ```

2. **Test your domain:**
   - Visit `https://app.yourdomain.com`
   - Verify all features work correctly

## 🔍 Troubleshooting

### **Port Issues**
- Hostinger typically provides port 5000 or 3000
- Check your hosting plan's port allocation
- Use `PORT=3000 npm start` if needed

### **Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### **Permission Issues**
```bash
# Fix file permissions
chmod +x dist/index.js
chmod 755 dist/
chmod 755 dist/public/
```

### **Database Connection**
- Ensure your database credentials are correct
- Check if Hostinger allows external database connections
- Consider using Hostinger's MySQL databases

## 📊 Monitoring & Maintenance

### **PM2 Commands**
```bash
# View all processes
pm2 list

# Restart application
pm2 restart zenflow-hospital

# View logs
pm2 logs zenflow-hospital

# Monitor resources
pm2 monit
```

### **Logs Location**
- Application logs: `logs/` folder
- PM2 logs: `~/.pm2/logs/`
- Hostinger logs: Check control panel

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Database**: Use strong passwords and limit access
3. **HTTPS**: Enable SSL certificate in Hostinger
4. **Updates**: Keep dependencies updated regularly

## 📱 Performance Optimization

Your build already includes:
- ✅ Minified JavaScript and CSS
- ✅ Code splitting and lazy loading
- ✅ Optimized image assets
- ✅ Proper caching headers
- ✅ Gzip compression support

## 🆘 Getting Help

1. **Check PM2 logs**: `pm2 logs zenflow-hospital`
2. **Hostinger Support**: Contact their technical support
3. **Application logs**: Check `logs/` folder
4. **Console errors**: Check browser developer tools

## 🎯 Final Checklist

- [ ] Application builds successfully
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Server starts without errors
- [ ] Domain/subdomain configured
- [ ] SSL certificate enabled
- [ ] Application accessible via web
- [ ] All features working correctly
- [ ] PM2 configured (if using)
- [ ] Logs being generated

---

**🎉 Congratulations!** Your ZenFlow Hospital System is now hosted on Hostinger!

**Your Connection Details:**
- **SSH Command**: `ssh -p 65002 u423070873@89.117.157.128`
- **Username**: `u423070873`
- **Port**: `65002`
- **Server**: `89.117.157.128`

**Need help?** Check the troubleshooting section or contact Hostinger support.
