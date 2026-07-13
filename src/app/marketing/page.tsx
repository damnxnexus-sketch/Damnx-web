"use client";

import HeroMarketing from "./Hero";
import WhyDifferent from "./Whyus";
import WebDevGrowth from "./WebMarketing";
import PricingTable from "./Pricing";
import ClientReel from "./OurWork";
import ClientTicker from "./Carousal";
import FAQSection from "./Conversion";
import GrowthCTABanner from "./FAQ";

function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto h-px max-w-5xl"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(229,35,27,0.35), transparent)",
      }}
    />
  );
}

export default function MarketingPage() {
  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <HeroMarketing />
      <SectionDivider />
      <div id="why-different">
        <WhyDifferent />
      </div>
      <SectionDivider />
      <WebDevGrowth />
      <SectionDivider />
      <PricingTable />
      <SectionDivider />
      <ClientReel />
      <SectionDivider />
      <ClientTicker />
      <SectionDivider />
      <FAQSection />
      <GrowthCTABanner />
    </div>
  );
}
