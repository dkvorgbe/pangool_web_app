#!/bin/bash

# Pangool Web App - Deployment Helper Script
# This script helps with common deployment tasks

set -e

echo "🌟 Pangool Web App Deployment Helper 🌟"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required tools
echo "📋 Checking required tools..."
if ! command_exists git; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ All required tools are available"
echo ""

# Menu
echo "Select an option:"
echo "1. Initial setup (first time deployment)"
echo "2. Deploy to Cloudflare Pages (manual)"
echo "3. Deploy Worker"
echo "4. Commit and push to GitHub"
echo "5. View deployment status"
echo "6. Exit"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Initial Setup"
        echo "==============="
        echo ""
        
        # Check if git is initialized
        if [ ! -d .git ]; then
            echo "Initializing git repository..."
            git init
        fi
        
        # Add files
        echo "Adding files to git..."
        git add .
        
        # Commit
        read -p "Enter commit message (default: 'Initial commit'): " commit_msg
        commit_msg=${commit_msg:-"Initial commit"}
        git commit -m "$commit_msg"
        
        # Add remote
        echo ""
        read -p "Enter your GitHub repository URL: " repo_url
        git remote add origin "$repo_url" 2>/dev/null || git remote set-url origin "$repo_url"
        
        # Set branch
        git branch -M main
        
        # Push
        echo ""
        echo "Pushing to GitHub..."
        git push -u origin main
        
        echo ""
        echo "✅ Initial setup complete!"
        echo ""
        echo "Next steps:"
        echo "1. Add GitHub secrets (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID)"
        echo "2. Create Cloudflare Pages project"
        echo "3. Deploy worker with option 3"
        echo ""
        echo "See DEPLOYMENT.md for detailed instructions"
        ;;
        
    2)
        echo ""
        echo "🌐 Deploying to Cloudflare Pages..."
        echo "==================================="
        echo ""
        
        if ! command_exists wrangler && ! command_exists npx; then
            echo "❌ Wrangler CLI not found. Installing..."
            npm install -g wrangler
        fi
        
        read -p "Enter project name (default: pangool-web-app): " project_name
        project_name=${project_name:-"pangool-web-app"}
        
        echo "Deploying..."
        npx wrangler pages deploy . --project-name="$project_name"
        
        echo ""
        echo "✅ Deployment complete!"
        ;;
        
    3)
        echo ""
        echo "⚙️  Deploying Worker..."
        echo "====================="
        echo ""
        
        cd worker
        
        if [ ! -d node_modules ]; then
            echo "Installing dependencies..."
            npm install
        fi
        
        echo "Deploying worker..."
        npx wrangler deploy
        
        echo ""
        echo "✅ Worker deployed!"
        echo ""
        echo "Don't forget to update the API endpoint in scripts/diviner.js"
        cd ..
        ;;
        
    4)
        echo ""
        echo "📤 Commit and Push to GitHub"
        echo "============================"
        echo ""
        
        # Show status
        echo "Current changes:"
        git status --short
        echo ""
        
        read -p "Add all changes? (y/n): " add_all
        if [ "$add_all" = "y" ]; then
            git add .
        else
            read -p "Enter files to add (or 'cancel' to abort): " files
            if [ "$files" = "cancel" ]; then
                echo "Cancelled"
                exit 0
            fi
            git add $files
        fi
        
        read -p "Enter commit message: " commit_msg
        if [ -z "$commit_msg" ]; then
            echo "❌ Commit message cannot be empty"
            exit 1
        fi
        
        git commit -m "$commit_msg"
        
        read -p "Push to GitHub? (y/n): " push
        if [ "$push" = "y" ]; then
            git push
            echo ""
            echo "✅ Changes pushed to GitHub!"
            echo ""
            echo "GitHub Actions will automatically deploy to Cloudflare Pages"
        fi
        ;;
        
    5)
        echo ""
        echo "📊 Deployment Status"
        echo "==================="
        echo ""
        
        echo "Git Status:"
        git status
        echo ""
        
        echo "Recent commits:"
        git log --oneline -5
        echo ""
        
        echo "Remote branches:"
        git branch -r
        echo ""
        
        echo "To view deployment status:"
        echo "- GitHub Actions: https://github.com/YOUR_USERNAME/YOUR_REPO/actions"
        echo "- Cloudflare Dashboard: https://dash.cloudflare.com"
        ;;
        
    6)
        echo "Goodbye! 👋"
        exit 0
        ;;
        
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

