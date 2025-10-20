# 🚀 Quick Start - Deploy to GitHub & Cloudflare

## Prerequisites Checklist
- [ ] GitHub account
- [ ] Cloudflare account
- [ ] Git installed
- [ ] Node.js installed

## Step-by-Step Deployment

### 1️⃣ Push to GitHub (First Time)

```bash
# Use the helper script
./deploy.sh
# Select option 1: Initial setup

# OR manually:
git add .
git commit -m "Initial commit: Pangool Web App"
git remote add origin https://github.com/YOUR_USERNAME/pangool_web_app.git
git branch -M main
git push -u origin main
```

### 2️⃣ Get Cloudflare Credentials

**Account ID:**
1. Go to https://dash.cloudflare.com
2. Select account → Copy Account ID from right sidebar

**API Token:**
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template
4. Copy the token

### 3️⃣ Add GitHub Secrets

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `CLOUDFLARE_API_TOKEN` = (your API token)
   - `CLOUDFLARE_ACCOUNT_ID` = (your account ID)

### 4️⃣ Create Cloudflare Pages Project

**Via Dashboard:**
1. Go to https://dash.cloudflare.com
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Connect GitHub repo
4. Project name: `pangool-web-app`
5. Build output directory: `.`
6. Click **Save and Deploy**

**Via CLI:**
```bash
npm install -g wrangler
wrangler login
wrangler pages project create pangool-web-app --production-branch main
```

### 5️⃣ Deploy Worker API

```bash
# Use helper script
./deploy.sh
# Select option 3: Deploy Worker

# OR manually:
cd worker
npm install
npx wrangler deploy
```

### 6️⃣ Update API Endpoint

After worker deploys, you'll get a URL like:
`https://pangool-api.YOUR_SUBDOMAIN.workers.dev`

Update `scripts/diviner.js`:
```javascript
const API_ENDPOINT = 'https://your-worker-url.workers.dev/divination';
```

Commit and push:
```bash
git add scripts/diviner.js
git commit -m "Update API endpoint"
git push
```

## ✅ Done!

Your site is now live at:
- **Cloudflare URL**: `https://pangool-web-app.pages.dev`
- **Custom domain**: Configure in Cloudflare Dashboard

## Future Deployments

Just push to main branch:
```bash
git add .
git commit -m "Your changes"
git push
```

GitHub Actions will automatically deploy! 🎉

## Quick Commands

```bash
# Commit and push (triggers auto-deploy)
./deploy.sh  # Option 4

# Manual deploy to Cloudflare
./deploy.sh  # Option 2

# Deploy worker
./deploy.sh  # Option 3

# Check status
./deploy.sh  # Option 5
```

## Troubleshooting

**Deployment fails?**
- Check GitHub Actions logs: Repo → Actions tab
- Verify secrets are set correctly
- Check Cloudflare dashboard for errors

**Worker not working?**
```bash
cd worker
npx wrangler tail  # View real-time logs
```

**Need help?**
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide

---

**BY UNPAID LABOUR** © 2025

