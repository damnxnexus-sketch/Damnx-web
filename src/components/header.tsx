"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Home } from "lucide-react";
import Link from "next/link";
import { useChat } from "@/app/context/ChatContext";

const navItems = [
  { name: "Home", icon: Home, href: "#" },
];

export default function DynamicIslandHeader() {
  const [expanded, setExpanded] = useState(false);
  const { openChat } = useChat();

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 font-sans">
      <motion.div
        layout
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        initial={{ width: 160, height: 48, borderRadius: 24 }}
        animate={{
          width: expanded ? 300 : 160,
          height: expanded ? 72 : 48,
          borderRadius: 36,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 20,
        }} // Smooth spring animation
        className="relative overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex items-center justify-center p-2"
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
              className="flex items-center justify-between w-full px-4"
            >
              {/* Mini Logo on Left */}
              <div className="flex items-center gap-2 mr-4 border-r border-white/10 pr-4">
                <img src="logobg.png" alt="Logo" className="w-6 h-6 object-contain" />
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative px-3 py-2 group flex flex-col items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white/50 whitespace-nowrap">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Call to Action Button */}
              <button
                onClick={() => {
                  openChat();
                  setExpanded(false); // Optional: collapse header when chat opens
                }}
                className="ml-4 px-4 py-1.5 bg-white text-black text-xs font-bold rounded-full hover:scale-105 transition-transform"
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
