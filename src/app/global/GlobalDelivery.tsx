"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Clock, Calendar, Headphones, Coins, Landmark, Globe, CreditCard, Plane } from "lucide-react";
import Image from "next/image";

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
    startingPrice: 100000,
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
    startingPrice: 100000,
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
    startingPrice: 100000,
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
    startingPrice: 100000,
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
    startingPrice: 100000,
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
    startingPrice: 100000,
    tax: "VAT 0% on B2B services from outside EU",
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    currency: "SGD",
    symbol: "$", // Display as $ as requested in design
    rate: 1.34,
    timezone: "SGT (UTC+8)",
    overlap: "2.5 hr behind India",
    delivery: "3–10 weeks",
    support: "6 AM – 3 PM IST",
    payment: ["Visa / Mastercard", "PayNow", "Bank Transfer", "SWIFT"],
    startingPrice: 100000,
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
    startingPrice: 100000,
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
    startingPrice: 100000,
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
    startingPrice: 100000,
    tax: "GST 18% applicable",
  },
];

function formatLocalPrice(inr: number, country: CountryData): string {
  // Base price is in INR. Convert to USD first (rate 83.5) then to local currency.
  const usd = inr / 83.5;
  const local = country.name === "India" ? inr : Math.round((usd * country.rate) / 100) * 100;
  
  if (country.name === "India" && local >= 100_000) {
    return `₹${(local / 100_000).toFixed(0)} Lakh`;
  }
  
  if (local >= 1_000_000) return `${country.symbol}${(local / 1_000_000).toFixed(1)}M`;
  if (local >= 1_000) return `${country.symbol}${(local / 1_000).toFixed(0)}k`;
  return `${country.symbol}${local.toLocaleString()}`;
}

const renderPaymentIcon = (method: string) => {
  const m = method.toLowerCase();
  if (m.includes("visa") || m.includes("mastercard")) {
    return <Image src="/global page assets/visa (1).png" alt="Visa" width={48} height={20} className="h-5 w-auto object-contain" />;
  }
  if (m.includes("paynow")) {
    return <Image src="/global page assets/paynow.png" alt="PayNow" width={48} height={20} className="h-5 w-auto object-contain" />;
  }
  if (m.includes("bank") || m.includes("wire") || m.includes("ach") || m.includes("eft") || m.includes("bacs")) {
    return <Landmark size={24} className="text-[#0a0a0a]" />;
  }
  if (m.includes("swift") || m.includes("global")) {
    return <Globe size={24} className="text-[#0a0a0a]" />;
  }
  if (m.includes("paypal")) {
    return <span className="font-bold text-lg italic text-blue-700">PayPal</span>;
  }
  if (m.includes("upi")) {
    return <span className="font-bold text-lg text-gray-800">UPI</span>;
  }
  
  return <CreditCard size={24} className="text-gray-700" />;
};

