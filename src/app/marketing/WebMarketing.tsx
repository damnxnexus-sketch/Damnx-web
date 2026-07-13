"use client";

import { motion } from "framer-motion";
import {
  Search,
  MessageSquare,
  Lightbulb,
  Palette,
  Target,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const features: Feature[] = [
  { icon: Search, title: "SEO Optimized", desc: "Fast, structured, and search-friendly pages that rank on Google" },
  { icon: MessageSquare, title: "AEO Ready", desc: "Optimized for AI answers & voice search results" },
  { icon: Lightbulb, title: "High Performance", desc: "Built with Next.js for blazing speed & scalability" },
  { icon: Palette, title: "Premium UI/UX", desc: "Clean, modern, conversion-focused design language" },
  { icon: Target, title: "Conversion Optimized", desc: "Every element designed to turn visitors into customers" },
  { icon: BarChart3, title: "Data Analytics", desc: "Built-in tracking to measure every growth metric" },
];

const statsRow = [
  { value: "120+", label: "Projects Delivered" },
  { value: "98%", label: "Client Retention" },
  { value: "3×", label: "Average ROI" },
  { value: "48h", label: "Response Time" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function FeatureCard({ icon: Icon, title, desc, index }: Feature & { index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative rounded-2xl border border-white/8 bg-white/[0.025] p-6 overflow-hidden transition-colors duration-300 hover:border-[#E5231B]/60 sm:p-7"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at top left, rgba(229,35,27,0.08) 0%, transparent 65%)" }}
      />

      <span
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl sm:mb-6 shadow-[0_4px_20px_rgba(229,35,27,0.3)]"
        style={{ background: "linear-gradient(135deg, #FF4141 0%, #B3140C 100%)" }}
      >
        <Icon size={20} className="text-white" strokeWidth={2} />
      </span>
      <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/50 sm:text-base">{desc}</p>
    </motion.div>
  );
}

export default function WebDevGrowth() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-8 sm:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-20 h-[400px] w-[400px] translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #E5231B 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block rounded-full border border-[#E5231B]/60 bg-[#E5231B]/10 px-5 py-2 text-xs font-semibold tracking-widest text-[#E5231B] uppercase sm:text-sm"
        >
          Web Development + Growth
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Growth Strategy +{" "}
          <span className="text-[#E5231B]">Premium Website</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base"
        >
          Beautiful websites built to rank, answer AI queries, and convert visitors into customers.
        </motion.p>
      </div>

      {/* Feature grid */}
      <div className="relative mx-auto mt-14 grid max-w-5xl gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} {...feature} index={i} />
        ))}
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mx-auto mt-16 max-w-4xl grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {statsRow.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-5 text-center"
          >
            <span className="text-2xl font-extrabold text-[#E5231B] sm:text-3xl">{value}</span>
            <span className="mt-1 text-xs text-white/50 sm:text-sm">{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}