import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

// ── Canvas Drops / Bubbles ─────────────────────────────────────────────────
interface Drop {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  hue: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  tail: number;
}

function createDrop(canvas: HTMLCanvasElement): Drop {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 200,
    r: 3 + Math.random() * 10,
    speed: 0.4 + Math.random() * 0.9,
    opacity: 0.08 + Math.random() * 0.22,
    hue: 180 + Math.random() * 100, // cyan → blue → purple
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.012 + Math.random() * 0.018,
    wobbleAmp: 0.6 + Math.random() * 1.8,
    tail: 0.5 + Math.random() * 1.2,
  };
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init drops
    const COUNT = Math.min(55, Math.floor((canvas.width * canvas.height) / 18000));
    dropsRef.current = Array.from({ length: COUNT }, () => {
      const d = createDrop(canvas);
      d.y = Math.random() * canvas.height; // scatter initial Y
      return d;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dropsRef.current.forEach((d, i) => {
        // Move up
        d.wobble += d.wobbleSpeed;
        d.y -= d.speed;
        d.x += Math.sin(d.wobble) * d.wobbleAmp * 0.4;

        // Reset when off-screen
        if (d.y + d.r < -20) {
          dropsRef.current[i] = createDrop(canvas);
          return;
        }

        // Fade in near bottom, fade out near top
        const fadeIn = Math.min(1, (canvas.height - d.y) / 120);
        const fadeOut = Math.min(1, d.y / 100);
        const alpha = d.opacity * fadeIn * fadeOut;
        if (alpha <= 0) return;

        ctx.save();
        ctx.globalAlpha = alpha;

        // Glow
        ctx.shadowBlur = d.r * 3.5;
        ctx.shadowColor = `hsla(${d.hue}, 90%, 65%, 0.6)`;

        // Teardrop path
        ctx.beginPath();
        const cx = d.x;
        const cy = d.y;
        const rx = d.r;
        const ry = d.r * (1.4 + Math.abs(Math.sin(d.wobble)) * 0.3);

        // Draw teardrop: ellipse body + pointed top
        ctx.save();
        ctx.translate(cx, cy);

        // Ellipse body
        ctx.beginPath();
        ctx.ellipse(0, ry * 0.15, rx * 0.78, ry * 0.78, 0, 0, Math.PI * 2);

        // Gradient fill
        const grad = ctx.createRadialGradient(-rx * 0.25, -ry * 0.25, 0, 0, 0, rx * 1.4);
        grad.addColorStop(0, `hsla(${d.hue}, 100%, 85%, 0.9)`);
        grad.addColorStop(0.5, `hsla(${d.hue}, 85%, 60%, 0.6)`);
        grad.addColorStop(1, `hsla(${d.hue + 20}, 70%, 40%, 0.1)`);
        ctx.fillStyle = grad;
        ctx.fill();

        // Tiny specular highlight
        ctx.beginPath();
        ctx.ellipse(-rx * 0.28, -ry * 0.3, rx * 0.2, rx * 0.13, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue}, 100%, 95%, 0.55)`;
        ctx.fill();

        ctx.restore();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>

      {/* ── Layer 1: Deep gradient base ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/70 dark:from-[#020818] dark:via-[#050e24] dark:to-[#030b1a]" />

      {/* ── Layer 2: Large morphing blobs ── */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1.1, 1],
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          rotate: [0, 60, 120, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full blur-[80px] opacity-40 dark:opacity-20"
        style={{ background: 'radial-gradient(circle, #22d3ee55, #3b82f640, transparent 70%)' }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.3, 1.2],
          x: [0, -50, 30, 0],
          y: [0, 40, -20, 0],
          rotate: [0, -80, -40, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-1/4 -right-1/4 w-[65%] h-[65%] rounded-full blur-[80px] opacity-30 dark:opacity-15"
        style={{ background: 'radial-gradient(circle, #a855f755, #6366f140, transparent 70%)' }}
      />
      <motion.div
        animate={{
          scale: [0.9, 1.2, 0.9],
          x: [0, 60, -40, 0],
          y: [0, -60, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute top-1/3 right-1/4 w-[45%] h-[45%] rounded-full blur-[70px] opacity-20 dark:opacity-10"
        style={{ background: 'radial-gradient(circle, #0ea5e955, #06b6d440, transparent 70%)' }}
      />

      {/* ── Layer 3: Dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Layer 4: Canvas drops ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70 dark:opacity-80"
      />

      {/* ── Layer 5: Floating rings ── */}
      {[
        { size: 340, top: '10%', left: '5%', dur: 16, delay: 0, color: 'cyan' },
        { size: 200, top: '55%', left: '70%', dur: 20, delay: 3, color: 'purple' },
        { size: 140, top: '75%', left: '20%', dur: 14, delay: 7, color: 'blue' },
        { size: 90,  top: '25%', left: '80%', dur: 12, delay: 2, color: 'cyan' },
      ].map((ring, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06], rotate: [0, 180, 360] }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: 'easeInOut', delay: ring.delay }}
          className="absolute rounded-full border"
          style={{
            width: ring.size,
            height: ring.size,
            top: ring.top,
            left: ring.left,
            borderColor:
              ring.color === 'cyan'
                ? 'rgba(34,211,238,0.18)'
                : ring.color === 'purple'
                ? 'rgba(168,85,247,0.16)'
                : 'rgba(59,130,246,0.18)',
          }}
        />
      ))}

      {/* ── Layer 6: Floating glowing sparks ── */}
      {Array.from({ length: 14 }).map((_, i) => {
        const hues = [185, 210, 265, 195, 230];
        const hue = hues[i % hues.length];
        const size = 3 + (i % 4) * 2;
        return (
          <motion.div
            key={i}
            animate={{
              y: [0, -(40 + (i % 5) * 20), 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 8), 0],
              opacity: [0, 0.6 + (i % 3) * 0.15, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + (i % 5) * 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.55,
            }}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              top: `${10 + (i * 6.2) % 80}%`,
              left: `${5 + (i * 7.1) % 90}%`,
              background: `hsl(${hue}, 90%, 70%)`,
              boxShadow: `0 0 ${size * 3}px ${size}px hsla(${hue}, 90%, 65%, 0.4)`,
            }}
          />
        );
      })}

      {/* ── Layer 7: Bottom vignette ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/60 dark:from-gray-950/80 to-transparent" />
    </div>
  );
}
