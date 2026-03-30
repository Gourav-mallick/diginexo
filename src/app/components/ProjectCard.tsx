import { Project } from '../../types';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Figma, CheckCircle2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export const categoryMeta: Record<string, {
  gradient: string;
  badge: string;
  badgeColor: string;
  accentLight: string;
  accentDark: string;
  numColor: string;
}> = {
  Android: {
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'Mobile Solution',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700/50',
    accentLight: 'group-hover:border-emerald-300',
    accentDark: 'dark:group-hover:border-emerald-700',
    numColor: 'from-emerald-400 to-teal-500',
  },
  Flutter: {
    gradient: 'from-blue-500 to-cyan-600',
    badge: 'Cross-Platform',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50',
    accentLight: 'group-hover:border-blue-300',
    accentDark: 'dark:group-hover:border-blue-700',
    numColor: 'from-blue-400 to-cyan-500',
  },
  ReactNative: {
    gradient: 'from-sky-500 to-blue-600',
    badge: 'Mobile Solution',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-700/50',
    accentLight: 'group-hover:border-sky-300',
    accentDark: 'dark:group-hover:border-sky-700',
    numColor: 'from-sky-400 to-blue-500',
  },
  Web: {
    gradient: 'from-purple-500 to-violet-600',
    badge: 'Business Solution',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/50',
    accentLight: 'group-hover:border-purple-300',
    accentDark: 'dark:group-hover:border-purple-700',
    numColor: 'from-purple-400 to-violet-500',
  },
  UIUX: {
    gradient: 'from-pink-500 to-rose-600',
    badge: 'Design Solution',
    badgeColor: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-700/50',
    accentLight: 'group-hover:border-pink-300',
    accentDark: 'dark:group-hover:border-pink-700',
    numColor: 'from-pink-400 to-rose-500',
  },
};

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const meta = categoryMeta[project.category] ?? categoryMeta['Android'];
  const impactItems = project.impact?.slice(0, 3) ?? [];
  const techTags = project.techStack.split(',').map((t) => t.trim()).slice(0, 4);
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.22 }}
        onClick={() => onOpen(project)}
        className={`
          group relative cursor-pointer
          bg-white dark:bg-gray-900/70
          border border-gray-100 dark:border-gray-800
          ${meta.accentLight} ${meta.accentDark}
          rounded-2xl overflow-hidden
          shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/60
          transition-all duration-300
          flex flex-col sm:flex-row gap-0
        `}
      >
        {/* Left gradient bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${meta.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* ── CONTENT SIDE ─────────────────────────────────── */}
        <div className="flex-1 flex flex-col p-6 sm:p-7 min-w-0">

          {/* Top row: number + badge + status */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className={`text-4xl font-black bg-gradient-to-br ${meta.numColor} bg-clip-text text-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300 leading-none select-none mr-1`}>
              {num}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${meta.badgeColor}`}>
              {meta.badge}
            </span>
            {project.status && (
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                project.status === 'Completed'
                  ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/40'
                  : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/40'
              }`}>
                {project.status === 'Completed' ? '✓ ' : '⟳ '}{project.status}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-gray-900 dark:text-gray-50 text-lg sm:text-xl leading-snug mb-2.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-gray-50 dark:group-hover:to-gray-300 transition-all duration-300">
            {project.projectName}
          </h3>

          {/* Short description */}
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Impact pills */}
          {impactItems.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {impactItems.map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/60 rounded-full"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">{item}</span>
                </motion.span>
              ))}
            </div>
          )}

          {/* Footer: tech tags + CTA */}
          <div className="flex items-end justify-between gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-md text-[10px] font-medium text-gray-500 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
              {project.techStack.split(',').length > 4 && (
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-md text-[10px] font-medium text-gray-400">
                  +{project.techStack.split(',').length - 4} more
                </span>
              )}
            </div>

            {/* View CTA */}
            <motion.div
              className={`flex items-center gap-1.5 text-xs font-bold whitespace-nowrap bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}
              whileHover={{ x: 3 }}
            >
              View Case Study
              <ArrowRight className="w-3.5 h-3.5 text-cyan-500 group-hover:translate-x-0.5 transition-transform" />
            </motion.div>
          </div>
        </div>

        {/* ── IMAGE SIDE ───────────────────────────────────── */}
        <div className="relative w-full sm:w-56 md:w-64 lg:w-72 flex-shrink-0 h-44 sm:h-auto overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={project.imageUrl}
            alt={project.projectName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-400`} />
          {/* Dark overlay + bottom fade on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent sm:bg-gradient-to-l sm:from-white/8 sm:via-transparent sm:to-transparent dark:sm:from-gray-900/20" />

          {/* External links */}
          <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </a>
            )}
            {project.behanceLink && (
              <a
                href={project.behanceLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center transition-colors"
                title="Behance"
              >
                <Figma className="w-3.5 h-3.5 text-white" />
              </a>
            )}
          </div>

          {/* Featured star */}
          {project.featured && (
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-1">
              <span className="text-xs">⭐</span>
              <span className="text-[10px] font-bold text-white/90">Featured</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
