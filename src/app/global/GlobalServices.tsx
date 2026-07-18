"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    num: "01",
    title: "Website Development",
    desc: "Custom web platforms built for speed, SEO, and sustainable growth. From marketing sites to complex web applications.",
    tags: ["Next.js", "React", "TypeScript", "Headless CMS", "Core Web Vitals"],
    range: "$3K – $25K",
  },
  {
    num: "02",
    title: "Mobile Applications",
    desc: "Native and cross-platform iOS & Android experiences that keep users engaged and deliver measurable business outcomes.",
    tags: ["React Native", "Expo", "iOS", "Android", "App Store"],
    range: "$5K – $35K",
  },
  {
    num: "03",
    title: "AI Development",
    desc: "LLMs, AI Agents, RAG pipelines, computer vision, and intelligent automation systems built for production scale.",
    tags: ["OpenAI", "LangChain", "RAG", "Agents", "FastAPI"],
    range: "$2.5K – $15K",
  },
  {
    num: "04",
    title: "UI/UX Design",
    desc: "Human-centered design systems that reduce friction, increase conversion, and communicate your brand with clarity.",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    range: "$1.5K – $10K",
  },
  {
    num: "05",
    title: "Cloud & DevOps",
    desc: "Scalable cloud infrastructure, CI/CD pipelines, container orchestration, and reliability engineering.",
    tags: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
    range: "$3K – $20K",
  },
  {
    num: "06",
    title: "Brand Identity",
    desc: "Modern, distinctive brand identities built for global markets — from visual strategy to full brand systems.",
    tags: ["Brand Strategy", "Logo", "Typography", "Color System"],
    range: "$2K – $12K",
  },
  {
    num: "07",
    title: "Enterprise Software",
    desc: "Custom internal systems, ERPs, CRMs, and operational platforms that replace manual workflows with intelligent automation.",
    tags: ["SaaS", "Multi-tenant", "PostgreSQL", "Node.js"],
    range: "$8K – $50K",
  },
  {
    num: "08",
    title: "Digital Marketing",
    desc: "Data-driven SEO, performance marketing, and content strategy that compounds returns across every growth channel.",
    tags: ["SEO", "Paid Media", "Content", "Analytics", "Growth"],
    range: "$800/mo – $5K/mo",
  },
];

export default function GlobalServices() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="bg-[#f9f8f6] py-24 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 sm:mb-24">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5 text-[11px] font-bold tracking-[0.3em] uppercase text-[#0a0a0a]/40"
            >
              <span className="w-6 h-px bg-[#E5231B]" />
              What We Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-black text-[#0a0a0a] leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
            >
              Our services.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-sm text-sm text-[#0a0a0a]/50 leading-relaxed font-light"
          >
            Eight specialized capabilities, one unified engineering team — built to deliver excellence across every digital discipline.
          </motion.p>
        </div>

        {/* Service cards — editorial accordion list */}
        <div className="flex flex-col">
          {services.map((svc, i) => {
            const isHovered = hovered === i;

            return (
              <motion.div
                key={svc.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative cursor-default py-7 sm:py-9 border-t last:border-b transition-colors duration-300 ${
                  isHovered ? "border-[#0a0a0a]/20" : "border-[#0a0a0a]/8"
                }`}
              >
                {/* Hover background */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0.95 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 -mx-6 sm:-mx-10 bg-white"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 grid grid-cols-12 gap-4 sm:gap-8 items-start">
                  {/* Number */}
                  <div className="col-span-2 sm:col-span-1">
                    <span className={`font-mono text-xs transition-colors duration-300 ${isHovered ? "text-[#E5231B]" : "text-[#0a0a0a]/25"}`}>
                      {svc.num}
                    </span>
                  </div>

                  {/* Title + expand */}
                  <div className="col-span-10 sm:col-span-4">
                    <h3
                      className={`font-black leading-tight tracking-tight transition-colors duration-300 ${isHovered ? "text-[#0a0a0a]" : "text-[#0a0a0a]"}`}
                      style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)" }}
                    >
                      {svc.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="col-span-12 sm:col-span-5 pl-6 sm:pl-0">
                    <p className="text-sm text-[#0a0a0a]/50 leading-relaxed font-light">
                      {svc.desc}
                    </p>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4"
                        >
                          <div className="flex flex-wrap gap-2">
                            {svc.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[#0a0a0a]/12 bg-[#f9f8f6] px-3 py-1 text-[11px] font-semibold text-[#0a0a0a]/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Price range + arrow */}
                  <div className="col-span-12 sm:col-span-2 pl-6 sm:pl-0 flex sm:flex-col sm:items-end gap-3 sm:gap-2">
                    <span className="text-xs font-bold text-[#E5231B]">{svc.range}</span>
                    <motion.div
                      animate={{ rotate: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0.3 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0a0a0a]/15"
                    >
                      <ArrowUpRight size={14} className="text-[#0a0a0a]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
