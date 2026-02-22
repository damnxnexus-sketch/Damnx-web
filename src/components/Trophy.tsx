'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useShouldReduceEffects } from '@/hooks/useDeviceDetection';

// Lazy load Ballpit only when needed
const Ballpit = dynamic(() => import('./Ballpit'), {
  ssr: false,
  loading: () => null
});

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
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceEffects = useShouldReduceEffects();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = [
    {
      value: 100, suffix: '+', label: 'Projects Delivered', icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      )
    },
    {
      value: 25, suffix: '+', label: 'Tech Experts', icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      value: 10, suffix: '+', label: 'Countries Served', icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      value: 98, suffix: '%', label: 'Client Satisfaction', icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      className="absolute w-1 h-1 bg-red-500 rounded-full opacity-30 particle hidden md:block"
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
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.1); opacity: 0.3; }
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
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-[85vh] py-16 px-4 sm:px-6 overflow-x-hidden"
        style={{ backgroundColor: '#000' }}
      >
        {/* Top & Bottom Blur Masks */}
        <div
          className="absolute top-0 left-0 right-0 h-12 md:h-16 pointer-events-none z-50"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)', backdropFilter: 'blur(3px)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-12 md:h-16 pointer-events-none z-50"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,1), transparent)', backdropFilter: 'blur(3px)' }}
        />

        {/* =========================================
            BACKGROUND RENDERING LOGIC
           ========================================= */}

        {/* DESKTOP BACKGROUND: Ballpit */}
        {!isMobile && !shouldReduceEffects && (
          <div className="absolute inset-0 z-0 opacity-40">
            <Ballpit
              count={100}
              gravity={0.5}
              friction={0.995}
              wallBounce={0.9}
              followCursor={true}
              colors={[0xff0000, 0x000000, 0xffffff]}
              ambientIntensity={0.5}
              lightIntensity={400}
              minSize={0.5}
              maxSize={1.0}
            />
          </div>
        )}

        {/* MOBILE BACKGROUND: Cyber-Grid & Plasma Orbs */}
        {(isMobile || shouldReduceEffects) && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Ambient Plasma Orbs */}
            <div
              className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-red-600/30 blur-[80px] mix-blend-screen"
              style={{ animation: 'pulse-slow 8s ease-in-out infinite' }}
            />
            <div
              className="absolute bottom-[-10%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-red-800/20 blur-[80px] mix-blend-screen"
              style={{ animation: 'pulse-slow 10s ease-in-out infinite reverse' }}
            />

            {/* High-Tech Grid Mask */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 10%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 10%, transparent 80%)'
              }}
            />
          </div>
        )}

        {/* Desktop Particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} duration={4 + Math.random() * 3} />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Section Header */}
          <div className={`text-center mb-10 md:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block mb-3 md:mb-4">
              <span className="text-red-600 text-xs md:text-sm font-bold tracking-widest uppercase border border-red-600/50 md:border-red-600 px-3 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-sm bg-black/30 md:bg-black/50 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                Excellence Metrics
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight">
              Our Trophy <span className="text-red-600">Cabinet</span>
            </h2>

            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`trophy-card relative group cursor-pointer transition-all duration-700 
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  /* MOBILE STYLES: Sleek Flex Row */
                  flex flex-row items-center justify-between p-5 bg-gradient-to-br from-zinc-900/80 to-black border border-white/5 rounded-2xl shadow-[inset_0_0_20px_rgba(220,38,38,0.02)]
                  /* DESKTOP STYLES: Preserving the original big blocks */
                  md:block md:bg-white/5 md:border-2 md:border-white/10 md:p-6 lg:p-8 md:shadow-none
                `}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  transform: hoveredIndex === index && !isMobile ? 'translateY(-12px) scale(1.05)' : ''
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >

                {/* Desktop-only Corner Accents */}
                <div className="hidden md:block absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-red-500 rounded-tl-2xl transition-all duration-300 group-hover:w-16 group-hover:h-16" />
                <div className="hidden md:block absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-red-500 rounded-br-2xl transition-all duration-300 group-hover:w-16 group-hover:h-16" />

                {/* Mobile-only subtle glowing side-bar */}
                <div className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-gradient-to-b from-transparent via-red-500/50 to-transparent rounded-r-md" />

                {/* Icon Area */}
                <div className="relative text-red-500 transform transition-transform duration-300 md:group-hover:scale-110 md:group-hover:rotate-12 flex justify-center md:mb-4 bg-red-500/10 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none">
                  {stat.icon}
                </div>

                {/* Number & Label Area */}
                <div className="relative text-right md:text-left flex flex-col justify-center">
                  <div className="number-display text-4xl sm:text-5xl lg:text-6xl font-black text-white md:mb-3 leading-none tracking-tighter">
                    {isVisible ? (
                      <CountUpNumber end={stat.value} suffix={stat.suffix} />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>

                  <div className="text-zinc-400 md:text-zinc-300 text-xs sm:text-sm lg:text-lg font-semibold tracking-wide uppercase md:capitalize md:group-hover:text-red-400 transition-colors duration-300 mt-1 md:mt-0">
                    {stat.label}
                  </div>
                </div>

                {/* Desktop Animated Bottom Line */}
                <div className="hidden md:block absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-transparent w-0 group-hover:w-full transition-all duration-700" />

                {/* Desktop Hover Particles */}
                {hoveredIndex === index && !isMobile && (
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
          <div className={`text-center mt-10 md:mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-zinc-400 text-sm md:text-xl font-medium backdrop-blur-sm bg-white/5 md:bg-black/20 border border-white/5 md:border-none inline-block px-6 md:px-8 py-3 rounded-full shadow-xl md:shadow-none">
              <span className="text-red-500 font-bold">DAMNX Solutions</span> — Where Excellence Meets Innovation
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default TrophyCabinet;