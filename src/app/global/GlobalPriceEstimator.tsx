"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useChat } from "@/app/context/ChatContext";

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

interface DetailedService {
  name: string;
  tagline: string;
  inrBase?: number;
  features: string[];
}

const SERVICES: DetailedService[] = [
  {
    name: "Website Development",
    tagline: "Custom web platforms built for speed.",
    inrBase: 100000,
    features: ["Next.js & React", "Headless CMS", "SEO Optimized", "Core Web Vitals"],
  },
  {
    name: "Mobile Applications",
    tagline: "Native and cross-platform experiences.",
    inrBase: 150000,
    features: ["React Native / Expo", "iOS & Android", "App Store deployment", "Offline support"],
  },
  {
    name: "AI & Chatbots",
    tagline: "Intelligent systems built for scale.",
    inrBase: 200000,
    features: ["LLM Integration", "RAG Pipelines", "AI Agents", "FastAPI backend"],
  },
  {
    name: "Digital Marketing",
    tagline: "Data-driven SEO & performance marketing.",
    inrBase: 100000,
    features: ["SEO Strategy", "Paid Media", "Content Creation", "Growth Analytics"],
  },
  {
    name: "UI/UX Design",
    tagline: "Human-centered design systems.",
    features: ["Figma Prototypes", "User Research", "Wireframing", "Design Systems"],
  },
  {
    name: "Cloud & DevOps",
    tagline: "Scalable cloud infrastructure.",
    features: ["AWS / Azure", "CI/CD Pipelines", "Docker & Kubernetes", "Reliability engineering"],
  },
  {
    name: "Brand Identity",
    tagline: "Modern, distinctive brand systems.",
    features: ["Logo & Typography", "Color Systems", "Brand Strategy", "Guidelines"],
  },
  {
    name: "Enterprise Software",
    tagline: "Custom internal systems & ERPs.",
    features: ["SaaS Architecture", "Multi-tenant", "Role-based access", "Automated workflows"],
  },
];

function formatPrice(inr: number | undefined, country: Country): string {
  if (!inr) return "Custom Quote";

  if (country.currency === "INR") {
    const lakhs = inr / 100000;
    return `₹${lakhs} Lakh${lakhs > 1 ? "s" : ""}`;
  }

  // Convert INR to USD based on the 83.5 exchange rate, then to target currency
  const usd = inr / 83.5;
  const targetVal = usd * country.rate;

  // Round to nearest 100 for clean numbers
  const rounded = Math.round(targetVal / 100) * 100;
  
  return `${country.symbol}${rounded.toLocaleString()}`;
}

export default function GlobalPricing() {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const { openChat } = useChat();

  return (
    <section id="pricing" className="bg-[#0a0a0a] py-24 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        
        {/* Header & Country Selector */}
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

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex-shrink-0 lg:max-w-md"
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

        {/* Pricing Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={country.currency}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10"
          >
            {SERVICES.map((plan, i) => (
              <div
                key={plan.name}
                className="relative rounded-3xl flex flex-col border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/20 transition-colors duration-300"
              >
                <div className="p-6 sm:p-7 flex flex-col flex-1 gap-6">
                  {/* Plan header */}
                  <div>
                    <h3 className="text-xl font-black tracking-tight mb-1 text-white">
                      {plan.name}
                    </h3>
                    <p className="text-[13px] text-white/40 leading-relaxed min-h-[40px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-1">
                      {plan.inrBase && <span className="text-lg text-white/30 mr-1 tracking-wider font-semibold uppercase text-[10px]">Base</span>}
                      <span
                        className={`font-black leading-none tracking-tighter ${!plan.inrBase ? "text-[#E5231B]" : "text-white"}`}
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                      >
                        {formatPrice(plan.inrBase, country)}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/10" />

                  {/* Features */}
                  <ul className="flex flex-col gap-3 flex-1 mb-2">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10">
                          <Check size={8} className="text-white/80" strokeWidth={3} />
                        </div>
                        <span className="text-xs text-white/60">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={openChat}
                    className="w-full rounded-xl py-3.5 text-center text-[13px] tracking-wide font-bold transition-all duration-300 border border-white/10 text-white hover:border-[#E5231B] hover:bg-[#E5231B]"
                  >
                    Start Project
                  </button>
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
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2">Payment Methods</p>
              <p className="text-sm font-semibold text-white/70">{country.payment.join(" · ")}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2">Tax Information</p>
              <p className="text-sm font-semibold text-white/70">{country.tax}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2">Support Hours</p>
              <p className="text-sm font-semibold text-white/70">{country.support} · Global coverage</p>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
