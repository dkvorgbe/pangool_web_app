# Background Images

Place your background images in this directory.

## Required Images

- `background.jpg` - Floral/nature background image for the home page (geometric visualization page)

## Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Recommended size**: 1920x1080 or larger for best quality
- **Aspect ratio**: 16:9 works well for most screens
- **Style**: Should complement the red/gray aesthetic of the app

## Usage

The home page (`index.html`) references `background.jpg` by default. If you use a different filename, update the reference in the HTML:

```html
<div class="absolute inset-0 bg-cover bg-center opacity-70" 
     style="background-image: url('assets/images/your-image-name.jpg');">
</div>
```

Based on the mockups, the background should be a floral or nature image with warm tones that work well with the red geometric overlay.

