'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useShouldReduceEffects } from '@/hooks/useDeviceDetection';

// Lazy load ColorBends only when needed
const ColorBends = dynamic(() => import('./ColorBends'), {
  ssr: false,
  loading: () => null
});

export default function VideoHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [blur, setBlur] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [topBlur, setTopBlur] = useState(0);
  const [bottomBlur, setBottomBlur] = useState(0);
  const shouldReduceEffects = useShouldReduceEffects();

  useEffect(() => {
    const section = sectionRef.current;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!section || !sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const sectionHeight = rect.height;

          // Calculate scroll progress through the section
          const scrollTop = -rect.top;
          const progress = Math.max(0, Math.min(1, scrollTop / sectionHeight));
          setScrollProgress(progress);

          // Calculate blur effect when scrolling down past the section
          if (rect.top < 0) {
            const blurAmount = Math.min(5, Math.abs(rect.top) / 60);
            setBlur(blurAmount);
          } else {
            setBlur(0);
          }

          // Calculate boundary blur effects - Only minimal blur at transition
          // Top boundary blur - when section enters viewport
          const topDistance = Math.max(0, rect.top);
          const topBoundaryBlur = Math.min(4, (150 - topDistance) / 150 * 4);
          setTopBlur(topDistance < 150 ? topBoundaryBlur : 0);

          // Bottom boundary blur - when section exits viewport
          const bottomDistance = Math.max(0, windowHeight - rect.bottom);
          const bottomBoundaryBlur = Math.min(4, (150 - bottomDistance) / 150 * 4);
          setBottomBlur(bottomDistance < 150 ? bottomBoundaryBlur : 0);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Video Hero Section */}
      <section
        ref={sectionRef}
        className="relative min-h-[100dvh] w-full overflow-x-hidden flex flex-col items-center justify-center"
      >
        {/* ColorBends Background - Disabled on mobile for performance */}
        <div className="absolute inset-0 w-full h-full z-0">
          {!shouldReduceEffects && (
            <ColorBends
              colors={['#000000', '#1a0505', '#450a0a', '#7f1d1d', '#dc2626']}
            />
          )}
          {/* Enhanced Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1200px] px-4 md:px-8 flex flex-col items-center justify-center">

          {/* Main Heading Group */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* DAMN X Row */}
            <div className="flex items-baseline justify-center gap-2 md:gap-4 mb-2 relative">

              {/* DAMN - Metallic Effect */}
              <motion.h1
                className="text-[18vw] md:text-[150px] leading-[0.8] tracking-tighter mix-blend-overlay font-black"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255,255,255,0.8)',
                  backgroundImage: 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 50%, #a0a0a0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))'
                }}
                whileHover={{ scale: 1.05, filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.2))' }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                DAMN
              </motion.h1>

              {/* X - Neon Red Glow */}
              <motion.span
                className="text-[20vw] md:text-[180px] leading-[0.8] font-black font-sans"
                style={{
                  color: '#dc2626',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.95)',
                  textShadow: '0 5px 15px rgba(0,0,0,0.8), 0 0 20px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.4)'
                }}
                animate={{
                  textShadow: [
                    '0 5px 15px rgba(0,0,0,0.8), 0 0 20px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.4)',
                    '0 5px 15px rgba(0,0,0,0.8), 0 0 40px rgba(220, 38, 38, 0.8), 0 0 100px rgba(220, 38, 38, 0.6)',
                    '0 5px 15px rgba(0,0,0,0.8), 0 0 20px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.4)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  textShadow: '0 10px 30px rgba(0,0,0,0.9), 0 0 40px rgba(220, 38, 38, 1), 0 0 100px rgba(220, 38, 38, 0.8)'
                }}
              >
                X
              </motion.span>
            </div>

            {/* SOLUTION - Wide Spaced */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.8em' }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              className="text-white/90 text-sm md:text-2xl font-light uppercase tracking-[0.8em] md:tracking-[1.2em] ml-2 mb-12"
            >
              Solution
            </motion.div>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-3xl text-center relative"
          >
            {/* Decorative lines */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            <p className="text-lg md:text-2xl text-gray-300 font-extralight leading-relaxed tracking-wide">
              &quot;Where innovation meets excellence. Transforming visions into digital reality with <span className="text-white font-normal drop-shadow-md">cutting-edge</span> software solutions.&quot;
            </p>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
          <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        </motion.div>

      </section>
    </div>
  );
}