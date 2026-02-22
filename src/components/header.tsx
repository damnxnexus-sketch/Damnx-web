"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Home, FileText } from "lucide-react";
import Link from "next/link";
import { useChat } from "@/app/context/ChatContext";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Blogs", icon: FileText, href: "/blogs" },
];

export default function DynamicIslandHeader() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // New state to track if we are on a phone
  const { openChat } = useChat();
  const headerRef = useRef<HTMLDivElement>(null);

  // 1. Detect screen size on load and on resize
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);

      // If it's a mobile screen, automatically expand it
      if (mobileView) {
        setExpanded(true);
      } else {
        // If they resize back to desktop, collapse it
        setExpanded(false);
      }
    };

    // Run once on initial load
    handleResize();

    // Listen for window resizing (e.g., rotating the phone)
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Only allow tap-outside to close if we are NOT on mobile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        if (!isMobile) {
          setExpanded(false);
        }
      }
    }

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [expanded, isMobile]);

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 font-sans w-full flex justify-center pointer-events-none">
      <motion.div
        layout
        ref={headerRef}
        // 3. Prevent hover interactions from closing it on mobile
        onMouseEnter={() => !isMobile && setExpanded(true)}
        onMouseLeave={() => !isMobile && setExpanded(false)}
        onClick={() => !expanded && !isMobile && setExpanded(true)}
        initial={{ width: 160, height: 48, borderRadius: 24 }}
        animate={{
          width: expanded ? "min(340px, 90vw)" : 160,
          height: expanded ? 72 : 48,
          borderRadius: 36,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 20,
        }}
        className={`relative overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex items-center justify-center p-2 pointer-events-auto ${!expanded && !isMobile ? "cursor-pointer" : ""}`}
      >
        <AnimatePresence mode="popLayout">
          {!expanded ? (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <img
                src="logobg.png"
                alt="DAMNX"
                className="h-8 w-8 object-contain opacity-90"
              />
              <span className="text-white/90 font-medium text-sm tracking-widest">DAMNX</span>
            </motion.div>
          ) : (
            <motion.div
              key="nav"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between w-full px-2 sm:px-4"
            >
              <div className="hidden sm:flex items-center gap-2 mr-2 sm:mr-4 border-r border-white/10 pr-2 sm:pr-4">
                <img src="logobg.png" alt="Logo" className="w-6 h-6 object-contain" />
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    // 4. Do not collapse the header on link click if on mobile
                    onClick={() => {
                      if (!isMobile) setExpanded(false);
                    }}
                    className="relative px-2 sm:px-3 py-2 group flex flex-col items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white/50 whitespace-nowrap">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>

              <button
                onClick={() => {
                  openChat();
                  if (!isMobile) setExpanded(false);
                }}
                className="ml-2 sm:ml-4 px-3 sm:px-4 py-1.5 bg-white text-black text-[10px] sm:text-xs font-bold rounded-full hover:scale-105 transition-transform whitespace-nowrap"
              >
                Let's Talk
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}