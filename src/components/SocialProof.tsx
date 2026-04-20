"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/* ─── Counter hook ─────────────────────────────────── */
function useCounter(target: number, duration = 1800, active = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(ease * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

/* ─── Stats ────────────────────────────────────────── */
type Stat = { value: number; suffix: string; label: string };

const STATS: Stat[] = [
  { value: 500, suffix: "+", label: "clients treated" },
  { value: 94, suffix: "%", label: "saw regrowth within 90 days" },
  { value: 49, suffix: "", label: "average client rating" },
];

function StatCounter({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCounter(stat.value, 1800, active);
  const isRating = stat.value === 49;

  return (
    <div className="flex flex-col items-center text-center">
      <span
        className="text-teal"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          fontSize: 56,
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {isRating ? `${(count / 10).toFixed(1)}★` : `${count}${stat.suffix}`}
      </span>
      <span className="mt-3 text-[14px] font-medium text-ink">
        {stat.label}
      </span>
    </div>
  );
}

/* ─── Stars ────────────────────────────────────────── */
function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#D85A30" aria-hidden>
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.51.91-5.33L2.27 6.68l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Testimonials ─────────────────────────────────── */
type Testimonial = { quote: string; name: string; location: string };

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I'd tried everything for two years. After 3 months with Rooted I have real regrowth I can see and feel.",
    name: "Sarah M.",
    location: "London",
  },
  {
    quote:
      "The mobile service is a game changer. A specialist comes to my home and the results speak for themselves.",
    name: "James T.",
    location: "Manchester",
  },
  {
    quote:
      "Professional, knowledgeable and genuinely effective. My confidence is back.",
    name: "Priya K.",
    location: "Birmingham",
  },
];

/* ─── Section ──────────────────────────────────────── */
export default function SocialProof() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      aria-label="Results and testimonials"
      className="w-full bg-mist py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Stats row */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {STATS.map((s) => (
            <StatCounter key={s.label} stat={s} active={inView} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col rounded-xl border border-hairline bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
            >
              <Stars />
              <p className="mt-4 text-[15px] italic leading-relaxed text-ink/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-5 flex items-center gap-2 text-[14px]">
                <span className="font-semibold text-ink">{t.name}</span>
                <span className="text-ink/40">·</span>
                <span className="text-ink/55">{t.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
