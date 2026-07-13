'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent, ReactNode } from 'react';
import {
  ShieldCheck, Layers, Code2,
  CheckCircle2, ArrowRight, Rocket,
  Zap, Globe, Lock,
} from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';

/* ─── Spotlight card — mouse-tracked radial glow ─── */
function SpotlightCard({
  children,
  className = '',
  featured = false,
}: {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative flex flex-col rounded-3xl overflow-hidden cursor-default transition-transform duration-300 hover:-translate-y-1 ${className}`}
      onMouseMove={onMouseMove}
    >
      {/* Spotlight glow that follows the cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              ${featured ? 'rgba(229,35,27,0.22)' : 'rgba(229,35,27,0.12)'},
              transparent 80%
            )
          `,
        }}
      />

      {/* Ambient corner glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-40 ${
          featured
            ? 'from-[#E5231B]/20 via-transparent to-transparent'
            : 'from-[#E5231B]/8 via-transparent to-transparent'
        }`}
      />

      {/* Border */}
      <div
        className={`absolute inset-0 rounded-3xl border transition-colors duration-300 ${
          featured
            ? 'border-[#E5231B]/50 group-hover:border-[#E5231B]/80'
            : 'border-white/8 group-hover:border-[#E5231B]/35'
        }`}
      />

      {/* Card content */}
      <div className="relative z-10 flex h-full flex-col p-7 sm:p-9">
        {children}
      </div>
    </div>
  );
}

/* ─── Stat pill ─── */
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 text-center">
      <span className="text-2xl font-extrabold text-white leading-none mb-1">{value}</span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">{label}</span>
    </div>
  );
}

