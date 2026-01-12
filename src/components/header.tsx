"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function DynamicIslandHeader() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        layout
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl cursor-pointer overflow-hidden flex items-center justify-center"
        transition={{
          layout: {
            duration: 0.5,
            type: "spring",
            stiffness: 120,
          },
        }}
        style={{
          width: expanded ? "320px" : "160px",
          height: expanded ? "72px" : "48px",
        }}
      >
        {!expanded ? (
          <img 
            src="logobg.png" 
            alt="DAMNX Logo" 
            className="h-16 w-16 object-contain"
          />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-white font-semibold">
              DAMN<span className="text-red-700">X</span> Solution
            </span>
            <span className="text-gray-300 text-xs">
              Turning imagination into reality
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
