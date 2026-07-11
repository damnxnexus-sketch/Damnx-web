"use client";

import { motion } from "framer-motion";
import { Building2, X, Check } from "lucide-react";

/**
 * DamnX Solutions — "Why We Are Different" Comparison Section
 * -------------------------------------------------------------
 * Drop into: app/components/WhyDifferent.tsx
 * Deps:      npm i framer-motion lucide-react
 *
 * The little crossed-X badge in the DamnX card header reuses the
 * same logo mark as the header — swap for <img src="/damnx-mark.svg" />
 * once you've got the real asset.
 */

const traditionalItems = [
  { title: "Runs Ads", sub: "Focuses only on ad campaigns" },
  { title: "Makes Social Posts", sub: "Creates content without direction" },
  { title: "One Strategy for Everyone", sub: "Same approach, different clients" },
  { title: "Reports Clicks", sub: "Vanity metrics, not real results" },
  { title: "Stops at Marketing", sub: "Our work ends after the campaign" },
];

const damnxItems = [
  { title: "Finds Growth Opportunities", sub: "Deep research to find real growth levers" },
  { title: "Builds Complete Growth System", sub: "Content, ads, sales, outreach - everything" },
  { title: "Custom Growth Blueprint", sub: "Tailored strategy for your unique business" },
  { title: "Reports Revenue", sub: "We track what actually grows your business" },
  { title: "Does Whatever It Takes", sub: "Cold calling, ads, reels, influencers - whatever works" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
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
      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4 ${
        isGood
          ? "border-[#E5231B]/40 bg-[#E5231B]/[0.08]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
          isGood ? "border-[#E5231B] text-[#E5231B]" : "border-[#E5231B]/70 text-[#E5231B]/70"
        }`}
      >
        {isGood ? <Check size={13} strokeWidth={2.5} /> : <X size={13} strokeWidth={2.5} />}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white sm:text-[15px]">{title}</p>
        <p className="mt-0.5 text-xs text-white/40 sm:text-sm">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function WhyDifferent() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-8 sm:py-28">
      {/* subtle red glow top edge, matches the ambient light in the source design */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-72"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(229,35,27,0.35) 0%, rgba(229,35,27,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.25em] text-[#E5231B] sm:text-sm"
        >
          WHY WE ARE DIFFERENT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          WE DON&apos;T SELL MARKETING,
          <br />
          WE BUILD <span className="text-[#E5231B]">BUSINESS GROWTH.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-sm text-white/60 sm:text-base"
        >
          Most Agencies Stop At Marketing. We Go All The Way To Growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 h-[2px] w-16 bg-white"
        />
      </div>

      <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 sm:mt-16 lg:grid-cols-2 lg:gap-8">
        {/* Traditional Agency */}
        <div className="rounded-3xl border border-white/12 bg-white/[0.02] p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <Building2 size={18} className="text-white/80" strokeWidth={1.8} />
            </span>
            <h3 className="text-lg font-bold tracking-wide text-white sm:text-xl">
              TRADITIONAL AGENCY
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {traditionalItems.map((item, i) => (
              <ComparisonRow key={item.title} {...item} variant="bad" index={i} />
            ))}
          </div>
        </div>

        {/* DamnX Solutions */}
        <div className="rounded-3xl border border-[#E5231B]/50 bg-[#E5231B]/[0.04] p-5 shadow-[0_0_40px_rgba(229,35,27,0.12)] sm:p-6">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <DamnXMark />
            </span>
            <h3 className="text-lg font-bold tracking-wide text-[#E5231B] sm:text-xl">
              DAMNX SOLUTIONS
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {damnxItems.map((item, i) => (
              <ComparisonRow key={item.title} {...item} variant="good" index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}