# ⚡ Quick Start Guide

Get your portfolio up and running in 10 minutes!

## 🚀 30-Second Overview

This is a modern, production-ready portfolio website with:
- ✨ Beautiful animations
- 🌓 Dark mode
- 📱 Fully responsive
- 📊 Google Sheets CMS (optional)
- ⚡ Ready to deploy

---

## 📋 Prerequisites

- Node.js 18+ installed
- Basic command line knowledge
- (Optional) Google account for Sheets integration

---

## 🎯 Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Step 2: Update Personal Info

Open `/src/constants/index.ts` and update:

```typescript
export const PERSONAL_INFO = {
  name: 'Your Name Here',              // ← Change this
  tagline: 'Your Tagline',             // ← Change this
  email: 'your@email.com',             // ← Change this
  phone: '+1-XXX-XXX-XXXX',           // ← Change this
  whatsapp: '+1XXXXXXXXXX',           // ← Change this
  // ... update social links
};
```

### Step 3: Update About & Skills

Still in `/src/constants/index.ts`:

```typescript
// Update your about text
export const ABOUT_TEXT = `Your professional summary here...`;

// Update your skills
export const SKILLS: Skill[] = [
  { name: 'Your Skill', level: 90, category: 'Android' },
  // Add your skills...
];
```

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

**🎉 Your portfolio is running!**

---

## 📊 Optional: Google Sheets Setup (5 minutes)

Want dynamic projects? Set up Google Sheets CMS:

### Quick Setup with SheetDB (Easiest)

1. **Create Google Sheet** with these columns:
   ```
   id | projectName | category | techStack | description | imageUrl | githubLink | liveDemo | featured
   ```

2. **Add sample data** (see example below)

3. **Go to [sheetdb.io](https://sheetdb.io)**
   - Sign up (free)
   - Create database from your sheet
   - Copy API URL

4. **Create `.env` file** in project root:
   ```env
   REACT_APP_SHEETDB_API_URL=https://sheetdb.io/api/v1/your_id
   ```

5. **Restart dev server**
   ```bash
   npm run dev
   ```

**Done!** Your projects now load from Google Sheets.

### Example Sheet Data

| id | projectName | category | techStack | description | imageUrl | githubLink | liveDemo | featured |
|----|-------------|----------|-----------|-------------|----------|------------|----------|----------|
| 1 | TaskMaster | Android | Kotlin, Compose | Task management app | https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800 | https://github.com/user/task | https://play.google.com | true |

**Categories:** Android, Flutter, Web, UIUX

---

## 🎨 Quick Customizations

### Change Colors

Find and replace in project:
```
from-blue-600 to-purple-600  →  from-pink-600 to-orange-600
```

### Add Your Resume

Place PDF at: `public/resume.pdf`

### Change Sections Order

Edit `/src/app/App.tsx`:
```tsx
<main>
  <HeroSection />
  <AboutSection />
  <SkillsSection />      ← Reorder these
  <ProjectsSection />
  <ServicesSection />
  <ContactSection />
</main>
```

---

## 🚀 Deploy (5 minutes)

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repo
   - Click "Deploy"

3. **Add Environment Variables** (if using Google Sheets)
   - Go to project settings
   - Add `REACT_APP_SHEETDB_API_URL`

**🎉 Your portfolio is live!**

### Alternative: Deploy to Netlify

1. Build locally:
   ```bash
   npm run build
   ```

2. Drag `dist` folder to [netlify.com](https://netlify.com)

**Done!**

---

## ✅ Post-Setup Checklist

After setup, verify:

- [ ] Your name displays correctly
- [ ] Email/phone are correct
- [ ] Social media links work
- [ ] Resume downloads
- [ ] Contact form validates
- [ ] Dark mode toggles
- [ ] Projects display (either mock or from Sheets)
- [ ] Mobile view looks good
- [ ] All sections load

---

## 📚 Need More Help?

### Detailed Guides

- **Complete Setup**: [README.md](README.md)
- **Google Sheets**: [GOOGLE_SHEETS_GUIDE.md](GOOGLE_SHEETS_GUIDE.md)
- **Deployment**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Customization**: [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- **Project Structure**: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

### Common Issues

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use?**
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

**Dark mode not working?**
- Clear browser cache
- Check browser console for errors

---

## 🎯 Customization Roadmap

### Now (10 minutes)
- [x] Basic setup
- [x] Personal info
- [x] Skills & services

### Soon (30 minutes)
- [ ] Add real projects (Google Sheets)
- [ ] Upload resume PDF
- [ ] Update testimonials
- [ ] Test on mobile

### Later (1 hour)
- [ ] Customize colors
- [ ] Add profile image
- [ ] Optimize images
- [ ] SEO optimization

---

## 🚀 You're All Set!

Your portfolio is ready to impress! 

### Next Steps:
1. ✅ Customize content
2. ✅ Add projects via Google Sheets
3. ✅ Deploy to production
4. ✅ Share with the world!

---

## 💡 Pro Tips

### Tip 1: Update Regularly
Keep your projects and skills updated via Google Sheets - no redeployment needed!

### Tip 2: Get Feedback
Share with friends/colleagues for feedback before going live.

### Tip 3: Monitor Performance
Use [PageSpeed Insights](https://pagespeed.web.dev/) to check performance.

### Tip 4: Add Analytics
Consider adding Google Analytics to track visitors.

### Tip 5: Keep Learning
Explore the code, customize, and make it your own!

---

## 📞 Support

Questions? Check out:
- 📖 [Full Documentation](README.md)
- 🐛 [Troubleshooting](README.md#-troubleshooting)
- 💬 GitHub Issues

---

**Happy Building! 🎉**

---

*Made with ❤️ for developers who want an amazing portfolio without the hassle*
