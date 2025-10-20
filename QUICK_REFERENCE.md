# Quick Reference Card

## 🚀 Getting Started

### Run Locally
```bash
python -m http.server 8000
# Open http://localhost:8000
```

### Test Without API (Mock Data)
Edit `scripts/diviner.js`, line ~48:
```javascript
async function generateDivination() {
    showLoadingState();
    setTimeout(() => displayMockDivination(), 2000);
}
```

## 🔧 Configuration

### Frontend API Endpoint
`scripts/diviner.js`, line 4:
```javascript
const API_ENDPOINT = 'https://your-worker-url.workers.dev/divination';
```

### Worker Secrets
```bash
cd worker
wrangler secret put MODEL_API_ENDPOINT
wrangler secret put MODEL_API_KEY
```

## 📦 Deployment

### Deploy Worker
```bash
cd worker
wrangler deploy
```

### Deploy Frontend (Cloudflare Pages)
```bash
wrangler pages deploy . --project-name=serer-divination
```

## 🐛 Debugging

### View Worker Logs
```bash
cd worker
wrangler tail
```

### Test Worker Locally
```bash
cd worker
wrangler dev
```

### Check Browser Console
- F12 → Console tab
- Look for JavaScript errors
- Check Network tab for failed requests

## 🎨 Customization Quick Edits

### Change Colors
`styles/custom.css`, lines 3-7:
```css
:root {
    --red-primary: #ff0000;
    --red-dark: #cc0000;
    --gray-light: #cccccc;
    --gray-medium: #808080;
}
```

### Change Fonts
`styles/custom.css`, line 11:
```css
font-family: 'Courier New', Courier, monospace;
```

### Adjust Geometric Shape
`index.html`, lines 26-60 (SVG element)

### Modify Prompts
`worker/index.js`, lines 35-50 (systemPrompt)

## 📁 File Locations

| Purpose | File |
|---------|------|
| Home page | `index.html` |
| Diviner page | `diviner.html` |
| Home interactions | `scripts/home.js` |
| Diviner logic | `scripts/diviner.js` |
| Styles | `styles/custom.css` |
| API Worker | `worker/index.js` |
| Worker config | `worker/wrangler.toml` |
| Background image | `assets/images/background.jpg` |

## 🔍 Common Issues

### No background image
→ Add `assets/images/background.jpg`

### API not working
→ Check Worker URL in `diviner.js`
→ Verify secrets: `wrangler secret list`
→ Check logs: `wrangler tail`

### Page not loading
→ Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R)
→ Check browser console for errors

### Geometric shape not interactive
→ Check `scripts/home.js` is loading
→ Look for JavaScript errors in console

## 📊 Response Format

Your LLM must return JSON:
```json
{
  "heart": "Text about relationships...",
  "head": "Text about thoughts...",
  "soul": "Text about spirituality...",
  "flesh": "Text about body/health..."
}
```

## 🛠️ LLM Configuration

### Ollama Format
`worker/index.js`, line ~57:
```javascript
body: JSON.stringify({
  model: "llama2",
  prompt: `${systemPrompt}\n\n${prompt}`,
  stream: false,
  format: "json"
})
```
Response parsing (line ~77):
```javascript
let divinationText = modelData.response;
```

### OpenAI Format
`worker/index.js`, line ~57:
```javascript
body: JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: prompt }
  ]
})
```
Response parsing (line ~77):
```javascript
let divinationText = modelData.choices[0].message.content;
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Adjust in `styles/custom.css` using `@media` queries.

## ⌨️ Keyboard Shortcuts

- **Tab**: Navigate to geometric shape
- **Enter/Space**: Activate geometric shape (navigate to diviner)
- **Standard browser shortcuts** work throughout

## 🌐 Browser DevTools

### Test Responsive
- F12 → Toggle device toolbar (Ctrl+Shift+M)
- Try iPhone, iPad, Desktop sizes

### Network Tab
- See API requests
- Check response data
- Debug CORS issues

### Console Tab
- See JavaScript errors
- Debug API calls
- Check variable values

## 📝 Environment Variables

Worker uses these (set via `wrangler secret put`):
- `MODEL_API_ENDPOINT` (required)
- `MODEL_API_KEY` (optional)

View current secrets:
```bash
cd worker
wrangler secret list
```

## 🎯 Testing Checklist

- [ ] Home page loads
- [ ] Geometric shape visible
- [ ] Hover effects work
- [ ] Click navigates to diviner
- [ ] Divination generates
- [ ] All 4 sections show text
- [ ] "Return Home" works
- [ ] Mobile responsive
- [ ] Error handling works

## 💡 Tips

1. **Always test locally first** before deploying
2. **Use mock data** for frontend development
3. **Check Worker logs** when debugging API issues
4. **Hard refresh** after CSS changes
5. **Test on mobile** devices or emulator
6. **Keep backups** before making big changes

## 📚 Documentation

- **Full docs**: `README.md`
- **Setup guide**: `SETUP_GUIDE.md`
- **Deployment**: `DEPLOYMENT_CHECKLIST.md`
- **Overview**: `PROJECT_SUMMARY.md`
- **This file**: Quick reference

## 🆘 Emergency Rollback

### Worker
```bash
cd worker
wrangler rollback
```

### Frontend
Use hosting platform's rollback feature or redeploy previous version.

---

**Pro tip**: Bookmark this file for quick access during development!

