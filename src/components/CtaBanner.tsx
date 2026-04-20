import Link from "next/link";
import Image from "next/image";

export default function CtaBanner() {
  return (
    <section
      id="cta-banner"
      aria-label="Book a consultation"
      className="relative w-full overflow-hidden"
      style={{ padding: "100px 0" }}
    >
      <Image
        src="/images/cta-bg.jpg"
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-teal/85" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 text-center md:px-8">
        <h2
          className="text-white text-balance"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            fontSize: "clamp(36px, 5vw, 56px)",
          }}
        >
          Ready to grow?
        </h2>

        <p
          className="mt-5 text-white/85"
          style={{ fontSize: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.6 }}
        >
          Mobile service · Free consultation · No commitment
        </p>

        <Link
          href="/book"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-[16px] font-semibold text-teal shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          Book your free assessment
        </Link>

        <p className="mt-6 text-[13px] text-white/55">
          Results typically visible within 90 days · FDA-cleared technology
        </p>
      </div>
    </section>
  );
}
