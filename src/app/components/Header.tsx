import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { scrollToSection } from '../../utils/helpers';

const navItems = [
  { label: 'Home', href: 'home' },
  { label: 'Services', href: 'services' },
  { label: 'Case Studies', href: 'projects' },
  { label: 'About', href: 'about' },
  { label: 'Proposal', href: 'proposal' },
  { label: 'Testimonials', href: 'testimonials' },
  { label: 'Contact', href: 'contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href);
    const observers: IntersectionObserver[] = [];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setActiveSection(href);
    setIsOpen(false);
  };

  const headerSolid = isScrolled || isOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          headerSolid
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/60 dark:border-gray-700/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-1 group"
              >
                <span className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  diginexo
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-gray-400 dark:text-gray-500 group-hover:text-cyan-500 transition-colors duration-200">
                  .in
                </span>
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 group"
                  >
                    <span
                      className={`transition-colors duration-200 ${
                        isActive
                          ? 'text-cyan-500 dark:text-cyan-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {item.label}
                    </span>
                    {/* Animated underline indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full w-9 h-9 sm:w-10 sm:h-10"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </Button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-down Menu Panel */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-16 sm:top-20 left-0 right-0 z-40 lg:hidden mx-3 sm:mx-4 rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60 dark:border-gray-700/60 bg-white dark:bg-gray-900"
            >
              {/* Brand row */}
              <div className="px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow">
                    <span className="text-white text-xs font-extrabold">D</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">diginexo.in</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Mobile, Web & Design Solutions</p>
                  </div>
                </div>
              </div>

              {/* Nav links */}
              <div className="p-3">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href;
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 text-left font-medium ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-500/15 dark:to-blue-500/15 text-cyan-600 dark:text-cyan-400'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-500/10 dark:hover:to-blue-500/10 hover:text-cyan-600 dark:hover:text-cyan-400'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-br from-cyan-400 to-blue-500 scale-125'
                            : 'bg-gradient-to-br from-cyan-400 to-blue-500'
                        }`}
                      />
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="mobile-nav-indicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* CTA strip */}
              <div className="px-4 pb-4 pt-1">
                <button
                  onClick={() => handleNavClick('proposal')}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:opacity-90 transition-opacity"
                >
                  Start Your Project →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}