export default function GlobalDelivery() {
  const [selected, setSelected] = useState<CountryData>(COUNTRIES.find(c => c.name === "Singapore") || COUNTRIES[0]);
  const [search, setSearch] = useState("");

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-[#FCFCFC] py-16 px-6 lg:px-12 min-h-screen flex items-center justify-center font-sans overflow-hidden">
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* Sidebar */}
        <div className="w-full lg:w-[320px] shrink-0 bg-[#2A2B2A] rounded-[32px] p-5 relative overflow-hidden flex flex-col h-[560px] shadow-2xl">
          
          {/* Search */}
          <div className="relative mb-6 z-10">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search countries"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border border-gray-600 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-2 z-10 custom-scrollbar">
            {filtered.map(country => {
              const isActive = selected.name === country.name;
              return (
                <button
                  key={country.name}
                  onClick={() => setSelected(country)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-[16px] transition-colors ${
                    isActive ? 'bg-[#3A3B3A]' : 'hover:bg-[#3A3B3A]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none">{country.flag}</span>
                    <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                      {country.name}
                    </span>
                  </div>
                  <ArrowRight size={16} className={isActive ? 'text-white' : 'text-gray-400'} />
                </button>
              )
            })}
          </div>

          {/* Airplane graphic */}
          <div className="absolute bottom-4 left-0 w-[90%] h-[100px] pointer-events-none opacity-[0.15] flex items-end ml-4">
             <svg className="absolute w-full h-full top-0 left-0" viewBox="0 0 200 100" preserveAspectRatio="none">
               <path d="M10,80 Q30,60 50,80 T90,60 Q130,40 140,70 T180,20" fill="none" stroke="white" strokeWidth="2.5" strokeDasharray="4 6" />
             </svg>
             <Plane size={48} className="text-white absolute top-[-5px] right-[5px] -rotate-45" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-2 sm:pt-6 relative min-w-0">
           {/* Background Map */}
           <div className="absolute top-[-40px] right-[-40px] w-full max-w-[600px] h-[400px] opacity-[0.06] pointer-events-none z-0">
             <Image src="/global page assets/countries.png" alt="World Map" fill className="object-contain object-right-top" />
           </div>

           <AnimatePresence mode="wait">
             <motion.div
               key={selected.name}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
               className="relative z-10"
             >
               <h2 className="text-lg font-semibold text-gray-900 mb-1">Shipping to</h2>
               
               <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                  <div>
                    <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black text-black leading-[0.9] tracking-tight">
                      {selected.name}
                    </h1>
                    <p className="text-lg font-medium text-gray-800 mt-2">
                      {selected.timezone.split(' (')[0]} {selected.timezone.includes('(') ? `(${selected.timezone.split(' (')[1]}` : ''}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0 text-left sm:text-right">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">Base Price</p>
                    <span className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black text-[#E5231B] leading-none tracking-tight">
                      {formatLocalPrice(selected.startingPrice, selected)}
                    </span>
                  </div>
               </div>

               {/* 4 Col Info Card */}
               <div className="bg-white rounded-[1.5rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100/80 p-5 sm:p-6 flex flex-col md:flex-row gap-6 mt-8 mb-8">
                  {/* Overlap */}
                  <div className="flex-1 flex flex-col items-center text-center px-2 md:border-r border-gray-100 last:border-0">
                     <div className="w-10 h-10 rounded-full bg-[#FFE5EC] text-[#FF4D8D] flex items-center justify-center mb-3">
                       <Clock size={18} strokeWidth={2.5} />
                     </div>
                     <p className="font-bold text-gray-900 mb-1 text-sm">{selected.overlap}</p>
                     <p className="text-xs text-gray-500 font-medium">Timezone overlap</p>
                  </div>
                  {/* Delivery */}
                  <div className="flex-1 flex flex-col items-center text-center px-2 md:border-r border-gray-100 last:border-0">
                     <div className="w-10 h-10 rounded-full bg-[#E5F9F8] text-[#00C4B8] flex items-center justify-center mb-3">
                       <Calendar size={18} strokeWidth={2.5} />
                     </div>
                     <p className="font-bold text-gray-900 mb-1 text-sm">{selected.delivery}</p>
                     <p className="text-xs text-gray-500 font-medium">Timezone overlap</p>
                  </div>
                  {/* Support */}
                  <div className="flex-1 flex flex-col items-center text-center px-2 md:border-r border-gray-100 last:border-0">
                     <div className="w-10 h-10 rounded-full bg-[#FFF5D1] text-[#E6B800] flex items-center justify-center mb-3">
                       <Headphones size={18} strokeWidth={2.5} />
                     </div>
                     <p className="font-bold text-gray-900 mb-1 text-sm">{selected.support.replace(' IST', '')}</p>
                     <p className="text-xs text-gray-500 font-medium">Timezone overlap</p>
                  </div>
                  {/* Tax */}
                  <div className="flex-1 flex flex-col items-center text-center px-2 md:border-r border-gray-100 last:border-0">
                     <div className="w-10 h-10 rounded-full bg-[#EBE5FF] text-[#8C52FF] flex items-center justify-center mb-3">
                       <Coins size={18} strokeWidth={2.5} />
                     </div>
                     <p className="font-bold text-gray-900 mb-1 text-sm uppercase">{selected.tax.split(' (')[0]}</p>
                     <p className="text-xs text-gray-500 font-medium">{selected.tax.includes('(') ? selected.tax.substring(selected.tax.indexOf('(')+1, selected.tax.indexOf(')')) : 'Local services apply'}</p>
                  </div>
               </div>

               {/* Payment Methods */}
               <h3 className="text-lg font-bold text-black mb-4">Payment Method</h3>
               <div className="bg-white rounded-[1.5rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100/80 p-5 sm:p-6 flex flex-row flex-wrap justify-center sm:justify-between items-center gap-y-6">
                  {selected.payment.map((method, i) => (
                    <div key={method} className={`flex-1 flex flex-col items-center justify-center min-w-[90px] ${i !== selected.payment.length - 1 ? 'sm:border-r border-gray-100' : ''}`}>
                       <div className="h-8 flex items-center justify-center mb-3 text-[#0a0a0a]">
                          {renderPaymentIcon(method)}
                       </div>
                       <p className="text-xs font-medium text-gray-600 text-center">{method}</p>
                    </div>
                  ))}
               </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #555;
          border-radius: 10px;
        }
      `}} />
    </section>
  );
}
