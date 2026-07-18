import type { Metadata } from "next";
import GlobalNav from "./GlobalNav";
import GlobalHero from "./GlobalHero";
import GlobalDelivery from "./GlobalDelivery";
import GlobalServices from "./GlobalServices";
import GlobalProcess from "./GlobalProcess";
import GlobalTrustBar from "./GlobalTrustBar";
import GlobalTestimonials from "./GlobalTestimonials";
import GlobalPriceEstimator from "./GlobalPriceEstimator";
import GlobalWhyUs from "./GlobalWhyUs";
import GlobalCTA from "./GlobalCTA";

export const metadata: Metadata = {
  title: "DAMNX Solutions — Global Digital Engineering Studio",
  description:
    "We design, engineer, and scale websites, mobile apps, AI products, SaaS platforms, and enterprise software for ambitious companies across the globe. Serving clients in 12+ countries.",
  keywords: [
    "global software development company",
    "AI development agency",
    "enterprise software development",
    "web development USA UK UAE",
    "remote engineering team",
    "SaaS development company",
    "mobile app development",
    "UI UX design agency",
    "DAMNX Solutions",
    "Next.js development",
    "LangChain AI agency",
    "transparent global pricing",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://damnx.co.in/global",
    siteName: "DAMNX Solutions",
    title: "DAMNX Solutions — Global Digital Engineering Studio",
    description:
      "Building digital experiences for businesses worldwide. 50+ projects. 12+ countries. Transparent global pricing.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAMNX Solutions — Global Digital Engineering Studio",
    description: "We build what the world ships. Web, Mobile, AI, SaaS — engineered for global ambition.",
  },
  alternates: { canonical: "https://damnx.co.in/global" },
};

export default function GlobalPage() {
  return (
    <div className="bg-white">
      {/* Suppress the existing floating island header visually with a full-width overlay nav */}
      <GlobalNav />

      <main>
        <GlobalHero />
        <GlobalDelivery />
        <GlobalServices />
        <GlobalProcess />
        <GlobalTrustBar />
        <GlobalTestimonials />
        <GlobalPriceEstimator />
        <GlobalWhyUs />
        <GlobalCTA />
      </main>
    </div>
  );
}
