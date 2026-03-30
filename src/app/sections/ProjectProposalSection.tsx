import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, CheckCircle2, Smartphone, Globe, Palette, Layers, Tablet,
  User, Mail, Phone, Sparkles, ChevronRight, ChevronLeft, Zap,
  Clock, DollarSign, Rocket, Shield, MessageCircle, Gift,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';

// ── Types ──────────────────────────────────────────────────────────────────
interface ProposalForm {
  name: string; email: string; phone: string;
  projectType: string; techStacks: string[];
  description: string; features: string;
  budget: string; timeline: string; extra: string;
}
const INITIAL_FORM: ProposalForm = {
  name: '', email: '', phone: '', projectType: '',
  techStacks: [], description: '', features: '',
  budget: '', timeline: '', extra: '',
};

// ── Data ───────────────────────────────────────────────────────────────────
const PROJECT_TYPES = [
  { id: 'android',     label: 'Android App',  icon: Smartphone, gradient: 'from-green-400 to-emerald-500',  ring: 'ring-emerald-400' },
  { id: 'flutter',     label: 'Flutter App',  icon: Layers,     gradient: 'from-blue-400 to-cyan-500',      ring: 'ring-cyan-400'    },
  { id: 'reactnative', label: 'React Native', icon: Tablet,     gradient: 'from-sky-400 to-blue-500',       ring: 'ring-sky-400'     },
  { id: 'web',         label: 'Web App',      icon: Globe,      gradient: 'from-purple-400 to-violet-500',  ring: 'ring-violet-400'  },
  { id: 'uiux',        label: 'UI/UX Design', icon: Palette,    gradient: 'from-pink-400 to-rose-500',      ring: 'ring-rose-400'    },
  { id: 'fullstack',   label: 'Full Stack',   icon: Zap,        gradient: 'from-orange-400 to-red-500',     ring: 'ring-orange-400'  },
];

