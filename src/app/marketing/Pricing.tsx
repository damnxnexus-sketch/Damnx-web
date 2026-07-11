"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

/**
 * DamnX Solutions — Pricing Comparison Table (v3, 100% responsive, no-scroll)
 * ---------------------------------------------------------------------
 * Drop into: app/components/PricingTable.tsx
 * Deps:      npm i framer-motion lucide-react
 *
 * This version renders all 4 columns (Services list + 3 plans) side-by-side
 * on all screen sizes, including mobile, completely eliminating horizontal scrolling.
 * Sizing scales dynamically using tailwind responsive helpers.
 */

type Cell = { type: "check" } | { type: "cross" } | { type: "text"; value: string };

type Row = { label: string; values: [Cell, Cell, Cell] };

const plans = [
    { name: "Basic", price: "22K", featured: false },
    { name: "Lite", price: "35K", featured: false },
    { name: "Premium", price: "50K", featured: true },
] as const;

const check: Cell = { type: "check" };
const cross: Cell = { type: "cross" };
const t = (value: string): Cell => ({ type: "text", value });

const rows: Row[] = [
    { label: "Social Media marketing", values: [check, check, check] },
    { label: "Reels", values: [cross, t("15+"), t("20+")] },
    { label: "Long form video", values: [cross, t("2+"), t("4+")] },
    { label: "Influencer collabs", values: [t("3"), t("5"), t("7")] },
    { label: "Professional shoots", values: [check, check, check] },
    { label: "Meta ads campaign", values: [check, check, check] },
    { label: "Business growth strategy", values: [cross, check, check] },
    { label: "Business dev assistance", values: [cross, check, check] },
    { label: "Dedicated manager", values: [cross, cross, check] },
    { label: "On ground ops support", values: [cross, cross, check] },
    { label: "Data analytics software", values: [cross, cross, check] },
    { label: "Website development", values: [cross, check, check] },
    { label: "Domain", values: [cross, cross, check] },
    { label: "Hosting", values: [cross, check, check] },
    { label: "Maintainance", values: [cross, cross, check] },
    { label: "Upgradation", values: [cross, cross, check] },
];

const FEATURE_COUNT = rows.length;
const HEADER_ROW = 1;
const FEATURE_START = 2;
const BUTTON_ROW = FEATURE_START + FEATURE_COUNT; // last row

function CellIcon({ cell }: { cell: Cell }) {
    if (cell.type === "check") {
        return (
            <span className="mx-auto flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.15)]">
                <Check size={10} className="sm:hidden" strokeWidth={3} />
                <Check size={14} className="hidden sm:block" strokeWidth={2.75} />
            </span>
        );
    }
    if (cell.type === "cross") {
        return (
            <span className="mx-auto flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/20">
                <X size={10} className="sm:hidden" strokeWidth={3} />
                <X size={13} className="hidden sm:block" strokeWidth={2.5} />
            </span>
        );
    }
    return <span className="text-[11px] font-semibold text-white sm:text-[15px]">{cell.value}</span>;
}

