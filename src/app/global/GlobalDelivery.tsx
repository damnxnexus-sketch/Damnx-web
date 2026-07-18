"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface CountryData {
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  rate: number;
  timezone: string;
  overlap: string;
  delivery: string;
  support: string;
  payment: string[];
  startingPrice: number; // USD
  tax: string;
}

const COUNTRIES: CountryData[] = [
  {
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    symbol: "$",
    rate: 1,
    timezone: "EST / PST (UTC−5 to UTC−8)",
    overlap: "9–12.5 hr overlap with India",
    delivery: "4–12 weeks",
    support: "6 PM – 3 AM IST",
    payment: ["Visa / Mastercard", "ACH Transfer", "Wire Transfer", "PayPal"],
    startingPrice: 3000,
    tax: "No VAT on offshore services",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    symbol: "CA$",
    rate: 1.36,
    timezone: "EST / PST (UTC−5 to UTC−8)",
    overlap: "9–12.5 hr overlap with India",
    delivery: "4–12 weeks",
    support: "6 PM – 3 AM IST",
    payment: ["Visa / Mastercard", "EFT Transfer", "Wire Transfer"],
    startingPrice: 3000,
    tax: "GST/HST varies by province (B2B export exempt)",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    symbol: "£",
    rate: 0.79,
    timezone: "GMT / BST (UTC±0 to +1)",
    overlap: "4.5–5.5 hr overlap with India",
    delivery: "4–10 weeks",
    support: "3:30 PM – 12:30 AM IST",
    payment: ["Visa / Mastercard", "BACS Transfer", "Direct Debit", "SWIFT"],
    startingPrice: 3000,
    tax: "20% VAT (not applicable for B2B exports)",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    symbol: "A$",
    rate: 1.53,
    timezone: "AEST (UTC+10 to +11)",
    overlap: "4–5 hr overlap with India",
    delivery: "4–12 weeks",
    support: "4 AM – 1 PM IST",
    payment: ["Visa / Mastercard", "Bank Transfer", "BPAY", "PayPal"],
    startingPrice: 3000,
    tax: "GST not applicable for offshore B2B services",
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    currency: "EUR",
    symbol: "€",
    rate: 0.92,
    timezone: "CET / CEST (UTC+1 to +2)",
    overlap: "3.5–4.5 hr overlap with India",
    delivery: "4–10 weeks",
    support: "12:30 PM – 9:30 PM IST",
    payment: ["Visa / Mastercard", "SEPA Transfer", "SWIFT", "Invoice"],
    startingPrice: 3000,
    tax: "VAT 0% on B2B services from outside EU",
  },
  {
    name: "France",
    flag: "🇫🇷",
    currency: "EUR",
    symbol: "€",
    rate: 0.92,
    timezone: "CET / CEST (UTC+1 to +2)",
    overlap: "3.5–4.5 hr overlap with India",
    delivery: "4–10 weeks",
    support: "12:30 PM – 9:30 PM IST",
    payment: ["Visa / Mastercard", "SEPA Transfer", "SWIFT"],
    startingPrice: 3000,
    tax: "VAT 0% on B2B services from outside EU",
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    currency: "SGD",
    symbol: "S$",
    rate: 1.34,
    timezone: "SGT (UTC+8)",
    overlap: "2.5 hr behind India",
    delivery: "3–10 weeks",
    support: "6 AM – 3 PM IST",
    payment: ["Visa / Mastercard", "PayNow", "Bank Transfer", "SWIFT"],
    startingPrice: 3000,
    tax: "GST 9% (may apply for local services)",
  },
  {
    name: "UAE",
    flag: "🇦🇪",
    currency: "AED",
    symbol: "AED",
    rate: 3.67,
    timezone: "GST (UTC+4)",
    overlap: "1.5 hr behind India",
    delivery: "3–8 weeks",
    support: "7:30 AM – 4:30 PM IST",
    payment: ["Visa / Mastercard", "Wire Transfer", "Cheque", "PayPal"],
    startingPrice: 3000,
    tax: "VAT 5% (B2B offshore may be exempt)",
  },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    currency: "SAR",
    symbol: "SAR",
    rate: 3.75,
    timezone: "AST (UTC+3)",
    overlap: "2.5 hr behind India",
    delivery: "4–10 weeks",
    support: "8 AM – 5 PM IST",
    payment: ["Visa / Mastercard", "SADAD", "Wire Transfer"],
    startingPrice: 3000,
    tax: "VAT 15% (B2B offshore may be exempt)",
  },
  {
    name: "India",
    flag: "🇮🇳",
    currency: "INR",
    symbol: "₹",
    rate: 83.5,
    timezone: "IST (UTC+5:30)",
    overlap: "Same timezone",
    delivery: "2–8 weeks",
    support: "9 AM – 8 PM IST",
    payment: ["UPI", "NEFT / RTGS", "Credit Card", "Razorpay"],
    startingPrice: 3000,
    tax: "GST 18% applicable",
  },
];

