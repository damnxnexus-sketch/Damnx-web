import { useState, useEffect } from 'react';

const LoadingScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    // Simulate progress for user feedback
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    // Wait for window load event (all resources loaded)
    const handleLoad = () => {
      if (!mounted) return;
      
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
      }, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      mounted = false;
      clearInterval(progressInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!loading) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Loading Screen Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-opacity duration-700 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="text-center">
          {/* Logo or Title */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-2 animate-pulse">
              Loading
            </h1>
            <p className="text-purple-300 text-lg">Preparing your experience...</p>
          </div>

          {/* Progress Bar */}
          <div className="w-80 h-2 bg-slate-700 rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Percentage */}
          <div className="mt-4 text-purple-300 font-mono text-sm">
            {Math.round(progress)}%
          </div>

          {/* Animated Spinner */}
          <div className="mt-8 flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" />
            </div>
          </div>
        </div>
      </div>

      {/* Content (hidden while loading) */}
      <div className={`transition-opacity duration-700 ${fadeOut ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </>
  );
};

// Demo content with heavy animations
const HeavyContent = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-4">
            Welcome
          </h1>
          <p className="text-2xl text-purple-300">
            Your content has loaded successfully
          </p>
        </div>
      </section>

      {/* Additional sections */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-5xl font-bold mb-4">Smooth Experience</h2>
          <p className="text-xl text-purple-300">
            All your 3D models and animations are ready
          </p>
        </div>
      </section>
    </div>
  );
};

export default function PreLoader() {
  return (
    <LoadingScreen>
      <HeavyContent />
    </LoadingScreen>
  );
}