'use client';

import React from 'react';

// ============================================================================
// ALL TECH STACKS IN ONE ARRAY
// ============================================================================

const ALL_TECHS = [
  // Web Development
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
  
  // Mobile Development
  { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
  { name: 'iOS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg' },
  
  // CMS & E-Commerce
  { name: 'Shopify', icon: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
  { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
  { name: 'WooCommerce', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/woocommerce/woocommerce-original.svg' },
  { name: 'Stripe', icon: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
  
  // Design Tools
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg' },
  { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
  
  // 3D & Motion
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
  { name: 'After Effects', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg' },
  
  // Backend
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  
  // Marketing
  { name: 'Google Ads', icon: 'https://cdn.worldvectorlogo.com/logos/google-ads-1.svg' },
  { name: 'Meta', icon: 'https://cdn.worldvectorlogo.com/logos/meta-1.svg' },
  { name: 'Google Analytics', icon: 'https://cdn.worldvectorlogo.com/logos/google-analytics-1.svg' },
];

// Duplicate for seamless loop
const FIRST_ROW = [...ALL_TECHS, ...ALL_TECHS];
const SECOND_ROW = [...ALL_TECHS.reverse(), ...ALL_TECHS];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DamnxTechStack2() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden py-20">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#FF000020 1px, transparent 1px),
            linear-gradient(90deg, #FF000020 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, #FF000010 0%, transparent 50%, #000000 100%)'
        }} />
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 0, 0.03) 2px, rgba(255, 0, 0, 0.03) 4px)',
          animation: 'scan 8s linear infinite'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 mb-6 border rounded-full font-mono text-xs tracking-widest relative overflow-hidden"
            style={{ 
              borderColor: '#FF0000',
              color: '#FF0000',
              boxShadow: '0 0 30px #FF000060'
            }}>
            <div className="absolute inset-0 opacity-20" style={{
              background: 'linear-gradient(90deg, transparent, #FF000040, transparent)',
              animation: 'shimmer 2s infinite'
            }} />
            <span className="relative z-10">OUR EXPERTISE</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
            <span className="text-white">Technologies We </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-800"
              style={{
                textShadow: '0 0 60px #FF000080',
              }}>
              Master
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Cutting-edge tools and frameworks powering the next generation of digital experiences
          </p>
        </div>

        {/* Infinite Scrolling Rows */}
        <div className="space-y-8 md:space-y-12">
          {/* First Row - Left to Right */}
          <div className="relative overflow-hidden py-6">
            <div className="flex gap-8 animate-scroll-left" style={{ width: 'max-content' }}>
              {FIRST_ROW.map((tech, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="flex-shrink-0 group cursor-pointer"
                >
                  <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-110 hover:border-red-500"
                    style={{
                      borderColor: '#FF000040',
                      boxShadow: '0 0 30px #FF000010',
                      width: '140px',
                      height: '140px',
                    }}>
                    
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                    
                    {/* Glow on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, #FF000030, transparent 70%)'
                      }} />
                    
                    {/* Icon */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <img 
                        src={tech.icon}
                        alt={tech.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2 transition-all duration-500 group-hover:scale-125"
                        style={{
                          filter: 'brightness(1.2) drop-shadow(0 0 20px #FF000080)',
                        }}
                        loading="eager"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50' y='50' font-size='60' text-anchor='middle' dominant-baseline='middle' fill='%23FF0000'%3E${tech.name[0]}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                      <div className="text-white text-xs md:text-sm font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {tech.name}
                      </div>
                    </div>

                    {/* Scan Line */}
                    <div className="absolute inset-x-0 h-0.5 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #FF0000, transparent)',
                        boxShadow: '0 0 10px #FF0000',
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="relative overflow-hidden py-6">
            <div className="flex gap-8 animate-scroll-right" style={{ width: 'max-content' }}>
              {SECOND_ROW.map((tech, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="flex-shrink-0 group cursor-pointer"
                >
                  <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-110 hover:border-white"
                    style={{
                      borderColor: '#FFFFFF40',
                      boxShadow: '0 0 30px #FFFFFF10',
                      width: '140px',
                      height: '140px',
                    }}>
                    
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                    
                    {/* Glow on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, #FFFFFF20, transparent 70%)'
                      }} />
                    
                    {/* Icon */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <img 
                        src={tech.icon}
                        alt={tech.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2 transition-all duration-500 group-hover:scale-125"
                        style={{
                          filter: 'brightness(1.2) drop-shadow(0 0 20px #FFFFFF80)',
                        }}
                        loading="eager"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50' y='50' font-size='60' text-anchor='middle' dominant-baseline='middle' fill='%23FFFFFF'%3E${tech.name[0]}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                      <div className="text-white text-xs md:text-sm font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {tech.name}
                      </div>
                    </div>

                    {/* Scan Line */}
                    <div className="absolute inset-x-0 h-0.5 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)',
                        boxShadow: '0 0 10px #FFFFFF',
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="border-2 rounded-xl p-6 backdrop-blur-md transition-all duration-500 hover:scale-105 text-center"
            style={{ 
              borderColor: '#FF000030',
              backgroundColor: '#FF000005',
              boxShadow: '0 0 30px #FF000010'
            }}>
            <div className="text-4xl font-black text-red-500 mb-2">{ALL_TECHS.length}+</div>
            <div className="text-white/70 text-sm font-mono">Technologies</div>
          </div>
          
          <div className="border-2 rounded-xl p-6 backdrop-blur-md transition-all duration-500 hover:scale-105 text-center"
            style={{ 
              borderColor: '#FFFFFF30',
              backgroundColor: '#FFFFFF05',
              boxShadow: '0 0 30px #FFFFFF10'
            }}>
            <div className="text-4xl font-black text-white mb-2">100%</div>
            <div className="text-white/70 text-sm font-mono">Mastery Level</div>
          </div>
          
          <div className="border-2 rounded-xl p-6 backdrop-blur-md transition-all duration-500 hover:scale-105 text-center"
            style={{ 
              borderColor: '#FF000030',
              backgroundColor: '#FF000005',
              boxShadow: '0 0 30px #FF000010'
            }}>
            <div className="text-4xl font-black text-red-500 mb-2">∞</div>
            <div className="text-white/70 text-sm font-mono">Possibilities</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 50s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 50s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }

        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}