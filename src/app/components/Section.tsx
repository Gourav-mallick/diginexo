import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/helpers';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'gradient';
}

export function Section({ 
  id, 
  title, 
  subtitle, 
  children, 
  className,
  variant = 'default' 
}: SectionProps) {
  const variantClasses = {
    default: 'bg-transparent',
    dark: 'bg-white/40 dark:bg-gray-800/30 backdrop-blur-sm',
    gradient: 'bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-800/30 dark:to-gray-900/30 backdrop-blur-sm',
  };

  return (
    <section 
      id={id}
      className={cn(
        'py-16 sm:py-20 px-4 sm:px-6 lg:px-8',
        variantClasses[variant],
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}