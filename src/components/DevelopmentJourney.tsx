'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useChat } from '@/app/context/ChatContext';

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  imageUrl: string;
}

const stages: Stage[] = [
  {
    id: 1,
    title: 'DISCOVERY',
    subtitle: 'Requirement Analysis',
    description: 'Deep dive into your vision. We analyze market dynamics, user needs, and technical feasibility to architect solutions that transcend expectations.',
    icon: '◈',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'DESIGN',
    subtitle: 'UI / UX Craftsmanship',
    description: 'Where aesthetics meet psychology. Every pixel, every interaction designed to captivate users and drive engagement through intuitive experiences.',
    icon: '◆',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'ARCHITECTURE',
    subtitle: 'System Planning',
    description: 'Building the invisible foundation. Scalable infrastructure, optimized databases, and robust frameworks that power enterprise-grade performance.',
    icon: '◊',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'DEVELOPMENT',
    subtitle: 'Code Execution',
    description: 'Transforming blueprints into reality. Clean code, agile sprints, and continuous integration bring your product to life with precision engineering.',
    icon: '◇',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1920&q=80&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'TESTING',
    subtitle: 'Quality Assurance',
    description: 'Zero tolerance for imperfection. Rigorous testing protocols, automated checks, and security audits ensure flawless functionality across all scenarios.',
    icon: '◈',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'DEPLOYMENT',
    subtitle: 'Launch Execution',
    description: 'Go-live with confidence. Seamless deployment pipelines, performance optimization, and infrastructure monitoring for a smooth market entry.',
    icon: '◆',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80&auto=format&fit=crop'
  },
  {
    id: 7,
    title: 'EVOLUTION',
    subtitle: 'Post-Launch Support',
    description: 'Your success is our mission. Continuous optimization, feature enhancements, and 24/7 support to scale your solution as you grow.',
    icon: '◊',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80&auto=format&fit=crop'
  }
];

const StageSection = ({ stage, index }: { stage: Stage; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]), springConfig);

  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.3, 0.4, 0.3, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-28 overflow-hidden">
      <motion.div
        style={{ opacity: imageOpacity, scale: imageScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src={stage.imageUrl}
          alt={stage.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </motion.div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl w-full will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 md:mb-10"
        >
          <motion.div
            animate={isInView ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-red-600 flex-shrink-0 leading-none"
          >
            {stage.icon}
          </motion.div>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-red-600 to-transparent" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-white/40 text-xl sm:text-2xl md:text-3xl font-light flex-shrink-0 leading-none"
          >
            0{stage.id}
          </motion.span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-3 sm:mb-4 md:mb-5 tracking-tighter leading-[0.9]"
        >
          {stage.title}
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold mb-6 sm:mb-8 md:mb-10 tracking-wide"
        >
          {stage.subtitle}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute -left-3 sm:-left-4 md:-left-5 top-0 w-1 h-full bg-red-600" />
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl pl-5 sm:pl-6 md:pl-8">
            {stage.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 sm:mt-10 md:mt-12 h-1 bg-red-600 origin-left w-40 sm:w-56 md:w-72"
        />
      </motion.div>

      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 50]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.04, 0.08, 0.04])
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5] will-change-transform"
      >
        <div className="text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] xl:text-[26rem] font-black text-white/5 select-none leading-none">
          0{stage.id}
        </div>
      </motion.div>

      {index < stages.length - 1 && (
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.7, 1], [0, 1]),
            scale: useTransform(scrollYProgress, [0.7, 1], [0.8, 1])
          }}
          className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 will-change-transform"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 sm:w-7 sm:h-11 border-2 border-red-600 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
          </motion.div>
          <span className="text-white/60 text-xs uppercase tracking-widest">Next</span>
        </motion.div>
      )}
    </section>
  );
};

const DevelopmentJourney = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  const { toggleChat } = useChat();

  const progressSpring = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <div ref={containerRef} className="relative bg-black">
      <motion.div
        style={{ scaleY: progressSpring }}
        className="fixed top-0 right-0 w-1 h-screen bg-red-600 origin-top z-50 will-change-transform"
      />

      <section className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80&auto=format&fit=crop"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 sm:mb-5 md:mb-6"
          >
            <span className="text-red-600 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">
              The Process
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-4 sm:mb-5 md:mb-6 tracking-tighter leading-[0.9] px-4"
          >
            DEVELOPMENT
            <br />
            <span className="text-red-600">JOURNEY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-14 leading-relaxed px-4"
          >
            Seven stages of excellence. From vision to reality.
            <br className="hidden sm:block" />
            <span className="block sm:inline mt-2 sm:mt-0">This is how DAMNX Solutions builds the future.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center justify-center gap-3 sm:gap-4"
          >
            <div className="h-px w-10 sm:w-14 md:w-16 bg-red-600" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-red-600 rotate-45"
            />
            <div className="h-px w-10 sm:w-14 md:w-16 bg-red-600" />
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
        >
          <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] border border-red-600/20 rounded-full" />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
        >
          <div className="w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] lg:w-[750px] lg:h-[750px] border border-red-600/10 rounded-full" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 sm:bottom-12 md:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-20"
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-6 h-10 sm:w-7 sm:h-11 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {stages.map((stage, index) => (
        <StageSection key={stage.id} stage={stage} index={index} />
      ))}

      <section className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80&auto=format&fit=crop"
            alt="Closing Background"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="mb-6 sm:mb-8 md:mb-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="inline-block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-red-600 leading-none"
            >
              ◈
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-5 md:mb-6 tracking-tighter leading-tight px-4"
          >
            READY TO BUILD
            <br />
            <span className="text-red-600">SOMETHING DAMN GREAT?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: false }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-10 sm:mb-12 md:mb-14 max-w-2xl mx-auto px-4 leading-relaxed"
          >
            Let's transform your vision into a world-class digital product.
          </motion.p>

          <motion.button onClick={toggleChat}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-4 bg-red-600 text-white text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default DevelopmentJourney;