function formatLocalPrice(usd: number, country: CountryData): string {
  const local = Math.round((usd * country.rate) / 100) * 100;
  if (local >= 1_000_000) return `${country.symbol}${(local / 1_000_000).toFixed(1)}M`;
  if (local >= 1_000) return `${country.symbol}${(local / 1_000).toFixed(0)}K`;
  return `${country.symbol}${local.toLocaleString()}`;
}

export default function GlobalDelivery() {
  const [selected, setSelected] = useState<CountryData>(COUNTRIES[0]);
  const [search, setSearch] = useState("");

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-white py-24 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Section header */}
        <div className="mb-16 sm:mb-24">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5 text-[11px] font-bold tracking-[0.3em] uppercase text-[#0a0a0a]/40"
          >
            <span className="w-6 h-px bg-[#E5231B]" />
            Global Reach
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-black text-[#0a0a0a] leading-[0.93] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
          >
            Global delivery.
            <br />
            <span className="text-[#0a0a0a]/30">Local understanding.</span>
          </motion.h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Country selector */}
          <div className="lg:col-span-4">
            {/* Search */}
            <div className="relative mb-5">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="w-full rounded-xl border border-[#e8e8e8] bg-[#f9f8f6] pl-10 pr-4 py-3 text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/30 outline-none focus:border-[#0a0a0a]/40 transition-colors"
              />
            </div>

            {/* Country list */}
            <div className="flex flex-col gap-1 max-h-[480px] overflow-y-auto pr-1">
              {filtered.map((country) => {
                const isActive = selected.name === country.name;
                return (
                  <button
                    key={country.name}
                    onClick={() => setSelected(country)}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#0a0a0a] text-white"
                        : "hover:bg-[#f0f0ee] text-[#0a0a0a]"
                    }`}
                  >
                    <span className="text-xl leading-none shrink-0">{country.flag}</span>
                    <span className={`text-sm font-semibold flex-1 ${isActive ? "text-white" : "text-[#0a0a0a]"}`}>
                      {country.name}
                    </span>
                    <span className={`text-[11px] font-mono ${isActive ? "text-white/50" : "text-[#0a0a0a]/30"}`}>
                      {country.currency}
                    </span>
                    <ChevronRight size={13} className={`shrink-0 transition-transform ${isActive ? "text-white/60 translate-x-0.5" : "text-[#0a0a0a]/20 group-hover:translate-x-0.5"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Country detail */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="h-full rounded-3xl border border-[#e8e8e8] bg-[#f9f8f6] p-8 sm:p-10"
              >
                {/* Country header */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#e8e8e8]">
                  <span className="text-5xl leading-none">{selected.flag}</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#0a0a0a]">
                      {selected.name}
                    </h3>
                    <p className="text-sm text-[#0a0a0a]/45 mt-0.5">{selected.timezone}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[11px] font-bold tracking-widest uppercase text-[#0a0a0a]/30 mb-1">
                      Starting from
                    </p>
                    <p className="text-3xl font-black text-[#E5231B]">
                      {formatLocalPrice(selected.startingPrice, selected)}
                    </p>
                    <p className="text-xs text-[#0a0a0a]/30">{selected.currency} · web project</p>
                  </div>
                </div>

                {/* Detail grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Timezone overlap */}
                  <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#0a0a0a]/30 mb-2">
                      Timezone Overlap
                    </p>
                    <p className="text-base font-bold text-[#0a0a0a]">{selected.overlap}</p>
                    <p className="text-xs text-[#0a0a0a]/40 mt-1">
                      Daily sync window available
                    </p>
                  </div>

                  {/* Delivery estimate */}
                  <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#0a0a0a]/30 mb-2">
                      Delivery Estimate
                    </p>
                    <p className="text-base font-bold text-[#0a0a0a]">{selected.delivery}</p>
                    <p className="text-xs text-[#0a0a0a]/40 mt-1">Depending on project scope</p>
                  </div>

                  {/* Support hours */}
                  <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#0a0a0a]/30 mb-2">
                      Support Hours (IST)
                    </p>
                    <p className="text-base font-bold text-[#0a0a0a]">{selected.support}</p>
                    <p className="text-xs text-[#0a0a0a]/40 mt-1">+ 24/7 async communication</p>
                  </div>

                  {/* Tax info */}
                  <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#0a0a0a]/30 mb-2">
                      Tax
                    </p>
                    <p className="text-sm font-bold text-[#0a0a0a] leading-snug">{selected.tax}</p>
                  </div>

                  {/* Payment methods */}
                  <div className="sm:col-span-2 rounded-2xl border border-[#e8e8e8] bg-white p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#0a0a0a]/30 mb-3">
                      Payment Methods
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.payment.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-[#e8e8e8] bg-[#f9f8f6] px-3.5 py-1.5 text-xs font-semibold text-[#0a0a0a]/65"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
