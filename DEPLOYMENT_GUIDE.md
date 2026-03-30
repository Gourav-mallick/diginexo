# 🚀 Deployment Guide

Complete guide for deploying your portfolio to various platforms.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- ✅ All personal information is updated in `/src/constants/index.ts`
- ✅ Google Sheets integration is configured (if using)
- ✅ All images are optimized and loading
- ✅ Resume PDF is added to `/public/resume.pdf`
- ✅ Contact form email/WhatsApp are correct
- ✅ All social media links are updated
- ✅ Site works perfectly in development
- ✅ Dark mode is functioning
- ✅ Mobile responsive design is tested
- ✅ No console errors in browser DevTools

---

## 1️⃣ Vercel (Recommended)

### Why Vercel?
- ✅ Easiest deployment
- ✅ Automatic deployments from Git
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Built for React/Vite

### Deployment Steps:

#### Method A: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Click **"Import"**

3. **Configure Project**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables**
   - In project settings → Environment Variables
   - Add:
     ```
     REACT_APP_GOOGLE_SHEETS_API_KEY=your_key
     REACT_APP_GOOGLE_SHEETS_ID=your_sheet_id
     ```
   - Or for SheetDB:
     ```
     REACT_APP_SHEETDB_API_URL=your_url
     ```

5. **Deploy**
   - Click **"Deploy"**
   - Wait 1-2 minutes
   - Your site is live! 🎉

6. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

#### Method B: Deploy with CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

### Auto-Deploy on Git Push

Once connected to GitHub:
- Every push to `main` branch = automatic deployment
- Pull requests = preview deployments
- No manual deploy needed!

---

## 2️⃣ Netlify

### Why Netlify?
- ✅ Simple deployment
- ✅ Form handling (useful for contact form)
- ✅ Split testing
- ✅ Free tier generous

### Deployment Steps:

#### Method A: Drag & Drop (Quick)

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to Netlify Drop zone
   - Site is live instantly!

#### Method B: Git Integration (Recommended)

1. **Push to GitHub** (same as Vercel)

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click **"Add new site"** → **"Import from Git"**
   - Choose GitHub
   - Select your repository

3. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click **"Deploy"**

4. **Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add your variables:
     ```
     REACT_APP_GOOGLE_SHEETS_API_KEY
     REACT_APP_GOOGLE_SHEETS_ID
     ```

5. **Custom Domain**
   - Go to Domain settings
   - Add custom domain
   - Configure DNS

### Netlify Forms Integration

To make contact form work with Netlify Forms:

1. Add to contact form:
   ```html
   <form name="contact" method="POST" data-netlify="true">
     <input type="hidden" name="form-name" value="contact" />
     <!-- rest of form -->
   </form>
   ```

2. Netlify will handle form submissions automatically!

---

## 3️⃣ GitHub Pages

### Why GitHub Pages?
- ✅ Free
- ✅ Integrated with GitHub
- ✅ Simple for open source

### Limitations:
- ⚠️ No environment variables support
- ⚠️ Public repositories only (free)
- ⚠️ Requires workaround for env vars

### Deployment Steps:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/portfolio/',  // your repo name
     // rest of config...
   });
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` → `root`
   - Save

6. **Access Site**
   - Your site: `https://yourusername.github.io/portfolio`

### Environment Variables Workaround

Since GitHub Pages doesn't support env vars:

**Option 1:** Use SheetDB with public URL
```typescript
// In constants/index.ts
export const API_CONFIG = {
  SHEETDB_API_URL: 'https://sheetdb.io/api/v1/your_id',
};
```

**Option 2:** Hardcode (not recommended for sensitive keys)
```typescript
export const API_CONFIG = {
  GOOGLE_SHEETS_API_KEY: 'your_key_here',
  GOOGLE_SHEETS_ID: 'your_sheet_id',
};
```

---

## 4️⃣ Cloudflare Pages

