"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Instagram } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function GlobalCTA() {
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Check if Calendly is available globally (loaded via Chatbot component)
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/damnx-nexus/30min'
      });
    } else {
      // Fallback if the script isn't loaded yet
      window.open('https://calendly.com/damnx-nexus/30min', '_blank');
    }
    
    setSent(true);
  }

  const footerLinks = [
    { heading: "Services", links: ["Website Development", "Mobile Applications", "AI Development", "UI/UX Design", "Cloud & DevOps", "Digital Marketing"] },
    { heading: "Industries", links: ["Healthcare", "Finance", "Education", "Hospitality", "Retail", "Real Estate"] },
    { heading: "Company", links: ["Global Pricing", "Case Studies", "Insights", "Careers", "About"] },
  ];

  const socials = [
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:damnx.nexus@gmail.com" },
  ];

  return (
    <>
      {/* CTA Section */}
      <section id="contact" className="bg-white py-24 sm:py-32 overflow-hidden border-t border-[#0a0a0a]/6">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Headline & Stats */}
            <div>
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6 text-[12px] font-medium tracking-[0.1em] uppercase text-[#0a0a0a]/60"
              >
                <span className="w-10 h-px bg-[#0a0a0a]" />
                GET IN TOUCH
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="font-black text-[#0a0a0a] leading-[1.05] tracking-tight mb-8"
                style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)" }}
              >
                Your vision.
                <br />
                Our craft.
                <br />
                <span className="text-[#E5231B]">Let&apos;s build </span>
                <span className="font-serif italic font-normal text-black" style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)" }}>together.</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-lg sm:text-xl text-[#0a0a0a]/60 leading-relaxed max-w-md font-medium mb-16"
              >
                Whether you&apos;re a startup, a business, or a global enterprise in Singapore - we turn ideas into digital products that people love.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left"
              >
                <div className="flex flex-col items-center sm:items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-red-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0a0a0a]">24 Hrs</p>
                    <p className="text-xs text-[#0a0a0a]/60">Proposal Promise</p>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-green-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0a0a0a]">200+</p>
                    <p className="text-xs text-[#0a0a0a]/60">Projects Delivered</p>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-cyan-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0a0a0a]">4.9/5</p>
                    <p className="text-xs text-[#0a0a0a]/60">Client Rating</p>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-indigo-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0a0a0a]">15+</p>
                    <p className="text-xs text-[#0a0a0a]/60">Countries Served</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="rounded-2xl border border-gray-100 bg-white p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] max-w-[500px] w-full mx-auto lg:ml-auto"
            >
              {sent ? (
                <div className="flex flex-col items-start gap-5 py-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-red-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#0a0a0a]">Message received.</h3>
                  <p className="text-[#0a0a0a]/60 text-sm leading-relaxed">
                    We&apos;ll review your brief and respond within 24 hours with a tailored proposal.
                  </p>
                  <button
                    onClick={() => { setSent(false); setEmail(""); setIdea(""); }}
                    className="text-xs text-[#0a0a0a]/50 hover:text-[#0a0a0a] transition-colors cursor-pointer mt-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-6">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-red-500 ml-1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0a0a0a] mb-2 tracking-tight">Start a conversation</h3>
                    <p className="text-[13px] text-[#0a0a0a]/60">
                      No obligation. Proposal delivered in <span className="text-red-500 font-semibold">24 hours.</span>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-semibold text-[#0a0a0a]/60 uppercase tracking-wide">
                        WORK EMAIL
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your@Company.com"
                          className="w-full rounded-lg bg-[#f8f9fa] px-4 py-3.5 text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/30 outline-none border border-transparent focus:border-gray-200 focus:bg-white transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-semibold text-[#0a0a0a]/60 uppercase tracking-wide">
                        TELL US ABOUT YOUR PROJECT
                      </label>
                      <div className="relative">
                        <textarea
                          rows={4}
                          required
                          value={idea}
                          onChange={(e) => setIdea(e.target.value)}
                          placeholder="Share Your Idea, Goals And Requirements"
                          className="w-full resize-none rounded-lg bg-[#f8f9fa] px-4 py-3.5 text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/30 outline-none border border-transparent focus:border-gray-200 focus:bg-white transition-all"
                        />
                        <div className="absolute right-4 bottom-4">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="flex flex-col gap-2">
                         <label className="text-[11px] font-semibold text-[#0a0a0a]/60 tracking-wide">
                           Select Your Service
                         </label>
                         <input
                            type="text"
                            placeholder="e.g. Website Development"
                            className="w-full rounded-lg bg-[#f8f9fa] px-4 py-3 text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/30 outline-none border border-transparent focus:border-gray-200 focus:bg-white transition-all"
                          />
                       </div>
                       <div className="flex flex-col gap-2">
                         <label className="text-[11px] font-semibold text-[#0a0a0a]/60 tracking-wide">
                           Select Timeframe
                         </label>
                         <input
                            type="text"
                            placeholder="Select Timeframe"
                            className="w-full rounded-lg bg-[#f8f9fa] px-4 py-3 text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/30 outline-none border border-transparent focus:border-gray-200 focus:bg-white transition-all"
                          />
                       </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-xl bg-[#242124] py-4 text-sm font-bold text-white hover:bg-black transition-colors duration-300 mt-2"
                    >
                      Send My Brief
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}
