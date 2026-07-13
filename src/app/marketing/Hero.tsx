"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Star, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stats = [
  { icon: TrendingUp, value: "200+", label: "Brands Grown" },
  { icon: Users, value: "3×", label: "Avg ROI" },
  { icon: Star, value: "98%", label: "Client Retention" },
];

export default function HeroMarketing() {
  return (
    <section className="relative overflow-hidden bg-black min-h-screen flex items-center">
      {/* Top red accent bar */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-[#E5231B]" />

      {/* Background graphic */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/heroMarketing.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[75%_center] sm:object-[68%_center]"
        />
        {/* Left-to-right and bottom fade for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Ambient red glow bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #E5231B 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-28 sm:px-10 lg:px-16 w-full">
        <div className="max-w-xl">
          {/* Eyebrow label */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="show"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E5231B]/50 bg-[#E5231B]/10 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5231B] animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-[#E5231B] uppercase">
              #1 Growth Marketing Agency
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="text-[2.4rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.6rem]"
          >
            The Best Business
            <br />
            <span className="text-[#E5231B]">Growth Marketing</span>
            <br />
            Agency In India
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base"
          >
            We craft data-driven strategies that fuel brand growth, generate
            qualified leads, and maximize your ROI — end to end.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#why-different"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#E5231B] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_28px_rgba(229,35,27,0.45)] hover:shadow-[0_12px_36px_rgba(229,35,27,0.6)] transition-shadow"
            >
              Know More <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#our-work"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10 transition-colors"
            >
              See Our Work
            </motion.a>
          </motion.div>

          {/* Stat pills */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
              >
                <Icon size={14} className="text-[#E5231B]" />
                <span className="text-sm font-bold text-white">{value}</span>
                <span className="text-xs text-white/50">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}