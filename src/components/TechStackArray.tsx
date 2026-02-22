'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// Premium Tech Data (30 Items split perfectly 15/15 for two wheels)
const ALL_TECHS = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', invert: false },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', invert: false },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', invert: false },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', invert: false },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', invert: false },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', invert: false },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', invert: false },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', invert: false },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', invert: false },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', invert: false },
  { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', invert: false },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', invert: false },
  { name: 'AWS', icon: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg', invert: true },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', invert: false },
  { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', invert: false },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', invert: false },
  { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', invert: false },
  { name: 'iOS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg', invert: true },
  { name: 'Shopify', icon: 'https://cdn.worldvectorlogo.com/logos/shopify.svg', invert: false },
  { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', invert: true },
  { name: 'WooCommerce', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/woocommerce/woocommerce-original.svg', invert: false },
  { name: 'Stripe', icon: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg', invert: false },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', invert: false },
  { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg', invert: false },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', invert: true },
  { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg', invert: false },
  { name: 'Google Ads', icon: 'https://cdn.worldvectorlogo.com/logos/google-ads-1.svg', invert: false },
  { name: 'Meta', icon: 'https://cdn.worldvectorlogo.com/logos/meta-1.svg', invert: true },
  { name: 'Analytics', icon: 'https://cdn.worldvectorlogo.com/logos/google-analytics-1.svg', invert: false }
];

const LEFT_TECHS = ALL_TECHS.slice(0, 15);
const RIGHT_TECHS = ALL_TECHS.slice(15);

// --- Individual Node Component to isolate the counter-rotation logic ---
const TechNode = ({
  tech,
  index,
  total,
  wheelRotation
}: {
  tech: typeof ALL_TECHS[0];
  index: number;
  total: number;
  wheelRotation: MotionValue<number>;
}) => {
  // Calculate fixed angle for this item around the circle
  const angle = (index / total) * 360;

  // The Magic Formula: To keep the icon perfectly upright, we must rotate it by 
  // the exact negative of the wheel's rotation, minus its static position angle.
  const counterRotation = useTransform(wheelRotation, (r) => -r - angle);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      {/* Position at the very top center of the wheel container */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">

        {/* Counter-Rotating Container */}
        <motion.div style={{ rotate: counterRotation }}>

          {/* Glassmorphic Icon Card */}
          <div className="group relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-zinc-950 border border-white/10 hover:border-red-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300 hover:scale-110 hover:z-50 cursor-pointer">

            <img
              src={tech.icon}
              alt={tech.name}
              className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain transition-transform duration-300 group-hover:scale-110 ${tech.invert ? 'invert opacity-80 group-hover:opacity-100' : ''}`}
              loading="lazy"
            />

            {/* Tooltip */}
            <div className="absolute top-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded tracking-wider whitespace-nowrap shadow-xl">
                {tech.name}
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-red-600" />
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

// --- The Wheel Component ---
const ScrollWheel = ({ side, techs, progress }: { side: 'left' | 'right'; techs: typeof ALL_TECHS; progress: MotionValue<number> }) => {
  const isLeft = side === 'left';

  // Left spins clockwise (0 -> 360), Right spins counter-clockwise (0 -> -360)
  const rawRotation = useTransform(progress, [0, 1], [0, isLeft ? 360 : -360]);

  // Spring physics for buttery smooth scrolling
  const smoothRotation = useSpring(rawRotation, { stiffness: 50, damping: 20, mass: 0.2 });

  // Responsive Sizing & Positioning
  // Mobile: 600px diameter, shifted 240px off screen (leaving 60px peeking)
  // Desktop: 1100px diameter, shifted 400px off screen (leaving 150px peeking)
  const sizeClasses = "w-[600px] h-[600px] md:w-[900px] md:h-[900px] lg:w-[1100px] lg:h-[1100px]";
  const positionClasses = isLeft
    ? "-left-[240px] md:-left-[350px] lg:-left-[400px]"
    : "-right-[240px] md:-right-[350px] lg:-right-[400px]";

  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${sizeClasses} ${positionClasses} z-20`}>

      {/* Decorative Outer Rings */}
      <div className="absolute inset-0 rounded-full border border-white/5 bg-black/40 backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(220,38,38,0.05)]" />
      <div className="absolute inset-6 md:inset-10 rounded-full border border-dashed border-red-500/20" />
      <div className="absolute inset-16 md:inset-24 rounded-full border border-white/5 bg-zinc-950/80 shadow-[0_0_50px_rgba(0,0,0,0.5)]" />

      {/* The Rotating Anchor */}
      <motion.div style={{ rotate: smoothRotation }} className="w-full h-full relative">
        {techs.map((tech, i) => (
          <TechNode
            key={tech.name}
            tech={tech}
            index={i}
            total={techs.length}
            wheelRotation={smoothRotation}
          />
        ))}
      </motion.div>

    </div>
  );
};

// --- Main Section ---
export default function PremiumTechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tracks scroll progress across the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Center text parallax fade
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    // Height set to 300vh to give the user plenty of scroll time to spin the wheels
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#030303]">

      {/* The Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Gradient Mask to fade the wheels out at the top and bottom edges smoothly */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          {/* Glowing Background Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-red-600/20 blur-[120px] rounded-full" />

          {/* The Left and Right Wheels */}
          <ScrollWheel side="left" techs={LEFT_TECHS} progress={scrollYProgress} />
          <ScrollWheel side="right" techs={RIGHT_TECHS} progress={scrollYProgress} />
        </div>

        {/* Center Typography (Highest Z-Index) */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-30 text-center max-w-2xl px-4 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 md:mb-8 rounded-full border border-red-500/30 bg-zinc-950/80 backdrop-blur-md shadow-xl">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-zinc-300 text-xs md:text-sm font-bold tracking-widest uppercase">
              The Engine Room
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6 md:mb-8 drop-shadow-2xl">
            Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-900">
              Arsenal
            </span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md mx-auto">
            Engineered with the world's most elite frameworks. Scroll down to explore the high-performance architecture powering DamnX solutions.
          </p>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center mt-12 md:mt-16 opacity-50">
            <span className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-4">Scroll to Spin</span>
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-16 bg-gradient-to-b from-red-600 to-transparent"
            />
          </div>
        </motion.div>

        {/* Subtle Edge Shadows to hide wheel clipping */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-20 bg-gradient-to-r from-[#030303] to-transparent z-40 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-20 bg-gradient-to-l from-[#030303] to-transparent z-40 pointer-events-none" />

      </div>
    </div>
  );
}