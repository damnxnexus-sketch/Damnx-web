'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';
import { useShouldReduceEffects } from '@/hooks/useDeviceDetection';

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const shouldReduceEffects = useShouldReduceEffects();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Create base transforms with conditional values
  const y1 = useTransform(
    smoothProgress, 
    [0, 1], 
    shouldReduceEffects ? [0, 0] : [100, -100]
  );
  
  const y2 = useTransform(
    smoothProgress, 
    [0, 1], 
    shouldReduceEffects ? [0, 0] : [150, -150]
  );
  
  const y3 = useTransform(
    smoothProgress, 
    [0, 1], 
    shouldReduceEffects ? [0, 0] : [80, -80]
  );
  
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);

  const { toggleChat } = useChat();

  return (
    <div ref={containerRef} className="relative bg-black min-h-[100dvh] py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Chrome shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />

      <motion.div
        style={{ opacity, scale }}
        className="relative max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-red-600/10 border border-red-600/30 rounded-full px-6 py-3">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Premium Quality</span>
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">Us</span>?
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1 w-32 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto"
          />
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-12">
          {/* Hero Feature Card */}
          <motion.div style={{ y: y1 }}>
            <motion.div
              initial={{ opacity: 0, rotateX: -15 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
              className="relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />

              {/* Chrome shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border-2 border-red-600/50 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden backdrop-blur-sm">
                {/* Animated orb */}
                <motion.div
                  className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-red-600/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Glass morphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                    viewport={{ once: true }}
                    className="inline-block mb-6"
                  >
                    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-red-600/50">
                      Hero Feature
                    </div>
                  </motion.div>

                  <motion.h3
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-6xl sm:text-7xl lg:text-9xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                      2 Years
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-400 bg-clip-text text-transparent">
                      FREE Maintenance
                    </span>
                  </motion.h3>

                  <motion.p
                    className="text-zinc-400 text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    We stand behind our work with 24 months of complimentary maintenance.
                    Your peace of mind is our commitment—updates, fixes, and support included.
                  </motion.p>

                  <motion.div
                    className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    {['Stability', 'Long-term Support', 'Trust & Commitment'].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-zinc-900 to-zinc-800 border border-red-600/30 rounded-full text-white font-medium text-sm sm:text-base shadow-lg"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Two column cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* 360° Solutions Card */}
            <motion.div style={{ y: y2 }}>
              <motion.div
                initial={{ opacity: 0, rotateY: -15 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.03, rotateY: 3, rotateX: -2 }}
                className="relative group h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 sm:p-10 h-full backdrop-blur-sm">
                  <motion.div
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-16 sm:w-20 h-16 sm:h-20 mb-6 relative"
                  >
                    <div className="absolute inset-0 border-4 border-red-600 rounded-full shadow-lg shadow-red-600/50" />
                    <div className="absolute inset-2 border-4 border-white rounded-full" />
                    <div className="absolute inset-4 bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-inner" />
                  </motion.div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    360° End-to-End
                    <br />
                    <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Solutions</span>
                  </h3>

                  <p className="text-zinc-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                    From concept to launch and beyond—we handle everything. Logo design, UI/UX, development, deployment, and marketing. A complete ecosystem working in perfect harmony.
                  </p>

                  <div className="space-y-3">
                    {[
                      'Logo Design',
                      'UI/UX Design',
                      'Development',
                      'Deployment',
                      'Marketing'
                    ].map((service, i) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-3 text-white group/item cursor-pointer"
                      >
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-lg shadow-red-600/50"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="text-base sm:text-lg group-hover/item:text-red-600 transition-colors">
                          {service}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Quality Code Card */}
            <motion.div style={{ y: y3 }}>
              <motion.div
                initial={{ opacity: 0, rotateY: 15 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.03, rotateY: -3, rotateX: 2 }}
                className="relative group h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 sm:p-10 h-full backdrop-blur-sm">
                  <motion.div
                    className="mb-6"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 sm:w-20 h-16 sm:h-20 relative">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-red-600/20 rounded-2xl blur-xl"
                      />
                      <div className="relative w-full h-full bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/50">
                        <svg className="w-8 sm:w-10 h-8 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Quality Code</span>
                    <br />
                    Genuine Pricing
                  </h3>

                  <p className="text-zinc-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                    Industry-level coding practices meet honest pricing. We deliver clean, scalable, and maintainable software without compromising on quality or cutting corners.
                  </p>

                  <div className="space-y-4">
                    {[
                      { title: 'Clean Architecture', desc: 'Maintainable & scalable' },
                      { title: 'Industry Standards', desc: 'Best practices enforced' },
                      { title: 'Premium Quality', desc: 'No shortcuts taken' }
                    ].map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                        className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 border border-red-600/20 rounded-xl p-4 cursor-pointer group/card backdrop-blur-sm"
                      >
                        <div className="text-white font-bold mb-1 group-hover/card:text-red-600 transition-colors text-sm sm:text-base">
                          {item.title}
                        </div>
                        <div className="text-zinc-500 text-xs sm:text-sm">
                          {item.desc}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-24"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              onClick={toggleChat}
              className="relative group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-6 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Your Project
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}