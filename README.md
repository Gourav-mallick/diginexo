# 🚀 Gourav Chandra Mallick - Personal Portfolio

A modern, production-ready personal portfolio website built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion). Features dynamic project management through Google Sheets integration, allowing non-technical updates without redeployment.

## ✨ Features

- **🎨 Modern Design**: Glassmorphism, smooth animations, and gradient effects
- **🌓 Dark Mode**: Full dark/light theme support with system preference detection
- **📱 Fully Responsive**: Mobile-first design that works on all devices
- **🎬 Smooth Animations**: Medium-level animations using Motion (Framer Motion)
- **📊 Dynamic Projects**: Fetch project data from Google Sheets (acts as CMS)
- **🔍 Advanced Filtering**: Filter projects by category, search, and featured status
- **⚡ Performance**: Optimized with lazy loading, efficient animations
- **♿ Accessible**: Built with accessibility best practices
- **📧 Contact Form**: Functional contact form with validation
- **🎯 SEO Ready**: Structured for search engine optimization

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Section.tsx      # Section wrapper
│   │   ├── ProjectCard.tsx  # Project display card
│   │   ├── ServiceCard.tsx  # Service display card
│   │   ├── SkillBar.tsx     # Animated skill bar
│   │   ├── TestimonialCard.tsx
│   │   └── ui/              # shadcn/ui components
│   ├── sections/            # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   └── App.tsx              # Main app component
├── contexts/
│   └── ThemeContext.tsx     # Dark mode context
├── services/
│   └── projectService.ts    # API calls for projects
├── types/
│   └── index.ts             # TypeScript interfaces
├── constants/
│   └── index.ts             # Static data & configuration
├── utils/
│   └── helpers.ts           # Utility functions
└── styles/                  # Global styles
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Motion** (Framer Motion) - Animations
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **shadcn/ui** - UI components
- **Vite** - Build tool

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables** (Optional - for Google Sheets integration)
   
   Create a `.env` file in the root directory:
   ```env
   # Method 1: Google Sheets API
   REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key_here
   REACT_APP_GOOGLE_SHEETS_ID=your_sheet_id_here
   
   # Method 2: SheetDB (easier alternative)
   REACT_APP_SHEETDB_API_URL=https://sheetdb.io/api/v1/your_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open browser**
   Navigate to `http://localhost:5173`

## 📊 Google Sheets Integration

### Setup Guide

#### Method 1: Google Sheets API (Recommended)

1. **Create Google Sheet**
   - Create a new Google Sheet
   - Add the following columns in the first row:
     ```
     id | projectName | category | techStack | description | imageUrl | githubLink | liveDemo | featured
     ```
   - Add your project data starting from row 2

2. **Get API Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable "Google Sheets API"
   - Create credentials → API Key
   - Copy the API key

3. **Make Sheet Public**
   - Open your Google Sheet
   - Click "Share"
   - Change to "Anyone with the link can view"
   - Copy the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

4. **Configure Environment Variables**
   ```env
   REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key
   REACT_APP_GOOGLE_SHEETS_ID=your_sheet_id
   ```

#### Method 2: SheetDB (Easier Alternative)

1. **Sign up at [SheetDB.io](https://sheetdb.io/)**
2. **Connect your Google Sheet**
3. **Copy the API URL**
4. **Configure Environment Variable**
   ```env
   REACT_APP_SHEETDB_API_URL=https://sheetdb.io/api/v1/your_id
   ```

### Sheet Structure Example

| id | projectName | category | techStack | description | imageUrl | githubLink | liveDemo | featured |
|----|------------|----------|-----------|-------------|----------|------------|----------|----------|
| 1 | TaskMaster | Android | Kotlin, Jetpack Compose | Task management app | https://... | https://... | https://... | true |
| 2 | ShopEase | Flutter | Flutter, Firebase | E-commerce app | https://... | https://... | https://... | true |

### Categories
- `Android`
- `Flutter`
- `Web`
- `UIUX`

## 🎨 Customization

### 1. Personal Information

Edit `/src/constants/index.ts`:

```typescript
export const PERSONAL_INFO = {
  name: 'Your Name',
  tagline: 'Your Tagline',
  email: 'your@email.com',
  phone: '+91-XXXXXXXXXX',
  whatsapp: '+91XXXXXXXXXX',
  // ... other fields
};
```

### 2. About Section

Update `ABOUT_TEXT` in `/src/constants/index.ts`

### 3. Skills

Modify the `SKILLS` array in `/src/constants/index.ts`

### 4. Services

Update the `SERVICES` array in `/src/constants/index.ts`

### 5. Testimonials

Edit the `TESTIMONIALS` array in `/src/constants/index.ts`

### 6. Colors & Theme

Modify `/src/styles/theme.css` for color scheme changes

### 7. Animations

Adjust animation variants in `/src/constants/index.ts` under `ANIMATION_VARIANTS`

## 📦 Building for Production

```bash
npm run build
# or
pnpm build
```

The build output will be in the `dist/` directory.

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard

### GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_GOOGLE_SHEETS_API_KEY` | Google Sheets API key | No* |
| `REACT_APP_GOOGLE_SHEETS_ID` | Google Sheet ID | No* |
| `REACT_APP_SHEETDB_API_URL` | SheetDB API URL | No* |

*Not required - app will use mock data if not configured

## 📝 Features Breakdown

### Hero Section
- Animated introduction
- CTA buttons
- Scroll indicator
- Gradient background

### About Section
- Professional summary
- Highlight cards
- Statistics
- Responsive layout

### Skills Section
- Categorized skills (Android, Web, Cross-platform, UI/UX)
- Animated progress bars
- Tabbed interface

### Projects Section
- Dynamic data from Google Sheets
- Category filters (All, Android, Flutter, Web, UI/UX)
- Search functionality
- Featured project highlighting
- Loading & error states
- Skeleton loaders

### Services Section
- Service cards with icons
- Hover animations
- Call-to-action

### Testimonials Section
- Client testimonials
- Avatar generation
- Quote styling

### Contact Section
- Contact form with validation
- Contact information cards
- WhatsApp integration
- Email validation
- Toast notifications

## 🎯 Performance Optimizations

- ✅ Lazy loading images
- ✅ Code splitting
- ✅ Optimized animations (60fps)
- ✅ Debounced search
- ✅ Viewport-based animations
- ✅ Minimal re-renders

## 🐛 Troubleshooting

### Google Sheets not loading?
- Check API key is valid
- Ensure sheet is public
- Verify sheet ID is correct
- Check browser console for errors

### Dark mode not working?
- Clear browser cache
- Check localStorage
- Ensure ThemeProvider is wrapping app

### Animations lagging?
- Reduce number of animated elements
- Adjust animation duration in constants
- Check browser hardware acceleration

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💬 Support

For support, email gourav@example.com or open an issue.

---

Built with ❤️ by Gourav Chandra Mallick
