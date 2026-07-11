"use client";

import { motion } from "framer-motion";

/**
 * DamnX Solutions — Marketing Hero Section
 * -------------------------------------------------------------
 * Drop into: app/components/HeroMarketing.tsx
 * Deps:      npm i framer-motion
 *
 * Place the graphic (rocket + growth chart + red swirl) at:
 *   /public/heroMarketing.png
 */

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

export default function HeroMarketing() {
    return (
        <section className="relative overflow-hidden bg-black">
            {/* top red accent bar, matches the sliver visible at the very top of the source design */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[#E5231B]" />

            {/* background graphic — rocket / growth bars / swirl */}
            <div className="absolute inset-0">
                <img
                    src="/heroMarketing.png"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover object-[75%_center] sm:object-[68%_center]"
                />
                {/* left-to-right fade so the copy stays legible on any screen width,
            even if the source image doesn't leave a fully black left margin */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent sm:via-black/40" />
            </div>

            <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-24 sm:min-h-[640px] sm:px-10 lg:min-h-[720px] lg:px-16">
                <div className="max-w-xl">
                    <motion.h1
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        animate="show"
                        className="text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-[3.4rem]"
                    >
                        The Best Business
                        <br />
                        <span className="text-[#E5231B]">Growth Marketing</span>
                        <br />
                        Agency In India
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        animate="show"
                        className="mt-5 max-w-md text-sm text-white/70 sm:text-base"
                    >
                        We Craft Data-Driven Strategies That Fuel Brand Growth, Generate Leads, And
                        Maximize ROI.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        animate="show"
                        className="mt-8"
                    >
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="inline-block rounded-lg bg-[#E5231B] px-8 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(229,35,27,0.4)]"
                        >
                            Know More
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}