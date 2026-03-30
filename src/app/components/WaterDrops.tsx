import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface WaterDrop {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export function WaterDrops() {
  const [drops, setDrops] = useState<WaterDrop[]>([]);

  useEffect(() => {
    // Generate water drops
    const generatedDrops: WaterDrop[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 3,
      size: 2 + Math.random() * 6,
    }));
    setDrops(generatedDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute"
          style={{
            left: `${drop.x}%`,
            top: '-10%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Water Drop Shape */}
          <div
            className="relative"
            style={{
              width: drop.size * 2,
              height: drop.size * 3,
            }}
          >
            {/* Main drop body */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-blue-400/40 to-blue-500/60 dark:from-blue-300/30 dark:to-blue-400/50 rounded-full"
              style={{
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                filter: 'blur(0.5px)',
              }}
            />
            {/* Highlight */}
            <div
              className="absolute top-1 left-1/4 w-1/3 h-1/4 bg-white/40 rounded-full"
              style={{
                filter: 'blur(0.5px)',
              }}
            />
            {/* Ripple effect at bottom */}
            <motion.div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            >
              <div
                className="w-4 h-1 bg-blue-400/30 dark:bg-blue-300/20 rounded-full"
                style={{
                  filter: 'blur(1px)',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
