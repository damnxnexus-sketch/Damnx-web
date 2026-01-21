"use client";
import React, { useState, useEffect } from 'react';

const PreloaderComponent = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "Crafting your experience...",
    "Loading greatness...",
    "Almost there...",
    "Preparing something special...",
    "Just a moment more..."
  ];

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Show quotes after 3 seconds
    const quoteTimeout = setTimeout(() => {
      setShowQuote(true);
    }, 3000);

    // Rotate quotes every 2.5 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 2500);

    // Check if everything is loaded
    const checkLoaded = () => {
      if (document.readyState === 'complete') {
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        window.addEventListener('load', () => {
          setProgress(100);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
      }
    };

    // Start checking after a minimum time
    setTimeout(checkLoaded, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(quoteInterval);
      clearTimeout(quoteTimeout);
    };
  }, []);

  if (!loading) {
    return <div className="fade-in">{children}</div>;
  }

  return (
    <div className="preloader-container">
      {/* Animated background particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="preloader-content">
        {/* Logo/Brand animation */}
        <div className="logo-container">
          <div className="logo-ring"></div>
          <div className="logo-ring-2"></div>
          <div className="logo-center"></div>
        </div>

        {/* Progress bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {Math.min(Math.round(progress), 100)}%
          </div>
        </div>

        {/* Quote appears after 3 seconds */}
        {showQuote && (
          <div className="quote-container">
            <p className="quote">{quotes[currentQuote]}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .preloader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: float linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        .preloader-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        .logo-container {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .logo-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
        }

        .logo-ring-2 {
          position: absolute;
          width: 80%;
          height: 80%;
          top: 10%;
          left: 10%;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-bottom-color: #fff;
          border-radius: 50%;
          animation: spin 2s linear infinite reverse;
        }

        .logo-center {
          position: absolute;
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
          background: #fff;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.8);
            opacity: 0.6;
          }
        }

        .progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 300px;
        }

        .progress-bar {
          width: 100%;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.7));
          transition: width 0.3s ease;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .progress-text {
          color: #fff;
          font-size: 0.875rem;
          font-weight: 300;
          letter-spacing: 2px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .quote-container {
          animation: fadeIn 0.5s ease-in;
        }

        .quote {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-weight: 300;
          letter-spacing: 1px;
          text-align: center;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          animation: fadeInOut 2.5s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        .fade-in {
          animation: contentFadeIn 0.6s ease-in;
        }

        @keyframes contentFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default PreloaderComponent;