/* ─── Feature row inside a card ─── */
function FeatureRow({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E5231B]/12">
        <Icon size={13} className="text-[#E5231B]" strokeWidth={2.2} />
      </div>
      <span className="text-sm font-medium text-white/70">{text}</span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function WhyChooseUs() {
  const { toggleChat } = useChat();

  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-8 sm:py-32 font-sans">

      {/* ── Ambient glows ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[680px] -translate-x-1/2 opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, #E5231B 0%, transparent 65%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] translate-x-1/3 translate-y-1/3 opacity-10 blur-[110px]"
        style={{ background: 'radial-gradient(circle, #E5231B 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 sm:mb-20"
        >
          <p className="mb-4 text-xs font-bold tracking-[0.25em] text-[#E5231B] uppercase sm:text-sm">
            The DamnX Advantage
          </p>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-[3.4rem]">
            Why Choose{' '}
            <span className="text-[#E5231B]">Us?</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            We don't just deliver software. We build partnerships built on transparency, quality, and long-term commitment.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 h-[2px] w-14 origin-left rounded-full bg-[#E5231B]"
          />
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">

          {/* ─ Card 1: 2-Year Maintenance — large hero card ─ */}
          <motion.div
            variants={fadeUp} custom={0} initial="hidden"
            whileInView="show" viewport={{ once: true }}
            className="lg:col-span-7 lg:row-span-2"
          >
            <SpotlightCard
              featured
              className="h-full min-h-[420px] bg-[#0d0d0d]"
            >
              {/* Top-right corner accent */}
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-bl-[200px] opacity-25"
                style={{ background: 'radial-gradient(circle at top right, #E5231B 0%, transparent 70%)' }}
              />

              {/* Icon */}
              <div className="mb-8 inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-[#E5231B] shadow-[0_4px_22px_rgba(229,35,27,0.5)]" style={{ height: 52, width: 52 }}>
                <ShieldCheck size={24} className="text-white" strokeWidth={2} />
              </div>

              {/* Heading */}
              <h3 className="mb-2 text-[2.4rem] sm:text-[2.8rem] font-extrabold leading-[1.1] tracking-tight text-white">
                2 Years
              </h3>
              <h3 className="mb-6 text-[2.4rem] sm:text-[2.8rem] font-extrabold leading-[1.1] tracking-tight text-[#E5231B]">
                Free Maintenance.
              </h3>

              {/* Body */}
              <p className="mb-8 text-sm leading-relaxed text-white/55 sm:text-[15px]">
                We don&apos;t hand over the code and vanish. We stand behind every product we ship with 24 months of complimentary support, bug fixes, and performance updates — completely free.
              </p>

              {/* Feature list */}
              <div className="mb-8 flex flex-col gap-3">
                <FeatureRow icon={Lock}  text="Rock-solid stability guarantee" />
                <FeatureRow icon={Zap}   text="Zero hidden fees or surprise charges" />
                <FeatureRow icon={Globe} text="24 / 7 support access, always" />
              </div>

              {/* Badge pills */}
              <div className="mt-auto flex flex-wrap gap-2 border-t border-white/8 pt-6">
                {['Rock-Solid Stability', 'Long-term Support', 'Zero Hidden Fees'].map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold text-white/60"
                  >
                    <CheckCircle2 size={11} className="text-[#E5231B]" />
                    {b}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ─ Card 2: 360° Ecosystem ─ */}
          <motion.div
            variants={fadeUp} custom={1} initial="hidden"
            whileInView="show" viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <SpotlightCard className="h-full bg-[#0d0d0d]">
              <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5231B]/12">
                <Layers size={20} className="text-[#E5231B]" strokeWidth={2} />
              </div>

              <h3 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                360° Ecosystem
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-white/50">
                From logo design and UI/UX to backend architecture and marketing — we are your single point of contact for total digital domination.
              </p>

              <div className="mt-auto grid grid-cols-2 gap-x-3 gap-y-2.5 border-t border-white/8 pt-5">
                {[
                  { icon: Rocket, text: 'Brand Identity'   },
                  { icon: Layers, text: 'UI/UX Design'     },
                  { icon: Code2,  text: 'Full-Stack Dev'   },
                  { icon: Globe,  text: 'Cloud Hosting'    },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs font-medium text-white/60">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E5231B]" />
                    {text}
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ─ Card 3: Elite Architecture ─ */}
          <motion.div
            variants={fadeUp} custom={2} initial="hidden"
            whileInView="show" viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <SpotlightCard className="h-full bg-[#0d0d0d]">
              <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5231B]/12">
                <Code2 size={20} className="text-[#E5231B]" strokeWidth={2} />
              </div>

              <h3 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Elite Architecture
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-white/50">
                Clean, scalable code meets honest pricing. We build on industry-standard frameworks ensuring your product handles thousands of users without breaking a sweat.
              </p>

              {/* Decorative code block */}
              <div className="mt-auto overflow-hidden rounded-xl border border-white/6 bg-[#080808]">
                {/* Code editor top bar */}
                <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/40" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/40" />
                  <span className="ml-3 text-[10px] text-white/20 font-mono">quality.ts</span>
                </div>
                <pre className="px-4 py-4 text-[11px] font-mono leading-relaxed text-white/40 select-none">
                  <span className="text-[#E5231B]/80">export const </span>
                  <span className="text-white/70">quality</span>
                  <span className="text-white/40"> = () {'=> {'}</span>
                  {'\n'}
                  {'  '}
                  <span className="text-[#E5231B]/80">return </span>
                  <span className="text-white/60">isScalable</span>
                  <span className="text-white/40"> && </span>
                  <span className="text-white/60">isSecure</span>
                  <span className="text-white/40">;</span>
                  {'\n'}
                  <span className="text-white/40">{'}'}</span>
                </pre>
              </div>
            </SpotlightCard>
          </motion.div>

        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
        >
          {[
            { value: '125+', label: 'Projects Done'    },
            { value: '2yr',  label: 'Free Maintenance' },
            { value: '98%',  label: 'Client Retention' },
            { value: '24/7', label: 'Support Access'   },
          ].map((s) => (
            <StatPill key={s.label} value={s.value} label={s.label} />
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-16"
        >
          <p className="text-sm text-white/45">
            Ready to build something extraordinary?
          </p>
          <motion.button
            onClick={toggleChat}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#FF3B30] to-[#B3140C] px-9 py-4 text-sm font-bold text-white shadow-[0_10px_36px_rgba(229,35,27,0.45)] transition-shadow hover:shadow-[0_14px_44px_rgba(229,35,27,0.65)]"
          >
            Start Your Project
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}