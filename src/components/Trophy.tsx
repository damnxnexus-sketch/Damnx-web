'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const CountUpNumber = ({ end, duration = 2000, suffix = '' }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export default function TrophyCabinet() {
  const stats = [
    {
      value: 100,
      suffix: '+',
      label: 'Projects Delivered',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    {
      value: 25,
      suffix: '+',
      label: 'Tech Experts',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      value: 10,
      suffix: '+',
      label: 'Countries Served',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      value: 98,
      suffix: '%',
      label: 'Client Satisfaction',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
          <path d="M8 21h8" />
          <path d="M10 21v-2" />
          <path d="M14 21v-2" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full py-24 px-6 md:px-12 bg-[#050505] flex justify-center overflow-hidden font-sans">

      {/* Ambient minimal background glows */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center mb-14 flex flex-col items-center">
          <div className="inline-block border border-zinc-800 rounded-full px-5 py-1.5 mb-5 bg-zinc-950/50">
            <span className="text-zinc-400 text-[11px] tracking-[0.2em] uppercase font-semibold">
              Excellence Metrics
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-100 mb-6 tracking-tight">
            Our Trophy <span className="text-[#E6192B]">Cabinet</span>
          </h2>

          <div className="w-12 h-[2px] bg-zinc-200 rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-8 bg-zinc-950/40 backdrop-blur-sm border border-white/5 rounded-[1.5rem] transition-all duration-300 hover:bg-zinc-900/50 hover:border-[#E6192B]/40 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[#E6192B] rounded-full flex items-center justify-center text-white mb-5 transition-transform duration-300 group-hover:scale-105">
                {stat.icon}
              </div>

              <div className="text-4xl font-bold text-zinc-100 mb-2 tracking-tight">
                <CountUpNumber end={stat.value} suffix={stat.suffix} />
              </div>

              <div className="text-sm font-medium text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}