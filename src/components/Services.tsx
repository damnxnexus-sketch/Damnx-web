'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useShouldReduceEffects } from '@/hooks/useDeviceDetection';
import MobileFriendlyBackground from './MobileFriendlyBackground';

// Lazy load Waves only when needed
const Waves = dynamic(() => import('./Waves'), {
  ssr: false,
  loading: () => null
});

const services = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Crafting digital experiences that transcend expectations. Every pixel, every interaction, meticulously engineered for perfection.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    reverse: false
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Native experiences that feel like magic. iOS and Android applications built with obsessive attention to detail.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    reverse: true
  },
  {
    id: 3,
    title: 'Chatbot Development',
    description: 'Intelligent conversations that understand context. Seamless integration that feels naturally human.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
    reverse: false
  },
  {
    id: 4,
    title: 'UI / UX Design',
    description: 'Design systems that speak volumes. Interfaces so intuitive, they disappear into pure experience.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    reverse: true
  },
  {
    id: 5,
    title: 'Logo & Branding',
    description: 'Identity crafted to perfection. Visual languages that resonate across every touchpoint.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    reverse: false
  },
  {
    id: 6,
    title: 'AI Chatbots',
    description: 'Next-generation intelligence. Conversational AI that learns, adapts, and delivers unprecedented value.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    reverse: true
  }
];

const benefitsData: Record<number, Array<{ title: string; desc: string }>> = {
  1: [
    { title: 'Increase Conversions', desc: 'Professional websites convert 200% more visitors into customers' },
    { title: '24/7 Presence', desc: 'Your business never sleeps with a powerful online presence' },
    { title: 'Build Credibility', desc: '75% of users judge business credibility by website design' }
  ],
  2: [
    { title: 'Customer Engagement', desc: 'Mobile apps see 3x higher engagement than mobile websites' },
    { title: 'Brand Loyalty', desc: 'Direct channel to your customers\' pockets builds retention' },
    { title: 'Revenue Growth', desc: 'App users spend 2x more than mobile web users' }
  ],
  3: [
    { title: 'Instant Support', desc: 'Reduce response time from hours to seconds' },
    { title: 'Cost Efficiency', desc: 'Handle 80% of queries automatically, saving support costs' },
    { title: 'Lead Generation', desc: 'Capture and qualify leads 24/7 without human intervention' }
  ],
  4: [
    { title: 'User Satisfaction', desc: 'Good UX increases customer satisfaction by 200%' },
    { title: 'ROI Boost', desc: 'Every $1 invested in UX returns $100 in ROI' },
    { title: 'Competitive Edge', desc: 'Stand out with intuitive, beautiful interfaces' }
  ],
  5: [
    { title: 'Brand Recognition', desc: 'Consistent branding increases revenue by 23%' },
    { title: 'Trust Building', desc: 'Professional identity makes your brand memorable' },
    { title: 'Market Position', desc: 'Stand out in crowded markets with unique visual identity' }
  ],
  6: [
    { title: 'Smart Automation', desc: 'AI handles complex queries with human-like understanding' },
    { title: 'Scale Effortlessly', desc: 'Handle thousands of conversations simultaneously' },
    { title: 'Data Insights', desc: 'Learn customer preferences and behavior patterns automatically' }
  ]
};

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const shouldReduceEffects = useShouldReduceEffects();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Create base transforms first, then apply conditionally
  const yTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    shouldReduceEffects ? [0, 0] : [100, -100]
  );
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const y = yTransform;
  const opacity = opacityTransform;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`min-h-screen flex flex-col ${service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-center gap-12 lg:gap-24 px-6 lg:px-20 py-20 relative`}
    >
      {/* Background Decor */}
      <div className={`absolute top-1/2 ${service.reverse ? 'left-0' : 'right-0'} w-1/2 h-1/2 bg-red-900/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none`} />

      {/* Text Content */}
      <div className="w-full lg:w-1/2 relative z-[15]">
        <motion.div
          initial={{ opacity: 0, x: service.reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-red-500 font-bold tracking-[0.2em] mb-4 text-sm uppercase">
            0{service.id} — Service
          </span>
          <h2 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            {service.title}
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
            {service.description}
          </p>

          {/* Interactive Benefits Area */}
          <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${isHovered ? 'bg-zinc-900/80 border-red-500/30 shadow-2xl shadow-red-900/20' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${isHovered ? 'text-red-500' : 'text-zinc-500'} transition-colors`} />
                  Key Benefits
                </span>
                <ArrowRight className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isHovered ? 'rotate-90 text-red-500' : ''}`} />
              </div>

              <motion.div
                initial={false}
                animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                className="overflow-hidden"
              >
                <ul className="space-y-4 pt-2">
                  {benefitsData[service.id].map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="mt-1 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-red-500" />
                      </span>
                      <div>
                        <strong className="text-white block mb-0.5">{benefit.title}</strong>
                        <span className="text-zinc-400">{benefit.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {!isHovered && (
                <p className="text-zinc-500 text-sm">Hover to explore capabilities</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Parallax */}
      <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative">
        <motion.div
          style={{ y }}
          className="w-full h-full rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
              quality={75}
            />
          </motion.div>
          {/* Overlay Grid */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-20 pointer-events-none" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ServicesShowcase() {
  const shouldReduceEffects = useShouldReduceEffects();

  return (
    <div className="bg-black min-h-[100dvh] relative overflow-x-hidden font-sans selection:bg-red-500/30 selection:text-white">
      {/* Global Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black pointer-events-none" />

      {/* Waves Background - Disabled on mobile for performance */}
      {!shouldReduceEffects ? (
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <Waves
            lineColor="#ff0000"
            backgroundColor="#0000"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
      ) : (
        <MobileFriendlyBackground variant="waves" className="z-0" />
      )}

      <div className="relative pt-32 pb-20 px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-800">Services</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg lg:text-xl font-light">
            Comprehensive solutions tailored to transform your vision into reality. We build digital excellence.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Decorative Gradient Line */}
      <div className="fixed left-6 lg:left-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-900/20 to-transparent pointer-events-none hidden lg:block" />
      <div className="fixed right-6 lg:right-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-900/20 to-transparent pointer-events-none hidden lg:block" />
    </div>
  );
}
