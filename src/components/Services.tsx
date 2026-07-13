'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Custom Web Apps",
    description: "High-performance web applications engineered using Next.js and React. Built to scale perfectly and dominate search engine rankings.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    id: "02",
    title: "Native Mobile Apps",
    description: "Fluid, native-like iOS and Android experiences designed to keep your users engaged and seamlessly connected.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
  {
    id: "03",
    title: "AI & Chatbots",
    description: "Intelligent conversational agents that understand context, automate customer service, and drive lead generation round the clock.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    id: "04",
    title: "E-Commerce Solutions",
    description: "High-converting digital storefronts with seamless payment gateways, designed explicitly to maximize your revenue.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    id: "05",
    title: "SaaS Architecture",
    description: "Robust, multi-tenant SaaS platforms architected to safely handle thousands of concurrent users with zero friction.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
  {
    id: "06",
    title: "UI/UX Branding",
    description: "Where consumer psychology meets stark aesthetics. Every interaction is designed to intuitively guide the user toward conversion.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    id: "07",
    title: "Automation & API",
    description: "Custom APIs that connect your disjointed software tools, eliminating manual entry and creating seamless business workflows.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
];

export default function ServicesMinimal() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#050505] text-zinc-100 min-h-screen py-24 px-6 md:px-12 font-sans selection:bg-[#E6192B]/30 selection:text-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

        {/* Left Side: Sticky Image Display */}
        <div className="w-full lg:w-5/12 sticky top-24 hidden md:block">

          {/* Section Header */}
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-4 font-semibold">
              Our Arsenal
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-snug">
              We engineer <br />
              <span className="font-semibold text-white">digital dominance.</span>
            </h2>
          </div>

          {/* Minimal Image Container */}
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={services[activeIndex].image}
                  alt={services[activeIndex].title}
                  fill
                  className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Clean List */}
        <div className="w-full lg:w-7/12 flex flex-col pt-4 lg:pt-32">

          {/* Mobile Header (Hidden on Desktop) */}
          <div className="mb-12 md:hidden">
            <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-4 font-semibold">
              Our Arsenal
            </p>
            <h2 className="text-3xl font-light tracking-tight leading-snug">
              We engineer <br />
              <span className="font-semibold text-white">digital dominance.</span>
            </h2>
          </div>

          {/* Accordion / List */}
          <div className="border-t border-zinc-900">
            {services.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group cursor-pointer py-6 md:py-8 border-b border-zinc-900 transition-colors duration-300`}
                >
                  <div className="flex items-start justify-between gap-6">

                    {/* Number & Title */}
                    <div className="flex gap-6 md:gap-8 items-baseline">
                      <span className={`text-xs font-mono transition-colors duration-300 ${isActive ? "text-[#E6192B]" : "text-zinc-600 group-hover:text-zinc-400"}`}>
                        {service.id}
                      </span>

                      <div>
                        <h3 className={`text-xl md:text-2xl tracking-tight transition-colors duration-300 ${isActive ? "font-semibold text-white" : "font-normal text-zinc-400 group-hover:text-zinc-200"}`}>
                          {service.title}
                        </h3>

                        {/* Expandable Description */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: "1rem" }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-md">
                                {service.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Minimal Arrow */}
                    <div className="mt-1 flex-shrink-0 opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className={`w-5 h-5 ${isActive ? "text-[#E6192B]" : "text-zinc-500"}`} />
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}