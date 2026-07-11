"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, FileText, MapPin, Menu, X as CloseIcon } from "lucide-react";

/**
 * DamnX Solutions — Floating "Dynamic Island" Header
 * ----------------------------------------------------
 * Drop into: app/components/Header.tsx (or components/Header.tsx)
 * Deps:      npm i framer-motion lucide-react
 *
 * Put your logo at:  /public/damnx-logo.svg  (or .png)
 * If you don't have a logo asset yet, this component renders a
 * code-built logo (DAMNX + slashed X + SOLUTIONS) that matches the
 * screenshot pixel-for-pixel — swap the <Logo /> body for an
 * <img src="/damnx-logo.svg" .../> whenever your asset is ready.
 */

const navIcons = [
  { icon: Home, label: "Home", href: "/" },
  { icon: FileText, label: "Resources", href: "/resources" },
  { icon: MapPin, label: "Locations", href: "/locations" },
];

// Spring config tuned for that squishy "dynamic island" jelly feel
const jellySpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 22,
  mass: 0.7,
};

function Logo() {
  return (
    <div className="relative flex flex-col items-center select-none leading-none">
      <div className="relative flex items-center">
        <span
          className="font-extrabold tracking-tight text-white"
          style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.6rem)", letterSpacing: "-0.02em" }}
        >
          DAMN
        </span>
        <span className="relative inline-block" style={{ width: "0.65em", height: "1em" }}>
          <span
            className="absolute inset-0 flex items-center justify-center font-extrabold text-white"
            style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.6rem)" }}
          >
            X
          </span>
          {/* diagonal slash accent through the X, matching the mark in the source design */}
          <svg
            viewBox="0 0 40 60"
            className="absolute -top-2 left-1/2 h-[160%] w-[220%] -translate-x-1/2 overflow-visible"
            fill="none"
          >
            <line
              x1="4"
              y1="56"
              x2="36"
              y2="4"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
      <span
        className="-mt-1 font-medium text-white/85"
        style={{ fontSize: "clamp(0.5rem, 1vw, 0.65rem)", letterSpacing: "0.3em" }}
      >
        SOLUTIONS
      </span>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-5">
      <motion.nav
        initial={{ y: -80, opacity: 0, scale: 0.9 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: scrolled ? 0.97 : 1,
          width: scrolled ? "min(100%, 880px)" : "min(100%, 960px)",
        }}
        transition={jellySpring}
        className="flex w-full max-w-[960px] items-center justify-between rounded-full bg-[#E5231B] px-3 py-2 shadow-[0_8px_30px_rgba(229,35,27,0.35)] ring-1 ring-white/10 sm:px-4 sm:py-2.5"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.08) 100%)",
        }}
      >
        {/* Left: icon nav (desktop) */}
        <div className="hidden items-center gap-1 sm:flex">
          {navIcons.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={jellySpring}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white"
            >
              <Icon size={17} strokeWidth={1.8} />
            </motion.a>
          ))}
        </div>

        {/* Left: hamburger (mobile) */}
        <motion.button
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={jellySpring}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white sm:hidden"
        >
          <Menu size={20} strokeWidth={2} />
        </motion.button>

        {/* Center: logo */}
        <motion.a
          href="/"
          aria-label="DamnX Solutions — home"
          whileHover={{ scale: 1.04 }}
          transition={jellySpring}
          className="flex items-center justify-center"
        >
          <Logo />
        </motion.a>

        {/* Right: CTA */}
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          transition={jellySpring}
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#111] shadow-sm sm:px-6 sm:py-2.5 sm:text-sm"
        >
          Let&apos;s Talk
        </motion.a>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={jellySpring}
              className="fixed left-3 right-3 top-20 z-50 rounded-3xl bg-[#E5231B] p-5 shadow-2xl ring-1 ring-white/10 sm:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <Logo />
                <motion.button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  transition={jellySpring}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                >
                  <CloseIcon size={18} />
                </motion.button>
              </div>
              <div className="flex flex-col gap-1">
                {navIcons.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}