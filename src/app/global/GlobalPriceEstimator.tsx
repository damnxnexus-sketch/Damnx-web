"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Country {
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  rate: number;
  timezone: string;
  payment: string[];
  tax: string;
  support: string;
}

const COUNTRIES: Country[] = [
  { name: "United States", flag: "🇺🇸", currency: "USD", symbol: "$", rate: 1, timezone: "EST/PST", payment: ["Visa/MC", "ACH", "Wire", "PayPal"], tax: "No VAT", support: "24/7" },
  { name: "Canada", flag: "🇨🇦", currency: "CAD", symbol: "CA$", rate: 1.36, timezone: "EST/PST", payment: ["Visa/MC", "EFT", "Wire"], tax: "GST varies", support: "24/7" },
  { name: "United Kingdom", flag: "🇬🇧", currency: "GBP", symbol: "£", rate: 0.79, timezone: "GMT/BST", payment: ["Visa/MC", "BACS", "Direct Debit"], tax: "VAT exempt (B2B)", support: "24/7" },
  { name: "Australia", flag: "🇦🇺", currency: "AUD", symbol: "A$", rate: 1.53, timezone: "AEST", payment: ["Visa/MC", "Bank Transfer", "BPAY"], tax: "GST exempt (offshore)", support: "24/7" },
  { name: "Germany", flag: "🇩🇪", currency: "EUR", symbol: "€", rate: 0.92, timezone: "CET", payment: ["Visa/MC", "SEPA", "SWIFT"], tax: "VAT 0% (B2B offshore)", support: "24/7" },
  { name: "Singapore", flag: "🇸🇬", currency: "SGD", symbol: "S$", rate: 1.34, timezone: "SGT", payment: ["Visa/MC", "PayNow", "Wire"], tax: "GST 9%", support: "24/7" },
  { name: "UAE", flag: "🇦🇪", currency: "AED", symbol: "AED", rate: 3.67, timezone: "GST", payment: ["Visa/MC", "Wire", "Cheque"], tax: "VAT 5%", support: "24/7" },
  { name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR", symbol: "SAR", rate: 3.75, timezone: "AST", payment: ["Visa/MC", "SADAD", "Wire"], tax: "VAT 15%", support: "24/7" },
  { name: "France", flag: "🇫🇷", currency: "EUR", symbol: "€", rate: 0.92, timezone: "CET", payment: ["Visa/MC", "SEPA", "SWIFT"], tax: "VAT 0% (B2B offshore)", support: "24/7" },
  { name: "India", flag: "🇮🇳", currency: "INR", symbol: "₹", rate: 83.5, timezone: "IST", payment: ["UPI", "NEFT/RTGS", "Credit Card"], tax: "GST 18%", support: "24/7" },
];

interface Plan {
  name: string;
  tagline: string;
  usdBase: number;
  usdTop: number;
  monthlyUsd?: number;
  features: string[];
  featured?: boolean;
  deliveryWeeks: string;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    tagline: "For MVPs and early-stage products",
    usdBase: 3000,
    usdTop: 10000,
    features: [
      "Up to 10 pages / screens",
      "Standard UI design",
      "Mobile responsive",
      "Basic CMS integration",
      "6 months maintenance",
      "Dedicated project manager",
    ],
    deliveryWeeks: "4–6 weeks",
  },
  {
    name: "Growth",
    tagline: "For scaling businesses",
    usdBase: 10000,
    usdTop: 30000,
    features: [
      "Unlimited pages / screens",
      "Custom design system",
      "AI or 3rd-party integrations",
      "Advanced analytics",
      "1-year free maintenance",
      "Dedicated team of 3",
      "Priority support",
    ],
    featured: true,
    deliveryWeeks: "8–12 weeks",
  },
  {
    name: "Enterprise",
    tagline: "For global-scale operations",
    usdBase: 30000,
    usdTop: 100000,
    features: [
      "Full-scale custom architecture",
      "Multi-region cloud deployment",
      "Enterprise security & compliance",
      "Dedicated engineering team",
      "2-year free maintenance",
      "24/7 SLA support",
      "Quarterly strategy reviews",
    ],
    deliveryWeeks: "12–24 weeks",
  },
];

