'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

interface FloatingParticleProps {
  delay: number;
  duration: number;
}

const TrophyCabinet = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const stats = [
    {
      value: 50, suffix: '+', label: 'Projects Delivered', icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      )
    },
    {
      value: 25, suffix: '+', label: 'Tech Experts', icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      value: 10, suffix: '+', label: 'Countries Served', icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      value: 98, suffix: '%', label: 'Client Satisfaction', icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const CountUpNumber = ({ end, duration = 2000, suffix = '' }: CountUpProps) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);

    useEffect(() => {
      if (!isVisible) return;

      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * end);

        if (current !== countRef.current) {
          countRef.current = current;
          setCount(current);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }, [isVisible, end, duration]);

    return (
      <span className="inline-block">
        {count}{suffix}
      </span>
    );
  };

  const FloatingParticle = ({ delay, duration }: FloatingParticleProps) => (
    <div
      className="absolute w-1 h-1 bg-red-500 rounded-full opacity-30 particle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${duration}s infinite ease-in-out ${delay}s`
      }}
    />
  );

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(var(--x), var(--y)) scale(1.5); opacity: 0.6; }
        }

        @keyframes slide-up {
          from { transform: translateY(60px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .particle {
          --x: ${Math.random() * 60 - 30}px;
          --y: ${Math.random() * 60 - 30}px;
        }

        .trophy-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .trophy-card:hover {
          transform: translateY(-12px) scale(1.05);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
        }

        .number-display {
          text-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
        }

        .video-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .video-container video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.85));
          pointer-events: none;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-[85vh] py-16 px-6 overflow-hidden"
        style={{ backgroundColor: '#000' }}
      >
        {/* Top Blur Mask - Smooth transition from previous component */}
        <div
          className="absolute top-0 left-0 right-0 h-12 md:h-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            zIndex: 50
          }}
        />

        {/* Bottom Blur Mask - Smooth transition to next component */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 md:h-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,1), transparent)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            zIndex: 50
          }}
        />

        {/* Video Background */}
        <div className="video-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0"
          >
            <source src="/bg4.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark Overlay */}
        <div className="video-overlay" />

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.2}
            duration={4 + Math.random() * 3}
          />
        ))}

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div className="inline-block mb-4">
              <span className="text-red-600 text-sm font-bold tracking-widest uppercase border border-red-600 px-4 py-2 rounded-full backdrop-blur-sm bg-black/30">
                Excellence Metrics
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Our Trophy <span className="text-red-600">Cabinet</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`trophy-card relative bg-white/5 border-2 border-white/10 rounded-2xl p-6 lg:p-8 group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  transform: hoveredIndex === index ? 'translateY(-12px) scale(1.05)' : ''
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-red-500 rounded-tl-2xl transition-all duration-300 group-hover:w-16 group-hover:h-16" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-red-500 rounded-br-2xl transition-all duration-300 group-hover:w-16 group-hover:h-16" />

                {/* Icon */}
                <div className="relative text-red-500 mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 flex justify-center">
                  {stat.icon}
                </div>

                {/* Number */}
                <div className="relative">
                  <div className="number-display text-5xl lg:text-6xl font-black text-white mb-3 leading-none">
                    {isVisible ? (
                      <CountUpNumber end={stat.value} suffix={stat.suffix} />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>

                  {/* Label */}
                  <div className="text-zinc-300 text-base lg:text-lg font-semibold tracking-wide group-hover:text-red-400 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>

                {/* Animated Line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-transparent w-0 group-hover:w-full transition-all duration-700" />

                {/* Hover Particles */}
                {hoveredIndex === index && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-red-500 rounded-full animate-ping pointer-events-none"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '1s'
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Tagline */}
          <div
            className={`text-center mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <p className="text-zinc-400 text-lg md:text-xl font-medium backdrop-blur-sm bg-black/20 inline-block px-8 py-3 rounded-full">
              <span className="text-red-500 font-bold">DAMNX Solutions</span> — Where Excellence Meets Innovation
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrophyCabinet;