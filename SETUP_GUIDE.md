# Quick Setup Guide

This guide will help you get the Serer Divination Web App up and running quickly.

## Step 1: Add Background Image

1. Add a background image to `assets/images/background.jpg`
   - Use a floral/nature image that matches the mockup
   - Recommended size: 1920x1080 or larger

## Step 2: Test Locally

1. Open a terminal in the project directory
2. Start a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser
4. You should see the geometric visualization on the home page

## Step 3: Enable Mock Data (Optional for Testing)

To test without setting up the API:

1. Open `scripts/diviner.js`
2. Find the `generateDivination()` function (around line 48)
3. Replace the API call with mock data:
   ```javascript
   async function generateDivination() {
       showLoadingState();
       setTimeout(() => displayMockDivination(), 2000);
   }
   ```
4. Click the geometric shape on the home page
5. After 2 seconds, you'll see sample divination text

## Step 4: Set Up Cloudflare Worker (For Production)

### Prerequisites
```bash
# Install Node.js (if not already installed)
# Then install Wrangler CLI
npm install -g wrangler
```

### Deploy Worker
```bash
# Navigate to worker directory
cd worker

# Login to Cloudflare
wrangler login

# Set environment variables
wrangler secret put MODEL_API_ENDPOINT
# Enter your model API endpoint when prompted

# (Optional) Set API key if your model requires it
wrangler secret put MODEL_API_KEY
# Enter your API key when prompted

# Deploy
wrangler deploy
```

### Configure Frontend
1. Copy the Worker URL from the deployment output
2. Open `scripts/diviner.js`
3. Update line 4:
   ```javascript
   const API_ENDPOINT = 'https://your-worker-url.workers.dev/divination';
   ```

## Step 5: Configure Your LLM

The worker needs to be configured for your specific LLM. Edit `worker/index.js`:

### For Ollama (local)
```javascript
// Around line 57, update the fetch body:
body: JSON.stringify({
  model: "llama2",
  prompt: `${systemPrompt}\n\nUser request: ${prompt}\n\nGenerate a divination:`,
  stream: false,
  format: "json"
})

// Around line 77, update response parsing:
let divinationText = modelData.response;
```

### For OpenAI-compatible APIs
```javascript
// Around line 57, update the fetch body:
body: JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: prompt }
  ],
  temperature: 0.8
})

// Around line 77, update response parsing:
let divinationText = modelData.choices[0].message.content;
```

## Step 6: Test End-to-End

1. Ensure your local server is still running
2. Navigate to `http://localhost:8000`
3. Click the geometric visualization
4. Wait for the divination to load
5. Verify all four sections (HEART, HEAD, SOUL, FLESH) display properly

## Troubleshooting

### Home page loads but no background image
- Check that `assets/images/background.jpg` exists
- Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Geometric shape not interactive
- Check browser console for JavaScript errors
- Ensure `scripts/home.js` is loading

### Divination page shows error
- If using real API: Check Worker logs with `wrangler tail`
- Verify MODEL_API_ENDPOINT is set correctly
- Check network tab in browser dev tools for failed requests
- Use mock data for testing (see Step 3)

### Worker deployment fails
- Ensure you're logged into Cloudflare: `wrangler login`
- Check that `wrangler.toml` has correct configuration
- Verify you have a Cloudflare account

## Next Steps

1. **Customize styling**: Edit `styles/custom.css` to match your exact design
2. **Refine prompts**: Update the system prompt in `worker/index.js` to improve divination quality
3. **Add more interactions**: Enhance `scripts/home.js` for additional vertex interactions
4. **Deploy frontend**: Host on Cloudflare Pages, Netlify, or Vercel

## Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

For detailed information, see the main `README.md` file.

