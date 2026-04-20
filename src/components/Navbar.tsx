"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/treatments", label: "Treatments" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/results", label: "Results" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#060d18]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-8"
        style={{ height: 72 }}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="text-[22px] font-semibold tracking-tight"
          style={{ fontWeight: 700, color: "#1D9E75" }}
        >
          Rooted
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[14px] font-medium transition-colors hover:text-teal"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/book"
            className="inline-flex items-center rounded-full bg-coral px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-coral/90 hover:shadow-md active:translate-y-[1px]"
          >
            Book now
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10"
          style={{ color: "white" }}
        >
          <span className="sr-only">Menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#060d18]/95 backdrop-blur-md border-t border-white/10">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-white/10"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-coral px-5 py-3 text-center text-[15px] font-semibold text-white"
              >
                Book now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
