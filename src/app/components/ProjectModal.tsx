import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../types';
import {
  X,
  Globe,
  Figma,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Wrench,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import { scrollToSection } from '../../utils/helpers';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const categoryMeta: Record<string, { gradient: string; badge: string; badgeColor: string }> = {
  Android: {
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'Mobile Solution',
    badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  },
  Flutter: {
    gradient: 'from-blue-500 to-cyan-600',
    badge: 'Mobile Solution',
    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  },
  ReactNative: {
    gradient: 'from-sky-500 to-blue-600',
    badge: 'Mobile Solution',
    badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
  },
  Web: {
    gradient: 'from-purple-500 to-violet-600',
    badge: 'Business Solution',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  },
  UIUX: {
    gradient: 'from-pink-500 to-rose-600',
    badge: 'Design Solution',
    badgeColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
  },
};

const statusColors: Record<string, string> = {
  Completed: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'In Progress': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Concept: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handler);
    };
  }, [project, onClose]);

  const meta = project ? (categoryMeta[project.category] ?? categoryMeta['Android']) : categoryMeta['Android'];
  const techTags = project?.techStack.split(',').map((t) => t.trim()) ?? [];
  const whatsappText = encodeURIComponent(
    `Hi Gourav, I saw your case study "${project?.projectName}" and I'd like a similar solution for my business!`
  );

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero Image */}
              <div className="relative h-56 md:h-64 overflow-hidden rounded-t-3xl flex-shrink-0">
                <img
                  src={project.imageUrl}
                  alt={project.projectName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${meta.gradient}`} />

                {/* Badges */}
                <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${meta.badgeColor} backdrop-blur-sm`}>
                    {meta.badge}
                  </span>
                  {project.status && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]} backdrop-blur-sm`}>
                      {project.status === 'Completed' ? '✅ ' : '🚧 '}{project.status}
                    </span>
                  )}
                </div>

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-5">

                {/* Title */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-50 mb-1.5 leading-tight">
                    {project.projectName}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Case Study: Problem → Solution → Impact */}
                <div className="grid md:grid-cols-1 gap-4">

                  {/* Problem */}
                  {project.problem && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-widest">The Problem</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {project.problem}
                      </p>
                    </motion.div>
                  )}

                  {/* Solution */}
                  {project.solution && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 }}
                      className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest">Our Solution</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {project.solution}
                      </p>
                    </motion.div>
                  )}

                  {/* Impact */}
                  {project.impact && project.impact.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.26 }}
                      className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">Result & Impact</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {project.impact.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.07 }}
                            className="flex items-center gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Key Features */}
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-6 h-6 bg-gradient-to-br ${meta.gradient} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-xs">✦</span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wider">
                        Key Features
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {project.highlights.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack — minimal */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Wrench className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Technologies Used</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {techTags.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 dark:border-gray-800" />

                {/* CTA Block */}
                <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 p-5">
                  <p className="text-white font-bold mb-1">Want a similar solution?</p>
                  <p className="text-gray-400 text-sm mb-4">
                    We can build a customized version tailored to your business requirements and budget.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {/* Primary CTA */}
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { onClose(); setTimeout(() => scrollToSection('proposal'), 300); }}
                      className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${meta.gradient} text-white rounded-xl text-sm font-semibold shadow-lg transition-all`}
                    >
                      Start Your Project
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    {/* WhatsApp */}
                    <motion.a
                      href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Let's Discuss
                    </motion.a>

                    {/* Live / Behance links if available */}
                    {project.liveDemo && (
                      <motion.a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Live Demo
                      </motion.a>
                    )}
                    {project.behanceLink && (
                      <motion.a
                        href={project.behanceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
                      >
                        <Figma className="w-4 h-4" />
                        View on Behance
                      </motion.a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
