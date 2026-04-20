"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const MAX_TILT = 6;

type Props = {
  title: string;
  body: string;
  href: string;
  image: string;
};

export default function TreatmentCard({ title, body, href, image }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    el.style.transform = `perspective(900px) rotateX(${-ny * MAX_TILT}deg) rotateY(${nx * MAX_TILT}deg) translateZ(0)`;
    el.style.transition = "transform 0.08s linear";
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    el.style.transition = "transform 0.3s ease";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white will-change-transform shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1 bg-teal" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3
          className="text-ink"
          style={{ fontFamily: "var(--font-inter)", fontSize: 18, fontWeight: 600 }}
        >
          {title}
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/65">{body}</p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-teal transition-all hover:gap-2.5"
        >
          Learn more <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