### Why Cloudflare Pages?
- ✅ Free unlimited bandwidth
- ✅ Excellent performance
- ✅ DDoS protection

### Deployment Steps:

1. **Push to GitHub**

2. **Connect to Cloudflare Pages**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Click **"Create a project"**
   - Connect GitHub
   - Select repository

3. **Configure Build**
   - Framework preset: **None** or **Vite**
   - Build command: `npm run build`
   - Build output: `dist`

4. **Environment Variables**
   - Add in project settings

5. **Deploy**
   - Click **"Save and Deploy"**

---

## 5️⃣ Custom Server (VPS/Dedicated)

### For Advanced Users

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder to server**
   ```bash
   scp -r dist/* user@yourserver:/var/www/html/
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Setup SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🌐 Custom Domain Setup

### Namecheap

1. Go to Domain List → Manage
2. Advanced DNS → Add Records:
   ```
   Type: A Record
   Host: @
   Value: [Your hosting IP]
   TTL: Automatic

   Type: CNAME
   Host: www
   Value: yourdomain.com
   TTL: Automatic
   ```

### GoDaddy

1. DNS Management → Add Records
2. Similar to above

### Cloudflare DNS

1. Add site to Cloudflare
2. Update nameservers at registrar
3. Add A/CNAME records in Cloudflare

---

## 📊 Post-Deployment Setup

### 1. Google Analytics (Optional)

Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. SEO Setup

Update `index.html`:
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>Gourav Chandra Mallick - Android | Flutter | Web Developer</title>
  <meta name="description" content="Full-stack mobile and web developer specializing in Android, Flutter, React, and Angular. View my portfolio of 50+ projects." />
  <meta name="keywords" content="Android Developer, Flutter Developer, Web Developer, Mobile App Developer, Kotlin, React, Portfolio" />
  <meta name="author" content="Gourav Chandra Mallick" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourwebsite.com/" />
  <meta property="og:title" content="Gourav Chandra Mallick - Portfolio" />
  <meta property="og:description" content="Full-stack mobile and web developer" />
  <meta property="og:image" content="https://yourwebsite.com/preview.jpg" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://yourwebsite.com/" />
  <meta property="twitter:title" content="Gourav Chandra Mallick - Portfolio" />
  <meta property="twitter:description" content="Full-stack mobile and web developer" />
  <meta property="twitter:image" content="https://yourwebsite.com/preview.jpg" />
</head>
```

### 3. Add Resume PDF

Place your resume at:
```
public/resume.pdf
```

### 4. Sitemap (Optional)

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourwebsite.com/</loc>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 5. robots.txt (Optional)

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://yourwebsite.com/sitemap.xml
```

---

## 🔍 Testing Your Deployment

### 1. Performance Test
- [PageSpeed Insights](https://pagespeed.web.dev/)
- Target: 90+ score

### 2. Mobile Test
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### 3. SEO Test
- [SEO Site Checkup](https://seositecheckup.com/)

### 4. SSL Test
- [SSL Labs](https://www.ssllabs.com/ssltest/)

---

## 🐛 Common Deployment Issues

### Issue: Build fails

**Solution:**
```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Issue: Environment variables not working

**Solution:**
- Verify variable names start with `REACT_APP_`
- Check no extra spaces in values
- Redeploy after adding env vars

### Issue: 404 on refresh

**Solution:**
Add to `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Or `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Issue: Images not loading

**Solution:**
- Check image URLs are accessible
- Verify CORS headers
- Use CDN for images

---

## 🎉 Congratulations!

Your portfolio is now live! 🚀

### Next Steps:
1. ✅ Share on social media
2. ✅ Add to LinkedIn profile
3. ✅ Submit to web directories
4. ✅ Monitor with Google Analytics
5. ✅ Keep projects updated via Google Sheets

---

## 📞 Need Help?

- Check documentation
- Review error logs in deployment platform
- Search Stack Overflow
- Open GitHub issue

Happy deploying! 🎊
