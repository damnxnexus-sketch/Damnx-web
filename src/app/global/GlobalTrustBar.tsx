"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "150+", label: "Projects Delivered", detail: "Across web, mobile, AI & SaaS" },
  { value: "12+", label: "Countries Served", detail: "US, UK, UAE, SG, AU & more" },
  { value: "99%", label: "Client Satisfaction", detail: "Measured post-delivery" },
  { value: "24/7", label: "Global Support", detail: "Always-on for critical issues" },
  { value: "2 yr", label: "Maintenance Included", detail: "Free, with every project" },
];

function AnimatedStat({ value, label, detail, index }: { value: string; label: string; detail: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="group flex flex-col gap-3 py-10 sm:py-12 border-t border-[#0a0a0a]/8 hover:border-[#0a0a0a]/20 transition-colors duration-300"
    >
      <motion.p
        className="font-black text-[#0a0a0a] leading-none tracking-tighter"
        style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.1, ease: EASE }}
      >
        {value}
      </motion.p>
      <p className="text-base sm:text-lg font-bold text-[#0a0a0a]">{label}</p>
      <p className="text-sm text-[#0a0a0a]/40 font-light">{detail}</p>
    </motion.div>
  );
}

export default function GlobalStats() {
  return (
    <>
      {/* Stats section */}
      <section className="bg-white py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-24">
            {/* Left label */}
            <div className="lg:w-80 shrink-0 mb-12 lg:mb-0 lg:pt-10">
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-5 text-[11px] font-bold tracking-[0.3em] uppercase text-[#0a0a0a]/40"
              >
                <span className="w-6 h-px bg-[#E5231B]" />
                Why DAMNX
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                className="font-black text-[#0a0a0a] leading-[0.93] tracking-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Numbers
                <br />
                that speak
                <br />
                for us.
              </motion.h2>
            </div>

            {/* Stats grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
              {stats.map((stat, i) => (
                <AnimatedStat key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
