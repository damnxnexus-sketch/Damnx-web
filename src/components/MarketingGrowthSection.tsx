'use client';

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Target, Layers, Zap, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const growthPillars = [
  {
    icon: Target,
    title: "Growth Opportunities Research",
    description: "We perform deep market research and competitor mapping to identify high-leverage acquisition channels specific to your business model."
  },
  {
    icon: Layers,
    title: "Complete Funnel Engineering",
    description: "From custom next-gen landing pages to automated email/SMS sequences and CRM integrations, we build systems that turn traffic into revenue."
  },
  {
    icon: Zap,
    title: "Multi-Channel Domination",
    description: "Ads, cold outreach, viral content, and organic SEO. We run multi-channel campaigns doing whatever it takes to acquire customers for you."
  }
];

export default function MarketingGrowthSection() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-16 bg-black overflow-hidden border-t border-white/[0.04]">
      
      {/* Background soft red radial glow */}
      <div 
        aria-hidden 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[700px] h-[400px] rounded-full bg-gradient-to-tr from-red-950/5 to-transparent blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-[#E5231B]/20 rounded-full px-3 py-1 mb-4 bg-[#E5231B]/5 backdrop-blur-md">
              <TrendingUp size={12} className="text-[#E5231B]" />
              <span className="text-[#E5231B] font-mono text-[10px] tracking-widest uppercase font-semibold">
                // Beyond Traditional Marketing
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
              We Don&apos;t Just Run Ads. <br />
              We <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">Engineer Revenue Growth</span>.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 max-w-md">
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              Vanity metrics like impressions and clicks don&apos;t pay the bills. We build end-to-end user acquisition pipelines focused strictly on cold hard revenue and long-term customer value.
            </p>
            <Link 
              href="/marketing"
              className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-[#E5231B] transition-colors group mt-2"
            >
              EXPLORE OUR GROWTH FORMULA
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* --- STATS STRIP --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 py-8 px-6 border-y border-white/[0.06] bg-white/[0.01] rounded-xl mb-16 backdrop-blur-sm">
          <div className="flex flex-col">
            <span className="text-3xl md:text-4xl font-black text-white">3×</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Average Business ROI</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl md:text-4xl font-black text-white">125+</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Growth Campaigns Launched</span>
          </div>
          <div className="flex flex-col col-span-2 md:col-span-1">
            <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E5231B] to-red-400">98%</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Client Retention Rate</span>
          </div>
        </div>

        {/* --- PILLARS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {growthPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col p-6 rounded-2xl border border-white/[0.06] bg-[#070707] hover:border-[#E5231B]/30 hover:bg-[#0d0d0d] transition-all duration-300"
              >
                {/* Glowing hover card spotlight */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top_left,rgba(229,35,27,0.06),transparent_60%)]" />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#E5231B] group-hover:bg-[#E5231B]/10 transition-colors mb-6">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#E5231B] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="flex justify-center mt-16 md:mt-20">
          <Link 
            href="/marketing"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:border-[#E5231B]/40 hover:bg-[#E5231B]/10 overflow-hidden transition-all duration-300"
          >
            {/* Background slider hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E5231B]/20 to-transparent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            
            <span className="relative z-10 text-sm font-medium text-white tracking-wide">
              Accelerate Your Business Growth
            </span>
            <ArrowRight size={16} className="relative z-10 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

      </div>
    </section>
  );
}
