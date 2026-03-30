import { Skill, Service, Testimonial, Project } from '../types';

// Personal Information
export const PERSONAL_INFO = {
  name: 'Gourav Chandra Mallick',
  tagline: 'Android | Flutter | Web | UI/UX Developer',
  title: 'Full-Stack Mobile & Web Developer',
  email: 'officialdiginexo@gmail.com',
  phone: '+91-6207331469',
  whatsapp: '+916207331469',
  location: 'India',
  resumeUrl: '/resume.pdf',
  social: {
    github: 'https://github.com/Gourav-mallick',
    linkedin: 'https://www.linkedin.com/in/gouravmallick20/',
    instagram: 'https://www.instagram.com/gourav_mallick20',
  },
};

// About Section
export const ABOUT_TEXT = `
I'm a passionate Full-Stack Developer specializing in building scalable mobile and web applications. 
With expertise in Android (Kotlin, Jetpack Compose), Flutter, and modern web technologies, I create 
high-performance applications following clean architecture principles. My focus is on delivering 
user-centric solutions that combine elegant design with robust functionality.
`;

// Skills Data
export const SKILLS: Skill[] = [
  // Android
  { name: 'Kotlin', level: 95, category: 'Android' },
  { name: 'Java', level: 90, category: 'Android' },
  { name: 'Jetpack Compose', level: 88, category: 'Android' },
  { name: 'Android SDK', level: 92, category: 'Android' },
  { name: 'Room Database', level: 85, category: 'Android' },
  { name: 'Retrofit', level: 90, category: 'Android' },
  
  // Web
  { name: 'React', level: 88, category: 'Web' },
  { name: 'Angular', level: 85, category: 'Web' },
  { name: 'TypeScript', level: 90, category: 'Web' },
  { name: 'JavaScript', level: 92, category: 'Web' },
  { name: 'Node.js', level: 80, category: 'Web' },
  { name: 'Tailwind CSS', level: 90, category: 'Web' },
  
  // Cross-platform
  { name: 'Flutter', level: 90, category: 'Cross-platform' },
  { name: 'React Native', level: 82, category: 'Cross-platform' },
  { name: 'Dart', level: 88, category: 'Cross-platform' },
  
  // UI/UX
  { name: 'Figma', level: 85, category: 'UIUX' },
  { name: 'Material Design', level: 92, category: 'UIUX' },
  { name: 'XML Layouts', level: 90, category: 'UIUX' },
  { name: 'UI/UX Principles', level: 88, category: 'UIUX' },
];

// Services Data
export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Android App Development',
    description: 'Building native Android applications using Kotlin, Java, and Jetpack Compose with clean architecture and MVVM pattern.',
    icon: 'smartphone',
  },
  {
    id: '2',
    title: 'Cross-platform Apps',
    description: 'Developing beautiful cross-platform applications using Flutter and React Native for iOS and Android with single codebase.',
    icon: 'tablet-smartphone',
  },
  {
    id: '3',
    title: 'Web Development',
    description: 'Creating modern, responsive web applications using React, Angular, and Next.js with focus on performance and scalability.',
    icon: 'globe',
  },
  {
    id: '4',
    title: 'UI/UX Design',
    description: 'Designing user-friendly interfaces with Figma, ensuring seamless user experience and pixel-perfect implementation.',
    icon: 'palette',
  },
];

// Testimonials Data
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'DigiEdu IT Solution',
    role: 'Director',
    company: 'DigiEdu IT Solution Pvt. Ltd.',
    content: 'The Diginexo team built our ed-tech platform with outstanding Android expertise and a deep commitment to clean architecture. The product launch was smooth, on time, and exceeded our expectations. Highly reliable — a team you can truly trust.',
  },
  {
    id: '2',
    name: 'Hridhanshu',
    role: 'Founder',
    company: 'ScaleOne Startup',
    content: 'Working with Diginexo on ScaleOne was a game-changer. They understood our vision from day one and built a cross-platform app our users genuinely love. Communication was clear, delivery was fast, and the quality spoke for itself — we\'ll absolutely work together again!',
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Tech Lead',
    company: 'USA (Dynamic Dashboard Client)',
    content: 'Diginexo delivered an incredibly flexible config-driven dashboard for our analytics team. The architecture they designed saves us weeks of development time per client. Top-notch TypeScript and React skills — a professional team that truly delivers.',
  },
];

