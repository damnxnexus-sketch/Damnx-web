'use client';

import { motion } from 'framer-motion';

interface MobileFriendlyBackgroundProps {
  variant?: 'gradient' | 'mesh' | 'waves' | 'particles' | 'aurora';
  className?: string;
}

export default function MobileFriendlyBackground({ 
  variant = 'gradient',
  className = ''
}: MobileFriendlyBackgroundProps) {
  
  if (variant === 'gradient') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.4) 0%, rgba(220,38,38,0) 70%)'
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-25 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0) 70%)'
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full opacity-20 blur-[90px]"
          style={{
            background: 'radial-gradient(circle, rgba(185,28,28,0.4) 0%, rgba(185,28,28,0) 70%)'
          }}
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    );
  }

  if (variant === 'mesh') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Gradient mesh background */}
        <div className="absolute inset-0 opacity-40">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(at 20% 30%, rgba(220,38,38,0.3) 0px, transparent 50%),
                radial-gradient(at 80% 70%, rgba(239,68,68,0.25) 0px, transparent 50%),
                radial-gradient(at 50% 50%, rgba(185,28,28,0.2) 0px, transparent 50%)
              `,
              animation: 'meshMove 15s ease-in-out infinite'
            }}
          />
        </div>
        <style jsx>{`
          @keyframes meshMove {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }
        `}</style>
      </div>
    );
  }

  if (variant === 'waves') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* CSS-only wave animation */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute bottom-0 left-0 right-0 h-[300px]"
            style={{
              background: 'linear-gradient(to top, rgba(220,38,38,0.3), transparent)',
              animation: 'wave 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-[250px]"
            style={{
              background: 'linear-gradient(to top, rgba(239,68,68,0.2), transparent)',
              animation: 'wave 10s ease-in-out infinite',
              animationDelay: '1s'
            }}
          />
        </div>
        <style jsx>{`
          @keyframes wave {
            0%, 100% { transform: translateY(0) scaleY(1); }
            50% { transform: translateY(-20px) scaleY(1.1); }
          }
        `}</style>
      </div>
    );
  }

  if (variant === 'particles') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Lightweight CSS particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'aurora') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Aurora borealis effect */}
        <div className="absolute inset-0 opacity-40">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(220,38,38,0.3) 0%, 
                  rgba(239,68,68,0.2) 25%,
                  rgba(185,28,28,0.25) 50%,
                  rgba(220,38,38,0.2) 75%,
                  rgba(239,68,68,0.3) 100%
                )
              `,
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>
    );
  }

  return null;
}
