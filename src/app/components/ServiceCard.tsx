import { Service } from '../../types';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  // Get icon component dynamically
  const IconComponent = (Icons[service.icon as keyof typeof Icons] as LucideIcon) || Icons.Code;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      className="relative group"
    >
      <div className="relative bg-white/90 dark:bg-gray-800/70 rounded-2xl p-8 shadow-lg hover:shadow-2xl dark:hover:shadow-cyan-500/10 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-sm">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-500/5 dark:to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 dark:from-cyan-500/80 dark:to-blue-600/80 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-cyan-500/30 dark:shadow-cyan-500/20">
            <IconComponent className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {service.description}
          </p>

          {/* CTA */}
          <motion.button
            whileHover={{ x: 5 }}
            className="text-cyan-600 dark:text-cyan-400 font-medium flex items-center gap-2 group/btn"
          >
            Learn more
            <Icons.ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}