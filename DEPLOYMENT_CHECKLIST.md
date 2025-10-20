# Deployment Checklist

Use this checklist to ensure everything is properly configured before deploying to production.

## Pre-Deployment

### Assets
- [ ] Background image added to `assets/images/background.jpg`
- [ ] Background image is optimized for web (compressed, appropriate size)
- [ ] Image displays correctly on home page

### Local Testing
- [ ] Home page loads without errors
- [ ] Geometric visualization is visible and interactive
- [ ] Hover effects work on vertices
- [ ] Clicking geometric shape navigates to diviner page
- [ ] Mock divination works (if testing without API)
- [ ] All sections (HEART, HEAD, SOUL, FLESH) display properly
- [ ] "Return Home" button works
- [ ] Mobile responsive layout looks good

### Code Review
- [ ] No console errors in browser
- [ ] No JavaScript errors
- [ ] CSS loads correctly
- [ ] Tailwind CSS CDN is accessible
- [ ] All file paths are correct

## Cloudflare Worker Setup

### Installation
- [ ] Node.js installed
- [ ] Wrangler CLI installed (`npm install -g wrangler`)
- [ ] Logged into Cloudflare (`wrangler login`)

### Configuration
- [ ] `worker/wrangler.toml` configured with correct name
- [ ] `MODEL_API_ENDPOINT` environment variable set
- [ ] `MODEL_API_KEY` set (if required by your model)
- [ ] Worker code adjusted for your specific LLM API format
- [ ] Response parsing logic matches your model's output format

### Testing
- [ ] Worker tested locally (`wrangler dev`)
- [ ] Test API request returns valid JSON
- [ ] Response structure matches: `{ heart: "", head: "", soul: "", flesh: "" }`
- [ ] CORS headers working correctly
- [ ] Error handling works properly

### Deployment
- [ ] Worker deployed (`wrangler deploy`)
- [ ] Worker URL copied
- [ ] Worker accessible via HTTPS
- [ ] Test request to worker endpoint succeeds

## Frontend Configuration

### API Integration
- [ ] Worker URL updated in `scripts/diviner.js` (line 4)
- [ ] Mock data testing code removed or commented out
- [ ] API endpoint is correct format: `/divination`

### Content
- [ ] Header text is correct
- [ ] Footer attribution is correct
- [ ] Date display works correctly
- [ ] All labels match design (HEART, HEAD, SOUL, FLESH)

### Styling
- [ ] Colors match mockup (red #ff0000, gray tones)
- [ ] Fonts display correctly
- [ ] Red blobs display on diviner page
- [ ] Responsive breakpoints tested

## Production Deployment

### Frontend Hosting Options

#### Option 1: Cloudflare Pages
```bash
# From project root
wrangler pages deploy . --project-name=serer-divination
```
- [ ] Site deployed
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled

#### Option 2: Netlify
- [ ] Connect GitHub repository or drag & drop folder
- [ ] Configure build settings (none needed for this project)
- [ ] Deploy site
- [ ] Custom domain configured (if applicable)

#### Option 3: Vercel
- [ ] Import GitHub repository or use Vercel CLI
- [ ] Configure project settings
- [ ] Deploy
- [ ] Custom domain configured (if applicable)

### Post-Deployment Testing
- [ ] Home page loads on production URL
- [ ] Geometric visualization works
- [ ] Navigation to diviner page works
- [ ] API calls succeed
- [ ] Divination generates successfully
- [ ] All four sections populate with text
- [ ] Error handling works (test with worker offline)
- [ ] Mobile devices tested
- [ ] Different browsers tested (Chrome, Firefox, Safari)

## Performance & Optimization

### Optional Enhancements
- [ ] Background image optimized/compressed
- [ ] Consider using WebP format for images
- [ ] Add loading="lazy" for images if adding more
- [ ] Test load time (should be fast with static HTML)
- [ ] Consider adding meta tags for SEO
- [ ] Add favicon

## Security

- [ ] API keys stored as secrets, not in code
- [ ] No sensitive data in repository
- [ ] Worker CORS properly configured
- [ ] Rate limiting considered (Cloudflare provides this)

## Monitoring

- [ ] Worker logs accessible (`wrangler tail`)
- [ ] Error tracking set up (optional)
- [ ] Analytics considered (optional)

## Documentation

- [ ] README.md updated with production URL
- [ ] SETUP_GUIDE.md reflects any custom changes
- [ ] Team members know how to deploy updates

## Final Checks

- [ ] All placeholder text replaced with real content
- [ ] Copyright year is current
- [ ] Contact/support information added (if applicable)
- [ ] Backup of working version created
- [ ] Git repository up to date

---

## Quick Deployment Commands

### Deploy Worker
```bash
cd worker
wrangler deploy
```

### Deploy Frontend (Cloudflare Pages)
```bash
# From project root
wrangler pages deploy . --project-name=serer-divination
```

### Update Worker Secrets
```bash
cd worker
wrangler secret put MODEL_API_ENDPOINT
wrangler secret put MODEL_API_KEY
```

### View Worker Logs
```bash
cd worker
wrangler tail
```

---

## Rollback Plan

If something goes wrong:

1. **Worker Issues:**
   ```bash
   cd worker
   wrangler rollback
   ```

2. **Frontend Issues:**
   - Revert to previous deployment through hosting platform
   - Or redeploy from last known good commit

3. **Emergency:**
   - Switch `scripts/diviner.js` to use mock data temporarily
   - Investigate and fix issues
   - Redeploy when ready

---

**Last Updated:** Add date when you complete deployment
**Deployed By:** Add your name
**Production URL:** Add URL when deployed
**Worker URL:** Add worker URL when deployed

