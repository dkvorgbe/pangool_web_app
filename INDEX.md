# Serer Divination Web App - Documentation Index

Welcome! This is your central hub for all documentation related to the Serer Divination Web App.

## 📖 Documentation Files

### Getting Started
1. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** ⚡
   - **Start here!** Quick commands and common tasks
   - Perfect for daily development work
   - Copy-paste ready commands

2. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** 🚀
   - Step-by-step setup instructions
   - Local development setup
   - Cloudflare Worker configuration
   - LLM endpoint setup

### Development
3. **[README.md](README.md)** 📚
   - Complete technical documentation
   - Detailed feature descriptions
   - API integration guide
   - Troubleshooting section

4. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** 📋
   - Project overview
   - Architecture details
   - Feature checklist
   - Design system reference
   - Known limitations

### Deployment
5. **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** ✅
   - Pre-deployment verification
   - Production deployment steps
   - Post-deployment testing
   - Rollback procedures

## 🗂️ Project Structure

```
pangool_web_app/
│
├── 📄 HTML Pages
│   ├── index.html                 # Home page (geometric visualization)
│   └── diviner.html              # Divination results page
│
├── 📜 JavaScript
│   ├── scripts/home.js           # Home page interactions
│   └── scripts/diviner.js        # API calls & result display
│
├── 🎨 Styling
│   └── styles/custom.css         # Custom CSS (red/gray theme)
│
├── 🖼️ Assets
│   └── assets/images/            # Background images directory
│       └── README.md             # Image requirements
│
├── ☁️ Backend (Cloudflare Worker)
│   ├── worker/index.js           # API proxy logic
│   ├── worker/wrangler.toml      # Worker configuration
│   └── worker/package.json       # Dependencies
│
├── 📚 Documentation
│   ├── INDEX.md                  # This file
│   ├── QUICK_REFERENCE.md        # Quick commands
│   ├── SETUP_GUIDE.md            # Setup instructions
│   ├── README.md                 # Main documentation
│   ├── PROJECT_SUMMARY.md        # Project overview
│   └── DEPLOYMENT_CHECKLIST.md   # Deployment guide
│
└── ⚙️ Configuration
    └── .gitignore                # Git ignore patterns
```

## 🎯 Choose Your Path

### "I want to get started quickly"
→ Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

### "I'm setting up for the first time"
→ Follow [SETUP_GUIDE.md](SETUP_GUIDE.md)

### "I need detailed technical info"
→ Read [README.md](README.md)

### "I want to understand the architecture"
→ Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

### "I'm ready to deploy"
→ Use [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

## ⚡ Quick Start (5 Minutes)

1. **Add background image**
   ```bash
   # Add your image to:
   assets/images/background.jpg
   ```

2. **Start local server**
   ```bash
   python -m http.server 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

4. **Test with mock data** (no API needed)
   - Edit `scripts/diviner.js`
   - Uncomment mock data function (see QUICK_REFERENCE.md)

5. **Click around!**
   - Home page: hover over geometric shape
   - Click to navigate to diviner page
   - See mock divination results

## 🔑 Key Concepts

### Home Page
- **Geometric Visualization**: Interactive SVG with labeled vertices
- **Navigation**: Click shape to get divination
- **Vertices**: ASH, OKIIN, HEAD, FLESH, C (Serer cosmology)

### Diviner Page
- **Four Sections**: HEART, HEAD, SOUL, FLESH
- **API Integration**: Calls Cloudflare Worker → LLM
- **Loading States**: Spinner while waiting
- **Error Handling**: Retry on failure

### Cloudflare Worker
- **API Proxy**: Keeps credentials secure
- **Configurable**: Works with various LLMs
- **CORS Handling**: Allows frontend access
- **JSON Response**: Structured four-section format

## 🛠️ Essential Commands

```bash
# Local development
python -m http.server 8000

# Worker deployment
cd worker && wrangler deploy

# View worker logs
cd worker && wrangler tail

# Set secrets
cd worker && wrangler secret put MODEL_API_ENDPOINT
```

## 📱 Pages Overview

### index.html (Home)
- Geometric visualization with Serer cosmology vertices
- Interactive hover effects
- Click to navigate to divination
- Floral/nature background

### diviner.html (Results)
- Four red oval sections with divination text
- Loading and error states
- Navigation controls
- Clean, bold aesthetic

## 🎨 Design System

- **Colors**: Red (#ff0000) and grays
- **Font**: Courier New (monospace)
- **Style**: Retro digital aesthetic
- **Layout**: Responsive (mobile-first)

## 🔐 Configuration Required

Before deploying to production:

1. ✅ Add background image (`assets/images/background.jpg`)
2. ✅ Deploy Cloudflare Worker
3. ✅ Set `MODEL_API_ENDPOINT` secret
4. ✅ Set `MODEL_API_KEY` secret (if needed)
5. ✅ Update frontend API endpoint in `diviner.js`
6. ✅ Configure worker for your LLM format

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for details.

## 🧪 Testing

### Local Testing (No API)
Use mock data function in `diviner.js` - see QUICK_REFERENCE.md

### With API
1. Deploy worker
2. Configure endpoint
3. Test locally before deploying frontend

### Checklist
See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

## 📚 Additional Resources

### In Code Comments
- HTML files have inline comments
- JavaScript files are well-documented
- Worker includes configuration examples

### External Links
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

Having issues? Check in this order:

1. [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Common issues section
2. [README.md](README.md) - Troubleshooting section
3. Browser console (F12) - Check for errors
4. Worker logs - `wrangler tail`

## 💡 Pro Tips

- 🔖 **Bookmark this file** for easy access
- 📱 **Test on mobile** devices or browser DevTools
- 🧪 **Use mock data** during frontend development
- 📊 **Check Worker logs** when debugging API issues
- 💾 **Keep backups** before major changes
- 🔄 **Hard refresh** (Ctrl+Shift+R) after CSS updates

## 🤝 Contributing

When making changes:
1. Test locally first
2. Update relevant documentation
3. Check all pages work
4. Test responsive layouts
5. Verify error handling

## 📞 Support

For questions or issues:
1. Check documentation files above
2. Review code comments
3. Check browser console
4. Review Worker logs

## 🎉 You're Ready!

Start with [QUICK_REFERENCE.md](QUICK_REFERENCE.md) and build something amazing!

---

**Project**: Serer Divination Web App  
**Version**: 1.0  
**Status**: Ready for configuration and deployment  
**Last Updated**: October 19, 2025  
**By**: Unpaid Labour

