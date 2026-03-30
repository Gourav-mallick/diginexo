import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  MessageSquare,
  Figma,
  Zap,
  RotateCcw,
  FlaskConical,
  Rocket,
  HeartHandshake,
  ChevronRight,
  GitBranch,
} from 'lucide-react';

interface SubStep {
  label: string;
  tag?: string;
}

interface Phase {
  id: number;
  phase: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  bg: string;
  border: string;
  textColor: string;
  subSteps: SubStep[];
  badge?: { text: string; color: string };
  version?: string;
}

const phases: Phase[] = [
  {
    id: 1,
    phase: 'Phase 01',
    title: 'Discovery & Requirements',
    description: 'We start by deeply understanding your business goals, target users, and exact feature needs — nothing assumed.',
    icon: MessageSquare,
    color: 'from-cyan-500 to-teal-500',
    glow: 'shadow-cyan-500/30',
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    border: 'border-cyan-200 dark:border-cyan-800/50',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    subSteps: [
      { label: 'Stakeholder interview & goal setting' },
      { label: 'User persona & problem definition' },
      { label: 'Feature priority matrix (MoSCoW)', tag: 'Key' },
      { label: 'Scope & timeline estimation' },
    ],
  },
  {
    id: 2,
    phase: 'Phase 02',
    title: 'Design & Prototype',
    description: 'Before a single line of code, we design every screen and flow in Figma — with your approval at every step.',
    icon: Figma,
    color: 'from-pink-500 to-rose-500',
    glow: 'shadow-pink-500/30',
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    border: 'border-pink-200 dark:border-pink-800/50',
    textColor: 'text-pink-600 dark:text-pink-400',
    subSteps: [
      { label: 'Wireframes & user flow mapping' },
      { label: 'High-fidelity Figma screens', tag: 'Figma' },
      { label: 'Interactive clickable prototype' },
      { label: 'Client review & sign-off ✓' },
    ],
  },
  {
    id: 3,
    phase: 'Phase 03',
    title: 'Sprint 1 — Build V1 Core',
    description: 'Agile sprint focused on delivering the most critical features first — a fully working Version 1 that solves the core problem.',
    icon: Zap,
    color: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/30',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800/50',
    textColor: 'text-blue-600 dark:text-blue-400',
    badge: { text: '🚀 Agile Sprint', color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50' },
    version: 'V1',
    subSteps: [
      { label: 'Must-have core features only', tag: 'Priority' },
      { label: 'Clean architecture setup (MVVM / MVC)' },
      { label: 'API integration & database structure' },
      { label: 'Working demo — internal testing' },
    ],
  },
  {
    id: 4,
    phase: 'Phase 04',
    title: 'Client Review & Feedback',
    description: 'You see the working product, test it, and share feedback. We refine until V1 is exactly right before moving forward.',
    icon: RotateCcw,
    color: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/30',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800/50',
    textColor: 'text-amber-600 dark:text-amber-400',
    subSteps: [
      { label: 'Live demo walkthrough with client' },
      { label: 'Feedback collection & change log' },
      { label: 'V1 polish & revision cycles', tag: 'Free' },
      { label: 'Client approval sign-off ✓' },
    ],
  },
  {
    id: 5,
    phase: 'Phase 05',
    title: 'Sprint 2 — Extended Features',
    description: 'With a solid V1 approved, we now build the next layer of features — iterating sprint by sprint based on real feedback.',
    icon: GitBranch,
    color: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/30',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-200 dark:border-violet-800/50',
    textColor: 'text-violet-600 dark:text-violet-400',
    badge: { text: '🔄 Agile Sprint', color: 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700/50' },
    version: 'V1.1+',
    subSteps: [
      { label: 'Secondary feature backlog (sprint-planned)' },
      { label: 'UI polish & micro-animations' },
      { label: 'Performance & memory optimization', tag: 'Quality' },
      { label: 'Edge case handling & error flows' },
    ],
  },
  {
    id: 6,
    phase: 'Phase 06',
    title: 'Testing & Quality Assurance',
    description: 'Rigorous multi-device testing, bug fixing, and performance profiling — we ship only when it meets our quality bar.',
    icon: FlaskConical,
    color: 'from-emerald-500 to-green-500',
    glow: 'shadow-emerald-500/30',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800/50',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    subSteps: [
      { label: 'Multi-device & OS version testing' },
      { label: 'Performance profiling & memory leaks' },
      { label: 'Security & data validation audit', tag: 'Security' },
      { label: 'Regression testing before release' },
    ],
  },
  {
    id: 7,
    phase: 'Phase 07',
    title: 'Deployment & Launch',
    description: 'Go live! We handle the full release pipeline — Play Store, web hosting, domain setup, and production deployment.',
    icon: Rocket,
    color: 'from-red-500 to-orange-500',
    glow: 'shadow-red-500/30',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800/50',
    textColor: 'text-red-600 dark:text-red-400',
    subSteps: [
      { label: 'App Store / Play Store submission', tag: 'Release' },
      { label: 'Production server & domain setup' },
      { label: 'CI/CD pipeline configuration' },
      { label: 'Post-launch monitoring & hotfixes' },
    ],
  },
  {
    id: 8,
    phase: 'Phase 08',
    title: 'Ongoing Support & Iterations',
    description: 'We stay with you. New features, version updates, user feedback loops — we keep improving the product together.',
    icon: HeartHandshake,
    color: 'from-fuchsia-500 to-pink-500',
    glow: 'shadow-fuchsia-500/30',
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    border: 'border-fuchsia-200 dark:border-fuchsia-800/50',
    textColor: 'text-fuchsia-600 dark:text-fuchsia-400',
    subSteps: [
      { label: 'Monthly update & feature releases' },
      { label: 'User analytics & feedback review' },
      { label: 'Scaling as your user base grows', tag: 'Growth' },
      { label: 'Long-term partnership & support' },
    ],
  },
];

// ── Desktop: single phase row (alternating) ──────────────────────────────
function DesktopPhaseRow({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isRight = index % 2 === 0; // even = card on left, icon in center, empty right

  return (
    <div ref={ref} className="grid grid-cols-[1fr_56px_1fr] items-start gap-0">
      {/* LEFT slot */}
      {isRight ? (
        <PhaseCard phase={phase} index={index} isInView={isInView} slideFrom="left" />
      ) : (
        <div /> // empty
      )}

      {/* CENTER: icon + connecting dots */}
      <div className="flex flex-col items-center relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, type: 'spring', stiffness: 250 }}
          whileHover={{ scale: 1.15, rotate: 8 }}
          className={`w-12 h-12 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center shadow-xl ${phase.glow} ring-4 ring-white dark:ring-gray-900 z-10 flex-shrink-0 mt-4`}
        >
          <phase.icon className="w-6 h-6 text-white" />
        </motion.div>
        {/* Horizontal connector to card */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.15 }}
          style={{ originX: isRight ? 1 : 0 }}
          className={`absolute top-[36px] h-0.5 w-full bg-gradient-to-r ${phase.color} opacity-40`}
        />
      </div>

      {/* RIGHT slot */}
      {!isRight ? (
        <PhaseCard phase={phase} index={index} isInView={isInView} slideFrom="right" />
      ) : (
        <div /> // empty
      )}
    </div>
  );
}

function PhaseCard({
  phase,
  index,
  isInView,
  slideFrom,
}: {
  phase: Phase;
  index: number;
  isInView: boolean;
  slideFrom: 'left' | 'right';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: slideFrom === 'left' ? -36 : 36 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-5 rounded-2xl border ${phase.border} ${phase.bg} shadow-sm hover:shadow-lg transition-all duration-300 group`}
    >
      {/* Version badge */}
      {phase.version && (
        <span className={`absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-gradient-to-r ${phase.color} text-white shadow`}>
          {phase.version}
        </span>
      )}

      {/* Agile badge */}
      {phase.badge && (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold mb-2 ${phase.badge.color}`}>
          {phase.badge.text}
        </span>
      )}

      {/* Phase label */}
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${phase.textColor}`}>
        {phase.phase}
      </p>

      {/* Title */}
      <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2 leading-snug">
        {phase.title}
      </h4>

      {/* Description */}
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
        {phase.description}
      </p>

      {/* Sub-steps */}
      <ul className="space-y-1.5">
        {phase.subSteps.map((step, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
            className="flex items-center gap-2"
          >
            <ChevronRight className={`w-3 h-3 flex-shrink-0 ${phase.textColor}`} />
            <span className="text-xs text-gray-600 dark:text-gray-300 flex-1">{step.label}</span>
            {step.tag && (
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${phase.textColor} bg-white/60 dark:bg-gray-800/60 border ${phase.border}`}>
                {step.tag}
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Mobile: single column card ───────────────────────────────────────────
function MobilePhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10"
    >
      {/* Dot on vertical line */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
        className={`absolute left-0 top-4 w-7 h-7 bg-gradient-to-br ${phase.color} rounded-xl flex items-center justify-center shadow-md ring-2 ring-white dark:ring-gray-900`}
      >
        <phase.icon className="w-3.5 h-3.5 text-white" />
      </motion.div>

      {/* Card */}
      <div className={`p-4 rounded-xl border ${phase.border} ${phase.bg}`}>
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${phase.textColor}`}>{phase.phase}</p>
          {phase.version && (
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-gradient-to-r ${phase.color} text-white`}>
              {phase.version}
            </span>
          )}
          {phase.badge && (
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${phase.badge.color}`}>
              {phase.badge.text}
            </span>
          )}
        </div>

        <h4 className="font-bold text-gray-900 dark:text-gray-50 text-sm mb-1">{phase.title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{phase.description}</p>

        <ul className="space-y-1">
          {phase.subSteps.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex items-center gap-1.5"
            >
              <ChevronRight className={`w-2.5 h-2.5 flex-shrink-0 ${phase.textColor}`} />
              <span className="text-xs text-gray-600 dark:text-gray-300">{step.label}</span>
              {step.tag && (
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${phase.textColor} bg-white/60 dark:bg-gray-800/60`}>
                  {step.tag}
                </span>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────
export function BuildProcess() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const lineRef = useRef(null);
  const isLineInView = useInView(lineRef, { once: true, margin: '-100px' });

  return (
    <div className="mt-20 mb-16">
      {/* ── Section Header ── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-full mb-5"
        >
          <GitBranch className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 tracking-widest uppercase">
            Our Agile Build Process
          </span>
        </motion.span>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-3 tracking-tight">
          How We Turn Your Idea{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Into a Working Product
          </span>
        </h3>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto px-4 sm:px-0">
          We follow an agile sprint model — building the features you need most in{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-300">Version 1 first</span>, then
          iterating with your feedback until the product is perfect.
        </p>

        {/* Flow pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="inline-flex flex-wrap items-center justify-center gap-1 mt-5 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm"
        >
          {['Discovery', 'Design', 'V1 Core', 'Review', 'V1.1+', 'QA', 'Launch', 'Support'].map((step, i) => (
            <span key={step} className="flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{step}</span>
              {i < 7 && <span className="text-gray-300 dark:text-gray-600 text-xs">→</span>}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── DESKTOP alternating tree ── */}
      <div className="hidden md:block relative" ref={lineRef}>
        {/* Vertical center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isLineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
            style={{ originY: 0 }}
            className="w-full h-full bg-gradient-to-b from-cyan-400 via-blue-400 via-violet-400 to-fuchsia-400 opacity-30 dark:opacity-25"
          />
        </div>

        <div className="flex flex-col gap-6">
          {phases.map((phase, index) => (
            <DesktopPhaseRow key={phase.id} phase={phase} index={index} />
          ))}
        </div>
      </div>

      {/* ── MOBILE stacked ── */}
      <div className="md:hidden relative">
        {/* Vertical left line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 to-fuchsia-400 opacity-25" />
        <div className="flex flex-col gap-4">
          {phases.map((phase, index) => (
            <MobilePhaseCard key={phase.id} phase={phase} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
