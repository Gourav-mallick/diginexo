import { motion } from 'motion/react';
import { Smartphone, Globe, Palette, Settings, BarChart3, RefreshCw, ArrowRight, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import { scrollToSection } from '../../utils/helpers';

const capabilities = [
  {
    icon: Smartphone,
    emoji: '📱',
    title: 'Mobile App Development',
    description:
      'Build high-performance Android and cross-platform apps for your business — from idea to Play Store.',
    tags: ['Android (Kotlin)', 'Flutter', 'React Native'],
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/25',
    hover: 'hover:border-cyan-400/60 dark:hover:border-cyan-500/40',
  },
  {
    icon: Globe,
    emoji: '🌐',
    title: 'Web Application Development',
    description:
      'Create fast, scalable, and responsive web platforms, portals, and dashboards that work across all devices.',
    tags: ['React', 'Angular', 'TypeScript', 'Node.js'],
    gradient: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/25',
    hover: 'hover:border-blue-400/60 dark:hover:border-blue-500/40',
  },
  {
    icon: Palette,
    emoji: '🎨',
    title: 'UI/UX Design',
    description:
      'Design modern, user-friendly interfaces focused on engagement, usability, and conversion for your product.',
    tags: ['Figma', 'Material Design', 'Prototyping'],
    gradient: 'from-purple-500 to-pink-600',
    glow: 'shadow-purple-500/25',
    hover: 'hover:border-purple-400/60 dark:hover:border-purple-500/40',
  },
  {
    icon: Settings,
    emoji: '⚙️',
    title: 'Custom Software Solutions',
    description:
      'Develop tailored solutions to automate business processes, reduce manual work, and improve efficiency.',
    tags: ['REST APIs', 'Firebase', 'Automation'],
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/25',
    hover: 'hover:border-emerald-400/60 dark:hover:border-emerald-500/40',
  },
  {
    icon: BarChart3,
    emoji: '📊',
    title: 'Dashboard & Data Systems',
    description:
      'Build analytics dashboards with real-time data, interactive charts, KPIs, and comprehensive reporting tools.',
    tags: ['Recharts', 'Data Viz', 'Google Sheets CMS'],
    gradient: 'from-orange-500 to-amber-500',
    glow: 'shadow-orange-500/25',
    hover: 'hover:border-orange-400/60 dark:hover:border-orange-500/40',
  },
  {
    icon: RefreshCw,
    emoji: '🔄',
    title: 'App Maintenance & Optimization',
    description:
      'Improve performance, resolve issues, add features, and scale your existing applications reliably.',
    tags: ['Performance', 'Bug Fixing', 'Scaling'],
    gradient: 'from-rose-500 to-red-600',
    glow: 'shadow-rose-500/25',
    hover: 'hover:border-rose-400/60 dark:hover:border-rose-500/40',
  },
];

const techStack = [
  'Kotlin', 'Flutter', 'React', 'Angular', 'TypeScript',
  'Firebase', 'REST APIs', 'Figma', 'Node.js', 'Dart',
];

export function SkillsSection() {
  const whatsappUrl = `https://wa.me/${PERSONAL_INFO.whatsapp}?text=Hi%20Gourav%2C%20I%20have%20a%20specific%20requirement%20and%20would%20like%20to%20discuss%20a%20solution!`;

  return (
    <section
      id="skills"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-full mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400 tracking-wide uppercase">
              Our Capabilities
            </span>
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-4 tracking-tight">
            What We Can{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Build For You
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We provide end-to-end development solutions tailored to your business needs.
          </p>
        </motion.div>

        {/* ── Capabilities Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative bg-white dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/50 ${cap.hover} rounded-2xl p-6 shadow-sm hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 cursor-default overflow-hidden`}
            >
              {/* Subtle gradient hover bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl`} />

              {/* Icon */}
              <div className={`relative w-14 h-14 bg-gradient-to-br ${cap.gradient} rounded-2xl flex items-center justify-center shadow-lg ${cap.glow} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <cap.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-2 group-hover:text-gray-800 dark:group-hover:text-white transition-colors">
                {cap.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                {cap.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow accent */}
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <ArrowRight className={`w-4 h-4 bg-gradient-to-r ${cap.gradient} bg-clip-text text-transparent`} style={{ color: 'transparent', stroke: 'url(#grad)' }} />
                <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Technologies Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-14"
        >
          <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
            Technologies We Use
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm font-medium transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Conversion CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
          {/* Animated shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
          />
          {/* Glow blobs */}
          <div className="absolute top-0 left-1/4 w-64 h-20 bg-cyan-500/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-20 bg-purple-500/20 rounded-full blur-2xl" />

          <div className="relative px-8 py-12 text-center">
            <motion.p
              className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Have a Specific Requirement?
            </motion.p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Let's Build a Solution Tailored to{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Your Business
              </span>
            </h3>
            <p className="text-gray-400 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
              Tell us your idea or problem — we'll design, develop, and deliver a solution that fits your goals and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('proposal')}
                className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/30 font-semibold transition-all duration-200"
              >
                Start Project
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 bg-transparent border-2 border-green-400/60 hover:border-green-400 text-green-400 hover:text-green-300 rounded-xl font-semibold transition-all duration-200"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle className="w-4 h-4" />
                </motion.div>
                Chat on WhatsApp
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
