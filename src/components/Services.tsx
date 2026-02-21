'use client';

import React, { useRef, useState, MouseEvent, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Code2, Smartphone, Bot } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Crafting digital experiences that transcend expectations. Every pixel engineered for perfection.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    icon: Code2,
    reverse: false
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Native experiences that feel like magic. iOS and Android apps built with obsessive attention to detail.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    icon: Smartphone,
    reverse: true
  },
  {
    id: 3,
    title: 'Chatbot Development',
    description: 'Intelligent conversations that understand context. Seamless integration that feels naturally human.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
    icon: Bot,
    reverse: false
  }
];

const benefitsData: Record<number, Array<{ title: string; desc: string }>> = {
  1: [
    { title: 'Increase Conversions', desc: 'Professional websites convert 200% more visitors' },
    { title: 'Modern Stack', desc: 'Built with Next.js for blazing fast performance' }
  ],
  2: [
    { title: 'Customer Engagement', desc: 'Mobile apps see 3x higher engagement' },
    { title: 'Native Feel', desc: 'Smooth, fluid animations and interactions' }
  ],
  3: [
    { title: 'Instant Support', desc: 'Reduce response time from hours to seconds' },
    { title: 'Scale Effortlessly', desc: 'Handle thousands of conversations at once' }
  ]
};

// 3D Tilt Card Component
const TiltImage = ({ image, title, Icon }: { image: string, title: string, Icon: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="w-full h-[400px] lg:h-[550px] relative rounded-3xl cursor-pointer perspective-1000 group"
    >
      {/* Back Layer (Shadow/Glow) */}
      <div
        style={{ transform: "translateZ(-40px)" }}
        className="absolute inset-4 bg-red-600/30 blur-2xl rounded-3xl transition-opacity duration-500 opacity-50 group-hover:opacity-100"
      />

      {/* Main Image Layer (Full Color) */}
      <div
        style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Subtle gradient so the floating card stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      </div>

      {/* Floating 3D Elements */}
      <motion.div
        style={{ transform: "translateZ(80px)" }}
        className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none"
      >
        <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
            <Icon className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm drop-shadow-md">Premium Tech</p>
            <p className="text-zinc-300 text-xs">High Performance</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`py-16 flex flex-col ${service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-center gap-12 lg:gap-20 px-6 lg:px-20 relative z-10 perspective-1000`}>

      {/* 3D Image Container */}
      <div className="w-full lg:w-1/2 relative z-20 hidden lg:block">
        <TiltImage image={service.image} title={service.title} Icon={service.icon} />
      </div>

      {/* Mobile Fallback Image */}
      <div className="w-full h-[350px] relative rounded-3xl overflow-hidden lg:hidden border border-white/10 shadow-2xl">
        <Image src={service.image} alt={service.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-1/2 relative z-30">
        <motion.div
          initial={{ opacity: 0, x: service.reverse ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-red-500 font-mono font-bold tracking-widest text-sm uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Service_0{service.id}
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {service.title}
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed mb-8 border-l-2 border-red-500/50 pl-5">
            {service.description}
          </p>

          {/* Interactive Benefits Area - Now triggers on Hover */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`p-6 rounded-2xl transition-all duration-500 ${isHovered ? 'bg-zinc-900/90 border border-red-500/40 shadow-[0_0_30px_rgba(220,38,38,0.15)] transform scale-[1.02]' : 'bg-white/[0.02] border border-white/10'}`}>
              <div className="flex items-center justify-between cursor-default">
                <span className="text-white font-medium flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${isHovered ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-zinc-400'}`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  System Capabilities
                </span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-500 ${isHovered ? 'rotate-90 text-red-500' : 'text-zinc-600'}`} />
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                      {benefitsData[service.id]?.map((benefit, idx) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.3 }}
                          key={idx}
                          className="bg-black/50 p-4 rounded-xl border border-white/5 hover:border-red-500/30 transition-colors"
                        >
                          <Check className="w-4 h-4 text-red-500 mb-2" />
                          <strong className="text-zinc-200 block text-sm mb-1">{benefit.title}</strong>
                          <span className="text-zinc-500 text-xs leading-relaxed block">{benefit.desc}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function ServicesShowcaseAurora() {
  return (
    <div className="bg-[#030303] min-h-screen relative overflow-hidden font-sans">

      {/* Custom CSS for the Aurora Background Animation
        Placed securely in a style block so it drops right into your Next.js project
      */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes aurora {
          0% { background-position: 50% 50%, 50% 50%; }
          50% { background-position: 100% 50%, 0% 50%; }
          100% { background-position: 50% 50%, 50% 50%; }
        }
        .aurora-bg {
          background-image: 
            radial-gradient(ellipse at 100% 0%, rgba(220, 38, 38, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 100%, rgba(153, 27, 27, 0.1) 0%, transparent 50%);
          background-size: 200% 200%;
          animation: aurora 15s ease infinite;
        }
      `}} />

      {/* Aurora Background Layer */}
      <div className="absolute inset-0 z-0 aurora-bg pointer-events-none" />

      {/* Subtle Noise Texture Overlay for that premium grainy agency feel */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Header */}
      <div className="relative pt-32 pb-12 px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
            DIGITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-900">ARCHITECTS</span>
          </h1>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col gap-20 pb-32 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}