import { useEffect } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WaterDrops } from './components/WaterDrops';
import { Sprinkles } from './components/Sprinkles';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectProposalSection } from './sections/ProjectProposalSection';
import { FloatingProposalButton } from './components/FloatingProposalButton';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { ContactSection } from './sections/ContactSection';

export default function App() {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 relative overflow-hidden">
        {/* Background Animations */}
        <WaterDrops />
        <Sprinkles />

        {/* Header/Navigation */}
        <Header />

        {/* Main Content */}
        <main className="relative z-10">
          <HeroSection />
          <ServicesSection />
          <ProjectsSection />
          <AboutSection />
          <ProjectProposalSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Proposal Button */}
        <FloatingProposalButton />

        {/* Toast Notifications */}
        <Toaster 
          position="bottom-right"
          richColors
          closeButton
        />
      </div>
    </ThemeProvider>
  );
}