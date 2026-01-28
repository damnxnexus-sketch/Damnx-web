'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import DamnXHero from "@/components/hero";
import DynamicIslandHeader from "@/components/header";
import CalendlyChatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

// Lazy load heavy 3D/WebGL components
const VideoHeroSection = dynamic(() => import("@/components/Video_heading"), {
  loading: () => <div className="min-h-screen bg-black" />,
  ssr: false
});

const TrophyCabinet = dynamic(() => import("@/components/Trophy"), {
  loading: () => <div className="min-h-[85vh] bg-black" />,
  ssr: false
});

const ServicesShowcase = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="min-h-screen bg-black" />,
  ssr: false
});

const DamnxTechStack2 = dynamic(() => import("@/components/TechStackArray"), {
  loading: () => <div className="min-h-screen bg-black" />,
  ssr: false
});

const DevelopmentJourney = dynamic(() => import("@/components/DevelopmentJourney"), {
  loading: () => <div className="min-h-screen bg-black" />,
  ssr: false
});

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  loading: () => <div className="min-h-screen bg-black" />,
  ssr: false
});

export default function Home() {
  return (
    <>
      <DynamicIslandHeader />
      <CalendlyChatbot />
      <DamnXHero />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <VideoHeroSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[85vh] bg-black" />}>
        <TrophyCabinet />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <ServicesShowcase />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <DamnxTechStack2 />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <DevelopmentJourney />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <WhyChooseUs />
      </Suspense>
      <Footer />
    </>
  );
}
