"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Instagram } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function GlobalCTAAndFooter() {
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
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
      <section id="contact" className="bg-[#f9f8f6] py-24 sm:py-40 overflow-hidden border-t border-[#0a0a0a]/6">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8 text-[11px] font-bold tracking-[0.3em] uppercase text-[#0a0a0a]/40"
              >
                <span className="w-6 h-px bg-[#E5231B]" />
                Get in Touch
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="font-black text-[#0a0a0a] leading-[0.93] tracking-tight mb-8"
                style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
              >
                Your vision.
                <br />
                Our craft.
                <br />
                <span className="text-[#E5231B]">Let&apos;s build.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-base sm:text-lg text-[#0a0a0a]/50 leading-relaxed font-light max-w-md"
              >
                Whether you&apos;re a startup in Austin or a global enterprise in Singapore — we&apos;re your engineering partner from day one. NDA signed. Proposal within 24 hours.
              </motion.p>

              {/* Contact methods */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-10 flex flex-col gap-4"
              >
                <a
                  href="mailto:damnx.nexus@gmail.com"
                  className="group flex items-center gap-3 text-sm text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0a0a0a]/12 group-hover:border-[#0a0a0a]/30 group-hover:bg-[#0a0a0a] transition-all duration-300">
                    <Mail size={14} className="text-[#0a0a0a]/50 group-hover:text-white transition-colors duration-300" />
                  </span>
                  damnx.nexus@gmail.com
                </a>
                <a
                  href="https://wa.me/916388037374"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0a0a0a]/12 group-hover:border-[#0a0a0a]/30 group-hover:bg-[#0a0a0a] transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#0a0a0a]/50 group-hover:text-white transition-colors duration-300">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </span>
                  WhatsApp +91 6388 037 374
                </a>
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="rounded-3xl border border-[#0a0a0a]/8 bg-white p-8 sm:p-10"
            >
              {sent ? (
                <div className="flex flex-col items-start gap-5 py-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5231B]">
                    <ArrowRight size={22} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0a0a0a]">Message received.</h3>
                  <p className="text-[#0a0a0a]/50 text-sm leading-relaxed">
                    We&apos;ll review your brief and respond within 6 business hours with a tailored proposal.
                  </p>
                  <button
                    onClick={() => { setSent(false); setEmail(""); setIdea(""); }}
                    className="text-xs text-[#0a0a0a]/30 hover:text-[#0a0a0a]/60 transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-black text-[#0a0a0a] mb-1">Start a conversation</h3>
                  <p className="text-sm text-[#0a0a0a]/40 mb-8">
                    No obligation. Proposal delivered in 24 hours.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-[#0a0a0a]/35">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-[#e8e8e8] bg-[#f9f8f6] px-4 py-3.5 text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 outline-none focus:border-[#0a0a0a]/40 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-[#0a0a0a]/35">
                        Project brief (optional)
                      </label>
                      <textarea
                        rows={4}
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="Tell us about your project..."
                        className="w-full resize-none rounded-xl border border-[#e8e8e8] bg-[#f9f8f6] px-4 py-3.5 text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 outline-none focus:border-[#0a0a0a]/40 transition-colors"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 380, damping: 18 }}
                      className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[#0a0a0a] py-4 text-sm font-bold text-white hover:bg-[#E5231B] transition-colors duration-400 cursor-pointer"
                    >
                      Send My Brief
                      <ArrowRight size={14} />
                    </motion.button>
                    <p className="text-center text-[11px] text-[#0a0a0a]/25">
                      🔒 NDA signed on request. Your idea is safe.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] pt-20 sm:pt-28 pb-8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          {/* Top section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/8">
            {/* Brand */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#E5231B] flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-xs tracking-tighter">DX</span>
                </div>
                <span className="font-bold text-sm tracking-wide text-white">DAMNX Solutions</span>
              </div>
              <p className="text-sm text-white/35 leading-relaxed font-light max-w-xs mb-8">
                Designing tomorrow&apos;s digital experiences. Premium engineering for global businesses.
              </p>
              <div className="flex flex-col gap-1 text-xs text-white/25">
                <p className="font-semibold text-white/40 mb-1">Offices</p>
                <p>🇮🇳 India — Haldwani, Uttarakhand</p>
                <p className="text-white/20">Serving clients globally</p>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {footerLinks.map((col) => (
                <div key={col.heading}>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-5">
                    {col.heading}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-white/40 hover:text-white transition-colors duration-200 font-light"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">
              © 2026 DAMNX Solutions. All rights reserved.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 hover:border-white/30 hover:text-white transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-white/20">
              <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/40 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
