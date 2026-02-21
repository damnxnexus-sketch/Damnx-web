'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import Image from 'next/image';

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

  return (
    <div className={`py-16 lg:py-32 flex flex-col ${service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-center gap-12 lg:gap-24 px-6 lg:px-20 relative z-10 overflow-hidden`}>

      {/* Optimized Background Glow (Replaces heavy blur) */}
      <div className={`absolute top-1/2 ${service.reverse ? 'left-[-10%]' : 'right-[-10%]'} w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(220,38,38,0.08)_0%,rgba(0,0,0,0)_70%)] rounded-full -translate-y-1/2 pointer-events-none z-0`} />

      {/* Text Content */}
      <div className="w-full lg:w-1/2 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-8 bg-red-500 rounded-full"></span>
            <span className="text-red-500 font-bold tracking-[0.2em] text-xs uppercase">
              0{service.id} // Service
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {service.title}
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
            {service.description}
          </p>

          {/* Interactive Benefits Area */}
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)} // Better mobile support
          >
            <div className={`p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${isHovered ? 'bg-zinc-900/60 border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.1)]' : 'bg-white/[0.02] border-white/10'}`}>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${isHovered ? 'text-red-500' : 'text-zinc-500'} transition-colors`} />
                  Explore Capabilities
                </span>
                <div className={`p-2 rounded-full transition-colors ${isHovered ? 'bg-red-500/10' : 'bg-transparent'}`}>
                  <ArrowRight className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'rotate-90 text-red-500' : 'text-zinc-500'}`} />
                </div>
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-4 pt-6">
                      {benefitsData[service.id].map((benefit, idx) => (
                        <motion.li
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          key={idx}
                          className="flex items-start gap-3 text-sm"
                        >
                          <span className="mt-0.5 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                            <Check className="w-3 h-3 text-red-500" />
                          </span>
                          <div>
                            <strong className="text-zinc-200 block mb-0.5 text-base">{benefit.title}</strong>
                            <span className="text-zinc-500 leading-relaxed">{benefit.desc}</span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Presentation */}
      <div className="w-full lg:w-1/2 h-[400px] lg:h-[550px] relative z-10 mt-8 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="w-full h-full rounded-3xl overflow-hidden relative border border-white/5 shadow-2xl group bg-zinc-900"
        >
          {/* Inner Image Hover Zoom */}
          <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-80 mix-blend-lighten"
              loading="lazy"
              quality={85}
            />
          </div>

          {/* Gradients to blend image perfectly into the dark theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
        </motion.div>
      </div>
    </div>
  );
};

export default function ServicesShowcase() {
  return (
    <div className="bg-black min-h-[100dvh] relative overflow-x-hidden font-sans selection:bg-red-500/30 selection:text-white">

      {/* Optimized Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle dot matrix grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15)_0%,rgba(0,0,0,0)_70%)] opacity-50" />
      </div>

      {/* Header Section */}
      <div className="relative pt-40 pb-12 px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Digital Excellence</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Services</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg lg:text-xl font-light">
            Comprehensive solutions tailored to transform your vision into reality. We build modern digital architectures.
          </p>
        </motion.div>
      </div>

      {/* Services List */}
      <div className="relative z-10 flex flex-col gap-8 lg:gap-0 pb-32">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Elegant Side Lines */}
      <div className="fixed left-6 lg:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none hidden md:block" />
      <div className="fixed right-6 lg:right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none hidden md:block" />
    </div>
  );
}