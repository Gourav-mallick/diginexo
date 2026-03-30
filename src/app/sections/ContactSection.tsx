import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from '../components/Section';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { ContactForm } from '../../types';
import { isValidEmail } from '../../utils/helpers';
import { PERSONAL_INFO } from '../../constants';
import {
  Mail, Phone, MapPin, Send, MessageSquare,
  CheckCircle2, User, AtSign, PhoneCall, MessageCircle,
  Github, Linkedin, Instagram, Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { CountryCodeSelector } from '../components/CountryCodeSelector';

const TO_EMAIL = 'officialdiginexo@gmail.com';

const INITIAL_FORM: ContactForm = {
  name: '',
  email: '',
  phone: '',
  countryCode: '+91',
  message: '',
};

type FormErrors = Partial<Record<keyof ContactForm, string>>;

export function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // ── Validation ──────────────────────────────────────────────
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = 'Full name is required';
    if (!formData.email.trim()) e.email = 'Email address is required';
    else if (!isValidEmail(formData.email)) e.email = 'Enter a valid email address';
    if (formData.phone.trim() && !/^\d{4,15}$/.test(formData.phone.replace(/[\s\-()]/g, '')))
      e.phone = 'Enter a valid phone number';
    if (!formData.message.trim()) e.message = 'Message cannot be empty';
    else if (formData.message.trim().length < 10) e.message = 'Message is too short (min 10 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearError = (field: keyof ContactForm) => {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  // ── Submit via mailto ────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors before sending.');
      return;
    }

    setIsSubmitting(true);

    // Small delay for UX feedback
    await new Promise((r) => setTimeout(r, 800));

    const phoneStr = formData.phone.trim()
      ? `Phone: ${formData.countryCode} ${formData.phone.trim()}\n`
      : '';

    const subject = encodeURIComponent(
      `New Contact from ${formData.name.trim()} via diginexo.in Portfolio`
    );
    const body = encodeURIComponent(
      `Hi Gourav,\n\nYou have a new message from your portfolio contact form:\n\n` +
      `Name: ${formData.name.trim()}\n` +
      `Email: ${formData.email.trim()}\n` +
      phoneStr +
      `\nMessage:\n${formData.message.trim()}\n\n` +
      `---\nSent via diginexo.in portfolio contact form`
    );

    window.open(`mailto:${TO_EMAIL}?subject=${subject}&body=${body}`, '_blank');

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData(INITIAL_FORM);
    setErrors({});
    toast.success("Your email client is opening — just hit Send! 🚀");
  };

  // ── Social links ─────────────────────────────────────────────
  const socials = [
    { icon: Github,    label: 'GitHub',    href: PERSONAL_INFO.social.github,    color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: Linkedin,  label: 'LinkedIn',  href: PERSONAL_INFO.social.linkedin,  color: 'hover:text-blue-600 dark:hover:text-blue-400' },
    { icon: Instagram, label: 'Instagram', href: PERSONAL_INFO.social.instagram, color: 'hover:text-pink-600 dark:hover:text-pink-400' },
  ];

  const contactCards = [
    {
      icon: Mail, label: 'Email Us', value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      gradient: 'from-cyan-500 to-blue-600', glow: 'shadow-cyan-500/25',
    },
    {
      icon: Phone, label: 'Call / WhatsApp', value: PERSONAL_INFO.phone,
      href: `https://wa.me/${PERSONAL_INFO.whatsapp}`,
      gradient: 'from-green-500 to-emerald-600', glow: 'shadow-green-500/25',
    },
    {
      icon: MapPin, label: 'Location', value: 'India 🇮🇳',
      href: null,
      gradient: 'from-purple-500 to-violet-600', glow: 'shadow-purple-500/25',
    },
  ];

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Have a project in mind? Let's talk about it."
      variant="default"
    >
      <div className="grid lg:grid-cols-5 gap-10 xl:gap-16 max-w-6xl mx-auto">

        {/* ── LEFT PANEL (2/5) ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 space-y-7"
        >
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
              Let's Build Something{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Amazing
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              We're always open to discussing new projects, creative ideas, and
              opportunities. Fill in the form or reach out directly — we reply
              within <span className="font-semibold text-gray-800 dark:text-gray-200">24 hours</span>.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-3">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60 hover:border-cyan-300 dark:hover:border-cyan-600 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`w-11 h-11 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${card.glow} group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{card.label}</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{card.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60">
                    <div className={`w-11 h-11 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${card.glow}`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{card.label}</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{card.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* WhatsApp Quick CTA */}
          <motion.a
            href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=Hi%20Gourav%2C%20I%27d%20like%20to%20discuss%20a%20project!`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/25 text-white group"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">WhatsApp — Quick Reply</p>
              <p className="text-green-100 text-xs">Typically replies in minutes</p>
            </div>
            <Send className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center gap-3"
          >
            <span className="text-sm text-gray-400 dark:text-gray-500">Follow us:</span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 ${s.color} transition-all duration-200 hover:scale-110 hover:shadow-md`}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT PANEL — FORM (3/5) ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3"
        >
          <div className="relative bg-white dark:bg-gray-800/80 rounded-3xl p-7 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">

            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-t-3xl" />

            {/* ── Success State ── */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <motion.div
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-5 shadow-xl shadow-green-500/30"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">Email Client Opened!</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mb-6">
                    Your message was pre-filled. Just hit <span className="font-semibold text-cyan-600 dark:text-cyan-400">Send</span> in your email client to deliver it to{' '}
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">{TO_EMAIL}</span>.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="border-cyan-400 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-500/10"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Form header */}
                  <div className="mb-6">
                    <h4 className="font-extrabold text-gray-900 dark:text-white text-lg">Send Us a Message</h4>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      All messages go directly to{' '}
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium">{TO_EMAIL}</span>
                    </p>
                  </div>

                  {/* Row 1: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 mb-2 text-sm font-semibold">
                        <User className="w-3.5 h-3.5 text-cyan-500" /> Full Name <span className="text-red-400">*</span>
                      </Label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => { setFormData((p) => ({ ...p, name: e.target.value })); clearError('name'); }}
                        placeholder="Gourav Mallick"
                        className={`w-full h-10 px-4 rounded-lg border text-sm bg-gray-50 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none transition-all duration-200
                          focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 dark:focus:border-cyan-500
                          ${errors.name ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 mb-2 text-sm font-semibold">
                        <AtSign className="w-3.5 h-3.5 text-cyan-500" /> Email Address <span className="text-red-400">*</span>
                      </Label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => { setFormData((p) => ({ ...p, email: e.target.value })); clearError('email'); }}
                        placeholder="you@example.com"
                        className={`w-full h-10 px-4 rounded-lg border text-sm bg-gray-50 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none transition-all duration-200
                          focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 dark:focus:border-cyan-500
                          ${errors.email ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2: Phone with Country Code */}
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 mb-2 text-sm font-semibold">
                      <PhoneCall className="w-3.5 h-3.5 text-cyan-500" /> Contact Number
                      <span className="text-gray-400 dark:text-gray-500 font-normal text-xs ml-1">(optional)</span>
                    </Label>
                    <div className="flex">
                      <CountryCodeSelector
                        value={formData.countryCode}
                        onChange={(code) => setFormData((p) => ({ ...p, countryCode: code }))}
                        error={!!errors.phone}
                      />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d\s\-()]/g, '');
                          setFormData((p) => ({ ...p, phone: val }));
                          clearError('phone');
                        }}
                        placeholder="62073 31469"
                        className={`flex-1 h-10 px-4 rounded-r-lg border-l-0 border text-sm bg-gray-50 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none transition-all duration-200
                          focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 dark:focus:border-cyan-500
                          ${errors.phone ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.phone}</p>}
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                      We'll use this for WhatsApp follow-up if needed.
                    </p>
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <Label htmlFor="message" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 mb-2 text-sm font-semibold">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-500" /> Your Message <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => { setFormData((p) => ({ ...p, message: e.target.value })); clearError('message'); }}
                      placeholder="Tell us about your project — what you're building, your timeline, and any specific requirements..."
                      rows={5}
                      className={`resize-none transition-all duration-200
                        ${errors.message ? 'border-red-400 dark:border-red-500' : ''}`}
                    />
                    <div className="flex items-start justify-between mt-1.5">
                      {errors.message
                        ? <p className="text-red-500 text-xs">⚠ {errors.message}</p>
                        : <span />
                      }
                      <span className={`text-xs tabular-nums ml-auto ${formData.message.length > 500 ? 'text-amber-500' : 'text-gray-400'}`}>
                        {formData.message.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Destination note */}
                  <div className="flex items-center gap-2.5 px-4 py-3 bg-cyan-50 dark:bg-cyan-500/10 rounded-xl border border-cyan-100 dark:border-cyan-500/20">
                    <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                    <p className="text-xs text-cyan-700 dark:text-cyan-300">
                      Clicking Send Message will open your email app pre-filled and addressed to{' '}
                      <span className="font-bold">{TO_EMAIL}</span>.
                    </p>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    className="relative w-full overflow-hidden flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl
                      bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600
                      hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500
                      disabled:opacity-70 disabled:cursor-not-allowed
                      text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-blue-500/30
                      transition-all duration-300"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={isSubmitting ? {} : { x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
                    />
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Opening email client…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </Section>
  );
}
