'use client';

import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Search, PenTool, Cpu, Code2, BugOff, Rocket, RefreshCw } from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
}

const stages: Stage[] = [
  {
    id: 1,
    title: 'DISCOVERY',
    subtitle: 'Requirement Analysis',
    description: 'Deep dive into your vision. We analyze market dynamics, user needs, and technical feasibility to architect solutions that transcend expectations.',
    icon: Search,
  },
  {
    id: 2,
    title: 'DESIGN',
    subtitle: 'UI / UX Craftsmanship',
    description: 'Where aesthetics meet psychology. Every pixel, every interaction designed to captivate users and drive engagement through intuitive experiences.',
    icon: PenTool,
  },
  {
    id: 3,
    title: 'ARCHITECTURE',
    subtitle: 'System Planning',
    description: 'Building the invisible foundation. Scalable infrastructure, optimized databases, and robust frameworks that power enterprise-grade performance.',
    icon: Cpu,
  },
  {
    id: 4,
    title: 'DEVELOPMENT',
    subtitle: 'Code Execution',
    description: 'Transforming blueprints into reality. Clean code, agile sprints, and continuous integration bring your product to life with precision engineering.',
    icon: Code2,
  },
  {
    id: 5,
    title: 'TESTING',
    subtitle: 'Quality Assurance',
    description: 'Zero tolerance for imperfection. Rigorous testing protocols, automated checks, and security audits ensure flawless functionality across all scenarios.',
    icon: BugOff,
  },
  {
    id: 6,
    title: 'DEPLOYMENT',
    subtitle: 'Launch Execution',
    description: 'Go-live with confidence. Seamless deployment pipelines, performance optimization, and infrastructure monitoring for a smooth market entry.',
    icon: Rocket,
  },
  {
    id: 7,
    title: 'EVOLUTION',
    subtitle: 'Post-Launch Support',
    description: 'Your success is our mission. Continuous optimization, feature enhancements, and 24/7 support to scale your solution as you grow.',
    icon: RefreshCw,
  }
];

