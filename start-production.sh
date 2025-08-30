#!/bin/bash

echo "🏥 Starting ZenFlow Hospital System in production mode..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Build directory not found. Please run 'npm run build' first."
    exit 1
fi

# Check if dist/index.js exists
if [ ! -f "dist/index.js" ]; then
    echo "❌ Server bundle not found. Please run 'npm run build' first."
    exit 1
fi

# Set production environment
export NODE_ENV=production

# Start the application
echo "🚀 Starting server..."
node dist/index.js
