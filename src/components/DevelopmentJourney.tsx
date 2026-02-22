'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useChat } from '@/app/context/ChatContext';
import { Search, PenTool, Cpu, Code2, BugOff, Rocket, RefreshCw } from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  imageUrl: string;
}

const stages: Stage[] = [
  {
    id: 1,
    title: 'DISCOVERY',
    subtitle: 'Requirement Analysis',
    description: 'Deep dive into your vision. We analyze market dynamics, user needs, and technical feasibility to architect solutions that transcend expectations.',
    icon: Search,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
  },
  {
    id: 2,
    title: 'DESIGN',
    subtitle: 'UI / UX Craftsmanship',
    description: 'Where aesthetics meet psychology. Every pixel, every interaction designed to captivate users and drive engagement through intuitive experiences.',
    icon: PenTool,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
  },
  {
    id: 3,
    title: 'ARCHITECTURE',
    subtitle: 'System Planning',
    description: 'Building the invisible foundation. Scalable infrastructure, optimized databases, and robust frameworks that power enterprise-grade performance.',
    icon: Cpu,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
  },
  {
    id: 4,
    title: 'DEVELOPMENT',
    subtitle: 'Code Execution',
    description: 'Transforming blueprints into reality. Clean code, agile sprints, and continuous integration bring your product to life with precision engineering.',
    icon: Code2,
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80'
  },
  {
    id: 5,
    title: 'TESTING',
    subtitle: 'Quality Assurance',
    description: 'Zero tolerance for imperfection. Rigorous testing protocols, automated checks, and security audits ensure flawless functionality across all scenarios.',
    icon: BugOff,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
  },
  {
    id: 6,
    title: 'DEPLOYMENT',
    subtitle: 'Launch Execution',
    description: 'Go-live with confidence. Seamless deployment pipelines, performance optimization, and infrastructure monitoring for a smooth market entry.',
    icon: Rocket,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
  },
  {
    id: 7,
    title: 'EVOLUTION',
    subtitle: 'Post-Launch Support',
    description: 'Your success is our mission. Continuous optimization, feature enhancements, and 24/7 support to scale your solution as you grow.',
    icon: RefreshCw,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80'
  }
];

const TimelineNode = ({ stage, index }: { stage: Stage; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between w-full mb-24 md:mb-32 group">

      {/* THE GLOWING NODE (Center on Desktop, Left on Mobile) 
        Positioned absolutely to sit perfectly on the tracking line.
      */}
      <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black border-2 border-zinc-800 group-hover:border-red-600 transition-colors duration-500 flex items-center justify-center relative shadow-[0_0_0_0_rgba(220,38,38,0)] group-hover:shadow-[0_0_30px_0_rgba(220,38,38,0.4)]"
        >
          <stage.icon className="w-5 h-5 md:w-6 md:h-6 text-zinc-500 group-hover:text-red-500 transition-colors duration-500" />

          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-full border border-red-500/0 group-hover:animate-ping opacity-20" />
        </motion.div>
      </div>

      {/* CONTENT BLOCK (Alternates Left/Right on Desktop, always Right on Mobile) 
      */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`w-full md:w-[45%] pl-20 md:pl-0 flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} ${isEven ? 'md:order-1' : 'md:order-2'}`}
      >
        <div className="mb-2">
          <span className="text-red-600 font-mono text-sm md:text-base font-bold tracking-widest">
            PHASE 0{stage.id}
          </span>
        </div>
        <h3 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
          {stage.title}
        </h3>
        <h4 className="text-lg md:text-xl text-zinc-400 font-medium mb-4">
          {stage.subtitle}
        </h4>
        <p className="text-base md:text-lg text-zinc-500 leading-relaxed bg-white/[0.02] border border-white/5 p-5 md:p-6 rounded-2xl backdrop-blur-sm">
          {stage.description}
        </p>
      </motion.div>

      {/* IMAGE BLOCK (Alternates Right/Left on Desktop, hidden on very small screens, shown on tablet+) 
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: isEven ? 10 : -10 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, type: "spring" }}
        className={`hidden sm:block w-full md:w-[45%] pl-20 md:pl-0 mt-8 md:mt-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}
      >
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 group-hover:border-red-500/30 transition-colors duration-500 shadow-2xl">
          <Image
            src={stage.imageUrl}
            alt={stage.title}
            fill
            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      </motion.div>

    </div>
  );
};

export default function DevelopmentJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toggleChat } = useChat();

  // Tracks the scroll progress specifically within the timeline area
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  // Smooths out the line filling animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Intro Parallax
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-[#030303] min-h-screen relative font-sans overflow-hidden">

      {/* Grainy Noise Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* HERO SECTION */}
      <motion.section
        style={{ y: headerY, opacity: headerOpacity }}
        className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 text-center z-10 max-w-5xl mx-auto"
      >
        <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full mb-8">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-500 text-xs md:text-sm font-bold tracking-widest uppercase">
            The DamnX Framework
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
          DEVELOPMENT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-900">
            JOURNEY
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Seven stages of absolute engineering excellence. From raw vision to digital dominance. This is how we build the future.
        </p>
      </motion.section>

      {/* TIMELINE SECTION */}
      <section ref={containerRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* The Track Line (Background) */}
        <div className="absolute left-[44px] md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-900 -translate-x-1/2" />

        {/* The Animated Red Progress Line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-[44px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500 via-red-600 to-red-900 origin-top -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
        />

        {/* The Stages */}
        <div className="relative z-20 pt-10">
          {stages.map((stage, index) => (
            <TimelineNode key={stage.id} stage={stage} index={index} />
          ))}
        </div>
      </section>

      {/* OUTRO / CTA SECTION */}
      <section className="relative py-32 px-6 text-center z-10">
        <div className="absolute inset-0 bg-red-600/5 blur-[100px] rounded-full max-w-3xl mx-auto" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            READY TO BUILD <br />
            <span className="text-red-600">SOMETHING DAMN GREAT?</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-10">
            Let's bypass the templates and engineer a custom digital product that leaves your competition in the dust.
          </p>

          <button
            onClick={toggleChat}
            className="group relative px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-widest overflow-hidden rounded-lg transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              Start Your Journey <Rocket className="w-4 h-4" />
            </span>
          </button>
        </motion.div>
      </section>

    </div>
  );
}