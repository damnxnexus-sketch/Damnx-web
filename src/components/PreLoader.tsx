'use client';

import { useState, useEffect, ReactNode } from 'react';

const LoadingScreen = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    // Minimum loading time to show the screen
    const minLoadTime = 1000;
    const startTime = Date.now();
    
    // Simulate progress for user feedback
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 150);

    // Function to complete loading
    const completeLoading = () => {
      if (!mounted) return;
      
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);
      
      setTimeout(() => {
        if (!mounted) return;
        
        clearInterval(progressInterval);
        setProgress(100);
        
        // Small delay before fade out
        setTimeout(() => {
          if (!mounted) return;
          setFadeOut(true);
          
          // Remove loading screen after fade animation
          setTimeout(() => {
            if (!mounted) return;
            setLoading(false);
            
            // Smooth scroll to top
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, 800);
        }, 300);
      }, remainingTime);
    };

    // Wait for window load event
    if (document.readyState === 'complete') {
      completeLoading();
    } else {
      window.addEventListener('load', completeLoading);
    }

    // Fallback timeout in case load event doesn't fire
    const fallbackTimeout = setTimeout(() => {
      completeLoading();
    }, 10000); // 10 second maximum

    return () => {
      mounted = false;
      if (progressInterval) clearInterval(progressInterval);
      clearTimeout(fallbackTimeout);
      window.removeEventListener('load', completeLoading);
    };
  }, []);

  return (
    <>
      {/* Loading Screen Overlay */}
      {loading && (
        <div
          className={`fixed inset-0 z-9999 flex items-center justify-center bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 transition-opacity duration-700 ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-center px-4">
            {/* Logo or Title */}
            <div className="mb-8">
              <div className="relative">
                <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 mb-2">
                  DamnX
                </h1>
                <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 animate-pulse" />
              </div>
              <p className="text-purple-300 text-lg mt-4">Crafting your experience...</p>
            </div>

            {/* Progress Bar */}
            <div className="w-80 max-w-full h-2 bg-slate-800/50 rounded-full overflow-hidden mx-auto backdrop-blur-sm border border-purple-500/20">
              <div
                className="h-full bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-300 ease-out rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Progress Percentage */}
            <div className="mt-4 text-purple-300 font-mono text-sm tabular-nums">
              {Math.round(progress)}%
            </div>

            {/* Animated Spinner */}
            <div className="mt-8 flex justify-center">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin" />
                <div className="absolute inset-2 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content - Always rendered but hidden while loading */}
      <div 
        className={`transition-opacity duration-1000 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ visibility: loading ? 'hidden' : 'visible' }}
      >
        {children}
      </div>

      {/* Custom shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default LoadingScreen;