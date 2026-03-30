import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { Input } from '../components/ui/input';
import { Project, CategoryFilter } from '../../types';
import { getProjects, filterProjects, searchProjects } from '../../services/projectService';
import { Loader2, Search, Smartphone, Globe, Palette, Layers, Star, MessageSquare, RefreshCw, Tablet, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import { scrollToSection } from '../../utils/helpers';

// ── Category meta ──────────────────────────────────────────────────────────
const CATEGORIES: {
  id: CategoryFilter;
  label: string;
  icon: React.ElementType;
  gradient: string;
  emptyIcon: string;
  emptyTitle: string;
  emptyMsg: string;
  waMsg: string;
}[] = [
  {
    id: 'All',
    label: 'All Solutions',
    icon: Layers,
    gradient: 'from-cyan-500 to-blue-600',
    emptyIcon: '🔍',
    emptyTitle: 'No solutions found',
    emptyMsg: 'Try adjusting your search query.',
    waMsg: "Hi Gourav, I'm looking for a project in your case studies but can't find it.",
  },
  {
    id: 'Android',
    label: 'Mobile Solution',
    icon: Smartphone,
    gradient: 'from-emerald-500 to-teal-600',
    emptyIcon: '📱',
    emptyTitle: 'No mobile solutions listed yet',
    emptyMsg: 'Mobile solutions coming soon! In the meantime, let\'s discuss your idea.',
    waMsg: 'Hi Gourav, I need a mobile app developed. Let\'s talk!',
  },
  {
    id: 'Flutter',
    label: 'Flutter',
    icon: Layers,
    gradient: 'from-blue-500 to-cyan-600',
    emptyIcon: '🐦',
    emptyTitle: 'No Flutter projects listed',
    emptyMsg: 'Flutter work is available on request. Cross-platform iOS + Android from one codebase.',
    waMsg: 'Hi Gourav, I need a Flutter (cross-platform) app. Can you help?',
  },
  {
    id: 'ReactNative',
    label: 'React Native',
    icon: Tablet,
    gradient: 'from-sky-500 to-blue-600',
    emptyIcon: '📱',
    emptyTitle: 'No React Native projects listed',
    emptyMsg: 'React Native projects available on request.',
    waMsg: 'Hi Gourav, I need a React Native app. Can you help?',
  },
  {
    id: 'Web',
    label: 'Business Solution',
    icon: Globe,
    gradient: 'from-purple-500 to-violet-600',
    emptyIcon: '🌐',
    emptyTitle: 'No web solutions here',
    emptyMsg: 'Need a website or web app? Let\'s build something amazing together.',
    waMsg: 'Hi Gourav, I need a web application built. Let\'s discuss!',
  },
  {
    id: 'UIUX',
    label: 'Design Solution',
    icon: Palette,
    gradient: 'from-pink-500 to-rose-600',
    emptyIcon: '🎨',
    emptyTitle: 'No design solutions here',
    emptyMsg: 'Design work is available. Beautiful, accessible, pixel-perfect interfaces.',
    waMsg: 'Hi Gourav, I need UI/UX design for my app/website. Can you help?',
  },
];

// ── Empty State Component ──────────────────────────────────────────────────
function EmptyState({
  category,
  isSearch,
  searchQuery,
  onClear,
}: {
  category: CategoryFilter;
  isSearch: boolean;
  searchQuery: string;
  onClear: () => void;
}) {
  const meta = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[0];
  const waLink = `https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent(meta.waMsg)}`;

  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
    >
      {/* Animated icon bubble */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className={`w-28 h-28 bg-gradient-to-br ${meta.gradient} rounded-3xl flex items-center justify-center shadow-2xl mb-8 text-5xl`}
      >
        {meta.emptyIcon}
      </motion.div>

      {/* Orbiting dots */}
      <div className="relative mb-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-br ${meta.gradient} opacity-60`}
            style={{ top: -50, left: i * 60 - 60 }}
            animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
        {isSearch ? `No results for "${searchQuery}"` : meta.emptyTitle}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
        {isSearch
          ? 'Try a different keyword or browse all projects.'
          : meta.emptyMsg}
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {isSearch ? (
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Clear Search
          </button>
        ) : (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r ${meta.gradient} text-white rounded-xl font-medium text-sm shadow-lg transition-all hover:opacity-90 hover:-translate-y-0.5`}
          >
            <MessageSquare className="w-4 h-4" />
            Discuss Your Project
          </a>
        )}
        <a
          href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent(meta.waMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium text-sm shadow transition-colors"
        >
          💬 WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFeatured, setShowFeatured] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const PAGE_SIZE = 6;

  // Count per category
  const getCategoryCount = (cat: CategoryFilter) => {
    if (cat === 'All') return projects.length;
    return projects.filter((p) => p.category === cat).length;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch {
        // fallback handled in service
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;
    if (activeCategory !== 'All') result = filterProjects(result, activeCategory);
    if (showFeatured) result = result.filter((p) => p.featured);
    if (searchQuery.trim()) result = searchProjects(result, searchQuery);
    setFilteredProjects(result);
    setVisibleCount(PAGE_SIZE); // reset pagination on filter change
  }, [activeCategory, searchQuery, showFeatured, projects]);

  const isSearchActive = searchQuery.trim().length > 0;

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;
  const remaining = filteredProjects.length - visibleCount;
  const isExpanded = visibleCount > PAGE_SIZE;

  return (
    <>
      <section
        id="projects"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/40 dark:bg-gray-800/30 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
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
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 rounded-full mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-400 tracking-wide uppercase">
                Case Studies
              </span>
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-4 tracking-tight">
              Solutions We've{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Delivered
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
              Real-world applications designed to solve business problems, improve efficiency, and scale operations.
            </p>
          </motion.div>

          {/* ── Filters ─────────────────────────────────────────── */}
          <div className="mb-8 sm:mb-10 space-y-4 sm:space-y-6">
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search solutions, technologies, outcomes…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-5 text-base rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-cyan-400 dark:focus:border-cyan-500 shadow-sm"
              />
              {isSearchActive && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-xs font-medium"
                >
                  ✕ Clear
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((cat) => {
                const count = getCategoryCount(cat.id);
                const isActive = activeCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      isActive
                        ? `bg-gradient-to-r ${cat.gradient} text-white border-transparent shadow-lg`
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500'
                    }`}
                  >
                    <cat.icon className="w-3.5 h-3.5" />
                    {cat.label}
                    {count > 0 && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </motion.button>
                );
              })}

              {/* Featured toggle */}
              <motion.button
                onClick={() => setShowFeatured(!showFeatured)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  showFeatured
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-transparent shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                Featured
              </motion.button>
            </div>

            {/* Active filters summary */}
            <AnimatePresence>
              {(isSearchActive || showFeatured || activeCategory !== 'All') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  <span>Showing {filteredProjects.length} of {projects.length} solutions</span>
                  <button
                    onClick={() => { setActiveCategory('All'); setSearchQuery(''); setShowFeatured(false); }}
                    className="text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium underline-offset-2 hover:underline"
                  >
                    Reset all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Loading ─────────────────────────────────────────── */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="w-12 h-12 text-cyan-500" />
              </motion.div>
              <p className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">
                Loading case studies…
              </p>
            </div>
          )}

          {/* ── Grid / Empty State ──────────────────────────────── */}
          {!loading && (
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div
                  key={`grid-${activeCategory}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5 max-w-4xl mx-auto"
                >
                  {visibleProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onOpen={setSelectedProject}
                    />
                  ))}

                  {/* ── Load More / Collapse Button ── */}
                  {filteredProjects.length > PAGE_SIZE && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="flex flex-col items-center gap-3 pt-4"
                    >
                      {/* Progress bar */}
                      <div className="w-full max-w-xs">
                        <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-1.5">
                          <span>Showing {Math.min(visibleCount, filteredProjects.length)} of {filteredProjects.length} case studies</span>
                          <span>{Math.round((Math.min(visibleCount, filteredProjects.length) / filteredProjects.length) * 100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(Math.min(visibleCount, filteredProjects.length) / filteredProjects.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center gap-3 flex-wrap justify-center">
                        {hasMore && (
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                            className="group flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-blue-500/30 transition-all duration-300"
                          >
                            <span>Load More</span>
                            <span className="px-2 py-0.5 bg-white/20 rounded-lg text-xs font-bold">
                              +{Math.min(PAGE_SIZE, remaining)}
                            </span>
                            <motion.div
                              animate={{ y: [0, 3, 0] }}
                              transition={{ duration: 1.4, repeat: Infinity }}
                            >
                              <ArrowRight className="w-4 h-4 rotate-90" />
                            </motion.div>
                          </motion.button>
                        )}

                        {isExpanded && (
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => {
                              setVisibleCount(PAGE_SIZE);
                              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-xl font-medium text-sm shadow-sm transition-all duration-300"
                          >
                            <ArrowRight className="w-3.5 h-3.5 -rotate-90" />
                            Collapse
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <EmptyState
                  category={activeCategory}
                  isSearch={isSearchActive}
                  searchQuery={searchQuery}
                  onClear={() => setSearchQuery('')}
                />
              )}
            </AnimatePresence>
          )}

          {/* ── Bottom Conversion CTA ──────────────────────────── */}
          {!loading && filteredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-16 relative rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
              />
              <div className="relative px-8 py-12 text-center">
                <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
                  Have a Similar Requirement?
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                  We Can Build a Customized Solution for{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Your Business
                  </span>
                </h3>
                <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed mb-8">
                  Every solution is tailored to your specific business needs, timeline, and budget.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollToSection('proposal')}
                    className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/30 font-semibold transition-all"
                  >
                    Start Your Project
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <motion.a
                    href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent("Hi Gourav, I saw your case studies and I'd like to discuss a similar solution for my business!")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-7 py-3.5 bg-transparent border-2 border-green-400/60 hover:border-green-400 text-green-400 hover:text-green-300 rounded-xl font-semibold transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat on WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Project Detail Modal ──────────────────────────────── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}