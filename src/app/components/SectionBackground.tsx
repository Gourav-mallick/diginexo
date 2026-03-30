import { useEffect, useRef, RefObject } from 'react';
import { motion } from 'motion/react';

interface SectionBackgroundProps {
  variant?: 'teal' | 'indigo';
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
  type: 'orb' | 'ring' | 'dot';
}

function createParticle(canvas: HTMLCanvasElement, hueBase: number): Particle {
  const types: Particle['type'][] = ['orb', 'orb', 'orb', 'ring', 'dot', 'dot'];
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 4 + Math.random() * 14,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    opacity: 0.06 + Math.random() * 0.18,
    hue: hueBase + (Math.random() - 0.5) * 50,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.008 + Math.random() * 0.015,
    type: types[Math.floor(Math.random() * types.length)],
  };
}

function useCanvasParticles(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  hueBase: number
) {
  const particlesRef = useRef<Particle[]>([]);
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

    const COUNT = Math.min(45, Math.floor((canvas.width * canvas.height) / 22000));
    particlesRef.current = Array.from({ length: COUNT }, () => createParticle(canvas, hueBase));

    // Connection lines between close particles
    function drawConnections(particles: Particle[]) {
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.06;
            ctx!.save();
            ctx!.globalAlpha = alpha;
            ctx!.strokeStyle = `hsl(${(a.hue + b.hue) / 2}, 80%, 65%)`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
            ctx!.restore();
          }
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Draw connections
      drawConnections(particles);

      // Draw each particle
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Bounce walls
        if (p.x < -p.r) p.x = canvas.width + p.r;
        if (p.x > canvas.width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = canvas.height + p.r;
        if (p.y > canvas.height + p.r) p.y = -p.r;

        const pulsedR = p.r * (1 + Math.sin(p.pulse) * 0.2);
        const alpha = p.opacity * (0.8 + Math.sin(p.pulse) * 0.2);

        ctx.save();
        ctx.globalAlpha = alpha;

        if (p.type === 'orb') {
          ctx.shadowBlur = pulsedR * 4;
          ctx.shadowColor = `hsla(${p.hue}, 85%, 65%, 0.5)`;
          const grad = ctx.createRadialGradient(
            p.x - pulsedR * 0.3, p.y - pulsedR * 0.3, 0,
            p.x, p.y, pulsedR
          );
          grad.addColorStop(0, `hsla(${p.hue}, 100%, 85%, 0.9)`);
          grad.addColorStop(0.5, `hsla(${p.hue}, 85%, 60%, 0.5)`);
          grad.addColorStop(1, `hsla(${p.hue + 20}, 70%, 40%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulsedR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        } else if (p.type === 'ring') {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsla(${p.hue}, 85%, 65%, 0.4)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulsedR, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 70%, 0.6)`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, 0.6)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1.5, pulsedR * 0.35), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, 0.9)`;
          ctx.fill();
        }

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [hueBase]);
}

// ── About Section Background (warm teal/emerald feel) ─────────────────────
export function AboutSectionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasParticles(canvasRef, 175); // cyan-teal hues

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base */}
      <div className="absolute inset-0 bg-white dark:bg-gray-950" />

      {/* Morphing blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 30, -20, 0], y: [0, -20, 15, 0], rotate: [0, 45, 90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[90px] opacity-30 dark:opacity-10"
        style={{ background: 'radial-gradient(circle, #06b6d440, #22d3ee30, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.2, 1.1], x: [0, -40, 20, 0], y: [0, 30, -15, 0], rotate: [0, -60, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full blur-[90px] opacity-25 dark:opacity-10"
        style={{ background: 'radial-gradient(circle, #6366f135, #8b5cf625, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [0.9, 1.15, 0.9], rotate: [0, 120, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 dark:opacity-8"
        style={{ background: 'radial-gradient(circle, #10b98120, #06b6d415, transparent 70%)' }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-55 dark:opacity-60" />

      {/* Floating accent rings */}
      {[
        { size: 280, top: '8%', right: '5%', dur: 18, delay: 0 },
        { size: 160, bottom: '15%', left: '8%', dur: 22, delay: 4 },
        { size: 80, top: '45%', right: '20%', dur: 14, delay: 2 },
      ].map((ring, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05], rotate: [0, 360] }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear', delay: ring.delay }}
          className="absolute rounded-full border border-cyan-400/20 dark:border-cyan-500/15"
          style={{ width: ring.size, height: ring.size, ...ring }}
        />
      ))}
    </div>
  );
}

// ── Services Section Background (blue/indigo/purple feel) ─────────────────
export function ServicesSectionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasParticles(canvasRef, 220); // blue-indigo-purple hues

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Morphing blobs */}
      <motion.div
        animate={{ scale: [1, 1.25, 1.05, 1], x: [0, 50, -30, 0], y: [0, -40, 25, 0], rotate: [0, 70, 140, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[100px] opacity-25 dark:opacity-10"
        style={{ background: 'radial-gradient(circle, #3b82f640, #06b6d430, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1.15, 1, 1.2, 1.15], x: [0, -60, 35, 0], y: [0, 45, -25, 0], rotate: [0, -90, -45, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 dark:opacity-8"
        style={{ background: 'radial-gradient(circle, #a855f740, #6366f130, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 30, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute top-1/3 right-1/3 w-[350px] h-[350px] rounded-full blur-[80px] opacity-15 dark:opacity-6"
        style={{ background: 'radial-gradient(circle, #0ea5e930, #8b5cf620, transparent 70%)' }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 dark:opacity-55" />

      {/* Floating accent rings */}
      {[
        { size: 320, top: '5%', right: '3%', dur: 20, delay: 0, color: 'rgba(99,102,241,0.14)' },
        { size: 200, bottom: '10%', left: '5%', dur: 24, delay: 5, color: 'rgba(139,92,246,0.12)' },
        { size: 110, top: '50%', left: '45%', dur: 16, delay: 2, color: 'rgba(59,130,246,0.15)' },
        { size: 70,  top: '20%', left: '25%', dur: 12, delay: 7, color: 'rgba(6,182,212,0.14)' },
      ].map((ring, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5], rotate: [0, 360] }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear', delay: ring.delay }}
          className="absolute rounded-full border"
          style={{
            width: ring.size,
            height: ring.size,
            borderColor: ring.color,
            top: 'top' in ring ? ring.top : undefined,
            bottom: 'bottom' in ring ? ring.bottom : undefined,
            left: 'left' in ring ? ring.left : undefined,
            right: 'right' in ring ? ring.right : undefined,
          }}
        />
      ))}

      {/* Glowing sparks */}
      {Array.from({ length: 10 }).map((_, i) => {
        const hues = [220, 250, 265, 200, 280];
        const hue = hues[i % hues.length];
        const size = 3 + (i % 3) * 2;
        return (
          <motion.div
            key={i}
            animate={{
              y: [0, -(30 + (i % 4) * 15), 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 6), 0],
              opacity: [0, 0.5 + (i % 3) * 0.15, 0],
              scale: [0.5, 1.3, 0.5],
            }}
            transition={{
              duration: 3.5 + (i % 5) * 1.1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.6,
            }}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              top: `${8 + (i * 9.1) % 84}%`,
              left: `${4 + (i * 11.3) % 92}%`,
              background: `hsl(${hue}, 85%, 72%)`,
              boxShadow: `0 0 ${size * 3}px ${size}px hsla(${hue}, 85%, 65%, 0.35)`,
            }}
          />
        );
      })}
    </div>
  );
}