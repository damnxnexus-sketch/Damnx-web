"use client";

/**
 * ============================================================================
 * src/app/Haldwani/_components/DamnxHaldwaniPage.tsx  —  CLIENT COMPONENT
 * Full UI: Hero, Marquee, Services, Why Us, Contact, Footer
 * Tech: Framer Motion · Tailwind CSS · lucide-react · Strict TypeScript
 * ============================================================================
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  cubicBezier,
} from "framer-motion";
import {
  Code2,
  Smartphone,
  BarChart3,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// ============================================================================
// INTERFACES
// ============================================================================

interface ServiceCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
}

interface DifferentiatorItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TechItem {
  name: string;
  icon: string;
}

interface NavLink {
  label: string;
  href: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface ContactField {
  name: "name" | "email";
  label: string;
  type: string;
  placeholder: string;
}

interface FormState {
  name: string;
  email: string;
  project: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const NAP = {
  name: "Damnx Solutions",
  address: "Haldwani, Uttarakhand 263139, India",
  phone: "+91-98765-43210",
  email: "hello@damnxsolutions.com",
  website: "https://www.damnxsolutions.com",
} as const;

const TECH_STACK: TechItem[] = [
  { name: "Next.js", icon: "⬡" },
  { name: "React", icon: "⚛" },
  { name: "FastAPI", icon: "⚡" },
  { name: "TypeScript", icon: "TS" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Framer Motion", icon: "◈" },
  { name: "Node.js", icon: "⬡" },
  { name: "Docker", icon: "🐳" },
  { name: "Vercel", icon: "▲" },
  { name: "Figma", icon: "✦" },
  { name: "GraphQL", icon: "◈" },
];

const SERVICES: ServiceCard[] = [
  {
    id: 1,
    icon: <Code2 size={32} />,
    title: "Premium Web Development",
    description:
      "We architect blazing-fast, SEO-optimized websites using Next.js 14 and the App Router — giving Haldwani businesses a digital presence that outranks and outperforms every competitor in Uttarakhand. From landing pages to full-stack SaaS platforms, we ship pixel-perfect.",
    tags: ["Next.js", "TypeScript", "CMS", "SEO-First"],
    gradient: "from-red-900/40 to-transparent",
  },
  {
    id: 2,
    icon: <Smartphone size={32} />,
    title: "Scalable App Development",
    description:
      "Cross-platform mobile apps engineered for performance and scale. Whether you're a local Haldwani startup or an established enterprise in Kumaon, we deliver React Native and Flutter apps that your customers actually want to use — intuitive, fast, and revenue-generating.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    gradient: "from-slate-800/60 to-transparent",
  },
  {
    id: 3,
    icon: <BarChart3 size={32} />,
    title: "Data-Driven Digital Marketing",
    description:
      "Dominate Haldwani's local search results with our technical SEO, Google Ads, and social media strategies. We don't guess — we analyze, execute, and optimize until your CAC drops and your ROI compounds. The best digital marketing agency Haldwani has seen, period.",
    tags: ["SEO", "Google Ads", "Analytics", "Social"],
    gradient: "from-red-950/50 to-transparent",
  },
];

const DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    id: 1,
    icon: <Zap size={24} />,
    title: "Zero Bloat Engineering",
    description:
      "Every line of code is intentional. We obsess over Lighthouse scores, Core Web Vitals, and runtime performance — because slow sites lose customers.",
  },
  {
    id: 2,
    icon: <Shield size={24} />,
    title: "Technical Partnership",
    description:
      "We're not a vendor — we're your CTO on demand. Direct access, transparent roadmaps, and zero account-manager layers. Real builders, real accountability.",
  },
  {
    id: 3,
    icon: <Users size={24} />,
    title: "Gen-Z UI/UX Aesthetic",
    description:
      "Interfaces designed for the scroll era. We know what makes Haldwani's next generation of consumers stop, engage, and convert. Your brand deserves to look the part.",
  },
  {
    id: 4,
    icon: <Globe size={24} />,
    title: "Local-First, Global-Ready",
    description:
      "Deep understanding of the Haldwani and Kumaon market embedded in every strategy — with the technical architecture to scale nationally and internationally.",
  },
];

const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const HERO_STATS: StatItem[] = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Retention" },
  { value: "3x", label: "Avg. ROI Increase" },
];

const CONTACT_FIELDS: ContactField[] = [
  {
    name: "name",
    label: "Your Name",
    type: "text",
    placeholder: "Rahul Sharma",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "rahul@company.com",
  },
];

// ============================================================================
// STRUCTURED DATA — LocalBusiness JSON-LD
// (injected client-side so the server page.tsx stays clean)
// ============================================================================
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.damnxsolutions.com/#organization",
  name: "Damnx Solutions",
  description:
    "Haldwani's premier web development, app development, and digital marketing agency delivering cutting-edge tech solutions for businesses in Uttarakhand.",
  url: "https://www.damnxsolutions.com",
  telephone: "+91-98765-43210",
  email: "hello@damnxsolutions.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Haldwani",
    addressLocality: "Haldwani",
    addressRegion: "Uttarakhand",
    postalCode: "263139",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.2183,
    longitude: 79.5117,
  },
  areaServed: [
    { "@type": "City", name: "Haldwani" },
    { "@type": "City", name: "Nainital" },
    { "@type": "State", name: "Uttarakhand" },
  ],
  serviceType: [
    "Web Development",
    "App Development",
    "Digital Marketing",
    "SEO",
    "UI/UX Design",
  ],
  priceRange: "₹₹",
  openingHours: "Mo-Sa 09:00-19:00",
  sameAs: [
    "https://www.linkedin.com/company/damnxsolutions",
    "https://www.instagram.com/damnxsolutions",
  ],
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

// ============================================================================
// SUB-COMPONENT: TechMarquee
// ============================================================================
function TechMarquee(): React.ReactElement {
  const doubled: TechItem[] = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="relative overflow-hidden py-6 border-y border-white/5 bg-black/40">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-linear-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-linear-to-l from-black to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/4 border border-white/7 whitespace-nowrap"
          >
            <span className="text-sm font-mono text-[#E50914]">{tech.icon}</span>
            <span className="text-sm font-medium text-white/60 tracking-wide">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENT: GlassmorphicServiceCard
// ============================================================================
interface ServiceCardProps {
  card: ServiceCard;
  index: number;
}

function GlassmorphicServiceCard({
  card,
  index,
}: ServiceCardProps): React.ReactElement {
  const [hovered, setHovered] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl overflow-hidden cursor-default"
    >
      {/* Red glow on hover */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-[#E50914]/10 to-transparent"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Corner accent */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-bl ${card.gradient} rounded-bl-full`}
      />

      <div className="relative z-10 p-8">
        {/* Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#E50914]/10 text-[#E50914] mb-6 border border-[#E50914]/20"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {card.icon}
        </motion.div>

        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
          {card.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {card.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          className="flex items-center gap-1.5 mt-6 text-[#E50914] text-sm font-medium"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Learn more <ChevronRight size={14} />
        </motion.div>
      </div>
    </motion.article>
  );
}

// ============================================================================
// SUB-COMPONENT: ContactForm
// ============================================================================
function ContactForm(): React.ReactElement {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    project: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <CheckCircle2 size={48} className="text-[#E50914] mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Message Received
        </h3>
        <p className="text-white/50">
          We&apos;ll be in touch within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {CONTACT_FIELDS.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-2"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type}
            name={field.name}
            value={formState[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required
            className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/20 transition-all duration-200"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="project"
          className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-2"
        >
          Project Details
        </label>
        <textarea
          id="project"
          name="project"
          value={formState.project}
          onChange={handleChange}
          placeholder="Tell us about your project — what you're building, your timeline, and budget range..."
          required
          rows={5}
          className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/20 transition-all duration-200 resize-none"
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-[#E50914] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-sm tracking-wide hover:bg-[#ff1a24] transition-colors duration-200"
      >
        Send Message <ArrowRight size={16} />
      </motion.button>
    </form>
  );
}

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================
export default function DamnxHaldwaniPage(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Section refs
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const whyUsInView = useInView(whyUsRef, { once: true, margin: "-100px" });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ================================================================
          LocalBusiness JSON-LD — injected via dangerouslySetInnerHTML
          ================================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
        }}
      />

      <div className="min-h-screen bg-[#000000] text-white selection:bg-[#E50914]/30">
        {/* Noise texture overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* ==============================================================
            HEADER / NAV
            ============================================================== */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/4 backdrop-blur-xl">
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: navBg }}
          />
          <nav
            className="relative max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center font-black text-sm text-white"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                D
              </motion.div>
              <span className="font-bold text-white tracking-tight text-lg">
                Damnx<span className="text-[#E50914]">.</span>
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#E50914] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#ff1a24] transition-colors"
              >
                Get Started
              </motion.a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-white/70 hover:text-white"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>

          {/* Mobile drawer */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-5 py-6 flex flex-col gap-4"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/70 text-base font-medium hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 bg-[#E50914] text-white text-sm font-bold px-5 py-3 rounded-full text-center hover:bg-[#ff1a24] transition-colors"
                >
                  Get Started
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ==============================================================
            MAIN
            ============================================================== */}
        <main id="main-content">
          {/* ============================================================
              SECTION 1 — HERO
              ============================================================ */}
          <section
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
            aria-labelledby="hero-heading"
          >
            {/* Grid background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
            {/* Glows */}
            <div
              aria-hidden="true"
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#E50914]/10 rounded-full blur-[120px] pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute top-1/3 left-1/4 w-75 h-75 bg-[#E50914]/5 rounded-full blur-[80px] pointer-events-none"
            />

            <div
              ref={heroRef}
              className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-20"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E50914]/30 bg-[#E50914]/5 text-[#E50914] text-xs font-semibold tracking-widest uppercase mb-8"
              >
                <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full animate-pulse" />
                Haldwani&apos;s #1 Tech Agency
              </motion.div>

              {/* H1 — staggered line reveal */}
              <motion.h1
                id="hero-heading"
                variants={staggerContainer}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[1.05] tracking-tighter text-white max-w-5xl mb-8"
              >
                {[
                  { text: "Damnx Solutions:", red: false },
                  { text: "Haldwani's Premier", red: false },
                  { text: "Tech & Marketing", red: false },
                  { text: "Architect.", red: true },
                ].map((line, i) => (
                  <motion.span
                    key={i}
                    variants={fadeInUp}
                    className={`block ${line.red ? "text-[#E50914]" : ""}`}
                  >
                    {line.text}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
              >
                Full-stack Next.js websites. Scalable cross-platform apps.
                ROI-compounding digital marketing. Built for Haldwani
                businesses that refuse to be invisible.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#contact"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 40px rgba(229,9,20,0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 bg-[#E50914] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-300"
                >
                  Scale Your Brand <ArrowRight size={18} />
                </motion.a>

                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 bg-white/5 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full text-base border border-white/10 hover:border-white/25 transition-all duration-300"
                >
                  Our Services
                </motion.a>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.0, duration: 0.7 }}
                className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-white/5"
              >
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">
                      {stat.value}
                    </span>
                    <span className="text-sm text-white/30">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-px h-12 bg-linear-to-b from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </section>

          {/* ============================================================
              TECH MARQUEE — Trust Bar
              ============================================================ */}
          <TechMarquee />

          {/* ============================================================
              SECTION 2 — SERVICES
              ============================================================ */}
          <section
            id="services"
            ref={servicesRef}
            aria-labelledby="services-heading"
            className="relative py-24 md:py-36"
          >
            <div className="max-w-7xl mx-auto px-5 md:px-8">
              {/* Header */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={servicesInView ? "visible" : "hidden"}
                className="mb-16"
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-[#E50914] text-xs font-bold tracking-[0.25em] uppercase mb-4"
                >
                  What We Build
                </motion.p>
                <motion.h2
                  id="services-heading"
                  variants={fadeInUp}
                  className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white tracking-tight leading-tight max-w-3xl"
                >
                  Engineered for dominance.{" "}
                  <span className="text-white/30">Designed to convert.</span>
                </motion.h2>
              </motion.div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {SERVICES.map((card, index) => (
                  <GlassmorphicServiceCard
                    key={card.id}
                    card={card}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================
              SECTION 3 — WHY CHOOSE US
              ============================================================ */}
          <section
            id="why-us"
            ref={whyUsRef}
            aria-labelledby="why-us-heading"
            className="relative py-24 md:py-36 bg-white/1"
          >
            {/* Bg glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden pointer-events-none"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-125 h-125 bg-[#E50914]/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-5 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate={whyUsInView ? "visible" : "hidden"}
                >
                  <motion.p
                    variants={fadeInUp}
                    className="text-[#E50914] text-xs font-bold tracking-[0.25em] uppercase mb-4"
                  >
                    Why Damnx
                  </motion.p>
                  <motion.h2
                    id="why-us-heading"
                    variants={fadeInUp}
                    className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white tracking-tight leading-tight mb-6"
                  >
                    We build like engineers.{" "}
                    <span className="text-[#E50914]">
                      We think like founders.
                    </span>
                  </motion.h2>
                  <motion.p
                    variants={fadeInUp}
                    className="text-white/40 text-lg leading-relaxed"
                  >
                    Traditional agencies in Haldwani sell templates and run
                    ads. We architect systems — measurable, scalable, and
                    obsessively crafted to compound your growth over time.
                  </motion.p>

                  <motion.a
                    href="#contact"
                    variants={fadeInUp}
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 mt-8 text-white font-bold border-b border-white/20 pb-1 hover:border-[#E50914] hover:text-[#E50914] transition-colors duration-200"
                  >
                    Start a project <ArrowRight size={16} />
                  </motion.a>
                </motion.div>

                {/* Right: differentiator cards */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate={whyUsInView ? "visible" : "hidden"}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {DIFFERENTIATORS.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      whileHover={{ y: -4 }}
                      className="p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-[#E50914]/30 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#E50914]/10 border border-[#E50914]/20 flex items-center justify-center text-[#E50914] mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-white font-bold text-base mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ============================================================
              SECTION 4 — CONTACT
              ============================================================ */}
          <section
            id="contact"
            aria-labelledby="contact-heading"
            className="relative py-24 md:py-36"
          >
            {/* Top accent */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-[#E50914]/50 to-transparent"
            />

            <div className="max-w-7xl mx-auto px-5 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Info column */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="text-[#E50914] text-xs font-bold tracking-[0.25em] uppercase mb-4">
                    Let&apos;s Build
                  </p>
                  <h2
                    id="contact-heading"
                    className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white tracking-tight leading-tight mb-6"
                  >
                    Ready to dominate{" "}
                    <span className="text-[#E50914]">Haldwani&apos;s</span>{" "}
                    digital space?
                  </h2>
                  <p className="text-white/40 text-base leading-relaxed mb-10">
                    Drop us your project details. We typically respond within
                    24 hours with a no-obligation technical brief and estimated
                    scope.
                  </p>

                  {/* NAP — Critical for Local SEO */}
                  <address
                    className="not-italic space-y-4"
                    aria-label="Damnx Solutions contact information"
                  >
                    {[
                      {
                        icon: <MapPin size={16} />,
                        label: NAP.address,
                        href: undefined,
                      },
                      {
                        icon: <Phone size={16} />,
                        label: NAP.phone,
                        href: `tel:${NAP.phone}`,
                      },
                      {
                        icon: <Mail size={16} />,
                        label: NAP.email,
                        href: `mailto:${NAP.email}`,
                      },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#E50914]/10 flex items-center justify-center text-[#E50914] shrink-0">
                          {item.icon}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-white/50 text-sm hover:text-white transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <span className="text-white/50 text-sm">
                            {item.label}
                          </span>
                        )}
                      </div>
                    ))}
                  </address>
                </motion.div>

                {/* Form column */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="bg-white/3 border border-white/8 rounded-3xl p-8 backdrop-blur-xl"
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        {/* ==============================================================
            FOOTER
            ============================================================== */}
        <footer
          className="border-t border-white/5 bg-black/60 backdrop-blur-xl"
          aria-label="Site footer"
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
            {/* Footer grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              {/* Brand column */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center font-black text-sm text-white">
                    D
                  </div>
                  <span className="font-bold text-white tracking-tight text-lg">
                    Damnx<span className="text-[#E50914]">.</span>
                  </span>
                </div>
                <p className="text-white/30 text-sm leading-relaxed max-w-xs">
                  Haldwani&apos;s premier digital engineering studio. We turn
                  ambitious ideas into market-dominant digital products.
                </p>
              </div>

              {/* Services */}
              <nav aria-label="Services footer links">
                <h3 className="text-white text-sm font-bold mb-4 tracking-wide">
                  Services
                </h3>
                <ul className="space-y-2.5" role="list">
                  {[
                    "Web Development",
                    "App Development",
                    "Digital Marketing",
                    "SEO & Growth",
                    "UI/UX Design",
                  ].map((s) => (
                    <li key={s}>
                      <a
                        href="#services"
                        className="text-white/30 text-sm hover:text-white transition-colors"
                      >
                        {s}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Company */}
              <nav aria-label="Company footer links">
                <h3 className="text-white text-sm font-bold mb-4 tracking-wide">
                  Company
                </h3>
                <ul className="space-y-2.5" role="list">
                  {["About Us", "Case Studies", "Blog", "Careers", "Contact"].map(
                    (c) => (
                      <li key={c}>
                        <a
                          href="#contact"
                          className="text-white/30 text-sm hover:text-white transition-colors"
                        >
                          {c}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </nav>

              {/* Local SEO links */}
              <nav aria-label="Location-specific service links">
                <h3 className="text-white text-sm font-bold mb-4 tracking-wide">
                  Locations
                </h3>
                <ul className="space-y-2.5" role="list">
                  {[
                    "Web Design Haldwani",
                    "SEO Haldwani",
                    "App Dev Nainital",
                    "Marketing Uttarakhand",
                  ].map((l) => (
                    <li key={l}>
                      <a
                        href="#contact"
                        className="text-white/30 text-sm hover:text-white transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
              <p className="text-white/20 text-xs">
                © {new Date().getFullYear()} {NAP.name}. Haldwani,
                Uttarakhand. All rights reserved.
              </p>
              <div className="flex items-center gap-5">
                <a
                  href="#"
                  className="text-white/20 hover:text-white text-xs transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-white/20 hover:text-white text-xs transition-colors"
                >
                  Terms
                </a>
                <a
                  href={NAP.website}
                  rel="noopener noreferrer"
                  className="text-white/20 hover:text-[#E50914] text-xs transition-colors flex items-center gap-1"
                >
                  <Globe size={12} /> damnxsolutions.com
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}