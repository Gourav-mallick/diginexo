import { Section } from '../components/Section';
import { TestimonialCard } from '../components/TestimonialCard';
import { TESTIMONIALS } from '../../constants';
import { motion } from 'motion/react';
import { scrollToSection } from '../../utils/helpers';
import { Star, Users } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <Section
      id="testimonials"
      title=""
      variant="gradient"
    >
      {/* Custom header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-full mb-5"
        >
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
          <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400 tracking-widest uppercase">
            Client Stories
          </span>
        </motion.span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-3 tracking-tight">
          What Clients Say About{' '}
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Diginexo
          </span>
        </h2>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto px-2 sm:px-0">
          Real feedback from businesses and founders who partnered with Diginexo to bring their ideas to life.
        </p>

        {/* Rating row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-5"
        >
          <div className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100 ml-1">5.0</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">rating</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
            <Users className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">100%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">client satisfaction</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {TESTIMONIALS.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-12 sm:mt-16 p-6 sm:p-8 bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/60 dark:border-gray-700/40"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-white font-extrabold text-sm">D</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Ready to be our next success story?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-sm sm:text-base mb-5">
          Diginexo is always excited to partner with new businesses and founders. Let's build something exceptional together.
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollToSection('proposal')}
          className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
        >
          Start a Project with Diginexo →
        </motion.button>
      </motion.div>
    </Section>
  );
}
