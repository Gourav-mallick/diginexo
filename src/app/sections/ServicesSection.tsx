import { motion } from 'motion/react';
import {
  CheckCircle,
  DollarSign,
  RefreshCw,
  Globe,
  Smartphone,
  Palette,
  Layers,
  Settings,
  BarChart3,
  Wrench,
  ArrowRight,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import { scrollToSection } from '../../utils/helpers';
import { BuildProcess } from '../components/BuildProcess';
import { ServicesSectionBackground } from '../components/SectionBackground';

const valueProps = [
  {
    icon: CheckCircle,
    title: 'Client Satisfaction First',
    description:
      'We refine and improve the solution until it meets your expectations — your success is our priority, not just delivery.',
    color: 'from-green-400 to-emerald-500',
    bg: 'bg-green-50 dark:bg-green-900/10',
    border: 'border-green-200 dark:border-green-800/40',
    iconBg: 'shadow-green-500/20',
  },
  {
    icon: DollarSign,
    title: 'Cost-Effective Development',
    description:
      'High-quality solutions delivered at competitive pricing — ideal for startups and growing businesses with real budgets.',
    color: 'from-cyan-400 to-blue-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/10',
    border: 'border-cyan-200 dark:border-cyan-800/40',
    iconBg: 'shadow-cyan-500/20',
  },
  {
    icon: RefreshCw,
    title: 'Flexible Iterations',
    description:
      'We continuously improve the product based on your feedback until it aligns perfectly with your vision and goals.',
    color: 'from-purple-400 to-violet-500',
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    border: 'border-purple-200 dark:border-purple-800/40',
    iconBg: 'shadow-purple-500/20',
  },
];

const services = [
  {
    id: '1',
    icon: Smartphone,
    title: 'Mobile App Solutions',
    description:
      'Build high-performance native Android and cross-platform apps (Flutter/React Native) designed for real business workflows and user needs.',
    tags: ['Android', 'Flutter', 'React Native'],
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
    promise: 'Published to Play Store',
  },
  {
    id: '2',
    icon: Globe,
    title: 'Web Platform Development',
    description:
      'Create fast, scalable, and responsive web platforms, portals, and admin dashboards — from landing pages to full-stack applications.',
    tags: ['React', 'Angular', 'TypeScript'],
    gradient: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/20',
    promise: 'Responsive & SEO-ready',
  },
  {
    id: '3',
    icon: Palette,
    title: 'User Experience Design',
    description:
      'Design modern, user-friendly interfaces in Figma focused on engagement, usability, and conversion — with interactive prototypes.',
    tags: ['Figma', 'Material Design', 'Prototyping'],
    gradient: 'from-pink-500 to-rose-600',
    glow: 'shadow-pink-500/20',
    promise: '30+ screen design systems',
  },
  {
    id: '4',
    icon: Layers,
    title: 'Cross-Platform Development',
    description:
      'One codebase, two platforms. We build Flutter and React Native apps that run natively on both iOS and Android.',
    tags: ['Flutter', 'Dart', 'React Native'],
    gradient: 'from-sky-500 to-cyan-600',
    glow: 'shadow-sky-500/20',
    promise: 'iOS + Android from one codebase',
  },
  {
    id: '5',
    icon: Settings,
    title: 'Custom Software Solutions',
    description:
      'Develop tailored software to automate your business processes, reduce manual work, and improve operational efficiency.',
    tags: ['REST APIs', 'Firebase', 'Automation'],
    gradient: 'from-orange-500 to-amber-500',
    glow: 'shadow-orange-500/20',
    promise: 'Built for your workflow',
  },
  {
    id: '6',
    icon: BarChart3,
    title: 'Dashboard & Analytics Systems',
    description:
      'Build interactive analytics dashboards with real-time data, charts, KPI cards, and reporting tools for informed decisions.',
    tags: ['Recharts', 'Data Viz', 'Real-time'],
    gradient: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/20',
    promise: 'Live data & PDF export',
  },
  {
    id: '7',
    icon: Wrench,
    title: 'App Maintenance & Optimization',
    description:
      'Improve performance, resolve bugs, add features, and scale your existing applications reliably without rebuilding from scratch.',
    tags: ['Performance', 'Bug Fixing', 'Scaling'],
    gradient: 'from-red-500 to-rose-600',
    glow: 'shadow-red-500/20',
    promise: 'Ongoing support available',
  },
  {
    id: '8',
    icon: Zap,
    title: 'MVP / Rapid Prototyping',
    description:
      'Launch your product idea fast with a working MVP. Perfect for validating concepts before committing to full development.',
    tags: ['Fast Delivery', 'MVP', 'Validation'],
    gradient: 'from-yellow-500 to-orange-500',
    glow: 'shadow-yellow-500/20',
    promise: 'Ship in weeks, not months',
  },
];

const trustTags = ['✅ Satisfaction First', '💰 Competitive Pricing', '🔄 Free Revisions', '🚀 On-Time Delivery', '🔒 NDA Available'];

export function ServicesSection() {
  const whatsappUrl = `https://wa.me/${PERSONAL_INFO.whatsapp}?text=Hi%20Gourav%2C%20I%27d%20like%20to%20discuss%20a%20project%20and%20get%20a%20quote!`;

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* ── Animated Background ── */}
      <ServicesSectionBackground />

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
              What We Offer
            </span>
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-4 tracking-tight">
            Services Designed to Solve{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Your Business Needs
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
            We provide scalable, cost-effective development solutions tailored to your requirements — from idea to deployment.
          </p>
        </motion.div>

        {/* ── diginexo.in Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 dark:from-cyan-500/5 dark:via-blue-500/5 dark:to-purple-500/5 border border-cyan-200/60 dark:border-cyan-700/30 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Also available at</p>
                <a
                  href="https://diginexo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-cyan-600 dark:text-cyan-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  diginexo.in
                </a>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {trustTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/70 dark:bg-gray-800/70 rounded-full border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 text-xs font-medium backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('proposal')}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap text-sm font-semibold"
            >
              Get a Quote →
            </motion.button>
          </div>
        </motion.div>

        {/* ── Value Props ── */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`p-6 rounded-2xl ${prop.bg} border ${prop.border} transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${prop.color} rounded-xl flex items-center justify-center mb-4 shadow-lg ${prop.iconBg}`}>
                <prop.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{prop.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{prop.description}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Services Grid ── */}
        <div className="mb-4">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8 sm:mb-10"
          >
            Our Full Service Range
          </motion.h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              className="group relative bg-white dark:bg-gray-900/80 rounded-2xl p-6 shadow-sm hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 border border-gray-200/60 dark:border-gray-700/50 hover:border-transparent overflow-hidden flex flex-col"
            >
              {/* Hover gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.05] dark:group-hover:opacity-[0.08] transition-opacity duration-300 rounded-2xl`} />

              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10 flex flex-col flex-1">
                {/* Icon */}
                <div className={`w-13 h-13 w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-5 shadow-lg ${service.glow} group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-2 leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Promise */}
                <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/50">
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{service.promise}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Build Process Tree ── */}
        <BuildProcess />

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-95" />
          {/* Animated shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
          />
          {/* Blobs */}
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-800/30 rounded-full blur-3xl" />

          <div className="relative px-6 sm:px-8 py-10 sm:py-12 text-center">
            <motion.p
              className="text-xs font-bold text-cyan-200 uppercase tracking-widest mb-3"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Ready to Build Something Great?
            </motion.p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3">
              Let's Turn Your Idea Into a{' '}
              <span className="text-cyan-200">
                Working Solution
              </span>
            </h3>
            <p className="text-white/70 max-w-lg mx-auto mb-6 sm:mb-8 text-sm leading-relaxed">
              We work with you from requirement to deployment — iterating until the result is exactly what your business needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('proposal')}
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 rounded-xl shadow-xl font-bold hover:shadow-2xl transition-all duration-300"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3.5 bg-white/15 hover:bg-white/25 border-2 border-white/40 hover:border-white/70 text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Me
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}