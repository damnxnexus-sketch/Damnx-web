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

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]), springConfig);
  
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.3, 0.4, 0.3, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
      <motion.div
        style={{ opacity: imageOpacity, scale: imageScale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={stage.imageUrl}
          alt={stage.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60 sm:bg-black/55 lg:bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </motion.div>

      <motion.div
        style={{ y, opacity, scale, rotateX }}
        className="relative z-10 max-w-6xl w-full"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8"
        >
          <motion.div
            animate={isInView ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-red-600 flex-shrink-0"
          >
            {stage.icon}
          </motion.div>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-red-600 to-transparent" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-white/40 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light flex-shrink-0"
          >
            0{stage.id}
          </motion.span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tighter leading-none"
        >
          {stage.title}
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-red-600 font-bold mb-4 sm:mb-6 md:mb-8 tracking-wide"
        >
          {stage.subtitle}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <div className="absolute -left-2 sm:-left-3 md:-left-4 top-0 w-0.5 sm:w-1 h-full bg-red-600" />
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl pl-4 sm:pl-6 md:pl-8">
            {stage.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 h-0.5 sm:h-1 bg-red-600 origin-left w-32 sm:w-48 md:w-64 lg:w-80"
        />
      </motion.div>

      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.1, 0.03])
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
      >
        <div className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[25rem] 2xl:text-[30rem] font-black text-white/5 select-none leading-none">
          0{stage.id}
        </div>
      </motion.div>

      {index < stages.length - 1 && (
        <motion.div
          style={{ 
            opacity: useTransform(scrollYProgress, [0.7, 1], [0, 1]),
            scale: useTransform(scrollYProgress, [0.7, 1], [0.5, 1])
          }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-red-600 rounded-full flex items-start justify-center p-1.5 sm:p-2"
          >
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-600 rounded-full" />
          </motion.div>
          <span className="text-white/60 text-xs sm:text-sm uppercase tracking-widest">Next</span>
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

  const progressSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative bg-black">
      <motion.div
        style={{ scaleY: progressSpring }}
        className="fixed top-0 right-0 w-1 h-screen bg-red-600 origin-top z-50"
      />

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-3 sm:mb-4 md:mb-6"
          >
            <span className="text-red-600 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">
              The Process
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tighter leading-none px-4"
          >
            DEVELOPMENT
            <br />
            <span className="text-red-600">JOURNEY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/70 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4"
          >
            Seven stages of excellence. From vision to reality.
            <br className="hidden sm:block" />
            <span className="sm:inline block mt-1 sm:mt-0">This is how DAMNX Solutions builds the future.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
          >
            <div className="h-px w-8 sm:w-12 md:w-16 bg-red-600" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 border-2 border-red-600 rotate-45"
            />
            <div className="h-px w-8 sm:w-12 md:w-16 bg-red-600" />
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
        >
          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] border border-red-600/20 rounded-full" />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
        >
          <div className="w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] border border-red-600/10 rounded-full" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3 z-20"
        >
          <span className="text-white/50 text-xs sm:text-sm uppercase tracking-widest">Scroll to explore</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5 sm:p-2">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {stages.map((stage, index) => (
        <StageSection key={stage.id} stage={stage} index={index} />
      ))}

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
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
          transition={{ duration: 1.5 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: false }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-red-600"
            >
              ◈
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: false }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tighter leading-tight px-4"
          >
            READY TO BUILD
            <br />
            <span className="text-red-600">SOMETHING DAMN GREAT?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: false }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4 leading-relaxed"
          >
            Let's transform your vision into a world-class digital product.
          </motion.p>

          <motion.button onClick={toggleChat}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 lg:px-12 lg:py-4 bg-red-600 text-white text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default DevelopmentJourney;