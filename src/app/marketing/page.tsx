"use client";

import { motion } from "framer-motion";
import WhyDifferent from "./Whyus";
import WebDevGrowth from "./WebMarketing";
import PricingTable from "./Pricing";
import ClientReel from "./OurWork";
import ClientTicker from "./Carousal";
import FAQSection from "./Conversion";
import GrowthCTABanner from "./FAQ";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black min-h-screen flex items-center justify-center">
      {/* top red accent bar, matches the sliver visible at the very top of the source design */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-[#E5231B]" />

      {/* background graphic — rocket / growth bars / swirl */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/heroMarketing.png"
          alt="Growth Marketing Hero background"
          className="h-full w-full object-cover object-right-bottom md:object-right"
        />
        {/* left-to-right and bottom-to-top gradients for maximum readability on all screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-24 sm:min-h-[640px] sm:px-10 lg:min-h-[720px] lg:px-16 w-full">
        <div className="max-w-xl text-left">
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
              href="#why-different"
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

export default function MarketingPage() {
  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <HeroSection />
      <div id="why-different">
        <WhyDifferent />
      </div>
      <WebDevGrowth />
      <PricingTable />
      <ClientReel />
      <ClientTicker />
      <FAQSection />
      <GrowthCTABanner />
    </div>
  );
}
