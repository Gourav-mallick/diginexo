import { Testimonial } from '../../types';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const gradients = [
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-violet-600',
  'from-pink-500 to-rose-600',
];

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative bg-white dark:bg-gray-800/80 rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 border border-gray-200/60 dark:border-gray-700/50 flex flex-col overflow-hidden group"
    >
      {/* Gradient top border on hover */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Subtle bg on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 rounded-2xl`} />

      {/* Quote icon */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
          <Quote className="w-5 h-5 text-white" />
        </div>
        {/* Stars */}
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>

      {/* Content */}
      <p className="relative z-10 text-gray-700 dark:text-gray-300 leading-relaxed italic text-sm flex-1 mb-5">
        "{testimonial.content}"
      </p>

      {/* Divider */}
      <div className="relative z-10 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-4 opacity-60" />

      {/* Author */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-extrabold shadow-md flex-shrink-0`}>
          {testimonial.name.charAt(0)}
        </div>

        <div>
          <p className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
            {testimonial.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {testimonial.role} · <span className="text-cyan-600 dark:text-cyan-400 font-medium">{testimonial.company}</span>
          </p>
        </div>

        {/* Diginexo client badge */}
        <div className="ml-auto flex-shrink-0">
          <span className="px-2 py-0.5 bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-700/50 rounded-full text-[10px] font-semibold text-cyan-600 dark:text-cyan-400">
            Diginexo Client
          </span>
        </div>
      </div>
    </motion.div>
  );
}
