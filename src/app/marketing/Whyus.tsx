"use client";

import { motion } from "framer-motion";
import { Building2, X, Check, Zap } from "lucide-react";

const traditionalItems = [
  { title: "Runs Ads", sub: "Focuses only on ad campaigns" },
  { title: "Makes Social Posts", sub: "Creates content without direction" },
  { title: "One Strategy for Everyone", sub: "Same approach, different clients" },
  { title: "Reports Clicks", sub: "Vanity metrics, not real results" },
  { title: "Stops at Marketing", sub: "Work ends after the campaign" },
];

const damnxItems = [
  { title: "Finds Growth Opportunities", sub: "Deep research to find real growth levers" },
  { title: "Builds Complete Growth System", sub: "Content, ads, sales, outreach — everything" },
  { title: "Custom Growth Blueprint", sub: "Tailored strategy for your unique business" },
  { title: "Reports Revenue", sub: "We track what actually grows your business" },
  { title: "Does Whatever It Takes", sub: "Cold calling, reels, influencers — whatever works" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function DamnXMark() {
  return (
    <div className="relative flex h-6 w-6 items-center justify-center">
      <span className="text-[11px] font-extrabold text-white">D</span>
      <span className="relative -ml-0.5 text-[11px] font-extrabold text-white">X</span>
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <line x1="6" y1="34" x2="34" y2="6" stroke="#E5231B" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ComparisonRow({
  title,
  sub,
  variant,
  index,
}: {
  title: string;
  sub: string;
  variant: "bad" | "good";
  index: number;
}) {
  const isGood = variant === "good";
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ x: isGood ? 4 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4 transition-colors duration-200 ${
        isGood
          ? "border-[#E5231B]/40 bg-[#E5231B]/[0.07] hover:border-[#E5231B]/70 hover:bg-[#E5231B]/[0.12]"
          : "border-white/8 bg-white/[0.02] hover:bg-white/[0.04]"
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
          isGood
            ? "border-[#E5231B] bg-[#E5231B]/20 text-[#E5231B]"
            : "border-white/15 text-white/30"
        }`}
      >
        {isGood ? <Check size={13} strokeWidth={2.5} /> : <X size={13} strokeWidth={2.5} />}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white sm:text-[15px]">{title}</p>
        <p className="mt-0.5 text-xs text-white/45 sm:text-sm">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function WhyDifferent() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-8 sm:py-32">
      {/* Ambient red glow top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(229,35,27,0.3) 0%, rgba(229,35,27,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.25em] text-[#E5231B] sm:text-sm uppercase"
        >
          Why We Are Different
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          We Don&apos;t Sell Marketing,
          <br />
          We Build{" "}
          <span className="text-[#E5231B]">Business Growth.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
        >
          Most agencies stop at marketing. We go all the way to growth —{" "}
          <span className="text-white/80 font-medium">125+ brands</span> across hospitality, F&B, wellness & tech have seen the difference.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 h-[2px] w-16 rounded-full bg-[#E5231B]"
        />
      </div>

      <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 sm:mt-16 lg:grid-cols-2 lg:gap-8">
        {/* Traditional Agency */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
        >
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/10">
              <Building2 size={18} className="text-white/60" strokeWidth={1.8} />
            </span>
            <h3 className="text-lg font-bold tracking-wide text-white/70 sm:text-xl">
              Traditional Agency
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {traditionalItems.map((item, i) => (
              <ComparisonRow key={item.title} {...item} variant="bad" index={i} />
            ))}
          </div>
        </motion.div>

        {/* DamnX Solutions */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-[#E5231B]/50 bg-[#E5231B]/[0.04] p-5 shadow-[0_0_50px_rgba(229,35,27,0.14)] sm:p-6"
        >
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E5231B]/15 ring-1 ring-[#E5231B]/40">
              <DamnXMark />
            </span>
            <div>
              <h3 className="text-lg font-bold tracking-wide text-[#E5231B] sm:text-xl">
                DamnX Solutions
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/40">
                <Zap size={10} className="text-[#E5231B]" /> Full Growth Partner
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {damnxItems.map((item, i) => (
              <ComparisonRow key={item.title} {...item} variant="good" index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}