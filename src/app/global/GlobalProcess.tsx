"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const nodes = [
  {
    num: "1",
    title: "Discover",
    subtitle: "Understand Before We Build.",
    gradient: "linear-gradient(135deg, #22c55e, #84cc16)",
    shadow: "rgba(34,197,94,0.35)",
  },
  {
    num: "2",
    title: "Design",
    subtitle: "Visual Thinking Before Visual Output",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
    shadow: "rgba(236,72,153,0.35)",
  },
  {
    num: "3",
    title: "Develop",
    subtitle: "Clean Code, Scalable Systems.",
    gradient: "linear-gradient(135deg, #f97316, #fb923c)",
    shadow: "rgba(249,115,22,0.35)",
  },
  {
    num: "4",
    title: "Launch",
    subtitle: "Precise Deployment. Zero Anxiety.",
    gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
    shadow: "rgba(14,165,233,0.35)",
  },
  {
    num: "5",
    title: "Scale",
    subtitle: "Growth Beyond Launch",
    gradient: "linear-gradient(135deg, #0284c7, #0369a1)",
    shadow: "rgba(2,132,199,0.35)",
  },
];

function Pill({
  node,
  delay,
  align = "center",
}: {
  node: (typeof nodes)[0];
  delay: number;
  align?: "left" | "center" | "right";
}) {
  const alignClass =
    align === "left"
      ? "items-end text-right"
      : align === "right"
      ? "items-start text-left"
      : "items-center text-center";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-1 ${alignClass}`}
    >
      <p
        className="font-semibold text-gray-500 leading-snug"
        style={{ fontSize: "clamp(8px, 1.8vw, 11px)", maxWidth: "clamp(70px, 16vw, 120px)" }}
      >
        {node.subtitle}
      </p>
      <div
        className="rounded-full text-white font-bold whitespace-nowrap"
        style={{
          background: node.gradient,
          boxShadow: `0 4px 16px ${node.shadow}`,
          fontSize: "clamp(10px, 2.8vw, 18px)",
          padding: "clamp(4px, 1vw, 10px) clamp(10px, 2.5vw, 28px)",
        }}
      >
        {node.title}
      </div>
    </motion.div>
  );
}

function Dot({ node, delay }: { node: (typeof nodes)[0]; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 18 }}
      className="rounded-full text-white flex items-center justify-center font-bold border-2 border-white shadow-md shrink-0"
      style={{
        background: node.gradient,
        width: "clamp(20px, 4vw, 32px)",
        height: "clamp(20px, 4vw, 32px)",
        fontSize: "clamp(9px, 1.8vw, 13px)",
      }}
    >
      {node.num}
    </motion.div>
  );
}

export default function GlobalProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const circlePath   = useTransform(scrollYProgress, [0.05, 0.48], [0, 1]);
  const leftLegPath  = useTransform(scrollYProgress, [0.38, 0.65], [0, 1]);
  const rightLegPath = useTransform(scrollYProgress, [0.38, 0.65], [0, 1]);
  const barPath      = useTransform(scrollYProgress, [0.60, 0.85], [0, 1]);

  // Center circle size: scales with viewport, fixed between 100px–280px
  const circleSize = "clamp(100px, 30vw, 280px)";

  return (
    <section ref={sectionRef} className="bg-[#f4f4f6] py-12 sm:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-5xl px-2 sm:px-8">
        <div
          className="relative grid mx-auto"
          style={{
            // Center col is fixed to circle size; sides take remaining space equally
            gridTemplateColumns: `1fr ${circleSize} 1fr`,
            gridTemplateRows: "auto auto auto",
            maxWidth: "900px",
          }}
        >
          {/* ─── SVG OVERLAY ─── 
              viewBox 0 0 900 600 matches maxWidth:900px proportionally.
              SVG scales with the container via preserveAspectRatio.
              Circle center: x=450 (center of 900px), y=240, radius=120
          */}
          <svg
            viewBox="0 0 900 600"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: "visible" }}
          >
            {/* Circle */}
            <motion.circle
              cx="450" cy="240" r="120"
              fill="none" stroke="#1C1A4A" strokeWidth="5.5" strokeLinecap="round"
              style={{ pathLength: circlePath }}
            />
            {/* Left leg */}
            <motion.path
              d="M 338 345 C 310 430, 210 470, 150 555"
              fill="none" stroke="#1C1A4A" strokeWidth="5.5" strokeLinecap="round"
              style={{ pathLength: leftLegPath }}
            />
            {/* Right leg */}
            <motion.path
              d="M 562 345 C 590 430, 690 470, 750 555"
              fill="none" stroke="#1C1A4A" strokeWidth="5.5" strokeLinecap="round"
              style={{ pathLength: rightLegPath }}
            />
            {/* Horizontal bar */}
            <motion.line
              x1="40" y1="555" x2="860" y2="555"
              stroke="#1C1A4A" strokeWidth="5.5" strokeLinecap="round"
              style={{ pathLength: barPath }}
            />
          </svg>

          {/* ─── ROW 1: DISCOVER (top center) ─── */}
          <div className="col-start-1 row-start-1" />
          <div className="col-start-2 row-start-1 flex flex-col items-center relative z-10" style={{ paddingBottom: "clamp(8px, 2vw, 20px)" }}>
            <Pill node={nodes[0]} delay={0.2} />
            <div style={{ marginTop: "clamp(6px, 1.5vw, 12px)" }}>
              <Dot node={nodes[0]} delay={0.4} />
            </div>
          </div>
          <div className="col-start-3 row-start-1" />

          {/* ─── ROW 2: DESIGN | CIRCLE | DEVELOP ─── */}
          <div className="col-start-1 row-start-2 flex flex-col items-end justify-center relative z-10" style={{ gap: "clamp(4px, 1vw, 10px)", paddingRight: "clamp(6px, 1.5vw, 20px)" }}>
            <Dot node={nodes[1]} delay={0.55} />
            <Pill node={nodes[1]} delay={0.35} align="left" />
          </div>

          {/* Central circle */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="col-start-2 row-start-2 flex items-center justify-center relative z-10"
          >
            <div
              className="rounded-full bg-white flex flex-col items-center justify-center"
              style={{
                width: circleSize,
                height: circleSize,
                boxShadow: "0 10px 40px rgba(0,0,0,0.10)",
              }}
            >
              <span style={{ fontSize: "clamp(9px, 2.2vw, 18px)", fontWeight: 700 }}>From</span>
              <span
                className="font-black text-[#E5231B] leading-none tracking-tight"
                style={{ fontSize: "clamp(18px, 5.5vw, 52px)" }}
              >
                Vision
              </span>
              <span style={{ fontSize: "clamp(9px, 2.2vw, 18px)", fontWeight: 700 }}>to</span>
              <span
                className="font-black text-[#E5231B] leading-none tracking-tight"
                style={{ fontSize: "clamp(18px, 5.5vw, 52px)" }}
              >
                Reality
              </span>
            </div>
          </motion.div>

          <div className="col-start-3 row-start-2 flex flex-col items-start justify-center relative z-10" style={{ gap: "clamp(4px, 1vw, 10px)", paddingLeft: "clamp(6px, 1.5vw, 20px)" }}>
            <Dot node={nodes[2]} delay={0.55} />
            <Pill node={nodes[2]} delay={0.35} align="right" />
          </div>

          {/* ─── ROW 3: LAUNCH | spacer | SCALE ─── */}
          <div
            className="col-start-1 row-start-3 flex flex-col items-end justify-start relative z-10"
            style={{ gap: "clamp(4px, 1vw, 10px)", paddingRight: "clamp(6px, 1.5vw, 20px)", paddingTop: "clamp(24px, 6vw, 60px)" }}
          >
            <Dot node={nodes[3]} delay={0.70} />
            <Pill node={nodes[3]} delay={0.50} align="left" />
          </div>

          <div className="col-start-2 row-start-3" style={{ height: "clamp(80px, 16vw, 150px)" }} />

          <div
            className="col-start-3 row-start-3 flex flex-col items-start justify-start relative z-10"
            style={{ gap: "clamp(4px, 1vw, 10px)", paddingLeft: "clamp(6px, 1.5vw, 20px)", paddingTop: "clamp(24px, 6vw, 60px)" }}
          >
            <Dot node={nodes[4]} delay={0.70} />
            <Pill node={nodes[4]} delay={0.50} align="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
