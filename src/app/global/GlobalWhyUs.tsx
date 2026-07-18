"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const insights = [
  {
    category: "AI",
    title: "How RAG Pipelines Are Transforming Enterprise Knowledge Management",
    date: "July 2026",
    readTime: "6 min read",
    accent: "#E5231B",
  },
  {
    category: "Engineering",
    title: "Building for Scale: Architecture Patterns for Global SaaS Products",
    date: "June 2026",
    readTime: "8 min read",
    accent: "#6366f1",
  },
  {
    category: "Design",
    title: "The ROI of Design Systems: Why Investing Upfront Pays Back 10x",
    date: "June 2026",
    readTime: "5 min read",
    accent: "#10b981",
  },
  {
    category: "Growth",
    title: "Performance Marketing in 2026: What's Working Across Global Markets",
    date: "May 2026",
    readTime: "7 min read",
    accent: "#f59e0b",
  },
  {
    category: "Automation",
    title: "Replacing Manual Workflows: A Step-by-Step AI Automation Playbook",
    date: "May 2026",
    readTime: "9 min read",
    accent: "#8b5cf6",
  },
];

export default function GlobalInsights() {
  return (
    <section id="insights" className="bg-white py-24 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5 text-[11px] font-bold tracking-[0.3em] uppercase text-[#0a0a0a]/40"
            >
              <span className="w-6 h-px bg-[#E5231B]" />
              Insights
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-black text-[#0a0a0a] leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
            >
              Thinking out loud.
            </motion.h2>
          </div>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0a0a0a]/50 hover:text-[#E5231B] transition-colors duration-300 shrink-0"
          >
            All articles
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>

        {/* Article list */}
        <div className="flex flex-col">
          {insights.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
              className="group cursor-pointer py-8 sm:py-10 border-t last:border-b border-[#0a0a0a]/8 hover:border-[#0a0a0a]/20 transition-colors duration-300"
            >
              <div className="grid grid-cols-12 gap-4 sm:gap-8 items-center">
                {/* Category badge */}
                <div className="col-span-12 sm:col-span-2">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${article.accent}18`, color: article.accent }}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-11 sm:col-span-7">
                  <h3
                    className="font-black text-[#0a0a0a] leading-tight tracking-tight group-hover:text-[#E5231B] transition-colors duration-300"
                    style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}
                  >
                    {article.title}
                  </h3>
                </div>

                {/* Meta */}
                <div className="col-span-1 sm:col-span-2 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
                  <span className="text-xs text-[#0a0a0a]/30 font-mono hidden sm:block">{article.date}</span>
                  <span className="text-xs text-[#0a0a0a]/30 hidden sm:block">{article.readTime}</span>
                </div>

                {/* Arrow */}
                <div className="col-span-1 flex justify-end">
                  <motion.div
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0a0a0a]/10 group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] transition-all duration-300"
                  >
                    <ArrowUpRight
                      size={14}
                      className="text-[#0a0a0a]/40 group-hover:text-white transition-colors duration-300"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
