"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";
import { useChat } from "@/app/context/ChatContext";

/**
 * DamnX Solutions — "Client Reel" Featured Work Section (v3, true 3D tilt)
 * -------------------------------------------------------------------------
 * Client cards open the DamnX chatbot on click so visitors can enquire.
 */

type Client = {
  name: string;
  category: string;
  avatar: string;
  videoSrc: string;
};

const clients: Client[] = [
  {
    name: "Arahnyam",
    category: "Resort & Hospitality",
    avatar: "/avatar.png",
    videoSrc: "/Arahnyam%20vid-1.mp4",
  },
  {
    name: "Mudhouse",
    category: "Cafe & Dining",
    avatar: "/avatar.png",
    videoSrc: "/Mudhouse%20vid-1.mp4",
  },
  {
    name: "Daal Bhat",
    category: "Restaurant & Eatery",
    avatar: "/avatar.png",
    videoSrc: "/Daal%20bhat%20vid-3.mp4",
  },
  {
    name: "Frontyard Cafe",
    category: "Bespoke Cafe",
    avatar: "/avatar.png",
    videoSrc: "/Frontyard%20cafe%20vid-1.mp4",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function ClientCard({ client, index }: { client: Client; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openChat } = useChat();

  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 24, mass: 0.6 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 24, mass: 0.6 });
  const glareX = useSpring(useMotionValue(50), { stiffness: 200, damping: 26 });
  const glareY = useSpring(useMotionValue(50), { stiffness: 200, damping: 26 });
  const shadowOpacity = useSpring(useMotionValue(0.35), { stiffness: 200, damping: 26 });

  const glareBg = useTransform([glareX, glareY], (v: number[]) => {
    const [gx, gy] = v;
    return `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.28) 0%, transparent 55%)`;
  });

  // Automatically fast forward the video to 2.0x playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 26);
    rotateX.set(-(py - 0.5) * 26);
    glareX.set(px * 100);
    glareY.set(py * 100);
    shadowOpacity.set(0.6);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
    shadowOpacity.set(0.35);
  }

  return (
    <motion.div
      ref={ref}
      onClick={openChat}
      onKeyDown={(e) => e.key === "Enter" && openChat()}
      role="button"
      tabIndex={0}
      aria-label={`View ${client.name} work — opens chat`}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative block aspect-[3/4] cursor-pointer select-none sm:aspect-[4/5]"
      style={{ perspective: 1200 }}
    >
      {/* deepening ambient shadow, grows with tilt */}
      <motion.div
        aria-hidden
        style={{ opacity: shadowOpacity }}
        className="pointer-events-none absolute -inset-3 rounded-[2.2rem] bg-[#E5231B] blur-2xl"
      />

      {/* the tilting 3D plane */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* base video plane */}
        <div
          style={{ transform: "translateZ(0px)" }}
          className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        >
          <video
            ref={videoRef}
            src={client.videoSrc}
            loop
            muted
            playsInline
            autoPlay
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/45" />
          {/* cursor-tracked glare */}
          <motion.div
            aria-hidden
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
          />
        </div>

        {/* top bar — floats above the photo/video plane */}
        <div
          style={{ transform: "translateZ(55px)" }}
          className="absolute inset-x-3 top-3 flex items-center justify-between sm:inset-x-4 sm:top-4"
        >
          <div className="flex items-center gap-2 rounded-full bg-black/55 py-1 pl-1 pr-3 shadow-[0_8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md ring-1 ring-white/10">
            <img
              src={client.avatar}
              alt={client.name}
              className="h-6 w-6 rounded-full object-cover ring-1 ring-white/20 sm:h-7 sm:w-7"
            />
            <span className="text-[11px] font-semibold text-white sm:text-xs">{client.name}</span>
          </div>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/55 text-white shadow-[0_8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md ring-1 ring-white/10">
            <Instagram size={13} />
          </span>
        </div>


        {/* bottom text block */}
        <div
          style={{ transform: "translateZ(48px)" }}
          className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 sm:px-5 sm:pb-5"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff5c4d] [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] sm:text-[11px]">
            {client.category}
          </span>
          <p className="mt-1 text-base font-extrabold leading-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] sm:text-lg">
            {client.name}
          </p>
          <span className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-white/70 [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] sm:text-xs">
            <Instagram size={12} />
            Click to enquire
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ViewAllWorkButton() {
  const { openChat } = useChat();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="relative mt-12 flex justify-center sm:mt-14"
    >
      <motion.button
        onClick={openChat}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 380, damping: 20 }}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#ff3b30] to-[#B3140C] px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_35px_rgba(229,35,27,0.4)] transition-shadow hover:shadow-[0_14px_45px_rgba(229,35,27,0.6)]"
      >
        Discuss Your Project <ArrowRight size={16} />
      </motion.button>
    </motion.div>
  );
}

export default function ClientReel() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-6 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 opacity-50 blur-[130px]"
        style={{ background: "radial-gradient(ellipse, #E5231B 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] translate-x-1/3 translate-y-1/3 opacity-30 blur-[110px]"
        style={{ background: "radial-gradient(circle, #E5231B 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl text-center" style={{ perspective: 1000 }}>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[3.25rem]"
        >
          OUR WORK THAT
          <br />
          DRIVES{" "}
          <span
            className="bg-gradient-to-r from-[#ff5c4d] via-[#E5231B] to-[#ff5c4d] bg-clip-text text-transparent"
            style={{ filter: "drop-shadow(0 0 22px rgba(229,35,27,0.45))" }}
          >
            REAL GROWTH
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-5 max-w-md text-sm text-white/50 sm:text-base"
        >
          We don&apos;t just create content.
          <br />
          We create content that converts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-3 sm:mt-12"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#E5231B]" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E5231B]">
            Featured
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#E5231B]" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-2 text-2xl font-extrabold text-white sm:text-3xl"
        >
          Client Reel
        </motion.h3>
      </div>

      <div
        className="relative mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        style={{ perspective: 1500 }}
      >
        {clients.map((client, i) => (
          <ClientCard key={client.name} client={client} index={i} />
        ))}
      </div>

      <ViewAllWorkButton />
    </section>
  );
}