import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Sprinkle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  width: number;
  height: number;
  delay: number;
}

export function Sprinkles() {
  const [sprinkles, setSprinkles] = useState<Sprinkle[]>([]);
  const [hoveredSprinkles, setHoveredSprinkles] = useState<Set<number>>(new Set());

  const colors = [
    'bg-pink-400',
    'bg-yellow-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-purple-400',
    'bg-orange-400',
    'bg-red-400',
    'bg-teal-400',
  ];

  useEffect(() => {
    // Generate sprinkles
    const generatedSprinkles: Sprinkle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      width: 3 + Math.random() * 5,
      height: 10 + Math.random() * 15,
      delay: Math.random() * 2,
    }));
    setSprinkles(generatedSprinkles);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    sprinkles.forEach((sprinkle) => {
      const sprinkleX = (sprinkle.x / 100) * rect.width;
      const sprinkleY = (sprinkle.y / 100) * rect.height;
      const distance = Math.sqrt(
        Math.pow(mouseX - sprinkleX, 2) + Math.pow(mouseY - sprinkleY, 2)
      );

      if (distance < 100) {
        setHoveredSprinkles((prev) => new Set(prev).add(sprinkle.id));
        setTimeout(() => {
          setHoveredSprinkles((prev) => {
            const next = new Set(prev);
            next.delete(sprinkle.id);
            return next;
          });
        }, 800);
      }
    });
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'auto' }}
    >
      {sprinkles.map((sprinkle) => {
        const isHovered = hoveredSprinkles.has(sprinkle.id);

        return (
          <motion.div
            key={sprinkle.id}
            className={`absolute ${sprinkle.color} rounded-full opacity-30 dark:opacity-20`}
            style={{
              left: `${sprinkle.x}%`,
              top: `${sprinkle.y}%`,
              width: sprinkle.width,
              height: sprinkle.height,
              rotate: sprinkle.rotation,
            }}
            initial={{ scale: 1, opacity: 0.3 }}
            animate={
              isHovered
                ? {
                    scale: [1, 2, 1.5, 1],
                    rotate: [sprinkle.rotation, sprinkle.rotation + 180, sprinkle.rotation],
                    opacity: [0.3, 0.8, 0.6, 0.3],
                    y: [0, -20, -10, 0],
                  }
                : {
                    scale: 1,
                    rotate: sprinkle.rotation,
                    opacity: 0.3,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            {/* Add a glow effect when hovered */}
            {isHovered && (
              <motion.div
                className={`absolute inset-0 ${sprinkle.color} rounded-full`}
                style={{ filter: 'blur(8px)' }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 3, opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Floating animations for some sprinkles */}
      {sprinkles.slice(0, 20).map((sprinkle) => (
        <motion.div
          key={`float-${sprinkle.id}`}
          className={`absolute ${sprinkle.color} rounded-full opacity-20 dark:opacity-10`}
          style={{
            left: `${sprinkle.x}%`,
            top: `${sprinkle.y}%`,
            width: sprinkle.width * 0.7,
            height: sprinkle.height * 0.7,
            rotate: sprinkle.rotation + 45,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: sprinkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