function fmt(usd: number, c: Country): string {
  const v = Math.round((usd * c.rate) / 500) * 500;
  if (v >= 1_000_000) return `${c.symbol}${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${c.symbol}${(v / 1_000).toFixed(0)}K`;
  return `${c.symbol}${v.toLocaleString()}`;
}

export default function GlobalPricing() {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);

  return (
    <section id="pricing" className="bg-[#0a0a0a] py-24 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5 text-[11px] font-bold tracking-[0.3em] uppercase text-white/30"
          >
            <span className="w-6 h-px bg-[#E5231B]" />
            Global Pricing
          </motion.p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-black text-white leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
            >
              Transparent pricing.
              <br />
              <span className="text-white/25">Your currency.</span>
            </motion.h2>

            {/* Country selector */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex-shrink-0"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-3">
                View pricing in
              </p>
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setCountry(c)}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 cursor-pointer ${
                      country.name === c.name
                        ? "bg-white text-[#0a0a0a]"
                        : "border border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.currency}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Pricing cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={country.currency}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-10"
          >
            {PLANS.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl flex flex-col ${
                  plan.featured
                    ? "bg-white"
                    : "border border-white/8 bg-white/[0.04]"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#E5231B] px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-7 sm:p-8 flex flex-col flex-1 gap-7">
                  {/* Plan header */}
                  <div>
                    <h3
                      className={`text-xl font-black tracking-tight mb-1 ${plan.featured ? "text-[#0a0a0a]" : "text-white"}`}
                    >
                      {plan.name}
                    </h3>
                    <p className={`text-xs ${plan.featured ? "text-[#0a0a0a]/45" : "text-white/35"}`}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`font-black leading-none tracking-tighter ${plan.featured ? "text-[#0a0a0a]" : "text-white"}`}
                        style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
                      >
                        {fmt(plan.usdBase, country)}
                      </span>
                      <span className={`text-lg ${plan.featured ? "text-[#0a0a0a]/30" : "text-white/25"}`}>
                        –
                      </span>
                      <span
                        className={`font-black leading-none tracking-tighter ${plan.featured ? "text-[#E5231B]" : "text-white/60"}`}
                        style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
                      >
                        {fmt(plan.usdTop, country)}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1 ${plan.featured ? "text-[#0a0a0a]/35" : "text-white/25"}`}>
                      {country.currency} · {plan.deliveryWeeks}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`h-px ${plan.featured ? "bg-[#0a0a0a]/8" : "bg-white/8"}`} />

                  {/* Features */}
                  <ul className="flex flex-col gap-3 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${plan.featured ? "bg-[#E5231B]" : "bg-white/10"}`}>
                          <Check size={8} className={plan.featured ? "text-white" : "text-white/60"} strokeWidth={3} />
                        </div>
                        <span className={`text-sm ${plan.featured ? "text-[#0a0a0a]/70" : "text-white/50"}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={`w-full rounded-xl py-3.5 text-center text-sm font-bold transition-all duration-300 ${
                      plan.featured
                        ? "bg-[#0a0a0a] text-white hover:bg-[#E5231B]"
                        : "border border-white/20 text-white hover:border-white/40 hover:bg-white/8"
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Payment & Tax info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${country.name}-meta`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2">Payment Methods</p>
              <p className="text-sm font-semibold text-white/70">{country.payment.join(" · ")}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2">Tax Information</p>
              <p className="text-sm font-semibold text-white/70">{country.tax}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2">Support Hours</p>
              <p className="text-sm font-semibold text-white/70">{country.support} · Global coverage</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 text-center text-xs text-white/20">
          All prices are estimates based on standard project scope. Contact us for a precise quote tailored to your requirements.
        </p>
      </div>
    </section>
  );
}
