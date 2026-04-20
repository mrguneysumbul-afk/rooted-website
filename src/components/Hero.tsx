"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden -mt-[72px]"
      aria-label="Rooted hero"
    >
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        quality={90}
        className="object-cover object-right"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-[#060d18]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060d18] via-[#060d18]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d18]/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
        <div className="max-w-[620px]">

          <motion.div
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/10 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
            <span className="text-[13px] font-medium tracking-wide text-teal">
              UK-wide mobile hair restoration
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-balance text-white"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(46px, 6.5vw, 82px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Growth,{" "}
            <span style={{ color: "#1D9E75" }}>delivered.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 text-balance text-white/70"
            style={{ fontSize: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.7 }}
          >
            Clinically proven hair restoration — at home, on your schedule.
            LLLT, PRP, microneedling and supplements delivered to your door
            by a specialist.
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-coral px-8 py-4 text-[15px] font-semibold text-white shadow-[0_0_24px_rgba(216,90,48,0.35)] transition-all hover:bg-coral/90 hover:shadow-[0_0_32px_rgba(216,90,48,0.5)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Book your free assessment
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-8 py-4 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:border-white/35"
            >
              See how it works
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {[
              "FDA-cleared technology",
              "Trichologist-designed plans",
              "No clinic visits needed",
              "Results in 90 days",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-teal/60" />
                {item}
              </li>
            ))}
          </motion.ul>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-[0.15em] text-white/30">Scroll</span>
          <div className="h-6 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
