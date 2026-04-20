"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const onMouseDown = () => setDragging(true);
  const onMouseUp = () => setDragging(false);
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) updatePosition(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => updatePosition(e.touches[0].clientX);

  useEffect(() => {
    const up = () => setDragging(false);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  return (
    <section
      id="results"
      aria-label="Before and after results"
      className="w-full bg-white py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-teal">
            Real results
          </p>
          <h2
            className="text-ink text-balance"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: "clamp(32px, 4.2vw, 52px)",
            }}
          >
            See the difference
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/65 text-balance">
            Drag the slider to reveal results. Client shown after 90 days of treatment.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-2xl border border-hairline select-none"
            style={{ aspectRatio: "16/9", cursor: dragging ? "grabbing" : "grab" }}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
          >
            <div className="absolute inset-0">
              <Image
                src="/images/before-after.jpg"
                alt="After treatment — healthy dense hair"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <div className="relative w-full h-full" style={{ width: `${10000 / position}%` }}>
                <Image
                  src="/images/before-after.jpg"
                  alt="Before treatment — thinning hair"
                  fill
                  className="object-cover object-left"
                  style={{ filter: "grayscale(60%) brightness(0.7)" }}
                  priority
                />
              </div>
            </div>

            <div
              className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
                onMouseDown={onMouseDown}
                onTouchStart={() => setDragging(true)}
                onTouchEnd={() => setDragging(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M8 4L4 12l4 8M16 4l4 8-4 8" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">
              Before
            </div>
            <div className="absolute bottom-4 right-4 rounded-full bg-teal/90 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">
              After 90 days
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6 text-center">
            {[
              { stat: "90", unit: "days", label: "Average time to visible results" },
              { stat: "94", unit: "%", label: "Of clients saw regrowth" },
              { stat: "500", unit: "+", label: "Clients treated across the UK" },
            ].map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 1, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-hairline bg-mist p-5"
              >
                <p className="text-teal" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em" }}>
                  {s.stat}<span style={{ fontSize: 22 }}>{s.unit}</span>
                </p>
                <p className="mt-2 text-[13px] text-ink/60 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
