# 🎨 Customization Guide

Complete guide to customize your portfolio to match your personal brand and style.

## 📋 Table of Contents

1. [Personal Information](#1-personal-information)
2. [Content Customization](#2-content-customization)
3. [Styling & Theme](#3-styling--theme)
4. [Layout Changes](#4-layout-changes)
5. [Adding New Sections](#5-adding-new-sections)
6. [Performance Optimization](#6-performance-optimization)

---

## 1. Personal Information

### Update Your Details

**File:** `/src/constants/index.ts`

```typescript
export const PERSONAL_INFO = {
  name: 'Your Full Name',                    // Your name
  tagline: 'Your Professional Tagline',      // Displayed in hero
  title: 'Your Job Title',                   // SEO and meta
  email: 'your.email@example.com',           // Contact email
  phone: '+1-234-567-8900',                  // Phone number
  whatsapp: '+11234567890',                  // WhatsApp number (no spaces/dashes)
  location: 'Your City, Country',            // Location
  resumeUrl: '/resume.pdf',                  // Path to your resume
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
};
```

### Add Your Resume

1. Place your PDF resume in `/public/resume.pdf`
2. Or change the path in `PERSONAL_INFO.resumeUrl`

---

## 2. Content Customization

### About Section

**File:** `/src/constants/index.ts`

```typescript
export const ABOUT_TEXT = `
Write your professional summary here. Focus on:
- Your expertise and specialization
- Years of experience
- What makes you unique
- Your approach to development
Keep it concise (3-4 sentences) and impactful.
`;
```

### Skills

**File:** `/src/constants/index.ts`

```typescript
export const SKILLS: Skill[] = [
  { 
    name: 'Your Skill',           // Skill name
    level: 90,                    // Proficiency level (0-100)
    category: 'Android'           // Android | Web | Cross-platform | UIUX
  },
  // Add more skills...
];
```

**Categories:**
- `Android` - Android development skills
- `Web` - Web development skills
- `Cross-platform` - Flutter, React Native, etc.
- `UIUX` - Design and UI/UX skills

### Services

**File:** `/src/constants/index.ts`

```typescript
export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Service Name',
    description: 'Detailed description of the service you provide',
    icon: 'smartphone',  // Lucide icon name
  },
  // Add more services...
];
```

**Popular Lucide Icons:**
- `smartphone` - Mobile apps
- `code` - Development
- `palette` - Design
- `globe` - Web development
- `database` - Backend
- `cloud` - Cloud services

Browse all icons: [lucide.dev/icons](https://lucide.dev/icons)

### Testimonials

**File:** `/src/constants/index.ts`

```typescript
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Client Name',
    role: 'Their Job Title',
    company: 'Company Name',
    content: 'The testimonial text goes here...',
  },
  // Add more testimonials...
];
```

### Statistics

**File:** `/src/app/sections/AboutSection.tsx`

Update the stats section:

```typescript
<div className="text-3xl font-bold...">
  50+    {/* Change number */}
</div>
<div className="text-sm...">
  Projects    {/* Change label */}
</div>
```

---

## 3. Styling & Theme

### Color Scheme

**File:** `/src/styles/theme.css`

#### Primary Gradient Colors

Find and replace gradient colors:

```css
/* Current gradient: blue to purple */
from-blue-600 to-purple-600

/* Change to your gradient */
from-pink-600 to-orange-600    /* Pink to orange */
from-green-600 to-teal-600     /* Green to teal */
from-indigo-600 to-blue-600    /* Indigo to blue */
```

#### Brand Colors

Update in `theme.css`:

```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
}
```

### Typography

**Font Family**

**File:** `/src/styles/fonts.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
  font-family: 'Your Font', sans-serif;
}
```

**Font Sizes**

**File:** `/src/styles/theme.css`

```css
:root {
  --font-size: 16px;  /* Base font size */
}
```

### Spacing & Layout

**Container Width**

Update in section components:

```tsx
<div className="max-w-7xl mx-auto">  {/* Change max-w-* */}
```

Common sizes:
- `max-w-4xl` - Narrow (896px)
- `max-w-6xl` - Medium (1152px)
- `max-w-7xl` - Wide (1280px) - Current
- `max-w-full` - Full width

**Section Padding**

**File:** `/src/app/components/Section.tsx`

```tsx
<section className="py-20 px-4">  {/* Adjust py-* and px-* */}
```

### Border Radius

**File:** `/src/styles/theme.css`

```css
:root {
  --radius: 0.625rem;  /* Adjust roundness */
}
```

Values:
- `0rem` - Square corners
- `0.375rem` - Slightly rounded
- `0.625rem` - Medium (current)
- `1rem` - Very rounded

---

## 4. Layout Changes

### Hero Section Customization

**File:** `/src/app/sections/HeroSection.tsx`

#### Change Background

```tsx
{/* Current: Gradient background */}
className="bg-gradient-to-br from-blue-50 via-white to-purple-50"

{/* Solid color */}
className="bg-gray-50"

{/* Dark gradient */}
className="bg-gradient-to-br from-gray-900 to-gray-800"
```

#### Add Profile Image

Replace the placeholder in AboutSection:

```tsx
{/* Replace this: */}
<div className="text-white text-9xl font-bold opacity-20">
  {PERSONAL_INFO.name.split(' ').map(n => n[0]).join('')}
</div>

{/* With this: */}
<img 
  src="/path-to-your-image.jpg" 
  alt={PERSONAL_INFO.name}
  className="w-full h-full object-cover"
/>
```

### Reorder Sections

**File:** `/src/app/App.tsx`

Change the order of sections in the main component:

```tsx
<main>
  <HeroSection />
  <AboutSection />
  <SkillsSection />
  {/* Reorder these as needed */}
  <ProjectsSection />
  <ServicesSection />
  <TestimonialsSection />
  <ContactSection />
</main>
```

### Remove Sections

Simply comment out or delete unwanted sections:

```tsx
{/* <TestimonialsSection /> */}  {/* Hidden */}
```

---

## 5. Adding New Sections

### Create New Section

1. **Create file:** `/src/app/sections/BlogSection.tsx`

```tsx
import { Section } from '../components/Section';

export function BlogSection() {
  return (
    <Section
      id="blog"
      title="Latest Blog Posts"
      subtitle="Thoughts on development and technology"
      variant="default"
    >
      {/* Your content here */}
    </Section>
  );
}
```

2. **Add to App.tsx:**

```tsx
import { BlogSection } from './sections/BlogSection';

// In main:
<BlogSection />
```

3. **Add to navigation:**

**File:** `/src/app/components/Header.tsx`

```tsx
const navItems = [
  // existing items...
  { label: 'Blog', href: 'blog' },
];
```

---

## 6. Performance Optimization

### Image Optimization

**Use Optimized URLs:**

```typescript
// Unsplash with specific dimensions
imageUrl: 'https://images.unsplash.com/photo-xxx?w=800&h=600&q=80&fit=crop'
```

Parameters:
- `w=800` - Width
- `h=600` - Height
- `q=80` - Quality (60-90 recommended)
- `fit=crop` - Crop to fit

### Lazy Loading

Images already use lazy loading:

```tsx
<img loading="lazy" />  // Already implemented
```

### Animation Performance

**Reduce animations:**

**File:** `/src/constants/index.ts`

```typescript
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    transition: { 
      duration: 0.3,  // Reduce from 0.6
    },
  },
};
```

### Code Splitting

Already optimized with:
- Vite's automatic code splitting
- Dynamic imports (if needed)

---

## 7. Advanced Customizations

### Custom Animations

**Create custom animation variant:**

```tsx
// In your component
const customVariant = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

<motion.div
  initial={customVariant.initial}
  animate={customVariant.animate}
  transition={customVariant.transition}
>
  Content
</motion.div>
```

### Custom Icons

**Add your own SVG icons:**

```tsx
const CustomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    {/* Your SVG path */}
  </svg>
);
```

### Multiple Color Themes

Extend dark mode to multiple themes:

**File:** `/src/contexts/ThemeContext.tsx`

```typescript
type Theme = 'light' | 'dark' | 'ocean' | 'sunset';

// Add CSS for new themes in theme.css
```

---

## 8. Quick Customization Checklist

Before launch, ensure you've updated:

- [ ] Name and tagline in PERSONAL_INFO
- [ ] Email and phone numbers
- [ ] Social media links (GitHub, LinkedIn, etc.)
- [ ] About section text
- [ ] Skills list (add your skills)
- [ ] Services offered
- [ ] Resume PDF uploaded
- [ ] Project images (via Google Sheets)
- [ ] Testimonials (if applicable)
- [ ] WhatsApp number for contact
- [ ] Color scheme (optional)
- [ ] Fonts (optional)
- [ ] Meta tags for SEO

---

## 9. Style Presets

### Preset 1: Minimal Blue

```typescript
// Gradient colors
from-blue-500 to-blue-700

// Theme
--primary: #3B82F6;
```

### Preset 2: Bold Purple

```typescript
// Gradient colors
from-purple-500 to-pink-600

// Theme
--primary: #A855F7;
```

### Preset 3: Professional Dark

```typescript
// Gradient colors
from-gray-700 to-gray-900

// Theme
--primary: #374151;
```

### Preset 4: Vibrant Orange

```typescript
// Gradient colors
from-orange-500 to-red-600

// Theme
--primary: #F97316;
```

---

## 10. Testing Your Changes

After customization:

1. **Visual Check**
   - Test on desktop (1920px, 1366px)
   - Test on tablet (768px)
   - Test on mobile (375px, 414px)

2. **Functionality**
   - Navigation works
   - Smooth scrolling
   - Dark mode toggle
   - Contact form validation
   - External links open in new tab

3. **Performance**
   - Check PageSpeed Insights
   - Test on slow 3G connection
   - Monitor animation performance

4. **Browser Testing**
   - Chrome
   - Firefox
   - Safari
   - Edge

---

## 📞 Need Help?

- Check the main README.md
- Review component documentation
- Look at existing examples in code
- Search for similar implementations

Happy customizing! 🎨
