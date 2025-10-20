# Deployment Guide - Pangool Web App

This guide explains how to deploy the Pangool Web App to Cloudflare Pages using GitHub Actions.

## Prerequisites

1. **GitHub Account**: Your code repository
2. **Cloudflare Account**: For hosting on Cloudflare Pages
3. **Cloudflare API Token**: For automated deployments

## Setup Instructions

### 1. GitHub Repository Setup

If you haven't already pushed to GitHub:

```bash
# Initialize git (already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Pangool Web App"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/pangool_web_app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Cloudflare Account Setup

#### Get Your Cloudflare Account ID:
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account
3. The Account ID is in the right sidebar under "Account ID"

#### Create Cloudflare API Token:
1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template or create custom token with:
   - **Permissions**:
     - Account > Cloudflare Pages > Edit
     - Account > Workers Scripts > Edit
   - **Account Resources**: Include your account
4. Copy the token (you'll only see it once!)

### 3. GitHub Secrets Configuration

Add these secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   - **Name**: `CLOUDFLARE_API_TOKEN`
     - **Value**: Your Cloudflare API token from step 2

   - **Name**: `CLOUDFLARE_ACCOUNT_ID`
     - **Value**: Your Cloudflare Account ID from step 2

### 4. Create Cloudflare Pages Project

#### Option A: Using Cloudflare Dashboard (Recommended)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages**
3. Click **Create application** → **Pages** → **Connect to Git**
4. Connect your GitHub repository
5. Configure build settings:
   - **Project name**: `pangool-web-app`
   - **Build command**: (leave empty for static site)
   - **Build output directory**: `.`
6. Click **Save and Deploy**

#### Option B: Using Wrangler CLI
```bash
# Install Wrangler globally (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create Pages project
wrangler pages project create pangool-web-app --production-branch main
```

### 5. Deploy Worker (for API endpoint)

The divination API worker needs to be deployed separately:

```bash
cd worker
npm install
npx wrangler deploy
```

After deployment, update the API endpoint in `scripts/diviner.js` with your worker URL.

## Automatic Deployments

Once configured, the deployment pipeline will automatically:

1. **On Push to Main**: Deploy to production
2. **On Pull Request**: Create preview deployment
3. **Deploy Worker**: Update the API endpoint

## Manual Deployment

To deploy manually:

```bash
# Deploy Pages
npx wrangler pages deploy . --project-name=pangool-web-app

# Deploy Worker
cd worker
npx wrangler deploy
```

## Environment Configuration

### Production URLs
- **Main Site**: `https://pangool-web-app.pages.dev`
- **Custom Domain**: Configure in Cloudflare Dashboard → Pages → Custom domains
- **Worker API**: `https://pangool-api.YOUR_SUBDOMAIN.workers.dev`

### Update API Endpoint

After deploying the worker, update the API endpoint in your code:

1. Open `scripts/diviner.js`
2. Update the `API_ENDPOINT` constant:
   ```javascript
   const API_ENDPOINT = 'https://your-worker-name.your-subdomain.workers.dev/divination';
   ```
3. Commit and push the change

## Custom Domain Setup

To use a custom domain (e.g., pangool.com):

1. Go to Cloudflare Dashboard → Pages → your project
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter your domain name
5. Follow the DNS configuration instructions
6. Update `wrangler.toml` with your custom domain

## Monitoring and Logs

### View Deployment Logs:
- **GitHub Actions**: Repository → Actions tab
- **Cloudflare**: Dashboard → Workers & Pages → project → Deployments

### View Worker Logs:
```bash
npx wrangler tail
```

## Troubleshooting

### Deployment Fails
- Check GitHub Actions logs for error messages
- Verify Cloudflare API token has correct permissions
- Ensure Account ID is correct

### Worker Not Working
- Check worker logs: `npx wrangler tail`
- Verify environment variables are set
- Test worker endpoint directly

### Assets Not Loading
- Check `_headers` file for correct paths
- Verify paths in HTML files are correct
- Check browser console for errors

## Rollback

To rollback to a previous deployment:

1. Go to Cloudflare Dashboard → Workers & Pages
2. Select your project
3. Go to **Deployments** tab
4. Find the working deployment
5. Click **...** → **Rollback to this deployment**

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

## Support

For issues or questions:
- Check Cloudflare Community: https://community.cloudflare.com/
- Review GitHub Actions logs
- Contact: BY UNPAID LABOUR

