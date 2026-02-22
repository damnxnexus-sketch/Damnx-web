'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent, ReactNode } from 'react';
import { MessageCircle, ShieldCheck, Layers, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';

// --- Premium Spotlight Card Wrapper ---
// This creates the "Linear/Apple" style flashlight effect that tracks the mouse
function BentoCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative flex flex-col rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(220, 38, 38, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Subtle Static Glow for when not hovering */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent opacity-50" />

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
        {children}
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const { toggleChat } = useChat();

  return (
    <div className="relative bg-[#030303] min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">

      {/* Background Noise & Ambient Glow */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-full px-4 py-2 mb-6 shadow-xl">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-zinc-300 font-medium text-xs tracking-widest uppercase">The DamnX Advantage</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            WHY CHOOSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-900">US?</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">

          {/* Card 1: 2 Years Free Maintenance (Tall Left Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 lg:row-span-2 h-full"
          >
            <BentoCard className="h-full">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
                <ShieldCheck className="w-7 h-7 text-red-500" />
              </div>

              <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                2 Years <br />
                <span className="text-red-500">Free Maintenance.</span>
              </h3>

              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10 max-w-md">
                We don't hand over the code and vanish. We stand behind our engineering with 24 months of complimentary support, bug fixes, and performance updates. Your peace of mind is guaranteed.
              </p>

              <div className="mt-auto pt-8 border-t border-white/10 flex flex-wrap gap-3">
                {['Rock-Solid Stability', 'Long-term Support', 'Zero Hidden Fees'].map((badge) => (
                  <div key={badge} className="px-4 py-2 bg-zinc-900 rounded-full border border-white/5 text-zinc-300 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    {badge}
                  </div>
                ))}
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 2: 360 End-to-End Solutions (Top Right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <BentoCard>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-zinc-400 group-hover:text-red-500 transition-colors" />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                360° Ecosystem
              </h3>

              <p className="text-zinc-400 text-base leading-relaxed mb-6">
                From logo design and UI/UX to complex backend architecture and marketing deployments. We are your single point of contact for total digital domination.
              </p>

              <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-auto">
                {['Brand Identity', 'UI/UX Design', 'Full-Stack Dev', 'Cloud Hosting'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-zinc-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {item}
                  </div>
                ))}
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 3: Quality Code (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <BentoCard>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-zinc-400 group-hover:text-red-500 transition-colors" />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Elite Architecture
              </h3>

              <p className="text-zinc-400 text-base leading-relaxed">
                Clean, scalable code meets honest pricing. No shortcuts. We build on industry-standard frameworks ensuring your product can handle thousands of users without breaking a sweat.
              </p>

              {/* Decorative Code Block */}
              <div className="mt-6 p-4 bg-[#0a0a0a] rounded-lg border border-white/5 font-mono text-[10px] sm:text-xs text-zinc-500 opacity-80 overflow-hidden">
                <div className="text-red-500/80 mb-1">export const <span className="text-white">quality</span> = () ={'>'} {'{'}</div>
                <div className="pl-4">return isScalable && isSecure;</div>
                <div>{'}'}</div>
              </div>
            </BentoCard>
          </motion.div>

        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-16 md:mt-24"
        >
          <button
            onClick={toggleChat}
            className="group relative inline-flex items-center gap-3 bg-white text-black font-bold text-lg px-8 py-4 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project <MessageCircle className="w-5 h-5" />
            </span>
            {/* Red swipe effect on hover */}
            <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
            <span className="absolute z-10 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Start Your Project <MessageCircle className="w-5 h-5" />
            </span>
          </button>
        </motion.div>

      </div>
    </div>
  );
}