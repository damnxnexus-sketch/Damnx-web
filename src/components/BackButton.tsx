'use client';

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide the back button on the main homepage and global page
  if (pathname === "/" || pathname === "/global") return null;

  const handleBack = () => {
    // If there is history to go back to, use it. Otherwise, fallback to home.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={handleBack}
        className="fixed top-7 left-6 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/8 bg-black/50 backdrop-blur-md text-zinc-400 hover:text-white hover:border-white/20 hover:bg-black/75 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-pointer group"
        aria-label="Go back"
      >
        <ArrowLeft 
          size={14} 
          className="group-hover:-translate-x-0.5 transition-transform duration-200 text-zinc-400 group-hover:text-white" 
        />
        <span className="text-[10px] font-mono tracking-widest uppercase font-medium">
          Back
        </span>
      </motion.button>
    </AnimatePresence>
  );
}
