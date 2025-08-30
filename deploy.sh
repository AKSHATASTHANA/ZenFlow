#!/bin/bash

echo "🚀 Starting production deployment..."

# Exit on any error
set -e

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the application
echo "🔨 Building application..."
npm run build

# Create logs directory
mkdir -p logs

# Set proper permissions
chmod +x dist/index.js

echo "✅ Build completed successfully!"
echo "📁 Build output: dist/"
echo "🚀 To start the application: npm start"
echo "📊 To monitor with PM2: pm2 start ecosystem.config.js --env production"
