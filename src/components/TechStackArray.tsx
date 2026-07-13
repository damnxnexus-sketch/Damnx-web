'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Premium Tech Data
const ALL_TECHS = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', bg: 'dark' },
  { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', bg: 'light' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', bg: 'light' },
  { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', bg: 'light' },
  { name: 'WooCommerce', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/woocommerce/woocommerce-original.svg', bg: 'light' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', bg: 'light' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', bg: 'dark' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', bg: 'dark' },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', bg: 'dark' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', bg: 'dark' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', bg: 'dark' },
  { name: 'AWS', icon: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg', bg: 'light' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', bg: 'dark' },
  { name: 'Stripe', icon: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg', bg: 'light' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', bg: 'dark' }
];

export default function PremiumTechStack() {
  return (
    <div className="relative w-full h-[80vh] min-h-[600px] bg-[#050505] flex items-center justify-center overflow-hidden font-sans">

      {/* Top Background Marquee Layer */}
      <div
        className="absolute top-12 left-0 right-0 z-0 opacity-50 flex items-center overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
        }}
      >
        <motion.div
          className="flex gap-6 md:gap-10 px-4 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
        >
          {[...ALL_TECHS, ...ALL_TECHS].map((tech, i) => (
            <div
              key={`top-${i}`}
              className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 ${tech.bg === 'light'
                ? 'bg-white/90 shadow-sm'
                : 'bg-zinc-900/50 border border-white/5 backdrop-blur-sm'
                }`}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-5 h-5 md:w-7 md:h-7 object-contain opacity-80"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Background Marquee Layer */}
      <div
        className="absolute bottom-12 left-0 right-0 z-0 opacity-50 flex items-center overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
        }}
      >
        <motion.div
          className="flex gap-6 md:gap-10 px-4 whitespace-nowrap"
          animate={{ x: [-1000, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
        >
          {[...ALL_TECHS, ...ALL_TECHS].map((tech, i) => (
            <div
              key={`bottom-${i}`}
              className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 ${tech.bg === 'light'
                ? 'bg-white/90 shadow-sm'
                : 'bg-zinc-900/50 border border-white/5 backdrop-blur-sm'
                }`}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-5 h-5 md:w-7 md:h-7 object-contain opacity-80"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Central Glassmorphic Card */}
      <div className="relative z-10 w-[85%] max-w-[480px] bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-2xl">

        {/* Sleek Badge */}
        <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full border border-zinc-800 bg-zinc-900/80">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 animate-pulse" />
          <span className="text-zinc-300 text-[10px] md:text-xs font-semibold tracking-widest uppercase">
            The Engine Room
          </span>
        </div>

        {/* Minimalist Typography */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-none mb-4">
          <span className="text-zinc-100 block mb-1">
            Digital
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 block">
            Arsenal
          </span>
        </h2>

        {/* Refined Subtitle */}
        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-[280px] mx-auto mt-2">
          Explore the modern tech stack powering industry-leading applications.
        </p>
      </div>

    </div>
  );
}