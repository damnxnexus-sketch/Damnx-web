"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "AWS", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "OpenAI", category: "AI" },
  { name: "Anthropic", category: "AI" },
  { name: "LangChain", category: "AI" },
  { name: "Supabase", category: "Backend" },
  { name: "Firebase", category: "Backend" },
];

const categoryColors: Record<string, string> = {
  Frontend: "#6366f1",
  Backend: "#10b981",
  Cloud: "#f59e0b",
  DevOps: "#ec4899",
  Database: "#8b5cf6",
  AI: "#E5231B",
};

const caseStudies = [
  {
    num: "01",
    title: "Luxury Resort Platform",
    category: "Hospitality · Web + Mobile",
    year: "2025",
    desc: "End-to-end digital platform for a chain of luxury resorts — including booking engine, guest app, and operational dashboard.",
    gradient: "from-amber-50 to-orange-50",
    accent: "#f59e0b",
  },
  {
    num: "02",
    title: "EdTech SaaS",
    category: "Education · SaaS Platform",
    year: "2024",
    desc: "Multi-tenant learning management system serving 50,000+ students across 8 countries with AI-powered tutoring.",
    gradient: "from-indigo-50 to-blue-50",
    accent: "#6366f1",
  },
  {
    num: "03",
    title: "Healthcare Portal",
    category: "Healthcare · Enterprise Web",
    year: "2025",
    desc: "HIPAA-compliant patient portal with EHR integration, telemedicine, and automated appointment scheduling.",
    gradient: "from-emerald-50 to-teal-50",
    accent: "#10b981",
  },
  {
    num: "04",
    title: "AI Automation Platform",
    category: "Enterprise · AI / LLM",
    year: "2026",
    desc: "LangChain-based document intelligence platform automating 10,000+ daily workflows for a Fortune 500 client.",
    gradient: "from-red-50 to-rose-50",
    accent: "#E5231B",
  },
  {
    num: "05",
    title: "Enterprise Dashboard",
    category: "Finance · Analytics SaaS",
    year: "2024",
    desc: "Real-time financial analytics platform with 200+ custom visualizations, role-based access, and automated reporting.",
    gradient: "from-violet-50 to-purple-50",
    accent: "#8b5cf6",
  },
];

export default function GlobalTechAndWork() {
  return (
    <>
      {/* Tech Stack */}
      <section className="bg-white py-24 sm:py-36 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8 text-[11px] font-bold tracking-[0.3em] uppercase text-[#0a0a0a]/40"
          >
            <span className="w-6 h-px bg-[#E5231B]" />
            Technology
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-black text-[#0a0a0a] leading-[0.93] tracking-tight mb-14 sm:mb-20"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Built with the
            <br />
            world&apos;s best tools.
          </motion.h2>

          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: EASE }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="group flex items-center gap-2.5 rounded-2xl border border-[#e8e8e8] bg-[#f9f8f6] px-5 py-3 cursor-default hover:border-[#0a0a0a]/20 transition-all duration-300"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: categoryColors[tech.category] }}
                />
                <span className="text-sm font-bold text-[#0a0a0a]">{tech.name}</span>
                <span className="text-[10px] text-[#0a0a0a]/30 font-medium">{tech.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work" className="bg-[#f9f8f6] py-24 sm:py-36 border-t border-[#0a0a0a]/6">
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
                Selected Work
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                className="font-black text-[#0a0a0a] leading-[0.93] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
              >
                Case studies.
              </motion.h2>
            </div>
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0a0a0a]/50 hover:text-[#E5231B] transition-colors duration-300"
            >
              All projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>

          {/* Case study cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                className={`group relative rounded-3xl bg-gradient-to-br ${cs.gradient} border border-[#0a0a0a]/6 overflow-hidden cursor-default hover:border-[#0a0a0a]/15 transition-all duration-500 hover:-translate-y-1 ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div className={`p-8 sm:p-10 ${i === 0 ? "min-h-[280px] sm:min-h-[320px]" : "min-h-[240px]"} flex flex-col justify-between`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[11px] text-[#0a0a0a]/30">{cs.num}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a]/40">{cs.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#0a0a0a]/30 font-mono">{cs.year}</span>
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{ background: cs.accent }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 13L13 1M13 1H4M13 1v9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3
                      className="font-black text-[#0a0a0a] leading-tight tracking-tight mb-3"
                      style={{ fontSize: i === 0 ? "clamp(1.8rem, 3.5vw, 2.8rem)" : "clamp(1.4rem, 2.5vw, 2rem)" }}
                    >
                      {cs.title}
                    </h3>
                    <p className="text-sm text-[#0a0a0a]/50 leading-relaxed font-light max-w-xl">
                      {cs.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
