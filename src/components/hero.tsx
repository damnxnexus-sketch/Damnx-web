"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useChat } from "@/app/context/ChatContext";

/**
 * DamnX Solutions — "we build cool stuff. technically." Hero (v3)
 * -------------------------------------------------------------------------
 * Drop into: app/components/ServeEverythingHero.tsx
 * Deps:      npm i framer-motion lucide-react
 *
 * Changes from v2:
 *  - Casualized headline copy + lowercase treatment, italic red accent
 *    word with a playful tilt instead of stiff formal casing.
 *  - Subtext trimmed to one crisp line, no channel-listing.
 *  - Added a second decorative "fan" bottom-right, a mirrored variant
 *    (more petals, reversed spin direction, warmer gradient) instead of
 *    a duplicate of the top-left one.
 *  - Decorative shapes are now `hidden sm:block` — on mobile the huge
 *    headline takes the full width and any absolutely-positioned
 *    decoration WILL collide with it, so rather than fight that with
 *    fragile per-breakpoint offsets, mobile gets a clean, undecorated
 *    headline and the shapes only appear once there's room (tablet up).
 *  - Added a very subtle dot-grid texture + vignette for atmosphere.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/* ────────────────────────────────────────────────────────────────────── */
/*  Word-mask wipe — each word slides up out of a clipped box.            */
/* ────────────────────────────────────────────────────────────────────── */
function MaskRevealWords({
  text,
  delay = 0,
  reduced,
}: {
  text: string;
  delay?: number;
  reduced: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.22em] inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.18em", marginBottom: "-0.18em" }}
        >
          <motion.span
            className="inline-block"
            initial={reduced ? { opacity: 0 } : { y: "115%" }}
            animate={reduced ? { opacity: 1 } : { y: "0%" }}
            transition={{ duration: reduced ? 0.4 : 0.9, delay: delay + i * 0.12, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Per-letter 3D flip — fast cascading character reveal.                 */
/* ────────────────────────────────────────────────────────────────────── */
function FlipRevealLetters({
  text,
  delay = 0,
  reduced,
}: {
  text: string;
  delay?: number;
  reduced: boolean;
}) {
  const letters = text.split("");
  return (
    <span className="inline-block" style={{ perspective: 600 }}>
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ transformOrigin: "50% 100%" }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, rotateX: -90, y: 18 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: reduced ? 0.3 : 0.55, delay: delay + i * 0.032, ease: EASE }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Horizontal wipe reveal — accent word, curtain sweeps open.            */
/* ────────────────────────────────────────────────────────────────────── */
function WipeRevealText({
  text,
  delay = 0,
  reduced,
  className,
}: {
  text: string;
  delay?: number;
  reduced: boolean;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)", opacity: 0, rotate: 0 }}
      animate={
        reduced
          ? { opacity: 1 }
          : { clipPath: "inset(0 0% 0 0)", opacity: 1, rotate: -3 }
      }
      transition={{ duration: reduced ? 0.4 : 0.9, delay, ease: EASE }}
    >
      {text}
    </motion.span>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Decorative fan — reusable, takes a mirror flag so the second one      */
/*  reads as a variant rather than a copy-paste duplicate.                */
/*                                                                        */
/*  Geometry: 3 wedge "petals" spaced exactly 120° apart around the       */
/*  centre, each spanning 70° — leaving three equal 50° gaps. The little  */
/*  companion dot sits at the *midpoint of one of those gaps*, at the     */
/*  same radius as the petal tips, so it visually nests into the pinwheel */
/*  instead of floating in disconnected space.                           */
/*                                                                        */
/*  Mirroring is done via Framer's `scaleX` style key (not a raw CSS      */
/*  `transform` string) — Framer Motion composes x/y/scale/rotate itself  */
/*  on every frame, so setting a plain `transform: scaleX(-1)` in style   */
/*  gets clobbered by its own animation engine. Passing `scaleX` as a     */
/*  motion-aware style value lets Framer fold it into the same transform  */
/*  it's already managing, so the flip actually sticks.                  */
/* ────────────────────────────────────────────────────────────────────── */

const FAN_CX = 70;
const FAN_CY = 70;
const FAN_R = 58;

function polarPoint(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: FAN_CX + radius * Math.cos(rad), y: FAN_CY + radius * Math.sin(rad) };
}

function petalPath(startAngle: number, sweep: number, radius: number) {
  const p1 = polarPoint(startAngle, radius);
  const p2 = polarPoint(startAngle + sweep, radius);
  return `M ${FAN_CX} ${FAN_CY} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${radius} ${radius} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`;
}

// three petals, 120° apart, each 70° wide → three equal 50° gaps
const PETAL_ANGLES = [-90, 30, 150];
const PETAL_SWEEP = 70;
// companion dot sits in the middle of the first gap, same radius as petals
const DOT_ANGLE = PETAL_ANGLES[0] + PETAL_SWEEP + (120 - PETAL_SWEEP) / 2;
const DOT_POS = polarPoint(DOT_ANGLE, FAN_R);

function DecorativeFan({
  mirrored = false,
  reduced,
  delay = 0,
}: {
  mirrored?: boolean;
  reduced: boolean;
  delay?: number;
}) {
  const gradId = mirrored ? "petalGradientB" : "petalGradientA";
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.5, rotate: mirrored ? 25 : -25, scaleX: mirrored ? -1 : 1 }}
      animate={{ opacity: 1, scale: 1, rotate: 0, scaleX: mirrored ? -1 : 1 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      viewBox="0 0 140 140"
      className="h-20 w-20 md:h-28 md:w-28"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={mirrored ? "#fdb03d" : "#ff8a3d"} />
          <stop offset="100%" stopColor="#E5231B" />
        </linearGradient>
      </defs>
      <motion.g
        animate={reduced ? {} : { rotate: mirrored ? -360 : 360 }}
        transition={reduced ? {} : { duration: 44, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${FAN_CX}px ${FAN_CY}px` }}
      >
        <path d={petalPath(PETAL_ANGLES[0], PETAL_SWEEP, FAN_R)} fill={`url(#${gradId})`} />
        <path d={petalPath(PETAL_ANGLES[1], PETAL_SWEEP, FAN_R)} fill="#E5231B" opacity="0.85" />
        <path d={petalPath(PETAL_ANGLES[2], PETAL_SWEEP, FAN_R)} fill="#ff5c4d" opacity="0.6" />
        <circle cx={DOT_POS.x} cy={DOT_POS.y} r={13} fill="#fdf6e3" />
      </motion.g>
    </motion.svg>
  );
}

export default function ServeEverythingHero() {
  const reduced = !!useReducedMotion();
  const { toggleChat } = useChat();

  return (
    <section className="relative overflow-hidden bg-black px-5 pt-32 pb-10 sm:px-10 sm:pt-40 sm:pb-14 lg:px-16 lg:pt-48">
      {/* ambient red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full opacity-30 blur-[130px]"
        style={{ background: "radial-gradient(circle, #E5231B 0%, transparent 70%)" }}
      />

      {/* subtle dot-grid texture for atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      {/* vignette to keep edges dark/moody */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 160px 40px rgba(0,0,0,0.8)" }}
      />

      {/* DamnX logo watermark — fills the empty right side on wider screens.
          Place your logo asset at /public/damnx-logo.png (transparent PNG
          or SVG works best). Sits low-opacity and behind the fans/text so
          it reads as a background mark, not competing for attention. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[40%] items-center justify-end pr-4 opacity-[0.45] md:flex lg:pr-10">
        <motion.img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="h-[55%] w-auto object-contain grayscale-0"
        />
      </div>

      {/* top-left fan — hidden on mobile so it never collides with the headline */}
      <div className="absolute left-[8%] top-8 z-10 hidden sm:block lg:left-[10%] lg:top-12">
        <DecorativeFan reduced={reduced} delay={0} />
      </div>

      {/* bottom-right fan — the requested variant: mirrored, extra petal,
          warmer gradient, spins the opposite direction */}
      <div className="absolute bottom-6 right-[6%] z-10 hidden sm:block lg:bottom-10 lg:right-[9%]">
        <DecorativeFan mirrored reduced={reduced} delay={0.2} />
      </div>

      {/* headline — casual lowercase, three distinct reveal choreographies */}
      <div className="relative">
        <h1
          className="font-extrabold lowercase leading-[0.95] tracking-tight text-[#fdf6e3]"
          style={{ fontSize: "clamp(3.2rem, 11vw, 9.5rem)" }}
        >
          <MaskRevealWords text="everything" delay={0.1} reduced={reduced} />
        </h1>
        <h1
          className="font-extrabold lowercase leading-[0.95] tracking-tight text-[#fdf6e3]"
          style={{ fontSize: "clamp(3.2rem, 11vw, 9.5rem)", marginLeft: "clamp(1rem, 8vw, 6rem)" }}
        >
          <FlipRevealLetters text="engineered" delay={0.55} reduced={reduced} />
        </h1>
        <h1
          className="font-extrabold italic lowercase leading-[0.95] tracking-tight text-[#E5231B]"
          style={{ fontSize: "clamp(3.2rem, 11vw, 9.5rem)", marginLeft: "clamp(2rem, 14vw, 11rem)" }}
        >
          <WipeRevealText text="better." delay={1.05} reduced={reduced} />
        </h1>
      </div>

      {/* bottom row: bracket note + CTA */}
      <div className="relative mt-14 flex flex-col items-start justify-between gap-8 sm:mt-20 sm:flex-row sm:items-center sm:gap-6">
        <p className="flex max-w-sm items-start gap-1 text-base leading-snug text-[#fdf6e3] sm:text-lg">
          <motion.span
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.9, type: "spring", stiffness: 260, damping: 16 }}
            className="text-3xl font-light text-[#fdf6e3]/70 sm:text-4xl"
          >
            {"{"}
          </motion.span>
          <motion.span
            initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", y: 10 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2.0, ease: EASE }}
            className="pt-0.5"
          >
            <span className="font-bold">
              Damn<span className="text-[#E5231B]">X</span> Solutions
            </span>{" "}
            — premium builds, sharp design, marketing that actually grows your brand.
          </motion.span>
          <motion.span
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0, rotate: 180 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 2.05, type: "spring", stiffness: 260, damping: 16 }}
            className="text-3xl font-light text-[#fdf6e3]/70 sm:text-4xl"
          >
            {"}"}
          </motion.span>
        </p>

        <motion.button
          onClick={toggleChat}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 2.2, type: "spring", stiffness: 280, damping: 16 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group inline-flex shrink-0 items-center gap-3 rounded-full border-2 border-[#E5231B] px-6 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#E5231B] sm:text-base cursor-pointer"
        >
          Let&apos;s Talk
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#E5231B] transition-colors duration-300 group-hover:border-white">
            <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform duration-200" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}