const TimelineNode = ({ stage, index }: { stage: Stage; index: number }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative w-full py-8 md:py-16 flex flex-col md:flex-row items-center justify-center group">

      {/* --- DESKTOP SNAKE PATH BACKGROUND --- */}
      <div
        className={`hidden md:block absolute top-[-50%] h-full w-1/2 border-dashed border-[#3f0000] -z-10 transition-colors duration-500 group-hover:border-red-900/60
        ${isLeft
            ? 'left-[10%] border-t border-l border-b rounded-l-[120px]'
            : 'right-[10%] border-t border-r border-b rounded-r-[120px]'
          }`}
      />

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex w-full max-w-5xl items-center justify-between relative z-10">

        {isLeft ? (
          <>
            {/* Left: Phase Badge & Solid Connector */}
            <div className="flex-1 flex items-center justify-start relative">
              <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full border border-red-900/40 bg-[#050505] flex flex-col items-center justify-center shadow-2xl z-10 transition-transform duration-500 group-hover:scale-105">
                <span className="text-zinc-500 text-[10px] tracking-widest font-semibold uppercase mb-1">Phase</span>
                <span className="text-[#E6192B] text-2xl lg:text-3xl font-bold tracking-tighter">0{stage.id}</span>
              </div>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-red-900/60 to-[#E6192B] mx-4 transition-all duration-500 group-hover:from-red-600" />
            </div>

            {/* Right: Icon & Text Block */}
            <div className="flex-1 flex items-start justify-start gap-6 lg:gap-8 pl-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#E6192B] flex items-center justify-center shadow-[0_0_20px_rgba(230,25,43,0.3)] shrink-0 z-10 mt-1">
                <stage.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col text-left"
              >
                <h3 className="text-xl lg:text-2xl font-bold text-white tracking-wide uppercase mb-1">{stage.title}</h3>
                <h4 className="text-xs lg:text-sm text-zinc-400 font-medium mb-3">{stage.subtitle}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">{stage.description}</p>
              </motion.div>
            </div>
          </>
        ) : (
          <>
            {/* Left: Text Block & Icon */}
            <div className="flex-1 flex items-start justify-end gap-6 lg:gap-8 pr-4 text-right">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-end"
              >
                <h3 className="text-xl lg:text-2xl font-bold text-white tracking-wide uppercase mb-1">{stage.title}</h3>
                <h4 className="text-xs lg:text-sm text-zinc-400 font-medium mb-3">{stage.subtitle}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-sm text-right">{stage.description}</p>
              </motion.div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#E6192B] flex items-center justify-center shadow-[0_0_20px_rgba(230,25,43,0.3)] shrink-0 z-10 mt-1">
                <stage.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>

            {/* Right: Solid Connector & Phase Badge */}
            <div className="flex-1 flex items-center justify-end relative">
              <div className="flex-1 h-[1px] bg-gradient-to-l from-red-900/60 to-[#E6192B] mx-4 transition-all duration-500 group-hover:from-red-600" />
              <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full border border-red-900/40 bg-[#050505] flex flex-col items-center justify-center shadow-2xl z-10 transition-transform duration-500 group-hover:scale-105">
                <span className="text-zinc-500 text-[10px] tracking-widest font-semibold uppercase mb-1">Phase</span>
                <span className="text-[#E6192B] text-2xl lg:text-3xl font-bold tracking-tighter">0{stage.id}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex w-full items-start gap-6 px-4 z-10">

        {/* Mobile Left Column: Icon/Line */}
        <div className="flex flex-col items-center mt-2 relative shrink-0">
          <div className="w-10 h-10 rounded-full border border-red-900/50 bg-[#050505] flex flex-col items-center justify-center mb-2 shrink-0 z-10">
            <span className="text-[#E6192B] text-sm font-bold leading-none">0{stage.id}</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#E6192B] flex items-center justify-center shadow-[0_0_15px_rgba(230,25,43,0.4)] shrink-0 z-10">
            <stage.icon className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Mobile Right Column: Text Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 flex flex-col p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm pb-6"
        >
          <h3 className="text-lg font-bold text-white tracking-wide uppercase">{stage.title}</h3>
          <h4 className="text-xs text-[#E6192B] font-semibold tracking-wider mb-2 font-mono">{stage.subtitle}</h4>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">{stage.description}</p>
        </motion.div>
      </div>

    </div>
  );
};

export default function DevelopmentJourneyMinimal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 35%"]
  });

  return (
    <div className="bg-[#050505] min-h-screen relative font-sans overflow-hidden py-24 selection:bg-[#E6192B]/30 selection:text-white">

      {/* HEADER SECTION */}
      <div className="text-center mb-16 md:mb-28 flex flex-col items-center px-4 relative z-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block border border-zinc-800 rounded-full px-5 py-1.5 mb-6 bg-zinc-950/50"
        >
          <span className="text-zinc-400 text-[10px] tracking-[0.2em] uppercase font-semibold">
            The DamnX Framework
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-100 tracking-tight leading-none mb-2 uppercase"
        >
          Development
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-[#E6192B] tracking-tight leading-none mb-8 uppercase"
        >
          Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Seven stages of absolute engineering excellence. From raw vision to digital dominance. This is how we build the future.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-16 h-[2px] bg-zinc-200 rounded-full"
        />
      </div>

      {/* TIMELINE SECTION */}
      <section ref={containerRef} className="relative w-full max-w-6xl mx-auto overflow-hidden px-4 md:px-0">

        {/* Top/Bottom gradient masks for smooth fade in/out of the dashed line */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Mobile Continuous Wavy 'Rope' Path */}
        <div className="absolute left-[35px] top-16 bottom-36 w-[10px] md:hidden pointer-events-none z-0">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 10 100">
            {/* Background Rope Track */}
            <path
              d="M 5 0 C 8 5, 2 10, 5 15 C 8 20, 2 25, 5 30 C 8 35, 2 40, 5 45 C 8 50, 2 55, 5 60 C 8 65, 2 70, 5 75 C 8 80, 2 85, 5 90 C 8 95, 2 100, 5 100"
              fill="none"
              stroke="#221212"
              strokeWidth="1.5"
            />
            {/* Animated Active Glowing Rope */}
            <motion.path
              d="M 5 0 C 8 5, 2 10, 5 15 C 8 20, 2 25, 5 30 C 8 35, 2 40, 5 45 C 8 50, 2 55, 5 60 C 8 65, 2 70, 5 75 C 8 80, 2 85, 5 90 C 8 95, 2 100, 5 100"
              fill="none"
              stroke="#E6192B"
              strokeWidth="1.5"
              style={{ pathLength: scrollYProgress }}
              className="drop-shadow-[0_0_4px_rgba(230,25,43,0.8)]"
            />
          </svg>
        </div>

        <div className="relative z-0 pt-8 pb-8">
          {stages.map((stage, index) => (
            <TimelineNode key={stage.id} stage={stage} index={index} />
          ))}
        </div>
      </section>

    </div>
  );
}