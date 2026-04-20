"use client";

import { motion } from "framer-motion";

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Scalp assessment",
    body: "We analyse your scalp and hair loss pattern in detail.",
  },
  {
    n: "02",
    title: "Personalised plan",
    body: "A trichologist designs your bespoke treatment protocol.",
  },
  {
    n: "03",
    title: "Treatment at home",
    body: "Our specialist comes to you — no clinic, no commute.",
  },
  {
    n: "04",
    title: "Home care kit",
    body: "Clinician-recommended products sent directly to your door.",
  },
  {
    n: "05",
    title: "Progress tracking",
    body: "Regular check-ins and adjustments to keep results on track.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-label="How it works"
      className="w-full bg-white py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-teal">
            Our process
          </p>
          <h2
            className="text-ink text-balance"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: "clamp(32px, 4.2vw, 52px)",
            }}
          >
            How it works
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/65 text-balance">
            Five steps to visible results — without leaving your home.
          </p>
        </header>

        <div className="mt-16">
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 1, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="group relative flex flex-col rounded-2xl border border-hairline bg-white p-7 transition-all hover:border-teal/40 hover:shadow-[0_12px_30px_-12px_rgba(29,158,117,0.18)]"
              >
                <span
                  className="block text-teal"
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 48,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {step.n}
                </span>
                <div className="mt-4 h-px w-10 bg-teal/30 transition-all group-hover:w-16 group-hover:bg-teal" />
                <h3 className="mt-5 text-[18px] font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/60">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