const TECH_OPTIONS: Record<string, string[]> = {
  android:     ['Kotlin', 'Java', 'Jetpack Compose', 'XML Layouts', 'Room DB', 'Firebase', 'Retrofit', 'NFC', 'ML Kit', 'CameraX'],
  flutter:     ['Flutter', 'Dart', 'Provider', 'Riverpod', 'Firebase', 'SQLite', 'GetX'],
  reactnative: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Firebase', 'AsyncStorage'],
  web:         ['React', 'Next.js', 'Angular', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL'],
  uiux:        ['Figma', 'Material Design', 'Prototyping', 'Design System', 'Wireframes', 'User Research'],
  fullstack:   ['React', 'Node.js', 'MongoDB', 'Firebase', 'REST API', 'GraphQL', 'Docker'],
};

const BUDGET_OPTIONS = [
  { value: 'under-5k', label: '< ₹5,000',     tag: 'Mini',         emoji: '🌱' },
  { value: '5k-15k',   label: '₹5K – ₹15K',   tag: 'Starter',      emoji: '🚀' },
  { value: '15k-30k',  label: '₹15K – ₹30K',  tag: 'Standard',     emoji: '⭐' },
  { value: '30k-60k',  label: '₹30K – ₹60K',  tag: 'Professional', emoji: '💎' },
  { value: '60k-plus', label: '₹60K+',         tag: 'Enterprise',   emoji: '🏆' },
  { value: 'discuss',  label: "Let's Discuss", tag: 'Flexible',     emoji: '💬' },
];

const TIMELINE_OPTIONS = [
  { value: 'asap',     label: 'ASAP',       sub: '< 1 week',       emoji: '⚡' },
  { value: '2weeks',   label: '1–2 Weeks',  sub: 'Quick turn',     emoji: '🏃' },
  { value: '1month',   label: '2–4 Weeks',  sub: 'Balanced',       emoji: '📅' },
  { value: '2months',  label: '1–2 Months', sub: 'Standard',       emoji: '🗓️' },
  { value: '3months',  label: '2–3 Months', sub: 'Complex build',  emoji: '🛠️' },
  { value: 'flexible', label: 'Flexible',   sub: "I'm not sure",   emoji: '🤔' },
];

const STEPS = [
  { label: 'Project Type',  hint: 'What are you building?' },
  { label: 'Details',       hint: 'Describe your idea'      },
  { label: 'Budget & Time', hint: 'Scope & timeline'        },
  { label: 'Your Info',     hint: 'How to reach you'        },
];

const TRUST = [
  { icon: Rocket,        text: 'Reply within 24hrs',   color: 'text-cyan-500',   bg: 'bg-cyan-500/10'   },
  { icon: Shield,        text: 'Info stays private',   color: 'text-green-500',  bg: 'bg-green-500/10'  },
  { icon: MessageCircle, text: 'Direct on WhatsApp',   color: 'text-blue-500',   bg: 'bg-blue-500/10'   },
  { icon: Gift,          text: 'Free consultation',    color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

// ── Floating Input ─────────────────────────────────────────────────────────
function FInput({ label, type = 'text', value, onChange, icon: Icon, required = false }: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; icon: React.ElementType; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${lifted ? 'text-cyan-500' : 'text-gray-400'}`}>
        <Icon className="w-4 h-4" />
      </div>
      <input
        type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className={`w-full pl-11 pr-4 pt-6 pb-2.5 rounded-xl border-2 text-sm bg-white dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 outline-none transition-all duration-200
          ${lifted ? 'border-cyan-400 dark:border-cyan-500' : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'}`}
      />
      <label className={`absolute left-11 pointer-events-none transition-all duration-200 ${lifted ? 'top-2 text-[10px] font-semibold text-cyan-500' : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'}`}>
        {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
    </div>
  );
}

// ── Floating Textarea ──────────────────────────────────────────────────────
function FTextarea({ label, value, onChange, rows = 4, maxLen, required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  rows?: number; maxLen?: number; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative">
      <textarea
        rows={rows} value={value} maxLength={maxLen}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className={`w-full px-4 pt-7 pb-3 rounded-xl border-2 text-sm bg-white dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 outline-none resize-none transition-all duration-200
          ${lifted ? 'border-cyan-400 dark:border-cyan-500' : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'}`}
      />
      <label className={`absolute left-4 pointer-events-none transition-all duration-200 ${lifted ? 'top-2.5 text-[10px] font-semibold text-cyan-500' : 'top-5 text-sm text-gray-500'}`}>
        {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      {maxLen && (
        <span className={`absolute bottom-3 right-4 text-[10px] ${value.length > maxLen * 0.85 ? 'text-rose-400' : 'text-gray-400 dark:text-gray-600'}`}>
          {value.length}/{maxLen}
        </span>
      )}
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────
export function ProjectProposalSection() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ProposalForm>(INITIAL_FORM);

  const techs = form.projectType ? (TECH_OPTIONS[form.projectType] ?? []) : [];

  const toggleTech = (t: string) =>
    setForm((f) => ({
      ...f,
      techStacks: f.techStacks.includes(t) ? f.techStacks.filter((x) => x !== t) : [...f.techStacks, t],
    }));

  const canNext = () => {
    if (step === 0) return form.projectType !== '';
    if (step === 1) return form.description.trim().length > 10;
    if (step === 2) return form.budget !== '' && form.timeline !== '';
    if (step === 3) return form.name.trim() !== '' && (form.email.trim() !== '' || form.phone.trim() !== '');
    return true;
  };

  const next = () => { if (!canNext()) return; setDir(1); setStep((s) => s + 1); };
  const back = () => { setDir(-1); setStep((s) => Math.max(0, s - 1)); };

  const buildMsg = () => {
    const pt = PROJECT_TYPES.find((p) => p.id === form.projectType)?.label ?? form.projectType;
    const bd = BUDGET_OPTIONS.find((b) => b.value === form.budget)?.label ?? form.budget;
    const tl = TIMELINE_OPTIONS.find((t) => t.value === form.timeline)?.label ?? form.timeline;
    return encodeURIComponent(
      `🚀 *Project Proposal — ${form.name}*\n\n` +
      `📌 *Type:* ${pt}\n🛠️ *Tech:* ${form.techStacks.join(', ') || 'Not specified'}\n\n` +
      `📋 *Description:*\n${form.description}\n\n` +
      (form.features ? `✨ *Features:*\n${form.features}\n\n` : '') +
      `💰 *Budget:* ${bd}\n⏱️ *Timeline:* ${tl}\n\n` +
      `👤 *Name:* ${form.name}\n` +
      (form.email ? `📧 *Email:* ${form.email}\n` : '') +
      (form.phone ? `📱 *Phone:* ${form.phone}\n` : '') +
      (form.extra ? `\n📝 *Notes:*\n${form.extra}` : '') +
      `\n\n_via diginexo.in_`
    );
  };

  const submit = () => {
    if (!canNext()) return;
    window.open(`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${buildMsg()}`, '_blank');
    setSubmitted(true);
  };

  // ── Success ──────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <section id="proposal" className="py-24 px-4 bg-gradient-to-br from-green-50 via-cyan-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Proposal Sent! 🎉</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-gray-500 dark:text-gray-400 mb-2">
            Your details went straight to Gourav's WhatsApp.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mb-10">
            ⚡ Expect a reply within 24 hours
          </motion.p>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            onClick={() => { setSubmitted(false); setStep(0); setForm(INITIAL_FORM); }}
            className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/25 hover:opacity-90 transition-opacity">
            Start New Proposal
          </motion.button>
        </div>
      </section>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <section id="proposal" className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/20 to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-60 -left-60 w-[600px] h-[600px] bg-cyan-400/6 rounded-full blur-3xl" />
        <div className="absolute -bottom-60 -right-60 w-[600px] h-[600px] bg-purple-400/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/60 dark:border-cyan-500/20 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">Start a Collaboration</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Send a{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Proposal</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            4 quick steps — your details go directly to Gourav's WhatsApp.
          </p>
        </motion.div>

        {/* ── Step Progress ── */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i < step  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30' :
                  i === step ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white ring-4 ring-cyan-200 dark:ring-cyan-800 shadow-md' :
                               'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600'
                }`}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`hidden sm:block text-[10px] font-semibold whitespace-nowrap transition-colors duration-200 ${
                  i === step ? 'text-cyan-600 dark:text-cyan-400' : i < step ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'
                }`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                    animate={{ width: i < step ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Card ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700/60 overflow-hidden">

          {/* Step label bar */}
          <div className="flex items-center justify-between px-7 py-4 border-b border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-800/60">
            <div>
              <p className="font-bold text-gray-800 dark:text-white text-sm">{STEPS[step].label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{STEPS[step].hint}</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 py-1 rounded-full font-semibold">
              {step + 1} / {STEPS.length}
            </span>
          </div>

          {/* Animated step content */}
          <div className="p-7 min-h-[360px] flex flex-col">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={{
                  enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
                  center: { opacity: 1, x: 0 },
                  exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex-1"
              >

                {/* ── Step 0: Project Type ── */}
                {step === 0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Select the platform that best matches your idea.</p>
                    <div className="grid grid-cols-3 gap-3">
                      {PROJECT_TYPES.map((pt) => {
                        const sel = form.projectType === pt.id;
                        return (
                          <motion.button
                            key={pt.id}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setForm((f) => ({ ...f, projectType: pt.id, techStacks: [] }))}
                            className={`relative flex flex-col items-center gap-2.5 py-5 px-3 rounded-2xl border-2 transition-all duration-200 group
                              ${sel ? `border-transparent ring-2 ${pt.ring} bg-gray-50 dark:bg-gray-700/60 shadow-lg` : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md bg-white dark:bg-transparent'}`}
                          >
                            {sel && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              </motion.div>
                            )}
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pt.gradient} flex items-center justify-center shadow-md`}>
                              <pt.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className={`text-xs font-bold text-center leading-tight ${sel ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                              {pt.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                    {form.projectType && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="mt-5 text-center text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                        ✓ Great! Hit Continue to describe your idea →
                      </motion.p>
                    )}
                  </div>
                )}

                {/* ── Step 1: Describe ── */}
                {step === 1 && (
                  <div className="space-y-5">
                    <p className="text-sm text-gray-500 dark:text-gray-400">The more detail, the better Gourav can tailor the quote. Be as specific as you like!</p>
                    <FTextarea label="Project Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} rows={5} maxLen={800} required />
                    <FTextarea label="Key Features  (optional)" value={form.features} onChange={(v) => setForm((f) => ({ ...f, features: v }))} rows={3} maxLen={400} />

                    {techs.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2.5 uppercase tracking-wider">
                          Preferred Tech Stack <span className="font-normal normal-case text-gray-400">— tap to select</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((t) => {
                            const sel = form.techStacks.includes(t);
                            return (
                              <motion.button key={t} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                                onClick={() => toggleTech(t)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-150
                                  ${sel ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-md shadow-cyan-500/20' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-cyan-300'}`}>
                                {sel && '✓ '}{t}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Step 2: Budget & Timeline ── */}
                {step === 2 && (
                  <div className="space-y-7">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Knowing your range helps Gourav scope the right solution — no pressure!</p>

                    {/* Budget */}
                    <div>
                      <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-cyan-500" /> Budget Range
                      </p>
                      <div className="grid grid-cols-3 gap-2.5">
                        {BUDGET_OPTIONS.map((b) => {
                          const sel = form.budget === b.value;
                          return (
                            <motion.button key={b.value} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                              onClick={() => setForm((f) => ({ ...f, budget: b.value }))}
                              className={`flex flex-col items-center gap-1 py-3.5 px-2 rounded-xl border-2 text-center transition-all duration-200
                                ${sel ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-900/25 shadow-md shadow-cyan-500/15' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent hover:border-cyan-300 dark:hover:border-cyan-800 hover:shadow-sm'}`}>
                              <span className="text-lg">{b.emoji}</span>
                              <span className={`text-xs font-bold leading-tight ${sel ? 'text-cyan-700 dark:text-cyan-300' : 'text-gray-700 dark:text-gray-300'}`}>{b.label}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${sel ? 'bg-cyan-100 dark:bg-cyan-800/50 text-cyan-600 dark:text-cyan-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>{b.tag}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-500" /> Preferred Timeline
                      </p>
                      <div className="grid grid-cols-3 gap-2.5">
                        {TIMELINE_OPTIONS.map((t) => {
                          const sel = form.timeline === t.value;
                          return (
                            <motion.button key={t.value} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                              onClick={() => setForm((f) => ({ ...f, timeline: t.value }))}
                              className={`flex flex-col items-center gap-1 py-3.5 px-2 rounded-xl border-2 text-center transition-all duration-200
                                ${sel ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-900/25 shadow-md shadow-cyan-500/15' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent hover:border-cyan-300 dark:hover:border-cyan-800 hover:shadow-sm'}`}>
                              <span className="text-lg">{t.emoji}</span>
                              <span className={`text-xs font-bold ${sel ? 'text-cyan-700 dark:text-cyan-300' : 'text-gray-700 dark:text-gray-300'}`}>{t.label}</span>
                              <span className="text-[10px] text-gray-400">{t.sub}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 3: Your Info ── */}
                {step === 3 && (
                  <div className="space-y-5">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Almost done! Just a few details so Gourav can send you a personalised quote.</p>

                    <div className="space-y-3.5">
                      <FInput label="Full Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} icon={User} required />
                      <FInput label="Email Address" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} icon={Mail} />
                      <FInput label="WhatsApp / Phone" type="tel" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} icon={Phone} />
                      <FTextarea label="Anything else? (optional)" value={form.extra} onChange={(v) => setForm((f) => ({ ...f, extra: v }))} rows={3} maxLen={300} />
                    </div>

                    {/* Mini Summary */}
                    <div className="mt-1 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/15 dark:to-blue-900/15 border border-cyan-100 dark:border-cyan-800/40 rounded-xl p-4">
                      <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mb-3">📋 Proposal Summary</p>
                      <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs">
                        {[
                          { l: '🎯 Type',     v: PROJECT_TYPES.find(p => p.id === form.projectType)?.label },
                          { l: '💰 Budget',   v: BUDGET_OPTIONS.find(b => b.value === form.budget)?.label },
                          { l: '⏱️ Timeline', v: TIMELINE_OPTIONS.find(t => t.value === form.timeline)?.label },
                          { l: '🛠️ Stack',    v: form.techStacks.length > 0 ? `${form.techStacks.length} selected` : undefined },
                        ].map((r) => (
                          <div key={r.l}>
                            <span className="text-gray-400">{r.l}: </span>
                            <span className={`font-semibold ${r.v ? 'text-gray-700 dark:text-gray-200' : 'text-gray-300 dark:text-gray-600'}`}>
                              {r.v ?? '—'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Navigation Footer ── */}
          <div className="flex items-center justify-between px-7 py-4 border-t border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-800/50">
            {/* Back */}
            <button
              onClick={back}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2
                ${step === 0 ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-700 cursor-not-allowed' : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-cyan-400 hover:text-cyan-600'}`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {/* Dot pager */}
            <div className="flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <motion.div key={i}
                  animate={{ width: i === step ? 20 : 6, backgroundColor: i <= step ? '#06b6d4' : '#e5e7eb' }}
                  transition={{ duration: 0.25 }}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>

            {/* Next / Submit */}
            {step < STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: canNext() ? 1.04 : 1 }}
                whileTap={{ scale: canNext() ? 0.96 : 1 }}
                onClick={next}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md
                  ${canNext() ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: canNext() ? 1.04 : 1 }}
                whileTap={{ scale: canNext() ? 0.96 : 1 }}
                onClick={submit}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md
                  ${canNext() ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              >
                <Send className="w-4 h-4" /> Send via WhatsApp
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* ── Trust Strip ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRUST.map((t) => (
            <div key={t.text} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 shadow-sm">
              <div className={`w-8 h-8 rounded-lg ${t.bg} flex items-center justify-center flex-shrink-0`}>
                <t.icon className={`w-4 h-4 ${t.color}`} />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 leading-tight">{t.text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}