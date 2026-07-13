"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What does a growth marketing agency actually do?",
    answer:
      "Unlike traditional marketing agencies that focus only on ads or social posts, a growth marketing agency takes a holistic approach — finding real growth opportunities, building complete marketing systems (content, ads, outreach, sales enablement), and measuring results by revenue, not just clicks. We work as a full growth partner, not just a vendor.",
  },
  {
    id: 2,
    question: "How quickly can we expect results from your campaigns?",
    answer:
      "Most clients start seeing measurable traction within 30–45 days of launch. Significant revenue-level results typically appear within 60–90 days as campaigns are optimized. We share weekly performance reports so you always know exactly where things stand.",
  },
  {
    id: 3,
    question: "What industries do you specialize in?",
    answer:
      "We have deep experience with restaurants & food businesses, fitness & wellness brands, skincare & beauty clinics, fashion & lifestyle, real estate, and B2B services. Our approach is always custom — we build a growth blueprint specific to your industry, competitors, and audience.",
  },
  {
    id: 4,
    question: "What's included in your growth marketing packages?",
    answer:
      "Depending on the plan, our packages can include social media marketing, short & long-form video content (Reels, YouTube), influencer collaborations, professional photo/video shoots, Meta & Google ad campaigns, business growth strategy, dedicated account management, website development, SEO, and data analytics reporting.",
  },
  {
    id: 5,
    question: "Do you offer website development as part of marketing?",
    answer:
      "Yes — our Lite and Premium plans include professionally built websites using Next.js for maximum speed, SEO performance, and conversion rates. We handle domain, hosting, and ongoing maintenance so you can focus purely on your business.",
  },
  {
    id: 6,
    question: "How do I get started with DamnX Solutions?",
    answer:
      "Simply book a free 30-minute growth strategy call with our team. We'll audit your current marketing, identify the biggest growth levers, and present a custom plan tailored to your business goals — with zero obligation.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function FAQAccordionItem({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={faq.id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
        isOpen
          ? "border-[#E5231B]/50 bg-[#E5231B]/[0.05]"
          : "border-white/8 bg-white/[0.025] hover:border-white/15"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
        aria-expanded={isOpen}
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-300 ${
            isOpen
              ? "border-[#E5231B] bg-[#E5231B] text-white"
              : "border-white/15 text-white/50"
          }`}
        >
          {faq.id}
        </span>
        <span className="flex-1 text-sm font-semibold leading-snug text-white sm:text-base">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            isOpen ? "border-[#E5231B] text-[#E5231B]" : "border-white/10 text-white/40"
          }`}
        >
          <ChevronDown size={15} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
              <div className="ml-12 text-sm leading-relaxed text-white/60 sm:text-base">
                {faq.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-8 sm:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/3 opacity-30 blur-[130px]"
        style={{ background: "radial-gradient(ellipse, #E5231B 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Section header */}
        <div className="mb-12 text-center sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full border border-[#E5231B]/50 bg-[#E5231B]/10 px-5 py-2 text-xs font-semibold tracking-widest text-[#E5231B] uppercase sm:text-sm"
          >
            Got Questions?
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Your Questions{" "}
            <span className="text-[#E5231B]">Answered</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base"
          >
            Browse through our most common questions, or book a call and we&apos;ll answer everything personally.
          </motion.p>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {faqData.map((faq) => (
            <FAQAccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center"
        >
          <p className="text-sm text-white/50">Still have questions?</p>
          <motion.a
            href="#book-call"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 20 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#E5231B] px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(229,35,27,0.4)] hover:shadow-[0_12px_32px_rgba(229,35,27,0.6)] transition-shadow"
          >
            Book a Free Strategy Call <ArrowRight size={15} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}