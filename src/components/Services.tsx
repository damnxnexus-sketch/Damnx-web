'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Smartphone, Sparkles, ShoppingBag, Server, Palette, Cpu, Check, ArrowRight, TrendingUp } from "lucide-react";

// Enriched services data with specific tech tags, features, and Lucide icons
const services = [
  {
    id: "01",
    title: "Custom Web Apps",
    description: "We don't just build websites; we engineer high-performance web applications using Next.js and React that scale perfectly and dominate SEO.",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1000",
    icon: Globe,
    tags: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "SEO Engine"],
    features: ["PWA Capabilities", "SSG & ISR Rendering", "Core Web Vitals A+"]
  },
  {
    id: "02",
    title: "Native Mobile Apps",
    description: "Fluid, native-like iOS and Android experiences designed to keep your users engaged and seamlessly connected.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
    icon: Smartphone,
    tags: ["React Native", "Expo Go", "iOS & Android", "App Store Release"],
    features: ["Native Bridging", "Offline-First Sync", "Push Notifications"]
  },
  {
    id: "03",
    title: "AI & Chatbots",
    description: "Intelligent conversational agents that understand context, automate customer service, and drive lead generation round the clock.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    icon: Sparkles,
    tags: ["OpenAI API", "Vector Embeddings", "RAG Pipeline", "AI Agents"],
    features: ["Context-Aware Support", "Lead Gen Workflows", "Multi-model Routing"]
  },
  {
    id: "04",
    title: "E-Commerce Solutions",
    description: "High-converting digital storefronts with seamless payment gateways, designed explicitly to maximize your revenue.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000",
    icon: ShoppingBag,
    tags: ["Stripe Checkout", "Payload CMS", "Shopify API", "Optimized Cart"],
    features: ["One-Click Checkout", "Abandoned Cart Recovery", "Global Tax Rules"]
  },
  {
    id: "05",
    title: "SaaS Architecture",
    description: "Robust, multi-tenant SaaS platforms architected to safely handle thousands of concurrent users with zero friction.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    icon: Server,
    tags: ["Supabase", "Node.js", "PostgreSQL", "Docker", "AWS Deploy"],
    features: ["Multi-Tenant DBs", "Subdomain Routing", "Role-Based Access"]
  },
  {
    id: "06",
    title: "UI/UX Branding",
    description: "Where consumer psychology meets stark aesthetics. Every interaction is designed to intuitively guide the user toward conversion.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000",
    icon: Palette,
    tags: ["Figma Systems", "Interactive Prototypes", "Stark Aesthetics"],
    features: ["User Journey Mapping", "Tailored Color Palettes", "Micro-Interactions"]
  },
  {
    id: "07",
    title: "Automation & API",
    description: "Custom APIs that connect your disjointed software tools, eliminating manual entry and creating seamless business workflows.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    icon: Cpu,
    tags: ["GraphQL / REST", "Zapier Hooks", "Make.com", "Cron Workflows"],
    features: ["Automated Data Ingestion", "Webhooks Syncing", "Legacy Software Bridges"]
  },
  {
    id: "08",
    title: "Growth Marketing",
    description: "We build complete multi-channel growth systems—combining performance marketing, SEO/AEO optimization, and funnel design to grow revenue, not just clicks.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    icon: TrendingUp,
    tags: ["Performance Ads", "Growth Funnels", "SEO & AEO", "Revenue Attribution"],
    features: ["Multi-channel Campaigns", "Conversion Rate Audits", "Data-Driven ROI tracking"]
  },
];

