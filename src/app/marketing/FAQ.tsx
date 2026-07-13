"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Star, Phone } from "lucide-react";
import { useChat } from "@/app/context/ChatContext";

const highlights = [
  { icon: TrendingUp, value: "125+", label: "Projects Done" },
  { icon: Users, value: "50K+", label: "Leads Generated" },
  { icon: Star, value: "4.9★", label: "Client Rating" },
  { icon: Phone, value: "Free", label: "Strategy Call" },
];

export default function GrowthCTABanner() {
  const { openChat } = useChat();
  return (
    <section className="relative overflow-hidden bg-black px-4 py-16 sm:px-8 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#E5231B]/30"
        style={{
          background:
            "linear-gradient(135deg, #160404 0%, #0a0a0a 50%, #120202 100%)",
        }}
      >
        {/* Large ambient glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full opacity-40 blur-[100px]"
          style={{ background: "radial-gradient(circle, #E5231B 0%, transparent 65%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-[280px] w-[280px] rounded-full opacity-25 blur-[100px]"
          style={{ background: "radial-gradient(circle, #E5231B 0%, transparent 65%)" }}
        />

        {/* Grid texture overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          {/* Top eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-center text-xs font-semibold tracking-[0.25em] text-[#E5231B] uppercase sm:text-sm"
          >
            Let&apos;s Grow Together
          </motion.p>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-center text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.2rem]"
          >
            Your Next Stage of Growth
            <br />
            <span className="text-[#E5231B]">Starts Right Here.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-white/55 sm:text-base"
          >
            Hop on a free 30-minute strategy call with our growth experts.
            We&apos;ll audit your brand and discover exactly where your biggest opportunities lie.
          </motion.p>

          {/* Highlight stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          >
            {highlights.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/[0.04] px-3 py-4 text-center backdrop-blur-sm"
              >
                <Icon size={18} className="mb-2 text-[#E5231B]" />
                <span className="text-xl font-extrabold text-white sm:text-2xl">{value}</span>
                <span className="mt-0.5 text-[11px] text-white/45 sm:text-xs">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            {/* Primary pulsing CTA */}
            <div className="relative">
              {/* Pulse ring */}
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-0 rounded-full bg-[#E5231B]/50"
              />
              <motion.button
                onClick={openChat}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 380, damping: 20 }}
                className="relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#FF3B30] to-[#B3140C] px-8 py-4 text-sm font-bold text-white shadow-[0_12px_36px_rgba(229,35,27,0.5)] hover:shadow-[0_16px_44px_rgba(229,35,27,0.7)] transition-shadow sm:text-base"
              >
                Book a Free Strategy Call <ArrowRight size={17} />
              </motion.button>
            </div>

            <motion.a
              href="tel:+916388037374"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm hover:border-white/30 hover:bg-white/10 transition-colors"
            >
              <Phone size={15} /> Call Us Now
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 text-center text-xs text-white/30"
          >
            No commitment required · Free 30-minute session · 100% confidential
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}