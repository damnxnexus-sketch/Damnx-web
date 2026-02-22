"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Smartphone, Bot, Cpu, ShoppingCart, PaintBucket, Server } from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "Custom Web Apps",
    description: "We don't just build websites; we engineer high-performance web applications using Next.js and React that scale perfectly and dominate SEO.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    icon: Code2,
    highlight: "React & Next.js Ecosystem",
  },
  {
    id: 2,
    title: "Native Mobile Apps",
    description: "iOS and Android applications that feel like magic. We build fluid, native-like experiences that keep your users engaged and coming back.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    icon: Smartphone,
    highlight: "iOS & Android Domination",
  },
  {
    id: 3,
    title: "AI & Chatbots",
    description: "Automate your customer service and lead generation. We build intelligent conversational agents that understand context and sell for you 24/7.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    icon: Bot,
    highlight: "OpenAI & Custom LLMs",
  },
  {
    id: 4,
    title: "E-Commerce Solutions",
    description: "High-converting digital storefronts. From custom carts to seamless payment gateways, we build platforms designed to maximize your revenue.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    icon: ShoppingCart,
    highlight: "Shopify & Custom Commerce",
  },
  {
    id: 5,
    title: "SaaS Architecture",
    description: "Have a software idea? We architect robust, scalable multi-tenant SaaS platforms capable of handling thousands of concurrent users safely.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    icon: Server,
    highlight: "Scalable Cloud Infrastructure",
  },
  {
    id: 6,
    title: "UI/UX Branding",
    description: "We blend consumer psychology with stunning aesthetics. Every button, gradient, and animation is designed to guide the user toward a conversion.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    icon: PaintBucket,
    highlight: "Figma Prototyping",
  },
  {
    id: 7,
    title: "Automation & API",
    description: "Eliminate manual data entry. We connect your disjointed software tools via custom APIs to create seamless, automated business workflows.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    icon: Cpu,
    highlight: "FastAPI & Node.js",
  },
];

export default function ServicesStickyScroll() {
  const [activeService, setActiveService] = useState(0);

  return (
    // Important: Do NOT put overflow-hidden here, or sticky will break!
    <div className="bg-[#030303] min-h-screen relative font-sans w-full max-w-[100vw]">

      {/* FIX 1: Isolated Background Layer 
        By putting overflow-hidden on this absolutely positioned background wrapper, 
        we stop the 800px glowing orb from stretching the mobile screen without breaking CSS sticky!
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] md:w-[800px] h-[400px] bg-red-600/20 blur-[100px] md:blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <div className="relative pt-32 pb-16 px-6 text-center z-10 max-w-4xl mx-auto w-full">
        <h2 className="text-red-600 font-mono text-sm tracking-widest uppercase mb-4">Our Arsenal</h2>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
          WE ENGINEER <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-900">
            DIGITAL DOMINANCE
          </span>
        </h1>
      </div>

      {/* Sticky Scroll Container */}
      <div className="relative flex flex-col md:flex-row items-start max-w-7xl mx-auto px-6 pb-32 w-full">

        {/* LEFT/TOP: Sticky Visual Media */}
        <div className="w-full md:w-1/2 sticky top-[5vh] md:top-0 h-[40vh] md:h-screen flex items-center justify-center z-20 md:pr-10">
          <div className="relative w-full aspect-video md:aspect-[4/5] max-h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_50px_rgba(220,38,38,0.1)] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  fill
                  className="object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                />

                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />

                {/* Floating Tech Badge inside the image */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10"
                >
                  <div className="inline-flex items-center gap-2 md:gap-3 bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                    {React.createElement(services[activeService].icon, { className: "w-4 h-4 md:w-5 md:h-5 text-red-500" })}
                    <span className="text-white text-xs md:text-sm font-medium tracking-wide">
                      {services[activeService].highlight}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT/BOTTOM: Scrollable Text List */}
        <div className="w-full md:w-1/2 relative z-10 pt-[50vh] md:pt-[20vh] pb-[20vh]">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              // FIX 2: Relaxed margins to ensure triggers work smoothly on small mobile screens
              onViewportEnter={() => setActiveService(index)}
              viewport={{ margin: "-30% 0px -30% 0px", amount: "some" }}
              className="mb-20 md:mb-40 transition-all duration-500"
            >
              <div
                className={`flex flex-col gap-3 md:gap-4 border-l-4 pl-5 md:pl-10 py-2 transition-all duration-500 ${activeService === index
                    ? "border-red-600 opacity-100 scale-100"
                    : "border-zinc-800 opacity-30 scale-95"
                  }`}
              >
                <span className="text-red-600 font-mono text-lg md:text-xl font-bold">0{service.id}</span>
                <h3 className="text-2xl md:text-5xl font-extrabold text-white tracking-tight">
                  {service.title}
                </h3>
                <p className="text-base md:text-xl text-zinc-400 leading-relaxed max-w-lg mt-1 md:mt-2">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}