export default function PricingTable() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section className="relative overflow-hidden bg-black px-3 py-16 sm:px-6 sm:py-28">
            {/* ambient red glow behind the featured plan */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-40 h-[420px] w-[420px] -translate-x-[15%] rounded-full opacity-40 blur-[110px] sm:opacity-60"
                style={{ background: "radial-gradient(circle, #E5231B 0%, transparent 70%)" }}
            />

            <div className="relative mx-auto max-w-6xl text-center">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-xs font-semibold tracking-[0.25em] text-[#E5231B] sm:text-sm"
                >
                    PICK YOUR PLAN
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
                >
                    Growth Plans That Scale With You
                </motion.h2>
            </div>

            <div className="relative mx-auto mt-12 max-w-6xl">
                <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-3 sm:p-8">
                    <div className="overflow-hidden pb-1">
                        <div
                            className="relative grid w-full gap-x-1.5 gap-y-0 sm:gap-x-4"
                            style={{ gridTemplateColumns: "1.3fr repeat(3, 1fr)" }}
                        >
                            {/* ---- plan background cards (painted behind the content cells) ---- */}
                            {plans.map((plan, pi) => (
                                <div
                                    key={plan.name}
                                    style={{ gridColumn: pi + 2, gridRow: `${HEADER_ROW} / ${BUTTON_ROW + 1}` }}
                                    className={`relative my-1 rounded-2xl border transition-colors duration-300 ${plan.featured
                                        ? "border-[#E5231B]/70 bg-gradient-to-b from-[#E5231B]/[0.09] to-white/[0.02] shadow-[0_0_50px_rgba(229,35,27,0.18)]"
                                        : "border-white/10 bg-white/[0.02]"
                                        }`}
                                >
                                    {plan.featured && (
                                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#E5231B] px-2 py-0.5 text-[8px] font-bold tracking-wide text-white shadow-[0_3px_10px_rgba(229,35,27,0.5)] sm:-top-3 sm:px-4 sm:py-1 sm:text-xs">
                                            MOST POPULAR
                                        </span>
                                    )}
                                </div>
                            ))}

                            {/* ---- header row: plan name + price ---- */}
                            <div style={{ gridColumn: 1, gridRow: HEADER_ROW }} className="flex items-end pb-4 pr-1">
                                <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold text-white/80 sm:px-4 sm:py-1.5 sm:text-xs">
                                    Services
                                </span>
                            </div>
                            {plans.map((plan, pi) => (
                                <div
                                    key={plan.name}
                                    style={{ gridColumn: pi + 2, gridRow: HEADER_ROW }}
                                    className="relative z-10 flex flex-col items-center gap-0.5 px-1 pb-2 pt-6 text-center sm:gap-2 sm:pt-8"
                                >
                                    <span
                                        className={`text-xs font-extrabold sm:text-xl ${plan.featured ? "text-[#E5231B]" : "text-white"
                                            }`}
                                    >
                                        {plan.name}
                                    </span>
                                    <span className="flex items-baseline gap-0.5">
                                        <span className="text-sm font-extrabold text-white sm:text-3xl">
                                            ₹{plan.price}
                                        </span>
                                        <span className="text-[8px] text-white/40 sm:text-xs">/mo</span>
                                    </span>
                                </div>
                            ))}

                            {/* ---- feature rows ---- */}
                            {rows.map((row, i) => {
                                const gridRow = FEATURE_START + i;
                                const isHovered = hovered === i;
                                return (
                                    <Fragment key={row.label}>
                                        <div
                                            style={{ gridColumn: 1, gridRow }}
                                            onMouseEnter={() => setHovered(i)}
                                            onMouseLeave={() => setHovered(null)}
                                            className={`flex items-center rounded-l-xl py-2.5 pr-1 text-[10px] leading-tight transition-colors duration-150 ${isHovered ? "text-white bg-white/[0.03]" : "text-white/65"
                                                } sm:py-3.5 sm:pr-4 sm:text-[14px]`}
                                        >
                                            {row.label}
                                        </div>
                                        {row.values.map((cell, ci) => (
                                            <div
                                                key={`${row.label}-${ci}`}
                                                style={{ gridColumn: ci + 2, gridRow }}
                                                onMouseEnter={() => setHovered(i)}
                                                onMouseLeave={() => setHovered(null)}
                                                className={`relative z-10 flex items-center justify-center py-2.5 transition-colors duration-150 ${isHovered ? "bg-white/[0.03]" : ""
                                                    } sm:py-3.5`}
                                            >
                                                <CellIcon cell={cell} />
                                            </div>
                                        ))}
                                    </Fragment>
                                );
                            })}

                            {/* ---- buy now row ---- */}
                            <div style={{ gridColumn: 1, gridRow: BUTTON_ROW }} />
                            {plans.map((plan, pi) => (
                                <div
                                    key={plan.name}
                                    style={{ gridColumn: pi + 2, gridRow: BUTTON_ROW }}
                                    className="relative z-10 flex items-center justify-center px-1 pb-4 pt-3 sm:px-5 sm:pb-7 sm:pt-6"
                                >
                                    <motion.a
                                        href={`#buy-${plan.name.toLowerCase()}`}
                                        whileHover={{ scale: 1.045, y: -2 }}
                                        whileTap={{ scale: 0.96 }}
                                        transition={{ type: "spring", stiffness: 380, damping: 20 }}
                                        className={`w-full rounded-lg py-2 text-center text-[10px] font-bold text-white transition-shadow sm:py-3 sm:text-sm ${plan.featured
                                            ? "bg-gradient-to-b from-[#FF3B30] to-[#B3140C] shadow-[0_10px_30px_rgba(229,35,27,0.45)] hover:shadow-[0_14px_36px_rgba(229,35,27,0.6)]"
                                            : "bg-white/10 hover:bg-white/15"
                                            }`}
                                    >
                                        Buy Now
                                    </motion.a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}