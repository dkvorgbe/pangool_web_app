# Serer Divination Web App

A web application for generating divinations from Serer cosmology, featuring an interactive geometric visualization and AI-generated divination texts.

## 🚀 Quick Deploy to Cloudflare

**New to deployment?** Check out [DEPLOY_QUICK_START.md](./DEPLOY_QUICK_START.md) for a step-by-step guide!

**Need details?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

## Overview

This application consists of two main pages:

1. **Home Page** (`index.html`): Features an interactive geometric visualization representing Serer cosmological concepts with labeled vertices (ASH, OKIIN, HEAD, FLESH, C). Clicking the visualization navigates to the divination page.

2. **Diviner Page** (`diviner.html`): Displays divination results in four sections (HEART, HEAD, SOUL, FLESH), each addressing different aspects of life and spirituality within Serer cosmology.

## Technology Stack

- **Frontend**: Plain HTML, CSS, JavaScript (no build tools required)
- **Styling**: Tailwind CSS (via CDN) + custom CSS
- **Backend**: Cloudflare Workers (serverless API proxy)
- **LLM**: Local/open-source model (configurable endpoint)

## Project Structure

```
pangool_web_app/
├── index.html              # Home page with geometric visualization
├── diviner.html           # Divination results page
├── styles/
│   └── custom.css         # Custom styling (red/gray theme)
├── scripts/
│   ├── home.js           # Home page interactions
│   └── diviner.js        # Divination API calls and display logic
├── assets/
│   └── images/           # Background images
├── worker/
│   └── index.js          # Cloudflare Worker for API proxy
└── README.md
```

## Quick Start

### Option A: Deploy to Production
```bash
# Use the deployment helper script
./deploy.sh

# Follow the interactive prompts to:
# 1. Push to GitHub
# 2. Deploy to Cloudflare Pages
# 3. Deploy the Worker API
```

See [DEPLOY_QUICK_START.md](./DEPLOY_QUICK_START.md) for detailed deployment steps.

### Option B: Local Development

To run the application locally:

```bash
# Navigate to the project directory
cd pangool_web_app

# Start a simple HTTP server (choose one):

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open your browser to `http://localhost:8000`

### 2. Configure the API Endpoint

#### Update Frontend Configuration

In `scripts/diviner.js`, update the API endpoint URL:

```javascript
const API_ENDPOINT = 'https://your-worker.your-subdomain.workers.dev/divination';
```

Replace with your actual Cloudflare Worker URL after deployment.

### 3. Deploy Cloudflare Worker

#### Prerequisites
- A Cloudflare account (free tier works)
- Node.js installed
- Wrangler CLI installed: `npm install -g wrangler`

#### Deployment Steps

1. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

2. **Create a new Worker project** (if needed)
   ```bash
   cd worker
   wrangler init
   ```

3. **Configure wrangler.toml**
   
   Create a `wrangler.toml` file in the `worker/` directory:
   ```toml
   name = "serer-divination-api"
   main = "index.js"
   compatibility_date = "2024-01-01"
   
   [env.production]
   vars = {}
   ```

4. **Set Environment Variables**
   ```bash
   # Set your model API endpoint
   wrangler secret put MODEL_API_ENDPOINT
   # Enter your model endpoint URL when prompted
   
   # Set API key (if your model requires it)
   wrangler secret put MODEL_API_KEY
   # Enter your API key when prompted
   ```

5. **Deploy the Worker**
   ```bash
   wrangler deploy
   ```

6. **Note the Worker URL**
   
   After deployment, you'll receive a URL like:
   ```
   https://serer-divination-api.your-subdomain.workers.dev
   ```
   
   Update this in `scripts/diviner.js` as described above.

### 4. Configure Your LLM Endpoint

The worker is designed to work with various LLM APIs. You'll need to adjust the request format in `worker/index.js` based on your model:

#### For Ollama (local)
```javascript
body: JSON.stringify({
  model: "llama2",  // or your model name
  prompt: `${systemPrompt}\n\nUser request: ${prompt}\n\nGenerate a divination:`,
  stream: false,
  format: "json"
})
```

#### For OpenAI-compatible APIs
```javascript
body: JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: prompt }
  ],
  temperature: 0.8
})
```

#### For other text generation APIs
Adjust the request/response format in `worker/index.js` according to your API's documentation.

### 5. Testing with Mock Data

For development without an API, you can use mock data:

In `scripts/diviner.js`, find the `generateDivination()` function and replace the API call with:

```javascript
async function generateDivination() {
    showLoadingState();
    setTimeout(() => displayMockDivination(), 2000);
}
```

This will display sample divination text after a 2-second delay.

## Adding Background Images

Place your background images in the `assets/images/` directory:

- `background.jpg` - For the home page (floral/nature image)

Update the image references in the HTML files if using different filenames.

## Customization

### Styling

Edit `styles/custom.css` to customize:
- Color palette (currently red and gray)
- Fonts
- Animation timings
- Responsive breakpoints

### Divination Prompts

The system prompt for generating divinations is in `worker/index.js`. Modify the `systemPrompt` variable to adjust:
- Tone and style
- Length of responses
- Specific Serer cosmology references
- JSON structure

### Geometric Visualization

Edit the SVG in `index.html` to modify:
- Shape structure
- Vertex positions
- Labels
- Colors and styling

Corresponding interactions are in `scripts/home.js`.

## Browser Compatibility

The application works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Security Notes

- The Cloudflare Worker acts as a proxy to keep your model API credentials secure
- Never commit API keys to the repository
- Use environment variables for all sensitive configuration
- The worker includes CORS headers for frontend access

## Troubleshooting

### API Calls Failing

1. Check browser console for errors
2. Verify Cloudflare Worker is deployed and accessible
3. Confirm environment variables are set correctly
4. Check that MODEL_API_ENDPOINT is reachable from Cloudflare's network

### Worker Issues

```bash
# View worker logs
wrangler tail

# Test locally
wrangler dev
```

### Styling Issues

Clear browser cache or use hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

## Future Enhancements

Potential features to add:
- User authentication
- Save divination history
- Multiple language support
- More complex vertex interactions
- Custom prompt configuration UI
- Social sharing features

## License

© 2025 BY UNPAID LABOUR

## Support

For issues or questions, please refer to the project documentation or contact the development team.

