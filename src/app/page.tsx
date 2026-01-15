import DamnXHero from "@/components/hero";
import TrophyCabinet from "@/components/Trophy";
import VideoHeroSection from "@/components/Video_heading";
import ServicesShowcase from "@/components/Services";

import DevelopmentJourney from "@/components/DevelopmentJourney";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import CalendlyChatbot from "@/components/Chatbot";
import DynamicIslandHeader from "@/components/header";
import DamnxTechStack2 from "@/components/TechStackArray";


export default function Home() {
  return (
    <>
      <DynamicIslandHeader />
      <CalendlyChatbot />
      <DamnXHero />
      <VideoHeroSection />
      <TrophyCabinet />
      <ServicesShowcase />
      <DamnxTechStack2 />
      <DevelopmentJourney />
      <WhyChooseUs />
      <Footer />
    </>
  );
}

