import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, Zap, CheckCircle, Smartphone, Globe, Palette, Code2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { PERSONAL_INFO } from '../../constants';
import { scrollToSection } from '../../utils/helpers';
import { AnimatedBackground } from '../components/AnimatedBackground';

const serviceTags = [
  { icon: Smartphone, label: 'Android Development' },
  { icon: Code2, label: 'Flutter Apps' },
  { icon: Globe, label: 'Web Development' },
  { icon: Palette, label: 'UI/UX Design' },
];

const stats = [
  { number: '10+', label: 'Solutions Delivered' },
  { number: '2+', label: 'Years Experience' },
  { number: '100%', label: 'Client Satisfaction' },
];

const badgeItems = [
  { icon: CheckCircle, text: 'Available for Projects' },
  { icon: Zap, text: 'Fast Delivery' },
  { icon: CheckCircle, text: 'Affordable Pricing' },
];

export function HeroSection() {
  const whatsappUrl = `https://wa.me/${PERSONAL_INFO.whatsapp}?text=Hi%20Gourav%2C%20I%27d%20like%20to%20start%20a%20project%20with%20you!`;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Animated Background ── */}
      <AnimatedBackground />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 md:py-36 text-center">

        {/* 1. TOP BADGE ROW */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-7 sm:mb-8"
        >
          {badgeItems.map((item, i) => (
            <div
              key={item.text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-full shadow-sm dark:shadow-cyan-500/10 border border-gray-200/60 dark:border-cyan-500/20"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              >
                <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 dark:text-green-400 fill-green-500/20" />
              </motion.div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* 2. MAIN HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-5 sm:mb-6 leading-[1.1] tracking-tight"
        >
          <span className="text-gray-900 dark:text-gray-50">Build </span>
          <motion.span
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Scalable Apps
          </motion.span>
          <span className="text-gray-900 dark:text-gray-50"> &amp; Smart</span>
          <br />
          <span className="text-gray-900 dark:text-gray-50">Digital Solutions </span>
          <span className="relative inline-block">
            <span className="text-gray-900 dark:text-gray-50">for Your </span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Business
            </span>
            {/* Underline accent */}
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              style={{ originX: 0 }}
            />
          </span>
        </motion.h1>

        {/* 3. SUB-HEADLINE */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl sm:max-w-2xl mx-auto mb-3 sm:mb-4 leading-relaxed px-2 sm:px-0"
        >
          We design and develop mobile apps, web platforms, and UI/UX solutions that help
          businesses{' '}
          <span className="font-semibold text-gray-800 dark:text-gray-100">automate processes</span>,{' '}
          <span className="font-semibold text-gray-800 dark:text-gray-100">improve user experience</span>, and{' '}
          <span className="font-semibold text-gray-800 dark:text-gray-100">scale efficiently</span>.
        </motion.p>

        {/* 4. AUDIENCE LINE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-xs sm:text-sm md:text-base text-cyan-600 dark:text-cyan-400 font-medium mb-8 sm:mb-10 px-2 sm:px-0"
        >
          🚀 Helping startups, small businesses &amp; founders turn ideas into real products.
        </motion.p>

        {/* 5. SERVICE TAGS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10"
        >
          {serviceTags.map((tag, i) => (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.07 }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 rounded-full text-xs sm:text-sm text-gray-700 dark:text-gray-300 shadow-sm cursor-default transition-all duration-200"
            >
              <tag.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-500 dark:text-cyan-400" />
              {tag.label}
            </motion.span>
          ))}
        </motion.div>

        {/* 6. CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4 sm:px-0"
        >
          {/* Primary */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white w-full sm:w-auto px-8 py-6 shadow-xl shadow-cyan-500/30 dark:shadow-cyan-500/20 group"
              onClick={() => scrollToSection('proposal')}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>

          {/* Secondary */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 border-2 border-green-400 dark:border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 hover:border-green-500 dark:hover:border-green-400 gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <MessageCircle className="w-5 h-5 fill-green-500/20" />
                </motion.div>
                Chat on WhatsApp
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* 7. TRUST METRICS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 + index * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="text-center group cursor-default"
            >
              <div className="relative">
                <motion.div
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                >
                  {stat.number}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-1.5 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-xs text-gray-400 dark:text-gray-600 tracking-widest uppercase hidden sm:block">
          Scroll
        </span>
        <div className="w-5 h-9 border-2 border-gray-300 dark:border-gray-700 rounded-full flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}