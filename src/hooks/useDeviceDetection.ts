/**
 * Custom hook for device detection and performance optimization
 * Detects mobile devices, reduced motion preferences, and connection speed
 */
'use client';

import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  isSlowConnection: boolean;
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isLowEnd: false,
    prefersReducedMotion: false,
    isSlowConnection: false,
  });

  useEffect(() => {
    const checkDevice = () => {
      // Check screen size
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Detect low-end devices
      const isLowEnd = 
        // Check CPU cores
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        // Check device memory (if available)
        ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4) ||
        // Mobile devices are considered potentially low-end
        isMobile;

      // Check connection speed
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const isSlowConnection = connection ? 
        (connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g' || 
         connection.effectiveType === '3g' ||
         connection.saveData === true) : false;

      setDeviceInfo({
        isMobile,
        isTablet,
        isLowEnd,
        prefersReducedMotion,
        isSlowConnection,
      });
    };

    checkDevice();

    // Re-check on resize
    const handleResize = () => {
      checkDevice();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceInfo;
}

/**
 * Hook to determine if heavy effects should be enabled
 */
export function useShouldReduceEffects(): boolean {
  const { isMobile, isLowEnd, prefersReducedMotion, isSlowConnection } = useDeviceDetection();
  
  return isMobile || isLowEnd || prefersReducedMotion || isSlowConnection;
}
