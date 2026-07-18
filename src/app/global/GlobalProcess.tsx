"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const phases = [
  {
    num: "01",
    title: "Discover",
    subtitle: "Understand before we build.",
    desc: "We start with deep discovery — stakeholder interviews, competitive analysis, user research, and technical feasibility. Every decision is grounded in data, not assumptions.",
  },
  {
    num: "02",
    title: "Design",
    subtitle: "Visual thinking before visual output.",
    desc: "Information architecture, wireframing, design systems, and high-fidelity prototypes — built with your users at the center and your brand goals in focus.",
  },
  {
    num: "03",
    title: "Develop",
    subtitle: "Clean code. Scalable systems.",
    desc: "Agile sprints, rigorous code reviews, automated testing, and continuous integration. We build for performance, security, and long-term maintainability.",
  },
  {
    num: "04",
    title: "Launch",
    subtitle: "Precise deployment. Zero anxiety.",
    desc: "Staged rollouts, infrastructure provisioning, load testing, and go-live support. We make launch day feel like just another Tuesday.",
  },
  {
    num: "05",
    title: "Scale",
    subtitle: "Growth beyond launch.",
    desc: "Post-launch analytics, performance optimization, feature iteration, and 2-year free maintenance. Your product grows with your ambition.",
  },
];

export default function GlobalProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-[#0a0a0a] py-24 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="mb-20 sm:mb-32">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5 text-[11px] font-bold tracking-[0.3em] uppercase text-white/30"
          >
            <span className="w-6 h-px bg-[#E5231B]" />
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-black text-white leading-[0.93] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
          >
            From vision
            <br />
            <span className="text-white/25">to reality.</span>
          </motion.h2>
        </div>

        {/* Phase list */}
        <div ref={containerRef} className="flex flex-col gap-0">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="group relative grid grid-cols-12 gap-6 sm:gap-12 py-12 sm:py-16 border-t border-white/10 last:border-b hover:border-white/20 transition-colors duration-500"
            >
              {/* Hover fill */}
              <motion.div
                className="absolute inset-0 -mx-6 sm:-mx-10 bg-white/[0.025] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Phase number */}
              <div className="relative col-span-2 sm:col-span-1 flex flex-col items-start pt-1">
                <span className="font-mono text-xs text-[#E5231B] font-bold">{phase.num}</span>
                <div className={`mt-3 w-px bg-white/10 flex-1 ${i < phases.length - 1 ? "block" : "hidden"}`} style={{ minHeight: 60 }} />
              </div>

              {/* Title */}
              <div className="relative col-span-10 sm:col-span-4 lg:col-span-3">
                <h3
                  className="font-black text-white leading-tight tracking-tight"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                >
                  {phase.title}
                </h3>
                <p className="mt-2 text-xs font-bold tracking-wider uppercase text-white/30">
                  {phase.subtitle}
                </p>
              </div>

              {/* Description */}
              <div className="relative col-span-12 sm:col-span-7 lg:col-span-8 pl-6 sm:pl-0">
                <p className="text-base sm:text-lg text-white/45 leading-relaxed font-light max-w-2xl">
                  {phase.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
