"use client";

import { Coffee, Hexagon, Sparkles, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * DamnX Solutions — "Our Clients" Auto-Scrolling Logo Ticker
 * -------------------------------------------------------------
 * Drop into: app/components/ClientTicker.tsx
 * Deps:      npm i lucide-react   (no framer-motion needed — the
 *            scroll is a pure CSS animation, which is smoother and
 *            cheaper for an infinite marquee than JS-driven motion)
 *
 * The strip never stops moving. Duplicate the `clients` array's
 * items seamlessly by rendering it twice back-to-back and animating
 * a translateX(-50%) loop — that's what makes the loop invisible.
 */

type Client =
    | { name: string; category: string; kind: "icon"; icon: LucideIcon }
    | { name: string; category: string; kind: "mono"; mono: string };

const clients: Client[] = [
    { name: "The Burger Co.", category: "Restaurant", kind: "icon", icon: UtensilsCrossed },
    { name: "FitZone India", category: "Fitness", kind: "mono", mono: "FZ" },
    { name: "Glow Skin Clinic", category: "Skincare", kind: "icon", icon: Sparkles },
    { name: "Urban Threads", category: "Fashion", kind: "mono", mono: "UT" },
    { name: "Cafe & Co.", category: "Cafe", kind: "icon", icon: Coffee },
    { name: "TechNova", category: "Technology", kind: "icon", icon: Hexagon },
];

function ClientBadge({ client }: { client: Client }) {
    return (
        <div className="flex shrink-0 items-center gap-3 whitespace-nowrap border-r border-white/10 px-6 py-4 sm:px-8 sm:py-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 sm:h-10 sm:w-10">
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
        <section className="bg-black px-4 py-14 sm:px-6 sm:py-16">
            <h2 className="mb-8 text-center text-2xl font-extrabold text-[#E5231B] sm:mb-10 sm:text-3xl">
                Our Clients
            </h2>

            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-full border border-white/10 bg-[#0e0e0e]">
                {/* edge fades so the loop point is invisible */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0e0e0e] to-transparent sm:w-20" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0e0e0e] to-transparent sm:w-20" />

                <div className="flex w-max animate-[client-marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
                    {[...clients, ...clients].map((client, i) => (
                        <ClientBadge key={`${client.name}-${i}`} client={client} />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes client-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
}