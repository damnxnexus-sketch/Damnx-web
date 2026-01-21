"use client";
import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Initializing experience...",
  "Loading high-fidelity assets...",
  "Optimizing performance...",
  "Almost there...",
  "Still with us? Greatness takes a second.",
  "Finalizing the magic..."
];

export default function Preloader({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Handle the actual window load event
    const handleLoad = () => {
      // Small delay to ensure smooth transition even on fast internet
      setTimeout(() => setIsLoading(false), 2000); 
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // "Interesting" message cycler for long loads
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 3000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {/* Minimalist Loading Bar */}
            <div style={{ width: "200px", height: "2px", background: "#333", marginBottom: "20px", overflow: "hidden", position: "relative" }}>
               <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                style={{ width: "100%", height: "100%", background: "#fff", position: "absolute" }}
               />
            </div>

            {/* Dynamic Status Text */}
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ fontSize: "0.8rem", letterSpacing: "0.2rem", textTransform: "uppercase", fontWeight: "300" }}
            >
              {messages[messageIndex]}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </>
  );
}