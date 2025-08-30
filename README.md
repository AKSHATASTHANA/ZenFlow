# ZenFlow Hospital Management System

A comprehensive hospital management system built with React, TypeScript, and Node.js.

## 🚀 Production Deployment on Hostinger

### Prerequisites
- Node.js 18+ installed on your Hostinger server
- Access to Hostinger's Node.js hosting environment
- Git access to your repository

### Quick Deployment

1. **Clone and Setup**
   ```bash
   git clone <your-repository-url>
   cd ZenFlow-main
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Start the Application**
   ```bash
   npm start
   ```

### Advanced Deployment with PM2

1. **Install PM2 globally**
   ```bash
   npm install -g pm2
   ```

2. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

3. **Monitor your application**
   ```bash
   pm2 status
   pm2 logs zenflow-hospital
   ```

4. **Restart application**
   ```bash
   pm2 restart zenflow-hospital
   ```

### Environment Configuration

Create a `.env` file in your production environment with:
```env
NODE_ENV=production
PORT=5000
# Add your database connection strings and other environment variables
```

### Build Scripts

- `npm run build` - Builds both client and server
- `npm run build:client` - Builds only the client
- `npm run build:server` - Builds only the server
- `npm start` - Starts the production server

### File Structure After Build

```
dist/
├── index.js          # Server bundle
└── public/           # Client build
    ├── index.html
    ├── assets/
    └── ...
```

### Troubleshooting

1. **Port Issues**: Ensure the port specified in your environment variables is available
2. **Build Errors**: Check that all dependencies are properly installed
3. **Static Files**: Verify the `dist/public` directory exists after building

### Performance Optimization

The production build includes:
- Minified JavaScript and CSS
- Optimized bundle splitting
- Proper caching headers
- Gzip compression support
- Security headers

### Support

For deployment issues, check:
- Node.js version compatibility
- Port availability
- File permissions
- Environment variables

---

**Note**: This application is configured for production use with security headers, proper caching, and optimized builds.
