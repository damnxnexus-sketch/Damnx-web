'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Globe, Smartphone, Palette, Layout, Code2 } from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';
import Image from "next/image";

export default function DamnXHero() { 
  const [currentWord, setCurrentWord] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bottomBlur, setBottomBlur] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { toggleChat } = useChat();

  const words = ["WEBSITES", "MOBILE APPS", "CUSTOM SOFTWARE","UI/UX DESIGN","LOGOS"];

  const services = [
    { icon: Globe, label: "Websites", color: "from-blue-400 to-blue-600" },
    { icon: Smartphone, label: "Mobile Apps", color: "from-green-400 to-green-600" },
    { icon: Palette, label: "UI/UX Design", color: "from-purple-400 to-purple-600" },
    { icon: Layout, label: "Logos", color: "from-orange-400 to-orange-600" },
    { icon: Code2, label: "Custom Software", color: "from-red-400 to-red-600" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsChanging(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const bottomDistance = Math.max(0, windowHeight - rect.bottom);
      const bottomBoundaryBlur = Math.min(4, (150 - bottomDistance) / 150 * 4);
      setBottomBlur(bottomDistance < 150 ? bottomBoundaryBlur : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden touch-auto">
      
      <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 0.8 }}>
                <animate attributeName="stop-color" values="#dc2626; #ef4444; #dc2626" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" style={{ stopColor: '#ef4444', stopOpacity: 0.9 }}>
                <animate attributeName="stop-color" values="#ef4444; #f87171; #ef4444" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 0.8 }}>
                <animate attributeName="stop-color" values="#dc2626; #ef4444; #dc2626" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          <path fill="url(#waveGradient)" fillOpacity="0.6" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,240C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animate attributeName="d" dur="8s" repeatCount="indefinite" values="
              M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,240C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,138.7C672,139,768,181,864,202.7C960,224,1056,224,1152,213.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,240C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </path>
        </svg>
        
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="url(#waveGradient)" fillOpacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,240C672,256,768,256,864,234.7C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
              M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,240C672,256,768,256,864,234.7C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,234.7C672,245,768,235,864,218.7C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,240C672,256,768,256,864,234.7C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </path>
        </svg>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-600/20 to-transparent blur-xl"></div>
      </div>

      <div 
        ref={heroRef}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-start lg:items-center py-8 lg:py-12"
      >
        <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center max-w-7xl mx-auto">
          
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fadeInUp opacity-0 order-2 lg:order-1 mt-4 lg:mt-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>

            <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
              <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-black leading-tight">
                  <span className="relative inline-block" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                    <span className="relative z-10 bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      WE BUILD
                    </span>
                    <span className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/60 via-white/30 to-transparent bg-clip-text text-transparent overflow-hidden pointer-events-none">
                      WE BUILD
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text text-transparent transform -skew-x-12 translate-x-[-200%] animate-shine pointer-events-none">
                      WE BUILD
                    </span>
                  </span>
                </h1>
              </div>
              
              <div className="relative h-24 sm:h-28 md:h-32 lg:h-32 flex justify-center lg:justify-start">
                {words.map((word, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 flex items-center justify-center lg:justify-start transition-all duration-500 ${
                      idx === currentWord && !isChanging
                        ? 'opacity-100 scale-100 blur-0'
                        : 'opacity-0 scale-90 blur-md pointer-events-none'
                    }`}
                  >
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-black group">
                      <span className="relative inline-block" style={{ WebkitTextStroke: '1px rgba(239,68,68,0.2)' }}>
                        <span className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-600 to-red-800 bg-clip-text text-transparent blur-md opacity-50">
                          {word}
                        </span>
                        
                        <span className="relative z-10 bg-gradient-to-br from-red-400 via-red-600 to-red-700 bg-clip-text text-transparent">
                          {word}
                        </span>
                        
                        <span className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 via-white/25 to-transparent bg-clip-text text-transparent overflow-hidden pointer-events-none">
                          {word}
                        </span>
                        
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text text-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none">
                          {word}
                        </span>
                        
                        <span className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-black/30 to-transparent bg-clip-text text-transparent pointer-events-none">
                          {word}
                        </span>
                      </span>
                      
                      <span className="absolute top-full left-0 right-0 mt-0.5 opacity-10 bg-gradient-to-b from-red-500/40 to-transparent bg-clip-text text-transparent blur-sm transform scale-y-[-0.4] origin-top pointer-events-none">
                        {word}
                      </span>
                    </h2>
                  </div>
                ))}
              </div>

              <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl text-gray-300 font-light animate-fadeInUp opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                THAT <span className="relative inline-block">
                  <span className="text-white font-bold relative" style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.1)' }}>
                    <span className="bg-gradient-to-b from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">DOMINATE</span>
                    <span className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/50 to-transparent bg-clip-text text-transparent pointer-events-none">DOMINATE</span>
                  </span>
                </span> THE DIGITAL WORLD
              </p>
            </div>

            <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed animate-fadeInUp opacity-0 text-center lg:text-left mx-auto lg:mx-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              We transform bold ideas into exceptional digital experiences. 
              From concept to deployment, we build solutions that set new standards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp opacity-0 justify-center lg:justify-start" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              <button onClick={toggleChat} className="group relative px-8 py-4 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 group-hover:from-red-400 group-hover:via-red-600 group-hover:to-red-800 transition-all duration-500"></div>
                
                <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30 transition-all duration-500"></div>
                
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-2xl"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-3 text-white font-black text-base tracking-wider">
                  LET&apos;S TALK
                </span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-10 animate-fadeInUp opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
              {[
                { num: "100+", label: "PROJECTS" },
                { num: "98%", label: "SATISFACTION" },
                { num: "24/7", label: "SUPPORT" }
              ].map((stat, idx) => (
                <div key={idx} className="relative group">
                  <div className="text-3xl sm:text-4xl font-black relative">
                    <span className="relative" style={{ WebkitTextStroke: '0.5px rgba(239,68,68,0.2)' }}>
                      <span className="bg-gradient-to-br from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                        {stat.num}
                      </span>
                      <span className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/40 to-transparent bg-clip-text text-transparent pointer-events-none">
                        {stat.num}
                      </span>
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs font-semibold tracking-widest mt-1">{stat.label}</div>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 mt-1"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-end lg:items-center justify-center lg:justify-end animate-fadeInUp opacity-0 order-1 lg:order-2 h-[40vh] lg:h-auto mt-16 lg:mt-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            
            <div className="absolute bottom-0 lg:top-1/2 lg:-translate-y-1/2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-red-600/10 rounded-full blur-[100px] animate-pulse"></div>

            <div 
              className="relative z-10 transform transition-transform duration-200 ease-out pointer-events-none"
              style={{
  transform:
    typeof window !== "undefined" && window.innerWidth < 768
      ? "none"
      : `perspective(1000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg)`
}}

            >
              <Image 
                src="/Landing_Robot.png" 
                alt="AI Robot" 
                width={500}
                height={500}
                priority
                className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-lg xl:max-w-xl h-auto object-contain animate-floatSlow"
                style={{
                  filter: 'drop-shadow(0 20px 60px rgba(239, 68, 68, 0.3))'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const nextElement = target.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
                }}
              />
              <div className="hidden w-full max-w-[280px] sm:max-w-xs lg:max-w-lg xl:max-w-xl aspect-square items-center justify-center">
                <div className="text-6xl animate-pulse">🤖</div>
              </div>

              <div className="absolute inset-0 pointer-events-none">
                {services.map((service, idx) => {
                  const positionsDesktop = [
                    { top: '-2rem', right: '-3rem', size: 'w-24 h-24' },
                    { top: '25%', left: '-3rem', size: 'w-20 h-20' },
                    { bottom: '-1rem', right: '-2rem', size: 'w-20 h-20' },
                    { top: '2rem', left: '-2rem', size: 'w-16 h-16' },
                    { bottom: '3rem', left: '0', size: 'w-18 h-18' }
                  ];
                  const posDesktop = positionsDesktop[idx];
                  const Icon = service.icon;
                  
                  return (
                    <div 
                      key={idx}
                      className="absolute animate-float hidden lg:block"
                      style={{ 
                        animationDelay: `${idx * 0.8}s`, 
                        animationDuration: `${6 + idx}s`,
                        transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
                        top: posDesktop.top,
                        left: posDesktop.left,
                        right: posDesktop.right
                      }}
                    >
                      <div className={`relative ${posDesktop.size} transform-gpu animate-rotate3d`} style={{ transformStyle: 'preserve-3d', animationDuration: `${15 + idx * 2}s` }}>
                        <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-red-600/40 to-red-800/30 border border-white/40 rounded-2xl flex flex-col items-center justify-center gap-2 p-3 shadow-2xl shadow-red-600/30" style={{ transform: 'translateZ(12px)' }}>
                          <div className="absolute top-0 left-1/4 right-1/4 h-1/3 bg-gradient-to-b from-white/60 via-white/20 to-transparent rounded-2xl blur-sm"></div>
                          <Icon className="w-7 h-7 text-white relative z-10 drop-shadow-lg" strokeWidth={2} />
                          <span className="text-white text-[9px] font-bold text-center leading-tight relative z-10 drop-shadow-md">{service.label}</span>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                        </div>
                        <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-red-700/40 to-red-900/30 border border-white/40 rounded-2xl shadow-2xl shadow-red-600/30" style={{ transform: 'translateZ(-12px) rotateY(180deg)' }}>
                          <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-white/5 to-transparent rounded-2xl"></div>
                          <div className="absolute bottom-0 left-1/4 right-1/4 h-1/3 bg-gradient-to-t from-red-400/20 to-transparent rounded-2xl blur-sm"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {services.map((service, idx) => {
                  const positionsMobile = [
                    { top: '-1rem', right: '-1.5rem', size: 'w-16 h-16' },
                    { top: '20%', left: '-1.5rem', size: 'w-14 h-14' },
                    { bottom: '-0.5rem', right: '-1rem', size: 'w-14 h-14' },
                    { top: '1rem', left: '-1rem', size: 'w-12 h-12' },
                    { bottom: '2rem', left: '0', size: 'w-13 h-13' }
                  ];
                  const pos = positionsMobile[idx];
                  const Icon = service.icon;
                  
                  return (
                    <div 
                      key={`mobile-${idx}`}
                      className="absolute animate-float lg:hidden"
                      style={{ 
                        animationDelay: `${idx * 0.8}s`, 
                        animationDuration: `${6 + idx}s`,
                        transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
                        top: pos.top,
                        left: pos.left,
                        right: pos.right
                      }}
                    >
                      <div className={`relative ${pos.size} transform-gpu animate-rotate3d`} style={{ transformStyle: 'preserve-3d', animationDuration: `${15 + idx * 2}s` }}>
                        <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-red-600/40 to-red-800/30 border border-white/40 rounded-2xl flex flex-col items-center justify-center gap-1 p-2 shadow-2xl shadow-red-600/30" style={{ transform: 'translateZ(12px)' }}>
                          <div className="absolute top-0 left-1/4 right-1/4 h-1/3 bg-gradient-to-b from-white/60 via-white/20 to-transparent rounded-2xl blur-sm"></div>
                          <Icon className="w-5 h-5 text-white relative z-10 drop-shadow-lg" strokeWidth={2} />
                          <span className="text-white text-[8px] font-bold text-center leading-tight relative z-10 drop-shadow-md">{service.label}</span>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                        </div>
                        <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-red-700/40 to-red-900/30 border border-white/40 rounded-2xl shadow-2xl shadow-red-600/30" style={{ transform: 'translateZ(-12px) rotateY(180deg)' }}>
                          <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-white/5 to-transparent rounded-2xl"></div>
                          <div className="absolute bottom-0 left-1/4 right-1/4 h-1/3 bg-gradient-to-t from-red-400/20 to-transparent rounded-2xl blur-sm"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-12 md:h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,1), transparent)',
          backdropFilter: `blur(${Math.max(0, bottomBlur * 0.4)}px)`,
          WebkitBackdropFilter: `blur(${Math.max(0, bottomBlur * 0.4)}px)`,
          zIndex: 50,
          transition: 'all 0.1s ease-out'
        }}
      />

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

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes shine {
          to {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes rotate3d {
          0% {
            transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          100% {
            transform: perspective(1000px) rotateX(360deg) rotateY(360deg) rotateZ(360deg);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-floatSlow {
          animation: floatSlow 6s ease-in-out infinite;
        }

        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-rotate3d {
          animation: rotate3d 20s linear infinite;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
