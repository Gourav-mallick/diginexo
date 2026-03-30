import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X } from 'lucide-react';
import { scrollToSection } from '../../utils/helpers';

export function FloatingProposalButton() {
  const [visible, setVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show button after scrolling 300px
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-show label once on first appearance
  useEffect(() => {
    if (visible && !dismissed) {
      const t = setTimeout(() => setShowLabel(true), 600);
      const t2 = setTimeout(() => setShowLabel(false), 3500);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, [visible, dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 40 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          {/* Tooltip label */}
          <AnimatePresence>
            {showLabel && (
              <motion.div
                initial={{ opacity: 0, x: 12, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-xl shadow-2xl border border-gray-700 dark:border-gray-600 whitespace-nowrap"
              >
                <span className="text-sm font-semibold">Have a Project Idea? 💡</span>
                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 dark:bg-gray-800 rotate-45 border-r border-b border-gray-700 dark:border-gray-600" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button row */}
          <div className="flex items-center gap-2">
            {/* Dismiss button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDismissed(true)}
              className="w-7 h-7 bg-gray-700/80 hover:bg-gray-600 text-gray-300 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>

            {/* Proposal button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onHoverStart={() => setShowLabel(true)}
              onHoverEnd={() => setShowLabel(false)}
              onClick={() => scrollToSection('proposal')}
              className="relative flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl shadow-2xl shadow-cyan-500/30 font-semibold text-sm transition-all duration-200"
            >
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-40"
                animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <Send className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Send Proposal</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
