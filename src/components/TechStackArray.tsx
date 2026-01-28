'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useShouldReduceEffects } from '@/hooks/useDeviceDetection';

// Lazy load DotGrid only when needed
const DotGrid = dynamic(() => import('./DotGrid'), {
  ssr: false,
  loading: () => null
});

const ALL_TECHS = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend', invertLogo: false },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'Frontend', invertLogo: true },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'Frontend', invertLogo: false },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', category: 'Frontend', invertLogo: false },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', category: 'Frontend', invertLogo: false },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', category: 'Frontend', invertLogo: false },
  { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Mobile', invertLogo: false },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', category: 'Mobile', invertLogo: false },
  { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', category: 'Mobile', invertLogo: false },
  { name: 'iOS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg', category: 'Mobile', invertLogo: true },
  { name: 'Shopify', icon: 'https://cdn.worldvectorlogo.com/logos/shopify.svg', category: 'E-Commerce', invertLogo: false },
  { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', category: 'CMS', invertLogo: false },
  { name: 'WooCommerce', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/woocommerce/woocommerce-original.svg', category: 'E-Commerce', invertLogo: false },
  { name: 'Stripe', icon: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg', category: 'E-Commerce', invertLogo: false },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', category: 'Design', invertLogo: false },
  { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg', category: 'Design', invertLogo: false },
  { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg', category: 'Design', invertLogo: false },
  { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg', category: 'Design', invertLogo: false },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', category: '3D', invertLogo: true },
  { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg', category: '3D', invertLogo: false },
  { name: 'After Effects', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg', category: '3D', invertLogo: false },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend', invertLogo: false },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'Backend', invertLogo: false },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Backend', invertLogo: false },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'Backend', invertLogo: false },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'Backend', invertLogo: false },
  { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', category: 'Backend', invertLogo: false },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', category: 'Backend', invertLogo: false },
  { name: 'Google Ads', icon: 'https://cdn.worldvectorlogo.com/logos/google-ads-1.svg', category: 'Marketing', invertLogo: false },
  { name: 'Meta', icon: 'https://cdn.worldvectorlogo.com/logos/meta-1.svg', category: 'Marketing', invertLogo: true },
  { name: 'Google Analytics', icon: 'https://cdn.worldvectorlogo.com/logos/google-analytics-1.svg', category: 'Marketing', invertLogo: false },
];

const categories = ['All', ...Array.from(new Set(ALL_TECHS.map(t => t.category)))];

export default function PremiumTechStack() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const shouldReduceEffects = useShouldReduceEffects();

  const filteredTechs = selectedCategory === 'All'
    ? ALL_TECHS
    : ALL_TECHS.filter(tech => tech.category === selectedCategory);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

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

        .float-anim {
          animation: float 20s ease-in-out infinite;
        }

        .float-anim-reverse {
          animation: float 25s ease-in-out infinite reverse;
        }
      `}</style>

      <div className="tech-stack-container relative w-full min-h-[100dvh] bg-black overflow-x-hidden">
        {/* DotGrid Background - Disabled on mobile for performance */}
        {!shouldReduceEffects && (
          <div className="absolute inset-0 z-0">
            <DotGrid
              baseColor="#222"
              activeColor="#dc2626"
              gap={24}
              dotSize={4}
              className="w-full h-full"
            />
          </div>
        )}

        {/* Animated Gradient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-30">
            <div
              className="float-anim absolute w-[600px] h-[600px] rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, #dc2626 0%, transparent 70%)',
                top: '10%',
                left: '10%',
              }}
            />
            <div
              className="float-anim-reverse absolute w-[800px] h-[800px] rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, #991b1b 0%, transparent 70%)',
                bottom: '10%',
                right: '10%',
              }}
            />
          </div>
        </div>

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3.5\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 sm:mb-8 rounded-full border border-red-500/30 bg-red-500/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-xs sm:text-sm font-medium tracking-wider uppercase">Tech Excellence</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 tracking-tight leading-tight">
              <span className="block text-white mb-2">Our Technology</span>
              <span className="block text-red-500 ">
                Arsenal
              </span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              Crafting digital masterpieces with industry-leading tools and frameworks
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="group relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 overflow-hidden"
                style={{
                  background: selectedCategory === category
                    ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
                    : 'transparent',
                  border: selectedCategory === category
                    ? 'none'
                    : '1px solid rgba(239, 68, 68, 0.2)',
                  color: selectedCategory === category ? 'white' : '#9ca3af',
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  }}
                />
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>

          {/* Tech Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-12 sm:mb-20">
            {filteredTechs.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="group relative"
                onMouseEnter={() => {
                  setHoveredTech(tech.name);
                }}
                onMouseLeave={() => {
                  setHoveredTech(null);
                }}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.03}s both`,
                }}
              >
                {/* Card Background */}
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-105">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl p-[1px] bg-gradient-to-br from-red-500/50 via-transparent to-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Card Content */}
                  <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl flex flex-col items-center justify-center p-2 sm:p-4 md:p-6">
                    {/* Corner Decorations */}
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-3 group-hover:h-3 sm:group-hover:w-4 sm:group-hover:h-4 md:group-hover:w-6 md:group-hover:h-6" />
                    <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-3 group-hover:h-3 sm:group-hover:w-4 sm:group-hover:h-4 md:group-hover:w-6 md:group-hover:h-6" />

                    {/* Radial Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.15), transparent 70%)',
                      }}
                    />

                    {/* Tech Icon */}
                    <div className="relative z-10 mb-1 sm:mb-2 transition-transform duration-500 group-hover:scale-110">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain transition-all duration-300"
                        style={{
                          filter: `${tech.invertLogo ? 'invert(1) ' : ''}${hoveredTech === tech.name
                            ? 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.6)) brightness(1.2)'
                            : 'brightness(0.9)'}`,
                        }}
                        loading="eager"
                        crossOrigin="anonymous"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50' y='50' font-size='40' text-anchor='middle' dominant-baseline='middle' fill='%23dc2626'%3E${tech.name[0]}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>

                    {/* Tech Name */}
                    <div className="text-white text-[10px] sm:text-xs md:text-sm font-semibold text-center opacity-60 group-hover:opacity-100 transition-opacity duration-300 px-1">
                      {tech.name}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 rounded-full text-[8px] sm:text-[10px] md:text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 sm:group-hover:-translate-y-2"
                      style={{
                        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                        color: 'white',
                      }}
                    >
                      {tech.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { value: `80+`, label: 'Technologies Mastered' },
              { value: '100+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, transparent 100%)',
                  }}
                />

                <div className="relative z-10 text-center">
                  <div className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 100% 0%, #dc2626 0%, transparent 70%)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}