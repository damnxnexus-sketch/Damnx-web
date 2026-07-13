"use client";

import { motion } from "framer-motion";
import { Coffee, Hexagon, Sparkles, UtensilsCrossed, ShoppingBag, Dumbbell } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Client =
  | { name: string; category: string; kind: "icon"; icon: LucideIcon }
  | { name: string; category: string; kind: "mono"; mono: string };

const clientsRow1: Client[] = [
  { name: "The Burger Co.", category: "Restaurant", kind: "icon", icon: UtensilsCrossed },
  { name: "FitZone India", category: "Fitness", kind: "icon", icon: Dumbbell },
  { name: "Glow Skin Clinic", category: "Skincare", kind: "icon", icon: Sparkles },
  { name: "Urban Threads", category: "Fashion", kind: "icon", icon: ShoppingBag },
  { name: "Café & Co.", category: "Cafe", kind: "icon", icon: Coffee },
  { name: "TechNova", category: "Technology", kind: "icon", icon: Hexagon },
];

const clientsRow2: Client[] = [
  { name: "Pixel Studio", category: "Creative", kind: "mono", mono: "PS" },
  { name: "GreenLeaf Org", category: "Wellness", kind: "mono", mono: "GL" },
  { name: "SwiftCart", category: "E-Commerce", kind: "mono", mono: "SC" },
  { name: "NovaMed", category: "Healthcare", kind: "mono", mono: "NM" },
  { name: "LuxeStays", category: "Hospitality", kind: "mono", mono: "LS" },
  { name: "ProBuild Co.", category: "Construction", kind: "mono", mono: "PB" },
];

function ClientBadge({ client }: { client: Client }) {
  return (
    <div className="flex shrink-0 items-center gap-3 whitespace-nowrap border-r border-white/8 px-6 py-4 sm:px-8 sm:py-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-white ring-1 ring-white/10 sm:h-10 sm:w-10">
        {client.kind === "icon" ? (
          <client.icon size={17} strokeWidth={1.8} />
        ) : (
          <span className="text-xs font-extrabold sm:text-sm">{client.mono}</span>
        )}
      </span>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-white sm:text-[15px]">{client.name}</p>
        <p className="text-[11px] uppercase tracking-wide text-white/40 sm:text-xs">
          {client.category}
        </p>
      </div>
    </div>
  );
}

export default function ClientTicker() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 sm:py-28">
      {/* Section header */}
      <div className="relative mx-auto mb-12 max-w-3xl text-center sm:mb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.25em] text-[#E5231B] uppercase sm:text-sm"
        >
          Trusted By Brands
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl"
        >
          Brands We&apos;ve{" "}
          <span className="text-[#E5231B]">Helped Grow</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-4 h-[2px] w-12 rounded-full bg-[#E5231B]"
        />
      </div>

      {/* Row 1 — left to right */}
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a] mb-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent sm:w-24" />
        <div
          className="flex w-max hover:[animation-play-state:paused]"
          style={{ animation: "client-marquee 28s linear infinite" }}
        >
          {[...clientsRow1, ...clientsRow1].map((client, i) => (
            <ClientBadge key={`r1-${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent sm:w-24" />
        <div
          className="flex w-max hover:[animation-play-state:paused]"
          style={{ animation: "client-marquee-reverse 32s linear infinite" }}
        >
          {[...clientsRow2, ...clientsRow2].map((client, i) => (
            <ClientBadge key={`r2-${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}