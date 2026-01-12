'use client';

import React, { useEffect, useRef, useState } from 'react';

const services = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Crafting digital experiences that transcend expectations. Every pixel, every interaction, meticulously engineered for perfection.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    reverse: false
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Native experiences that feel like magic. iOS and Android applications built with obsessive attention to detail.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    reverse: true
  },
  {
    id: 3,
    title: 'Chatbot Development',
    description: 'Intelligent conversations that understand context. Seamless integration that feels naturally human.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
    reverse: false
  },
  {
    id: 4,
    title: 'UI / UX Design',
    description: 'Design systems that speak volumes. Interfaces so intuitive, they disappear into pure experience.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    reverse: true
  },
  {
    id: 5,
    title: 'Logo & Branding',
    description: 'Identity crafted to perfection. Visual languages that resonate across every touchpoint.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    reverse: false
  },
  {
    id: 6,
    title: 'AI Chatbots',
    description: 'Next-generation intelligence. Conversational AI that learns, adapts, and delivers unprecedented value.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    reverse: true
  }
];

const benefitsData: Record<number, Array<{ title: string; desc: string }>> = {
  1: [
    { title: 'Increase Conversions', desc: 'Professional websites convert 200% more visitors into customers' },
    { title: '24/7 Presence', desc: 'Your business never sleeps with a powerful online presence' },
    { title: 'Build Credibility', desc: '75% of users judge business credibility by website design' }
  ],
  2: [
    { title: 'Customer Engagement', desc: 'Mobile apps see 3x higher engagement than mobile websites' },
    { title: 'Brand Loyalty', desc: 'Direct channel to your customers\' pockets builds retention' },
    { title: 'Revenue Growth', desc: 'App users spend 2x more than mobile web users' }
  ],
  3: [
    { title: 'Instant Support', desc: 'Reduce response time from hours to seconds' },
    { title: 'Cost Efficiency', desc: 'Handle 80% of queries automatically, saving support costs' },
    { title: 'Lead Generation', desc: 'Capture and qualify leads 24/7 without human intervention' }
  ],
  4: [
    { title: 'User Satisfaction', desc: 'Good UX increases customer satisfaction by 200%' },
    { title: 'ROI Boost', desc: 'Every $1 invested in UX returns $100 in ROI' },
    { title: 'Competitive Edge', desc: 'Stand out with intuitive, beautiful interfaces' }
  ],
  5: [
    { title: 'Brand Recognition', desc: 'Consistent branding increases revenue by 23%' },
    { title: 'Trust Building', desc: 'Professional identity makes your brand memorable' },
    { title: 'Market Position', desc: 'Stand out in crowded markets with unique visual identity' }
  ],
  6: [
    { title: 'Smart Automation', desc: 'AI handles complex queries with human-like understanding' },
    { title: 'Scale Effortlessly', desc: 'Handle thousands of conversations simultaneously' },
    { title: 'Data Insights', desc: 'Learn customer preferences and behavior patterns automatically' }
  ]
};

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll('.service-card');
      
      cards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        const rect = htmlCard.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        let blurAmount = 0;
        if (rect.top < 0) {
          const distanceAbove = Math.abs(rect.top);
          blurAmount = Math.min(12, (distanceAbove / 200) * 12);
        }
        
        htmlCard.style.filter = `blur(${blurAmount}px)`;
        
        const img = htmlCard.querySelector('.parallax-img') as HTMLElement;
        if (img && rect.top < windowHeight && rect.bottom > -windowHeight) {
          const yPos = -(rect.top * 0.2);
          img.style.transform = `translateY(${yPos}px)`;
        }

        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          htmlCard.style.opacity = '1';
        } else if (rect.bottom < 0) {
          htmlCard.style.opacity = '0.7';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <div className="services-header">
        <h1 className="main-title">
          Our <span style={{ color: '#dc0000' }}>Services</span>
        </h1>
        <p className="main-subtitle">
          Comprehensive solutions tailored to transform your vision into reality
        </p>
      </div>

      <div ref={sectionRef} style={{ position: 'relative', width: '100%' }}>
        {services.map((service) => (
          <div
            key={service.id}
            className="service-card"
            style={{
              minHeight: isMobile ? 'auto' : '100vh',
              display: 'flex',
              flexDirection: isMobile ? 'column' : (service.reverse ? 'row-reverse' : 'row'),
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: isMobile ? '60px 24px' : '0 8%',
              backgroundColor: '#000',
              gap: isMobile ? '40px' : '4%',
              opacity: 1,
              transition: 'opacity 0.3s ease, filter 0.05s ease-out'
            }}
          >
            <div 
              className="text-side"
              style={{ 
                width: isMobile ? '100%' : '48%', 
                zIndex: 10, 
                position: 'relative',
                minHeight: isMobile ? 'auto' : '500px'
              }}
              onMouseEnter={() => !isMobile && setHoveredCard(service.id)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="service-number">
                  0{service.id}
                </span>
                <h2 className="service-title">
                  {service.title}
                </h2>
                <p className="service-description">
                  {service.description}
                </p>
                
                {isMobile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHoveredCard(hoveredCard === service.id ? null : service.id);
                    }}
                    style={{
                      marginTop: '24px',
                      padding: '14px 28px',
                      backgroundColor: hoveredCard === service.id ? '#dc0000' : 'transparent',
                      color: '#fff',
                      border: '2px solid #dc0000',
                      borderRadius: '8px',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {hoveredCard === service.id ? 'Show Less' : 'View Benefits'}
                    <span style={{
                      transform: hoveredCard === service.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      display: 'inline-block',
                      fontSize: '12px'
                    }}>
                      ▼
                    </span>
                  </button>
                )}
              </div>
              
              <div 
                className="hover-card"
                style={{
                  position: isMobile ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: isMobile ? 'auto' : 0,
                  width: '100%',
                  minHeight: isMobile ? 'auto' : '100%',
                  marginTop: isMobile ? '30px' : 0,
                  background: 'rgba(0, 0, 0, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '2px solid rgba(220, 0, 0, 0.4)',
                  borderRadius: '16px',
                  padding: isMobile ? (hoveredCard === service.id ? '30px' : '0 30px') : '40px',
                  opacity: hoveredCard === service.id ? 1 : 0,
                  maxHeight: hoveredCard === service.id && isMobile ? '2000px' : (isMobile ? '0' : 'none'),
                  overflow: isMobile ? 'hidden' : 'visible',
                  pointerEvents: hoveredCard === service.id ? 'auto' : 'none',
                  transition: isMobile 
                    ? 'opacity 0.5s ease, max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), padding 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                    : 'opacity 0.4s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  zIndex: 20,
                  boxShadow: hoveredCard === service.id ? '0 10px 40px rgba(220, 0, 0, 0.3)' : 'none'
                }}
              >
                <h3 className="hover-title">
                  How This Helps Your Business
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {benefitsData[service.id].map((benefit, idx) => (
                    <li key={idx} className="benefit-item">
                      <span className="checkmark">✓</span>
                      <span className="benefit-text">
                        <strong>{benefit.title}:</strong> {benefit.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="image-container">
              <div 
                className="parallax-img"
                style={{
                  width: '100%',
                  height: '130%',
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.05s linear',
                  boxShadow: '0 20px 60px rgba(220, 0, 0, 0.2)',
                  borderRadius: '16px'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .services-header {
          padding: 120px 8% 80px;
          background-color: #000;
          text-align: center;
        }

        .main-title {
          font-size: clamp(36px, 8vw, 72px);
          font-weight: 700;
          color: #fff;
          margin: 0 0 20px 0;
          line-height: 1.1;
          letter-spacing: -2px;
        }

        .main-subtitle {
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 300;
          color: #999;
          margin: 0 auto;
          max-width: 600px;
          line-height: 1.6;
          padding: 0 20px;
        }

        .service-number {
          display: block;
          font-size: clamp(12px, 1.5vw, 14px);
          font-weight: 500;
          color: #dc0000;
          letter-spacing: 3px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .service-title {
          font-size: clamp(28px, 5vw, 56px);
          font-weight: 700;
          color: #fff;
          margin: 0 0 30px 0;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .service-description {
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 300;
          color: #ccc;
          line-height: 1.8;
          margin: 0;
          max-width: 450px;
        }

        .image-container {
          width: 100%;
          height: 70vh;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          max-height: 600px;
        }

        .hover-title {
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 700;
          color: #fff;
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .benefit-item {
          margin-bottom: 18px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .benefit-item:last-child {
          margin-bottom: 0;
        }

        .checkmark {
          color: #dc0000;
          font-size: 20px;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .benefit-text {
          color: #fff;
          font-size: clamp(13px, 1.8vw, 16px);
          line-height: 1.6;
        }

        .benefit-text strong {
          color: #fff;
          font-weight: 600;
        }

        .text-side {
          transition: transform 0.3s ease;
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 0, 0, 0.4);
        }
        
        button:active {
          transform: translateY(0);
        }

        @media (min-width: 769px) {
          .text-side:hover {
            transform: scale(1.01);
          }
          
          .image-container {
            width: 48%;
          }
          
          .hover-card {
            min-height: 400px !important;
          }
        }

        @media (max-width: 768px) {
          .services-header {
            padding: 80px 24px 60px;
          }

          .service-description {
            max-width: 100%;
          }

          .image-container {
            height: 50vh;
            min-height: 300px;
          }

          .text-side {
            min-height: auto !important;
          }
        }

        @media (max-width: 480px) {
          .services-header {
            padding: 60px 20px 40px;
          }

          .service-card {
            padding: 40px 20px !important;
          }

          .image-container {
            height: 45vh;
            min-height: 280px;
          }

          .benefit-item {
            margin-bottom: 14px;
            gap: 10px;
          }

          .checkmark {
            font-size: 18px;
          }
          
          .hover-title {
            margin-bottom: 20px;
          }
        }

        @media (max-width: 360px) {
          .main-title {
            font-size: 32px;
          }

          .service-title {
            font-size: 24px;
          }

          .image-container {
            min-height: 250px;
          }
          
          .benefit-item {
            margin-bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
}