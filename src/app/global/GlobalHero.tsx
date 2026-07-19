"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function AnimatedChar({ char, delay }: { char: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden" style={{ paddingBottom: "0.05em" }}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}

function SplitText({
  text,
  baseDelay = 0,
  className = "",
}: {
  text: string;
  baseDelay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <span className={`inline ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.22em]">
          {word.split("").map((ch, ci) => {
            const delay = baseDelay + charIndex++ * 0.022;
            return <AnimatedChar key={`${wi}-${ci}`} char={ch} delay={delay} />;
          })}
        </span>
      ))}
    </span>
  );
}

export default function GlobalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#f9f8f6] flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Large ambient geometric — top right */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="pointer-events-none absolute top-0 right-0 w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(229,35,27,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Small floating elements */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-[20%] right-[12%] w-3 h-3 rounded-full bg-[#E5231B]/30"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute bottom-[30%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/20"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 pt-24 pb-20"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-px bg-[#E5231B]" />
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#0a0a0a]/50">
            Global Digital Studio
          </span>
        </motion.div>

        {/* Main headline */}
        <h1
          className="font-black text-[#0a0a0a] leading-[0.92] tracking-tight mb-10"
          style={{ fontSize: "clamp(3.2rem, 8.5vw, 9rem)" }}
        >
          <div className="overflow-hidden">
            <SplitText text="Building digital" baseDelay={0.1} />
          </div>
          <div className="overflow-hidden">
            <SplitText text="experiences for" baseDelay={0.28} />
          </div>
          <div className="overflow-hidden">
            <SplitText
              text="businesses worldwide."
              baseDelay={0.46}
              className="text-[#E5231B]"
            />
          </div>
        </h1>

        {/* Subheading + CTAs */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="max-w-lg text-base sm:text-lg text-[#0a0a0a]/55 leading-relaxed font-light"
          >
            We design, engineer, and scale websites, mobile apps, AI products, SaaS platforms, and enterprise software for ambitious companies across the globe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            className="flex flex-wrap gap-4 shrink-0"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 rounded-full bg-[#0a0a0a] px-8 py-4 text-sm font-bold text-white overflow-hidden hover:bg-[#E5231B] transition-colors duration-500"
            >
              Start Your Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1 duration-300">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/20 px-8 py-4 text-sm font-bold text-[#0a0a0a] hover:border-[#0a0a0a] transition-colors duration-300"
            >
              Explore Services
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-20 flex items-center gap-4"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-px h-12 bg-gradient-to-b from-[#0a0a0a]/20 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/30" />
          </motion.div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/30 font-semibold">
            Scroll to explore
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-6 right-6 sm:left-10 sm:right-10 h-px bg-[#0a0a0a]/8" />
    </section>
  );
}
