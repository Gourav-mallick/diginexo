import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, Code2, DollarSign, Award, Users, Zap } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import profileImage from '../../assets/gourav.png';
import { AboutSectionBackground } from '../components/SectionBackground';

const strengths = [
  {
    icon: CheckCircle2,
    title: 'Requirement-Based Development',
    description: 'Every solution is tailored to your specific business needs — no generic templates.',
    color: 'from-cyan-500 to-cyan-600',
    glow: 'shadow-cyan-500/20',
    ring: 'ring-cyan-500/30',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Architecture',
    description: 'Built to grow with your business — clean MVVM, modular, and future-proof.',
    color: 'from-blue-500 to-blue-600',
    glow: 'shadow-blue-500/20',
    ring: 'ring-blue-500/30',
  },
  {
    icon: Code2,
    title: 'Clean & Maintainable Code',
    description: 'Ensures long-term reliability, easy updates, and minimal technical debt.',
    color: 'from-indigo-500 to-purple-600',
    glow: 'shadow-indigo-500/20',
    ring: 'ring-indigo-500/30',
  },
  {
    icon: DollarSign,
    title: 'Cost-Effective Solutions',
    description: 'High-quality output at competitive pricing — maximum value for your investment.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
    ring: 'ring-emerald-500/30',
  },
];

const stats = [
  { icon: Award, value: '10+', label: 'Solutions Delivered' },
  { icon: Zap, value: '2+', label: 'Years Experience' },
  { icon: Users, value: '100%', label: 'Client Satisfaction' },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* Animated background */}
      <AboutSectionBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* Top badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 rounded-full mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-400 tracking-wide uppercase">
              Who We Are
            </span>
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-4 tracking-tight">
            About{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Diginexo
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Building scalable digital solutions for modern businesses
          </p>
        </motion.div>

        {/* ── Main Two-Column Layout ── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">

          {/* Left: Brand Story — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Description block */}
            <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900 dark:to-gray-800/60 border border-gray-200/80 dark:border-gray-700/50 shadow-sm">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                <span className="font-bold text-gray-900 dark:text-white">Diginexo</span> is a digital development
                service focused on building high-quality mobile apps, web platforms, and user-centric designs.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                We work as a dedicated team of developers and designers to transform ideas into scalable solutions
                that solve real-world business problems and improve operational efficiency.
              </p>
              <div className="flex items-start gap-3 p-4 bg-cyan-50 dark:bg-cyan-500/10 rounded-2xl border border-cyan-100 dark:border-cyan-500/20">
                <span className="text-cyan-500 dark:text-cyan-400 mt-0.5 flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </span>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">Our approach is simple:</span>{' '}
                  understand the requirement, design the right solution, and deliver with performance,
                  scalability, and clean architecture in mind.
                </p>
              </div>
            </div>

            {/* Core Strengths */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full" />
                Core Strengths
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {strengths.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="group flex gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/50 hover:border-cyan-300 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-md dark:hover:shadow-lg"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-11 h-11 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg ${item.glow} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Photo + Founder Card — takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Founder Photo — small circle */}
            <div className="relative flex justify-center">
              {/* Animated glow ring */}
              <motion.div
                className="absolute w-44 h-44 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full opacity-30 dark:opacity-20 blur-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              />
              {/* Decorative pulsing ring */}
              <motion.div
                className="absolute w-40 h-40 rounded-full border-2 border-cyan-400/40 dark:border-cyan-500/30"
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Circle image */}
              <motion.div
                className="relative w-36 h-36 rounded-full overflow-hidden shadow-2xl dark:shadow-cyan-500/20 ring-4 ring-white dark:ring-gray-800 z-10"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={profileImage}
                  alt="Gourav Chandra Mallick — Founder, Diginexo"
                  className="w-full h-full object-cover object-top"
                  initial={{ scale: 1.12, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              {/* Available badge */}
              <motion.a
                href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=Hi%20Gourav%2C%20I%20saw%20your%20portfolio%20and%20I%27m%20interested%20in%20working%20with%20you!`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-0 right-1/2 translate-x-16 flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-green-400 dark:border-green-500 cursor-pointer z-20"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                animate={{ y: [0, -6, 0] }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-gray-800 dark:text-gray-100">Available</span>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">· Chat</span>
              </motion.a>
            </div>

            {/* Founder Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 border border-gray-700/60 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-black">G</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">Founded by Gourav Chandra Mallick</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Leading a small team of developers specializing in{' '}
                <span className="text-cyan-400 font-medium">Android</span>,{' '}
                <span className="text-blue-400 font-medium">Flutter</span>,{' '}
                <span className="text-purple-400 font-medium">Web</span>, and{' '}
                <span className="text-pink-400 font-medium">UI/UX</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Android', 'Flutter', 'React', 'TypeScript', 'Figma'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-700/80 text-gray-300 rounded-md text-[11px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-90 dark:opacity-80" />
          {/* Animated shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />

          <div className="relative grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
                whileHover={{ scale: 1.04 }}
                className="flex flex-col items-center justify-center gap-2 py-6 sm:py-8 px-6 cursor-default"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-1">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <motion.span
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-xs sm:text-sm font-medium text-white/80 tracking-wide text-center">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}