export default function ServicesArsenal() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center py-24 px-6 md:px-12 lg:px-16 font-sans overflow-hidden">
      
      {/* Background Subtle Glowing Orbs */}
      <div 
        aria-hidden
        className="absolute top-[10%] left-[20%] w-[60vw] max-w-[600px] h-[400px] rounded-full bg-gradient-to-tr from-red-950/10 to-transparent blur-[130px] pointer-events-none z-0" 
      />
      <div 
        aria-hidden
        className="absolute bottom-[10%] right-[10%] w-[50vw] max-w-[500px] h-[400px] rounded-full bg-gradient-to-tr from-purple-950/5 to-transparent blur-[120px] pointer-events-none z-0" 
      />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-start">
        
        {/* --- HEADER SECTION --- */}
        <div className="relative z-10 w-full mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 border border-white/5 rounded-full px-3 py-1 mb-4 bg-white/[0.02] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5231B] animate-pulse" />
              <span className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase">
                // Capabilities & Services
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Our <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">Arsenal</span> of Solutions
            </h2>
          </div>
          <p className="text-zinc-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            We build high-performance products that scale. From reactive web applications to offline-first native mobile apps and integrated AI agents.
          </p>
        </div>

        {/* --- TWO COLUMN LAYOUT --- */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Interactive List of Services */}
          <div className="w-full lg:col-span-7 flex flex-col">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`relative cursor-pointer py-6 md:py-8 border-t transition-all duration-300 px-4 md:px-6 flex flex-col select-none overflow-hidden ${
                    isActive ? "border-transparent" : "border-white/[0.06] hover:border-white/[0.12]"
                  } ${index === services.length - 1 && !isActive ? "border-b" : ""}`}
                >
                  
                  {/* Sliding Active Indicator Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeHighlight"
                      className="absolute inset-0 bg-gradient-to-r from-[#E5231B]/6 via-red-950/[0.01] to-transparent border-l-2 border-[#E5231B] z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Header Row (Number, Icon, Title, Arrow) */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center gap-4 md:gap-6">
                      
                      {/* Number ID */}
                      <span className={`font-mono text-xs md:text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-[#E5231B]" : "text-zinc-500"
                      }`}>
                        {service.id}
                      </span>

                      {/* Icon */}
                      <span className={`transition-colors duration-300 ${
                        isActive ? "text-[#E5231B]" : "text-zinc-400 group-hover:text-zinc-300"
                      }`}>
                        <Icon size={18} />
                      </span>

                      {/* Title */}
                      <h3 className={`text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 ${
                        isActive ? "text-white translate-x-1" : "text-zinc-400 hover:text-zinc-200"
                      }`}>
                        {service.title}
                      </h3>

                    </div>

                    {/* Arrow / Chevron */}
                    <div className="flex-shrink-0">
                      <ArrowRight 
                        size={16} 
                        className={`transition-all duration-300 ${
                          isActive ? "text-[#E5231B] rotate-45 scale-110" : "text-zinc-600 rotate-0"
                        }`} 
                      />
                    </div>
                  </div>

                  {/* Accordion Content for Details */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 w-full pl-8 md:pl-10 overflow-hidden"
                      >
                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light mb-5 max-w-xl">
                          {service.description}
                        </p>

                        {/* Tech tags list */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] md:text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-zinc-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Features checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {service.features.map((feat) => (
                            <div key={feat} className="flex items-center gap-2 text-xs text-zinc-500">
                              <Check size={12} className="text-[#E5231B] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Interactive Terminal/Browser Preview (Desktop only) */}
          <div className="hidden lg:block lg:col-span-5 relative h-full">
            <div className="sticky top-28 self-start">
              
              {/* Background glow behind card */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#E5231B]/15 to-purple-900/5 blur-2xl pointer-events-none -z-10 animate-pulse duration-3000" />

              {/* Elegant macOS frame */}
              <div className="w-full rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/85 backdrop-blur-md overflow-hidden shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] flex flex-col">
                
                {/* Tab bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-black/40">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                    <span>{services[activeIndex].title.toLowerCase().replace(/\s+/g, '-')}.config</span>
                  </div>
                  <div className="w-12" /> {/* Spacer */}
                </div>

                {/* Frame content */}
                <div className="relative aspect-[4/3] w-full bg-zinc-950 overflow-hidden">
                  
                  {/* Animated Image Showcase */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 0.7, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={services[activeIndex].image}
                        alt={services[activeIndex].title}
                        className="w-full h-full object-cover select-none"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Ambient Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/20" />

                  {/* Active Icon Floating Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div
                      key={`icon-${activeIndex}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="p-3 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md text-[#E5231B]"
                    >
                      {React.createElement(services[activeIndex].icon, { size: 20 })}
                    </motion.div>
                  </div>

                  {/* Floating tech badges / overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                    <motion.div
                      key={`title-${activeIndex}`}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                        // Selected Capability
                      </span>
                      <h4 className="text-xl font-bold text-white tracking-tight">
                        {services[activeIndex].title}
                      </h4>
                    </motion.div>
                  </div>

                </div>

                {/* Specs Panel at the bottom */}
                <div className="p-5 border-t border-white/[0.06] bg-black/60 font-mono text-[11px] space-y-2 text-zinc-400">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">ENGINEERED BY</span>
                    <span className="text-zinc-300 font-semibold">DAMNX LABS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">SYSTEM STATUS</span>
                    <span className="text-emerald-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      OPERATIONAL
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">CORE OBJECTIVE</span>
                    <span className="text-zinc-300 font-medium">MAXIMUM PERFORMANCE</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}