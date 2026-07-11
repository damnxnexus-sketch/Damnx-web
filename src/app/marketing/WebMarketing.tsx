"use client";

import { motion } from "framer-motion";
import { Search, MessageSquare, Lightbulb, Palette, type LucideIcon } from "lucide-react";

/**
 * DamnX Solutions — "Growth Strategy + Premium Website" Feature Grid
 * -------------------------------------------------------------------
 * Drop into: app/components/WebDevGrowth.tsx
 * Deps:      npm i framer-motion lucide-react
 */

type Feature = {
    icon: LucideIcon;
    title: string;
    desc: string;
};

const features: Feature[] = [
    { icon: Search, title: "SEO Optimized", desc: "Fast, structured, and search-friendly pages" },
    { icon: MessageSquare, title: "AEO Ready", desc: "Optimized for AI answers & voice search" },
    { icon: Lightbulb, title: "High Performance", desc: "Built with Next.js for speed & scalability" },
    { icon: Palette, title: "Premium UI", desc: "Clean, modern, conversion-focused design" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

function FeatureCard({ icon: Icon, title, desc, index }: Feature & { index: number }) {
    return (
        <motion.div
            variants={fadeUp}
            custom={index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="rounded-2xl border border-[#E5231B]/40 bg-white/[0.025] p-6 transition-colors hover:border-[#E5231B]/80 sm:p-7"
        >
            <span
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-full sm:mb-6"
                style={{ background: "linear-gradient(135deg, #FF4141 0%, #B3140C 100%)" }}
            >
                <Icon size={20} className="text-white" strokeWidth={2} />
            </span>
            <h3 className="text-xl font-bold text-white sm:text-2xl">{title}</h3>
            <p className="mt-1.5 text-sm text-white/45 sm:text-base">{desc}</p>
        </motion.div>
    );
}

export default function WebDevGrowth() {
    return (
        <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-8 sm:py-24">
            <div className="relative mx-auto max-w-4xl text-center">
                <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-block rounded-full border border-[#E5231B]/60 px-5 py-2 text-xs font-medium text-white/90 sm:text-sm"
                >
                    Web Development + Growth
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-[2.5rem]"
                >
                    Growth Strategy + Premium Website
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-3 text-sm text-white/45 sm:text-base"
                >
                    Beautiful websites that are built to rank, answer, and convert.
                </motion.p>
            </div>

            <div className="relative mx-auto mt-12 grid max-w-4xl gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
                {features.map((feature, i) => (
                    <FeatureCard key={feature.title} {...feature} index={i} />
                ))}
            </div>
        </section>
    );
}