// Mock Projects Data (fallback when Google Sheets is not available)
export const MOCK_PROJECTS: Project[] = [
  // ── Android ──────────────────────────────────────────────
  {
    id: '1',
    projectName: 'Smart Attendance & Access Solution',
    category: 'Android',
    techStack: 'Kotlin, Android NFC API, Room Database, MVVM, Jetpack Compose',
    description: 'NFC-based tap-in/out attendance and access control system for offices and schools.',
    longDescription: `A fully-featured office/school attendance and access control system powered by NFC technology. Employees or students simply tap their NFC card to check in or out. The admin dashboard provides real-time visibility into who is present, late reports, and auto-generated attendance sheets. Designed with offline-first architecture using Room Database so it works without internet.`,
    problem: 'Manual attendance tracking caused frequent errors, time theft, and hours of administrative work every week.',
    solution: 'Built an NFC card-based tap-in/out system with a real-time admin dashboard, automated report generation, and offline-first architecture.',
    impact: [
      '80% faster attendance process',
      'Eliminated manual errors and time theft',
      'Auto-generated daily/monthly reports (PDF/CSV)',
      'Works fully offline — no internet required',
    ],
    highlights: [
      'NFC card read & write for instant check-in/out',
      'Real-time attendance dashboard for admins',
      'Auto-generate daily/monthly attendance reports (PDF/CSV)',
      'Multi-role support: Admin, Employee, Guard',
      'Offline-first with Room DB sync',
      'Push notifications for late arrivals',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1754494977432-425fb917df70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxORkMlMjBjYXJkJTIwYWNjZXNzJTIwY29udHJvbCUyMHN5c3RlbXxlbnwxfHx8fDE3NzQ3OTMxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    githubLink: 'https://github.com/Gourav-mallick',
    status: 'Completed',
    featured: true,
  },
  {
    id: '2',
    projectName: 'AI-Based Contactless Attendance System',
    category: 'Android',
    techStack: 'Kotlin, TensorFlow Lite, ML Kit, CameraX, Room DB, Firebase',
    description: 'Automated attendance using on-device AI facial recognition — no card, no tap required.',
    longDescription: `A next-generation attendance solution that uses your phone's camera and on-device AI to automatically identify and mark attendance for registered users. Built with TensorFlow Lite and Google ML Kit for fast, accurate, privacy-preserving face recognition that works entirely on-device — no cloud processing needed.`,
    problem: 'Card-based and biometric systems required physical contact, causing hygiene concerns and buddy-punching fraud.',
    solution: 'Developed an on-device AI face recognition system that automatically identifies and marks attendance when a user is detected — contactless and fraud-proof.',
    impact: [
      'Zero physical contact — fully touchless',
      'Eliminated buddy-punching fraud completely',
      'Attendance marked in under 2 seconds',
      'Works offline — no cloud dependency',
    ],
    highlights: [
      'On-device face detection & recognition (TensorFlow Lite)',
      'Anti-spoofing — rejects photos or masks',
      'Auto-marks attendance when face is detected',
      'Enroll new members in under 30 seconds',
      'Export attendance reports to CSV / Excel',
      'Firebase sync for multi-device admin access',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1760893107446-58b108d419d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwcmVjb2duaXRpb24lMjBBSSUyMGF0dGVuZGFuY2UlMjBiaW9tZXRyaWN8ZW58MXx8fHwxNzc0NzkzMTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    githubLink: 'https://github.com/Gourav-mallick',
    status: 'Completed',
    featured: true,
  },
  {
    id: '3',
    projectName: 'Document Automation & PDF Management Tool',
    category: 'Android',
    techStack: 'Kotlin, Jetpack Compose, iText PDF, File Storage API, Material 3',
    description: 'All-in-one PDF utility: merge, split, compress, annotate, and convert — on your phone.',
    longDescription: `PDFCraft is the Swiss Army knife for PDFs on Android. Whether you need to merge multiple documents for a presentation, compress a file to email, convert photos to PDF, or lock a document with a password — PDFCraft handles it all with a clean Jetpack Compose UI.`,
    problem: 'Professionals and students needed multiple separate apps for basic PDF tasks, costing time and storage on mobile devices.',
    solution: 'Built a single all-in-one PDF management app covering merging, splitting, compression, annotation, and conversion with an intuitive Jetpack Compose interface.',
    impact: [
      'Replaced 5+ separate apps with one solution',
      'Up to 80% file size reduction with compression',
      'Saves 30+ minutes per document workflow',
      'Works entirely offline — no uploads needed',
    ],
    highlights: [
      'Merge multiple PDFs into one with reorder drag & drop',
      'Split PDF by page range or extract individual pages',
      'Compress PDF to reduce file size (up to 80%)',
      'Images → PDF with custom layout and orientation',
      'Annotate: highlight, draw, add text stamps',
      'Password-protect and unlock PDFs',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1663124178703-d2d6a333e6c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQREYlMjBkb2N1bWVudCUyMGVkaXRvciUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NzQ3OTMxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    githubLink: 'https://github.com/Gourav-mallick',
    status: 'Completed',
    featured: true,
  },
  {
    id: '4',
    projectName: 'Location-Based Social Connectivity Platform',
    category: 'Android',
    techStack: 'Kotlin, Firebase Realtime DB, Google Maps SDK, Geofencing API, Jetpack Compose',
    description: 'Discover and connect with people physically near you — on a live map in real time.',
    longDescription: `GeoChat reimagines social connection through location. Open the app and see live pins of other users on a map within your chosen radius. Tap any pin to start a real-time chat — anonymously or with your profile. All chats expire when both users leave the proximity zone, keeping things ephemeral and private.`,
    problem: 'Event organizers and community spaces lacked a way to help people connect with others nearby without sharing personal contact details.',
    solution: 'Built a proximity-based social platform using Google Maps and Firebase that lets users discover and chat with nearby people within a configurable radius, with auto-expiring conversations.',
    impact: [
      'Real-time discovery within 100m–5km radius',
      'Anonymous mode protects user privacy',
      'Chats auto-expire for data safety',
      'Ideal for events, campuses, co-working spaces',
    ],
    highlights: [
      'Live map with real-time user pins (Google Maps SDK)',
      'Configurable discovery radius: 100m to 5km',
      'Anonymous or profile-based messaging',
      'Chats auto-expire when users leave proximity',
      'Firebase real-time messaging with read receipts',
      'Privacy-first: share only approximate location',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586449480584-34302e933441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhdGlvbiUyMG1hcCUyMGNoYXQlMjBuZWFyYnklMjBwZW9wbGUlMjBjb25uZWN0fGVufDF8fHx8MTc3NDc5MzE2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    githubLink: 'https://github.com/Gourav-mallick',
    status: 'Completed',
    featured: true,
  },

  // ── UI / UX ───────────────────────────────────────────────
  {
    id: '5',
    projectName: 'Agri Management App UI/UX Solution',
    category: 'UIUX',
    techStack: 'Figma, Material Design 3, Android UI Guidelines, Prototyping',
    description: 'End-to-end UI/UX design for an Android agriculture app empowering Indian farmers.',
    longDescription: `A complete design system and UI/UX solution for "My Farm" — an Android app built to empower Indian farmers with digital tools. The project covers 30+ screens including crop lifecycle management, real-time mandi prices, weather forecasts, a community forum, and agronomist advisory access.`,
    problem: 'Existing agri apps were too complex for rural farmers with low digital literacy, causing poor adoption and user drop-off.',
    solution: 'Designed a 30+ screen UI/UX system focused on simplicity, regional language support, and low-connectivity environments with an accessible Material Design 3 system.',
    impact: [
      'Accessible design for low-literacy users',
      '30+ screens with consistent design system',
      'Supports regional languages and dark mode',
      'Interactive prototype with micro-animations',
    ],
    highlights: [
      '30+ hand-crafted screens with consistent design system',
      'Crop management: planting calendar, growth tracking',
      'Real-time mandi market price feed UI',
      'Weather forecast integration with local alerts',
      'Dark mode & light mode with accessibility audit',
      'Interactive Figma prototype with micro-animations',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1736875343041-b1d406cb13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYWdyaWN1bHR1cmUlMjBtb2JpbGUlMjBhcHAlMjBncmVlbnxlbnwxfHx8fDE3NzQ3OTMxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    behanceLink: 'https://www.behance.net/gallery/186106339/My-FarmThe-Androide-Application',
    status: 'Completed',
    featured: true,
  },

  // ── Web ───────────────────────────────────────────────────
  {
    id: '6',
    projectName: 'Dynamic Business Analytics Dashboard',
    category: 'Web',
    techStack: 'React, TypeScript, Recharts, Tailwind CSS, JSON Config, React DnD',
    description: 'Config-driven dashboard generator — turn any data into charts, KPIs, and reports instantly.',
    longDescription: `A powerful developer/admin tool that turns a JSON config file and a data source into a fully functional, interactive dashboard. Select from 10+ chart types, KPI cards, data tables, and more. The drag-and-drop layout editor lets non-developers rearrange widgets. Supports live data refresh, dark mode, and one-click PDF/PNG export.`,
    problem: 'A US-based analytics team spent weeks of engineering time building custom dashboards for every new client — with no reusable system.',
    solution: 'Built a config-driven dashboard generator where any dashboard can be defined via JSON — supporting 10+ chart types, KPI cards, live data refresh, and drag-and-drop layout editing.',
    impact: [
      'Saved weeks of engineering time per client',
      'Non-developers can build dashboards independently',
      'Supports live data refresh and PDF/PNG export',
      'Deployed and used by US analytics team (diginexo.in)',
    ],
    highlights: [
      'Config-driven: define your entire dashboard in JSON',
      '10+ chart types powered by Recharts',
      'KPI cards, data tables, and gauge widgets',
      'Drag & drop widget layout editor (React DnD)',
      'Live data refresh with configurable intervals',
      'Export dashboard to PDF or PNG',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1758876202980-0a28b744fb24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBncmFwaHMlMjBjaGFydHMlMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NzQ3OTMxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    githubLink: 'https://github.com/Gourav-mallick',
    liveDemo: 'https://diginexo.in',
    status: 'Completed',
    featured: true,
  },
];

// API Configuration
export const API_CONFIG = {
  // Google Sheets API endpoint
  // Format: https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{RANGE}?key={API_KEY}
  GOOGLE_SHEETS_API_KEY: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '',
  GOOGLE_SHEETS_ID: import.meta.env.VITE_GOOGLE_SHEETS_ID || '',
  GOOGLE_SHEETS_RANGE: 'Projects!A2:I', // Starting from row 2 to skip headers
  
  // Alternative: SheetDB API (easier setup, no Google API key needed)
  // Format: https://sheetdb.io/api/v1/{SHEETDB_ID}
  SHEETDB_API_URL: import.meta.env.VITE_SHEETDB_API_URL || '',
};

// Animation variants
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};