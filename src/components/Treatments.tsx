import TreatmentCard from "./TreatmentCard";

const TREATMENTS = [
  {
    title: "LLLT Therapy",
    body: "670nm red light stimulates dormant follicles and boosts growth.",
    href: "/treatments#lllt",
    image: "/images/treatment-lllt.jpg",
  },
  {
    title: "Scalp Microneedling",
    body: "Micro-channels enhance absorption of growth factors.",
    href: "/treatments#microneedling",
    image: "/images/treatment-microneedling.jpg",
  },
  {
    title: "PRP Therapy",
    body: "Platelet-rich plasma reactivates your own hair follicles.",
    href: "/treatments#prp",
    image: "/images/treatment-prp.jpg",
  },
  {
    title: "Supplements",
    body: "Clinician-curated supplements to support growth from within.",
    href: "/shop#supplements",
    image: "/images/treatment-lllt.jpg",
  },
];

export default function Treatments() {
  return (
    <section
      id="treatments"
      aria-label="Our treatments"
      className="w-full bg-white py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="max-w-2xl">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-teal">
            What we do
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
            Our treatments
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/65 text-balance">
            Clinician-grade protocols, delivered at home — combined to restore
            growth from root to tip.
          </p>
        </header>

        <div
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7"
          style={{ perspective: "1200px" }}
        >
          {TREATMENTS.map((t) => (
            <TreatmentCard
              key={t.title}
              title={t.title}
              body={t.body}
              image={t.image}
              href={t.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
