"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * DamnX Solutions — "Book a Growth Strategy Call" CTA Banner
 * -------------------------------------------------------------
 * Drop into: app/components/GrowthCTABanner.tsx
 * Deps:      npm i framer-motion lucide-react
 *
 * Place the rocket graphic at: /public/growth-cta-rocket.png
 */

export default function GrowthCTABanner() {
    return (
        <section className="bg-black px-4 py-10 sm:px-6 sm:py-14">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 overflow-hidden rounded-3xl border border-[#E5231B]/40 bg-gradient-to-br from-[#160404] to-black px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10"
            >
                {/* ambient glow */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-60"
                    style={{ background: "radial-gradient(ellipse at top right, rgba(229,35,27,0.25) 0%, transparent 65%)" }}
                />

                <div className="relative max-w-lg">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-xs">
                        Let&apos;s Grow Together
                    </p>
                    <h2 className="mt-2 text-xl font-extrabold leading-tight text-white sm:text-2xl md:text-[1.75rem]">
                        Your Next Stage of <span className="text-[#E5231B]">Growth Starts Here</span>
                    </h2>
                    <p className="mt-2 text-sm text-white/55 sm:text-[15px]">
                        Hop on a strategy call with our growth experts and discover new opportunities for
                        your business.
                    </p>
                </div>

                <div className="relative flex w-full shrink-0 items-center justify-between gap-4 sm:w-auto sm:justify-end sm:gap-8">
                    <motion.a
                        href="#book-call"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 380, damping: 20 }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#E5231B] px-5 py-3 text-xs font-bold text-white shadow-[0_10px_30px_rgba(229,35,27,0.4)] sm:px-6 sm:text-sm"
                    >
                        Book a Growth Strategy Call
                        <ArrowRight size={15} />
                    </motion.a>

                    <img
                        src="/growth-cta-rocket.png"
                        alt=""
                        aria-hidden="true"
                        className="h-16 w-auto shrink-0 object-contain sm:h-24"
                    />
                </div>
            </motion.div>
        </section>
    );
}