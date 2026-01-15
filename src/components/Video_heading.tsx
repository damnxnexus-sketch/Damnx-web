'use client';
import React, { useEffect, useRef, useState } from 'react';
import ColorBends from './ColorBends';

export default function VideoHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [blur, setBlur] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [topBlur, setTopBlur] = useState(0);
  const [bottomBlur, setBottomBlur] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const handleScroll = () => {
      if (!section || !sectionRef.current) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Check if section is in viewport
      //      const isInViewport = rect.top < windowHeight && rect.bottom > 0;

      // Calculate scroll progress through the section
      const scrollTop = -rect.top;
      const progress = Math.max(0, Math.min(1, scrollTop / sectionHeight));
      setScrollProgress(progress);

      // Calculate blur effect when scrolling down past the section
      if (rect.top < 0) {
        const blurAmount = Math.min(5, Math.abs(rect.top) / 60);
        setBlur(blurAmount);
      } else {
        setBlur(0);
      }

      // Calculate boundary blur effects - Only minimal blur at transition
      // Top boundary blur - when section enters viewport
      const topDistance = Math.max(0, rect.top);
      const topBoundaryBlur = Math.min(4, (150 - topDistance) / 150 * 4);
      setTopBlur(topDistance < 150 ? topBoundaryBlur : 0);

      // Bottom boundary blur - when section exits viewport
      const bottomDistance = Math.max(0, windowHeight - rect.bottom);
      const bottomBoundaryBlur = Math.min(4, (150 - bottomDistance) / 150 * 4);
      setBottomBlur(bottomDistance < 150 ? bottomBoundaryBlur : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Video Hero Section */}
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden"
        style={{
          filter: `blur(${blur}px)`,
          transition: 'filter 0.1s ease-out'
        }}
      >
        {/* Top Boundary Blur Mask */}
        <div
          className="absolute top-0 left-0 right-0 h-8 md:h-12 pointer-events-none z-50 transition-all duration-100"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.95), transparent)',
            backdropFilter: `blur(${topBlur * 0.3}px)`,
            WebkitBackdropFilter: `blur(${topBlur * 0.3}px)`,
          }}
        />

        {/* Bottom Boundary Blur Mask */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 md:h-12 pointer-events-none z-50 transition-all duration-100"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
            backdropFilter: `blur(${bottomBlur * 0.3}px)`,
            WebkitBackdropFilter: `blur(${bottomBlur * 0.3}px)`,
          }}
        />

        {/* Background Video with Parallax */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollProgress * 50}px) scale(${1 + scrollProgress * 0.1})`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <ColorBends
            colors={['#000000', '#1a0505', '#450a0a', '#7f1d1d', '#dc2626']}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
          {/* Main Heading with Animation */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center mb-6 md:mb-8 relative heading-hover"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 2),
              transform: `translateY(${scrollProgress * -100}px)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
              letterSpacing: '0.05em',
              animation: 'fadeInUp 1s ease-out'
            }}
          >
            <span
              className="relative inline-block damn-text"
              style={{
                position: 'relative'
              }}
            >
              <span style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                color: 'rgba(255, 255, 255, 0.1)',
                textShadow: 'none',
                WebkitTextStroke: 'none',
                filter: 'blur(1px)',
                zIndex: -1
              }}>
                DAMN
              </span>
              <span className="damn-letters" style={{
                color: '#ffffff',
                textShadow: `
                  0 2px 10px rgba(255, 255, 255, 0.2),
                  0 4px 20px rgba(0, 0, 0, 0.4)
                `,
                WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.08)',
                transition: 'all 0.5s ease'
              }}>DAMN</span>
              <span className="x-letter" style={{
                color: '#dc2626',
                textShadow: `
                  0 2px 10px rgba(220, 38, 38, 0.3),
                  0 4px 20px rgba(0, 0, 0, 0.4)
                `,
                WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.08)',
                transition: 'all 0.5s ease'
              }}>X</span>
            </span>
            <br />
            <span
              className="relative inline-block solution-text"
              style={{
                color: '#ffffff',
                textShadow: `
                  0 2px 10px rgba(255, 255, 255, 0.2),
                  0 4px 20px rgba(0, 0, 0, 0.4)
                `,
                WebkitTextStroke: '0.5px rgba(220, 38, 38, 0.05)',
                transition: 'all 0.5s ease'
              }}
            >
              SOLUTION
            </span>
          </h1>

          {/* Quote with Animation */}
          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 text-center max-w-4xl leading-relaxed px-4 font-light"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 2.5),
              transform: `translateY(${scrollProgress * -80}px)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
              textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
              animation: 'fadeInUp 1s ease-out 0.3s backwards',
              letterSpacing: '0.02em'
            }}
          >
            &quot;Where innovation meets excellence. Transforming visions into digital reality with
            cutting-edge software solutions that empower businesses to thrive in the digital age.&quot;
          </p>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </section>
    </div>
  );
}