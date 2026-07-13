'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Palette, Layout, Code2 } from 'lucide-react';

const WORDS = ['UI/UX', 'WEBSITES', 'MOBILE APPS', 'SOFTWARE', 'BRANDING'];

const SERVICES = [
  { icon: Globe,       label: 'Websites'    },
  { icon: Smartphone,  label: 'Mobile Apps' },
  { icon: Palette,     label: 'UI/UX Design'},
  { icon: Layout,      label: 'Branding'    },
  { icon: Code2,       label: 'Software'    },
];

// Fixed positions relative to the robot image container
const ORBIT_POSITIONS = [
  { top: '-8%',  right: '-22%'  },   // top-right
  { top: '28%',  left:  '-24%'  },   // mid-left
  { bottom: '2%', right: '-18%' },   // bottom-right
  { top: '5%',   left:  '-16%'  },   // top-left
  { bottom: '20%', left: '-8%'  },   // bottom-left
];

export default function VideoHeroSection() {
  const [currentWord, setCurrentWord]     = useState(0);
  const [mouse, setMouse]                 = useState({ x: 0, y: 0 });

  // Rotate heading word every 3.5 s
  useEffect(() => {
    const id = setInterval(() => setCurrentWord(p => (p + 1) % WORDS.length), 3500);
    return () => clearInterval(id);
  }, []);

  // Subtle mouse parallax on the robot
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden font-sans">

      {/* ─── RING 1 — left edge, top half ─── */}
      <motion.img
        src="/ring1.png"
        alt=""
        aria-hidden
        className="absolute top-[5%] -left-[18%] sm:-left-[12%] lg:-left-[8%] w-[55vw] sm:w-[40vw] lg:w-[30vw] max-w-[480px] pointer-events-none select-none"
        style={{ opacity: 0.55, mixBlendMode: 'screen' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      />

      {/* ─── RING 2 — right edge, bottom half ─── */}
      <motion.img
        src="/ring2.png"
        alt=""
        aria-hidden
        className="absolute bottom-[-8%] -right-[18%] sm:-right-[12%] lg:-right-[8%] w-[65vw] sm:w-[48vw] lg:w-[36vw] max-w-[580px] pointer-events-none select-none"
        style={{ opacity: 0.55, mixBlendMode: 'screen' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
      />

      {/* ─── Ambient red glow ─── */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[700px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(229,35,27,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      {/* ─── Main two-column grid ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center py-28 lg:py-0">

        {/* ══════════ LEFT — TYPOGRAPHY ══════════ */}
        <motion.div
          className="flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Eyebrow */}
          <p className="text-zinc-400 text-sm md:text-base tracking-[0.22em] uppercase font-semibold mb-3">
            We Build
          </p>

          {/* ── Rotating keyword ── 
              Uses a fixed min-height so the text block below never jumps.
              `overflow: visible` lets the very large text breathe upward. */}
          <div className="relative w-full mb-3" style={{ minHeight: 'clamp(72px, 14vw, 150px)' }}>
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentWord}
                initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)'  }}
                exit  ={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute inset-x-0 top-0 text-[clamp(52px,10vw,120px)] font-black text-[#E5231B] leading-none tracking-tighter whitespace-nowrap"
                style={{ lineHeight: 1 }}
              >
                {WORDS[currentWord]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Sub-headline */}
          <p className="text-zinc-200 text-lg sm:text-xl md:text-2xl font-light tracking-[0.12em] uppercase mb-7">
            That Dominate the Digital World
          </p>

          {/* Divider */}
          <div className="w-14 h-[3px] bg-white rounded-full mb-7" />

          {/* Body */}
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-[420px]">
            We transform bold ideas into exceptional digital experiences. From concept to deployment, we build solutions that set new standards.
          </p>
        </motion.div>

        {/* ══════════ RIGHT — ROBOT + FLOATING ICONS ══════════ */}
        <motion.div
          className="relative flex justify-center items-center h-[380px] sm:h-[460px] lg:h-[580px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, type: 'spring', stiffness: 80 }}
        >
          {/* Red spotlight behind robot */}
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(229,35,27,0.25) 0%, transparent 70%)',
              filter: 'blur(32px)',
              animation: 'pulseGlow 4s ease-in-out infinite',
            }}
          />

          {/* Robot — mouse-parallax wrapper */}
          <div
            className="relative z-10"
            style={{
              transform: `perspective(900px) rotateX(${mouse.y * 0.25}deg) rotateY(${mouse.x * 0.25}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <img
              src="/robo.png"
              alt="DamnX AI Mascot"
              className="w-full max-w-[260px] sm:max-w-[310px] lg:max-w-[400px] h-auto object-contain"
              style={{
                filter: 'drop-shadow(0 24px 48px rgba(229,35,27,0.2))',
                animation: 'robotFloat 6s ease-in-out infinite',
              }}
            />

            {/* ── Floating service icon badges ── */}
            {SERVICES.map((svc, i) => {
              const pos = ORBIT_POSITIONS[i];
              const Icon = svc.icon;
              return (
                <div
                  key={svc.label}
                  className="absolute w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px]"
                  style={{
                    ...pos,
                    animation: `badge${i} ${7 + i * 0.6}s ease-in-out infinite`,
                    animationDelay: `${i * 0.45}s`,
                  }}
                >
                  <div className="w-full h-full rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-xl flex flex-col items-center justify-center gap-1 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                    <Icon size={18} className="text-[#E5231B]" strokeWidth={1.6} />
                    <span className="text-zinc-400 text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-center leading-tight px-0.5">
                      {svc.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom gradient fade into next section ─── */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-36 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to top, #050505 0%, transparent 100%)' }}
      />

      {/* ─── Keyframe animations (scoped via global-style injection) ─── */}
      <style>{`
        @keyframes robotFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-18px); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1);   }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.15); }
        }

        /* Per-badge float paths — each slightly different for organic feel */
        @keyframes badge0 {
          0%,100% { transform: translate(0,   0px);  }
          50%     { transform: translate(4px, -14px); }
        }
        @keyframes badge1 {
          0%,100% { transform: translate(0,   0px); }
          50%     { transform: translate(-6px,-10px); }
        }
        @keyframes badge2 {
          0%,100% { transform: translate(0,  0px); }
          50%     { transform: translate(5px,-12px); }
        }
        @keyframes badge3 {
          0%,100% { transform: translate(0,  0px); }
          50%     { transform: translate(-4px,-8px); }
        }
        @keyframes badge4 {
          0%,100% { transform: translate(0,  0px); }
          50%     { transform: translate(3px,-11px); }
        }
      `}</style>
    </section>
  );
}