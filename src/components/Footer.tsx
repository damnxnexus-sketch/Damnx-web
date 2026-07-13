"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone, ArrowUpRight } from "lucide-react";
import Image from "next/image";

/**
 * DamnX Solutions — Footer (Beautified)
 */

const services = [
  { label: "Website Development", href: "#" },
  { label: "App Development", href: "#" },
  { label: "UI / UX & Branding", href: "#" },
  { label: "Custom Software", href: "#" },
  { label: "Digital Marketing", href: "#" },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};


export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050505]">
      {/* Top red glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #E5231B 40%, #E5231B 60%, transparent 100%)",
        }}
      />
      {/* Ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
        style={{
          width: "60%",
          height: "300px",
          background: "radial-gradient(ellipse at center top, rgba(229,35,27,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 sm:px-10 sm:pt-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Brand column */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-1 lg:pr-4"
          >
            <Image
              src="/logo.png"
              alt="DAMNX Solutions"
              width={160}
              height={80}
              className="object-contain"
              priority={false}
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              DAMNX solutions delivers industry-level software, premium design, and scalable
              digital products at a genuine price.
            </p>

            {/* CTA pill */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(229,35,27,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 20 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#E5231B]/60 bg-[#E5231B]/5 px-5 py-2 text-xs font-semibold tracking-wide text-[#E5231B] transition-colors duration-200 hover:bg-[#E5231B]/15"
            >
              let&apos;s build something
              <ArrowUpRight size={12} />
            </motion.a>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/30">Services</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group flex items-center gap-1.5 text-sm text-white/55 transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-px w-3 bg-[#E5231B]/60 transition-all duration-300 group-hover:w-5 group-hover:bg-[#E5231B]" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/30">Contact</h3>
            <ul className="mt-5 flex flex-col gap-4">
              <li>
                <a
                  href="mailto:damnx.nexus@gmail.com"
                  className="group flex items-start gap-3 text-sm text-white/60 transition-colors duration-200 hover:text-white"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#E5231B]/40 bg-[#E5231B]/5 text-[#E5231B] transition-all duration-200 group-hover:border-[#E5231B] group-hover:bg-[#E5231B] group-hover:text-white">
                    <Mail size={13} />
                  </span>
                  <span className="leading-tight">damnx.nexus<br />@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+916388037374"
                  className="group flex items-center gap-3 text-sm text-white/60 transition-colors duration-200 hover:text-white"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#E5231B]/40 bg-[#E5231B]/5 text-[#E5231B] transition-all duration-200 group-hover:border-[#E5231B] group-hover:bg-[#E5231B] group-hover:text-white">
                    <Phone size={13} />
                  </span>
                  +91 6388037374
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Follow us */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/30">Follow Us</h3>
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.14, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 16 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5231B]/50 bg-[#E5231B]/5 text-[#E5231B] transition-all duration-200 hover:border-[#E5231B] hover:bg-[#E5231B] hover:text-white hover:shadow-[0_8px_24px_rgba(229,35,27,0.45)]"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>

            {/* Quick stats */}
            <div className="mt-8 flex flex-col gap-2">
              {[
                { value: "125+", label: "Projects Delivered" },
                { value: "100%", label: "Client Satisfaction" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-lg font-extrabold text-white">{value}</span>
                  <span className="text-xs text-white/35">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Gradient divider */}
        <div className="mt-14 sm:mt-16" style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(229,35,27,0.4) 30%, rgba(255,255,255,0.1) 70%, transparent 100%)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/30 sm:flex-row sm:py-7">
          <p>© 2026 damnx solutions. all rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E5231B]/70" />
            crafted with precision &amp; passion.
          </p>
        </div>
      </div>

      {/* ── Giant logo watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none relative select-none overflow-hidden"
        style={{ marginTop: "-3rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-center"
          style={{ height: "clamp(14rem, 36vw, 26rem)" }}
        >
          <Image
            src="/logobg.png"
            alt="DAMNX Solutions watermark"
            width={2000}
            height={560}
            className="w-full object-contain object-bottom"
            style={{
              opacity: 0.09,
              filter: "brightness(2.5) grayscale(0.2)",
              transform: "translateY(18%)",
              maxWidth: "100vw",
            }}
            priority={false}
          />
        </motion.div>
      </div>
    </footer>
  );
}